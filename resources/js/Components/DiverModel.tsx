import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

function DiverModel() {
    const obj = useLoader(OBJLoader, "/assets/scubadiver/Scuba_Diver.obj"); // Chemin vers votre fichier OBJ
    const material = new THREE.MeshStandardMaterial({
        color: "gray", // Couleur par défaut
        metalness: 0.3, // Réflectivité
        roughness: 0.7, // Rugosité
    });

    // Appliquer un matériau par défaut si aucune texture n'est fournie
    obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
                color: "gray", // Couleur par défaut
                metalness: 0.3, // Réflectivité
                roughness: 0.7, // Rugosité
            });
        }
    });

    return (
        <group scale={[0.1, 0.1, 0.1]} position={[0, -5, 0]}>
            <primitive object={obj}/>
        </group>
    );
}

export default DiverModel;
