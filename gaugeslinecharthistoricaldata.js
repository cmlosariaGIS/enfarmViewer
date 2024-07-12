let npkChart,moistChart,pHChart,tempChart;let npkGauge,moistGauge,pHGauge,tempGauge;let chartData={sortedDates:[],sortedNpkValues:[],sortedMoistValues:[],sortedPHValues:[],sortedTValues:[]};let sortedDates,sortedNpkValues,sortedMoistValues,sortedPHValues,sortedTValues;function getTranslatedText(key){return translations[currentLang][key]||key;}
document.addEventListener("DOMContentLoaded",function(){const popupHistoricalSoilData=document.querySelector(".popup-historicalsoildata");popupHistoricalSoilData.style.display="none";});document.addEventListener("DOMContentLoaded",function(){var closeBtn=document.querySelector(".close-btn");var popup=document.querySelector(".popup-historicalsoildata");closeBtn.addEventListener("click",function(){resetCharts();popup.style.display="none";});});function resetCharts(){if(npkChart){npkChart.destroy();npkChart=null;}
if(moistChart){moistChart.destroy();moistChart=null;}
if(pHChart){pHChart.destroy();pHChart=null;}
if(tempChart){tempChart.destroy();tempChart=null;}
if(npkGauge){npkGauge.destroy();npkGauge=null;}
if(moistGauge){moistGauge.destroy();moistGauge=null;}
if(pHGauge){pHGauge.destroy();pHGauge=null;}
if(tempGauge){tempGauge.destroy();tempGauge=null;}
resetChartMessages();const buttons=document.querySelectorAll('.timeTrend-buttons button');buttons.forEach(btn=>btn.classList.remove('active'));const npkMinMax=document.getElementById('npkMinMax');if(npkMinMax)npkMinMax.remove();const moistMinMax=document.getElementById('moistMinMax');if(moistMinMax)moistMinMax.remove();if(moistMinMax)moistMinMax.remove();const pHMinMax=document.getElementById('pHMinMax');if(pHMinMax)pHMinMax.remove();const tempMinMax=document.getElementById('tempMinMax');if(tempMinMax)tempMinMax.remove();}
function resetChartMessages(){const npkHeader=document.querySelector('.headerNPK .title');if(npkHeader)npkHeader.innerHTML='';const npkStatus=document.querySelector('.headerNPK .nutrient-status');if(npkStatus)npkStatus.remove();const moistHeader=document.querySelector('.headerMoist .title');if(moistHeader)moistHeader.innerHTML='';const moistStatus=document.querySelector('.headerMoist .moisture-status');if(moistStatus)moistStatus.remove();const phHeader=document.querySelector('.headerpH .title');if(phHeader)phHeader.innerHTML='';const phStatus=document.querySelector('.headerpH .ph-status');if(phStatus)phStatus.remove();const tempHeader=document.querySelector('.headerTemp .title');if(tempHeader)tempHeader.innerHTML='';const tempStatus=document.querySelector('.headerTemp .temp-status');if(tempStatus)tempStatus.remove();clearGaugeCanvas('npkGauge');clearGaugeCanvas('moistGauge');clearGaugeCanvas('pHGauge');clearGaugeCanvas('tempGauge');}
function clearGaugeCanvas(canvasId){const canvas=document.getElementById(canvasId);if(canvas){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);}}
function setupNPKObserver(){const observerTarget=document.querySelector('.headerNPK');if(observerTarget){const observer=new MutationObserver((mutations)=>{mutations.forEach((mutation)=>{if(mutation.type==='childList'){}});});observer.observe(observerTarget,{childList:true,subtree:true});}}
document.addEventListener('DOMContentLoaded',setupNPKObserver);document.addEventListener('npkStatusUpdated',(event)=>{});function createOrUpdateGaugeCharts(latestNpkValue,latestMoistValue,latestPHValue,latestTempValue){const npkMaxValue=3;const npkThresholds=[0.5,1];const latestNpkRatio=latestNpkValue===null?0:latestNpkValue/300;let npkStatus="";if(latestNpkRatio<0.5){npkStatus=`<span data-translate="Insufficient Nutrients">${getTranslatedText("Insufficient Nutrients")}</span>`;}else if(latestNpkRatio<=1){npkStatus=`<span data-translate="Adequate Nutrients">${getTranslatedText("Adequate Nutrients")}</span>`;}else{npkStatus=`<span data-translate="Excess Nutrients">${getTranslatedText("Excess Nutrients")}</span>`;}
const npkStatusElement=document.querySelector('.nutrient-status');if(npkStatusElement){npkStatusElement.innerHTML=npkStatus;const event=new CustomEvent('npkStatusUpdated',{detail:npkStatus});document.dispatchEvent(event);}else{console.log("NPK status element not found in DOM");}
if(npkGauge){npkGauge.data.datasets[0].needleValue=latestNpkRatio;npkGauge.options.plugins.gaugeValue=latestNpkRatio;npkGauge.update();}else{npkGauge=setupGaugeChart("npkGauge","NPK",npkThresholds,latestNpkRatio,0,npkMaxValue,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Insufficient","Adequate","Excess"]});}
const moistureThresholds=[35,55];if(moistGauge){moistGauge.data.datasets[0].needleValue=latestMoistValue===null?0:latestMoistValue;moistGauge.options.plugins.gaugeValue=latestMoistValue===null?0:latestMoistValue;moistGauge.update();}else{moistGauge=setupGaugeChart("moistGauge","Độ ẩm (%)",moistureThresholds,latestMoistValue===null?0:latestMoistValue,0,100,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Insufficient","Adequate","Excess"],unit:'%'});}
const pHThresholds=[4,4.5,6.8,7,7.01,8];if(pHGauge){pHGauge.data.datasets[0].needleValue=latestPHValue===null?0:latestPHValue;pHGauge.options.plugins.gaugeValue=latestPHValue===null?0:latestPHValue;pHGauge.update();}else{pHGauge=setupGaugeChart("pHGauge","pH",pHThresholds,latestPHValue===null?0:latestPHValue,0,14,{colors:["#BA0F30","#BA0F30","#BA0F30","#18A558","#BA0F30","#BA0F30","#BA0F30"],thresholdLabels:["Very Acidic","Acidic","Slightly Acidic","Neutral","Slightly Alkaline","Alkaline","Very Alkaline"]});}
const tempThresholds=[20,30];if(tempGauge){tempGauge.data.datasets[0].needleValue=latestTempValue===null?0:latestTempValue;tempGauge.options.plugins.gaugeValue=latestTempValue===null?0:latestTempValue;tempGauge.update();}else{tempGauge=setupGaugeChart("tempGauge","Nhiệt độ (°c)",tempThresholds,latestTempValue===null?0:latestTempValue,0,50,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Low Temp","Normal Temp","High Temp"],unit:'°c'});}}
function getTranslatedLabels(key){return currentLang==='vi'?translations.vi[key]:translations.en[key];}
function recreateGaugeCharts(){const npkMaxValue=3;const npkThresholds=[0.5,0.75,1];npkGauge=setupGaugeChart("npkGauge","NPK",npkThresholds,0,0,npkMaxValue,{colors:["#BA0F30","#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Insufficient","Average","Adequate","Excess"]});const moistureThresholds=[35,55];moistGauge=setupGaugeChart("moistGauge","Độ ẩm (%)",moistureThresholds,0,0,100,{colors:["#BA0F30","#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Rất khô","Thiếu nước","Đủ ẩm","Thừa nước"],unit:'%'});const pHThresholds=[4,4.5,7,8];pHGauge=setupGaugeChart("pHGauge","pH",pHThresholds,7,0,14,{colors:["#BA0F30","#BA0F30","#BA0F30","#18A558","#BA0F30","#BA0F30","#BA0F30"],thresholdLabels:["Very Acidic","Acidic","Slightly Acidic","Neutral","Slightly Alkaline","Alkaline","Very Alkaline"]});const tempThresholds=[20,30];tempGauge=setupGaugeChart("tempGauge","Nhiệt độ (°c)",tempThresholds,25,0,50,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Low Temp","Normal Temp","High Temp"],unit:'°c'});}
function calculateMinMax(data){const validData=data.filter(value=>value!==null&&!isNaN(value)&&isFinite(value));if(validData.length===0){return{min:"-",max:"-"};}
return{min:Math.min(...validData),max:Math.max(...validData)};}
window.addEventListener('soilDataRequested',function(event){const{regionId,depthId}=event.detail;resetCharts();axios.post("https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old",{region_id:regionId}).then(function(response){const responseContent=response.data.content;let data;if(responseContent.length===1){data=responseContent[0].values;}else if(responseContent.length>depthId){data=responseContent[depthId].values;}else{console.log(`No data found for regionId: ${regionId} and depthId: ${depthId}`);return;}
const sortedDates=data.created_at.slice().sort((a,b)=>new Date(a)-new Date(b));const sortedIndices=sortedDates.map((date)=>data.created_at.indexOf(date));const sortedNpkValues=sortedIndices.map((index)=>data.npk[index]);const sortedMoistValues=sortedIndices.map((index)=>data.moist[index]);const sortedPHValues=sortedIndices.map((index)=>data.pH[index]);const sortedTValues=sortedIndices.map((index)=>data.t[index]);function createGradient(ctx,startColor,endColor){const gradient=ctx.createLinearGradient(0,0,0,ctx.canvas.height);gradient.addColorStop(0,startColor);gradient.addColorStop(1,endColor);return gradient;}
const npkCtx=document.getElementById("npkChart").getContext("2d");const npkGradient=createGradient(npkCtx,"rgba(255, 99, 132, 0.8)","rgba(255, 255, 255, 0)");const{min:npkMin,max:npkMax}=calculateMinMax(sortedNpkValues);const npkMinMaxContainer=document.createElement('div');npkMinMaxContainer.id='npkMinMax';npkMinMaxContainer.style.textAlign='right';npkMinMaxContainer.style.marginBottom='5px';npkMinMaxContainer.style.fontSize='12px';npkMinMaxContainer.innerHTML=`
    <span style="color: rgba(255, 99, 132, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        <span data-translate="Min">Tối thiểu</span>: ${npkMin === "-" ? "-" : npkMin.toFixed(2)} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        <span data-translate="Max">Tối đa</span>: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}
    </span>
`;const npkChartCanvas=document.getElementById('npkChart');npkChartCanvas.parentNode.insertBefore(npkMinMaxContainer,npkChartCanvas);npkChart=new Chart(npkCtx,{type:"line",data:{labels:sortedDates,datasets:[{label:"NPK",data:sortedNpkValues,borderColor:"rgba(255, 99, 132, 1)",backgroundColor:npkGradient,borderWidth:1,fill:true}]},options:{scales:{yAxes:[{ticks:{beginAtZero:true}}],xAxes:[{type:"time",time:{minUnit:"day",displayFormats:{day:"MMM D, YYYY"}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}},});const latestNpkValue=sortedNpkValues[sortedNpkValues.length-1];const previousNpkValue=sortedNpkValues[sortedNpkValues.length-2];const nutrientRatio=latestNpkValue===null?0:latestNpkValue/300;let indicatorNPK="";if(latestNpkValue>previousNpkValue){indicatorNPK='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';}else if(latestNpkValue<previousNpkValue){indicatorNPK='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';}
let headerContentNPK=`
    <span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>
    &nbsp;
    <span style="color: rgba(255, 99, 132, 1)">
      ${latestNpkValue === null ? '0.00' : latestNpkValue.toFixed(2)} 
      (${nutrientRatio.toFixed(2)})
    </span>
    &nbsp;
    <span style="color: rgba(255, 99, 132, 1); font-size: 8px;" data-translate="latest measure">(đo lường mới nhất)</span>
`;if(indicatorNPK!==""){headerContentNPK+=`&nbsp;&nbsp;${indicatorNPK}`;}
document.querySelector(".headerNPK .title").innerHTML=headerContentNPK;let npkStatus="";let nutrientIcon="";let nutrientColor="";if(latestNpkValue===null){npkStatus=`<span data-translate="No data">${getTranslatedText("No data")}</span>`;nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';nutrientColor="#888888";}else{if(nutrientRatio<0.5){npkStatus=`<span data-translate="Insufficient Nutrients">${getTranslatedText("Insufficient Nutrients")}</span>`;nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';nutrientColor="#BA0F30";}else if(nutrientRatio<=0.75){npkStatus=`<span data-translate="Average Nutrients">${getTranslatedText("Average Nutrients")}</span>`;nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';nutrientColor="#18A558";}else if(nutrientRatio<=1){npkStatus=`<span data-translate="Adequate Nutrients">${getTranslatedText("Adequate Nutrients")}</span>`;nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';nutrientColor="#18A558";}else{npkStatus=`<span data-translate="Excess Nutrients">${getTranslatedText("Excess Nutrients")}</span>`;nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';nutrientColor="#BA0F30";}}
let npkTooltipContainer=document.getElementById('npk-recommendation-container');if(!npkTooltipContainer){npkTooltipContainer=document.createElement('div');npkTooltipContainer.id='npk-recommendation-container';document.body.appendChild(npkTooltipContainer);}
const npkRecommendations=getNutrientRecommendation(npkStatus);npkTooltipContainer.innerHTML=`
    <span id="npkreccomendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
        <p>${npkRecommendations[currentLang]}</p>
    </span>
`;const nutrientStatusElement=document.createElement("div");nutrientStatusElement.classList.add("nutrient-status");nutrientStatusElement.style.fontSize="10px";nutrientStatusElement.style.color="white";nutrientStatusElement.style.backgroundColor=nutrientColor;nutrientStatusElement.style.borderRadius="20px";nutrientStatusElement.style.padding="4px 5px";nutrientStatusElement.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)";const nutrientTextSpan=document.createElement("span");nutrientTextSpan.style.display="flex";nutrientTextSpan.style.alignItems="center";nutrientTextSpan.style.marginTop="-1px";nutrientTextSpan.innerHTML=`${nutrientIcon}&nbsp;${npkStatus}`;nutrientStatusElement.appendChild(nutrientTextSpan);const headerNPKSection=document.querySelector(".headerNPK");headerNPKSection.appendChild(nutrientStatusElement);const moistCtx=document.getElementById("moistChart").getContext("2d");const moistGradient=createGradient(moistCtx,"rgba(54, 162, 235, 0.8)","rgba(54, 162, 235, 0)");const{min:moistMin,max:moistMax}=calculateMinMax(sortedMoistValues);const moistMinMaxContainer=document.createElement('div');moistMinMaxContainer.id='moistMinMax';moistMinMaxContainer.style.textAlign='right';moistMinMaxContainer.style.marginBottom='5px';moistMinMaxContainer.style.fontSize='12px';moistMinMaxContainer.innerHTML=`
            <span style="color: rgba(54, 162, 235, 1);">
                <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                <span data-translate="Min">Tối thiểu</span>: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"} 
                <!--<span data-translate="Min">Min</span>: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"}--> 
                <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                <span data-translate="Max">Tối đa</span>: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}
                <!--<span data-translate="Max">Max</span>: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}-->
            </span>
            `;const moistChartCanvas=document.getElementById('moistChart');moistChartCanvas.parentNode.insertBefore(moistMinMaxContainer,moistChartCanvas);const moistureLabel=currentLang==='vi'?"Độ ẩm (%)":"Moisture (%)";moistChart=new Chart(moistCtx,{type:"line",data:{labels:sortedDates,datasets:[{label:moistureLabel,data:sortedMoistValues,borderColor:"rgba(54, 162, 235, 1)",backgroundColor:moistGradient,borderWidth:1,fill:true}]},options:{scales:{yAxes:[{ticks:{beginAtZero:true}}],xAxes:[{type:"time",time:{minUnit:"day",displayFormats:{day:"MMM D, YYYY"}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}},});const latestMoistValue=sortedMoistValues[sortedMoistValues.length-1];const previousMoistValue=sortedMoistValues[sortedMoistValues.length-2];let indicatorMoist="";if(latestMoistValue>previousMoistValue){indicatorMoist='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';}else if(latestMoistValue<previousMoistValue){indicatorMoist='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';}
let moistureStatus="";let moistureIcon="";let moistureColor="";if(latestMoistValue===null){moistureStatus=`<span data-translate="No data">${getTranslatedText("No data")}</span>`;moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';moistureColor="#888888";}else{if(latestMoistValue<22.5){moistureStatus=`<span data-translate="Very dry">${getTranslatedText("Very dry")}</span>`;moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';moistureColor="#BA0F30";}else if(latestMoistValue<=35){moistureStatus=`<span data-translate="Lack of water">${getTranslatedText("Lack of water")}</span>`;moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';moistureColor="#BA0F30";}else if(latestMoistValue<=55){moistureStatus=`<span data-translate="Enough moisture">${getTranslatedText("Enough moisture")}</span>`;moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';moistureColor="#18A558";}else{moistureStatus=`<span data-translate="Excess water">${getTranslatedText("Excess water")}</span>`;moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';moistureColor="#BA0F30";}}
let moistureTooltipContainer=document.getElementById('moisture-recommendation-container');if(!moistureTooltipContainer){moistureTooltipContainer=document.createElement('div');moistureTooltipContainer.id='moisture-recommendation-container';document.body.appendChild(moistureTooltipContainer);}
const moistureRecommendations=getMoistureRecommendation(moistureStatus);moistureTooltipContainer.innerHTML=`
    <span id="moisturerecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
        <p>${moistureRecommendations[currentLang]}</p>
    </span>
`;const moistureStatusElement=document.createElement("div");moistureStatusElement.classList.add("moisture-status");moistureStatusElement.style.fontSize="10px";moistureStatusElement.style.color="white";moistureStatusElement.style.backgroundColor=moistureColor;moistureStatusElement.style.borderRadius="20px";moistureStatusElement.style.padding="4px 5px";moistureStatusElement.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)";const moistureTextSpan=document.createElement("span");moistureTextSpan.style.display="flex";moistureTextSpan.style.alignItems="center";moistureTextSpan.style.marginTop="-1px";moistureTextSpan.innerHTML=`${moistureIcon}&nbsp;${moistureStatus}`;moistureStatusElement.appendChild(moistureTextSpan);const headerMoistSection=document.querySelector(".headerMoist");headerMoistSection.appendChild(moistureStatusElement);updateMoistureStatus();let headerContentMoist=`
            <span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>
            &nbsp;
            <span style="color: rgba(54, 162, 235, 1)">${latestMoistValue}</span>
            &nbsp;
            <span style="color: rgba(54, 162, 235, 1); font-size: 8px;" data-translate="latest measure">(đo lường mới nhất)</span>
            <!--<span style="color: rgba(54, 162, 235, 1); font-size: 8px;" data-translate="latest measure">(latest measure)</span>-->
          `;if(indicatorMoist!==""){headerContentMoist+=`&nbsp;&nbsp;${indicatorMoist}`;}
document.querySelector(".headerMoist .title").innerHTML=headerContentMoist;const pHCtx=document.getElementById("phChart").getContext("2d");const pHGradient=createGradient(pHCtx,"rgba(75, 192, 192, 0.8)","rgba(75, 192, 192, 0)");const{min:pHMin,max:pHMax}=calculateMinMax(sortedPHValues);const pHMinMaxContainer=document.createElement('div');pHMinMaxContainer.id='pHMinMax';pHMinMaxContainer.style.textAlign='right';pHMinMaxContainer.style.marginBottom='5px';pHMinMaxContainer.style.fontSize='12px';pHMinMaxContainer.innerHTML=`
            <span style="color: rgba(75, 192, 192, 1);">
                <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                <span data-translate="Min">Tối thiểu</span>: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + "pH"} 
                <!--<span data-translate="Min">Min</span>: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + "pH"}--> 
                <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                <span data-translate="Max">Tối đa</span>: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + "pH"}
                <!--<span data-translate="Max">Max</span>: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + "pH"}-->
            </span>
            `;const pHChartCanvas=document.getElementById('phChart');pHChartCanvas.parentNode.insertBefore(pHMinMaxContainer,pHChartCanvas);pHChart=new Chart(pHCtx,{type:"line",data:{labels:sortedDates,datasets:[{label:"pH",data:sortedPHValues,borderColor:"rgba(75, 192, 192, 1)",backgroundColor:pHGradient,borderWidth:1,fill:true}]},options:{scales:{yAxes:[{ticks:{beginAtZero:true}}],xAxes:[{type:"time",time:{minUnit:"day",displayFormats:{day:"MMM D, YYYY"}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}},});const latestPHValue=sortedPHValues[sortedPHValues.length-1];const previousPHValue=sortedPHValues[sortedPHValues.length-2];let indicatorPH="";if(latestPHValue>previousPHValue){indicatorPH='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';}else if(latestPHValue<previousPHValue){indicatorPH='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';}
let headerContentPH=`
            <span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">water_ph</span>
            &nbsp;
            <span style="color: rgba(75, 192, 192, 1)">${latestPHValue}</span>
            &nbsp;
            <span style="color: rgba(75, 192, 192, 1); font-size: 8px;" data-translate="latest measure">(đo lường mới nhất)</span>
            <!--<span style="color: rgba(75, 192, 192, 1); font-size: 8px;" data-translate="latest measure">(latest measure)</span>-->
          `;if(indicatorPH!==""){headerContentPH+=`&nbsp;&nbsp;${indicatorPH}`;}
document.querySelector(".headerpH .title").innerHTML=headerContentPH;let pHStatus="";let pHIcon="";let pHColor="";if(latestPHValue===null){pHStatus=`<span data-translate="No data">${getTranslatedText("No data")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';pHColor="#888888";}else{if(latestPHValue===7){pHStatus=`<span data-translate="Neutral">${getTranslatedText("Neutral")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';pHColor="#18A558";}else if(latestPHValue<4){pHStatus=`<span data-translate="Very Acidic">${getTranslatedText("Very Acidic")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor="#BA0F30";}else if(latestPHValue>=4&&latestPHValue<=4.5){pHStatus=`<span data-translate="Acidic">${getTranslatedText("Acidic")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor="#BA0F30";}else if(latestPHValue>4.5&&latestPHValue<7){pHStatus=`<span data-translate="Slightly Acidic">${getTranslatedText("Slightly Acidic")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor="#BA0F30";}else if(latestPHValue>7&&latestPHValue<8){pHStatus=`<span data-translate="Slightly Alkaline">${getTranslatedText("Slightly Alkaline")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor="#BA0F30";}else if(latestPHValue===8){pHStatus=`<span data-translate="Alkaline">${getTranslatedText("Alkaline")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor="#BA0F30";}else if(latestPHValue>8){pHStatus=`<span data-translate="Very Alkaline">${getTranslatedText("Very Alkaline")}</span>`;pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor="#BA0F30";}}
let pHTooltipContainer=document.getElementById('ph-recommendation-container');if(!pHTooltipContainer){pHTooltipContainer=document.createElement('div');pHTooltipContainer.id='ph-recommendation-container';document.body.appendChild(pHTooltipContainer);}
const pHRecommendations=getPHRecommendation(pHStatus);pHTooltipContainer.innerHTML=`
    <span id="phrecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
        <p>${pHRecommendations[currentLang]}</p>
    </span>
`;const pHStatusElement=document.createElement("div");pHStatusElement.classList.add("ph-status");pHStatusElement.style.fontSize="10px";pHStatusElement.style.color="white";pHStatusElement.style.backgroundColor=pHColor;pHStatusElement.style.borderRadius="20px";pHStatusElement.style.padding="4px 5px";pHStatusElement.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)";const pHTextSpan=document.createElement("span");pHTextSpan.style.display="flex";pHTextSpan.style.alignItems="center";pHTextSpan.style.marginTop="-1px";pHTextSpan.innerHTML=`${pHIcon}&nbsp;${pHStatus}`;pHStatusElement.appendChild(pHTextSpan);const headerPHSection=document.querySelector(".headerpH");headerPHSection.appendChild(pHStatusElement);updatePHStatus();const tCtx=document.getElementById("tempChart").getContext("2d");const tGradient=createGradient(tCtx,"rgba(255, 159, 64, 0.8)","rgba(255, 159, 64, 0)");const{min:tempMin,max:tempMax}=calculateMinMax(sortedTValues);const tempMinMaxContainer=document.createElement('div');tempMinMaxContainer.id='tempMinMax';tempMinMaxContainer.style.textAlign='right';tempMinMaxContainer.style.marginBottom='5px';tempMinMaxContainer.style.fontSize='12px';tempMinMaxContainer.innerHTML=`
            <span style="color: rgba(255, 159, 64, 1);">
                <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                <span data-translate="Min">Tối thiểu</span>: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"} 
                <!--<span data-translate="Min">Min</span>: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"}--> 
                <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                <span data-translate="Max">Tối đa</span>: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}
                <!--<span data-translate="Max">Max</span>: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}-->
            </span>
            `;const tempChartCanvas=document.getElementById('tempChart');tempChartCanvas.parentNode.insertBefore(tempMinMaxContainer,tempChartCanvas);const temperatureLabel=currentLang==='vi'?"Nhiệt độ (°c)":"Temperature (°c)";tempChart=new Chart(tCtx,{type:"line",data:{labels:sortedDates,datasets:[{label:temperatureLabel,data:sortedTValues,borderColor:"rgba(255, 159, 64, 1)",backgroundColor:tGradient,borderWidth:1,fill:true}]},options:{scales:{yAxes:[{display:false,ticks:{font:{size:6}}}]},layout:{padding:{top:0}}},});const latestTempValue=sortedTValues[sortedTValues.length-1];const previousTempValue=sortedTValues[sortedTValues.length-2];let indicatorTemp="";if(latestTempValue>previousTempValue){indicatorTemp='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>';}else if(latestTempValue<previousTempValue){indicatorTemp='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>';}
let headerContentTemp=`
  <span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">device_thermostat</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1)">${latestTempValue}</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1); font-size: 8px;" data-translate="latest measure">(đo lường mới nhất)</span>
  <!--<span style="color: rgba(255, 159, 64, 1); font-size: 8px;" data-translate="latest measure">(latest measure)</span>-->
`;if(indicatorTemp!==""){headerContentTemp+=`&nbsp;&nbsp;${indicatorTemp}`;}
document.querySelector(".headerTemp .title").innerHTML=headerContentTemp;let tempStatus="";let tempIcon="";let tempColor="";if(latestTempValue===null){tempStatus=`<span data-translate="No data">${getTranslatedText("No data")}</span>`;tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';tempColor="#888888";}else{if(latestTempValue>=20&&latestTempValue<=30){tempStatus=`<span data-translate="Average Temp">${getTranslatedText("Average Temp")}</span>`;tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';tempColor="#18A558";}else if(latestTempValue<20){tempStatus=`<span data-translate="Low Temp">${getTranslatedText("Low Temp")}</span>`;tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';tempColor="#BA0F30";}else{tempStatus=`<span data-translate="High Temp">${getTranslatedText("High Temp")}</span>`;tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';tempColor="#BA0F30";}}
let tempTooltipContainer=document.getElementById('temp-recommendation-container');if(!tempTooltipContainer){tempTooltipContainer=document.createElement('div');tempTooltipContainer.id='temp-recommendation-container';document.body.appendChild(tempTooltipContainer);}
const tempRecommendations=getTempRecommendation(tempStatus);tempTooltipContainer.innerHTML=`
    <span id="temprecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        <span class="recommendation-header">${currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:'}</span>
        <p>${tempRecommendations[currentLang]}</p>
    </span>
`;const tempStatusElement=document.createElement("div");tempStatusElement.classList.add("temp-status");tempStatusElement.style.fontSize="10px";tempStatusElement.style.color="white";tempStatusElement.style.backgroundColor=tempColor;tempStatusElement.style.borderRadius="20px";tempStatusElement.style.padding="4px 5px";tempStatusElement.style.boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)";const tempTextSpan=document.createElement("span");tempTextSpan.style.display="flex";tempTextSpan.style.alignItems="center";tempTextSpan.style.marginTop="-1px";tempTextSpan.innerHTML=`${tempIcon}&nbsp;${tempStatus}`;tempStatusElement.appendChild(tempTextSpan);const headerTempSection=document.querySelector(".headerTemp");headerTempSection.appendChild(tempStatusElement);updateTempStatus();const buttons=document.querySelectorAll('.timeTrend-buttons button');buttons.forEach(button=>{button.addEventListener('click',function(){const timeRange=this.textContent;const endDate=new Date();let startDate;buttons.forEach(btn=>btn.classList.remove('active'));this.classList.add('active');switch(timeRange){case'1D':startDate=new Date(endDate.getTime()-1*24*60*60*1000);break;case'1W':startDate=new Date(endDate.getTime()-7*24*60*60*1000);break;case'2W':startDate=new Date(endDate.getTime()-14*24*60*60*1000);break;case'1M':startDate=new Date(endDate.getFullYear(),endDate.getMonth()-1,endDate.getDate());break;case'3M':startDate=new Date(endDate.getFullYear(),endDate.getMonth()-3,endDate.getDate());break;case'6M':startDate=new Date(endDate.getFullYear(),endDate.getMonth()-6,endDate.getDate());break;case'1Y':startDate=new Date(endDate.getFullYear()-1,endDate.getMonth(),endDate.getDate());break;case'3Y':startDate=new Date(endDate.getFullYear()-3,endDate.getMonth(),endDate.getDate());break;case'5Y':startDate=new Date(endDate.getFullYear()-5,endDate.getMonth(),endDate.getDate());break;default:return;}
const filteredDates=sortedDates.filter(date=>new Date(date)>=startDate&&new Date(date)<=endDate);const filteredNpkValues=sortedNpkValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));const filteredMoistValues=sortedMoistValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));const filteredPHValues=sortedPHValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));const filteredTValues=sortedTValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));npkChart.data.labels=filteredDates;npkChart.data.datasets[0].data=filteredNpkValues;npkChart.update();const{min:npkMin,max:npkMax}=calculateMinMax(filteredNpkValues);const npkMinMaxContainer=document.getElementById('npkMinMax');npkMinMaxContainer.innerHTML=`
                    <span style="color: rgba(255, 99, 132, 1);">
                        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                        <span data-translate="Min">Tối thiểu</span>: ${npkMin === "-" ? "-" : npkMin.toFixed(2)} 
                        <!--<span data-translate="Min">Min</span>: ${npkMin === "-" ? "-" : npkMin.toFixed(2)}--> 
                        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                        <span data-translate="Max">Tối đa</span>: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}
                        <!--<span data-translate="Max">Max</span>: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}-->
                    </span>
                `;moistChart.data.labels=filteredDates;moistChart.data.datasets[0].data=filteredMoistValues;moistChart.update();const{min:moistMin,max:moistMax}=calculateMinMax(filteredMoistValues);const moistMinMaxContainer=document.getElementById('moistMinMax');moistMinMaxContainer.innerHTML=`
<span style="color: rgba(54, 162, 235, 1);">
    <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
    <span data-translate="Min">Tối thiểu</span>: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"} 
    <!--<span data-translate="Min">Min</span>: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"}--> 
    <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
    <span data-translate="Max">Tối đa</span>: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}
    <!--<span data-translate="Max">Max</span>: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}-->
</span>
`;pHChart.data.labels=filteredDates;pHChart.data.datasets[0].data=filteredPHValues;pHChart.update();const{min:pHMin,max:pHMax}=calculateMinMax(filteredPHValues);const pHMinMaxContainer=document.getElementById('pHMinMax');pHMinMaxContainer.innerHTML=`
                    <span style="color: rgba(75, 192, 192, 1);">
                        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                        <span data-translate="Min">Tối thiểu</span>: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + "pH"} 
                        <!--<span data-translate="Min">Min</span>: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + "pH"}--> 
                        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                        <span data-translate="Max">Tối đa</span>: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + "pH"}
                        <!--<span data-translate="Max">Max</span>: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + "pH"}-->
                    </span>
                    `;tempChart.data.labels=filteredDates;tempChart.data.datasets[0].data=filteredTValues;tempChart.update();const{min:tempMin,max:tempMax}=calculateMinMax(filteredTValues);const tempMinMaxContainer=document.getElementById('tempMinMax');tempMinMaxContainer.innerHTML=`
                    <span style="color: rgba(255, 159, 64, 1);">
                        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                        <span data-translate="Min">Tối thiểu</span>: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"} 
                        <!--<span data-translate="Min">Min</span>: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"}--> 
                        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                        <span data-translate="Max">Tối đa</span>: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}
                        <!--<span data-translate="Max">Max</span>: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}-->
                    </span>
                    `;});});createOrUpdateGaugeCharts(latestNpkValue,latestMoistValue,latestPHValue,latestTempValue);}).catch(function(error){console.log(error);});});function setActiveButton(button){const buttons=document.querySelectorAll('.timeTrend-buttons button');buttons.forEach(btn=>btn.classList.remove('active'));button.classList.add('active');}
function setupGaugeChart(canvasId,title,thresholds,defaultValue,minValue,maxValue,options){const data={datasets:[{data:[thresholds[0]-minValue,...thresholds.slice(1).map((t,i)=>t-thresholds[i]),maxValue-thresholds[thresholds.length-1]],backgroundColor:options.colors,needleValue:defaultValue,borderWidth:0,cutout:"85%",circumference:180,rotation:270,}]};const gaugeNeedle={id:"gaugeNeedle",afterDatasetDraw(chart,args,options){const{ctx,chartArea:{top,bottom,left,right,width,height}}=chart;ctx.save();const padding=2;const adjustedLeft=left+padding;const adjustedRight=right-padding;const adjustedWidth=width-2*padding;const needleValue=data.datasets[0].needleValue;const angle=Math.PI+(1/(maxValue-minValue))*(needleValue-minValue)*Math.PI;const cx=adjustedLeft+adjustedWidth/2;const cy=chart._metasets[0].data[0].y+10;ctx.translate(cx,cy);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(0,-2);ctx.lineTo(height/2,0);ctx.lineTo(0,2);ctx.fillStyle="#444";ctx.fill();ctx.translate(-cx,-cy);ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();ctx.restore();ctx.font="12px 'Be Vietnam', sans-serif";ctx.fillStyle="#444";ctx.textAlign="center";ctx.fillText(title,cx,cy-83);ctx.font="bold 16px Be Vietnam";ctx.fillText(`${defaultValue.toFixed(2)}${options.unit || ''}`,cx,cy-20);ctx.font="bold 16px Be Vietnam";ctx.fillText(`${defaultValue === 0 ? '0.00' : defaultValue.toFixed(2)}${options.unit || ''}`,cx,cy-20);const radius=height/2+15;ctx.font="8px 'Be Vietnam', sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";let tickValues;if(title==="NPK"){tickValues=[1,2];}else if(title==="Độ ẩm (%)"){tickValues=[25,50,75];}else if(title==="pH"){tickValues=[2,4,7,10,12];}else if(title==="Nhiệt độ (°c)"){tickValues=[10,20,30,40];}
tickValues.forEach(value=>{const angle=Math.PI+((value-minValue)/(maxValue-minValue))*Math.PI;const x=cx+Math.cos(angle)*radius;const y=cy+Math.sin(angle)*radius;const labelRadius=radius-25;const labelX=cx+Math.cos(angle)*labelRadius;const labelY=cy+Math.sin(angle)*labelRadius;ctx.fillText(value.toString()+(options.unit||''),labelX,labelY);});ctx.font="10px 'Be Vietnam', sans-serif";ctx.textAlign="left";ctx.fillText(`${minValue}${options.unit || ''}`,adjustedLeft,bottom-20);ctx.textAlign="right";ctx.fillText(`${maxValue}${options.unit || ''}`,adjustedRight,bottom-20);if(options.thresholdLabels){ctx.font="10px 'Be Vietnam', sans-serif";ctx.textAlign="center";const labelY=bottom+15;const labelCount=options.thresholdLabels.length;options.thresholdLabels.forEach((label,index)=>{const labelX=adjustedLeft+adjustedWidth*(index+0.5)/labelCount;ctx.fillText(label,labelX,labelY);});}}};const config={type:"doughnut",data,options:{responsive:true,plugins:{legend:{display:false},tooltip:{enabled:false},},},plugins:[gaugeNeedle],};return new Chart(document.getElementById(canvasId),config);}
function getNutrientRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Insufficient Nutrients":{en:`
            • Test soil pH and adjust if necessary for better nutrient availability<br>
            • Monitor plants closely for signs of deficiency<br>
            • Apply a balanced NPK fertilizer immediately<br>
            • Consider foliar feeding for quick nutrient uptake<br>
            • Increase organic matter in soil through mulching or compost
            `,vi:`
            • Kiểm tra độ pH của đất và điều chỉnh nếu cần thiết để cải thiện khả năng hấp thụ dinh dưỡng<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu dinh dưỡng<br>
            • Áp dụng ngay phân bón NPK cân bằng<br>
            • Cân nhắc sử dụng phân bón lá để cây hấp thụ dinh dưỡng nhanh chóng<br>
            • Tăng lượng chất hữu cơ trong đất thông qua việc phủ mulch hoặc bón compost
            `},"Thiếu dinh dưỡng":{en:`
            • Test soil pH and adjust if necessary for better nutrient availability<br>
            • Monitor plants closely for signs of deficiency<br>
            • Apply a balanced NPK fertilizer immediately<br>
            • Consider foliar feeding for quick nutrient uptake<br>
            • Increase organic matter in soil through mulching or compost
            `,vi:`
            • Kiểm tra độ pH của đất và điều chỉnh nếu cần thiết để cải thiện khả năng hấp thụ dinh dưỡng<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu dinh dưỡng<br>
            • Áp dụng ngay phân bón NPK cân bằng<br>
            • Cân nhắc sử dụng phân bón lá để cây hấp thụ dinh dưỡng nhanh chóng<br>
            • Tăng lượng chất hữu cơ trong đất thông qua việc phủ mulch hoặc bón compost
            `},"Average Nutrients":{en:`
            • Maintain current fertilization schedule<br>
            • Apply a light dose of balanced NPK fertilizer<br>
            • Continue regular soil testing to monitor nutrient levels<br>
            • Implement crop rotation or cover crops to improve soil health<br>
            • Use organic mulch to retain moisture and slowly release nutrients
            `,vi:`
            • Duy trì lịch bón phân hiện tại<br>
            • Áp dụng một liều nhẹ phân bón NPK cân bằng<br>
            • Tiếp tục kiểm tra đất thường xuyên để theo dõi mức dinh dưỡng<br>
            • Thực hiện luân canh hoặc trồng cây phủ đất để cải thiện sức khỏe đất<br>
            • Sử dụng lớp phủ hữu cơ để giữ ẩm và giải phóng dinh dưỡng từ từ
            `},"Dinh dưỡng trung bình":{en:`
            • Maintain current fertilization schedule<br>
            • Apply a light dose of balanced NPK fertilizer<br>
            • Continue regular soil testing to monitor nutrient levels<br>
            • Implement crop rotation or cover crops to improve soil health<br>
            • Use organic mulch to retain moisture and slowly release nutrients
            `,vi:`
            • Duy trì lịch bón phân hiện tại<br>
            • Áp dụng một liều nhẹ phân bón NPK cân bằng<br>
            • Tiếp tục kiểm tra đất thường xuyên để theo dõi mức dinh dưỡng<br>
            • Thực hiện luân canh hoặc trồng cây phủ đất để cải thiện sức khỏe đất<br>
            • Sử dụng lớp phủ hữu cơ để giữ ẩm và giải phóng dinh dưỡng từ từ
            `},"Adequate Nutrients":{en:`
            • Maintain current soil management practices<br>
            • Monitor plant growth and yield to ensure continued optimal nutrition<br>
            • Consider slight reduction in fertilizer application to prevent excess<br>
            • Focus on maintaining soil organic matter through mulching<br>
            • Implement precision farming techniques for efficient nutrient use
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Theo dõi sự phát triển và năng suất của cây để đảm bảo dinh dưỡng tối ưu liên tục<br>
            • Cân nhắc giảm nhẹ lượng phân bón để tránh dư thừa<br>
            • Tập trung vào việc duy trì chất hữu cơ trong đất thông qua việc phủ mulch<br>
            • Áp dụng kỹ thuật canh tác chính xác để sử dụng dinh dưỡng hiệu quả
            `},"Chất dinh dưỡng đầy đủ":{en:`
            • Maintain current soil management practices<br>
            • Monitor plant growth and yield to ensure continued optimal nutrition<br>
            • Consider slight reduction in fertilizer application to prevent excess<br>
            • Focus on maintaining soil organic matter through mulching<br>
            • Implement precision farming techniques for efficient nutrient use
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Theo dõi sự phát triển và năng suất của cây để đảm bảo dinh dưỡng tối ưu liên tục<br>
            • Cân nhắc giảm nhẹ lượng phân bón để tránh dư thừa<br>
            • Tập trung vào việc duy trì chất hữu cơ trong đất thông qua việc phủ mulch<br>
            • Áp dụng kỹ thuật canh tác chính xác để sử dụng dinh dưỡng hiệu quả
            `},"Excess Nutrients":{en:`
            • Consider adjusting soil pH to reduce nutrient availability if chronic<br>
            • Monitor for nutrient toxicity symptoms and soil/water pollution<br>
            • Stop fertilizer application immediately<br>
            • Increase irrigation to help leach excess nutrients (carefully to avoid runoff)<br>
            • Plant cover crops or green manures to absorb excess nutrients
            `,vi:`
            • Cân nhắc điều chỉnh độ pH của đất để giảm khả năng hấp thụ dinh dưỡng nếu tình trạng kéo dài<br>
            • Theo dõi các triệu chứng ngộ độc dinh dưỡng và ô nhiễm đất/nước<br>
            • Ngừng ngay việc bón phân<br>
            • Tăng cường tưới tiêu để giúp rửa trôi dinh dưỡng dư thừa (cẩn thận để tránh chảy tràn)<br>
            • Trồng cây phủ đất hoặc cây phân xanh để hấp thụ dinh dưỡng dư thừa
            `},"Dư dinh dưỡng":{en:`
            • Consider adjusting soil pH to reduce nutrient availability if chronic<br>
            • Monitor for nutrient toxicity symptoms and soil/water pollution<br>
            • Stop fertilizer application immediately<br>
            • Increase irrigation to help leach excess nutrients (carefully to avoid runoff)<br>
            • Plant cover crops or green manures to absorb excess nutrients
            `,vi:`
            • Cân nhắc điều chỉnh độ pH của đất để giảm khả năng hấp thụ dinh dưỡng nếu tình trạng kéo dài<br>
            • Theo dõi các triệu chứng ngộ độc dinh dưỡng và ô nhiễm đất/nước<br>
            • Ngừng ngay việc bón phân<br>
            • Tăng cường tưới tiêu để giúp rửa trôi dinh dưỡng dư thừa (cẩn thận để tránh chảy tràn)<br>
            • Trồng cây phủ đất hoặc cây phân xanh để hấp thụ dinh dưỡng dư thừa
            `},"No data":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getMoistureRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Very dry":{en:`
            • Increase irrigation immediately<br>
            • Apply mulch to retain soil moisture<br>
            • Consider installing drip irrigation for efficient water use<br>
            • Use drought-resistant varieties if persistent<br>
            • Monitor plants closely for signs of water stress
            `,vi:`
            • Tăng cường tưới nước ngay lập tức<br>
            • Áp dụng lớp phủ mulch để giữ ẩm đất<br>
            • Cân nhắc lắp đặt hệ thống tưới nhỏ giọt để sử dụng nước hiệu quả<br>
            • Sử dụng giống cây chịu hạn nếu tình trạng kéo dài<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu nước
            `},"Rất khô":{en:`
            • Increase irrigation immediately<br>
            • Apply mulch to retain soil moisture<br>
            • Consider installing drip irrigation for efficient water use<br>
            • Use drought-resistant varieties if persistent<br>
            • Monitor plants closely for signs of water stress
            `,vi:`
            • Tăng cường tưới nước ngay lập tức<br>
            • Áp dụng lớp phủ mulch để giữ ẩm đất<br>
            • Cân nhắc lắp đặt hệ thống tưới nhỏ giọt để sử dụng nước hiệu quả<br>
            • Sử dụng giống cây chịu hạn nếu tình trạng kéo dài<br>
            • Theo dõi chặt chẽ cây trồng để phát hiện dấu hiệu thiếu nước
            `},"Lack of water":{en:`
            • Increase watering frequency<br>
            • Check and adjust irrigation system if necessary<br>
            • Apply organic matter to improve soil water retention<br>
            • Use mulch to reduce evaporation<br>
            • Consider temporary shade for sensitive plants
            `,vi:`
            • Tăng tần suất tưới nước<br>
            • Kiểm tra và điều chỉnh hệ thống tưới tiêu nếu cần<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng giữ nước của đất<br>
            • Sử dụng lớp phủ mulch để giảm bay hơi<br>
            • Cân nhắc tạo bóng râm tạm thời cho cây nhạy cảm
            `},"Thiếu nước":{en:`
            • Increase watering frequency<br>
            • Check and adjust irrigation system if necessary<br>
            • Apply organic matter to improve soil water retention<br>
            • Use mulch to reduce evaporation<br>
            • Consider temporary shade for sensitive plants
            `,vi:`
            • Tăng tần suất tưới nước<br>
            • Kiểm tra và điều chỉnh hệ thống tưới tiêu nếu cần<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng giữ nước của đất<br>
            • Sử dụng lớp phủ mulch để giảm bay hơi<br>
            • Cân nhắc tạo bóng râm tạm thời cho cây nhạy cảm
            `},"Enough moisture":{en:`
            • Maintain current irrigation practices<br>
            • Monitor weather forecasts to adjust watering as needed<br>
            • Continue using mulch to retain moisture<br>
            • Ensure proper drainage to prevent waterlogging<br>
            • Regularly check soil moisture to maintain optimal levels
            `,vi:`
            • Duy trì phương pháp tưới tiêu hiện tại<br>
            • Theo dõi dự báo thời tiết để điều chỉnh tưới nước khi cần<br>
            • Tiếp tục sử dụng lớp phủ mulch để giữ ẩm<br>
            • Đảm bảo thoát nước tốt để tránh ngập úng<br>
            • Thường xuyên kiểm tra độ ẩm đất để duy trì mức tối ưu
            `},"Đủ ẩm":{en:`
            • Maintain current irrigation practices<br>
            • Monitor weather forecasts to adjust watering as needed<br>
            • Continue using mulch to retain moisture<br>
            • Ensure proper drainage to prevent waterlogging<br>
            • Regularly check soil moisture to maintain optimal levels
            `,vi:`
            • Duy trì phương pháp tưới tiêu hiện tại<br>
            • Theo dõi dự báo thời tiết để điều chỉnh tưới nước khi cần<br>
            • Tiếp tục sử dụng lớp phủ mulch để giữ ẩm<br>
            • Đảm bảo thoát nước tốt để tránh ngập úng<br>
            • Thường xuyên kiểm tra độ ẩm đất để duy trì mức tối ưu
            `},"Excess water":{en:`
            • Reduce irrigation immediately<br>
            • Improve soil drainage if necessary<br>
            • Avoid overwatering, especially during rainy periods<br>
            • Check for and fix any leaks in irrigation system<br>
            • Monitor for signs of root rot or fungal diseases
            `,vi:`
            • Giảm tưới nước ngay lập tức<br>
            • Cải thiện thoát nước đất nếu cần<br>
            • Tránh tưới quá nhiều, đặc biệt là trong mùa mưa<br>
            • Kiểm tra và sửa chữa bất kỳ rò rỉ nào trong hệ thống tưới<br>
            • Theo dõi các dấu hiệu thối rễ hoặc bệnh nấm
            `},"Thừa nước":{en:`
            • Reduce irrigation immediately<br>
            • Improve soil drainage if necessary<br>
            • Avoid overwatering, especially during rainy periods<br>
            • Check for and fix any leaks in irrigation system<br>
            • Monitor for signs of root rot or fungal diseases
            `,vi:`
            • Giảm tưới nước ngay lập tức<br>
            • Cải thiện thoát nước đất nếu cần<br>
            • Tránh tưới quá nhiều, đặc biệt là trong mùa mưa<br>
            • Kiểm tra và sửa chữa bất kỳ rò rỉ nào trong hệ thống tưới<br>
            • Theo dõi các dấu hiệu thối rễ hoặc bệnh nấm
            `},"No data":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment.
            `,vi:`
            • Hiện tại không có khuyến nghị.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getPHRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Very Acidic":{en:`
            • Apply lime to raise soil pH<br>
            • Use dolomitic lime if magnesium is also low<br>
            • Avoid using acidifying fertilizers<br>
            • Consider growing acid-loving plants if pH can't be raised<br>
            • Monitor pH regularly and adjust as needed
            `,vi:`
            • Bón vôi để tăng độ pH của đất<br>
            • Sử dụng vôi dolomit nếu lượng magiê cũng thấp<br>
            • Tránh sử dụng phân bón làm chua đất<br>
            • Cân nhắc trồng các loại cây ưa axit nếu không thể tăng pH<br>
            • Theo dõi pH thường xuyên và điều chỉnh khi cần thiết
            `},"Rất axit":{en:`
            • Apply lime to raise soil pH<br>
            • Use dolomitic lime if magnesium is also low<br>
            • Avoid using acidifying fertilizers<br>
            • Consider growing acid-loving plants if pH can't be raised<br>
            • Monitor pH regularly and adjust as needed
            `,vi:`
            • Bón vôi để tăng độ pH của đất<br>
            • Sử dụng vôi dolomit nếu lượng magiê cũng thấp<br>
            • Tránh sử dụng phân bón làm chua đất<br>
            • Cân nhắc trồng các loại cây ưa axit nếu không thể tăng pH<br>
            • Theo dõi pH thường xuyên và điều chỉnh khi cần thiết
            `},"Acidic":{en:`
            • Apply lime in smaller quantities to gradually raise pH<br>
            • Use organic matter to buffer pH changes<br>
            • Choose plants that tolerate slightly acidic conditions<br>
            • Avoid over-application of nitrogen fertilizers<br>
            • Test soil regularly to track pH changes
            `,vi:`
            • Bón vôi với số lượng nhỏ hơn để tăng pH từ từ<br>
            • Sử dụng chất hữu cơ để đệm thay đổi pH<br>
            • Chọn các loại cây chịu được điều kiện hơi axit<br>
            • Tránh bón quá nhiều phân đạm<br>
            • Kiểm tra đất thường xuyên để theo dõi sự thay đổi pH
            `},"Axit":{en:`
            • Apply lime in smaller quantities to gradually raise pH<br>
            • Use organic matter to buffer pH changes<br>
            • Choose plants that tolerate slightly acidic conditions<br>
            • Avoid over-application of nitrogen fertilizers<br>
            • Test soil regularly to track pH changes
            `,vi:`
            • Bón vôi với số lượng nhỏ hơn để tăng pH từ từ<br>
            • Sử dụng chất hữu cơ để đệm thay đổi pH<br>
            • Chọn các loại cây chịu được điều kiện hơi axit<br>
            • Tránh bón quá nhiều phân đạm<br>
            • Kiểm tra đất thường xuyên để theo dõi sự thay đổi pH
            `},"Slightly Acidic":{en:`
            • Monitor pH levels closely<br>
            • Use pH-neutral fertilizers<br>
            • Add organic matter to stabilize soil pH<br>
            • Consider minor lime applications if pH continues to drop<br>
            • Choose plants suitable for slightly acidic soils
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón trung tính pH<br>
            • Bổ sung chất hữu cơ để ổn định pH đất<br>
            • Cân nhắc bón vôi nhẹ nếu pH tiếp tục giảm<br>
            • Chọn các loại cây phù hợp với đất hơi axit
            `},"Hơi axit":{en:`
            • Monitor pH levels closely<br>
            • Use pH-neutral fertilizers<br>
            • Add organic matter to stabilize soil pH<br>
            • Consider minor lime applications if pH continues to drop<br>
            • Choose plants suitable for slightly acidic soils
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón trung tính pH<br>
            • Bổ sung chất hữu cơ để ổn định pH đất<br>
            • Cân nhắc bón vôi nhẹ nếu pH tiếp tục giảm<br>
            • Chọn các loại cây phù hợp với đất hơi axit
            `},"Neutral":{en:`
            • Maintain current soil management practices<br>
            • Use balanced fertilizers to avoid pH shifts<br>
            • Monitor pH regularly to ensure it stays neutral<br>
            • Add organic matter to improve soil buffering capacity<br>
            • Ideal for most crops - no major adjustments needed
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Sử dụng phân bón cân bằng để tránh thay đổi pH<br>
            • Theo dõi pH thường xuyên để đảm bảo nó giữ ở mức trung tính<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng đệm của đất<br>
            • Lý tưởng cho hầu hết các loại cây trồng - không cần điều chỉnh lớn
            `},"Trung tính":{en:`
            • Maintain current soil management practices<br>
            • Use balanced fertilizers to avoid pH shifts<br>
            • Monitor pH regularly to ensure it stays neutral<br>
            • Add organic matter to improve soil buffering capacity<br>
            • Ideal for most crops - no major adjustments needed
            `,vi:`
            • Duy trì các phương pháp quản lý đất hiện tại<br>
            • Sử dụng phân bón cân bằng để tránh thay đổi pH<br>
            • Theo dõi pH thường xuyên để đảm bảo nó giữ ở mức trung tính<br>
            • Bổ sung chất hữu cơ để cải thiện khả năng đệm của đất<br>
            • Lý tưởng cho hầu hết các loại cây trồng - không cần điều chỉnh lớn
            `},"Slightly Alkaline":{en:`
            • Monitor pH levels closely<br>
            • Use acidifying fertilizers if needed<br>
            • Add organic matter to help lower pH gradually<br>
            • Consider adding elemental sulfur in small amounts<br>
            • Choose plants tolerant of slightly alkaline conditions
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón làm chua nếu cần<br>
            • Bổ sung chất hữu cơ để giúp giảm pH từ từ<br>
            • Cân nhắc bổ sung lưu huỳnh nguyên tố với số lượng nhỏ<br>
            • Chọn các loại cây chịu được điều kiện hơi kiềm
            `},"Hơi kiềm":{en:`
            • Monitor pH levels closely<br>
            • Use acidifying fertilizers if needed<br>
            • Add organic matter to help lower pH gradually<br>
            • Consider adding elemental sulfur in small amounts<br>
            • Choose plants tolerant of slightly alkaline conditions
            `,vi:`
            • Theo dõi chặt chẽ mức pH<br>
            • Sử dụng phân bón làm chua nếu cần<br>
            • Bổ sung chất hữu cơ để giúp giảm pH từ từ<br>
            • Cân nhắc bổ sung lưu huỳnh nguyên tố với số lượng nhỏ<br>
            • Chọn các loại cây chịu được điều kiện hơi kiềm
            `},"Alkaline":{en:`
            • Apply elemental sulfur to lower soil pH<br>
            • Use acidifying fertilizers like ammonium sulfate<br>
            • Add organic matter to improve soil structure and pH<br>
            • Consider growing alkaline-tolerant plants<br>
            • Test soil regularly and adjust treatments as needed
            `,vi:`
            • Bón lưu huỳnh nguyên tố để giảm pH đất<br>
            • Sử dụng phân bón làm chua như amoni sulfat<br>
            • Bổ sung chất hữu cơ để cải thiện cấu trúc đất và pH<br>
            • Cân nhắc trồng các loại cây chịu kiềm<br>
            • Kiểm tra đất thường xuyên và điều chỉnh biện pháp khi cần thiết
            `},"Kiềm":{en:`
            • Apply elemental sulfur to lower soil pH<br>
            • Use acidifying fertilizers like ammonium sulfate<br>
            • Add organic matter to improve soil structure and pH<br>
            • Consider growing alkaline-tolerant plants<br>
            • Test soil regularly and adjust treatments as needed
            `,vi:`
            • Bón lưu huỳnh nguyên tố để giảm pH đất<br>
            • Sử dụng phân bón làm chua như amoni sulfat<br>
            • Bổ sung chất hữu cơ để cải thiện cấu trúc đất và pH<br>
            • Cân nhắc trồng các loại cây chịu kiềm<br>
            • Kiểm tra đất thường xuyên và điều chỉnh biện pháp khi cần thiết
            `},"Very Alkaline":{en:`
            • Apply larger amounts of elemental sulfur to lower pH<br>
            • Use acid-forming organic materials (e.g., peat moss)<br>
            • Avoid using alkaline water for irrigation if possible<br>
            • Consider raised beds with controlled soil pH for sensitive crops<br>
            • Monitor pH changes closely and adjust strategy as needed
            `,vi:`
            • Bón lượng lớn lưu huỳnh nguyên tố để giảm pH<br>
            • Sử dụng các vật liệu hữu cơ tạo axit (ví dụ: rêu bùn)<br>
            • Tránh sử dụng nước kiềm để tưới nếu có thể<br>
            • Cân nhắc sử dụng luống trồng nổi với pH đất được kiểm soát cho cây trồng nhạy cảm<br>
            • Theo dõi chặt chẽ sự thay đổi pH và điều chỉnh chiến lược khi cần thiết
            `},"Rất kiềm":{en:`
            • Apply larger amounts of elemental sulfur to lower pH<br>
            • Use acid-forming organic materials (e.g., peat moss)<br>
            • Avoid using alkaline water for irrigation if possible<br>
            • Consider raised beds with controlled soil pH for sensitive crops<br>
            • Monitor pH changes closely and adjust strategy as needed
            `,vi:`
            • Bón lượng lớn lưu huỳnh nguyên tố để giảm pH<br>
            • Sử dụng các vật liệu hữu cơ tạo axit (ví dụ: rêu bùn)<br>
            • Tránh sử dụng nước kiềm để tưới nếu có thể<br>
            • Cân nhắc sử dụng luống trồng nổi với pH đất được kiểm soát cho cây trồng nhạy cảm<br>
            • Theo dõi chặt chẽ sự thay đổi pH và điều chỉnh chiến lược khi cần thiết
            `},"No data":{en:`
            • No recommendations at the moment. Conduct a soil pH test.
            `,vi:`
            • Hiện tại không có khuyến nghị. Tiến hành kiểm tra độ pH của đất.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment. Conduct a soil pH test.
            `,vi:`
            • Hiện tại không có khuyến nghị. Tiến hành kiểm tra độ pH của đất.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}
function getTempRecommendation(status){const statusKey=status.replace(/<[^>]*>/g,'').trim();const recommendations={"Normal Temp":{en:`
            • Maintain current temperature management practices<br>
            • Monitor for any sudden changes in temperature<br>
            • Ensure proper air circulation in the growing area<br>
            • Continue regular plant health checks<br>
            • Adjust watering based on temperature and plant needs
            `,vi:`
            • Duy trì các biện pháp quản lý nhiệt độ hiện tại<br>
            • Theo dõi bất kỳ thay đổi đột ngột nào về nhiệt độ<br>
            • Đảm bảo lưu thông không khí đúng cách trong khu vực trồng trọt<br>
            • Tiếp tục kiểm tra sức khỏe cây trồng thường xuyên<br>
            • Điều chỉnh tưới nước dựa trên nhiệt độ và nhu cầu của cây
            `},"Nhiệt độ bình thường":{en:`
            • Maintain current temperature management practices<br>
            • Monitor for any sudden changes in temperature<br>
            • Ensure proper air circulation in the growing area<br>
            • Continue regular plant health checks<br>
            • Adjust watering based on temperature and plant needs
            `,vi:`
            • Duy trì các biện pháp quản lý nhiệt độ hiện tại<br>
            • Theo dõi bất kỳ thay đổi đột ngột nào về nhiệt độ<br>
            • Đảm bảo lưu thông không khí đúng cách trong khu vực trồng trọt<br>
            • Tiếp tục kiểm tra sức khỏe cây trồng thường xuyên<br>
            • Điều chỉnh tưới nước dựa trên nhiệt độ và nhu cầu của cây
            `},"Average Temp":{en:`
            • Maintain temperature between 60-70°F (15-21°C) for optimal growth<br>
            • Ensure proper shade management to regulate temperature<br>
            • Monitor soil moisture, as average temperatures can affect water retention<br>
            • Continue regular pest and disease checks, especially for  berry borer<br>
            • Adjust fertilization schedule based on growth rate and season
            `,vi:`
            • Duy trì nhiệt độ từ 15-21°C để tăng trưởng tối ưu<br>
            • Đảm bảo quản lý bóng râm phù hợp để điều chỉnh nhiệt độ<br>
            • Theo dõi độ ẩm đất, vì nhiệt độ trung bình có thể ảnh hưởng đến khả năng giữ nước<br>
            • Tiếp tục kiểm tra sâu bệnh thường xuyên, đặc biệt là mọt đục quả cà phê<br>
            • Điều chỉnh lịch bón phân dựa trên tốc độ tăng trưởng và mùa vụ
            `},"Nhiệt độ trung bình":{en:`
            • Maintain temperature between 60-70°F (15-21°C) for optimal growth<br>
            • Ensure proper shade management to regulate temperature<br>
            • Monitor soil moisture, as average temperatures can affect water retention<br>
            • Continue regular pest and disease checks, especially for  berry borer<br>
            • Adjust fertilization schedule based on growth rate and season
            `,vi:`
            • Duy trì nhiệt độ từ 15-21°C để tăng trưởng tối ưu<br>
            • Đảm bảo quản lý bóng râm phù hợp để điều chỉnh nhiệt độ<br>
            • Theo dõi độ ẩm đất, vì nhiệt độ trung bình có thể ảnh hưởng đến khả năng giữ nước<br>
            • Tiếp tục kiểm tra sâu bệnh thường xuyên, đặc biệt là mọt đục quả cà phê<br>
            • Điều chỉnh lịch bón phân dựa trên tốc độ tăng trưởng và mùa vụ
            `},"Low Temp":{en:`
            • Protect plants from frost if temperature drops further<br>
            • Use row covers or cold frames for sensitive crops<br>
            • Delay planting of warm-season crops if early in the season<br>
            • Reduce watering frequency to prevent waterlogging<br>
            • Consider using heating systems in greenhouses if applicable
            `,vi:`
            • Bảo vệ cây khỏi sương giá nếu nhiệt độ giảm thêm<br>
            • Sử dụng màn phủ hoặc khung lạnh cho cây trồng nhạy cảm<br>
            • Trì hoãn việc trồng cây mùa ấm nếu đang ở đầu mùa<br>
            • Giảm tần suất tưới nước để tránh ngập úng<br>
            • Cân nhắc sử dụng hệ thống sưởi trong nhà kính nếu có thể
            `},"Nhiệt độ thấp":{en:`
            • Protect plants from frost if temperature drops further<br>
            • Use row covers or cold frames for sensitive crops<br>
            • Delay planting of warm-season crops if early in the season<br>
            • Reduce watering frequency to prevent waterlogging<br>
            • Consider using heating systems in greenhouses if applicable
            `,vi:`
            • Bảo vệ cây khỏi sương giá nếu nhiệt độ giảm thêm<br>
            • Sử dụng màn phủ hoặc khung lạnh cho cây trồng nhạy cảm<br>
            • Trì hoãn việc trồng cây mùa ấm nếu đang ở đầu mùa<br>
            • Giảm tần suất tưới nước để tránh ngập úng<br>
            • Cân nhắc sử dụng hệ thống sưởi trong nhà kính nếu có thể
            `},"High Temp":{en:`
            • Increase watering frequency to prevent dehydration<br>
            • Provide shade for sensitive plants during peak heat hours<br>
            • Mulch around plants to retain soil moisture and cool roots<br>
            • Avoid fertilizing during extreme heat to prevent stress<br>
            • Monitor for signs of heat stress and adjust care accordingly
            `,vi:`
            • Tăng tần suất tưới nước để ngăn ngừa mất nước<br>
            • Tạo bóng râm cho cây nhạy cảm trong giờ nắng nóng cao điểm<br>
            • Phủ mulch quanh cây để giữ ẩm đất và làm mát rễ<br>
            • Tránh bón phân trong thời tiết nắng nóng cực độ để tránh gây stress cho cây<br>
            • Theo dõi các dấu hiệu stress do nhiệt và điều chỉnh chăm sóc phù hợp
            `},"Nhiệt độ cao":{en:`
            • Increase watering frequency to prevent dehydration<br>
            • Provide shade for sensitive plants during peak heat hours<br>
            • Mulch around plants to retain soil moisture and cool roots<br>
            • Avoid fertilizing during extreme heat to prevent stress<br>
            • Monitor for signs of heat stress and adjust care accordingly
            `,vi:`
            • Tăng tần suất tưới nước để ngăn ngừa mất nước<br>
            • Tạo bóng râm cho cây nhạy cảm trong giờ nắng nóng cao điểm<br>
            • Phủ mulch quanh cây để giữ ẩm đất và làm mát rễ<br>
            • Tránh bón phân trong thời tiết nắng nóng cực độ để tránh gây stress cho cây<br>
            • Theo dõi các dấu hiệu stress do nhiệt và điều chỉnh chăm sóc phù hợp
            `},"No data":{en:`
            • No recommendations at the moment. Check temperature monitoring equipment.
            `,vi:`
            • Hiện tại không có khuyến nghị. Kiểm tra thiết bị theo dõi nhiệt độ.
            `},"Không có dữ liệu":{en:`
            • No recommendations at the moment. Check temperature monitoring equipment.
            `,vi:`
            • Hiện tại không có khuyến nghị. Kiểm tra thiết bị theo dõi nhiệt độ.
            `}};return recommendations[statusKey]||{en:"No specific recommendations available.",vi:"Không có khuyến nghị cụ thể."};}