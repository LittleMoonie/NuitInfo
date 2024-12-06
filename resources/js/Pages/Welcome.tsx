import { Canvas } from "@react-three/fiber";
import { Head } from "@inertiajs/react";
import OceanScene from "@/Components/Ocean/OceanScene";
import Navbar from "@/Components/Navbar";
import BoutonDown from "@/Components/BoutonDown";
import SimulationControls from "@/Components/SimulationControlsProps";
import { useState, useEffect, useRef } from "react";
import Bubbles from "@/Components/Bubbles";
import Particles from "@/Components/Particles";
import Fish from "@/Components/Fish";
import PollutionObject from "@/Components/PollutionObjects";
import DiverModel from "@/Components/Diver/DiverModel";
import Footer from "@/Components/Footer/Footer";
import Modal from "@/Components/Modal";
export default function Welcome() {
    const [modalData, setModalData] = useState<{ title: string; description: string } | null>(null);

    const handlePointClick = (data: { title: string; description: string }) => {
        setModalData(data);
    };

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
            <Head title="Echoes of Life"/>

            {/* Hero Section */}
            <header className="relative h-screen w-full overflow-hidden flex flex-col">
                {/* Ocean background */}
                <div className="absolute inset-0">
                    <OceanScene/>
                </div>

                {/* Transparent overlay gradient to blend into next section */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#3a9ed9] opacity-90"/>

                {/* Navbar (no absolute positioning, just normal flow) */}
                <div className="z-10 w-full">
                    <Navbar/>
                </div>

                {/* Scroll down button centered at bottom */}
                <div className="z-20 flex-grow flex items-end justify-center pb-10">
                    <BoutonDown scrollToId="next-section" label="Nageons!"/>
                </div>
            </header>

            {/* Diver Section */}
            <main
                id="next-section"
                className="relative h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-[#3a9ed9] to-[#1f6fb2]"

            >
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 text-center">
                    Explorez les profondeurs
                </h2>
                <div className="w-full h-2/3 max-w-4xl flex items-center justify-center">
                    <Canvas camera={{ position: [0, 0, 15] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} />
                        <DiverModel onPointClick={handlePointClick} />
                    </Canvas>
                </div>
            </main>

            {/* Modale HTML */}
            {modalData && (
                <div
                    style={{
                        position: "fixed", // Utiliser fixed pour centrer la modale
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                        pointerEvents: "auto", // Permet l'interaction
                    }}
                >
                    <Modal onClose={() => setModalData(null)}>
                        <h2>{modalData.title}</h2>
                        <p>{modalData.description}</p>
                    </Modal>
                </div>
            )}

            <div
                id="simulation-section"
                className="h-screen bg-gradient-to-b from-[#1f6fb2] to-gray-900 flex flex-col items-center justify-center"
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
            {/* Footer Section */}
            <footer
                className="relative w-full bg-gray-900 "

            >
                <div className="w-full flex flex-col justify-center">
                    <Footer/>
                </div>
            </footer>

        </>
    );
}
