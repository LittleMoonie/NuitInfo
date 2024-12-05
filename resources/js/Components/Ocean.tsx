import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { CubeCamera } from "@react-three/drei";

function Ocean() {
    const ref = useRef<THREE.Mesh>(null);

    // Charger les textures de l'eau
    const [colorMap, displacementMap, normalMap, roughnessMap] = useLoader(THREE.TextureLoader, [
        "/assets/Water_001_COLOR.jpg",   // Texture de couleur
        "/assets/Water_001_DISP.png",    // Carte de déplacement
        "/assets/Water_001_NORM.jpg",    // Carte de normales
        "/assets/Water_002_ROUGH.jpg",   // Carte de rugosité
    ]);

    useEffect(() => {
        if (ref.current) {
            const geometry = ref.current.geometry as THREE.PlaneGeometry;
            const position = geometry.attributes.position;
            const vertices = position.array as Float32Array;

            const animate = () => {
                const time = performance.now() * 0.001;

                for (let i = 0; i < vertices.length; i += 3) {
                    vertices[i + 2] =
                        Math.sin(vertices[i] * 0.1 + time) * 1.5 +
                        Math.cos(vertices[i + 1] * 0.2 + time * 0.5) * 0.8;
                }

                position.needsUpdate = true;
                requestAnimationFrame(animate);
            };

            animate();
        }
    }, []);

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Géométrie */}
            <planeGeometry args={[300, 300, 256, 256]}/>

            {/* CubeCamera pour les reflets */}
            <CubeCamera resolution={256} frames={Infinity}>
                {(texture) => (
                    <meshStandardMaterial
                        map={colorMap}
                        normalMap={normalMap}
                        displacementMap={displacementMap}
                        displacementScale={2}
                        roughness={0.1}
                        metalness={0.9}
                        envMap={texture}
                    />
                )}
            </CubeCamera>
            <meshStandardMaterial
                map={colorMap} // Texture de couleur
                displacementMap={displacementMap} // Carte de déplacement
                displacementScale={1.5} // Réduisez pour éviter des vagues trop abruptes
                normalMap={normalMap} // Carte de normales
                roughnessMap={roughnessMap} // Carte de rugosité
                roughness={0.1} // Réduction pour rendre l'eau plus réfléchissante
                metalness={0.8} // Augmentation pour des reflets intenses
                envMapIntensity={1.5} // Améliore la réflexion de l'environnement
                transparent={true}
                opacity={0.95} // Légère transparence pour un effet aquatique
            />

        </mesh>
    );
}

export default Ocean;
