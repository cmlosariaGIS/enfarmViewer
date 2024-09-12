// Sum Total Farm Area

async function retrieveFarmData(userId) {
    try {
        const response = await axios.post('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
            user_id: userId
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data.content.data;
    } catch (error) {
        console.error(`There has been a problem with your fetch operation for user ${userId}:`, error);
    }
}

function calculateTotalFarmArea(data) {
    let totalArea = 0;
    data.forEach(farm => {
        if (farm.farm_area) {
            totalArea += farm.farm_area;
        }
    });
    return totalArea;
}

async function updateTotalFarmArea() {
    //const userID = [236, 260, 261, 990];
    const userID = authenticatedUserIDs;
    let totalArea = 0;

    for (const userId of userID) {
        const farms = await retrieveFarmData(userId);
        if (farms) {
            totalArea += calculateTotalFarmArea(farms);
        }
    }

    // Update the HTML element with the total farm area sum
    const totalFarmAreaSumElement = document.getElementById('totalFarmAreaSum');
    totalFarmAreaSumElement.textContent = `${totalArea}`;

    // Update the hectaresElement and separate div with the actual total farm area sum
    document.getElementById('hectaresCount').innerText = totalArea;
    document.getElementById('totalFarmAreaSum').innerText = totalArea;
}

// Fetch and update the total farm area on page load
window.onload = updateTotalFarmArea;
