//inset.js

let isInsetMapVisible = true;
let currentBasemap = 'street'; // Start with 'street' as the default

function toggleInsetMap() {
    const insetMap = document.getElementById('inset-map');
    const insetMapToggle = document.getElementById('insetMapToggle');

    if (isInsetMapVisible) {
        insetMap.classList.add('hidden');
        insetMapToggle.classList.add('active');
    } else {
        insetMap.classList.remove('hidden');
        insetMapToggle.classList.remove('active');
        // Trigger a resize event on the map to ensure it renders correctly
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    }

    isInsetMapVisible = !isInsetMapVisible;
}

// Initialize the inset map
var insetMap = L.map('inset-map', {
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
}).setView([11.759852, 107.418673], 4);

// Define basemap layers for the inset map
const insetSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
});

const insetCartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 28,
});

// Add the default tile layer to the inset map
insetCartoVoyager.addTo(insetMap);

let insetBoundary;

// Function to update the inset map
const updateInsetMap = () => {
    const bounds = map.getBounds();
    insetMap.fitBounds(bounds, {
        padding: [20, 20],
        animate: false
    });

    if (insetBoundary) {
        insetMap.removeLayer(insetBoundary);
    }

    insetBoundary = L.rectangle(bounds, { color: "#0b6e4f", weight: 1 }).addTo(insetMap);
};

// Ensure the inset map updates on move and zoom events
map.on('move', updateInsetMap);
map.on('zoom', updateInsetMap);

updateInsetMap(); // Initial call to position the boundary correctly

// Add event listener to the Inset Map button
document.getElementById('insetMapToggle').addEventListener('click', toggleInsetMap);

// Add click event to the inset map to switch basemaps
insetMap.on('click', function() {
    currentBasemap = (currentBasemap === 'street') ? 'satellite' : 'street';
    updateBasemap(currentBasemap);
});

// Function to update basemap for both main and inset maps
function updateBasemap(newBasemap) {
    // Update inset map
    insetMap.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer) {
            insetMap.removeLayer(layer);
        }
    });

    switch(newBasemap) {
        case 'satellite':
            insetSatellite.addTo(insetMap);
            break;
        case 'street':
            insetCartoVoyager.addTo(insetMap);
            break;
    }

    // Update main map
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

    // Update the inset map boundary
    updateInsetMap();

    // Call the updateMainMapBasemap function in map.js
    if (typeof window.updateMainMapBasemap === 'function') {
        window.updateMainMapBasemap(newBasemap);
    }
}

// Expose the updateBasemap function to the global scope
window.updateBasemap = updateBasemap;