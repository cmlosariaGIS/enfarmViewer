
// Define the user location functionality
function locateUser() {
    map.locate({ setView: true, maxZoom: 16 });

    // Define the pulsing dot
    const size = 50;
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d');
        },

        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            const context = this.context;

            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
            context.fillStyle = `'#007bff'`;
            context.fill();

            context.beginPath();
            context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = '#007bff';
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.fill();
            context.stroke();

            this.data = context.getImageData(0, 0, this.width, this.height).data;
            return true;
        }
    };

    // Initialize pulsing dot
    pulsingDot.onAdd();

    // Create a custom icon for the pulsing dot
    const pulsingDotIcon = L.divIcon({
        className: 'pulsing-dot',
        iconSize: [size, size],
        html: `<canvas id="pulsing-dot-canvas" width="${size}" height="${size}"></canvas>`
    });

    // Create a marker with the custom icon
    var pulsingMarker = L.marker([0, 0], { icon: pulsingDotIcon }).addTo(map);

    map.on('locationfound', function (e) {
        // Update the marker position and fly to user's location
        pulsingMarker.setLatLng(e.latlng);
        map.flyTo(e.latlng, 16);
    });

    // Animation loop
    function animate() {
        if (pulsingDot.render()) {
            const canvas = document.getElementById('pulsing-dot-canvas');
            if (canvas) {
                canvas.getContext('2d').putImageData(new ImageData(pulsingDot.data, size, size), 0, 0);
            }
            requestAnimationFrame(animate);
        }
    }

    animate();
}


