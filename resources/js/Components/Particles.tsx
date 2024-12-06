import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ pollutionLevel }: { pollutionLevel: number }) {
    const group = useRef<THREE.Group>(null);

    useFrame(() => {
        if (group.current) {
            group.current.children.forEach((child) => {
                child.rotation.x += 0.01;
                child.rotation.y += 0.01;
            });
        }
    });

    const particles = Array.from({ length: pollutionLevel / 10 }).map((_, i) => (
        <mesh key={i} position={[Math.random() * 10 - 5, Math.random() * 5 - 2.5, Math.random() * 10 - 5]}>
            <boxGeometry args={[0.9, 0.3, 0.3]} />
            <meshStandardMaterial color="green" />
        </mesh>
    ));

    return <group ref={group}>{particles}</group>;
}

export default Particles;
