var images=['https://i.ibb.co/jLBvcbF/OIG2-1.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/WWpWVdX/OIG4.jpg'];function logLatLong(lat,long){console.log("Longitude:",long);console.log("Latitude:",lat);localStorage.setItem('mapboxLat',lat);localStorage.setItem('mapboxLong',long);window.open('mapbox3D.html','_blank')}
axios.all([axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:236},{headers:{'accept':'application/json','Content-Type':'application/json'}}),axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:260},{headers:{'accept':'application/json','Content-Type':'application/json'}})]).then(axios.spread((response236,response260)=>{const farms236=response236.data.content.data;const farms260=response260.data.content.data;const farmNames260=farms260.map(farm=>farm.farm_name);const filteredFarms236=farms236.filter(farm=>!farmNames260.includes(farm.farm_name));fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'}}).then(response=>response.json()).then(data=>{const filteredLocations=data.content.filter(location=>{return!(/toàn|test|enfarm|koko/i.test(location.farmname)||/toàn|test|enfarm|koko/i.test(location.region_name))});var totalDevicesCount=filteredLocations.length;var markers=L.markerClusterGroup();filteredLocations.forEach(location=>{var randomImage=images[Math.floor(Math.random()*images.length)];const farmDetails260=farms260.find(farm=>farm.farm_name===location.farmname);const farmDetails=farmDetails260;var customMarker=L.divIcon({className:'custom-marker',html:`
    <div class="marker2D-label">${location.farmname}</div>
    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`});var marker=L.marker([location.lat,location.long],{icon:customMarker});var popupContent=`
                    <div style="position: relative; padding: 0; margin: 0;">
                    <div style="overflow: hidden; width: 303px; height: 150px; position: relative; margin-left: -8.4%; margin-top: -15px; border-top-left-radius: 6px; border-top-right-radius: 6px;" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.1)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
                    <img src="${randomImage}" alt="Farm Image" style="width: 303px; height: 150px; position: absolute; top: 0; left: 0; transition: transform 0.3s ease;" class="parallax-img" />
                </div>

                    <div style="position: absolute; top: 30px; left: 0px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                        <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px; color: white;">psychiatry</span>
                        <b style="font-size: 18px; color: white;">${location.farmname}</b><br>
                        <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px; color: white;">location_on</span>
                        <span style="font-size: 12px; color: white;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
                    </div>
                </div>
                
<div style="padding-bottom: 30px; top-padding 0px"><div>

    
    <!--Farm ID: ${farmDetails ? farmDetails.farm_id : 'N/A'}<br>-->
    <!--Region name: ${location.region_name}<br>-->`;if(farmDetails){const matchingCultivates=farmDetails.cultivates.filter(cultivate=>{return cultivate.name===location.region_name});if(matchingCultivates.length>0){popupContent+=`
        <br><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
        <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;const cultivateDetailsPromises=matchingCultivates.map(async cultivate=>{popupContent+=`
            <br>
            <!--Completed: ${cultivate.is_completed || 'N/A'}<br>-->
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>
            <!--Last Update: ${cultivate.last_update || 'N/A'}<br>-->`;const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>data.content).catch(error=>{console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`,error);return null});if(cultivateDetails){popupContent+=`
                                          <div>
                                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> Current Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> Expected Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                                            <!--Region ID: ${cultivateDetails.region_id}<br>-->
                                            <!--Softids:<br>-->
                                            <br>
                                            
                                            <span class="view-in-3D" style="background-color: #ffffff; color: #000000; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: left; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-left: 95px;" onmouseover="showIcon(this); this.style.backgroundColor='#f0f0f0'" onmouseout="hideIcon(this); this.style.backgroundColor='#ffffff'" onclick="logLatLong(${location.lat}, ${location.long})">
                                            <span class="material-symbols-outlined" id="icon" style="display: none; font-size: 16px;">elevation</span>
                                            <span id="text">3D</span>
                                        </span>

                                        
                                            <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.3s;" onclick="toggleSoilData(this)" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='#4CAF50'">
                                              <i class="material-symbols-outlined" style="margin-right: 3px; font-size: 16px;">science</i>
                                              <span class="toggle-text" style="white-space: nowrap;">View soil data</span>
</span>
<div class="soil-data" style="display:none;">
<br>
<br>
<br>
`;const nutritionDataPromises=cultivateDetails.softids.map(async softid=>{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({region_id:cultivateDetails.region_id})}).then(response=>response.json()).then(data=>{const matchingValues=data.content.find(item=>item.in_depth===softid.in_depth)?.values;if(matchingValues){const latestIndex=matchingValues.created_at.map((date,index)=>({date:new Date(date),index})).sort((a,b)=>b.date-a.date)[0].index;return{npk:matchingValues.npk[latestIndex],moist:matchingValues.moist[latestIndex],pH:matchingValues.pH[latestIndex],t:matchingValues.t[latestIndex],created_at:matchingValues.created_at[latestIndex],}}
return null}).catch(error=>{console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`,error);return null});if(nutritionData){const circleColorTemp=nutritionData.t<20?"#BA0F30":(nutritionData.t<=30?"#18A558":"#BA0F30");const circleColorpH=nutritionData.pH<7?"#BA0F30":(nutritionData.pH===7?"#18A558":"#BA0F30");const circleColorMoist=(nutritionData.moist<=22.5||nutritionData.moist>55)?"#BA0F30":(nutritionData.moist<=35?"#BA0F30":(nutritionData.moist<=55?"#18A558":"#BA0F30"));const npkQuotient=nutritionData.npk/300;const circleColorNPK=npkQuotient<0.5?"#BA0F30":(npkQuotient<=1?"#18A558":"#BA0F30");const roundedValue=(value)=>value!==null?value.toFixed(2):'null';popupContent+=`
                                                            <div style="position: relative; display: flex; align-items: center;">
                                                                In Depth: ${softid.in_depth} (${softid.in_depth_label})
                                                                <span class="material-symbols-outlined showHistoricalSoilData-btn" style="position: absolute; right: 0; font-size: 12px; cursor: pointer;" data-region-id="${cultivateDetails.region_id}" data-in-depth="${softid.in_depth}">chevron_forward</span>
                                                            </div>
                                                            <div style="display: flex; flex-wrap: wrap;">
                                                                <div style="flex: 1 1 50%;">
                                                                    <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">bubble_chart</span>
                                                                    <b>NPK:</b> ${roundedValue(nutritionData.npk)}&nbsp;&nbsp;${nutritionData.npk !== null ? `<i class="fas fa-circle" style="color: ${circleColorNPK}; font-size: 9px; ${circleColorNPK === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}<br>
                                                                    <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">humidity_mid</span>
                                                                    <b>Moist:</b> ${roundedValue(nutritionData.moist)}&nbsp;&nbsp;${nutritionData.moist !== null ? `<i class="fas fa-circle" style="color: ${circleColorMoist}; font-size: 9px; ${circleColorMoist === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}<br>
                                                                </div>
                                                                <div style="flex: 1 1 50%;">
                                                                    <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">water_ph</span>
                                                                    <b>pH:</b> ${roundedValue(nutritionData.pH)}&nbsp;&nbsp;${nutritionData.pH !== null ? `<i class="fas fa-circle" style="color: ${circleColorpH}; font-size: 9px; ${circleColorpH === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}<br>    
                                                                    <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">device_thermostat</span>
                                                                    <b>Temp:</b> ${roundedValue(nutritionData.t)}&nbsp;&nbsp;${nutritionData.t !== null ? `<i class="fas fa-circle" style="color: ${circleColorTemp}; font-size: 9px; ${circleColorTemp === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}<br>
                                                                </div>
                                                            </div>
                                                            <span style="font-size: 10px;">
                                                                <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                                <i style="vertical-align: middle;">last update: ${nutritionData.created_at}</i>
                                                            </span><br><br>
                                                            <style>
                                                                @keyframes glowRed {
                                                                    0% { color: #BA0F30; text-shadow: 0 0 5px #e86161, 0 0 10px #e86161, 0 0 15px #e86161; }
                                                                    50% { color: #e86161; text-shadow: 0 0 10px #e86161, 0 0 20px #e86161, 0 0 30px #e86161; }
                                                                    100% { color: #BA0F30; text-shadow: 0 0 5px #e86161, 0 0 10px #e86161, 0 0 15px #e86161; }
                                                                }
                                                            </style>
                                                        `;Promise.all(nutritionDataPromises).then(nutritionDataArray=>{}).catch(error=>{console.error('Error processing nutrition data:',error)})}else{popupContent+=`
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>-->
                                                `}});await Promise.all(nutritionDataPromises);popupContent+=`</div></div>`}else{popupContent+=`<br><i>Error fetching cultivate details</i>`}
return popupContent});Promise.all(cultivateDetailsPromises).then(cultivateDetails=>{popupContent=cultivateDetails.join('');popupContent+='</p>';marker.bindPopup(popupContent);marker.on('popupopen',function(){const showHistoricalSoilDataBtns=this._popup._contentNode.querySelectorAll('.showHistoricalSoilData-btn');showHistoricalSoilDataBtns.forEach((btn,index)=>{btn.addEventListener('click',(function(idx){return function(){const popupContent=this.closest('.leaflet-popup-content').innerHTML;const regionIdMatch=popupContent.match(/Region ID: (\d+)/);const btnContainer=this.parentNode;const inDepthMatch=btnContainer.innerHTML.match(/In Depth: (\d+) \((.+?)\)/);let regionId,inDepth,inDepthLabel;if(regionIdMatch){regionId=regionIdMatch[1]}else{console.log('Region ID not found in the popup content.')}
if(inDepthMatch){inDepth=inDepthMatch[1];inDepthLabel=inDepthMatch[2]}else{console.log('In Depth not found in the button container.')}
console.log('region_id:',regionId);console.log('depth_id:',inDepth);const event=new CustomEvent('soilDataRequested',{detail:{regionId:regionId,depthId:inDepth}});window.dispatchEvent(event);const popupHistoricalSoilData=document.querySelector('.popup-historicalsoildata');popupHistoricalSoilData.style.display='block'}})(index))})})}).catch(error=>{console.error('Error fetching cultivate details:',error)})}else{popupContent+=`<i>No matching cultivate details found</i><br>`;popupContent+='</p>';marker.bindPopup(popupContent)}}else{popupContent+=`<br><i>Farm details not found</i><br>`;popupContent+='</p>';marker.bindPopup(popupContent)}
markers.addLayer(marker)});map.addLayer(markers);document.getElementById('totalDevicesCount').innerText=totalDevicesCount;const durianButton=document.querySelector('.durianTrees-filter');let showingDurianFarms=!1;let durianMarkers;durianButton.addEventListener('click',toggleDurianFarms);function toggleDurianFarms(){if(!showingDurianFarms){map.removeLayer(markers);durianMarkers=L.markerClusterGroup();markers.eachLayer(function(marker){const popupContent=marker.getPopup().getContent();if(popupContent.includes('Durian')){durianMarkers.addLayer(marker)}});map.addLayer(durianMarkers);durianButton.classList.add('active-durian');showingDurianFarms=!0}else{map.removeLayer(durianMarkers);map.addLayer(markers);durianButton.classList.remove('active-durian');showingDurianFarms=!1}}
const coffeeButton=document.querySelector('.coffeeTrees-filter');let showingCoffeeFarms=!1;let coffeeMarkers;coffeeButton.addEventListener('click',toggleCoffeeFarms);function toggleCoffeeFarms(){if(!showingCoffeeFarms){map.removeLayer(markers);coffeeMarkers=L.markerClusterGroup();markers.eachLayer(function(marker){const popupContent=marker.getPopup().getContent();if(popupContent.includes('Coffee')){coffeeMarkers.addLayer(marker)}});map.addLayer(coffeeMarkers);coffeeButton.classList.add('active-coffee');showingCoffeeFarms=!0}else{map.removeLayer(coffeeMarkers);map.addLayer(markers);coffeeButton.classList.remove('active-coffee');showingCoffeeFarms=!1}}
const pepperButton=document.querySelector('.pepperFarms-filter');let showingPepperFarms=!1;let pepperMarkers;pepperButton.addEventListener('click',togglePepperFarms);function togglePepperFarms(){if(!showingPepperFarms){map.removeLayer(markers);pepperMarkers=L.markerClusterGroup();markers.eachLayer(function(marker){const popupContent=marker.getPopup().getContent();if(popupContent.includes('Pepper')){pepperMarkers.addLayer(marker)}});map.addLayer(pepperMarkers);pepperButton.classList.add('active-pepper');showingPepperFarms=!0}else{map.removeLayer(pepperMarkers);map.addLayer(markers);pepperButton.classList.remove('active-pepper');showingPepperFarms=!1}}
const teaButton=document.querySelector('.teaFarms-filter');let showingTeaFarms=!1;let teaMarkers;teaButton.addEventListener('click',toggleTeaFarms);function toggleTeaFarms(){if(!showingTeaFarms){map.removeLayer(markers);teaMarkers=L.markerClusterGroup();markers.eachLayer(function(marker){const popupContent=marker.getPopup().getContent();if(popupContent.includes('Tea')){teaMarkers.addLayer(marker)}});map.addLayer(teaMarkers);teaButton.classList.add('active-tea');showingTeaFarms=!0}else{map.removeLayer(teaMarkers);map.addLayer(markers);teaButton.classList.remove('active-tea');showingTeaFarms=!1}}
const needsAttentionButton=document.querySelector('.needs-attention');let showingAllFarms=!0;let needsAttentionMarkers;needsAttentionButton.addEventListener('click',toggleFarmView);function toggleFarmView(){if(showingAllFarms){map.removeLayer(markers);needsAttentionMarkers=L.markerClusterGroup();markers.eachLayer(function(marker){const popupContent=marker.getPopup().getContent();if(popupContent.includes('animation: glowRed')){needsAttentionMarkers.addLayer(marker)}});map.addLayer(needsAttentionMarkers);needsAttentionButton.innerHTML='<div style="display: inline-block; position: relative;">'+'<i class="material-symbols-outlined" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); font-size: 18px; color: green;">psychiatry</i>'+'<span style="padding-left: 20px;">Show all farms</span>'+'</div>';showingAllFarms=!1}else{map.removeLayer(needsAttentionMarkers);map.addLayer(markers);needsAttentionButton.innerHTML=`
            <div id="lottie-container" style="width: 24px; height: 24px;"></div>
            Attention
            <span class="tooltip-right">Show farms needing attention</span>
        `;showingAllFarms=!0;lottie.loadAnimation({container:document.getElementById('lottie-container'),renderer:'svg',loop:!0,autoplay:!0,path:'https://lottie.host/41453d5b-98f5-4478-ae32-24ffb6f5ff63/wN5fPgSl5x.json'})}}}).catch(error=>console.error('Error fetching data:',error))})).catch(error=>console.error('Error fetching farm details:',error));function toggleSoilData(element){var soilDataDiv=element.nextElementSibling;var toggleText=element.querySelector('.toggle-text');if(soilDataDiv.style.display==="none"){soilDataDiv.style.display="block";toggleText.textContent="Hide soil data"}else{soilDataDiv.style.display="none";toggleText.textContent="View soil data"}}
function showIcon(element){var icon=element.querySelector('#icon');if(icon){icon.style.display='inline-flex'}}
function hideIcon(element){var icon=element.querySelector('#icon');if(icon){icon.style.display='none'}}
