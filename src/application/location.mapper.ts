import { CoordinatesModel } from "./models/coordinates.model";
import { PlainObject } from '../shared/interfaces/plain-object';

export function mapToCoordinates(responseObj: PlainObject) {
    return new CoordinatesModel(responseObj.lat, responseObj.lon);
}