import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import OceanScene from "@/Components/OceanScene";
import BoutonDown from "@/Components/BoutonDown";
import DiverModel from "@/Components/DiverModel";

export default function Welcome() {
    return (
        <>
            <Head title="Echoes of Life"/>
            <div className="relative h-screen">
                <OceanScene/>
                <Navbar/>
                <BoutonDown scrollToId="next-section" label="Nageons!"/>
            </div>
            {/* Section suivante */}
            <div id="next-section"
                className="h-screen bg-gradient-to-b from-blue-400 to-blue-900 flex flex-col items-center justify-center">
                <h2 className="text-white text-4xl font-bold mb-8">Explorez les profondeurs</h2>
                <div className="w-full h-[600px]">
                    <DiverModel />
                </div>
            </div>
        </>
    );
}
