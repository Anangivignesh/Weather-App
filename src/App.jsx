import React from "react";
import { WeatherProvider, useWeather } from "./context/WeatherContext";
import Header from "./components/Header";
import DashboardView from "./components/DashboardView";
import MapView from "./components/MapView";
import AlertsView from "./components/AlertsView";
import LocationsView from "./components/LocationsView";
import "./App.css";

function WeatherAppContent() {
  const { activeTab, themeClass, setActiveTab, weatherData } = useWeather();

  const renderActiveView = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "map":
        return <MapView />;
      case "alerts":
        return <AlertsView />;
      case "locations":
        return <LocationsView />;
      default:
        return <DashboardView />;
    }
  };

  // Dynamic radial gradients mimicking a living atmosphere
  const getBackgroundStyle = () => {
    const isDay = weatherData?.current?.isDay;
    if (isDay) {
      if (themeClass === "sunny-day") {
        return { background: "radial-gradient(circle at top right, #fff4e0 0%, #f8f9ff 100%)" };
      }
      return { background: "radial-gradient(circle at top right, #e5eeff 0%, #f8f9ff 100%)" };
    } else {
      if (themeClass === "stormy-night") {
        return { background: "radial-gradient(circle at top right, #240a3e 0%, #030814 100%)" };
      }
      return { background: "radial-gradient(circle at top right, #111c2d 0%, #081425 100%)" };
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col transition-all duration-700 ease-in-out pb-16 md:pb-0"
      style={getBackgroundStyle()}
    >
      <Header />
      
      {/* Main Content Canvas */}
      <main className="flex-grow p-container-margin py-8">
        {renderActiveView()}
      </main>

      {/* Shared Footer */}
      <footer className="w-full py-8 px-container-margin flex flex-col md:flex-row justify-between items-center text-center mt-auto bg-surface-dim/30 backdrop-blur-xl border-t border-white/10 text-on-surface-variant z-10">
        <div className="mb-4 md:mb-0 text-left">
          <div className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold text-base mb-1">
            Aether Weather
          </div>
          <p className="font-body-md text-xs opacity-70">
            © 2026 Weather Dashboard. Live data powered by OpenWeather One Call API 4.0.
          </p>
        </div>
        <div className="flex gap-6 text-xs font-semibold">
          <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/50">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/50">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors hover:underline decoration-primary/50">Data Sources</a>
        </div>
      </footer>

      {/* Bottom Sticky Navigation Tray - Mobile Screens only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--surface-container-lowest)]/85 border-t border-[var(--outline-variant)] px-6 py-2.5 flex justify-around items-center z-50 shadow-2xl backdrop-blur-xl">
        <button 
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "dashboard" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === "dashboard" ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
          <span className="text-[9px] uppercase font-bold tracking-wider">Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab("map")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "map" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === "map" ? "'FILL' 1" : "'FILL' 0" }}>map</span>
          <span className="text-[9px] uppercase font-bold tracking-wider">Radar Map</span>
        </button>
        <button 
          onClick={() => setActiveTab("alerts")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "alerts" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === "alerts" ? "'FILL' 1" : "'FILL' 0" }}>warning</span>
          <span className="text-[9px] uppercase font-bold tracking-wider">Alerts</span>
        </button>
        <button 
          onClick={() => setActiveTab("locations")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "locations" ? "text-primary" : "text-on-surface-variant"}`}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: activeTab === "locations" ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
          <span className="text-[9px] uppercase font-bold tracking-wider">Settings</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WeatherProvider>
      <WeatherAppContent />
    </WeatherProvider>
  );
}
