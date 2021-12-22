import { IHourlyWeatherVM } from '../../view-models/hourly-forecast.viewmodel';
import { unixToHour } from '../../../shared/utils/general.util';

import './HourlyForecastItem.css'

export function HourlyForecastItem({hour, temp}: IHourlyWeatherVM) {
  return (
    <div className="hourly-list-item flex-grow">
      <div className="hourly-list-item-wrapper">
        <h3 className="hour">{unixToHour(hour)}</h3>
        <p className="temp">{temp}F</p>
      </div>
    </div>
  )
}