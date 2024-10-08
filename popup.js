window.currentLang="vi";window.getTranslatedText=function(key){return translations[currentLang][key]||key;};let originalMarkers;let currentFilteredMarkers;let activeFilters={needsAttention:false,coffee:false,durian:false,tea:false,pepper:false,};let currentCultivateIndex=0;function countCultivates(farmData){return farmData.cultivates.length;}
async function getFarmThumbnail(farmId){try{const response=await axios.post('https://api-router.enfarm.com/api/v3/farm/retrieve-farm-detail',{farm_id:farmId},{headers:{accept:'application/json','Content-Type':'application/json'}});const farmThumbnail=response.data.content.data.farm_thumbnail;return farmThumbnail||'images/noimage.jfif';}catch(error){console.error('Error fetching farm thumbnail:',error);return'images/noimage.jfif';}}
const fetchFarmData=async(userIds)=>{try{const requests=userIds.map((userId)=>axios.post("https://api-router.enfarm.com/api/v3/farm/total-farms-per-user",{user_id:userId,},{headers:{accept:"application/json","Content-Type":"application/json",},}));const responses=await axios.all(requests);const farms=responses.flatMap((response)=>response.data.content.data);const farmIds=farms.map((farm)=>farm.farm_id);fetch("https://api-ma.enfarm.com/api/v1/ma/get-install-locations",{headers:{accept:"application/json",},}).then((response)=>response.json()).then((data)=>{const filteredLocations=data.content.filter((location)=>{return!/toàn|enfarm|koko/i.test(location.farmname)&&farmIds.includes(location.farmid);});filteredLocations.forEach(async(location)=>{const farmDetails=farms.find((farm)=>farm.farm_id===location.farmid);const farmThumbnail=await getFarmThumbnail(location.farmid);var customMarker=L.divIcon({className:"custom-marker",html:`
                            <div class="marker2D-label" style="background-color: rgba(0, 0, 0, 0); color: rgb(58, 58, 58); font-size: 12px; font-weight: normal; padding: 3px 6px; border-radius: 10px; margin-right: 8px; white-space: nowrap; font-family: 'Be Vietnam', sans-serif; position: absolute; top: -10px; left: 30px; background-color: #ffffff00; border: none; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; display: flex; align-items: center;">
                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">psychiatry</span>
                                ${location.farmname}
                            </div>
                            <img src="${customIcon.options.iconUrl}" class="marker-icon"/>
                        `,});var marker=L.marker([location.lat,location.long],{icon:customMarker,farmName:location.farmname,});function getTreeTypesFromPopup(popupContent){const treeTypes=new Set();if(popupContent.includes('data-translate="Coffee"'))treeTypes.add("Coffee");if(popupContent.includes('data-translate="Durian"'))treeTypes.add("Durian");if(popupContent.includes('data-translate="Tea"'))treeTypes.add("Tea");if(popupContent.includes('data-translate="Pepper"'))treeTypes.add("Pepper");return Array.from(treeTypes);}
var popupContent=`
                    <div style="position: relative; padding: 0; margin: 0;">
                    <div style="overflow: hidden; width: 330px; height: 150px; position: relative; margin-left: -7.5%; margin-top: -15px; border-top-left-radius: 6px; border-top-right-radius: 6px;" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.1)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
                        <img src="${farmThumbnail}" alt="Farm Image" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: transform 0.3s ease;" class="parallax-img" />
                    </div>

                    <div style="position: absolute; top: 30px; left: 0px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px; color: white;">psychiatry</span>
                    <b style="font-size: 18px; color: white;">${location.farmname}</b><br>
                    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px; color: white;">location_on</span>
                    <span style="font-size: 12px; color: white;">${farmDetails ? farmDetails.farm_address || "N/A" : "N/A"}</span><br>
                    </div>
                    </div>
                                    
                <div style="padding-bottom: 30px; top-padding 0px"><div>

                <!--Farm ID: ${farmDetails ? farmDetails.farm_id : "N/A"}<br>-->`;if(farmDetails){console.log(`Processing farm: ${location.farmname}`);const matchingCultivates=farmDetails.cultivates;if(matchingCultivates.length>0){popupContent+=`
                        <br><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b data-translate="Farm Area">${getTranslatedText("Farm Area")}</b>: ${farmDetails.farm_area} ha.`;const cultivateDetailsPromises=matchingCultivates.map(async(cultivate)=>{const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:"POST",headers:{accept:"application/json","Content-Type":"application/json",},body:JSON.stringify({cultivate_id:cultivate.cultivate_id,}),}).then((response)=>response.json()).then((data)=>data.content).catch((error)=>{console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`,error);return null;});if(cultivateDetails){console.log("Cultivate details:",cultivateDetails);console.log("Tree type:",cultivateDetails.tree_type);let cultivateContent=`
                                     <br>
                                    <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> <span data-translate="Tree Type">Loại cây</span>:</b> ${cultivateDetails.tree_type === 0
                                            ? '<img src="./images/icons8-coffee-beans-96.png" alt="Coffee Beans" style="width: 15px;"> <span data-translate="Coffee">Cà phê</span>'
                                            : cultivateDetails.tree_type === 1
                                                ? '<img src="./images/icons8-durian-96.png" alt="Durian" style="width: 15px;"> <span data-translate="Durian">Sầu riêng</span>'
                                                : cultivateDetails.tree_type === 2
                                                    ? '<img src="./images/icons8-pepper-96.png" alt="Pepper" style="width: 15px;"> <span data-translate="Pepper">Tiêu</span>'
                                                    : cultivateDetails.tree_type === 3
                                                        ? '<img src="./images/icons8-tea-leaves-64.png" alt="Tea" style="width: 15px;"> <span data-translate="Tea">Trà</span>'
                                                        : "N/A"
                                        }<br>`;cultivateContent+=`
                                        <div>
                                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> <span data-translate="Current Productivity">Năng suất hiện tại</span>: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                                            
                                            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> <span data-translate="Expected Productivity">Năng suất dự kiến</span>: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                                            Cultivate ID: ${cultivateDetails.cultivate_id}<br>
                                            <br>
                                        </div>
                                        <!--soil data will be placed here -->
                                        <div class="soil-data">
                                        `;const nutritionDataPromises=cultivateDetails.softids.map(async(softid)=>{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`,{method:"POST",headers:{accept:"application/json","Content-Type":"application/json",},body:JSON.stringify({cultivate_id:cultivate.cultivate_id,}),}).then((response)=>response.json()).then((data)=>{const matchingValues=data.content.find((item)=>item.in_depth===softid.in_depth)?.values;if(matchingValues&&matchingValues.created_at.length>0){const latestIndex=matchingValues.created_at.map((date,index)=>({date:new Date(date),index,})).sort((a,b)=>b.date-a.date)[0].index;return{npk:matchingValues.npk?matchingValues.npk[latestIndex]:undefined,ndt:matchingValues.ndt?matchingValues.ndt[latestIndex]:undefined,k2o:matchingValues.k2o?matchingValues.k2o[latestIndex]:undefined,p2o5:matchingValues.p2o5?matchingValues.p2o5[latestIndex]:undefined,moist:matchingValues.moist[latestIndex],pH:matchingValues.pH[latestIndex],t:matchingValues.t[latestIndex],created_at:matchingValues.created_at[latestIndex],};}
return null;}).catch((error)=>{console.error("Error fetching nutrition data:",error);return null;});if(nutritionData){const circleColorTemp=nutritionData.t<20?"#BA0F30":nutritionData.t<=30?"#18A558":"#BA0F30";const circleColorpH=nutritionData.pH<7?"#BA0F30":nutritionData.pH===7?"#18A558":"#BA0F30";const circleColorMoist=nutritionData.moist<=22.5||nutritionData.moist>55?"#BA0F30":nutritionData.moist<=35?"#BA0F30":nutritionData.moist<=55?"#18A558":"#BA0F30";const ndtValue=parseFloat(nutritionData.ndt);const circleColorNDT=ndtValue<0.5?"#BA0F30":ndtValue<=100?"#18A558":"#BA0F30";const p2o5Value=parseFloat(nutritionData.p2o5);const circleColorP2O5=p2o5Value<20?"#BA0F30":p2o5Value<=60?"#18A558":"#BA0F30";const k2oValue=parseFloat(nutritionData.k2o);const circleColorK2O=k2oValue<100?"#BA0F30":k2oValue<=200?"#18A558":"#BA0F30";const roundedValue=(value)=>(value!==null&&value!==undefined?value.toFixed(1):"N/A");let needsAttention=circleColorTemp==="#BA0F30"||circleColorpH==="#BA0F30"||circleColorMoist==="#BA0F30"||circleColorNDT==="#BA0F30"||circleColorP2O5==="#BA0F30"||circleColorK2O==="#BA0F30";cultivateContent+=`
                                                <div style="position: relative; display: flex; align-items: center;">
                                                    <img src="./images/sensor.png" alt="Sensor" style="width: 30px; height: auto; margin-right: 5px;">
                                                    <b><span data-translate="In Depth">Chiều sâu</span>:</b> ${softid.in_depth} (${softid.in_depth_label})
                                                    <span class="showHistoricalSoilData-btn" style="position: absolute; right: 0; font-size: 8px; cursor: pointer; display: inline-block; position: absolute;">
                                                        <span class="material-symbols-outlined" data-cultivate-id="${cultivate.cultivate_id}" data-in-depth="${softid.in_depth}">chevron_forward</span>
                                                        <span class="tooltip-left" data-translate="Show historical soil data">Show historical soil data</span>
                                                    </span>
                                                </div>
                                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 12px;">
                                            `;const gridItemStyle=`style="display: flex; align-items: center; white-space: nowrap;"`;const iconStyle=`style="font-size: 14px; margin-right: 2px;"`;const valueStyle=`style="margin-left: 2px;"`;if(cultivate.tree_type===0){const npkQuotient=nutritionData.npk/300;const circleColorNPK=npkQuotient<0.5?"#BA0F30":npkQuotient<=1?"#18A558":"#BA0F30";needsAttention=needsAttention||circleColorNPK==="#BA0F30";const iconStyle=`style="font-size: 14px; margin-right: 2px; position: relative; top: 0px;"`;cultivateContent+=`
                                                    <div ${gridItemStyle}>
                                                        <i class="fi fi-rr-circle-n" ${iconStyle}></i>
                                                        <b>NDT:</b><span ${valueStyle}>${roundedValue(nutritionData.ndt)} ppm${nutritionData.ndt !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorNDT}; font-size: 8px; ${circleColorNDT === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>humidity_mid</span>
                                                        <b data-translate="Moisture">Độ ẩm</b>:<span ${valueStyle}>${roundedValue(nutritionData.moist)}%${nutritionData.moist !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorMoist}; font-size: 8px; ${circleColorMoist === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <i class="fi fi-rr-circle-p" ${iconStyle}></i>
                                                        <b>P2O5:</b><span ${valueStyle}>${roundedValue(nutritionData.p2o5)} ppm${nutritionData.p2o5 !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorP2O5}; font-size: 8px; ${circleColorP2O5 === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>water_ph</span>
                                                        <b>pH:</b><span ${valueStyle}>${roundedValue(nutritionData.pH)}${nutritionData.pH !== null ? `<i class="fas fa-circle"style="color: ${circleColorpH}; font-size: 8px; ${circleColorpH === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>` : ""
                                                    }</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <i class="fi fi-rr-circle-k" ${iconStyle}></i>
                                                        <b>K2O:</b><span ${valueStyle}>${roundedValue(nutritionData.k2o)} ppm${nutritionData.k2o !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorK2O}; font-size: 8px; ${circleColorK2O === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                    </div>
                                                    <div ${gridItemStyle}>
                                                        <span class="material-symbols-outlined" ${iconStyle}>device_thermostat</span>
                                                        <b data-translate="Temperature">Nhiệt độ</b>:<span ${valueStyle}>${roundedValue(nutritionData.t)}°c${nutritionData.t !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorTemp}; font-size: 8px; ${circleColorTemp === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                    </div>
                                                `;}else if(cultivate.tree_type===1){const ndtValue=parseFloat(nutritionData.ndt);const circleColorNDT=ndtValue<50?"#BA0F30":ndtValue<=100?"#18A558":"#BA0F30";needsAttention=needsAttention||circleColorNDT==="#BA0F30";const p2o5Value=parseFloat(nutritionData.p2o5);const circleColorP2O5=p2o5Value<20?"#BA0F30":p2o5Value<=60?"#18A558":"#BA0F30";needsAttention=needsAttention||circleColorP2O5==="#BA0F30";const k2oValue=parseFloat(nutritionData.k2o);const circleColorK2O=k2oValue<100?"#BA0F30":k2oValue<=200?"#18A558":"#BA0F30";needsAttention=needsAttention||circleColorK2O==="#BA0F30";const iconStyle=`style="font-size: 14px; margin-right: 2px; position: relative; top: 1px;"`;cultivateContent+=`
                                                <div ${gridItemStyle}>
                                                    <i class="fi fi-rr-circle-n" ${iconStyle}></i>
                                                    <b>NDT:</b><span ${valueStyle}>${roundedValue(nutritionData.ndt)} ppm${nutritionData.ndt !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorNDT}; font-size: 8px; ${circleColorNDT === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                </div>
                                                <div ${gridItemStyle}>
                                                    <span class="material-symbols-outlined" ${iconStyle}>humidity_mid</span>
                                                    <b data-translate="Moisture">Độ ẩm</b>:<span ${valueStyle}>${roundedValue(nutritionData.moist)}%${nutritionData.moist !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorMoist}; font-size: 8px; ${circleColorMoist === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                </div>
                                                <div ${gridItemStyle}>
                                                    <i class="fi fi-rr-circle-p" ${iconStyle}></i>
                                                    <b>P2O5:</b><span ${valueStyle}>${roundedValue(nutritionData.p2o5)} ppm${nutritionData.p2o5 !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorP2O5}; font-size: 8px; ${circleColorP2O5 === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                </div>
                                                <div ${gridItemStyle}>
                                                    <span class="material-symbols-outlined" ${iconStyle}>water_ph</span>
                                                    <b>pH:</b><span ${valueStyle}>${roundedValue(nutritionData.pH)}${nutritionData.pH !== null ? `<i class="fas fa-circle"style="color: ${circleColorpH}; font-size: 8px; ${circleColorpH === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>` : ""
                                                    }</span>
                                                </div>
                                                <div ${gridItemStyle}>
                                                    <i class="fi fi-rr-circle-k" ${iconStyle}></i>
                                                    <b>K2O:</b><span ${valueStyle}>${roundedValue(nutritionData.k2o)} ppm${nutritionData.k2o !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorK2O}; font-size: 8px; ${circleColorK2O === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                </div>
                                                <div ${gridItemStyle}>
                                                    <span class="material-symbols-outlined" ${iconStyle}>device_thermostat</span>
                                                    <b data-translate="Temperature">Nhiệt độ</b>:<span ${valueStyle}>${roundedValue(nutritionData.t)}°c${nutritionData.t !== null
                                                        ? `<i class="fas fa-circle"style="color: ${circleColorTemp}; font-size: 8px; ${circleColorTemp === "#BA0F30" ? "animation:glowRed 1s infinite;" : ""}"></i>`
                                                        : ""
                                                    }</span>
                                                </div>
                                            `;}
cultivateContent+=`
                                                </div>
                                                <span style="font-size: 10px; margin-top: 5px; display: block;">
                                                    <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                    <i style="vertical-align: middle;"><span data-translate="Last updated">Cập nhật mới nhất</span>: ${nutritionData.created_at}</i>
                                                </span>
                                                <br>
                                                <style>
                                                    @keyframes glowRed {
                                                        0% { color: #BA0F30; text-shadow: 0 0 5px #e86161, 0 0 10px #e86161, 0 0 15px #e86161; }
                                                        50% { color: #e86161; text-shadow: 0 0 10px #e86161, 0 0 20px #e86161, 0 0 30px #e86161; }
                                                        100% { color: #BA0F30; text-shadow: 0 0 5px #e86161, 0 0 10px #e86161, 0 0 15px #e86161; }
                                                    }
                                                </style>
                                            `;}
return nutritionData;});await Promise.all(nutritionDataPromises);cultivateContent+=`</div></div>`;return cultivateContent;}else{return`<br><i>Error fetching cultivate details</i>`;}});Promise.all(cultivateDetailsPromises).then((cultivateContents)=>{let currentCultivateIndex=0;let soilDataExpandedStates=new Array(cultivateContents.length).fill(false);let globalSoilDataExpanded=false;function createPopupContent(index,cultivateContents,farmDetails,location,farmThumbnail){const currentUserId=getCurrentUserId();let content=`
                                            <div style="position: relative; padding: 0; margin: 0;">
                                                <div style="overflow: hidden; width: 330px; height: 150px; position: relative; margin-left: -7.5%; margin-top: -15px; border-top-left-radius: 6px; border-top-right-radius: 6px;" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.1)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
                                                    <img src="${farmThumbnail}" alt="Farm Image" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; transition: transform 0.3s ease;" class="parallax-img" />
                                                    <div style="position: absolute; bottom: 10px; right: 20px; display: flex; gap: 10px;">
                                                        <span class="popup-icon view-in-3D" style="color: white; font-size: 18px; cursor: pointer; transition: all 0.3s ease;" onclick="logLatLong(${location.lat}, ${location.long})" data-tooltip="${getTranslatedText("Visualize farm in 3D")}">
                                                            <span class="material-symbols-outlined">3d_rotation</span>
                                                        </span>
                                                        <span class="popup-icon zoom-in-farm" style="color: white; font-size: 18px; cursor: pointer; transition: all 0.3s ease;" onclick="zoomToMarker(${location.lat}, ${location.long})" data-tooltip="${getTranslatedText("Zoom in to Farm")}">
                                                            <span class="material-symbols-outlined">zoom_in</span>
                                                        </span>
                                                        <i class="popup-icon fi fi-bs-microchip microchip-icon" style="color: white; font-size: 18px; cursor: pointer; transition: all 0.3s ease;" data-user-id="${currentUserId}" data-farm-id="${farmDetails.farm_id}" data-tooltip="${getTranslatedText("Show enfarm devices")}"></i>
                                                    </div>
                                                </div>
                                                <div style="position: absolute; top: 30px; left: 0px; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                                                    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px; color: white;">psychiatry</span>
                                                    <b style="font-size: 18px; color: white;">${location.farmname}</b><br>
                                                    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px; color: white;">location_on</span>
                                                    <span style="font-size: 12px; color: white;">${farmDetails ? farmDetails.farm_address || "N/A" : "N/A"}</span><br>
                                                </div>
                                            </div>
                                            <div style="padding-bottom: 30px; padding-top: 10px;">
                                                <br><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b data-translate="Farm Area">${getTranslatedText("Farm Area")}</b>: ${farmDetails.farm_area} ha.
                                            `;let cultivateContent=cultivateContents[index];if(globalSoilDataExpanded&&soilDataExpandedStates[index]!==false){cultivateContent=cultivateContent.replace('class="soil-data" style="display:none;"','class="soil-data" style="display:block;"');cultivateContent=cultivateContent.replace(`data-translate="View soil data">${getTranslatedText("View soil data")}`,`data-translate="Hide soil data">${getTranslatedText("Hide soil data")}`);}
content+=cultivateContent;if(cultivateContents.length>1){content+=`
                                                <div id="cultivate-info" style="display: flex; align-items: center; margin-top: 10px;">
                                                    <div id="chevron-icons" style="display: flex; align-items: center; gap: 5px;">
                                                        <span class="material-symbols-outlined prev-cultivate" style="cursor: pointer; transform: rotate(180deg); font-size: 20px; color: #808080;">
                                                            expand_circle_right
                                                        </span>
                                                        <span class="material-symbols-outlined next-cultivate" style="cursor: pointer; font-size: 20px; color: #808080;">
                                                            expand_circle_right
                                                        </span>
                                                    </div>
                                                    <span id="cultivate-count" style="display: flex; align-items: center; margin-left: 10px; font-size: 12px; color: #808080;">
                                                        <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 4px;">
                                                            psychiatry
                                                        </span>
                                                        ${index + 1} out of ${cultivateContents.length} cultivates
                                                    </span>
                                                </div>
                                            `;}
return content;}
popupContent=createPopupContent(0,cultivateContents,farmDetails,location,farmThumbnail);marker.bindPopup(popupContent,{autoPan:false,closeOnClick:false,autoClose:false});marker.options.treeTypes=getTreeTypesFromPopup(popupContent);marker.on("popupopen",function(){const popup=this.getPopup();const container=popup.getElement();function updatePopupContent(){console.log('Updating popup content. Current index:',currentCultivateIndex);const newContent=createPopupContent(currentCultivateIndex,cultivateContents,farmDetails,location,farmThumbnail);popup.setContent(updatePopupTranslations(newContent));popup.update();attachEventListeners();}
function attachEventListeners(){attachHistoricalSoilDataListeners();attachCultivateNavigationListeners();attachMicrochipClickListener();}
function attachMicrochipClickListener(){const microchipIcon=container.querySelector('.microchip-icon');if(microchipIcon){microchipIcon.addEventListener('click',handleMicrochipClick);}}
function attachCultivateNavigationListeners(){if(cultivateContents.length>1){const prevButton=container.querySelector('.prev-cultivate');const nextButton=container.querySelector('.next-cultivate');if(prevButton&&nextButton){prevButton.addEventListener('click',handlePrevClick);nextButton.addEventListener('click',handleNextClick);}}}
function handlePrevClick(e){e.stopPropagation();currentCultivateIndex=(currentCultivateIndex-1+cultivateContents.length)%cultivateContents.length;updatePopupContent();}
function handleNextClick(e){e.stopPropagation();currentCultivateIndex=(currentCultivateIndex+1)%cultivateContents.length;updatePopupContent();}
function attachHistoricalSoilDataListeners(){const showHistoricalSoilDataBtns=container.querySelectorAll(".showHistoricalSoilData-btn");showHistoricalSoilDataBtns.forEach((btn)=>{btn.addEventListener("click",function(){const popupContent=this.closest(".leaflet-popup-content");const cultivateIdMatch=popupContent.innerHTML.match(/Cultivate ID: (\d+)/);const inDepth=this.querySelector(".material-symbols-outlined").getAttribute("data-in-depth");const treeTypeMatch=popupContent.innerHTML.match(/<span data-translate="(Coffee|Durian|Pepper|Tea)">/);const treeType=treeTypeMatch?treeTypeMatch[1]:"Unknown";const farmNameMatch=popupContent.innerHTML.match(/<b style="font-size: 18px; color: white;">(.*?)<\/b>/);const farmName=farmNameMatch?farmNameMatch[1]:"Unknown Farm";const addressMatch=popupContent.innerHTML.match(/<span style="font-size: 12px; color: white;">(.*?)<\/span>/);const farmAddress=addressMatch?addressMatch[1]:"Unknown Address";let cultivateId;if(cultivateIdMatch){cultivateId=cultivateIdMatch[1];console.log('cultivate_id:',cultivateId);}else{console.log('Cultivate ID not found in the popup content.');}
console.log('in_depth:',inDepth);console.log('tree type:',treeType);console.log('farm name:',farmName);console.log('farm address:',farmAddress);const event=new CustomEvent('soilDataRequested',{detail:{cultivateId:cultivateId,inDepth:inDepth,treeType:treeType,lat:location.lat,lng:location.long,farmName:farmName,farmAddress:farmAddress}});window.dispatchEvent(event);const popupHistoricalSoilData=document.querySelector(".popup-historicalsoildata");popupHistoricalSoilData.style.display="block";});});}
attachEventListeners();updatePopupContent();});function updatePopupTranslations(content){const tempDiv=document.createElement("div");tempDiv.innerHTML=content;const elementsToTranslate=tempDiv.querySelectorAll("[data-translate]");elementsToTranslate.forEach((element)=>{const key=element.getAttribute("data-translate");element.textContent=getTranslatedText(key);});return tempDiv.innerHTML;}}).catch((error)=>{console.error("Error fetching cultivate details:",error);}).finally(()=>{updateNotificationCircle();});}else{popupContent+=`<div class="popup-content no-cultivate-details"><i data-translate="No matching cultivate details found">${getTranslatedText("No matching cultivate details found")}</i></div><br>`;popupContent+="</p>";marker.bindPopup(popupContent,{autoPan:false,autoClose:false,});marker.options.treeTypes=getTreeTypesFromPopup(popupContent);marker.on("popupopen",function(){const popup=this.getPopup();const content=popup.getContent();const updatedContent=updatePopupContent(content);popup.setContent(updatedContent);popup.update();});}}else{popupContent+=`<div class="popup-content no-farm-details"><i data-translate="Farm details not found">${getTranslatedText("Farm details not found")}</i></div><br>`;popupContent+="</p>";marker.bindPopup(popupContent,{autoPan:false,autoClose:false,});marker.on("popupopen",function(){const popup=this.getPopup();const content=popup.getContent();const updatedContent=updatePopupContent(content);popup.setContent(updatedContent);popup.update();});}
markers.addLayer(marker);});originalMarkers=markers;currentFilteredMarkers=markers;map.addLayer(markers);function createIcon(iconUrl,iconSize,popupOffset){return L.icon({iconUrl:iconUrl,iconSize:iconSize,iconAnchor:[iconSize[0]/2,iconSize[1]],popupAnchor:popupOffset,});}
const originalIcon=createIcon("https://i.ibb.co/bWhk7NN/gps-shadow.png",[32,32],[0,-32]);const durianIcon=createIcon("./images/durian-removebg-preview.png",[40,40],[-3,-28]);const coffeeIcon=createIcon("./images/bean-shadow.png",[40,40],[-30,-40]);const pepperIcon=createIcon("./images/icons8-pepper-96.png",[40,40],[-3,-30]);const teaIcon=createIcon("./images/icons8-tea-leaves-64.png",[40,40],[-3,-30]);const warningIcon=createIcon("images/icons8-warning.gif",[30,30],[0,-40]);function applyFilters(){console.log("Applying filters:",activeFilters);map.eachLayer(function(layer){if(layer instanceof L.MarkerClusterGroup){map.removeLayer(layer);}});let filteredMarkers=L.markerClusterGroup();const anyFilterActive=Object.values(activeFilters).some((filter)=>filter);originalMarkers.eachLayer(function(marker){let shouldInclude=true;const popupContent=marker.getPopup().getContent();const treeTypes=marker.options.treeTypes;if(anyFilterActive){if(activeFilters.needsAttention&&!popupContent.includes("animation: glowRed")){shouldInclude=false;}
if(activeFilters.coffee||activeFilters.durian||activeFilters.tea||activeFilters.pepper){shouldInclude=treeTypes.some((type)=>(activeFilters.coffee&&type==="Coffee")||(activeFilters.durian&&type==="Durian")||(activeFilters.tea&&type==="Tea")||(activeFilters.pepper&&type==="Pepper"));}}
if(shouldInclude){let iconUrl="images/gps-shadow.png";if(activeFilters.needsAttention&&popupContent.includes("animation: glowRed")){iconUrl="images/icons8-warning.gif";}else if(activeFilters.coffee&&treeTypes.includes("Coffee")){iconUrl="https://i.ibb.co/L6cGsSX/bean-shadow.png";}else if(activeFilters.durian&&treeTypes.includes("Durian")){iconUrl="https://i.ibb.co/nnrMSMd/durian-removebg-preview.png";}else if(activeFilters.tea&&treeTypes.includes("Tea")){iconUrl="https://i.ibb.co/RCnz5gb/icons8-tea-leaves-64.png";}else if(activeFilters.pepper&&treeTypes.includes("Pepper")){iconUrl="https://i.ibb.co/WxVZrLN/icons8-pepper-96.png";}
marker.setIcon(createCustomMarker(marker.options.farmName,iconUrl));filteredMarkers.addLayer(marker);}});map.addLayer(filteredMarkers);currentFilteredMarkers=filteredMarkers;}
function toggleFarms(button,farmType,farmIcon,activeClass){button.addEventListener("click",function(){activeFilters[farmType.toLowerCase()]=!activeFilters[farmType.toLowerCase()];button.classList.toggle(activeClass);console.log(`Toggled ${farmType} filter:`,activeFilters[farmType.toLowerCase()]);applyFilters();});}
function createCustomMarker(farmName,iconUrl,position="top"){const labelPositions={top:"top: -10px; left: 30px;",right:"top: 0; left: 40px;",bottom:"top: 30px; left: 30px;",left:"top: 0; left: -100px;",};return L.divIcon({className:"custom-marker",html:`
                            <div class="marker2D-label" style="background-color: rgba(0, 0, 0, 0); color: rgb(58, 58, 58); font-size: 12px; font-weight: normal; padding: 3px 6px; border-radius: 10px; margin-right: 8px; white-space: nowrap; font-family: 'Be Vietnam', sans-serif; position: absolute; ${labelPositions[position]} background-color: #ffffff00; border: none; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; display: flex; align-items: center;">
                                <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">psychiatry</span>
                                ${farmName}
                            </div>
                            <img src="${iconUrl}" class="marker-icon"/>
                        `,});}
const durianButton=document.querySelector(".durianTrees-filter");const coffeeButton=document.querySelector(".coffeeTrees-filter");const pepperButton=document.querySelector(".pepperFarms-filter");const teaButton=document.querySelector(".teaFarms-filter");toggleFarms(durianButton,"Durian","./images/durian-removebg-preview.png","active-durian");toggleFarms(coffeeButton,"Coffee","./images/bean-shadow.png","active-coffee");toggleFarms(pepperButton,"Pepper","./images/icons8-pepper-96.png","active-pepper");toggleFarms(teaButton,"Tea","./images/icons8-tea-leaves-64.png","active-tea");const needsAttentionButton=document.querySelector(".needs-attention");needsAttentionButton.addEventListener("click",function(){activeFilters.needsAttention=!activeFilters.needsAttention;this.classList.toggle("active-needs-attention");updateNeedsAttentionButtonAppearance();applyFilters();});function updateNeedsAttentionButtonAppearance(){if(activeFilters.needsAttention){needsAttentionButton.innerHTML='<div style="display: inline-block; position: relative;">'+
'<i class="material-symbols-outlined" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); font-size: 18px; color: white;">psychiatry</i>'+
`<span style="padding-left: 20px;" data-translate="Show all">${translations[currentLang]["Show all"]}</span>`+
"</div>";needsAttentionButton.style.padding="7px 10px";}else{needsAttentionButton.innerHTML=`
                            <div id="lottie-container" style="width: 24px; height: 24px;"></div>
                            <span class="attention-text" data-translate="Alert">${translations[currentLang]["Alert"]}</span>
                            <span class="tooltip-bottom" data-translate="Show farms needing attention">${translations[currentLang]["Show farms needing attention"]}</span>
                            <span class="notification-circle"></span>
                        `;lottie.loadAnimation({container:document.getElementById("lottie-container"),renderer:"svg",loop:true,autoplay:true,path:"https://lottie.host/41453d5b-98f5-4478-ae32-24ffb6f5ff63/wN5fPgSl5x.json",});updateNotificationCircle();}}}).catch((error)=>console.error("Error fetching data:",error));}catch(error){console.error("Error fetching farm details:",error);}};function showIcon(element){var icon=element.querySelector("#icon");if(icon){icon.style.display="inline-flex";}}
function hideIcon(element){var icon=element.querySelector("#icon");if(icon){icon.style.display="none";}}
function logLatLong(lat,long){console.log("Longitude:",long);console.log("Latitude:",lat);localStorage.setItem("mapboxLat",lat);localStorage.setItem("mapboxLong",long);window.open("mapbox3D.html","_blank");}
function updateOpenPopup(){map.eachLayer(function(layer){if(layer instanceof L.Marker&&layer.isPopupOpen()){const popup=layer.getPopup();const content=popup.getContent();const tempDiv=document.createElement("div");tempDiv.innerHTML=content;const elementsToTranslate=tempDiv.querySelectorAll("[data-translate]");elementsToTranslate.forEach((element)=>{const key=element.getAttribute("data-translate");element.textContent=getTranslatedText(key);});const historicalSoilDataBtns=tempDiv.querySelectorAll(".showHistoricalSoilData-btn");historicalSoilDataBtns.forEach((btn)=>{const regionId=btn.querySelector(".material-symbols-outlined").getAttribute("data-region-id");const inDepth=btn.querySelector(".material-symbols-outlined").getAttribute("data-in-depth");btn.querySelector(".material-symbols-outlined").setAttribute("data-region-id",regionId);btn.querySelector(".material-symbols-outlined").setAttribute("data-in-depth",inDepth);});const updatedContent=tempDiv.innerHTML;popup.setContent(updatedContent);popup.update();const popupContainer=popup.getElement();if(popupContainer){const showHistoricalSoilDataBtns=popupContainer.querySelectorAll(".showHistoricalSoilData-btn");showHistoricalSoilDataBtns.forEach((btn)=>{});}}});}
function handleHistoricalSoilDataClick(event){const btn=event.currentTarget;const iconElement=btn.querySelector(".material-symbols-outlined");const cultivateId=iconElement.getAttribute("data-cultivate-id");const inDepth=iconElement.getAttribute("data-in-depth");console.log("cultivate_id:",cultivateId);console.log("in_depth:",inDepth);const soilDataEvent=new CustomEvent("soilDataRequested",{detail:{cultivateId:cultivateId,inDepth:inDepth,},});window.dispatchEvent(soilDataEvent);const popupHistoricalSoilData=document.querySelector(".popup-historicalsoildata");if(popupHistoricalSoilData){popupHistoricalSoilData.style.display="block";}}
function zoomToMarker(lat,lng){map.flyTo([lat,lng],18,{animate:true,duration:1.5,});}
document.addEventListener("DOMContentLoaded",function(){const recenterBtn=document.getElementById("recenterBtn");recenterBtn.addEventListener("click",function(){const popupHistoricalSoilData=document.querySelector(".popup-historicalsoildata");const lat=parseFloat(popupHistoricalSoilData.dataset.lat);const lng=parseFloat(popupHistoricalSoilData.dataset.lng);if(!isNaN(lat)&&!isNaN(lng)){zoomToMarker(lat,lng);}});});function getTreeTypesFromPopup(popupContent){const treeTypes=[];if(popupContent.includes("Tree Type:</b> Coffee")||popupContent.includes('data-translate="Coffee"'))treeTypes.push("Coffee");if(popupContent.includes("Tree Type:</b> Durian")||popupContent.includes('data-translate="Durian"'))treeTypes.push("Durian");if(popupContent.includes("Tree Type:</b> Tea")||popupContent.includes('data-translate="Tea"'))treeTypes.push("Tea");if(popupContent.includes("Tree Type:</b> Pepper")||popupContent.includes('data-translate="Pepper"'))treeTypes.push("Pepper");return treeTypes;}
function getCurrentUserId(){const userInfo=getAuthenticatedUserInfo();if(ADMIN_PHONES.includes(userInfo.userPhone)){return'admin';}else{return userInfo.userID;}}
function handleMicrochipClick(event){const userId=event.target.getAttribute('data-user-id');const farmId=event.target.getAttribute('data-farm-id');if(userId==='admin'){console.log(`Admin user, Farm ID: ${farmId}`);}else{console.log(`User ID: ${userId}, Farm ID: ${farmId}`);}}
const style=document.createElement('style');style.textContent=`
    .popup-icon {
        display: inline-block;
        transition: all 0.3s ease;
        position: relative;
    }
    .popup-icon:hover {
        transform: scale(1.2);
        color: #4CAF50 !important; /* Green color on hover */
    }
    .popup-icon::after {
        content: attr(data-tooltip);
        position: absolute;
        bottom: 100%;
        right: calc(100% + -20px);
        transform: scale(0.8);
        background-color: white;
        color: gray;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 10px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* Adding a subtle shadow */
    }
    .popup-icon:hover::after {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
    }
`;document.head.appendChild(style);fetchFarmData(authenticatedUserIDs);