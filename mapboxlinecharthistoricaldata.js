let npkChart,moistChart,pHChart,tempChart;let npkGauge,moistGauge,pHGauge,tempGauge;let chartData={sortedDates:[],sortedNpkValues:[],sortedMoistValues:[],sortedPHValues:[],sortedTValues:[]};let sortedDates,sortedNpkValues,sortedMoistValues,sortedPHValues,sortedTValues;document.addEventListener('DOMContentLoaded',function(){const popupHistoricalSoilData=document.querySelector('.popup-historicalsoildata');popupHistoricalSoilData.style.display='none';var closeBtn=document.querySelector('.close-btn');var popup=document.querySelector('.popup-historicalsoildata');closeBtn.addEventListener('click',function(){popup.style.display='none';resetCanvas('npkChart');resetCanvas('moistChart');resetCanvas('phChart');resetCanvas('tempChart');resetCanvas('npkGauge');resetCanvas('moistGauge');resetCanvas('pHGauge');resetCanvas('tempGauge')});initializeChartsAndShowPopup();function initializeChartsAndShowPopup(){initializeNpkChart(document.getElementById('npkChart'));initializeMoistChart(document.getElementById('moistChart'));initializePhChart(document.getElementById('phChart'));initializeTempChart(document.getElementById('tempChart'));popup.style.display='none'}
function resetCanvas(canvasId){const canvas=document.getElementById(canvasId);const chartInstance=Chart.getChart(canvasId);if(chartInstance){chartInstance.destroy()}
const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);if(canvasId==='npkChart'||canvasId==='npkGauge'){const npkHeader=document.querySelector('.headerNPK .title');npkHeader.innerHTML='';const npkStatus=document.querySelector('.headerNPK .nutrient-status');if(npkStatus){npkStatus.remove()}}else if(canvasId==='moistChart'||canvasId==='moistGauge'){const moistHeader=document.querySelector('.headerMoist .title');moistHeader.innerHTML='';const moistStatus=document.querySelector('.headerMoist .moisture-status');if(moistStatus){moistStatus.remove()}}else if(canvasId==='phChart'||canvasId==='pHGauge'){const phHeader=document.querySelector('.headerpH .title');phHeader.innerHTML='';const phStatus=document.querySelector('.headerpH .ph-status');if(phStatus){phStatus.remove()}}else if(canvasId==='tempChart'||canvasId==='tempGauge'){const tempHeader=document.querySelector('.headerTemp .title');tempHeader.innerHTML='';const tempStatus=document.querySelector('.headerTemp .temp-status');if(tempStatus){tempStatus.remove()}}
if(canvasId==='npkChart'){initializeNpkChart(canvas)}else if(canvasId==='moistChart'){initializeMoistChart(canvas)}else if(canvasId==='phChart'){initializePhChart(canvas)}else if(canvasId==='tempChart'){initializeTempChart(canvas)}else if(canvasId==='npkGauge'){npkGauge=null}else if(canvasId==='moistGauge'){moistGauge=null}else if(canvasId==='pHGauge'){pHGauge=null}else if(canvasId==='tempGauge'){tempGauge=null}
const minMaxContainers=['npkMinMax','moistMinMax','pHMinMax','tempMinMax'];minMaxContainers.forEach(containerId=>{const container=document.getElementById(containerId);if(container)container.remove();})}});function initializeNpkChart(canvas){npkChart=new Chart(canvas,{type:'line',data:{labels:[],datasets:[{label:'NPK',data:[],borderColor:'rgba(255, 99, 132, 1)',backgroundColor:'rgba(255, 99, 132, 0.2)',borderWidth:1,fill:!0}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}],xAxes:[{type:'time',time:{minUnit:'day',displayFormats:{day:'MMM D, YYYY'}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}}})}
function initializeMoistChart(canvas){moistChart=new Chart(canvas,{type:'line',data:{labels:[],datasets:[{label:'Moisture (%)',data:[],borderColor:'rgba(54, 162, 235, 1)',backgroundColor:'rgba(54, 162, 235, 0.2)',borderWidth:1,fill:!0}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}],xAxes:[{type:'time',time:{minUnit:'day',displayFormats:{day:'MMM D, YYYY'}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}}})}
function initializePhChart(canvas){pHChart=new Chart(canvas,{type:'line',data:{labels:[],datasets:[{label:'pH',data:[],borderColor:'rgba(75, 192, 192, 1)',backgroundColor:'rgba(75, 192, 192, 0.2)',borderWidth:1,fill:!0}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}],xAxes:[{type:'time',time:{minUnit:'day',displayFormats:{day:'MMM D, YYYY'}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}}})}
function initializeTempChart(canvas){tempChart=new Chart(canvas,{type:'line',data:{labels:[],datasets:[{label:'Temperature (°c)',data:[],borderColor:'rgba(255, 159, 64, 1)',backgroundColor:'rgba(255, 159, 64, 0.2)',borderWidth:1,fill:!0}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}],xAxes:[{type:'time',time:{minUnit:'day',displayFormats:{day:'MMM D, YYYY'}},ticks:{font:{size:6}}}]},layout:{padding:{top:0}}}})}
function createOrUpdateGaugeCharts(latestNpkValue,latestMoistValue,latestPHValue,latestTempValue){const npkMaxValue=3;const npkThresholds=[0.5,1];const latestNpkRatio=latestNpkValue===null?0:latestNpkValue/300;if(npkGauge){npkGauge.destroy()}
npkGauge=setupGaugeChart("npkGauge","NPK",npkThresholds,latestNpkRatio,0,npkMaxValue,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Insufficient","Adequate","Excess"]});const moistureThresholds=[35,55];if(moistGauge){moistGauge.destroy()}
moistGauge=setupGaugeChart("moistGauge","Moisture (%)",moistureThresholds,latestMoistValue===null?0:latestMoistValue,0,100,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Insufficient","Adequate","Excess"],unit:'%'});const pHThresholds=[4,4.5,6.8,7,7.01,8];if(pHGauge){pHGauge.destroy()}
pHGauge=setupGaugeChart("pHGauge","pH Level",pHThresholds,latestPHValue===null?0:latestPHValue,0,14,{colors:["#BA0F30","#BA0F30","#BA0F30","#18A558","#BA0F30","#BA0F30","#BA0F30"],thresholdLabels:["Very Acidic","Acidic","Slightly Acidic","Neutral","Slightly Alkaline","Alkaline","Very Alkaline"]});const tempThresholds=[20,30];if(tempGauge){tempGauge.destroy()}
tempGauge=setupGaugeChart("tempGauge","Temperature (°c)",tempThresholds,latestTempValue===null?0:latestTempValue,0,50,{colors:["#BA0F30","#18A558","#BA0F30"],thresholdLabels:["Low Temp","Normal Temp","High Temp"],unit:'°c'})}
function calculateMinMax(data){const validData=data.filter(value=>value!==null&&!isNaN(value)&&isFinite(value));if(validData.length===0){return{min:"-",max:"-"}}
return{min:Math.min(...validData),max:Math.max(...validData)}}
function updateLineChart(region_id,depth_id){['npkMinMax','moistMinMax','pHMinMax','tempMinMax'].forEach(id=>{const element=document.getElementById(id);if(element)element.remove();});if(!npkChart||!moistChart||!pHChart||!tempChart){return}
axios.post('https://api-router.enfarm.com/api/v3/charts/retrieve-nutrition-chart-old',{region_id:region_id}).then(function(response){const responseContent=response.data.content;let data;if(responseContent.length===1){data=responseContent[0].values}else if(responseContent.length>depth_id){data=responseContent[depth_id].values}else{console.log(`No data found for regionId: ${region_id} and depthId: ${depth_id}`);return}
const sortedDates=data.created_at.slice().sort((a,b)=>new Date(a)-new Date(b));const sortedIndices=sortedDates.map(date=>data.created_at.indexOf(date));const sortedNpkValues=sortedIndices.map(index=>data.npk[index]);const sortedMoistValues=sortedIndices.map(index=>data.moist[index]);const sortedPHValues=sortedIndices.map(index=>data.pH[index]);const sortedTValues=sortedIndices.map(index=>data.t[index]);function createGradient(ctx,startColor,endColor){const gradient=ctx.createLinearGradient(0,0,0,ctx.canvas.height);gradient.addColorStop(0,startColor);gradient.addColorStop(1,endColor);return gradient}
npkChart.data.labels=sortedDates;npkChart.data.datasets[0].data=sortedNpkValues;npkChart.update();moistChart.data.labels=sortedDates;moistChart.data.datasets[0].data=sortedMoistValues;moistChart.update();pHChart.data.labels=sortedDates;pHChart.data.datasets[0].data=sortedPHValues;pHChart.update();tempChart.data.labels=sortedDates;tempChart.data.datasets[0].data=sortedTValues;tempChart.update();const latestNpkValue=sortedNpkValues[sortedNpkValues.length-1];const previousNpkValue=sortedNpkValues[sortedNpkValues.length-2];const nutrientRatio=latestNpkValue===null?0:latestNpkValue/300;let indicatorNPK='';if(latestNpkValue>previousNpkValue){indicatorNPK='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>'}else if(latestNpkValue<previousNpkValue){indicatorNPK='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>'}
let headerContentNPK=`
    <span class="material-symbols-outlined" style="color: rgba(255, 99, 132, 1);">bubble_chart</span>
    &nbsp;
    <span style="color: rgba(255, 99, 132, 1)">
        ${latestNpkValue === null ? '0.00' : latestNpkValue.toFixed(2)} 
        (${nutrientRatio.toFixed(2)})
    </span>
    &nbsp;
    <span style="color: rgba(255, 99, 132, 1); font-size: 8px;">(latest measure)</span>
`;if(indicatorNPK!==''){headerContentNPK+=`&nbsp;&nbsp;${indicatorNPK}`}
document.querySelector('.headerNPK .title').innerHTML=headerContentNPK;let nutrientStatus='';let nutrientIcon='';let nutrientColor='';if(latestNpkValue===null){nutrientStatus='No data';nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';nutrientColor='#888888'}else{if(nutrientRatio<0.5){nutrientStatus='Insufficient Nutrients';nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';nutrientColor='#BA0F30'}else if(nutrientRatio<=0.75){nutrientStatus='Average Nutrients';nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">check</span>';nutrientColor='#18A558'}else if(nutrientRatio<=1){nutrientStatus='Adequate Nutrients';nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';nutrientColor='#18A558'}else{nutrientStatus='Excess Nutrients';nutrientIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';nutrientColor='#BA0F30'}}
let tooltipContainer=document.getElementById('npk-recommendation-container');if(!tooltipContainer){tooltipContainer=document.createElement('div');tooltipContainer.id='npk-recommendation-container';document.body.appendChild(tooltipContainer)}
tooltipContainer.innerHTML=`
                 <span id="npkreccomendation-tooltip" class="tooltip">
                     <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
                     Recommendations:
                     <p>${getNutrientRecommendation(nutrientStatus)}</p>
                 </span>
             `;const existingNutrientStatus=document.querySelector('.headerNPK .nutrient-status');if(existingNutrientStatus){existingNutrientStatus.remove()}
const nutrientStatusElement=document.createElement('div');nutrientStatusElement.classList.add('nutrient-status');nutrientStatusElement.style.fontSize='10px';nutrientStatusElement.style.color='white';nutrientStatusElement.style.backgroundColor=nutrientColor;nutrientStatusElement.style.borderRadius='20px';nutrientStatusElement.style.padding='4px 5px';nutrientStatusElement.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.2)';const nutrientTextSpan=document.createElement('span');nutrientTextSpan.style.display='flex';nutrientTextSpan.style.alignItems='center';nutrientTextSpan.style.marginTop='-1px';nutrientTextSpan.innerHTML=`${nutrientIcon}&nbsp;${nutrientStatus}`;nutrientStatusElement.appendChild(nutrientTextSpan);const headerNPKSection=document.querySelector('.headerNPK');headerNPKSection.appendChild(nutrientStatusElement);const{min:npkMin,max:npkMax}=calculateMinMax(sortedNpkValues);const npkMinMaxContainer=document.createElement('div');npkMinMaxContainer.id='npkMinMax';npkMinMaxContainer.style.textAlign='right';npkMinMaxContainer.style.marginBottom='5px';npkMinMaxContainer.style.fontSize='12px';npkMinMaxContainer.innerHTML=`
    <span style="color: rgba(255, 99, 132, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${npkMin === "-" ? "-" : npkMin.toFixed(2)} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}
    </span>
`;const npkChartCanvas=document.getElementById('npkChart');npkChartCanvas.parentNode.insertBefore(npkMinMaxContainer,npkChartCanvas);const latestMoistValue=sortedMoistValues[sortedMoistValues.length-1];const previousMoistValue=sortedMoistValues[sortedMoistValues.length-2];let indicatorMoist='';if(latestMoistValue>previousMoistValue){indicatorMoist='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>'}else if(latestMoistValue<previousMoistValue){indicatorMoist='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>'}
let moistureStatus='';let moistureIcon='';let moistureColor='';if(latestMoistValue===null){moistureStatus='No data';moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';moistureColor='#888888'}else{if(latestMoistValue<22.5){moistureStatus='Very dry';moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';moistureColor='#BA0F30'}else if(latestMoistValue<=35){moistureStatus='Lack of water';moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';moistureColor='#BA0F30'}else if(latestMoistValue<=55){moistureStatus='Enough moisture';moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';moistureColor='#18A558'}else{moistureStatus='Excess water';moistureIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';moistureColor='#BA0F30'}}
let moistureTooltipContainer=document.getElementById('moisture-recommendation-container');if(!moistureTooltipContainer){moistureTooltipContainer=document.createElement('div');moistureTooltipContainer.id='moisture-recommendation-container';document.body.appendChild(moistureTooltipContainer)}
moistureTooltipContainer.innerHTML=`
    <span id="moisturerecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        Recommendations:
        <p>${getMoistureRecommendation(moistureStatus)}</p>
    </span>
`;const existingMoistureStatus=document.querySelector('.headerMoist .moisture-status');if(existingMoistureStatus){existingMoistureStatus.remove()}
const moistureStatusElement=document.createElement('div');moistureStatusElement.classList.add('moisture-status');moistureStatusElement.style.fontSize='10px';moistureStatusElement.style.color='white';moistureStatusElement.style.backgroundColor=moistureColor;moistureStatusElement.style.borderRadius='20px';moistureStatusElement.style.padding='4px 5px';moistureStatusElement.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.2)';const moistureTextSpan=document.createElement('span');moistureTextSpan.style.display='flex';moistureTextSpan.style.alignItems='center';moistureTextSpan.style.marginTop='-1px';moistureTextSpan.innerHTML=`${moistureIcon}&nbsp;${moistureStatus}`;moistureStatusElement.appendChild(moistureTextSpan);const headerMoistSection=document.querySelector('.headerMoist');headerMoistSection.appendChild(moistureStatusElement);let headerContentMoist=`
  <span class="material-symbols-outlined" style="color: rgba(54, 162, 235, 1);">humidity_mid</span>
  &nbsp;
  <span style="color: rgba(54, 162, 235, 1)">${latestMoistValue}</span>
  &nbsp;
  <span style="color: rgba(54, 162, 235, 1); font-size: 8px;">(latest measure)</span>
`;if(indicatorMoist!==''){headerContentMoist+=`&nbsp;&nbsp;${indicatorMoist}`}
document.querySelector('.headerMoist .title').innerHTML=headerContentMoist;const{min:moistMin,max:moistMax}=calculateMinMax(sortedMoistValues);const moistMinMaxContainer=document.createElement('div');moistMinMaxContainer.id='moistMinMax';moistMinMaxContainer.style.textAlign='right';moistMinMaxContainer.style.marginBottom='5px';moistMinMaxContainer.style.fontSize='12px';moistMinMaxContainer.innerHTML=`
    <span style="color: rgba(54, 162, 235, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}
    </span>
`;const moistChartCanvas=document.getElementById('moistChart');moistChartCanvas.parentNode.insertBefore(moistMinMaxContainer,moistChartCanvas);const latestPHValue=sortedPHValues[sortedPHValues.length-1];const previousPHValue=sortedPHValues[sortedPHValues.length-2];let indicatorPH='';if(latestPHValue>previousPHValue){indicatorPH='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>'}else if(latestPHValue<previousPHValue){indicatorPH='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>'}
let headerContentPH=`
  <span class="material-symbols-outlined" style="color: rgba(75, 192, 192, 1);">water_ph</span>
  &nbsp;
  <span style="color: rgba(75, 192, 192, 1)">${latestPHValue}</span>
  &nbsp;
  <span style="color: rgba(75, 192, 192, 1); font-size: 8px;">(latest measure)</span>
`;if(indicatorPH!==''){headerContentPH+=`&nbsp;&nbsp;${indicatorPH}`}
document.querySelector('.headerpH .title').innerHTML=headerContentPH;let pHStatus='';let pHIcon='';let pHColor='';if(latestPHValue===null){pHStatus='No data';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';pHColor='#888888'}else{if(latestPHValue===7){pHStatus='Neutral';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';pHColor='#18A558'}else if(latestPHValue<4){pHStatus='Very Acidic';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor='#BA0F30'}else if(latestPHValue>=4&&latestPHValue<=4.5){pHStatus='Acidic';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor='#BA0F30'}else if(latestPHValue>4.5&&latestPHValue<7){pHStatus='Slightly Acidic';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor='#BA0F30'}else if(latestPHValue>7&&latestPHValue<8){pHStatus='Slightly Alkaline';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor='#BA0F30'}else if(latestPHValue===8){pHStatus='Alkaline';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor='#BA0F30'}else if(latestPHValue>8){pHStatus='Very Alkaline';pHIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';pHColor='#BA0F30'}}
let pHTooltipContainer=document.getElementById('ph-recommendation-container');if(!pHTooltipContainer){pHTooltipContainer=document.createElement('div');pHTooltipContainer.id='ph-recommendation-container';document.body.appendChild(pHTooltipContainer)}
pHTooltipContainer.innerHTML=`
    <span id="phrecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        Recommendations:
        <p>${getPHRecommendation(pHStatus)}</p>
    </span>
`;const existingPHStatus=document.querySelector('.headerpH .ph-status');if(existingPHStatus){existingPHStatus.remove()}
const pHStatusElement=document.createElement('div');pHStatusElement.classList.add('ph-status');pHStatusElement.style.fontSize='10px';pHStatusElement.style.color='white';pHStatusElement.style.backgroundColor=pHColor;pHStatusElement.style.borderRadius='20px';pHStatusElement.style.padding='4px 5px';pHStatusElement.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.2)';const pHTextSpan=document.createElement('span');pHTextSpan.style.display='flex';pHTextSpan.style.alignItems='center';pHTextSpan.style.marginTop='-1px';pHTextSpan.innerHTML=`${pHIcon}&nbsp;${pHStatus}`;pHStatusElement.appendChild(pHTextSpan);const headerPHSection=document.querySelector('.headerpH');headerPHSection.appendChild(pHStatusElement);const{min:pHMin,max:pHMax}=calculateMinMax(sortedPHValues);const pHMinMaxContainer=document.createElement('div');pHMinMaxContainer.id='pHMinMax';pHMinMaxContainer.style.textAlign='right';pHMinMaxContainer.style.marginBottom='5px';pHMinMaxContainer.style.fontSize='12px';pHMinMaxContainer.innerHTML=`
    <span style="color: rgba(75, 192, 192, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + " pH"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + " pH"}
    </span>
`;const pHChartCanvas=document.getElementById('phChart');pHChartCanvas.parentNode.insertBefore(pHMinMaxContainer,pHChartCanvas);const latestTempValue=sortedTValues[sortedTValues.length-1];const previousTempValue=sortedTValues[sortedTValues.length-2];let indicatorTemp='';if(latestTempValue>previousTempValue){indicatorTemp='<span class="material-symbols-outlined" style="color: green; font-size: 2rem;">arrow_drop_up</span>'}else if(latestTempValue<previousTempValue){indicatorTemp='<span class="material-symbols-outlined" style="color: red; font-size: 2rem;">arrow_drop_down</span>'}
let headerContentTemp=`
  <span class="material-symbols-outlined" style="color: rgba(255, 159, 64, 1);">device_thermostat</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1)">${latestTempValue}</span>
  &nbsp;
  <span style="color: rgba(255, 159, 64, 1); font-size: 8px;">(latest measure)</span>
`;if(indicatorTemp!==''){headerContentTemp+=`&nbsp;&nbsp;${indicatorTemp}`}
document.querySelector('.headerTemp .title').innerHTML=headerContentTemp;let tempStatus='';let tempIcon='';let tempColor='';if(latestTempValue===null){tempStatus='No data';tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">info</span>';tempColor='#888888'}else{if(latestTempValue>=20&&latestTempValue<=30){tempStatus='Normal Temp';tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">done_all</span>';tempColor='#18A558'}else if(latestTempValue<20||latestTempValue>30){tempStatus=latestTempValue<20?'Low Temp':'High Temp';tempIcon='<span class="material-symbols-outlined" style="color: white; font-size: 1rem; margin-top: 2px;">warning</span>';tempColor='#BA0F30'}}
let tempTooltipContainer=document.getElementById('temp-recommendation-container');if(!tempTooltipContainer){tempTooltipContainer=document.createElement('div');tempTooltipContainer.id='temp-recommendation-container';document.body.appendChild(tempTooltipContainer)}
tempTooltipContainer.innerHTML=`
    <span id="temprecommendation-tooltip" class="tooltip">
        <span class="material-icons-outlined" style="vertical-align: middle;">lightbulb</span>&nbsp;
        Recommendations:
        <p>${getTempRecommendation(tempStatus)}</p>
    </span>
`;const existingTempStatus=document.querySelector('.headerTemp .temp-status');if(existingTempStatus){existingTempStatus.remove()}
const tempStatusElement=document.createElement('div');tempStatusElement.classList.add('temp-status');tempStatusElement.style.fontSize='10px';tempStatusElement.style.color='white';tempStatusElement.style.backgroundColor=tempColor;tempStatusElement.style.borderRadius='20px';tempStatusElement.style.padding='4px 5px';tempStatusElement.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.2)';const tempTextSpan=document.createElement('span');tempTextSpan.style.display='flex';tempTextSpan.style.alignItems='center';tempTextSpan.style.marginTop='-1px';tempTextSpan.innerHTML=`${tempIcon}&nbsp;${tempStatus}`;tempStatusElement.appendChild(tempTextSpan);const headerTempSection=document.querySelector('.headerTemp');headerTempSection.appendChild(tempStatusElement);const{min:tempMin,max:tempMax}=calculateMinMax(sortedTValues);const tempMinMaxContainer=document.createElement('div');tempMinMaxContainer.id='tempMinMax';tempMinMaxContainer.style.textAlign='right';tempMinMaxContainer.style.marginBottom='5px';tempMinMaxContainer.style.fontSize='12px';tempMinMaxContainer.innerHTML=`
    <span style="color: rgba(255, 159, 64, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}
    </span>
`;const tempChartCanvas=document.getElementById('tempChart');tempChartCanvas.parentNode.insertBefore(tempMinMaxContainer,tempChartCanvas);const buttons=document.querySelectorAll('.timeTrend-buttons button');buttons.forEach(button=>{button.addEventListener('click',function(){const timeRange=this.textContent;const endDate=new Date();let startDate;buttons.forEach(btn=>btn.classList.remove('active'));this.classList.add('active');switch(timeRange){case '1D':startDate=new Date(endDate.getTime()-1*24*60*60*1000);break;case '1W':startDate=new Date(endDate.getTime()-7*24*60*60*1000);break;case '2W':startDate=new Date(endDate.getTime()-14*24*60*60*1000);break;case '1M':startDate=new Date(endDate.getFullYear(),endDate.getMonth()-1,endDate.getDate());break;case '3M':startDate=new Date(endDate.getFullYear(),endDate.getMonth()-3,endDate.getDate());break;case '6M':startDate=new Date(endDate.getFullYear(),endDate.getMonth()-6,endDate.getDate());break;case '1Y':startDate=new Date(endDate.getFullYear()-1,endDate.getMonth(),endDate.getDate());break;case '3Y':startDate=new Date(endDate.getFullYear()-3,endDate.getMonth(),endDate.getDate());break;case '5Y':startDate=new Date(endDate.getFullYear()-5,endDate.getMonth(),endDate.getDate());break;default:return}
const filteredDates=sortedDates.filter(date=>new Date(date)>=startDate&&new Date(date)<=endDate);const filteredNpkValues=sortedNpkValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));const filteredMoistValues=sortedMoistValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));const filteredPHValues=sortedPHValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));const filteredTValues=sortedTValues.filter((_,index)=>filteredDates.includes(sortedDates[index]));npkChart.data.labels=filteredDates;npkChart.data.datasets[0].data=filteredNpkValues;npkChart.update();const{min:npkMin,max:npkMax}=calculateMinMax(filteredNpkValues);const npkMinMaxContainer=document.getElementById('npkMinMax');npkMinMaxContainer.innerHTML=`
    <span style="color: rgba(255, 99, 132, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${npkMin === "-" ? "-" : npkMin.toFixed(2)} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${npkMax === "-" ? "-" : npkMax.toFixed(2)}
    </span>
`;moistChart.data.labels=filteredDates;moistChart.data.datasets[0].data=filteredMoistValues;moistChart.update();const{min:moistMin,max:moistMax}=calculateMinMax(filteredMoistValues);const moistMinMaxContainer=document.getElementById('moistMinMax');moistMinMaxContainer.innerHTML=`
                        <span style="color: rgba(54, 162, 235, 1);">
                            <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                            Min: ${moistMin === "-" ? "-" : moistMin.toFixed(2) + "%"} 
                            <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                            Max: ${moistMax === "-" ? "-" : moistMax.toFixed(2) + "%"}
                        </span>
                    `;pHChart.data.labels=filteredDates;pHChart.data.datasets[0].data=filteredPHValues;pHChart.update();const{min:pHMin,max:pHMax}=calculateMinMax(filteredPHValues);const pHMinMaxContainer=document.getElementById('pHMinMax');pHMinMaxContainer.innerHTML=`
                        <span style="color: rgba(75, 192, 192, 1);">
                            <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
                            Min: ${pHMin === "-" ? "-" : pHMin.toFixed(2) + " pH"} 
                            <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
                            Max: ${pHMax === "-" ? "-" : pHMax.toFixed(2) + " pH"}
                        </span>
                    `;tempChart.data.labels=filteredDates;tempChart.data.datasets[0].data=filteredTValues;tempChart.update();const{min:tempMin,max:tempMax}=calculateMinMax(filteredTValues);const tempMinMaxContainer=document.getElementById('tempMinMax');tempMinMaxContainer.innerHTML=`
    <span style="color: rgba(255, 159, 64, 1);">
        <span class="material-symbols-outlined" style="color: #8B0000; font-size: 12px; vertical-align: middle;">arrow_drop_down</span>
        Min: ${tempMin === "-" ? "-" : tempMin.toFixed(2) + "°c"} 
        <span class="material-symbols-outlined" style="color: #006400; font-size: 12px; vertical-align: middle;">arrow_drop_up</span>
        Max: ${tempMax === "-" ? "-" : tempMax.toFixed(2) + "°c"}
    </span>
`})});createOrUpdateGaugeCharts(latestNpkValue,latestMoistValue,latestPHValue,latestTempValue)}).catch(function(error){console.error("Error fetching data: ",error)})}
window.updateLineChart=updateLineChart;function setActiveButton(button){const buttons=document.querySelectorAll('.timeTrend-buttons button');buttons.forEach(btn=>btn.classList.remove('active'));button.classList.add('active')}
function setupGaugeChart(canvasId,title,thresholds,defaultValue,minValue,maxValue,options){const canvas=document.getElementById(canvasId);const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);const data={datasets:[{data:[thresholds[0]-minValue,...thresholds.slice(1).map((t,i)=>t-thresholds[i]),maxValue-thresholds[thresholds.length-1]],backgroundColor:options.colors,needleValue:defaultValue,borderWidth:0,cutout:"85%",circumference:180,rotation:270,}]};const gaugeNeedle={id:"gaugeNeedle",afterDatasetDraw(chart,args,options){const{ctx,chartArea:{top,bottom,left,right,width,height}}=chart;ctx.save();const padding=2;const adjustedLeft=left+padding;const adjustedRight=right-padding;const adjustedWidth=width-2*padding;const needleValue=data.datasets[0].needleValue;const angle=Math.PI+(1/(maxValue-minValue))*(needleValue-minValue)*Math.PI;const cx=adjustedLeft+adjustedWidth/2;const cy=chart._metasets[0].data[0].y+10;ctx.translate(cx,cy);ctx.rotate(angle);ctx.beginPath();ctx.moveTo(0,-2);ctx.lineTo(height/2,0);ctx.lineTo(0,2);ctx.fillStyle="#444";ctx.fill();ctx.translate(-cx,-cy);ctx.beginPath();ctx.arc(cx,cy,5,0,Math.PI*2);ctx.fill();ctx.restore();ctx.font="12px 'Be Vietnam', sans-serif";ctx.fillStyle="#444";ctx.textAlign="center";ctx.fillText(title,cx,cy-83);ctx.font="bold 16px Be Vietnam";const displayValue=chart.options.plugins.gaugeValue===0?"0.00":chart.options.plugins.gaugeValue.toFixed(2);ctx.fillText(`${displayValue}${options.unit || ''}`,cx,cy-20);const radius=height/2+15;ctx.font="8px 'Be Vietnam', sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";let tickValues;if(title==="NPK"){tickValues=[0.5,0.5,1,2]}else if(title==="Moisture (%)"){tickValues=[35,50,75]}else if(title==="pH Level"){tickValues=[2,4,7,10,12]}else if(title==="Temperature (°c)"){tickValues=[10,20,30,40]}
tickValues.forEach(value=>{const angle=Math.PI+((value-minValue)/(maxValue-minValue))*Math.PI;const x=cx+Math.cos(angle)*radius;const y=cy+Math.sin(angle)*radius;const labelRadius=radius-25;const labelX=cx+Math.cos(angle)*labelRadius;const labelY=cy+Math.sin(angle)*labelRadius;ctx.fillText(value.toString()+(options.unit||''),labelX,labelY)});ctx.font="10px 'Be Vietnam', sans-serif";ctx.textAlign="left";ctx.fillText(`${minValue}${options.unit || ''}`,adjustedLeft,bottom-20);ctx.textAlign="right";ctx.fillText(`${maxValue}${options.unit || ''}`,adjustedRight,bottom-20);if(options.thresholdLabels){ctx.font="10px 'Be Vietnam', sans-serif";ctx.textAlign="center";const labelY=bottom+15;const labelCount=options.thresholdLabels.length;options.thresholdLabels.forEach((label,index)=>{const labelX=adjustedLeft+adjustedWidth*(index+0.5)/labelCount;ctx.fillText(label,labelX,labelY)})}}};const config={type:"doughnut",data,options:{responsive:!0,plugins:{legend:{display:!1},tooltip:{enabled:!1},gaugeValue:defaultValue},},plugins:[gaugeNeedle],};return new Chart(document.getElementById(canvasId),config)}
function getNutrientRecommendation(status){switch(status){case "Insufficient Nutrients":return `
            • Test soil pH and adjust if necessary for better nutrient availability<br>
            • Monitor plants closely for signs of deficiency
            • Apply a balanced NPK fertilizer immediately<br>
            • Consider foliar feeding for quick nutrient uptake<br>
            • Increase organic matter in soil through mulching or compost<br>
            `;case "Average Nutrients":return `
            • Maintain current fertilization schedule<br>
            • Apply a light dose of balanced NPK fertilizer<br>
            • Continue regular soil testing to monitor nutrient levels<br>
            • Implement crop rotation or cover crops to improve soil health<br>
            • Use organic mulch to retain moisture and slowly release nutrients
            `;case "Adequate Nutrients":return `
            • Maintain current soil management practices<br>
            • Monitor plant growth and yield to ensure continued optimal nutrition<br>
            • Consider slight reduction in fertilizer application to prevent excess<br>
            • Focus on maintaining soil organic matter through mulching<br>
            • Implement precision farming techniques for efficient nutrient use
            `;case "Excess Nutrients":return `
            • Consider adjusting soil pH to reduce nutrient availability if chronic<br>
            • Monitor for nutrient toxicity symptoms and soil/water pollution<br>
            • Stop fertilizer application immediately<br>
            • Increase irrigation to help leach excess nutrients (carefully to avoid runoff)<br>
            • Plant cover crops or green manures to absorb excess nutrients
            `;case "No data":return `
            • No reccomendations at the moment.
            `;default:return"No specific recommendations available."}}
function getMoistureRecommendation(status){switch(status){case "Very dry":return `
            • Increase irrigation immediately<br>
            • Apply mulch to retain soil moisture<br>
            • Consider installing drip irrigation for efficient water use<br>
            • Use drought-resistant varieties if persistent<br>
            • Monitor plants closely for signs of water stress
            `;case "Lack of water":return `
            • Increase watering frequency<br>
            • Check and adjust irrigation system if necessary<br>
            • Apply organic matter to improve soil water retention<br>
            • Use mulch to reduce evaporation<br>
            • Consider temporary shade for sensitive plants
            `;case "Enough moisture":return `
            • Maintain current irrigation practices<br>
            • Monitor weather forecasts to adjust watering as needed<br>
            • Continue using mulch to retain moisture<br>
            • Ensure proper drainage to prevent waterlogging<br>
            • Regularly check soil moisture to maintain optimal levels
            `;case "Excess water":return `
            • Reduce irrigation immediately<br>
            • Improve soil drainage if necessary<br>
            • Avoid overwatering, especially during rainy periods<br>
            • Check for and fix any leaks in irrigation system<br>
            • Monitor for signs of root rot or fungal diseases
            `;case "No data":return `
            • No recommendations at the moment.
            `;default:return"No specific recommendations available."}}
function getPHRecommendation(status){switch(status){case "Very Acidic":return `
            • Apply lime to raise soil pH<br>
            • Use dolomitic lime if magnesium is also low<br>
            • Avoid using acidifying fertilizers<br>
            • Consider growing acid-loving plants if pH can't be raised<br>
            • Monitor pH regularly and adjust as needed
            `;case "Acidic":return `
            • Apply lime in smaller quantities to gradually raise pH<br>
            • Use organic matter to buffer pH changes<br>
            • Choose plants that tolerate slightly acidic conditions<br>
            • Avoid over-application of nitrogen fertilizers<br>
            • Test soil regularly to track pH changes
            `;case "Slightly Acidic":return `
            • Monitor pH levels closely<br>
            • Use pH-neutral fertilizers<br>
            • Add organic matter to stabilize soil pH<br>
            • Consider minor lime applications if pH continues to drop<br>
            • Choose plants suitable for slightly acidic soils
            `;case "Neutral":return `
            • Maintain current soil management practices<br>
            • Use balanced fertilizers to avoid pH shifts<br>
            • Monitor pH regularly to ensure it stays neutral<br>
            • Add organic matter to improve soil buffering capacity<br>
            • Ideal for most crops - no major adjustments needed
            `;case "Slightly Alkaline":return `
            • Monitor pH levels closely<br>
            • Use acidifying fertilizers if needed<br>
            • Add organic matter to help lower pH gradually<br>
            • Consider adding elemental sulfur in small amounts<br>
            • Choose plants tolerant of slightly alkaline conditions
            `;case "Alkaline":return `
            • Apply elemental sulfur to lower soil pH<br>
            • Use acidifying fertilizers like ammonium sulfate<br>
            • Add organic matter to improve soil structure and pH<br>
            • Consider growing alkaline-tolerant plants<br>
            • Test soil regularly and adjust treatments as needed
            `;case "Very Alkaline":return `
            • Apply larger amounts of elemental sulfur to lower pH<br>
            • Use acid-forming organic materials (e.g., peat moss)<br>
            • Avoid using alkaline water for irrigation if possible<br>
            • Consider raised beds with controlled soil pH for sensitive crops<br>
            • Monitor pH changes closely and adjust strategy as needed
            `;case "No data":return `
            • No recommendations at the moment. Conduct a soil pH test.
            `;default:return"No specific recommendations available."}}
function getTempRecommendation(status){switch(status){case "Normal Temp":return `
            • Maintain current temperature management practices<br>
            • Monitor for any sudden changes in temperature<br>
            • Ensure proper air circulation in the growing area<br>
            • Continue regular plant health checks<br>
            • Adjust watering based on temperature and plant needs
            `;case "Low Temp":return `
            • Protect plants from frost if temperature drops further<br>
            • Use row covers or cold frames for sensitive crops<br>
            • Delay planting of warm-season crops if early in the season<br>
            • Reduce watering frequency to prevent waterlogging<br>
            • Consider using heating systems in greenhouses if applicable
            `;case "High Temp":return `
            • Increase watering frequency to prevent dehydration<br>
            • Provide shade for sensitive plants during peak heat hours<br>
            • Mulch around plants to retain soil moisture and cool roots<br>
            • Avoid fertilizing during extreme heat to prevent stress<br>
            • Monitor for signs of heat stress and adjust care accordingly
            `;case "No data":return `
            • No recommendations at the moment. Check temperature monitoring equipment.
            `;default:return"No specific recommendations available."}}