
import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';
import { WeatherCondition } from '../utils/cameraCalculator';

interface WeatherInputProps {
  weather: WeatherCondition;
  onWeatherChange: (weather: WeatherCondition) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ weather, onWeatherChange }) => {
  const weatherOptions = [
    {
      type: 'sunny' as WeatherCondition,
      name: 'Sunny',
      icon: <Sun className="w-5 h-5" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-300'
    },
    {
      type: 'cloudy' as WeatherCondition,
      name: 'Cloudy',
      icon: <Cloud className="w-5 h-5" />,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-300'
    },
    {
      type: 'overcast' as WeatherCondition,
      name: 'Overcast',
      icon: <Cloud className="w-5 h-5" />,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-300'
    },
    {
      type: 'rainy' as WeatherCondition,
      name: 'Rainy',
      icon: <CloudRain className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {weatherOptions.map((option) => (
        <button
          key={option.type}
          onClick={() => onWeatherChange(option.type)}
          className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${
            weather === option.type
              ? `border-blue-500 bg-blue-50 text-blue-700`
              : `border-gray-200 bg-white hover:${option.bgColor} hover:${option.borderColor}`
          }`}
        >
          <span className={weather === option.type ? 'text-blue-600' : option.color}>
            {option.icon}
          </span>
          <span className="font-medium">{option.name}</span>
        </button>
      ))}
    </div>
  );
};

export default WeatherInput;
