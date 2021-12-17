import { CoordinatesModel } from "../models/coordinates.model";
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

    async getCoordsByCityAndCountry(city, country) {
        if (city !== "" && country !== "") {
            city = formatCity(city);
            country = formatCountry(country);
            try {
                const result = await fetch(`${GEOLOCATION_BASE_URL}?q=${city}+${country}&format=jsonv2`);
                return result.json();
            } catch (err) {
                console.log(err)
                throw new Error("The provided location cannot be found");
            }
        } else {
            throw new Error("City and/or country must be non-empty strings");
        }
    }
}

function formatCity(city) {
    city = city.trim();
    city = city.replace(/ /g, "+");
    city = city.toLowerCase();
    return city;
}

function formatCountry(country) {
    country = country.trim();
    country = country.replace(/ /g, "+");
    country = country.toLowerCase();
    return country;
}