import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import WeatherCards from "./components/WeatherCards";
import { fetchCityName, fetchWeather } from "./services/weatherApi";

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

useEffect(() => {
  if (!location) return;

  const getCity = async () => {
    const name = await fetchCityName(location.lat, location.lon);
    console.log("CITY",name);
    setCity(name);
  };

  getCity();
}, [location]);

  // 1. Get GPS location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  // 2. Fetch weather after location
  useEffect(() => {
    if (!location) return;

    const getWeather = async () => {
      const data = await fetchWeather(location.lat, location.lon);
      setWeather(data);
    };

    getWeather();
  }, [location]);

  console.log(weather);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <WeatherCards weather={weather} city={city}/>
    </div>
  );
}

export default App;