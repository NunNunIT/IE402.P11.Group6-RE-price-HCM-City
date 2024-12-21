import proj4, { WGS84 } from "proj4";
import { WEB_MERCATOR } from "./constants";

// polygonMercator.map(([x, y]) => proj4(webMercator, wgs84, [x, y]));
export const parseWebMercatorToWGS84Coordinates = (coordinates: [number, number]): [number, number] => {
  return proj4(WEB_MERCATOR, WGS84, coordinates);
}