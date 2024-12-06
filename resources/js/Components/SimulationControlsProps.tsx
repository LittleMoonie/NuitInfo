import React, { useState } from "react";

interface SimulationControlsProps {
    onChange: (params: { oxygenLevel: number; pollutionLevel: number }) => void;
}

export default function SimulationControls({ onChange }: SimulationControlsProps) {
    const [oxygenLevel, setOxygenLevel] = useState(100);
    const [pollutionLevel, setPollutionLevel] = useState(0);

    const handleOxygenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setOxygenLevel(value);
        onChange({ oxygenLevel: value, pollutionLevel });
    };

    const handlePollutionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setPollutionLevel(value);
        onChange({ oxygenLevel, pollutionLevel: value });
    };

    return (
        <div className="flex flex-col items-center gap-4 bg-gray-900 p-4 rounded-lg shadow-lg w-80">
            <div>
                <label className="text-white block mb-2 text-lg">Niveau d'Oxygène</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={oxygenLevel}
                    onChange={handleOxygenChange}
                    className="w-full appearance-none bg-blue-600 rounded-lg h-2"
                />
                <p className="text-white mt-1 text-center">{oxygenLevel}%</p>
            </div>
            <div>
                <label className="text-white block mb-2 text-lg">Niveau de Pollution</label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={pollutionLevel}
                    onChange={handlePollutionChange}
                    className="w-full appearance-none bg-red-600 rounded-lg h-2"
                />
                <p className="text-white mt-1 text-center">{pollutionLevel}%</p>
            </div>
        </div>

    );
}
