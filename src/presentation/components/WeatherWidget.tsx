import { IWeatherService } from '../../application/IWeatherService';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { TodaysWeatherViewmodel } from '../view-models/todays-weather.viewmodel';

export function WeatherWidget({weatherService}: { weatherService: IWeatherService }) {
  const [isSearching, setIsSearching] = useState(false);
  const [todayWeatherViewModel, setWeatherViewModel] = useState(new TodaysWeatherViewmodel());

  return (
    <div id="weather-widget-container" className="container">
      <div id="form-container">
        <form id="location-form" onSubmit={searchLocation}>
          <div className="form-control">
            <label htmlFor="city-text-field">City</label>
            <input id="city-text-field" name="city" type="text"/>
          </div>

          <div className="formControl">
            <label htmlFor="country-text-field">Country</label>
            <input id="country-text-field" name="country" type="text"/>
          </div>

          <button disabled={isSearching}>Search</button>
        </form>
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

    weatherService.getWeeklyWeather(city.toString(), country.toString()) // Data converted from File | string --> string
      .then(res => {
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
    })
  }
}