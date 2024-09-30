// Load the Lottie animation
lottie.loadAnimation({
    container: document.getElementById('lottie-container'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/41453d5b-98f5-4478-ae32-24ffb6f5ff63/wN5fPgSl5x.json' // Lottie animation URL
});


//Alert red dot notification circle
function updateNotificationCircle() {
    const needAttentionSum = document.getElementById('needAttentionSum').textContent;
    const notificationCircle = document.querySelector('.notification-circle');

    if (needAttentionSum && needAttentionSum !== '0') {
        notificationCircle.textContent = needAttentionSum;
        notificationCircle.style.display = 'flex';
    } else {
        notificationCircle.style.display = 'none';
    }
}