import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Outline,
  Vignette,
} from "@react-three/postprocessing";
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

export default function WorkButton() {
  const ref = useRef();
  const groupRef = useRef();
  const setIsOpen = useStore((state) => state.setIsOpen);
  const isOpen = useStore((state) => state.isOpen);

  // let { gradient } = useControls({
  //   gradient: { value: 0.4, min: 0, max: 1 },
  // });

  const [isHovered, setIsHovered] = useState(false);
  const [gradient, setGradient] = useState(0.4);
  const { scaleX, scaleY, positionX, rotateY } = useSpring({
    scaleX: isOpen ? 22 : isHovered ? 0.4 : 1,
    scaleY: isOpen ? 22 : 1,
    positionX: isHovered ? 0.45 : 0.6,
    rotateY: isOpen ? Math.PI / 2 : 0,
    delay: isOpen ? 250 : 0,
    config: {
      mass: isHovered ? 5 : 1,
      tension: isHovered ? 300 : 170,
      friction: 26,
    },
  });

  // Animate gradient
  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2);
    const cos = Math.cos(state.clock.elapsedTime / 2);
    // Gradient animation on non-open state
    if (!isOpen) {
      ref.current.layers[0].origin.set(cos / 2, 0, 0);
      ref.current.layers[1].origin.set(cos, sin, cos);
      ref.current.layers[2].origin.set(sin, cos, sin);
      ref.current.layers[3].origin.set(cos, sin, cos);
    }
    if (isOpen) {
      console.log(ref.current.layers[0]);
      ref.current.layers[0].end = cos;
    }
    // Handle button hover
    groupRef.current.scale.x = scaleX.get();
    groupRef.current.position.x = positionX.get();
    groupRef.current.scale.y = scaleY.get();
    groupRef.current.rotation.y = rotateY.get();
  });

  return (
    <>
      <EffectComposer disableNormalPass={false}>
        <Noise opacity={0.5} />
      </EffectComposer>
      <group
        rotation={[0, 0, Math.PI]}
        position={[1, -0.5, 0.25]}
        ref={groupRef}
      >
        <mesh
          transparent={true}
          onClick={() => {
            if (!isOpen) {
              document.body.style.cursor = "auto";
              setIsHovered(false);
              setIsOpen(true);
            }
          }}
          onPointerEnter={() => {
            if (!isOpen) {
              document.body.style.cursor = "pointer";
              setIsHovered(true);
            }
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "auto";
            setIsHovered(false);
          }}
        >
          <boxGeometry args={[0.5, 0.4, 1]} />
          {!isOpen && (
            <LayerMaterial ref={ref} toneMapped={false}>
              <Depth
                colorA="#ff0080"
                colorB="black"
                alpha={1}
                mode="normal"
                near={0.5 * gradient}
                far={0.5}
                origin={[0, 0, 0]}
              />
              <Depth
                colorA="blue"
                colorB="#f7b955"
                alpha={1}
                mode="add"
                near={2 * gradient}
                far={2}
                origin={[0, 1, 1]}
              />
              <Depth
                colorA="green"
                colorB="#f7b955"
                alpha={1}
                mode="add"
                near={3 * gradient}
                far={3}
                origin={[0, 1, -1]}
              />
              <Depth
                colorA="white"
                colorB="red"
                alpha={1}
                mode="overlay"
                near={1.5 * gradient}
                far={1.5}
                origin={[1, -1, -1]}
              />
              <Fresnel
                mode="add"
                color="white"
                intensity={0.5}
                power={1.5}
                bias={0.05}
              />
            </LayerMaterial>
          )}
          {isOpen && (
            <LayerMaterial ref={ref} toneMapped={false}>
              <Gradient end={-0.4} colorA="orange" colorB="#FFF200" />
            </LayerMaterial>
          )}
          <Edges color="white" />
        </mesh>
      </group>
    </>
  );
}
