import { useState } from 'react';
import { TodaysWeatherViewmodel } from '../view-models/todays-weather.viewmodel';

export function TodaysWeather(temp: number, windSpeed: string, humidity: number) {
  const [currentWeather, setCurrentWeather] = useState(new TodaysWeatherViewmodel());

  return (
    <div>
      <h1>{currentWeather}</h1>

      <div>
        <span>{currentWeather.getFormattedWindspeed()}</span>
        <span>{currentWeather.humidity}</span>
      </div>
    </div>
  );
}