// Initialize the main map and set its view
var map = L.map('map').setView([11.759852, 107.418673], 8);

// Basemap functionality
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imagery &copy; <a href="https://www.esri.com/">Esri</a>',
    maxZoom: 18,
});

const street = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 28,
});

// Define basemap layers object
const basemaps = {
    "Satellite Imagery": satellite,
    "Street": street
};

// Add the default tile layer to the map
street.addTo(map);

// Custom control with the image
const customControl = L.control({ position: 'bottomleft' });

customControl.onAdd = function (map) {
    const container = L.DomUtil.create('div', 'basemap-control');

    const img = L.DomUtil.create('img', 'basemap-image', container);
    img.src = 'https://i.ibb.co/fHNQYvD/imagery.png';
    img.alt = 'Basemap Imagery';

    const label = L.DomUtil.create('div', 'basemap-label', container);
    label.textContent = 'Imagery';

    img.onclick = function () {
        if (map.hasLayer(street)) {
            map.removeLayer(street);
            satellite.addTo(map);
            img.src = 'https://i.ibb.co/j4TfkcV/street.png';
            label.textContent = 'Street';
        } else {
            map.removeLayer(satellite);
            street.addTo(map);
            img.src = 'https://i.ibb.co/fHNQYvD/imagery.png';
            label.textContent = 'Imagery';
        }
    };

    return container;
};

customControl.addTo(map);

// Define the custom marker icon
var customIcon = L.icon({
    iconUrl: 'https://i.ibb.co/bWhk7NN/gps-shadow.png',
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // mid-center of the icon
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});


// Disable zoom control
map.zoomControl.remove();





