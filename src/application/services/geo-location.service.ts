import { CoordinatesModel } from "../models/coordinates.model";
import axios from 'axios';
import { PlainObject } from '../../shared/interfaces/plain-object';
const GEOLOCATION_BASE_URL = "https://nominatim.openstreetmap.org/search.php";

export const GeoLocationService = {
    async getCurrentLocationCoords(): Promise<any> {
        return new Promise((resolve, reject) => {
            if('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve(new CoordinatesModel(position.coords.latitude, position.coords.longitude));
                }, err => {
                    reject(err);
                });
            } else {
                reject("Location service not found");
            }
        });
    },

    async getCoordsByZipcode(zipcode: string): Promise<any> {
        if (isValidParams(zipcode)) {
            const params: PlainObject = {
                q: zipcode,
                format: "jsonv2",
            }
            return axios.get(GEOLOCATION_BASE_URL, { params })
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

function isValidParams(zipcode: string): boolean {
    return zipcode !== undefined && /^[0-9]+$/.test(zipcode);
}

function formatCity(city: string): string {
    city = city.trim();
    city = city.replace(/ /g, "+");
    city = city.toLowerCase();
    return city;
}

function formatCountry(country: string): string {
    country = country.trim();
    country = country.replace(/ /g, "+");
    country = country.toLowerCase();
    return country;
}