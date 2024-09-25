import { PlainObject } from '@/shared/interfaces/plain-object';
import { IGeolocationResponse } from '../models/geo-response.interface';

export function mapToGeolocationResponse(dto: PlainObject): IGeolocationResponse {
    return {
        displayLocation: dto.name,
        latitude: dto.lat,
        longitude: dto.lon,
    }
}
