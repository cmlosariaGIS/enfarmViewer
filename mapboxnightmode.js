let isNightMode=false;function toggleNightEffect(){const button=document.querySelector('.nightToggle-button');const sunsetButton=document.querySelector('.sunsetToggle-button');isNightMode=!isNightMode;if(isNightMode){if(isSunsetMode){toggleSunsetEffect();}
map.setFog({'range':[-1,2],'horizon-blend':0.3,'color':'#242B4B','high-color':'#161B36','space-color':'#0B1026','star-intensity':0.8});button.style.backgroundColor='#0B1026';button.querySelector('.material-symbols-outlined').style.color='white';}else{map.setFog(null);button.style.backgroundColor='';button.querySelector('.material-symbols-outlined').style.color='';}}