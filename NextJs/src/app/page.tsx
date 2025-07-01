"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Cloud, Sun, Sunset, Moon } from 'lucide-react';
import SceneSelector from '@/components/SceneSelector';
import WeatherInput from '@/components/WeatherInput';
import CameraSettings from '@/components/CameraSettings';
import ShootingTips from '@/components/ShootingTips';
import { calculateCameraSettings, WeatherCondition, SceneType, TimeOfDay, CameraPriorityMode } from '@/utils/cameraCalculator';
import { getBaseEVWithWeather } from '@/utils/weather';
import CameraPrioritySelector from '@/components/CameraPrioritySelector';

const HomePage = () => {
    const [selectedScene, setSelectedScene] = useState<SceneType>('portrait');
    const [weather, setWeather] = useState<WeatherCondition>('sunny');
    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');
    const [initialEv, setInitialEv] = useState<number>(12); // 默认12
    const [cameraSettings, setCameraSettings] = useState<{
        iso: number;
        aperture: string;
        shutterSpeed: string;
        exposureCompensation?: string;
        focusMode: string;
        meteringMode: string;
    } | null>(null);
    const [ev, setEv] = useState<number>(0);
    const [priorityMode, setPriorityMode] = useState<CameraPriorityMode>('manual');
    const [settings, setSettings] = useState<{
        iso: number;
        aperture: string;
        shutterSpeed: string;
        exposureCompensation?: string;
        focusMode: string;
        meteringMode: string;
    }>({
        iso: 100,
        aperture: 'f/2.8',
        shutterSpeed: '1/60',
        focusMode: 'Single AF',
        meteringMode: 'Center-weighted'
    });

    // 只在页面首次加载时自动获取天气并设置 weather
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const weatherResult = await getBaseEVWithWeather(latitude, longitude);
                setEv(weatherResult.ev);
                setInitialEv(weatherResult.ev);
                // 根据天气代码和云量自动设置 weather
                let autoWeather: WeatherCondition = 'sunny';
                if (weatherResult.weatherCode >= 51 && weatherResult.weatherCode <= 82) {
                    autoWeather = 'rainy';
                } else if (weatherResult.cloudcover > 75) {
                    autoWeather = 'overcast';
                } else if (weatherResult.cloudcover > 25) {
                    autoWeather = 'cloudy';
                } else {
                    autoWeather = 'sunny';
                }
                setWeather(autoWeather);
                //根据当前时间，设置TimeOfDay
                const now = new Date();
                const sunrise = new Date(weatherResult.sunrise * 1000).getHours();
                const sunset = new Date(weatherResult.sunset * 1000).getHours();
                if (now.getHours() < sunrise) {
                    setTimeOfDay('night');
                } else if (now.getHours() < sunrise + 1) {
                    setTimeOfDay('sunrise');
                } else if (now.getHours() < sunset) {
                    setTimeOfDay('day');
                } else if (now.getHours() < sunset + 1) {
                    setTimeOfDay('sunset');
                } else {
                    setTimeOfDay('night');
                }
            },
            (error) => {
                console.error('获取位置失败:', error);
            }
        );
    }, []);

    useEffect(() => {
        // 通过EV+Scene来计算相机设置
        console.log(`Base EV: ${ev}`);
        const setting = calculateCameraSettings(selectedScene, weather, timeOfDay, ev, priorityMode);
        setSettings(setting);
        setCameraSettings(setting);
    }, [selectedScene, weather, timeOfDay, ev, priorityMode]);

    useEffect(() => {
        // 基于初始 EV 叠加天气和时间修正
        let baseEv = initialEv;
        if (weather === 'cloudy') baseEv -= 1;
        else if (weather === 'overcast') baseEv -= 2;
        else if (weather === 'rainy') baseEv -= 3;

        if (timeOfDay === 'sunrise' || timeOfDay === 'sunset') baseEv += 0.5;
        else if (timeOfDay === 'night') baseEv -= 2;

        setEv(baseEv);
    }, [weather, timeOfDay, initialEv]);

    const getTimeIcon = () => {
        switch (timeOfDay) {
            case 'sunrise': return <Sunset className="w-5 h-5" />;
            case 'day': return <Sun className="w-5 h-5" />;
            case 'sunset': return <Sunset className="w-5 h-5" />;
            case 'night': return <Moon className="w-5 h-5" />;
            default: return <Sun className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <a href="/" className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    ShutterCoach
                                </h1>
                                <p className="text-sm text-gray-600">Smart Camera Settings Assistant</p>
                            </div>
                        </a>
                        <div className="flex items-center space-x-6">
                            <a href="/categories/docs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                Docs
                            </a>
                            <a href="/about/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                                About
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Perfect Camera Settings, <span className="text-blue-600">Every Time</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Get instant camera setting recommendations based on your scene, weather conditions, and time of day.
                        Perfect for beginners and hobbyists who want professional results.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Scene & Weather Selection */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Camera Mode Selector */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                ⚙️ Priority Mode
                            </h3>
                            <CameraPrioritySelector selectedMode={priorityMode} onModeChange={setPriorityMode} />
                        </div>

                        {/* Scene Selection */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Scene</h3>
                            <SceneSelector selectedScene={selectedScene} onSceneChange={setSelectedScene} />
                        </div>

                        {/* Weather & Time Conditions */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                    <Cloud className="w-5 h-5 mr-2 text-blue-600" />
                                    Weather Conditions
                                </h3>
                                <WeatherInput weather={weather} onWeatherChange={setWeather} />
                            </div>

                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                    {getTimeIcon()}
                                    <span className="ml-2">Time of Day</span>
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {(['sunrise', 'day', 'sunset', 'night'] as TimeOfDay[]).map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setTimeOfDay(time)}
                                            className={`p-3 rounded-xl border-2 transition-all capitalize ${timeOfDay === time
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Camera Settings & Tips */}
                    <div className="space-y-6">
                        {cameraSettings && (
                            <>
                                <CameraSettings settings={cameraSettings} />
                                <ShootingTips scene={selectedScene} weather={weather} timeOfDay={timeOfDay} shutterSpeed={settings.shutterSpeed}
                                    exposureCompensation={settings.exposureCompensation} />
                            </>
                        )}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
                        <p className="text-gray-600">AI-powered settings based on real shooting conditions and photography best practices.</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sun className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Weather Integration</h3>
                        <p className="text-gray-600">Automatic adjustments based on lighting conditions, weather, and time of day.</p>
                    </div>

                    <div className="text-center p-6">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Moon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Tips Included</h3>
                        <p className="text-gray-600">Learn as you shoot with contextual tips and techniques for better photography.</p>
                    </div>
                </div>

                {/* Learn More Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Learn More</h2>
                        <ul className="space-y-3 text-center flex justify-between">
                            <li>
                                <a href="/about/about" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                                    <span>👉</span>
                                    <span>About ShutterCoach</span>
                                </a>
                            </li>
                            <li>
                                <a href="/other/how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                                    <span>🔍</span>
                                    <span>How it works</span>
                                </a>
                            </li>
                            <li>
                                <a href="/other/privacy-policy" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                                    <span>🛡</span>
                                    <span>Privacy Policy</span>
                                </a>
                            </li>
                            <li>
                                <a href="/other/terms" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                                    <span>📜</span>
                                    <span>Terms of Service</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="bg-white mt-16 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-600 mb-4">Copyright {new Date().getFullYear()}. All rights reserved.</p>
                    <p className="text-gray-600">
                        © 2025 ShutterCoach {' '}|{' '}
                        <a href="/about/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                            About
                        </a>
                        {' '}|{' '}
                        <a href="/other/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Contact
                        </a>
                        {' '}|{' '}
                        <a href="/other/privacypolicy" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Privacy Policy
                        </a>
                        {' '}|{' '}
                        <a href="/other/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                            How It Works
                        </a>
                        {' '}|{' '}
                        <a href="/other/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;