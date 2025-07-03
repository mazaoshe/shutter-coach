// Main application logic - Converted from React to vanilla JavaScript

// Application state
let appState = {
    selectedScene: 'portrait',
    weather: 'sunny',
    timeOfDay: 'day',
    initialEv: 12,
    ev: 0,
    priorityMode: 'manual',
    cameraSettings: null,
    isLoading: false
};

// DOM elements
let elements = {};

/**
 * Initialize the application
 */
function initApp() {
    // Get DOM elements
    elements = {
        sceneSelector: document.getElementById('scene-selector'),
        weatherInput: document.getElementById('weather-input'),
        timeOfDaySelector: document.getElementById('time-of-day-selector'),
        prioritySelector: document.getElementById('priority-selector'),
        cameraSettings: document.getElementById('camera-settings'),
        shootingTips: document.getElementById('shooting-tips')
    };

    // Initialize components
    updateSceneSelector();
    updateWeatherInput();
    updateTimeOfDaySelector();
    updatePrioritySelector();

    // Set up event listeners
    setupEventListeners();

    // Calculate initial settings
    calculateEV();
    calculateCameraSettings();

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear().toString();
    }

    // Initialize time icon
    updateTimeIcon();

    // Auto-get weather on page load
    getLocationWeather();
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
    // No additional event listeners needed for now
    // All interactions are handled via onclick attributes in HTML
}

/**
 * Handle scene change
 */
function handleSceneChange(scene) {
    appState.selectedScene = scene;
    updateSceneSelector();
    calculateCameraSettings();
}

/**
 * Handle weather change
 */
function handleWeatherChange(weather) {
    appState.weather = weather;
    updateWeatherInput();
    calculateEV();
    calculateCameraSettings();
}

/**
 * Handle time of day change
 */
function handleTimeOfDayChange(timeOfDay) {
    appState.timeOfDay = timeOfDay;
    updateTimeOfDaySelector();
    updateTimeIcon();
    calculateEV();
    calculateCameraSettings();
}

/**
 * Handle priority mode change
 */
function handlePriorityModeChange(mode) {
    appState.priorityMode = mode;
    updatePrioritySelector();
    calculateCameraSettings();
}

/**
 * Calculate EV based on weather and time of day
 */
function calculateEV() {
    let baseEv = appState.initialEv;
    
    // Weather adjustments
    if (appState.weather === 'cloudy') baseEv -= 1;
    else if (appState.weather === 'overcast') baseEv -= 2;
    else if (appState.weather === 'rainy') baseEv -= 3;

    // Time of day adjustments
    if (appState.timeOfDay === 'sunrise' || appState.timeOfDay === 'sunset') baseEv += 0.5;
    else if (appState.timeOfDay === 'night') baseEv -= 2;

    appState.ev = baseEv;
}

/**
 * Calculate camera settings
 */
function calculateCameraSettings() {
    if (window.cameraCalculator && window.cameraCalculator.calculateCameraSettings) {
        const settings = window.cameraCalculator.calculateCameraSettings(
            appState.selectedScene,
            appState.weather,
            appState.timeOfDay,
            appState.ev,
            appState.priorityMode
        );
        
        appState.cameraSettings = settings;
        updateCameraSettings();
        updateShootingTips();
    }
}

/**
 * Update scene selector display
 */
function updateSceneSelector() {
    if (elements.sceneSelector && window.components) {
        elements.sceneSelector.innerHTML = window.components.createSceneSelector(
            appState.selectedScene
        );
    }
}

/**
 * Update weather input display
 */
function updateWeatherInput() {
    if (elements.weatherInput && window.components) {
        elements.weatherInput.innerHTML = window.components.createWeatherInput(
            appState.weather
        );
    }
}

/**
 * Update time of day selector display
 */
function updateTimeOfDaySelector() {
    // Update button states
    const timeButtons = document.querySelectorAll('.time-button');
    timeButtons.forEach(button => {
        const time = button.getAttribute('data-time');
        if (time === appState.timeOfDay) {
            button.className = 'time-button p-3 rounded-xl border-2 transition-all capitalize border-blue-500 bg-blue-50 text-blue-700';
        } else {
            button.className = 'time-button p-3 rounded-xl border-2 transition-all capitalize border-gray-200 bg-white hover:border-gray-300';
        }
    });
}

/**
 * Update time icon based on current time of day
 */
function updateTimeIcon() {
    const timeIcon = document.getElementById('time-icon');
    if (timeIcon) {
        const icons = {
            sunrise: '🌅',
            day: '☀️',
            sunset: '🌇',
            night: '🌙'
        };
        timeIcon.textContent = icons[appState.timeOfDay] || '☀️';
    }
}

/**
 * Update priority selector display
 */
function updatePrioritySelector() {
    if (elements.prioritySelector && window.components) {
        elements.prioritySelector.innerHTML = window.components.createCameraPrioritySelector(
            appState.priorityMode
        );
    }
}

/**
 * Update camera settings display
 */
function updateCameraSettings() {
    if (elements.cameraSettings && window.components && appState.cameraSettings) {
        elements.cameraSettings.innerHTML = window.components.createCameraSettings(
            appState.cameraSettings
        );
    }
}

/**
 * Update shooting tips display
 */
function updateShootingTips() {
    if (elements.shootingTips && window.components && appState.cameraSettings) {
        elements.shootingTips.innerHTML = window.components.createShootingTips(
            appState.selectedScene,
            appState.weather,
            appState.timeOfDay,
            appState.cameraSettings.shutterSpeed,
            appState.cameraSettings.exposureCompensation
        );
    }
}



/**
 * Get weather based on user location
 */
async function getLocationWeather() {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser.');
        return;
    }

    console.log('Getting location for weather...');

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                console.log(`Location: ${latitude}, ${longitude}`);

                if (window.weatherUtils && window.weatherUtils.getBaseEVWithWeather) {
                    const result = await window.weatherUtils.getBaseEVWithWeather(latitude, longitude);
                    console.log('Weather result:', result);

                    // Update app state with weather data
                    appState.weather = result.weather;
                    appState.timeOfDay = result.timeOfDay;
                    appState.initialEv = result.ev;
                    appState.ev = result.ev;

                    // Update UI
                    updateWeatherInput();
                    updateTimeOfDaySelector();
                    updateTimeIcon();
                    calculateCameraSettings();

                    console.log('Weather data updated:', result);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        },
        (error) => {
            console.error('Error getting location:', error);
        }
    );
}

// Make functions available globally for onclick handlers
window.handleSceneChange = handleSceneChange;
window.handleWeatherChange = handleWeatherChange;
window.handleTimeOfDayChange = handleTimeOfDayChange;
window.handlePriorityModeChange = handlePriorityModeChange;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
