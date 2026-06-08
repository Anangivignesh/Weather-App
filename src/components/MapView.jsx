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
  const layersCacheRef = useRef({});
  const prevApiKeyRef = useRef(apiKey);

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
        keepBuffer: 6,
        updateWhenIdle: false,
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

  // Pause playback when switching to static layers
  useEffect(() => {
    if (activeLayer !== "precip") {
      setIsPlaying(false);
    }
  }, [activeLayer]);

  // Sync Static Weather Overlay Layers (Wind, Temp, Clouds)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear OpenWeather cached layers if API key has changed
    if (prevApiKeyRef.current !== apiKey) {
      Object.keys(layersCacheRef.current).forEach(key => {
        if (key.startsWith("openweather_")) {
          const layer = layersCacheRef.current[key];
          if (layer && mapInstanceRef.current.hasLayer(layer)) {
            mapInstanceRef.current.removeLayer(layer);
          }
          delete layersCacheRef.current[key];
        }
      });
      prevApiKeyRef.current = apiKey;
    }

    if (activeLayer === "precip") return;

    // Remove any precipitation frame layers that might be on the map
    Object.keys(layersCacheRef.current).forEach(key => {
      if (key.startsWith("precip_")) {
        const layer = layersCacheRef.current[key];
        if (layer && mapInstanceRef.current.hasLayer(layer)) {
          mapInstanceRef.current.removeLayer(layer);
        }
      }
    });

    if (!apiKey) {
      if (weatherTileLayerRef.current) {
        mapInstanceRef.current.removeLayer(weatherTileLayerRef.current);
        weatherTileLayerRef.current = null;
      }
      return;
    }

    let layerName = "clouds_new";
    if (activeLayer === "wind") layerName = "wind_new";
    if (activeLayer === "temp") layerName = "temp_new";

    const layerKey = `openweather_${layerName}`;
    const url = `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${apiKey}`;
    const options = {
      zIndex: 10,
      opacity: 0.5,
      maxNativeZoom: 18,
      maxZoom: 19,
      keepBuffer: 6,
      updateWhenIdle: false
    };

    let targetLayer = layersCacheRef.current[layerKey];
    if (!targetLayer) {
      targetLayer = window.L.tileLayer(url, options);
      layersCacheRef.current[layerKey] = targetLayer;
    } else {
      if (targetLayer.options.opacity !== options.opacity) {
        targetLayer.setOpacity(options.opacity);
      }
    }

    if (weatherTileLayerRef.current !== targetLayer) {
      if (weatherTileLayerRef.current) {
        mapInstanceRef.current.removeLayer(weatherTileLayerRef.current);
      }
      targetLayer.addTo(mapInstanceRef.current);
      weatherTileLayerRef.current = targetLayer;
    }

    // Remove other OpenWeather layers from the map
    Object.keys(layersCacheRef.current).forEach(key => {
      if (key.startsWith("openweather_") && key !== layerKey) {
        const layer = layersCacheRef.current[key];
        if (layer && mapInstanceRef.current.hasLayer(layer)) {
          mapInstanceRef.current.removeLayer(layer);
        }
      }
    });
  }, [activeLayer, apiKey]);

  // Sync Precipitation (Radar) Overlay Layer
  useEffect(() => {
    if (!mapInstanceRef.current || activeLayer !== "precip") return;

    // Remove any OpenWeather layers that might be on the map
    Object.keys(layersCacheRef.current).forEach(key => {
      if (key.startsWith("openweather_")) {
        const layer = layersCacheRef.current[key];
        if (layer && mapInstanceRef.current.hasLayer(layer)) {
          mapInstanceRef.current.removeLayer(layer);
        }
      }
    });

    if (radarFrames.length === 0) {
      if (weatherTileLayerRef.current) {
        mapInstanceRef.current.removeLayer(weatherTileLayerRef.current);
        weatherTileLayerRef.current = null;
      }
      return;
    }

    const frameIndex = Math.min(radarFrames.length - 1, Math.floor((timeVal / 100) * radarFrames.length));
    const frame = radarFrames[frameIndex];
    if (!frame) return;

    const activeKey = `precip_${frame.path}`;
    const activeUrl = `https://tilecache.rainviewer.com${frame.path}/256/{z}/{x}/{y}/2/1_1.png`;
    const activeOptions = {
      zIndex: 10,
      opacity: 0.7,
      maxNativeZoom: 7,
      maxZoom: 19,
      keepBuffer: 6,
      updateWhenIdle: false
    };

    // Ensure active frame layer is on the map
    let activeLayerInstance = layersCacheRef.current[activeKey];
    if (!activeLayerInstance) {
      activeLayerInstance = window.L.tileLayer(activeUrl, activeOptions);
      layersCacheRef.current[activeKey] = activeLayerInstance;
    } else {
      if (activeLayerInstance.options.opacity !== activeOptions.opacity) {
        activeLayerInstance.setOpacity(activeOptions.opacity);
      }
    }

    if (!mapInstanceRef.current.hasLayer(activeLayerInstance)) {
      activeLayerInstance.addTo(mapInstanceRef.current);
    }

    // Determine next frame for preloading
    let nextKey = "";
    let nextUrl = "";
    const nextIndex = (frameIndex + 1) % radarFrames.length;
    const nextFrame = radarFrames[nextIndex];
    if (nextFrame && nextIndex !== frameIndex) {
      nextKey = `precip_${nextFrame.path}`;
      nextUrl = `https://tilecache.rainviewer.com${nextFrame.path}/256/{z}/{x}/{y}/2/1_1.png`;
    }

    // Ensure next frame layer is preloading
    let nextLayerInstance = null;
    if (nextKey && nextUrl) {
      nextLayerInstance = layersCacheRef.current[nextKey];
      if (!nextLayerInstance) {
        nextLayerInstance = window.L.tileLayer(nextUrl, {
          ...activeOptions,
          opacity: 0
        });
        layersCacheRef.current[nextKey] = nextLayerInstance;
      } else {
        if (nextLayerInstance.options.opacity !== 0) {
          nextLayerInstance.setOpacity(0);
        }
      }

      if (!mapInstanceRef.current.hasLayer(nextLayerInstance)) {
        nextLayerInstance.addTo(mapInstanceRef.current);
      }
    }

    // Remove any other precipitation frames from the map
    Object.keys(layersCacheRef.current).forEach(key => {
      if (key.startsWith("precip_") && key !== activeKey && key !== nextKey) {
        const layer = layersCacheRef.current[key];
        if (layer && mapInstanceRef.current.hasLayer(layer)) {
          mapInstanceRef.current.removeLayer(layer);
        }
      }
    });

    weatherTileLayerRef.current = activeLayerInstance;
  }, [activeLayer, timeVal, radarFrames]);

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
      <div className="absolute inset-0 pointer-events-none p-3 sm:p-6 flex flex-col justify-between z-30">
        
        {/* Top Row: Search & Layer Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-3 sm:gap-4 pointer-events-auto w-full">
          
          {/* Search Bar */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 flex items-center gap-2 sm:gap-3 w-full max-w-[240px] sm:max-w-sm shadow-2xl">
            <span className="material-symbols-outlined text-primary text-lg sm:text-xl">
              search
            </span>
            <input 
              type="text" 
              placeholder="Search map..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleMapSearch}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] w-full font-body-md text-xs sm:text-sm outline-none"
            />
            <span 
              onClick={handleRecenter}
              className="material-symbols-outlined text-[var(--on-surface-variant)] cursor-pointer hover:text-primary transition-colors text-base sm:text-lg"
              title="Recenter map"
            >
              my_location
            </span>
          </div>

          {/* Layer Selector */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] p-1 rounded-xl flex gap-1 overflow-x-auto max-w-full hide-scrollbar shadow-2xl">
            <button 
              onClick={() => setActiveLayer("precip")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-label-caps text-label-caps text-[8px] sm:text-[10px] uppercase font-bold flex items-center gap-1 sm:gap-2 transition-all shrink-0 ${
                activeLayer === "precip" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">rainy</span>
              Precipitation
            </button>
            <button 
              onClick={() => setActiveLayer("wind")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-label-caps text-label-caps text-[8px] sm:text-[10px] uppercase font-bold flex items-center gap-1 sm:gap-2 transition-all shrink-0 ${
                activeLayer === "wind" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">air</span>
              Wind
            </button>
            <button 
              onClick={() => setActiveLayer("temp")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-label-caps text-label-caps text-[8px] sm:text-[10px] uppercase font-bold flex items-center gap-1 sm:gap-2 transition-all shrink-0 ${
                activeLayer === "temp" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">thermostat</span>
              Temp
            </button>
            <button 
              onClick={() => setActiveLayer("clouds")}
              className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-label-caps text-label-caps text-[8px] sm:text-[10px] uppercase font-bold flex items-center gap-1 sm:gap-2 transition-all shrink-0 ${
                activeLayer === "clouds" ? "bg-primary text-on-primary" : "text-[var(--on-surface-variant)] hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-xs sm:text-sm">cloud</span>
              Clouds
            </button>
          </div>
        </div>

        {/* Dynamic warning badge when API key is missing for static layers */}
        {!apiKey && activeLayer !== "precip" && (
          <div className="absolute top-28 right-6 pointer-events-auto bg-amber-500/25 border border-amber-500/40 text-amber-500 text-[10px] sm:text-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl max-w-xs shadow-xl backdrop-blur-md">
            <b>API Key Required:</b> Overlay requires key. Showing base map.
          </div>
        )}

        {/* Bottom Center: Playback Controls & Legend */}
        <div className="flex flex-col gap-2 sm:gap-4 pointer-events-auto items-center w-full mt-auto">
          
          {/* Legend Panel */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] p-2 sm:p-4 rounded-2xl flex flex-col gap-1 sm:gap-2 self-end shadow-2xl backdrop-blur-xl">
            <div className="text-[8px] sm:text-[10px] font-bold tracking-wider text-primary border-b border-white/10 pb-1 uppercase">
              {activeLayer === "precip" ? "Precipitation" : activeLayer === "wind" ? "Wind" : activeLayer === "temp" ? "Temp" : "Clouds"}
            </div>
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              <span className="text-[8px] sm:text-[9px] text-[var(--on-surface-variant)] uppercase font-bold">Light</span>
              <div className={`h-1.5 w-20 sm:h-2 sm:w-32 rounded-full bg-gradient-to-r ${
                activeLayer === "precip" 
                  ? "from-blue-400 via-green-400 to-red-400" 
                  : activeLayer === "wind" 
                  ? "from-teal-300 via-blue-400 to-indigo-500" 
                  : activeLayer === "temp"
                  ? "from-blue-500 via-yellow-400 to-red-500"
                  : "from-slate-400 via-slate-200 to-white"
              }`}></div>
              <span className="text-[8px] sm:text-[9px] text-[var(--on-surface-variant)] uppercase font-bold">Severe</span>
            </div>
          </div>

          {/* Playback Bar Panel */}
          <div className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] w-full max-w-4xl rounded-2xl p-2.5 sm:p-4 flex items-center gap-3 sm:gap-6 shadow-2xl">
            <button 
              onClick={handleTogglePlay}
              className={`bg-primary text-on-primary w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-all shadow-lg shadow-primary/20 ${
                isPlaying ? "animate-pulse ring-2 ring-primary/45" : ""
              }`}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            
            <div className="flex-grow flex flex-col gap-1 sm:gap-2 overflow-hidden">
              <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
                <span className="hidden sm:inline whitespace-nowrap shrink-0">{activeLayer === "precip" && radarFrames.length > 0 ? "Past 2h" : "Start"}</span>
                <span className="text-primary font-mono text-[9px] sm:text-xs bg-primary/10 px-2 py-0.5 rounded whitespace-nowrap mx-auto sm:mx-0">{getScrubbedTime()}</span>
                <span className="hidden sm:inline whitespace-nowrap shrink-0 text-right">{activeLayer === "precip" && radarFrames.length > 0 ? "Nowcast" : "End"}</span>
              </div>
              
              <div className="relative w-full h-1.5 sm:h-2 bg-white/10 rounded-full flex items-center">
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
                  className="absolute w-3.5 h-3.5 sm:w-4 sm:h-4 bg-primary rounded-full shadow-glow pointer-events-none transition-transform"
                  style={{ left: `calc(${timeVal}% - 7px)` }}
                ></div>
              </div>
            </div>

            <div 
              className="flex flex-col items-end min-w-[50px] sm:min-w-[80px] cursor-pointer shrink-0"
              onClick={() => setPlaybackSpeed(prev => prev === 1 ? 2 : prev === 2 ? 4 : 1)}
            >
              <div className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold text-sm sm:text-lg">
                {playbackSpeed}x
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold uppercase text-[var(--on-surface-variant)] tracking-wider">
                Speed
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Map Controls (Zoom/Compass) */}
      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-auto z-40">
        <div className="hidden md:flex bg-[var(--surface-container-high)] border border-[var(--outline-variant)] flex flex-col rounded-xl overflow-hidden shadow-xl">
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
          className="bg-[var(--surface-container-high)] border border-[var(--outline-variant)] p-2.5 sm:p-3 rounded-xl text-[var(--on-surface)] hover:bg-white/10 transition-colors shadow-xl"
          title="Recenter on Active City"
        >
          <span className="material-symbols-outlined text-base sm:text-lg">explore</span>
        </button>
      </div>
    </div>
  );
}
