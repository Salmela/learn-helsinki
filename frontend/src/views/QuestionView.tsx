import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { QuestionMap, Coordinate } from "../components/Map";
import { Button, PrimaryButton, ButtonRow } from "../components/Button";

const pointInPolygon = (location: Coordinate | null, polygon: Coordinate[]) => {
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

export const QuestionView = () => {
  const navigate = useNavigate();
  const [response, setResponse] = createSignal<Coordinate | null>(null);
  const polygon = [
    [60.17289589344101, 24.93902919252459],
    [60.173002620382846, 24.943321029970306],
    [60.17195668140074, 24.94338540753199],
    [60.17193533536047, 24.94254849923009],
    [60.17072926155439, 24.94269871354068],
    [60.17071858813724, 24.94029528457108],
    [60.17225552450813, 24.940166529447716],
    [60.17226619742596, 24.93902919252459],
  ].map(([lat, lng]) => ({ lat, lng }));
  return (
    <>
      <h1>Where is Steissi?</h1>
      <QuestionMap setLocation={setResponse} />
      <ButtonRow>
        <Button onClick={() => navigate("/")}>Give up</Button>
        <PrimaryButton
          disabled={!response()}
          onClick={() =>
            alert(pointInPolygon(response(), polygon) ? "Correct" : "Incorrect")
          }
        >
          Check
        </PrimaryButton>
      </ButtonRow>
    </>
  );
};
