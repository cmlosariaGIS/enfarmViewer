const imageUrls=['https://i.ibb.co/jLBvcbF/OIG2-1.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/WWpWVdX/OIG4.jpg'];const getRandomImageUrl=()=>imageUrls[Math.floor(Math.random()*imageUrls.length)];axios.all([axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:236},{headers:{'accept':'application/json','Content-Type':'application/json'}}),axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:260},{headers:{'accept':'application/json','Content-Type':'application/json'}})]).then(axios.spread((response236,response260)=>{const farms236=response236.data.content.data;const farms260=response260.data.content.data;const farmNames260=farms260.map(farm=>farm.farm_name);const filteredFarms236=farms236.filter(farm=>!farmNames260.includes(farm.farm_name));fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations').then(response=>response.json()).then(async data=>{data.content.forEach(async location=>{const excludedWords=["toàn","test","enfarm","koko"];const farmNameContainsExcludedWord=excludedWords.some(word=>location.farmname.toLowerCase().includes(word.toLowerCase()));const regionNameContainsExcludedWord=excludedWords.some(word=>location.region_name.toLowerCase().includes(word.toLowerCase()));if(farmNameContainsExcludedWord||regionNameContainsExcludedWord){return}
const elevation=await getElevation(location.long,location.lat);const prefix='(';const suffix=')';const elevationDisplay=elevation?`<span class="material-symbols-outlined" style="font-size: 14px; margin-bottom: 2px;">${prefix}elevation</span> ${elevation.toFixed(0)} meters${suffix}`:`<span class="material-symbols-outlined" style="font-size: 10px; margin-bottom: 2px;">${prefix}elevation${suffix} Elevation: N/A (Data unavailable)`;const markerElement=document.createElement('div');markerElement.className='marker';const markerLine=document.createElement('div');markerLine.className='marker-line';const markerCircle=document.createElement('div');markerCircle.className='marker-circle';const markerLabel=document.createElement('div');markerLabel.className='marker-label';markerLabel.innerHTML=`<span class="material-symbols-outlined" style="margin-top: 0px;">psychiatry</span> <span>${location.farmname}</span><br>${elevationDisplay}`;markerElement.appendChild(markerLabel);markerElement.appendChild(markerLine);markerElement.appendChild(markerCircle);const farmDetails260=farms260.find(farm=>farm.farm_name===location.farmname);const farmDetails=farmDetails260;const imageUrl=getRandomImageUrl();const farmArea=farmDetails?farmDetails.farm_area:'N/A';const farmId=farmDetails?farmDetails.farm_id:'N/A';const region=location.region_name;const farmAddress=farmDetails?farmDetails.farm_address:'N/A';let popupContent=`
                    <div style="padding-bottom: 20px; top-padding 10px">
                        <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px;">psychiatry</span>
                        <b style="font-size: 16px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">${location.farmname}</b><br>
                        <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px;">location_on</span>
                        <span style="font-size: 10px;">${farmAddress}</span><br>
                        <img src="${imageUrl}" alt="Farm Image" style="width:100%; height:120px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 3px; margin: 4px 0;" />
                    </div>`;if(farmDetails){const matchingCultivates=farmDetails.cultivates.filter(cultivate=>cultivate.name===location.region_name);if(matchingCultivates.length>0){popupContent+=`
                            <span class="material-symbols-outlined" style="font-size: 14px; margin-right: 2px;">elevation</span> <b>Elevation:</b> ${elevation.toFixed(0)} meters<br>
<span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
<!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;const cultivateDetailsPromises=matchingCultivates.map(async cultivate=>{popupContent+=`
                            <br>
                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>`;const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>data.content).catch(error=>{console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`,error);return null});if(cultivateDetails){popupContent+=`
                            <div>
                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> Current Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> Expected Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                            <!--Region ID: ${cultivateDetails.region_id}<br>-->
                            <!--Softids:<br>-->
                            <br>
                            <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.3s;" onclick="toggleSoilData(this)" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='#4CAF50'">
                            <i class="material-symbols-outlined" style="margin-right: 3px; font-size: 16px;">science</i>
                            <span class="toggle-text" style="white-space: nowrap;">View soil data</span>
                        </span>                
                        <div class="soil-data" style="display:none;">
                            <br>
                            <br>
                            <br>
                        `;const nutritionDataPromises=cultivateDetails.softids.map(async softid=>{try{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({region_id:cultivateDetails.region_id})}).then(response=>response.json()).then(data=>{const matchingValues=data.content.find(item=>item.in_depth===softid.in_depth)?.values;if(matchingValues){const combinedValues=matchingValues.created_at.map((createdAt,index)=>({created_at:new Date(createdAt),npk:matchingValues.npk[index],moist:matchingValues.moist[index],pH:matchingValues.pH[index],t:matchingValues.t[index]}));combinedValues.sort((a,b)=>b.created_at-a.created_at);const latestData=combinedValues[0];return{npk:latestData.npk,moist:latestData.moist,pH:latestData.pH,t:latestData.t,created_at:latestData.created_at.toISOString(),}}
return null}).catch(error=>{console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`,error);return null});if(nutritionData){const circleColorTemp=nutritionData.t<20?"#BA0F30":(nutritionData.t<=30?"#18A558":"#BA0F30");const circleColorpH=nutritionData.pH<7?"#BA0F30":(nutritionData.pH===7?"#18A558":"#BA0F30");const circleColorMoist=(nutritionData.moist<=22.5||nutritionData.moist>55)?"#BA0F30":(nutritionData.moist<=55?"#18A558":"#BA0F30");const npkQuotient=nutritionData.npk/300;const circleColorNPK=npkQuotient<0.5?"#BA0F30":(npkQuotient<=1?"#18A558":"#BA0F30");const roundedValue=(value)=>value!==null?value.toFixed(2):'null';popupContent+=`
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
            `}else{popupContent+=`<br><i>No nutrition data found</i>`}}catch(error){console.error(`Error processing nutrition data for softid ${softid.in_depth}:`,error)}});await Promise.all(nutritionDataPromises);popupContent+=`</div></div>`}else{popupContent+=`<br><i>Error fetching cultivate details</i>`}
return popupContent});await Promise.all(cultivateDetailsPromises)}else{popupContent+=`<i>No matching cultivate details found</i><br>`}}else{popupContent+=`<i>Farm details not found</i><br>`}
const popup=new mapboxgl.Popup().setHTML(popupContent);const marker=new mapboxgl.Marker(markerElement).setLngLat([location.long,location.lat]).setPopup(popup).addTo(map);popup.on('open',function(){const showHistoricalSoilDataBtns=this._content.querySelectorAll('.showHistoricalSoilData-btn');if(showHistoricalSoilDataBtns){showHistoricalSoilDataBtns.forEach(btn=>{if(!btn.getAttribute('data-event-added')){const handleClick=function(){const regionId=this.getAttribute('data-region-id');const inDepth=this.getAttribute('data-in-depth');console.log("region_id:",regionId);console.log("depth_id:",inDepth);fetchData(regionId,inDepth);updateLineChart(regionId,inDepth);const popupHistoricalSoilData=document.getElementById('popup-historicalsoildata');popupHistoricalSoilData.style.display='block'};btn.addEventListener('click',handleClick);btn.setAttribute('data-event-added','true')}})}})})}).catch(error=>console.error('Error fetching installation locations:',error))})).catch(error=>console.error('Error fetching farm details:',error));function toggleSoilData(element){var soilDataDiv=element.nextElementSibling;var toggleText=element.querySelector('.toggle-text');if(soilDataDiv.style.display==="none"){soilDataDiv.style.display="block";toggleText.textContent="Hide soil data"}else{soilDataDiv.style.display="none";toggleText.textContent="View soil data"}}
