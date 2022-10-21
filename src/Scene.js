import React, { useRef } from "react";
import { GradientTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import WorkButton from "./WorkButton";
import { useSpring } from "react-spring";
import useStore from "./useStore";
import Balls from "./Balls";

const Scene = () => {
  const isOpen = useStore((state) => state.isOpen);
  const groupRef = useRef();
  const { rotateY } = useSpring({
    rotateY: isOpen ? -Math.PI / 2 : -Math.PI / 3,
  });
  useFrame(() => {
    groupRef.current.rotation.y = rotateY.get();
  });
  return (
    <group ref={groupRef} rotation={[Math.PI / 5, -Math.PI / 3, Math.PI / 2]}>
      <WorkButton />
      <Balls />
      <gridHelper
        args={[20, 40, "red", "#555555"]}
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, Math.PI]}>
        <planeGeometry args={[25, 25, 10, 10]} />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.5, 1]} // As many stops as you want
            colors={["orange", "blue", "orange"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};

export default Scene;
