import { onMount, createSignal } from "solid-js";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  init: (Map) => void;
}

export const BaseMap = (props) => {
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

export const QuestionMap = () => {
  const init = (map: Map) => {
    let answerMarker = null;
    map.on("click", (e) => {
      if (answerMarker) {
        answerMarker.remove();
      }
      answerMarker = new L.marker(e.latlng).addTo(map);
    });
  };
  return <BaseMap init={init} />;
};

export const CreateQuestionMap = () => {
  const [polygon, setPolygon] = createSignal([]);
  const init = (map: Map) => {
    let mapPolygon = null;
    map.on("click", (e) => {
      if (mapPolygon) {
        mapPolygon.remove();
      }
      setPolygon([...polygon(), e.latlng]);
      mapPolygon = L.polygon(polygon(), { color: "red" });
      mapPolygon.addTo(map);
    });
  };
  return (
    <>
      <BaseMap init={init} />
      <input
        type="text"
        value={JSON.stringify(polygon().map((point) => [point.lat, point.lng]))}
      />
    </>
  );
};
