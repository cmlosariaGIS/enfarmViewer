let currentFarmData=[];let userProfiles={};let uniqueFarmUsers=[];const toggleFarmList=()=>{const farmListPopup=document.getElementById('popup-farmlist');farmListPopup.classList.toggle('show');if(farmListPopup.classList.contains('show')){fetchFarmListData(authenticatedUserIDs);}};const hideFarmList=()=>{document.getElementById('popup-farmlist').classList.remove('show');};const flyToFarmLocation3D=async(farmName)=>{try{const response=await fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'},});const{content:locations}=await response.json();const farmLocation=locations.find(location=>location.farmname===farmName);if(farmLocation){const lngLat=new mapboxgl.LngLat(farmLocation.long,farmLocation.lat);const zoomLevel=18;map.flyTo({center:lngLat,zoom:zoomLevel,speed:1});}else{console.log(`Farm location not found for farm name: ${farmName}`);}}catch(error){console.error('Error fetching farm location:',error);}};async function getFarmThumbnail(farmId){try{const response=await axios.post('https://api-router.enfarm.com/api/v3/farm/retrieve-farm-detail',{farm_id:farmId},{headers:{accept:'application/json','Content-Type':'application/json'}});const farmThumbnail=response.data.content.data.farm_thumbnail;return farmThumbnail||'images/noimage.jfif';}catch(error){console.error('Error fetching farm thumbnail:',error);return'images/noimage.jfif';}}
const fetchUserProfile=async(userId)=>{try{const response=await fetch('https://api-router.enfarm.com/api/v2/user/get-user-profile',{method:'POST',headers:{'Content-Type':'application/json',},body:JSON.stringify({user_id:userId}),});const data=await response.json();if(data.status_code===200&&data.content){userProfiles[userId]=data.content;}}catch(error){console.error('Error fetching user profile:',error);}};const fetchFarmListData=async(userIds)=>{try{const farmRequests=userIds.map(userId=>axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:userId},{headers:{'accept':'application/json','Content-Type':'application/json'}}));const userRequests=userIds.map(userId=>fetch('https://api-router.enfarm.com/api/v2/user/get-user-profile',{method:'POST',headers:{'Content-Type':'application/json',},body:JSON.stringify({user_id:userId}),}).then(response=>response.json()));const[farmResponses,userResponses]=await Promise.all([Promise.all(farmRequests),Promise.all(userRequests)]);currentFarmData=farmResponses.flatMap((response,index)=>{const userId=userIds[index];const userProfile=userResponses[index].content;return response.data.content.data.map(farm=>({...farm,userId:userId,userName:userProfile.user_name||'N/A',userPhone:userProfile.user_phone||'N/A'}));});uniqueFarmUsers=[...new Set(currentFarmData.map(farm=>farm.userName))];populateUserFilterOptions();displayFarmList(currentFarmData);}catch(error){console.error('Error fetching farm details:',error);}};const farmNeedsAttention=async(farm)=>{if(!farm.cultivates&&!farm.sensor_lst){console.warn('Farm has neither cultivates nor sensor_lst:',farm);return false;}
const itemsToCheck=farm.cultivates||farm.sensor_lst||[];const checkPromises=itemsToCheck.map(async item=>{const cultivateId=item.cultivate_id||item.id;if(!cultivateId){console.warn('No cultivate_id or id found for item:',item);return false;}
const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivateId})}).then(response=>response.json()).then(data=>data.content).catch(error=>{console.error('Error fetching cultivate details:',error);return null;});if(cultivateDetails&&cultivateDetails.softids){const nutritionDataPromises=cultivateDetails.softids.map(async softid=>{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivateId})}).then(response=>response.json()).then(data=>{const matchingValues=data.content.find(item=>item.in_depth===softid.in_depth)?.values;if(matchingValues){const latestIndex=matchingValues.created_at.map((date,index)=>({date:new Date(date),index})).sort((a,b)=>b.date-a.date)[0].index;return{npk:matchingValues.npk?matchingValues.npk[latestIndex]:null,nts:matchingValues.nts?matchingValues.nts[latestIndex]:null,k2o:matchingValues.k2o?matchingValues.k2o[latestIndex]:null,p2o5:matchingValues.p2o5?matchingValues.p2o5[latestIndex]:null,moist:matchingValues.moist[latestIndex],pH:matchingValues.pH[latestIndex],t:matchingValues.t[latestIndex],created_at:matchingValues.created_at[latestIndex],};}
return null;}).catch(error=>{return null;});if(nutritionData){const{t,pH,moist,npk,nts,p2o5,k2o}=nutritionData;const npkQuotient=npk/300;return(t<20||t>30||pH<7||pH>7||moist<=22.5||moist>55||npkQuotient<0.5||npkQuotient>1||(nts!==null&&(nts<0.1||nts>0.2))||(p2o5!==null&&(p2o5<20||p2o5>60))||(k2o!==null&&(k2o<100||k2o>200)));}
return false;});const nutritionDataResults=await Promise.all(nutritionDataPromises);return nutritionDataResults.some(result=>result);}
return false;});const checkResults=await Promise.all(checkPromises);return checkResults.some(result=>result);};const createFarmItem=async(farm)=>{const farmThumbnail=await getFarmThumbnail(farm.farm_id);const treeTypesOrder=[0,1,2,3];const treeTypeImages=['<img src="images/icons8-coffee-beans-96.png" alt="Coffee Beans" style="width: 20px;">','<img src="images/icons8-durian-64.png" alt="Durian" style="width: 20px;">','<img src="images/icons8-pepper-96.png" alt="Pepper" style="width: 20px;">','<img src="images/icons8-tea-leaves-64.png" alt="Tea" style="width: 20px;">'];const treeTypes=treeTypesOrder.map(type=>{const foundType=farm.cultivates&&farm.cultivates.find(cultivate=>cultivate.tree_type===type);return foundType?treeTypeImages[type]:'';}).filter(Boolean);const lastUpdateDate=farm.cultivates&&farm.cultivates.length>0?new Date(Math.max(...farm.cultivates.map(cultivate=>new Date(cultivate.last_update)).filter(date=>!isNaN(date.getTime())))):(farm.farm_last_action_day?new Date(farm.farm_last_action_day):new Date());const formattedDate=!isNaN(lastUpdateDate.getTime())?lastUpdateDate.toISOString().split('T')[0]:'N/A';const needsAttention=await farmNeedsAttention(farm);return`
        <div class="farm-item" data-farm-name="${farm.farm_name || farm.name}">
            <div class="farm-image-container" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.01)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
                <img src="${farmThumbnail}" alt="Farm Image" class="parallax-img" style="object-fit: cover; width: 100%; height: 100%;" />
                <div class="tree-types-overlay">
                    ${treeTypes.map(treeType => `<span>${treeType}</span>`).join('')}
                </div>
            </div>
            <div class="farm-details">
                <div class="farm-title">
                    ${farm.farm_name || farm.name}
                    ${needsAttention ? `<div class="needs-attention-glow"><span class="tooltip-left">This farm needs attention</span></div>` : `<!--<div class="dont-need-attention"><span class="tooltip-left">This farm's soil status is ok</span>
                        </div>-->
                    `}
                </div>
                <br>
                <div class="farm-address">
                    <span class="material-symbols-outlined location-icon">location_on</span>
                    <span>${farm.farm_address || farm.address || 'N/A'}</span>
                </div>
                <div class="farm-area">
                    <span class="material-symbols-outlined grid-icon">grid_on</span>
                    <span>${farm.farm_area || 'N/A'} hectares</span>
                </div>
                <div class="farm-last-update">
                    <span class="material-symbols-outlined update-icon">update</span>
                    <span data-translate="Last updated:">Last updated:</span>
                    <span class="last-update-date"><i>${formattedDate}</i></span>
                </div>
                <div class="farm-user">
                    <span class="material-symbols-outlined person-icon">person</span>
                    <span>${farm.userName || 'N/A'}</span>
                </div>
                <div class="farm-phone">
                    <span class="material-symbols-outlined phone-icon">phone</span>
                    <span>${farm.userPhone || 'N/A'}</span>
                    <button class="copy-phone-btn" onclick="copyToClipboard('${farm.userPhone||''}')">
                        <span class="material-symbols-outlined">content_paste</span>
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Make sure to call fetchFarmListData with authenticatedUserIDs when initializing
document.addEventListener('DOMContentLoaded', () => {
    fetchFarmListData(authenticatedUserIDs);
});

// Function to display the farm list
const displayFarmList = async (farms) => {
    const farmListContainer = document.getElementById('farm-list-container');
    const farmItemsHTML = await Promise.all(farms.map(farm => createFarmItem(farm)));
    farmListContainer.innerHTML = farmItemsHTML.join('');

    const farmItems = document.querySelectorAll('.farm-item');
    farmItems.forEach((item, index) => {
        item.addEventListener('click', () => flyToFarmLocation3D(item.dataset.farmName));
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'opacity 0.5s ease-out,transform 0.5s ease-out';
        }, (index + 1) * 300);
    });

    // Add this line to translate all elements after populating the farm list
    translateAllElements();
};

const displaySortingMessage = () => {
    const farmListContainer = document.getElementById('farm-list-container');
    const sortingText = getTranslatedText("Sorting");
    farmListContainer.innerHTML = `<div class="sorting-message" data-translate="Sorting">${sortingText}</div>`;
};

const sortFarmList = (sortBy) => {
    displaySortingMessage();

    let sortedFarms = [...currentFarmData];
    switch (sortBy) {
        case 'status':
            Promise.all(sortedFarms.map(farm => farmNeedsAttention(farm)))
                .then(needsAttentionStatuses => {
                    sortedFarms.sort((a, b) => {
                        const aIndex = sortedFarms.indexOf(a);
                        const bIndex = sortedFarms.indexOf(b);
                        return needsAttentionStatuses[bIndex] - needsAttentionStatuses[aIndex];
                    });
                    displayFarmList(sortedFarms);
                });
            break;
        case 'size':
            sortedFarms.sort((a, b) => (b.farm_area || 0) - (a.farm_area || 0));
            displayFarmList(sortedFarms);
            break;
        case 'lastUpdated':
            sortedFarms.sort((a, b) => {
                const aLastUpdate = new Date(Math.max(...a.cultivates.map(cultivate => new Date(cultivate.last_update))));
                const bLastUpdate = new Date(Math.max(...b.cultivates.map(cultivate => new Date(cultivate.last_update))));
                return bLastUpdate - aLastUpdate;
            });
            displayFarmList(sortedFarms);
            break;
        case 'name':
            sortedFarms.sort((a, b) => a.farm_name.localeCompare(b.farm_name));
            displayFarmList(sortedFarms);
            break;
        case 'produce':
            sortedFarms.sort((a, b) => {
                const aProduceType = getMainProduceType(a);
                const bProduceType = getMainProduceType(b);

                // First, compare farms with multiple produce types
                if (aProduceType.length > 1 && bProduceType.length === 1) {
                    return -1; // a should come before b
                } else if (aProduceType.length === 1 && bProduceType.length > 1) {
                    return 1; // b should come before a
                } else {
                    // Both have multiple or single produce types, compare based on the predefined order
                    const produceOrder = { 'coffee': 1, 'durian': 2, 'pepper': 3, 'tea': 4 };
                    return produceOrder[aProduceType] - produceOrder[bProduceType];
                }
            });
            displayFarmList(sortedFarms);
            break;
        default:
            break;
    }
};

// Helper function to get the main produce type(s) of a farm
const getMainProduceType = (farm) => {
    const treeTypes = farm.cultivates.map(cultivate => cultivate.tree_type);
    const produceTypes = treeTypes.reduce((types, type) => {
        switch (type) {
            case 0:
                types.add('coffee');
                break;
            case 1:
                types.add('durian');
                break;
            case 2:
                types.add('pepper');
                break;
            case 3:
                types.add('tea');
                break;
            default:
                break;
        }
        return types;
    }, new Set());

    return Array.from(produceTypes);
};


//Filter
document.getElementById('filter-button').addEventListener('click', function() {
    const filterPanel = document.getElementById('filter-panel');
    if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
        filterPanel.style.display = 'block';
    } else {
        filterPanel.style.display = 'none';
    }
});

// Toggle filter panel visibility
function toggleFilterPanel() {
    const filterPanel = document.getElementById('filter-panel');
    if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
        filterPanel.style.display = 'block';
    } else {
        filterPanel.style.display = 'none';
    }
}

// Function to clear the filter
function clearFilter() {
    const radioButtons = document.querySelectorAll('input[name="farm-user"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    displayFarmList(currentFarmData);
    toggleFilterPanel();
}

// Update the existing applyFilter function
function applyFilter() {
    const selectedUser = document.querySelector('input[name="farm-user"]:checked')?.value;
    if (selectedUser) {
        const filteredFarms = currentFarmData.filter(farm => farm.userName === selectedUser);
        displayFarmList(filteredFarms);
    } else {
        displayFarmList(currentFarmData);
    }
    toggleFilterPanel();
}

// Update the event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchFarmListData(authenticatedUserIDs);
    document.getElementById('apply-filter').addEventListener('click', applyFilter);
    document.getElementById('clear-filter').addEventListener('click', clearFilter);
});

// Function to populate user filter options with farm count
function populateUserFilterOptions() {
    const userFilterOptions = document.getElementById('user-filter-options');
    userFilterOptions.innerHTML = '';

    // Count farms for each user
    const userFarmCounts = currentFarmData.reduce((counts, farm) => {
        counts[farm.userName] = (counts[farm.userName] || 0) + 1;
        return counts;
    }, {});

    // Sort uniqueFarmUsers alphabetically
    uniqueFarmUsers.sort((a, b) => a.localeCompare(b));

    uniqueFarmUsers.forEach((user, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'farm-user';
        input.value = user;
        input.id = `user-${index}`;

        const farmCount = userFarmCounts[user] || 0;
        const farmText = farmCount === 1 ? 'farm' : 'farms';

        label.appendChild(input);
        label.appendChild(document.createTextNode(`${user} (${farmCount} ${farmText})`));

        userFilterOptions.appendChild(label);
    });
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        // For modern browsers
        navigator.clipboard.writeText(text).then(() => {
            alert('Phone number copied to clipboard!');
        }).catch((err) => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        let textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";  // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Phone number copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:'