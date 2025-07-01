
import React from 'react';
import { SceneType } from '../utils/cameraCalculator';

interface SceneSelectorProps {
  selectedScene: SceneType;
  onSceneChange: (scene: SceneType) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({ selectedScene, onSceneChange }) => {
  const scenes = [
    {
      type: 'portrait' as SceneType,
      name: 'Portrait',
      description: 'People, headshots, close-ups',
      emoji: '👤',
      gradient: 'from-pink-400 to-rose-400'
    },
    {
      type: 'landscape' as SceneType,
      name: 'Landscape',
      description: 'Nature, wide vistas, scenery',
      emoji: '🏔️',
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      type: 'street' as SceneType,
      name: 'Street',
      description: 'Urban, candid, documentary',
      emoji: '🏙️',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      type: 'night' as SceneType,
      name: 'Night',
      description: 'Low light, city lights, stars',
      emoji: '🌙',
      gradient: 'from-purple-400 to-indigo-400'
    },
    {
      type: 'macro' as SceneType,
      name: 'Macro',
      description: 'Close-up details, flowers, insects',
      emoji: '🔍',
      gradient: 'from-orange-400 to-amber-400'
    },
    {
      type: 'sports' as SceneType,
      name: 'Sports',
      description: 'Action, movement, fast subjects',
      emoji: '⚽',
      gradient: 'from-red-400 to-pink-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {scenes.map((scene) => (
        <button
          key={scene.type}
          onClick={() => onSceneChange(scene.type)}
          className={`relative group p-6 rounded-xl border-2 transition-all duration-300 ${
            selectedScene === scene.type
              ? 'border-blue-500 bg-blue-50 scale-105'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-102'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${scene.gradient} opacity-0 rounded-xl transition-opacity duration-300 ${
            selectedScene === scene.type ? 'opacity-10' : 'group-hover:opacity-5'
          }`} />
          
          <div className="relative z-10 text-center">
            <div className="text-3xl mb-2">{scene.emoji}</div>
            <h4 className="font-semibold text-gray-900 mb-1">{scene.name}</h4>
            <p className="text-sm text-gray-600 leading-tight">{scene.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SceneSelector;
