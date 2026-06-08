import React, { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

export default function DashboardView() {
  const { weatherData, loading, error, isCelsius, setActiveTab } = useWeather();
  const [hourlyTab, setHourlyTab] = useState("24h"); // "24h" or "precip"
  const [localTimeStr, setLocalTimeStr] = useState("");

  useEffect(() => {
    if (!weatherData) return;
    const offset = weatherData.timezone_offset || 0;
    
    const updateTime = () => {
      const utc = Date.now() + (offset * 1000);
      const date = new Date(utc);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = String(minutes).padStart(2, "0");
      setLocalTimeStr(`${displayHours}:${displayMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // update every 10 seconds
    return () => clearInterval(interval);
  }, [weatherData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-6xl text-primary animate-spin">
          sync
        </span>
        <p className="mt-4 text-on-surface-variant font-bold">Loading weather data...</p>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <span className="material-symbols-outlined text-6xl text-error">
          error
        </span>
        <p className="mt-4 text-on-surface font-bold text-xl">{error || "No weather data loaded."}</p>
        <p className="mt-2 text-on-surface-variant max-w-md">Please check your internet connection or verify your API key in settings.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2.5 rounded-full bg-primary text-on-primary font-bold hover:opacity-90 transition-opacity"
        >
          Retry Load
        </button>
      </div>
    );
  }

  const { current, hourly, daily, name, state, country } = weatherData;

  // Custom Weather illustrations to match Stitch designs
  const getWeatherIllustration = () => {
    const cond = current.condition.toLowerCase();
    if (cond.includes("storm") || cond.includes("thunderstorm") || cond.includes("lightning")) {
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuB3BghWQdB1BNZJg9h8zgZF02blv0H_MBEYm2u1mzkk_whboeF7QoFhh70KR3sssf3wXAii8j2KMLnusjefloTvZ7K1gdxdJg8TWixkHloEoZkxiUossORvkrAubRJltvZX2EvF5mVBNGVoYCWKH7Qdf5RK68DAbbe6IEFtjrcc7Dp-17yclPbwkq_V0QURwShdy3NXu0XN0WnCL0pnlJTQy5D3RJpYWWXDO1pnxr68pHdhbLKnwp94Xxkpdo3xUFtY-qV_Ef809Ohh";
    }
    // Fallback: A cinematic cloudy/glassy sky overlay
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuBEkEA9FZs3yOH-X27YqWR33J2WIgOCTxmBxf7Are0nNY3UGOAeMvyK57FCpppT37zaGDtrxMFxMPotUxdRWXPwM9yz4dyI7BfLnsrixOpO3HoGRuBrN822SUl7FgmSHsspGoR_DqBh_pyvk-KY4EXSeLXR9yMBXm843JSaysO9zt2e0UgfEgLrl966X3C4TT8oPOsDHz3Q1E40qrM9Ml5zT0wtcButW5VYiAe3sa0AWUi5G1zD4k01CDA5gVGGWBaE95J_g2Yg5qY9";
  };

  const getActivitiesAdvice = () => {
    if (!current) return null;
    const cond = (current.condition || "").toLowerCase();
    const temp = current.temp || 0;
    const wind = current.wind_speed || 0;
    const uv = current.uv_index || 0;

    const advice = {
      workout: { status: "Good", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Nice temperature for running or outdoor cycling." },
      gardening: { status: "Good", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Ideal conditions to trim and care for your plants." },
      dining: { status: "Great", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Comfortable breezes, perfect for dining out." },
      stargazing: { status: "Optimal", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Clear, cloudless skies expected tonight." }
    };

    if (cond.includes("storm") || cond.includes("thunderstorm") || wind >= 25) {
      advice.workout = { status: "Poor", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Severe winds & lightning hazard. Avoid outdoor tracks." };
      advice.gardening = { status: "Poor", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Secure pots and fragile plants from heavy storm." };
      advice.dining = { status: "Bad", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Severe stormy weather. Better dine indoors." };
      advice.stargazing = { status: "Bad", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Storm clouds and heavy rain will block visibility." };
    } else if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower")) {
      advice.workout = { status: "Fair", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", text: "Rain active. Bring water-resistant gear if running." };
      advice.gardening = { status: "Excellent", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Rain will water your garden naturally today." };
      advice.dining = { status: "Bad", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Wet and damp conditions. Outdoor seating closed." };
      advice.stargazing = { status: "Bad", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Overcast skies and rain will obstruct stargazing." };
    } else if (cond.includes("snow") || cond.includes("freeze") || (isCelsius ? temp <= 5 : temp <= 41)) {
      advice.workout = { status: "Poor", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Freezing temperatures. Prefer indoor workouts." };
      advice.gardening = { status: "Caution", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", text: "Protect delicate crops from ground frost." };
      advice.dining = { status: "Bad", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Freezing cold. Keep patio heaters on or stay inside." };
      advice.stargazing = { status: "Fair", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", text: "Cold but clear air can yield great night visibility." };
    } else if (uv >= 6 || (isCelsius ? temp >= 28 : temp >= 82)) {
      advice.workout = { status: "Caution", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", text: "High heat and UV exposure. Stay hydrated." };
      advice.gardening = { status: "Fair", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", text: "Water early in the morning to avoid evaporation." };
      advice.dining = { status: "Great", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Warm evening. Shaded areas recommended." };
      advice.stargazing = { status: "Excellent", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Clear and warm night. Perfect stargazing." };
    } else if (cond.includes("cloud") || cond.includes("overcast")) {
      advice.stargazing = { status: "Poor", color: "text-red-400 bg-red-400/10 border-red-500/20", text: "Heavy cloud cover will block celestial views." };
      advice.workout = { status: "Good", color: "text-green-400 bg-green-400/10 border-green-500/20", text: "Overcast skies keep it cool. Perfect for running." };
      advice.dining = { status: "Fair", color: "text-yellow-400 bg-yellow-400/10 border-yellow-500/20", text: "Slightly cloudy, but otherwise fine for outdoor dining." };
    }

    return advice;
  };

  const advice = getActivitiesAdvice();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
      {/* Left Column: Hero & Hourly */}
      <div className="xl:col-span-8 flex flex-col gap-gutter">
        {/* Main Weather Hero */}
        <section className="glass-card rounded-3xl p-6 md:p-10 relative overflow-hidden min-h-[320px] md:min-h-[380px] flex flex-col justify-center">
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center w-full min-w-0">
            <div className="space-y-4 w-full md:w-auto min-w-0">
              {localTimeStr && (
                <p className="font-label-caps text-label-caps text-primary text-xs sm:text-sm font-bold tracking-wider uppercase mb-1">
                  Local Time: {localTimeStr}
                </p>
              )}
              <div className="flex items-center gap-2 max-w-full min-w-0">
                <span className="material-symbols-outlined text-primary-fixed shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface text-xl sm:text-2xl md:text-3xl font-bold truncate">
                  {name}{state ? `, ${state}` : ""}{country ? ` (${country})` : ""}
                </h2>
              </div>
              
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-display-lg text-6xl sm:text-8xl md:text-[140px] leading-none text-primary font-bold">
                  {current.temp}°
                </h3>
                <div className="flex flex-col">
                  <p className="font-headline-lg text-headline-lg text-on-surface-variant text-lg sm:text-xl">
                    {current.condition}
                  </p>
                  <div className="flex gap-4 mt-1">
                    <span className="font-body-md text-on-surface font-semibold text-sm">
                      H: {current.temp_max}°
                    </span>
                    <span className="font-body-md text-on-surface-variant text-sm">
                      L: {current.temp_min}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-3 self-start md:self-auto w-full md:w-auto">
              <span 
                className="material-symbols-outlined text-6xl sm:text-[100px] md:text-[120px] weather-icon-glow text-primary-container" 
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {current.icon}
              </span>
              <div className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-full bg-primary-container/20 border border-primary/30 text-primary font-bold text-xs sm:text-sm">
                {current.description}
              </div>
            </div>
          </div>
        </section>

        {/* Hourly Forecast */}
        <section className="glass-card rounded-3xl p-4 md:p-card-padding">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant flex items-center gap-2 text-xs font-bold tracking-wider">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              Hourly Forecast
            </h4>
            <div className="flex bg-surface-container-highest/30 p-1 rounded-lg shrink-0">
              <button 
                onClick={() => setHourlyTab("24h")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  hourlyTab === "24h" ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="sm:hidden">24h</span>
                <span className="hidden sm:inline">24 Hours</span>
              </button>
              <button 
                onClick={() => setHourlyTab("precip")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  hourlyTab === "precip" ? "bg-primary/20 text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <span className="sm:hidden">Precip</span>
                <span className="hidden sm:inline">Precipitation</span>
              </button>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2">
            {hourly && hourly.length > 0 ? (
              hourly.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center gap-4 min-w-[75px] py-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                    idx === 0 ? "bg-white/5 border border-white/5" : ""
                  }`}
                >
                  <span className="font-label-caps text-label-caps text-on-surface-variant text-[11px] font-bold">
                    {item.time}
                  </span>
                  {hourlyTab === "24h" ? (
                    <>
                      <span 
                        className="material-symbols-outlined text-primary-container text-2xl"
                        style={{ fontVariationSettings: item.icon === "cloud" || item.icon === "sunny" ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {item.icon}
                      </span>
                      <span className="font-headline-lg text-lg text-on-surface font-bold">
                        {item.temp}°
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-tertiary-container text-2xl">
                        rainy
                      </span>
                      <span className="font-headline-lg text-lg text-tertiary-container font-bold">
                        {Math.max(0, 80 - idx * 8)}%
                      </span>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-on-surface-variant text-center w-full py-6">No hourly data available.</p>
            )}
          </div>
        </section>

        {/* Bento Grid for Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
          {/* UV Index */}
          <div className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">sunny</span>
              <span className="font-label-caps text-label-caps uppercase text-xs">UV Index</span>
            </div>
            <div className="space-y-1">
              <p className="font-data-lg text-data-lg text-on-surface text-3xl sm:text-4xl font-bold">{current.uv_index}</p>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">{current.uv_desc}</p>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (current.uv_index / 12) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Air Quality */}
          <div className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">air</span>
              <span className="font-label-caps text-label-caps uppercase text-xs">Air Quality</span>
            </div>
            <div className="space-y-1">
              <p className="font-data-lg text-data-lg text-on-surface text-3xl sm:text-4xl font-bold">{current.air_quality}</p>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">{current.air_desc}</p>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-green-400 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (current.air_quality / 150) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">airwave</span>
              <span className="font-label-caps text-label-caps uppercase text-xs">Wind</span>
            </div>
            <div className="space-y-1">
              <p className="font-data-lg text-data-lg text-on-surface text-4xl font-bold">
                {current.wind_speed}
                <span className="text-xl font-normal ml-1">mph</span>
              </p>
              <p className="font-body-md text-on-surface-variant text-sm">
                {current.wind_direction} Gusts {Math.round(current.wind_speed * 1.5)}
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <span 
                className="material-symbols-outlined text-primary-container text-2xl transition-transform" 
                style={{ 
                  fontVariationSettings: "'FILL' 1", 
                  transform: `rotate(${current.wind_deg}deg)` 
                }}
              >
                navigation
              </span>
            </div>
          </div>

          {/* Humidity */}
          <div className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">humidity_low</span>
              <span className="font-label-caps text-label-caps uppercase text-xs">Humidity</span>
            </div>
            <div className="space-y-1">
              <p className="font-data-lg text-data-lg text-on-surface text-3xl sm:text-4xl font-bold">
                {current.humidity}
                <span className="text-lg sm:text-xl font-normal ml-0.5">%</span>
              </p>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">Dew point {current.dew_point}°</p>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-secondary h-full transition-all duration-500" 
                style={{ width: `${current.humidity}%` }}
              ></div>
            </div>
          </div>

          {/* Visibility */}
          <div className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span className="font-label-caps text-label-caps uppercase text-xs">Visibility</span>
            </div>
            <div className="space-y-1">
              <p className="font-data-lg text-data-lg text-on-surface text-3xl sm:text-4xl font-bold">
                {current.visibility}
                <span className="text-lg sm:text-xl font-normal ml-0.5">mi</span>
              </p>
              <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">{current.visibility_desc}</p>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-tertiary-container h-full transition-all duration-500" 
                style={{ width: `${(current.visibility / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Sunrise/Sunset */}
          <div className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between min-h-[160px]">
            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
              <span className="material-symbols-outlined text-sm">wb_sunny</span>
              <span className="font-label-caps text-label-caps uppercase text-xs">Sunrise & Sunset</span>
            </div>
            <div className="flex-grow flex flex-col justify-center gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-on-surface-variant font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-yellow-500">sunny</span> Sunrise
                </span>
                <span className="font-headline-lg text-on-surface font-bold text-sm">{current.sunrise}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-1">
                <span className="text-xs text-on-surface-variant font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-orange-500">wb_twilight</span> Sunset
                </span>
                <span className="font-headline-lg text-on-surface font-bold text-sm">{current.sunset}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Right Column: 7-Day Forecast & Outdoor Activities Planner */}
      <div className="xl:col-span-4 flex flex-col gap-gutter">
        {/* 7-Day Outlook */}
        <section className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col justify-between">
          <div>
            <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant flex items-center gap-2 mb-6 text-xs font-bold tracking-wider">
              <span className="material-symbols-outlined text-sm">
                calendar_month
              </span>
              7-Day Outlook
            </h4>
            
            <div className="flex flex-col divide-y divide-white/10">
              {daily && daily.length > 0 ? (
                daily.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-5 group cursor-pointer hover:bg-white/5 px-2 rounded-xl transition-all">
                    <span className="w-16 font-headline-lg text-md text-on-surface font-semibold">
                      {item.day}
                    </span>
                    <span 
                      className={`material-symbols-outlined text-2xl ${
                        item.icon === "sunny" ? "text-primary-container" : item.icon === "rainy" ? "text-tertiary-fixed" : "text-primary"
                      }`}
                      style={{ fontVariationSettings: item.icon === "cloud" || item.icon === "sunny" ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {item.icon}
                    </span>
                    <div className="flex gap-2 sm:gap-4 items-center">
                      <span className="font-body-md text-on-surface-variant min-w-[32px] text-right text-sm">
                        {item.min}°
                      </span>
                      
                      {/* Range slider representation */}
                      <div className="w-12 sm:w-24 h-1.5 bg-white/10 rounded-full relative overflow-hidden">
                        <div 
                          className="absolute inset-y-0 bg-gradient-to-r from-tertiary to-primary rounded-full" 
                          style={{ 
                            left: item.widthLeft || "25%", 
                            right: item.widthRight || "25%" 
                          }}
                        ></div>
                      </div>
                      
                      <span className="font-body-md text-on-surface min-w-[32px] text-sm font-semibold">
                        {item.max}°
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-on-surface-variant text-center py-6">No outlook data available.</p>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab("alerts")}
            className="w-full mt-6 py-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary/20 transition-all duration-300"
          >
            Check Emergency Alerts
          </button>
        </section>

        {/* Outdoor Activities Planner */}
        {advice && (
          <section className="glass-card rounded-3xl p-4 md:p-card-padding flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">directions_run</span>
              <h4 className="font-label-caps text-label-caps uppercase text-on-surface-variant text-xs font-bold tracking-wider">
                Outdoor Activities Planner
              </h4>
            </div>

            <div className="flex flex-col gap-4">
              {/* Workout */}
              <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary text-xl mt-1">fitness_center</span>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface text-sm">Workouts & Cycling</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${advice.workout.color}`}>
                      {advice.workout.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {advice.workout.text}
                  </p>
                </div>
              </div>

              {/* Gardening */}
              <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary text-xl mt-1">yard</span>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface text-sm">Gardening & Care</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${advice.gardening.color}`}>
                      {advice.gardening.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {advice.gardening.text}
                  </p>
                </div>
              </div>

              {/* Dining */}
              <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary text-xl mt-1">local_cafe</span>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface text-sm">Picnics & Outdoor Dining</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${advice.dining.color}`}>
                      {advice.dining.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {advice.dining.text}
                  </p>
                </div>
              </div>

              {/* Stargazing */}
              <div className="flex items-start gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="material-symbols-outlined text-primary text-xl mt-1">nights_stay</span>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-on-surface text-sm">Stargazing & Sky Views</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${advice.stargazing.color}`}>
                      {advice.stargazing.status}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {advice.stargazing.text}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
