var map=L.map('map').setView([11.759852,107.418673],8);const satellite=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{attribution:'Imagery &copy; <a href="https://www.esri.com/">Esri</a>',maxZoom:18,});const street=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:28,});const basemaps={"Satellite Imagery":satellite,"Street":street};street.addTo(map);const customControl=L.control({position:'bottomleft'});customControl.onAdd=function(map){const container=L.DomUtil.create('div','basemap-control');const img=L.DomUtil.create('img','basemap-image',container);img.src='https://i.ibb.co/fHNQYvD/imagery.png';img.alt='Basemap Imagery';const label=L.DomUtil.create('div','basemap-label',container);label.textContent='Imagery';img.onclick=function(){if(map.hasLayer(street)){map.removeLayer(street);satellite.addTo(map);img.src='https://i.ibb.co/j4TfkcV/street.png';label.textContent='Street'}else{map.removeLayer(satellite);street.addTo(map);img.src='https://i.ibb.co/fHNQYvD/imagery.png';label.textContent='Imagery'}};return container};customControl.addTo(map);var customIcon=L.icon({iconUrl:'https://i.ibb.co/gWyRjHP/icons8-pin-96-xxhdpi.png',iconSize:[30,30],iconAnchor:[22,38],popupAnchor:[0,-38]});map.zoomControl.remove()
