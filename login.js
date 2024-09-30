const ADMIN_PHONES=['1800888900','1800 888 900'];async function loginSuccess(accessToken,userId,userPhone){localStorage.setItem('accessToken',`Bearer ${accessToken}`);localStorage.setItem('userId',userId);localStorage.setItem('userPhone',userPhone);localStorage.setItem('isLoggedIn','true');showMessage(translations[currentLang]['Logged in successfully!']);let userName='';let thumbnailBase64='';let userEmail='';let userDob='';let userGender='';if(ADMIN_PHONES.includes(userPhone)){userName='enfarm Admin';thumbnailBase64='';userEmail='admin@enfarm.com';userDob='';userGender='';}else{try{const[userProfile,userThumbnail]=await Promise.all([getUserProfile(userId),getUserThumbnail(userId)]);console.log('User profile:',userProfile);console.log('User thumbnail:',userThumbnail);if(userProfile.status_code===200&&userProfile.content){userName=userProfile.content.user_name||'';userEmail=userProfile.content.user_mail||'';userDob=userProfile.content.user_dob||'';userGender=userProfile.content.user_gender||'';}
if(userThumbnail.status_code===200&&userThumbnail.content){thumbnailBase64=userThumbnail.content;}
console.log('Thumbnail base64 before showModal:',thumbnailBase64);}catch(error){console.error('Error fetching user data:',error);}}
if(!userName||userName==='null'){userName=translations[currentLang]['User']||'User';}
localStorage.setItem('userName',userName);localStorage.setItem('userThumbnail',thumbnailBase64);localStorage.setItem('userEmail',userEmail);localStorage.setItem('userDob',userDob);localStorage.setItem('userGender',userGender);updateUserProfile(userName,thumbnailBase64);showModal('Logged in successfully!',userId,userName,thumbnailBase64);}
function showModal(messageKey,userId,userName='',thumbnailBase64=''){console.log('Thumbnail base64:',thumbnailBase64);const modal=document.getElementById('modal');const modalMessage=document.getElementById('modal-message');const translatedMessage=translations[currentLang][messageKey]||messageKey;const welcomeMessage=translations[currentLang]['Welcome back']||'Welcome back';let fullMessage='<div id="lottie-container" style="width: 60px; height: 60px; margin: 0 auto;"></div>';fullMessage+=`<div>${translatedMessage}</div>`;fullMessage+=`<div class="welcome-message">${welcomeMessage}</div>`;if(thumbnailBase64&&thumbnailBase64.startsWith('/9j/')){console.log('Adding thumbnail to modal');fullMessage+=`<img src="data:image/jpeg;base64,${thumbnailBase64}" alt="User Thumbnail" style="width: 50px; height: 50px; border-radius: 50%; margin: 10px auto; display: block;">`;}else{console.log('No thumbnail available');fullMessage+=`<img src="images/temp_mascot.jpg" alt="User Thumbnail" style="width: 80px; height: 80px; border-radius: 50%; margin: 10px auto; display: block;">`;}
if(userName){fullMessage+=`<div class="user-name" style="font-size: 20px; margin-top: 10px;">${userName}</div>`;}else{fullMessage+=`<div class="user-name" style="font-size: 20px; margin-top: 10px;">${translations[currentLang]['User'] || 'User'}</div>`;}
modalMessage.innerHTML=fullMessage;const animation=lottie.loadAnimation({container:document.getElementById('lottie-container'),renderer:'svg',loop:true,autoplay:true,path:'https://lottie.host/313c645e-ca52-48b4-acbb-b813f7728d8e/Z2Nev4y7fI.json'});animation.setSpeed(1.5);modal.style.display='block';setTimeout(()=>{modal.classList.add('show');},10);setTimeout(()=>{closeModal();},3000);}
function closeModal(){const modal=document.getElementById('modal');modal.classList.remove('show');setTimeout(()=>{modal.style.display='none';window.location.href='map.html';},300);}
function updateUserProfile(userName='',thumbnailBase64=''){const userAvatar=document.getElementById('userAvatar');const usernameElement=document.getElementById('username');if(userAvatar){if(thumbnailBase64&&thumbnailBase64.startsWith('/9j/')){console.log('Adding thumbnail to user profile');userAvatar.src=`data:image/jpeg;base64,${thumbnailBase64}`;}else{console.log('No thumbnail available, using default image');userAvatar.src='images/temp_mascot.jpg';}}else{console.warn('User avatar element not found');}
if(usernameElement){usernameElement.textContent=userName||translations[currentLang]['User']||'User';}else{console.warn('Username element not found');}}
let currentLang='vi';const PHONE_TEST=['0988515341','0787989900','0399043123','0399058122','0938239553','055957790','0905568999'];const TEST_PHONE_OTP='123456';let currentOTP='';let user=null;const translations={'en':{'Welcome':'Welcome','Login to access the enfarm Enterprise Platform':'Login to access the enfarm Enterprise Platform','Log in':'Log in','Switch Language':'Switch Language','Mobile Number':'Mobile Number','Generate OTP':'Generate OTP','Logged in successfully!':'Logged in successfully!','An error occurred. Please try again later!':'An error occurred. Please try again later!','This phone number is not registered. Please call the hotline to register.':'This phone number is not registered. Please call the hotline to register.','OTP has been sent to phone number':'OTP has been sent to phone number','please confirm OTP to continue!':'please confirm OTP to continue!','Login failed. Please try again.':'Login failed. Please try again.','Incorrect OTP. Please try again.':'Incorrect OTP. Please try again.','Logged in successfully! User ID:':'Logged in successfully! User ID:','Hotline':'Hotline','Call 1800 888 900':'Call 1800 888 900','OTP sent to':'OTP has been sent to phone number','confirm OTP to continue':'please confirm OTP to continue!','Welcome back':'Welcome back','User':'User',},'vi':{'Welcome':'Chào mừng','Login to access the enfarm Enterprise Platform':'Đăng nhập để truy cập vào nền tảng doanh nghiệp enfarm','Log in':'Đăng nhập','Switch Language':'Đổi ngôn ngữ','Mobile Number':'Số điện thoại','Generate OTP':'Gửi mã OTP','Logged in successfully!':'Đăng nhập thành công!','An error occurred. Please try again later!':'Có lỗi xảy ra, vui lòng thử lại sau!','This phone number is not registered. Please call the hotline to register.':'Số điện thoại này chưa được đăng ký. Hãy gọi tới đường dây nóng để đăng ký','OTP has been sent to phone number':'Mã OTP đã được gửi đến số điện thoại','please confirm OTP to continue!':'vui lòng xác nhận OTP để tiếp tục!','Login failed. Please try again.':'Đăng nhập thất bại. Vui lòng thử lại.','Incorrect OTP. Please try again.':'Mã OTP không đúng. Vui lòng thử lại.','Logged in successfully! User ID:':'Đăng nhập thành công! ID người dùng:','Hotline':'Đường dây\nnóng','Call 1800 888 900':'Gọi 1800 888 900','OTP sent to':'Mã OTP đã được gửi đến số điện thoại','confirm OTP to continue':'vui lòng xác nhận OTP để tiếp tục!','Welcome back':'Chào mừng trở lại','User':'Người dùng',}};function loadPage(){const urlParams=new URLSearchParams(window.location.search);const langParam=urlParams.get('lang');if(langParam&&(langParam==='en'||langParam==='vi')){currentLang=langParam;}
translatePageTo(currentLang);}
function toggleLanguage(){currentLang=currentLang==='en'?'vi':'en';translatePageTo(currentLang);const url=new URL(window.location);url.searchParams.set('lang',currentLang);window.history.pushState({},'',url);localStorage.setItem('selectedLanguage',currentLang);}
function translatePageTo(lang){currentLang=lang;const elements=document.querySelectorAll('[data-translate]');const langSwitchButton=document.getElementById('lang-switch');langSwitchButton.innerHTML=lang==='en'?'VN <i class="fa-solid fa-earth-asia"></i>':'EN <i class="fa-solid fa-earth-americas"></i>';elements.forEach(element=>{const key=element.getAttribute('data-translate');if(element.tagName==='INPUT'){element.placeholder=translations[lang][key]||element.placeholder;}else{element.innerText=translations[lang][key]||element.innerText;}});updateDynamicMessages();}
function moveToNext(field,index){if(field.value.length>=field.maxLength){if(index<5){document.getElementsByClassName('otp-box')[index+1].focus();}}}
function handleKeyDown(event,field,index){if(event.key==='Backspace'){event.preventDefault();if(field.value.length>0){field.value='';}else if(index>0){const previousField=document.getElementsByClassName('otp-box')[index-1];previousField.focus();previousField.value='';}}}
async function handleSendOtp(){const phoneNumber=document.getElementById('phone').value;const formattedPhoneNumber=phoneNumber.replace(/\s+/g,'');try{if(formattedPhoneNumber==='1800888900'){user={userId:'admin',accessToken:'admin_token'};sessionStorage.setItem('userId',user.userId);sessionStorage.setItem('userPhone',phoneNumber);console.log('Admin login initiated');currentOTP=TEST_PHONE_OTP;showMessage(`${translations[currentLang]['OTP sent to']} ${phoneNumber}, ${translations[currentLang]['confirm OTP to continue']}`);}else{const res=await getTokenByPhone(phoneNumber);if(res.status_code!==200){showError('An error occurred. Please try again later!');return;}
if(res.content&&res.content.length===0){showError('This phone number is not registered. Please call the hotline to register.');return;}
const userData=res.content[0]??[];user={userId:userData[0],accessToken:userData[1]};sessionStorage.setItem('userId',user.userId);sessionStorage.setItem('userPhone',phoneNumber);console.log('User ID:',user.userId);currentOTP=TEST_PHONE_OTP;showMessage(`${translations[currentLang]['OTP sent to']} ${phoneNumber}, ${translations[currentLang]['confirm OTP to continue']}`);}
document.getElementById('generate-otp').disabled=true;setTimeout(()=>{document.getElementById('generate-otp').disabled=false;},60000);}catch(e){console.log('Error',e);showError('An error occurred. Please try again later!');}}
async function loginWithPhoneNumber(){const phoneNumber=document.getElementById('phone').value;const formattedPhoneNumber=phoneNumber.replace(/\s+/g,'');const otpBoxes=document.getElementsByClassName('otp-box');const otp=Array.from(otpBoxes).map(box=>box.value).join('');try{if(otp===TEST_PHONE_OTP){if(formattedPhoneNumber==='1800888900'){loginSuccess('admin_token','admin',phoneNumber);}else{const res=await getTokenByPhone(phoneNumber);if(res.status_code!==200||(res.content&&res.content.length===0)){showError('Login failed. Please try again.');return;}
const userData=res.content[0]??[];const userId=userData[0];const userToken=userData[1];loginSuccess(userToken,userId,phoneNumber);}}else{showError('Incorrect OTP. Please try again.');}}catch(e){console.log('Error',e);showError('An error occurred. Please try again later!');}}
async function getTokenByPhone(phone){try{const formattedPhone="+84 "+phone.replace(/^0/,'');const response=await fetch('https://api.enfarm.com/user_token_get',{method:'POST',headers:{'Content-Type':'application/json',},body:JSON.stringify({UserMobile:formattedPhone}),});const data=await response.json();return data;}catch(error){console.error('Error calling API:',error);throw error;}}
function showError(messageKey){const errorElement=document.getElementById('error-message');errorElement.textContent=translations[currentLang][messageKey]||messageKey;errorElement.style.color='red';errorElement.dataset.messageKey=messageKey;}
function showMessage(message){const errorElement=document.getElementById('error-message');errorElement.textContent=message;errorElement.style.color='green';errorElement.dataset.messageKey='custom';}
function updateDynamicMessages(){const phoneNumber=document.getElementById('phone').value;const errorMessage=document.getElementById('error-message');if(errorMessage.textContent.includes(translations[currentLang==='en'?'vi':'en']['OTP sent to'])){showMessage(`${translations[currentLang]['OTP sent to']} ${phoneNumber}, ${translations[currentLang]['confirm OTP to continue']}`);}else if(errorMessage.textContent===translations[currentLang==='en'?'vi':'en']['This phone number is not registered. Please call the hotline to register.']){showError('This phone number is not registered. Please call the hotline to register.');}
}
document.addEventListener('DOMContentLoaded',function(){const hotlineIcon=document.getElementById('hotline-icon');const animation=lottie.loadAnimation({container:document.getElementById('lottie-container'),renderer:'svg',loop:true,autoplay:true,path:'https://lottie.host/dec81b00-2f44-49aa-bf4c-83212df6a3bd/EYfMc8te1X.json'});hotlineIcon.addEventListener('click',function(){window.location.href='tel:1800888900';});});async function getUserProfile(userId){try{const response=await fetch('https://api-router.enfarm.com/api/v2/user/get-user-profile',{method:'POST',headers:{'Content-Type':'application/json',},body:JSON.stringify({user_id:userId}),});const data=await response.json();return data;}catch(error){console.error('Error fetching user profile:',error);throw error;}}
async function getUserThumbnail(userId){try{const response=await fetch('https://api-router.enfarm.com/api/v2/user/get-user-thumbnail',{method:'POST',headers:{'Content-Type':'application/json',},body:JSON.stringify({user_id:userId}),});const data=await response.json();console.log('Thumbnail response:',data);return data;}catch(error){console.error('Error fetching user thumbnail:',error);throw error;}}
function updateUserProfile(userName='',thumbnailBase64=''){const userAvatar=document.getElementById('userAvatar');const usernameElement=document.getElementById('username');if(userAvatar){if(thumbnailBase64&&thumbnailBase64.startsWith('/9j/')){console.log('Adding thumbnail to user profile');userAvatar.src=`data:image/jpeg;base64,${thumbnailBase64}`;}else{console.log('No thumbnail available, using default image');userAvatar.src='images/temp_mascot.jpg';}}else{console.warn('User avatar element not found');}
if(usernameElement){usernameElement.textContent=userName||translations[currentLang]['User']||'User';}else{console.warn('Username element not found');}}