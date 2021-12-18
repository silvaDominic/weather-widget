import { CoordinatesModel } from "../models/coordinates.model";
import axios from 'axios';
const GEOLOCATION_BASE_URL = "https://nominatim.openstreetmap.org/search.php";

export const GeoLocationService = {
    async getCurrentLocation() {
        if('geolocation' in navigator) {
            return navigator.geolocation.getCurrentPosition(position => {
                return new CoordinatesModel(position.coords.latitude, position.coords.longitude);
            })
        } else {
            /* geolocation IS NOT available */
        }
    },

    async getCoordsByCityAndCountry(city: string, country: string) {
        if (isValidParams(city, country)) {
            city = formatCity(city);
            country = formatCountry(country);
            return axios.get(`${GEOLOCATION_BASE_URL}?q=${city}+${country}&format=jsonv2`)
              .then(res => {
                  if (!res.data.length) {
                      throw new Error("The provided location cannot be found");
                  }
                  return res.data;
              })
              .catch(err => {
                  console.log("GEO-SERVICE: ", err);
                  throw err;
              })
        } else {
            throw new Error("City and/or country must be valid strings");
        }
    }
}

function isValidParams(city: string, country: string) {
    return city !== "" && country !== ""
}

function formatCity(city: string) {
    city = city.trim();
    city = city.replace(/ /g, "+");
    city = city.toLowerCase();
    return city;
}

function formatCountry(country: string) {
    country = country.trim();
    country = country.replace(/ /g, "+");
    country = country.toLowerCase();
    return country;
}