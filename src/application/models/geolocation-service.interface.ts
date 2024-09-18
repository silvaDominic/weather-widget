import { IGeolocationResponse } from './geo-response.interface';

export interface IGeolocationService {
  currLocation: IGeolocationResponse | undefined,
  getLocation(): Promise<IGeolocationResponse>,
  getGeolocationByZipcode(zipcode: string): Promise<IGeolocationResponse>,
  getGeolocationByCity(city: string): Promise<IGeolocationResponse>,
}
