import { onMount } from 'solid-js'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
  onMount(() => {
    const map = L.map('map', {
      center: L.latLng(60.168093, 24.941437),
      zoom: 12,
      minZoom: 10,
      maxBounds: [
        [60.336541, 24.531338],
        [60.104054, 25.280108]
      ],
    });

    let answerMarker = null;
    map.on('click', (e) => {
      if (answerMarker) {
        answerMarker.remove();
      }
      answerMarker = new L.marker(e.latlng).addTo(map);
    });

    const layer = L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
	maxZoom: 16,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
    });
    layer.addTo(map);
  })
  return <div id="map" style="height: 400px;"></div>;
};
