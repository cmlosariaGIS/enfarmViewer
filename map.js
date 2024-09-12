//map.js

// Initialize the main map and set its view
var map = L.map('map', {zoomControl: false}).setView([11.759852, 107.418673], 8);

// Basemap functionality
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Imagery &copy; <a href="https://www.esri.com/">Esri</a>',
    maxZoom: 28,
});

const esriOcean = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, GEBCO, NOAA NGDC, and other contributors',
    maxZoom: 28,
});

const cartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 28,
});

// Define basemap layers object
const basemaps = {
    "Satellite Imagery": satellite,
    "Street": cartoVoyager,
    "Ocean": esriOcean
};

// Add the default tile layer to the map
esriOcean.addTo(map);


// Function to update base layer based on zoom level
function updateBaseLayer() {
    const zoomLevel = map.getZoom();

    map.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer && layer !== satellite) {
            map.removeLayer(layer);
        }
    });

    if (zoomLevel > 10) {
        cartoVoyager.addTo(map);
    } else {
        esriOcean.addTo(map);
    }
}

// Handle the zoom level change to switch basemaps
map.on('zoomend', function() {
    if (!map.hasLayer(satellite)) {
        updateBaseLayer();
    }
});

// Define the custom marker icon
var customIcon = L.icon({
    iconUrl: 'https://i.ibb.co/bWhk7NN/gps-shadow.png',
});

// Add scale bar
L.control.scale({
    metric: true,
    imperial: true,
    position: 'bottomleft'
}).addTo(map);

// Function to return to the default extent
function returnToDefaultExtent() {
    map.setView([11.759852, 107.418673], 8);
}

// Add this function to update the main map basemap
window.updateMainMapBasemap = function(newBasemap) {
    map.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
        }
    });

    switch(newBasemap) {
        case 'satellite':
            satellite.addTo(map);
            break;
        case 'street':
            cartoVoyager.addTo(map);
            break;
        case 'ocean':
            esriOcean.addTo(map);
            break;
    }

    // Update the custom control label
    //const label = document.querySelector('.basemap-control .basemap-label');
    //label.textContent = 'Basemap: ' + newBasemap.charAt(0).toUpperCase() + newBasemap.slice(1);
};

// Add event listener to the button
document.getElementById('homeButton').addEventListener('click', returnToDefaultExtent);









// Add scale bar
L.control.scale({
    metric: true,
    imperial: true,
    position: 'bottomleft'
}).addTo(map);


// Function to return to the default extent
function returnToDefaultExtent() {
    map.setView([11.759852, 107.418673], 8);
}