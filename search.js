const searchOptions=["Search...","Search by farm name..."];const typingDelay=50;const eraseDelay=25;const pauseDelay=800;const searchInput=document.getElementById('searchInput');function displayTextWithTypingEffect(){let index=0;let isDeleting=false;let text='';function type(){const currentKey=searchOptions[index];const currentText=getTranslatedText(currentKey);if(isDeleting){text=currentText.substring(0,text.length-1);}else{text=currentText.substring(0,text.length+1);}
searchInput.placeholder=text;let typingSpeed=typingDelay;if(isDeleting){typingSpeed/=2;}
if(!isDeleting&&text===currentText){isDeleting=true;typingSpeed=pauseDelay;}else if(isDeleting&&text===''){isDeleting=false;index++;if(index===searchOptions.length){searchInput.placeholder=getTranslatedText("Search...");return;}}
setTimeout(type,typingSpeed);}
type();}
displayTextWithTypingEffect();const markers=L.markerClusterGroup();function handleSearch(){const searchTerm=document.getElementById('searchInput').value.toLowerCase().trim();fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations',{headers:{'accept':'application/json'}}).then(response=>response.json()).then(data=>{const matchingLocations=data.content.filter(location=>{return location.farmname.toLowerCase().includes(searchTerm);});if(matchingLocations.length>0){markers.clearLayers();matchingLocations.forEach(location=>{var randomImage=images[Math.floor(Math.random()*images.length)];var popupContent=`
                        <p>
                        <img src="${randomImage}" alt="Farm Image" style="width:100%; height:auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 5px;">
                        <p>
                        <b>Farm name:</b> ${location.farmname}<br>
                        <b>Region name:</b> ${location.region_name}`;var marker=L.marker([location.lat,location.long],{icon:customIcon}).bindPopup(popupContent);markers.addLayer(marker);});const bounds=markers.getBounds();map.flyToBounds(bounds,{duration:1,maxZoom:15,easeLinearity:0.5,paddingTopLeft:[50,50],paddingBottomRight:[50,50]});}else{alert("No locations found");}}).catch(error=>console.error('Error fetching data:',error));}
function searchButtonClick(){handleSearch();}
function handleKeyPress(event){if(event.key==='Enter'){handleSearch();}}
document.getElementById('searchButton').addEventListener('click',searchButtonClick);document.getElementById('searchInput').addEventListener('keypress',handleKeyPress);