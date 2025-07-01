
import React from 'react';
import { Sun } from 'lucide-react';
import { SceneType, WeatherCondition, TimeOfDay } from '../utils/cameraCalculator';

interface ShootingTipsProps {
    scene: SceneType;
    weather: WeatherCondition;
    timeOfDay: TimeOfDay;
    shutterSpeed?: string; // 新增字段，用于判断安全快门
    exposureCompensation?: string; // 新增字段，用于显示曝光补偿建议
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

function isSafeShutterSpeed(focalLength: number, shutterSpeed: string): boolean {
    const denominator = parseShutter(shutterSpeed);
    return denominator >= 1 / focalLength;
}
const ShootingTips: React.FC<ShootingTipsProps> = ({ scene, weather, timeOfDay, shutterSpeed,
    exposureCompensation }) => {
    const getTips = () => {
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
                tips.push('Higher ISO may be needed for faster shutter speeds');
                break;
        }

        // Weather-specific tips
        switch (weather) {
            case 'sunny':
                tips.push('Watch for harsh shadows - use fill light if needed');
                tips.push('Polarizing filter can reduce glare and enhance colors');
                break;
            case 'cloudy':
                tips.push('Soft, even lighting is perfect for portraits');
                tips.push('Colors may appear more saturated in cloudy conditions');
                break;
            case 'overcast':
                tips.push('Great for outdoor portraits with natural diffusion');
                tips.push('Consider increasing contrast in post-processing');
                break;
            case 'rainy':
                tips.push('Protect your camera with weather sealing or cover');
                tips.push('Rain creates interesting reflections and textures');
                break;
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


        return tips.slice(0, 4); // Limit to 4 tips for better UI
    };

    const tips = getTips();

    return (
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-lg mr-3">
                    <Sun className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Pro Tips</h3>
            </div>

            <div className="space-y-3">
                {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShootingTips;
