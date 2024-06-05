mapboxgl.accessToken = 'pk.eyJ1IjoiY21sb3NhcmlhIiwiYSI6ImNsZGJ4cHp2ajAwMGszb3FmeXpxYmVpMHkifQ.3wsPFc9FkszxcH27eEq2dw';

const map = new mapboxgl.Map({
    container: 'map',
    zoom: 13,
    center: [108.22528, 13.0142975],
    pitch: 72,
    bearing: 41,
    style: 'mapbox://styles/mapbox/satellite-streets-v12'
});

const insetMap = new mapboxgl.Map({
    container: 'inset-map',
    zoom: 4,
    center: [108.35416, 13.038462],
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


/*
/*Point display and Pop up
fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations')
    .then(response => response.json())
    .then(async data => {
        data.content.forEach(async location => {
            const elevation = await getElevation(location.long, location.lat);
            const prefix = '(';
            const suffix = ')';
            const elevationDisplay = elevation ? `<span class="material-symbols-outlined" style="font-size: 14px;">${prefix}elevation</span> ${elevation.toFixed(0)} meters${suffix}` : `<span class="material-symbols-outlined" style="font-size: 10px;">${prefix}elevation${suffix} Elevation: N/A (Data unavailable)`;
            const markerElement = document.createElement('div');
            markerElement.className = 'marker';
            const markerLine = document.createElement('div');
            markerLine.className = 'marker-line';
            const markerCircle = document.createElement('div');
            markerCircle.className = 'marker-circle';
            const markerLabel = document.createElement('div');
            markerLabel.className = 'marker-label';
            markerLabel.innerHTML =`<span class="material-symbols-outlined" style="margin-top: 0px;">psychiatry</span> <span>${location.farmname}</span><br>${elevationDisplay}`; // Adjusted margin-top to reduce the gap
            markerElement.appendChild(markerLabel);
            markerElement.appendChild(markerLine);
            markerElement.appendChild(markerCircle);
            const imageUrl = getRandomImageUrl();
            const elevationPopupDisplay = elevation ? `<span class="material-symbols-outlined" style="font-size: 10px;">elevation</span> ${elevation.toFixed(0)} meters` : '<span class="material-symbols-outlined" style="font-size: 10px;">elevation</span> Elevation: N/A (Data unavailable)';
            const popupContent = `<h3><span class="material-symbols-outlined">psychiatry</span> ${location.farmname}</h3><img src="${imageUrl}" alt="Coffee Farm" style="max-width: 100%; height: auto; border-radius: 10px;"><p style="margin-bottom: 0px;">Region: ${location.region_name}</p><p style="margin-top: 0px;">Elevation: ${elevationPopupDisplay}</p>`;
            const popup = new mapboxgl.Popup().setHTML(popupContent);
            const marker = new mapboxgl.Marker(markerElement, { offset: [0, -40] }).setLngLat([location.long, location.lat]).setPopup(popup).addTo(map);
            markers.push({ marker, farmName: location.farmname, regionName: location.region_name, lngLat: [location.long, location.lat] });

            // Increment point counter for each location
            pointCounter++;

            // Update counter element text
            counterElement.innerHTML = `<span class="material-symbols-outlined" style="font-size: 40px;">psychiatry</span> ${pointCounter} farms`;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });*/

    /*
    fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations')
    .then(response => response.json())
    .then(async data => {
        data.content.forEach(async location => {
            const elevation = await getElevation(location.long, location.lat);
            const prefix = '(';
            const suffix = ')';
            const elevationDisplay = elevation ? `<span class="material-symbols-outlined" style="font-size: 14px; margin-bottom: 2px;">${prefix}elevation</span> ${elevation.toFixed(0)} meters${suffix}` : `<span class="material-symbols-outlined" style="font-size: 10px; margin-bottom: 2px;">${prefix}elevation${suffix} Elevation: N/A (Data unavailable)`;
            const markerElement = document.createElement('div');
            markerElement.className = 'marker';
            const markerLine = document.createElement('div');
            markerLine.className = 'marker-line';
            const markerCircle = document.createElement('div');
            markerCircle.className = 'marker-circle';
            const markerLabel = document.createElement('div');
            markerLabel.className = 'marker-label';
            markerLabel.innerHTML =`<span class="material-symbols-outlined" style="margin-top: 0px;">psychiatry</span> <span>${location.farmname}</span><br>${elevationDisplay}`; // Adjusted margin-top to reduce the gap
            markerElement.appendChild(markerLabel);
            markerElement.appendChild(markerLine);
            markerElement.appendChild(markerCircle);

            // Fetch additional farm data based on farm name for users 236 and 260
            axios.all([
                axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
                    user_id: 236
                }, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }),
                axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
                    user_id: 260
                }, {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            ])
            .then(axios.spread((response236, response260) => {
                const farmDetails236 = response236.data.content.data.find(farm => farm.farm_name === location.farmname);
                const farmDetails260 = response260.data.content.data.find(farm => farm.farm_name === location.farmname);
                
                const farmDetails = farmDetails236 || farmDetails260;
                const imageUrl = getRandomImageUrl();
                const farmArea = farmDetails ? farmDetails.farm_area : 'N/A';
                const farmId = farmDetails ? farmDetails.farm_id : 'N/A';
                const region = location.region_name;
                const farmAddress = farmDetails ? farmDetails.farm_address : 'N/A';

                const elevationPopupDisplay = elevation ? `<span class="material-symbols-outlined" style="font-size: 10px; margin-bottom: 2px;">elevation</span> ${elevation.toFixed(0)} meters` : '<span class="material-symbols-outlined" style="font-size: 10px; margin-bottom: 2px;">elevation</span> Elevation: N/A (Data unavailable)';
                const popupContent = `<h3 style="margin: 2px 0;"><span class="material-symbols-outlined">psychiatry</span> ${location.farmname}</h3><img src="${imageUrl}" alt="Coffee Farm" style="max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 2px;"><p style="margin: 0 0 2px 0;">Elevation: ${elevationPopupDisplay}</p><p style="margin: 0 0 2px 0;">Farm Area: ${farmArea}</p><p style="margin: 0 0 2px 0;">Farm ID: ${farmId}</p><p style="margin: 0 0 2px 0;">Region: ${region}</p><p style="margin: 0 0 2px 0;">Farm Address: ${farmAddress}</p>`;
                const popup = new mapboxgl.Popup().setHTML(popupContent);
                const marker = new mapboxgl.Marker(markerElement, { offset: [0, -40] }).setLngLat([location.long, location.lat]).setPopup(popup).addTo(map);
                markers.push({ marker, farmName: location.farmname, regionName: location.region_name, lngLat: [location.long, location.lat] });
            }))
            .catch(error => {
                console.error('Error fetching farm data:', error);
            });

            // Increment point counter for each location
            pointCounter++;

            // Update counter element text
            counterElement.innerHTML = `<span class="material-symbols-outlined" style="font-size: 40px;">psychiatry</span> ${pointCounter} farms`;
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });*/



    
