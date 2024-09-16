import { IGeolocationResponse } from './geo-response.interface';

export interface IGeolocationService {
  getCurrentLocationCoords(): Promise<IGeolocationResponse>,
  getGeolocationByZipcode(zipcode: string): Promise<IGeolocationResponse>,
  getGeolocationByCity(city: string): Promise<IGeolocationResponse>,
}
