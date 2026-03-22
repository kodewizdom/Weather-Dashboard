import {Sun,Moon,Cloud,CloudRain,CloudSnow,CloudLightning,CloudSun,CloudMoon,CloudSunRain,CloudMoonRain,} from "lucide-react";

export const getWeatherIcon = (code, isDay, size = 48) => {
  
  if (code === 0) {
    return isDay ? <Sun size={size} /> : <Moon size={size} />;
  }

  
  if (code === 1 || code === 2) {
    return isDay
      ? <CloudSun size={size} />
      : <CloudMoon size={size} />;
  }

  if (code === 3) {
    return <Cloud size={size} />;
  }

  if (code >= 51 && code <= 55) {
    return isDay
      ? <CloudSunRain size={size} />
      : <CloudMoonRain size={size} />;
  }

  if (code >= 61 && code <= 67) {
    return <CloudRain size={size} />;
  }

  if (code >= 71 && code <= 77) {
    return <CloudSnow size={size} />;
  }

  if (code >= 80 && code <= 82) {
    return <CloudRain size={size} />;
  }

  if (code >= 95) {
    return <CloudLightning size={size} />;
  }

  return <Cloud size={size} />;
};