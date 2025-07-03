// Camera Calculator - Converted from TypeScript to JavaScript
// Types are handled through JSDoc comments for better IDE support

/**
 * @typedef {'portrait' | 'landscape' | 'street' | 'night' | 'macro' | 'sports'} SceneType
 * @typedef {'sunny' | 'cloudy' | 'overcast' | 'rainy'} WeatherCondition
 * @typedef {'sunrise' | 'day' | 'sunset' | 'night'} TimeOfDay
 * @typedef {'shutter' | 'aperture' | 'iso' | 'manual'} CameraPriorityMode
 */

/**
 * @typedef {Object} CameraSettings
 * @property {number} iso
 * @property {string} aperture
 * @property {string} shutterSpeed
 * @property {string} [exposureCompensation]
 * @property {string} focusMode
 * @property {string} meteringMode
 */

// 曝光补偿规则表（可扩展）
const EXPOSURE_COMPENSATION_RULES = {
    sunny: { day: undefined, sunrise: '+0.3', sunset: '+0.7' },
    cloudy: { day: '+0.3', sunrise: '+0.7', sunset: '+1.0' },
    overcast: { day: '+0.7', sunrise: '+1.0', sunset: '+1.3' },
    rainy: { day: '+0.3', night: '+1.0' }
};

// 场景设置表 - 基于实际摄影实践
const SCENE_SETTINGS = {
    portrait: {
        preferredApertures: [1.4, 1.8, 2.0, 2.8, 4.0],
        baseAperture: 2.8,
        baseISO: 100,
        minShutterSpeed: '1/60',  // 人像最低安全快门
        preferredShutterSpeeds: ['1/125', '1/160', '1/200', '1/250'],
        maxISO: 3200,
        focusMode: 'Single AF',
        meteringMode: 'Center-weighted',
        description: 'Wide aperture for shallow depth of field'
    },
    landscape: {
        preferredApertures: [8, 11, 16],
        baseAperture: 11,
        baseISO: 100,
        minShutterSpeed: '1/60',
        preferredShutterSpeeds: ['1/60', '1/125', '1/250'],
        maxISO: 800,  // 风景摄影通常使用低ISO
        focusMode: 'Single AF',
        meteringMode: 'Matrix',
        description: 'Small aperture for maximum sharpness'
    },
    street: {
        preferredApertures: [4, 5.6, 8],
        baseAperture: 5.6,
        baseISO: 200,
        minShutterSpeed: '1/125',
        preferredShutterSpeeds: ['1/125', '1/250', '1/320', '1/500'],
        maxISO: 6400,
        focusMode: 'Continuous AF',
        meteringMode: 'Matrix',
        description: 'Balanced settings for quick shooting'
    },
    night: {
        preferredApertures: [1.4, 1.8, 2.8, 4.0],
        baseAperture: 2.8,
        baseISO: 1600,
        minShutterSpeed: '1/30',
        preferredShutterSpeeds: ['1/30', '1/60', '1/125'],
        maxISO: 12800,
        focusMode: 'Single AF',
        meteringMode: 'Spot',
        description: 'High ISO and wide aperture for low light'
    },
    macro: {
        preferredApertures: [8, 11, 16, 22],
        baseAperture: 11,
        baseISO: 200,
        minShutterSpeed: '1/125',  // 微距需要较快快门防止抖动
        preferredShutterSpeeds: ['1/125', '1/160', '1/250', '1/320'],
        maxISO: 1600,
        focusMode: 'Manual',
        meteringMode: 'Spot',
        description: 'Small aperture for depth of field in close-ups'
    },
    sports: {
        preferredApertures: [2.8, 4, 5.6],
        baseAperture: 4,
        baseISO: 400,
        minShutterSpeed: '1/250',  // 运动摄影最低快门
        preferredShutterSpeeds: ['1/250', '1/500', '1/1000', '1/2000'],
        maxISO: 6400,
        focusMode: 'Continuous AF',
        meteringMode: 'Center-weighted',
        description: 'Fast shutter speeds to freeze motion'
    }
};

// 标准快门速度数组（从快到慢）
const STANDARD_SHUTTER_SPEEDS = [
    '1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125',
    '1/60', '1/30', '1/15', '1/8', '1/4', '1/2', '1s', '2s', '4s', '8s'
];

// 标准光圈值
const STANDARD_APERTURES = [1.4, 1.8, 2.0, 2.8, 4.0, 5.6, 8.0, 11, 16, 22];

// 标准ISO值
const STANDARD_ISO_VALUES = [100, 200, 400, 800, 1600, 3200, 6400, 12800];

// 光照条件评估
const LIGHTING_CONDITIONS = {
    sunny: { day: 'bright', sunrise: 'moderate', sunset: 'moderate', night: 'dark' },
    cloudy: { day: 'moderate', sunrise: 'dim', sunset: 'dim', night: 'dark' },
    overcast: { day: 'dim', sunrise: 'dark', sunset: 'dark', night: 'very_dark' },
    rainy: { day: 'dim', sunrise: 'dark', sunset: 'dark', night: 'very_dark' }
};

// 光照条件对应的基础ISO
const BASE_ISO_FOR_LIGHTING = {
    bright: 100,
    moderate: 200,
    dim: 400,
    dark: 800,
    very_dark: 1600
};

/**
 * Parse shutter speed string to numeric value
 * @param {string} shutter - Shutter speed string (e.g., "1/125", "2s")
 * @returns {number} Numeric shutter speed value
 */
function parseShutter (shutter) {
    if (shutter.endsWith('s')) {
        return parseFloat(shutter);
    }
    if (shutter.startsWith('1/')) {
        return 1 / parseFloat(shutter.slice(2));
    }
    return 1 / 125; // fallback
}

/**
 * Get lighting condition based on weather and time of day
 * @param {WeatherCondition} weather - Weather condition
 * @param {TimeOfDay} timeOfDay - Time of day
 * @returns {string} Lighting condition
 */
function getLightingCondition(weather, timeOfDay) {
    return LIGHTING_CONDITIONS[weather][timeOfDay] || 'moderate';
}

/**
 * Find closest value in an array
 * @param {number} target - Target value
 * @param {number[]} array - Array of values to search
 * @returns {number} Closest value
 */
function findClosestValue(target, array) {
    return array.reduce((prev, curr) =>
        Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
    );
}

/**
 * Find closest shutter speed
 * @param {string} target - Target shutter speed
 * @returns {string} Closest standard shutter speed
 */
function findClosestShutterSpeed(target) {
    const targetValue = parseShutter(target);
    let closest = STANDARD_SHUTTER_SPEEDS[0];
    let minDiff = Math.abs(parseShutter(closest) - targetValue);

    for (const speed of STANDARD_SHUTTER_SPEEDS) {
        const diff = Math.abs(parseShutter(speed) - targetValue);
        if (diff < minDiff) {
            minDiff = diff;
            closest = speed;
        }
    }
    return closest;
}



/**
 * Convert EV to shutter speed (legacy function, now uses practical approach)
 * @param {number} ev - Exposure value
 * @param {number} aperture - Aperture value
 * @param {number} iso - ISO value
 * @returns {string} Shutter speed string
 */
function evToShutter(ev, aperture, iso) {
    // For very high EV values, use fast shutter speeds
    if (ev >= 15) return '1/500';
    if (ev >= 14) return '1/250';
    if (ev >= 13) return '1/125';
    if (ev >= 12) return '1/60';
    if (ev >= 10) return '1/30';
    if (ev >= 8) return '1/15';
    if (ev >= 6) return '1/8';
    if (ev >= 4) return '1/4';
    if (ev >= 2) return '1/2';
    return '1s'; // For very low light
}

/**
 * Convert EV to ISO
 * @param {number} ev - Exposure value
 * @param {number} aperture - Aperture value
 * @param {number} shutter - Shutter speed numeric value
 * @returns {number} ISO value
 */
function evToISO (ev, aperture, shutter) {
    // EV = log2(aperture^2 / shutterSpeed) + log2(ISO/100)
    // Solving for ISO: ISO = 100 * 2^(EV - log2(aperture^2 / shutterSpeed))
    return 100 * Math.pow(2, ev - Math.log2((aperture * aperture) / shutter));
}

/**
 * Convert EV to aperture
 * @param {number} ev - Exposure value
 * @param {number} iso - ISO value
 * @param {number} shutter - Shutter speed numeric value
 * @returns {number} Aperture value
 */
function evToAperture (ev, iso, shutter) {
    // EV = log2(aperture^2 / shutterSpeed) + log2(ISO/100)
    // Solving for aperture: aperture = sqrt(shutterSpeed * 2^(EV - log2(ISO/100)))
    return Math.sqrt(shutter * Math.pow(2, ev - Math.log2(iso / 100)));
}

/**
 * Calculate camera settings based on scene, weather, time of day, EV, and priority mode
 * @param {SceneType} scene - Scene type
 * @param {WeatherCondition} weather - Weather condition
 * @param {TimeOfDay} timeOfDay - Time of day
 * @param {number} ev - Exposure value
 * @param {CameraPriorityMode} priorityMode - Camera priority mode
 * @returns {CameraSettings} Calculated camera settings
 */
function calculateCameraSettings(scene, weather, timeOfDay, ev, priorityMode) {
    const sceneSetting = SCENE_SETTINGS[scene];
    const lightingCondition = getLightingCondition(weather, timeOfDay);

    // 获取基础ISO基于光照条件
    let baseISO = BASE_ISO_FOR_LIGHTING[lightingCondition];

    // 应用曝光补偿规则
    let exposureCompensation;
    if (EXPOSURE_COMPENSATION_RULES[weather]?.[timeOfDay]) {
        exposureCompensation = EXPOSURE_COMPENSATION_RULES[weather][timeOfDay];
    }

    let aperture, iso, shutterSpeed;

    switch (priorityMode) {
        case 'aperture':
            // 光圈优先：使用场景推荐的光圈，调整ISO和快门
            aperture = sceneSetting.baseAperture;
            iso = Math.min(baseISO, sceneSetting.maxISO);

            // 根据光照条件调整ISO
            if (lightingCondition === 'dim') iso = Math.min(iso * 2, sceneSetting.maxISO);
            else if (lightingCondition === 'dark') iso = Math.min(iso * 4, sceneSetting.maxISO);
            else if (lightingCondition === 'very_dark') iso = Math.min(iso * 6, sceneSetting.maxISO);

            // 选择合适的快门速度
            shutterSpeed = selectOptimalShutterSpeed(scene, lightingCondition);
            break;

        case 'shutter':
            // 快门优先：使用场景推荐的快门，调整光圈和ISO
            shutterSpeed = sceneSetting.preferredShutterSpeeds[0]; // 使用首选快门速度
            aperture = sceneSetting.baseAperture;
            iso = baseISO;

            // 根据光照条件调整ISO
            if (lightingCondition === 'dim') iso = Math.min(iso * 2, sceneSetting.maxISO);
            else if (lightingCondition === 'dark') iso = Math.min(iso * 4, sceneSetting.maxISO);
            else if (lightingCondition === 'very_dark') iso = Math.min(iso * 8, sceneSetting.maxISO);
            break;

        case 'iso':
            // ISO优先：固定ISO，调整光圈和快门
            iso = Math.min(baseISO * 2, sceneSetting.maxISO); // 使用适中的ISO

            // 根据光照条件选择光圈
            if (lightingCondition === 'bright') {
                aperture = sceneSetting.preferredApertures[Math.floor(sceneSetting.preferredApertures.length / 2)];
            } else if (lightingCondition === 'dark' || lightingCondition === 'very_dark') {
                aperture = sceneSetting.preferredApertures[0]; // 最大光圈
            } else {
                aperture = sceneSetting.baseAperture;
            }

            shutterSpeed = selectOptimalShutterSpeed(scene, lightingCondition);
            break;

        case 'manual':
        default:
            // 手动模式：提供平衡的推荐设置
            aperture = sceneSetting.baseAperture;
            iso = Math.min(baseISO, sceneSetting.maxISO);

            // 根据光照条件调整
            if (lightingCondition === 'dim') {
                iso = Math.min(iso * 1.5, sceneSetting.maxISO);
            } else if (lightingCondition === 'dark') {
                iso = Math.min(iso * 3, sceneSetting.maxISO);
                aperture = sceneSetting.preferredApertures[0]; // 开大光圈
            } else if (lightingCondition === 'very_dark') {
                iso = Math.min(iso * 5, sceneSetting.maxISO);
                aperture = sceneSetting.preferredApertures[0];
            }

            shutterSpeed = selectOptimalShutterSpeed(scene, lightingCondition);
            break;
    }

    // 确保所有值都在合理范围内
    aperture = findClosestValue(aperture, sceneSetting.preferredApertures);
    iso = findClosestValue(iso, STANDARD_ISO_VALUES);
    iso = Math.min(iso, sceneSetting.maxISO);

    return {
        iso: Math.round(iso),
        aperture: `f/${aperture}`,
        shutterSpeed: shutterSpeed,
        exposureCompensation,
        focusMode: sceneSetting.focusMode,
        meteringMode: sceneSetting.meteringMode
    };
}

/**
 * Select optimal shutter speed based on scene and lighting
 * @param {SceneType} scene - Scene type
 * @param {string} lightingCondition - Lighting condition
 * @returns {string} Optimal shutter speed
 */
function selectOptimalShutterSpeed(scene, lightingCondition) {
    const sceneSetting = SCENE_SETTINGS[scene];

    if (lightingCondition === 'bright') {
        // 明亮条件下可以使用较快的快门
        return sceneSetting.preferredShutterSpeeds[sceneSetting.preferredShutterSpeeds.length - 1];
    } else if (lightingCondition === 'very_dark' && scene === 'night') {
        // 夜景可以使用较慢的快门
        return sceneSetting.minShutterSpeed;
    } else if (lightingCondition === 'dark' || lightingCondition === 'very_dark') {
        // 暗光条件下使用最慢的安全快门
        return sceneSetting.minShutterSpeed;
    } else {
        // 一般条件下使用中等快门速度
        const midIndex = Math.floor(sceneSetting.preferredShutterSpeeds.length / 2);
        return sceneSetting.preferredShutterSpeeds[midIndex];
    }
}

// Export for use in other modules
window.cameraCalculator = {
    calculateCameraSettings,
    parseShutter,
    evToShutter,
    evToISO,
    evToAperture,
    SCENE_SETTINGS,
    STANDARD_SHUTTER_SPEEDS,
    STANDARD_APERTURES,
    STANDARD_ISO_VALUES,
    LIGHTING_CONDITIONS,
    BASE_ISO_FOR_LIGHTING,
    EXPOSURE_COMPENSATION_RULES
};
