import React from 'react'
import Navbar from './components/Navbar';
import WeatherCards from './components/WeatherCards';
import HeroCard from './components/HeroCard';

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      {/* <HeroCard/> */}
      <WeatherCards/>
    </div>
  );
}

export default App