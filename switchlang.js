//switchlang.js

//Vietnamese to English switcher..

window.currentLang = 'vi'; // Start with Vietnamese

window.getTranslatedText = function (key) {
    return translations[currentLang][key] || key;
}

// Language data for translation
const translations = {
    en: {
        "Enterprise Platform": "Enterprise Platform",
        "Switch Language": "Switch Language",
        "Search": "Search",
        "map": "Map",
        "All Farms": "All Farms",
        "farm(s)": "farm(s)",
        "Alert": "Alert",
        "Show farms needing attention": "Show farms needing attention",
        "Durian": "Durian",
        "Show Durian farms": "Show Durian farms",
        "Coffee": "Coffee",
        "Show Coffee farms": "Show Coffee farms",
        "Pepper": "Pepper",
        "Show Pepper farms": "Show Pepper farms",
        "Tea": "Tea",
        "Show Tea farms": "Show Tea farms",
        "Managed Farms": "Managed Farms",
        "Sort": "Sort",
        "Status": "Status",
        "Farm size": "Farm size",
        "Last updated:": "Last updated:",
        "Name": "Name",
        "Produce": "Produce",
        "Fetching farm data...": "Fetching farm data...",
        "See Lists of Managed Farms": "See Lists of Managed Farms",
        'View Profile': 'View Profile',
        "Settings": "Settings",
        "Logout": "Logout",
        "User Profile": "User Profile",
        "About the Application": "About the Application",
        "About": "About",
        "Map application to track and visualize deployed enfarm devices": "Map application to track and visualize deployed enfarm devices",
        "Dismiss": "Dismiss",

        "Home": "Home",
        "Locate User": "Locate User",
        "Toggle fullscreen": "Toggle fullscreen",
        "Toggle Inset Map": "Toggle Inset Map",
        "Show Dashboard": "Show Dashboard",

        //Dashboard
        "Dashboard": "Dashboard",
        "farms": "farms",
        "Land Area (Total)": "Land Area (Total)",
        "enfarm devices deployed": "enfarm devices deployed",
        "farms needing attention": "farms needing attention",
        "Productivity (Total)": "Productivity (Total)",
        "Current Prod.": "Current Prod.",
        "Expected Prod.": "Expected Prod.",
        "Coffee cultivation": "Coffee cultivation",
        "Durian cultivation": "Durian cultivation",
        "Pepper cultivation": "Pepper cultivation",
        "Tea cultivation": "Tea cultivation",
        "Other plants cultivation": "Other plants cultivation",
        "cultivate distribution": "cultivate distribution",

        // Historical Soil Data Line Chart and Guages
        "Current Measure": "Current Measure",
        "Historical Soil Data": "Historical Soil Data",


        // New translations from gaugeslinecharthistoricaldata.js
        "Latest Measure": "Latest Measure",
        "Insufficient Nutrients": "Insufficient Nutrients",
        "Average Nutrients": "Average Nutrients",
        "Adequate Nutrients": "Adequate Nutrients",
        "Excess Nutrients": "Excess Nutrients",

        "Very dry": "Very dry",
        "Lack of water": "Lack of water",
        "Enough moisture": "Enough moisture",
        "Excess water": "Excess water",

        "Neutral": "Neutral",
        "Very Acidic": "Very Acidic",
        "Acidic": "Acidic",
        "Slightly Acidic": "Slightly Acidic",
        "Slightly Alkaline": "Slightly Alkaline",
        "Alkaline": "Alkaline",
        "Very Alkaline": "Very Alkaline",

        "Low Temp": "Low Temp",
        "Average Temp": "Average Temp",
        "High Temp": "High Temp",

        "Min": "Min",
        "Max": "Max",
        "No data": "No data",
        "latest measure": "(latest measure)",

        // Moisture and Temp Legend
        "Moisture (%)": "Moisture (%)",
        "Temperature (°c)": "Temperature (°c)",

        //Tree type doughnut chart in the dashboard
        "Coffee": "Coffee",
        "Durian": "Durian",
        "Pepper": "Pepper",
        "Tea": "Tea",
        "Other Crops": "Other Crops",

        //Alert button
        "Show all": "Show all",
        "Alert": "Alert",
        "Show farms needing attention": "Show farms needing attention",

        //Marker Popup
        "Farm Area": "Farm Area",
        "Tree Type": "Tree Type",
        "Current Productivity": "Current Productivity",
        "Expected Productivity": "Expected Productivity",
        "Coffee": "Coffee",
        "Durian": "Durian",
        "Current Productivity": "Current Productivity",
        "Expected Productivity": "Expected Productivity",

        "Zoom in to Farm": "Zoom in to Farm",
        "Visualize farm in 3D": "Visualize farm in 3D",
        "View soil data": "View soil data",
        "Hide soil data": "Hide soil data",
        "See detailed soil data": "See detailed soil data",

        "In Depth": "In Depth",
        "Show historical soil data": "Show historical soil data",
        "Moisture": "Moisture",
        "Temperature": "Temperature",
        "Last updated": "Last updated",

        "No matching cultivate details found": "No matching cultivate details found",
        "Farm details not found": "Farm details not found",

        "Next": "›",
        "Start/Stop": "Start/Stop",
        "Previous": "‹",
        "Adjust time:": "🕐 Adjust time:",
        "Adjust layer opacity:": "🌧️ Adjust layer opacity:",
        "Real-time Radar Data": "Real-time Radar Data",

        "Forecast": "Forecast",
        "Past": "Past",
        "Current": "Current",
        "min": "min",
        "min ago": "min ago",

        "Source": "Source",

        "Search...": "Search...",
        "Search by farm name...": "Search by farm name...",

        "Sorting": "Sorting",

        //Mapbox
        "Switch to 2D Map View": "Switch to 2D Map View",
        "Switch Basemap": "Switch Basemap",
        "Simulation": "Simulation",
        "Show Instructions": "Show Instructions",

        //Navigation instructions
        "Navigating the 3D Map": "Navigating the 3D Map",
        "Show farm information": "Show farm information",
        "Pan the map": "Pan the map",
        "Zoom the map view": "Zoom the map view",
        "Rotate the map": "Rotate the map",
        "Left mouse button click on a farm point": "Left mouse button click on a farm point",
        "Left mouse button click + drag": "Left mouse button click + drag",
        "Use the mouse scroll wheel": "Use the mouse scroll wheel",
        "Right mouse button click + drag": "Right mouse button click + drag",

        //Simulation
        "Simulation": "Simulation",
        "Simulate": "Simulate",
        "animate": "animate",
        "rain": "rain",
        "night": "night",
        "sunset": "sunset",

        "Elevation": "Elevation",
        "Moist": "Moist",
        "Temp": "Temp",

        //NDT, P205, K20
        "Very Low NDT": "Very Low NDT",
        "Average NDT": "Average NDT",
        "High NDT": "High NDT",

        "Very Low P2O5": "Very Low P2O5",
        "Average P2O5": "Average P2O5",
        "High P2O5": "High P2O5",

        "Very Low K2O": "Very Low K2O",
        "Average K2O": "Average K2O",
        "High K2O": "High K2O",

        "Safe zone": "Safe Zone",
        "Unsafe zone": "Unsafe Zone",

        "Filter by Farmer": "Filter by Farmer",
        "Apply Filter": "Apply Filter",
        "Clear": "Clear",

        "enfarm users, devices information": "enfarm users, devices information",
        "Select a user": "Select a user",
        "Select user": "Select user",
        "User ID": "User ID",
        "See User-Devices Information": "See User-Devices Information",

        "Total Farm(s)": "Total Farm(s)",
        "Total Sensor(s)": "Total Sensor(s)",
        "Total Box(es)": "Total Box(es)",
        "Total Gateway(s)": "Total Gateway(s)",
        "Sensor(s) Installed": "Sensor(s) Installed",
        "Box(es) Installed": "Box(es) Installed",
        "Gateway(s) Installed": "Gateway(s) Installed",
        "User Profile": "User Profile",
        "Name:": "Name:",
        "Phone:": "Phone:",
        "Email:": "Email:",
        "Date of Birth:": "Date of Birth:",
        "Gender:": "Gender:",
        "Male": "Male",
        "Female": "Female",
        "Farm Information": "Farm Information",
        "Farm ID:": "Farm ID:",
        "Address:": "Address:",
        "Area:": "Area:",
        "Tree Types:": "Tree Types:",
        "Productivity": "Productivity",
        "Fertilization Date:": "Fertilization Date:",
        "Last Action Day": "Last Action Day",
        "View on Map": "View on Map",
        "Region and Cultivate Information": "Region and Cultivate Information",
        "Region ID": "Region ID",
        "Cultivate ID": "Cultivate ID",
        "Region Name": "Region Name",
        "Last Update": "Last Update",
        "No region or cultivate information available": "No region or cultivate information available for this farm.",
        "Sensor Information": "Sensor Information",
        "Sensor ID": "Sensor ID",
        "QR": "QR",
        "Region Deployed": "Region Deployed",
        "Depth": "Depth",
        "Activated": "Activated",
        "day": "day",
        "days": "days",
        "week": "week",
        "weeks": "weeks",
        "month": "month",
        "months": "months",
        "year": "year",
        "years": "years",
        "ago": "ago",
        "No sensor information available": "No sensor(s) information available for this farm.",
        
        "Box Information": "Box Information",
        "Box ID": "Box ID",
        "BL Address": "BL Address",
        "No box information available": "No box(es) information available for this farm.",

        "Gateway Information": "Gateway Information",
        "Gateway ID": "Gateway ID",
        "BL Address": "BL Address",
        "No gateway information available": "No gateway(s) information available for this farm.",

        "Growth Stage": "Growth Stage",

        "Sensor(s) Deployed": "Sensor(s) Deployed",
        "Box(es) Deployed": "Box(es) Deployed",
        "Gateway(s) Deployed": "Gateway(s) Deployed",

        "enfarm User Devices Information":  "enfarm User Devices Information",


    },
    vi: {
        "Enterprise Platform": "Nền tảng Doanh nghiệp",
        "Switch Language": "Chuyển đổi ngôn ngữ",
        "Search": "Tìm kiếm",
        "map": "Bản đồ",
        "All Farms": "Tất cả trang trại",
        "farm(s)": "(trang trại)", // Note the leading space here
        "Alert": "Cảnh báo",
        "Show farms needing attention": "Hiển thị các trang trại cần chú ý",
        "Durian": "Sầu riêng",
        "Show Durian farms": "Hiển thị các trang trại sầu riêng",
        "Coffee": "Cà phê",
        "Show Coffee farms": "Hiển thị các trang trại cà phê",
        "Pepper": "Tiêu",
        "Show Pepper farms": "Hiển thị các trang trại tiêu",
        "Tea": "Trà",
        "Show Tea farms": "Hiển thị các trang trại trà",
        "Managed Farms": "Các trang trại đã quản lý",
        "Sort": "Loại",
        "Status": "Trạng thái",
        "Farm size": "Kích thước trang trại",
        "Last updated:": "Cập nhật lần cuối:",
        "Name": "Tên",
        "Produce": "Sản xuất",
        "Fetching farm data...": "Đang lấy dữ liệu trang trại...",
        "See Lists of Managed Farms": "Xem danh sách các trang trại đã quản lý",
        'View Profile': 'Xem hồ sơ',
        "Settings": "Cài đặt",
        "Logout": "Đăng xuất",
        "User Profile": "Thông tin người dùng",
        "About the Application": "Thông tin ứng dụng",
        "About": "Giới thiệu",
        "Map application to track and visualize deployed enfarm devices": "Ứng dụng bản đồ để theo dõi và hiển thị các thiết bị enfarm đã triển khai",
        "Dismiss": "Đóng",

        "Home": "Trang chủ",
        "Locate User": "Định vị người dùng",
        "Toggle fullscreen": "Chuyển đổi toàn màn hình",
        "Toggle Inset Map": "Chuyển đổi bản đồ lồng ghép",

        //Dashboard
        "Show Dashboard": "Hiển thị bảng điều khiển",
        "Dashboard": "Bảng điều khiển",
        "farms": "trang trại",
        "Land Area (Total)": "Diện tích đất (Tổng cộng)",
        "enfarm devices deployed": "thiết bị enfarm đã triển khai",
        "farms needing attention": "trang trại cần chú ý",
        "Productivity (Total)": "Năng suất (Tổng cộng)",
        "Current Prod.": "Năng suất hiện tại",
        "Expected Prod.": "Năng suất dự kiến",
        "Coffee cultivation": "Trồng cà phê",
        "Durian cultivation": "Trồng sầu riêng",
        "Pepper cultivation": "Trồng tiêu",
        "Tea cultivation": "Trồng trà",
        "Other plants cultivation": "Trồng cây khác",
        "cultivate distribution": "phân phối canh tác",

        // Historical Soil Data Line Chart and Guages
        "Current Measure": "Đo hiện tại",
        "Historical Soil Data": "Dữ liệu đất lịch sử",

        // New translations from gaugeslinecharthistoricaldata.js
        "Latest Measure": "Đo mới nhất",
        "Insufficient Nutrients": "Thiếu dinh dưỡng",
        "Average Nutrients": "Dinh dưỡng trung bình",
        "Adequate Nutrients": "Dinh dưỡng đủ",
        "Excess Nutrients": "Dư dinh dưỡng",

        "Very dry": "Rất khô",
        "Lack of water": "Thiếu nước",
        "Enough moisture": "Độ ẩm đủ",
        "Excess water": "Dư nước",

        "Neutral": "Trung tính",
        "Very Acidic": "Rất axit",
        "Acidic": "Axit",
        "Slightly Acidic": "Hơi axit",
        "Slightly Alkaline": "Hơi kiềm",
        "Alkaline": "Kiềm",
        "Very Alkaline": "Rất kiềm",

        "Low Temp": "Nhiệt độ thấp",
        "Average Temp": "Nhiệt độ trung bình",
        "High Temp": "Nhiệt độ cao",

        "Min": "Tối thiểu",
        "Max": "Tối đa",
        "No data": "Không có dữ liệu",
        "latest measure": "(đo lường mới nhất)",

        // Moisture and Temp Legend
        "Moisture (%)": "Độ ẩm (%)",
        "Temperature (°c)": "Nhiệt độ (°c)",

        //Tree type doughnut chart in the dashboard
        "Coffee": "Cà phê",
        "Durian": "Sầu riêng",
        "Pepper": "Tiêu",
        "Tea": "Trà",
        "Other Crops": "Các loại cây trồng khác",

        //Alert button
        "Show all": "Hiển thị tất cả",
        "Alert": "Cảnh báo",
        "Show farms needing attention": "Hiển thị các trang trại cần chú ý",

        //Marker Popup
        "Farm Area": "Khu nông trại",
        "Tree Type": "Loại cây",
        "Current Productivity": "Năng suất hiện tại",
        "Expected Productivity": "Năng suất dự kiến",
        "Coffee": "Cà phê",
        "Durian": "Sầu riêng",
        "Current Productivity": "Năng suất hiện tại",
        "Expected Productivity": "Năng suất dự kiến",

        "Zoom in to Farm": "Thu phóng đến trang trại",
        "Visualize farm in 3D": "Hiển thị nông trại trong 3D",
        "View soil data": "Xem dữ liệu đất",
        "Hide soil data": "Ẩn dữ liệu đất",
        "See detailed soil data": "Xem dữ liệu đất chi tiết",

        "In Depth": "Chiều sâu",
        "Show historical soil data": "Xem dữ liệu lịch sử đất",
        "Moisture": "Độ ẩm",
        "Temperature": "Nhiệt độ",
        "Last updated": "Cập nhật mới nhất",

        "No matching cultivate details found": "Không tìm thấy chi tiết canh tác phù hợp",
        "Farm details not found": "Không tìm thấy thông tin trang trại",

        "Next": "›",
        "Start/Stop": "Bắt đầu/Dừng",
        "Previous": "‹",
        "Adjust time:": "🕐 Điều chỉnh thời gian:",
        "Adjust layer opacity:": "🌧️ Điều chỉnh độ mờ của lớp:",
        "Real-time Radar Data": "Dữ liệu Radar Thời gian thực",
        "Forecast": "Dự báo",
        "Past": "Quá khứ",
        "Current": "Hiện tại",
        "min": "phút",
        "min ago": "phút trước",
        "Source": "Nguồn",

        "Search...": "Tìm kiếm...",
        "Search by farm name...": "Tìm kiếm theo tên trang trại...",

        "Sorting": "Đang sắp xếp",

        //Mapbox
        "Switch to 2D Map View": "Chuyển sang chế độ xem bản đồ 2D",
        "Switch Basemap": "Chuyển đổi bản đồ cơ sở",
        "Simulation": "Mô phỏng",
        "Show Instructions": "Hiển thị hướng dẫn",

        //Navigation instructions
        "Navigating the 3D Map": "Điều hướng bản đồ 3D",
        "Show farm information": "Hiển thị thông tin nông trại",
        "Pan the map": "Di chuyển bản đồ",
        "Zoom the map view": "Thu phóng bản đồ",
        "Rotate the map": "Xoay bản đồ",
        "Left mouse button click on a farm point": "Nhấp chuột trái vào một điểm nông trại",
        "Left mouse button click + drag": "Nhấp chuột trái + kéo",
        "Use the mouse scroll wheel": "Sử dụng bánh xe lăn chuột",
        "Right mouse button click + drag": "Nhấp chuột phải + kéo",

        //Simulation
        "Simulation": "Mô phỏng",
        "Simulate": "Mô phỏng",
        "animate": "hoạt hình",
        "rain": "mưa",
        "night": "đêm",
        "sunset": "hoàng hôn",

        "Elevation": "Độ cao",
        "Moist": "Độ ẩm",
        "Temp": "Nhiệt độ",

        //NDT, P205, K20
        "Very Low NDT": "NDT Nghèo",
        "Average NDT": "NDT Trung bình",
        "High NDT": "NDT Cao",

        "Very Low P2O5": "P2O5 Nghèo",
        "Average P2O5": "P2O5 Trung bình",
        "High P2O5": "P2O5 Cao",

        "Very Low K2O": "K2O Nghèo",
        "Average K2O": "K2O Trung bình",
        "High K2O": "K2O Cao",

        "Safe zone": "Vùng an toàn",
        "Unsafe zone": "Vùng không an toàn",

        "Filter by Farmer": "Lọc theo Nông dân",
        "Apply Filter": "Áp dụng Bộ lọc",
        "Clear": "Xóa",

        "enfarm users, devices information": "Thông tin người dùng, thiết bị enfarm",
        "Select a user": "Chọn người dùng",
        "Select user": "Chọn người dùng",
        "User ID": "ID Người dùng",
        "See User-Devices Information": "Xem thông tin thiết bị người dùng",

        "Total Farm(s)": "Tổng số Trang trại",
        "Total Sensor(s)": "Tổng số Cảm biến",
        "Total Box(es)": "Tổng số Hộp",
        "Total Gateway(s)": "Tổng số Gateway",
        "Sensor(s) Installed": "Cảm biến đã lắp đặt",
        "Box(es) Installed": "Hộp đã lắp đặt",
        "Gateway(s) Installed": "Cổng đã được cài đặt",
        "User Profile": "Hồ sơ Người dùng",
        "Name:": "Tên:",
        "Phone:": "Điện thoại:",
        "Email:": "Email:",
        "Date of Birth:": "Ngày sinh:",
        "Gender:": "Giới tính",
        "Male": "Nam",
        "Female": "Nữ",
        "Farm Information": "Thông tin Trang trại",
        "Farm ID:": "ID Trang trại:",
        "Address:": "Địa chỉ:",
        "Area:": "Diện tích:",
        "Tree Types:": "Loại cây:",
        "Productivity:": "Năng suất:",
        "Fertilization Date:": "Ngày bón phân:",
        "Last Action Day:": "Ngày hoạt động cuối cùng:",
        "View on Map": "Xem trên Bản đồ",
        "Region and Cultivate Information": "Thông tin Vùng và Canh tác",
        "Region ID": "ID Vùng",
        "Cultivate ID": "ID Canh tác",
        "Region Name": "Tên Vùng",
        "Last Update": "Cập nhật lần cuối",
        "No region or cultivate information available": "Không có thông tin vùng hoặc canh tác cho trang trại này.",
        "Sensor Information": "Thông tin Cảm biến",
        "Sensor ID": "ID Cảm biến",
        "QR": "QR",
        "Region Deployed": "Khu vực triển khai",
        "Depth": "Độ sâu",
        "Activated": "Đã kích hoạt",
        "day": "ngày",
        "days": "ngày",
        "week": "tuần",
        "weeks": "tuần",
        "month": "tháng",
        "months": "tháng",
        "year": "năm",
        "years": "năm",
        "ago": "trước",
        "No sensor information available": "Không có thông tin cảm biến nào cho trang trại này.",

        "Box Information": "Thông tin Hộp",
        "Box ID": "ID Hộp",
        "BL Address": "Địa chỉ BL",
        "No box information available": "Không có thông tin hộp nào cho trang trại này.",

        "Gateway Information": "Thông tin cổng thông tin",
        "Gateway ID": "ID cổng",
        "BL Address": "Địa chỉ BL",
        "No gateway information available": "Không có thông tin cổng thông tin nào có sẵn cho trang trại này.",


        "Growth Stage": "Giai Đoạn",


        "Sensor(s) Deployed": "Cảm biến được triển khai",        
        "Box(es) Deployed": "Hộp được triển khai",
        "Gateway(s) Deployed": "Cổng đã triển khai",

        "enfarm User Devices Information":  "Thông tin thiết bị người dùng enfarm",

    }
};

//English by defualt on map load
/*
let currentLang = 'en';

function toggleLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    const pepperButton = document.querySelector('.pepperFarms-filter');
    const langSwitchButton = document.getElementById('lang-switch');

    currentLang = currentLang === 'en' ? 'vi' : 'en';
    langSwitchButton.innerText = currentLang === 'en' ? 'VN ' : 'EN ';
    langSwitchButton.innerHTML += currentLang === 'en' ? '<i class="fa-solid fa-earth-asia"></i>' : '<i class="fa-solid fa-earth-americas"></i>';

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerText = translations[currentLang][key] || element.innerText;
    });

    // Adjust Pepper button position based on language
    if (currentLang === 'vi') {
        pepperButton.style.right = '408px'; // Adjust the value as needed
    } else {
        pepperButton.style.right = '390px'; // Original position
    }
}
*/

// Check for stored language preference, default to Vietnamese if not set
let currentLang = localStorage.getItem('selectedLanguage') || 'vi';

document.addEventListener('DOMContentLoaded', function () {
    translateAllElements();

    // Update the language switch button to reflect the current language
    const langSwitchButton = document.getElementById('lang-switch');
    if (langSwitchButton) {
        langSwitchButton.innerText = currentLang === 'vi' ? 'EN ' : 'VN ';
        langSwitchButton.innerHTML += currentLang === 'vi' ? '<i class="fa-solid fa-earth-americas"></i>' : '<i class="fa-solid fa-earth-asia"></i>';
    }
});

// Make translateAllElements globally accessible
window.translateAllElements = function () {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (element.classList.contains('tree-type')) {
            element.textContent = getTranslatedText(key);
        } else {
            element.textContent = translations[currentLang][key] || element.textContent;
        }
    });
    // Adjust Pepper button position for Vietnamese
    const pepperButton = document.querySelector('.pepperFarms-filter');
    if (pepperButton) {
        pepperButton.style.right = currentLang === 'vi' ? '408px' : '390px';
    }

    // Update language switch button
    const langSwitchButton = document.getElementById('lang-switch');
    if (langSwitchButton) {
        langSwitchButton.innerText = currentLang === 'vi' ? 'EN ' : 'VN ';
        langSwitchButton.innerHTML += currentLang === 'vi' ? '<i class="fa-solid fa-earth-americas"></i>' : '<i class="fa-solid fa-earth-asia"></i>';
    }

    // Log the current language
    //console.log(`Current language: ${currentLang === 'en' ? 'English' : 'Vietnamese'}`);

    // Additional updates that might be necessary
    updateDynamicContent();
    updateChartsLanguage();
    updateRecommendationTooltips();

    // Dispatch a custom event for language change
    const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
    window.dispatchEvent(event);

    // Translate tree types
    document.querySelectorAll('.tree-type[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslatedText(key);
    });
}



function toggleLanguage() {
    const elements = document.querySelectorAll('[data-translate]');
    const pepperButton = document.querySelector('.pepperFarms-filter');
    const langSwitchButton = document.getElementById('lang-switch');

    currentLang = currentLang === 'vi' ? 'en' : 'vi';

    // Log the current language to the console
    console.log(`Current language: ${currentLang === 'en' ? 'English' : 'Vietnamese'}`);

    langSwitchButton.innerText = currentLang === 'vi' ? 'EN ' : 'VN ';
    langSwitchButton.innerHTML += currentLang === 'vi' ? '<i class="fa-solid fa-earth-americas"></i>' : '<i class="fa-solid fa-earth-asia"></i>';

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.innerText = translations[currentLang][key] || element.innerText;
    });

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (element.classList.contains('tree-type')) {
            element.textContent = getTranslatedText(key);
        } else {
            element.textContent = translations[currentLang][key] || element.textContent;
        }
    });

    // Adjust Pepper button position based on language
    if (currentLang === 'vi') {
        pepperButton.style.right = '408px'; // Adjust the value as needed
    } else {
        pepperButton.style.right = '390px'; // Original position
    }

    // Refresh the farm data
    const selectedUserId = document.getElementById('userSelect').value;
    if (selectedUserId) {
        getFarmData(selectedUserId);
    }

    // Update all leaflet popups, including closed ones
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            const popup = layer.getPopup();
            if (popup) {
                const content = popup.getContent();
                if (content && typeof content === 'string') {
                    const updatedContent = updatePopupContent(content);
                    popup.setContent(updatedContent);
                    if (layer.isPopupOpen()) {
                        popup.update();
                    }
                }
            }
        }
    });

    // Update all popups leaflet, including filtered ones
    if (currentFilteredMarkers) {
        currentFilteredMarkers.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                const popup = layer.getPopup();
                if (popup) {
                    const content = popup.getContent();
                    if (content && typeof content === 'string') {
                        const updatedContent = updatePopupContent(content);
                        popup.setContent(updatedContent);
                        if (layer.isPopupOpen()) {
                            popup.update();
                        }
                    }
                }
            }
        });
    }

    // Dispatch a custom event for language change
    const event = new CustomEvent('languageChanged', { detail: { language: currentLang } });
    window.dispatchEvent(event);

    // Update Mapbox GL JS popups
    if (typeof mapboxgl !== 'undefined' && mapboxMap instanceof mapboxgl.Map) {
        console.log('Updating Mapbox popups');
        updateAllPopups();
    }

    // Update search placeholder with new language
    displayTextWithTypingEffect();

    // Updates the moisture and temp chart legend language
    updateChartsLanguage();

    // Update doughnut chart tree type language
    updateChartLanguage();

    // Update any other dynamic content that might not have data-translate attributes
    updateDynamicContent();

    updateNutrientStatus();
    updateMoistureStatus();
    updatePHStatus();
    updateTempStatus();
    updateNdtStatus();
    updateP205Status();
    updatek2oStatus();

    updateRecommendationHeaders();

    // Update recommendation tooltips
    updateRecommendationTooltips();

    //Leaflet marker popup
    updateOpenPopup();

    // Update Reinviewer text
    updateRainViewerTexts();

    // Update RainViewer
    if (rainviewer) {
        rainviewer.options.positionSliderLabelText = getTranslatedText("Adjust time:");
        rainviewer.options.opacitySliderLabelText = getTranslatedText("Adjust layer opacity:");
        rainviewer.options.playStopButtonText = getTranslatedText("Start/Stop");

        if (rainviewer.rainviewerActive) {
            updateRainViewerTexts();
        }

        // Force Rain Viewer to reload its elements
        rainviewer.unload();
    }

    // Update localStorage
    localStorage.setItem('selectedLanguage', currentLang);

    // Translate tree types again to ensure they're updated
    document.querySelectorAll('.tree-type[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslatedText(key);
    });
}

// Add this function to get translated text
window.getTranslatedText = function (key) {
    return translations[window.currentLang][key] || key;
}

//update leaflet marker popup
function updatePopupContent(content) {
    if (typeof content !== 'string') return content;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const elementsToTranslate = tempDiv.querySelectorAll('[data-translate]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslatedText(key);
    });

    // Handle the "No matching cultivate details found" case
    const noCultivateDetails = tempDiv.querySelector('.no-cultivate-details');
    if (noCultivateDetails) {
        noCultivateDetails.innerHTML = `<i data-translate="No matching cultivate details found">${getTranslatedText("No matching cultivate details found")}</i>`;
    }

    // Handle the "Farm details not found" case
    const noFarmDetails = tempDiv.querySelector('.no-farm-details');
    if (noFarmDetails) {
        noFarmDetails.innerHTML = `<i data-translate="Farm details not found">${getTranslatedText("Farm details not found")}</i>`;
    }

    return tempDiv.innerHTML;
}


// Alert Button language translation
function updateDynamicContent() {
    // Update the needs attention button text
    const showAllSpan = document.querySelector('.needs-attention span[data-translate="Show all"]');
    if (showAllSpan) {
        showAllSpan.textContent = translations[currentLang]["Show all"];
    }

    const alertSpan = document.querySelector('.needs-attention .attention-text');
    if (alertSpan) {
        alertSpan.textContent = translations[currentLang]["Alert"];
    }

    const tooltipSpan = document.querySelector('.needs-attention .tooltip-bottom');
    if (tooltipSpan) {
        tooltipSpan.textContent = translations[currentLang]["Show farms needing attention"];
    }
}

function updateChartsLanguage() {
    const newMoistureLabel = currentLang === 'vi' ? "Độ ẩm (%)" : "Moisture (%)";
    const newTemperatureLabel = currentLang === 'vi' ? "Nhiệt độ (°C)" : "Temperature (°C)";

    if (typeof moistChart !== 'undefined' && moistChart !== null) {
        moistChart.data.datasets[0].label = newMoistureLabel;
        moistChart.update();
    }

    if (typeof tempChart !== 'undefined' && tempChart !== null) {
        tempChart.data.datasets[0].label = newTemperatureLabel;
        tempChart.update();
    }

    // Update tree type chart if it exists
    if (typeof treeTypeChart !== 'undefined' && treeTypeChart !== null) {
        updateChartLanguage();
    }
}


function getTranslatedLabels() {
    return [
        translations[currentLang]["Coffee"],
        translations[currentLang]["Durian"],
        translations[currentLang]["Pepper"],
        translations[currentLang]["Tea"],
        translations[currentLang]["Other Crops"]
    ];
}

//Dougnut Chart Tree Type
function updateChartLanguage() {
    if (treeTypeChart) {
        const newLabels = getTranslatedLabels();
        treeTypeChart.data.labels = newLabels;
        treeTypeChart.options.plugins.legend.labels.generateLabels = function (chart) {
            return newLabels.map((label, i) => ({
                text: label,
                fillStyle: chart.data.datasets[0].backgroundColor[i],
                hidden: false,
                index: i
            }));
        };
        treeTypeChart.update();
    }
}





/*
function updateRecommendationTooltips() {
    const tooltipContainers = [
        'npk-recommendation-container',
        'moisture-recommendation-container',
        'ph-recommendation-container',
        'temp-recommendation-container'
    ];

    tooltipContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            const tooltipContent = container.querySelector('p');
            if (tooltipContent) {
                const status = getStatusFromContainer(containerId);
                console.log(`Status for ${containerId}:`, status);
                const recommendations = getRecommendationFunction(containerId)(status);
                console.log(`Recommendations for ${containerId}:`, recommendations);
                console.log(`Current language:`, currentLang);
                tooltipContent.innerHTML = recommendations[currentLang];
            } else {
                console.log(`Tooltip content not found for ${containerId}`);
            }
        } else {
            console.log(`Container not found: ${containerId}`);
        }
    });
}*/


function updateRecommendationTooltips() {
    //console.log("NPK status element:", document.querySelector('.nutrient-status'));
    const tooltipContainers = [
        'npk-recommendation-container',
        'moisture-recommendation-container',
        'ph-recommendation-container',
        'temp-recommendation-container',
        'ndt-recommendation-container',
        'p205-recommendation-container',
        'k2o-recommendation-container'
    ];

    tooltipContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            const tooltipContent = container.querySelector('p');
            if (tooltipContent) {
                const status = getStatusFromContainer(containerId);
                console.log(`Status for ${containerId}:`, status);
                console.log(`Status element:`, document.querySelector(`.${containerId.replace('-recommendation-container', '')}-status`));
                const recommendations = getRecommendationFunction(containerId)(status);
                console.log(`Recommendations for ${containerId}:`, recommendations);
                console.log(`Current language:`, currentLang);
                tooltipContent.innerHTML = recommendations[currentLang];
            } else {
                console.log(`Tooltip content not found for ${containerId}`);
            }
        } else {
            console.log(`Container not found: ${containerId}`);
        }
    });
}


/*
function getStatusFromContainer(containerId) {
    const statusElement = document.querySelector(`.${containerId.replace('-recommendation-container', '')}-status`);
    if (statusElement) {
        const statusSpan = statusElement.querySelector('span[data-translate]');
        if (statusSpan) {
            const key = statusSpan.getAttribute('data-translate');
            console.log(`Status key for ${containerId}:`, key);
            return key;
        }
        return statusElement.textContent.trim();
    }
    return 'No data';
}*/

function getStatusFromContainer(containerId) {
    let statusClass = containerId.replace('-recommendation-container', '-status');
    if (containerId === 'npk-recommendation-container') {
        statusClass = 'nutrient-status';
    }
    const statusElement = document.querySelector(`.${statusClass}`);
    console.log(`Searching for: .${statusClass}`);
    console.log("Status element found:", statusElement);
    if (statusElement) {
        const statusSpan = statusElement.querySelector('span[data-translate]');
        console.log("Status span found:", statusSpan);
        if (statusSpan) {
            return statusSpan.getAttribute('data-translate');
        }
        return statusElement.textContent.trim();
    }
    return 'No data';
}

function getRecommendationFunction(containerId) {
    switch (containerId) {
        case 'npk-recommendation-container':
            return getNutrientRecommendation;
        case 'moisture-recommendation-container':
            return getMoistureRecommendation;
        case 'ph-recommendation-container':
            return getPHRecommendation;
        case 'temp-recommendation-container':
            return getTempRecommendation;
        case 'ndt-recommendation-container':
            return getNdtRecommendation;
        case 'p205-recommendation-container':
            return getP205Recommendation;
        case 'k2o-recommendation-container':
            return getk2oRecommendation;
        default:
            return () => ({ en: "", vi: "" });
    }
}







function updateRecommendationHeaders() {
    const headers = document.querySelectorAll('.recommendation-header');
    headers.forEach(header => {
        header.textContent = currentLang === 'en' ? 'Recommendations:' : 'Khuyến nghị:';
    });
}

function updateNutrientStatus() {
    const nutrientStatusElement = document.querySelector('.nutrient-status span[data-translate]');
    if (nutrientStatusElement) {
        const key = nutrientStatusElement.getAttribute('data-translate');
        nutrientStatusElement.textContent = getTranslatedText(key);
    }
}

function updateMoistureStatus() {
    const moistureStatusElement = document.querySelector('.moisture-status span[data-translate]');
    if (moistureStatusElement) {
        const key = moistureStatusElement.getAttribute('data-translate');
        moistureStatusElement.textContent = getTranslatedText(key);
    }
}

function updatePHStatus() {
    const phStatusElement = document.querySelector('.ph-status span[data-translate]');
    if (phStatusElement) {
        const key = phStatusElement.getAttribute('data-translate');
        phStatusElement.textContent = getTranslatedText(key);
    }
}

function updateTempStatus() {
    const tempStatusElement = document.querySelector('.temp-status span[data-translate]');
    if (tempStatusElement) {
        const key = tempStatusElement.getAttribute('data-translate');
        tempStatusElement.textContent = getTranslatedText(key);
    }
}


function updateNdtStatus() {
    const ndtStatusElement = document.querySelector('.ndt-status span[data-translate]');
    if (ndtStatusElement) {
        const key = ndtStatusElement.getAttribute('data-translate');
        ndtStatusElement.textContent = getTranslatedText(key);
    }
}

function updateP205Status() {
    const p205StatusElement = document.querySelector('.p205-status span[data-translate]');
    if (p205StatusElement) {
        const key = p205StatusElement.getAttribute('data-translate');
        p205StatusElement.textContent = getTranslatedText(key);
    }
}

function updatek2oStatus() {
    const k2oStatusElement = document.querySelector('.k2o-status span[data-translate]');
    if (k2oStatusElement) {
        const key = k2oStatusElement.getAttribute('data-translate');
        k2oStatusElement.textContent = getTranslatedText(key);
    }
}







function updateRainViewerTexts() {
    //console.log("Updating Rain Viewer texts. Current language:", currentLang);
    if (rainviewer && rainviewer._container) {
        const elements = {
            playStopButton: rainviewer._container.querySelector('.leaflet-control-rainviewer-startstop'),
            positionLabel: rainviewer._container.querySelector('.leaflet-control-rainviewer-label[for="rainviewer-positionslider"]'),
            opacityLabel: rainviewer._container.querySelector('.leaflet-control-rainviewer-label[for="rainviewer-opacityslider"]'),
            realTimeText: rainviewer._container.querySelector('.real-time-text'),
            timestampElement: rainviewer._container.querySelector('#timestamp')
        };

        if (elements.playStopButton) {
            elements.playStopButton.value = getTranslatedText("Start/Stop");
        }

        if (elements.positionLabel) {
            elements.positionLabel.textContent = getTranslatedText("Adjust time:");
        }

        if (elements.opacityLabel) {
            elements.opacityLabel.textContent = getTranslatedText("Adjust layer opacity:");
        }

        if (elements.realTimeText) {
            elements.realTimeText.textContent = getTranslatedText("Real-time Radar Data");
        }

        if (elements.timestampElement) {
            const currentText = elements.timestampElement.textContent;
            const updatedText = currentText
                .replace(/Forecast/g, getTranslatedText("Forecast"))
                .replace(/Past/g, getTranslatedText("Past"))
                .replace(/\bmin\b/g, getTranslatedText("min"))
                .replace(/ago/g, getTranslatedText("min ago").replace('min ', ''));
            elements.timestampElement.textContent = updatedText;
        }
    }
}