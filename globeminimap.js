// Add the GlobeMiniMap control
let meSize = 40;
var miniMap = new L.Control.GlobeMiniMap({
    land: '#21B6A8',
    water: '#189AB4',
    width: 60,
    height: 60,
    topojsonSrc: 'https://syonfox.github.io/leaflet-globe-minimap/src/world.json',
    onAdd: (map, mm) => {
        mm._container.addEventListener("click", e => {
            console.log("World Clicked");
            meSize += 5; // just a demo of detecting click
            miniMap.hackMation(30, meSize);
        });
    }
}).addTo(map);


