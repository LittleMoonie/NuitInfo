import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Fish({ oxygenLevel, pollutionLevel }: { oxygenLevel: number; pollutionLevel: number }) {
    const group = useRef<THREE.Group>(null);

    useFrame(() => {
        if (group.current) {
            group.current.children.forEach((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const speed = oxygenLevel / 100;
                    child.position.x += speed * 0.05;
                    if (pollutionLevel > 50) {
                        child.position.y += (Math.random() - 0.5) * (pollutionLevel / 100) * 0.05;
                    }
                    if (child.position.x > 15) child.position.x = -15;
                    if (oxygenLevel <= 0) {
                        child.position.y -= 0.01;
                    }
                }
            });
        }
    });
    const fishColors = ["orange", "blue", "green", "red"];

    const fish = Array.from({ length: 30 }).map((_, i) => (
        <mesh
            key={i}
            position={[
                Math.random() * 20 - 10,
                Math.random() * 6 - 3,
                Math.random() * 2 - 1,
            ]}
        >
            <sphereGeometry args={[1, 16, 16]}/>
            <meshStandardMaterial color={fishColors[i % fishColors.length]}/>
        </mesh>
    ));

    return <group ref={group}>{fish}</group>;
}

export default Fish;
