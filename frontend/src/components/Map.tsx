import { onMount } from "solid-js";
import L, { Map, Marker, Polygon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  init: (map: Map) => void;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export const BaseMap = (props: Props) => {
  onMount(() => {
    const map = L.map("map", {
      center: L.latLng(60.168093, 24.941437),
      zoom: 12,
      minZoom: 10,
      maxBounds: [
        [60.336541, 24.531338],
        [60.104054, 25.280108],
      ],
    });

    props.init(map);

    const layer = L.tileLayer(
      "https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png",
      {
        maxZoom: 16,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>',
      },
    );
    layer.addTo(map);
  });
  return <div id="map" style="height: 400px;"></div>;
};

export const QuestionMap = (props: {
  setLocation: (location: Coordinate) => void;
}) => {
  const init = (map: Map) => {
    let answerMarker: Marker | null = null;
    map.on("click", (e) => {
      if (answerMarker) {
        answerMarker.remove();
      }
      props.setLocation(e.latlng);
      answerMarker = L.marker(e.latlng);
      answerMarker.addTo(map);
    });
  };
  return <BaseMap init={init} />;
};

export const CreateQuestionMap = (props: {
  setPolygon: (points: Coordinate[]) => void;
}) => {
  const init = (map: Map) => {
    let mapPolygon: Polygon | null = null;
    let points: Coordinate[] = [];
    map.on("click", (e) => {
      if (mapPolygon) {
        mapPolygon.remove();
      }
      points.push(e.latlng);
      props.setPolygon(points);
      mapPolygon = L.polygon(points, { color: "red" });
      mapPolygon.addTo(map);
    });
  };
  return <BaseMap init={init} />;
};
