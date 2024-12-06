import { Canvas } from "@react-three/fiber";
import { Head } from "@inertiajs/react";
import OceanScene from "@/Components/Ocean/OceanScene";
import Navbar from "@/Components/Navbar";
import BoutonDown from "@/Components/BoutonDown";
import DiverModel from "@/Components/Diver/DiverModel";
import Footer from "@/Components/Footer/Footer";

export default function Welcome() {
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
                className="relative h-screen w-full flex flex-col justify-center items-center"
                style={{
                    background: "linear-gradient(to bottom, #3a9ed9 0%, #1f6fb2 100%)",
                }}
            >
                <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 text-center">
                    Explorez les profondeurs
                </h2>
                <div className="w-full h-2/3 max-w-4xl flex items-center justify-center">
                    <Canvas camera={{position: [0, 0, 10]}}>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10, 10, 5]}/>
                        <DiverModel/>
                    </Canvas>
                </div>
            </main>

            {/* Footer Section */}
            <footer
                className="relative w-full"
                style={{
                    background: "linear-gradient(to bottom, #1f6fb2 0%, #FFB266 40%, #FFB266 100%)",
                }}
            >
                <div className="w-full flex flex-col justify-center">
                    <Footer/>
                </div>
            </footer>
        </>
    );
}
