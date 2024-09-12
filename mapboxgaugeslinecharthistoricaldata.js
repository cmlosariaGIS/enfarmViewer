//for mapbox
let npkChart, moistChart, pHChart, tempChart; // Declare variables to store chart instances

let npkGauge, moistGauge, pHGauge, tempGauge;

let chartData = {
    sortedDates: [],
    sortedNpkValues: [],
    sortedMoistValues: [],
    sortedPHValues: [],
    sortedTValues: []
};

let sortedDates, sortedNpkValues, sortedMoistValues, sortedPHValues, sortedTValues;




function getTranslatedText(key) {
    return translations[currentLang][key] || key;
}






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

        resetCanvas('npkGauge');
        resetCanvas('moistGauge');
        resetCanvas('pHGauge');
        resetCanvas('tempGauge');


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
        const chartInstance = Chart.getChart(canvasId);

        // If a chart instance exists, destroy it
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Clear the canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset the HTML elements containing text messages
        if (canvasId === 'npkChart' || canvasId === 'npkGauge') {
            const npkHeader = document.querySelector('.headerNPK .title');
            npkHeader.innerHTML = '';
            const npkStatus = document.querySelector('.headerNPK .nutrient-status');
            if (npkStatus) {
                npkStatus.remove();
            }
        } else if (canvasId === 'moistChart' || canvasId === 'moistGauge') {
            const moistHeader = document.querySelector('.headerMoist .title');
            moistHeader.innerHTML = '';
            const moistStatus = document.querySelector('.headerMoist .moisture-status');
            if (moistStatus) {
                moistStatus.remove();
            }
        } else if (canvasId === 'phChart' || canvasId === 'pHGauge') {
            const phHeader = document.querySelector('.headerpH .title');
            phHeader.innerHTML = '';
            const phStatus = document.querySelector('.headerpH .ph-status');
            if (phStatus) {
                phStatus.remove();
            }
        } else if (canvasId === 'tempChart' || canvasId === 'tempGauge') {
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
        } else if (canvasId === 'npkGauge') {
            npkGauge = null;
        } else if (canvasId === 'moistGauge') {
            moistGauge = null;
        } else if (canvasId === 'pHGauge') {
            pHGauge = null;
        } else if (canvasId === 'tempGauge') {
            tempGauge = null;
        }


        // Remove min-max displays
        const minMaxContainers = ['npkMinMax', 'moistMinMax', 'pHMinMax', 'tempMinMax'];
        minMaxContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) container.remove();
        });



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
                label: 'Temperature (°c)',
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




/*
function createOrUpdateGaugeCharts(latestNpkValue, latestMoistValue, latestPHValue, latestTempValue) {
    // Setup for NPK Gauge
    const npkMaxValue = 3;
    const npkThresholds = [0.5, 1];
    const latestNpkRatio = latestNpkValue / 300;

    if (npkGauge) {
        npkGauge.data.datasets[0].needleValue = latestNpkRatio;
        npkGauge.options.plugins.gaugeValue = latestNpkRatio;
        npkGauge.update();
    } else {
        npkGauge = setupGaugeChart("npkGauge", "NPK", npkThresholds, latestNpkRatio, 0, npkMaxValue, {
            colors: ["#BA0F30", "#18A558", "#BA0F30"],
            thresholdLabels: ["Insufficient", "Adequate", "Excess"]
        });
    }

    // Setup for Moisture Gauge
    const moistureThresholds = [35, 55];
    if (moistGauge) {
        moistGauge.data.datasets[0].needleValue = latestMoistValue;
        moistGauge.options.plugins.gaugeValue = latestMoistValue;
        moistGauge.update();
    } else {
        moistGauge = setupGaugeChart("moistGauge", "Moisture (%)", moistureThresholds, latestMoistValue, 0, 100, {
            colors: ["#BA0F30", "#18A558", "#BA0F30"],
            thresholdLabels: ["Insufficient", "Adequate", "Excess"],
            unit: '%'
        });
    }

    // Setup for pH Gauge
    const pHThresholds = [4, 4.5, 6.8, 7, 7.01, 8];
    if (pHGauge) {
        pHGauge.data.datasets[0].needleValue = latestPHValue;
        pHGauge.options.plugins.gaugeValue = latestPHValue;
        pHGauge.update();
    } else {
        pHGauge = setupGaugeChart("pHGauge", "pH Level", pHThresholds, latestPHValue, 0, 14, {
            colors: ["#BA0F30", "#BA0F30", "#BA0F30", "#18A558", "#BA0F30", "#BA0F30", "#BA0F30"],
            thresholdLabels: ["Very Acidic", "Acidic", "Slightly Acidic", "Neutral", "Slightly Alkaline", "Alkaline", "Very Alkaline"]
        });
    }

    // Setup for Temperature Gauge
    const tempThresholds = [20, 30];
    if (tempGauge) {
        tempGauge.data.datasets[0].needleValue = latestTempValue;
        tempGauge.options.plugins.gaugeValue = latestTempValue;
        tempGauge.update();
    } else {
        tempGauge = setupGaugeChart("tempGauge", "Temperature (°c)", tempThresholds, latestTempValue, 0, 50, {
            colors: ["#BA0F30", "#18A558", "#BA0F30"],
            thresholdLabels: ["Low Temp", "Normal Temp", "High Temp"],
            unit: '°c'
        });
    }
}*/


function createOrUpdateGaugeCharts(latestNpkValue, latestMoistValue, latestPHValue, latestTempValue) {
    // Setup for NPK Gauge
    const npkMaxValue = 3;
    const npkThresholds = [0.5, 1];
    const latestNpkRatio = latestNpkValue === null ? 0 : latestNpkValue / 300;

    if (npkGauge) {
        npkGauge.destroy();
    }
    npkGauge = setupGaugeChart("npkGauge", "NPK", npkThresholds, latestNpkRatio, 0, npkMaxValue, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Insufficient", "Adequate", "Excess"]
    });

    // Setup for Moisture Gauge
    const moistureThresholds = [35, 55];
    if (moistGauge) {
        moistGauge.destroy();
    }
    moistGauge = setupGaugeChart("moistGauge", "Moisture (%)", moistureThresholds, latestMoistValue === null ? 0 : latestMoistValue, 0, 100, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Insufficient", "Adequate", "Excess"],
        unit: '%'
    });

    // Setup for pH Gauge
    const pHThresholds = [4, 4.5, 6.8, 7, 7.01, 8];
    if (pHGauge) {
        pHGauge.destroy();
    }
    pHGauge = setupGaugeChart("pHGauge", "pH Level", pHThresholds, latestPHValue === null ? 0 : latestPHValue, 0, 14, {
        colors: ["#BA0F30", "#BA0F30", "#BA0F30", "#18A558", "#BA0F30", "#BA0F30", "#BA0F30"],
        thresholdLabels: ["Very Acidic", "Acidic", "Slightly Acidic", "Neutral", "Slightly Alkaline", "Alkaline", "Very Alkaline"]
    });

    // Setup for Temperature Gauge
    const tempThresholds = [20, 30];
    if (tempGauge) {
        tempGauge.destroy();
    }
    tempGauge = setupGaugeChart("tempGauge", "Temperature (°c)", tempThresholds, latestTempValue === null ? 0 : latestTempValue, 0, 50, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low Temp", "Normal Temp", "High Temp"],
        unit: '°c'
    });
}




function calculateMinMax(data) {
    const validData = data.filter(value => value !== null && !isNaN(value) && isFinite(value));
    if (validData.length === 0) {
        return { min: "-", max: "-" };
    }
    return {
        min: Math.min(...validData),
        max: Math.max(...validData)
    };
}



// Function to update the line chart based on cultivate_id and depth_id
function updateLineChart(cultivate_id, depth_id) {
    // Remove existing min-max displays
    ['npkMinMax', 'moistMinMax', 'pHMinMax', 'tempMinMax'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
    });

    // Ensure line charts are initialized before updating
    if (!npkChart || !moistChart || !pHChart || !tempChart) {
        return;
    }

    axios.post('https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart', {
        cultivate_id: cultivate_id
    })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            // Find the data for the specified depth_id
            const depthData = responseContent.find(item => item.in_depth == depth_id);

            if (depthData) {
                data = depthData.values;
            } else {
                console.log(`No data found for cultivateId: ${cultivate_id} and depthId: ${depth_id}`);
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
            const nutrientRatio = latestNpkValue === null ? 0 : latestNpkValue / 300;

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
    <span style="color: rgba(255, 99, 132, 1)">
        ${latestNpkValue === null ? '0.00' : latestNpkValue.toFixed(2)} 
        (${nutrientRatio.toFixed(2)})
    </span>
    &nbsp;
    <span style="color: rgba(255, 99, 132, 1); font-size: 8px;">(latest measure)</span>
`;

            if (indicatorNPK !== '') {
                headerContentNPK += `&nbsp;&nbsp;${indicatorNPK}`;
            }
            document.querySelector('.headerNPK .title').innerHTML = headerContentNPK;

            // Determine the nutrient status
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



            // After determining the nutrientStatus, create and insert the tooltip
            let tooltipContainer = document.getElementById('npk-recommendation-container');
            if (!tooltipContainer) {
                tooltipContainer = document.createElement('div');
                tooltipContainer.id = 'npk-recommendation-container';
                // Insert the container into the DOM where you want it to appear
                document.body.appendChild(tooltipContainer);
            }

            tooltipContainer.innerHTML = `
                 <span id="npkreccomendation-tooltip" class="tooltip">
                     <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                     Recommendations:
                     <p>${getNutrientRecommendation(nutrientStatus)}</p>
                 </span>
             `;


            // Remove existing nutrient status if any
            const existingNutrientStatus = document.querySelector('.headerNPK .nutrient-status');
            if (existingNutrientStatus) {
                existingNutrientStatus.remove();
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



            const { min: npkMin, max: npkMax } = calculateMinMax(sortedNpkValues);
            const npkMinMaxContainer = document.createElement('div');
            npkMinMaxContainer.id = 'npkMinMax';
            npkMinMaxContainer.style.textAlign = 'right';
            npkMinMaxContainer.style.marginBottom = '5px';
            npkMinMaxContainer.style.fontSize = '12px';
            npkMinMaxContainer.innerHTML = `
    <span style="color: rgba(255, 99, 132, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${npkMin === "-" ? "-" : npkMin.toFixed(2)} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}
    </span>
`;
            const npkChartCanvas = document.getElementById('npkChart');
            npkChartCanvas.parentNode.insertBefore(npkMinMaxContainer, npkChartCanvas);




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

            // After determining the moistureStatus, create and insert the tooltip
            let moistureTooltipContainer = document.getElementById('moisture-recommendation-container');
            if (!moistureTooltipContainer) {
                moistureTooltipContainer = document.createElement('div');
                moistureTooltipContainer.id = 'moisture-recommendation-container';
                // Insert the container into the DOM where you want it to appear
                document.body.appendChild(moistureTooltipContainer);
            }

            moistureTooltipContainer.innerHTML = `
    <span id="moisturerecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        Recommendations:
        <p>${getMoistureRecommendation(moistureStatus)}</p>
    </span>
`;

            // Before creating the new moisture status element
            const existingMoistureStatus = document.querySelector('.headerMoist .moisture-status');
            if (existingMoistureStatus) {
                existingMoistureStatus.remove();
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



            const { min: moistMin, max: moistMax } = calculateMinMax(sortedMoistValues);
            const moistMinMaxContainer = document.createElement('div');
            moistMinMaxContainer.id = 'moistMinMax';
            moistMinMaxContainer.style.textAlign = 'right';
            moistMinMaxContainer.style.marginBottom = '5px';
            moistMinMaxContainer.style.fontSize = '12px';
            moistMinMaxContainer.innerHTML = `
    <span style="color: rgba(54, 162, 235, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}
    </span>
`;
            const moistChartCanvas = document.getElementById('moistChart');
            moistChartCanvas.parentNode.insertBefore(moistMinMaxContainer, moistChartCanvas);








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

            // After determining the pHStatus, create and insert the tooltip
            let pHTooltipContainer = document.getElementById('ph-recommendation-container');
            if (!pHTooltipContainer) {
                pHTooltipContainer = document.createElement('div');
                pHTooltipContainer.id = 'ph-recommendation-container';
                // Insert the container into the DOM where you want it to appear
                document.body.appendChild(pHTooltipContainer);
            }

            pHTooltipContainer.innerHTML = `
    <span id="phrecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        Recommendations:
        <p>${getPHRecommendation(pHStatus)}</p>
    </span>
`;

            // Before creating the new pH status element
            const existingPHStatus = document.querySelector('.headerpH .ph-status');
            if (existingPHStatus) {
                existingPHStatus.remove();
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


            const { min: pHMin, max: pHMax } = calculateMinMax(sortedPHValues);
            const pHMinMaxContainer = document.createElement('div');
            pHMinMaxContainer.id = 'pHMinMax';
            pHMinMaxContainer.style.textAlign = 'right';
            pHMinMaxContainer.style.marginBottom = '5px';
            pHMinMaxContainer.style.fontSize = '12px';
            pHMinMaxContainer.innerHTML = `
    <span style="color: rgba(75, 192, 192, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + " pH"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + " pH"}
    </span>
`;
            const pHChartCanvas = document.getElementById('phChart');
            pHChartCanvas.parentNode.insertBefore(pHMinMaxContainer, pHChartCanvas);







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

            // After determining the tempStatus
            let tempTooltipContainer = document.getElementById('temp-recommendation-container');
            if (!tempTooltipContainer) {
                tempTooltipContainer = document.createElement('div');
                tempTooltipContainer.id = 'temp-recommendation-container';
                // Insert the container into the DOM where you want it to appear
                document.body.appendChild(tempTooltipContainer);
            }

            tempTooltipContainer.innerHTML = `
    <span id="temprecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        Recommendations:
        <p>${getTempRecommendation(tempStatus)}</p>
    </span>
`;

            // Before creating the new temperature status element
            const existingTempStatus = document.querySelector('.headerTemp .temp-status');
            if (existingTempStatus) {
                existingTempStatus.remove();
            }

            // Then create and append the new temperature status element

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


            const { min: tempMin, max: tempMax } = calculateMinMax(sortedTValues);
            const tempMinMaxContainer = document.createElement('div');
            tempMinMaxContainer.id = 'tempMinMax';
            tempMinMaxContainer.style.textAlign = 'right';
            tempMinMaxContainer.style.marginBottom = '5px';
            tempMinMaxContainer.style.fontSize = '12px';
            tempMinMaxContainer.innerHTML = `
    <span style="color: rgba(255, 159, 64, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}
    </span>
`;
            const tempChartCanvas = document.getElementById('tempChart');
            tempChartCanvas.parentNode.insertBefore(tempMinMaxContainer, tempChartCanvas);


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
                        case '1D':
                            startDate = new Date(endDate.getTime() - 1 * 24 * 60 * 60 * 1000);
                            break;
                        case '1W':
                            startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                            break;
                        case '2W':
                            startDate = new Date(endDate.getTime() - 14 * 24 * 60 * 60 * 1000);
                            break;
                        case '1M':
                            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate());
                            break;
                        case '3M':
                            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 3, endDate.getDate());
                            break;
                        case '6M':
                            startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 6, endDate.getDate());
                            break;
                        case '1Y':
                            startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());
                            break;
                        case '3Y':
                            startDate = new Date(endDate.getFullYear() - 3, endDate.getMonth(), endDate.getDate());
                            break;
                        case '5Y':
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

                    // Update min and max display for NPK
                    const { min: npkMin, max: npkMax } = calculateMinMax(filteredNpkValues);
                    const npkMinMaxContainer = document.getElementById('npkMinMax');
                    npkMinMaxContainer.innerHTML = `
    <span style="color: rgba(255, 99, 132, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${npkMin === "-" ? "-" : npkMin.toFixed(2)} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}
    </span>
`;


                    moistChart.data.labels = filteredDates;
                    moistChart.data.datasets[0].data = filteredMoistValues;
                    moistChart.update();


                    // Update min and max display for Moisture
                    const { min: moistMin, max: moistMax } = calculateMinMax(filteredMoistValues);
                    const moistMinMaxContainer = document.getElementById('moistMinMax');
                    moistMinMaxContainer.innerHTML = `
                        <span style="color: rgba(54, 162, 235, 1);">
                            <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                            Min: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"} 
                            <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                            Max: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}
                        </span>
                    `;


                    pHChart.data.labels = filteredDates;
                    pHChart.data.datasets[0].data = filteredPHValues;
                    pHChart.update();

                    // Update min and max display for pH
                    const { min: pHMin, max: pHMax } = calculateMinMax(filteredPHValues);
                    const pHMinMaxContainer = document.getElementById('pHMinMax');
                    pHMinMaxContainer.innerHTML = `
                        <span style="color: rgba(75, 192, 192, 1);">
                            <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                            Min: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + " pH"} 
                            <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                            Max: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + " pH"}
                        </span>
                    `;


                    tempChart.data.labels = filteredDates;
                    tempChart.data.datasets[0].data = filteredTValues;
                    tempChart.update();






                    // Update min and max display for Temperature
                    const { min: tempMin, max: tempMax } = calculateMinMax(filteredTValues);
                    const tempMinMaxContainer = document.getElementById('tempMinMax');
                    tempMinMaxContainer.innerHTML = `
    <span style="color: rgba(255, 159, 64, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}
    </span>
`;
                });
            });

            // Update gauge charts
            createOrUpdateGaugeCharts(latestNpkValue, latestMoistValue, latestPHValue, latestTempValue);

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

//Create Gauge Charts
/*function setupGaugeChart(canvasId, title, thresholds, defaultValue, minValue, maxValue, options) {
    const data = {
        datasets: [{
            data: [
                thresholds[0] - minValue,
                ...thresholds.slice(1).map((t, i) => t - thresholds[i]),
                maxValue - thresholds[thresholds.length - 1]
            ],
            backgroundColor: options.colors,
            needleValue: defaultValue,
            borderWidth: 0,
            cutout: "85%",
            circumference: 180,
            rotation: 270,
        }]
    };*/



function setupGaugeChart(canvasId, title, thresholds, defaultValue, minValue, maxValue, options) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = {
        datasets: [{
            data: [
                thresholds[0] - minValue,
                ...thresholds.slice(1).map((t, i) => t - thresholds[i]),
                maxValue - thresholds[thresholds.length - 1]
            ],
            backgroundColor: options.colors,
            needleValue: defaultValue,
            borderWidth: 0,
            cutout: "85%",
            circumference: 180,
            rotation: 270,
        }]
    };

    const gaugeNeedle = {
        id: "gaugeNeedle",
        afterDatasetDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
            ctx.save();

            // Add padding to the chart area
            const padding = 2;
            const adjustedLeft = left + padding;
            const adjustedRight = right - padding;
            const adjustedWidth = width - 2 * padding;

            const needleValue = data.datasets[0].needleValue;
            const angle = Math.PI + (1 / (maxValue - minValue)) * (needleValue - minValue) * Math.PI;

            const cx = adjustedLeft + adjustedWidth / 2;
            const cy = chart._metasets[0].data[0].y + 10;

            // Draw needle
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -2);
            ctx.lineTo(height / 2, 0);
            ctx.lineTo(0, 2);
            ctx.fillStyle = "#444";
            ctx.fill();

            // Draw needle dot
            ctx.translate(-cx, -cy);
            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Add text
            ctx.font = "12px 'Be Vietnam', sans-serif";
            ctx.fillStyle = "#444";
            ctx.textAlign = "center";
            ctx.fillText(title, cx, cy - 83);

            // Null Values
            ctx.font = "bold 16px Be Vietnam";
            // Display "0.00" for null values
            const displayValue = chart.options.plugins.gaugeValue === 0 ? "0.00" : chart.options.plugins.gaugeValue.toFixed(2);
            ctx.fillText(`${displayValue}${options.unit || ''}`, cx, cy - 20);


            // Draw ticks and labels
            const radius = height / 2 + 15;
            ctx.font = "8px 'Be Vietnam', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            let tickValues;
            if (title === "NPK") {
                tickValues = [0.5, 0.5, 1, 2];
            } else if (title === "Moisture (%)") {
                tickValues = [35, 50, 75];
            } else if (title === "pH Level") {
                tickValues = [2, 4, 7, 10, 12];
            } else if (title === "Temperature (°c)") {
                tickValues = [10, 20, 30, 40];
            }

            tickValues.forEach(value => {
                const angle = Math.PI + ((value - minValue) / (maxValue - minValue)) * Math.PI;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;

                // Draw label
                const labelRadius = radius - 25;
                const labelX = cx + Math.cos(angle) * labelRadius;
                const labelY = cy + Math.sin(angle) * labelRadius;
                ctx.fillText(value.toString() + (options.unit || ''), labelX, labelY);
            });

            // Add min and max values
            ctx.font = "10px 'Be Vietnam', sans-serif";
            ctx.textAlign = "left";
            ctx.fillText(`${minValue}${options.unit || ''}`, adjustedLeft, bottom - 20);
            ctx.textAlign = "right";
            ctx.fillText(`${maxValue}${options.unit || ''}`, adjustedRight, bottom - 20);

            // Add threshold labels
            if (options.thresholdLabels) {
                ctx.font = "10px 'Be Vietnam', sans-serif";
                ctx.textAlign = "center";
                const labelY = bottom + 15;
                const labelCount = options.thresholdLabels.length;
                options.thresholdLabels.forEach((label, index) => {
                    const labelX = adjustedLeft + adjustedWidth * (index + 0.5) / labelCount;
                    ctx.fillText(label, labelX, labelY);
                });
            }
        }
    };

    const config = {
        type: "doughnut",
        data,
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                gaugeValue: defaultValue
            },
        },
        plugins: [gaugeNeedle],
    };

    return new Chart(document.getElementById(canvasId), config);
}


////Hover Reccomendations 
//Hover reccomendations for NPK
function getNutrientRecommendation(status) {
    switch (status) {
        case "Insufficient Nutrients":
            return `
            • Test soil pH and adjust if necessary for better nutrient availability<br>
            • Monitor plants closely for signs of deficiency
            • Apply a balanced NPK fertilizer immediately<br>
            • Consider foliar feeding for quick nutrient uptake<br>
            • Increase organic matter in soil through mulching or compost<br>
            `;
        case "Average Nutrients":
            return `
            • Maintain current fertilization schedule<br>
            • Apply a light dose of balanced NPK fertilizer<br>
            • Continue regular soil testing to monitor nutrient levels<br>
            • Implement crop rotation or cover crops to improve soil health<br>
            • Use organic mulch to retain moisture and slowly release nutrients
            `;
        case "Adequate Nutrients":
            return `
            • Maintain current soil management practices<br>
            • Monitor plant growth and yield to ensure continued optimal nutrition<br>
            • Consider slight reduction in fertilizer application to prevent excess<br>
            • Focus on maintaining soil organic matter through mulching<br>
            • Implement precision farming techniques for efficient nutrient use
            `;
        case "Excess Nutrients":
            return `
            • Consider adjusting soil pH to reduce nutrient availability if chronic<br>
            • Monitor for nutrient toxicity symptoms and soil/water pollution<br>
            • Stop fertilizer application immediately<br>
            • Increase irrigation to help leach excess nutrients (carefully to avoid runoff)<br>
            • Plant cover crops or green manures to absorb excess nutrients
            `;
        case "No data":
            return `
            • No reccomendations at the moment.
            `;
        default:
            return "No specific recommendations available.";
    }
}

//Hover reccomendations for Moisture
function getMoistureRecommendation(status) {
    switch (status) {
        case "Very dry":
            return `
            • Increase irrigation immediately<br>
            • Apply mulch to retain soil moisture<br>
            • Consider installing drip irrigation for efficient water use<br>
            • Use drought-resistant varieties if persistent<br>
            • Monitor plants closely for signs of water stress
            `;
        case "Lack of water":
            return `
            • Increase watering frequency<br>
            • Check and adjust irrigation system if necessary<br>
            • Apply organic matter to improve soil water retention<br>
            • Use mulch to reduce evaporation<br>
            • Consider temporary shade for sensitive plants
            `;
        case "Enough moisture":
            return `
            • Maintain current irrigation practices<br>
            • Monitor weather forecasts to adjust watering as needed<br>
            • Continue using mulch to retain moisture<br>
            • Ensure proper drainage to prevent waterlogging<br>
            • Regularly check soil moisture to maintain optimal levels
            `;
        case "Excess water":
            return `
            • Reduce irrigation immediately<br>
            • Improve soil drainage if necessary<br>
            • Avoid overwatering, especially during rainy periods<br>
            • Check for and fix any leaks in irrigation system<br>
            • Monitor for signs of root rot or fungal diseases
            `;
        case "No data":
            return `
            • No recommendations at the moment.
            `;
        default:
            return "No specific recommendations available.";
    }
}

//Hover reccomendations for pH
function getPHRecommendation(status) {
    switch (status) {
        case "Very Acidic":
            return `
            • Apply lime to raise soil pH<br>
            • Use dolomitic lime if magnesium is also low<br>
            • Avoid using acidifying fertilizers<br>
            • Consider growing acid-loving plants if pH can't be raised<br>
            • Monitor pH regularly and adjust as needed
            `;
        case "Acidic":
            return `
            • Apply lime in smaller quantities to gradually raise pH<br>
            • Use organic matter to buffer pH changes<br>
            • Choose plants that tolerate slightly acidic conditions<br>
            • Avoid over-application of nitrogen fertilizers<br>
            • Test soil regularly to track pH changes
            `;
        case "Slightly Acidic":
            return `
            • Monitor pH levels closely<br>
            • Use pH-neutral fertilizers<br>
            • Add organic matter to stabilize soil pH<br>
            • Consider minor lime applications if pH continues to drop<br>
            • Choose plants suitable for slightly acidic soils
            `;
        case "Neutral":
            return `
            • Maintain current soil management practices<br>
            • Use balanced fertilizers to avoid pH shifts<br>
            • Monitor pH regularly to ensure it stays neutral<br>
            • Add organic matter to improve soil buffering capacity<br>
            • Ideal for most crops - no major adjustments needed
            `;
        case "Slightly Alkaline":
            return `
            • Monitor pH levels closely<br>
            • Use acidifying fertilizers if needed<br>
            • Add organic matter to help lower pH gradually<br>
            • Consider adding elemental sulfur in small amounts<br>
            • Choose plants tolerant of slightly alkaline conditions
            `;
        case "Alkaline":
            return `
            • Apply elemental sulfur to lower soil pH<br>
            • Use acidifying fertilizers like ammonium sulfate<br>
            • Add organic matter to improve soil structure and pH<br>
            • Consider growing alkaline-tolerant plants<br>
            • Test soil regularly and adjust treatments as needed
            `;
        case "Very Alkaline":
            return `
            • Apply larger amounts of elemental sulfur to lower pH<br>
            • Use acid-forming organic materials (e.g., peat moss)<br>
            • Avoid using alkaline water for irrigation if possible<br>
            • Consider raised beds with controlled soil pH for sensitive crops<br>
            • Monitor pH changes closely and adjust strategy as needed
            `;
        case "No data":
            return `
            • No recommendations at the moment. Conduct a soil pH test.
            `;
        default:
            return "No specific recommendations available.";
    }
}


//Hover reccomendations for Temp
function getTempRecommendation(status) {
    switch (status) {
        case "Normal Temp":
            return `
            • Maintain current temperature management practices<br>
            • Monitor for any sudden changes in temperature<br>
            • Ensure proper air circulation in the growing area<br>
            • Continue regular plant health checks<br>
            • Adjust watering based on temperature and plant needs
            `;
        case "Low Temp":
            return `
            • Protect plants from frost if temperature drops further<br>
            • Use row covers or cold frames for sensitive crops<br>
            • Delay planting of warm-season crops if early in the season<br>
            • Reduce watering frequency to prevent waterlogging<br>
            • Consider using heating systems in greenhouses if applicable
            `;
        case "High Temp":
            return `
            • Increase watering frequency to prevent dehydration<br>
            • Provide shade for sensitive plants during peak heat hours<br>
            • Mulch around plants to retain soil moisture and cool roots<br>
            • Avoid fertilizing during extreme heat to prevent stress<br>
            • Monitor for signs of heat stress and adjust care accordingly
            `;
        case "No data":
            return `
            • No recommendations at the moment. Check temperature monitoring equipment.
            `;
        default:
            return "No specific recommendations available.";
    }
}