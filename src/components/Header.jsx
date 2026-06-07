import React, { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import { searchLocations } from "../api/weatherApi";

export default function Header() {
  const { activeTab, setActiveTab, apiKey, addLocation } = useWeather();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const results = await searchLocations(query, apiKey);
      setSearchResults(results);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelectResult = (result) => {
    addLocation(result);
    setSearchQuery("");
    setShowDropdown(false);
    setActiveTab("dashboard");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSelectResult(searchResults[0]);
    }
  };

  return (
    <header className="flex justify-between items-center w-full px-container-margin py-4 sticky top-0 z-50 bg-surface/10 backdrop-blur-3xl border-b border-white/20">
      <div className="flex items-center gap-6">
        <div 
          className="flex items-center gap-base cursor-pointer" 
          onClick={() => setActiveTab("dashboard")}
        >
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            cloudy_snowing
          </span>
          <h1 className="text-xl md:text-headline-lg font-headline-lg text-primary tracking-tight font-bold">
            Weather
          </h1>
        </div>
        
        {/* Navigation Tabs - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`font-body-md text-body-md transition-all duration-300 px-3 py-1 rounded-lg ${
              activeTab === "dashboard"
                ? "text-primary font-bold border-b-2 border-primary rounded-b-none pb-1"
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/10"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`font-body-md text-body-md transition-all duration-300 px-3 py-1 rounded-lg ${
              activeTab === "map"
                ? "text-primary font-bold border-b-2 border-primary rounded-b-none pb-1"
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/10"
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`font-body-md text-body-md transition-all duration-300 px-3 py-1 rounded-lg ${
              activeTab === "alerts"
                ? "text-primary font-bold border-b-2 border-primary rounded-b-none pb-1"
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/10"
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab("locations")}
            className={`font-body-md text-body-md transition-all duration-300 px-3 py-1 rounded-lg ${
              activeTab === "locations"
                ? "text-primary font-bold border-b-2 border-primary rounded-b-none pb-1"
                : "text-on-surface-variant hover:text-on-surface hover:bg-white/10"
            }`}
          >
            Locations
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-sm pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search city..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onFocus={() => searchQuery.trim().length > 1 && setShowDropdown(true)}
            className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-full py-1.5 pl-10 pr-4 text-sm text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] focus:outline-none focus:border-[var(--primary)] focus:bg-[var(--surface-container-high)] transition-all duration-300 w-36 sm:w-48 lg:w-64"
          />

          {/* Search Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-[var(--surface-container-high)] border border-[var(--outline-variant)] rounded-2xl p-2 z-50 shadow-2xl max-h-60 overflow-y-auto">
              {searchResults.map((result, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectResult(result)}
                  className="px-4 py-2 hover:bg-[var(--primary)]/20 rounded-xl cursor-pointer text-sm flex flex-col transition-colors"
                >
                  <span className="font-bold text-[var(--on-surface)]">{result.name}</span>
                  <span className="text-xs text-[var(--on-surface-variant)]">
                    {result.state ? `${result.state}, ` : ""}{result.country}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
