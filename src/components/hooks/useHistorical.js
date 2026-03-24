import { useEffect, useState } from "react";
import {fetchHistoricalSun, fetchHistoricalTemp, fetchHistoricalPrecipitation, fetchHistoricalWind, fetchHistoricalAir} from "../../services/weatherApi";

export const useHistorical = (lat, lon, startDate, endDate, unit) => {
  const [tempData, setTempData] = useState(null);
  const [sunData, setSunData] = useState(null);
  const [precipData, setPrecipData] = useState(null);
  const [windData, setWindData] = useState(null);
  const [airData, setAirData] = useState(null);

  // ✅ ONE CLEAN EFFECT (BEST PRACTICE)
  useEffect(() => {
    if (!lat || !lon) return;

    const load = async () => {
      const temp = await fetchHistoricalTemp(lat, lon, startDate, endDate);
      const sun = await fetchHistoricalSun(lat, lon, startDate, endDate);
      const precip = await fetchHistoricalPrecipitation(lat, lon, startDate, endDate);
      const wind = await fetchHistoricalWind(lat, lon, startDate, endDate);
      const air = await fetchHistoricalAir(lat, lon, startDate, endDate);

      setTempData(temp);
      setSunData(sun);
      setPrecipData(precip);
      setWindData(wind);
      setAirData(air);
    };

    load();
  }, [lat, lon, startDate, endDate]);

  // 🔥 TEMP
  const tempMonthly = () => {
    if (!tempData?.daily) return [];

    const map = {};

    tempData.daily.time.forEach((date, i) => {
      const month = date.slice(0, 7);

      if (!map[month]) {
        map[month] = { min: [], max: [], mean: [] };
      }

      map[month].min.push(tempData.daily.temperature_2m_min[i]);
      map[month].max.push(tempData.daily.temperature_2m_max[i]);
      map[month].mean.push(tempData.daily.temperature_2m_mean[i]);
    });

    return Object.keys(map).map((month) => {
      const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

      let min = avg(map[month].min);
      let max = avg(map[month].max);
      let mean = avg(map[month].mean);

      if (unit === "F") {
        min = (min * 9) / 5 + 32;
        max = (max * 9) / 5 + 32;
        mean = (mean * 9) / 5 + 32;
      }

      return {
        month,
        min: Number(min.toFixed(1)),
        max: Number(max.toFixed(1)),
        mean: Number(mean.toFixed(1)),
      };
    });
  };

  // 🔥 SUN
  const sunMonthly = () => {
    if (!sunData?.daily) return [];

    const map = {};

    const toDecimal = (t) => {
      const d = new Date(t);
      return d.getHours() + d.getMinutes() / 60;
    };

    sunData.daily.time.forEach((date, i) => {
      const month = date.slice(0, 7);

      if (!map[month]) {
        map[month] = { sunrise: [], sunset: [] };
      }

      map[month].sunrise.push(toDecimal(sunData.daily.sunrise[i]));
      map[month].sunset.push(toDecimal(sunData.daily.sunset[i]));
    });

    return Object.keys(map).map((month) => {
      const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

      return {
        month,
        sunrise: Number(avg(map[month].sunrise).toFixed(2)),
        sunset: Number(avg(map[month].sunset).toFixed(2)),
      };
    });
  };

  // 🔥 PRECIPITATION
  const precipMonthly = () => {
    if (!precipData?.daily) return [];

    const { time, precipitation_sum } = precipData.daily;

    const map = {};

    time.forEach((date, i) => {
      const month = date.slice(0, 7);

      if (!map[month]) {
        map[month] = 0;
      }

      map[month] += precipitation_sum[i] || 0;
    });

    return Object.keys(map).map((month) => ({
      month,
      rain: Number(map[month].toFixed(1)),
    }));
  };

  // 🔥 WIND (NEW)
  const windMonthly = () => {
    if (!windData?.daily) return [];

    const { time, wind_speed_10m_max, wind_direction_10m_dominant } =
      windData.daily;

    const map = {};

    time.forEach((date, i) => {
      const month = date.slice(0, 7);

      if (!map[month]) {
        map[month] = { speed: [], direction: [] };
      }

      map[month].speed.push(wind_speed_10m_max[i]);
      map[month].direction.push(wind_direction_10m_dominant[i]);
    });

    return Object.keys(map).map((month) => {
      const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

      return {
        month,
        speed: Number(avg(map[month].speed).toFixed(1)),
        direction: Number(avg(map[month].direction).toFixed(0)),
      };
    });
  };

  //air
  const airMonthly = () => {
    if (!airData?.hourly) return [];

    const { time, pm10, pm2_5 } = airData.hourly;

    const map = {};

    time.forEach((date, i) => {
      const month = date.slice(0, 7);

      if (!map[month]) {
        map[month] = { pm10: [], pm25: [] };
      }

      if (pm10[i] != null) map[month].pm10.push(pm10[i]);
      if (pm2_5[i] != null) map[month].pm25.push(pm2_5[i]);
    });

    return Object.keys(map).map((month) => {
      const avg = (arr) =>
        arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

      return {
        month,
        pm10: Number(avg(map[month].pm10).toFixed(1)),
        pm25: Number(avg(map[month].pm25).toFixed(1)),
      };
    });
  };

  return {
    tempMonthly: tempMonthly(),
    sunMonthly: sunMonthly(),
    precipMonthly: precipMonthly(),
    windMonthly: windMonthly(),
    airMonthly: airMonthly(),
  };
};
