import React, { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three-stdlib";
import * as THREE from "three";

interface DiverModelProps {
    onPointClick: (data: { title: string; description: string }) => void;
}

function DiverModel({ onPointClick }: DiverModelProps) {
    const obj = useLoader(OBJLoader, "/assets/scubadiver/Scuba_Diver.obj");

    // Load textures
    const bodyColorMap = useLoader(THREE.TextureLoader, "/assets/scubadiver/Diver_Body_Color.png");

    // Apply materials to the model
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

    // Interactive points related to body parts linked to ocean exploration
    const points = [
        {
            position: [0, 1.75, 0],
            title: "Head",
            description: "The head, like the surface of the ocean, watches over the vast blue, symbolizing how human awareness is deeply connected to the health of the ocean, echoing the role of coral reefs in supporting marine biodiversity."
        },
        {
            position: [0.5, 1.4, 0],
            title: "Right Arm",
            description: "The right arm represents the human interaction with the marine environment, akin to the hands of conservationists working to protect ecosystems like mangroves and seagrass meadows that nurture marine life."
        },
        {
            position: [-0.5, 1.4, 0],
            title: "Left Arm",
            description: "The left arm balances the flow of the body, mirroring how ecosystems like kelp forests and estuaries act as stabilizers in the ocean, balancing biodiversity and the health of the seas."
        },
        {
            position: [0.1, 0.5, 0],
            title: "Right Leg",
            description: "The right leg powers forward like the movement of ocean currents, transporting nutrients and supporting life, akin to how migratory species such as whales travel to different ecosystems, helping maintain marine balance."
        },
        {
            position: [-0.1, 0.5, 0],
            title: "Left Leg",
            description: "The left leg works in harmony with the right, like the synchronized swimming of schooling fish, embodying the essential symbiosis of ocean ecosystems and the way species cooperate for survival."
        },
        {
            position: [0, 1.2, 0],
            title: "Lungs",
            description: "The lungs, like the ocean’s vast oxygen production systems, breathe life into the body, reflecting how phytoplankton and marine plants contribute to global oxygen supply and help maintain ecological balance."
        },
        {
            position: [0.1, 1.2, 0.5],
            title: "Heart",
            description: "The heart, like the ocean's currents, pumps life through the body, mirroring the crucial nutrient cycles that circulate throughout the ocean, nourishing ecosystems from the smallest plankton to the largest whales."
        },
        {
            position: [-0.1, 1, 0.5],
            title: "Blood",
            description: "The blood mirrors the water cycle of the ocean, circulating nutrients and sustaining life, reflecting the interconnectivity of aquatic ecosystems where water carries vital resources to diverse marine organisms."
        },
        {
            position: [0, 1.1, 0.5],
            title: "Spine",
            description: "The spine is the central axis of the body, like the ocean’s deep ridges and trenches, serving as a support for life, just as the structure of the ocean floor supports a wide array of biodiversity."
        },
        {
            position: [0.75, 1.4, 0],
            title: "Right Hand",
            description: "The right hand reaches into the water like a diver exploring coral reefs, embodying humanity’s role in restoring and protecting ecosystems, from coral restoration to sustainable fishing practices."
        },
        {
            position: [-0.75, 1.4, 0],
            title: "Left Hand",
            description: "The left hand, like the delicate interaction between species in a mangrove forest, plays a subtle but essential role in maintaining balance, representing the interconnectedness of all marine life."
        },
        {
            position: [0.2, 0.1, 0.5],
            title: "Right Foot",
            description: "The right foot, like the tail of a sea turtle, propels the diver through the water, symbolizing the role of ocean currents in moving nutrients and maintaining the diversity and health of marine habitats."
        },
        {
            position: [-0.2, 0.1, 0.5],
            title: "Left Foot",
            description: "The left foot works with grace, much like the fins of a manta ray, gliding through the water and embodying the harmony of ecological balance, supporting the smooth movement of species across the ocean’s depths."
        }
    ];



    return (
        <group scale={[8, 8, 8]} position={[0, -7, 0]}>
            <primitive object={obj} />

            {/* Interactive points */}
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
