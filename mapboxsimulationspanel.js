
function toggleSimulationPanel() {
    var container = document.querySelector('.simulation-buttons-container');
    var panel = document.querySelector('.simulation-panel');

    if (!container.classList.contains('active')) {
        container.classList.add('active');
        panel.classList.add('active');
    } else {
        container.classList.remove('active');
        panel.classList.remove('active');
    }
}