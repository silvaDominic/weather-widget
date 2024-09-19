import { unixToHour } from '../../../shared/utils/general.util';

import './HourlyForecastItem.css'

export type HourlyWeatherItemProps = {
  hour: number,
  temp: number,
  clickHandler: () => void;
}

export function HourlyWeatherItem({hour, temp, clickHandler}: HourlyWeatherItemProps) {
  return (
    <li className="list-group-item" onClick={clickHandler}>
      <div className="hourly-list-item-wrapper">
        <h3 className="hour">{unixToHour(hour)}</h3>
        <p className="temp">{temp}F</p>
      </div>
    </li>
  )
}
