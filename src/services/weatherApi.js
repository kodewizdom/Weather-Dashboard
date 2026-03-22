// src/services/weatherApi.js

export const fetchWeather = async (lat, lon) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto`,
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
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    );

    const data = await res.json();

    console.log("GEO DATA:", data);

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
