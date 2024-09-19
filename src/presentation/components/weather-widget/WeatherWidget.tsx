import React, { FormEvent, Fragment, useEffect, useState } from 'react';
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
  const [selectedWeather, setSelectedWeather] = useState<DailyWeatherModel>(new DailyWeatherModel());
  const [isSearching, setIsSearching] = useState(false);
  const {
    currentWeather,
    setCurrentWeather,
    hourlyWeather,
    getWeatherByCityOrZipcode
  } = useWeather();

  useEffect(() => {
    if (currentWeather) {
      setSelectedWeather(currentWeather);
    }
  }, []);

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

  function onHourlyWeatherClick(hourlyWeather: DailyWeatherModel) {
    setSelectedWeather(hourlyWeather);
  }

  return (
    <div className='container'>
      <div id="form-container" className='my-3'>
        <form id="location-form" onSubmit={searchLocation}>
          <div className="row">
            <div className="col-11">
              <input
                className='form-control'
                placeholder="Search by city or zipcode"
                required id="zipcode-text-field"
                name="location"
                type="text"/>
            </div>

            <div className="col-1">
              <button className='btn btn-primary' disabled={isSearching}>Search</button>
            </div>
          </div>
        </form>
      </div>

      <div id="current-weather-container" className='my-3'>
        <div className="row">
          <div id="header-container" className="col-12">
            <div className="text-center mb-3">
              <span className='h3'>{currentWeather.location}</span>,
              <span className='h3'>{unixToDay(currentWeather.date, true)}</span>
            </div>
          </div>
        </div>

        <div className="row align-items-center my-3">
          <div id='weather-icon' className='col-3'>
            <img src="" alt=""/>
          </div>

          <div id='current-weather-brief' className='col-3'>
            <h3>Now</h3>
            <div>{getRoundedTemp(currentWeather.temp)}F</div>
            <div>Wind: {getRoundedWindSpeed(currentWeather.windSpeed)} mph</div>
            <div>Humidity: {currentWeather.humidity}%</div>
          </div>

          <div id="daily-weather-detail-container" className='col-6'>
            <h3>{capitalize(selectedWeather.description)}</h3>
            <p>The high will be {getRoundedHighTemp(selectedWeather.maxTemp)}F, the low will
              be {getRoundedLowTemp(selectedWeather.minTemp)}F.</p>

            <div>Wind: {getRoundedWindSpeed(selectedWeather.windSpeed)} mph</div>
            <div>Humidity: {selectedWeather.humidity}%</div>
          </div>
        </div>
      </div>

      <div id="hourly-weather-container" className='row'>
        <h2 className='text-center'>24 Hour Forecast</h2>
        <div className="col-12 my-3">
          <ul className='list-group list-group-horizontal'>
            {
              (hourlyWeather.length !== 0)
                ? hourlyWeather.map((hourlyWeather: DailyWeatherModel) => (
                  <Fragment
                    key={hourlyWeather.date}>
                  <HourlyWeatherItem
                      hour={hourlyWeather.date}
                      temp={hourlyWeather.temp}
                      clickHandler={() => setCurrentWeather(hourlyWeather)}
                    />
                  </Fragment>
                ))
                : <div>No hourly data available.</div>
            }
          </ul>
        </div>
      </div>
    </div>
  );

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
