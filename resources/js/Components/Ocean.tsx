import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import {CubeCamera} from "@react-three/drei";

function Ocean() {
    const ref = useRef<THREE.Mesh>(null);

    // Charger les textures
    const [colorMap, normalMap, displacementMap] = useLoader(THREE.TextureLoader, [
        "/assets/Water_001_COLOR.jpg",   // Couleur
        "/assets/Water_001_NORM.jpg",    // Normales
        "/assets/Water_001_DISP.png",    // Déplacement
    ]);

    useEffect(() => {
        if (ref.current) {
            const geometry = ref.current.geometry as THREE.PlaneGeometry;
            const position = geometry.attributes.position;
            const vertices = position.array as Float32Array;

            const animate = () => {
                const time = performance.now() * 0.001; // Temps pour l'animation

                for (let i = 0; i < vertices.length; i += 3) {
                    // Ajoutez un effet sinusoïdal pour l'animation des vagues
                    vertices[i + 2] =
                        Math.sin(vertices[i] * 0.1 + time) * 1.5 +
                        Math.cos(vertices[i + 1] * 0.2 + time * 0.5) * 0.8;
                }

                position.needsUpdate = true; // Met à jour la géométrie
                requestAnimationFrame(animate);
            };

            animate();
        }
    }, []);

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Géométrie du plan */}
            <planeGeometry args={[50, 50, 256, 256]}/>

            {/* Matériau avec les textures */}
            <meshStandardMaterial
                map={colorMap} // Couleur de base
                normalMap={normalMap} // Carte de normales
                displacementMap={displacementMap} // Carte de déplacement
                displacementScale={2} // Augmentez pour des vagues plus hautes
                roughness={0.2} // Réduisez pour rendre l'eau plus lisse
                metalness={0.5} // Ajoutez un effet de réflexion métallique
                envMapIntensity={1} // Renforcez l'éclairage par l'environnement
            />
            <CubeCamera resolution={256} frames={Infinity}>
                {(texture) => (
                    <>
                        <meshStandardMaterial
                            map={colorMap}
                            normalMap={normalMap}
                            envMap={texture}
                            metalness={0.7}
                            roughness={0.2}
                        />
                    </>
                )}
            </CubeCamera>
        </mesh>

    );
}

export default Ocean;
