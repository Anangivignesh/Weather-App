import React, { createContext, useState, useEffect, useContext } from "react";
import { getWeatherData, MOCK_CITIES, getAlertDetails } from "../api/weatherApi";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  // Config
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_OPENWEATHER_API_KEY || localStorage.getItem("weather_api_key") || "");
  const [isCelsius, setIsCelsius] = useState(() => {
    const val = localStorage.getItem("weather_is_celsius");
    return val !== null ? JSON.parse(val) : true;
  });
  const [windUnit, setWindUnit] = useState(() => localStorage.getItem("weather_wind_unit") || "mph");
  
  // Locations List
  const [savedLocations, setSavedLocations] = useState(() => {
    const val = localStorage.getItem("weather_saved_locations");
    return val !== null
      ? JSON.parse(val)
      : [
          { name: "San Francisco", lat: 37.7749, lon: -122.4194, country: "US", state: "CA" },
          { name: "London", lat: 51.5074, lon: -0.1278, country: "UK", state: "" },
          { name: "Tokyo", lat: 35.6762, lon: 139.6503, country: "JP", state: "" },
          { name: "Paris", lat: 48.8566, lon: 2.3522, country: "FR", state: "" },
          { name: "New York", lat: 40.7128, lon: -74.0060, country: "US", state: "NY" },
          { name: "Portland", lat: 45.5152, lon: -122.6784, country: "US", state: "OR" }
        ];
  });

  // Selected Location (Default to San Francisco)
  const [activeLocation, setActiveLocation] = useState(() => {
    const val = localStorage.getItem("weather_active_location");
    return val !== null ? JSON.parse(val) : { name: "San Francisco", lat: 37.7749, lon: -122.4194, country: "US", state: "CA" };
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Active View Tab: 'dashboard', 'map', 'alerts', 'locations'
  const [activeTab, setActiveTab] = useState("dashboard");

  // Detailed Severe Alert Context
  const [detailedAlerts, setDetailedAlerts] = useState([]);

  // Persist config adjustments
  useEffect(() => {
    localStorage.setItem("weather_api_key", apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("weather_is_celsius", JSON.stringify(isCelsius));
  }, [isCelsius]);

  useEffect(() => {
    localStorage.setItem("weather_wind_unit", windUnit);
  }, [windUnit]);

  useEffect(() => {
    localStorage.setItem("weather_saved_locations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  useEffect(() => {
    localStorage.setItem("weather_active_location", JSON.stringify(activeLocation));
  }, [activeLocation]);

  // Load weather when coords or units change
  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherData(activeLocation.lat, activeLocation.lon, apiKey, isCelsius);
        
        // Fix city discrepancy glitch: ensure weatherData name info matches the activeLocation
        if (data && activeLocation) {
          data.name = activeLocation.name;
          if (activeLocation.state !== undefined) data.state = activeLocation.state;
          if (activeLocation.country !== undefined) data.country = activeLocation.country;
        }

        setWeatherData(data);

        // Fetch detailed alerts if any
        if (data && data.current.alerts && data.current.alerts.length > 0) {
          const alertPromises = data.current.alerts.map(id => getAlertDetails(id, apiKey));
          const alertDetails = await Promise.all(alertPromises);
          setDetailedAlerts(alertDetails);
        } else {
          setDetailedAlerts([]);
        }
      } catch (err) {
        console.error(err);
        setError("Could not retrieve weather data. Check your connection or API key.");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [activeLocation, apiKey, isCelsius]);

  // Toggle day/light and night/dark themes on html root element
  useEffect(() => {
    if (weatherData && weatherData.current) {
      const isDay = weatherData.current.isDay;
      if (isDay) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    }
  }, [weatherData]);

  // Actions
  const addLocation = (loc) => {
    // Prevent duplicate entries
    const exists = savedLocations.some(
      l => Math.abs(l.lat - loc.lat) < 0.05 && Math.abs(l.lon - loc.lon) < 0.05
    );
    if (!exists) {
      setSavedLocations(prev => [...prev, loc]);
    }
    setActiveLocation(loc);
  };

  const removeLocation = (lat, lon) => {
    setSavedLocations(prev => prev.filter(l => l.lat !== lat || l.lon !== lon));
    // If deleted the active one, switch to first available
    if (activeLocation.lat === lat && activeLocation.lon === lon) {
      const remaining = savedLocations.filter(l => l.lat !== lat || l.lon !== lon);
      if (remaining.length > 0) {
        setActiveLocation(remaining[0]);
      }
    }
  };

  const selectLocation = (loc) => {
    setActiveLocation(loc);
  };

  // Determine if it is currently Day or Night at the active city
  // Weather status determines the body color gradient
  const getThemeClass = () => {
    if (!weatherData) return "bg-night"; // default

    const condition = weatherData.current.condition.toLowerCase();
    
    // We can map these to custom css classes or inline-style setups in App.jsx
    // Stitch: sunny day uses #fbbf24 amber, rainy night uses #6366f1 indigo.
    // Let's decide based on condition and location name:
    const isSF = weatherData.name.toLowerCase().includes("san francisco");
    const isPortland = weatherData.name.toLowerCase().includes("portland");
    
    if (condition.includes("sunny") || condition.includes("clear")) {
      return "sunny-day";
    } else if (condition.includes("storm") || condition.includes("thunderstorm") || isPortland) {
      return "stormy-night";
    } else {
      return "default-night";
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        apiKey,
        setApiKey,
        isCelsius,
        setIsCelsius,
        windUnit,
        setWindUnit,
        savedLocations,
        addLocation,
        removeLocation,
        activeLocation,
        selectLocation,
        weatherData,
        detailedAlerts,
        loading,
        error,
        activeTab,
        setActiveTab,
        themeClass: getThemeClass()
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
