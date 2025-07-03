// Component functions - Converted from React to vanilla JavaScript

/**
 * Scene Selector Component
 * @param {string} selectedScene - Currently selected scene
 * @param {function} onSceneChange - Callback for scene change
 * @returns {string} HTML string for scene selector
 */
function createSceneSelector(selectedScene) {
    const scenes = [
        {
            type: 'portrait',
            name: 'Portrait',
            description: 'People, headshots, close-ups',
            emoji: '👤',
            gradient: 'from-pink-400 to-rose-400'
        },
        {
            type: 'landscape',
            name: 'Landscape',
            description: 'Nature, wide vistas, scenery',
            emoji: '🏔️',
            gradient: 'from-green-400 to-emerald-400'
        },
        {
            type: 'street',
            name: 'Street',
            description: 'Urban, candid, documentary',
            emoji: '🏙️',
            gradient: 'from-blue-400 to-cyan-400'
        },
        {
            type: 'night',
            name: 'Night',
            description: 'Low light, city lights, stars',
            emoji: '🌙',
            gradient: 'from-purple-400 to-indigo-400'
        },
        {
            type: 'macro',
            name: 'Macro',
            description: 'Close-up details, flowers, insects',
            emoji: '🔍',
            gradient: 'from-orange-400 to-amber-400'
        },
        {
            type: 'sports',
            name: 'Sports',
            description: 'Action, movement, fast subjects',
            emoji: '⚽',
            gradient: 'from-red-400 to-pink-400'
        }
    ];

    const sceneButtons = scenes.map(scene => {
        const isSelected = selectedScene === scene.type;
        const selectedClasses = isSelected 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-102';
        const gradientOpacity = isSelected ? 'opacity-10' : 'group-hover:opacity-5';

        return `
            <button
                data-scene="${scene.type}"
                class="scene-button relative group p-6 rounded-xl border-2 transition-all duration-300 ${selectedClasses} ${isSelected ? 'selected' : ''}"
                onclick="handleSceneChange('${scene.type}')"
            >
                <div class="gradient-overlay absolute inset-0 bg-gradient-to-br ${scene.gradient} ${gradientOpacity} rounded-xl transition-opacity duration-300"></div>
                <div class="relative z-10 text-center">
                    <div class="text-3xl mb-2">${scene.emoji}</div>
                    <h4 class="font-semibold text-gray-900 mb-1">${scene.name}</h4>
                    <p class="text-sm text-gray-600 leading-tight">${scene.description}</p>
                </div>
            </button>
        `;
    }).join('');

    return `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">${sceneButtons}</div>`;
}

/**
 * Weather Input Component
 * @param {string} weather - Currently selected weather
 * @param {function} onWeatherChange - Callback for weather change
 * @returns {string} HTML string for weather input
 */
function createWeatherInput(weather) {
    const weatherOptions = [
        {
            type: 'sunny',
            name: 'Sunny',
            icon: '☀️',
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-300'
        },
        {
            type: 'cloudy',
            name: 'Cloudy',
            icon: '⛅',
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-300'
        },
        {
            type: 'overcast',
            name: 'Overcast',
            icon: '☁️',
            color: 'text-slate-600',
            bgColor: 'bg-slate-50',
            borderColor: 'border-slate-300'
        },
        {
            type: 'rainy',
            name: 'Rainy',
            icon: '🌧️',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-300'
        }
    ];

    const weatherButtons = weatherOptions.map(option => {
        const isSelected = weather === option.type;
        const selectedClasses = isSelected 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : `border-gray-200 bg-white hover:${option.bgColor} hover:${option.borderColor}`;
        const iconColor = isSelected ? 'text-blue-600' : option.color;

        return `
            <button
                data-weather="${option.type}"
                class="weather-button p-3 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${selectedClasses}"
                onclick="handleWeatherChange('${option.type}')"
            >
                <span class="${iconColor}">${option.icon}</span>
                <span class="font-medium">${option.name}</span>
            </button>
        `;
    }).join('');

    return `<div class="grid grid-cols-2 gap-3">${weatherButtons}</div>`;
}

/**
 * Camera Priority Selector Component
 * @param {string} selectedMode - Currently selected priority mode
 * @param {function} onModeChange - Callback for mode change
 * @returns {string} HTML string for priority selector
 */
function createCameraPrioritySelector(selectedMode) {
    const modes = [
        {
            type: 'shutter',
            name: 'Shutter Priority',
            description: 'Control shutter speed',
            emoji: '⏱️',
            gradient: 'from-blue-400 to-cyan-400'
        },
        {
            type: 'aperture',
            name: 'Aperture Priority',
            description: 'Control depth of field',
            emoji: '📷',
            gradient: 'from-purple-400 to-indigo-400'
        },
        {
            type: 'iso',
            name: 'ISO Priority',
            description: 'Control sensor sensitivity',
            emoji: '⚡',
            gradient: 'from-yellow-400 to-orange-400'
        },
        {
            type: 'manual',
            name: 'Manual Mode',
            description: 'Full control over settings',
            emoji: '🛠️',
            gradient: 'from-gray-400 to-slate-400'
        }
    ];

    const modeButtons = modes.map(mode => {
        const isSelected = selectedMode === mode.type;
        const selectedClasses = isSelected 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-102';
        const gradientOpacity = isSelected ? 'opacity-10' : 'group-hover:opacity-5';

        return `
            <button
                data-mode="${mode.type}"
                class="priority-button relative group p-6 rounded-xl border-2 transition-all duration-300 ${selectedClasses} ${isSelected ? 'selected' : ''}"
                onclick="handlePriorityModeChange('${mode.type}')"
            >
                <div class="gradient-overlay absolute inset-0 bg-gradient-to-br ${mode.gradient} ${gradientOpacity} rounded-xl transition-opacity duration-300"></div>
                <div class="relative z-10 text-center">
                    <div class="text-3xl mb-2">${mode.emoji}</div>
                    <h4 class="font-semibold text-gray-900 mb-1">${mode.name}</h4>
                    <p class="text-sm text-gray-600 leading-tight">${mode.description}</p>
                </div>
            </button>
        `;
    }).join('');

    return `<div class="grid grid-cols-2 gap-4">${modeButtons}</div>`;
}

/**
 * Time of Day Selector Component
 * @param {string} timeOfDay - Currently selected time of day
 * @param {function} onTimeChange - Callback for time change
 * @returns {string} HTML string for time selector
 */
function createTimeOfDaySelector(timeOfDay, onTimeChange) {
    const timeOptions = [
        { type: 'sunrise', name: 'Sunrise', icon: '🌅', color: 'text-orange-600' },
        { type: 'day', name: 'Day', icon: '☀️', color: 'text-yellow-600' },
        { type: 'sunset', name: 'Sunset', icon: '🌇', color: 'text-red-600' },
        { type: 'night', name: 'Night', icon: '🌙', color: 'text-indigo-600' }
    ];

    const timeButtons = timeOptions.map(option => {
        const isSelected = timeOfDay === option.type;
        const selectedClasses = isSelected 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-gray-200 bg-white hover:border-gray-300';
        const iconColor = isSelected ? 'text-blue-600' : option.color;

        return `
            <button
                data-time="${option.type}"
                class="time-button p-3 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${selectedClasses}"
                onclick="handleTimeOfDayChange('${option.type}')"
            >
                <span class="${iconColor}">${option.icon}</span>
                <span class="font-medium">${option.name}</span>
            </button>
        `;
    }).join('');

    return `<div class="grid grid-cols-2 md:grid-cols-4 gap-3">${timeButtons}</div>`;
}

/**
 * Camera Settings Display Component
 * @param {Object} settings - Camera settings object
 * @returns {string} HTML string for camera settings display
 */
function createCameraSettings(settings) {
    const settingItems = [
        {
            label: 'ISO',
            value: settings.iso.toString(),
            description: 'Light sensitivity',
            color: 'bg-red-50 text-red-700 border-red-200'
        },
        {
            label: 'Aperture',
            value: settings.aperture,
            description: 'Depth of field',
            color: 'bg-blue-50 text-blue-700 border-blue-200'
        },
        {
            label: 'Shutter Speed',
            value: settings.shutterSpeed,
            description: 'Motion blur control',
            color: 'bg-green-50 text-green-700 border-green-200'
        },
        {
            label: 'Focus Mode',
            value: settings.focusMode,
            description: 'Auto/Manual focus',
            color: 'bg-purple-50 text-purple-700 border-purple-200'
        },
        {
            label: 'Metering',
            value: settings.meteringMode,
            description: 'Light measurement',
            color: 'bg-orange-50 text-orange-700 border-orange-200'
        }
    ];

    const settingsHTML = settingItems.map(item => `
        <div class="p-4 rounded-xl border-2 ${item.color}">
            <div class="flex justify-between items-center mb-1">
                <span class="font-semibold">${item.label}</span>
                <span class="text-xl font-bold">${item.value}</span>
            </div>
            <p class="text-sm opacity-80">${item.description}</p>
        </div>
    `).join('');

    const exposureCompensationHTML = settings.exposureCompensation ? `
        <div class="mt-4 p-4 bg-amber-50 text-amber-700 border-2 border-amber-200 rounded-xl">
            <div class="flex justify-between items-center mb-1">
                <span class="font-semibold">Exposure Compensation</span>
                <span class="text-xl font-bold">${settings.exposureCompensation}</span>
            </div>
            <p class="text-sm opacity-80">Brightness adjustment</p>
        </div>
    ` : '';

    return `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div class="flex items-center mb-6">
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">Recommended Settings</h3>
            </div>
            <div class="space-y-4">
                ${settingsHTML}
            </div>
            ${exposureCompensationHTML}
        </div>
    `;
}

/**
 * Shooting Tips Component
 * @param {string} scene - Scene type
 * @param {string} weather - Weather condition
 * @param {string} timeOfDay - Time of day
 * @param {string} shutterSpeed - Shutter speed for safety check
 * @param {string} exposureCompensation - Exposure compensation value
 * @returns {string} HTML string for shooting tips
 */
function createShootingTips(scene, weather, timeOfDay, shutterSpeed, exposureCompensation) {
    const tips = [];

    // Scene-specific tips
    switch (scene) {
        case 'portrait':
            tips.push('Use a wide aperture (f/1.4-f/2.8) for shallow depth of field');
            tips.push('Focus on the eyes for sharp portraits');
            if (timeOfDay === 'day') {
                tips.push('Find open shade for even lighting on faces');
            }
            break;
        case 'landscape':
            tips.push('Use a narrow aperture (f/8-f/11) for sharp foreground and background');
            tips.push('Consider using a tripod for stability');
            if (timeOfDay === 'sunrise' || timeOfDay === 'sunset') {
                tips.push('Golden hour provides the most beautiful landscape lighting');
            }
            break;
        case 'street':
            tips.push('Keep your camera ready - street moments happen quickly');
            tips.push('Use continuous autofocus for moving subjects');
            tips.push('Blend in with your surroundings for more natural shots');
            break;
        case 'night':
            tips.push('Use a tripod to prevent camera shake');
            tips.push('Turn off image stabilization when using a tripod');
            tips.push('Use manual focus for better accuracy in low light');
            break;
        case 'macro':
            tips.push('Use manual focus for precise control');
            tips.push('Even small movements affect focus - use a tripod');
            tips.push('More light is often better for macro photography');
            break;
        case 'sports':
            tips.push('Use continuous autofocus and burst mode');
            tips.push('Anticipate the action and pre-focus when possible');
            tips.push('Higher ISO is acceptable for freezing motion');
            break;
    }

    // Weather-specific tips
    if (weather === 'rainy') {
        tips.push('Protect your camera from moisture with a rain cover');
        tips.push('Look for reflections in puddles for creative shots');
    } else if (weather === 'overcast') {
        tips.push('Soft, even lighting is perfect for portraits');
        tips.push('Colors may appear more saturated');
    } else if (weather === 'sunny') {
        tips.push('Watch for harsh shadows - use fill flash if needed');
        tips.push('Golden hour (sunrise/sunset) provides the best light');
    }

    // Time-specific tips
    if (timeOfDay === 'night') {
        tips.push('Use a remote shutter or timer to minimize camera shake');
        tips.push('Consider focus stacking for sharp night landscapes');
    }

    // Safety shutter speed warning
    if (shutterSpeed) {
        const safe = isSafeShutterSpeed(50, shutterSpeed); // assuming 50mm lens
        if (!safe) {
            tips.unshift('⚠️ Shutter speed is too slow. Consider using a tripod or increasing the speed to avoid camera shake');
        }
    }

    // Exposure compensation suggestion
    if (exposureCompensation) {
        tips.unshift(`💡 Consider adjusting exposure compensation to ${exposureCompensation} for more accurate exposure`);
    }

    const limitedTips = tips.slice(0, 4); // Limit to 4 tips for better UI

    const tipsHTML = limitedTips.map((tip, index) => `
        <div class="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div class="w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                ${index + 1}
            </div>
            <p class="text-sm text-gray-700 leading-relaxed">${tip}</p>
        </div>
    `).join('');

    return `
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div class="flex items-center mb-4">
                <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Pro Tips</h3>
            </div>
            <div class="space-y-3">
                ${tipsHTML}
            </div>
        </div>
    `;
}

/**
 * Check if shutter speed is safe for handheld shooting
 * @param {number} focalLength - Focal length of lens
 * @param {string} shutterSpeed - Shutter speed string
 * @returns {boolean} Whether shutter speed is safe
 */
function isSafeShutterSpeed(focalLength, shutterSpeed) {
    function parseShutter(shutter) {
        if (shutter.endsWith('s')) {
            return parseFloat(shutter);
        }
        if (shutter.startsWith('1/')) {
            return 1 / parseFloat(shutter.slice(2));
        }
        return 1 / 60; // fallback
    }

    const shutterValue = parseShutter(shutterSpeed);
    return shutterValue >= 1 / focalLength;
}

// Export functions for global use
window.components = {
    createSceneSelector,
    createWeatherInput,
    createCameraPrioritySelector,
    createTimeOfDaySelector,
    createCameraSettings,
    createShootingTips,
    isSafeShutterSpeed
};
