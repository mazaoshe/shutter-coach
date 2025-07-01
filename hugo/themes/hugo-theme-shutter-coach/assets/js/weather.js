// /static/js/weather.js
async function getBaseEVWithWeather(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,cloudcover,weathercode&daily=sunrise,sunset&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();

        const now = Math.floor(Date.now() / 1000);
        const sunrise = Math.floor(new Date(data.daily.sunrise[0]).getTime() / 1000);
        const sunset = Math.floor(new Date(data.daily.sunset[0]).getTime() / 1000);

        let baseEV;
        const sunElevation = calculateSunElevationOpenMeteo(now, sunrise, sunset);

        if (sunElevation > 10) {
            baseEV = 15;
        } else if (sunElevation > 0) {
            baseEV = 10;
        } else {
            baseEV = 3;
        }

        const cloudiness = data.current.cloudcover;
        if (cloudiness > 75) baseEV -= 2;
        else if (cloudiness > 25) baseEV -= 1;

        const weatherCode = data.current.weathercode;
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
            baseEV -= 2;
        } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
            baseEV += 1;
        } else if ([45, 48].includes(weatherCode)) {
            baseEV -= 3;
        }

        return { ev: baseEV, weatherCode, cloudcover: cloudiness, sunrise, sunset };
    } catch (error) {
        console.error('获取天气信息失败:', error);
        return { ev: 0, weatherCode: 0, cloudcover: 0, sunrise: 0, sunset: 0 };
    }
}

function calculateSunElevationOpenMeteo(now, sunrise, sunset) {
    if (now < sunrise || now > sunset) return -10;
    const noon = (sunrise + sunset) / 2;
    const maxElevation = 90;
    const timeFromNoon = Math.abs(now - noon);
    const halfDay = (sunset - sunrise) / 2;
    return maxElevation - (maxElevation * timeFromNoon) / halfDay;
}