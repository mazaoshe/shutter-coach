document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const result = await getBaseEVWithWeather(latitude, longitude);

        }, (err) => {
            console.error("获取位置失败:", err);
        });
    }
});

function getWeatherText (weatherCode, cloudcover) {
    let weatherType = "sunny";
    if (weatherCode >= 51 && weatherCode <= 82) {
        weatherType = "rainy";
    } else if (cloudcover > 75) {
        weatherType = "overcast";
    } else if (cloudcover > 25) {
        weatherType = "cloudy";
    }
    highlightWeatherCondition(weatherType);
    return weatherType;
}

function getTimeOfDayText (sunrise, sunset) {
    const now = Math.floor(Date.now() / 1000);
    let timeOfDay = 'night';
    if (now < sunrise) {
        timeOfDay = 'night';
    } else if (now < sunrise + 3600) {
        timeOfDay = 'sunrise';
    } else if (now < sunset) {
        timeOfDay = 'day';
    } else if (now < sunset + 3600) {
        timeOfDay = 'sunset';
    }
    highlightTimeOfDay(timeOfDay);
    return timeOfDay;
}

// 高亮天气按钮
function highlightWeatherCondition (weatherType) {
    const buttons = document.querySelectorAll('[data-weather]');
    buttons.forEach(button => {
        if (button.dataset.weather === weatherType) {
            button.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-700');
            button.classList.remove('border-gray-200', 'bg-white', 'hover:bg-gray-50', 'hover:border-gray-300');
        } else {
            button.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-700');
            button.classList.add('border-gray-200', 'bg-white');
        }
    });
}

// 高亮时间按钮
function highlightTimeOfDay (timeOfDay) {
    const buttons = document.querySelectorAll('[data-time]');
    buttons.forEach(button => {
        if (button.dataset.time.toLowerCase() === timeOfDay.toLowerCase()) {
            button.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-700');
            button.classList.remove('border-gray-200', 'bg-white', 'hover:bg-gray-50', 'hover:border-gray-300');
        } else {
            button.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-700');
            button.classList.add('border-gray-200', 'bg-white');
        }
    });
}