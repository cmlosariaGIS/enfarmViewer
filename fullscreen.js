// Function Fullscreen
function fullscreen() {
    const fullscreenButton = document.querySelector('.fullscreen-button span.material-symbols-outlined');
    const tooltip = document.querySelector('.fullscreen-button .tooltip-right');

    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
        fullscreenButton.textContent = 'fullscreen_exit';
        tooltip.textContent = 'Exit full screen';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
        fullscreenButton.textContent = 'fullscreen';
        tooltip.textContent = 'Toggle fullscreen';
    }
}

// Add event listener to the Fullscreen button
document.getElementById('fullscreenButton').addEventListener('click', fullscreen);
