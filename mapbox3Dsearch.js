// Function to handle search
async function searchFeatures(query) {
    const clearButton = document.querySelector('.clear-button');
    if (query.trim() !== '') {
        clearButton.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
    }

    try {
        // Fetch farm names from the API
        const response = await fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations');
        const data = await response.json();

        // Filter the locations based on the search query
        const filteredLocations = data.content.filter(location => {
            return location.farmname.toLowerCase().includes(query.toLowerCase());
        });

        // Remove existing markers
        markers.forEach(marker => marker.remove());

        if (filteredLocations.length > 0) {
            // Add markers for the filtered locations
            filteredLocations.forEach(location => {
                // Create marker
                const el = document.createElement('div');
                el.className = 'marker';

                // Add marker to the map
                const marker = new mapboxgl.Marker(el)
                    .setLngLat([location.long, location.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(`<b>Farm name:</b> ${location.farmname}<br><b>Region name:</b> ${location.region_name}`))
                    .addTo(map);
                markers.push(marker);
            });

            // Fly to the first matching result
            map.flyTo({
                center: [filteredLocations[0].long, filteredLocations[0].lat],
                zoom: 15 // Adjust zoom level as needed
            });
        } else {
            // Display "No match found" message
            alert("No match found");
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}





// Function to clear search
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.querySelector('.clear-button');
    searchInput.value = '';
    clearButton.style.display = 'none';

    // Remove existing markers
    markers.forEach(marker => marker.remove());

    // Reset markers array
    markers = [];
}
