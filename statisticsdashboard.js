let treeTypeChart; // Declare the chart variable globally

// Function to fetch farm data and update the HTML
async function updateFarmInfo() {
    const userIds = authenticatedUserIDs;

    console.log('Authenticated User IDs:', userIds);

    if (userIds.length === 0) {
        console.error('No authenticated user IDs found');
        return;
    }

    const apiUrl = 'https://api-ma.enfarm.com/api/v1/en/general-farm-info-per-user';
    let farmData = {
        totalFarmCount: 0,
        totalFarmArea: 0,
        totalSensors: 0,
        totalBoxes: 0,
        totalGateways: 0,
        totalCurrentProductivity: 0,
        totalExpectedProductivity: 0,
        farmsNeedingAttention: 0,
        treeCounts: {
            coffee: 0,
            durian: 0,
            pepper: 0,
            tea: 0,
            otherPlants: 0
        }
    };

    // Fetch data for all users
    for (const userId of userIds) {
        try {
            console.log(`Fetching data for user ID: ${userId}`);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`API response for user ID ${userId}:`, data);

            if (data.status_code === 200 && data.content) {
                processUserData(data.content, farmData);
            } else {
                console.error('Unexpected API response structure for user ID:', userId, data);
            }
        } catch (error) {
            console.error('Error fetching farm data for user ID:', userId, error);
        }
    }

    // Calculate averages
    const avgCurrentProductivity = farmData.totalFarmCount > 0 ? farmData.totalCurrentProductivity / farmData.totalFarmCount : 0;
    const avgExpectedProductivity = farmData.totalFarmCount > 0 ? farmData.totalExpectedProductivity / farmData.totalFarmCount : 0;

    // Log totals
    console.log('Farm Data:', farmData);
    console.log('Average Current Productivity:', avgCurrentProductivity);
    console.log('Average Expected Productivity:', avgExpectedProductivity);

    // Update UI
    updateUI(farmData, avgCurrentProductivity, avgExpectedProductivity);

    // Update the pie chart
    updateTreeTypeChart(farmData.treeCounts);
}

// Helper function to process user data
function processUserData(content, farmData) {
    console.log('Processing user data:', content);

    if (!content.general) {
        console.error('Expected "general" key not found in API response');
        return;
    }

    const general = content.general;

    // Process general farm data
    farmData.totalFarmCount += parseInt(general.farm_number, 10) || 0;
    farmData.totalFarmArea += parseFloat(general.total_area) || 0;
    farmData.totalSensors += parseInt(general.total_sennsor, 10) || 0;
    farmData.totalBoxes += parseInt(general.total_box, 10) || 0;
    farmData.totalGateways += parseInt(general.total_gw, 10) || 0;
    farmData.totalCurrentProductivity += (parseFloat(general.avg_prod) || 0) * (parseInt(general.farm_number, 10) || 0);
    farmData.totalExpectedProductivity += (parseFloat(general.avg_exp) || 0) * (parseInt(general.farm_number, 10) || 0);

    // Process tree types
    if (Array.isArray(general.tree_types)) {
        general.tree_types.forEach(tree => {
            const treeCount = parseInt(tree.tree_number, 10) || 0;
            switch (tree.tree_type) {
                case 0: farmData.treeCounts.coffee += treeCount; break;
                case 1: farmData.treeCounts.durian += treeCount; break;
                case 2: farmData.treeCounts.pepper += treeCount; break;
                case 3: farmData.treeCounts.tea += treeCount; break;
                case -1: farmData.treeCounts.otherPlants += treeCount; break;
                default: console.warn(`Unknown tree type: ${tree.tree_type}`);
            }
        });
    }

    // Process alerts
    if (Array.isArray(content.alerts)) {
        content.alerts.forEach(farm => {
            if (Array.isArray(farm.alert) && farm.alert.some(alert => !alert.is_good)) {
                farmData.farmsNeedingAttention++;
            }
        });
    }

    console.log('Updated farm data:', farmData);
}

// Helper function to update UI
function updateUI(farmData, avgCurrentProductivity, avgExpectedProductivity) {
    console.log('Updating UI with:', farmData, avgCurrentProductivity, avgExpectedProductivity);

    updateElement('totalfarmCount', farmData.totalFarmCount);
    updateElement('totalFarmAreaSum', farmData.totalFarmArea.toFixed(1));
    updateElement('totalSensorsCount', farmData.totalSensors);
    updateElement('totalBoxesCount', farmData.totalBoxes);
    updateElement('totalGatewaysCount', farmData.totalGateways);
    updateElement('currentProductivitySum', avgCurrentProductivity.toFixed(1));
    updateElement('expectedProductivitySum', avgExpectedProductivity.toFixed(1));

    // Update tree type counts
    updateElement('totalcoffeefarmsCount', farmData.treeCounts.coffee);
    updateElement('totaldurianfarmsCount', farmData.treeCounts.durian);
    updateElement('totalpepperfarmsCount', farmData.treeCounts.pepper);
    updateElement('totalteafarmsCount', farmData.treeCounts.tea);
    updateElement('totalotherplantsfarmsCount', farmData.treeCounts.otherPlants);

    // Update farms needing attention
    updateElement('needAttentionSum', farmData.farmsNeedingAttention);
    updateElement('totalDevicesCountFraction', farmData.totalFarmCount);
}

// Helper function to update HTML elements
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    } else {
        console.error(`Element with id "${id}" not found`);
    }
}

// Function to update or create the tree type chart
function updateTreeTypeChart(treeCounts) {
    const ctx = document.getElementById('treeTypeChart').getContext('2d');

    const data = {
        labels: getTranslatedLabels(),
        datasets: [{
            data: [
                treeCounts.coffee,
                treeCounts.durian,
                treeCounts.pepper,
                treeCounts.tea,
                treeCounts.otherPlants
            ],
            backgroundColor: [
                'rgba(159,75,36,255)',  // Coffee brown
                'rgba(255,193,7,255)',  // Durian yellow
                'rgba(255,61,0,255)',   // Pepper red
                'rgba(87,139,66,255)',  // Tea green
                'rgba(128,128,128,255)' // Grey for Other Plants
            ],
            borderWidth: 1,
            spacing: 2
        }]
    };

    const options = {
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'square'
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.formattedValue;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.raw / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    };

    if (treeTypeChart) {
        treeTypeChart.data = data;
        treeTypeChart.options = options;
        treeTypeChart.update();
    } else {
        treeTypeChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }
}

// Function to get translated labels
function getTranslatedLabels() {
    return [
        translations[currentLang]["Coffee"],
        translations[currentLang]["Durian"],
        translations[currentLang]["Pepper"],
        translations[currentLang]["Tea"],
        translations[currentLang]["Other Crops"]
    ];
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateFarmInfo);