// Initialize the inset map
var insetMap = L.map('inset-map', {
    zoomControl: false,
    attributionControl: false,
    dragging: false, // Disable dragging on the inset map
    touchZoom: false, // Disable touch zoom
    scrollWheelZoom: false, // Disable scroll wheel zoom
    doubleClickZoom: false, // Disable double click zoom
    boxZoom: false, // Disable box zoom
    keyboard: false // Disable keyboard controls
}).setView([11.759852, 107.418673], 4);

// Add tile layer to the inset map
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
}).addTo(insetMap);

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
