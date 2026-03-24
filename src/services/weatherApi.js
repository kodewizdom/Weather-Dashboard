const API = {
  WEATHER: import.meta.env.VITE_API_WEATHER,
  AIR: import.meta.env.VITE_API_AIR,
  GEO: import.meta.env.VITE_API_GEO,
  HISTORICAL: {
    TEMP: import.meta.env.VITE_API_HIS_TEMP,
    SUN: import.meta.env.VITE_API_HIS_SUN,
    PRECIP: import.meta.env.VITE_API_HIS_PREP,
    WIND: import.meta.env.VITE_API_HIS_WIND,
    AIR: import.meta.env.VITE_API_HIS_AIR,
    CITY: import.meta.env.VITE_API_HIS_CITY,
  },
};

// generic fetch helper
const fetchData = async (url, errorMsg = "API error") => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`${errorMsg}: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(errorMsg, err);
    return null;
  }
};

// ---------------- WEATHER ----------------

export const fetchWeather = (lat, lon) =>
  fetchData(
    `${API.WEATHER}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility,precipitation_probability,wind_speed_10m,pm10,pm2_5&daily=weather_code,temperature_2m_max,wind_speed_10m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`,
    "Weather fetch failed"
  );

// ---------------- CITY ----------------

export const fetchCityName = async (lat, lon) => {
  const data = await fetchData(
    `${API.GEO}?lat=${lat}&lon=${lon}&format=json`,
    "City fetch failed"
  );

  if (!data) return "Unknown Location";

  const addr = data.address || {};

  return (
    addr.city ||
    addr.town ||
    addr.village ||
    addr.state ||
    addr.county ||
    addr.country ||
    "Unknown Location"
  );
};

// ---------------- AIR ----------------

export const fetchAirQuality = (lat, lon) =>
  fetchData(
    `${API.AIR}?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,carbon_dioxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`,
    "Air quality fetch failed"
  );

// ---------------- HISTORICAL ----------------

export const fetchHistoricalTemp = (lat, lon, start, end) =>
  fetchData(
    `${API.HISTORICAL.TEMP}?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=auto`,
    "Historical temp failed"
  );

export const fetchHistoricalSun = (lat, lon, start, end) =>
  fetchData(
    `${API.HISTORICAL.SUN}?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=sunrise,sunset&timezone=Asia/Kolkata`,
    "Sun data failed"
  );

export const fetchHistoricalPrecipitation = (lat, lon, start, end) =>
  fetchData(
    `${API.HISTORICAL.PRECIP}?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=precipitation_sum&timezone=auto`,
    "Precipitation failed"
  );

export const fetchHistoricalWind = (lat, lon, start, end) =>
  fetchData(
    `${API.HISTORICAL.WIND}?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`,
    "Wind data failed"
  );

export const fetchHistoricalAir = (lat, lon, start, end) =>
  fetchData(
    `${API.HISTORICAL.AIR}?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=pm10,pm2_5&timezone=auto`,
    "Historical air failed"
  );

// ---------------- CITY SEARCH ----------------

export const fetchCoordsFromCity = async (city) => {
  const data = await fetchData(
    `${API.HISTORICAL.CITY}?name=${city}&count=15&language=en`,
    "City search failed"
  );

  if (!data?.results) return [];

  const filtered = data.results.filter(
    (place) => place.population && place.population > 50000
  );

  const unique = [];
  const seen = new Set();

  for (const place of filtered) {
    const key = `${place.name}-${place.country}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(place);
    }
  }

  return unique
    .sort((a, b) => {
      const aExact = a.name.toLowerCase() === city.toLowerCase();
      const bExact = b.name.toLowerCase() === city.toLowerCase();

      if (aExact) return -1;
      if (bExact) return 1;

      return (b.population || 0) - (a.population || 0);
    })
    .slice(0, 5);
};