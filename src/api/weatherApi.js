// OpenWeather One Call API 4.0 Client with High-Fidelity Mock Data Fallbacks

// Cache or store API key. Real calls are made if a key is provided.
const BASE_URL = "https://api.openweathermap.org";

// High-fidelity Mock Data matching Stitch designs
export const MOCK_CITIES = {
  "san francisco": {
    name: "San Francisco",
    state: "CA",
    country: "US",
    lat: 37.7749,
    lon: -122.4194,
    current: {
      temp: 68,
      feels_like: 66,
      temp_min: 61,
      temp_max: 72,
      condition: "Cloudy",
      description: "Expected to clear by 8 PM",
      icon: "cloud", // Material icon name
      uv_index: 4,
      uv_desc: "Moderate",
      air_quality: 22,
      air_desc: "Excellent",
      wind_speed: 12,
      wind_direction: "NW",
      wind_deg: 315,
      humidity: 74,
      dew_point: 58,
      visibility: 10,
      visibility_desc: "Perfectly clear",
      sunrise: "6:12 AM",
      sunset: "6:42 PM",
      isDay: true,
      alerts: []
    },
    hourly: [
      { time: "Now", temp: 68, icon: "cloud" },
      { time: "1 PM", temp: 69, icon: "partly_cloudy_day" },
      { time: "2 PM", temp: 71, icon: "partly_cloudy_day" },
      { time: "3 PM", temp: 72, icon: "sunny" },
      { time: "4 PM", temp: 72, icon: "sunny" },
      { time: "5 PM", temp: 70, icon: "partly_cloudy_day" },
      { time: "6 PM", temp: 67, icon: "wb_twilight" },
      { time: "7 PM", temp: 64, icon: "bedtime" },
      { time: "8 PM", temp: 62, icon: "bedtime" },
      { time: "9 PM", temp: 61, icon: "bedtime" },
    ],
    daily: [
      { day: "Today", condition: "cloud", min: 61, max: 72, widthLeft: "20%", widthRight: "20%", icon: "cloud" },
      { day: "Mon", condition: "partly_cloudy_day", min: 62, max: 75, widthLeft: "30%", widthRight: "10%", icon: "partly_cloudy_day" },
      { day: "Tue", condition: "sunny", min: 65, max: 82, widthLeft: "45%", widthRight: "5%", icon: "sunny" },
      { day: "Wed", condition: "sunny", min: 68, max: 88, widthLeft: "55%", widthRight: "0%", icon: "sunny" },
      { day: "Thu", condition: "cloudy_snowing", min: 58, max: 64, widthLeft: "10%", widthRight: "40%", icon: "cloudy_snowing" },
      { day: "Fri", condition: "rainy", min: 54, max: 59, widthLeft: "0%", widthRight: "60%", icon: "rainy" },
      { day: "Sat", condition: "partly_cloudy_day", min: 59, max: 68, widthLeft: "15%", widthRight: "30%", icon: "partly_cloudy_day" },
    ]
  },
  "portland": {
    name: "Portland",
    state: "OR",
    country: "US",
    lat: 45.5152,
    lon: -122.6784,
    current: {
      temp: 54,
      feels_like: 48,
      temp_min: 50,
      temp_max: 58,
      condition: "Stormy",
      description: "Heavy rainfall and strong winds active",
      icon: "thunderstorm",
      uv_index: 1,
      uv_desc: "Low",
      air_quality: 15,
      air_desc: "Excellent",
      wind_speed: 28,
      wind_direction: "NW",
      wind_deg: 310,
      humidity: 92,
      dew_point: 52,
      visibility: 4,
      visibility_desc: "Heavy mist",
      sunrise: "5:42 AM",
      sunset: "8:56 PM",
      isDay: false,
      alerts: ["alert_001", "alert_002", "alert_003"]
    },
    hourly: [
      { time: "Now", temp: 54, icon: "thunderstorm" },
      { time: "1 PM", temp: 53, icon: "rainy" },
      { time: "2 PM", temp: 54, icon: "rainy" },
      { time: "3 PM", temp: 52, icon: "thunderstorm" },
      { time: "4 PM", temp: 51, icon: "thunderstorm" },
      { time: "5 PM", temp: 52, icon: "rainy" },
      { time: "6 PM", temp: 50, icon: "rainy" },
      { time: "7 PM", temp: 49, icon: "rainy" },
      { time: "8 PM", temp: 48, icon: "rainy" },
      { time: "9 PM", temp: 47, icon: "bedtime" },
    ],
    daily: [
      { day: "Today", condition: "thunderstorm", min: 50, max: 58, widthLeft: "10%", widthRight: "50%", icon: "thunderstorm" },
      { day: "Mon", condition: "rainy", min: 48, max: 55, widthLeft: "5%", widthRight: "60%", icon: "rainy" },
      { day: "Tue", condition: "rainy", min: 49, max: 57, widthLeft: "8%", widthRight: "55%", icon: "rainy" },
      { day: "Wed", condition: "cloud", min: 51, max: 62, widthLeft: "15%", widthRight: "40%", icon: "cloud" },
      { day: "Thu", condition: "partly_cloudy_day", min: 52, max: 65, widthLeft: "20%", widthRight: "30%", icon: "partly_cloudy_day" },
      { day: "Fri", condition: "sunny", min: 55, max: 70, widthLeft: "35%", widthRight: "15%", icon: "sunny" },
      { day: "Sat", condition: "sunny", min: 57, max: 72, widthLeft: "40%", widthRight: "10%", icon: "sunny" },
    ]
  },
  "london": {
    name: "London",
    state: "",
    country: "UK",
    lat: 51.5074,
    lon: -0.1278,
    current: {
      temp: 14,
      feels_like: 13,
      temp_min: 11,
      temp_max: 16,
      condition: "Overcast",
      description: "Light drizzle expected in afternoon",
      icon: "cloud",
      uv_index: 2,
      uv_desc: "Low",
      air_quality: 45,
      air_desc: "Good",
      wind_speed: 10,
      wind_direction: "NE",
      wind_deg: 45,
      humidity: 82,
      dew_point: 11,
      visibility: 8,
      visibility_desc: "Passing mist",
      sunrise: "4:43 AM",
      sunset: "9:21 PM",
      isDay: true,
      alerts: []
    },
    hourly: [
      { time: "Now", temp: 14, icon: "cloud" },
      { time: "1 PM", temp: 15, icon: "cloud" },
      { time: "2 PM", temp: 15, icon: "rainy" },
      { time: "3 PM", temp: 16, icon: "rainy" },
      { time: "4 PM", temp: 16, icon: "cloud" },
      { time: "5 PM", temp: 15, icon: "cloud" },
      { time: "6 PM", temp: 14, icon: "partly_cloudy_day" },
      { time: "7 PM", temp: 13, icon: "partly_cloudy_day" },
      { time: "8 PM", temp: 12, icon: "bedtime" },
      { time: "9 PM", temp: 11, icon: "bedtime" },
    ],
    daily: [
      { day: "Today", condition: "cloud", min: 11, max: 16, widthLeft: "20%", widthRight: "40%", icon: "cloud" },
      { day: "Mon", condition: "rainy", min: 10, max: 15, widthLeft: "15%", widthRight: "50%", icon: "rainy" },
      { day: "Tue", condition: "partly_cloudy_day", min: 12, max: 18, widthLeft: "30%", widthRight: "25%", icon: "partly_cloudy_day" },
      { day: "Wed", condition: "sunny", min: 14, max: 21, widthLeft: "45%", widthRight: "10%", icon: "sunny" },
      { day: "Thu", condition: "sunny", min: 15, max: 23, widthLeft: "50%", widthRight: "5%", icon: "sunny" },
      { day: "Fri", condition: "cloud", min: 13, max: 19, widthLeft: "35%", widthRight: "20%", icon: "cloud" },
      { day: "Sat", condition: "rainy", min: 11, max: 15, widthLeft: "20%", widthRight: "45%", icon: "rainy" },
    ]
  },
  "tokyo": {
    name: "Tokyo",
    state: "",
    country: "JP",
    lat: 35.6762,
    lon: 139.6503,
    current: {
      temp: 22,
      feels_like: 22,
      temp_min: 18,
      temp_max: 24,
      condition: "Clear Skies",
      description: "Perfect conditions for outdoor events",
      icon: "sunny",
      uv_index: 8,
      uv_desc: "Very High",
      air_quality: 55,
      air_desc: "Moderate",
      wind_speed: 6,
      wind_direction: "S",
      wind_deg: 180,
      humidity: 50,
      dew_point: 11,
      visibility: 10,
      visibility_desc: "Perfectly clear",
      sunrise: "4:25 AM",
      sunset: "6:57 PM",
      isDay: true,
      alerts: []
    },
    hourly: [
      { time: "Now", temp: 22, icon: "sunny" },
      { time: "1 PM", temp: 23, icon: "sunny" },
      { time: "2 PM", temp: 24, icon: "sunny" },
      { time: "3 PM", temp: 24, icon: "sunny" },
      { time: "4 PM", temp: 23, icon: "sunny" },
      { time: "5 PM", temp: 22, icon: "sunny" },
      { time: "6 PM", temp: 20, icon: "wb_twilight" },
      { time: "7 PM", temp: 19, icon: "bedtime" },
      { time: "8 PM", temp: 18, icon: "bedtime" },
      { time: "9 PM", temp: 18, icon: "bedtime" },
    ],
    daily: [
      { day: "Today", condition: "sunny", min: 18, max: 24, widthLeft: "40%", widthRight: "20%", icon: "sunny" },
      { day: "Mon", condition: "sunny", min: 19, max: 26, widthLeft: "45%", widthRight: "10%", icon: "sunny" },
      { day: "Tue", condition: "sunny", min: 20, max: 28, widthLeft: "50%", widthRight: "5%", icon: "sunny" },
      { day: "Wed", condition: "partly_cloudy_day", min: 18, max: 23, widthLeft: "40%", widthRight: "25%", icon: "partly_cloudy_day" },
      { day: "Thu", condition: "rainy", min: 15, max: 19, widthLeft: "20%", widthRight: "60%", icon: "rainy" },
      { day: "Fri", condition: "cloud", min: 17, max: 22, widthLeft: "30%", widthRight: "35%", icon: "cloud" },
      { day: "Sat", condition: "sunny", min: 19, max: 25, widthLeft: "45%", widthRight: "15%", icon: "sunny" },
    ]
  },
  "paris": {
    name: "Paris",
    state: "",
    country: "FR",
    lat: 48.8566,
    lon: 2.3522,
    current: {
      temp: 4,
      feels_like: 1,
      temp_min: 2,
      temp_max: 6,
      condition: "Light Snow",
      description: "Accumulation around 1cm expected",
      icon: "cloudy_snowing",
      uv_index: 1,
      uv_desc: "Low",
      air_quality: 35,
      air_desc: "Excellent",
      wind_speed: 15,
      wind_direction: "N",
      wind_deg: 0,
      humidity: 88,
      dew_point: 2,
      visibility: 6,
      visibility_desc: "Snow haze",
      sunrise: "5:47 AM",
      sunset: "9:50 PM",
      isDay: true,
      alerts: []
    },
    hourly: [
      { time: "Now", temp: 4, icon: "cloudy_snowing" },
      { time: "1 PM", temp: 4, icon: "cloudy_snowing" },
      { time: "2 PM", temp: 5, icon: "cloudy_snowing" },
      { time: "3 PM", temp: 5, icon: "cloud" },
      { time: "4 PM", temp: 6, icon: "cloud" },
      { time: "5 PM", temp: 5, icon: "cloud" },
      { time: "6 PM", temp: 4, icon: "cloudy_snowing" },
      { time: "7 PM", temp: 3, icon: "cloudy_snowing" },
      { time: "8 PM", temp: 2, icon: "bedtime" },
      { time: "9 PM", temp: 2, icon: "bedtime" },
    ],
    daily: [
      { day: "Today", condition: "cloudy_snowing", min: 2, max: 6, widthLeft: "10%", widthRight: "70%", icon: "cloudy_snowing" },
      { day: "Mon", condition: "cloudy_snowing", min: 1, max: 5, widthLeft: "5%", widthRight: "80%", icon: "cloudy_snowing" },
      { day: "Tue", condition: "cloud", min: 2, max: 7, widthLeft: "15%", widthRight: "65%", icon: "cloud" },
      { day: "Wed", condition: "partly_cloudy_day", min: 3, max: 9, widthLeft: "25%", widthRight: "50%", icon: "partly_cloudy_day" },
      { day: "Thu", condition: "sunny", min: 4, max: 11, widthLeft: "35%", widthRight: "30%", icon: "sunny" },
      { day: "Fri", condition: "sunny", min: 5, max: 12, widthLeft: "40%", widthRight: "25%", icon: "sunny" },
      { day: "Sat", condition: "cloudy_snowing", min: 2, max: 6, widthLeft: "10%", widthRight: "70%", icon: "cloudy_snowing" },
    ]
  },
  "new york": {
    name: "New York",
    state: "NY",
    country: "US",
    lat: 40.7128,
    lon: -74.0060,
    current: {
      temp: 18,
      feels_like: 17,
      temp_min: 15,
      temp_max: 20,
      condition: "Moderate Rain",
      description: "Rain easing by late evening",
      icon: "rainy",
      uv_index: 2,
      uv_desc: "Low",
      air_quality: 42,
      air_desc: "Good",
      wind_speed: 16,
      wind_direction: "E",
      wind_deg: 90,
      humidity: 85,
      dew_point: 15,
      visibility: 8,
      visibility_desc: "Light mist",
      sunrise: "5:24 AM",
      sunset: "8:30 PM",
      isDay: true,
      alerts: []
    },
    hourly: [
      { time: "Now", temp: 18, icon: "rainy" },
      { time: "1 PM", temp: 19, icon: "rainy" },
      { time: "2 PM", temp: 19, icon: "rainy" },
      { time: "3 PM", temp: 20, icon: "cloud" },
      { time: "4 PM", temp: 20, icon: "cloud" },
      { time: "5 PM", temp: 19, icon: "partly_cloudy_day" },
      { time: "6 PM", temp: 18, icon: "partly_cloudy_day" },
      { time: "7 PM", temp: 17, icon: "bedtime" },
      { time: "8 PM", temp: 16, icon: "bedtime" },
      { time: "9 PM", temp: 15, icon: "bedtime" },
    ],
    daily: [
      { day: "Today", condition: "rainy", min: 15, max: 20, widthLeft: "25%", widthRight: "40%", icon: "rainy" },
      { day: "Mon", condition: "cloud", min: 16, max: 22, widthLeft: "30%", widthRight: "30%", icon: "cloud" },
      { day: "Tue", condition: "sunny", min: 18, max: 25, widthLeft: "45%", widthRight: "15%", icon: "sunny" },
      { day: "Wed", condition: "sunny", min: 20, max: 27, widthLeft: "55%", widthRight: "5%", icon: "sunny" },
      { day: "Thu", condition: "rainy", min: 16, max: 21, widthLeft: "30%", widthRight: "40%", icon: "rainy" },
      { day: "Fri", condition: "rainy", min: 15, max: 19, widthLeft: "25%", widthRight: "50%", icon: "rainy" },
      { day: "Sat", condition: "partly_cloudy_day", min: 17, max: 23, widthLeft: "35%", widthRight: "25%", icon: "partly_cloudy_day" },
    ]
  }
};

export const MOCK_ALERTS = {
  "alert_001": {
    id: "alert_001",
    sender_name: "NWS Portland (Oregon)",
    event: "Flash Flood Warning",
    severity: "SEVERE WARNING",
    start: Math.floor(Date.now() / 1000),
    end: Math.floor(Date.now() / 1000) + 7940, // expires in ~02:12:20
    description: "Excessive runoff from heavy rainfall will cause flooding of small creeks and streams, urban areas, highways, streets, and underpasses as well as other drainage areas and low-lying spots. Turn around, don't drown when encountering flooded roads.",
    affected_areas: ["South Cascades", "Portland Metro", "Willamette Valley"]
  },
  "alert_002": {
    id: "alert_002",
    sender_name: "NWS Portland (Oregon)",
    event: "High Wind Advisory",
    severity: "ADVISORY",
    start: Math.floor(Date.now() / 1000),
    end: Math.floor(Date.now() / 1000) + 14400, // expires tonight
    description: "Northwest winds 25 to 35 mph with gusts up to 55 mph expected. Secure outdoor objects and furniture."
  },
  "alert_003": {
    id: "alert_003",
    sender_name: "NWS Weather Center",
    event: "Winter Mix Update",
    severity: "INFORMATION",
    start: Math.floor(Date.now() / 1000) - 720, // posted 12 min ago
    end: Math.floor(Date.now() / 1000) + 28800,
    description: "Light freezing rain and sleet possible for elevations above 1500ft later this evening."
  }
};

// Map condition codes from API to Material icons
export function getConditionIcon(apiIconCode) {
  // apiIconCode is like '01d', '02n', '09d', '11d', etc.
  const prefix = apiIconCode ? apiIconCode.substring(0, 2) : "";
  const isDay = apiIconCode ? apiIconCode.endsWith("d") : true;

  switch (prefix) {
    case "01": // clear
      return isDay ? "sunny" : "bedtime";
    case "02": // partly cloudy
      return isDay ? "partly_cloudy_day" : "bedtime";
    case "03": // scattered clouds
    case "04": // broken/overcast clouds
      return "cloud";
    case "09": // shower rain
    case "10": // rain
      return "rainy";
    case "11": // thunderstorm
      return "thunderstorm";
    case "13": // snow
      return "cloudy_snowing";
    case "50": // mist/fog
      return "air";
    default:
      return "cloud";
  }
}

// Convert temperature from Kelvin
export function formatTemp(k, isCelsius) {
  if (isCelsius) {
    return Math.round(k - 273.15);
  } else {
    return Math.round((k - 273.15) * 9/5 + 32);
  }
}

// Fetch Live Data or return Fallback Mock Data
export async function getWeatherData(lat, lon, apiKey, isCelsius = true) {
  if (!apiKey) {
    // Return mock data for coords matching a default city
    // Find closest city
    let selectedCityKey = "san francisco";
    let minDistance = Infinity;

    Object.keys(MOCK_CITIES).forEach(key => {
      const city = MOCK_CITIES[key];
      const dist = Math.pow(city.lat - lat, 2) + Math.pow(city.lon - lon, 2);
      if (dist < minDistance) {
        minDistance = dist;
        selectedCityKey = key;
      }
    });

    const mockCity = JSON.parse(JSON.stringify(MOCK_CITIES[selectedCityKey]));
    
    // Add timezone offset
    const offsets = {
      "san francisco": -25200,
      "portland": -25200,
      "london": 3600,
      "tokyo": 32400,
      "paris": 7200,
      "new york": -14400
    };
    mockCity.timezone_offset = offsets[selectedCityKey] || 0;

    // Calculate current local hour in target city dynamically
    const localTime = new Date(Date.now() + (mockCity.timezone_offset * 1000));
    const localHour = localTime.getUTCHours();
    mockCity.current.isDay = localHour >= 6 && localHour < 20;

    // Perform Celsius / Fahrenheit translation for mock data
    if (!isCelsius) {
      // Convert mock temperatures to Fahrenheit (already Fahrenheit for SF by default, let's normalize)
      // The default mock templates are SF in Fahrenheit and others in Celsius. Let's adjust based on choice.
      const multiplier = isCelsius ? 1 : 1; // San Francisco default is F, others C
      if (selectedCityKey !== "san francisco") {
        // SF is in Fahrenheit (temp: 68). Others are Celsius (temp: 14, 22, 4, 18).
        // Convert others to Fahrenheit
        mockCity.current.temp = Math.round(mockCity.current.temp * 9/5 + 32);
        mockCity.current.feels_like = Math.round(mockCity.current.feels_like * 9/5 + 32);
        mockCity.current.temp_min = Math.round(mockCity.current.temp_min * 9/5 + 32);
        mockCity.current.temp_max = Math.round(mockCity.current.temp_max * 9/5 + 32);
        mockCity.current.dew_point = Math.round(mockCity.current.dew_point * 9/5 + 32);

        mockCity.hourly.forEach(item => {
          item.temp = Math.round(item.temp * 9/5 + 32);
        });
        mockCity.daily.forEach(item => {
          item.min = Math.round(item.min * 9/5 + 32);
          item.max = Math.round(item.max * 9/5 + 32);
        });
      } else {
        // If it is SF but we requested CELSIUS, convert SF to Celsius
        if (isCelsius) {
          mockCity.current.temp = Math.round((mockCity.current.temp - 32) * 5/9);
          mockCity.current.feels_like = Math.round((mockCity.current.feels_like - 32) * 5/9);
          mockCity.current.temp_min = Math.round((mockCity.current.temp_min - 32) * 5/9);
          mockCity.current.temp_max = Math.round((mockCity.current.temp_max - 32) * 5/9);
          mockCity.current.dew_point = Math.round((mockCity.current.dew_point - 32) * 5/9);

          mockCity.hourly.forEach(item => {
            item.temp = Math.round((item.temp - 32) * 5/9);
          });
          mockCity.daily.forEach(item => {
            item.min = Math.round((item.min - 32) * 5/9);
            item.max = Math.round((item.max - 32) * 5/9);
          });
        }
      }
    } else {
      // User wants Celsius, and SF is Fahrenheit: convert SF to Celsius
      if (selectedCityKey === "san francisco") {
        mockCity.current.temp = Math.round((mockCity.current.temp - 32) * 5/9);
        mockCity.current.feels_like = Math.round((mockCity.current.feels_like - 32) * 5/9);
        mockCity.current.temp_min = Math.round((mockCity.current.temp_min - 32) * 5/9);
        mockCity.current.temp_max = Math.round((mockCity.current.temp_max - 32) * 5/9);
        mockCity.current.dew_point = Math.round((mockCity.current.dew_point - 32) * 5/9);

        mockCity.hourly.forEach(item => {
          item.temp = Math.round((item.temp - 32) * 5/9);
        });
        mockCity.daily.forEach(item => {
          item.min = Math.round((item.min - 32) * 5/9);
          item.max = Math.round((item.max - 32) * 5/9);
        });
      }
    }

    return mockCity;
  }

  // Live Mode: openweather endpoints
  const units = isCelsius ? "metric" : "imperial";
  
  try {
    // Attempt One Call 4.0 API
    try {
      const currentRes = await fetch(
        `${BASE_URL}/data/4.0/onecall/current?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );
      if (!currentRes.ok) throw new Error("One Call 4.0 subscription check failed");
      const currentJson = await currentRes.json();

      const hourlyRes = await fetch(
        `${BASE_URL}/data/4.0/onecall/timeline/1h?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );
      const hourlyJson = hourlyRes.ok ? await hourlyRes.json() : null;

      const dailyRes = await fetch(
        `${BASE_URL}/data/4.0/onecall/timeline/1day?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );
      const dailyJson = dailyRes.ok ? await dailyRes.json() : null;

      const dataCurrent = currentJson?.data?.[0] || {};
      const weatherObj = dataCurrent.weather?.[0] || {};

      const formattedData = {
        name: currentJson?.timezone?.split("/")?.pop()?.replace("_", " ") || "Live Coordinates",
        state: "",
        country: "",
        lat,
        lon,
        timezone_offset: currentJson.timezone_offset,
        current: {
          temp: Math.round(dataCurrent.temp || 0),
          feels_like: Math.round(dataCurrent.feels_like || 0),
          temp_min: Math.round(dataCurrent.temp - 4 || 0),
          temp_max: Math.round(dataCurrent.temp + 4 || 0),
          condition: weatherObj.main || "Clear",
          description: weatherObj.description || "Clear skies",
          icon: getConditionIcon(weatherObj.icon),
          uv_index: dataCurrent.uvi || 0,
          uv_desc: dataCurrent.uvi < 3 ? "Low" : dataCurrent.uvi < 6 ? "Moderate" : "High",
          air_quality: 35,
          air_desc: "Excellent",
          wind_speed: Math.round(dataCurrent.wind_speed || 0),
          wind_direction: getWindDirection(dataCurrent.wind_deg),
          wind_deg: dataCurrent.wind_deg || 0,
          humidity: dataCurrent.humidity || 0,
          dew_point: Math.round(dataCurrent.dew_point || 0),
          visibility: Math.round((dataCurrent.visibility || 10000) / 1609.34),
          visibility_desc: dataCurrent.visibility >= 10000 ? "Perfectly clear" : "Light mist",
          sunrise: formatUnixTime(dataCurrent.sunrise, currentJson.timezone_offset),
          sunset: formatUnixTime(dataCurrent.sunset, currentJson.timezone_offset),
          isDay: (dataCurrent.sunrise && dataCurrent.sunset) ? (Math.floor(Date.now() / 1000) >= dataCurrent.sunrise && Math.floor(Date.now() / 1000) < dataCurrent.sunset) : true,
          alerts: dataCurrent.alerts || []
        },
        hourly: [],
        daily: []
      };

      if (hourlyJson?.data) {
        formattedData.hourly = hourlyJson.data.slice(0, 10).map(item => {
          const itemWeather = item.weather?.[0] || {};
          return {
            time: formatUnixHour(item.dt, currentJson.timezone_offset),
            temp: Math.round(item.temp),
            icon: getConditionIcon(itemWeather.icon)
          };
        });
      }

      if (dailyJson?.data) {
        formattedData.daily = dailyJson.data.slice(0, 7).map((item, index) => {
          const itemWeather = item.weather?.[0] || {};
          const dayLabel = index === 0 ? "Today" : formatUnixDay(item.dt, currentJson.timezone_offset);
          const minTemp = item.temp?.min || 0;
          const maxTemp = item.temp?.max || 0;
          
          return {
            day: dayLabel,
            min: Math.round(minTemp),
            max: Math.round(maxTemp),
            icon: getConditionIcon(itemWeather.icon)
          };
        });
      }

      return formattedData;
    } catch (oneCallError) {
      console.warn("One Call 4.0 failed or unsubscribed. Trying 2.5 API fallback...", oneCallError);

      // Fallback to classic 2.5 current weather and 5-day forecast
      const weatherRes = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );
      if (!weatherRes.ok) throw new Error("Classic Weather 2.5 API failed");
      const weatherJson = await weatherRes.json();

      const forecastRes = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );
      if (!forecastRes.ok) throw new Error("Classic Forecast 2.5 API failed");
      const forecastJson = await forecastRes.json();

      const weatherObj = weatherJson.weather?.[0] || {};
      const mainData = weatherJson.main || {};
      const windData = weatherJson.wind || {};
      const sysData = weatherJson.sys || {};
      
      // Calculate dew point estimated value: T - ((100 - RH)/5)
      const t = mainData.temp || 0;
      const rh = mainData.humidity || 100;
      const estDew = t - ((100 - rh) / 5);

      const formattedData = {
        name: weatherJson.name || "Live Coordinates",
        state: "",
        country: sysData.country || "",
        lat,
        lon,
        timezone_offset: weatherJson.timezone,
        current: {
          temp: Math.round(mainData.temp || 0),
          feels_like: Math.round(mainData.feels_like || 0),
          temp_min: Math.round(mainData.temp_min || 0),
          temp_max: Math.round(mainData.temp_max || 0),
          condition: weatherObj.main || "Clear",
          description: weatherObj.description || "Clear skies",
          icon: getConditionIcon(weatherObj.icon),
          uv_index: 3, // fallback since not in 2.5 current weather
          uv_desc: "Moderate",
          air_quality: 35, // fallback
          air_desc: "Excellent",
          wind_speed: Math.round(windData.speed || 0),
          wind_direction: getWindDirection(windData.deg),
          wind_deg: windData.deg || 0,
          humidity: rh,
          dew_point: Math.round(estDew),
          visibility: Math.round((weatherJson.visibility || 10000) / 1609.34),
          visibility_desc: weatherJson.visibility >= 10000 ? "Perfectly clear" : "Light mist",
          sunrise: formatUnixTime(sysData.sunrise, weatherJson.timezone),
          sunset: formatUnixTime(sysData.sunset, weatherJson.timezone),
          isDay: (sysData.sunrise && sysData.sunset) ? (Math.floor(Date.now() / 1000) >= sysData.sunrise && Math.floor(Date.now() / 1000) < sysData.sunset) : true,
          alerts: [] // alerts not available in 2.5
        },
        hourly: [],
        daily: []
      };

      // Map hourly from 3-hour forecasts
      if (forecastJson.list) {
        formattedData.hourly = forecastJson.list.slice(0, 10).map(item => {
          const itemWeather = item.weather?.[0] || {};
          return {
            time: formatUnixHour(item.dt, weatherJson.timezone),
            temp: Math.round(item.main.temp),
            icon: getConditionIcon(itemWeather.icon)
          };
        });

        // Group by day for daily forecast (5 days total available)
        const dailyMap = {};
        forecastJson.list.forEach(item => {
          const dateStr = new Date(item.dt * 1000).toDateString();
          if (!dailyMap[dateStr]) {
            dailyMap[dateStr] = [];
          }
          dailyMap[dateStr].push(item);
        });

        formattedData.daily = Object.keys(dailyMap).slice(0, 7).map((dateStr, index) => {
          const list = dailyMap[dateStr];
          const temps = list.map(x => x.main.temp);
          const minTemp = Math.min(...temps);
          const maxTemp = Math.max(...temps);
          const midIndex = Math.floor(list.length / 2);
          const midWeather = list[midIndex].weather[0];
          const dayLabel = index === 0 ? "Today" : formatUnixDay(list[0].dt, weatherJson.timezone);
          
          return {
            day: dayLabel,
            min: Math.round(minTemp),
            max: Math.round(maxTemp),
            icon: getConditionIcon(midWeather.icon)
          };
        });
      }

      return formattedData;
    }
  } catch (error) {
    console.error("Failed to fetch live weather, falling back to mock: ", error);
    // Fall back to Portland if SF fails
    return MOCK_CITIES["portland"];
  }
}

// Direct Geocoding search
export async function searchLocations(query, apiKey) {
  if (!apiKey) {
    // Filter mock cities
    const cleaned = query.toLowerCase().trim();
    return Object.keys(MOCK_CITIES)
      .filter(key => key.includes(cleaned) || MOCK_CITIES[key].name.toLowerCase().includes(cleaned))
      .map(key => ({
        name: MOCK_CITIES[key].name,
        state: MOCK_CITIES[key].state,
        country: MOCK_CITIES[key].country,
        lat: MOCK_CITIES[key].lat,
        lon: MOCK_CITIES[key].lon
      }));
  }

  try {
    const res = await fetch(`${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`);
    if (!res.ok) throw new Error("Geocoding lookup failed");
    const json = await res.json();
    return json.map(item => ({
      name: item.name,
      state: item.state || "",
      country: item.country,
      lat: item.lat,
      lon: item.lon
    }));
  } catch (e) {
    console.error("Geocoding error: ", e);
    return [];
  }
}

// Fetch Alert Details
export async function getAlertDetails(alertId, apiKey) {
  if (!apiKey) {
    return MOCK_ALERTS[alertId] || MOCK_ALERTS["alert_001"];
  }

  try {
    const res = await fetch(`${BASE_URL}/data/4.0/onecall/alert/${alertId}?appid=${apiKey}`);
    if (!res.ok) throw new Error("Alert lookup failed");
    return await res.json();
  } catch (e) {
    console.error("Alert details fetch failed: ", e);
    // fallback
    return MOCK_ALERTS["alert_001"];
  }
}

// Helpers
function getWindDirection(deg) {
  if (deg === undefined) return "N";
  const sectors = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(deg / 45) % 8;
  return sectors[index];
}

function formatUnixTime(unixTimestamp, timezoneOffset) {
  if (!unixTimestamp) return "";
  
  if (typeof timezoneOffset === "string") {
    const date = new Date(unixTimestamp * 1000);
    try {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: timezoneOffset
      });
    } catch (e) {
      // fallback
    }
  }

  const offset = typeof timezoneOffset === "number" ? timezoneOffset : 0;
  const date = new Date((unixTimestamp + offset) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  const displayMinutes = String(minutes).padStart(2, "0");
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

function formatUnixHour(unixTimestamp, timezoneOffset) {
  if (typeof timezoneOffset === "string") {
    const date = new Date(unixTimestamp * 1000);
    try {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
        timeZone: timezoneOffset
      });
    } catch (e) {
      // fallback
    }
  }

  const offset = typeof timezoneOffset === "number" ? timezoneOffset : 0;
  const date = new Date((unixTimestamp + offset) * 1000);
  const hours = date.getUTCHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours} ${ampm}`;
}

function formatUnixDay(unixTimestamp, timezoneOffset) {
  if (typeof timezoneOffset === "string") {
    const date = new Date(unixTimestamp * 1000);
    try {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: timezoneOffset
      });
    } catch (e) {
      // fallback
    }
  }

  const offset = typeof timezoneOffset === "number" ? timezoneOffset : 0;
  const date = new Date((unixTimestamp + offset) * 1000);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getUTCDay()];
}
