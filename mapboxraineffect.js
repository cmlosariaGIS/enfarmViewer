// Rain effect code
let isRaining = false;

function toggleRainEffect() {
    isRaining = !isRaining;
    const button = document.querySelector('.weatherToggle-button');
    const icon = button.querySelector('.material-symbols-outlined');
    if (isRaining) {
        startRain();
        button.style.backgroundColor = '#6CC4DC'; // Change button background color to red
        icon.style.color = 'white'; // Change icon color to white
    } else {
        stopRain();
        button.style.backgroundColor = ''; // Revert button background color to default
        icon.style.color = ''; // Revert icon color to default
    }
}

const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
let raindrops = [];

function startRain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    raindrops = createRaindrops(300); // Increase the number of raindrops
    requestAnimationFrame(drawRain);
}

function stopRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raindrops = [];
}

function createRaindrops(count) {
    const raindrops = [];
    for (let i = 0; i < count; i++) {
        raindrops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 30 + 10, // Increase the length of raindrops
            opacity: Math.random() * 0.7 + 0.3, // Increase the opacity range
            speed: Math.random() * 7 + 3, // Increase the speed of raindrops
        });
    }
    return raindrops;
}

function drawRain() {
    if (!isRaining) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(174, 194, 224, 0.5)';
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    raindrops.forEach((raindrop) => {
        ctx.beginPath();
        ctx.moveTo(raindrop.x, raindrop.y);
        ctx.lineTo(raindrop.x, raindrop.y + raindrop.length);
        ctx.stroke();

        raindrop.y += raindrop.speed;

        if (raindrop.y > canvas.height) {
            raindrop.x = Math.random() * canvas.width;
            raindrop.y = -raindrop.length;
        }
    });

    requestAnimationFrame(drawRain);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});