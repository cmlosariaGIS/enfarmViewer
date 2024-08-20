function toggleUserDevices(){const panel=document.querySelector('.usersdevices-list');if(panel){panel.classList.toggle('show');}}
function initializeUserDevicesPanel(){const panel=document.querySelector('.usersdevices-list');if(panel){const closeButton=document.createElement('button');closeButton.innerHTML='&times;';closeButton.className='close-userdevices-list-btn';closeButton.onclick=toggleUserDevices;panel.insertBefore(closeButton,panel.firstChild);}}
document.addEventListener('DOMContentLoaded',initializeUserDevicesPanel);const farmApiUrl='https://api-router.enfarm.com/api/v3/farm/total-farms-per-user';const sensorApiUrl='https://api-router.enfarm.com/api/v1/devices/get-sensor-per-farm';const boxApiUrl='https://api-router.enfarm.com/api/v1/devices/get-box-per-farm';const regionApiUrl='https://api-router.enfarm.com/api/v1/farm/get-region-per-farm';const farmDetailApiUrl='https://api-router.enfarm.com/api/v1/farm/get-farm-detail';const userProfileApiUrl='https://api-router.enfarm.com/api/v2/user/get-user-profile';const userThumbnailApiUrl='https://api-router.enfarm.com/api/v2/user/get-user-thumbnail';const farmThumbnailApiUrl='https://api-router.enfarm.com/api/v3/farm/retrieve-farm-detail';const userSelect=document.getElementById('userSelect');const selectedUser=document.getElementById('selectedUser');const userDropdown=document.getElementById('userDropdown');async function populateUserDropdown(){const userDropdown=document.getElementById('userDropdown');const userSelect=document.getElementById('userSelect');userDropdown.innerHTML='';userSelect.innerHTML='<option value="">Select a user</option>';for(const userId of authenticatedUserIDs){try{const userProfile=await getUserProfile(userId);let displayText='';if(userProfile&&userProfile.user_name){displayText=`${userProfile.user_name} (User ID: ${userId})`;}else{displayText=`User ID: ${userId}`;}
const option=document.createElement('option');option.value=userId;option.textContent=displayText;userSelect.appendChild(option);const a=document.createElement('a');a.href='#';a.textContent=displayText;a.setAttribute('data-value',userId);userDropdown.appendChild(a);}catch(error){console.error(`Error fetching user profile for ID ${userId}:`,error);const displayText=`User ID: ${userId}`;const option=document.createElement('option');option.value=userId;option.textContent=displayText;userSelect.appendChild(option);const a=document.createElement('a');a.href='#';a.textContent=displayText;a.setAttribute('data-value',userId);userDropdown.appendChild(a);}}}
userDropdown.addEventListener('click',(e)=>{if(e.target.tagName==='A'){e.preventDefault();const selectedId=e.target.getAttribute('data-value');document.getElementById('selectedUser').textContent=e.target.textContent;userSelect.value=selectedId;userSelect.dispatchEvent(new Event('change'));}});userSelect.addEventListener('change',(event)=>{const selectedUserId=event.target.value;if(selectedUserId){getFarmData(selectedUserId);}else{document.getElementById('userId').textContent='';document.getElementById('farmInfo').innerHTML='';}});async function getUserProfile(userId){try{const response=await axios.post(userProfileApiUrl,{user_id:parseInt(userId)});return response.data.content;}catch(error){console.error('Error fetching user profile:',error);return null;}}
async function getUserThumbnail(userId){try{const response=await axios.post(userThumbnailApiUrl,{user_id:parseInt(userId)});return response.data.content;}catch(error){console.error('Error fetching user thumbnail:',error);return null;}}
function getTreeTypeName(treeType){const treeTypeInt=parseInt(treeType);let key;switch(treeTypeInt){case 0:key="Coffee";break;case 1:key="Durian";break;case 2:key="Pepper";break;case 3:key="Tea";break;default:key="Unknown";break;}
return`<span class="tree-type" data-tree-type="${treeTypeInt}" data-translate="${key}"></span>`;}
function generateTotalCounters(totalFarms,totalSensors,totalBoxes){return`
<div class="device-counters total-counters">
    <div class="counter">
        <img src="images/leaf.png" alt="Farm icon">
        <div class="counter-content">
            <h2>${totalFarms}</h2>
            <p data-translate="Total Farm">Total Farm${totalFarms !== 1 ? 's' : ''}</p>
        </div>
    </div>
    <div class="counter">
        <img src="images/sensor.png" alt="Sensor icon">
        <div class="counter-content">
            <h2>${totalSensors}</h2>
            <p data-translate="Total Sensor">Total Sensor${totalSensors !== 1 ? 's' : ''}</p>
        </div>
    </div>
    <div class="counter">
        <img src="images/box.png" alt="Box icon">
        <div class="counter-content">
            <h2>${totalBoxes}</h2>
            <p data-translate="Total Box">Total Box${totalBoxes !== 1 ? 'es' : ''}</p>
        </div>
    </div>
</div>
`;}
function generateCounters(sensorCount,boxCount){return`
<div class="device-counters">
    <div class="counter">
        <img src="images/sensor.png" alt="Sensor icon">
        <div class="counter-content">
            <h2>${sensorCount}</h2>
            <p data-translate="Sensors Installed">Sensor${sensorCount !== 1 ? 's' : ''} Installed</p>
        </div>
    </div>
    <div class="counter">
        <img src="images/box.png" alt="Box icon">
        <div class="counter-content">
            <h2>${boxCount}</h2>
            <p data-translate="Boxes Installed">Box${boxCount !== 1 ? 'es' : ''} Installed</p>
        </div>
    </div>
</div>
`;}
function getSensorThumbnail(sensorType){const lowerType=sensorType.toLowerCase();if(lowerType.includes('3')||lowerType.includes('npk')){return'https://dashboard.enfarm.com/static/media/sensor_3.bd41c965af3eb6bcdab4.png';}else if(lowerType.includes('7')||lowerType.includes('npkphcth-s')){return'https://dashboard.enfarm.com/static/media/sensor_7.e027c4034838eabc6495.png';}else{return'';}}
async function getFarmDetail(farmId){try{const response=await axios.post(farmThumbnailApiUrl,{farm_id:parseInt(farmId)});return response.data.content.data;}catch(error){console.error('Error fetching farm detail:',error);return null;}}
async function getRegionData(farmId){try{const response=await axios.post(regionApiUrl,{farm_id:parseInt(farmId)});return response.data.content;}catch(error){console.error('Error fetching region data:',error);return[];}}
async function fetchFarmLocations(){try{const response=await axios.get('https://api-ma.enfarm.com/api/v1/ma/get-install-locations');return response.data.content.map(location=>({...location,lat:location.lat,long:location.long}));}catch(error){console.error('Error fetching farm locations:',error);return[];}}
async function getFarmData(userId){try{document.getElementById('userId').textContent=userId;document.getElementById('farmInfo').innerHTML=getTranslatedText('Fetching farm data...');const[userProfile,userThumbnail,farmResponse,farmDetailResponse,farmLocations]=await Promise.all([getUserProfile(userId),getUserThumbnail(userId),axios.post(farmApiUrl,{user_id:parseInt(userId)}),axios.post(farmDetailApiUrl,{user_id:userId}),fetchFarmLocations()]);const farmData=farmResponse.data;const farmDetailData=farmDetailResponse.data.content;if(farmData.status_code===200){let html='';if(userProfile){const thumbnailSrc=userThumbnail?`data:image/jpeg;base64,${userThumbnail}`:'images/temp_mascot.jpg';html+=`
                    <br>
                    <div class="user-profile">
                        <div class="user-profile-content">
                            <div class="user-details">
                                <h2 data-translate="User Profile">User Profile</h2>
                                <p><strong data-translate="Name:">Name:</strong> ${userProfile.user_name}</p>
                                <p><strong data-translate="Phone:">Phone:</strong> ${userProfile.user_phone}</p>
                                <p><strong data-translate="Email:">Email:</strong> ${userProfile.user_mail}</p>
                                <p><strong data-translate="Date of Birth:">Date of Birth:</strong> ${userProfile.user_dob}</p>
                                <p><strong data-translate="Gender:">Gender:</strong> ${userProfile.user_gender === 1 ? '<span data-translate="Male">Male</span>' : '<span data-translate="Female">Female</span>'}</p>
                            </div>
                            <img src="${thumbnailSrc}" alt="User Thumbnail" class="user-thumbnail">
                        </div>
                        <img src="images/user-profile-footer-banner.png" alt="Profile Footer Banner" class="user-profile-footer">
                    </div>
                `;}
let totalFarms=0;let totalSensors=0;let totalBoxes=0;const farms=farmData.content.data;totalFarms=farms.length;for(const farm of farms){const sensorData=await getSensorData(farm.farm_id);const boxData=await getBoxData(farm.farm_id);totalSensors+=sensorData.is_have_sensor?sensorData.sensors.length:0;totalBoxes+=boxData.is_have_box?boxData.boxes.length:0;}
console.log(`Total Farms: ${totalFarms}, Total Sensors: ${totalSensors}, Total Boxes: ${totalBoxes}`);html+=generateTotalCounters(totalFarms,totalSensors,totalBoxes);for(const farm of farms){const farmDetail=farmDetailData[farm.farm_id]||{};const sensorData=await getSensorData(farm.farm_id);const boxData=await getBoxData(farm.farm_id);const farmDetailInfo=await getFarmDetail(farm.farm_id);const regionData=await getRegionData(farm.farm_id);const cultivateData=farm.cultivates||[];const farmThumbnail=farmDetailInfo&&farmDetailInfo.farm_thumbnail?farmDetailInfo.farm_thumbnail:'images/noimage.jfif';const regionMap=new Map();regionData.forEach(region=>{regionMap.set(region.region_name,{...region,cultivates:[]});});cultivateData.forEach(cultivate=>{const region=regionMap.get(cultivate.name);if(region){region.cultivates.push(cultivate);}else{regionMap.set(cultivate.name,{region_id:'-',region_name:cultivate.name,method:'-',last_active:'-',cultivates:[cultivate]});}});html+=`
<div class="farm-card">
    <div class="farm-header">
        <div class="left-content">
            <img src="images/leaf.png" alt="Leaf Icon" class="leaf-icon">
            <span>${farm.farm_name}</span>
        </div>
        <i class="fas fa-chevron-down chevron"></i>
    </div>
    <div class="farm-body">
        <div class="userfarm-info">
            <div class="userfarm-details">
                <h3 data-translate="Farm Information">Farm Information</h3>
                <p><strong data-translate="Farm ID:">Farm ID:</strong> ${farm.farm_id}</p>
                <p><strong data-translate="Address:">Address:</strong> ${farm.farm_address}</p>
                <p><strong data-translate="Area:">Area:</strong> ${farm.farm_area} hectares</p>
                <p><strong data-translate="Tree Types:">Tree Types:</strong> 
                        ${farm.tree_types.map(treeType => getTreeTypeName(treeType)).join(', ')}
                </p>
                ${farmDetail.productivity ? `<p><strong data-translate="Productivity">Productivity:</strong>${farmDetail.productivity}Tonnes</p>` : ''}
                ${farmDetail.fertilization_date ? `<p><strong data-translate="Fertilization Date:">Fertilization Date:</strong>${farmDetail.fertilization_date}</p>` : ''}
                ${farmDetail.farm_last_action_day ? `<p><strong data-translate="Last Action Day:">Last Action Day:</strong>${farmDetail.farm_last_action_day}</p>` : ''}
            </div>
            <div class="farm-image-map">
                <div class="farm-image-container">
                    <img src="${farmThumbnail}" alt="Farm Image" class="farm-image">
                </div>
                <button class="map-button" data-farm-name="${farm.farm_name}">
                    <i class="fi fi-tr-region-pin-alt"></i> <span data-translate="View on Map">View on Map</span>
                </button>
            </div>
        </div>

        <div class="combined-info">
            <h3 data-translate="Region and Cultivate Information">Region and Cultivate Information</h3>
            ${regionMap.size > 0 ? `<table><thead><tr><th data-translate="Region ID">Region ID</th><th data-translate="Cultivate ID">Cultivate ID</th><th data-translate="Region Name">Region Name</th><th data-translate="Tree Type">Tree Type</th><th data-translate="Last Update">Last Update</th></tr></thead><tbody>${Array.from(regionMap.values()).map(region=>`
                            <tr>
                                <td>${region.region_id}</td>
                                <td>${region.cultivates.map(c => c.cultivate_id).join(', ') || '-'}</td>
                                <td>${region.region_name}</td>
                                <td>${region.cultivates.map(c => getTreeTypeName(c.tree_type)).join(', ') || '-'}</td>
                                <td>${region.last_active}</td>
                            </tr>
                        `).join('')}</tbody></table>` : '<p class="centered-message" data-translate="No region or cultivate information available">No region or cultivate information available for this farm.</p>'}
        </div>
        ${generateCounters(sensorData.is_have_sensor ? sensorData.sensors.length : 0, boxData.is_have_box ? boxData.boxes.length : 0)}
        <div class="sensor-info">
            <h3 data-translate="Sensor Information">Sensor Information</h3>
            ${sensorData.is_have_sensor ? `<div class="sensor-cards">${sensorData.sensors.map(sensor=>`
                        <div class="sensor-card">
                            ${getSensorThumbnail(sensor.sensor_type_str) ? `<img src="${getSensorThumbnail(sensor.sensor_type_str)}"alt="${sensor.sensor_type_str}">` : ''}
                            <p class="sensor-id"><span data-translate="Sensor ID">Sensor ID</span>: ${sensor.sensor_id}</p>
                            <p class="sensor-type">${sensor.sensor_type_str}</p>
                            <p class="sensor-qr"><span data-translate="QR">QR</span>: ${sensor.sensor_qr_str}</p>
                        </div>
                    `).join('')}</div>` : '<p class="centered-message" data-translate="No sensor information available">No sensor(s) information available for this farm.</p>'}
        </div>
        <br>
        <div class="box-info">
            <h3 data-translate="Box Information">Box Information</h3>
            ${boxData.is_have_box ? `<div class="box-cards">${boxData.boxes.map(box=>{const boxTypeText=box.box_type===1?'Phát đáp Lora':'Phát đáp BLE';const boxImageUrl=box.box_type===1?'https://dashboard.enfarm.com/static/media/box_lora.5ae54139dc9704817c04.png':'https://dashboard.enfarm.com/static/media/ble.2dad651cc9747fa2ef39.png';return`
                            <div class="box-card">
                                <img src="${boxImageUrl}" alt="${boxTypeText}">
                                <p class="box-id"><span data-translate="Box ID">Box ID</span>: ${box.box_id}</p>
                                <p class="box-type">${boxTypeText}</p>
                                <p class="box-bl"><span data-translate="BL Address">BL Address</span>: ${box.bl_address}</p>
                                <p class="box-qr"><span data-translate="QR">QR</span>: ${box.box_qr_string}</p>
                            </div>
                        `;}).join('')}</div>` : '<p class="centered-message" data-translate="No box information available">No box(es) information available for this farm.</p>'}
        </div>
    </div>
</div>
`;}
document.getElementById('farmInfo').innerHTML=html;translateAllElements();document.querySelectorAll('.map-button').forEach(button=>{button.addEventListener('click',(event)=>{const farmName=event.target.closest('.map-button').dataset.farmName;const farmLocation=farmLocations.find(location=>location.farmname===farmName);if(farmLocation){zoomToMarker(farmLocation.lat,farmLocation.long);}else{console.error('Farm location not found:',farmName);}});});document.querySelectorAll('.farm-header').forEach(header=>{header.addEventListener('click',()=>{header.parentElement.classList.toggle('active');});});}else{document.getElementById('farmInfo').innerHTML=`<p>${getTranslatedText('Error fetching farm data')}</p>`;}}catch(error){console.error('Error:',error);document.getElementById('farmInfo').innerHTML=`<p>${getTranslatedText('Error fetching data')}</p>`;}}
async function getSensorData(farmId){try{const sensorResponse=await axios.post(sensorApiUrl,{farm_id:parseInt(farmId)});return sensorResponse.data.content;}catch(error){console.error('Error fetching sensor data:',error);return{is_have_sensor:false,sensors:[]};}}
async function getBoxData(farmId){try{const boxResponse=await axios.post(boxApiUrl,{farm_id:parseInt(farmId)});return boxResponse.data.content;}catch(error){console.error('Error fetching box data:',error);return{is_have_box:false,boxes:[]};}}
async function getRegionData(farmId){try{const regionResponse=await axios.post(regionApiUrl,{farm_id:parseInt(farmId)});return regionResponse.data.content;}catch(error){console.error('Error fetching region data:',error);return[];}}
document.addEventListener('DOMContentLoaded',()=>{populateUserDropdown();document.getElementById('userSelect').addEventListener('change',(event)=>{const selectedUserId=event.target.value;if(selectedUserId){getFarmData(selectedUserId);}else{document.getElementById('userId').textContent='';document.getElementById('farmInfo').innerHTML='';}});});function zoomToMarker(lat,lng){if(map&&lat&&lng){map.flyTo([lat,lng],18,{animate:true,duration:1.5});}else{console.error('Invalid map or coordinates:',lat,lng);}}