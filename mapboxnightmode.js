let isNightMode = false;

function toggleNightEffect() {
    const button = document.querySelector('.nightToggle-button');
    const sunsetButton = document.querySelector('.sunsetToggle-button');

    // Activate night mode
    isNightMode = !isNightMode;

    if (isNightMode) {
        // Disable sunset mode if active
        if (isSunsetMode) {
            toggleSunsetEffect();
        }

        // Add fog for nighttime
        map.setFog({
            'range': [-1, 2],
            'horizon-blend': 0.3,
            'color': '#242B4B',
            'high-color': '#161B36',
            'space-color': '#0B1026',
            'star-intensity': 0.8
        });
        button.style.backgroundColor = '#0B1026'; // Change button background color to #0B1026
        button.querySelector('.material-symbols-outlined').style.color = 'white'; // Change icon color to white
    } else {
        // Remove fog for daytime
        map.setFog(null);
        button.style.backgroundColor = ''; // Revert button background color to default
        button.querySelector('.material-symbols-outlined').style.color = ''; // Revert icon color to default
    }
}
