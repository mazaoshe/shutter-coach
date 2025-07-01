export type SceneType = 'portrait' | 'landscape' | 'street' | 'night' | 'macro' | 'sports';
export type WeatherCondition = 'sunny' | 'cloudy' | 'overcast' | 'rainy';
export type TimeOfDay = 'sunrise' | 'day' | 'sunset' | 'night';
export type CameraPriorityMode = 'shutter' | 'aperture' | 'iso' | 'manual';

export interface CameraSettings {
    iso: number;
    aperture: string;
    shutterSpeed: string;
    exposureCompensation?: string;
    focusMode: string;
    meteringMode: string;
}
// 曝光补偿规则表（可扩展）
const EXPOSURE_COMPENSATION_RULES: Record<WeatherCondition, Partial<Record<TimeOfDay, string>>> = {
    sunny: { day: undefined, sunrise: '+0.3', sunset: '+0.7' },
    cloudy: { day: '+0.3', sunrise: '+0.7', sunset: '+1.0' },
    overcast: { day: '+0.7', sunrise: '+1.0', sunset: '+1.3' },
    rainy: { day: '+0.3', night: '+1.0' }
};

// 预设推荐表（便于后续扩展或配置化）
const SCENE_SETTINGS = {
    portrait: { baseAperture: 2.8, baseISO: 100, focusMode: 'Single AF', meteringMode: 'Center-weighted' },
    landscape: { baseAperture: 8, baseISO: 100, focusMode: 'Single AF', meteringMode: 'Matrix' },
    street: { baseAperture: 5.6, baseISO: 200, focusMode: 'Continuous AF', meteringMode: 'Matrix' },
    night: { baseAperture: 2.8, baseISO: 1600, focusMode: 'Single AF', meteringMode: 'Spot' },
    macro: { baseAperture: 11, baseISO: 200, focusMode: 'Manual', meteringMode: 'Spot' },
    sports: { baseAperture: 4, baseISO: 400, focusMode: 'Continuous AF', meteringMode: 'Center-weighted' }
};

const WEATHER_ISO_BOOST = {
    sunny: 0,
    cloudy: 0,
    overcast: 2,
    rainy: 3
};

const TIME_OF_DAY_ISO_BOOST = {
    sunrise: 0,
    day: 0,
    sunset: 0,
    night: 4
};

function evToShutter(ev: number, aperture: number, iso: number): string {
    const t = (Math.pow(aperture, 2) * 100) / (Math.pow(2, ev) * iso);
    if (t >= 1) return `${t.toFixed(1)}s`;
    const denominator = Math.round(1 / t);
    return `1/${denominator}`;
}

function evToISO(ev: number, aperture: number, shutter: number): number {
    return (Math.pow(aperture, 2) * 100) / (Math.pow(2, ev) * shutter);
}

function evToAperture(ev: number, iso: number, shutter: number): number {
    return Math.sqrt(Math.pow(2, ev) * shutter * iso / 100);
}

function parseShutter(shutter: string): number {
    if (shutter.endsWith('s')) {
        return parseFloat(shutter);
    }
    if (shutter.startsWith('1/')) {
        return 1 / parseFloat(shutter.slice(2));
    }
    return 1 / 60; // fallback
}

export const calculateCameraSettings = (
    scene: SceneType,
    weather: WeatherCondition,
    timeOfDay: TimeOfDay,
    ev: number,
    priorityMode: CameraPriorityMode
): CameraSettings => {
    // 获取基础设置
    const sceneSetting = SCENE_SETTINGS[scene];
    let aperture = sceneSetting.baseAperture;
    let iso = sceneSetting.baseISO;
    let focusMode = sceneSetting.focusMode;
    let meteringMode = sceneSetting.meteringMode;

    // 根据天气和时间段动态调整 EV 值
    let adjustedEv = ev;

    // 根据天气增加/减少 EV（比如阴天减 1 EV，更暗）
    if (weather === 'cloudy') adjustedEv -= 1;
    else if (weather === 'overcast') adjustedEv -= 2;
    else if (weather === 'rainy') adjustedEv -= 3;

    // 根据时间段调整 EV（日出/日落 +0.5，夜晚 -2）
    if (timeOfDay === 'sunrise' || timeOfDay === 'sunset') adjustedEv += 0.5;
    else if (timeOfDay === 'night') adjustedEv -= 2;

    // 应用曝光补偿规则
    let exposureCompensation: string | undefined;
    if (EXPOSURE_COMPENSATION_RULES[weather]?.[timeOfDay]) {
        exposureCompensation = EXPOSURE_COMPENSATION_RULES[weather][timeOfDay];
        // 将曝光补偿值转换为数字并加到 EV 上
        const compensationValue = parseFloat(exposureCompensation);
        if (!isNaN(compensationValue)) {
            adjustedEv += compensationValue;
        }
    }

    // 根据天气调整 ISO
    iso = iso * Math.pow(2, WEATHER_ISO_BOOST[weather]);
    // 根据时间段调整 ISO（基于上一步结果）
    iso = iso * Math.pow(2, TIME_OF_DAY_ISO_BOOST[timeOfDay]);
    // 限制最大 ISO
    iso = Math.min(iso, 12800);
    // 基础快门速度
    let shutter = parseShutter('1/125');

    // 动态计算
    let shutterSpeed = '1/125';
    let calculatedAperture = `f/${aperture}`;
    let calculatedISO = iso;

    if (priorityMode === 'aperture') {
        // 固定光圈，算快门
        shutterSpeed = evToShutter(adjustedEv, aperture, iso);
    } else if (priorityMode === 'shutter') {
        // 固定快门，算 ISO
        calculatedISO = Math.max(100, Math.min(evToISO(adjustedEv, aperture, shutter), 12800));
    } else if (priorityMode === 'iso') {
        // 固定 ISO，算光圈
        aperture = evToAperture(adjustedEv, iso, shutter);
        calculatedAperture = `f/${aperture.toFixed(1)}`;
    } else if (priorityMode === 'manual') {
        // 手动模式：使用当前 EV 推荐值
        shutterSpeed = evToShutter(adjustedEv, aperture, iso);
        calculatedAperture = `f/${aperture}`;
        calculatedISO = iso;
    }

    return {
        iso: Math.round(calculatedISO),
        aperture: calculatedAperture,
        shutterSpeed,
        exposureCompensation,
        focusMode,
        meteringMode
    };
};