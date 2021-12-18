import { IWeatherService } from '../../application/IWeatherService';

export function WeatherWidget({weatherService}: {weatherService: IWeatherService}) {
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

          <button>Search</button>
        </form>

      </div>
    </div>
  );

  async function searchLocation(formEvent: any) {
    formEvent.preventDefault();
    const form = new FormData(formEvent.target);
    const { city, country } = Object.fromEntries(form);
    const weather = await weatherService.getWeeklyWeather(city.toString(), country.toString());
    console.log(weather);
  }
}