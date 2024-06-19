/*
document.addEventListener('DOMContentLoaded', function () {
    const popupHistoricalSoilData = document.querySelector('.popup-historicalsoildata');
    popupHistoricalSoilData.style.display = 'none';
    var closeBtn = document.querySelector('.close-btn');
    var popup = document.querySelector('.popup-historicalsoildata');
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        resetCanvas('npkChart');
        resetCanvas('moistChart');
        resetCanvas('phChart');
        resetCanvas('tempChart');
    });

    // Initialize line charts and then show popup
    initializeChartsAndShowPopup();

    function initializeChartsAndShowPopup() {
        // Initialize line charts
        initializeNpkChart(document.getElementById('npkChart'));
        initializeMoistChart(document.getElementById('moistChart'));
        initializePhChart(document.getElementById('phChart'));
        initializeTempChart(document.getElementById('tempChart'));

        // Show popup after charts are initialized
        popup.style.display = 'none';
    }

    function resetCanvas(canvasId) {
        // Get the canvas element
        const canvas = document.getElementById(canvasId);

        // Get the chart instance associated with this canvas
        const chartInstance = Chart.getChart(canvasId); // Use canvasId to get the chart instance

        // If a chart instance exists, destroy it
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Clear the canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset the HTML elements containing text messages
        if (canvasId === 'npkChart') {
            const npkHeader = document.querySelector('.headerNPK .title');
            npkHeader.innerHTML = '';
            const npkStatus = document.querySelector('.headerNPK .nutrient-status');
            if (npkStatus) {
                npkStatus.remove();
            }
        } else if (canvasId === 'moistChart') {
            const moistHeader = document.querySelector('.headerMoist .title');
            moistHeader.innerHTML = '';
            const moistStatus = document.querySelector('.headerMoist .moisture-status');
            if (moistStatus) {
                moistStatus.remove();
            }
        } else if (canvasId === 'phChart') {
            const phHeader = document.querySelector('.headerpH .title');
            phHeader.innerHTML = '';
            const phStatus = document.querySelector('.headerpH .ph-status');
            if (phStatus) {
                phStatus.remove();
            }
        } else if (canvasId === 'tempChart') {
            const tempHeader = document.querySelector('.headerTemp .title');
            tempHeader.innerHTML = '';
            const tempStatus = document.querySelector('.headerTemp .temp-status');
            if (tempStatus) {
                tempStatus.remove();
            }
        }

        // After clearing canvas and resetting HTML elements, initialize the chart
        if (canvasId === 'npkChart') {
            initializeNpkChart(canvas);
        } else if (canvasId === 'moistChart') {
            initializeMoistChart(canvas);
        } else if (canvasId === 'phChart') {
            initializePhChart(canvas);
        } else if (canvasId === 'tempChart') {
            initializeTempChart(canvas);
        }
    }

});


let npkChart, moistChart, pHChart, tempChart;

// Function to initialize the NPK chart
function initializeNpkChart(canvas) {
    npkChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'NPK',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the Moisture chart
function initializeMoistChart(canvas) {
    moistChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'Moisture (%)',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the pH chart
function initializePhChart(canvas) {
    pHChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'pH',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the Temperature chart
function initializeTempChart(canvas) {
    tempChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to update the line chart based on region_id and depth_id
function updateLineChart(region_id, depth_id) {
    // Ensure line charts are initialized before updating
    if (!npkChart || !moistChart || !pHChart || !tempChart) {
        return;
    }

    axios.post('https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old', {
        region_id: region_id
    })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            if (responseContent.length === 1) {
                // If there is only one element in the array, use its values
                data = responseContent[0].values;
            } else if (responseContent.length > depth_id) {
                // If the array has multiple elements, access the values using the depthId
                data = responseContent[depth_id].values;
            } else {
                console.log(`No data found for regionId: ${region_id} and depthId: ${depth_id}`);
                return;
            }

            // Sort dates in ascending order
            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));

            // Get the indices after sorting the dates
            const sortedIndices = sortedDates.map(date => data.created_at.indexOf(date));

            // Use the sorted indices to reorder the other data arrays
            const sortedNpkValues = sortedIndices.map(index => data.npk[index]);
            const sortedMoistValues = sortedIndices.map(index => data.moist[index]);
            const sortedPHValues = sortedIndices.map(index => data.pH[index]);
            const sortedTValues = sortedIndices.map(index => data.t[index]);

            // Function to create gradient
            function createGradient(ctx, startColor, endColor) {
                const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                return gradient;
            }

            // Update the NPK chart data
            npkChart.data.labels = sortedDates;
            npkChart.data.datasets[0].data = sortedNpkValues;
            npkChart.update();

            // Update the Moisture chart data
            moistChart.data.labels = sortedDates;
            moistChart.data.datasets[0].data = sortedMoistValues;
            moistChart.update();

            // Update the pH chart data
            pHChart.data.labels = sortedDates;
            pHChart.data.datasets[0].data = sortedPHValues;
            pHChart.update();

            // Update the Temperature chart data
            tempChart.data.labels = sortedDates;
            tempChart.data.datasets[0].data = sortedTValues;
            tempChart.update();

            // Find the latest and previous NPK values
            const latestNpkValue = sortedNpkValues[sortedNpkValues.length - 1];
            const previousNpkValue = sortedNpkValues[sortedNpkValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorNPK = '';
            if (latestNpkValue > previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestNpkValue < previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Update the latest NPK value in the header
            let headerContentNPK = `<span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>&nbsp;<span style="color: rgba(255, 99, 132, 1)">${latestNpkValue}</span>`;
            if (indicatorNPK !== '') {
                headerContentNPK += `&nbsp;&nbsp;${indicatorNPK}`;
            }
            document.querySelector('.headerNPK .title').innerHTML = headerContentNPK;

            // Determine the nutrient status
            const nutrientRatio = latestNpkValue / 300;
            let nutrientStatus = '';
            let nutrientIcon = '';
            let nutrientColor = '';

            // Check if latestNpkValue is null
            if (latestNpkValue === null) {
                nutrientStatus = 'No data';
                nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                nutrientColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (nutrientRatio < 0.5) {
                    nutrientStatus = 'Insufficient Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = '#BA0F30'; // Color for insufficient nutrients
                } else if (nutrientRatio <= 0.75) {
                    nutrientStatus = 'Average Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';
                    nutrientColor = '#18A558'; // Color for average nutrients
                } else if (nutrientRatio <= 1) {
                    nutrientStatus = 'Adequate Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    nutrientColor = '#18A558'; // Color for adequate nutrients
                } else {
                    nutrientStatus = 'Excess Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = '#BA0F30'; // Color for excess nutrients
                }
            }

            // Create and update the nutrient status element
            const nutrientStatusElement = document.createElement('div');
            nutrientStatusElement.classList.add('nutrient-status');
            nutrientStatusElement.style.fontSize = '10px'; // Set font size to smaller
            nutrientStatusElement.style.color = 'white'; // Set font color
            nutrientStatusElement.style.backgroundColor = nutrientColor; // Set background color
            nutrientStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            nutrientStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            nutrientStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const nutrientTextSpan = document.createElement('span');
            nutrientTextSpan.style.display = 'flex'; // Use flexbox layout
            nutrientTextSpan.style.alignItems = 'center'; // Align items vertically center
            nutrientTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            nutrientTextSpan.innerHTML = `${nutrientIcon}&nbsp;${nutrientStatus}`;

            // Append the text span to the nutrient status element
            nutrientStatusElement.appendChild(nutrientTextSpan);

            // Append nutrient status below the headerNPK section
            const headerNPKSection = document.querySelector('.headerNPK');
            headerNPKSection.appendChild(nutrientStatusElement);

            // Find the latest and previous Moisture values
            const latestMoistValue = sortedMoistValues[sortedMoistValues.length - 1];
            const previousMoistValue = sortedMoistValues[sortedMoistValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorMoist = '';
            if (latestMoistValue > previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestMoistValue < previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Determine the appropriate moisture status
            let moistureStatus = '';
            let moistureIcon = '';
            let moistureColor = '';

            // Check if latestMoistValue is null
            if (latestMoistValue === null) {
                moistureStatus = 'No data';
                moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                moistureColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestMoistValue < 22.5) {
                    moistureStatus = 'Very dry';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = '#BA0F30'; // Color for very dry moisture
                } else if (latestMoistValue <= 35) {
                    moistureStatus = 'Lack of water';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = '#BA0F30'; // Color for lack of water
                } else if (latestMoistValue <= 55) {
                    moistureStatus = 'Enough moisture';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    moistureColor = '#18A558'; // Color for enough moisture
                } else {
                    moistureStatus = 'Excess water';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = '#BA0F30'; // Color for excess water
                }
            }


            // Create and update the moisture status element
            const moistureStatusElement = document.createElement('div');
            moistureStatusElement.classList.add('moisture-status');
            moistureStatusElement.style.fontSize = '10px'; // Set font size to smaller
            moistureStatusElement.style.color = 'white'; // Set font color
            moistureStatusElement.style.backgroundColor = moistureColor; // Set background color
            moistureStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            moistureStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            moistureStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const moistureTextSpan = document.createElement('span');
            moistureTextSpan.style.display = 'flex'; // Use flexbox layout
            moistureTextSpan.style.alignItems = 'center'; // Align items vertically center
            moistureTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            moistureTextSpan.innerHTML = `${moistureIcon}&nbsp;${moistureStatus}`;

            // Append the text span to the moisture status element
            moistureStatusElement.appendChild(moistureTextSpan);

            // Append moisture status below the headerMoist section
            const headerMoistSection = document.querySelector('.headerMoist');
            headerMoistSection.appendChild(moistureStatusElement);

            // Update the latest Moisture value in the header
            let headerContentMoist = `<span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>&nbsp;<span style="color:rgba(54, 162, 235, 1)">${latestMoistValue}</span>`;
            if (indicatorMoist !== '') {
                headerContentMoist += `&nbsp;&nbsp;${indicatorMoist}`;
            }
            document.querySelector('.headerMoist .title').innerHTML = headerContentMoist;


            // Find the latest and previous pH values
            const latestPHValue = sortedPHValues[sortedPHValues.length - 1];
            const previousPHValue = sortedPHValues[sortedPHValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorPH = '';
            if (latestPHValue > previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestPHValue < previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Update the latest pH value in the header
            let headerContentPH = `<span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">water_ph</span>&nbsp;<span style="color:rgba(75, 192, 192, 1)">${latestPHValue}</span>`;
            if (indicatorPH !== '') {
                headerContentPH += `&nbsp;&nbsp;${indicatorPH}`;
            }

            document.querySelector('.headerpH .title').innerHTML = headerContentPH;

            // Determine pH status
            let pHStatus = '';
            let pHIcon = '';
            let pHColor = '';

            // Check if latestPHValue is null
            if (latestPHValue === null) {
                pHStatus = 'No data';
                pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                pHColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestPHValue === 7) {
                    pHStatus = 'Neutral';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    pHColor = '#18A558'; // Color for neutral pH
                } else if (latestPHValue < 4) {
                    pHStatus = 'Very Acidic';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for very acidic pH
                } else if (latestPHValue >= 4 && latestPHValue <= 4.5) {
                    pHStatus = 'Acidic';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for acidic pH
                } else if (latestPHValue > 4.5 && latestPHValue < 7) {
                    pHStatus = 'Slightly Acidic';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for slightly acidic pH
                } else if (latestPHValue > 7 && latestPHValue < 8) {
                    pHStatus = 'Slightly Alkaline';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for slightly alkaline pH
                } else if (latestPHValue === 8) {
                    pHStatus = 'Alkaline';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for alkaline pH
                } else if (latestPHValue > 8) {
                    pHStatus = 'Very Alkaline';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for very alkaline pH
                }
            }


            // Create and update the pH status element
            const pHStatusElement = document.createElement('div');
            pHStatusElement.classList.add('ph-status');
            pHStatusElement.style.fontSize = '10px'; // Set font size to smaller
            pHStatusElement.style.color = 'white'; // Set font color
            pHStatusElement.style.backgroundColor = pHColor; // Set background color
            pHStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            pHStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            pHStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const pHTextSpan = document.createElement('span');
            pHTextSpan.style.display = 'flex'; // Use flexbox layout
            pHTextSpan.style.alignItems = 'center'; // Align items vertically center
            pHTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            pHTextSpan.innerHTML = `${pHIcon}&nbsp;${pHStatus}`;

            // Append the text span to the pH status element
            pHStatusElement.appendChild(pHTextSpan);

            // Append pH status below the headerpH section
            const headerPHSection = document.querySelector('.headerpH');
            headerPHSection.appendChild(pHStatusElement);


            // Find the latest and previous Temperature values
            const latestTempValue = sortedTValues[sortedTValues.length - 1];
            const previousTempValue = sortedTValues[sortedTValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorTemp = '';
            if (latestTempValue > previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestTempValue < previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Update the latest Temperature value in the header
            let headerContentTemp = `<span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">device_thermostat</span>&nbsp;<span style="color:rgba(255, 159, 64, 1)">${latestTempValue}</span>`;
            if (indicatorTemp !== '') {
                headerContentTemp += `&nbsp;&nbsp;${indicatorTemp}`;
            }
            document.querySelector('.headerTemp .title').innerHTML = headerContentTemp;


            // Determine temperature status
            let tempStatus = '';
            let tempIcon = '';
            let tempColor = '';

            // Check if latestTempValue is null
            if (latestTempValue === null) {
                tempStatus = 'No data';
                tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                tempColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestTempValue >= 20 && latestTempValue <= 30) {
                    tempStatus = 'Normal Temp';
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    tempColor = '#18A558'; // Color for normal temperature
                } else if (latestTempValue < 20 || latestTempValue > 30) {
                    tempStatus = latestTempValue < 20 ? 'Low Temp' : 'High Temp';
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    tempColor = '#BA0F30'; // Color for low or high temperature
                }
            }


            // Create and update the temperature status element
            const tempStatusElement = document.createElement('div');
            tempStatusElement.classList.add('temp-status');
            tempStatusElement.style.fontSize = '10px'; // Set font size to smaller
            tempStatusElement.style.color = 'white'; // Set font color
            tempStatusElement.style.backgroundColor = tempColor; // Set background color
            tempStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            tempStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            tempStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const tempTextSpan = document.createElement('span');
            tempTextSpan.style.display = 'flex'; // Use flexbox layout
            tempTextSpan.style.alignItems = 'center'; // Align items vertically center
            tempTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            tempTextSpan.innerHTML = `${tempIcon}&nbsp;${tempStatus}`;

            // Append the text span to the temperature status element
            tempStatusElement.appendChild(tempTextSpan);

            // Append temperature status below the headerTemp section
            const headerTempSection = document.querySelector('.headerTemp');
            headerTempSection.appendChild(tempStatusElement);

        })
        .catch(function (error) {
            console.error("Error fetching data: ", error);
        });
}

// Ensure the updateLineChart function is accessible globally
window.updateLineChart = updateLineChart;*/


/*

document.addEventListener('DOMContentLoaded', function () {
    const popupHistoricalSoilData = document.querySelector('.popup-historicalsoildata');
    popupHistoricalSoilData.style.display = 'none';
    var closeBtn = document.querySelector('.close-btn');
    var popup = document.querySelector('.popup-historicalsoildata');
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        resetCanvas('npkChart');
        resetCanvas('moistChart');
        resetCanvas('phChart');
        resetCanvas('tempChart');
    });

    // Initialize line charts and then show popup
    initializeChartsAndShowPopup();

    function initializeChartsAndShowPopup() {
        // Initialize line charts
        initializeNpkChart(document.getElementById('npkChart'));
        initializeMoistChart(document.getElementById('moistChart'));
        initializePhChart(document.getElementById('phChart'));
        initializeTempChart(document.getElementById('tempChart'));

        // Show popup after charts are initialized
        popup.style.display = 'none';
    }

    function resetCanvas(canvasId) {
        // Get the canvas element
        const canvas = document.getElementById(canvasId);

        // Get the chart instance associated with this canvas
        const chartInstance = Chart.getChart(canvasId); // Use canvasId to get the chart instance

        // If a chart instance exists, destroy it
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Clear the canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset the HTML elements containing text messages
        if (canvasId === 'npkChart') {
            const npkHeader = document.querySelector('.headerNPK .title');
            npkHeader.innerHTML = '';
            const npkStatus = document.querySelector('.headerNPK .nutrient-status');
            if (npkStatus) {
                npkStatus.remove();
            }
        } else if (canvasId === 'moistChart') {
            const moistHeader = document.querySelector('.headerMoist .title');
            moistHeader.innerHTML = '';
            const moistStatus = document.querySelector('.headerMoist .moisture-status');
            if (moistStatus) {
                moistStatus.remove();
            }
        } else if (canvasId === 'phChart') {
            const phHeader = document.querySelector('.headerpH .title');
            phHeader.innerHTML = '';
            const phStatus = document.querySelector('.headerpH .ph-status');
            if (phStatus) {
                phStatus.remove();
            }
        } else if (canvasId === 'tempChart') {
            const tempHeader = document.querySelector('.headerTemp .title');
            tempHeader.innerHTML = '';
            const tempStatus = document.querySelector('.headerTemp .temp-status');
            if (tempStatus) {
                tempStatus.remove();
            }
        }

        // After clearing canvas and resetting HTML elements, initialize the chart
        if (canvasId === 'npkChart') {
            initializeNpkChart(canvas);
        } else if (canvasId === 'moistChart') {
            initializeMoistChart(canvas);
        } else if (canvasId === 'phChart') {
            initializePhChart(canvas);
        } else if (canvasId === 'tempChart') {
            initializeTempChart(canvas);
        }
    }

});

let npkChart, moistChart, pHChart, tempChart;

// Function to initialize the NPK chart
function initializeNpkChart(canvas) {
    npkChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'NPK',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the Moisture chart
function initializeMoistChart(canvas) {
    moistChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'Moisture (%)',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the pH chart
function initializePhChart(canvas) {
    pHChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'pH',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the Temperature chart
function initializeTempChart(canvas) {
    tempChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to update the line chart based on region_id and depth_id
function updateLineChart(region_id, depth_id) {
    // Ensure line charts are initialized before updating
    if (!npkChart || !moistChart || !pHChart || !tempChart) {
        return;
    }

    axios.post('https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old', {
        region_id: region_id
    })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            if (responseContent.length === 1) {
                // If there is only one element in the array, use its values
                data = responseContent[0].values;
            } else if (responseContent.length > depth_id) {
                // If the array has multiple elements, access the values using the depthId
                data = responseContent[depth_id].values;
            } else {
                console.log(`No data found for regionId: ${region_id} and depthId: ${depth_id}`);
                return;
            }

            // Sort dates in ascending order
            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));

            // Get the indices after sorting the dates
            const sortedIndices = sortedDates.map(date => data.created_at.indexOf(date));

            // Use the sorted indices to reorder the other data arrays
            const sortedNpkValues = sortedIndices.map(index => data.npk[index]);
            const sortedMoistValues = sortedIndices.map(index => data.moist[index]);
            const sortedPHValues = sortedIndices.map(index => data.pH[index]);
            const sortedTValues = sortedIndices.map(index => data.t[index]);

            // Function to create gradient
            function createGradient(ctx, startColor, endColor) {
                const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                return gradient;
            }

            // Update the NPK chart data
            if (sortedNpkValues[sortedNpkValues.length - 1] !== null) {
                npkChart.data.labels = sortedDates;
                npkChart.data.datasets[0].data = sortedNpkValues;
                npkChart.update();
            }

            // Update the Moisture chart data
            if (sortedMoistValues[sortedMoistValues.length - 1] !== null) {
                moistChart.data.labels = sortedDates;
                moistChart.data.datasets[0].data = sortedMoistValues;
                moistChart.update();
            }

            // Update the pH chart data
            if (sortedPHValues[sortedPHValues.length - 1] !== null) {
                pHChart.data.labels = sortedDates;
                pHChart.data.datasets[0].data = sortedPHValues;
                pHChart.update();
            }

            // Update the Temperature chart data
            if (sortedTValues[sortedTValues.length - 1] !== null) {
                tempChart.data.labels = sortedDates;
                tempChart.data.datasets[0].data = sortedTValues;
                tempChart.update();
            }

            // Function to update header and status based on the latest values
            function updateHeaderAndStatus(latestValue, previousValue, headerSelector, icon, color) {
                let indicator = '';
                if (latestValue > previousValue) {
                    indicator = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestValue < previousValue) {
                    indicator = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }

                let headerContent = `<span class="material-symbols-outlined" style="color: ${color};">${icon}</span>&nbsp;<span style="color:${color}">${latestValue}</span>`;
                if (indicator !== '') {
                    headerContent += `&nbsp;&nbsp;${indicator}`;
                }
                document.querySelector(headerSelector).innerHTML = headerContent;
            }

            // Function to update the nutrient status
            function updateNutrientStatus(latestValue, headerSectionSelector) {
                const nutrientRatio = latestValue / 300;
                let nutrientStatus = '';
                let nutrientIcon = '';
                let nutrientColor = '';

                if (latestValue === null) {
                    nutrientStatus = 'No data';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    nutrientColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
                } else {
                    if (nutrientRatio < 0.5) {
                        nutrientStatus = 'Insufficient Nutrients';
                        nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        nutrientColor = '#BA0F30'; // Color for insufficient nutrients
                    } else if (nutrientRatio <= 0.75) {
                        nutrientStatus = 'Average Nutrients';
                        nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';
                        nutrientColor = '#18A558'; // Color for average nutrients
                    } else if (nutrientRatio <= 1) {
                        nutrientStatus = 'Adequate Nutrients';
                        nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        nutrientColor = '#18A558'; // Color for adequate nutrients
                    } else {
                        nutrientStatus = 'Excess Nutrients';
                        nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        nutrientColor = '#BA0F30'; // Color for excess nutrients
                    }
                }

                // Create and update the nutrient status element
                const nutrientStatusElement = document.createElement('div');
                nutrientStatusElement.classList.add('nutrient-status');
                nutrientStatusElement.style.fontSize = '10px'; // Set font size to smaller
                nutrientStatusElement.style.color = 'white'; // Set font color
                nutrientStatusElement.style.backgroundColor = nutrientColor; // Set background color
                nutrientStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
                nutrientStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
                nutrientStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

                // Create a span element for the text
                const nutrientTextSpan = document.createElement('span');
                nutrientTextSpan.style.display = 'flex'; // Use flexbox layout
                nutrientTextSpan.style.alignItems = 'center'; // Align items vertically center
                nutrientTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
                nutrientTextSpan.innerHTML = `${nutrientIcon}&nbsp;${nutrientStatus}`;

                // Append the text span to the nutrient status element
                nutrientStatusElement.appendChild(nutrientTextSpan);

                // Append nutrient status below the header section
                const headerSection = document.querySelector(headerSectionSelector);
                headerSection.appendChild(nutrientStatusElement);
            }

            // Function to update the moisture status
            function updateMoistureStatus(latestValue, headerSectionSelector) {
                let moistureStatus = '';
                let moistureIcon = '';
                let moistureColor = '';

                if (latestValue === null) {
                    moistureStatus = 'No data';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    moistureColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
                } else {
                    if (latestValue < 22.5) {
                        moistureStatus = 'Very dry';
                        moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        moistureColor = '#BA0F30'; // Color for very dry moisture
                    } else if (latestValue <= 35) {
                        moistureStatus = 'Lack of water';
                        moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        moistureColor = '#BA0F30'; // Color for lack of water
                    } else if (latestValue <= 55) {
                        moistureStatus = 'Enough moisture';
                        moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        moistureColor = '#18A558'; // Color for enough moisture
                    } else {
                        moistureStatus = 'Excess water';
                        moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        moistureColor = '#BA0F30'; // Color for excess water
                    }
                }

                // Create and update the moisture status element
                const moistureStatusElement = document.createElement('div');
                moistureStatusElement.classList.add('moisture-status');
                moistureStatusElement.style.fontSize = '10px'; // Set font size to smaller
                moistureStatusElement.style.color = 'white'; // Set font color
                moistureStatusElement.style.backgroundColor = moistureColor; // Set background color
                moistureStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
                moistureStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
                moistureStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

                // Create a span element for the text
                const moistureTextSpan = document.createElement('span');
                moistureTextSpan.style.display = 'flex'; // Use flexbox layout
                moistureTextSpan.style.alignItems = 'center'; // Align items vertically center
                moistureTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
                moistureTextSpan.innerHTML = `${moistureIcon}&nbsp;${moistureStatus}`;

                // Append the text span to the moisture status element
                moistureStatusElement.appendChild(moistureTextSpan);

                // Append moisture status below the header section
                const headerSection = document.querySelector(headerSectionSelector);
                headerSection.appendChild(moistureStatusElement);
            }

            // Function to update the pH status
            function updatePHStatus(latestValue, headerSectionSelector) {
                let pHStatus = '';
                let pHIcon = '';
                let pHColor = '';

                if (latestValue === null) {
                    pHStatus = 'No data';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    pHColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
                } else {
                    if (latestValue === 7) {
                        pHStatus = 'Neutral';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        pHColor = '#18A558'; // Color for neutral pH
                    } else if (latestValue < 4) {
                        pHStatus = 'Very Acidic';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = '#BA0F30'; // Color for very acidic pH
                    } else if (latestValue >= 4 && latestValue <= 4.5) {
                        pHStatus = 'Acidic';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = '#BA0F30'; // Color for acidic pH
                    } else if (latestValue > 4.5 && latestValue < 7) {
                        pHStatus = 'Slightly Acidic';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = '#BA0F30'; // Color for slightly acidic pH
                    } else if (latestValue > 7 && latestValue < 8) {
                        pHStatus = 'Slightly Alkaline';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = '#BA0F30'; // Color for slightly alkaline pH
                    } else if (latestValue === 8) {
                        pHStatus = 'Alkaline';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = '#BA0F30'; // Color for alkaline pH
                    } else if (latestValue > 8) {
                        pHStatus = 'Very Alkaline';
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = '#BA0F30'; // Color for very alkaline pH
                    }
                }

                // Create and update the pH status element
                const pHStatusElement = document.createElement('div');
                pHStatusElement.classList.add('ph-status');
                pHStatusElement.style.fontSize = '10px'; // Set font size to smaller
                pHStatusElement.style.color = 'white'; // Set font color
                pHStatusElement.style.backgroundColor = pHColor; // Set background color
                pHStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
                pHStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
                pHStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

                // Create a span element for the text
                const pHTextSpan = document.createElement('span');
                pHTextSpan.style.display = 'flex'; // Use flexbox layout
                pHTextSpan.style.alignItems = 'center'; // Align items vertically center
                pHTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
                pHTextSpan.innerHTML = `${pHIcon}&nbsp;${pHStatus}`;

                // Append the text span to the pH status element
                pHStatusElement.appendChild(pHTextSpan);

                // Append pH status below the header section
                const headerSection = document.querySelector(headerSectionSelector);
                headerSection.appendChild(pHStatusElement);
            }

            // Function to update the temperature status
            function updateTempStatus(latestValue, headerSectionSelector) {
                let tempStatus = '';
                let tempIcon = '';
                let tempColor = '';

                if (latestValue === null) {
                    tempStatus = 'No data';
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    tempColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
                } else {
                    if (latestValue >= 20 && latestValue <= 30) {
                        tempStatus = 'Normal Temp';
                        tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        tempColor = '#18A558'; // Color for normal temperature
                    } else if (latestValue < 20 || latestValue > 30) {
                        tempStatus = latestValue < 20 ? 'Low Temp' : 'High Temp';
                        tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        tempColor = '#BA0F30'; // Color for low or high temperature
                    }
                }

                // Create and update the temperature status element
                const tempStatusElement = document.createElement('div');
                tempStatusElement.classList.add('temp-status');
                tempStatusElement.style.fontSize = '10px'; // Set font size to smaller
                tempStatusElement.style.color = 'white'; // Set font color
                tempStatusElement.style.backgroundColor = tempColor; // Set background color
                tempStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
                tempStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
                tempStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

                // Create a span element for the text
                const tempTextSpan = document.createElement('span');
                tempTextSpan.style.display = 'flex'; // Use flexbox layout
                tempTextSpan.style.alignItems = 'center'; // Align items vertically center
                tempTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
                tempTextSpan.innerHTML = `${tempIcon}&nbsp;${tempStatus}`;

                // Append the text span to the temperature status element
                tempStatusElement.appendChild(tempTextSpan);

                // Append temperature status below the header section
                const headerSection = document.querySelector(headerSectionSelector);
                headerSection.appendChild(tempStatusElement);
            }

            // Update the headers and status for each chart
            if (sortedNpkValues[sortedNpkValues.length - 1] !== null) {
                const latestNpkValue = sortedNpkValues[sortedNpkValues.length - 1];
                const previousNpkValue = sortedNpkValues[sortedNpkValues.length - 2];
                updateHeaderAndStatus(latestNpkValue, previousNpkValue, '.headerNPK .title', 'bubble_chart', 'rgba(255, 99, 132, 1)');
                updateNutrientStatus(latestNpkValue, '.headerNPK');
            }

            if (sortedMoistValues[sortedMoistValues.length - 1] !== null) {
                const latestMoistValue = sortedMoistValues[sortedMoistValues.length - 1];
                const previousMoistValue = sortedMoistValues[sortedMoistValues.length - 2];
                updateHeaderAndStatus(latestMoistValue, previousMoistValue, '.headerMoist .title', 'humidity_mid', 'rgba(54, 162, 235, 1)');
                updateMoistureStatus(latestMoistValue, '.headerMoist');
            }

            if (sortedPHValues[sortedPHValues.length - 1] !== null) {
                const latestPHValue = sortedPHValues[sortedPHValues.length - 1];
                const previousPHValue = sortedPHValues[sortedPHValues.length - 2];
                updateHeaderAndStatus(latestPHValue, previousPHValue, '.headerpH .title', 'water_ph', 'rgba(75, 192, 192, 1)');
                updatePHStatus(latestPHValue, '.headerpH');
            }

            if (sortedTValues[sortedTValues.length - 1] !== null) {
                const latestTempValue = sortedTValues[sortedTValues.length - 1];
                const previousTempValue = sortedTValues[sortedTValues.length - 2];
                updateHeaderAndStatus(latestTempValue, previousTempValue, '.headerTemp .title', 'device_thermostat', 'rgba(255, 159, 64, 1)');
                updateTempStatus(latestTempValue, '.headerTemp');
            }
        })
        .catch(function (error) {
            console.error("Error fetching data: ", error);
        });
}

// Ensure the updateLineChart function is accessible globally
window.updateLineChart = updateLineChart;

*/


let npkChart, moistChart, pHChart, tempChart; // Declare variables to store chart instances

let chartData = {
    sortedDates: [],
    sortedNpkValues: [],
    sortedMoistValues: [],
    sortedPHValues: [],
    sortedTValues: []
};

let sortedDates, sortedNpkValues, sortedMoistValues, sortedPHValues, sortedTValues;


document.addEventListener('DOMContentLoaded', function () {
    const popupHistoricalSoilData = document.querySelector('.popup-historicalsoildata');
    popupHistoricalSoilData.style.display = 'none';
    var closeBtn = document.querySelector('.close-btn');
    var popup = document.querySelector('.popup-historicalsoildata');
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        resetCanvas('npkChart');
        resetCanvas('moistChart');
        resetCanvas('phChart');
        resetCanvas('tempChart');
    });

    // Initialize line charts and then show popup
    initializeChartsAndShowPopup();

    function initializeChartsAndShowPopup() {
        // Initialize line charts
        initializeNpkChart(document.getElementById('npkChart'));
        initializeMoistChart(document.getElementById('moistChart'));
        initializePhChart(document.getElementById('phChart'));
        initializeTempChart(document.getElementById('tempChart'));

        // Show popup after charts are initialized
        popup.style.display = 'none';
    }

    function resetCanvas(canvasId) {
        // Get the canvas element
        const canvas = document.getElementById(canvasId);

        // Get the chart instance associated with this canvas
        const chartInstance = Chart.getChart(canvasId); // Use canvasId to get the chart instance

        // If a chart instance exists, destroy it
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Clear the canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset the HTML elements containing text messages
        if (canvasId === 'npkChart') {
            const npkHeader = document.querySelector('.headerNPK .title');
            npkHeader.innerHTML = '';
            const npkStatus = document.querySelector('.headerNPK .nutrient-status');
            if (npkStatus) {
                npkStatus.remove();
            }
        } else if (canvasId === 'moistChart') {
            const moistHeader = document.querySelector('.headerMoist .title');
            moistHeader.innerHTML = '';
            const moistStatus = document.querySelector('.headerMoist .moisture-status');
            if (moistStatus) {
                moistStatus.remove();
            }
        } else if (canvasId === 'phChart') {
            const phHeader = document.querySelector('.headerpH .title');
            phHeader.innerHTML = '';
            const phStatus = document.querySelector('.headerpH .ph-status');
            if (phStatus) {
                phStatus.remove();
            }
        } else if (canvasId === 'tempChart') {
            const tempHeader = document.querySelector('.headerTemp .title');
            tempHeader.innerHTML = '';
            const tempStatus = document.querySelector('.headerTemp .temp-status');
            if (tempStatus) {
                tempStatus.remove();
            }
        }

        // After clearing canvas and resetting HTML elements, initialize the chart
        if (canvasId === 'npkChart') {
            initializeNpkChart(canvas);
        } else if (canvasId === 'moistChart') {
            initializeMoistChart(canvas);
        } else if (canvasId === 'phChart') {
            initializePhChart(canvas);
        } else if (canvasId === 'tempChart') {
            initializeTempChart(canvas);
        }
    }

});


// Function to initialize the NPK chart
function initializeNpkChart(canvas) {
    npkChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'NPK',
                data: [],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the Moisture chart
function initializeMoistChart(canvas) {
    moistChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'Moisture (%)',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the pH chart
function initializePhChart(canvas) {
    pHChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'pH',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}

// Function to initialize the Temperature chart
function initializeTempChart(canvas) {
    tempChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [], // Initially empty labels
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        minUnit: 'day',
                        displayFormats: {
                            day: 'MMM D, YYYY'
                        }
                    },
                    ticks: {
                        font: {
                            size: 6 // Set the font size to 6px
                        }
                    }
                }]
            },
            layout: {
                padding: {
                    top: 0 // Add top padding of 50px
                }
            }
        }
    });
}



// Function to update the line chart based on region_id and depth_id
function updateLineChart(region_id, depth_id) {
    // Ensure line charts are initialized before updating
    if (!npkChart || !moistChart || !pHChart || !tempChart) {
        return;
    }

    axios.post('https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old', {
        region_id: region_id
    })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            if (responseContent.length === 1) {
                // If there is only one element in the array, use its values
                data = responseContent[0].values;
            } else if (responseContent.length > depth_id) {
                // If the array has multiple elements, access the values using the depthId
                data = responseContent[depth_id].values;
            } else {
                console.log(`No data found for regionId: ${region_id} and depthId: ${depth_id}`);
                return;
            }
            
            // Sort dates in ascending order
            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));

            // Get the indices after sorting the dates
            const sortedIndices = sortedDates.map(date => data.created_at.indexOf(date));

            // Use the sorted indices to reorder the other data arrays
            const sortedNpkValues = sortedIndices.map(index => data.npk[index]);
            const sortedMoistValues = sortedIndices.map(index => data.moist[index]);
            const sortedPHValues = sortedIndices.map(index => data.pH[index]);
            const sortedTValues = sortedIndices.map(index => data.t[index]);

            // Function to create gradient
            function createGradient(ctx, startColor, endColor) {
                const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                return gradient;
            }

            // Update the NPK chart data
            npkChart.data.labels = sortedDates;
            npkChart.data.datasets[0].data = sortedNpkValues;
            npkChart.update();

            // Update the Moisture chart data
            moistChart.data.labels = sortedDates;
            moistChart.data.datasets[0].data = sortedMoistValues;
            moistChart.update();

            // Update the pH chart data
            pHChart.data.labels = sortedDates;
            pHChart.data.datasets[0].data = sortedPHValues;
            pHChart.update();

            // Update the Temperature chart data
            tempChart.data.labels = sortedDates;
            tempChart.data.datasets[0].data = sortedTValues;
            tempChart.update();



            

            // Find the latest and previous NPK values
            const latestNpkValue = sortedNpkValues[sortedNpkValues.length - 1];
            const previousNpkValue = sortedNpkValues[sortedNpkValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorNPK = '';
            if (latestNpkValue > previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestNpkValue < previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Update the latest NPK value in the header
            let headerContentNPK = `
            <span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>
            &nbsp;
            <span style="color: rgba(255, 99, 132, 1)">${latestNpkValue}</span>
            &nbsp;
            <span style="color: rgba(255, 99, 132, 1); font-size: 8px;">(latest measure)</span>
          `;
          
            if (indicatorNPK !== '') {
                headerContentNPK += `&nbsp;&nbsp;${indicatorNPK}`;
            }
            document.querySelector('.headerNPK .title').innerHTML = headerContentNPK;

            // Determine the nutrient status
            const nutrientRatio = latestNpkValue / 300;
            let nutrientStatus = '';
            let nutrientIcon = '';
            let nutrientColor = '';

            // Check if latestNpkValue is null
            if (latestNpkValue === null) {
                nutrientStatus = 'No data';
                nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                nutrientColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (nutrientRatio < 0.5) {
                    nutrientStatus = 'Insufficient Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = '#BA0F30'; // Color for insufficient nutrients
                } else if (nutrientRatio <= 0.75) {
                    nutrientStatus = 'Average Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';
                    nutrientColor = '#18A558'; // Color for average nutrients
                } else if (nutrientRatio <= 1) {
                    nutrientStatus = 'Adequate Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    nutrientColor = '#18A558'; // Color for adequate nutrients
                } else {
                    nutrientStatus = 'Excess Nutrients';
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = '#BA0F30'; // Color for excess nutrients
                }
            }

            // Create and update the nutrient status element
            const nutrientStatusElement = document.createElement('div');
            nutrientStatusElement.classList.add('nutrient-status');
            nutrientStatusElement.style.fontSize = '10px'; // Set font size to smaller
            nutrientStatusElement.style.color = 'white'; // Set font color
            nutrientStatusElement.style.backgroundColor = nutrientColor; // Set background color
            nutrientStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            nutrientStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            nutrientStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const nutrientTextSpan = document.createElement('span');
            nutrientTextSpan.style.display = 'flex'; // Use flexbox layout
            nutrientTextSpan.style.alignItems = 'center'; // Align items vertically center
            nutrientTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            nutrientTextSpan.innerHTML = `${nutrientIcon}&nbsp;${nutrientStatus}`;

            // Append the text span to the nutrient status element
            nutrientStatusElement.appendChild(nutrientTextSpan);

            // Append nutrient status below the headerNPK section
            const headerNPKSection = document.querySelector('.headerNPK');
            headerNPKSection.appendChild(nutrientStatusElement);

            // Find the latest and previous Moisture values
            const latestMoistValue = sortedMoistValues[sortedMoistValues.length - 1];
            const previousMoistValue = sortedMoistValues[sortedMoistValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorMoist = '';
            if (latestMoistValue > previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestMoistValue < previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Determine the appropriate moisture status
            let moistureStatus = '';
            let moistureIcon = '';
            let moistureColor = '';

            // Check if latestMoistValue is null
            if (latestMoistValue === null) {
                moistureStatus = 'No data';
                moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                moistureColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestMoistValue < 22.5) {
                    moistureStatus = 'Very dry';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = '#BA0F30'; // Color for very dry moisture
                } else if (latestMoistValue <= 35) {
                    moistureStatus = 'Lack of water';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = '#BA0F30'; // Color for lack of water
                } else if (latestMoistValue <= 55) {
                    moistureStatus = 'Enough moisture';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    moistureColor = '#18A558'; // Color for enough moisture
                } else {
                    moistureStatus = 'Excess water';
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = '#BA0F30'; // Color for excess water
                }
            }


            // Create and update the moisture status element
            const moistureStatusElement = document.createElement('div');
            moistureStatusElement.classList.add('moisture-status');
            moistureStatusElement.style.fontSize = '10px'; // Set font size to smaller
            moistureStatusElement.style.color = 'white'; // Set font color
            moistureStatusElement.style.backgroundColor = moistureColor; // Set background color
            moistureStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            moistureStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            moistureStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const moistureTextSpan = document.createElement('span');
            moistureTextSpan.style.display = 'flex'; // Use flexbox layout
            moistureTextSpan.style.alignItems = 'center'; // Align items vertically center
            moistureTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            moistureTextSpan.innerHTML = `${moistureIcon}&nbsp;${moistureStatus}`;

            // Append the text span to the moisture status element
            moistureStatusElement.appendChild(moistureTextSpan);

            // Append moisture status below the headerMoist section
            const headerMoistSection = document.querySelector('.headerMoist');
            headerMoistSection.appendChild(moistureStatusElement);

            // Update the latest Moisture value in the header
            let headerContentMoist = `
  <span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>
  &nbsp;
  <span style="color: rgba(54, 162, 235, 1)">${latestMoistValue}</span>
  &nbsp;
  <span style="color: rgba(54, 162, 235, 1); font-size: 8px;">(latest measure)</span>
`;

            if (indicatorMoist !== '') {
                headerContentMoist += `&nbsp;&nbsp;${indicatorMoist}`;
            }
            document.querySelector('.headerMoist .title').innerHTML = headerContentMoist;


            // Find the latest and previous pH values
            const latestPHValue = sortedPHValues[sortedPHValues.length - 1];
            const previousPHValue = sortedPHValues[sortedPHValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorPH = '';
            if (latestPHValue > previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestPHValue < previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Update the latest pH value in the header
            let headerContentPH = `
  <span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">water_ph</span>
  &nbsp;
  <span style="color: rgba(75, 192, 192, 1)">${latestPHValue}</span>
  &nbsp;
  <span style="color: rgba(75, 192, 192, 1); font-size: 8px;">(latest measure)</span>
`;

            if (indicatorPH !== '') {
                headerContentPH += `&nbsp;&nbsp;${indicatorPH}`;
            }

            document.querySelector('.headerpH .title').innerHTML = headerContentPH;

            // Determine pH status
            let pHStatus = '';
            let pHIcon = '';
            let pHColor = '';

            // Check if latestPHValue is null
            if (latestPHValue === null) {
                pHStatus = 'No data';
                pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                pHColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestPHValue === 7) {
                    pHStatus = 'Neutral';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    pHColor = '#18A558'; // Color for neutral pH
                } else if (latestPHValue < 4) {
                    pHStatus = 'Very Acidic';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for very acidic pH
                } else if (latestPHValue >= 4 && latestPHValue <= 4.5) {
                    pHStatus = 'Acidic';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for acidic pH
                } else if (latestPHValue > 4.5 && latestPHValue < 7) {
                    pHStatus = 'Slightly Acidic';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for slightly acidic pH
                } else if (latestPHValue > 7 && latestPHValue < 8) {
                    pHStatus = 'Slightly Alkaline';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for slightly alkaline pH
                } else if (latestPHValue === 8) {
                    pHStatus = 'Alkaline';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for alkaline pH
                } else if (latestPHValue > 8) {
                    pHStatus = 'Very Alkaline';
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = '#BA0F30'; // Color for very alkaline pH
                }
            }


            // Create and update the pH status element
            const pHStatusElement = document.createElement('div');
            pHStatusElement.classList.add('ph-status');
            pHStatusElement.style.fontSize = '10px'; // Set font size to smaller
            pHStatusElement.style.color = 'white'; // Set font color
            pHStatusElement.style.backgroundColor = pHColor; // Set background color
            pHStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            pHStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            pHStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const pHTextSpan = document.createElement('span');
            pHTextSpan.style.display = 'flex'; // Use flexbox layout
            pHTextSpan.style.alignItems = 'center'; // Align items vertically center
            pHTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            pHTextSpan.innerHTML = `${pHIcon}&nbsp;${pHStatus}`;

            // Append the text span to the pH status element
            pHStatusElement.appendChild(pHTextSpan);

            // Append pH status below the headerpH section
            const headerPHSection = document.querySelector('.headerpH');
            headerPHSection.appendChild(pHStatusElement);


            // Find the latest and previous Temperature values
            const latestTempValue = sortedTValues[sortedTValues.length - 1];
            const previousTempValue = sortedTValues[sortedTValues.length - 2];

            // Determine the appropriate indicator based on the comparison
            let indicatorTemp = '';
            if (latestTempValue > previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestTempValue < previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            // Update the latest Temperature value in the header
            let headerContentTemp = `
  <span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">device_thermostat</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1)">${latestTempValue}</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1); font-size: 8px;">(latest measure)</span>
`;

            if (indicatorTemp !== '') {
                headerContentTemp += `&nbsp;&nbsp;${indicatorTemp}`;
            }
            document.querySelector('.headerTemp .title').innerHTML = headerContentTemp;


            // Determine temperature status
            let tempStatus = '';
            let tempIcon = '';
            let tempColor = '';

            // Check if latestTempValue is null
            if (latestTempValue === null) {
                tempStatus = 'No data';
                tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                tempColor = '#888888'; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestTempValue >= 20 && latestTempValue <= 30) {
                    tempStatus = 'Normal Temp';
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    tempColor = '#18A558'; // Color for normal temperature
                } else if (latestTempValue < 20 || latestTempValue > 30) {
                    tempStatus = latestTempValue < 20 ? 'Low Temp' : 'High Temp';
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    tempColor = '#BA0F30'; // Color for low or high temperature
                }
            }


            // Create and update the temperature status element
            const tempStatusElement = document.createElement('div');
            tempStatusElement.classList.add('temp-status');
            tempStatusElement.style.fontSize = '10px'; // Set font size to smaller
            tempStatusElement.style.color = 'white'; // Set font color
            tempStatusElement.style.backgroundColor = tempColor; // Set background color
            tempStatusElement.style.borderRadius = '20px'; // Add border radius for pill shape
            tempStatusElement.style.padding = '4px 5px'; // Add padding to adjust size
            tempStatusElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)'; // Add box shadow

            // Create a span element for the text
            const tempTextSpan = document.createElement('span');
            tempTextSpan.style.display = 'flex'; // Use flexbox layout
            tempTextSpan.style.alignItems = 'center'; // Align items vertically center
            tempTextSpan.style.marginTop = '-1px'; // Move the span up by 1px
            tempTextSpan.innerHTML = `${tempIcon}&nbsp;${tempStatus}`;

            // Append the text span to the temperature status element
            tempStatusElement.appendChild(tempTextSpan);

            // Append temperature status below the headerTemp section
            const headerTempSection = document.querySelector('.headerTemp');
            headerTempSection.appendChild(tempStatusElement);





            // Add click event listeners to the buttons
            const buttons = document.querySelectorAll('.timeTrend-buttons button');
            buttons.forEach(button => {
                button.addEventListener('click', function () {
                    const timeRange = this.textContent;
                    const endDate = new Date(); // Current date
                    let startDate;

                    // Remove 'active' class from all buttons
                    buttons.forEach(btn => btn.classList.remove('active'));
                    // Add 'active' class to the clicked button
                    this.classList.add('active');

                    switch (timeRange) {
                        case '1Dy':
                            startDate = new Date(endDate.getTime() - 1 * 24 * 60 * 60 * 1000);
                            break;
                        case '1Wk':
                            startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                            break;
                        case '2Wk':
                            startDate = new Date(endDate.getTime() - 14 * 24 * 60 * 60 * 1000);
                            break;
                        case '1Mo':
                            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate());
                            break;
                        case '3Mo':
                            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 3, endDate.getDate());
                            break;
                        case '6Mo':
                            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 6, endDate.getDate());
                            break;
                        case '1Yr':
                            startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());
                            break;
                        case '3Yr':
                            startDate = new Date(endDate.getFullYear() - 3, endDate.getMonth(), endDate.getDate());
                            break;
                        case '5Yr':
                            startDate = new Date(endDate.getFullYear() - 5, endDate.getMonth(), endDate.getDate());
                            break;
                        default:
                            return;
                    }

                    // Filter the data based on the selected time range
                    const filteredDates = sortedDates.filter(date => new Date(date) >= startDate && new Date(date) <= endDate);
                    const filteredNpkValues = sortedNpkValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                    const filteredMoistValues = sortedMoistValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                    const filteredPHValues = sortedPHValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                    const filteredTValues = sortedTValues.filter((_, index) => filteredDates.includes(sortedDates[index]));

                    // Update the charts with the filtered data
                    npkChart.data.labels = filteredDates;
                    npkChart.data.datasets[0].data = filteredNpkValues;
                    npkChart.update();

                    moistChart.data.labels = filteredDates;
                    moistChart.data.datasets[0].data = filteredMoistValues;
                    moistChart.update();

                    pHChart.data.labels = filteredDates;
                    pHChart.data.datasets[0].data = filteredPHValues;
                    pHChart.update();

                    tempChart.data.labels = filteredDates;
                    tempChart.data.datasets[0].data = filteredTValues;
                    tempChart.update();
                });
            });


        })
        .catch(function (error) {
            console.error("Error fetching data: ", error);
        });
}

// Ensure the updateLineChart function is accessible globally
window.updateLineChart = updateLineChart;


function setActiveButton(button) {
    const buttons = document.querySelectorAll('.timeTrend-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}
