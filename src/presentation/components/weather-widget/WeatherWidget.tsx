import { IWeatherService } from '../../../application/IWeatherService';
import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TodaysWeatherViewmodel } from '../../view-models/todays-weather.viewmodel';
import { ForecastModel } from '../../../application/models/forecast.model';
import { HourlyWeatherViewmodel } from '../../view-models/hourly-weather.viewmodel';
import { TodaysWeatherDetailViewmodel } from '../../view-models/todays-weather-detail.viewmodel';
import { capitalize, unixToDay, unixToHour } from '../../../shared/utils/general.util';
import { DailyWeatherViewmodel } from '../../view-models/daily-weather.viewmodel';
import {
  mapToDailyForecast,
  mapToHourlyForecast,
  mapToTodaysWeatherForecast,
  mapToWeeklyForecast
} from '../../forecast.mapper';
import { DailyForecastItem } from '../daily-forecast-item/DailyForecastItem';
import { HourlyForecastItem } from '../hourly-forecast-item/HourlyForecastItem';
import './WeatherWidget.css';

export function WeatherWidget({weatherService}: { weatherService: IWeatherService }) {
  const [day, setDay] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [todaysWeather, setTodaysWeather] = useState(new TodaysWeatherViewmodel());
  const [hourlyWeather, setHourlyWeather] = useState(new Array<HourlyWeatherViewmodel>());
  const [weeklyWeather, setWeeklyWeather] = useState(new Array<DailyWeatherViewmodel>());
  const [todaysWeatherDetail, setTodaysWeatherDetail] = useState(new TodaysWeatherDetailViewmodel());

  useEffect(() => {
    weatherService.getLocalForecast()
      .then((weatherData: ForecastModel)  => {
        if (weatherData) {
          updateForecast(weatherData);
        }
      });
  }, []);

  return (
    <div id="weather-widget-container" className="container">
      <div id="header-container" className="flex-space-between">
        <div id="todays-weather-brief-container" className="">
          <h1>{todaysWeather.getRoundedTemp()}F</h1>
          <div>Wind: {todaysWeather.getRoundedWindSpeed()} mph</div>
          <div> Humidity: {todaysWeather.humidity}%</div>
        </div>

        <h1>{day}</h1>

        <div id="form-container">
          <form id="location-form" onSubmit={searchLocation}>
            <div className="form-control">
              <input placeholder="Zipcode" required id="zipcode-text-field" name="zipcode" type="text"/>
            </div>

            <button disabled={isSearching}>Search</button>
          </form>
        </div>
      </div>

      <div id="hourly-weather-container" className="flex-center">
        {
          hourlyWeather.map(hourlyWeather => (
            <Fragment key={hourlyWeather.hour}>
              <HourlyForecastItem
                hour={hourlyWeather.hour}
                temp={hourlyWeather.getRoundedTemp()}/>
            </Fragment>
          ))
        }
      </div>

      <div id="weekly-weather-container" className="flex-center">
        {
          weeklyWeather.map(dailyWeather => (
            <Fragment key={dailyWeather.day}>
              <DailyForecastItem
                day={dailyWeather.day}
                highTemp={dailyWeather.getRoundedHighTemp()}
                lowTemp={dailyWeather.getRoundedLowTemp()}/>
            </Fragment>
          ))
        }
      </div>

      <div id="daily-weather-detail-container">
        <div>
          <h3>{capitalize(todaysWeatherDetail.description)}</h3>
          <p>The high will be {todaysWeatherDetail.getRoundedHighTemp()}F, the low will
            be {todaysWeatherDetail.getRoundedLowTemp()}F.</p>
        </div>

        <div>Wind: {todaysWeatherDetail.getRoundedWindSpeed()} mph</div>
        <div>Humidity: {todaysWeatherDetail.humidity}%</div>
      </div>

    </div>
  );

  function updateForecast(weatherData: ForecastModel) {
    setDay(unixToDay(weatherData.dailyWeather.date));
    setHourlyWeather(mapToHourlyForecast(weatherData.hourlyWeather));
    setWeeklyWeather(mapToWeeklyForecast(weatherData.weeklyWeather));
    setTodaysWeather(mapToTodaysWeatherForecast(weatherData.dailyWeather));
    setTodaysWeatherDetail(mapToDailyForecast(weatherData.dailyWeather));
  }

  async function searchLocation(formEvent: any) {
    // Disable search while searching
    setIsSearching(true);

    formEvent.preventDefault();
    // Extract form data
    const form = new FormData(formEvent.target);
    let { zipcode } = Object.fromEntries(form);

    // request data and setup viewmodels
    weatherService.getForecast(zipcode.toString()) // Data converted from File | string --> string
      .then((weatherData: ForecastModel) => {
        updateForecast(weatherData);
        // formEvent.target.reset();
      })
      .catch(err => {
        Swal.fire({
          title: 'Search Error',
          text: err,
          icon: 'error',
        });
      })
      .finally(() => {
        // Enable search after request has completed
        setIsSearching(false);
      });
  }
}