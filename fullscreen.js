function fullscreen(){const fullscreenButton=document.querySelector('.fullscreen-button span.material-symbols-outlined');const tooltip=document.querySelector('.fullscreen-button .tooltip-right');if(!document.fullscreenElement){if(document.documentElement.requestFullscreen){document.documentElement.requestFullscreen();}else if(document.documentElement.mozRequestFullScreen){document.documentElement.mozRequestFullScreen();}else if(document.documentElement.webkitRequestFullscreen){document.documentElement.webkitRequestFullscreen();}else if(document.documentElement.msRequestFullscreen){document.documentElement.msRequestFullscreen();}
fullscreenButton.textContent='fullscreen_exit';tooltip.textContent='Exit full screen';}else{if(document.exitFullscreen){document.exitFullscreen();}else if(document.mozCancelFullScreen){document.mozCancelFullScreen();}else if(document.webkitExitFullscreen){document.webkitExitFullscreen();}else if(document.msExitFullscreen){document.msExitFullscreen();}
fullscreenButton.textContent='fullscreen';tooltip.textContent='Toggle fullscreen';}}
document.getElementById('fullscreenButton').addEventListener('click',fullscreen);