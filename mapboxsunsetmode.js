let isSunsetMode = false;

function toggleSunsetEffect() {
    const button = document.querySelector('.sunsetToggle-button');
    const nightButton = document.querySelector('.nightToggle-button');

    // Activate sunset mode
    isSunsetMode = !isSunsetMode;

    if (isSunsetMode) {
        // Disable night mode if active
        if (isNightMode) {
            toggleNightEffect();
        }

        // Add sunset fog effect with more transparent colors
        map.setFog({
            'range': [-1, 2],
            'horizon-blend': 0.3,
            'color': 'rgba(255, 224, 102, 0.5)',  // Light yellow with 50% opacity
            'high-color': 'rgba(255, 165, 0, 0.5)',  // Orange with 50% opacity
            'space-color': 'rgba(255, 99, 71, 0.8)',  // Light orange with 50% opacity
            'star-intensity': 0.1
        });
        button.style.backgroundColor = '#FFD53D'; // Change button background color to #FFD53D
    } else {
        // Remove sunset fog to return to default
        map.setFog(null);
        button.style.backgroundColor = ''; // Revert button background color to default
    }
}
