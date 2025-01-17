import { Coordinate } from "./types";

export const isPointInPolygon = (
  location: Coordinate | null,
  polygon: Coordinate[],
) => {
  // Cast ray to the right from the location and check if it hits any polygon lines
  let intersections = 0;
  if (!location) return false;

  for (
    let previous = polygon.length - 1, next = 0;
    next < polygon.length;
    previous = next++
  ) {
    const start = polygon[previous];
    const end = polygon[next];
    // Check if [start,end] line is left or right side of checked location
    if (start.lat <= location.lat == location.lat < end.lat) {
      const lineIntersectionPoint =
        (location.lat - start.lat) / (end.lat - start.lat);
      const lineIntersectionLng =
        lineIntersectionPoint * (end.lng - start.lng) + start.lng;

      // Check that the intersection of ray and the edge is on the right
      if (location.lng < lineIntersectionLng) {
        intersections++;
      }
    }
  }

  return intersections % 2 == 1;
};
