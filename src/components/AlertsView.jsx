import React, { useState, useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

// Micro-component for countdown timer
function AlertCountdown({ initialSeconds }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatTime = () => {
    if (secondsLeft <= 0) return "EXPIRED";
    const hrs = Math.floor(secondsLeft / 3600);
    const mins = Math.floor((secondsLeft % 3600) / 60);
    const secs = secondsLeft % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col text-right">
      <span className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wider uppercase">Expires In</span>
      <span className="font-data-lg text-data-lg text-on-surface text-3xl font-bold font-mono tracking-tight mt-0.5">
        {formatTime()}
      </span>
    </div>
  );
}

export default function AlertsView() {
  const { detailedAlerts, activeLocation } = useWeather();
  const [checklist, setChecklist] = useState([
    { text: "Ensure backup batteries are fully charged", checked: true },
    { text: "Fill all water storage containers", checked: true },
    { text: "Identify interior safe-room in home", checked: true },
    { text: "Secure patio furniture and bins", checked: false }
  ]);

  const toggleCheck = (idx) => {
    setChecklist(prev =>
      prev.map((item, i) => (i === idx ? { ...item, checked: !item.checked } : item))
    );
  };

  // If there are no severe alerts active for this location, we fall back to Portland's mock warnings
  // so the user can see how beautiful the warnings are. We show a banner that they are demoing active alerts.
  const hasLocalAlerts = detailedAlerts.length > 0;
  
  // Portland alerts as demo fallback
  const demoAlerts = [
    {
      id: "alert_001",
      sender_name: "NWS Portland (Oregon)",
      event: "Flash Flood Warning",
      severity: "SEVERE WARNING",
      end: Math.floor(Date.now() / 1000) + 7940, // ~02:12:20
      description: "Excessive runoff from heavy rainfall will cause flooding of small creeks and streams, urban areas, highways, streets, and underpasses as well as other drainage areas and low-lying spots. Turn around, don't drown when encountering flooded roads.",
      affected_areas: ["South Cascades", "Portland Metro", "Willamette Valley"]
    },
    {
      id: "alert_002",
      sender_name: "NWS Portland (Oregon)",
      event: "High Wind Advisory",
      severity: "ADVISORY",
      end: Math.floor(Date.now() / 1000) + 14400,
      description: "Northwest winds 25 to 35 mph with gusts up to 55 mph expected. Secure outdoor objects and furniture."
    },
    {
      id: "alert_003",
      sender_name: "NWS Weather Center",
      event: "Winter Mix Update",
      severity: "INFORMATION",
      end: Math.floor(Date.now() / 1000) + 28800,
      description: "Light freezing rain and sleet possible for elevations above 1500ft later this evening."
    }
  ];

  const activeAlerts = hasLocalAlerts ? detailedAlerts : demoAlerts;

  const severeAlert = activeAlerts.find(a => a.severity === "SEVERE WARNING" || a.event.includes("Warning"));
  const otherAlerts = activeAlerts.filter(a => a.id !== severeAlert?.id);

  // Expiration calculation helper
  const getSecondsUntil = (unixEndTime) => {
    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, unixEndTime - now);
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="font-headline-lg text-primary text-3xl font-bold mb-2">Severe Alerts</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Real-time hazardous weather notifications and emergency guidance for your current vicinity and saved locations.
          </p>
        </div>
        {!hasLocalAlerts && (
          <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            Alert Demo Mode (Showing Portland, OR Alerts)
          </div>
        )}
      </section>

      {/* Active Alerts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: High Priority Warning (Red Card) */}
        {severeAlert ? (
          <div className="lg:col-span-8">
            <div className="glass-card-warning rounded-3xl p-card-padding flex flex-col gap-6 relative overflow-hidden">
              
              {/* Background storm icon overlay */}
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none z-0">
                <span className="material-symbols-outlined text-9xl text-error glow-red">storm</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-error/20 flex items-center justify-center text-error border border-error/30 shadow-lg">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-label-caps text-error block text-[10px] font-bold tracking-wider uppercase">
                      {severeAlert.severity || "SEVERE WARNING"}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface text-2xl font-bold">
                      {severeAlert.event}
                    </h2>
                  </div>
                </div>
                
                {severeAlert.end && (
                  <AlertCountdown initialSeconds={getSecondsUntil(severeAlert.end)} />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8 z-10">
                <div className="flex flex-col gap-4">
                  {severeAlert.affected_areas && (
                    <div className="space-y-2">
                      <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wider uppercase font-bold">Affected Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {severeAlert.affected_areas.map((area, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-on-surface">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wider uppercase font-bold">Description</p>
                    <p className="font-body-md text-body-md text-on-surface/85 leading-relaxed text-sm">
                      {severeAlert.description}
                    </p>
                  </div>
                </div>

                {/* Radar map overlay visual */}
                <div className="glass-card rounded-2xl p-4 flex flex-col gap-4 overflow-hidden min-h-[220px]">
                  <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px] tracking-wider uppercase font-bold">Impact Radar</p>
                  <img 
                    alt="Radar map of warning area" 
                    className="w-full h-full object-cover rounded-xl opacity-80" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoT_SjsUx_Wbil5fptEKbk2bhHRPiR-XPLzTneFgaJorfSmKId3yeMTRFbt1onyMaDJiat1VJrxL9IstRUQ0j14qg-QpczOqC-lUWB06J8o0ksm0gfMsvZuSHjwcvW1yvGn16mOt25Vi0VytfvAPyiKPLA8-MBzUMJa5fhKOYBdRb8FqvpPXs9aTV9eZyYLj4u5xnYqvQWCZQaO-CIW5MCe9auDmOWUn63xzQiSRC8dFO0P9N1IO9ZN4AUH9jt44J3mRWnyEk5-LmT"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 z-10 border-t border-white/5 pt-4">
                <button className="flex-1 py-3.5 rounded-xl bg-error text-on-error font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm">
                  <span className="material-symbols-outlined text-lg">share</span> Broadcast Alert
                </button>
                <button className="flex-1 py-3.5 rounded-xl border border-error/30 text-error font-bold flex items-center justify-center gap-2 hover:bg-error/10 transition-all text-sm">
                  <span className="material-symbols-outlined text-lg">map</span> View Local Shelters
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 flex items-center justify-center min-h-[350px] glass-card rounded-3xl p-6">
            <div className="text-center space-y-2">
              <span className="material-symbols-outlined text-5xl text-green-400">check_circle</span>
              <h3 className="text-xl font-bold text-on-surface">No Active Warnings</h3>
              <p className="text-sm text-on-surface-variant max-w-sm">There are no severe weather hazards reported in your immediate coordinates.</p>
            </div>
          </div>
        )}

        {/* Right: Secondary Advisories */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {otherAlerts.length > 0 ? (
            otherAlerts.map((alert, idx) => {
              const isAdvisory = alert.severity === "ADVISORY" || alert.event.includes("Advisory");
              return (
                <div 
                  key={idx}
                  className={`rounded-3xl p-card-padding flex flex-col gap-4 border ${
                    isAdvisory 
                      ? "glass-card-advisory border-primary/20" 
                      : "glass-card border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      isAdvisory ? "bg-primary/20 text-primary" : "bg-tertiary-container/20 text-tertiary"
                    }`}>
                      <span className="material-symbols-outlined">
                        {isAdvisory ? "air" : "cloudy_snowing"}
                      </span>
                    </div>
                    <div>
                      <span className={`font-label-caps text-label-caps block text-[10px] font-bold uppercase ${
                        isAdvisory ? "text-primary-fixed" : "text-tertiary"
                      }`}>
                        {alert.severity || "INFORMATION"}
                      </span>
                      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface text-base font-bold">
                        {alert.event}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="font-body-md text-body-md text-on-surface/75 text-sm leading-relaxed">
                    {alert.description}
                  </p>
                  
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2 text-xs">
                    <span className="text-on-surface-variant font-label-caps text-label-caps font-bold">
                      {isAdvisory ? "EFFECTIVE UNTIL 8PM" : "POSTED 12 MIN AGO"}
                    </span>
                    <button className={`font-bold text-xs hover:underline ${
                      isAdvisory ? "text-primary" : "text-tertiary"
                    }`}>
                      DETAILS
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="glass-card rounded-3xl p-card-padding flex items-center justify-center h-full text-on-surface-variant text-center text-sm">
              No secondary warnings active.
            </div>
          )}
        </div>
      </section>

      {/* Evacuation & Safety Grid (Bento Box) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Evacuation Route Card */}
        <div className="md:col-span-2 glass-card rounded-3xl p-8 overflow-hidden relative group min-h-[300px]">
          <div className="flex flex-col h-full relative z-10 justify-between">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-2xl font-bold mb-4">Evacuation Routes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                    <span className="font-bold text-on-surface text-sm">I-5 Corridor (Southbound)</span>
                  </div>
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider">FLOW: LIGHT TRAFFIC</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-primary">directions_car</span>
                    <span className="font-bold text-on-surface text-sm">Highway 26 (Westbound)</span>
                  </div>
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">FLOW: HEAVY CONGESTION</p>
                </div>
              </div>
            </div>
            
            <button className="mt-6 inline-flex items-center gap-2 text-primary font-bold group text-sm self-start">
              Open Evacuation Map 
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-md">arrow_forward</span>
            </button>
          </div>

          {/* Map abstract graphics */}
          <div className="absolute inset-0 opacity-10 grayscale group-hover:opacity-15 group-hover:grayscale-0 transition-all duration-700 pointer-events-none">
            <img 
              alt="Evacuation map visualization" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYuqcMHDMkn_RSd_uAQ_uRB6NswSHiIT3VxCJ1lysDH4CAhPM1NNVY9Yj_vni_yoae2c0DZ6HeH1NkSdwELRaLG04F6blksJjADzDXwVmvKcEsMVebnOMMw0DQLb4eNGH0dxOoOMHNcBpcVEEHtgl6cJ7dFRzfKhde9vrDRiwLn07E9hk2DWcPShrLBe0HvuRAlN_mmezQVQERbwEY8aDXHc7gZmXWE3HMHEgt8Td8wN9y8XmFyXxjkMJsZYTCP-92q81t0t59nFmZ"
            />
          </div>
        </div>

        {/* Safety Checklist Card */}
        <div className="glass-card rounded-3xl p-8 bg-surface-container/30 border border-white/10 flex flex-col justify-between">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-2xl font-bold mb-6">Safety Checklist</h2>
            <ul className="space-y-4">
              {checklist.map((item, idx) => (
                <li 
                  key={idx} 
                  className={`flex items-start gap-3 cursor-pointer transition-opacity ${item.checked ? "" : "opacity-60"}`}
                  onClick={() => toggleCheck(idx)}
                >
                  <span className={`material-symbols-outlined text-lg ${item.checked ? "text-primary-fixed-dim" : "text-on-surface-variant"}`}>
                    {item.checked ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  <span className="font-body-md text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full mt-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-on-surface font-bold text-sm transition-all">
            View Complete Guide
          </button>
        </div>
      </section>
    </div>
  );
}
