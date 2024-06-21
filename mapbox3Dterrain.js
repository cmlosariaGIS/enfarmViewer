mapboxgl.accessToken = 'pk.eyJ1IjoiY21sb3NhcmlhIiwiYSI6ImNsZGJ4cHp2ajAwMGszb3FmeXpxYmVpMHkifQ.3wsPFc9FkszxcH27eEq2dw';

// Default coordinates
const defaultLat = 13.0142975;
const defaultLong = 108.22528;

// Check if coordinates are stored in localStorage
let lat = parseFloat(localStorage.getItem('mapboxLat'));
let long = parseFloat(localStorage.getItem('mapboxLong'));

// Use default coordinates if not found in localStorage
if (!lat || !long) {
    lat = defaultLat;
    long = defaultLong;
}

// Reset the coordinates in localStorage to default values after using them
localStorage.setItem('mapboxLat', defaultLat);
localStorage.setItem('mapboxLong', defaultLong);

const map = new mapboxgl.Map({
    container: 'map',
    zoom: 15,
    center: [long, lat],
    pitch: 72,
    bearing: 41,
    style: 'mapbox://styles/mapbox/satellite-streets-v12'
});

const insetMap = new mapboxgl.Map({
    container: 'inset-map',
    zoom: 4,
    center: [long, lat],
    style: 'mapbox://styles/mapbox/streets-v11',
    interactive: false // Disable interaction for the inset map
});



const updateInsetMap = () => {
    const bounds = map.getBounds();
    insetMap.fitBounds(bounds, {
        padding: 20,
        animate: false
    });

    const ne = insetMap.project(bounds.getNorthEast());
    const sw = insetMap.project(bounds.getSouthWest());

    const width = ne.x - sw.x;
    const height = sw.y - ne.y;

    let boundary = document.querySelector('.inset-boundary');
    if (!boundary) {
        boundary = document.createElement('div');
        boundary.className = 'inset-boundary';
        document.getElementById('inset-map').appendChild(boundary);
    }

    boundary.style.width = `${width}px`;
    boundary.style.height = `${height}px`;
    boundary.style.left = `${sw.x}px`;
    boundary.style.top = `${ne.y}px`;
};

// Ensure the inset map is updated on load
map.on('load', () => {
    updateInsetMap();
    insetMap.on('load', updateInsetMap);
});

// Ensure the inset map updates on move and zoom events
map.on('move', updateInsetMap);
map.on('zoom', updateInsetMap);

// Add scale control to the main map
const scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
});
map.addControl(scale);



let is3D = true;
let markers = [];
//const imageUrls = ['https://www.spiralhorncoffee.com/wp-content/uploads/2021/01/photodune-gsEC867x-lush-green-coffee-landscape-xxl-scaled.jpg', 'https://th.bing.com/th/id/OIP.F91NFZfL7nA--b2vzNLXTwHaE8?rs=1&pid=ImgDetMain', 'https://www.giz.de/static/en/media/gizIMAGE-kaffee-costa-rica.jpg', 'https://www.perfectdailygrind.com/wp-content/uploads/2018/04/coffee-farm-3.jpg'];



const switchBasemap = () => {
    const newStyle = is3D ? 'mapbox://styles/mapbox/outdoors-v11' : 'mapbox://styles/mapbox/satellite-v9';
    const buttonText = is3D ? 'landscape' : 'map';
    map.setStyle(newStyle);
    document.querySelector('.mapbox3Dterrain-button span').innerText = buttonText;
    is3D = !is3D;
}

map.on('style.load', () => {
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 2 });
});

const getElevation = async (lng, lat) => {
    try {
        const response = await fetch(`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token=${mapboxgl.accessToken}`);
        const data = await response.json();
        return data?.features?.[0]?.properties?.ele ?? null;
    } catch (error) {
        console.error('Error fetching elevation data:', error);
        return null;
    }
}


