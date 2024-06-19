/*document.addEventListener("DOMContentLoaded", function () {
    const popupHistoricalSoilData = document.querySelector(".popup-historicalsoildata");
    popupHistoricalSoilData.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function () {
    var closeBtn = document.querySelector(".close-btn");
    var popup = document.querySelector(".popup-historicalsoildata");
    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
axios
    .post("https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old", { region_id: 44 })
    .then(function (response) {
        const data = response.data.content[0].values;*/





/*
let npkChart, moistChart, pHChart, tempChart; // Declare variables to store chart instances

document.addEventListener("DOMContentLoaded", function () {
    const popupHistoricalSoilData = document.querySelector(".popup-historicalsoildata");
    popupHistoricalSoilData.style.display = "none"; // Hide the popup initially
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
    // Destroy existing chart instances
    if (npkChart) {
        npkChart.destroy(); // Destroy the NPK chart instance if it exists
        npkChart = null;
    }
    if (moistChart) {
        moistChart.destroy(); // Destroy the Moisture chart instance if it exists
        moistChart = null;
    }
    if (pHChart) {
        pHChart.destroy(); // Destroy the pH chart instance if it exists
        pHChart = null;
    }
    if (tempChart) {
        tempChart.destroy(); // Destroy the Temperature chart instance if it exists
        tempChart = null;
    }

    // Reset HTML elements containing text messages
    resetChartMessages();
}

function resetChartMessages() {
    // Reset the HTML elements containing text messages
    const npkHeader = document.querySelector('.headerNPK .title');
    if (npkHeader) npkHeader.innerHTML = ''; // Clear the NPK header
    const npkStatus = document.querySelector('.headerNPK .nutrient-status');
    if (npkStatus) npkStatus.remove(); // Remove the NPK nutrient status element

    const moistHeader = document.querySelector('.headerMoist .title');
    if (moistHeader) moistHeader.innerHTML = ''; // Clear the Moisture header
    const moistStatus = document.querySelector('.headerMoist .moisture-status');
    if (moistStatus) moistStatus.remove(); // Remove the Moisture status element

    const phHeader = document.querySelector('.headerpH .title');
    if (phHeader) phHeader.innerHTML = ''; // Clear the pH header
    const phStatus = document.querySelector('.headerpH .ph-status');
    if (phStatus) phStatus.remove(); // Remove the pH status element

    const tempHeader = document.querySelector('.headerTemp .title');
    if (tempHeader) tempHeader.innerHTML = ''; // Clear the Temperature header
    const tempStatus = document.querySelector('.headerTemp .temp-status');
    if (tempStatus) tempStatus.remove(); // Remove the Temperature status element
}

window.addEventListener('soilDataRequested', function (event) {
    const { regionId, depthId } = event.detail;

    axios
        .post("https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old", { region_id: regionId })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            if (responseContent.length === 1) {
                // If there is only one element in the array, use its values
                data = responseContent[0].values;
            } else if (responseContent.length > depthId) {
                // If the array has multiple elements, access the values using the depthId
                data = responseContent[depthId].values;
            } else {
                console.log(`No data found for regionId: ${regionId} and depthId: ${depthId}`);
                return;
            }

            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));
            const sortedIndices = sortedDates.map((date) => data.created_at.indexOf(date));
            const sortedNpkValues = sortedIndices.map((index) => data.npk[index]);
            const sortedMoistValues = sortedIndices.map((index) => data.moist[index]);
            const sortedPHValues = sortedIndices.map((index) => data.pH[index]);
            const sortedTValues = sortedIndices.map((index) => data.t[index]);

            function createGradient(ctx, startColor, endColor) {
                const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                return gradient;
            }

            const npkCtx = document.getElementById("npkChart").getContext("2d");
            const npkGradient = createGradient(npkCtx, "rgba(255, 99, 132, 0.8)", "rgba(255, 255, 255, 0)");
            npkChart = new Chart(npkCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "NPK", data: sortedNpkValues, borderColor: "rgba(255, 99, 132, 1)", backgroundColor: npkGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }], xAxes: [{ type: "time", time: { minUnit: "day", displayFormats: { day: "MMM D, YYYY" } }, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestNpkValue = sortedNpkValues[sortedNpkValues.length - 1];
            const previousNpkValue = sortedNpkValues[sortedNpkValues.length - 2];
            let indicatorNPK = "";
            if (latestNpkValue > previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestNpkValue < previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }
            let headerContentNPK = `<span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>&nbsp;<span style="color: rgba(255, 99, 132, 1)">${latestNpkValue}</span>`;
            if (indicatorNPK !== "") {
                headerContentNPK += `&nbsp;&nbsp;${indicatorNPK}`;
            }


            document.querySelector(".headerNPK .title").innerHTML = headerContentNPK;
            const nutrientRatio = latestNpkValue / 300;
            let nutrientStatus = "";
            let nutrientIcon = "";
            let nutrientColor = "";

            // Check if latestNpkValue is null
            if (latestNpkValue === null) {
                nutrientStatus = "No data";
                nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                nutrientColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (nutrientRatio < 0.5) {
                    nutrientStatus = "Insufficient Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = "#BA0F30"; // Color for insufficient nutrients
                } else if (nutrientRatio <= 0.75) {
                    nutrientStatus = "Average Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';
                    nutrientColor = "#18A558"; // Color for average nutrients
                } else if (nutrientRatio <= 1) {
                    nutrientStatus = "Adequate Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    nutrientColor = "#18A558"; // Color for adequate nutrients
                } else {
                    nutrientStatus = "Excess Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = "#BA0F30"; // Color for excess nutrients
                }
            }

            const nutrientStatusElement = document.createElement("div");
            nutrientStatusElement.classList.add("nutrient-status");
            nutrientStatusElement.style.fontSize = "10px";
            nutrientStatusElement.style.color = "white";
            nutrientStatusElement.style.backgroundColor = nutrientColor;
            nutrientStatusElement.style.borderRadius = "20px";
            nutrientStatusElement.style.padding = "4px 5px";
            nutrientStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            const nutrientTextSpan = document.createElement("span");
            nutrientTextSpan.style.display = "flex";
            nutrientTextSpan.style.alignItems = "center";
            nutrientTextSpan.style.marginTop = "-1px";
            nutrientTextSpan.innerHTML = `${nutrientIcon}&nbsp;${nutrientStatus}`;
            nutrientStatusElement.appendChild(nutrientTextSpan);
            const headerNPKSection = document.querySelector(".headerNPK");
            headerNPKSection.appendChild(nutrientStatusElement);

            const moistCtx = document.getElementById("moistChart").getContext("2d");
            const moistGradient = createGradient(moistCtx, "rgba(54, 162, 235, 0.8)", "rgba(54, 162, 235, 0)");
            moistChart = new Chart(moistCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "Moisture (%)", data: sortedMoistValues, borderColor: "rgba(54, 162, 235, 1)", backgroundColor: moistGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }], xAxes: [{ type: "time", time: { minUnit: "day", displayFormats: { day: "MMM D, YYYY" } }, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestMoistValue = sortedMoistValues[sortedMoistValues.length - 1];
            const previousMoistValue = sortedMoistValues[sortedMoistValues.length - 2];
            let indicatorMoist = "";
            if (latestMoistValue > previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestMoistValue < previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            let moistureStatus = "";
            let moistureIcon = "";
            let moistureColor = "";

            // Check if latestMoistValue is null
            if (latestMoistValue === null) {
                moistureStatus = "No data";
                moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                moistureColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestMoistValue < 22.5) {
                    moistureStatus = "Very dry";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = "#BA0F30"; // Color for very dry moisture
                } else if (latestMoistValue <= 35) {
                    moistureStatus = "Lack of water";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = "#BA0F30"; // Color for lack of water
                } else if (latestMoistValue <= 55) {
                    moistureStatus = "Enough moisture";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    moistureColor = "#18A558"; // Color for enough moisture
                } else {
                    moistureStatus = "Excess water";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = "#BA0F30"; // Color for excess water
                }
            }

            const moistureStatusElement = document.createElement("div");
            moistureStatusElement.classList.add("moisture-status");
            moistureStatusElement.style.fontSize = "10px";
            moistureStatusElement.style.color = "white";
            moistureStatusElement.style.backgroundColor = moistureColor;
            moistureStatusElement.style.borderRadius = "20px";
            moistureStatusElement.style.padding = "4px 5px";
            moistureStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            const moistureTextSpan = document.createElement("span");
            moistureTextSpan.style.display = "flex";
            moistureTextSpan.style.alignItems = "center";
            moistureTextSpan.style.marginTop = "-1px";
            moistureTextSpan.innerHTML = `${moistureIcon}&nbsp;${moistureStatus}`;
            moistureStatusElement.appendChild(moistureTextSpan);
            const headerMoistSection = document.querySelector(".headerMoist");
            headerMoistSection.appendChild(moistureStatusElement);
            let headerContentMoist = `<span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>&nbsp;<span style="color:rgba(54, 162, 235, 1)">${latestMoistValue}</span>`;
            if (indicatorMoist !== "") {
                headerContentMoist += `&nbsp;&nbsp;${indicatorMoist}`;
            }
            document.querySelector(".headerMoist .title").innerHTML = headerContentMoist;

            const pHCtx = document.getElementById("phChart").getContext("2d");
            const pHGradient = createGradient(pHCtx, "rgba(75, 192, 192, 0.8)", "rgba(75, 192, 192, 0)");
            pHChart = new Chart(pHCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "pH", data: sortedPHValues, borderColor: "rgba(75, 192, 192, 1)", backgroundColor: pHGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }], xAxes: [{ type: "time", time: { minUnit: "day", displayFormats: { day: "MMM D, YYYY" } }, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestPHValue = sortedPHValues[sortedPHValues.length - 1];
            const previousPHValue = sortedPHValues[sortedPHValues.length - 2];
            let indicatorPH = "";
            if (latestPHValue > previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestPHValue < previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }
            let headerContentPH = `<span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">water_ph</span>&nbsp;<span style="color:rgba(75, 192, 192, 1)">${latestPHValue}</span>`;
            if (indicatorPH !== "") {
                headerContentPH += `&nbsp;&nbsp;${indicatorPH}`;
            }

            document.querySelector(".headerpH .title").innerHTML = headerContentPH;
            let pHStatus = "";
            let pHIcon = "";
            let pHColor = "";

            // Check if latestPHValue is null
            if (latestPHValue === null) {
                pHStatus = "No data";
                pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                pHColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestPHValue === 7) {
                    pHStatus = "Neutral";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    pHColor = "#18A558"; // Color for neutral pH
                } else if (latestPHValue < 4) {
                    pHStatus = "Very Acidic";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for very acidic pH
                } else if (latestPHValue >= 4 && latestPHValue <= 4.5) {
                    pHStatus = "Acidic";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for acidic pH
                } else if (latestPHValue > 4.5 && latestPHValue < 7) {
                    pHStatus = "Slightly Acidic";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for slightly acidic pH
                } else if (latestPHValue > 7 && latestPHValue < 8) {
                    pHStatus = "Slightly Alkaline";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for slightly alkaline pH
                } else if (latestPHValue === 8) {
                    pHStatus = "Alkaline";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for alkaline pH
                } else if (latestPHValue > 8) {
                    pHStatus = "Very Alkaline";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for very alkaline pH
                }
            }

            const pHStatusElement = document.createElement("div");
            pHStatusElement.classList.add("ph-status");
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
            pHStatusElement.appendChild(pHTextSpan);
            const headerPHSection = document.querySelector(".headerpH");
            headerPHSection.appendChild(pHStatusElement);

            const tCtx = document.getElementById("tempChart").getContext("2d");
            const tGradient = createGradient(tCtx, "rgba(255, 159, 64, 0.8)", "rgba(255, 159, 64, 0)");
            tempChart = new Chart(tCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "Temperature (°C)", data: sortedTValues, borderColor: "rgba(255, 159, 64, 1)", backgroundColor: tGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ display: false, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestTempValue = sortedTValues[sortedTValues.length - 1];
            const previousTempValue = sortedTValues[sortedTValues.length - 2];
            let indicatorTemp = "";
            if (latestTempValue > previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestTempValue < previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }
            let headerContentTemp = `<span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">device_thermostat</span>&nbsp;<span style="color:rgba(255, 159, 64, 1)">${latestTempValue}</span>`;
            if (indicatorTemp !== "") {
                headerContentTemp += `&nbsp;&nbsp;${indicatorTemp}`;
            }

            document.querySelector(".headerTemp .title").innerHTML = headerContentTemp;
            let tempStatus = "";
            let tempIcon = "";
            let tempColor = "";

            // Check if latestTempValue is null
            if (latestTempValue === null) {
                tempStatus = "No data";
                tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                tempColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestTempValue >= 20 && latestTempValue <= 30) {
                    tempStatus = "Normal Temp";
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    tempColor = "#18A558"; // Color for normal temperature
                } else if (latestTempValue < 20 || latestTempValue > 30) {
                    tempStatus = latestTempValue < 20 ? "Low Temp" : "High Temp";
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    tempColor = "#BA0F30"; // Color for low or high temperature
                }
            }

            const tempStatusElement = document.createElement("div");
            tempStatusElement.classList.add("temp-status");
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
            tempStatusElement.appendChild(tempTextSpan);
            const headerTempSection = document.querySelector(".headerTemp");
            headerTempSection.appendChild(tempStatusElement);
        })
        .catch(function (error) {
            console.log(error);
        });
});*/


let npkChart, moistChart, pHChart, tempChart; // Declare variables to store chart instances

let chartData = {
    sortedDates: [],
    sortedNpkValues: [],
    sortedMoistValues: [],
    sortedPHValues: [],
    sortedTValues: []
};

let sortedDates, sortedNpkValues, sortedMoistValues, sortedPHValues, sortedTValues;

document.addEventListener("DOMContentLoaded", function () {
    const popupHistoricalSoilData = document.querySelector(".popup-historicalsoildata");
    popupHistoricalSoilData.style.display = "none"; // Hide the popup initially
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
    // Destroy existing chart instances
    if (npkChart) {
        npkChart.destroy(); // Destroy the NPK chart instance if it exists
        npkChart = null;
    }
    if (moistChart) {
        moistChart.destroy(); // Destroy the Moisture chart instance if it exists
        moistChart = null;
    }
    if (pHChart) {
        pHChart.destroy(); // Destroy the pH chart instance if it exists
        pHChart = null;
    }
    if (tempChart) {
        tempChart.destroy(); // Destroy the Temperature chart instance if it exists
        tempChart = null;
    }

    // Reset HTML elements containing text messages
    resetChartMessages();

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('.timeTrend-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
}

function resetChartMessages() {
    // Reset the HTML elements containing text messages
    const npkHeader = document.querySelector('.headerNPK .title');
    if (npkHeader) npkHeader.innerHTML = ''; // Clear the NPK header
    const npkStatus = document.querySelector('.headerNPK .nutrient-status');
    if (npkStatus) npkStatus.remove(); // Remove the NPK nutrient status element

    const moistHeader = document.querySelector('.headerMoist .title');
    if (moistHeader) moistHeader.innerHTML = ''; // Clear the Moisture header
    const moistStatus = document.querySelector('.headerMoist .moisture-status');
    if (moistStatus) moistStatus.remove(); // Remove the Moisture status element

    const phHeader = document.querySelector('.headerpH .title');
    if (phHeader) phHeader.innerHTML = ''; // Clear the pH header
    const phStatus = document.querySelector('.headerpH .ph-status');
    if (phStatus) phStatus.remove(); // Remove the pH status element

    const tempHeader = document.querySelector('.headerTemp .title');
    if (tempHeader) tempHeader.innerHTML = ''; // Clear the Temperature header
    const tempStatus = document.querySelector('.headerTemp .temp-status');
    if (tempStatus) tempStatus.remove(); // Remove the Temperature status element
}

window.addEventListener('soilDataRequested', function (event) {
    const { regionId, depthId } = event.detail;

    axios
        .post("https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old", { region_id: regionId })
        .then(function (response) {
            const responseContent = response.data.content;
            let data;

            if (responseContent.length === 1) {
                // If there is only one element in the array, use its values
                data = responseContent[0].values;
            } else if (responseContent.length > depthId) {
                // If the array has multiple elements, access the values using the depthId
                data = responseContent[depthId].values;
            } else {
                console.log(`No data found for regionId: ${regionId} and depthId: ${depthId}`);
                return;
            }

            const sortedDates = data.created_at.slice().sort((a, b) => new Date(a) - new Date(b));
            const sortedIndices = sortedDates.map((date) => data.created_at.indexOf(date));
            const sortedNpkValues = sortedIndices.map((index) => data.npk[index]);
            const sortedMoistValues = sortedIndices.map((index) => data.moist[index]);
            const sortedPHValues = sortedIndices.map((index) => data.pH[index]);
            const sortedTValues = sortedIndices.map((index) => data.t[index]);

            function createGradient(ctx, startColor, endColor) {
                const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                return gradient;
            }

            const npkCtx = document.getElementById("npkChart").getContext("2d");
            const npkGradient = createGradient(npkCtx, "rgba(255, 99, 132, 0.8)", "rgba(255, 255, 255, 0)");


            //NPK
            npkChart = new Chart(npkCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "NPK", data: sortedNpkValues, borderColor: "rgba(255, 99, 132, 1)", backgroundColor: npkGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }], xAxes: [{ type: "time", time: { minUnit: "day", displayFormats: { day: "MMM D, YYYY" } }, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestNpkValue = sortedNpkValues[sortedNpkValues.length - 1];
            const previousNpkValue = sortedNpkValues[sortedNpkValues.length - 2];
            let indicatorNPK = "";
            if (latestNpkValue > previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestNpkValue < previousNpkValue) {
                indicatorNPK = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }
            let headerContentNPK = `
  <span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>
  &nbsp;
  <span style="color: rgba(255, 99, 132, 1)">${latestNpkValue}</span>
  &nbsp;
  <span style="color: rgba(255, 99, 132, 1); font-size: 8px;">(latest measure)</span>
`;


            if (indicatorNPK !== "") {
                headerContentNPK += `&nbsp;&nbsp;${indicatorNPK}`;
            }


            document.querySelector(".headerNPK .title").innerHTML = headerContentNPK;
            const nutrientRatio = latestNpkValue / 300;
            let nutrientStatus = "";
            let nutrientIcon = "";
            let nutrientColor = "";

            // Check if latestNpkValue is null
            if (latestNpkValue === null) {
                nutrientStatus = "No data";
                nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                nutrientColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (nutrientRatio < 0.5) {
                    nutrientStatus = "Insufficient Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = "#BA0F30"; // Color for insufficient nutrients
                } else if (nutrientRatio <= 0.75) {
                    nutrientStatus = "Average Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';
                    nutrientColor = "#18A558"; // Color for average nutrients
                } else if (nutrientRatio <= 1) {
                    nutrientStatus = "Adequate Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    nutrientColor = "#18A558"; // Color for adequate nutrients
                } else {
                    nutrientStatus = "Excess Nutrients";
                    nutrientIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    nutrientColor = "#BA0F30"; // Color for excess nutrients
                }
            }

            const nutrientStatusElement = document.createElement("div");
            nutrientStatusElement.classList.add("nutrient-status");
            nutrientStatusElement.style.fontSize = "10px";
            nutrientStatusElement.style.color = "white";
            nutrientStatusElement.style.backgroundColor = nutrientColor;
            nutrientStatusElement.style.borderRadius = "20px";
            nutrientStatusElement.style.padding = "4px 5px";
            nutrientStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            const nutrientTextSpan = document.createElement("span");
            nutrientTextSpan.style.display = "flex";
            nutrientTextSpan.style.alignItems = "center";
            nutrientTextSpan.style.marginTop = "-1px";
            nutrientTextSpan.innerHTML = `${nutrientIcon}&nbsp;${nutrientStatus}`;
            nutrientStatusElement.appendChild(nutrientTextSpan);
            const headerNPKSection = document.querySelector(".headerNPK");
            headerNPKSection.appendChild(nutrientStatusElement);

            const moistCtx = document.getElementById("moistChart").getContext("2d");
            const moistGradient = createGradient(moistCtx, "rgba(54, 162, 235, 0.8)", "rgba(54, 162, 235, 0)");

            //Moist Chart
            moistChart = new Chart(moistCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "Moisture (%)", data: sortedMoistValues, borderColor: "rgba(54, 162, 235, 1)", backgroundColor: moistGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }], xAxes: [{ type: "time", time: { minUnit: "day", displayFormats: { day: "MMM D, YYYY" } }, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestMoistValue = sortedMoistValues[sortedMoistValues.length - 1];
            const previousMoistValue = sortedMoistValues[sortedMoistValues.length - 2];
            let indicatorMoist = "";
            if (latestMoistValue > previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestMoistValue < previousMoistValue) {
                indicatorMoist = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }

            let moistureStatus = "";
            let moistureIcon = "";
            let moistureColor = "";

            // Check if latestMoistValue is null
            if (latestMoistValue === null) {
                moistureStatus = "No data";
                moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                moistureColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestMoistValue < 22.5) {
                    moistureStatus = "Very dry";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = "#BA0F30"; // Color for very dry moisture
                } else if (latestMoistValue <= 35) {
                    moistureStatus = "Lack of water";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = "#BA0F30"; // Color for lack of water
                } else if (latestMoistValue <= 55) {
                    moistureStatus = "Enough moisture";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    moistureColor = "#18A558"; // Color for enough moisture
                } else {
                    moistureStatus = "Excess water";
                    moistureIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    moistureColor = "#BA0F30"; // Color for excess water
                }
            }

            const moistureStatusElement = document.createElement("div");
            moistureStatusElement.classList.add("moisture-status");
            moistureStatusElement.style.fontSize = "10px";
            moistureStatusElement.style.color = "white";
            moistureStatusElement.style.backgroundColor = moistureColor;
            moistureStatusElement.style.borderRadius = "20px";
            moistureStatusElement.style.padding = "4px 5px";
            moistureStatusElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            const moistureTextSpan = document.createElement("span");
            moistureTextSpan.style.display = "flex";
            moistureTextSpan.style.alignItems = "center";
            moistureTextSpan.style.marginTop = "-1px";
            moistureTextSpan.innerHTML = `${moistureIcon}&nbsp;${moistureStatus}`;
            moistureStatusElement.appendChild(moistureTextSpan);
            const headerMoistSection = document.querySelector(".headerMoist");
            headerMoistSection.appendChild(moistureStatusElement);

            let headerContentMoist = `
            <span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>
            &nbsp;
            <span style="color: rgba(54, 162, 235, 1)">${latestMoistValue}</span>
            &nbsp;
            <span style="color: rgba(54, 162, 235, 1); font-size: 8px;">(latest measure)</span>
          `;

            if (indicatorMoist !== "") {
                headerContentMoist += `&nbsp;&nbsp;${indicatorMoist}`;
            }
            document.querySelector(".headerMoist .title").innerHTML = headerContentMoist;

            const pHCtx = document.getElementById("phChart").getContext("2d");
            const pHGradient = createGradient(pHCtx, "rgba(75, 192, 192, 0.8)", "rgba(75, 192, 192, 0)");
            pHChart = new Chart(pHCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "pH", data: sortedPHValues, borderColor: "rgba(75, 192, 192, 1)", backgroundColor: pHGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }], xAxes: [{ type: "time", time: { minUnit: "day", displayFormats: { day: "MMM D, YYYY" } }, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });
            const latestPHValue = sortedPHValues[sortedPHValues.length - 1];
            const previousPHValue = sortedPHValues[sortedPHValues.length - 2];
            let indicatorPH = "";
            if (latestPHValue > previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestPHValue < previousPHValue) {
                indicatorPH = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }
            let headerContentPH = `
            <span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">water_ph</span>
            &nbsp;
            <span style="color: rgba(75, 192, 192, 1)">${latestPHValue}</span>
            &nbsp;
            <span style="color: rgba(75, 192, 192, 1); font-size: 8px;">(latest measure)</span>
          `;

            if (indicatorPH !== "") {
                headerContentPH += `&nbsp;&nbsp;${indicatorPH}`;
            }

            document.querySelector(".headerpH .title").innerHTML = headerContentPH;
            let pHStatus = "";
            let pHIcon = "";
            let pHColor = "";

            // Check if latestPHValue is null
            if (latestPHValue === null) {
                pHStatus = "No data";
                pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                pHColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestPHValue === 7) {
                    pHStatus = "Neutral";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    pHColor = "#18A558"; // Color for neutral pH
                } else if (latestPHValue < 4) {
                    pHStatus = "Very Acidic";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for very acidic pH
                } else if (latestPHValue >= 4 && latestPHValue <= 4.5) {
                    pHStatus = "Acidic";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for acidic pH
                } else if (latestPHValue > 4.5 && latestPHValue < 7) {
                    pHStatus = "Slightly Acidic";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for slightly acidic pH
                } else if (latestPHValue > 7 && latestPHValue < 8) {
                    pHStatus = "Slightly Alkaline";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for slightly alkaline pH
                } else if (latestPHValue === 8) {
                    pHStatus = "Alkaline";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for alkaline pH
                } else if (latestPHValue > 8) {
                    pHStatus = "Very Alkaline";
                    pHIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    pHColor = "#BA0F30"; // Color for very alkaline pH
                }
            }

            const pHStatusElement = document.createElement("div");
            pHStatusElement.classList.add("ph-status");
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
            pHStatusElement.appendChild(pHTextSpan);
            const headerPHSection = document.querySelector(".headerpH");
            headerPHSection.appendChild(pHStatusElement);

            const tCtx = document.getElementById("tempChart").getContext("2d");
            const tGradient = createGradient(tCtx, "rgba(255, 159, 64, 0.8)", "rgba(255, 159, 64, 0)");
            tempChart = new Chart(tCtx, {
                type: "line",
                data: { labels: sortedDates, datasets: [{ label: "Temperature (°C)", data: sortedTValues, borderColor: "rgba(255, 159, 64, 1)", backgroundColor: tGradient, borderWidth: 1, fill: true }] },
                options: { scales: { yAxes: [{ display: false, ticks: { font: { size: 6 } } }] }, layout: { padding: { top: 0 } } },
            });


            const latestTempValue = sortedTValues[sortedTValues.length - 1];
            const previousTempValue = sortedTValues[sortedTValues.length - 2];
            let indicatorTemp = "";
            if (latestTempValue > previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';
            } else if (latestTempValue < previousTempValue) {
                indicatorTemp = '<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';
            }
            let headerContentTemp = `
  <span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">device_thermostat</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1)">${latestTempValue}</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1); font-size: 8px;">(latest measure)</span>
`;

            if (indicatorTemp !== "") {
                headerContentTemp += `&nbsp;&nbsp;${indicatorTemp}`;
            }

            document.querySelector(".headerTemp .title").innerHTML = headerContentTemp;
            let tempStatus = "";
            let tempIcon = "";
            let tempColor = "";

            // Check if latestTempValue is null
            if (latestTempValue === null) {
                tempStatus = "No data";
                tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';
                tempColor = "#888888"; // Color for the "No data" state (can be adjusted as needed)
            } else {
                if (latestTempValue >= 20 && latestTempValue <= 30) {
                    tempStatus = "Normal Temp";
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';
                    tempColor = "#18A558"; // Color for normal temperature
                } else if (latestTempValue < 20 || latestTempValue > 30) {
                    tempStatus = latestTempValue < 20 ? "Low Temp" : "High Temp";
                    tempIcon = '<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';
                    tempColor = "#BA0F30"; // Color for low or high temperature
                }
            }

            const tempStatusElement = document.createElement("div");
            tempStatusElement.classList.add("temp-status");
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
            tempStatusElement.appendChild(tempTextSpan);
            const headerTempSection = document.querySelector(".headerTemp");
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
            console.log(error);
        });

});


function setActiveButton(button) {
    const buttons = document.querySelectorAll('.timeTrend-buttons button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
} 