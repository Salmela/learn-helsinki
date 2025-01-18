import { styled } from "solid-styled-components";
import { on, onMount, createEffect } from "solid-js";
import L, { Map, Marker, Polygon } from "leaflet";
import { Coordinate } from "../types";
import "leaflet/dist/leaflet.css";

interface Props {
  init: (map: Map) => void;
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
  return <MapContainer id="map" />;
};

export const QuestionMap = (props: {
  state: () => "select" | "answer";
  answerPolygon: () => Coordinate[];
  setLocation: (location: Coordinate) => void;
}) => {
  let answerMarker: Marker | null = null;
  let activeMap: Map | null = null;

  const init = (map: Map) => {
    activeMap = map;
    map.on("click", (e) => {
      if (props.state() === "answer") return;
      if (answerMarker) {
        answerMarker.remove();
      }
      props.setLocation(e.latlng);
      answerMarker = L.marker(e.latlng);
      answerMarker.addTo(map);
    });
  };

  let answerPolygonOnMap: Polygon | null = null;
  createEffect(
    on(props.answerPolygon, (answer) => {
      if (!activeMap) return;
      if (answerPolygonOnMap) {
        answerPolygonOnMap.remove();
      }
      if (answer) {
        answerPolygonOnMap = L.polygon(answer, { color: "red" });
        answerPolygonOnMap.addTo(activeMap);
      }
    }),
  );
  createEffect(
    on(props.state, (state) => {
      if (state === "select") {
        if (answerMarker) {
          answerMarker.remove();
        }
      }
    }),
  );
  return <BaseMap init={init} />;
};

export const CreateQuestionMap = (props: {
  setPolygon: (points: Coordinate[]) => void;
}) => {
  let mapPolygon: Polygon | null = null;
  let points: Coordinate[] = [];
  const init = (map: Map) => {
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

const MapContainer = styled("div")(`
  height: 400px;
`);
