L.Control.Rainviewer = L.Control.extend({
    /*options: {
        position: 'bottomleft',
        nextButtonText: '>',
        playStopButtonText: 'Play/Stop',
        prevButtonText: '<',
        positionSliderLabelText: "Hour:",
        opacitySliderLabelText: "Opacity:",
        animationInterval: 500,
        opacity: 0.5
    },*/

    onAdd: function (map) {
        // Initialize variables
        this.timestamps = [];
        this.radarLayers = [];
        this.currentTimestamp;
        this.nextTimestamp;
        this.animationPosition = 0;
        this.animationTimer = false;
        this.rainviewerActive = false;
        this._map = map;

        // Create container for the control
        this.container = L.DomUtil.create('div', 'leaflet-control-rainviewer leaflet-bar leaflet-control');

        // Create button for the control
        this.link = L.DomUtil.create('a', 'leaflet-control-rainviewer-button leaflet-bar-part', this.container);
        this.link.href = '#';
        L.DomEvent.on(this.link, 'click', this.load, this);
        return this.container;
    },

    load: function (map) {

                // Add the text "Real-time Radar Data" when loading RainViewer control
                var realTimeText = L.DomUtil.create('div', 'real-time-text', this.container);
                realTimeText.textContent = getTranslatedText("Real-time Radar Data");
        
                // Style the text
                realTimeText.style.fontSize = '14px'; // Set font size
                //realTimeText.style.fontWeight = 'bold'; // Set font weight
                realTimeText.style.textAlign = 'center'; // Center align text
                realTimeText.style.paddingBottom = '20px'; // Add bottom padding
                realTimeText.style.fontFamily = "'Be Vietnam', sans-serif"; // Apply font family
                realTimeText.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)'; // Add text shadow


        var t = this;
        this.apiRequest = new XMLHttpRequest();
        this.apiRequest.open("GET", "https://api.rainviewer.com/public/weather-maps.json", true);
        
        this.apiRequest.onload = function (e) {
            var response = JSON.parse(t.apiRequest.response);
            
            // Combine past and nowcast data
            t.timestamps = response.radar.past.concat(response.radar.nowcast);
            
            // Sort timestamps
            t.timestamps.sort((a, b) => a.time - b.time);
            
            // Update max value of position slider
            t.positionSlider.max = t.timestamps.length - 1;
            
            console.log(t.timestamps);
            t.showFrame(-1);
        };
    
        this.apiRequest.send();
        
        L.DomUtil.addClass(this.container, 'leaflet-control-rainviewer-active');

        this.controlContainer = L.DomUtil.create('div', 'leaflet-control-rainviewer-container', this.container);

        this.prevButton = L.DomUtil.create('input', 'leaflet-control-rainviewer-prev leaflet-bar-part btn', this.controlContainer);
        this.prevButton.type = "button";
        this.prevButton.value = this.options.prevButtonText;
        L.DomEvent.on(this.prevButton, 'click', t.prev, this);
        L.DomEvent.disableClickPropagation(this.prevButton);

        this.startstopButton = L.DomUtil.create('input', 'leaflet-control-rainviewer-startstop leaflet-bar-part btn', this.controlContainer);
        this.startstopButton.type = "button";
        this.startstopButton.value = this.options.playStopButtonText;
        L.DomEvent.on(this.startstopButton, 'click', t.startstop, this);
        L.DomEvent.disableClickPropagation(this.startstopButton);

        this.nextButton = L.DomUtil.create('input', 'leaflet-control-rainviewer-next leaflet-bar-part btn', this.controlContainer);
        this.nextButton.type = "button";
        this.nextButton.value = this.options.nextButtonText;
        L.DomEvent.on(this.nextButton, 'click', t.next, this);
        L.DomEvent.disableClickPropagation(this.nextButton);

        /* Time adjustment slider */
        this.positionSliderLabel = L.DomUtil.create('label', 'leaflet-control-rainviewer-label leaflet-bar-part', this.controlContainer);
        this.positionSliderLabel.for = "rainviewer-positionslider";
        this.positionSliderLabel.textContent = getTranslatedText("Adjust time:");
        this.positionSlider = L.DomUtil.create('input', 'leaflet-control-rainviewer-positionslider leaflet-bar-part', this.controlContainer);
        this.positionSlider.type = "range";
        this.positionSlider.id = "rainviewer-positionslider";
        this.positionSlider.min = 0;
        this.positionSlider.max = 11;  // This will be updated later
        this.positionSlider.value = this.animationPosition;
        L.DomEvent.on(this.positionSlider, 'input', t.setPosition, this);
        L.DomEvent.disableClickPropagation(this.positionSlider);

        const positionSlider = document.querySelector('.leaflet-control-rainviewer-positionslider');

        // Set initial slider value
        const positionInitialValue = (positionSlider.value - positionSlider.min) / (positionSlider.max - positionSlider.min) * 100;
        positionSlider.style.setProperty('--value', `${positionInitialValue}%`);

        const setPositionValue = () => {
            const val = ((positionSlider.value - positionSlider.min) / (positionSlider.max - positionSlider.min)) * 100;
            positionSlider.style.setProperty('--value', `${val}%`);
        }

        // Call setPositionValue initially to set the green part on map load
        window.addEventListener('load', setPositionValue);

        positionSlider.addEventListener('input', setPositionValue);

        this.closeButton = L.DomUtil.create('div', 'leaflet-control-rainviewer-close', this.container);
        L.DomEvent.on(this.closeButton, 'click', t.unload, this);

        var html = '<div id="timestamp" class="leaflet-control-rainviewer-timestamp"></div>';
        this.controlContainer.insertAdjacentHTML('beforeend', html);

        L.DomEvent.disableClickPropagation(this.controlContainer);

       /* Rain layer opacity */
    this.opacitySliderLabel = L.DomUtil.create('label', 'leaflet-control-rainviewer-label leaflet-bar-part', this.controlContainer);
    this.opacitySliderLabel.for = "rainviewer-opacityslider";
    this.opacitySliderLabel.textContent = getTranslatedText("Adjust layer opacity:");

    this.opacitySlider = L.DomUtil.create('input', 'leaflet-control-rainviewer-opacityslider leaflet-bar-part', this.controlContainer);
    this.opacitySlider.type = "range";
    this.opacitySlider.id = "rainviewer-opacityslider";
    this.opacitySlider.min = 0;
    this.opacitySlider.max = 100;
    this.opacitySlider.value = this.options.opacity * 100;
    L.DomEvent.on(this.opacitySlider, 'input', t.setOpacity, this);
    L.DomEvent.disableClickPropagation(this.opacitySlider);

    const opacitySlider = document.querySelector('.leaflet-control-rainviewer-opacityslider');

    // Set initial slider value
    const opacityInitialValue = (opacitySlider.value - opacitySlider.min) / (opacitySlider.max - opacitySlider.min) * 100;
    opacitySlider.style.setProperty('--value', `${opacityInitialValue}%`);

    const setOpacityValue = () => {
        const val = ((opacitySlider.value - opacitySlider.min) / (opacitySlider.max - opacitySlider.min)) * 100;
        opacitySlider.style.setProperty('--value', `${val}%`);
    }
    opacitySlider.addEventListener('input', setOpacityValue);

    // Add source text below the opacity slider
    this.sourceText = L.DomUtil.create('div', 'leaflet-control-rainviewer-source', this.controlContainer);
    this.sourceText.textContent = getTranslatedText("Source") + ': RainViewer';
    this.sourceText.style.fontSize = '10px';
    this.sourceText.style.textAlign = 'center';
    this.sourceText.style.marginTop = '20px';
    this.sourceText.style.color = '#fffff';
},

    unload: function (e) {
        // Remove the text "Real-time Radar Data" when unloading RainViewer control
        var realTimeText = this.container.querySelector('.real-time-text');
        if (realTimeText) {
            this.container.removeChild(realTimeText);
        }

        // Remove the control container and close button
        L.DomUtil.remove(this.controlContainer);
        L.DomUtil.remove(this.closeButton);
        L.DomUtil.removeClass(this.container, 'leaflet-control-rainviewer-active');

        // Remove radar layers from the map
        var radarLayers = this.radarLayers;
        var map = this._map;
        Object.keys(radarLayers).forEach(function (key) {
            if (map.hasLayer(radarLayers[key])) {
                map.removeLayer(radarLayers[key]);
            }
        });
    },

    addLayer: function (ts) {
        var map = this._map;
        if (!this.radarLayers[ts.time]) {
            var url = this.options.host + ts.path + '/256/{z}/{x}/{y}/2/1_1.png';
            this.radarLayers[ts.time] = new L.TileLayer(url, {
                tileSize: 256,
                opacity: 0.001,
                transparent: true,
                attribution: '<a href="https://rainviewer.com" target="_blank">rainviewer.com</a>',
                zIndex: ts.time
            });
        }
        if (!map.hasLayer(this.radarLayers[ts.time])) {
            map.addLayer(this.radarLayers[ts.time]);
        }
    },

    changeRadarPosition: function (position, preloadOnly) {
        while (position >= this.timestamps.length) {
            position -= this.timestamps.length;
        }
        while (position < 0) {
            position += this.timestamps.length;
        }
    
        this.currentTimestamp = this.timestamps[this.animationPosition];
        this.nextTimestamp = this.timestamps[position];
    
        this.addLayer(this.nextTimestamp);
    
        if (preloadOnly) {
            return;
        }
    
        this.animationPosition = position;
        this.positionSlider.value = position;
    
        // Update the slider's appearance
        this.updatePositionSlider();
    
        if (this.radarLayers[this.currentTimestamp.time]) {
            this.radarLayers[this.currentTimestamp.time].setOpacity(0);
        }
        this.radarLayers[this.nextTimestamp.time].setOpacity(this.options.opacity);
    
        var currentTime = Math.floor(Date.now() / 1000);
        var date = new Date(this.nextTimestamp.time * 1000);
        var formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        var timeDiff = Math.round((this.nextTimestamp.time - currentTime) / 60);
        
        var timeString = formattedTime;
        if (timeDiff > 0) {
            timeString += ' (' + getTranslatedText("Forecast") + ' +' + timeDiff + ' ' + getTranslatedText("min") + ')';
        } else if (timeDiff < 0) {
            timeString += ' (' + getTranslatedText("Past") + ' ' + Math.abs(timeDiff) + ' ' + getTranslatedText("min ago") + ')';
        } else {
            timeString += ' (' + getTranslatedText("Current") + ')';
        }
    
        document.getElementById("timestamp").innerHTML = timeString;
    },

    updatePositionSlider: function() {
        var percentage = (this.animationPosition / (this.timestamps.length - 1)) * 100;
        this.positionSlider.style.background = 'linear-gradient(to right, #00ff00 0%, #00ff00 ' + percentage + '%, #fff ' + percentage + '%, white 100%)';
    },

    /**
     * Check availability and show particular frame position from the this.timestamps list
     */
    showFrame: function (nextPosition) {
        var preloadingDirection = nextPosition - this.animationPosition > 0 ? 1 : -1;

        this.changeRadarPosition(nextPosition);

        // preload next next frame (typically, +1 frame)
        // if don't do that, the animation will be blinking at the first loop
        this.changeRadarPosition(nextPosition + preloadingDirection, true);
    },

    /**
     * Stop the animation
     * Check if the animation timeout is set and clear it.
     */
    setOpacity: function (e) {
        this.options.opacity = e.target.value / 100;
        if (this.radarLayers[this.currentTimestamp.time]) {
            this.radarLayers[this.currentTimestamp.time].setOpacity(this.options.opacity);
        }
    },

    setPosition: function (e) {
        this.showFrame(parseInt(e.target.value));
    },

    stop: function () {
        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = false;
            return true;
        }
        return false;
    },

    play: function () {
        this.showFrame(this.animationPosition + 1);

        // Main animation driver. Run this function every 500 ms
        this.animationTimer = setTimeout(function () { this.play() }.bind(this), this.options.animationInterval);
    },

    playStop: function () {
        if (!this.stop()) {
            this.play();
        }
    },

    prev: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this.stop();
        this.showFrame(this.animationPosition - 1);
        return
    },

    startstop: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this.playStop()

    },

    next: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this.stop();
        this.showFrame(this.animationPosition + 1);
        return
    },

    onRemove: function (map) {
        // Nothing to do here
    }
});

L.control.rainviewer = function (opts) {
    return new L.Control.Rainviewer(opts);
}
