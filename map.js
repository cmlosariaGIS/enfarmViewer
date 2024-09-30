//Leaflet, Basemap initiation
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
        if (layer instanceof L.TileLayer && layer !== satellite && !(layer instanceof L.MarkerClusterGroup)) {
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



// Marker Creation
// Global variables
const markers = L.markerClusterGroup();

// Initialize the map functionality
function initializeMap() {
    map.addLayer(markers);
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.addEventListener('locationSelected', handleLocationSelected);
    document.addEventListener('locationsFound', handleLocationsFound);
}

// Handle single location selection
function handleLocationSelected(event) {
    const location = event.detail;
    displayLocationsOnMap([location]);
}

// Handle multiple locations found
function handleLocationsFound(event) {
    const locations = event.detail;
    displayLocationsOnMap(locations);
}

// Add this function to your map.js file
function zoomToMarker(lat, lng) {
    map.flyTo([lat, lng], 18, {
        animate: true,
        duration: 1.5, // Duration of animation in seconds
    });
}

// Modify the displayLocationsOnMap function
function displayLocationsOnMap(locations) {
    markers.clearLayers();

    locations.forEach(location => {
        const popupContent = `
            <p>
            <img src="${farmThumbnail}" alt="Farm Image" style="width:100%; height:auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 5px;">
            </p>
            <p>
            <b>Farm name:</b> ${location.farmname}<br>
            <b>Region name:</b> ${location.region_name}
            </p>`;
        const marker = L.marker([location.lat, location.long], { icon: customIcon })
            .bindPopup(popupContent);
        markers.addLayer(marker);
    });

    if (locations.length === 1) {
        // If only one location, zoom to it
        zoomToMarker(locations[0].lat, locations[0].long);
        // Open the popup for the single location
        setTimeout(() => {
            markers.getLayers()[0].openPopup();
        }, 1600); // Slight delay to ensure zoom is complete
    } else {
        // If multiple locations, fit bounds
        const bounds = markers.getBounds();
        map.flyToBounds(bounds, {
            duration: 1,
            maxZoom: 15,
            easeLinearity: 0.5,
            paddingTopLeft: [50, 50],
            paddingBottomRight: [50, 50]
        });
    }
}

// Make sure to call initializeMap at the end of the file or when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeMap);