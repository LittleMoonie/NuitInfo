import React, { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

function DiverModel() {
    const obj = useLoader(OBJLoader, "/assets/scubadiver/Scuba_Diver.obj");

    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: "gray",
            metalness: 0.3,
            roughness: 0.7,
        });
    }, []);

    // Apply the memoized material to each mesh in the OBJ
    obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = material;
        }
    });

    return (
        <group scale={[1, 1, 1]} position={[0, 0, 0]}>
            <primitive object={obj} />
        </group>
    );
}

export default DiverModel;
