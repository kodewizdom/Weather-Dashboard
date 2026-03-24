import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Historical from "./components/Historical";
import Loader from "./components/common/Loader";


import {
  fetchAirQuality,
  fetchCityName,
  fetchWeather,
} from "./services/weatherApi";
import LocationPopup from "./components/common/LocationPopup";
import Footer from "./components/common/Footer";

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [air, setAir] = useState(null);
  const [unit, setUnit] = useState("C");

  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);

  // ---------------- LOCATION ----------------
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLocationError(false);
      },
      (err) => {
        console.error("Location error:", err);
        setLocationError(true);
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  // ---------------- CITY ----------------
  useEffect(() => {
    if (!location || city) return;

    const getCity = async () => {
      const name = await fetchCityName(location.lat, location.lon);
      setCity(name);
    };

    getCity();
  }, [location]);

  // ---------------- WEATHER ----------------
  useEffect(() => {
    if (!location) return;

    const getWeather = async () => {
      const data = await fetchWeather(location.lat, location.lon);
      setWeather(data);
    };

    getWeather();
  }, [location]);

  // ---------------- AIR ----------------
  useEffect(() => {
    if (!location) return;

    const getAir = async () => {
      const data = await fetchAirQuality(location.lat, location.lon);
      setAir(data);
    };

    getAir();
  }, [location]);

  // ---------------- LOADER CONTROL ----------------
  useEffect(() => {
    if (weather && air && location) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [weather, air, location]);

  // ---------------- RETRY ----------------
  const handleRetryLocation = () => {
    getLocation();
  };

  return (
    <>
      {/* Loader */}
      {loading && <Loader onFinish={() => setLoading(false)} />}

      {/* Location Popup */}
      {locationError && (
        <LocationPopup onRetry={handleRetryLocation}/>
      )}

      {/* Main App */}
      {!loading && !locationError && (
        <div className="bg-gray-50 min-h-screen">
          <Navbar
            unit={unit}
            setUnit={setUnit}
            setLocation={setLocation}
            setCity={setCity}
          />

          <Dashboard
            weather={weather}
            city={city}
            air={air}
            unit={unit}
          />

          <Analytics weather={weather} air={air} unit={unit} />

          <Historical location={location} unit={unit} />

          <Footer/>
        </div>
      )}
    </>
  );
}

export default App;