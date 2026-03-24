import { useEffect, useMemo, useState } from "react";
import {
  fetchHistoricalSun,
  fetchHistoricalTemp,
  fetchHistoricalPrecipitation,
  fetchHistoricalWind,
  fetchHistoricalAir,
} from "../../services/weatherApi";

export const useHistorical = (lat, lon, startDate, endDate, unit) => {
  const [data, setData] = useState({
    temp: null,
    sun: null,
    precip: null,
    wind: null,
    air: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lon) return;

    const load = async () => {
      setLoading(true);

      const [temp, sun, precip, wind, air] = await Promise.all([
        fetchHistoricalTemp(lat, lon, startDate, endDate),
        fetchHistoricalSun(lat, lon, startDate, endDate),
        fetchHistoricalPrecipitation(lat, lon, startDate, endDate),
        fetchHistoricalWind(lat, lon, startDate, endDate),
        fetchHistoricalAir(lat, lon, startDate, endDate),
      ]);

      setData({ temp, sun, precip, wind, air });
      setLoading(false);
    };

    load();
  }, [lat, lon, startDate, endDate]);

  // helper
  const groupByMonth = (dates, cb) => {
    const map = {};

    dates.forEach((date, i) => {
      const month = date.slice(0, 7);
      if (!map[month]) map[month] = [];
      cb(map[month], i);
    });

    return map;
  };

  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  // ---------------- MEMOIZED DATA ----------------

  const tempMonthly = useMemo(() => {
    if (!data.temp?.daily) return [];

    const { time, temperature_2m_min, temperature_2m_max, temperature_2m_mean } =
      data.temp.daily;

    const map = groupByMonth(time, (bucket, i) => {
      bucket.push({
        min: temperature_2m_min[i],
        max: temperature_2m_max[i],
        mean: temperature_2m_mean[i],
      });
    });

    return Object.entries(map).map(([month, values]) => {
      let min = avg(values.map((v) => v.min));
      let max = avg(values.map((v) => v.max));
      let mean = avg(values.map((v) => v.mean));

      if (unit === "F") {
        min = (min * 9) / 5 + 32;
        max = (max * 9) / 5 + 32;
        mean = (mean * 9) / 5 + 32;
      }

      return {
        month,
        min: +min.toFixed(1),
        max: +max.toFixed(1),
        mean: +mean.toFixed(1),
      };
    });
  }, [data.temp, unit]);

  const sunMonthly = useMemo(() => {
    if (!data.sun?.daily) return [];

    const toDecimal = (t) => {
      const d = new Date(t);
      return d.getHours() + d.getMinutes() / 60;
    };

    const { time, sunrise, sunset } = data.sun.daily;

    const map = groupByMonth(time, (bucket, i) => {
      bucket.push({
        sunrise: toDecimal(sunrise[i]),
        sunset: toDecimal(sunset[i]),
      });
    });

    return Object.entries(map).map(([month, values]) => ({
      month,
      sunrise: +avg(values.map((v) => v.sunrise)).toFixed(2),
      sunset: +avg(values.map((v) => v.sunset)).toFixed(2),
    }));
  }, [data.sun]);

  const precipMonthly = useMemo(() => {
    if (!data.precip?.daily) return [];

    const { time, precipitation_sum } = data.precip.daily;

    const map = groupByMonth(time, (bucket, i) => {
      bucket.push(precipitation_sum[i] || 0);
    });

    return Object.entries(map).map(([month, values]) => ({
      month,
      rain: +values.reduce((a, b) => a + b, 0).toFixed(1),
    }));
  }, [data.precip]);

  const windMonthly = useMemo(() => {
    if (!data.wind?.daily) return [];

    const { time, wind_speed_10m_max, wind_direction_10m_dominant } =
      data.wind.daily;

    const map = groupByMonth(time, (bucket, i) => {
      bucket.push({
        speed: wind_speed_10m_max[i],
        direction: wind_direction_10m_dominant[i],
      });
    });

    return Object.entries(map).map(([month, values]) => ({
      month,
      speed: +avg(values.map((v) => v.speed)).toFixed(1),
      direction: +avg(values.map((v) => v.direction)).toFixed(0),
    }));
  }, [data.wind]);

  const airMonthly = useMemo(() => {
    if (!data.air?.hourly) return [];

    const { time, pm10, pm2_5 } = data.air.hourly;

    const map = groupByMonth(time, (bucket, i) => {
      if (pm10[i] != null) bucket.push({ pm10: pm10[i], pm25: pm2_5[i] });
    });

    return Object.entries(map).map(([month, values]) => ({
      month,
      pm10: +avg(values.map((v) => v.pm10)).toFixed(1),
      pm25: +avg(values.map((v) => v.pm25)).toFixed(1),
    }));
  }, [data.air]);

  return {
    loading,
    tempMonthly,
    sunMonthly,
    precipMonthly,
    windMonthly,
    airMonthly,
  };
};