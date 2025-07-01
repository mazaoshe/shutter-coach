import React from 'react';

interface CameraPrioritySelectorProps {
    selectedMode: 'shutter' | 'aperture' | 'iso' | 'manual';
    onModeChange: (mode: 'shutter' | 'aperture' | 'iso' | 'manual') => void;
}

const CameraPrioritySelector: React.FC<CameraPrioritySelectorProps> = ({ selectedMode, onModeChange }) => {
    const modes = [
        {
            type: 'shutter' as const,
            name: 'Shutter Priority',
            description: 'Control shutter speed',
            emoji: '⏱️',
            gradient: 'from-blue-400 to-cyan-400'
        },
        {
            type: 'aperture' as const,
            name: 'Aperture Priority',
            description: 'Control depth of field',
            emoji: '📷',
            gradient: 'from-purple-400 to-indigo-400'
        },
        {
            type: 'iso' as const,
            name: 'ISO Priority',
            description: 'Control sensor sensitivity',
            emoji: '⚡',
            gradient: 'from-yellow-400 to-orange-400'
        },
        {
            type: 'manual' as const,
            name: 'Manual Mode',
            description: 'Full control over settings',
            emoji: '🛠️',
            gradient: 'from-gray-400 to-slate-400'
        }
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {modes.map((mode) => (
                <button
                    key={mode.type}
                    onClick={() => onModeChange(mode.type)}
                    className={`relative group p-6 rounded-xl border-2 transition-all duration-300 ${selectedMode === mode.type
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:scale-102'
                        }`}
                >
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 rounded-xl transition-opacity duration-300 ${selectedMode === mode.type ? 'opacity-10' : 'group-hover:opacity-5'
                            }`}
                    />
                    <div className="relative z-10 text-center">
                        <div className="text-3xl mb-2">{mode.emoji}</div>
                        <h4 className="font-semibold text-gray-900 mb-1">{mode.name}</h4>
                        <p className="text-sm text-gray-600 leading-tight">{mode.description}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default CameraPrioritySelector;