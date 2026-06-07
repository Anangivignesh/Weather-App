import React, { useState, useEffect, useRef } from "react";
import { useWeather } from "../context/WeatherContext";
import { searchLocations } from "../api/weatherApi";

export default function MapView() {
  const { activeLocation, weatherData, apiKey, selectLocation } = useWeather();
  const [activeLayer, setActiveLayer] = useState("precip"); // "precip", "wind", "temp", "clouds"
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeVal, setTimeVal] = useState(50); // range 0 to 100
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // multiplier
  const [searchVal, setSearchVal] = useState("");
  const [radarFrames, setRadarFrames] = useState([]);
  
  const timerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const baseTileLayerRef = useRef(null);
  const weatherTileLayerRef = useRef(null);
  const activeMarkerRef = useRef(null);

  const isDay = weatherData?.current?.isDay;

  // Fetch RainViewer radar loop frames for precipitation animation
  useEffect(() => {
    let active = true;
    const fetchRadarFrames = async () => {
      try {
        const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");
        const data = await response.json();
        if (active && data && data.radar) {
          const pastFrames = data.radar.past || [];
          const nowcastFrames = data.radar.nowcast || [];
          setRadarFrames([...pastFrames, ...nowcastFrames]);
        }
      } catch (err) {
        console.error("Error fetching RainViewer frames: ", err);
      }
    };
    
    fetchRadarFrames();
    return () => {
      active = false;
    };
  }, []);

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && window.L) {
      mapInstanceRef.current = window.L.map(mapContainerRef.current, {
        center: [activeLocation.lat, activeLocation.lon],
        zoom: 9,
        zoomControl: false,
        attributionControl: true
      });

      const baseLayerUrl = isDay
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

      baseTileLayerRef.current = window.L.tileLayer(baseLayerUrl, {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapInstanceRef.current);

      const customIcon = window.L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative flex flex-col items-center">
            <div class="w-4 h-4 bg-primary rounded-full animate-ping absolute"></div>
            <div class="w-3.5 h-3.5 bg-primary border-2 border-white rounded-full relative shadow-lg"></div>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      activeMarkerRef.current = window.L.marker([activeLocation.lat, activeLocation.lon], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>${activeLocation.name}</b>`)
        .openPopup();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Map view when activeLocation coordinates change
  useEffect(() => {
    if (mapInstanceRef.current && activeLocation) {
      mapInstanceRef.current.setView([activeLocation.lat, activeLocation.lon], 9);
      if (activeMarkerRef.current) {
        activeMarkerRef.current.setLatLng([activeLocation.lat, activeLocation.lon]);
        activeMarkerRef.current.getPopup().setContent(`<b>${activeLocation.name}</b>`);
        activeMarkerRef.current.openPopup();
      }
    }
  }, [activeLocation]);

  // Sync Map Base Theme Layer when isDay shifts
  useEffect(() => {
    if (mapInstanceRef.current && baseTileLayerRef.current && window.L) {
      const baseLayerUrl = isDay
        ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      baseTileLayerRef.current.setUrl(baseLayerUrl);
    }
  }, [isDay]);

  // Sync Weather Overlay Layer
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Remove old layer first
    if (weatherTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(weatherTileLayerRef.current);
      weatherTileLayerRef.current = null;
    }

    let url = "";
    let options = {
      opacity: 0.65,
      zIndex: 10
    };

    if (activeLayer === "precip") {
      if (radarFrames.length > 0) {
        const frameIndex = Math.min(radarFrames.length - 1, Math.floor((timeVal / 100) * radarFrames.length));
        const frame = radarFrames[frameIndex];
        if (frame) {
          url = `https://tilecache.rainviewer.com${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;
          options.opacity = 0.7;
          options.maxNativeZoom = 7;
          options.maxZoom = 19;
        }
      }
    } else {
      if (apiKey) {
        let layerName = "clouds_new";
        if (activeLayer === "wind") layerName = "wind_new";
        if (activeLayer === "temp") layerName = "temp_new";
        
        url = `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${apiKey}`;
        options.opacity = 0.5;
        options.maxNativeZoom = 18;
        options.maxZoom = 19;
      }
    }

    if (url) {
      weatherTileLayerRef.current = window.L.tileLayer(url, options).addTo(mapInstanceRef.current);
    }
  }, [activeLayer, timeVal, radarFrames, apiKey]);

  // Playback timer loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeVal(prev => {
          if (prev >= 100) return 0;
          return prev + 1 * playbackSpeed;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handleTogglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current && activeLocation) {
      mapInstanceRef.current.setView([activeLocation.lat, activeLocation.lon], 9);
    }
  };

  const handleMapSearch = async (e) => {
    if (e.key === "Enter" && searchVal.trim().length > 1) {
      const results = await searchLocations(searchVal, apiKey);
      if (results && results.length > 0) {
        selectLocation(results[0]);
        setSearchVal("");
      }
    }
  };

  // Convert progress slider (0-100) to readable weather frame times
  const getScrubbedTime = () => {
    if (activeLayer === "precip" && radarFrames.length > 0) {
      const idx = Math.min(radarFrames.length - 1, Math.floor((timeVal / 100) * radarFrames.length));
      const frame = radarFrames[idx];
      if (frame) {
        return new Date(frame.time * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        });
      }
    }
    
    // Fallback static timeline representation
    const totalMinutes = 6 * 60;
    const currentMinutes = Math.round((timeVal / 100) * totalMinutes);
    const startHour = 8;
    const currentHour24 = startHour + Math.floor(currentMinutes / 60);
    const minutes = currentMinutes % 60;
    const isPm = currentHour24 >= 12;
    const displayHour = currentHour24 > 12 ? currentHour24 - 12 : currentHour24;
    return `${displayHour}:${String(minutes).padStart(2, "0")} ${isPm ? "PM" : "AM"}`;
  };

  return (
    <div className="relative flex-grow overflow-hidden h-[75vh] rounded-3xl border border-white/10 glass-panel">
      {/* Real Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0"></div>

      {/* UI Overlay Containers */}
      <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between z-30">
        
        {/* Top Row: Search & Layer Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 pointer-events-auto w-full">
          
          {/* Search Bar */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] rounded-full px-5 py-2.5 flex items-center gap-3 w-full max-w-sm shadow-2xl">
            <span className="material-symbols-outlined text-primary text-xl">
              search
            </span>
            <input 
              type="text" 
              placeholder="Search map location..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleMapSearch}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] w-full font-body-md text-sm outline-none"
            />
            <span 
              onClick={handleRecenter}
              className="material-symbols-outlined text-[var(--on-surface-variant)] cursor-pointer hover:text-primary transition-colors text-lg"
              title="Recenter map"
            >
              my_location
            </span>
          </div>

          {/* Layer Selector */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] p-1 rounded-xl flex gap-1 overflow-x-auto max-w-full hide-scrollbar shadow-2xl">
            <button 
              onClick={() => setActiveLayer("precip")}
              className={`px-4 py-2 rounded-lg font-label-caps text-label-caps text-[10px] uppercase font-bold flex items-center gap-2 transition-all ${
                activeLayer === "precip" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-sm">rainy</span>
              Precipitation
            </button>
            <button 
              onClick={() => setActiveLayer("wind")}
              className={`px-4 py-2 rounded-lg font-label-caps text-label-caps text-[10px] uppercase font-bold flex items-center gap-2 transition-all ${
                activeLayer === "wind" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-sm">air</span>
              Wind
            </button>
            <button 
              onClick={() => setActiveLayer("temp")}
              className={`px-4 py-2 rounded-lg font-label-caps text-label-caps text-[10px] uppercase font-bold flex items-center gap-2 transition-all ${
                activeLayer === "temp" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-sm">thermostat</span>
              Temp
            </button>
            <button 
              onClick={() => setActiveLayer("clouds")}
              className={`px-4 py-2 rounded-lg font-label-caps text-label-caps text-[10px] uppercase font-bold flex items-center gap-2 transition-all ${
                activeLayer === "clouds" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-sm">cloud</span>
              Clouds
            </button>
          </div>
        </div>

        {/* Dynamic warning badge when API key is missing for static layers */}
        {!apiKey && activeLayer !== "precip" && (
          <div className="absolute top-24 right-6 pointer-events-auto bg-amber-500/25 border border-amber-500/40 text-amber-500 text-xs px-4 py-2 rounded-2xl max-w-xs shadow-xl backdrop-blur-md">
            <b>API Key Required:</b> OpenWeather Map overlays (Wind, Temp, Clouds) require an active key. Showing base map only.
          </div>
        )}

        {/* Bottom Center: Playback Controls & Legend */}
        <div className="flex flex-col gap-4 pointer-events-auto items-center w-full">
          
          {/* Legend Panel */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] p-4 rounded-2xl flex flex-col gap-2 self-end shadow-2xl backdrop-blur-xl">
            <div className="text-[10px] font-bold tracking-wider text-primary border-b border-white/10 pb-1.5 uppercase">
              {activeLayer === "precip" ? "Precipitation (Radar)" : activeLayer === "wind" ? "Wind velocity" : activeLayer === "temp" ? "Temperature gradient" : "Cloud density"}
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-[9px] text-[var(--on-surface-variant)] uppercase font-bold">Light</span>
              <div className={`h-2 w-32 rounded-full bg-gradient-to-r ${
                activeLayer === "precip" 
                  ? "from-blue-400 via-green-400 to-red-400" 
                  : activeLayer === "wind" 
                  ? "from-teal-300 via-blue-400 to-indigo-500" 
                  : activeLayer === "temp"
                  ? "from-blue-500 via-yellow-400 to-red-500"
                  : "from-slate-400 via-slate-200 to-white"
              }`}></div>
              <span className="text-[9px] text-[var(--on-surface-variant)] uppercase font-bold">Severe</span>
            </div>
          </div>

          {/* Playback Bar Panel */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] w-full max-w-4xl rounded-2xl p-4 flex items-center gap-6 shadow-2xl">
            <button 
              onClick={handleTogglePlay}
              className={`bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-primary/20 ${
                isPlaying ? "animate-pulse ring-2 ring-primary/45" : ""
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            
            <div className="flex-grow flex flex-col gap-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
                <span>{activeLayer === "precip" && radarFrames.length > 0 ? "Past 2h" : "Start"}</span>
                <span className="text-primary font-mono">{getScrubbedTime()}</span>
                <span>{activeLayer === "precip" && radarFrames.length > 0 ? "Nowcast" : "End"}</span>
              </div>
              
              <div className="relative w-full h-2 bg-white/10 rounded-full flex items-center">
                <div 
                  className="absolute left-0 top-0 h-full bg-primary/25 rounded-full"
                  style={{ width: `${timeVal}%` }}
                ></div>
                <input 
                  type="range" 
                  min="0" 
                  max="100"
                  value={timeVal}
                  onChange={(e) => setTimeVal(parseInt(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                />
                <div 
                  className="absolute w-4 h-4 bg-primary rounded-full shadow-glow pointer-events-none transition-transform"
                  style={{ left: `calc(${timeVal}% - 8px)` }}
                ></div>
              </div>
            </div>

            <div 
              className="flex flex-col items-end min-w-[80px] cursor-pointer"
              onClick={() => setPlaybackSpeed(prev => prev === 1 ? 2 : prev === 2 ? 4 : 1)}
            >
              <div className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold text-lg">
                {playbackSpeed}x
              </div>
              <div className="text-[9px] font-bold uppercase text-[var(--on-surface-variant)] tracking-wider">
                Speed
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Map Controls (Zoom/Compass) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto z-40">
        <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] flex flex-col rounded-xl overflow-hidden shadow-xl">
          <button 
            onClick={handleZoomIn}
            className="p-3 hover:bg-white/10 text-[var(--on-surface)] transition-colors border-b border-white/10"
            title="Zoom in"
          >
            <span className="material-symbols-outlined text-lg">add</span>
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-3 hover:bg-white/10 text-[var(--on-surface)] transition-colors"
            title="Zoom out"
          >
            <span className="material-symbols-outlined text-lg">remove</span>
          </button>
        </div>
        <button 
          onClick={handleRecenter}
          className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] p-3 rounded-xl text-[var(--on-surface)] hover:bg-white/10 transition-colors shadow-xl"
          title="Recenter on Active City"
        >
          <span className="material-symbols-outlined text-lg">explore</span>
        </button>
      </div>
    </div>
  );
}
