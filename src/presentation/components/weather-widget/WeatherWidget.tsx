import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './WeatherWidget.css';
// Models
import { IWeatherService } from '../../../application/models/weather-service.interface';
// Helpers
import { capitalize, unixToDay } from '../../../shared/utils/general.util';
// Comps
import { HourlyWeatherItem } from '../hourly-forecast-item/HourlyWeatherItem';
import { DailyWeatherModel } from "../../../application/models/daily-weather.model";

export function WeatherWidget({weatherService}: { weatherService: IWeatherService }) {
  // Comp state
  const [activeDay, setActiveDay] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Data state
  const [currentWeather, setCurrentWeather] = useState<DailyWeatherModel>(new DailyWeatherModel());
  const [hourlyWeather, setHourlyWeather] = useState<DailyWeatherModel[]>([]);

  function getRoundedTemp(temp: number): number {
    return Math.round(temp);
  }

  function getRoundedWindSpeed(windSpeed: number): number {
    return Math.round(windSpeed);
  }

  function getRoundedHighTemp(temp: number): number {
    return Math.round(temp);
  }

  function getRoundedLowTemp(temp: number): number {
    return Math.round(temp);
  }

  useEffect(() => {
    weatherService.getCurrentWeatherByCurrentLocation()
      .then((weatherData: DailyWeatherModel)  => {
        if (weatherData) {
          setCurrentWeather(weatherData);
        }
      });
  }, []);

  return (
    <div id="weather-widget-container" className="container">
      <div id="header-container" className="flex-space-between">
        <div id="todays-weather-brief-container" className="">
          <h1>Now</h1>
          <h1>{getRoundedTemp(currentWeather.temp)}F</h1>
          <div>Wind: {getRoundedWindSpeed(currentWeather.windSpeed)} mph</div>
          <div>Humidity: {currentWeather.humidity}%</div>
        </div>

        <div className="text-center">
          <h1>{currentWeather.location}</h1>
          <h2>{unixToDay(currentWeather.date, true)}</h2>
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

      <div id="hourly-weather-container" className="text-center">
        <h2>Hourly Forecast</h2>
        {
          (hourlyWeather.length !== 0)
          ? hourlyWeather.map(hourlyWeather => (
            <Fragment key={hourlyWeather.date}>
              <HourlyWeatherItem
                hour={hourlyWeather.date}
                temp={hourlyWeather.temp}/>
            </Fragment>
          ))
          : <div>No hourly data available.</div>
        }
      </div>

      <div id="daily-weather-detail-container">
        <div>
          <h3>{capitalize(currentWeather.description)}</h3>
          <p>The high will be {getRoundedHighTemp(currentWeather.maxTemp)}F, the low will
            be {getRoundedLowTemp(currentWeather.minTemp)}F.</p>
        </div>

        <div>Wind: {getRoundedWindSpeed(currentWeather.windSpeed)} mph</div>
        <div>Humidity: {currentWeather.humidity}%</div>
      </div>

    </div>
  );

  // function setDailyWeather(day: string): void {
  //   setActiveDay(day);
  //   // Get DailyForecast object based on day and set TodaysWeatherDetail with it
  //   const dailyForecast = weeklyWeather.find((weather: DailyForecastVM) => weather.getDay() === day);
  //   setTodaysWeatherDetail(dailyForecast || new DailyForecastVM());
  // }

  /**
   * Searches location based on data acquired from search form
   * @param formEvent
   */
  async function searchLocation(formEvent: any) {
    // Disable search while searching
    setIsSearching(true);

    formEvent.preventDefault();
    // Extract form data
    const form = new FormData(formEvent.target);
    let { zipcode } = Object.fromEntries(form);

    // Request data and setup viewmodels
    weatherService.getCurrentWeatherByZipcode(zipcode.toString()) // Data converted from File | string --> string
      .then((weatherData: DailyWeatherModel) => {
        setCurrentWeather(weatherData);
        formEvent.target.reset();
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
