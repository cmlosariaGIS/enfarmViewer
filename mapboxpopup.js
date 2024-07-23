let allMarkers=[];window.currentLang='vi';window.getTranslatedText=function(key){return translations[currentLang][key]||key;}
window.addEventListener('languageChanged',(event)=>{currentLang=event.detail.language;console.log(`Language changed event received in mapboxpopup.js. New language: ${currentLang}`);updateAllPopups();});function updateAllPopups(){console.log(`Updating all popups. Current language: ${currentLang}`);allMarkers.forEach((marker,index)=>{const popup=marker.getPopup();console.log(`Updating popup ${index + 1}/${allMarkers.length}`);const updatedContent=translatePopupContent(marker.originalContent);popup.setHTML(updatedContent);});}
function translatePopupContent(content){const tempDiv=document.createElement('div');tempDiv.innerHTML=content;const elementsToTranslate=tempDiv.querySelectorAll('[data-translate]');elementsToTranslate.forEach(element=>{const key=element.getAttribute('data-translate');const translatedText=getTranslatedText(key);element.textContent=translatedText;});const noCultivateDetails=tempDiv.querySelector('.no-cultivate-details');if(noCultivateDetails){const translatedText=getTranslatedText("No matching cultivate details found");noCultivateDetails.innerHTML=`<i data-translate="No matching cultivate details found">${translatedText}</i>`;}
const noFarmDetails=tempDiv.querySelector('.no-farm-details');if(noFarmDetails){const translatedText=getTranslatedText("Farm details not found");console.log(`Translating no farm details: ${translatedText}`);noFarmDetails.innerHTML=`<i data-translate="Farm details not found">${translatedText}</i>`;}
return tempDiv.innerHTML;}
var images=['https://i.ibb.co/C0gT2rp/projeto-cafe-gato-mourisco-Z8m-Gr-8-E7f4-unsplash.jpg','https://i.ibb.co/HXbrp66/projeto-cafe-gato-mourisco-Uz1-Rk85-VUW4-unsplash.jpg','https://i.ibb.co/sqXW5Lf/projeto-cafe-gato-mourisco-z-OVRgig-QMQA-unsplash.jpg','https://i.ibb.co/D5rD1qj/projeto-cafe-gato-mourisco-eq5-OMTg-ED4-unsplash.jpg','https://i.ibb.co/JH08gkp/projeto-cafe-gato-mourisco-6fo-Phyz6-QU-unsplash.jpg','https://i.ibb.co/R0LYsq5/projeto-cafe-gato-mourisco-q-EJd-MO6-Qml-Y-unsplash.jpg','https://i.ibb.co/4WC5LWz/projeto-cafe-gato-mourisco-Pjv-HCp-KPzho-unsplash.jpg','https://i.ibb.co/gRdpBB3/anton-shuvalov-GTz-Rv-LR6a-OU-unsplash.jpg','https://i.ibb.co/Lg2SCqc/projeto-cafe-gato-mourisco-yw-Ec-Uv-W4-Ha-U-unsplash.jpg','https://i.ibb.co/ByhYLQy/projeto-cafe-gato-mourisco-b-Forvtl-Lx-SA-unsplash.jpg'];const randomIndex=Math.floor(Math.random()*images.length);const randomImage=images[randomIndex];const getRandomImageUrl=()=>images[Math.floor(Math.random()*images.length)];let farmsNeedingAttention=new Set();let totalCurrentProd=0;let totalExpectedProd=0;const fetchFarmData3D=async(userIds)=>{try{const requests=userIds.map(userId=>axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:userId},{headers:{'accept':'application/json','Content-Type':'application/json'}}));const responses=await axios.all(requests);const farms=responses.flatMap(response=>response.data.content.data);const farmNames=farms.map(farm=>farm.farm_name);fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'},}).then(response=>response.json()).then(async data=>{const filteredLocations=data.content.filter(location=>{return!(/toàn|test|enfarm|koko/i.test(location.farmname)||/toàn|test|enfarm|koko/i.test(location.region_name))&&farmNames.includes(location.farmname);});const associatedLocations=filteredLocations.filter(location=>{return farmNames.includes(location.farmname);});const uniqueFarms=new Set();filteredLocations.forEach(location=>{const farmKey=`${location.lat},${location.long}`;uniqueFarms.add(farmKey);});const uniqueFarmCount=uniqueFarms.size;document.getElementById('totalfarmCount').innerText=uniqueFarmCount;var totalDevicesCount=associatedLocations.length;var farmsNeedingAttentionCount=0;associatedLocations.forEach(async location=>{const excludedWords=["toàn","test","enfarm","koko"];const farmNameContainsExcludedWord=excludedWords.some(word=>location.farmname.toLowerCase().includes(word.toLowerCase()));const regionNameContainsExcludedWord=excludedWords.some(word=>location.region_name.toLowerCase().includes(word.toLowerCase()));if(farmNameContainsExcludedWord||regionNameContainsExcludedWord){return;}
const elevation=await getElevation(location.long,location.lat);const prefix='(';const suffix=')';const elevationDisplay=elevation?`<span class="material-symbols-outlined" style="font-size: 14px; margin-bottom: 2px;">${prefix}elevation</span> ${elevation.toFixed(0)} meters${suffix}`:`<span class="material-symbols-outlined" style="font-size: 10px; margin-bottom: 2px;">${prefix}elevation${suffix} Elevation: N/A (Data unavailable)`;const markerElement=document.createElement('div');markerElement.className='marker';const markerLine=document.createElement('div');markerLine.className='marker-line';const markerCircle=document.createElement('div');markerCircle.className='marker-circle';const markerLabel=document.createElement('div');markerLabel.className='marker-label';markerLabel.innerHTML=`<span class="material-symbols-outlined" style="margin-top: 0px;">psychiatry</span> <span>${location.farmname}</span><br>${elevationDisplay}`;markerElement.appendChild(markerLabel);markerElement.appendChild(markerLine);markerElement.appendChild(markerCircle);const farmDetails=farms.flatMap(farm=>farm).find(farm=>farm.farm_name===location.farmname);const imageUrl=getRandomImageUrl();const farmArea=farmDetails?farmDetails.farm_area:'N/A';const farmId=farmDetails?farmDetails.farm_id:'N/A';const region=location.region_name;const farmAddress=farmDetails?farmDetails.farm_address:'N/A';pointCounter++;counterElement.innerHTML=`
                    <span class="material-symbols-outlined" style="font-size: 30px; vertical-align: middle;">psychiatry</span>
                    <span style="font-size:40px; position: relative; top: 2px;">
                        ${uniqueFarmCount} <span data-translate="farms">trang trại</span>
                    </span>
                `;counterElement.style.marginTop='10px';let popupContent=`
<div style="position: relative; padding: 0; margin: 0; padding-bottom: 10px;">
  <div style="overflow: hidden; width: 299.5px; height: 150px; position: relative; margin-left: -3.5%; margin-top: -13px; border-top-left-radius: 0px; border-top-right-radius: 0px;" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.1)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
    <img src="${randomImage}" alt="Farm Image" style="width: 328px; height: 150px; position: absolute; top: 0; left: 0; transition: transform 0.3s ease;" class="parallax-img" />
  </div>
</div>
                    
                    <div style="position: absolute; top: 30px; left: 8px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                      <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 4px; color: white;">psychiatry</span>
                      <b style="font-size: 19px; color: white;">${location.farmname}</b><br>
                      <span class="material-symbols-outlined" style="font-size: 12px; margin-right: 6px; color: white;">location_on</span>
                      <span style="font-size: 12px; color: white;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
                    </div>
                  </div>
                  
                  <div style="padding-bottom: 30px; top-padding 0px">
                    <div>
                      <!--Farm ID: ${farmDetails ? farmDetails.farm_id : 'N/A'}<br>-->
                      <!--Region name: ${location.region_name}<br>-->
                `;if(farmDetails){const matchingCultivates=farmDetails.cultivates.filter(cultivate=>cultivate.name===location.region_name);if(matchingCultivates.length>0){popupContent+=`
                            <span class="material-symbols-outlined" style="font-size: 14px; margin-right: 2px;">elevation</span> <b data-translate="Elevation">${getTranslatedText("Elevation")}</b>: ${elevation.toFixed(0)} meters<br>

                    <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b data-translate="Farm Area">${getTranslatedText("Farm Area")}</b>: ${farmDetails.farm_area} ha.
                      <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->
                    `;const cultivateDetailsPromises=matchingCultivates.map(async cultivate=>{popupContent+=`
                        <br>
                        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> <span data-translate="Tree Type">Loại cây</span>:</b> ${cultivate.tree_type === 0 ?
                                        '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> <span data-translate="Coffee">Cà phê</span>' :
                                        cultivate.tree_type === 1 ?
                                            '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> <span data-translate="Durian">Sầu riêng</span>' :
                                            cultivate.tree_type === 2 ?
                                                '<img src="https://i.ibb.co/WxVZrLN/icons8-pepper-96.png" alt="Pepper" style="width: 10px;"> <span data-translate="Pepper">Tiêu</span>' :
                                                cultivate.tree_type === 3 ?
                                                    '<img src="https://i.ibb.co/RCnz5gb/icons8-tea-leaves-64.png" alt="Tea" style="width: 10px;"> <span data-translate="Tea">Trà</span>' :
                                                    'N/A'
                                    }<br>`;const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>data.content).catch(error=>{console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`,error);return null;});if(cultivateDetails){popupContent+=`
                          <div>
                          <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> <span data-translate="Current Productivity">Năng suất hiện tại</span>: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>      
                          <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> <span data-translate="Expected Productivity">Năng suất dự kiến</span>: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                  
                            
                            
                            <!--Region ID: ${cultivateDetails.region_id}<br>-->
                            <!--Softids:<br>-->
                            <br>
                            <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; margin-right: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.3s;" onclick="toggleSoilData(this)" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='#4CAF50'">
                            <i class="fi fi-rs-network-analytic" style="margin-right: 3px; font-size: 12px;"></i>
  <span class="toggle-text" style="white-space: nowrap;" data-translate="View soil data">Xem dữ liệu đất</span>
  <span class="tooltip-bottom" data-translate="See detailed soil data available">See detailed soil data available</span>
</span>             
                            <div class="soil-data" style="display:none;">
                              <br>
                              <br>
                              <br>
                        `;totalCurrentProd+=cultivateDetails.current_prod;totalExpectedProd+=cultivateDetails.expected_prod;const nutritionDataPromises=cultivateDetails.softids.map(async softid=>{try{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>{const matchingValues=data.content.find(item=>item.in_depth===softid.in_depth)?.values;if(matchingValues&&matchingValues.created_at.length>0){const latestIndex=matchingValues.created_at.map((date,index)=>({date:new Date(date),index})).sort((a,b)=>b.date-a.date)[0].index;return{npk:matchingValues.npk?matchingValues.npk[latestIndex]:undefined,nts:matchingValues.nts?matchingValues.nts[latestIndex]:undefined,k2o:matchingValues.k2o?matchingValues.k2o[latestIndex]:undefined,p2o5:matchingValues.p2o5?matchingValues.p2o5[latestIndex]:undefined,moist:matchingValues.moist[latestIndex],pH:matchingValues.pH[latestIndex],t:matchingValues.t[latestIndex],created_at:matchingValues.created_at[latestIndex],};}
return null;}).catch(error=>{console.error(`Error fetching nutrition data for cultivate_id ${cultivate.cultivate_id} and in_depth ${softid.in_depth}:`,error);return null;});if(nutritionData){const isCoffee=cultivate.tree_type===0;const isDurian=cultivate.tree_type===1;const circleColorTemp=nutritionData.t<20?"#BA0F30":(nutritionData.t<=30?"#18A558":"#BA0F30");const circleColorpH=nutritionData.pH<7?"#BA0F30":(nutritionData.pH===7?"#18A558":"#BA0F30");const circleColorMoist=(nutritionData.moist<=22.5||nutritionData.moist>55)?"#BA0F30":(nutritionData.moist<=35?"#BA0F30":(nutritionData.moist<=55?"#18A558":"#BA0F30"));const roundedValue=(value)=>value!==null&&value!==undefined?value.toFixed(2):'N/A';let needsAttention=circleColorTemp==='#BA0F30'||circleColorpH==='#BA0F30'||circleColorMoist==='#BA0F30'||circleColorNPK==='#BA0F30'||circleColorNTS==='#BA0F30'||circleColorP2O5==='#BA0F30'||circleColorK2O==='#BA0F30';if(needsAttention){farmsNeedingAttention.add(location.farmname);}
popupContent+=`
                                                    <div style="position: relative; display: flex; align-items: center;">
                                                        <span data-translate="In Depth">Chiều sâu</span>: ${softid.in_depth} (${softid.in_depth_label})
                                                        <span class="showHistoricalSoilData-btn" style="position: absolute; right: 0; font-size: 8px; cursor: pointer; display: inline-block; position: absolute;">
                                                            <span class="material-symbols-outlined" data-cultivate-id="${cultivate.cultivate_id}" data-in-depth="${softid.in_depth}">chevron_forward</span>
                                                            <span class="tooltip-left" data-translate="Show historical soil data">Show historical soil data</span>
                                                        </span>
                                                    </div>
                                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 12px;">
                                                `;const gridItemStyle=`style="display: flex; align-items: center; white-space: nowrap;"`;const iconStyle=`style="font-size: 14px; margin-right: 2px; position: relative; top: 2px;"`;const valueStyle=`style="margin-left: 2px;"`;if(isCoffee){const npkQuotient=nutritionData.npk/300;const circleColorNPK=npkQuotient<0.5?"#BA0F30":(npkQuotient<=1?"#18A558":"#BA0F30");popupContent+=`
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>bubble_chart</span>
            <b>NPK:</b><span ${valueStyle}>${roundedValue(npkQuotient * 100)}%${nutritionData.npk !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorNPK}; font-size: 8px; ${circleColorNPK === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>humidity_mid</span>
            <b data-translate="Moisture">Độ ẩm</b>:<span ${valueStyle}>${roundedValue(nutritionData.moist)}%${nutritionData.moist !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorMoist}; font-size: 8px; ${circleColorMoist === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>water_ph</span>
            <b>pH:</b><span ${valueStyle}>${roundedValue(nutritionData.pH)}${nutritionData.pH !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorpH}; font-size: 8px; ${circleColorpH === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>device_thermostat</span>
            <b data-translate="Temperature">Nhiệt độ</b>:<span ${valueStyle}>${roundedValue(nutritionData.t)}℃${nutritionData.t !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorTemp}; font-size: 8px; ${circleColorTemp === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
    `;}else if(isDurian){const ntsValue=parseFloat(nutritionData.nts);const circleColorNTS=ntsValue<0.1?"#BA0F30":(ntsValue<=0.2?"#18A558":"#BA0F30");const p2o5Value=parseFloat(nutritionData.p2o5);const circleColorP2O5=p2o5Value<20?"#BA0F30":(p2o5Value<=60?"#18A558":"#BA0F30");const k2oValue=parseFloat(nutritionData.k2o);const circleColorK2O=k2oValue<100?"#BA0F30":(k2oValue<=200?"#18A558":"#BA0F30");popupContent+=`
        <div ${gridItemStyle}>
            <i class="fi fi-rr-circle-n" ${iconStyle}></i>
            <b>NTS:</b><span ${valueStyle}>${roundedValue(nutritionData.nts)}%${nutritionData.nts !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorNTS}; font-size: 8px; ${circleColorNTS === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>humidity_mid</span>
            <b data-translate="Moisture">Độ ẩm</b>:<span ${valueStyle}>${roundedValue(nutritionData.moist)}%${nutritionData.moist !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorMoist}; font-size: 8px; ${circleColorMoist === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <i class="fi fi-rr-circle-p" ${iconStyle}></i>
            <b>P2O5:</b><span ${valueStyle}>${roundedValue(nutritionData.p2o5)} ppm${nutritionData.p2o5 !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorP2O5}; font-size: 8px; ${circleColorP2O5 === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>water_ph</span>
            <b>pH:</b><span ${valueStyle}>${roundedValue(nutritionData.pH)}${nutritionData.pH !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorpH}; font-size: 8px; ${circleColorpH === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <i class="fi fi-rr-circle-k" ${iconStyle}></i>
            <b>K2O:</b><span ${valueStyle}>${roundedValue(nutritionData.k2o)} ppm${nutritionData.k2o !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorK2O}; font-size: 8px; ${circleColorK2O === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
        <div ${gridItemStyle}>
            <span class="material-symbols-outlined" ${iconStyle}>device_thermostat</span>
            <b data-translate="Temperature">Nhiệt độ</b>:<span ${valueStyle}>${roundedValue(nutritionData.t)}℃${nutritionData.t !== null ? `&nbsp;<i class="fas fa-circle"style="color: ${circleColorTemp}; font-size: 8px; ${circleColorTemp === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
        </div>
    `;}
popupContent+=`
                                                    </div>
                                                    <span style="font-size: 10px; margin-top: 5px; display: block;">
                                                        <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                        <i style="vertical-align: middle;"><span data-translate="Last updated">Cập nhật mới nhất</span>: ${nutritionData.created_at}</i>
                                                    </span>
                                                    <style>
                                                        @keyframes glowRed {
                                                            0% { color: #BA0F30; text-shadow: 0 0 5px #e86161, 0 0 10px #e86161, 0 0 15px #e86161; }
                                                            50% { color: #e86161; text-shadow: 0 0 10px #e86161, 0 0 20px #e86161, 0 0 30px #e86161; }
                                                            100% { color: #BA0F30; text-shadow: 0 0 5px #e86161, 0 0 10px #e86161, 0 0 15px #e86161; }
                                                        }
                                                    </style>
                                                `;}else{}}catch(error){console.error(`Error processing nutrition data for softid ${softid.in_depth}:`,error);}});await Promise.all(nutritionDataPromises);popupContent+=`</div></div>`;}else{popupContent+=`<br><i>Error fetching cultivate details</i>`;}
return popupContent;});await Promise.all(cultivateDetailsPromises);}else{popupContent+=`<div class="popup-content no-cultivate-details"><i data-translate="No matching cultivate details found">${getTranslatedText("No matching cultivate details found")}</i></div><br>`;}}else{popupContent+=`<div class="popup-content no-farm-details"><i data-translate="Farm details not found">${getTranslatedText("Farm details not found")}</i></div><br>`;}
document.getElementById('totalDevicesCount').innerText=totalDevicesCount;document.getElementById('needAttentionSum').innerText=farmsNeedingAttention.size;document.getElementById('totalDevicesCountFraction').innerText=uniqueFarmCount;document.getElementById('currentProductivitySum').innerText=totalCurrentProd.toFixed(2);document.getElementById('expectedProductivitySum').innerText=totalExpectedProd.toFixed(2);const popup=new mapboxgl.Popup().setHTML(translatePopupContent(popupContent));const marker=new mapboxgl.Marker(markerElement).setLngLat([location.long,location.lat]).setPopup(popup).addTo(map);marker.originalContent=popupContent;allMarkers.push(marker);marker.getElement().addEventListener('click',()=>{const popup=marker.getPopup();const updatedContent=translatePopupContent(marker.originalContent);popup.setHTML(updatedContent);setTimeout(()=>{const popupContent=popup.getElement();const showHistoricalSoilDataBtns=popupContent.querySelectorAll('.showHistoricalSoilData-btn');showHistoricalSoilDataBtns.forEach(btn=>{if(!btn.getAttribute('data-event-added')){btn.addEventListener('click',handleHistoricalSoilDataClick);btn.setAttribute('data-event-added','true');}});},0);});popup.on('open',function(){const showHistoricalSoilDataBtns=this._content.querySelectorAll('.showHistoricalSoilData-btn');if(showHistoricalSoilDataBtns){showHistoricalSoilDataBtns.forEach(btn=>{if(!btn.getAttribute('data-event-added')){const handleClick=function(){try{const iconElement=this.querySelector('.material-symbols-outlined');if(!iconElement){throw new Error('Icon element not found');}
const cultivateId=iconElement.getAttribute('data-cultivate-id');const inDepth=iconElement.getAttribute('data-in-depth');if(!cultivateId||!inDepth){throw new Error('Missing cultivate_id or in_depth data');}
const popupContent=this.closest('.mapboxgl-popup-content');if(!popupContent){throw new Error('Popup content not found');}
const treeTypeElement=popupContent.querySelector('[data-translate="Coffee"], [data-translate="Durian"], [data-translate="Pepper"], [data-translate="Tea"]');const treeType=treeTypeElement?treeTypeElement.getAttribute('data-translate'):'Unknown';console.log('cultivate_id:',cultivateId);console.log('in_depth:',inDepth);console.log('tree type:',treeType);const regionId=this.getAttribute('data-region-id')||'Unknown';console.log('region_id:',regionId);if(typeof fetchData==='function'){fetchData(regionId,inDepth);}else{console.warn('fetchData function is not defined');}
const event=new CustomEvent('soilDataRequested',{detail:{cultivateId:cultivateId,regionId:regionId,inDepth:inDepth,treeType:treeType}});window.dispatchEvent(event);const popupHistoricalSoilData=document.getElementById('popup-historicalsoildata');if(popupHistoricalSoilData){popupHistoricalSoilData.style.display='block';}else{console.warn('Historical soil data popup element not found');}}catch(error){console.error('Error in handleClick:',error.message);}};btn.addEventListener('click',handleClick);btn.setAttribute('data-event-added','true');}});}});});}).catch(error=>console.error('Error fetching installation locations:',error));}catch(error){console.error('Error fetching farm details:',error);}};function toggleSoilData(element){var soilDataDiv=element.nextElementSibling;var toggleText=element.querySelector('.toggle-text');if(soilDataDiv.style.display==="none"){soilDataDiv.style.display="block";toggleText.textContent=getTranslatedText('Hide soil data');}else{soilDataDiv.style.display="none";toggleText.textContent=getTranslatedText('View soil data');}}
function updateOpenPopup(){map.eachLayer(function(layer){if(layer instanceof L.Marker&&layer.isPopupOpen()){const popup=layer.getPopup();const content=popup.getContent();const tempDiv=document.createElement('div');tempDiv.innerHTML=content;const elementsToTranslate=tempDiv.querySelectorAll('[data-translate]');elementsToTranslate.forEach(element=>{const key=element.getAttribute('data-translate');element.textContent=(key);});const historicalSoilDataBtns=tempDiv.querySelectorAll('.showHistoricalSoilData-btn');historicalSoilDataBtns.forEach(btn=>{const regionId=btn.querySelector('.material-symbols-outlined').getAttribute('data-region-id');const inDepth=btn.querySelector('.material-symbols-outlined').getAttribute('data-in-depth');btn.querySelector('.material-symbols-outlined').setAttribute('data-region-id',regionId);btn.querySelector('.material-symbols-outlined').setAttribute('data-in-depth',inDepth);});const updatedContent=tempDiv.innerHTML;popup.setContent(updatedContent);popup.update();const popupContainer=popup.getElement();if(popupContainer){const showHistoricalSoilDataBtns=popupContainer.querySelectorAll('.showHistoricalSoilData-btn');showHistoricalSoilDataBtns.forEach((btn)=>{btn.removeEventListener('click',handleHistoricalSoilDataClick);btn.addEventListener('click',handleHistoricalSoilDataClick);});}}});}
let pointCounter=0;const counterElement=document.createElement('div');counterElement.className='point-counter';counterElement.innerHTML=`
<div style="margin-top: 20px;">
    <span class="material-symbols-outlined" style="font-size: 30px; vertical-align: middle;">psychiatry</span>
    <span style="font-size: 35px; position: relative; top: 2px;">${pointCounter} <span data-translate="farms">farms</span></span>
</div>
`;map.getContainer().appendChild(counterElement);const hectaresElement=document.createElement('div');hectaresElement.className='hectares-counter';hectaresElement.innerHTML=`<span class="material-symbols-outlined">background_dot_small</span> <span id="hectaresCount">Loading...</span> hectares`;document.body.appendChild(hectaresElement);fetchFarmData3D(authenticatedUserIDs);