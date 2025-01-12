import { onMount } from 'solid-js'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const Map = () => {
  onMount(() => {
    const map = L.map('map', {
      center: L.latLng(60.168093, 24.941437),
      zoom: 14,
    });

    const key = 'YOUR_MAPTILER_API_KEY_HERE';

    const layer = L.tileLayer('https://tile.openstreetmap.bzh/ca/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://www.openstreetmap.cat" target="_blank">Breton OpenStreetMap Team</a>'
    });
    layer.addTo(map);
  })
  return <div id="map" style="height: 200px;"></div>;
};
