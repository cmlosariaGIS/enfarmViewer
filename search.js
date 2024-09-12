//Integration of search functionality
// Search typing effect
const searchOptions = [
    "Search...",
    "Search by farm name..."
];

const typingDelay = 50; // in milliseconds
const eraseDelay = 25; // in milliseconds
const pauseDelay = 800; // in milliseconds

const searchInput = document.getElementById('searchInput');

function displayTextWithTypingEffect() {
    let index = 0;
    let isDeleting = false;
    let text = '';

    function type() {
        const currentKey = searchOptions[index];
        const currentText = getTranslatedText(currentKey);
        
        if (isDeleting) {
            text = currentText.substring(0, text.length - 1);
        } else {
            text = currentText.substring(0, text.length + 1);
        }

        searchInput.placeholder = text;

        let typingSpeed = typingDelay;
        if (isDeleting) {
            typingSpeed /= 2;
        }

        if (!isDeleting && text === currentText) {
            isDeleting = true;
            typingSpeed = pauseDelay;
        } else if (isDeleting && text === '') {
            isDeleting = false;
            index++;
            if (index === searchOptions.length) {
                // Stop the animation after completing both phrases
                searchInput.placeholder = getTranslatedText("Search...");
                return;
            }
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

displayTextWithTypingEffect();


// Define markers variable as a marker cluster group
const markers = L.markerClusterGroup();

// Function to handle search
function handleSearch() {
    // Get the search term
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    // Fetch the data from the API
    fetch('https://api-ma.enfarm.com/api/v1/ma/get-install-locations', {
        headers: { 'accept': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            // Filter the data based on the search term
            const matchingLocations = data.content.filter(location => {
                return location.farmname.toLowerCase().includes(searchTerm);
            });

            // If locations found, display them on the map
            if (matchingLocations.length > 0) {
                // Clear existing markers
                markers.clearLayers();

                // Add markers for the matching locations
                matchingLocations.forEach(location => {
                    // Randomize image
                    var randomImage = images[Math.floor(Math.random() * images.length)];

                    // Create marker and bind popup
                    var popupContent = `
                        <p>
                        <img src="${randomImage}" alt="Farm Image" style="width:100%; height:auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); border-radius: 5px;">
                        <p>
                        <b>Farm name:</b> ${location.farmname}<br>
                        <b>Region name:</b> ${location.region_name}`;
                    var marker = L.marker([location.lat, location.long], { icon: customIcon })
                        .bindPopup(popupContent);

                    // Add marker to marker cluster group
                    markers.addLayer(marker);
                });

                // Get the bounds of the matching locations
                const bounds = markers.getBounds();

                // Smoothly pan and zoom the map to the bounds
                map.flyToBounds(bounds, {
                    duration: 1, // Duration of the animation in seconds
                    maxZoom: 15, // Maximum zoom level during the animation
                    easeLinearity: 0.5, // Easing function for smooth animation
                    paddingTopLeft: [50, 50], // Padding from the top-left corner of the map
                    paddingBottomRight: [50, 50] // Padding from the bottom-right corner of the map
                });
            } else {
                alert("No locations found");
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to handle search button click
function searchButtonClick() {
    handleSearch();
}

// Function to handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', searchButtonClick);

// Event listener for Enter key press in the search input field
document.getElementById('searchInput').addEventListener('keypress', handleKeyPress);