// Add a 3D north arrow to the map
class NorthArrowControl {
    onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.className = 'north-arrow';
        this.icon = document.createElement('div');
        this.icon.className = 'north-arrow-icon material-symbols-outlined';
        this.icon.textContent = 'north'; // Using the specified icon
        this.container.appendChild(this.icon);
        // Add the "N" text inside the icon
        const northText = document.createElement('div');
        northText.className = 'north-text';
        northText.textContent = 'N';
        this.icon.appendChild(northText);
        return this.container;
    }

    onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
    }
}

const northArrow = new NorthArrowControl();
map.addControl(northArrow, 'top-right');


const rotateNorthArrow = () => {
    const bearing = map.getBearing();
    document.querySelector('.north-arrow-icon').style.transform = `rotate(${bearing}deg)`;
};

map.on('rotate', rotateNorthArrow);
map.on('move', rotateNorthArrow);
map.on('load', rotateNorthArrow); // Initialize the rotation on load