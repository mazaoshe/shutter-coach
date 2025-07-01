
import React from 'react';
import { Camera } from 'lucide-react';

interface CameraSettingsProps {
  settings: {
    iso: number;
    aperture: string;
    shutterSpeed: string;
    exposureCompensation?: string;
    focusMode: string;
    meteringMode: string;
  };
}

const CameraSettings: React.FC<CameraSettingsProps> = ({ settings }) => {
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

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg mr-3">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Recommended Settings</h3>
      </div>

      <div className="space-y-4">
        {settingItems.map((item, index) => (
          <div key={index} className={`p-4 rounded-xl border-2 ${item.color}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{item.label}</span>
              <span className="text-xl font-bold">{item.value}</span>
            </div>
            <p className="text-sm opacity-80">{item.description}</p>
          </div>
        ))}
      </div>

      {settings.exposureCompensation && (
        <div className="mt-4 p-4 bg-amber-50 text-amber-700 border-2 border-amber-200 rounded-xl">
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold">Exposure Compensation</span>
            <span className="text-xl font-bold">{settings.exposureCompensation}</span>
          </div>
          <p className="text-sm opacity-80">Brightness adjustment</p>
        </div>
      )}
    </div>
  );
};

export default CameraSettings;
