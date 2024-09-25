import React, { FormEvent, Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './WeatherWidget.css';
// Helpers
import { capitalize, formatWind, unixToDay } from '@/shared/utils/general.util';
// Models
import { DailyWeatherModel } from "@/application/models/daily-weather.model";
// Comps
import { HourlyWeatherItem } from '../hourly-forecast-item/HourlyWeatherItem';
import { useWeather } from "../../hooks/use-weather.hook";

export function WeatherWidget() {
  // Comp state
  const [selectedWeather, setSelectedWeather] = useState<DailyWeatherModel>(new DailyWeatherModel());
  const {
    currentWeather,
    setCurrentWeather,
    hourlyWeather,
    getWeatherByCityOrZipcode,
    isSearching,
  } = useWeather();

  useEffect(() => {
    if (currentWeather) {
      setSelectedWeather(currentWeather);
    }
  }, []);

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
        {
          (!currentWeather)
            ?
            <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            :
            <>
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
                  <div>{currentWeather.getRoundedTemp()}F</div>
                  <div>Wind: {formatWind(currentWeather.getRoundedWindSpeed(), 'mph', currentWeather.getCardinalDirection())}</div>
                  <div>Humidity: {currentWeather.humidity}%</div>
                </div>

                <div id="daily-weather-detail-container" className='col-6'>
                  <h3>{capitalize(selectedWeather.description)}</h3>
                  <p>The high will be {selectedWeather.getRoundedMaxTemp()}F, the low will
                    be {selectedWeather.getRoundedMinTemp()}F.</p>

                  <div>Wind: {formatWind(currentWeather.getRoundedWindSpeed(), 'mph', currentWeather.getCardinalDirection())}</div>
                  <div>Humidity: {selectedWeather.humidity}%</div>
                </div>
              </div>
            </>
        }
      </div>

      <div id="hourly-weather-container" className='row'>
        <h2 className='text-center'>24 Hour Forecast</h2>
        <div className="col-12 my-3">
          <ul className='list-group list-group-horizontal'>
            {
              (!hourlyWeather)
                ?
                new Array(8).fill(null).map((_: any) => (
                  <li className='list-group-item text-center'>
                    <div className="spinner-grow text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                ))
                :
                hourlyWeather.map((hourlyWeather: DailyWeatherModel) => (
                  <Fragment
                    key={hourlyWeather.date}>
                    <HourlyWeatherItem
                      hour={hourlyWeather.date}
                      temp={hourlyWeather.getRoundedTemp()}
                      clickHandler={() => setCurrentWeather(hourlyWeather)}
                    />
                  </Fragment>
                ))
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
  }
}
