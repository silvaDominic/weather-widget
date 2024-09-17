import { unixToHour } from '../../../shared/utils/general.util';

import './HourlyForecastItem.css'

export type HourlyWeatherItemProps = {
  hour: number,
  temp: number,
}

export function HourlyWeatherItem({hour, temp}: HourlyWeatherItemProps) {
  return (
    <div className="hourly-list-item flex-grow">
      <div className="hourly-list-item-wrapper">
        <h3 className="hour">{unixToHour(hour)}</h3>
        <p className="temp">{temp}F</p>
      </div>
    </div>
  )
}
