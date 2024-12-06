import React, { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

interface DiverModelProps {
    onPointClick: (data: { title: string; description: string }) => void;
}

function DiverModel({ onPointClick }: DiverModelProps) {
    const obj = useLoader(OBJLoader, "/assets/scubadiver/Scuba_Diver.obj");

    // Charger les textures
    const bodyColorMap = useLoader(THREE.TextureLoader, "/assets/scubadiver/Diver_Body_Color.png");

    // Appliquer les matériaux au modèle
    obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.name.includes("Body")) {
                mesh.material = new THREE.MeshStandardMaterial({
                    map: bodyColorMap,
                    metalness: 0.5,
                    roughness: 0.6,
                });
            }
        }
    });

    // Points interactifs
    const points = [
        { position: [0, 1.7, 0], title: "Tête", description: "Voici la tête du plongeur." },
        { position: [0.5, 1.4, 0], title: "Bras droit", description: "Voici le bras droit." },
        { position: [-0.5, 1.4, 0], title: "Bras gauche", description: "Voici le bras gauche." },
    ];

    return (
        <group scale={[8, 8, 8]} position={[0, -7, 0]}>
            <primitive object={obj} />

            {/* Points interactifs */}
            {points.map((point, index) => (
                <mesh
                    key={index}
                    position={point.position as [number, number, number]}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        (e.target as any).scale.set(1.2, 1.2, 1.2);
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation();
                        (e.target as any).scale.set(1, 1, 1);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onPointClick({ title: point.title, description: point.description });
                    }}
                >
                    <sphereGeometry args={[0.05, 15, 15]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            ))}
        </group>
    );
}

export default DiverModel;
