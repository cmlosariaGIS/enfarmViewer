let currentFarmData=[];var images=['https://i.ibb.co/jLBvcbF/OIG2-1.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/Wxhg96g/OIG2-3.jpg','https://i.ibb.co/WWpWVdX/OIG4.jpg'];const toggleFarmList=()=>{const farmListPopup=document.getElementById('popup-farmlist');farmListPopup.classList.toggle('show');if(farmListPopup.classList.contains('show')){fetchFarmListData(authenticatedUserIDs)}};const hideFarmList=()=>{document.getElementById('popup-farmlist').classList.remove('show')};const flyToFarmLocation3D=async(farmName)=>{try{const response=await fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'},});const{content:locations}=await response.json();const farmLocation=locations.find(location=>location.farmname===farmName);if(farmLocation){const lngLat=new mapboxgl.LngLat(farmLocation.long,farmLocation.lat);const zoomLevel=18;map.flyTo({center:lngLat,zoom:zoomLevel,speed:1})}else{console.log(`Farm location not found for farm name: ${farmName}`)}}catch(error){console.error('Error fetching farm location:',error)}};const fetchFarmListData=async(userIds)=>{try{const requests=userIds.map(userId=>axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',{user_id:userId},{headers:{'accept':'application/json','Content-Type':'application/json'}}));const responses=await axios.all(requests);currentFarmData=responses.flatMap(response=>response.data.content.data);displayFarmList(currentFarmData)}catch(error){console.error('Error fetching farm details:',error)}};const farmNeedsAttention=async(farm)=>{const cultivateDetailsPromises=farm.cultivates.map(async cultivate=>{const cultivateDetails=await fetch(`https://api-router.enfarm.com/api/v3/cultivate/retrieve-cultivate-tree`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({cultivate_id:cultivate.cultivate_id})}).then(response=>response.json()).then(data=>data.content).catch(error=>{console.error(`Error fetching cultivate details for cultivate_id ${cultivate.cultivate_id}:`,error);return null});if(cultivateDetails){const nutritionDataPromises=cultivateDetails.softids.map(async softid=>{const nutritionData=await fetch(`https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old`,{method:'POST',headers:{'accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({region_id:cultivateDetails.region_id})}).then(response=>response.json()).then(data=>{const matchingValues=data.content.find(item=>item.in_depth===softid.in_depth)?.values;if(matchingValues){const latestIndex=matchingValues.created_at.map((date,index)=>({date:new Date(date),index})).sort((a,b)=>b.date-a.date)[0].index;return{npk:matchingValues.npk[latestIndex],moist:matchingValues.moist[latestIndex],pH:matchingValues.pH[latestIndex],t:matchingValues.t[latestIndex],created_at:matchingValues.created_at[latestIndex],}}
return null}).catch(error=>{console.error(`Error fetching nutrition data for region_id ${cultivateDetails.region_id} and in_depth ${softid.in_depth}:`,error);return null});if(nutritionData){const{t,pH,moist,npk}=nutritionData;const npkQuotient=npk/300;return(t<20||t>30||pH<7||pH>7||moist<=22.5||moist>55||npkQuotient<0.5||npkQuotient>1)}});const nutritionDataResults=await Promise.all(nutritionDataPromises);return nutritionDataResults.some(result=>result)}
return!1});const cultivateDetailsResults=await Promise.all(cultivateDetailsPromises);return cultivateDetailsResults.some(result=>result)};const createFarmItem=async(farm)=>{const randomImage=images[Math.floor(Math.random()*images.length)];const treeTypesOrder=[0,1,2,3];const treeTypeImages=['<img src="https://i.ibb.co/n0wJnyq/icons8-coffee-beans-48.png" alt="Coffee Beans" style="width: 20px;">','<img src="https://i.ibb.co/gV8W7kL/icons8-durian-64.png" alt="Durian" style="width: 20px;">','<img src="https://example.com/pepper.png" alt="Pepper" style="width: 20px;">','<img src="https://example.com/tea.png" alt="Tea" style="width: 20px;">'];const treeTypes=treeTypesOrder.map(type=>{const foundType=farm.cultivates.find(cultivate=>cultivate.tree_type===type);return foundType?treeTypeImages[type]:''}).filter(Boolean);const lastUpdateDate=new Date(Math.max(...farm.cultivates.map(cultivate=>new Date(cultivate.last_update)))).toISOString().split('T')[0];const needsAttention=await farmNeedsAttention(farm);return `
        <div class="farm-item" data-farm-name="${farm.farm_name}">
            <div class="farm-image-container" onmouseover="this.querySelector('.parallax-img').style.transform = 'scale(1.01)'" onmouseout="this.querySelector('.parallax-img').style.transform = 'scale(1)'">
                <img src="${randomImage}" alt="Farm Image" class="parallax-img" />
            </div>
            <div class="farm-details">
                <div class="farm-title">
                    ${farm.farm_name}
                    ${needsAttention ? `<div class="needs-attention-glow"><span class="tooltip-left">This farm needs attention</span></div>` : `<div class="dont-need-attention"><span class="tooltip-left">This farm's soil status is ok</span>
                        </div>
                    `}
                </div>
                <div class="tree-types">
                    ${treeTypes.map(treeType => `
                        <span>${treeType}</span>
                    `).join('')}
                </div>
                <div class="farm-address">
                    <span class="material-symbols-outlined location-icon">location_on</span>
                    <span>${farm.farm_address || 'N/A'}</span>
                </div>
                <div class="farm-area">
                    <span class="material-symbols-outlined grid-icon">grid_on</span>
                    <span>${farm.farm_area} hectares</span>
                </div>
                <div class="farm-last-update">
                    <span class="material-symbols-outlined update-icon">update</span>
                    <span><i>Last updated: ${lastUpdateDate}</i></span>
                </div>
            </div>
        </div>
    `;
};




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
};


// Function to display the "Sorting..." message
const displaySortingMessage = () => {
    const farmListContainer = document.getElementById('farm-list-container');
    farmListContainer.innerHTML = '<div class="sorting-message">Sorting...</div>';
};


/*
// Function to sort the farm list
const sortFarmList = (sortBy) => {
    displaySortingMessage();

    let sortedFarms = [...currentFarmData];
    switch (sortBy) {
        case 'status':
            // Sort farms based on their status (needs attention first)
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
    }
};*/

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
                types.add('tea');break;default:break}
return types},new Set());return Array.from(produceTypes)}