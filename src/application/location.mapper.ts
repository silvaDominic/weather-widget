import { CoordinatesModel } from "./models/coordinates.model";

export function mapToCoordinates(responseObj) {
    return new CoordinatesModel(responseObj.lat, responseObj.lon);
}