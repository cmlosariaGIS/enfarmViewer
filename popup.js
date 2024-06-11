var images=['https://i.ibb.co/jLBvcbF/OIG2-1.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/WWpWVdX/OIG4.jpg'];function logLatLong(lat,long){console.log("Longitude:",long);console.log("Latitude:",lat);localStorage.setItem('mapboxLat',lat);localStorage.setItem('mapboxLong',long);window.open('mapbox3D.html','_blank')}
axios.all([axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:236},{headers:{'accept':'application/json','Content-Type':'application/json'}}),axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:260},{headers:{'accept':'application/json','Content-Type':'application/json'}})]).then(axios.spread((response236,response260)=>{const farms236=response236.data.content.data;const farms260=response260.data.content.data;const farmNames260=farms260.map(farm=>farm.farm_name);const filteredFarms236=farms236.filter(farm=>!farmNames260.includes(farm.farm_name));fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'}}).then(response=>response.json()).then(data=>{const filteredLocations=data.content.filter(location=>{return!(/toàn|test|enfarm|koko/i.test(location.farmname)||/toàn|test|enfarm|koko/i.test(location.region_name))});var totalDevicesCount=filteredLocations.length;var markers=L.markerClusterGroup();filteredLocations.forEach(location=>{var randomImage=images[Math.floor(Math.random()*images.length)];const farmDetails260=farms260.find(farm=>farm.farm_name===location.farmname);const farmDetails=farmDetails260;var customMarker=L.divIcon({className:'custom-marker',html:`
    <div class="marker2D-label">${location.farmname}</div>
    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`});var marker=L.marker([location.lat,location.long],{icon:customMarker});var popupContent=`
<br><div style="padding-bottom: 20px; top-padding 0px">
    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px;">psychiatry</span>
    <b style="font-size: 16px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">${location.farmname}</b><br>
    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px;">location_on</span>
    <span style="font-size: 10px;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
    <img src="${randomImage}" alt="Farm Image" style="width:250px; height:100px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 3px; margin: 4px 0;" />
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
                                            
                                            <span class="view-in-3D" style="background-color: #ffffff; color: #000000; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: left; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-left: 90px;" onmouseover="showIcon(this); this.style.backgroundColor='#f0f0f0'" onmouseout="hideIcon(this); this.style.backgroundColor='#ffffff'" onclick="logLatLong(${location.lat}, ${location.long})">
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
markers.addLayer(marker)});map.addLayer(markers);document.getElementById('totalDevicesCount').innerText=totalDevicesCount}).catch(error=>console.error('Error fetching data:',error))})).catch(error=>console.error('Error fetching farm details:',error));function toggleSoilData(element){var soilDataDiv=element.nextElementSibling;var toggleText=element.querySelector('.toggle-text');if(soilDataDiv.style.display==="none"){soilDataDiv.style.display="block";toggleText.textContent="Hide soil data"}else{soilDataDiv.style.display="none";toggleText.textContent="View soil data"}}
function showIcon(element){var icon=element.querySelector('#icon');if(icon){icon.style.display='inline-flex'}}
function hideIcon(element){var icon=element.querySelector('#icon');if(icon){icon.style.display='none'}}
