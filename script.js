import mapboxgl from "mapbox-gl";
import { MapboxStyleSwitcherControl } from "mapbox-gl-style-switcher";

mapboxgl.accessToken = "pk.eyJ1IjoiYnBhY2h1Y2EiLCJhIjoiY2lxbGNwaXdmMDAweGZxbmg5OGx2YWo5aSJ9.zda7KLJF3TH84UU6OhW16w";

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [0, 0],
    zoom: 2
});

map.addControl(new MapboxStyleSwitcherControl(), "top-right");

document.getElementById("getLocation").addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            document.getElementById("locationDisplay").innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;

            map.flyTo({ center: [longitude, latitude], zoom: 14 });

            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
        }, (error) => {
            alert("Error getting location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported.");
    }
});
