/**
 * 获取基础曝光值（EV），结合天气和太阳高度角（使用 Open-Meteo API）
 */
async function getBaseEVWithWeather(lat: number, lon: number): Promise<{ ev: number, weatherCode: number, cloudcover: number, sunrise: number, sunset: number }> {
    try {
        // 获取当前天气、云量、日出日落时间
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,cloudcover,weathercode&daily=sunrise,sunset&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();

        // 获取当前时间戳（秒）
        const now = Math.floor(Date.now() / 1000);

        // 获取日出日落时间（ISO字符串，需转为时间戳）
        const sunrise = Math.floor(new Date(data.daily.sunrise[0]).getTime() / 1000);
        const sunset = Math.floor(new Date(data.daily.sunset[0]).getTime() / 1000);

        // 计算太阳高度角（简化版）
        const sunElevation = calculateSunElevationOpenMeteo(now, sunrise, sunset);

        let baseEV: number;
        if (sunElevation > 10) {
            baseEV = 15; // 白天
        } else if (sunElevation > 0) {
            baseEV = 10; // 日出/日落
        } else {
            baseEV = 3; // 夜晚
        }

        // 根据云量调整 EV
        const cloudiness = data.current.cloudcover;
        if (cloudiness > 75) {
            baseEV -= 2;
        } else if (cloudiness > 25) {
            baseEV -= 1;
        }

        // 根据天气代码调整 EV（可选，Open-Meteo 的 weathercode 见官方文档）
        const weatherCode = data.current.weathercode;
        if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) { // 雨
            baseEV -= 2;
        } else if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) { // 雪
            baseEV += 1;
        } else if ([45, 48].includes(weatherCode)) { // 雾
            baseEV -= 3;
        }

        return { ev: baseEV, weatherCode, cloudcover: cloudiness, sunrise: sunrise, sunset: sunset };
    } catch (error) {
        console.error('获取天气信息失败:', error);
        return { ev: 0, weatherCode: 0, cloudcover: 0, sunrise: 0, sunset: 0 }; // 返回默认值
    }
}

/**
 * 根据当前时间和日出日落时间计算太阳高度角（简化版）
 */
function calculateSunElevationOpenMeteo(now: number, sunrise: number, sunset: number): number {
    if (now < sunrise || now > sunset) {
        return -10; // 夜晚
    }
    // 白天，线性插值：日出为0度，正午为90度，日落为0度
    const noon = (sunrise + sunset) / 2;
    const maxElevation = 90;
    const timeFromNoon = Math.abs(now - noon);
    const halfDay = (sunset - sunrise) / 2;
    return maxElevation - (maxElevation * timeFromNoon) / halfDay;
}

export { getBaseEVWithWeather };