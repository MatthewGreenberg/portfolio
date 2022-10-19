import React, { useRef, useState } from "react";
import { GradientTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import WorkButton from "./WorkButton";
import { useSpring } from "react-spring";

const Scene = () => {
  const [clicked, setClicked] = useState(false);
  const groupRef = useRef();
  const { rotateY } = useSpring({
    rotateY: clicked ? -Math.PI / 2 : -Math.PI / 3,
  });
  useFrame(() => {
    groupRef.current.rotation.y = rotateY.get();
  });
  return (
    <group ref={groupRef} rotation={[Math.PI / 5, -Math.PI / 3, Math.PI / 2]}>
      <WorkButton setClicked={setClicked} clicked={clicked} />
      <gridHelper
        args={[20, 40, "red", "#555555"]}
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh position={[-0.5, 0, 0]} rotation={[0, Math.PI / 2, Math.PI]}>
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.5, 1]} // As many stops as you want
            colors={["black", "white", "black"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};

export default Scene;
