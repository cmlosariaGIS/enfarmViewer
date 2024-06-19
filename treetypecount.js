async function fetchData(userId) {
    try {
        const response = await fetch('https://api-router.enfarm.com/api/v3/farm/total-farms-per-user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "user_id": userId })
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function countTreeTypes(data) {
    return data.content.data.reduce((counts, farm) => {
        farm.cultivates.forEach(cultivate => {
            counts[`tree_type${cultivate.tree_type}`]++;
        });
        return counts;
    }, { tree_type0: 0, tree_type1: 0, tree_type2: 0, tree_type3: 0 });
}

function updateCounts(combinedCounts) {
    Object.entries(combinedCounts).forEach(([key, value]) => {
        document.getElementById(key).innerText = value;
    });
}

async function fetchDataAndCount(userId) {
    const apiResponse = await fetchData(userId);
    if (apiResponse) {
        return countTreeTypes(apiResponse);
    }
    return null;
}

async function processUserIDs(userIDs) {
    const countsPromises = userIDs.map(userId => fetchDataAndCount(userId));
    const countsArray = await Promise.all(countsPromises);

    const combinedCounts = countsArray.reduce((acc, counts) => {
        if (counts) {
            acc.tree_type0 += counts.tree_type0;
            acc.tree_type1 += counts.tree_type1;
            acc.tree_type2 += counts.tree_type2;
            acc.tree_type3 += counts.tree_type3;
        }
        return acc;
    }, { tree_type0: 0, tree_type1: 0, tree_type2: 0, tree_type3: 0 });

    updateCounts({
        totalcoffeefarmsCount: combinedCounts.tree_type0,
        totaldurianfarmsCount: combinedCounts.tree_type1,
        totalpepperfarmsCount: combinedCounts.tree_type2,
        totalteafarmsCount: combinedCounts.tree_type3
    });

    // Chart creation
    const ctx = document.getElementById('treeTypeChart').getContext('2d');
    const treeTypeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Coffee', 'Durian', 'Pepper', 'Tea'],
            datasets: [{
                label: 'Count',
                data: [
                    combinedCounts.tree_type0,
                    combinedCounts.tree_type1,
                    combinedCounts.tree_type2,
                    combinedCounts.tree_type3
                ],
                backgroundColor: [
                    'rgba(159,75,36,255)',  // Coffee brown
                    'rgba(255,193,7,255)',   // Durian yellow
                    'rgba(255,61,0,255)',    // Pepper red
                    'rgba(87,139,66,255)'    // Tea green
                ],
                borderWidth: 1
            }]
        },
        options: {
            cutoutPercentage: 70,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'square'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(2);
                            return `${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Call the main function with the user IDs
//const userIDs = [236, 260, 261, 990];
const userIDs = authenticatedUserIDs;
processUserIDs(userIDs);
