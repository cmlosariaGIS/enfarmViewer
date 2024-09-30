//const authenticatedUserIDs = [236, 260, 261, 990, 1454];
//const authenticatedUserIDs = [123]; //Farm associated HCCS2- Vườn Sơn, Cư Kuin
//const authenticatedUserIDs = [236]; //Farm associated HCCS2- Vườn Sơn, Cư Kuin
//const authenticatedUserIDs = [260]; //Farm associated: Hà hà, HCCS2- Vườn Sơn, Cư Kuin, HCCS1_anh Hương_Đạt Lý, HTX Công Bằng - Ea Tu, Helena anh Đoàn    
//const authenticatedUserIDs = [261]; //Farm associated: Tinh farm, Wasi Lô 1
//const authenticatedUserIDs = [990]; //Farm associated: TTC_SauRiengLon 


//1800888900
//admin

//0559577901
//"user_name": "Phi Hồ"
//"user_dob": "2003-04-27",
//236
//Farm associated: HCCS2- Vườn Sơn, Cư Kuin and enfarm LABORATORY
//farm_number": 1

//0399043123
//"user_name": null (Đối tác enfarm)
//260
//Farm assocated: Hà hà, HCCS2- Vườn Sơn, Cư Kuin, HCCS1_anh Hương_Đạt Lý, HTX Công Bằng - Ea Tu, Helena anh Đoàn 
//farms: NA

//0399043122
//"user_name": null
//Đối tác enfarm
//261
//Farm assocated: Tinh farm, Wasi Lô 1
//farm_number": 2

//0975405879
//"user_name": null
//990
//Farm assocated: TTC_SauRiengLon
//farm_number": 1

//0905568999
//"user_name": "Nguyễn Thượng Hải"
//"user_mail": "thuonghaibmt@gmail.com"
//"user_dob": "1972-09-10"
//1454
//Farm Associated: Farm sầu riêng Hải (x2)
//farm_number": 1



// authenticated.js




/*
// Function to get the authenticated user ID from storage
function getAuthenticatedUserID() {
    // Try to get the user ID from localStorage
    const userID = localStorage.getItem('userId');

    // If userID exists and is not null, convert it to a number and return it
    if (userID) {
        return parseInt(userID, 10);
    }

    // If no userID is found, return null or a default value
    return null;
}

// Create the authenticatedUserIDs array dynamically
const authenticatedUserIDs = [];
const currentUserID = getAuthenticatedUserID();

if (currentUserID !== null) {
    authenticatedUserIDs.push(currentUserID);
}

// You can now use authenticatedUserIDs in your code
console.log('Authenticated User IDs:', authenticatedUserIDs);

// If you need to check if a user is authenticated elsewhere in your code:
function isUserAuthenticated(userID) {
    return authenticatedUserIDs.includes(userID);
}*/



// authenticated.js

// Admin phone numbers (both formats)
const ADMIN_PHONES = ['1800888900', '1800 888 900'];

// All user IDs for admin view
const ALL_USER_IDs = [236, 260, 261, 990, 1454];
//const ALL_USER_IDs = [236, 260, 261, 990];

// Function to get the authenticated user ID and phone from storage
function getAuthenticatedUserInfo() {
    const userID = localStorage.getItem('userId');
    const userPhone = localStorage.getItem('userPhone');
    const userName = localStorage.getItem('userName');

    return {
        userID: userID,
        userPhone: userPhone,
        userName: userName
    };
}

// Create the authenticatedUserIDs array dynamically
let authenticatedUserIDs = [];
const userInfo = getAuthenticatedUserInfo();

if (ADMIN_PHONES.includes(userInfo.userPhone)) {
    // If it's an admin account, use all user IDs
    authenticatedUserIDs = ALL_USER_IDs;
    // Set the username to 'enfarm Admin' for admin accounts
    localStorage.setItem('userName', 'enfarm Admin');
} else if (userInfo.userID !== null && userInfo.userID !== 'admin') {
    // For regular users, just use their own ID
    authenticatedUserIDs.push(parseInt(userInfo.userID, 10));
}

console.log('Authenticated User IDs:', authenticatedUserIDs);

// Function to check if a user is authenticated
function isUserAuthenticated(userID) {
    return authenticatedUserIDs.includes(userID) || ADMIN_PHONES.includes(userInfo.userPhone);
}

// Function to get the current user's name
function getCurrentUserName() {
    return ADMIN_PHONES.includes(userInfo.userPhone) ? 'enfarm Admin' : userInfo.userName;
}

