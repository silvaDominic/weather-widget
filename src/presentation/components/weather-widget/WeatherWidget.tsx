import React, { FormEvent, Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import './WeatherWidget.css';
// Helpers
import { capitalize, unixToDay } from '../../../shared/utils/general.util';
// Comps
import { HourlyWeatherItem } from '../hourly-forecast-item/HourlyWeatherItem';
import { DailyWeatherModel } from "../../../application/models/daily-weather.model";
import { useWeather } from "../../hooks/use-weather.hook";

export function WeatherWidget() {
  // Comp state
  const [activeDay, setActiveDay] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const {
    currentWeather,
    setCurrentWeather,
    hourlyWeather,
    getWeatherByCityOrZipcode
  } = useWeather();

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
              <input placeholder="Search by city or zipcode" required id="zipcode-text-field" name="location" type="text"/>
            </div>

            <button disabled={isSearching}>Search</button>
          </form>
        </div>
      </div>

      <div id="hourly-weather-container">
        <h2 className='text-center'>24 Hour Forecast</h2>
        <div>
          {
            (hourlyWeather.length !== 0)
              ? hourlyWeather.map((hourlyWeather: DailyWeatherModel) => (
                <Fragment key={hourlyWeather.date}>
                  <HourlyWeatherItem
                    hour={hourlyWeather.date}
                    temp={hourlyWeather.temp}/>
                </Fragment>
              ))
              : <div>No hourly data available.</div>
          }
        </div>
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
  async function searchLocation(formEvent: FormEvent<HTMLFormElement>) {
    // Disable search while searching
    setIsSearching(true);
    formEvent.preventDefault();
    let form = formEvent.currentTarget;
    // Extract form data
    const formData: FormData = new FormData(form);
    const location: string = (formData.get('location') as String).trim().toLowerCase();

    try {
      await getWeatherByCityOrZipcode(location);
      form.reset();
    } catch (err: any) {
      await Swal.fire({
        title: 'Search Error',
        text: err,
        icon: 'error',
      });
    }

    setIsSearching(false);
  }
}
