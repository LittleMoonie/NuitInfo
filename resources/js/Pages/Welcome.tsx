import { Canvas } from "@react-three/fiber";
import { Head } from "@inertiajs/react";
import OceanScene from "@/Components/OceanScene";
import Navbar from "@/Components/Navbar";
import BoutonDown from "@/Components/BoutonDown";
import DiverModel from "@/Components/DiverModel";
import SimulationControls from "@/Components/SimulationControlsProps";
import { useState, useEffect, useRef } from "react";
import Bubbles from "@/Components/Bubbles";
import Particles from "@/Components/Particles";
import Fish from "@/Components/Fish";
import PollutionObject from "@/Components/PollutionObjects";

export default function Welcome() {
    const [oxygenLevel, setOxygenLevel] = useState(100); // 100% par défaut
    const [pollutionLevel, setPollutionLevel] = useState(0); // 0% par défaut
    const [pollutionObjects, setPollutionObjects] = useState<{ id: number }[]>([]); // Tableau d'objets avec id

    const handleSimulationChange = (params: { oxygenLevel: number; pollutionLevel: number }) => {
        setOxygenLevel(params.oxygenLevel);
        setPollutionLevel(params.pollutionLevel);
    };


    // Met à jour les objets pollution lorsque pollutionLevel change
    useEffect(() => {
        // Générer de nouveaux objets de pollution en fonction du niveau de pollution
        const newPollutionObjects: { id: number }[] = Array.from(
            { length: Math.ceil(pollutionLevel / 10) }, // Le nombre d'objets dépend du niveau de pollution
            () => ({ id: Math.random() }) // Chaque objet a un id unique
        );

        setPollutionObjects(newPollutionObjects);
    }, [pollutionLevel]); // Exécuté à chaque changement de pollutionLevel


    return (
        <>
            <Head title="Echoes of Life" />
            <div className="relative h-screen">
                <OceanScene />
                <Navbar />
                <BoutonDown scrollToId="next-section" label="Nageons!" />
            </div>
        {/* Section suivante */}
            <div
                id="next-section"
                className="h-screen bg-gradient-to-b from-blue-400 to-blue-900 flex flex-col items-center justify-center"
            >
                <h2 className="text-white text-4xl font-bold mb-8">Explorez les profondeurs</h2>
                <div className="w-full h-[600px]">
                    <Canvas camera={{ position: [0, 0, 10] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} />
                        <DiverModel />
                    </Canvas>
                </div>
            </div>
            <div
                id="simulation-section"
                className="h-screen bg-gradient-to-b from-blue-900 to-gray-900 flex flex-col items-center justify-center"
            >
                <h2 className="text-white text-4xl font-bold mb-4">Simulation Interactive</h2>
                <div className="w-full h-[600px] relative">
                    <Canvas camera={{ position: [0, 0, 20], fov: 50, near: 0.1, far: 1000 }}>
                    <ambientLight intensity={0.6} />
                        <directionalLight position={[10, 10, 5]} />
                        <Fish oxygenLevel={oxygenLevel} pollutionLevel={pollutionLevel} />
                        <Bubbles oxygenLevel={oxygenLevel} />
                        <Particles pollutionLevel={pollutionLevel} />
                        {/* Rendre les objets de pollution */}
                        {pollutionObjects.map((id, index) => (
                            <PollutionObject
                                key={index}
                                position={[Math.random() * 10 - 5, Math.random() * 10 - 5, 0]}
                            />
                        ))}
                    </Canvas>
                </div>
                <div className="mt-6 w-3/4 max-w-lg">
                    <SimulationControls onChange={handleSimulationChange} />
                </div>
            </div>
        </>
    );
}
