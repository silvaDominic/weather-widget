import './DailyForecastItem.css';
import { DailyForecastVM } from '../../view-models/daily-forecast.viewmodel';

interface IDailyForecastItem {
  dailyForecastVM: DailyForecastVM,
  selectedDay: string,
  clickHandler: () => void,
}

export function DailyForecastItem({dailyForecastVM, selectedDay, clickHandler}: IDailyForecastItem) {
  return (
    <div className={`daily-list-item flex-grow ${dailyForecastVM.getDay() === selectedDay ? "active" : ""}`} onClick={clickHandler}>
      <h2>{dailyForecastVM.getDay()}</h2>
      <p className="high-temp">{dailyForecastVM.getRoundedHighTemp()}F</p>
      <p className="low-temp">{dailyForecastVM.getRoundedLowTemp()}F</p>
    </div>
  )
}