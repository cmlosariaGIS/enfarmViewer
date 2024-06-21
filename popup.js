/*
// List of mockup farm images to randomize
var images = [
    'https://www.spiralhorncoffee.com/wp-content/uploads/2021/01/photodune-gsEC867x-lush-green-coffee-landscape-xxl-scaled.jpg',
    'https://th.bing.com/th/id/OIP.F91NFZfL7nA--b2vzNLXTwHaE8?rs=1&pid=ImgDetMain',
    'https://www.giz.de/static/en/media/gizIMAGE-kaffee-costa-rica.jpg',
    'https://www.perfectdailygrind.com/wp-content/uploads/2018/04/coffee-farm-3.jpg'
];

// Fetch farm data for two users
axios.all([
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 236
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 260
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
])
    .then(axios.spread((response236, response260) => {
        // Extract farm details from the responses for user 236 and 260
        const farms236 = response236.data.content.data;
        const farms260 = response260.data.content.data;

        // Get farm names from dataset 260
        const farmNames260 = farms260.map(farm => farm.farm_name);

        // Filter out farm details from dataset 236 that exist in dataset 260
        const filteredFarms236 = farms236.filter(farm => !farmNames260.includes(farm.farm_name));

        // Continue with fetching data for map markers
        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // Initialize marker cluster group
                var markers = L.markerClusterGroup();
                var totalDevicesCount = data.content.length;

                // Loop through each location
                data.content.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Find the farm details for the current location from dataset 260
                    const farmDetails260 = farms260.find(farm => farm.farm_name === location.farmname);
                    const farmDetails = farmDetails260; // Using details from dataset 260

                    console.log('Farm Details:', farmDetails);  // Debugging log

                    // Create a custom marker icon with a label for the farm name
                    var customMarker = L.divIcon({
                        className: 'custom-marker',
                        html: `
                    <div class="marker2D-label">${location.farmname}</div>
                    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`
                    });

                    // Create the marker with the custom icon
                    var marker = L.marker([location.lat, location.long], { icon: customMarker });





                    // Add popup content
                    var popupContent = `
<div style="padding-bottom: 20px; top-padding 10px">
    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px;">psychiatry</span>
    <b style="font-size: 16px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">${location.farmname}</b><br>
    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px;">location_on</span>
    <span style="font-size: 10px;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
    <img src="${randomImage}" alt="Farm Image" style="width:100%; height:fit-content; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 3px; margin: 4px 0;" />
    <!--Farm ID: ${farmDetails ? farmDetails.farm_id : 'N/A'}<br>-->
    <!--Region name: ${location.region_name}--><br>`;

                    if (farmDetails) {
                        // Filter cultivates to only those that match both region_name and name
                        const matchingCultivates = farmDetails.cultivates.filter(cultivate => {
                            return cultivate.name === location.region_name;
                        });

                        if (matchingCultivates.length > 0) {
                            popupContent += `
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
        <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;

                            // Add cultivate details
                            const cultivateDetailsPromises = matchingCultivates.map(async cultivate => {
                                popupContent += `
            <br>
            <!--Completed: ${cultivate.is_completed || 'N/A'}<br>-->
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>
            <!--Last Update: ${cultivate.last_update || 'N/A'}<br>-->`;

                                const cultivateDetails = await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`, {
                                    method: 'POST',
                                    headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ cultivate_id: cultivate.cultivate_id })
                                })
                                    .then(response => response.json())
                                    .then(data => data.content)
                                    .catch(error => {
                                        console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`, error);
                                        return null;
                                    });

                                if (cultivateDetails) {
                                    popupContent += `
                <div>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> Current Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> Expected Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                    <!--Region ID: ${cultivateDetails.region_id}<br>-->
                    <!--Softids:<br>-->
                    <br>
                    <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" onclick="toggleSoilData(this)">
                    <i class="material-symbols-outlined" style="margin-right: 3px; font-size: 16px;">science</i>
                    <span class="toggle-text" style="white-space: nowrap;">View soil data</span>
                </span>                
                <div class="soil-data" style="display:none;">
                    <br>
                    <br>
                    <br>
                `;

                                    const nutritionDataPromises = cultivateDetails.softids.map(async softid => {
                                        const nutritionData = await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`, {
                                            method: 'POST',
                                            headers: {
                                                'accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ region_id: cultivateDetails.region_id })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                const matchingValues = data.content.find(item => item.in_depth === softid.in_depth)?.values;
                                                if (matchingValues) {
                                                    const latestIndex = matchingValues.created_at.length - 1;
                                                    return {
                                                        npk: matchingValues.npk[latestIndex],
                                                        moist: matchingValues.moist[latestIndex],
                                                        pH: matchingValues.pH[latestIndex],
                                                        t: matchingValues.t[latestIndex],
                                                        created_at: matchingValues.created_at[latestIndex],
                                                    };
                                                }
                                                return null;
                                            })
                                            .catch(error => {
                                                console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`, error);
                                                return null;
                                            });

                                            if (nutritionData) {
                                                popupContent += `
                                                    <div style="position: relative; display: flex; align-items: center;">
                                                        In Depth: ${softid.in_depth} (${softid.in_depth_label})
                                                        <span class="material-symbols-outlined" style="position: absolute; right: 0; font-size: 12px; cursor: pointer;">chevron_forward</span>
                                                    </div>
                                                    <div style="display: flex; flex-wrap: wrap;">
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">bubble_chart</span>
                                                            <b>NPK:</b> ${nutritionData.npk}<br>
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">humidity_mid</span>
                                                            <b>Moist:</b> ${nutritionData.moist}<br>
                                                        </div>
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">water_ph</span>
                                                            <b>pH:</b> ${nutritionData.pH}<br>    
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">device_thermostat</span>
                                                            <b>Temp:</b> ${nutritionData.t}<br>
                                                        </div>
                                                    </div>
                                                    <span style="font-size: 10px;">
                                                        <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                        <i style="vertical-align: middle;">last update: ${nutritionData.created_at}</i>
                                                    </span><br>
                                                    <br>
                                                `;
                                            } else {
                                                popupContent += `
                                                    &nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>
                                                `;
                                            }
                                    });

                                    await Promise.all(nutritionDataPromises);
                                    popupContent += `</div></div>`;
                                } else {
                                    popupContent += `<br><i>Error fetching cultivate details</i>`;
                                }

                                return popupContent;
                            });

                            Promise.all(cultivateDetailsPromises)
                                .then(cultivateDetails => {
                                    popupContent = cultivateDetails.join('');
                                    popupContent += '</p>'; // Close popup content
                                    marker.bindPopup(popupContent);
                                })
                                .catch(error => {
                                    console.error('Error fetching cultivate details:', error);
                                });
                        } else {
                            popupContent += `<i>No matching cultivate details found</i><br>`;
                            popupContent += '</p>'; // Close popup content
                            marker.bindPopup(popupContent);
                        }
                    } else {
                        popupContent += `<i>Farm details not found</i><br>`;
                        popupContent += '</p>'; // Close popup content
                        marker.bindPopup(popupContent);
                    }

                    // Add marker to marker cluster group
                    markers.addLayer(marker);
                });

                // Add marker cluster group to map
                map.addLayer(markers);

                // Display total device count
                document.getElementById('totalDevicesCount').innerText = totalDevicesCount;
            })
            .catch(error => console.error('Error fetching data:', error));
    }))
    .catch(error => console.error('Error fetching farm details:', error));


//Expands or minimizes soil data results
function toggleSoilData(element) {
    var soilDataDiv = element.nextElementSibling;
    var toggleText = element.querySelector('.toggle-text');
    if (soilDataDiv.style.display === "none") {
        soilDataDiv.style.display = "block";
        toggleText.textContent = "Hide soil data";
    } else {
        soilDataDiv.style.display = "none";
        toggleText.textContent = "View soil data";
    }
}


*/


/*
var images = [
    'https://i.ibb.co/jLBvcbF/OIG2-1.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/WWpWVdX/OIG4.jpg'
];

// Fetch farm data for two users
axios.all([
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 236
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 260
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
])
    .then(axios.spread((response236, response260) => {
        // Extract farm details from the responses for user 236 and 260
        const farms236 = response236.data.content.data;
        const farms260 = response260.data.content.data;

        // Get farm names from dataset 260
        const farmNames260 = farms260.map(farm => farm.farm_name);

        // Filter out farm details from dataset 236 that exist in dataset 260
        const filteredFarms236 = farms236.filter(farm => !farmNames260.includes(farm.farm_name));

        // Continue with fetching data for map markers
        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // Initialize marker cluster group
                var markers = L.markerClusterGroup();
                var totalDevicesCount = data.content.length;

                // Loop through each location
                data.content.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Find the farm details for the current location from dataset 260
                    const farmDetails260 = farms260.find(farm => farm.farm_name === location.farmname);
                    const farmDetails = farmDetails260; // Using details from dataset 260

                    console.log('Farm Details:', farmDetails);  // Debugging log

                    // Create a custom marker icon with a label for the farm name
                    var customMarker = L.divIcon({
                        className: 'custom-marker',
                        html: `
                    <div class="marker2D-label">${location.farmname}</div>
                    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`
                    });

                    // Create the marker with the custom icon
                    var marker = L.marker([location.lat, location.long], { icon: customMarker });





                    // Add popup content
                    var popupContent = `
<div style="padding-bottom: 20px; top-padding 10px">
    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px;">psychiatry</span>
    <b style="font-size: 16px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">${location.farmname}</b><br>
    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px;">location_on</span>
    <span style="font-size: 10px;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
    <img src="${randomImage}" alt="Farm Image" style="width:100%; height:fit-content; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 3px; margin: 4px 0;" />
    <!--Farm ID: ${farmDetails ? farmDetails.farm_id : 'N/A'}<br>-->
    <!--Region name: ${location.region_name}--><br>`;

                    if (farmDetails) {
                        // Filter cultivates to only those that match both region_name and name
                        const matchingCultivates = farmDetails.cultivates.filter(cultivate => {
                            return cultivate.name === location.region_name;
                        });

                        if (matchingCultivates.length > 0) {
                            popupContent += `
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
        <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;

                            // Add cultivate details
                            const cultivateDetailsPromises = matchingCultivates.map(async cultivate => {
                                popupContent += `
            <br>
            <!--Completed: ${cultivate.is_completed || 'N/A'}<br>-->
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>
            <!--Last Update: ${cultivate.last_update || 'N/A'}<br>-->`;

                                const cultivateDetails = await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`, {
                                    method: 'POST',
                                    headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ cultivate_id: cultivate.cultivate_id })
                                })
                                    .then(response => response.json())
                                    .then(data => data.content)
                                    .catch(error => {
                                        console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`, error);
                                        return null;
                                    });

                                if (cultivateDetails) {
                                    popupContent += `
                <div>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> Current Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> Expected Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                    <!--Region ID: ${cultivateDetails.region_id}<br>-->
                    <!--Softids:<br>-->
                    <br>
                    <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" onclick="toggleSoilData(this)">
                    <i class="material-symbols-outlined" style="margin-right: 3px; font-size: 16px;">science</i>
                    <span class="toggle-text" style="white-space: nowrap;">View soil data</span>
                </span>                
                <div class="soil-data" style="display:none;">
                    <br>
                    <br>
                    <br>
                `;

                                    const nutritionDataPromises = cultivateDetails.softids.map(async softid => {
                                        const nutritionData = await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`, {
                                            method: 'POST',
                                            headers: {
                                                'accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ region_id: cultivateDetails.region_id })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                const matchingValues = data.content.find(item => item.in_depth === softid.in_depth)?.values;
                                                if (matchingValues) {
                                                    const latestIndex = matchingValues.created_at.length - 1;
                                                    return {
                                                        npk: matchingValues.npk[latestIndex],
                                                        moist: matchingValues.moist[latestIndex],
                                                        pH: matchingValues.pH[latestIndex],
                                                        t: matchingValues.t[latestIndex],
                                                        created_at: matchingValues.created_at[latestIndex],
                                                    };
                                                }
                                                return null;
                                            })
                                            .catch(error => {
                                                console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`, error);
                                                return null;
                                            });

                                            if (nutritionData) {
                                                popupContent += `
                                                    <div style="position: relative; display: flex; align-items: center;">
                                                        In Depth: ${softid.in_depth} (${softid.in_depth_label})
                                                        <span class="material-symbols-outlined" style="position: absolute; right: 0; font-size: 12px; cursor: pointer;">chevron_forward</span>
                                                    </div>
                                                    <div style="display: flex; flex-wrap: wrap;">
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">bubble_chart</span>
                                                            <b>NPK:</b> ${nutritionData.npk}<br>
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">humidity_mid</span>
                                                            <b>Moist:</b> ${nutritionData.moist}<br>
                                                        </div>
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">water_ph</span>
                                                            <b>pH:</b> ${nutritionData.pH}<br>    
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">device_thermostat</span>
                                                            <b>Temp:</b> ${nutritionData.t}<br>
                                                        </div>
                                                    </div>
                                                    <span style="font-size: 10px;">
                                                        <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                        <i style="vertical-align: middle;">last update: ${nutritionData.created_at}</i>
                                                    </span><br>
                                                    <br>
                                                `;
                                            } else {
                                                popupContent += `
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>-->
                                                `;
                                            }
                                    });

                                    await Promise.all(nutritionDataPromises);
                                    popupContent += `</div></div>`;
                                } else {
                                    popupContent += `<br><i>Error fetching cultivate details</i>`;
                                }

                                return popupContent;
                            });

                            Promise.all(cultivateDetailsPromises)
                                .then(cultivateDetails => {
                                    popupContent = cultivateDetails.join('');
                                    popupContent += '</p>'; // Close popup content
                                    marker.bindPopup(popupContent);
                                })
                                .catch(error => {
                                    console.error('Error fetching cultivate details:', error);
                                });
                        } else {
                            popupContent += `<i>No matching cultivate details found</i><br>`;
                            popupContent += '</p>'; // Close popup content
                            marker.bindPopup(popupContent);
                        }
                    } else {
                        popupContent += `<i>Farm details not found</i><br>`;
                        popupContent += '</p>'; // Close popup content
                        marker.bindPopup(popupContent);
                    }

                    // Add marker to marker cluster group
                    markers.addLayer(marker);
                });

                // Add marker cluster group to map
                map.addLayer(markers);

                // Display total device count
                document.getElementById('totalDevicesCount').innerText = totalDevicesCount;
            })
            .catch(error => console.error('Error fetching data:', error));
    }))
    .catch(error => console.error('Error fetching farm details:', error));


//Expands or minimizes soil data results
function toggleSoilData(element) {
    var soilDataDiv = element.nextElementSibling;
    var toggleText = element.querySelector('.toggle-text');
    if (soilDataDiv.style.display === "none") {
        soilDataDiv.style.display = "block";
        toggleText.textContent = "Hide soil data";
    } else {
        soilDataDiv.style.display = "none";
        toggleText.textContent = "View soil data";
    }
}*/

/*
var images = [
    'https://i.ibb.co/jLBvcbF/OIG2-1.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/WWpWVdX/OIG4.jpg'
];

// Fetch farm data for two users
axios.all([
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 236
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 260
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
])
    .then(axios.spread((response236, response260) => {
        // Extract farm details from the responses for user 236 and 260
        const farms236 = response236.data.content.data;
        const farms260 = response260.data.content.data;

        // Get farm names from dataset 260
        const farmNames260 = farms260.map(farm => farm.farm_name);

        // Filter out farm details from dataset 236 that exist in dataset 260
        const filteredFarms236 = farms236.filter(farm => !farmNames260.includes(farm.farm_name));

        // Continue with fetching data for map markers
        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // Initialize marker cluster group
                var markers = L.markerClusterGroup();
                var totalDevicesCount = data.content.length;

                // Loop through each location
                data.content.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Find the farm details for the current location from dataset 260
                    const farmDetails260 = farms260.find(farm => farm.farm_name === location.farmname);
                    const farmDetails = farmDetails260; // Using details from dataset 260

                    console.log('Farm Details:', farmDetails);  // Debugging log

                    // Create a custom marker icon with a label for the farm name
                    var customMarker = L.divIcon({
                        className: 'custom-marker',
                        html: `
                    <div class="marker2D-label">${location.farmname}</div>
                    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`
                    });

                    // Create the marker with the custom icon
                    var marker = L.marker([location.lat, location.long], { icon: customMarker });





                    // Add popup content
                    var popupContent = `
<div style="padding-bottom: 20px; top-padding 10px">
    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px;">psychiatry</span>
    <b style="font-size: 16px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">${location.farmname}</b><br>
    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px;">location_on</span>
    <span style="font-size: 10px;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
    <img src="${randomImage}" alt="Farm Image" style="width:100%; height:fit-content; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 3px; margin: 4px 0;" />
    <!--Farm ID: ${farmDetails ? farmDetails.farm_id : 'N/A'}<br>-->
    Region name: ${location.region_name}<br>`;

                    if (farmDetails) {
                        // Filter cultivates to only those that match both region_name and name
                        const matchingCultivates = farmDetails.cultivates.filter(cultivate => {
                            return cultivate.name === location.region_name;
                        });

                        if (matchingCultivates.length > 0) {
                            popupContent += `
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
        <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;

                            // Add cultivate details
                            const cultivateDetailsPromises = matchingCultivates.map(async cultivate => {
                                popupContent += `
            <br>
            <!--Completed: ${cultivate.is_completed || 'N/A'}<br>-->
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>
            <!--Last Update: ${cultivate.last_update || 'N/A'}<br>-->`;

                                const cultivateDetails = await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`, {
                                    method: 'POST',
                                    headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ cultivate_id: cultivate.cultivate_id })
                                })
                                    .then(response => response.json())
                                    .then(data => data.content)
                                    .catch(error => {
                                        console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`, error);
                                        return null;
                                    });

                                if (cultivateDetails) {
                                    popupContent += `
                <div>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> Current Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> Expected Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                    Region ID: ${cultivateDetails.region_id}<br>
                    <!--Softids:<br>-->
                    <br>
                    <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" onclick="toggleSoilData(this)">
                    <i class="material-symbols-outlined" style="margin-right: 3px; font-size: 16px;">science</i>
                    <span class="toggle-text" style="white-space: nowrap;">View soil data</span>
                </span>                
                <div class="soil-data" style="display:none;">
                    <br>
                    <br>
                    <br>
                `;

                                    const nutritionDataPromises = cultivateDetails.softids.map(async softid => {
                                        const nutritionData = await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`, {
                                            method: 'POST',
                                            headers: {
                                                'accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ region_id: cultivateDetails.region_id })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                const matchingValues = data.content.find(item => item.in_depth === softid.in_depth)?.values;
                                                if (matchingValues) {
                                                    const latestIndex = matchingValues.created_at.length - 1;
                                                    return {
                                                        npk: matchingValues.npk[latestIndex],
                                                        moist: matchingValues.moist[latestIndex],
                                                        pH: matchingValues.pH[latestIndex],
                                                        t: matchingValues.t[latestIndex],
                                                        created_at: matchingValues.created_at[latestIndex],
                                                    };
                                                }
                                                return null;
                                            })
                                            .catch(error => {
                                                console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`, error);
                                                return null;
                                            });

                                        if (nutritionData) {
                                            popupContent += `
                                                    <div style="position: relative; display: flex; align-items: center;">
                                                        In Depth: ${softid.in_depth} (${softid.in_depth_label})
                                                        <span class="material-symbols-outlined" style="position: absolute; right: 0; font-size: 12px; cursor: pointer;">chevron_forward</span>
                                                    </div>
                                                    <div style="display: flex; flex-wrap: wrap;">
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">bubble_chart</span>
                                                            <b>NPK:</b> ${nutritionData.npk}<br>
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">humidity_mid</span>
                                                            <b>Moist:</b> ${nutritionData.moist}<br>
                                                        </div>
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">water_ph</span>
                                                            <b>pH:</b> ${nutritionData.pH}<br>    
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">device_thermostat</span>
                                                            <b>Temp:</b> ${nutritionData.t}<br>
                                                        </div>
                                                    </div>
                                                    <span style="font-size: 10px;">
                                                        <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                        <i style="vertical-align: middle;">last update: ${nutritionData.created_at}</i>
                                                    </span><br>
                                                    <br>
                                                `;
                                        } else {
                                            popupContent += `
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>-->
                                                `;
                                        }
                                    });

                                    await Promise.all(nutritionDataPromises);
                                    popupContent += `</div></div>`;
                                } else {
                                    popupContent += `<br><i>Error fetching cultivate details</i>`;
                                }

                                return popupContent;
                            });

                            Promise.all(cultivateDetailsPromises)
                                .then(cultivateDetails => {
                                    popupContent = cultivateDetails.join('');
                                    popupContent += '</p>'; // Close popup content
                                    marker.bindPopup(popupContent);
                                })
                                .catch(error => {
                                    console.error('Error fetching cultivate details:', error);
                                });
                        } else {
                            popupContent += `<i>No matching cultivate details found</i><br>`;
                            popupContent += '</p>'; // Close popup content
                            marker.bindPopup(popupContent);
                        }
                    } else {
                        popupContent += `<i>Farm details not found</i><br>`;
                        popupContent += '</p>'; // Close popup content
                        marker.bindPopup(popupContent);
                    }

                    // Add marker to marker cluster group
                    markers.addLayer(marker);
                });

                // Add marker cluster group to map
                map.addLayer(markers);

                // Display total device count
                document.getElementById('totalDevicesCount').innerText = totalDevicesCount;

            })
            .catch(error => console.error('Error fetching data:', error));
    }))
    .catch(error => console.error('Error fetching farm details:', error));


//Expands or minimizes soil data results
function toggleSoilData(element) {
    var soilDataDiv = element.nextElementSibling;
    var toggleText = element.querySelector('.toggle-text');
    if (soilDataDiv.style.display === "none") {
        soilDataDiv.style.display = "block";
        toggleText.textContent = "Hide soil data";
    } else {
        soilDataDiv.style.display = "none";
        toggleText.textContent = "View soil data";
    }
}

*/


/*
var images = [
    'https://i.ibb.co/jLBvcbF/OIG2-1.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/WWpWVdX/OIG4.jpg'
];

// Fetch farm data for two users
axios.all([
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 236
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 260
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
])
    .then(axios.spread((response236, response260) => {
        // Extract farm details from the responses for user 236 and 260
        const farms236 = response236.data.content.data;
        const farms260 = response260.data.content.data;

        // Get farm names from dataset 260
        const farmNames260 = farms260.map(farm => farm.farm_name);

        // Filter out farm details from dataset 236 that exist in dataset 260
        const filteredFarms236 = farms236.filter(farm => !farmNames260.includes(farm.farm_name));

        // Continue with fetching data for map markers
        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // Initialize marker cluster group
                var markers = L.markerClusterGroup();
                var totalDevicesCount = data.content.length;

                // Loop through each location
                data.content.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Find the farm details for the current location from dataset 260
                    const farmDetails260 = farms260.find(farm => farm.farm_name === location.farmname);
                    const farmDetails = farmDetails260; // Using details from dataset 260

                    console.log('Farm Details:', farmDetails);  // Debugging log

                    // Create a custom marker icon with a label for the farm name
                    var customMarker = L.divIcon({
                        className: 'custom-marker',
                        html: `
                    <div class="marker2D-label">${location.farmname}</div>
                    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`
                    });

                    // Create the marker with the custom icon
                    var marker = L.marker([location.lat, location.long], { icon: customMarker });

                    // Add popup content
                    var popupContent = `
<div style="padding-bottom: 20px; top-padding 10px">
    <span class="material-symbols-outlined" style="font-size: 16px; margin-right: 2px;">psychiatry</span>
    <b style="font-size: 16px; text-shadow: 1px 1px 1px rgba(0,0,0,0.2);">${location.farmname}</b><br>
    <span class="material-symbols-outlined" style="font-size: 10px; margin-right: 4px;">location_on</span>
    <span style="font-size: 10px;">${farmDetails ? farmDetails.farm_address || 'N/A' : 'N/A'}</span><br>
    <img src="${randomImage}" alt="Farm Image" style="width:100%; height:fit-content; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 3px; margin: 4px 0;" />
    <!--Farm ID: ${farmDetails ? farmDetails.farm_id : 'N/A'}<br>-->
    <!--Region name: ${location.region_name}<br>-->`;

                    if (farmDetails) {
                        // Filter cultivates to only those that match both region_name and name
                        const matchingCultivates = farmDetails.cultivates.filter(cultivate => {
                            return cultivate.name === location.region_name;
                        });

                        if (matchingCultivates.length > 0) {
                            popupContent += `
        <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
        <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;

                            // Add cultivate details
                            const cultivateDetailsPromises = matchingCultivates.map(async cultivate => {
                                popupContent += `
            <br>
            <!--Completed: ${cultivate.is_completed || 'N/A'}<br>-->
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>
            <!--Last Update: ${cultivate.last_update || 'N/A'}<br>-->`;

                                const cultivateDetails = await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`, {
                                    method: 'POST',
                                    headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ cultivate_id: cultivate.cultivate_id })
                                })
                                    .then(response => response.json())
                                    .then(data => data.content)
                                    .catch(error => {
                                        console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`, error);
                                        return null;
                                    });

                                if (cultivateDetails) {
                                    popupContent += `
                <div>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_flat</span><b> Current Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.current_prod} tonnes<br>
                <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">trending_up</span><b> Expected Prod: <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; position: relative; top: -2px;">weight</span></b>${cultivateDetails.expected_prod} tonnes<br>
                    <!--Region ID: ${cultivateDetails.region_id}<br>-->
                    <!--Softids:<br>-->
                    <br>
                    <span class="soildata-pill" style="background-color: #4CAF50; color: white; padding: 3px 10px; border-radius: 20px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; height: 25px; float: right; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" onclick="toggleSoilData(this)">
                    <i class="material-symbols-outlined" style="margin-right: 3px; font-size: 16px;">science</i>
                    <span class="toggle-text" style="white-space: nowrap;">View soil data</span>
                </span>                
                <div class="soil-data" style="display:none;">
                    <br>
                    <br>
                    <br>
                `;

                                    const nutritionDataPromises = cultivateDetails.softids.map(async softid => {
                                        const nutritionData = await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`, {
                                            method: 'POST',
                                            headers: {
                                                'accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ region_id: cultivateDetails.region_id })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                const matchingValues = data.content.find(item => item.in_depth === softid.in_depth)?.values;
                                                if (matchingValues) {
                                                    const latestIndex = matchingValues.created_at.length - 1;
                                                    return {
                                                        npk: matchingValues.npk[latestIndex],
                                                        moist: matchingValues.moist[latestIndex],
                                                        pH: matchingValues.pH[latestIndex],
                                                        t: matchingValues.t[latestIndex],
                                                        created_at: matchingValues.created_at[latestIndex],
                                                    };
                                                }
                                                return null;
                                            })
                                            .catch(error => {
                                                console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`, error);
                                                return null;
                                            });

                                        if (nutritionData) {
                                            popupContent += `
                                            <div style="position: relative; display: flex; align-items: center;">
                                                In Depth: ${softid.in_depth} (${softid.in_depth_label})
                                                <span class="material-symbols-outlined chevron-forward" style="position: absolute; right: 0; font-size: 12px; cursor: pointer;">chevron_forward</span>
                                            </div>

                                                    

                                                    
                                                    <div style="display: flex; flex-wrap: wrap;">
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">bubble_chart</span>
                                                            <b>NPK:</b> ${nutritionData.npk}<br>
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px;">humidity_mid</span>
                                                            <b>Moist:</b> ${nutritionData.moist}<br>
                                                        </div>
                                                        <div style="flex: 1 1 50%;">
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">water_ph</span>
                                                            <b>pH:</b> ${nutritionData.pH}<br>    
                                                            <span class="material-symbols-outlined" style="font-size: 12px; margin-right: -1px; margin-left: 7px;">device_thermostat</span>
                                                            <b>Temp:</b> ${nutritionData.t}<br>
                                                        </div>
                                                    </div>
                                                    <span style="font-size: 10px;">
                                                        <i class="material-symbols-outlined" style="vertical-align: middle; font-size: 12px;">schedule</i>
                                                        <i style="vertical-align: middle;">last update: ${nutritionData.created_at}</i>
                                                    </span><br>
                                                    <br>
                                                `;
                                        } else {
                                            popupContent += `
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>-->
                                                `;
                                        }
                                    });

                                    await Promise.all(nutritionDataPromises);
                                    popupContent += `</div></div>`;
                                } else {
                                    popupContent += `<br><i>Error fetching cultivate details</i>`;
                                }

                                return popupContent;
                            });



                                Promise.all(cultivateDetailsPromises)
                                .then(cultivateDetails => {
                                    popupContent = cultivateDetails.join('');
                                    popupContent += '</p>'; // Close popup content
                                    marker.bindPopup(popupContent);
                            
                                    // Add click event listener to the chevron_forward button
                                    marker.on('popupopen', function() {
                                        const chevronForward = this._popup._contentNode.querySelector('.chevron-forward');
                                        if (chevronForward) {
                                            chevronForward.addEventListener('click', function() {
                                                const popupHistoricalSoilData = document.querySelector('.popup-historicalsoildata');
                                                popupHistoricalSoilData.style.display = 'block';
                                            });
                                        }
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching cultivate details:', error);
                                });




                        } else {
                            popupContent += `<i>No matching cultivate details found</i><br>`;
                            popupContent += '</p>'; // Close popup content
                            marker.bindPopup(popupContent);
                        }
                    } else {
                        popupContent += `<i>Farm details not found</i><br>`;
                        popupContent += '</p>'; // Close popup content
                        marker.bindPopup(popupContent);
                    }

                    // Add marker to marker cluster group
                    markers.addLayer(marker);
                });

                // Add marker cluster group to map
                map.addLayer(markers);

                // Display total device count
                document.getElementById('totalDevicesCount').innerText = totalDevicesCount;

            })
            .catch(error => console.error('Error fetching data:', error));
    }))
    .catch(error => console.error('Error fetching farm details:', error));



//Expands or minimizes soil data results
function toggleSoilData(element) {
    var soilDataDiv = element.nextElementSibling;
    var toggleText = element.querySelector('.toggle-text');
    if (soilDataDiv.style.display === "none") {
        soilDataDiv.style.display = "block";
        toggleText.textContent = "Hide soil data";
    } else {
        soilDataDiv.style.display = "none";
        toggleText.textContent = "View soil data";
    }
}
*/




// Random images of coffee farms
var images = [
    'https://i.ibb.co/jLBvcbF/OIG2-1.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/Wxhg96g/OIG2-3.jpg',
    'https://i.ibb.co/WWpWVdX/OIG4.jpg'
];



/*/ Fetch farm data for two users
axios.all([
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 236
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 260
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
])
    .then(axios.spread((response236, response260) => {
        // Extract farm details from the responses for user 236 and 260
        const farms236 = response236.data.content.data;
        const farms260 = response260.data.content.data;

        // Get farm names from dataset 260
        const farmNames260 = farms260.map(farm => farm.farm_name);

        // Filter out farm details from dataset 236 that exist in dataset 260
        const filteredFarms236 = farms236.filter(farm => !farmNames260.includes(farm.farm_name));

        // Continue with fetching data for map markers
        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                // Filter locations based on farm_name and region_name
                const filteredLocations = data.content.filter(location => {
                    return !(/toàn|test|enfarm|koko/i.test(location.farmname) || /toàn|test|enfarm|koko/i.test(location.region_name));
                });

                // Update totalDevicesCount with the length of filteredLocations array
                var totalDevicesCount = filteredLocations.length;

                // Initialize marker cluster group
                var markers = L.markerClusterGroup();


                // Loop through each location
                filteredLocations.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Find the farm details for the current location from dataset 260
                    const farmDetails260 = farms260.find(farm => farm.farm_name === location.farmname);
                    const farmDetails = farmDetails260; // Using details from dataset 260

                    // Create a custom marker icon with a label for the farm name
                    var customMarker = L.divIcon({
                        className: 'custom-marker',
                        html: `
    <div class="marker2D-label">${location.farmname}</div>
    <img src="${customIcon.options.iconUrl}" class="marker-icon"/>`
                    });

                    // Create the marker with the custom icon
                    var marker = L.marker([location.lat, location.long], { icon: customMarker });*/

/*
// Fetch farm data for two users
axios.all([
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 236
        //user_id: 990
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }),
    axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
        user_id: 260
        //user_id: 261
    }, {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
])
    .then(axios.spread((response236, response260) => {
        // Extract farm details from the responses for user 236 and 260
        const farms236 = response236.data.content.data;
        const farms260 = response260.data.content.data;

        // Get all farm names from both datasets
        const farmNames236 = farms236.map(farm => farm.farm_name);
        const farmNames260 = farms260.map(farm => farm.farm_name);

        // Fetch data for map markers
        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {*/


let totalCurrentProd = 0;
let totalExpectedProd = 0;

const fetchFarmData = async (userIds) => {
    try {
        const requests = userIds.map(userId =>
            axios.post(
                'https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',
                {
                    user_id: userId,
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            )
        );

        const responses = await axios.all(requests);

        const farms = responses.map(response => response.data.content.data);
        const farmNames = farms.flatMap(farm => farm.map(item => item.farm_name));

        fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
            headers: { 'accept': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                // Filter locations based on farm_name and region_name
                const filteredLocations = data.content.filter(location => {
                    return !(/toàn|test|enfarm|koko/i.test(location.farmname) || /toàn|test|enfarm|koko/i.test(location.region_name));
                });

                // Filter locations to include only those present in farmNames
                const associatedLocations = filteredLocations.filter(location => {
                    return farmNames.includes(location.farmname);
                });

                // Update totalDevicesCount with the length of associatedLocations array
                var totalDevicesCount = associatedLocations.length;

                // Variable for Farms needing attention
                var farmsNeedingAttentionCount = 0;

                // Initialize marker cluster group
                var markers = L.markerClusterGroup();

                // Loop through each associated location
                associatedLocations.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Find the farm details for the current location
                    const farmDetails = farms.flatMap(farm => farm).find(farm => farm.farm_name === location.farmname);

                    // Create a custom marker icon with a label for the farm name
                    var customMarker = L.divIcon({
                        className: 'custom-marker',
                        html: `
        <div class="marker2D-label" style="background-color: rgba(0, 0, 0, 0); color: rgb(58, 58, 58); font-size: 12px; font-weight: normal; padding: 3px 6px; border-radius: 10px; margin-right: 8px; white-space: nowrap; font-family: 'Be Vietnam', sans-serif; position: absolute; top: -10px; left: 30px; background-color: #ffffff00; border: none; text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff; display: flex; align-items: center;">
            <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle; margin-right: 4px;">psychiatry</span>
            ${location.farmname}
        </div>
        <img src="${customIcon.options.iconUrl}" class="marker-icon"/>
    `
                    });

                    // Create the marker with the custom icon
                    var marker = L.marker([location.lat, location.long], { icon: customMarker });







                    // Add popup content
                    var popupContent = `
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
    <!--Region name: ${location.region_name}<br>-->`;

                    if (farmDetails) {
                        // Filter cultivates to only those that match both region_name and name
                        const matchingCultivates = farmDetails.cultivates.filter(cultivate => {
                            return cultivate.name === location.region_name;
                        });

                        if (matchingCultivates.length > 0) {
                            popupContent += `
        <br><span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;">grid_on</span> <b>Farm Area:</b> ${farmDetails.farm_area} ha.
        <!--Cultivate IDs: ${matchingCultivates.map(cultivate => cultivate.cultivate_id).join(', ')}-->`;

                            // Add cultivate details
                            const cultivateDetailsPromises = matchingCultivates.map(async cultivate => {
                                popupContent += `
            <br>
            <!--Completed: ${cultivate.is_completed || 'N/A'}<br>-->
            <span class="material-symbols-outlined" style="font-size: 14px; vertical-align: -2px;"><b>psychiatry</span> Tree Type:</b> ${cultivate.tree_type === 0 ? '<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 10px;"> Coffee' : (cultivate.tree_type === 1 ? '<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 10px;"> Durian' : 'N/A')}<br>
            <!--Last Update: ${cultivate.last_update || 'N/A'}<br>-->`;






                                const cultivateDetails = await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`, {
                                    method: 'POST',
                                    headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ cultivate_id: cultivate.cultivate_id })
                                })
                                    .then(response => response.json())
                                    .then(data => data.content)
                                    .catch(error => {
                                        console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`, error);
                                        return null;
                                    });

                                if (cultivateDetails) {
                                    popupContent += `
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
`;

                                    // Update the sums
                                    totalCurrentProd += cultivateDetails.current_prod;
                                    totalExpectedProd += cultivateDetails.expected_prod;



                                    const nutritionDataPromises = cultivateDetails.softids.map(async softid => {
                                        const nutritionData = await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old`, {
                                            method: 'POST',
                                            headers: {
                                                'accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ region_id: cultivateDetails.region_id })
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                const matchingValues = data.content.find(item => item.in_depth === softid.in_depth)?.values;
                                                if (matchingValues) {
                                                    // Find the index of the latest date
                                                    const latestIndex = matchingValues.created_at
                                                        .map((date, index) => ({ date: new Date(date), index }))
                                                        .sort((a, b) => b.date - a.date)[0].index;

                                                    return {
                                                        npk: matchingValues.npk[latestIndex],
                                                        moist: matchingValues.moist[latestIndex],
                                                        pH: matchingValues.pH[latestIndex],
                                                        t: matchingValues.t[latestIndex],
                                                        created_at: matchingValues.created_at[latestIndex],
                                                    };
                                                }
                                                return null;
                                            })
                                            .catch(error => {
                                                console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`, error);
                                                return null;
                                            });

                                        if (nutritionData) {
                                            const circleColorTemp = nutritionData.t < 20 ? "#BA0F30" : (nutritionData.t <= 30 ? "#18A558" : "#BA0F30");
                                            const circleColorpH = nutritionData.pH < 7 ? "#BA0F30" : (nutritionData.pH === 7 ? "#18A558" : "#BA0F30");
                                            const circleColorMoist = (nutritionData.moist <= 22.5 || nutritionData.moist > 55) ? "#BA0F30" : (nutritionData.moist <= 35 ? "#BA0F30" : (nutritionData.moist <= 55 ? "#18A558" : "#BA0F30"));
                                            const npkQuotient = nutritionData.npk / 300;
                                            const circleColorNPK = npkQuotient < 0.5 ? "#BA0F30" : (npkQuotient <= 1 ? "#18A558" : "#BA0F30");

                                            const roundedValue = (value) => value !== null ? value.toFixed(2) : 'null';

                                            // Check if any of the soil data values are in the "needs attention" range
                                            if (circleColorTemp === '#BA0F30' || circleColorpH === '#BA0F30' || circleColorMoist === '#BA0F30' || circleColorNPK === '#BA0F30') {
                                                farmsNeedingAttentionCount++;
                                            }

                                            popupContent += `
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
                                                            `;

                                            // Execute all promises and wait for results
                                            Promise.all(nutritionDataPromises).then(nutritionDataArray => {
                                                // Process nutritionDataArray if needed
                                            }).catch(error => {
                                                console.error('Error processing nutrition data:', error);
                                            });
                                        } else {
                                            popupContent += `
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;Softid: ${softid.softid}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;In Depth: ${softid.in_depth} (${softid.in_depth_label})<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;QR String: ${softid.qr_string}<br>-->
                                                    <!--&nbsp;&nbsp;&nbsp;&nbsp;<i>No nutrition data found</i><br>-->
                                                `;
                                        }

                                    });

                                    await Promise.all(nutritionDataPromises);
                                    popupContent += `</div></div>`;
                                } else {
                                    popupContent += `<br><i>Error fetching cultivate details</i>`;
                                }

                                return popupContent;
                            });


                            Promise.all(cultivateDetailsPromises)
                                .then(cultivateDetails => {
                                    popupContent = cultivateDetails.join('');
                                    popupContent += '</p>'; // Close popup content
                                    marker.bindPopup(popupContent);

                                    marker.on('popupopen', function () {
                                        const showHistoricalSoilDataBtns = this._popup._contentNode.querySelectorAll('.showHistoricalSoilData-btn');
                                        showHistoricalSoilDataBtns.forEach((btn, index) => {
                                            btn.addEventListener('click', (function (idx) {
                                                return function () {
                                                    const popupContent = this.closest('.leaflet-popup-content').innerHTML;
                                                    const regionIdMatch = popupContent.match(/Region ID: (\d+)/);
                                                    const btnContainer = this.parentNode;
                                                    const inDepthMatch = btnContainer.innerHTML.match(/In Depth: (\d+) \((.+?)\)/);

                                                    let regionId, inDepth, inDepthLabel;

                                                    if (regionIdMatch) {
                                                        regionId = regionIdMatch[1];
                                                    } else {
                                                        console.log('Region ID not found in the popup content.');
                                                    }

                                                    if (inDepthMatch) {
                                                        inDepth = inDepthMatch[1];
                                                        inDepthLabel = inDepthMatch[2];
                                                    } else {
                                                        console.log('In Depth not found in the button container.');
                                                    }

                                                    console.log('region_id:', regionId);
                                                    console.log('depth_id:', inDepth);

                                                    const event = new CustomEvent('soilDataRequested', {
                                                        detail: {
                                                            regionId: regionId,
                                                            depthId: inDepth
                                                        }
                                                    });
                                                    window.dispatchEvent(event);

                                                    const popupHistoricalSoilData = document.querySelector('.popup-historicalsoildata');
                                                    popupHistoricalSoilData.style.display = 'block';
                                                };
                                            })(index));
                                        });
                                    });
                                })
                                .catch(error => {
                                    console.error('Error fetching cultivate details:', error);
                                })
                                .finally(() => {
                                    // Update the needAttentionSum element with the count of farms needing attention
                                    document.getElementById('needAttentionSum').innerText = farmsNeedingAttentionCount;

                                    // Update the totalDevicesCountFraction element with the total devices count
                                    document.getElementById('totalDevicesCountFraction').innerText = totalDevicesCount;

                                    // Update the current productivity sum element in tonnes
                                    document.getElementById('currentProductivitySum').innerText = totalCurrentProd.toFixed(2);

                                    // Update the expected productivity sum element in tonnes
                                    document.getElementById('expectedProductivitySum').innerText = totalExpectedProd.toFixed(2);
                                });

                        } else {
                            popupContent += `<i>No matching cultivate details found</i><br>`;
                            popupContent += '</p>'; // Close popup content
                            marker.bindPopup(popupContent);
                        }
                    } else {
                        popupContent += `<br><i>Farm details not found</i><br>`;
                        popupContent += '</p>'; // Close popup content
                        marker.bindPopup(popupContent);
                    }

                    // Add marker to marker cluster group
                    markers.addLayer(marker);
                });



                // Add marker cluster group to map
                map.addLayer(markers);

                // Display total device count
                document.getElementById('totalDevicesCount').innerText = totalDevicesCount;



                // Function to create an icon
                function createIcon(iconUrl, iconSize, popupOffset) {
                    return L.icon({
                        iconUrl: iconUrl,
                        iconSize: iconSize, // size of the icon
                        iconAnchor: [iconSize[0] / 2, iconSize[1]], // mid-center of the icon
                        popupAnchor: popupOffset // point from which the popup should open relative to the iconAnchor
                    });
                }

                // Define the icons with relative paths
                const originalIcon = createIcon('https://i.ibb.co/bWhk7NN/gps-shadow.png', [32, 32], [0, -32]);
                const durianIcon = createIcon('https://i.ibb.co/nnrMSMd/durian-removebg-preview.png', [40, 40], [-3, -28]);
                const coffeeIcon = createIcon('https://i.ibb.co/L6cGsSX/bean-shadow.png', [40, 40], [-3, -40]);
                const pepperIcon = createIcon('https://i.ibb.co/WxVZrLN/icons8-pepper-96.png', [40, 40], [-3, -30]);
                const teaIcon = createIcon('https://i.ibb.co/RCnz5gb/icons8-tea-leaves-64.png', [40, 40], [-3, -30]);

                // Warning icon using a relative path
                const warningIcon = createIcon('images/icons8-warning.gif', [30, 30], [0, -40]);



                // Function to toggle farms based on type
                function toggleFarms(button, farmType, farmIcon, activeClass, markersGroup) {
                    let showingFarms = false;
                    let farmMarkers;

                    button.addEventListener('click', function () {
                        if (!showingFarms) {
                            // Remove all existing markers from the map
                            map.removeLayer(markersGroup);

                            // Create a new marker cluster group for the specified farm type
                            farmMarkers = L.markerClusterGroup();

                            // Loop through each marker and check if it's the specified farm type
                            markers.eachLayer(function (marker) {
                                const popupContent = marker.getPopup().getContent();

                                // Check if the popup content contains the farm type
                                if (popupContent.includes(farmType)) {
                                    // Change the icon of the marker to the specified farm icon
                                    marker.setIcon(farmIcon);
                                    // Add the marker to the farmMarkers group
                                    farmMarkers.addLayer(marker);
                                }
                            });

                            // Add the farmMarkers group to the map
                            map.addLayer(farmMarkers);

                            // Update button style
                            button.classList.add(activeClass);
                            showingFarms = true;
                        } else {
                            // Remove all existing markers from the map
                            map.removeLayer(farmMarkers);

                            // Revert the icons of the markers to the original icon
                            markers.eachLayer(function (marker) {
                                const popupContent = marker.getPopup().getContent();
                                if (popupContent.includes(farmType)) {
                                    marker.setIcon(originalIcon);
                                }
                            });

                            // Add the original markers group to the map
                            map.addLayer(markers);

                            // Update button style
                            button.classList.remove(activeClass);
                            showingFarms = false;
                        }
                    });
                }

                // Define the button elements
                const durianButton = document.querySelector('.durianTrees-filter');
                const coffeeButton = document.querySelector('.coffeeTrees-filter');
                const pepperButton = document.querySelector('.pepperFarms-filter');
                const teaButton = document.querySelector('.teaFarms-filter');

                // Attach event listeners to the buttons
                toggleFarms(durianButton, 'Durian', durianIcon, 'active-durian', markers);
                toggleFarms(coffeeButton, 'Coffee', coffeeIcon, 'active-coffee', markers);
                toggleFarms(pepperButton, 'Pepper', pepperIcon, 'active-pepper', markers);
                toggleFarms(teaButton, 'Tea', teaIcon, 'active-tea', markers);

                // Add event listener to the "Needs Attention" button
                const needsAttentionButton = document.querySelector('.needs-attention');
                let showingAllFarms = true;
                let needsAttentionMarkers;

                needsAttentionButton.addEventListener('click', toggleFarmView);

                // Function to toggle between showing all farms and farms needing attention
                function toggleFarmView() {
                    if (showingAllFarms) {
                        // Remove all existing markers from the map
                        map.removeLayer(markers);

                        // Create a new marker cluster group for farms needing attention
                        needsAttentionMarkers = L.markerClusterGroup();

                        // Loop through each marker and check if it needs attention
                        markers.eachLayer(function (marker) {
                            const popupContent = marker.getPopup().getContent();

                            // Check if the popup content contains the "glow red" animation
                            if (popupContent.includes('animation: glowRed')) {
                                // Change the icon of the marker to Warning icon
                                marker.setIcon(warningIcon);
                                // Add the marker to the needsAttentionMarkers group
                                needsAttentionMarkers.addLayer(marker);
                            }
                        });

                        // Add the needsAttentionMarkers group to the map
                        map.addLayer(needsAttentionMarkers);

                        // Update button style and text
                        needsAttentionButton.classList.add('active-needs-attention');
                        needsAttentionButton.innerHTML = '<div style="display: inline-block; position: relative;">' +
                            '<i class="material-symbols-outlined" style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); font-size: 24px; color: white;">psychiatry</i>' +
                            '<span style="padding-left: 28px;">Show all farms</span>' +
                            '</div>';
                        showingAllFarms = false;

                    } else {
                        // Remove all existing markers from the map
                        map.removeLayer(needsAttentionMarkers);

                        // Revert the icons of the markers to the original icon
                        markers.eachLayer(function (marker) {
                            const popupContent = marker.getPopup().getContent();
                            if (popupContent.includes('animation: glowRed')) {
                                marker.setIcon(originalIcon);
                            }
                        });

                        // Add the original markers group to the map
                        map.addLayer(markers);

                        // Update button style and text
                        needsAttentionButton.classList.remove('active-needs-attention');
                        needsAttentionButton.innerHTML = `
            <div id="lottie-container" style="width: 24px; height: 24px;"></div>
            Attention
            <span class="tooltip-right">Show farms needing attention</span>
        `;
                        showingAllFarms = true;

                        // Load the Lottie animation
                        lottie.loadAnimation({
                            container: document.getElementById('lottie-container'),
                            renderer: 'svg',
                            loop: true,
                            autoplay: true,
                            path: 'https://lottie.host/41453d5b-98f5-4478-ae32-24ffb6f5ff63/wN5fPgSl5x.json' // Lottie animation URL
                        });
                    }
                }

            })
            .catch(error => console.error('Error fetching data:', error));
    } catch (error) {
        console.error('Error fetching farm details:', error);
    }
};


// Call the function with an array of user IDs
//fetchFarmData([236, 260, 261, 990]);

// Call the function with the user IDs from authenticateduser.js
fetchFarmData(authenticatedUserIDs);







//Toggle button to expand or minimize soil data results
function toggleSoilData(element) {
    var soilDataDiv = element.nextElementSibling;
    var toggleText = element.querySelector('.toggle-text');
    if (soilDataDiv.style.display === "none") {
        soilDataDiv.style.display = "block";
        toggleText.textContent = "Hide soil data";
    } else {
        soilDataDiv.style.display = "none";
        toggleText.textContent = "View soil data";
    }
}


//Function to replace 3D text with elevation icon on hover
function showIcon(element) {
    var icon = element.querySelector('#icon');
    if (icon) {
        icon.style.display = 'inline-flex'; // Show the icon
    }
}

function hideIcon(element) {
    var icon = element.querySelector('#icon');
    if (icon) {
        icon.style.display = 'none'; // Hide the icon
    }
}

// Function to log the Lat Long value and store in localStorage when the view in 3D button is clicked
function logLatLong(lat, long) {
    console.log("Longitude:", long);
    console.log("Latitude:", lat);

    // Store the coordinates in localStorage
    localStorage.setItem('mapboxLat', lat);
    localStorage.setItem('mapboxLong', long);

    // Open the 3D map page
    window.open('mapbox3D.html', '_blank');
}









