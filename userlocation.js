function locateUser(){map.locate({setView:false,maxZoom:16});var blueCircle=L.circleMarker([0,0],{radius:10,color:'#007bff',fillColor:'#007bff',fillOpacity:1,className:'glowing-circle'}).addTo(map);map.on('locationfound',function(e){blueCircle.setLatLng(e.latlng);map.flyTo(e.latlng,16);});var pulsate=setInterval(function(){var radius=blueCircle.getRadius();if(radius<=10){blueCircle.setRadius(radius+0.5);}else if(radius<=14){blueCircle.setRadius(radius+0.5);}else{blueCircle.setRadius(10);}},80);}