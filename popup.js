window.currentLang='vi';window.getTranslatedText=function(key){return translations[currentLang][key]||key}
var images=['https://i.ibb.co/C0gT2rp/projeto-cafe-gato-mourisco-Z8m-Gr-8-E7f4-unsplash.jpg','https://i.ibb.co/HXbrp66/projeto-cafe-gato-mourisco-Uz1-Rk85-VUW4-unsplash.jpg','https://i.ibb.co/sqXW5Lf/projeto-cafe-gato-mourisco-z-OVRgig-QMQA-unsplash.jpg','https://i.ibb.co/D5rD1qj/projeto-cafe-gato-mourisco-eq5-OMTg-ED4-unsplash.jpg','https://i.ibb.co/JH08gkp/projeto-cafe-gato-mourisco-6fo-Phyz6-QU-unsplash.jpg','https://i.ibb.co/R0LYsq5/projeto-cafe-gato-mourisco-q-EJd-MO6-Qml-Y-unsplash.jpg','https://i.ibb.co/4WC5LWz/projeto-cafe-gato-mourisco-Pjv-HCp-KPzho-unsplash.jpg','https://i.ibb.co/gRdpBB3/anton-shuvalov-GTz-Rv-LR6a-OU-unsplash.jpg','https://i.ibb.co/Lg2SCqc/projeto-cafe-gato-mourisco-yw-Ec-Uv-W4-Ha-U-unsplash.jpg','https://i.ibb.co/ByhYLQy/projeto-cafe-gato-mourisco-b-Forvtl-Lx-SA-unsplash.jpg'];let originalMarkers;let currentFilteredMarkers;let activeFilters={needsAttention:!1,coffee:!1,durian:!1,tea:!1,pepper:!1};let farmsNeedingAttention=new Set();let totalCurrentProd=0;let totalExpectedProd=0;const fetchFarmData=async(userIds)=>{try{const requests=userIds.map(userId=>axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:userId,},{headers:{'accept':'application/json','Content-Type':'application/json',},}));const responses=await axios.all(requests);const farms=responses.flatMap(response=>response.data.content.data);const farmNames=farms.map(farm=>farm.farm_name);fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'},}).then(response=>response.json()).then(data=>{const filteredLocations=data.content.filter(location=>{return!(/toàn|test|enfarm|koko/i.test(location.farmname)||/toàn|test|enfarm|koko/i.test(location.region_name))&&farmNames.includes(location.farmname)});const associatedLocations=filteredLocations.filter(location=>{return farmNames.includes(location.farmname)});const uniqueFarms=new Set();filteredLocations.forEach(location=>{const farmKey=`${location.lat},${location.long}`;uniqueFarms.add(farmKey)});const uniqueFarmCount=uniqueFarms.size;document.getElementById('totalfarmCount').innerText=uniqueFarmCount;var totalDevicesCount=associatedLocations.length;var farmsNeedingAttentionCount=0;var markers=L.markerClusterGroup();associatedLocations.forEach(location=>{var randomImage=images[Math.floor(Math.random()*images.length)];const farmDetails=farms.flatMap(farm=>farm).find(farm=>farm.farm_name===location.farmname);var customMarker=L.divIcon({className:'custom-marker',html:`
        <div class="marker2D-label" style="background-color: rgba(0, 0, 0, 0); color: rgb(58, 58, 58); font-size: 12px; font-weight: normal; padding: 3px 6px; border-radius: 10px; margin-right: 8px; white-space: nowrap; font-family: 'Be Vietnam', sans-serif; position: absolute; top: -10px; left: 30px; background-color: #ffffff00; border: none; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; display: flex; align-items: center;">
            <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">psychiatry</span>
            ${location.farmname}
        </div>
        <img src="${customIcon.options.iconUrl}" class="marker-icon"/>
    `});var marker=L.marker([location.lat,location.long],{icon:customMarker,farmName:location.farmname});function getTreeTypesFromPopup(popupContent){const treeTypes=new Set();if(popupContent.includes('data-translate="Coffee"'))treeTypes.add('Coffee');if(popupContent.includes('data-translate="Durian"'))treeTypes.add('Durian');if(popupContent.includes('data-translate="Tea"'))treeTypes.add('Tea');if(popupContent.includes('data-translate="Pepper"'))treeTypes.add('Pepper');return Array.from(treeTypes)}
var popupContent=`
                    <div style="position: relative; padding: 0; margin: 0;">
                    <div style="overflow: hidden; width: 330px; height: 150px; position: relative; margin-left: -7.5%; margin-top: -15px; border-top-left-radius: 6px; border-top-right-radius: 6px;" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.1)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
                    <img src="${randomImage}" alt="Farm Image" style="width: 330px; height: 150px; position: absolute; top: 0; left: 0; transition: transform 0.3s ease;" class="parallax-img" />
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
<br><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b data-translate="Farm Area">${getTranslatedText("Farm Area")}</b>: ${farmDetails.farm_area} ha.`;const cultivateDetailsPromises=matchingCultivates.map(async cultivate=>{popupContent+=`
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
                                    }<br>`;const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>data.content).catch(error=>{console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`,error);return null});if(cultivateDetails){popupContent+=`
    <div>
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> <span data-translate="Current Productivity">Năng suất hiện tại</span>: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
        
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> <span data-translate="Expected Productivity">Năng suất dự kiến</span>: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
        <!--Cultivate ID: ${cultivateDetails.cultivate_id}<br>-->
        <!--Region ID: ${cultivateDetails.region_id}<br>-->
        <!--Softids:<br>-->
        <br>
        
        
        <div>

    
        <!-- Existing 3D button -->
        <span class="view-in-3D" style="background-color: #ffffff; color: #000000; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: left; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-left: 70px; margin-right: 5px; position: relative;" onmouseover="showIcon(this); this.style.backgroundColor='#f0f0f0'" onmouseout="hideIcon(this); this.style.backgroundColor='#ffffff'" onclick="logLatLong(${location.lat}, ${location.long})">
            <span class="material-symbols-outlined" id="icon" style="display: none; font-size: 16px;">elevation</span>
            <span id="text">3D</span>
            <span class="tooltip-bottom" data-translate="Visualize farm in 3D">Visualize farm in 3D</span>
        </span>

        <!-- Zoom to Farm button -->
        <span class="zoom-in-farm" style="background-color: #ffffff; color: #000000; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-right: 5px; position: relative;" onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='#ffffff'" onclick="zoomToMarker(${location.lat}, ${location.long})">
            <span class="material-symbols-outlined" style="font-size: 16px;">zoom_in</span>
            <span class="tooltip-bottom" data-translate="Zoom in to Farm">Zoom in to farm</span>
        </span>
    
        <!-- Soil data button -->
        <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); transition: background-color 0.3s;" onclick="toggleSoilData(this)" onmouseover="this.style.backgroundColor='#006400'" onmouseout="this.style.backgroundColor='#4CAF50'">
            <i class="fi fi-rs-network-analytic" style="margin-right: 3px; font-size: 12px;"></i>
            <span class="toggle-text-container" style="position: relative; display: inline-block; cursor: pointer;">
                <span class="toggle-text" style="white-space: nowrap;" data-translate="View soil data">Xem dữ liệu đất</span>
                <span class="tooltip-bottom" data-translate="See detailed soil data available">See detailed soil data available</span>
            </span>
        </span>
    </div>
    </div>
    
    <div class="soil-data" style="display:none;">
    <br>
    <br>
    <br>
`;totalCurrentProd+=cultivateDetails.current_prod;totalExpectedProd+=cultivateDetails.expected_prod;const nutritionDataPromises=cultivateDetails.softids.map(async softid=>{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>{const matchingValues=data.content.find(item=>item.in_depth===softid.in_depth)?.values;if(matchingValues&&matchingValues.created_at.length>0){const latestIndex=matchingValues.created_at.map((date,index)=>({date:new Date(date),index})).sort((a,b)=>b.date-a.date)[0].index;return{npk:matchingValues.npk?matchingValues.npk[latestIndex]:undefined,nts:matchingValues.nts?matchingValues.nts[latestIndex]:undefined,k2o:matchingValues.k2o?matchingValues.k2o[latestIndex]:undefined,p2o5:matchingValues.p2o5?matchingValues.p2o5[latestIndex]:undefined,moist:matchingValues.moist[latestIndex],pH:matchingValues.pH[latestIndex],t:matchingValues.t[latestIndex],created_at:matchingValues.created_at[latestIndex],}}
return null}).catch(error=>{console.error(`Error fetching nutrition data for cultivate_id ${cultivate.cultivate_id} and in_depth ${softid.in_depth}:`,error);return null});if(nutritionData){const circleColorTemp=nutritionData.t<20?"#BA0F30":(nutritionData.t<=30?"#18A558":"#BA0F30");const circleColorpH=nutritionData.pH<7?"#BA0F30":(nutritionData.pH===7?"#18A558":"#BA0F30");const circleColorMoist=(nutritionData.moist<=22.5||nutritionData.moist>55)?"#BA0F30":(nutritionData.moist<=35?"#BA0F30":(nutritionData.moist<=55?"#18A558":"#BA0F30"));const npkQuotient=nutritionData.npk/300;const circleColorNPK=npkQuotient<0.5?"#BA0F30":(npkQuotient<=1?"#18A558":"#BA0F30");const ntsValue=parseFloat(nutritionData.nts);const circleColorNTS=ntsValue<0.1?"#BA0F30":(ntsValue<=0.2?"#18A558":"#BA0F30");const p2o5Value=parseFloat(nutritionData.p2o5);const circleColorP2O5=p2o5Value<20?"#BA0F30":(p2o5Value<=60?"#18A558":"#BA0F30");const k2oValue=parseFloat(nutritionData.k2o);const circleColorK2O=k2oValue<100?"#BA0F30":(k2oValue<=200?"#18A558":"#BA0F30");const roundedValue=(value)=>value!==null&&value!==undefined?value.toFixed(2):'N/A';let needsAttention=circleColorTemp==='#BA0F30'||circleColorpH==='#BA0F30'||circleColorMoist==='#BA0F30'||circleColorNPK==='#BA0F30'||circleColorNTS==='#BA0F30'||circleColorP2O5==='#BA0F30'||circleColorK2O==='#BA0F30';if(needsAttention){farmsNeedingAttention.add(location.farmname)}
popupContent+=`
                                                <div style="position: relative; display: flex; align-items: center;">
                                                    <span data-translate="In Depth">Chiều sâu</span>: ${softid.in_depth} (${softid.in_depth_label})
                                                    <span class="showHistoricalSoilData-btn" style="position: absolute; right: 0; font-size: 8px; cursor: pointer; display: inline-block; position: absolute;">
                                                        <span class="material-symbols-outlined" data-cultivate-id="${cultivate.cultivate_id}" data-in-depth="${softid.in_depth}">chevron_forward</span>
                                                        <span class="tooltip-left" data-translate="Show historical soil data">Show historical soil data</span>
                                                    </span>
                                                </div>
                                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 12px;">
                                            `;const gridItemStyle=`style="display: flex; align-items: center; white-space: nowrap;"`;const iconStyle=`style="font-size: 14px; margin-right: 2px;"`;const valueStyle=`style="margin-left: 2px;"`;if(cultivate.tree_type===0){const npkQuotient=nutritionData.npk/300;const circleColorNPK=npkQuotient<0.5?"#BA0F30":(npkQuotient<=1?"#18A558":"#BA0F30");needsAttention=needsAttention||circleColorNPK==='#BA0F30';const iconStyle=`style="font-size: 14px; margin-right: 2px; position: relative; top: 0px;"`;popupContent+=`
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>bubble_chart</span>
                                                        <b>NPK:</b><span ${valueStyle}>${roundedValue(npkQuotient * 100)}%${nutritionData.npk !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorNPK}; font-size: 8px; ${circleColorNPK === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>water_ph</span>
                                                        <b>pH:</b><span ${valueStyle}>${roundedValue(nutritionData.pH)}${nutritionData.pH !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorpH}; font-size: 8px; ${circleColorpH === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>humidity_mid</span>
                                                        <b data-translate="Moisture">Độ ẩm</b>:<span ${valueStyle}>${roundedValue(nutritionData.moist)}%${nutritionData.moist !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorMoist}; font-size: 8px; ${circleColorMoist === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>device_thermostat</span>
                                                        <b data-translate="Temperature">Nhiệt độ</b>:<span ${valueStyle}>${roundedValue(nutritionData.t)}℃${nutritionData.t !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorTemp}; font-size: 8px; ${circleColorTemp === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                `}else if(cultivate.tree_type===1){const ntsValue=parseFloat(nutritionData.nts);const circleColorNTS=ntsValue<0.1?"#BA0F30":(ntsValue<=0.2?"#18A558":"#BA0F30");needsAttention=needsAttention||circleColorNTS==='#BA0F30';const p2o5Value=parseFloat(nutritionData.p2o5);const circleColorP2O5=p2o5Value<20?"#BA0F30":(p2o5Value<=60?"#18A558":"#BA0F30");needsAttention=needsAttention||circleColorP2O5==='#BA0F30';const k2oValue=parseFloat(nutritionData.k2o);const circleColorK2O=k2oValue<100?"#BA0F30":(k2oValue<=200?"#18A558":"#BA0F30");needsAttention=needsAttention||circleColorK2O==='#BA0F30';const iconStyle=`style="font-size: 14px; margin-right: 2px; position: relative; top: 1px;"`;popupContent+=`
                                                    <div ${gridItemStyle}>
                                                        <i class="fi fi-rr-circle-n" ${iconStyle}></i>
                                                        <b>NTS:</b><span ${valueStyle}>${roundedValue(nutritionData.nts)}%${nutritionData.nts !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorNTS}; font-size: 8px; ${circleColorNTS === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>humidity_mid</span>
                                                        <b data-translate="Moisture">Độ ẩm</b>:<span ${valueStyle}>${roundedValue(nutritionData.moist)}%${nutritionData.moist !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorMoist}; font-size: 8px; ${circleColorMoist === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <i class="fi fi-rr-circle-p" ${iconStyle}></i>
                                                        <b>P2O5:</b><span ${valueStyle}>${roundedValue(nutritionData.p2o5)} ppm${nutritionData.p2o5 !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorP2O5}; font-size: 8px; ${circleColorP2O5 === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>water_ph</span>
                                                        <b>pH:</b><span ${valueStyle}>${roundedValue(nutritionData.pH)}${nutritionData.pH !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorpH}; font-size: 8px; ${circleColorpH === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <i class="fi fi-rr-circle-k" ${iconStyle}></i>
                                                        <b>K2O:</b><span ${valueStyle}>${roundedValue(nutritionData.k2o)} ppm${nutritionData.k2o !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorK2O}; font-size: 8px; ${circleColorK2O === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>device_thermostat</span>
                                                        <b data-translate="Temperature">Nhiệt độ</b>:<span ${valueStyle}>${roundedValue(nutritionData.t)}℃${nutritionData.t !== null ? `&nbsp;<i class="fas fa-circle" style="color: ${circleColorTemp}; font-size: 8px; ${circleColorTemp === '#BA0F30' ? 'animation: glowRed 1s infinite;' : ''}"></i>` : ''}</span>
                                                    </div>
                                                `}
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
                                                        `;Promise.all(nutritionDataPromises).then(nutritionDataArray=>{}).catch(error=>{console.error('Error processing nutrition data:',error)})}else{popupContent+=`
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>-->
                                                `}});await Promise.all(nutritionDataPromises);popupContent+=`</div></div>`}else{popupContent+=`<br><i>Error fetching cultivate details</i>`}
return popupContent});Promise.all(cultivateDetailsPromises).then(cultivateDetails=>{popupContent=cultivateDetails.join('');popupContent+='</p>';marker.bindPopup(popupContent);marker.options.treeTypes=getTreeTypesFromPopup(popupContent);marker.on('popupopen',function(){const popup=this.getPopup();const content=popup.getContent();if(content&&typeof content==='string'){const updatedContent=updatePopupContent(content);popup.setContent(updatedContent);popup.update()}
const showHistoricalSoilDataBtns=this._popup._contentNode.querySelectorAll('.showHistoricalSoilData-btn');showHistoricalSoilDataBtns.forEach((btn,index)=>{btn.addEventListener('click',function(){const popupContent=this.closest('.leaflet-popup-content');const cultivateIdMatch=popupContent.innerHTML.match(/Cultivate ID: (\d+)/);const regionIdMatch=popupContent.innerHTML.match(/Region ID: (\d+)/);const inDepth=this.querySelector('.material-symbols-outlined').getAttribute('data-in-depth');const treeTypeMatch=popupContent.innerHTML.match(/<span data-translate="(Coffee|Durian|Pepper|Tea)">/);const treeType=treeTypeMatch?treeTypeMatch[1]:'Unknown';let cultivateId,regionId;if(cultivateIdMatch){cultivateId=cultivateIdMatch[1];console.log('cultivate_id:',cultivateId)}else{console.log('Cultivate ID not found in the popup content.')}
if(regionIdMatch){regionId=regionIdMatch[1];console.log('region_id:',regionId)}else{console.log('Region ID not found in the popup content.')}
console.log('in_depth:',inDepth);console.log('tree type:',treeType);const farmType=treeType.toLowerCase()==='coffee'?'coffee':'durian';const event=new CustomEvent('soilDataRequested',{detail:{cultivateId:cultivateId,regionId:regionId,inDepth:inDepth,treeType:treeType}});window.dispatchEvent(event);const popupHistoricalSoilData=document.querySelector('.popup-historicalsoildata');popupHistoricalSoilData.style.display='block'})})});function updatePopupTranslations(content){const tempDiv=document.createElement('div');tempDiv.innerHTML=content;const elementsToTranslate=tempDiv.querySelectorAll('[data-translate]');elementsToTranslate.forEach(element=>{const key=element.getAttribute('data-translate');element.textContent=getTranslatedText(key)});return tempDiv.innerHTML}}).catch(error=>{console.error('Error fetching cultivate details:',error)}).finally(()=>{let farmsNeedingAttentionCount=farmsNeedingAttention.size;document.getElementById('needAttentionSum').innerText=farmsNeedingAttentionCount;updateNotificationCircle();document.getElementById('totalDevicesCountFraction').innerText=uniqueFarmCount;document.getElementById('currentProductivitySum').innerText=totalCurrentProd.toFixed(2);document.getElementById('expectedProductivitySum').innerText=totalExpectedProd.toFixed(2);console.log('Farms needing attention:',Array.from(farmsNeedingAttention))})}else{popupContent+=`<div class="popup-content no-cultivate-details"><i data-translate="No matching cultivate details found">${getTranslatedText("No matching cultivate details found")}</i></div><br>`;popupContent+='</p>';marker.bindPopup(popupContent,{autoPan:!1,autoClose:!1});marker.options.treeTypes=getTreeTypesFromPopup(popupContent);marker.on('popupopen',function(){const popup=this.getPopup();const content=popup.getContent();const updatedContent=updatePopupContent(content);popup.setContent(updatedContent);popup.update()})}}else{popupContent+=`<div class="popup-content no-farm-details"><i data-translate="Farm details not found">${getTranslatedText("Farm details not found")}</i></div><br>`;popupContent+='</p>';marker.bindPopup(popupContent,{autoPan:!1,autoClose:!1});marker.on('popupopen',function(){const popup=this.getPopup();const content=popup.getContent();const updatedContent=updatePopupContent(content);popup.setContent(updatedContent);popup.update()})}
markers.addLayer(marker)});originalMarkers=markers;currentFilteredMarkers=markers;map.addLayer(markers);document.getElementById('totalDevicesCount').innerText=totalDevicesCount;function createIcon(iconUrl,iconSize,popupOffset){return L.icon({iconUrl:iconUrl,iconSize:iconSize,iconAnchor:[iconSize[0]/2,iconSize[1]],popupAnchor:popupOffset})}
const originalIcon=createIcon('https://i.ibb.co/bWhk7NN/gps-shadow.png',[32,32],[0,-32]);const durianIcon=createIcon('https://i.ibb.co/nnrMSMd/durian-removebg-preview.png',[40,40],[-3,-28]);const coffeeIcon=createIcon('https://i.ibb.co/L6cGsSX/bean-shadow.png',[40,40],[-30,-40]);const pepperIcon=createIcon('https://i.ibb.co/WxVZrLN/icons8-pepper-96.png',[40,40],[-3,-30]);const teaIcon=createIcon('https://i.ibb.co/RCnz5gb/icons8-tea-leaves-64.png',[40,40],[-3,-30]);const warningIcon=createIcon('images/icons8-warning.gif',[30,30],[0,-40]);function applyFilters(){console.log('Applying filters:',activeFilters);map.eachLayer(function(layer){if(layer instanceof L.MarkerClusterGroup){map.removeLayer(layer)}});let filteredMarkers=L.markerClusterGroup();const anyFilterActive=Object.values(activeFilters).some(filter=>filter);originalMarkers.eachLayer(function(marker){let shouldInclude=!0;const popupContent=marker.getPopup().getContent();const treeTypes=marker.options.treeTypes;console.log('Marker:',marker.options.farmName,'Tree Types:',treeTypes);if(anyFilterActive){if(activeFilters.needsAttention&&!popupContent.includes('animation: glowRed')){shouldInclude=!1}
if(activeFilters.coffee||activeFilters.durian||activeFilters.tea||activeFilters.pepper){shouldInclude=treeTypes.some(type=>(activeFilters.coffee&&type==='Coffee')||(activeFilters.durian&&type==='Durian')||(activeFilters.tea&&type==='Tea')||(activeFilters.pepper&&type==='Pepper'))}}
console.log('Marker:',marker.options.farmName,'Should Include:',shouldInclude);if(shouldInclude){let iconUrl='https://i.ibb.co/bWhk7NN/gps-shadow.png';if(activeFilters.needsAttention&&popupContent.includes('animation: glowRed')){iconUrl='images/icons8-warning.gif'}else if(activeFilters.coffee&&treeTypes.includes('Coffee')){iconUrl='https://i.ibb.co/L6cGsSX/bean-shadow.png'}else if(activeFilters.durian&&treeTypes.includes('Durian')){iconUrl='https://i.ibb.co/nnrMSMd/durian-removebg-preview.png'}else if(activeFilters.tea&&treeTypes.includes('Tea')){iconUrl='https://i.ibb.co/RCnz5gb/icons8-tea-leaves-64.png'}else if(activeFilters.pepper&&treeTypes.includes('Pepper')){iconUrl='https://i.ibb.co/WxVZrLN/icons8-pepper-96.png'}
marker.setIcon(createCustomMarker(marker.options.farmName,iconUrl));filteredMarkers.addLayer(marker)}});map.addLayer(filteredMarkers);currentFilteredMarkers=filteredMarkers}
function toggleFarms(button,farmType,farmIcon,activeClass){button.addEventListener('click',function(){activeFilters[farmType.toLowerCase()]=!activeFilters[farmType.toLowerCase()];button.classList.toggle(activeClass);console.log(`Toggled ${farmType} filter:`,activeFilters[farmType.toLowerCase()]);applyFilters()})}
function createCustomMarker(farmName,iconUrl,position='top'){const labelPositions={'top':'top: -10px; left: 30px;','right':'top: 0; left: 40px;','bottom':'top: 30px; left: 30px;','left':'top: 0; left: -100px;'};return L.divIcon({className:'custom-marker',html:`
                            <div class="marker2D-label" style="background-color: rgba(0, 0, 0, 0); color: rgb(58, 58, 58); font-size: 12px; font-weight: normal; padding: 3px 6px; border-radius: 10px; margin-right: 8px; white-space: nowrap; font-family: 'Be Vietnam', sans-serif; position: absolute; ${labelPositions[position]} background-color: #ffffff00; border: none; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; display: flex; align-items: center;">
                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">psychiatry</span>
                                ${farmName}
                            </div>
                            <img src="${iconUrl}" class="marker-icon"/>
                        `})}
const durianButton=document.querySelector('.durianTrees-filter');const coffeeButton=document.querySelector('.coffeeTrees-filter');const pepperButton=document.querySelector('.pepperFarms-filter');const teaButton=document.querySelector('.teaFarms-filter');toggleFarms(durianButton,'Durian','https://i.ibb.co/nnrMSMd/durian-removebg-preview.png','active-durian');toggleFarms(coffeeButton,'Coffee','https://i.ibb.co/L6cGsSX/bean-shadow.png','active-coffee');toggleFarms(pepperButton,'Pepper','https://i.ibb.co/WxVZrLN/icons8-pepper-96.png','active-pepper');toggleFarms(teaButton,'Tea','https://i.ibb.co/RCnz5gb/icons8-tea-leaves-64.png','active-tea');const needsAttentionButton=document.querySelector('.needs-attention');needsAttentionButton.addEventListener('click',function(){activeFilters.needsAttention=!activeFilters.needsAttention;this.classList.toggle('active-needs-attention');updateNeedsAttentionButtonAppearance();applyFilters()});function updateNeedsAttentionButtonAppearance(){if(activeFilters.needsAttention){needsAttentionButton.innerHTML='<div style="display: inline-block; position: relative;">'+'<i class="material-symbols-outlined" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); font-size: 18px; color: white;">psychiatry</i>'+`<span style="padding-left: 20px;" data-translate="Show all">${translations[currentLang]["Show all"]}</span>`+'</div>';needsAttentionButton.style.padding='7px 10px'}else{needsAttentionButton.innerHTML=`
                            <div id="lottie-container" style="width: 24px; height: 24px;"></div>
                            <span class="attention-text" data-translate="Alert">${translations[currentLang]["Alert"]}</span>
                            <span class="tooltip-bottom" data-translate="Show farms needing attention">${translations[currentLang]["Show farms needing attention"]}</span>
                            <span class="notification-circle"></span>
                        `;lottie.loadAnimation({container:document.getElementById('lottie-container'),renderer:'svg',loop:!0,autoplay:!0,path:'https://lottie.host/41453d5b-98f5-4478-ae32-24ffb6f5ff63/wN5fPgSl5x.json'});updateNotificationCircle()}}}).catch(error=>console.error('Error fetching data:',error))}catch(error){console.error('Error fetching farm details:',error)}};function toggleSoilData(element){var soilDataDiv=element.closest('.leaflet-popup-content').querySelector('.soil-data');var toggleText=element.querySelector('.toggle-text');if(soilDataDiv&&toggleText){if(soilDataDiv.style.display==="none"){soilDataDiv.style.display="block";toggleText.textContent=getTranslatedText('Hide soil data')}else{soilDataDiv.style.display="none";toggleText.textContent=getTranslatedText('View soil data')}}else{console.error('Soil data div or toggle text not found')}}
function showIcon(element){var icon=element.querySelector('#icon');if(icon){icon.style.display='inline-flex'}}
function hideIcon(element){var icon=element.querySelector('#icon');if(icon){icon.style.display='none'}}
function logLatLong(lat,long){console.log("Longitude:",long);console.log("Latitude:",lat);localStorage.setItem('mapboxLat',lat);localStorage.setItem('mapboxLong',long);window.open('mapbox3D.html','_blank')}
function updateOpenPopup(){map.eachLayer(function(layer){if(layer instanceof L.Marker&&layer.isPopupOpen()){const popup=layer.getPopup();const content=popup.getContent();const tempDiv=document.createElement('div');tempDiv.innerHTML=content;const elementsToTranslate=tempDiv.querySelectorAll('[data-translate]');elementsToTranslate.forEach(element=>{const key=element.getAttribute('data-translate');element.textContent=getTranslatedText(key)});const historicalSoilDataBtns=tempDiv.querySelectorAll('.showHistoricalSoilData-btn');historicalSoilDataBtns.forEach(btn=>{const regionId=btn.querySelector('.material-symbols-outlined').getAttribute('data-region-id');const inDepth=btn.querySelector('.material-symbols-outlined').getAttribute('data-in-depth');btn.querySelector('.material-symbols-outlined').setAttribute('data-region-id',regionId);btn.querySelector('.material-symbols-outlined').setAttribute('data-in-depth',inDepth)});const updatedContent=tempDiv.innerHTML;popup.setContent(updatedContent);popup.update();const popupContainer=popup.getElement();if(popupContainer){const showHistoricalSoilDataBtns=popupContainer.querySelectorAll('.showHistoricalSoilData-btn');showHistoricalSoilDataBtns.forEach((btn)=>{})}}})}
function handleHistoricalSoilDataClick(event){const btn=event.currentTarget;const iconElement=btn.querySelector('.material-symbols-outlined');const cultivateId=iconElement.getAttribute('data-cultivate-id');const inDepth=iconElement.getAttribute('data-in-depth');console.log('cultivate_id:',cultivateId);console.log('in_depth:',inDepth);const soilDataEvent=new CustomEvent('soilDataRequested',{detail:{cultivateId:cultivateId,inDepth:inDepth}});window.dispatchEvent(soilDataEvent);const popupHistoricalSoilData=document.querySelector('.popup-historicalsoildata');if(popupHistoricalSoilData){popupHistoricalSoilData.style.display='block'}}
function zoomToMarker(lat,lng){map.flyTo([lat,lng],18,{animate:!0,duration:1.5})}
function getTreeTypesFromPopup(popupContent){const treeTypes=[];if(popupContent.includes('Tree Type:</b> Coffee')||popupContent.includes('data-translate="Coffee"'))treeTypes.push('Coffee');if(popupContent.includes('Tree Type:</b> Durian')||popupContent.includes('data-translate="Durian"'))treeTypes.push('Durian');if(popupContent.includes('Tree Type:</b> Tea')||popupContent.includes('data-translate="Tea"'))treeTypes.push('Tea');if(popupContent.includes('Tree Type:</b> Pepper')||popupContent.includes('data-translate="Pepper"'))treeTypes.push('Pepper');return treeTypes}
fetchFarmData(authenticatedUserIDs)
