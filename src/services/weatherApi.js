const WEATHER_API = import.meta.env.VITE_API_WEATHER;
const AIR_API = import.meta.env.VITE_API_AIR;
const GEO_API = import.meta.env.VITE_API_GEO;

export const fetchWeather = async (lat, lon) => {
  try {
    const res = await fetch(
      `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation,uv_index&hourly=temperature_2m,relative_humidity_2m,precipitation,visibility,wind_speed_10m,pm10,pm2_5&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`,
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
