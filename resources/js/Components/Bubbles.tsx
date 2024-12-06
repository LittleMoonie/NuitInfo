import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Bubbles({ oxygenLevel }: { oxygenLevel: number }) {
    const group = useRef<THREE.Group>(null);

    useFrame(() => {
        if (group.current) {
            group.current.children.forEach((child) => {
                child.position.y += 0.02; // Les bulles montent
                if (child.position.y > 5) child.position.y = -5; // Réinitialisation
            });
        }
    });

    const bubbles = Array.from({ length: Math.ceil(oxygenLevel / 5) }).map((_, i) => (
        <mesh key={i} position={[Math.random() * 10 - 5, Math.random() * -5, Math.random() * 10 - 5]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color="white" opacity={0.8} transparent />
        </mesh>
    ));


    return <group ref={group}>{bubbles}</group>;
}

export default Bubbles;
