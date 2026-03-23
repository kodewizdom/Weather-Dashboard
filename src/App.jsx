import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { fetchAirQuality, fetchCityName, fetchWeather } from "./services/weatherApi";

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [air, setAir] = useState(null);

  useEffect(() => {
    if (!location) return;

    const getCity = async () => {
      const name = await fetchCityName(location.lat, location.lon);
      setCity(name);
    };

    getCity();
  }, [location]);

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
      },
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    const getWeather = async () => {
      const data = await fetchWeather(location.lat, location.lon);
      setWeather(data);
    };

    getWeather();
  }, [location]);

  useEffect(() => {
  if (!location) return;

  const getAir = async () => {
    const data = await fetchAirQuality(location.lat, location.lon);
    setAir(data);
  };

  getAir();
}, [location]);


  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Dashboard weather={weather} city={city} air={air} />
    </div>
  );
}

export default App;
