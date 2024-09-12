//as of 08/29/2024

//gaugeslinecharthistoricaldata.js

//partially working 
//NPk is exclusive to Coffee
//ndt, p205 and k20 is exclusive to Durian
//Temperature, Mositure and pH are common to Coffee and Durian...





function toggleFarmTypeElements() {
    document.querySelectorAll('[data-farm-type]').forEach(element => {
        if (element.dataset.farmType === 'both' || element.dataset.farmType === farmType) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}


let treeType = "";
let farmType = "";

//Exclusive to Coffee
let npkChart
let npkGauge

//Exclusive to Durian
let ndtChart, p205Chart, k2oChart; // New chart instances
let ndtGauge, p205Gauge, k2oGauge; // New gauge instances

//Common between Durian and Coffee
let moistChart, pHChart, tempChart; // Existing chart instances
let moistGauge, pHGauge, tempGauge; // Existing gauge instances

let chartData = {
    sortedNpkValues: [], //Exclusive to Coffee
    sortedNdtValues: [], //Exclusive to Durian
    sortedP205Values: [],//Exclusive to Durian
    sortedk2oValues: [], //Exclusive to Durian

    //Common between Durian and Coffee
    sortedDates: [],
    sortedMoistValues: [],
    sortedPHValues: [],
    sortedTValues: []
};

//Exclusive to Coffee
let sortedNpkValues

//Exclusive to Durian
let sortedNdtValues, sortedP205Values, sortedk2oValues;

//Common between Durian and Coffee
let sortedDates, sortedMoistValues, sortedPHValues, sortedTValues;

// Language switching
function getTranslatedText(key) {
    return translations[currentLang][key] || key;
}

document.addEventListener("DOMContentLoaded", function () {
    const popupHistoricalSoilData = document.querySelector(".popup-historicalsoildata");
    popupHistoricalSoilData.style.display = "none"; // Hide the popup initially

    // Initialize charts and gauges once the DOM is loaded
    //initializeChartsAndGauges();
});

document.addEventListener("DOMContentLoaded", function () {
    var closeBtn = document.querySelector(".close-btn");
    var popup = document.querySelector(".popup-historicalsoildata");
    closeBtn.addEventListener("click", function () {
        // Destroy existing chart instances and reset canvas
        resetCharts();

        popup.style.display = "none"; // Hide the popup when the close button is clicked
    });
});


function resetCharts() {
    // Destroy existing line chart instances
    if (npkChart) { //Coffee
        npkChart.destroy();
        npkChart = null;
    }
    if (ndtChart) { //Exclusive to Durian
        ndtChart.destroy();
        ndtChart = null;
    }
    if (p205Chart) { //Exclusive to Durian
        p205Chart.destroy();
        p205Chart = null;
    }
    if (k2oChart) { //Exclusive to Durian
        k2oChart.destroy();
        k2oChart = null;
    }
    if (moistChart) { //Common between Durian and Coffee
        moistChart.destroy();
        moistChart = null;
    }
    if (pHChart) { //Common between Durian and Coffee
        pHChart.destroy();
        pHChart = null;
    }
    if (tempChart) { //Common between Durian and Coffee
        tempChart.destroy();
        tempChart = null;
    }


    // Destroy existing gauge chart instances
    if (npkGauge) { //Exclusive to Coffee
        npkGauge.destroy();
        npkGauge = null;
    }
    if (ndtGauge) { //Exclusive to Durian
        ndtGauge.destroy();
        ndtGauge = null;
    }
    if (p205Gauge) { //Exclusive to Durian
        p205Gauge.destroy();
        p205Gauge = null;
    }
    if (k2oGauge) { //Exclusive to Durian
        k2oGauge.destroy();
        k2oGauge = null;
    }
    if (moistGauge) { //Common between Durian and Coffee
        moistGauge.destroy();
        moistGauge = null;
    }
    if (pHGauge) { //Common between Durian and Coffee
        pHGauge.destroy();
        pHGauge = null;
    }
    if (tempGauge) { //Common between Durian and Coffee
        tempGauge.destroy();
        tempGauge = null;
    }

    // Reset HTML elements containing text messages
    resetChartMessages();

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('.timeTrend-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Remove min-max displays
    const npkMinMax = document.getElementById('npkMinMax');  //Exclusive to Coffee
    if (npkMinMax) npkMinMax.remove();

    const ndtMinMax = document.getElementById('ndtMinMax'); //Exclusive to Durian
    if (ndtMinMax) ndtMinMax.remove();

    const p205MinMax = document.getElementById('p205MinMax'); //Exclusive to Durian
    if (p205MinMax) p205MinMax.remove();

    const k2oMinMax = document.getElementById('k2oMinMax'); //Exclusive to Durian
    if (k2oMinMax) k2oMinMax.remove();

    const moistMinMax = document.getElementById('moistMinMax');    //Common between Durian and Coffee
    if (moistMinMax) moistMinMax.remove();

    const pHMinMax = document.getElementById('pHMinMax');     //Common between Durian and Coffee
    if (pHMinMax) pHMinMax.remove();

    const tempMinMax = document.getElementById('tempMinMax');     //Common between Durian and Coffee
    if (tempMinMax) tempMinMax.remove();
}

function resetChartMessages() {
    // Reset the HTML elements containing text messages
    //Exclusive to Coffee
    const npkHeader = document.querySelector('.headerNPK .title');
    if (npkHeader) npkHeader.innerHTML = '';
    const npkStatus = document.querySelector('.headerNPK .nutrient-status');
    if (npkStatus) npkStatus.remove();

    //Exclusive to Durian
    const ndtHeader = document.querySelector('.headerNDT .title');
    if (ndtHeader) ndtHeader.innerHTML = '';
    const ndtStatus = document.querySelector('.headerNDT .ndt-status');
    if (ndtStatus) ndtStatus.remove();

    //Exclusive to Durian
    const p205Header = document.querySelector('.headerP205 .title');
    if (p205Header) p205Header.innerHTML = '';
    const p205Status = document.querySelector('.headerP205 .p205-status');
    if (p205Status) p205Status.remove();

    //Exclusive to Durian
    const k2oHeader = document.querySelector('.headerk2o .title');
    if (k2oHeader) k2oHeader.innerHTML = '';
    const k2oStatus = document.querySelector('.headerk2o .k2o-status');
    if (k2oStatus) k2oStatus.remove();

    //Common between Durian and Coffee
    const moistHeader = document.querySelector('.headerMoist .title');
    if (moistHeader) moistHeader.innerHTML = '';
    const moistStatus = document.querySelector('.headerMoist .moisture-status');
    if (moistStatus) moistStatus.remove();

    //Common between Durian and Coffee
    const phHeader = document.querySelector('.headerpH .title');
    if (phHeader) phHeader.innerHTML = '';
    const phStatus = document.querySelector('.headerpH .ph-status');
    if (phStatus) phStatus.remove();

    //Common between Durian and Coffee
    const tempHeader = document.querySelector('.headerTemp .title');
    if (tempHeader) tempHeader.innerHTML = '';
    const tempStatus = document.querySelector('.headerTemp .temp-status');
    if (tempStatus) tempStatus.remove();

    // Clear gauge chart canvases
    clearGaugeCanvas('npkGauge'); //Exclusive to Coffee
    clearGaugeCanvas('ndtGauge'); //Exclusive to Durian
    clearGaugeCanvas('p205Gauge'); //Exclusive to Durian
    clearGaugeCanvas('k2oGauge'); //Exclusive to Durian
    clearGaugeCanvas('moistGauge');  //Common between Durian and Coffee
    clearGaugeCanvas('pHGauge');  //Common between Durian and Coffee
    clearGaugeCanvas('tempGauge');  //Common between Durian and Coffee

}


function clearGaugeCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}


//Exclusive to Coffee
// Set up the NPK observer
function setupNPKObserver() {
    const observerTarget = document.querySelector('.headerNPK');
    if (observerTarget) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    //console.log('NPK status element changed:', document.querySelector('.nutrient-status'));
                }
            });
        });
        observer.observe(observerTarget, { childList: true, subtree: true });
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setupNPKObserver);

// Listen for NPK status updates
document.addEventListener('npkStatusUpdated', (event) => {
    //console.log('NPK status updated:', event.detail);
});

// Modify createOrUpdateGaugeCharts function
function createOrUpdateGaugeCharts(latestMoistValue, latestPHValue, latestTempValue, latestNdtValue, latestP205Value, latestk2oValue) {
    // Common gauges
    moistGauge = updateOrCreateGauge(moistGauge, "moistGauge", "Độ ẩm (%)", [35, 55], latestMoistValue, 0, 100, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Insufficient", "Adequate", "Excess"],
        unit: '%'
    });

    pHGauge = updateOrCreateGauge(pHGauge, "pHGauge", "pH", [0, 6.80, 7, 7.20, 14], latestPHValue, 0, 14, {
        colors: ["#BA0F30", "#BA0F30", "#BA0F30", "#18A558", "#BA0F30", "#BA0F30", "#BA0F30"],
        thresholdLabels: ["Very Acidic", "Acidic", "Slightly Acidic", "Neutral", "Slightly Alkaline", "Alkaline", "Very Alkaline"]
    });

    tempGauge = updateOrCreateGauge(tempGauge, "tempGauge", "Nhiệt độ (°c)", [20, 30], latestTempValue, 0, 50, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low Temp", "Normal Temp", "High Temp"],
        unit: '°c'
    });

    // Create NDT, P2O5, and K2O gauges for both farm types
    ndtGauge = updateOrCreateGauge(ndtGauge, "ndtGauge", "NDT (ppm)", [50, 100], latestNdtValue, 0, 200, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low", "Normal", "High"],
        unit: 'ppm'
    });

    p205Gauge = updateOrCreateGauge(p205Gauge, "p205Gauge", "P2O5 (ppm)", [20, 60], latestP205Value, 0, 100, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low", "Normal", "High"],
        unit: 'ppm'
    });

    k2oGauge = updateOrCreateGauge(k2oGauge, "k2oGauge", "K2O (ppm)", [100, 200], latestk2oValue, 0, 300, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low", "Normal", "High"],
        unit: 'ppm'
    });
}


function updateOrCreateGauge(gauge, canvasId, title, thresholds, value, minValue, maxValue, options) {
    if (gauge) {
        gauge.data.datasets[0].needleValue = value === null ? 0 : value;
        gauge.options.plugins.gaugeValue = value === null ? 0 : value;
        gauge.update();
    } else {
        gauge = setupGaugeChart(canvasId, title, thresholds, value === null ? 0 : value, minValue, maxValue, options);
    }
    return gauge;
}

// Function to get translated labels
function getTranslatedLabels(key) {
    return currentLang === 'vi' ? translations.vi[key] : translations.en[key];
}


function recreateGaugeCharts() {


    //Exlusive to Coffee
    // Setup for NPK Gauge
    const npkMaxValue = 3;
    const npkThresholds = [0.5, 0.75, 1];
    npkGauge = setupGaugeChart("npkGauge", "NPK", npkThresholds, 0, 0, npkMaxValue, {
        colors: ["#BA0F30", "#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Insufficient", "Average", "Adequate", "Excess"]
    });

    //Exlusive to Durian
    // Setup for NDT Gauge
    const ndtThresholds = [50, 100];
    ndtGauge = setupGaugeChart("ndtGauge", "NDT (ppm)", ndtThresholds, 0.15, 0, 200, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low", "Normal", "High"],
        unit: '%'
    });

    //Exlusive to Durian
    // Setup for P2O5 Gauge
    const p2o5Thresholds = [20, 60];
    p2o5Gauge = setupGaugeChart("p2o5Gauge", "P2O5 (ppm)", p2o5Thresholds, 40, 0, 100, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low", "Normal", "High"],
        unit: 'ppm'
    });

    //Exlusive to Durian
    // Setup for K2O Gauge
    const k2oThresholds = [100, 200];
    k2oGauge = setupGaugeChart("k2oGauge", "K2O (ppm)", k2oThresholds, 150, 0, 300, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low", "Normal", "High"],
        unit: 'ppm'
    });

    //Common to Durian and Coffee
    // Setup for Moisture Gauge
    const moistureThresholds = [35, 55];
    moistGauge = setupGaugeChart("moistGauge", "Độ ẩm (%)", moistureThresholds, 0, 0, 100, {
        colors: ["#BA0F30", "#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Rất khô", "Thiếu nước", "Đủ ẩm", "Thừa nước"],
        unit: '%'
    });

    //Common to Durian and Coffee
    // Setup for pH Gauge
    const pHThresholds = [4, 4.5, 7, 8];
    pHGauge = setupGaugeChart("pHGauge", "pH", pHThresholds, 7, 0, 14, {
        colors: ["#BA0F30", "#BA0F30", "#BA0F30", "#18A558", "#BA0F30", "#BA0F30", "#BA0F30"],
        thresholdLabels: ["Very Acidic", "Acidic", "Slightly Acidic", "Neutral", "Slightly Alkaline", "Alkaline", "Very Alkaline"]
    });

    //Common to Durian and Coffee
    // Setup for Temperature Gauge
    const tempThresholds = [20, 30];
    tempGauge = setupGaugeChart("tempGauge", "Nhiệt độ (°c)", tempThresholds, 25, 0, 50, {
        colors: ["#BA0F30", "#18A558", "#BA0F30"],
        thresholdLabels: ["Low Temp", "Normal Temp", "High Temp"],
        unit: '°c'
    });
}

// Fetch and show min max values
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

window.addEventListener('soilDataRequested', function (event) {
    const { cultivateId, inDepth, treeType: eventTreeType, lat, lng, farmName, farmAddress } = event.detail;

    // Reset existing charts
    resetCharts();

    // Set the tree type and farm type
    treeType = eventTreeType;
    farmType = treeType.toLowerCase();

    // Toggle visibility of farm-specific elements
    toggleFarmTypeElements();

    // Store the lat and long in data attributes
    const popupHistoricalSoilData = document.querySelector('.popup-historicalsoildata');
    popupHistoricalSoilData.dataset.lat = lat;
    popupHistoricalSoilData.dataset.lng = lng;

    // Update farm name and address in the HTML
    document.getElementById('farmName').textContent = farmName || 'Farm Name';
    document.getElementById('address').textContent = farmAddress || 'Address';



    axios
        .post("https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart", { cultivate_id: cultivateId })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            if (responseContent.length === 1) {
                // If there is only one element in the array, use its values
                data = responseContent[0].values;
            } else if (responseContent.length > inDepth) {
                // If the array has multiple elements, access the values using the inDepth
                data = responseContent[inDepth].values;
            } else {
                console.log(`No data found for cultivateId: ${cultivateId} and inDepth: ${inDepth}`);
                return;
            }




            /*
            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));
            const sortedIndices = sortedDates.map((date) => data.created_at.indexOf(date));
            const sortedNpkValues = sortedIndices.map((index) => data.npk[index]); //Exclusive to Coffee
            const sortedNdtValues = sortedIndices.map((index) => data.ndt[index]); //Exclusive to Durian
            const sortedP205Values = sortedIndices.map((index) => data.p2o5[index]); //Exclusive to Durian
            const sortedk2oValues = sortedIndices.map((index) => data.k2o[index]); //Exclusive to Durian
            const sortedMoistValues = sortedIndices.map((index) => data.moist[index]); //Common to Durian and Coffee
            const sortedPHValues = sortedIndices.map((index) => data.pH[index]); //Common to Durian and Coffee
            const sortedTValues = sortedIndices.map((index) => data.t[index]); //Common to Durian and Coffee
            */


            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));
            const sortedIndices = sortedDates.map((date) => data.created_at.indexOf(date));

            let sortedNdtValues = [];
            let sortedP205Values = [];
            let sortedk2oValues = [];
            const sortedMoistValues = sortedIndices.map((index) => data.moist[index]);
            const sortedPHValues = sortedIndices.map((index) => data.pH[index]);
            const sortedTValues = sortedIndices.map((index) => data.t[index]);


            // Check if NDT, P2O5, and K2O data exists (Durian)
            if (data.ndt && data.p2o5 && data.k2o) {
                sortedNdtValues = sortedIndices.map((index) => data.ndt[index]);
                sortedP205Values = sortedIndices.map((index) => data.p2o5[index]);
                sortedk2oValues = sortedIndices.map((index) => data.k2o[index]);
            }



            //console.log("NDT Values:", sortedNdtValues);
            //console.log("P205 Values:", sortedP205Values);
            //console.log("k2o Values:", sortedk2oValues);

            function createGradient(ctx, startColor, endColor) {
                const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                return gradient;
            }



            // Modify the chart creation logic section

            function createLineChart(canvasId, dates, values, label, color) {
                const ctx = document.getElementById(canvasId).getContext("2d");
                const gradient = createGradient(ctx, color.replace("1)", "0.8)"), color.replace("1)", "0)"));
                const { min, max } = calculateMinMax(values);

                let minMaxContainer = document.getElementById(`${canvasId}MinMax`);
                if (!minMaxContainer) {
                    minMaxContainer = createMinMaxContainer(canvasId);
                }

                updateMinMaxDisplay(minMaxContainer, min, max, label);

                const formattedDates = dates.map(date => {
                    const d = new Date(date);
                    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                });

                const chart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: formattedDates,
                        datasets: [{
                            label: label,
                            data: values,
                            borderColor: "rgba(255, 255, 255, 1)",
                            backgroundColor: gradient,
                            borderWidth: 2,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: "gray",
                                    font: {
                                        size: 14
                                    }
                                },
                                grid: {
                                    color: "rgba(255, 255, 255, 0.2)",
                                    borderColor: "rgba(255, 255, 255, 0.5)"
                                }
                            },
                            x: {
                                ticks: {
                                    color: "gray",
                                    font: {
                                        size: 12
                                    },
                                    maxRotation: 45,
                                    minRotation: 45
                                },
                                grid: {
                                    color: "rgba(255, 255, 255, 0.2)",
                                    borderColor: "rgba(255, 255, 255, 0.5)"
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                labels: {
                                    color: "gray",
                                    font: {
                                        //weight: "bold"
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: `${label}`,
                                color: "gray",
                                font: {
                                    size: 12,
                                    weight: "bold"
                                }
                            },
                            tooltip: {
                                mode: "index",
                                intersect: false,
                                titleColor: "white",
                                bodyColor: "white",
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                displayColors: false,
                                callbacks: {
                                    label: function (context) {
                                        return `${label}: ${context.parsed.y.toFixed(1)}`;
                                    }
                                }
                            }
                        },
                        hover: {
                            mode: "nearest",
                            intersect: false
                        }
                    }
                });

                return chart;
            }

            // Use this functions to create charts
            if (sortedNdtValues.length > 0) {
                ndtChart = createLineChart("ndtChart", sortedDates, sortedNdtValues, "NDT (ppm)", "rgba(255, 99, 132, 1)");
                const latestNdtValue = sortedNdtValues[sortedNdtValues.length - 1];
                const previousNdtValue = sortedNdtValues[sortedNdtValues.length - 2];
                let indicatorNdt = "";
                if (latestNdtValue > previousNdtValue) {
                    indicatorNdt = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestNdtValue < previousNdtValue) {
                    indicatorNdt = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }
                let headerContentNdt = `
                <span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>
                &nbsp;
                <span style="color: rgba(255, 99, 132, 1)">${latestNdtValue !== null ? latestNdtValue.toFixed(1) : 'N/A'}</span>
                &nbsp;
                <span style="color: rgba(255, 99, 132, 1); font-size: 8px;" data-translate="latest measure">${getTranslatedText("latest measure")}</span>
            `;
                if (indicatorNdt !== "") {
                    headerContentNdt += `&nbsp;&nbsp;${indicatorNdt}`;
                }

                document.querySelector(".headerNDT .title").innerHTML = headerContentNdt;
                let ndtStatus = "";
                let ndtIcon = "";
                let ndtColor = "";

                if (latestNdtValue === null) {
                    ndtStatus = `<span data-translate="No data">${getTranslatedText("No data")}</span>`;
                    ndtIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    ndtColor = "#888888";
                } else {
                    if (latestNdtValue >= 50 && latestNdtValue <= 100) {
                        ndtStatus = `<span data-translate="Average NDT">${getTranslatedText("Average NDT")}</span>`;
                        ndtIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        ndtColor = "#18A558";
                    } else if (latestNdtValue < 50) {
                        ndtStatus = `<span data-translate="Very Low NDT">${getTranslatedText("Very Low NDT")}</span>`;
                        ndtIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        ndtColor = "#BA0F30";
                    } else {
                        ndtStatus = `<span data-translate="High NDT">${getTranslatedText("High NDT")}</span>`;
                        ndtIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        ndtColor = "#BA0F30";
                    }
                }

                let ndtStatusElement = document.querySelector(".ndt-status");
                if (!ndtStatusElement) {
                    ndtStatusElement = document.createElement("div");
                    ndtStatusElement.classList.add("ndt-status");
                }
                ndtStatusElement.style.fontSize = "10px";
                ndtStatusElement.style.color = "white";
                ndtStatusElement.style.backgroundColor = ndtColor;
                ndtStatusElement.style.borderRadius = "20px";
                ndtStatusElement.style.padding = "4px 5px";
                ndtStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                const ndtTextSpan = document.createElement("span");
                ndtTextSpan.style.display = "flex";
                ndtTextSpan.style.alignItems = "center";
                ndtTextSpan.style.marginTop = "-1px";
                ndtTextSpan.innerHTML = `${ndtIcon}&nbsp;${ndtStatus}`;
                ndtStatusElement.innerHTML = '';
                ndtStatusElement.appendChild(ndtTextSpan);
                const headerNdtSection = document.querySelector(".headerNDT");
                headerNdtSection.appendChild(ndtStatusElement);

                const ndtRecommendations = getNdtRecommendation(ndtStatus);
                let ndtTooltipContainer = document.getElementById('ndt-recommendation-container');
                if (!ndtTooltipContainer) {
                    ndtTooltipContainer = document.createElement('div');
                    ndtTooltipContainer.id = 'ndt-recommendation-container';
                    document.body.appendChild(ndtTooltipContainer);
                }
                ndtTooltipContainer.innerHTML = `
                <span id="ndtrecommendation-tooltip" class="tooltip">
                    <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                    <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
                    <p>${ndtRecommendations[currentLang]}</p>
                </span>
            `;
            }


            if (sortedP205Values.length > 0) {
                p205Chart = createLineChart("p205Chart", sortedDates, sortedP205Values, "P2O5 (ppm)", "rgba(75, 192, 192, 1)");
                const latestP205Value = sortedP205Values[sortedP205Values.length - 1];
                const previousP205Value = sortedP205Values[sortedP205Values.length - 2];
                let indicatorP205 = "";
                if (latestP205Value > previousP205Value) {
                    indicatorP205 = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestP205Value < previousP205Value) {
                    indicatorP205 = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }
                let headerContentP205 = `
                    <span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">bubble_chart</span>
                    &nbsp;
                    <span style="color: rgba(75, 192, 192, 1)">${latestP205Value !== null ? latestP205Value.toFixed(1) : 'N/A'}</span>
                    &nbsp;
                    <span style="color: rgba(75, 192, 192, 1); font-size: 8px;" data-translate="latest measure">${getTranslatedText("latest measure")}</span>
                `;
                if (indicatorP205 !== "") {
                    headerContentP205 += `&nbsp;&nbsp;${indicatorP205}`;
                }

                document.querySelector(".headerP205 .title").innerHTML = headerContentP205;
                let p205Status = "";
                let p205Icon = "";
                let p205Color = "";

                if (latestP205Value === null) {
                    p205Status = `<span data-translate="No data">${getTranslatedText("No data")}</span>`;
                    p205Icon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    p205Color = "#888888";
                } else {
                    if (latestP205Value >= 20 && latestP205Value <= 60) {
                        p205Status = `<span data-translate="Average P2O5">${getTranslatedText("Average P2O5")}</span>`;
                        p205Icon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        p205Color = "#18A558";
                    } else if (latestP205Value < 20) {
                        p205Status = `<span data-translate="Very Low P2O5">${getTranslatedText("Very Low P2O5")}</span>`;
                        p205Icon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        p205Color = "#BA0F30";
                    } else {
                        p205Status = `<span data-translate="High P2O5">${getTranslatedText("High P2O5")}</span>`;
                        p205Icon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        p205Color = "#BA0F30";
                    }
                }

                let p205StatusElement = document.querySelector(".p205-status");
                if (!p205StatusElement) {
                    p205StatusElement = document.createElement("div");
                    p205StatusElement.classList.add("p205-status");
                }
                p205StatusElement.style.fontSize = "10px";
                p205StatusElement.style.color = "white";
                p205StatusElement.style.backgroundColor = p205Color;
                p205StatusElement.style.borderRadius = "20px";
                p205StatusElement.style.padding = "4px 5px";
                p205StatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                const p205TextSpan = document.createElement("span");
                p205TextSpan.style.display = "flex";
                p205TextSpan.style.alignItems = "center";
                p205TextSpan.style.marginTop = "-1px";
                p205TextSpan.innerHTML = `${p205Icon}&nbsp;${p205Status}`;
                p205StatusElement.innerHTML = '';
                p205StatusElement.appendChild(p205TextSpan);
                const headerP205Section = document.querySelector(".headerP205");
                headerP205Section.appendChild(p205StatusElement);

                const p205Recommendations = getP205Recommendation(p205Status);
                let p205TooltipContainer = document.getElementById('p205-recommendation-container');
                if (!p205TooltipContainer) {
                    p205TooltipContainer = document.createElement('div');
                    p205TooltipContainer.id = 'p205-recommendation-container';
                    document.body.appendChild(p205TooltipContainer);
                }
                p205TooltipContainer.innerHTML = `
                    <span id="p205recommendation-tooltip" class="tooltip">
                        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
                        <p>${p205Recommendations[currentLang]}</p>
                    </span>
                `;
            }

            if (sortedk2oValues.length > 0) {
                k2oChart = createLineChart("k2oChart", sortedDates, sortedk2oValues, "K2O (ppm)", "rgba(153, 102, 255, 1)");

                const latestk2oValue = sortedk2oValues[sortedk2oValues.length - 1];
                const previousk2oValue = sortedk2oValues[sortedk2oValues.length - 2];
                let indicatork2o = "";
                if (latestk2oValue > previousk2oValue) {
                    indicatork2o = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestk2oValue < previousk2oValue) {
                    indicatork2o = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }
                let headerContentk2o = `
                    <span class="material-symbols-outlined" style="color: rgba(153, 102, 255, 1);">bubble_chart</span>
                    &nbsp;
                    <span style="color: rgba(153, 102, 255, 1)">${latestk2oValue !== null ? latestk2oValue.toFixed(1) : 'N/A'}</span>
                    &nbsp;
                    <span style="color: rgba(153, 102, 255, 1); font-size: 8px;" data-translate="latest measure">${getTranslatedText("latest measure")}</span>
                `;
                if (indicatork2o !== "") {
                    headerContentk2o += `&nbsp;&nbsp;${indicatork2o}`;
                }

                document.querySelector(".headerk2o .title").innerHTML = headerContentk2o;
                let k2oStatus = "";
                let k2oIcon = "";
                let k2oColor = "";

                if (latestk2oValue === null) {
                    k2oStatus = `<span data-translate="No data">${getTranslatedText("No data")}</span>`;
                    k2oIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    k2oColor = "#888888";
                } else {
                    if (latestk2oValue >= 100 && latestk2oValue <= 200) {
                        k2oStatus = `<span data-translate="Average K2O">${getTranslatedText("Average K2O")}</span>`;
                        k2oIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        k2oColor = "#18A558";
                    } else if (latestk2oValue < 100) {
                        k2oStatus = `<span data-translate="Very Low K2O">${getTranslatedText("Very Low K2O")}</span>`;
                        k2oIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        k2oColor = "#BA0F30";
                    } else {
                        k2oStatus = `<span data-translate="High K2O">${getTranslatedText("High K2O")}</span>`;
                        k2oIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        k2oColor = "#BA0F30";
                    }
                }

                let k2oStatusElement = document.querySelector(".k2o-status");
                if (!k2oStatusElement) {
                    k2oStatusElement = document.createElement("div");
                    k2oStatusElement.classList.add("k2o-status");
                }
                k2oStatusElement.style.fontSize = "10px";
                k2oStatusElement.style.color = "white";
                k2oStatusElement.style.backgroundColor = k2oColor;
                k2oStatusElement.style.borderRadius = "20px";
                k2oStatusElement.style.padding = "4px 5px";
                k2oStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                const k2oTextSpan = document.createElement("span");
                k2oTextSpan.style.display = "flex";
                k2oTextSpan.style.alignItems = "center";
                k2oTextSpan.style.marginTop = "-1px";
                k2oTextSpan.innerHTML = `${k2oIcon}&nbsp;${k2oStatus}`;
                k2oStatusElement.innerHTML = '';
                k2oStatusElement.appendChild(k2oTextSpan);
                const headerk2oSection = document.querySelector(".headerk2o");
                headerk2oSection.appendChild(k2oStatusElement);

                const k2oRecommendations = getk2oRecommendation(k2oStatus);
                let k2oTooltipContainer = document.getElementById('k2o-recommendation-container');
                if (!k2oTooltipContainer) {
                    k2oTooltipContainer = document.createElement('div');
                    k2oTooltipContainer.id = 'k2o-recommendation-container';
                    document.body.appendChild(k2oTooltipContainer);
                }
                k2oTooltipContainer.innerHTML = `
                <span id="k2orecommendation-tooltip" class="tooltip">
                    <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                    <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
                    <p>${k2oRecommendations[currentLang]}</p>
                </span>
            `;
            }

            // Create common charts (Moisture, pH, Temperature)
            if (sortedMoistValues.length > 0) {
                moistChart = createLineChart("moistChart", sortedDates, sortedMoistValues, "Moisture (%)", "rgba(54, 162, 235, 1)");
                const latestMoistValue = sortedMoistValues[sortedMoistValues.length - 1];
                const previousMoistValue = sortedMoistValues[sortedMoistValues.length - 2];
                let indicatorMoist = "";
                if (latestMoistValue > previousMoistValue) {
                    indicatorMoist = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestMoistValue < previousMoistValue) {
                    indicatorMoist = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }
                let headerContentMoist = `
                    <span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>
                    &nbsp;
                    <span style="color: rgba(54, 162, 235, 1)">${latestMoistValue !== null ? latestMoistValue.toFixed(1) : 'N/A'}</span>
                    &nbsp;
                    <span style="color: rgba(54, 162, 235, 1); font-size: 8px;" data-translate="latest measure">${getTranslatedText("latest measure")}</span>
                `;
                if (indicatorMoist !== "") {
                    headerContentMoist += `&nbsp;&nbsp;${indicatorMoist}`;
                }

                document.querySelector(".headerMoist .title").innerHTML = headerContentMoist;
                let moistStatus = "";
                let moistIcon = "";
                let moistColor = "";

                if (latestMoistValue === null) {
                    moistStatus = `<span data-translate="No data">${getTranslatedText("No data")}</span>`;
                    moistIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    moistColor = "#888888";
                } else {
                    if (latestMoistValue < 22.5) {
                        moistStatus = `<span data-translate="Very dry">${getTranslatedText("Very dry")}</span>`;
                        moistIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        moistColor = "#BA0F30";
                    } else if (latestMoistValue <= 35) {
                        moistStatus = `<span data-translate="Lack of water">${getTranslatedText("Lack of water")}</span>`;
                        moistIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        moistColor = "#BA0F30";
                    } else if (latestMoistValue <= 55) {
                        moistStatus = `<span data-translate="Enough moisture">${getTranslatedText("Enough moisture")}</span>`;
                        moistIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        moistColor = "#18A558";
                    } else {
                        moistStatus = `<span data-translate="Excess water">${getTranslatedText("Excess water")}</span>`;
                        moistIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        moistColor = "#BA0F30";
                    }
                }

                let moistStatusElement = document.querySelector(".moisture-status");
                if (!moistStatusElement) {
                    moistStatusElement = document.createElement("div");
                    moistStatusElement.classList.add("moisture-status");
                }
                moistStatusElement.style.fontSize = "10px";
                moistStatusElement.style.color = "white";
                moistStatusElement.style.backgroundColor = moistColor;
                moistStatusElement.style.borderRadius = "20px";
                moistStatusElement.style.padding = "4px 5px";
                moistStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                const moistTextSpan = document.createElement("span");
                moistTextSpan.style.display = "flex";
                moistTextSpan.style.alignItems = "center";
                moistTextSpan.style.marginTop = "-1px";
                moistTextSpan.innerHTML = `${moistIcon}&nbsp;${moistStatus}`;
                moistStatusElement.innerHTML = '';
                moistStatusElement.appendChild(moistTextSpan);
                const headerMoistSection = document.querySelector(".headerMoist");
                headerMoistSection.appendChild(moistStatusElement);

                const moistureRecommendations = getMoistureRecommendation(moistStatus);
                let moistTooltipContainer = document.getElementById('moisture-recommendation-container');
                if (!moistTooltipContainer) {
                    moistTooltipContainer = document.createElement('div');
                    moistTooltipContainer.id = 'moisture-recommendation-container';
                    document.body.appendChild(moistTooltipContainer);
                }
                moistTooltipContainer.innerHTML = `
                    <span id="moisturerecommendation-tooltip" class="tooltip">
                        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
                        <p>${moistureRecommendations[currentLang]}</p>
                    </span>
                `;
            }

            if (sortedPHValues.length > 0) {
                pHChart = createLineChart("phChart", sortedDates, sortedPHValues, "pH", "rgba(255, 159, 64, 1)");

                const latestPHValue = sortedPHValues[sortedPHValues.length - 1];
                const previousPHValue = sortedPHValues[sortedPHValues.length - 2];
                let indicatorPH = "";
                if (latestPHValue > previousPHValue) {
                    indicatorPH = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestPHValue < previousPHValue) {
                    indicatorPH = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }

                let headerContentPH = `
                    <span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">water_ph</span>
                    &nbsp;
                    <span style="color: rgba(255, 159, 64, 1)">${latestPHValue !== null ? latestPHValue.toFixed(1) : 'N/A'}</span>
                    &nbsp;
                    <span style="color: rgba(255, 159, 64, 1); font-size: 8px;" data-translate="latest measure">${getTranslatedText("latest measure")}</span>
                `;
                if (indicatorPH !== "") {
                    headerContentPH += `&nbsp;&nbsp;${indicatorPH}`;
                }

                document.querySelector(".headerpH .title").innerHTML = headerContentPH;
                let pHStatus = "";
                let pHIcon = "";
                let pHColor = "";

                if (latestPHValue === null) {
                    pHStatus = `<span data-translate="No data">${getTranslatedText("No data")}</span>`;
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    pHColor = "#888888";
                } else {
                    if (latestPHValue >= 6.5 && latestPHValue <= 7.5) {
                        pHStatus = `<span data-translate="Neutral pH">${getTranslatedText("Neutral pH")}</span>`;
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        pHColor = "#18A558";
                    } else if (latestPHValue < 6.5) {
                        pHStatus = `<span data-translate="Acidic pH">${getTranslatedText("Acidic pH")}</span>`;
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = "#BA0F30";
                    } else {
                        pHStatus = `<span data-translate="Alkaline pH">${getTranslatedText("Alkaline pH")}</span>`;
                        pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        pHColor = "#BA0F30";
                    }
                }

                let pHStatusElement = document.querySelector(".ph-status");
                if (!pHStatusElement) {
                    pHStatusElement = document.createElement("div");
                    pHStatusElement.classList.add("ph-status");
                }
                pHStatusElement.style.fontSize = "10px";
                pHStatusElement.style.color = "white";
                pHStatusElement.style.backgroundColor = pHColor;
                pHStatusElement.style.borderRadius = "20px";
                pHStatusElement.style.padding = "4px 5px";
                pHStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                const pHTextSpan = document.createElement("span");
                pHTextSpan.style.display = "flex";
                pHTextSpan.style.alignItems = "center";
                pHTextSpan.style.marginTop = "-1px";
                pHTextSpan.innerHTML = `${pHIcon}&nbsp;${pHStatus}`;
                pHStatusElement.innerHTML = '';
                pHStatusElement.appendChild(pHTextSpan);
                const headerPHSection = document.querySelector(".headerpH");
                headerPHSection.appendChild(pHStatusElement);

                const pHRecommendations = getPHRecommendation(pHStatus);
                let pHTooltipContainer = document.getElementById('ph-recommendation-container');
                if (!pHTooltipContainer) {
                    pHTooltipContainer = document.createElement('div');
                    pHTooltipContainer.id = 'ph-recommendation-container';
                    document.body.appendChild(pHTooltipContainer);
                }
                pHTooltipContainer.innerHTML = `
                    <span id="phrecommendation-tooltip" class="tooltip">
                        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
                        <p>${pHRecommendations[currentLang]}</p>
                    </span>
                `;
            }



            // Temperature Chart Display Logic
            if (sortedTValues.length > 0) {
                tempChart = createLineChart("tempChart", sortedDates, sortedTValues, "Temperature (°c)", "rgba(255, 205, 86, 1)");
                const latestTempValue = sortedTValues[sortedTValues.length - 1];
                const previousTempValue = sortedTValues[sortedTValues.length - 2];
                let indicatorTemp = "";
                if (latestTempValue > previousTempValue) {
                    indicatorTemp = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
                } else if (latestTempValue < previousTempValue) {
                    indicatorTemp = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
                }
                let headerContentTemp = `
                    <span class="material-symbols-outlined" style="color: rgba(255, 205, 86, 1);">device_thermostat</span>
                    &nbsp;
                    <span style="color: rgba(255, 205, 86, 1)">${latestTempValue !== null ? latestTempValue.toFixed(1) : 'N/A'}</span>
                    &nbsp;
                    <span style="color: rgba(255, 205, 86, 1); font-size: 8px;" data-translate="latest measure">${getTranslatedText("latest measure")}</span>
                `;
                if (indicatorTemp !== "") {
                    headerContentTemp += `&nbsp;&nbsp;${indicatorTemp}`;
                }

                document.querySelector(".headerTemp .title").innerHTML = headerContentTemp;
                let tempStatus = "";
                let tempIcon = "";
                let tempColor = "";

                if (latestTempValue === null) {
                    tempStatus = `<span data-translate="No data">${getTranslatedText("No data")}</span>`;
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                    tempColor = "#888888";
                } else {
                    if (latestTempValue < 20) {
                        tempStatus = `<span data-translate="Low Temp">${getTranslatedText("Low Temp")}</span>`;
                        tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        tempColor = "#BA0F30";
                    } else if (latestTempValue >= 20 && latestTempValue <= 30) {
                        tempStatus = `<span data-translate="Average Temp">${getTranslatedText("Average Temp")}</span>`;
                        tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                        tempColor = "#18A558";
                    } else {
                        tempStatus = `<span data-translate="High Temp">${getTranslatedText("High Temp")}</span>`;
                        tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                        tempColor = "#BA0F30";
                    }
                }

                let tempStatusElement = document.querySelector(".temp-status");
                if (!tempStatusElement) {
                    tempStatusElement = document.createElement("div");
                    tempStatusElement.classList.add("temp-status");
                }
                tempStatusElement.style.fontSize = "10px";
                tempStatusElement.style.color = "white";
                tempStatusElement.style.backgroundColor = tempColor;
                tempStatusElement.style.borderRadius = "20px";
                tempStatusElement.style.padding = "4px 5px";
                tempStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
                const tempTextSpan = document.createElement("span");
                tempTextSpan.style.display = "flex";
                tempTextSpan.style.alignItems = "center";
                tempTextSpan.style.marginTop = "-1px";
                tempTextSpan.innerHTML = `${tempIcon}&nbsp;${tempStatus}`;
                tempStatusElement.innerHTML = '';
                tempStatusElement.appendChild(tempTextSpan);
                const headerTempSection = document.querySelector(".headerTemp");
                headerTempSection.appendChild(tempStatusElement);

                const tempRecommendations = getTempRecommendation(tempStatus);
                let tempTooltipContainer = document.getElementById('temp-recommendation-container');
                if (!tempTooltipContainer) {
                    tempTooltipContainer = document.createElement('div');
                    tempTooltipContainer.id = 'temp-recommendation-container';
                    document.body.appendChild(tempTooltipContainer);
                }
                tempTooltipContainer.innerHTML = `
                    <span id="temprecommendation-tooltip" class="tooltip">
                        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
                        <p>${tempRecommendations[currentLang]}</p>
                    </span>
                `;
            }

            // Helper functions
            function createMinMaxContainer(canvasId) {
                const container = document.createElement('div');
                container.id = `${canvasId}MinMax`;
                container.style.textAlign = 'right';
                container.style.marginBottom = '5px';
                container.style.fontSize = '10px';
                container.style.position = 'relative';
                container.style.left = '-10px';
                container.style.top = '10px';
                container.style.color = 'gray';
                const chartCanvas = document.getElementById(canvasId);
                chartCanvas.parentNode.insertBefore(container, chartCanvas);
                return container;
            }

            function updateMinMaxDisplay(container, min, max, label) {
                const unit = label.includes('%') ? '%' : label.includes('°c') ? '°c' : '';
                container.innerHTML = `
        <span>
            <span class="material-symbols-outlined" style="color: #FF6B6B; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
            <span data-translate="Min">${getTranslatedText("Min")}</span>: ${min === "-" ? "-" : min.toFixed(1)}${unit} 
            <span class="material-symbols-outlined" style="color: #4ECB71; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
            <span data-translate="Max">${getTranslatedText("Max")}</span>: ${max === "-" ? "-" : max.toFixed(1)}${unit}
        </span>
    `;
            }


            /////// Time Temporal Filter \\\\\\\\\\\\\
            // Add click event listeners to the buttons
            // Update the time trend filter section
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

                    // Common to Coffee and Durian
                    const filteredMoistValues = sortedMoistValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                    const filteredPHValues = sortedPHValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                    const filteredTValues = sortedTValues.filter((_, index) => filteredDates.includes(sortedDates[index]));

                    // Update common charts (Moisture, pH, Temperature)
                    updateChart(moistChart, filteredDates, filteredMoistValues, 'moistMinMax', '%');
                    updateChart(pHChart, filteredDates, filteredPHValues, 'pHMinMax', 'pH');
                    updateChart(tempChart, filteredDates, filteredTValues, 'tempMinMax', '°c');

                    // Exclusive to Coffee
                    if (sortedNpkValues && sortedNpkValues.length > 0) {
                        const filteredNpkValues = sortedNpkValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                        updateChart(npkChart, filteredDates, filteredNpkValues, 'npkMinMax', '');
                    }

                    // Exclusive to Durian
                    if (sortedNdtValues && sortedNdtValues.length > 0) {
                        const filteredNdtValues = sortedNdtValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                        updateChart(ndtChart, filteredDates, filteredNdtValues, 'ndtMinMax', '%');
                    }

                    if (sortedP205Values && sortedP205Values.length > 0) {
                        const filteredP205Values = sortedP205Values.filter((_, index) => filteredDates.includes(sortedDates[index]));
                        updateChart(p205Chart, filteredDates, filteredP205Values, 'p205MinMax', '');
                    }

                    if (sortedk2oValues && sortedk2oValues.length > 0) {
                        const filteredk2oValues = sortedk2oValues.filter((_, index) => filteredDates.includes(sortedDates[index]));
                        updateChart(k2oChart, filteredDates, filteredk2oValues, 'k2oMinMax', '');
                    }
                    // Update charts for both tree types
                    updateChartForTimeRange(ndtChart, filteredDates, sortedNdtValues, 'ndtMinMax', 'NDT (ppm)');
                    updateChartForTimeRange(p205Chart, filteredDates, sortedP205Values, 'p205MinMax', 'P2O5 (ppm)');
                    updateChartForTimeRange(k2oChart, filteredDates, sortedk2oValues, 'k2oMinMax', 'K2O (ppm)');
                    updateChartForTimeRange(moistChart, filteredDates, sortedMoistValues, 'moistMinMax', 'Moisture (%)');
                    updateChartForTimeRange(pHChart, filteredDates, sortedPHValues, 'pHMinMax', 'pH');
                    updateChartForTimeRange(tempChart, filteredDates, sortedTValues, 'tempMinMax', 'Temperature (°c)');
                });
            });

            function updateChartForTimeRange(chart, filteredDates, values, minMaxContainerId, label) {
                if (chart) {
                    const filteredValues = values.filter((_, index) => filteredDates.includes(sortedDates[index]));
                    const formattedDates = filteredDates.map(date => {
                        const d = new Date(date);
                        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                    });
                    chart.data.labels = formattedDates;
                    chart.data.datasets[0].data = filteredValues;
                    chart.update();

                    const { min, max } = calculateMinMax(filteredValues);
                    const minMaxContainer = document.getElementById(minMaxContainerId);
                    if (minMaxContainer) {
                        updateMinMaxDisplay(minMaxContainer, min, max, label);
                    }
                }
            }

            // Helper function to update charts and min-max displays
            function updateChart(chart, labels, data, minMaxContainerId, unit) {
                chart.data.labels = labels;
                chart.data.datasets[0].data = data;
                chart.update();

                const { min, max } = calculateMinMax(data);
                const minMaxContainer = document.getElementById(minMaxContainerId);
                if (minMaxContainer) {
                    minMaxContainer.innerHTML = `
                        <span style="color: gray;">
                            <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                            <span data-translate="Min">${getTranslatedText("Min")}</span>: ${min === "-" ? "-" : min.toFixed(1) + unit} 
                            <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                            <span data-translate="Max">${getTranslatedText("Max")}</span>: ${max === "-" ? "-" : max.toFixed(1) + unit}
                        </span>
                    `;
                }
            }

            function updateMinMaxDisplays() {
                const minMaxContainers = document.querySelectorAll('[id$="MinMax"]');
                minMaxContainers.forEach(container => {
                    const minSpan = container.querySelector('[data-translate="Min"]');
                    const maxSpan = container.querySelector('[data-translate="Max"]');
                    if (minSpan) minSpan.textContent = getTranslatedText("Min");
                    if (maxSpan) maxSpan.textContent = getTranslatedText("Max");
                });
            }

            // Get the latest values for each measurement
            const latestMoistValue = sortedMoistValues.length > 0 ? sortedMoistValues[sortedMoistValues.length - 1] : null;
            const latestPHValue = sortedPHValues.length > 0 ? sortedPHValues[sortedPHValues.length - 1] : null;
            const latestTempValue = sortedTValues.length > 0 ? sortedTValues[sortedTValues.length - 1] : null;
            const latestNdtValue = sortedNdtValues.length > 0 ? sortedNdtValues[sortedNdtValues.length - 1] : null;
            const latestP205Value = sortedP205Values.length > 0 ? sortedP205Values[sortedP205Values.length - 1] : null;
            const latestk2oValue = sortedk2oValues.length > 0 ? sortedk2oValues[sortedk2oValues.length - 1] : null;

            // Create or update gauge charts
            createOrUpdateGaugeCharts(
                latestMoistValue,
                latestPHValue,
                latestTempValue,
                latestNdtValue,
                latestP205Value,
                latestk2oValue
            );

        })
        .catch(function (error) {
            console.log(error);
        });
});

// Active time filter button
function setActiveButton(button) {
    const buttons = document.querySelectorAll('.timeTrend-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}


//Create Gauge Charts
function setupGaugeChart(canvasId, title, thresholds, defaultValue, minValue, maxValue, options) {
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

            /*
            // Add text
            ctx.font = "12px 'Be Vietnam', sans-serif";
            ctx.fillStyle = "#444";
            ctx.textAlign = "center";
            ctx.fillText(title, cx, cy - 83);*/

            // Add text
            ctx.font = "12px 'Be Vietnam', sans-serif";
            ctx.fillStyle = "#444";
            ctx.textAlign = "center";

            // Translate the title for moisture and temperature
            let translatedTitle = title;
            if (title === "Độ ẩm (%)") {
                translatedTitle = getTranslatedText("Moisture (%)");
            } else if (title === "Nhiệt độ (°c)") {
                translatedTitle = getTranslatedText("Temperature (°c)");
            }
            ctx.fillText(translatedTitle, cx, cy - 83);


            ctx.font = "bold 16px Be Vietnam";
            ctx.fillText(`${defaultValue.toFixed(1)}${options.unit || ''}`, cx, cy - 20);

            // Null value
            ctx.font = "bold 16px Be Vietnam";
            ctx.fillText(`${defaultValue === 0 ? '0.00' : defaultValue.toFixed(1)}${options.unit || ''}`, cx, cy - 20);


            // Draw ticks and labels
            const radius = height / 2 + 15;
            ctx.font = "8px 'Be Vietnam', sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            let tickValues;
            if (title === "NPK (%)") {
                tickValues = [50, 100];
            } else if (title === "Độ ẩm (%)") {
                tickValues = [25, 50, 75];
            } else if (title === "pH") {
                tickValues = [4, 7, 10];
            } else if (title === "Nhiệt độ (°c)") {
                tickValues = [10, 20, 30, 40];
            } else if (title === "NDT (ppm)") {
                tickValues = [50, 100];
            } else if (title === "P2O5 (ppm)") {
                tickValues = [20, 50, 60];
            } else if (title === "K2O (ppm)") {
                tickValues = [50, 100, 150, 200];
            } else {
                console.warn(`No tickValues defined for title: "${title}". Using default values.`);
                tickValues = [minValue, (minValue + maxValue) / 2, maxValue];
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
            },
        },
        plugins: [gaugeNeedle],
    };

    return new Chart(document.getElementById(canvasId), config);
}