import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import * as THREE from "three";
import {
  useGLTF,
  Bounds,
  Edges,
  Text,
  MeshWobbleMaterial,
} from "@react-three/drei";
// use ↓ "DebugLayerMaterial as LayerMaterial" ↓ here for integrated leva debug panels
import { LayerMaterial, Depth, Fresnel, Gradient, Normal } from "lamina";
import { useControls } from "leva";
import { useSpring } from "react-spring";
import useStore from "./useStore";
import BoxMaterial from "./BoxMaterial";

export default function WorkButton() {
  const ref = useRef();
  const groupRef = useRef();
  const textGradientRef = useRef();
  const setIsOpen = useStore((state) => state.setIsOpen);
  const setHoverFactor = useStore((state) => state.setHoverFactor);

  const isOpen = useStore((state) => state.isOpen);
  const [isHovered, setIsHovered] = useState(false);

  const { scaleX, scaleY, positionX, rotateY, alphaText } = useSpring({
    scaleX: isOpen ? 22 : isHovered ? 0.4 : 1,
    scaleY: isOpen ? 22 : 1,

    positionX: isHovered ? 0.45 : 0.6,
    alphaText: isHovered ? 1 : 1,

    rotateY: isOpen ? Math.PI / 2 : 0,
    delay: isOpen ? 250 : 0,

    onStart: () => (document.body.style.pointerEvents = "none"),
    onEnd: () => (document.body.style.pointerEvents = "auto"),
    config: {
      mass: isHovered ? 5 : 1,
      tension: isHovered ? 300 : 170,
      friction: 26,
    },
  });

  const { ballsAlpha } = useSpring({
    ballsAlpha: isHovered ? 1 : 0.3,
  });

  // Animate gradient
  useFrame((state) => {
    // Handle button hover
    groupRef.current.scale.x = scaleX.get();
    groupRef.current.position.x = positionX.get();
    groupRef.current.scale.y = scaleY.get();
    groupRef.current.rotation.y = rotateY.get();
    if (!isOpen) {
      textGradientRef.current.alpha = alphaText.get();
    }
    setHoverFactor(ballsAlpha.get());
  });

  return (
    <>
      {!isOpen && (
        <group rotation={[0, 0, Math.PI]} position={[1, -0.5, 0.25]}>
          <Text
            position={[1, 0.2, -0.23]}
            fontSize={0.3}
            rotation={[-Math.PI / 2, -Math.PI / 2, Math.PI / 2]}
          >
            <LayerMaterial ref={ref} toneMapped={true}>
              <Gradient
                ref={textGradientRef}
                end={-0.4}
                colorA="orange"
                colorB="deeppink"
                alpha={0.2}
              />
            </LayerMaterial>
            Explore
          </Text>
        </group>
      )}
      <group
        rotation={[0, 0, Math.PI]}
        position={[1, -0.5, 0.25]}
        ref={groupRef}
      >
        <pointLight intensity={10} position={[0, 0, 0]} color="pink" />
        <mesh
          onClick={() => {
            if (isOpen) return;
            document.body.style.cursor = "auto";
            setIsHovered(false);
            setIsOpen(true);
          }}
          onPointerEnter={() => {
            // If the about pain is not open, update hover state
            if (isOpen) return;
            document.body.style.cursor = "pointer";
            setIsHovered(true);
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "auto";
            setIsHovered(false);
          }}
        >
          <boxGeometry args={[0.5, 0.4, 1]} />
          {!isOpen && <BoxMaterial />}
          {isOpen && <meshStandardMaterial color="yellow" />}
        </mesh>
      </group>
    </>
  );
}
