import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Bounds,
  Edges,
  Text,
  MeshWobbleMaterial,
} from "@react-three/drei";
// use ↓ "DebugLayerMaterial as LayerMaterial" ↓ here for integrated leva debug panels
import { LayerMaterial, Depth, Fresnel } from "lamina";
import { useControls } from "leva";
import { useSpring } from "react-spring";
import useStore from "./useStore";

export default function WorkButton({ setClicked, clicked }) {
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
    scaleX: clicked ? 22 : isHovered ? 0.4 : 1,
    scaleY: clicked ? 22 : 1,
    positionX: isHovered ? 0.45 : 0.6,
    rotateY: clicked ? Math.PI / 2 : 0,
    delay: clicked ? 250 : 0,
  });

  // Animate gradient
  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2);
    const cos = Math.cos(state.clock.elapsedTime / 2);
    if (!clicked) {
      ref.current.layers[0].origin.set(cos / 2, 0, 0);
      ref.current.layers[1].origin.set(cos, sin, cos);
      ref.current.layers[2].origin.set(sin, cos, sin);
      ref.current.layers[3].origin.set(cos, sin, cos);
    }
    // Handle button hover
    groupRef.current.scale.x = scaleX.get();
    groupRef.current.position.x = positionX.get();
    groupRef.current.scale.y = scaleY.get();
    groupRef.current.rotation.y = rotateY.get();
  });

  return (
    <group rotation={[0, 0, Math.PI]} position={[1, -0.5, -0]} ref={groupRef}>
      {/* <Text
        rotation={[Math.PI, Math.PI / 2, Math.PI]}
        color={"black"}
        position={[0.28, -0.2, 0.1]}
        scale={[2, 2, 2]}
      >
        Work
      </Text> */}
      <mesh
        onClick={() => {
          document.body.style.cursor = "auto";
          setIsOpen(!isOpen);
          setClicked(!clicked);
        }}
        onPointerEnter={() => {
          if (!clicked) {
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
        {!clicked && (
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
        {clicked && <meshBasicMaterial color="yellow" />}
        <Edges color="white" />
      </mesh>
    </group>
  );
}
