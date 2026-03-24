import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudSun,
  CloudMoon,
  CloudSunRain,
  CloudMoonRain,
} from "lucide-react";

const withSize = (Icon, size) => <Icon size={size} />;

export const getWeatherIcon = (code, isDay, size = 48) => {
  // clear sky
  if (code === 0) {
    return withSize(isDay ? Sun : Moon, size);
  }

  // partly cloudy
  if ([1, 2].includes(code)) {
    return withSize(isDay ? CloudSun : CloudMoon, size);
  }

  // overcast
  if (code === 3) {
    return withSize(Cloud, size);
  }

  // drizzle
  if (code >= 51 && code <= 55) {
    return withSize(isDay ? CloudSunRain : CloudMoonRain, size);
  }

  // rain
  if (
    (code >= 61 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return withSize(CloudRain, size);
  }

  // snow
  if (code >= 71 && code <= 77) {
    return withSize(CloudSnow, size);
  }

  // thunderstorm
  if (code >= 95) {
    return withSize(CloudLightning, size);
  }

  // fallback
  return withSize(Cloud, size);
};