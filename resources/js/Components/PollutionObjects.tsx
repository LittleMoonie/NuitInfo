import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function PollutionObject({ position }: { position: [number, number, number] }) {
    const obj = useLoader(FBXLoader, "/assets/trashes/plastic-water-bottle/Plastic Water Bottle .fbx");
    const ref = useRef<THREE.Group>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.position.y -= 0.02; // Descente lente
            if (ref.current.position.y < -10) {
                ref.current.position.y = 10; // Réinitialise en haut de l'écran
                ref.current.position.x = Math.random() * 10 - 5; // Nouvelle position aléatoire en X
            }
        }
    });

    return <primitive ref={ref} object={obj} position={position} scale={[0.5, 0.5, 0.5]} />;
}

export default PollutionObject;
