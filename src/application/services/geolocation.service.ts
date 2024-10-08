// Models
import { PlainObject } from '@/shared/interfaces/plain-object';
import { IGeolocationResponse } from '../models/geo-response.interface';
import { IGeolocationService } from '../models/geolocation-service.interface';
// Helpers
import { HttpService } from '../services/http.service';
import { mapToGeolocationResponse } from '../mappers/location.mapper';
// Constants
import { API_KEY_OPEN_WEATHER } from '@/shared/constants/environment.const';

const GEOLOCATION_BASE_URL = "https://api.openweathermap.org/geo/1.0";

export const GeolocationService: IGeolocationService = {
  currLocation: undefined,

  async getLocation(): Promise<IGeolocationResponse> {
    if (GeolocationService.currLocation) {
      return GeolocationService.currLocation;
    }

    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position: any) => {
          const location = await getLocationByCoords(position.coords.latitude, position.coords.longitude);
          GeolocationService.currLocation = location;
          resolve(location);
        }, err => {
          reject(err);
        });
      } else {
        reject("Location service not found");
      }
    });
  },

  async getGeolocationByZipcode(zipcode: string): Promise<IGeolocationResponse> {
    if (isValidZipcode(zipcode)) {
      const params: PlainObject = {
        zip: zipcode,
        appid: API_KEY_OPEN_WEATHER,
      }
      try {
        const res = await HttpService.get(`${GEOLOCATION_BASE_URL}/zip`, {params});
        if (!res.data) {
          throw new Error("The provided location cannot be found");
        }
        return await getLocationByCoords(res.data.lat, res.data.lon);
      } catch (err) {
        throw err;
      }
    } else {
      throw new Error("City and/or country must be valid strings");
    }
  },

  async getGeolocationByCity(city: string): Promise<IGeolocationResponse> {
    const params: PlainObject = {
      q: city,
      limit: 1,
      appid: API_KEY_OPEN_WEATHER,
    }

    return HttpService.get(`${GEOLOCATION_BASE_URL}/direct`, {params})
      .then(res => {
        if (!res.data.length) {
          throw new Error("The provided location cannot be found");
        }
        return mapToGeolocationResponse(res.data[0]);
      })
      .catch(err => {
        console.error("GEO-SERVICE: ", err);
        throw err;
      });
  },
}

async function getLocationByCoords(latitude: number, longitude: number): Promise<IGeolocationResponse> {
  const params: PlainObject = {
    lat: latitude,
    lon: longitude,
    limit: 1, // Prefer the first result since we cannot vet the response for correctness
    appid: API_KEY_OPEN_WEATHER,
  }
  return HttpService.get(`${GEOLOCATION_BASE_URL}/reverse`, {params})
    .then(res => {
      if (!res.data.length) {
        throw new Error("The provided location cannot be found");
      }
      return mapToGeolocationResponse(res.data[0]);
    })
    .catch(err => {
      console.error("GEO-SERVICE: ", err);
      throw err;
    })
}

function isValidZipcode(zipcode: string | undefined): boolean {
  // Check if zipcode contains only digits
  return zipcode !== undefined && /^[0-9]+$/.test(zipcode);
}
