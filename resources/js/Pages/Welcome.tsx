import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import OceanScene from "@/Components/OceanScene";

export default function Welcome() {
    return (
        <>
            <Head title="Echoes of Life" />
            <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
                <Navbar />
                <OceanScene />
            </div>
        </>
    );
}
