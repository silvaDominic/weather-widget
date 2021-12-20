import { IWeatherService } from '../../application/IWeatherService';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { TodaysWeatherViewmodel } from '../view-models/todays-weather.viewmodel';
import { ForecastModel } from '../../application/models/forecast.model';
import { HourlyWeatherViewmodel } from '../view-models/hourly-weather.viewmodel';
import { TodaysWeatherDetailViewmodel } from '../view-models/todays-weather-detail.viewmodel';
import { kelvinToFahrenheit, unixToDay, unixToHour } from '../../shared/utils/general.util';
import { DailyWeatherViewmodel } from '../view-models/daily-weather.viewmodel';
import {
  mapToDailyForecast,
  mapToHourlyForecast,
  mapToTodaysWeatherForecast,
  mapToWeeklyForecast
} from '../forecast.mapper';

export function WeatherWidget({weatherService}: { weatherService: IWeatherService }) {
  const [day, setDay] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [todaysWeather, setTodaysWeather] = useState(new TodaysWeatherViewmodel());
  const [hourlyWeather, setHourlyWeather] = useState(new Array<HourlyWeatherViewmodel>());
  const [weeklyWeather, setWeeklyWeather] = useState(new Array<DailyWeatherViewmodel>());
  const [todaysWeatherDetail, setTodaysWeatherDetail] = useState(new TodaysWeatherDetailViewmodel());

  return (
    <div id="weather-widget-container" className="container">
      <div id="todays-weather-brief-container">
        <h1>{todaysWeather.temp}F</h1>
        <div>
          Wind: {todaysWeather.windSpeed} mph
          Humidity: {todaysWeather.humidity} %
        </div>
      </div>

      <div>{day}</div>

      <div id="form-container">
        <form id="location-form" onSubmit={ searchLocation }>
          <div className="form-control">
            <label htmlFor="city-text-field">City</label>
            <input required id="city-text-field" name="city" type="text"/>
          </div>

          <div className="formControl">
            <label htmlFor="country-text-field">Country</label>
            <input required id="country-text-field" name="country" type="text"/>
          </div>

          <button disabled={isSearching}>Search</button>
        </form>

        <div id="hourly-weather-container">
          {
            hourlyWeather.map(hourlyWeather => (
              <div key={hourlyWeather.hour}>
                <div>{unixToHour(hourlyWeather.hour)}</div>
                <div>{hourlyWeather.temp}</div>
              </div>
            ))
          }
        </div>

        <hr/>

        <div id="weekly-weather-container">
          {
            weeklyWeather.map(dailyWeather => (
              <span key={dailyWeather.day}>
                <div>{dailyWeather.day}</div>
                <div>{dailyWeather.highTemp}</div>
                <div>{dailyWeather.lowTemp}</div>
              </span>
            ))
          }
        </div>

        <hr/>

        <div id="daily-weather-detail-container">
          <div>
            <h3>{todaysWeatherDetail.description}</h3>
            <p>The high will be {todaysWeatherDetail.highTemp}F, the low will
              be {todaysWeatherDetail.lowTemp}F.</p>
          </div>

          <div>
            Wind: {todaysWeatherDetail.windSpeed} mph
            Humidity: {todaysWeatherDetail.humidity} %
          </div>
        </div>
      </div>
    </div>
  );

  async function searchLocation(formEvent: any) {
    // Disable search while searching
    setIsSearching(true);

    formEvent.preventDefault();
    // Extract form data
    const form = new FormData(formEvent.target);
    let {city, country} = Object.fromEntries(form);

    // request data and setup viewmodels
    weatherService.getForecast(city.toString(), country.toString()) // Data converted from File | string --> string
      .then((weatherData: ForecastModel) => {
        setDay(unixToDay(weatherData.dailyWeather.date));
        setHourlyWeather(mapToHourlyForecast(weatherData.hourlyWeather));
        setWeeklyWeather(mapToWeeklyForecast(weatherData.weeklyWeather));
        setTodaysWeather(mapToTodaysWeatherForecast(weatherData.dailyWeather));
        setTodaysWeatherDetail(mapToDailyForecast(weatherData.dailyWeather));
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