import React from "react";
import {Canvas} from "@react-three/fiber";
import {Sky, OrbitControls} from "@react-three/drei";
import { Environment } from "@react-three/drei";
import Ocean from "./Ocean";


export default function OceanScene() {
    return (
        <Canvas
            camera={{position: [0, 10, 30], fov: 75}}
            style={{backgroundColor: "#000"}}
        >
            {/* Lumières */}
            <directionalLight
                position={[0, 30, -50]}
                intensity={2}
                color="orange"
                castShadow
            />
            <ambientLight intensity={0.5}/>

            <Environment
                files="/assets/industrial_sunset_02_puresky_4k.hdr" // Chemin du fichier HDR
                background
            />

            {/* Sky pour ajuster les nuances */}
            <Sky
                sunPosition={[0, 5, -100]}
                turbidity={8}
                rayleigh={1}
                mieCoefficient={0.005}
                mieDirectionalG={0.9}
            />


            <Ocean/>
            {/* Soleil */}
            <mesh position={[0, 10, -350]}>
                <sphereGeometry args={[100, 64, 64]}/>
                <meshStandardMaterial
                    emissive="#FF5733" // Couleur chaude pour le soleil
                    emissiveIntensity={5} // Intensité pour le rendre brillant
                    color="#FF4500"
                    roughness={0.1}
                    metalness={0.9}
                />
            </mesh>


        </Canvas>
    );
}
