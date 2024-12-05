import React from "react";
import {Canvas} from "@react-three/fiber";
import {Sky, OrbitControls} from "@react-three/drei";
import { Environment } from "@react-three/drei";
import Ocean from "./Ocean"; // Importez le composant Ocean
import { CubeCamera } from "@react-three/drei";


export default function OceanScene() {
    return (
        <Canvas
            camera={{ position: [0, 10, 30], fov: 75 }}
            style={{ backgroundColor: "#87CEEB" }}
        >
        <ambientLight intensity={0.3}/>
            <directionalLight
                position={[10, 10, 10]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <Sky
                sunPosition={[10, 15, -10]}
                turbidity={8}
                rayleigh={3}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
            />

            <Ocean/>
            {/* Soleil */}
            <mesh position={[0, 10, -30]}>
                <sphereGeometry args={[3, 32, 32]}/>
                <meshStandardMaterial color="orange" emissive="orange"/>
            </mesh>

        </Canvas>
    );
}
