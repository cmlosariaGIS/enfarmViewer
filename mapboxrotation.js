//Function of slow map rotation

let isRotating = false;
let rotationInterval;

function toggleRotation(iconElement) {
    if (!isRotating) {
        startRotation();
        iconElement.innerHTML = '<span class="material-icons-outlined" style="color: white;">stop_circle</span>'; // Change icon to stop when rotation starts
        iconElement.style.backgroundColor = '#FF2768'; // Change button background color to red
    } else {
        stopRotation();
        iconElement.innerHTML = '<span class="material-icons-outlined">play_circle</span>'; // Change icon back to play when rotation stops
        iconElement.style.backgroundColor = '#ffffff'; // Change button background color back to white
    }
}

function startRotation() {
    rotationInterval = setInterval(() => {
        map.easeTo({
            bearing: map.getBearing() + 1,
            duration: 1000,
            easing: t => t
        });
    }, 100);
    isRotating = true;
}

function stopRotation() {
    clearInterval(rotationInterval);
    isRotating = false;
}
