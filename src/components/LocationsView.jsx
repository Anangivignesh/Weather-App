import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { searchLocations, getWeatherData, MOCK_CITIES } from "../api/weatherApi";

export default function LocationsView() {
  const {
    apiKey,
    setApiKey,
    isCelsius,
    setIsCelsius,
    windUnit,
    setWindUnit,
    savedLocations,
    removeLocation,
    selectLocation,
    setActiveTab
  } = useWeather();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    severe: true,
    daily: false
  });

  const [locationsWeather, setLocationsWeather] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(false);

  React.useEffect(() => {
    let active = true;
    const fetchAllWeather = async () => {
      setLoadingWeather(true);
      const weatherMap = {};
      try {
        await Promise.all(
          savedLocations.map(async (loc) => {
            try {
              const data = await getWeatherData(loc.lat, loc.lon, apiKey, isCelsius);
              if (data) {
                data.name = loc.name;
                weatherMap[`${loc.lat}-${loc.lon}`] = {
                  temp: data.current.temp,
                  condition: data.current.condition,
                  icon: data.current.icon,
                  min: data.current.temp_min,
                  max: data.current.temp_max,
                  time: data.current.sunrise ? "Local Weather" : "",
                  country: data.country || loc.country || ""
                };
              }
            } catch (err) {
              console.error("Failed to fetch location weather: ", err);
            }
          })
        );
        if (active) {
          setLocationsWeather(weatherMap);
        }
      } catch (err) {
        console.error("Failed to fetch all location weather details: ", err);
      } finally {
        if (active) {
          setLoadingWeather(false);
        }
      }
    };

    fetchAllWeather();
    return () => {
      active = false;
    };
  }, [savedLocations, apiKey, isCelsius]);

  const getCityWeather = (loc) => {
    const key = `${loc.lat}-${loc.lon}`;
    if (locationsWeather[key]) {
      return locationsWeather[key];
    }
    return getCityMockValues(loc.name);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim().length > 1) {
      const results = await searchLocations(searchQuery, apiKey);
      setSearchResults(results);
    }
  };

  const handleSelectLocation = (loc) => {
    selectLocation(loc);
    setActiveTab("dashboard");
  };

  const handleAddLocation = (loc) => {
    // Already handles duplicates in context
    selectLocation(loc);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);
    setActiveTab("dashboard");
  };

  // Build temporary mock values for cards in locations list
  const getCityMockValues = (cityName) => {
    const key = cityName.toLowerCase().trim();
    // Default fallback mock values if city isn't in default MOCK_CITIES
    const defaultVal = {
      temp: isCelsius ? 18 : 64,
      condition: "Partly Cloudy",
      icon: "partly_cloudy_day",
      min: isCelsius ? 14 : 57,
      max: isCelsius ? 22 : 72,
      time: "10:24 AM",
      country: "US"
    };

    if (key.includes("london")) {
      return {
        temp: isCelsius ? 14 : 57,
        condition: "Overcast",
        icon: "cloud",
        min: isCelsius ? 11 : 52,
        max: isCelsius ? 16 : 61,
        time: "6:24 PM",
        country: "UK"
      };
    }
    if (key.includes("tokyo")) {
      return {
        temp: isCelsius ? 22 : 72,
        condition: "Clear Skies",
        icon: "sunny",
        min: isCelsius ? 18 : 64,
        max: isCelsius ? 24 : 75,
        time: "2:24 AM",
        country: "JP"
      };
    }
    if (key.includes("paris")) {
      return {
        temp: isCelsius ? 4 : 39,
        condition: "Light Snow",
        icon: "cloudy_snowing",
        min: isCelsius ? 2 : 36,
        max: isCelsius ? 6 : 43,
        time: "7:24 PM",
        country: "FR"
      };
    }
    if (key.includes("new york")) {
      return {
        temp: isCelsius ? 18 : 64,
        condition: "Moderate Rain",
        icon: "rainy",
        min: isCelsius ? 15 : 59,
        max: isCelsius ? 20 : 68,
        time: "1:24 PM",
        country: "US"
      };
    }
    if (key.includes("portland")) {
      return {
        temp: isCelsius ? 12 : 54,
        condition: "Stormy",
        icon: "thunderstorm",
        min: isCelsius ? 10 : 50,
        max: isCelsius ? 14 : 58,
        time: "10:24 AM",
        country: "US"
      };
    }
    if (key.includes("san francisco")) {
      return {
        temp: isCelsius ? 20 : 68,
        condition: "Cloudy",
        icon: "cloud",
        min: isCelsius ? 16 : 61,
        max: isCelsius ? 22 : 72,
        time: "10:24 AM",
        country: "US"
      };
    }

    return defaultVal;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Section */}
      <section className="flex justify-between items-start flex-col sm:flex-row gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-primary text-3xl font-bold mb-2">
            Saved Locations & Preferences
          </h2>
          <p className="text-on-surface-variant font-body-md">
            Manage your global weather points, units, and API key credentials.
          </p>
        </div>
      </section>

      {/* Location Grid (Bento Style) */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {savedLocations.map((loc, idx) => {
            const mock = getCityWeather(loc);
            return (
              <div 
                key={idx}
                className="glass-card p-card-padding rounded-2xl relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[180px]"
                onClick={() => handleSelectLocation(loc)}
              >
                {/* Delete button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLocation(loc.lat, loc.lon);
                  }}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white/5 border border-white/10 text-on-surface-variant hover:text-error hover:bg-error/20 opacity-0 group-hover:opacity-100 transition-all z-20"
                  title="Remove location"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-headline-lg text-headline-lg-mobile text-xl font-bold text-on-surface">
                      {loc.name}
                    </h3>
                    <p className="font-label-caps text-label-caps text-on-surface-variant text-xs mt-1">
                      {loc.country || "US"} • {mock.time}
                    </p>
                  </div>
                  <span 
                    className={`material-symbols-outlined icon-glow text-4xl transition-all duration-300 group-hover:opacity-0 group-hover:pointer-events-none ${
                      mock.icon === "sunny" ? "text-yellow-400" : mock.icon === "rainy" ? "text-tertiary" : "text-secondary"
                    }`}
                  >
                    {mock.icon}
                  </span>
                </div>
                
                <div className="flex items-end justify-between">
                  <span className="font-display-lg text-5xl font-bold text-on-surface">
                    {mock.temp}°
                  </span>
                  <div className="text-right">
                    <p className="font-label-caps text-label-caps text-primary text-xs font-bold">
                      {mock.condition}
                    </p>
                    <p className="text-on-surface-variant text-sm mt-0.5">
                      H:{mock.max}° L:{mock.min}°
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Location Card */}
          {showSearch ? (
            <div className="glass-card p-card-padding rounded-2xl border border-primary/30 flex flex-col gap-4 min-h-[180px]">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-primary text-on-primary font-bold text-xs"
                >
                  Search
                </button>
              </form>

              <div className="flex-grow overflow-y-auto max-h-28 space-y-1 pr-1 hide-scrollbar">
                {searchResults.length > 0 ? (
                  searchResults.map((res, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleAddLocation(res)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-primary/20 border border-white/5 rounded-lg text-xs cursor-pointer flex justify-between items-center transition-colors"
                    >
                      <span className="font-bold">{res.name}, {res.country}</span>
                      <span className="text-[10px] text-on-surface-variant">{res.lat.toFixed(2)}, {res.lon.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-on-surface-variant text-center pt-4">No results yet. Search city above.</p>
                )}
              </div>

              <button
                onClick={() => setShowSearch(false)}
                className="w-full text-center text-xs text-on-surface-variant hover:text-on-surface pt-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowSearch(true)}
              className="glass-card p-card-padding rounded-2xl flex flex-col items-center justify-center border-dashed border-2 border-primary/20 hover:border-primary/50 group min-h-[180px]"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-primary text-3xl">add</span>
              </div>
              <p className="font-label-caps text-label-caps text-primary text-xs font-bold">
                Add New Location
              </p>
            </button>
          )}
        </div>
      </section>

      {/* Settings Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {/* Unit Preferences */}
        <div className="glass-card p-card-padding rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">tune</span>
            <h3 className="font-headline-lg text-headline-lg-mobile text-xl font-bold">
              Unit Preferences
            </h3>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-body-md text-on-surface font-semibold text-sm">Temperature Units</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Switch between Celsius and Fahrenheit</p>
              </div>
              <div className="flex bg-surface-container rounded-lg p-1 border border-white/5">
                <button 
                  onClick={() => setIsCelsius(true)}
                  className={`px-4 py-1.5 rounded-md font-bold text-sm transition-all ${
                    isCelsius ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  °C
                </button>
                <button 
                  onClick={() => setIsCelsius(false)}
                  className={`px-4 py-1.5 rounded-md font-bold text-sm transition-all ${
                    !isCelsius ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  °F
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-body-md text-on-surface font-semibold text-sm">Wind Speed</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Preferred measurement for atmospheric flow</p>
              </div>
              <select 
                value={windUnit}
                onChange={(e) => setWindUnit(e.target.value)}
                className="bg-surface-container border border-white/5 text-sm rounded-lg text-on-surface px-3 py-2 focus:ring-1 focus:ring-primary/50 cursor-pointer outline-none"
              >
                <option value="km/h">km/h</option>
                <option value="mph">mph</option>
                <option value="m/s">m/s</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="glass-card p-card-padding rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <h3 className="font-headline-lg text-headline-lg-mobile text-xl font-bold">
              Alerts & Notifications
            </h3>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-body-md text-on-surface font-semibold text-sm">Severe Weather Alerts</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Push notifications for extreme events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={alertSettings.severe}
                  onChange={(e) => setAlertSettings(prev => ({ ...prev, severe: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-body-md text-on-surface font-semibold text-sm">Daily Summary</p>
                <p className="text-xs text-on-surface-variant mt-0.5">Every morning at 7:00 AM</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={alertSettings.daily}
                  onChange={(e) => setAlertSettings(prev => ({ ...prev, daily: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
