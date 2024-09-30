//usersdevices.js

/*
//Translation on map load
document.addEventListener('DOMContentLoaded', () => {
    populateUserDropdown();
    document.getElementById('userSelect').addEventListener('change', (event) => {
        const selectedUserId = event.target.value;
        if (selectedUserId) {
            getFarmData(selectedUserId);
        } else {
            document.getElementById('userId').textContent = '';
            document.getElementById('farmInfo').innerHTML = '';
        }
    });

    // Call translateAllElements here to ensure initial translation
    translateAllElements();
});

// Make sure this helper function is available
function getTranslatedText(key) {
    return translations[currentLang][key] || key;
}*/

function toggleUserDevices() {
    const panel = document.querySelector(".usersdevices-list");
    if (panel) {
        panel.classList.toggle("show");
    }
}

function initializeUserDevicesPanel() {
    const panel = document.querySelector(".usersdevices-list");
    if (panel) {
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;"; // Using '×' symbol
        closeButton.className = "close-userdevices-list-btn";
        closeButton.onclick = toggleUserDevices;
        panel.insertBefore(closeButton, panel.firstChild);
    }
}

document.addEventListener("DOMContentLoaded", initializeUserDevicesPanel);

// const farmApiUrl = 'https://api-router.enfarm.com/api/v1/users/get-farm-region-per-user'; // old
const farmApiUrl =
    "https://api-router.enfarm.com/api/v3/farm/total-farms-per-user";

const sensorApiUrl =
    "https://api-router.enfarm.com/api/v1/devices/get-sensor-per-farm";
const boxApiUrl =
    "https://api-router.enfarm.com/api/v1/devices/get-box-per-farm";
const gatewayApiUrl =
    "https://api-router.enfarm.com/api/v1/devices/get-gateway-per-farm";
const regionApiUrl =
    "https://api-router.enfarm.com/api/v1/farm/get-region-per-farm";
const farmDetailApiUrl =
    "https://api-router.enfarm.com/api/v1/farm/get-farm-detail";
const userProfileApiUrl =
    "https://api-router.enfarm.com/api/v2/user/get-user-profile";
const userThumbnailApiUrl =
    "https://api-router.enfarm.com/api/v2/user/get-user-thumbnail";
const farmThumbnailApiUrl =
    "https://api-router.enfarm.com/api/v3/farm/retrieve-farm-detail";
const sensorDetailApiUrl =
    "https://api-router.enfarm.com/api/v3/devices/retrieve-device-detail";


/*
const users = [
    { id: 236, name: "User 236" },
    { id: 260, name: "User 260" },
    { id: 261, name: "User 261" },
    { id: 990, name: "User 990" },
    { id: 1454, name: "User 1454" }
];*/

const userSelect = document.getElementById("userSelect");
const selectedUser = document.getElementById("selectedUser");
const userDropdown = document.getElementById("userDropdown");

async function populateUserDropdown() {
    const userDropdown = document.getElementById("userDropdown");
    const userSelect = document.getElementById("userSelect");
    userDropdown.innerHTML = ""; // Clear existing options
    userSelect.innerHTML = '<option value="">Select a user</option>'; // Reset hidden select

    for (const userId of authenticatedUserIDs) {
        try {
            const userProfile = await getUserProfile(userId);
            let displayText = "";

            if (userProfile && userProfile.user_name) {
                displayText = `${userProfile.user_name} (User ID: ${userId})`;
            } else {
                displayText = `User ID: ${userId}`;
            }

            // Populate the hidden select element
            const option = document.createElement("option");
            option.value = userId;
            option.textContent = displayText;
            userSelect.appendChild(option);

            // Populate the custom dropdown
            const a = document.createElement("a");
            a.href = "#";
            a.textContent = displayText;
            a.setAttribute("data-value", userId);
            userDropdown.appendChild(a);
        } catch (error) {
            console.error(`Error fetching user profile for ID ${userId}:`, error);
            // If there's an error, still add the user ID to the dropdown
            const displayText = `User ID: ${userId}`;

            const option = document.createElement("option");
            option.value = userId;
            option.textContent = displayText;
            userSelect.appendChild(option);

            const a = document.createElement("a");
            a.href = "#";
            a.textContent = displayText;
            a.setAttribute("data-value", userId);
            userDropdown.appendChild(a);
        }
    }
}

// Update the click event listener for the custom dropdown
userDropdown.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        e.preventDefault();
        const selectedId = e.target.getAttribute("data-value");
        document.getElementById("selectedUser").textContent = e.target.textContent;
        userSelect.value = selectedId;
        // Trigger change event on the original select
        userSelect.dispatchEvent(new Event("change"));
    }
});

// Ensure this event listener is present
userSelect.addEventListener("change", (event) => {
    const selectedUserId = event.target.value;
    if (selectedUserId) {
        getFarmData(selectedUserId);
    } else {
        document.getElementById("userId").textContent = "";
        document.getElementById("farmInfo").innerHTML = "";
    }
});

async function getUserProfile(userId) {
    try {
        const response = await axios.post(userProfileApiUrl, {
            user_id: parseInt(userId),
        });
        return response.data.content;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

async function getUserThumbnail(userId) {
    try {
        const response = await axios.post(userThumbnailApiUrl, {
            user_id: parseInt(userId),
        });
        return response.data.content;
    } catch (error) {
        console.error("Error fetching user thumbnail:", error);
        return null;
    }
}

function getTreeTypeName(treeType) {
    const treeTypeInt = parseInt(treeType);
    let key;
    switch (treeTypeInt) {
        case 0:
            key = "Coffee";
            break;
        case 1:
            key = "Durian";
            break;
        case 2:
            key = "Pepper";
            break;
        case 3:
            key = "Tea";
            break;
        default:
            key = "Unknown";
            break;
    }
    return `<span class="tree-type" data-tree-type="${treeTypeInt}" data-translate="${key}"></span>`;
}

//UserID Farm Devices Summary Cards
function generateTotalCounters(
    totalFarms,
    totalSensors,
    totalBoxes,
    totalGateways,
) {
    return `
  <div class="device-counters total-counters">
      <div class="counter">
          <img src="images/leaf.png" alt="Farm icon">
          <div class="counter-content">
              <h2>${totalFarms}</h2>
              <p data-translate="Total Farm(s)">Total Farm(s)${totalFarms !== 1 ? "(s)" : ""}</p>
          </div>
      </div>
      <div class="counter">
          <img src="images/sensor.png" alt="Sensor icon">
          <div class="counter-content">
              <h2>${totalSensors}</h2>
              <p data-translate="Total Sensor(s)">Total Sensor(s)${totalSensors !== 1 ? "(s)" : ""}</p>
          </div>
      </div>
      <div class="counter">
          <img src="images/box.png" alt="Box icon">
          <div class="counter-content">
              <h2>${totalBoxes}</h2>
              <p data-translate="Total Box(es)">Total Box(es)${totalBoxes !== 1 ? "(es)" : ""}</p>
          </div>
      </div>
      <div class="counter">
          <img src="images/gateway.png" alt="Gateway icon">
          <div class="counter-content">
              <h2>${totalGateways}</h2>
              <p data-translate="Total Gateway(s)">Total Gateway(s)${totalGateways !== 1 ? "(s)" : ""}</p>
          </div>
      </div>
  </div>
  `;
}

function generateCounters(sensorCount, boxCount, gatewayCount) {
    return `
  <div class="device-counters">
      <div class="counter">
          <img src="images/sensor.png" alt="Sensor icon">
          <div class="counter-content">
              <h2>${sensorCount}</h2>
              <p data-translate="Sensor(s) Installed">Sensor(s)${sensorCount !== 1 ? "s" : ""} Installed</p>
          </div>
      </div>
      <div class="counter">
          <img src="images/box.png" alt="Box icon">
          <div class="counter-content">
              <h2>${boxCount}</h2>
              <p data-translate="Box(es) Installed">Box(es)${boxCount !== 1 ? "es" : ""} Installed</p>
          </div>
      </div>
      <div class="counter">
          <img src="images/gateway.png" alt="Gateway icon">
          <div class="counter-content">
              <h2>${gatewayCount}</h2>
              <p data-translate="Gateway(s) Installed">Gateway(s)${gatewayCount !== 1 ? "s" : ""} Installed</p>
          </div>
      </div>
  </div>
  `;
}

function getSensorThumbnail(sensorType) {
    if (sensorType.startsWith('3 (N')) {
        return "https://dashboard.enfarm.com/static/media/sensor_3.bd41c965af3eb6bcdab4.png";
    } else if (sensorType.startsWith('7 (N')) {
        return "https://dashboard.enfarm.com/static/media/sensor_7.e027c4034838eabc6495.png";
    } else {
        const lowerType = sensorType.toLowerCase();
        if (lowerType.includes("3") || lowerType.includes("npk")) {
            return "https://dashboard.enfarm.com/static/media/sensor_3.bd41c965af3eb6bcdab4.png";
        } else if (lowerType.includes("7") || lowerType.includes("npkphcth-s")) {
            return "https://dashboard.enfarm.com/static/media/sensor_7.e027c4034838eabc6495.png";
        } else {
            return "";
        }
    }
}

// Updated getFarmDetail function
async function getFarmDetail(farmId) {
    try {
        const response = await axios.post(farmThumbnailApiUrl, {
            farm_id: parseInt(farmId),
        });
        return response.data.content.data;
    } catch (error) {
        console.error("Error fetching farm detail:", error);
        return null;
    }
}

// Add this new function to fetch region data
async function getRegionData(farmId) {
    try {
        const response = await axios.post(regionApiUrl, {
            farm_id: parseInt(farmId),
        });
        return response.data.content;
    } catch (error) {
        console.error("Error fetching region data:", error);
        return [];
    }
}

async function getGatewayData(farmId) {
    try {
        const gatewayResponse = await axios.post(gatewayApiUrl, {
            farm_id: parseInt(farmId),
        });
        return gatewayResponse.data.content;
    } catch (error) {
        console.error("Error fetching gateway data:", error);
        return { is_have_gateway: false, gateways: [] };
    }
}

//Calculates the time difference between the activation date and the current date.
function getTimeSinceActivation(activateDay) {
    if (!activateDay) {
        return 'N/A'; // or any other appropriate default value
    }

    const now = new Date();
    const activationDate = new Date(activateDay.split('/').reverse().join('-')); // Convert DD/MM/YYYY to YYYY-MM-DD
    const diffTime = Math.abs(now - activationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
        return `${diffDays} <span data-translate="${diffDays !== 1 ? 'days' : 'day'}">${diffDays !== 1 ? 'days' : 'day'}</span> <span data-translate="ago">ago</span>`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} <span data-translate="${weeks !== 1 ? 'weeks' : 'week'}">${weeks !== 1 ? 'weeks' : 'week'}</span> <span data-translate="ago">ago</span>`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} <span data-translate="${months !== 1 ? 'months' : 'month'}">${months !== 1 ? 'months' : 'month'}</span> <span data-translate="ago">ago</span>`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `${years} <span data-translate="${years !== 1 ? 'years' : 'year'}">${years !== 1 ? 'years' : 'year'}</span> <span data-translate="ago">ago</span>`;
    }
}

/*
//Fetch Farm Locations
async function fetchFarmLocations() {
    try {
        const response = await axios.get('https://api-ma.enfarm.com/api/v1/ma/get-install-locations');
        return response.data.content;
    } catch (error) {
        console.error('Error fetching farm locations:', error);
        return [];
    }
}*/

//Lat Long Switched
async function fetchFarmLocations() {
    try {
        const response = await axios.get(
            "https://api-ma.enfarm.com/api/v1/ma/get-install-locations",
        );
        // Swap lat and long in the returned data
        return response.data.content.map((location) => ({
            ...location,
            lat: location.lat,
            long: location.long,
        }));
    } catch (error) {
        console.error("Error fetching farm locations:", error);
        return [];
    }
}

async function getFarmData(userId) {
    try {
        document.getElementById("userId").textContent = userId;
        document.getElementById("farmInfo").innerHTML = getTranslatedText(
            "Fetching farm data...",
        );

        const [
            userProfile,
            userThumbnail,
            farmResponse,
            farmDetailResponse,
            farmLocations,
        ] = await Promise.all([
            getUserProfile(userId),
            getUserThumbnail(userId),
            axios.post(farmApiUrl, { user_id: parseInt(userId) }),
            axios.post(farmDetailApiUrl, { user_id: userId }),
            fetchFarmLocations(),
        ]);

        const farmData = farmResponse.data;
        const farmDetailData = farmDetailResponse.data.content;

        if (farmData.status_code === 200) {
            let html = "";

            if (userProfile) {
                const thumbnailSrc = userThumbnail
                    ? `data:image/jpeg;base64,${userThumbnail}`
                    : "images/temp_mascot.jpg";

                html += `
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
                  `;
            }

            let totalFarms = 0;
            let totalSensors = 0;
            let totalBoxes = 0;
            let totalGateways = 0;

            const farms = farmData.content.data;
            totalFarms = farms.length;

            for (const farm of farms) {
                const sensorData = await getSensorData(farm.farm_id);
                const boxData = await getBoxData(farm.farm_id);
                const gatewayData = await getGatewayData(farm.farm_id);
                totalSensors += sensorData.is_have_sensor
                    ? sensorData.sensors.length
                    : 0;
                totalBoxes += boxData.is_have_box ? boxData.boxes.length : 0;
                totalGateways += gatewayData.is_have_gateway
                    ? gatewayData.gateways.length
                    : 0;
            }

            console.log(
                `Total Farms: ${totalFarms}, Total Sensors: ${totalSensors}, Total Boxes: ${totalBoxes}, Total Gateways: ${totalGateways}`,
            );

            html += generateTotalCounters(
                totalFarms,
                totalSensors,
                totalBoxes,
                totalGateways,
            );

            for (const farm of farmData.content.data) {
                const farmDetail = farmDetailData[farm.farm_id] || {};
                const sensorData = await getSensorData(farm.farm_id);
                const boxData = await getBoxData(farm.farm_id);
                const gatewayData = await getGatewayData(farm.farm_id);
                const farmDetailInfo = await getFarmDetail(farm.farm_id);
                const regionData = await getRegionData(farm.farm_id);
                const cultivateData = farm.cultivates || [];

                const farmThumbnail =
                    farmDetailInfo && farmDetailInfo.farm_thumbnail
                        ? farmDetailInfo.farm_thumbnail
                        : "images/noimage.jfif";

                // Create a map of regions with their cultivates
                const regionMap = new Map();
                regionData.forEach((region) => {
                    regionMap.set(region.region_name, {
                        ...region,
                        cultivates: [],
                    });
                });

                // Match cultivates to regions
                cultivateData.forEach((cultivate) => {
                    const region = regionMap.get(cultivate.name);
                    if (region) {
                        region.cultivates.push(cultivate);
                    } else {
                        // If no matching region, create a new entry
                        regionMap.set(cultivate.name, {
                            region_id: "-",
                            region_name: cultivate.name,
                            method: "-",
                            last_active: "-",
                            cultivates: [cultivate],
                        });
                    }
                });

                html += `
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
                      ${farm.tree_types.map((treeType) => getTreeTypeName(treeType)).join(", ")}
                  </p>
                  ${farmDetail.productivity ? `<p><strong data-translate="Productivity">Productivity:</strong> ${farmDetail.productivity} Tonnes</p>` : ""}
                  ${farmDetail.fertilization_date ? `<p><strong data-translate="Fertilization Date:">Fertilization Date:</strong> ${farmDetail.fertilization_date}</p>` : ""}
                  ${farmDetail.farm_last_action_day ? `<p><strong data-translate="Last Action Day:">Last Action Day:</strong> ${farmDetail.farm_last_action_day}</p>` : ""}
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
              ${regionMap.size > 0
                        ? `
                  <table>
                      <thead>
                          <tr>
                              <th data-translate="Region ID">Region ID</th>
                              <th data-translate="Cultivate ID">Cultivate ID</th>
                              <th data-translate="Region Name">Region Name</th>
                              <th data-translate="Tree Type">Tree Type</th>
                              <th data-translate="Last Update">Last Update</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${Array.from(regionMap.values())
                            .map(
                                (region) => `
                              <tr>
                                  <td>${region.region_id}</td>
                                  <td>${region.cultivates.map((c) => c.cultivate_id).join(", ") || "-"}</td>
                                  <td>${region.region_name}</td>
                                  <td>${region.cultivates.map((c) => getTreeTypeName(c.tree_type)).join(", ") || "-"}</td>
                                  <td>${region.last_active}</td>
                              </tr>
                          `,
                            )
                            .join("")}
                      </tbody>
                  </table>
              `
                        : '<p class="centered-message" data-translate="No region or cultivate information available">No region or cultivate information available for this farm.</p>'
                    }
          </div>
          ${generateCounters(
                        sensorData.is_have_sensor ? sensorData.sensors.length : 0,
                        boxData.is_have_box ? boxData.boxes.length : 0,
                        gatewayData.is_have_gateway ? gatewayData.gateways.length : 0,
                    )}
          <div class="sensor-info">
              <h3 data-translate="Sensor Information">Sensor Information</h3>
              ${sensorData.is_have_sensor
                        ? `
<div class="sensor-cards">
    ${await Promise.all(sensorData.sensors.map(async (sensor) => {
                            const sensorDetails = await getSensorDetails(userId, sensor.sensor_qr_str);
                            const activationTime = sensorDetails ? getTimeSinceActivation(sensorDetails.activate_day) : '';
                            return `
    <div class="sensor-card">
        ${getSensorThumbnail(sensor.sensor_type_str) ? `<img src="${getSensorThumbnail(sensor.sensor_type_str)}" alt="${sensor.sensor_type_str}">` : ""}
        <div class="device-details">
            <p class="sensor-type">${sensor.sensor_type_str}</p>
            <p><span data-translate="Sensor ID">Sensor ID</span>: ${sensor.sensor_id}</p>
            <p><span data-translate="QR">QR</span>: ${sensor.sensor_qr_str}</p>
            ${sensorDetails ? `
                <p><span data-translate="Region Deployed">Region Deployed</span>: ${sensorDetails.region_name}</p>
                <p><span data-translate="Depth">Depth</span>: ${sensorDetails.in_depth_label} (${sensorDetails.in_depth})</p>
                <p><span data-translate="Activated">Activated</span>: ${sensorDetails.activate_day}<br>(${activationTime})</p>
            ` : ''}
        </div>
    </div>
`;
                        })).then(cards => cards.join(''))}
</div>
                `
                        : '<p class="centered-message" data-translate="No sensor information available">No sensor(s) information available for this farm.</p>'
                    }
            </div>
          <br>
          <div class="box-info">
        <h3 data-translate="Box Information">Box Information</h3>
        ${boxData.is_have_box
                        ? `
                <div class="box-cards">
  ${await Promise.all(boxData.boxes.map(async (box) => {
                            const boxDetails = await getBoxDetails(userId, box.box_qr_string);
                            const boxTypeText = box.box_type === 1 ? "Phát đáp Lora" : "Phát đáp BLE";
                            const boxImageUrl = box.box_type === 1
                                ? "https://dashboard.enfarm.com/static/media/box_lora.5ae54139dc9704817c04.png"
                                : "https://dashboard.enfarm.com/static/media/ble.2dad651cc9747fa2ef39.png";
                            const activationTime = boxDetails ? getTimeSinceActivation(boxDetails.activate_day) : '';
                            return `
      <div class="box-card">
        <img src="${boxImageUrl}" alt="${boxTypeText}">
        <div class="device-details">
          <p class="full-width box-type">${boxTypeText}</p>
          <p><span data-translate="Box ID">Box ID</span>: ${box.box_id}</p>
          <p><span data-translate="BL Address">BL Address</span>: ${box.bl_address}</p>
          <p><span data-translate="QR">QR</span>: ${box.box_qr_string}</p>
          ${boxDetails ? `
            <p><span data-translate="Activated">Activated</span>: ${boxDetails.activate_day}<br>(${activationTime})</p>
          ` : ''}
        </div>
      </div>
    `;
                        })).then(cards => cards.join(''))}
</div>
            `
                        : '<p class="centered-message" data-translate="No box information available">No box(es) information available for this farm.</p>'
                    }
    </div>
    <br>
    <div class="gateway-info">
  <h3 data-translate="Gateway Information">Gateway Information</h3>
  ${gatewayData.is_have_gateway
                        ? `
    <div class="gateway-cards">
      ${await Promise.all(gatewayData.gateways.map(async (gateway) => {
                            const gatewayDetails = await getGatewayDetails(userId, gateway.gateway_qr_string);
                            const activationTime = gatewayDetails ? getTimeSinceActivation(gatewayDetails.activate_day) : '';
                            return `
          <div class="gateway-card">
            <img src="https://dashboard.enfarm.com/static/media/enfarm%20F+_congdulieu_3.4e2c80b4f00a0e698e82.png" alt="Gateway">
            <div class="device-details">
              <p><span data-translate="Gateway ID">Gateway ID</span>: ${gateway.gateway_id}</p>
              <p><span data-translate="BL Address">BL Address</span>: ${gateway.bl_address}</p>
              <p><span data-translate="QR">QR</span>: ${gateway.gateway_qr_string}</p>
              ${gatewayDetails ? `
                <p><span data-translate="Activated">Activated</span>: ${gatewayDetails.activate_day}<br>(${activationTime})</p>
              ` : ''}
            </div>
          </div>
        `;
                        })).then(cards => cards.join(''))}
    </div>
    `
                        : '<p class="centered-message" data-translate="No gateway information available">No gateway(s) information available for this farm.</p>'
                    }
</div>
      </div>
  </div>
  `;
            }

            document.getElementById("farmInfo").innerHTML = html;

            // Apply translations after content is generated
            translateAllElements();

            // Add event listeners to the show on map buttons
            document.querySelectorAll(".map-button").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const farmName = event.target.closest(".map-button").dataset.farmName;
                    const farmLocation = farmLocations.find(
                        (location) => location.farmname === farmName,
                    );
                    if (farmLocation) {
                        zoomToMarker(farmLocation.lat, farmLocation.long);
                    } else {
                        console.error("Farm location not found:", farmName);
                    }
                });
            });

            /*//Lat Long Switched
                  document.querySelectorAll('.map-button').forEach(button => {
                      button.addEventListener('click', (event) => {
                          const farmName = event.target.closest('.map-button').dataset.farmName;
                          const farmLocation = farmLocations.find(location => location.farmname === farmName);
                          if (farmLocation) {
                              // Note: We're using farmLocation.lat and farmLocation.long here,
                              // which are already swapped in the fetchFarmLocations function
                              zoomToMarker(farmLocation.lat, farmLocation.long);
                          } else {
                              console.error('Farm location not found:', farmName);
                          }
                      });
                  });*/

            document.querySelectorAll(".farm-header").forEach((header) => {
                header.addEventListener("click", () => {
                    header.parentElement.classList.toggle("active");
                });
            });
        } else {
            document.getElementById("farmInfo").innerHTML =
                `<p>${getTranslatedText("Error fetching farm data")}</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("farmInfo").innerHTML =
            `<p>${getTranslatedText("Error fetching data")}</p>`;
    }
}

async function getSensorData(farmId) {
    try {
        const sensorResponse = await axios.post(sensorApiUrl, {
            farm_id: parseInt(farmId),
        });
        return sensorResponse.data.content;
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        return { is_have_sensor: false, sensors: [] };
    }
}



async function getBoxData(farmId) {
    try {
        const boxResponse = await axios.post(boxApiUrl, {
            farm_id: parseInt(farmId),
        });
        return boxResponse.data.content;
    } catch (error) {
        console.error("Error fetching box data:", error);
        return { is_have_box: false, boxes: [] };
    }
}

async function getRegionData(farmId) {
    try {
        const regionResponse = await axios.post(regionApiUrl, {
            farm_id: parseInt(farmId),
        });
        return regionResponse.data.content;
    } catch (error) {
        console.error("Error fetching region data:", error);
        return [];
    }
}

//Getting other data like activation date for Sensors
async function getSensorDetails(userId, qrString) {
    try {
        const detailResponse = await axios.post(sensorDetailApiUrl, {
            user_id: userId,
            qr_string: qrString,
            device_type: 0,
            role: 0
        });
        return detailResponse.data.content;
    } catch (error) {
        console.error("Error fetching sensor details:", error);
        return null;
    }
}

//Getting other data like activation date for Boxes
async function getBoxDetails(userId, qrString) {
    try {
        const detailResponse = await axios.post(sensorDetailApiUrl, {
            user_id: userId,
            qr_string: qrString,
            device_type: 1, // Assuming 1 is for boxes
            role: 0
        });
        return detailResponse.data.content;
    } catch (error) {
        console.error("Error fetching box details:", error);
        return null;
    }
}

//Getting other data like activation date for Gateways
async function getGatewayDetails(userId, qrString) {
    try {
        const detailResponse = await axios.post(sensorDetailApiUrl, {
            user_id: userId,
            qr_string: qrString,
            device_type: 2, // Assuming 2 is for gateways
            role: 0
        });
        return detailResponse.data.content;
    } catch (error) {
        console.error("Error fetching gateway details:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateUserDropdown();
    document.getElementById("userSelect").addEventListener("change", (event) => {
        const selectedUserId = event.target.value;
        if (selectedUserId) {
            getFarmData(selectedUserId);
        } else {
            document.getElementById("userId").textContent = "";
            document.getElementById("farmInfo").innerHTML = "";
        }
    });
});

/*
function zoomToMarker(lat, lng) {
    if (map && lat && lng) {
        map.flyTo([lat, lng], 18, {
            animate: true,
            duration: 1.5 // Duration of animation in seconds
        });
    } else {
        console.error('Invalid map or coordinates:', lat, lng);
    }
}*/

//Lat Long Switched
function zoomToMarker(lat, lng) {
    if (map && lat && lng) {
        map.flyTo([lat, lng], 18, {
            animate: true,
            duration: 1.5, // Duration of animation in seconds
        });
    } else {
        console.error("Invalid map or coordinates:", lat, lng);
    }
}