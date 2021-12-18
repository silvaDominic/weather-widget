import React from 'react';
import './App.css';
import { WeatherWidget } from './components/WeatherWidget';
import { WeatherService } from '../application/services/weather.service';

function App() {
  return (
    <div className="App">
      <WeatherWidget weatherService={WeatherService}/>
    </div>
  );
}

export default App;
