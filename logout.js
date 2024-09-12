// Function to clear user data from storage
function clearUserData() {
    const itemsToClear = [
        'userId',
        'accessToken',
        'userPhone',
        'isLoggedIn',
        'userEmail',
        'userGender',
        'userDob',
        'userThumbnail',
        'userName',
        'mapboxLat',
        'mapboxLong',
        'selectedLanguage'
    ];

    const mapboxItems = [
        'mapbox.eventData:Y21sb3Nhcmlh',
        'mapbox.eventData.uuid:Y21sb3Nhcmlh1633a095-3955-4c76-a7a0-71bca3ea35c7'
    ];

    // Clear regular items
    itemsToClear.forEach(item => {
        try {
            localStorage.removeItem(item);
            sessionStorage.removeItem(item);
        } catch (error) {
            console.log(`Failed to remove ${item}: ${error.message}`);
        }
    });

    // Clear mapbox items
    mapboxItems.forEach(item => {
        try {
            localStorage.removeItem(item);
        } catch (error) {
            console.log(`Failed to remove ${item}: ${error.message}`);
        }
    });

    // Clear specific items with exact keys
    try {
        localStorage.removeItem('mapbox.eventData:Y21sb3Nhcmlh');
        localStorage.removeItem('mapbox.eventData.uuid:Y21sb3Nhcmlh1633a095-3955-4c76-a7a0-71bca3ea35c7');
    } catch (error) {
        console.log(`Failed to remove specific mapbox items: ${error.message}`);
    }

    console.log('User data cleared from storage');
}

// Call the function when the page loads
window.onload = function () {
    clearUserData();
    loadPage(); // Your existing function to load the page
};

// Rest of your existing code...
lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/5bb5c934-99a8-405b-a946-12cf297c3621/9Gn4KJdO4Z.json'
});

let currentLang = 'vi'; // Set Vietnamese as the initial language

const translations = {
    'en': {
        'You\'ve Been Logged Out': 'You\'ve Been Logged Out',
        'Thank you for using the enfarm Enterprise Platform': 'Thank you for using the enfarm Enterprise Platform',
        'Log In Again': 'Log In Again',
        'Switch Language': 'Switch Language'
    },
    'vi': {
        'You\'ve Been Logged Out': 'Bạn đã đăng xuất',
        'Thank you for using the enfarm Enterprise Platform': 'Cảm ơn bạn đã sử dụng nền tảng doanh nghiệp enfarm',
        'Log In Again': 'Đăng nhập lại',
        'Switch Language': 'Đổi ngôn ngữ'
    }
};

function loadPage() {
    clearUserData(); // Clear user data
    currentLang = localStorage.getItem('selectedLanguage') || 'vi';
    translatePageTo(currentLang); // Translate initial content
}

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    localStorage.setItem('selectedLanguage', currentLang);
    translatePageTo(currentLang);
    // Update the URL with the new language
    const url = new URL(window.location);
    url.searchParams.set('lang', currentLang);
    window.history.pushState({}, '', url);
}

function translatePageTo(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    const langSwitchButton = document.getElementById('lang-switch');

    langSwitchButton.innerText = lang === 'en' ? 'VN ' : 'EN ';
    langSwitchButton.innerHTML += lang === 'en' ? '<i class="fa-solid fa-earth-asia"></i>' : '<i class="fa-solid fa-earth-americas"></i>';

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerText = translations[lang][key] || element.innerText;
    });
}

function navigateToLogin(event) {
    event.preventDefault();
    // Clear any remaining data before redirecting
    clearUserData();
    // Keep the selected language
    localStorage.setItem('selectedLanguage', currentLang);
    window.location.href = `index.html?lang=${currentLang}`;
}