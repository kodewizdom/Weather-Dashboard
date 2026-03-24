const WEATHER_API = import.meta.env.VITE_API_WEATHER;
const AIR_API = import.meta.env.VITE_API_AIR;
const GEO_API = import.meta.env.VITE_API_GEO;

export const fetchWeather = async (lat, lon) => {
  try {
    const res = await fetch(
      `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility,precipitation_probability,wind_speed_10m,pm10,pm2_5&daily=weather_code,temperature_2m_max,wind_speed_10m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`,
    );
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const fetchCityName = async (lat, lon) => {
  try {
    const res = await fetch(
      `${GEO_API}?lat=${lat}&lon=${lon}&format=json`,
    );

    const data = await res.json();

    return (
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      "Unknown"
    );
  } catch (error) {
    console.error("Error fetching city:", error);
    return "Unknown";
  }
};

export const fetchAirQuality = async (lat, lon) => {
  try {
    const res = await fetch(
      `${AIR_API}?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=auto`,
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Air quality error:", error);
    return null;
  }
};


export const fetchHistoricalTemp = async (lat, lon, start, end) => {
  try {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=auto`
    );

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Historical temp error:", err);
    return null;
  }
};

export const fetchHistoricalSun = async (lat, lon, start, end) => {
  try {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=sunrise,sunset&timezone=Asia/Kolkata`
    );

    return await res.json();
  } catch (err) {
    console.error("Sun cycle error:", err);
    return null;
  }
};

export const fetchHistoricalPrecipitation = async (lat, lon, start, end) => {
  try {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=precipitation_sum&timezone=auto`
    );

    return await res.json();
  } catch (err) {
    console.error("Precipitation error:", err);
    return null;
  }
};

export const fetchHistoricalWind = async (lat, lon, start, end) => {
  try {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto`
    );

    return await res.json();
  } catch (err) {
    console.error("Wind error:", err);
    return null;
  }
};

export const fetchHistoricalAir = async (lat, lon, start, end) => {
  try {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=pm10,pm2_5&timezone=auto`
    );

    return await res.json();
  } catch (err) {
    console.error("Air error:", err);
    return null;
  }
};