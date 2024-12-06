import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

function DiverModel() {
    // Charger le modèle et les textures
    const obj = useLoader(OBJLoader, "/assets/scubadiver/Scuba_Diver.obj");

    const [
        bodyColorMap,
        bodyMetallicMap,
        bodyRoughnessMap,
        bodyNormalMap,
        objectColorMap,
        objectMetallicMap,
        objectRoughnessMap,
        maskColorMap,
        maskMetallicMap,
        maskRoughnessMap,
        maskNormalMap,
    ] = useLoader(THREE.TextureLoader, [
        "/assets/scubadiver/Diver_Body_Color.png",
        "/assets/scubadiver/Diver_Body_Metalic.png",
        "/assets/scubadiver/Diver_Body_Roughness.png",
        "/assets/scubadiver/Diver_Body_Normals.png",
        "/assets/scubadiver/Diver_Objects_Color.png",
        "/assets/scubadiver/Diver_Objects_Metalic.png",
        "/assets/scubadiver/Diver_Objects_Roughness.png",
        "/assets/scubadiver/diving_mask_Color.png",
        "/assets/scubadiver/diving_mask_Metalic.png",
        "/assets/scubadiver/diving_mask_Roughness.png",
        "/assets/scubadiver/diving_mask_Normals.png",
    ]);

    // Charger une carte d'environnement pour ajouter des reflets réalistes
    const envMap = useLoader(THREE.TextureLoader, "/assets/industrial_sunset_02_puresky_4k.hdr");

    // Appliquer les matériaux aux différentes parties du modèle
    obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            // Détection des différentes parties du modèle
            if (mesh.name.includes("Body")) {
                mesh.material = new THREE.MeshStandardMaterial({
                    map: bodyColorMap,
                    color: "black",
                    metalnessMap: bodyMetallicMap,
                    roughnessMap: bodyRoughnessMap,
                    normalMap: bodyNormalMap,
                    envMap: envMap, // Carte d'environnement
                    envMapIntensity: 1.5,
                    emissive: new THREE.Color(0x333333), // Donne un effet brillant subtil
                    emissiveIntensity: 0.1,
                    metalness: 0.8,
                    roughness: 0.5,
                });
            } else if (mesh.name.includes("Object")) {
                mesh.material = new THREE.MeshStandardMaterial({
                    map: objectColorMap,
                    color: "blue",
                    metalnessMap: objectMetallicMap,
                    roughnessMap: objectRoughnessMap,
                    envMap: envMap, // Carte d'environnement
                    envMapIntensity: 1.2,
                    emissive: new THREE.Color(0x222222),
                    emissiveIntensity: 0.1,
                    metalness: 0.7,
                    roughness: 0.4,
                });
            } else if (mesh.name.includes("Mask")) {
                mesh.material = new THREE.MeshStandardMaterial({
                    map: maskColorMap,
                    color: "black",
                    metalnessMap: maskMetallicMap,
                    roughnessMap: maskRoughnessMap,
                    normalMap: maskNormalMap,
                    envMap: envMap, // Carte d'environnement
                    envMapIntensity: 1.3,
                    emissive: new THREE.Color(0x111111),
                    emissiveIntensity: 0.2,
                    metalness: 0.9,
                    roughness: 0.3,
                });
            } else {
                // Matériau par défaut pour les autres parties
                mesh.material = new THREE.MeshStandardMaterial({
                    color: "orange",
                    envMap: envMap,
                    envMapIntensity: 1.0,
                    metalness: 0.5,
                    roughness: 0.6,
                });
            }
        }
    });

    return (
        <group scale={[7, 7, 7]} position={[0, -5, 0]}>
            <primitive object={obj} />
        </group>
    );
}

export default DiverModel;
