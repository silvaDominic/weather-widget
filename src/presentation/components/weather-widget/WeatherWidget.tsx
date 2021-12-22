import { IWeatherService } from '../../../application/IWeatherService';
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { TodaysForecastVM } from '../../view-models/todays-forecast.viewmodel';
import { ForecastModel } from '../../../application/models/forecast.model';
import { HourlyForecastVM } from '../../view-models/hourly-forecast.viewmodel';
import { DailyForecastVM } from '../../view-models/daily-forecast.viewmodel';
import { capitalize, unixToDay } from '../../../shared/utils/general.util';
import {
  mapToTodaysWeatherDetailVM,
  mapToHourlyForecast,
  mapToTodaysForecastVM,
  mapToWeeklyForecast
} from '../../forecast.mapper';
import { DailyForecastItem } from '../daily-forecast-item/DailyForecastItem';
import { HourlyForecastItem } from '../hourly-forecast-item/HourlyForecastItem';
import './WeatherWidget.css';

export function WeatherWidget({weatherService}: { weatherService: IWeatherService }) {
  const [activeDay, setActiveDay] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [todaysWeather, setTodaysWeather] = useState(new TodaysForecastVM());
  const [hourlyWeather, setHourlyWeather] = useState(new Array<HourlyForecastVM>());
  const [weeklyWeather, setWeeklyWeather] = useState(new Array<DailyForecastVM>());
  const [todaysWeatherDetail, setTodaysWeatherDetail] = useState(new DailyForecastVM());

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
          <h1>Now</h1>
          <h1>{todaysWeather.getRoundedTemp()}F</h1>
          <div>Wind: {todaysWeather.getRoundedWindSpeed()} mph</div>
          <div> Humidity: {todaysWeather.humidity}%</div>
        </div>

        <div className="text-center">
          <h1>{location}</h1>
          <h2>{day}</h2>
        </div>

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
            <Fragment key={dailyWeather.date}>
              <DailyForecastItem
                dailyForecastVM={dailyWeather}
                selectedDay={activeDay}
                clickHandler={() => getWeather(dailyWeather.getDay())}
              />
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
    setLocation(weatherData.displayLocation);
    setDay(unixToDay(weatherData.dailyWeather.date));
    setHourlyWeather(mapToHourlyForecast(weatherData.hourlyWeather));
    setWeeklyWeather(mapToWeeklyForecast(weatherData.weeklyWeather));
    setTodaysWeather(mapToTodaysForecastVM(weatherData.dailyWeather));
    setTodaysWeatherDetail(mapToTodaysWeatherDetailVM(weatherData.dailyWeather));
  }

  function getWeather(day: string): void {
    setActiveDay(day);
    setTodaysWeatherDetail(weeklyWeather.find((weather: DailyForecastVM) => weather.getDay() === day) || new DailyForecastVM())
  }

  async function searchLocation(formEvent: any) {
    // Disable search while searching
    setIsSearching(true);

    formEvent.preventDefault();
    // Extract form data
    const form = new FormData(formEvent.target);
    let { zipcode } = Object.fromEntries(form);

    // request data and setup viewmodels
    weatherService.getForecastByZipcode(zipcode.toString()) // Data converted from File | string --> string
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