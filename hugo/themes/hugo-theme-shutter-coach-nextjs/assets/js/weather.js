// Weather utilities - Converted from TypeScript to JavaScript

/**
 * @typedef {'sunny' | 'cloudy' | 'overcast' | 'rainy'} WeatherCondition
 * @typedef {'sunrise' | 'day' | 'sunset' | 'night'} TimeOfDay
 */

/**
 * @typedef {Object} WeatherData
 * @property {number} temperature
 * @property {number} cloudcover
 * @property {number} weathercode
 * @property {string} time
 */

/**
 * Get base EV value with weather data from coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<{ev: number, weather: WeatherCondition, timeOfDay: TimeOfDay}>}
 */
async function getBaseEVWithWeather(latitude, longitude) {
    try {
        // Use Open-Meteo API for weather data (free, no API key required)
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloudcover,weathercode&daily=sunrise,sunset&timezone=auto`;

        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (!data.current) {
            throw new Error('Weather data not available');
        }

        // Get current timestamp (seconds)
        const now = Math.floor(Date.now() / 1000);

        // Get sunrise/sunset times (ISO strings, convert to timestamps)
        const sunrise = Math.floor(new Date(data.daily.sunrise[0]).getTime() / 1000);
        const sunset = Math.floor(new Date(data.daily.sunset[0]).getTime() / 1000);

        // Calculate sun elevation (simplified version)
        const sunElevation = calculateSunElevation(now, sunrise, sunset);

        let baseEV;
        if (sunElevation > 10) {
            baseEV = 15; // Daytime
        } else if (sunElevation > 0) {
            baseEV = 10; // Sunrise/sunset
        } else {
            baseEV = 3; // Night
        }

        // Adjust EV based on cloud cover
        const cloudiness = data.current.cloudcover;
        if (cloudiness > 75) {
            baseEV -= 2;
        } else if (cloudiness > 25) {
            baseEV -= 1;
        }

        // Adjust EV based on weather code
        const weatherCode = data.current.weathercode;
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) { // Rain
            baseEV -= 2;
        } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) { // Snow
            baseEV += 1;
        } else if ([45, 48].includes(weatherCode)) { // Fog
            baseEV -= 3;
        }

        const weatherCondition = getWeatherCondition(weatherCode, cloudiness);
        const timeOfDay = getTimeOfDayFromSun(now, sunrise, sunset);

        return {
            ev: baseEV,
            weather: weatherCondition,
            timeOfDay: timeOfDay,
            temperature: data.current.temperature_2m,
            cloudcover: cloudiness,
            weathercode: weatherCode,
            sunrise: sunrise,
            sunset: sunset
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Return default values if weather fetch fails
        return {
            ev: 12, // Default sunny day EV
            weather: 'sunny',
            timeOfDay: 'day',
            temperature: 20,
            cloudcover: 0,
            weathercode: 0,
            sunrise: 0,
            sunset: 0
        };
    }
}

/**
 * Convert weather code and cloud cover to weather condition
 * @param {number} weatherCode - WMO weather code
 * @param {number} cloudCover - Cloud cover percentage (0-100)
 * @returns {WeatherCondition}
 */
function getWeatherCondition(weatherCode, cloudCover) {
    // WMO Weather interpretation codes
    if (weatherCode >= 51 && weatherCode <= 82) {
        // Rain, drizzle, snow
        return 'rainy';
    } else if (cloudCover > 75) {
        // Heavy cloud cover
        return 'overcast';
    } else if (cloudCover > 25) {
        // Moderate cloud cover
        return 'cloudy';
    } else {
        // Clear or mostly clear
        return 'sunny';
    }
}

/**
 * Calculate sun elevation based on current time and sunrise/sunset times (simplified version)
 * @param {number} now - Current timestamp in seconds
 * @param {number} sunrise - Sunrise timestamp in seconds
 * @param {number} sunset - Sunset timestamp in seconds
 * @returns {number} Sun elevation angle
 */
function calculateSunElevation(now, sunrise, sunset) {
    if (now < sunrise || now > sunset) {
        return -10; // Night
    }
    // Daytime, linear interpolation: sunrise = 0°, noon = 90°, sunset = 0°
    const noon = (sunrise + sunset) / 2;
    const maxElevation = 90;
    const timeFromNoon = Math.abs(now - noon);
    const halfDay = (sunset - sunrise) / 2;
    return maxElevation - (maxElevation * timeFromNoon) / halfDay;
}

/**
 * Determine time of day from sun position
 * @param {number} now - Current timestamp in seconds
 * @param {number} sunrise - Sunrise timestamp in seconds
 * @param {number} sunset - Sunset timestamp in seconds
 * @returns {TimeOfDay}
 */
function getTimeOfDayFromSun(now, sunrise, sunset) {
    const nowDate = new Date(now * 1000);
    const sunriseDate = new Date(sunrise * 1000);
    const sunsetDate = new Date(sunset * 1000);

    const hour = nowDate.getHours();
    const sunriseHour = sunriseDate.getHours();
    const sunsetHour = sunsetDate.getHours();

    if (hour < sunriseHour) {
        return 'night';
    } else if (hour < sunriseHour + 1) {
        return 'sunrise';
    } else if (hour < sunsetHour) {
        return 'day';
    } else if (hour < sunsetHour + 1) {
        return 'sunset';
    } else {
        return 'night';
    }
}

/**
 * Determine time of day from ISO time string
 * @param {string} timeString - ISO time string
 * @returns {TimeOfDay}
 */
function getTimeOfDay(timeString) {
    const date = new Date(timeString);
    const hour = date.getHours();

    if (hour >= 5 && hour < 7) {
        return 'sunrise';
    } else if (hour >= 7 && hour < 17) {
        return 'day';
    } else if (hour >= 17 && hour < 19) {
        return 'sunset';
    } else {
        return 'night';
    }
}

/**
 * Calculate base EV value based on weather and time of day
 * @param {WeatherCondition} weather - Weather condition
 * @param {TimeOfDay} timeOfDay - Time of day
 * @returns {number} Base EV value
 */
function calculateBaseEV(weather, timeOfDay) {
    // Base EV values for different conditions
    const baseEVTable = {
        sunny: { sunrise: 11, day: 15, sunset: 12, night: 6 },
        cloudy: { sunrise: 10, day: 14, sunset: 11, night: 5 },
        overcast: { sunrise: 9, day: 13, sunset: 10, night: 4 },
        rainy: { sunrise: 8, day: 12, sunset: 9, night: 3 }
    };

    return baseEVTable[weather][timeOfDay] || 12; // Default to 12 if not found
}

/**
 * Get weather icon based on weather condition
 * @param {WeatherCondition} weather - Weather condition
 * @returns {string} Icon class or emoji
 */
function getWeatherIcon(weather) {
    const icons = {
        sunny: '☀️',
        cloudy: '⛅',
        overcast: '☁️',
        rainy: '🌧️'
    };
    return icons[weather] || '☀️';
}

/**
 * Get weather description
 * @param {WeatherCondition} weather - Weather condition
 * @returns {string} Weather description
 */
function getWeatherDescription(weather) {
    const descriptions = {
        sunny: 'Clear and bright conditions',
        cloudy: 'Partly cloudy with some shadows',
        overcast: 'Heavy cloud cover, diffused light',
        rainy: 'Wet conditions with reduced light'
    };
    return descriptions[weather] || 'Unknown weather condition';
}

/**
 * Get time of day description
 * @param {TimeOfDay} timeOfDay - Time of day
 * @returns {string} Time description
 */
function getTimeDescription(timeOfDay) {
    const descriptions = {
        sunrise: 'Golden hour morning light',
        day: 'Bright daylight conditions',
        sunset: 'Golden hour evening light',
        night: 'Low light conditions'
    };
    return descriptions[timeOfDay] || 'Unknown time period';
}

/**
 * Check if current conditions require special considerations
 * @param {WeatherCondition} weather - Weather condition
 * @param {TimeOfDay} timeOfDay - Time of day
 * @returns {string[]} Array of special considerations
 */
function getSpecialConsiderations(weather, timeOfDay) {
    const considerations = [];
    
    if (weather === 'rainy') {
        considerations.push('Protect your camera from moisture');
        considerations.push('Consider using a lens hood');
    }
    
    if (timeOfDay === 'night') {
        considerations.push('Use a tripod for stability');
        considerations.push('Consider using manual focus');
    }
    
    if (timeOfDay === 'sunrise' || timeOfDay === 'sunset') {
        considerations.push('Golden hour - great for warm tones');
        considerations.push('Light changes quickly - work fast');
    }
    
    if (weather === 'overcast') {
        considerations.push('Soft, even lighting - great for portraits');
        considerations.push('Colors may appear muted');
    }
    
    return considerations;
}

// Export for global use
window.weatherUtils = {
    getBaseEVWithWeather,
    getWeatherIcon,
    getWeatherDescription,
    getTimeDescription,
    getSpecialConsiderations,
    getWeatherCondition,
    getTimeOfDay,
    calculateBaseEV
};
