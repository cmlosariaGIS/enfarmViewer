// search.js

// API endpoints for fetching user farms and all locations
const API_ENDPOINTS = {
    USER_FARMS: 'https://api-router.enfarm.com/api/v3/farm/total-farms-per-user',
    ALL_LOCATIONS: 'https://api-ma.enfarm.com/api/v1/ma/get-install-locations'
};

// Configuration settings for search behavior
const CONFIG = {
    MAX_SUGGESTIONS: 5,
    TYPING_DELAY: 50,
    ERASE_DELAY: 25,
    PAUSE_DELAY: 800
};

// Search placeholder options for typing effect
const SEARCH_OPTIONS = [
    "Search...",
    "Search by farm name..."
];

// Global variables to store farm and location data
let userFarms = [];
let allLocations = [];
let suggestionsContainer;
const searchInput = document.getElementById('searchInput');

// Generic function to fetch data from API
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.status_code === 200) {
            return data.content;
        }
        throw new Error('Unexpected API response');
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        return null;
    }
}

// Fetch farms for the authenticated user(s)
async function fetchUserFarms() {
    const userIDsRaw = localStorage.getItem('userId');
    if (!userIDsRaw) {
        console.error('User ID(s) not found in localStorage');
        return;
    }

    // Parse user IDs from localStorage
    let userIDs;
    try {
        userIDs = JSON.parse(userIDsRaw);
    } catch (e) {
        userIDs = userIDsRaw.split(',').map(id => id.trim());
    }

    const userIDArray = Array.isArray(userIDs) ? userIDs : [userIDs];

    // Fetch farms based on user role (admin or regular user)
    userFarms = userIDArray.includes('admin') ? await fetchAllUserFarms() : await fetchFarmsForUsers(userIDArray);
}

// Fetch farms for all users (admin functionality)
async function fetchAllUserFarms() {
    console.log('Fetching farms for all users (admin functionality)');
    const allUserIDs = [236, 260, 261, 990, 1454];  // Replace with actual user IDs or API call
    return await fetchFarmsForUsers(allUserIDs);
}

// Fetch farms for a list of user IDs
async function fetchFarmsForUsers(userIDs) {
    const validUserIDs = userIDs.filter(id => !isNaN(parseInt(id)));
    const promises = validUserIDs.map(async userID => {
        const options = {
            method: 'POST',
            headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: parseInt(userID) })
        };
        
        try {
            const response = await fetch(API_ENDPOINTS.USER_FARMS, options);
            const responseData = await response.json();
            
            if (response.ok && responseData.status_code === 200 && responseData.content && responseData.content.data) {
                return responseData.content.data;
            } else {
                console.error(`Error fetching farms for user ID ${userID}:`, responseData);
                return [];
            }
        } catch (error) {
            console.error(`Error fetching farms for user ID ${userID}:`, error);
            return [];
        }
    });

    // Wait for all promises to resolve and flatten the results
    const results = await Promise.all(promises);
    return results.flat();
}

// Fetch all locations to get coordinates
async function fetchAllLocations() {
    allLocations = await fetchData(API_ENDPOINTS.ALL_LOCATIONS) || [];
}

// Combine farm data with coordinates
function combineFarmData() {
    const locationMap = new Map(allLocations.map(loc => [loc.farmid, loc]));
    userFarms = userFarms.map(farm => {
        const location = locationMap.get(farm.farm_id);
        return location ? { ...farm, lat: location.lat, long: location.long } : farm;
    });
}

// Initialize the search functionality
async function initializeSearch() {
    await Promise.all([fetchUserFarms(), fetchAllLocations()]);
    combineFarmData();
    createSuggestionsContainer();
    setupEventListeners();
    displayTextWithTypingEffect();
}

// Create and append the suggestions container to the DOM
function createSuggestionsContainer() {
    suggestionsContainer = document.createElement('div');
    suggestionsContainer.id = 'suggestionsContainer';
    const searchBarContainer = document.querySelector('.search-bar-container');
    if (searchBarContainer) {
        searchBarContainer.appendChild(suggestionsContainer);
    } else {
        console.error("Could not find .search-bar-container");
    }
}

// Set up all necessary event listeners for search functionality
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', debounce(showSuggestions, 300));
        searchInput.addEventListener('keypress', handleKeyPress);
    } else {
        console.error("Search input element not found");
    }

    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    } else {
        console.error("Search button not found");
    }

    if (suggestionsContainer) {
        suggestionsContainer.addEventListener('click', handleSuggestionClick);
    }

    document.addEventListener('click', hideSuggestionsOnOutsideClick);
}

// Hide suggestions when clicking outside the search area
function hideSuggestionsOnOutsideClick(e) {
    if (suggestionsContainer && searchInput && e.target !== searchInput && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.style.display = 'none';
    }
}

// Debounce function to limit the rate of function calls
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Display suggestions as the user types in the search input
function showSuggestions() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const matchingSuggestions = userFarms
        .filter(farm => farm.farm_name.toLowerCase().includes(searchTerm))
        .slice(0, CONFIG.MAX_SUGGESTIONS)
        .map(farm => farm.farm_name);

    suggestionsContainer.innerHTML = matchingSuggestions.length > 0
        ? matchingSuggestions.map(suggestion => `
            <div class="suggestion">
                <span class="material-symbols-outlined">psychiatry</span>
                <span>${suggestion}</span>
            </div>
        `).join('')
        : `<div class="suggestion no-result">
            <span class="material-symbols-outlined">error_outline</span>
            <span>No result</span>
        </div>`;

    suggestionsContainer.style.display = 'block';
}

// Handle the click event on a suggestion item
function handleSuggestionClick(e) {
    const suggestionElement = e.target.closest('.suggestion');
    if (!suggestionElement || suggestionElement.classList.contains('no-result')) return;

    const selectedFarmName = suggestionElement.querySelector('span:last-child').textContent;
    searchInput.value = selectedFarmName;
    suggestionsContainer.style.display = 'none';

    const selectedFarm = userFarms.find(farm => farm.farm_name === selectedFarmName);
    if (selectedFarm) {
        document.dispatchEvent(new CustomEvent('farmSelected', {
            detail: selectedFarm,
            bubbles: true,
            composed: true
        }));

        if (selectedFarm.lat && selectedFarm.long) {
            zoomToMarker(selectedFarm.lat, selectedFarm.long);
        }
    }
}

// Handle the search action (triggered by search button or Enter key)
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const matchingFarms = userFarms.filter(farm =>
        farm.farm_name.toLowerCase().includes(searchTerm)
    );

    if (matchingFarms.length > 0) {
        document.dispatchEvent(new CustomEvent('farmsFound', { detail: matchingFarms }));
        if (matchingFarms.length === 1 && matchingFarms[0].lat && matchingFarms[0].long) {
            zoomToMarker(matchingFarms[0].lat, matchingFarms[0].long);
        }
    } else {
        alert("No farms found matching your search. Please try a different name.");
    }
}

// Handle key press events in the search input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        suggestionsContainer.style.display = 'none';
        handleSearch();
    }
}

// Display animated placeholder text in the search input
function displayTextWithTypingEffect() {
    let index = 0;
    let isDeleting = false;
    let text = '';

    function type() {
        const currentKey = SEARCH_OPTIONS[index];
        const currentText = getTranslatedText(currentKey);

        text = isDeleting
            ? currentText.substring(0, text.length - 1)
            : currentText.substring(0, text.length + 1);

        searchInput.placeholder = text;

        let typingSpeed = isDeleting ? CONFIG.ERASE_DELAY : CONFIG.TYPING_DELAY;

        if (!isDeleting && text === currentText) {
            isDeleting = true;
            typingSpeed = CONFIG.PAUSE_DELAY;
        } else if (isDeleting && text === '') {
            isDeleting = false;
            index = (index + 1) % SEARCH_OPTIONS.length;
            if (index === 0) {
                searchInput.placeholder = getTranslatedText("Search...");
                return;
            }
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// Initialize the search functionality when the script loads
initializeSearch();