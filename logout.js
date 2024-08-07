function clearUserData(){localStorage.removeItem('userId');localStorage.removeItem('accessToken');localStorage.removeItem('userPhone');localStorage.removeItem('isLoggedIn');sessionStorage.removeItem('userId');sessionStorage.removeItem('accessToken');sessionStorage.removeItem('userPhone');console.log('User data cleared from storage');}
window.onload=function(){clearUserData();loadPage();};lottie.loadAnimation({container:document.getElementById('lottie-animation'),renderer:'svg',loop:true,autoplay:true,path:'https://lottie.host/5bb5c934-99a8-405b-a946-12cf297c3621/9Gn4KJdO4Z.json'});let currentLang='vi';const translations={'en':{'You\'ve Been Logged Out':'You\'ve Been Logged Out','Thank you for using the enfarm Enterprise Platform':'Thank you for using the enfarm Enterprise Platform','Log In Again':'Log In Again','Switch Language':'Switch Language'},'vi':{'You\'ve Been Logged Out':'Bạn đã đăng xuất','Thank you for using the enfarm Enterprise Platform':'Cảm ơn bạn đã sử dụng nền tảng doanh nghiệp enfarm','Log In Again':'Đăng nhập lại','Switch Language':'Đổi ngôn ngữ'}};function loadPage(){clearUserData();currentLang=localStorage.getItem('selectedLanguage')||'vi';translatePageTo(currentLang);}
function toggleLanguage(){currentLang=currentLang==='en'?'vi':'en';localStorage.setItem('selectedLanguage',currentLang);translatePageTo(currentLang);const url=new URL(window.location);url.searchParams.set('lang',currentLang);window.history.pushState({},'',url);}
function translatePageTo(lang){const elements=document.querySelectorAll('[data-translate]');const langSwitchButton=document.getElementById('lang-switch');langSwitchButton.innerText=lang==='en'?'VN ':'EN ';langSwitchButton.innerHTML+=lang==='en'?'<i class="fa-solid fa-earth-asia"></i>':'<i class="fa-solid fa-earth-americas"></i>';elements.forEach(element=>{const key=element.getAttribute('data-translate');element.innerText=translations[lang][key]||element.innerText;});}
function navigateToLogin(event){event.preventDefault();clearUserData();localStorage.setItem('selectedLanguage',currentLang);window.location.href=`index.html?lang=${currentLang}`;}