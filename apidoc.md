One Call API 4.0

Product concept
One Call API 4.0 is a unified weather intelligence API designed to give developers, digital products, and enterprise teams access to current weather, short-term forecasts, long-range daily outlooks, historical weather records, and official weather alerts through a single integration. Instead of combining multiple weather endpoints and datasets, users can request highly relevant weather information for any latitude and longitude from one product family built around a consistent response structure.

One Call API 4.0 contains 6 endpoints and provides access to various data:

Current weather conditions
Minute-by-minute forecast data for the next 60 minutes
15-minute forecast data for the next 48 hours
Hourly weather timelines spanning 47 years of history and 48 hours of forecast
Daily weather timelines spanning 47 years of history and up to 1.5 years ahead
Detailed weather alert information from national agencies
One Call API 4.0 is based on the proprietary OWHL ™ OpenWeather Hyper-Local Forecasting Model and is updated every 10 minutes. Thus, in order to receive the most accurate and up-to-date weather data, we recommend you request One Call API 4.0 every 10 minutes.

Product features
Please note, that One Call API 4.0 is included in the "One Call by Call" subscription only. This separate subscription includes 1,000 calls/day for free and allows you to pay only for the number of API calls made to this product above the daily free limit.

No other OpenWeather subscription plans are required to access One Call API 4.0. For more information, please visit the pricing page and FAQ, or ask Ulla, OpenWeather AI assistant.

How to start

01 icon
Sign up
Sign up to OpenWeather service in case you haven't got your OpenWeather API key yet.

02 icon
Follow the pricing page
Follow the pricing page to learn details about the price.

One Call API 4.0 is included in the separate subscription only and allows you to pay only for the number of API calls made to this product. Please find more details on the pricing page.

03 icon
2,000 API calls per day
Once you subscribe to One call API 4.0, 2,000 API calls per day to this product are set up by default. If you want to change this limit, please go to the "Billing plans" tab in your Personal account to update standard settings. You can find more information on the FAQ or ask Ulla, OpenWeather AI assistant.

04 icon
Desired type of data
Select the desired type of data and make an API call according to relevant tech documentation section, remembering to add your key to each call.

Pagination & Response Limits

Some One Call API 4.0 endpoints may return large datasets, especially when requesting forecast or historical weather data. To improve API performance and ensure efficient data delivery, responses can be split into multiple pages.

When pagination is applied, the API response includes a fully prepared URL for retrieving the next page of data.

How pagination works
Send a request to the API endpoint.
Receive a response containing weather data and, if additional data is available, next or prev fields.
Use the URL provided in the next or prev field to request the next or prevoius page of results.
Example of API response
{
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777460400,
      "sunrise": 1777437375,
      "sunset": 1777490344,
      "moonrise": 1777482960,
      "moonset": 1777433400,
      "moon_phase": 0.43,
      ...
	  }
    ...
  ],
  "prev": "https://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=51.5000&lon=-0.1000&start=1776596400&appid={API key}",
  "next": "https://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=51.5000&lon=-0.1000&start=1778324400&appid={API key}"
}
Toggle
Copy Icon
Pagination parameters
One Call API 4.0 uses timeline-based pagination to navigate through weather data forward and backward in time.

Parameters

start

UTC date and time used as the starting point of the timeline. Records before and after this timestamp can be accessed using pagination links. If start is not specified, the current UTC time is used by default.

next

URL for retrieving the next portion of records forward in the timeline.

prev

URL for retrieving the previous portion of records backward in the timeline.

Each endpoint returns a fixed maximum number of records per response. Please refer to the corresponding endpoint documentation for response record limits.

Response record limits
Each One Call API 4.0 endpoint has a maximum number of records that can be returned in a single response. These limits are described in the corresponding endpoint sections of the documentation.

If the available dataset exceeds the response limit, the API response includes next and/or prev URLs that can be used to continue retrieving data across the timeline.

Please note, that each paginated request made using the next or prev URLs is counted as a separate API call according to your subscription plan.

Current weather data

The API endpoint returns current weather conditions for a specific location with core meteorological parameters such as temperature, feels-like temperature, pressure, humidity, dew point, UV index, cloud cover, visibility, wind speed, wind direction, sunrise and sunset times, and weather condition descriptors with icons. This endpoint is useful for apps and services that need an instant snapshot of weather at a location.

If you are interested in other functionality on One Call API 4.0, please check Product concept to follow the right section.

How to make an API call
API call
https://api.openweathermap.org/data/4.0/onecall/current?lat={lat}&lon={lon}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use the lang parameter to get the output in your language. Learn more

Example of API call
Before making an API call, please note, that One Call 4.0 is included in the "One Call by Call" subscription only. Learn more

Example of API call
https://api.openweathermap.org/data/4.0/onecall/current?lat=52.2297&lon=21.0122&units=metric&lang=en&appid={API key} 
Copy Icon
Example of API response
{
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777449371,
      "sunrise": 1777437375,
      "sunset": 1777490344,
      "temp": 286.42,
      "feels_like": 285.32,
      "pressure": 1024,
      "humidity": 58,
      "dew_point": 278.34,
      "uvi": 1.55,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 8.23,
      "wind_deg": 70,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "sky is clear",
          "icon": "01d"
        }
      ]
	  "alerts": [
		"8B46C632-DCA7-44D7-8BDF-02445621BAFF",
		"29F58A35-BB91-4A73-9F46-9FC64BDF604F",
		...
	]
    }
  ]
}
Toggle
Copy Icon
Fields in API response
If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

Current weather endpoint returns 1 record in the API response.

lat Latitude of the location, decimal (−90; 90)
lon Longitude of the location, decimal (-180; 180)
timezone Timezone name for the requested location
timezone_offset Shift in seconds from UTC
data.dt Current time, Unix, UTC
data.sunrise Sunrise time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
data.sunset Sunset time, Unix, UTC. For polar areas in midnight sun and polar night periods this parameter is not returned in the response
data.temp Temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
data.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
data.pressure Atmospheric pressure on the sea level, hPa
data.humidity Humidity, %
data.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit
data.clouds Cloudiness, %
data.uvi Current UV index.
data.visibility Average visibility, metres. The maximum value of the visibility is 10 km
data.wind_speed Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
data.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
data.wind_deg Wind direction, degrees (meteorological)
data.rain
data.rain.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.snow
data.snow.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.weather
data.weather.id Weather condition id
data.weather.main Group of weather parameters (Rain, Snow etc.)
data.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
data.weather.icon Weather icon id. How to get icons
data.alerts Array of weather alert IDs associated with the requested location and time. Each ID can be used to retrieve detailed information about the corresponding alert via the Weather Alert detailed information endpoint. National weather alerts are provided in English by default. Please note that some agencies provide the alert’s description only in a local language.
1 minute step timeline

How to make an API call
API call
https://api.openweathermap.org/data/4.0/onecall/timeline/1min?lat={lat}&lon={lon}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use the lang parameter to get the output in your language. Learn more

Example of API call
Example of API call
https://api.openweathermap.org/data/4.0/onecall/timeline/1min?lat=51.5&lon=-0.1&appid={API key}
Copy Icon
Example of API response
{
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777451940,
      "precipitation": 0,
	  "alerts": [
		"8B46C632-DCA7-44D7-8BDF-02445621BAFF",
		"29F58A35-BB91-4A73-9F46-9FC64BDF604F",
		...
	],
...
  ]
  
}
Toggle
Copy Icon
The 1-minute timeline returns up to 60 records in the API response.

Fields in API response
lat Latitude of the location, decimal (−90; 90)
lon Longitude of the location, decimal (-180; 180)
timezone Timezone name for the requested location
timezone_offset Shift in seconds from UTC
data 
data.dt Time of the forecasted data, unix, UTC
data.precipitation Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.alerts Array of weather alert IDs associated with the requested location and time. Each ID can be used to retrieve detailed information about the corresponding alert via the Weather Alert detailed information endpoint. National weather alerts are provided in English by default. Please note that some agencies provide the alert’s description only in a local language.
15 minutes step timeline

How to make an API call
API call
https://api.openweathermap.org/data/4.0/onecall/timeline/15min?lat={lat}&lon={lon}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use the lang parameter to get the output in your language. Learn more

Example of API call
Example of API call
https://api.openweathermap.org/data/4.0/onecall/timeline/15min?lat=51.5&lon=-0.1&appid={API key}
Copy Icon
Example of API response
{
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777452300,
      "temp": 287.95,
      "feels_like": 286.75,
      "pressure": 1024,
      "humidity": 48,
      "dew_point": 277.2,
      "uvi": 2.36,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 7.41,
      "wind_deg": 70,
      "pop": 0,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "sky is clear",
          "icon": "01d"
        }
      ],
	  "alerts": [
		"8B46C632-DCA7-44D7-8BDF-02445621BAFF",
		"29F58A35-BB91-4A73-9F46-9FC64BDF604F",
		...
	]
    },
	...
  ],
"next": "https://api.openweathermap.org/data/4.0/onecall/timeline/15min?lat=51.5000&lon=-0.1000&start=1777497300&appid={API key}"
}
Toggle
Copy Icon
The 15-minute timeline returns up to 50 records in a single API response. To retrieve the full dataset, please check the next parameter in the API response. If present, it contains a fully prepared URL for requesting the next portion of records. If the next parameter is not returned, it means the full dataset has already been retrieved. More details in the Pagination and limits section

Fields in API response
lat Latitude of the location, decimal (−90; 90)
lon Longitude of the location, decimal (-180; 180)
timezone Timezone name for the requested location
timezone_offset Shift in seconds from UTC
data
data.dt Time of the forecasted data, Unix, UTC
data.temp Temperature. Units - default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
data.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
data.pressure Atmospheric pressure on the sea level, hPa
data.humidity Humidity, %
data.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit
data.clouds Cloudiness, %
data.uvi UV index.
data.visibility Average visibility, metres. The maximum value of the visibility is 10 km
data.wind_speed Wind speed. Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
data.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
data.wind_deg Wind direction, degrees (meteorological)
data.rain
data.rain.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.snow
data.snow.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.weather
data.weather.id Weather condition id
data.weather.main Group of weather parameters (Rain, Snow etc.)
data.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
data.weather.icon Weather icon id. How to get icons
data.alerts Array of weather alert IDs associated with the requested location and time. Each ID can be used to retrieve detailed information about the corresponding alert via the Weather Alert detailed information endpoint. National weather alerts are provided in English by default. Please note that some agencies provide the alert’s description only in a local language.
prev API-generated request URL that can be used to retrieve the previous portion of data relative to the current time range. This link allows navigation to earlier records using the same query parameters.
next API-generated request URL that can be used to retrieve the next portion of data relative to the current time range. This link allows navigation to later records using the same query parameters.
1 hour step timeline

How to make an API call
API call
https://api.openweathermap.org/data/4.0/onecall/timeline/1h?lat={lat}&lon={lon}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use the lang parameter to get the output in your language. Learn more

Example of API call
Example of API call
https://api.openweathermap.org/data/4.0/onecall/timeline/1h?lat=51.5&lon=-0.1&appid={API key}
Copy Icon
Example of API response
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
The 1-hour timeline returns up to 20 records in a single API response. To retrieve the full dataset, please use the next and prev parameters returned in the API response. These parameters contain fully prepared URLs for requesting the following or previous portions of records within the timeline. If the next or prev parameter is not returned, it means there are no additional records available in that direction. More details in the Pagination and limits section

Fields in API response
lat Latitude of the location, decimal (−90; 90)
lon Longitude of the location, decimal (-180; 180)
timezone Timezone name for the requested location
timezone_offset Shift in seconds from UTC
data 
data.dt Time of the forecasted data, Unix, UTC
data.temp Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
data.feels_like Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
data.pressure Atmospheric pressure on the sea level, hPa
data.humidity Humidity, %
data.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
data.uvi UV index
data.clouds Cloudiness, %
data.visibility Average visibility, metres. The maximum value of the visibility is 10 km
data.wind_speed Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.How to change units used
data.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
data.wind_deg Wind direction, degrees (meteorological)
data.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
data.rain
data.rain.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.snow
data.snow.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.weather
hourly.weather.id Weather condition id
hourly.weather.main Group of weather parameters (Rain, Snow etc.)
hourly.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
hourly.weather.icon Weather icon id. How to get icons
data.alerts Array of weather alert IDs associated with the requested location and time. Each ID can be used to retrieve detailed information about the corresponding alert via the Weather Alert detailed information endpoint. National weather alerts are provided in English by default. Please note that some agencies provide the alert’s description only in a local language.
prev API-generated request URL that can be used to retrieve the previous portion of data relative to the current time range. This link allows navigation to earlier records using the same query parameters.
next API-generated request URL that can be used to retrieve the next portion of data relative to the current time range. This link allows navigation to later records using the same query parameters.
1 day step timeline

How to make an API call
API call
https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat={lat}&lon={lon}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude, decimal (-90; 90). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude, decimal (-180; 180). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use the lang parameter to get the output in your language. Learn more

Example of API call
Example of API call
https://api.openweathermap.org/data/4.0/onecall/timeline/1day?lat=51.5&lon=-0.1&appid={API key}
Copy Icon
Example of API response
{
  "lat": 51.5,
  "lon": -0.1,
  "timezone": "Europe/London",
  "timezone_offset": 3600,
  "data": [
    {
      "dt": 1777460400,
      "sunrise": 1777437375,
      "sunset": 1777490344,
      "moonrise": 1777482960,
      "moonset": 1777433400,
      "moon_phase": 0.43,
      "temp": {
        "day": 288.16,
        "min": 280.7,
        "max": 290.05,
        "night": 285.7,
        "eve": 289.38,
        "morn": 282.78
      },
      "feels_like": {
        "day": 286.89,
        "night": 284.58,
        "eve": 288.31,
        "morn": 279.89
      },
      "pressure": 1024,
      "humidity": 45,
      "dew_point": 276.33,
      "wind_speed": 8.35,
      "wind_deg": 76,
      "wind_gust": 15.34,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "sky is clear",
          "icon": "01d"
        }
      ],
      "clouds": 0,
      "pop": 0,
      "uvi": 4.82
    },
    ...
  ],
  "prev": "https://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=51.5000&lon=-0.1000&start=1776596400&appid={API key}",
  "next": "https://api.openweathermap.org/data/4.0/onecall/timeline/1day?cnt=10&lat=51.5000&lon=-0.1000&start=1778324400&appid={API key}"
}
Toggle
Copy Icon
The 1-day timeline returns up to 10 records in a single API response. To retrieve the full dataset, please use the next and prev parameters returned in the API response. These parameters contain fully prepared URLs for requesting the following or previous portions of records within the timeline. If the next or prev parameter is not returned, it means there are no additional records available in that direction. More details in the Pagination and limits section

Fields in API response
lat Latitude of the location, decimal (−90; 90)
lon Longitude of the location, decimal (-180; 180)
timezone Timezone name for the requested location
timezone_offset Shift in seconds from UTC
data 
data.dt Time of the forecasted data, Unix, UTC
data.temp Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
data.feels_like Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
data.pressure Atmospheric pressure on the sea level, hPa
data.humidity Humidity, %
data.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
data.uvi UV index
data.clouds Cloudiness, %
data.visibility Average visibility, metres. The maximum value of the visibility is 10 km
data.wind_speed Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.How to change units used
data.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
data.wind_deg Wind direction, degrees (meteorological)
data.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
data.rain
data.rain.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.snow
data.snow.1h (where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
data.weather
data.weather.id Weather condition id
data.weather.main Group of weather parameters (Rain, Snow etc.)
data.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
data.weather.icon Weather icon id. How to get icons
data.alerts Array of weather alert IDs associated with the requested location and time. Each ID can be used to retrieve detailed information about the corresponding alert via the Weather Alert detailed information endpoint. National weather alerts are provided in English by default. Please note that some agencies provide the alert’s description only in a local language.
prev API-generated request URL that can be used to retrieve the previous portion of data relative to the current time range. This link allows navigation to earlier records using the same query parameters.
next API-generated request URL that can be used to retrieve the next portion of data relative to the current time range. This link allows navigation to later records using the same query parameters.
Weather Alert detailed information

The Weather Alert detailed information endpoint provides full information about a specific weather alert by its ID. The response includes the alert source, event name, validity period, and a detailed description of the expected weather hazard and its potential impacts.

How to make API call
API call
https://api.openweathermap.org/data/4.0/onecall/alert/{alert_id}?appid=KEY
Copy Icon
Parameters

alert_id

required

Alert ID

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

Example of API call
Example of API call
https://api.openweathermap.org/data/4.0/onecall/alert/8B46C632-DCA7-44D7-8BDF-02445621BAFF?appid={API key}
Copy Icon
Example of API response
{
"id": "8B46C632-DCA7-44D7-8BDF-02445621BAFF",
"sender_name": "NWS Tulsa (Eastern Oklahoma)",
"event": "Heat Advisory",
"start": 1597341600,
"end": 1597366800,
"description": "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS
AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of
105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee,
McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n*
WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of
hot temperatures and high\nhumidity will combine to create a dangerous
situation in which\nheat illnesses are possible."
}
Toggle
Copy Icon
Fields on API response
Weather alerts endpoint returns 1 record in the API response.

• id Alert ID

• sender_name Name of the alert source. Please read here the full list of alert sources

• event Alert event name

• start Date and time of the start of the alert, Unix, UTC

• end Date and time of the end of the alert, Unix, UTC

• description Description of the alert

Other features

List of weather condition codes
List of weather condition codes with icons (range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.)

Units of measurement
standard, metric and imperial units are available.

List of all API parameters with available units.

API call
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units={units}
Copy Icon
Parameters

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default.

Temperature is available in Fahrenheit, Celsius and Kelvin units.

Wind speed is available in miles/hour and meter/sec.

For temperature in Fahrenheit and wind speed in miles/hour, use units=imperial
For temperature in Celsius and wind speed in meter/sec, use units=metric
Temperature in Kelvin and wind speed in meter/sec is used by default, so there is no need to use the units parameter in the API call if you want this
Examples of API calls
Standard (default)
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335
Copy Icon
Metric
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=metric
Copy Icon
Imperial
api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&units=imperial
Copy Icon
Multilingual support
You can use lang parameter to get the output in your language.

The contents of the description field will be translated.

API call
https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&lang={lang}
Copy Icon
Parameters

lang

optional

You can use the lang parameter to get the output in your language.

Example of API call
Before making an API call, please note, that One Call 4.0 is included in the "One Call by Call" subscription only. Learn more

https://api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&lang=zh_cn
Copy Icon
We support the following languages. To select one, you can use the corresponding language code:

sq Albanian
af Afrikaans
ar Arabic
az Azerbaijani
eu Basque
be Belarusian
bg Bulgarian
ca Catalan
zh_cn Chinese Simplified
zh_tw Chinese Traditional
hr Croatian
cz Czech
da Danish
nl Dutch
en English
fi Finnish
fr French
gl Galician
de German
el Greek
he Hebrew
hi Hindi
hu Hungarian
is Icelandic
id Indonesian
it Italian
ja Japanese
kr Korean
ku Kurmanji (Kurdish)
la Latvian
lt Lithuanian
mk Macedonian
no Norwegian
fa Persian (Farsi)
pl Polish
pt Portuguese
pt_br Português Brasil
ro Romanian
ru Russian
sr Serbian
sk Slovak
sl Slovenian
sp, es Spanish
sv, se Swedish
th Thai
tr Turkish
ua, uk Ukrainian
vi Vietnamese
zu Zulu
List of national weather alerts sources
Country

Agency

Albania

Institute of GeoSciences, Energy, Water and Environment of Albania

Algeria

National Meteorological Office

Argentina

National Weather Service of Argentina

Australia

Australian Bureau of Meteorology

Austria

Bahrain

Bahrain Meteorological Directorate

Barbados

Barbados Meteorological Service

Belarus

State institution "Republican center for hydrometeorology, control of radioactive contamination and environmental monitoring" (Belhydromet)

Belgium

Royal Meteorological Institute

Belize

National Meteorological Service of Belize

Benin

National Meteorological Agency (METEO-BENIN)

Bosnia and Herzegovina

Botswana

Botswana Meteorological Services

Brazil

National Meteorological Institute - INMET

Bulgaria

National Institute of Meteorology and Hydrology - Plovdiv branch

Cameroon

Cameroon National Meteorological Service

Canada

Chile

Meteorological Directorate of Chile

Congo

National Civil Aviation Agency (ANAC Congo)

Costa Rica

National Meteorological Institute of Costa Rica

Croatia

State Hydrometeorological Institute (DHMZ)

Curacao and Sint Maarten

Meteorological Department Curacao

Cyprus

Republic of Cyprus - Department of Meteorology

Czech Republic

Czech Hydrometeorological Institute

Denmark

Danish Meteorological Institute

Ecuador

Ecuadoran Institute for Meteorology and Hydrology (INAMHI)

Egypt

Egyptian Meteorological Authority

Estonia

Estonian Environment Agency

Eswatini

Eswatini Meteorological Service

Finland

Finnish Meteorological Institute

France

Meteo-France

Gabon

General Directorate of Meteorology of Gabon

Germany

German Meteorological Office

Ghana

Ghana Meteorological Agency

Greece

Hellenic National Meteorological Service

Guinea

National Meteorological Agency of Guinea

Guyana

Hydrometeorological Service of Guyana

Hong Kong China

Hong Kong Observatory

Hungary

Hungarian Meteorological Service

Iceland

Icelandic Meteorological Office

India

India Meteorological Department

Indonesia

Ireland

Met Eireann - Irish Meteorological Service

Israel

Israel Meteorological Service

Italy

Italian Air Force National Meteorological Service

Ivory Coast

Airport, aeronautical and meteorological operating and development company (SODEXAM)

Jamaica

Meteorological Service of Jamaica

Japan

Japan Meteorological Business Support Center

Jordan

Jordanian Meteorological Department

Kazakhstan

National Hydrometeorological Service of the Republic of Kazakhstan (Kazhydromet)

Kenya

Kenya Meteorological Department

Kuwait

Kuwait Meteorological Department

Latvia

Latvian Environment, Geology and Meteorology Center

Lesotho

Lesotho Meteorological Services

Libya

Libyan National Meteorological Center

Lithuania

Lithuanian Hydrometeorological Service under the Ministry of Environment of the Republic of Lithuania (LHMS)

Luxembourg

Luxembourg Airport Administration

Macao China

Macao Meteorological and Geophysical Bureau

Madagascar

METEO Madagascar

Malawi

Malawi Department of Climate Change and Meteorological Services

Maldives

Maldives Meteorological Service

Mauritania

National Meteorological Office of Mauritania

Mauritius

Mauritius Meteorological Services

Mexico

CONAGUA - National Meteorological Service of Mexico

Moldova

State Hydrometeorological Service of Moldova

Mongolia

National Agency Meteorology and the Environmental Monitoring of Mongolia

Mozambique

National Institute of Meteorology of Mozambique

Myanmar

Myanmar Department of Meteorology and Hydrology

Netherlands

Royal Netherlands Meteorological Institute (KNMI)

New Zealand

New Zealand

New Zealand Emergency Mobile Alert

Niger

National Meteorological Directorate of Niger

Nigeria

Nigerian Meteorological Agency (NiMet)

North Macedonia

National Hydrometeorological Service - Republic of Macedonia

Norway

Paraguay

Directorate of Meteorology and Hydrology

Philippines

Philippine Atmospheric Geophysical and Astronomical Services Administration

Poland

Institute of Meteorology and Water Management (IMGW-PIB)

Portugal

Portuguese Institute of Sea and Atmosphere, I.P.

Qatar

Qatar Meteorology Department

Republic of Korea

Korea Meteorological Administration, Weather Information

Romania

National Meteorological Administration

Russia

Hydrometcenter of Russia

Saudi Arabia

National Center for Meteorology - Kingdom of Saudi Arabia

Serbia

Republic Hydrometeorological Service of Serbia

Seychelles

Seychelles Meteorological Authority

Singapore

Meteorological Service Singapore

Slovakia

Slovak Hydrometeorological Institute

Slovenia

National Meteorological Service of Slovenia

Solomon Islands

Solomon Islands Meteorological Services

South Africa

South African Weather Service (SAWS)

Spain

State Meteorological Agency (AEMET)

Sudan

Sudan Meteorological Authority

Sweden

Swedish Meteorological and Hydrological Institute

Switzerland

MeteoSwiss

Tanzania

Tanzania Meteorological Authority

Thailand

Thai Meteorological Department

Timor-Leste

National Directorate of Meteorology and Geophysics of Timor-Leste

Trinidad and Tobago

Trinidad and Tobago Meteorological Service

Ukraine

Ukrainian Hydrometeorological Center

United Arab Emirates (UAE)

National Center of Meteorology (NCM), United Arab Emirates

United Kingdom of Great Britain and Northern Ireland

UK Met Office

Uruguay

Uruguayan Institute of Meteorology

USA

Uzbekistan

Uzhydromet

Yemen

Yemeni Civil Aviation and Meteorology Authority (CAMA)

Zambia

Meteorological Department Zambia

Zimbabwe

Meteorological Services Department

Please note that some agencies from the list may cease to provide us the weather alert information. In case you don’t receive alerts from any agency, please contact us. We constantly work on our product’s improvement and keep expanding the list of partner agencies.

Call back function for JavaScript code
To use JavaScript code you can transfer callback functionName to JSONP callback.

API call example
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
API errors

Structure of API errors
In case of incorrected API call you will receive API error response. Error response payload returned for all types of errors with the structure below.

Example of error response
{
    "cod":400,
    "message":"Invalid date format",
    "parameters": [
        "date"
    ]
}
Toggle
Copy Icon
Fields in error response
cod Code of error
message Description of error
parameters(optional) List of request parameters names that are related to this particular error

Current weather data

Product concept
Access current weather data for any location on Earth! We collect and process weather data from different sources such as global and local weather models, satellites, radars and a vast network of weather stations. Data is available in JSON, XML, or HTML format.

Call current weather data

How to make an API call
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

mode

optional

Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use this parameter to get the output in your language. Learn more

Please use Geocoder API if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that built-in geocoder has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

Examples of API calls
https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}
Copy Icon
{
  "coord": {
    "lon": 10.99,
    "lat": 44.34
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "moderate rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 298.48,
    "feels_like": 298.74,
    "temp_min": 297.56,
    "temp_max": 300.05,
    "pressure": 1015,
    "humidity": 64,
    "sea_level": 1015,
    "grnd_level": 933
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.62,
    "deg": 349,
    "gust": 1.18
  },
  "rain": {
    "1h": 3.16
  },
  "clouds": {
    "all": 100
  },
  "dt": 1661870592,
  "sys": {
    "type": 2,
    "id": 2075663,
    "country": "IT",
    "sunrise": 1661834187,
    "sunset": 1661882248
  },
  "timezone": 7200,
  "id": 3163858,
  "name": "Zocca",
  "cod": 200
}
Toggle
Copy Icon
API response

If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

JSON
{
   "coord": {
      "lon": 7.367,
      "lat": 45.133
   },
   "weather": [
      {
         "id": 501,
         "main": "Rain",
         "description": "moderate rain",
         "icon": "10d"
      }
   ],
   "base": "stations",
   "main": {
      "temp": 284.2,
      "feels_like": 282.93,
      "temp_min": 283.06,
      "temp_max": 286.82,
      "pressure": 1021,
      "humidity": 60,
      "sea_level": 1021,
      "grnd_level": 910
   },
   "visibility": 10000,
   "wind": {
      "speed": 4.09,
      "deg": 121,
      "gust": 3.47
   },
   "rain": {
      "1h": 2.73
   },
   "clouds": {
      "all": 83
   },
   "dt": 1726660758,
   "sys": {
      "type": 1,
      "id": 6736,
      "country": "IT",
      "sunrise": 1726636384,
      "sunset": 1726680975
   },
   "timezone": 7200,
   "id": 3165523,
   "name": "Province of Turin",
   "cod": 200
}
Toggle
Copy Icon
JSON format API response fields
coord
coord.lon Longitude of the location
coord.lat Latitude of the location
weather (more info Weather condition codes)
weather.id Weather condition id
weather.main Group of weather parameters (Rain, Snow, Clouds etc.)
weather.description Weather condition within the group. Please find more here. You can get the output in your language. Learn more
weather.icon Weather icon id
base Internal parameter
main
main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.feels_like Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.pressure Atmospheric pressure on the sea level, hPa
main.humidity Humidity, %
main.temp_min Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Please find more info here. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.temp_max Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Please find more info here. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
main.sea_level Atmospheric pressure on the sea level, hPa
main.grnd_level Atmospheric pressure on the ground level, hPa
visibility Visibility, meter. The maximum value of the visibility is 10 km
wind
wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
wind.deg Wind direction, degrees (meteorological)
wind.gust Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
clouds
clouds.all Cloudiness, %
rain
1h(where available)Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
snow
1h(where available) Precipitation, mm/h. Please note that only mm/h as units of measurement are available for this parameter
dt Time of data calculation, unix, UTC
sys
sys.type Internal parameter
sys.id Internal parameter
sys.message Internal parameter
sys.country Country code (GB, JP etc.)
sys.sunrise Sunrise time, unix, UTC
sys.sunset Sunset time, unix, UTC
timezone Shift in seconds from UTC
id City ID. Please note that built-in geocoder functionality has been deprecated. Learn more here
name City name. Please note that built-in geocoder functionality has been deprecated. Learn more here
cod Internal parameter
XML

Example of API response
<current>
    <city id="3163858" name="Zocca">
    <coord lon="10.99" lat="44.34"/>
    <country>IT</country>
    <timezone>7200</timezone>
    <sun rise="2022-08-30T04:36:27" set="2022-08-30T17:57:28"/>
    </city>
    <temperature value="298.48" min="297.56" max="300.05" unit="kelvin"/>
    <feels_like value="298.74" unit="kelvin"/>
    <humidity value="64" unit="%"/>
    <pressure value="1015" unit="hPa"/>
    <wind>
    <speed value="0.62" unit="m/s" name="Calm"/>
    <gusts value="1.18"/>
    <direction value="349" code="N" name="North"/>
    </wind>
    <clouds value="100" name="overcast clouds"/>
    <visibility value="10000"/>
    <precipitation value="3.37" mode="rain" unit="1h"/>
    <weather number="501" value="moderate rain" icon="10d"/>
    <lastupdate value="2022-08-30T14:45:57"/>
</current>
Toggle
Copy Icon
XML format API response fields
city
city.id City ID. Please note that built-in geocoder functionality has been deprecated. Learn more here
city.name City name. Please note that built-in geocoder functionality has been deprecated. Learn more here
city.coord
city.coord.lonGeo location, longitude
city.coord.lat Geo location, latitude
city.country Country code (GB, JP etc.). Please note that built-in geocoder functionality has been deprecated. Learn more here
timezoneShift in seconds from UTC
city.sun
city.sun.rise Sunrise time
city.sun.set Sunset time
temperature
temperature.value Temperature
temperature.min Minimum temperature at the moment of calculation. This is minimal currently observed temperature (within large megalopolises and urban areas), use this parameter optionally. Please find more info here
temperature.max Maximum temperature at the moment of calculation. This is maximal currently observed temperature (within large megalopolises and urban areas), use this parameter optionally. Please find more info here
temperature.unit Unit of measurements. Possible value is Celsius, Kelvin, Fahrenheit
feels_like
feels_like.value Temperature. This temperature parameter accounts for the human perception of weather
feels_like.unit Unit of measurements. Possible value is Celsius, Kelvin, Fahrenheit. Unit Default: Kelvin
humidity
humidity.value Humidity value
humidity.unit Humidity units, %
pressure
pressure.value Pressure value
pressure.unit Pressure units, hPa
wind
wind.speed
wind.speed.value Wind speed
wind.speed.unit Wind speed units, m/s
wind.speed.name Type of the wind
wind.direction
wind.direction.value Wind direction, degrees (meteorological)
wind.direction.code Code of the wind direction. Possible value is WSW, N, S etc.
wind.direction.name Full name of the wind direction
clouds
clouds.value Cloudiness
clouds.name Name of the cloudiness
visibility
visibility.value Visibility, meter. The maximum value of the visibility is 10 km
precipitation
precipitation.value Precipitation, mm. Please note that only mm as units of measurement are available for this parameter.
precipitation.mode Possible values are 'no", name of weather phenomena as 'rain', 'snow'
weather
weather.number Weather condition id
weather.value Weather condition name
weather.icon Weather icon id
lastupdate
lastupdate.value Last time when data was updated

We provide a broad variety of products such as One Call API 4.0, Solar Irradiance & Energy Prediction service, Road Risk API, Air Pollution API and solutions for advanced weather parameters like solar irradiance data, UVI, dew point, government weather alerts, etc. Please review our product list page and find more info in the product documentation and pricing pages.

List of weather condition codes

List of weather condition codes with icons (range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.)

Min/max temperature in current weather API and forecast API

Please do not confuse min/max parameters in our weather APIs.

In Current weather API, Hourly forecast API and 5 day / 3 hour forecast API - temp_min and temp_max are optional parameters mean min / max temperature in the city at the current moment just for your reference. For large cities and megalopolises geographically expanded it might be applicable. In most cases both temp_min and temp_max parameters have the same volume as 'temp'. Please use temp_min and temp_max parameters in current weather API optionally.
In 16 Day forecast - min and max mean maximum and minimum temperature in the day.
Example of current weather API response
"main":{
     "temp":306.15, //current temperature
     "pressure":1013,
     "humidity":44,
     "temp_min":306.15, //min current temperature in the city
     "temp_max":306.15 //max current temperature in the city
   }
Toggle
Copy Icon
Example of daily forecast weather API response
"dt":1406080800,
  "temp":{
        "day":297.77,  //daily averaged temperature
        "min":293.52, //daily min temperature
        "max":297.77, //daily max temperature
        "night":293.52, //night temperature
        "eve":297.77, //evening temperature
        "morn":297.77}, //morning temperature
Toggle
Copy Icon
Bulk downloading

We provide number of bulk files with current weather and forecasts. The service allows you to regularly download current weather and forecast data in JSON format. There is no need to call an API to do this.

More information is on the Bulk page.

Examples of bulk files
http://bulk.openweathermap.org/sample/

Other features

Geocoding API
Requesting API calls by geographical coordinates is the most accurate way to specify any location. If you need to convert city names and zip-codes to geo coordinates and the other way around automatically, please use our Geocoding API.

Built-in geocoding
Please use Geocoder API if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that API requests by city name, zip-codes and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality.

Built-in API request by city name
You can call by city name or city name, state code and country code. Please note that searching by states available only for the USA locations.

API call
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
Copy Icon
API call
https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
Copy Icon
API call
https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
Copy Icon
Parameters

q

required

City name, state code and country code divided by comma, Please refer to ISO 3166 for the state codes or country codes. You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations.

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

mode

optional

Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use this parameter to get the output in your language. Learn more

Examples of API calls:
{
     "coord": {
       "lon": -0.13,
       "lat": 51.51
     },
     "weather": [
       {
         "id": 300,
         "main": "Drizzle",
         "description": "light intensity drizzle",
         "icon": "09d"
       }
     ],
     "base": "stations",
     "main": {
       "temp": 280.32,
       "pressure": 1012,
       "humidity": 81,
       "temp_min": 279.15,
       "temp_max": 281.15
     },
     "visibility": 10000,
     "wind": {
       "speed": 4.1,
       "deg": 80
     },
     "clouds": {
       "all": 90
     },
     "dt": 1485789600,
     "sys": {
       "type": 1,
       "id": 5091,
       "message": 0.0103,
       "country": "GB",
       "sunrise": 1485762037,
       "sunset": 1485794875
     },
     "id": 2643743,
     "name": "London",
     "cod": 200
     }
Toggle
Copy Icon
Example of API response
{
     "coord": {
       "lon": -0.13,
       "lat": 51.51
     },
     "weather": [
       {
         "id": 300,
         "main": "Drizzle",
         "description": "light intensity drizzle",
         "icon": "09d"
       }
     ],
     "base": "stations",
     "main": {
       "temp": 280.32,
       "pressure": 1012,
       "humidity": 81,
       "temp_min": 279.15,
       "temp_max": 281.15
     },
     "visibility": 10000,
     "wind": {
       "speed": 4.1,
       "deg": 80
     },
     "clouds": {
       "all": 90
     },
     "dt": 1485789600,
     "sys": {
       "type": 1,
       "id": 5091,
       "message": 0.0103,
       "country": "GB",
       "sunrise": 1485762037,
       "sunset": 1485794875
     },
     "id": 2643743,
     "name": "London",
     "cod": 200
     }
Toggle
Copy Icon
There is a possibility to receive a central district of the city/town with its own parameters (geographic coordinates/id/name) in API response. Example

Built-in API request by city ID
You can make an API call by city ID. List of city ID 'city.list.json.gz' can be downloaded here.

We recommend to call API by city ID to get unambiguous result for your city.

API call
https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
Copy Icon
Parameters

id

required

City ID. List of city ID 'city.list.json.gz' can be downloaded here.

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

mode

optional

Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use this parameter to get the output in your language. Learn more

Examples of API calls
{
     "coord": {
       "lon": 145.77,
       "lat": -16.92
     },
     "weather": [
       {
         "id": 802,
         "main": "Clouds",
         "description": "scattered clouds",
         "icon": "03n"
       }
     ],
     "base": "stations",
     "main": {
       "temp": 300.15,
       "pressure": 1007,
       "humidity": 74,
       "temp_min": 300.15,
       "temp_max": 300.15
     },
     "visibility": 10000,
     "wind": {
       "speed": 3.6,
       "deg": 160
     },
     "clouds": {
       "all": 40
     },
     "dt": 1485790200,
     "sys": {
       "type": 1,
       "id": 8166,
       "message": 0.2064,
       "country": "AU",
       "sunrise": 1485720272,
       "sunset": 1485766550
     },
     "id": 2172797,
     "name": "Cairns",
     "cod": 200
     }
Toggle
Copy Icon
Built-in API request by ZIP code
Please note if country is not specified then the search works for USA as a default.

API call
https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
Copy Icon
Parameters

zip

required

Zip code

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

mode

optional

Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default. Learn more

units

optional

Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

lang

optional

You can use this parameter to get the output in your language. Learn more

Examples of API calls
{
     "coord": {"lon": -122.08,"lat": 37.39},
     "weather": [
       {
         "id": 800,
         "main": "Clear",
         "description": "clear sky",
         "icon": "01d"
       }
     ],
     "base": "stations",
     "main": {
       "temp": 282.55,
       "feels_like": 281.86,
       "temp_min": 280.37,
       "temp_max": 284.26,
       "pressure": 1023,
       "humidity": 100
     },
     "visibility": 10000,
     "wind": {
       "speed": 1.5,
       "deg": 350
     },
     "clouds": {
       "all": 1
     },
     "dt": 1560350645,
     "sys": {
       "type": 1,
       "id": 5122,
       "message": 0.0139,
       "country": "US",
       "sunrise": 1560343627,
       "sunset": 1560396563
     },
     "timezone": -25200,
     "id": 420006353,
     "name": "Mountain View",
     "cod": 200
     }
Toggle
Copy Icon
Format

Response format. JSON format is used by default. To get data in XML format just set up mode = xml.

Parameters

mode

optional

Response format. Possible values are xml and html. If you don't use the mode parameter format is JSON by default.

JSON

Example of API calls
{
   "coord":{
      "lon":-0.13,
      "lat":51.51
   },
   "weather":[
      {
         "id":300,
         "main":"Drizzle",
         "description":"light intensity drizzle",
         "icon":"09d"
      }
   ],
   "base":"stations",
   "main":{
      "temp":280.32,
      "pressure":1012,
      "humidity":81,
      "temp_min":279.15,
      "temp_max":281.15
   },
   "visibility":10000,
   "wind":{
      "speed":4.1,
      "deg":80
   },
   "clouds":{
      "all":90
   },
   "dt":1485789600,
   "sys":{
      "type":1,
      "id":5091,
      "message":0.0103,
      "country":"GB",
      "sunrise":1485762037,
      "sunset":1485794875
   },
   "id":2643743,
   "name":"London",
   "cod":200
  }
Toggle
Copy Icon
XML

Example of API response
<weatherdata>
   <location>
      <name>London</name>
      <type />
      <country>GB</country>
      <timezone />
      <location altitude="0" latitude="51.5085" longitude="-0.1258" geobase="geonames" geobaseid="2643743" />
   </location>
   <credit />
   <meta>
      <lastupdate />
      <calctime>0.0117</calctime>
      <nextupdate />
   </meta>
   <sun rise="2017-01-30T07:40:34" set="2017-01-30T16:47:56" />
   <forecast>
      <time day="2017-01-30">
         <symbol number="500" name="light rain" var="10d" />
         <precipitation value="1.64" type="rain" />
         <windDirection deg="85" code="E" name="East" />
         <windSpeed mps="1.97" name="Light breeze" />
         <temperature day="7" min="4.34" max="7" night="4.91" eve="5.05" morn="7" />
         <pressure unit="hPa" value="1016.99" />
         <humidity value="100" unit="%" />
         <clouds value="few clouds" all="12" unit="%" />
      </time>
      <time day="2017-01-31">
         <symbol number="501" name="moderate rain" var="10d" />
         <precipitation value="9.42" type="rain" />
         <windDirection deg="140" code="SE" name="SouthEast" />
         <windSpeed mps="3.37" name="" />
         <temperature day="9.66" min="6.16" max="11.51" night="10.63" eve="10.85" morn="6.16" />
         <pressure unit="hPa" value="1018.15" />
         <humidity value="100" unit="%" />
         <clouds value="overcast clouds" all="92" unit="%" />
      </time>
      <time day="2017-02-01">
         <symbol number="501" name="moderate rain" var="10d" />
         <precipitation value="9.11" type="rain" />
         <windDirection deg="197" code="SSW" name="South-southwest" />
         <windSpeed mps="5.01" name="Gentle Breeze" />
         <temperature day="9.81" min="9.64" max="10.23" night="10.08" eve="9.81" morn="10.03" />
         <pressure unit="hPa" value="1011.7" />
         <humidity value="99" unit="%" />
         <clouds value="scattered clouds" all="44" unit="%" />
      </time>
      <time day="2017-02-02">
         <symbol number="501" name="moderate rain" var="10d" />
         <precipitation value="3.98" type="rain" />
         <windDirection deg="184" code="S" name="South" />
         <windSpeed mps="8.42" name="Fresh Breeze" />
         <temperature day="11.44" min="8.86" max="11.53" night="8.86" eve="10.99" morn="10.05" />
         <pressure unit="hPa" value="999.34" />
         <humidity value="96" unit="%" />
         <clouds value="overcast clouds" all="92" unit="%" />
      </time>
      <time day="2017-02-03">
         <symbol number="500" name="light rain" var="10d" />
         <precipitation value="1.65" type="rain" />
         <windDirection deg="213" code="SSW" name="South-southwest" />
         <windSpeed mps="8.51" name="Fresh Breeze" />
         <temperature day="10.66" min="8.63" max="10.66" night="8.63" eve="9.14" morn="10.18" />
         <pressure unit="hPa" value="1010.98" />
         <humidity value="0" unit="%" />
         <clouds value="scattered clouds" all="48" unit="%" />
      </time>
      <time day="2017-02-04">
         <symbol number="501" name="moderate rain" var="10d" />
         <precipitation value="7.25" type="rain" />
         <windDirection deg="172" code="S" name="South" />
         <windSpeed mps="10.39" name="Fresh Breeze" />
         <temperature day="8.68" min="7.07" max="10.4" night="8.48" eve="10.4" morn="7.07" />
         <pressure unit="hPa" value="1001.13" />
         <humidity value="0" unit="%" />
         <clouds value="overcast clouds" all="96" unit="%" />
      </time>
      <time day="2017-02-05">
         <symbol number="501" name="moderate rain" var="10d" />
         <precipitation value="4.24" type="rain" />
         <windDirection deg="274" code="W" name="West" />
         <windSpeed mps="6.21" name="Moderate breeze" />
         <temperature day="8.5" min="4.86" max="8.5" night="4.86" eve="6.25" morn="8.26" />
         <pressure unit="hPa" value="995.24" />
         <humidity value="0" unit="%" />
         <clouds value="broken clouds" all="64" unit="%" />
      </time>
   </forecast>
  </weatherd
Toggle
Copy Icon
Units of measurement

standard, metric, and imperial units are available. List of all API parameters with available units.

Parameters

units

optional

standard, metric, imperial. When you do not use the units parameter, format is standard by default.

Temperature is available in Fahrenheit, Celsius and Kelvin units.

List of all API parameters with units openweathermap.org/weather-data

Standard

Examples of API calls:
{
  "coord": {
    "lon": -2.15,
    "lat": 57
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 281.63,
    "feels_like": 278.05,
    "temp_min": 281.33,
    "temp_max": 282.41,
    "pressure": 1016,
    "humidity": 79,
    "sea_level": 1016,
    "grnd_level": 1016
  },
  "visibility": 10000,
  "wind": {
    "speed": 7.3,
    "deg": 189,
    "gust": 13.48
  },
  "clouds": {
    "all": 100
  },
  "dt": 1647347424,
  "sys": {
    "type": 2,
    "id": 2031790,
    "country": "GB",
    "sunrise": 1647325488,
    "sunset": 1647367827
  },
  "timezone": 0,
  "id": 2641549,
  "name": "Newtonhill",
  "cod": 200
}
Toggle
Copy Icon
metric

Example of API response
{
  "coord": {
    "lon": -2.15,
    "lat": 57
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 8.48,
    "feels_like": 4.9,
    "temp_min": 8.18,
    "temp_max": 9.26,
    "pressure": 1016,
    "humidity": 79,
    "sea_level": 1016,
    "grnd_level": 1016
  },
  "visibility": 10000,
  "wind": {
    "speed": 7.3,
    "deg": 189,
    "gust": 13.48
  },
  "clouds": {
    "all": 100
  },
  "dt": 1647347424,
  "sys": {
    "type": 2,
    "id": 2031790,
    "country": "GB",
    "sunrise": 1647325488,
    "sunset": 1647367827
  },
  "timezone": 0,
  "id": 2641549,
  "name": "Newtonhill",
  "cod": 200
}
Toggle
Copy Icon
imperial

Example of API response
{
  "coord": {
    "lon": -2.15,
    "lat": 57
  },
  "weather": [
    {
      "id": 804,
      "main": "Clouds",
      "description": "overcast clouds",
      "icon": "04d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 47.26,
    "feels_like": 40.82,
    "temp_min": 46.72,
    "temp_max": 48.67,
    "pressure": 1016,
    "humidity": 79,
    "sea_level": 1016,
    "grnd_level": 1016
  },
  "visibility": 10000,
  "wind": {
    "speed": 16.33,
    "deg": 189,
    "gust": 30.15
  },
  "clouds": {
    "all": 100
  },
  "dt": 1647347504,
  "sys": {
    "type": 2,
    "id": 2031790,
    "country": "GB",
    "sunrise": 1647325488,
    "sunset": 1647367827
  },
  "timezone": 0,
  "id": 2641549,
  "name": "Newtonhill",
  "cod": 200
}
Toggle
Copy Icon
Multilingual support

Multilingual support
You can use the lang parameter to get the output in your language.

Translation is applied for the city name and description fields.

API call
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&lang={lang}
Copy Icon
Parameters

lang

optional

Language code

Examples of API calls
{
  "coord": {
    "lon": 37.62,
    "lat": 55.75
  },
  "weather": [
    {
      "id": 501,
      "main": "Rain",
      "description": "pluie modérée",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 295.48,
    "feels_like": 295.41,
    "temp_min": 295.15,
    "temp_max": 296.15,
    "pressure": 1018,
    "humidity": 60
  },
  "visibility": 10000,
  "wind": {
    "speed": 2,
    "deg": 260
  },
  "rain": {
    "1h": 1.23
  },
  "clouds": {
    "all": 100
  },
  "dt": 1599492273,
  "sys": {
    "type": 1,
    "id": 9029,
    "country": "RU",
    "sunrise": 1599446791,
    "sunset": 1599494929
  },
  "timezone": 10800,
  "id": 524901,
  "name": "Moscou",
  "cod": 200
  }
Toggle
Copy Icon
We support the following languages that you can use with the corresponded lang values:

sq Albanian
af Afrikaans
ar Arabic
az Azerbaijani
eu Basque
be Belarusian
bg Bulgarian
ca Catalan
zh_cn Chinese Simplified
zh_tw Chinese Traditional
hr Croatian
cz Czech
da Danish
nl Dutch
en English
fi Finnish
fr French
gl Galician
de German
el Greek
he Hebrew
hi Hindi
hu Hungarian
is Icelandic
id Indonesian
it Italian
ja Japanese
kr Korean
ku Kurmanji (Kurdish)
la Latvian
lt Lithuanian
mk Macedonian
no Norwegian
fa Persian (Farsi)
pl Polish
pt Portuguese
pt_br Português Brasil
ro Romanian
ru Russian
sr Serbian
sk Slovak
sl Slovenian
sp, es Spanish
sv, se Swedish
th Thai
tr Turkish
ua, uk Ukrainian
vi Vietnamese
zu Zulu
Call back function for JavaScript code

Call back function for JavaScript code
To use JavaScript code you can transfer callback functionName to JSONP callback.

Example of API call
test(
      {
         "coord":{
            "lon":-0.13,
            "lat":51.51
         },
         "weather":[
            {
               "id":300,
               "main":"Drizzle",
               "description":"light intensity drizzle",
               "icon":"09d"
            }
         ],
         "base":"stations",
         "main":{
            "temp":280.32,
            "pressure":1012,
            "humidity":81,
            "temp_min":279.15,
            "temp_max":281.15
         },
         "visibility":10000,
         "wind":{
            "speed":4.1,
            "deg":80
         },
         "clouds":{
            "all":90
         },
         "dt":1485789600,
         "sys":{
            "type":1,
            "id":5091,
            "message":0.0103,
            "country":"GB",
            "sunrise":1485762037,
            "sunset":1485794875
         },
         "id":2643743,
         "name":"London",
         "cod":200
      }
   )

Weather History API

Product concept
We provide hourly historical weather data for any location on the globe via Weather History API. Availability of hourly historical data depends on a type of your subscription.

You can also download this data in JSON or CSV format - please read History Bulk and History Forecast Bulk.

Call hourly historical data

How to make an API call
https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end}&appid={API key}
Copy Icon
API call
https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&cnt={cnt}&appid={API key}
Copy Icon
Parameters

lat

required

Latitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

lon

required

Longitude. If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API

type

required

Type of the call, keep this parameter in the API call as hour

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

start

optional

Start date (unix time, UTC time zone), e.g. start=1369728000

end

optional

End date (unix time, UTC time zone), e.g. end=1369789200

cnt

optional

A number of timestamps in response (one per hour, can be used instead of the parameter end)

Please use Geocoder API if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that built-in geocoder has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

Example of API call
https://history.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87.65&appid={API key}
Copy Icon
Example of API call
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon

If you do not see some of the parameters in your API response it means that these weather phenomena are just not happened for the time of measurement for the city or location chosen. Only really measured or calculated data is displayed in API response.

List of all API parameters with units openweathermap.org/weather-data.

JSON

Example of API response
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
Fields in API Response
message Internal parameter
cod Internal parameter
city_id City ID. Please note that built-in geocoder functionality has been deprecated. Learn more here
calctime Internal parameter
list
dt Time of data calculation, unix, UTC
main
main.temp Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. Learn more
main.feels_like This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. Learn more
main.pressure Atmospheric pressure on the sea level, hPa
main.humidity Humidity, %
main.temp_min Minimum temperature within a large city or a megalopolis (optional parameter). Please find more here. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. Learn more
main.temp_max Maximum temperature within a large city or a megalopolis (optional parameter). Please find more here. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. Learn more
main.sea_level Atmospheric pressure on the sea level, hPa
main.grnd_level Atmospheric pressure on the ground level, hPa
wind
wind.speed Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. Learn more
wind.deg Wind direction, degrees (meteorological)
clouds
clouds.all Cloudiness, %
rain
rain.1h Rain volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter
rain.3h Rain volume for the last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter
snow
snow.1h Snow volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter
snow.3h Snow volume for the last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter
weather (more info Weather condition codes)
weather.id Weather condition id
weather.main Group of weather parameters (Rain, Snow, Clouds etc.)
weather.description Weather condition within the group. Please find more here
weather.icon Weather icon id

We provide a broad variety of products such as One Call API 4.0, Solar Irradiance & Energy Prediction service, Road Risk API, Air Pollution API and solutions for advanced weather parameters like solar irradiance data, UVI, dew point, government weather alerts, etc. Please review our product list page and find more info in the product documentation and pricing pages.

List of weather condition codes

List of weather condition codes with icons (range of thunderstorm, drizzle, rain, snow, clouds, atmosphere etc.)

Min/max temperature in historical weather API and forecast API

Please, do not confuse min/max parameters in hourly historical weather API and forecast API. In hourly historical weather API temp_min and temp_max are optional parameters mean min / max temperature in the city at the moment of calculation to show deviation from the average temperature just for your reference. For large cities and megalopolises geographically expanded it might be applicable. In most cases both temp_min and temp_max parameters have the same volume as 'temp'. Please, use temp_min and temp_max parameters optionally.

Example of historical weather for cities API response
"main":{
   "temp":306.15, // temperature at the moment of calculation
   "pressure":1013,
   "humidity":44,
   "temp_min":306.15, //min  temperature in the city at the moment of calculation
   "temp_max":306.15 //max  temperature in the city at the moment of calculation
},
Toggle
Copy Icon
For comparison look at example of daily forecast weather API response

Example of daily forecast weather API response
"dt":1406080800,
"temp":{
  "day":297.77,  //daily averaged temperature
  "min":293.52, //daily min temperature
  "max":297.77, //daily max temperature
  "night":293.52, //night temperature
  "eve":297.77, //evening temperature
  "morn":297.77, //morning temperature
}
Toggle
Copy Icon
How to get History Bulk functionality

We have recently announced the History Bulk functionality that allows to extract historical data for any location for 47+ years in the past.

For accessing this feature please click the next link. The detailed documentation can be found here.

Other features

Geocoding API
Requesting API calls by geographical coordinates is the most accurate way to specify any location. If you need to convert city names and zip-codes to geo coordinates and the other way around automatically, please use our Geocoding API.

Built-in geocoding
Please use Geocoder API if you need automatic convert city names and zip-codes to geo coordinates and the other way around.

Please note that API requests by city name and city id have been deprecated. Although they are still available for use, bug fixing and updates are no longer available for this functionality.

Built-in API request by city name
Call historical data by city name.

API call
https://history.openweathermap.org/data/2.5/history/city?q={city name},{country code}&type=hour&start={start}&end={end}&appid={API key}
Copy Icon
API call
https://history.openweathermap.org/data/2.5/history/city?q={city name},{country code}&type=hour&start={start}&cnt={cnt}&appid={API key}
Copy Icon
Parameters

q

required

City name, state code and country code divided by comma, please refer to ISO 3166 for the state codes or country codes. You can specify the parameter not only in English. In this case, the API response should be returned in the same language as the language of requested location name if the location is in our predefined list of more than 200,000 locations.

type

required

type of the call, keep this parameter in the API call as hour

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

start

optional

Start date (unix time, UTC time zone), e.g. start=1369728000

end

optional

End date (unix time, UTC time zone), e.g. end=1369789200

cnt

optional

A number of timestamps in response (one per hour, can be used instead of end)

Example of API call
https://history.openweathermap.org/data/2.5/history/city?q=London,UK&appid={API key}
Copy Icon
Example of API call
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
There is a possibility to receive a central district of the city/town with its own parameters (geographic coordinates/id/name) in API response. Please see the example below.

Example of API response
https://history.openweathermap.org/data/2.5/history/city?q=Munchen,DE&appid={API key}
Copy Icon
Example of API response
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
Built-in API request by city ID
Call historical data by city ID.

The list of city IDs can be downloaded here.

API calls
https://history.openweathermap.org/data/2.5/history/city?id={id}&type=hour&start={start}&end={end}&appid={API key}
Copy Icon
API call
https://history.openweathermap.org/data/2.5/history/city?id={id}&type=hour&start={start}&cnt={cnt}&appid={API key}
Copy Icon
Parameters

id

required

City ID. The list of city IDs 'city.list.json.gz' can be downloaded here.

type

required

Type of the call, keep this parameter in the API call as hour

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

start

optional

Start date (unix time, UTC time zone), e.g. start=1369728000

end

optional

End date (unix time, UTC time zone), e.g. end=1369789200

cnt

optional

Amount of returned data (one per hour, can be used instead of end)

Example of API call
https://history.openweathermap.org/data/2.5/history/city?id=2885679&type=hour&appid={API key}
Copy Icon
Example of API call
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
Only for Professional and Expert plans: The maximum historical data depth in one API response is one week.

If you specify a historical data depth more than one week in the request, you will receive a historical data only for first week from start date in one API response.

If you want to get the historical data depth more than one week, then please use several queries.

Units of measurement
standard, metric, and imperial units are available. List of all API parameters with available units.

Parameters

units

optional

standard, metric, imperial. When you do not use the units parameter, format is standard by default.

Standard (by default): temperature in Kelvin, wind speed in meter/sec

Examples of API calls:
https://history.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87&type=hour&start=1643720400&end=1643806800&appid={API key}
Copy Icon
Examples of API calls:
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
Metric: temperature in Celsius, wind speed in meter/sec

Example of API response
https://history.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87&type=hour&start=1643720400&end=1643806800&units=metric&appid={API key}
Copy Icon
Example of API response
To view the API response, expand the example by clicking the triangle.
Toggle
Copy Icon
Imperial: temperature in Fahrenheit, wind speed in miles/hour

Example of API response
https://history.openweathermap.org/data/2.5/history/city?lat=41.85&lon=-87&type=hour&start=1643720400&end=1643806800&units=imperial&appid={API key}
Copy Icon
Example of API response
To view the API response, expand the example by clicking the triangle.


Weather maps 2.0

Forecast, Historical and Current weather maps. 15 weather map layers.You can get all of them using only one simple URL!

Using one simple URL you can get the following weather maps:

Current weather maps
Forecast weather maps: The forecast for 10 days with a 3 hours-step
Historical weather map: Archive since March, 2019
URL format and parameters

Use the following URL format and parameters to get weather maps. Please pay attention to the URL example.

API call
http://maps.openweathermap.org/maps/2.0/weather/{op}/{z}/{x}/{y}?appid={API key}
Copy Icon
Parameters

{op}

required

Weather map layer. Full list of available weather map layers here

{z}

required

Number of zoom level. You could find information about correlation between zoom levels, X, Y tile coordinate numbers and level scale here

{x}

required

Number of x tile coordinate. You could find information about correlation between zoom levels, X, Y tile coordinate numbers and level scale here

{y}

required

Number of y tile coordinate. You could find information about correlation between zoom levels, X, Y tile coordinate numbers and level scale here

appid

required

Your unique API key (you can always find it on your account page under the "API key" tab)

date

optional

Date and time of (Unix time, UTC), e.g. date=1552861800. If you do not specify any date and time, you will get Current weather map. More information about how to get Current, Forecast and Historical maps you can find here.

opacity

optional

Degree of layer opacity. Available value from 0 to 1 (default - 0.8)

palette

optional

Color palette. You can use custom palettes for each layer. You can also create a palette for yourself and pass it to the URL as follows {value}:{HEX color};..;{value}:{HEX color}. More information about it here.

fill_bound

optional

true or false. If true, then all weather values outside the specified set of values will be filled by color corresponding to the nearest specified value (default value - false: all weather values outside the specified set of values are not filled).

arrow_step

optional

Step of values for drawing wind arrows, specify in pixels (default - 32). Parameter only for wind layers (WND).

use_norm

optional

true or false. If true, then the length of the arrows is normalizing (default - false: the length of the arrows is proportional to the speed wind value). Parameter only for wind layers (WND).

URL example
http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1552861800&opacity=0.9&fill_bound=true&appid={API key}
Copy Icon
You need to insert the generated URL into special plugins.

For example, Leaflet, OpenLayers. You can also use any other apps that support the display of layers. Learn more.

How to get current, forecast and historical weather maps using only 'date' parameter?

To get current, forecast or historical weather maps you just need to change only date parameter in the URL request:

1. Current weather maps. Specify the current date and time to get Current weather map. The date and time specified in the request will be rounded to the previous 3-hour interval.

2. Forecast weather maps. You can specify any date and time within the next 10 days to get the Forecast weather maps for the specified time. If you do not specify any date and time, you will get Current weather map.

Not available for TS0 and TS10 layers.

3. Historical weather maps. If you specify any date and time since 18 March 2019, you will receive Historical weather maps for the selected date and time. If you do not specify any date and time, you will get Current weather map.

Please note that the date and time specified in the request will be rounded to the previous 3-hour interval (except TS0 and TS10 layers).

Date and time specified in the request will be rounded to the previous 12-hour interval for TS0 and TS10 layers.

What layers are there in the new weather maps?

To specify the selected layer in the URL, insert instead of the {op} parameter one of the following values:

{Op}

Meaning

Units

PAC0

Convective precipitation

mm

PR0

Precipitation intensity

mm/s

PA0

Accumulated precipitation

mm

PAR0

Accumulated precipitation - rain

mm

PAS0

Accumulated precipitation - snow

mm

SD0

Depth of snow

m

WS10

Wind speed at an altitude of 10 meters

m/s

WND

Joint display of speed wind (color) and wind direction (arrows), received by U and V components

m/s

APM

Atmospheric pressure on mean sea level

hPa

TA2

Air temperature at a height of 2 meters

°C

TD2

Temperature of a dew point

°C

TS0

Soil temperature 0-10 сm

K

TS10

Soil temperature >10 сm

K

HRD0

Relative humidity

%

CL

Cloudiness

%

How to pass my palette in the map?

For each layer we have custom palettes, but you can use your own palette and pass it to the URL as shown {value}:{HEX color};..;{value}:{HEX color}.

The number of values in the custom palette can be any, but not less than 2. You can set the color for any value with any precision.

To pass the code of color, use the HEX format.

URL Example
http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1552861800&opacity=0.9&fill_bound=true&palette=0:FF0000;10:00FF00;20:0000FF&appid={API key}
Copy Icon
Examples of Weather maps

Air temperature at a height of 2 meters weather layer
Default parameters

op : TA2

fill_bound : false

URL example
http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid={API key}
Copy Icon
Air temperature at a height of 2 meters weather layer
Custom palette

op : TA2

opacity : 0.6

fill_bound : true

palette : custom (see example)

Palette current weathermaps2
URL example
http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid={API key}&fill_bound=true&opacity=0.6&palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014
Copy Icon
Accumulated precipitation weather layer
Default parameters

op : PA0

PA0 current weathermaps2
URL example
http://maps.openweathermap.org/maps/2.0/weather/PA0/{z}/{x}/{y}?date=1552861800&appid={API key}
Copy Icon
Atmospheric pressure on mean sea level weather layer
Default parameters

op : APM

APM_current_weathermaps2
URL example
http://maps.openweathermap.org/maps/2.0/weather/PA0/{z}/{x}/{y}?date=1552861800&appid={API key}
Copy Icon
Joint display of speed wind (color) and wind direction (arrows) weather layer
Default parameters

op : WND

use_norm : false

arrow_step : 32

WND current weathermaps2
URL example
http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=1552861800&appid={API key}
Copy Icon
Joint display of speed wind (color) and wind direction (arrows) weather layer
Custom parameters

op : WND

use_norm : true

arrow_step : 16

WND2 current weathermaps2
URL example
http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=1552861800&use_norm=true&arrow_step=16&appid={API key}
Copy Icon
Default palettes

Weather layer

Palette

Opacity

Fill bound

Use norm

Arrow step

PAC0

Convective precipitation

1:ACAAF7; 10:8D8AF3; 20:706EC2; 40:5658FF; 100:5B5DB1; 200:3E3F85

0.8

0

-

-

PR0

Precipitation intensity

0.000005:FEF9CA; 0.000009:B9F7A8; 0.000014:93F57D; 0.000023:78F554; 0.000046:50B033; 0.000092:387F22; 0.000231:204E11; 0.000463:F2A33A; 0.000694:E96F2D; 0.000926:EB4726; 0.001388:B02318; 0.002315:971D13; 0.023150:090A08

0.8

0

-

-

PA0

Accumulated precipitation

0:00000000; 0.1:C8969600; 0.2:9696AA00; 0.5:7878BE19; 1:6E6ECD33; 10:5050E1B2; 140:1414FFE5

0.6

0

-

-

PAR0

Accumulated precipitation - rain

0:E1C86400; 0.1:C8963200; 0.2:9696AA00; 0.5:7878BE00; 1:6E6ECD4C; 10:5050E1B2; 140:1414FFE5

0.6

0

-

-

PAS0

Accumulated precipitation - snow

0:00000000; 5:00D8FFFF; 10:00B6FFFF; 25.076:9549FF

0.7

0

-

-

SD0

Depth of snow

0.05:EDEDED; 0.1:D9F0F4; 0.2:A5E5EF; 0.3:7DDEED; 0.4:35D2EA; 0.5:00CCE8; 0.6:706DCE; 0.7:514FCC; 0.8:3333CC; 0.9:1818CC; 1.2:C454B7; 1.5:C12CB0; 1.8:BF00A8; 2.5:85408C; 3.0:7F2389; 4.0:790087; 15:E80068

0.8

0

-

-

WS10

Wind speed at an altitude of 10 meters

1:FFFFFF00; 5:EECECC66; 15:B364BCB3; 25:3F213BCC; 50:744CACE6; 100:4600AFFF; 200:0D1126FF

0.6

0

-

-

WND

Joint display of speed wind (color) and wind direction (arrows)

1:FFFFFF00; 5:EECECC66; 15:B364BCB3; 25:3F213BCC; 50:744CACE6; 100:4600AFFF; 200:0D1126FF

0.6

0

0

32

APM

Atmospheric pressure on mean sea level

94000:0073FF; 96000:00AAFF; 98000:4BD0D6; 100000:8DE7C7; 101000:B0F720; 102000:F0B800; 104000:FB5515; 106000:F3363B; 108000:C60000

0.4

1

-

-

TA2

Air temperature at a height of 2 meters

-65:821692; -55:821692; -45:821692; -40:821692; -30:8257DB; -20:208CEC; -10:20C4E8; 0:23DDDD; 10:C2FF28; 20:FFF028; 25:FFC228; 30:FC8014

0.3

1

-

-

TD2

Temperature of a dew point

-65:821692; -55:821692; -45:821692; -40:821692; -30:8257DB; -20:208CEC; -10:20C4E8; 0:23DDDD; 10:C2FF28; 20:FFF028; 25:FFC228; 30:FC8014

0.3

1

-

-

TS0

Soil temperature 0-10 сm

203.15:491763; 228.15:4E1378; 235.15:514F9B; 239.15:446DA9; 243.15:5C85B7; 247.15:739FC5; 251.15:88A7C9; -255.15:6CBCD4; 259.15:87CADC; 263.15:A7D8E5; 267.15:A7D5AD; 271.15:D2E9C8; 275.15:FEFEBB; 279.15:F5CEBB; 283.15:F2B68A; 287.15:EE934F; 291.15:EB702D; 295.15:E8706E; 303.15:CC2C44; 313.15:CC0000; 323.15:990000

0.8

1

-

-

TS10

Soil temperature >10 сm

203.15:491763; 228.15:4E1378; 235.15:514F9B; 239.15:446DA9; 243.15:5C85B7; 247.15:739FC5; 251.15:88A7C9; -255.15:6CBCD4; 259.15:87CADC; 263.15:A7D8E5; 267.15:A7D5AD; 271.15:D2E9C8; 275.15:FEFEBB; 279.15:F5CEBB; 283.15:F2B68A; 287.15:EE934F; 291.15:EB702D; 295.15:E8706E; 303.15:CC2C44; 313.15:CC0000; 323.15:990000

0.8

0

-

-

HRD0

Relative humidity

0:db1200; 20:965700; 40:ede100; 60:8bd600; 80:00a808; 100:000099; 100.1:000099

0.8

1

-

-

CL

Cloudiness

0:FFFFFF00; 10:FDFDFF19; 20:FCFBFF26; 30:FAFAFF33; 40:F9F8FF4C; 50:F7F7FF66; 60:F6F5FF8C; 70:F4F4FFBF; 80:E9E9DFCC; 90:DEDEDED8; 100:D2D2D2FF; 200:D2D2D2FF

0.5

0

-

-

Libraries to connect weather layers

Open Layers

The following functions are available for the OpenLayers library:

Classes of weather layer and weather stations layer
Possibility to set your own style
Classes with clustered markers
Support of marker server clustering
Leaflet

The OpenWeatherMap javascript library is designed to work with the Leaflet mapping service. The current version of the library allows the following:

Embedding of layer with current weather in cities
Embedding of layer with weather stations
The library supports customer clustering
Leaflet library

Another implementation of map based on Leaflet technology supports OWM's TileLayers and current city/station data. It is configurable with many options. For current city/station data the library supports refreshing the data in intervals, some types of client-side clustering (show only the station/city with the highest rank for a defined pixel square), custom image set (if you provide one), different languages (en, de, ru, fr, but translation is incomplete), minZoom and others.

Source and documentation (README.md) is available on GitHub https://github.com/buche/leaflet-openweathermap

Example of weather map: https://github.com/owm-inc/VANE-intro/tree/master/apps

Using OpenWeatherMap weather tiles with leaflet: PDF