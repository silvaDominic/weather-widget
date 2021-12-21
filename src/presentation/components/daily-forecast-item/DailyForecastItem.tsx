import { IDailyWeatherViewmodel } from '../../view-models/daily-weather.viewmodel';
import './DailyForecastItem.css';

export function DailyForecastItem({day, highTemp, lowTemp}: IDailyWeatherViewmodel) {
  return (
    <div className="daily-list-item flex-grow">
      <h2>{day}</h2>
      <p className="high-temp">{highTemp}</p>
      <p className="low-temp">{lowTemp}</p>
    </div>
  )
}