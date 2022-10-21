import React, { useRef, useState, useEffect } from "react";
import { LayerMaterial, Depth, Fresnel } from "lamina";
import { useFrame } from "@react-three/fiber";

const BoxMaterial = React.memo(() => {
  const ref = useRef();
  const [ticker, set] = useState(0);
  useFrame((state) => {
    const sin = Math.sin(state.clock.elapsedTime / 2);
    const cos = Math.cos(state.clock.elapsedTime / 2);
    ref.current.layers[0].origin.set(cos / 2, 0, 0);
    ref.current.layers[1].origin.set(cos, sin, cos);
    ref.current.layers[2].origin.set(sin, cos, sin);
    ref.current.layers[3].origin.set(cos, sin, cos);
  });
  useEffect(() => {
    const timer = setTimeout(changeTicker, 500);
    return () => clearTimeout(timer);
  });
  function changeTicker() {
    set(1);
  }
  return (
    <LayerMaterial ref={ref} toneMapped={false}>
      <Depth
        colorA="#ff0080"
        colorB="black"
        alpha={1}
        mode="normal"
        near={0.5 * 0.4}
        far={0.5}
        origin={[0, 0, 0]}
      />
      <Depth
        colorA="blue"
        colorB="#f7b955"
        alpha={1}
        mode="add"
        near={2 * 0.4}
        far={2}
        origin={[0, 1, 1]}
      />
      <Depth
        colorA="green"
        colorB="#f7b955"
        alpha={1}
        mode="add"
        near={3 * 0.4}
        far={3}
        origin={[0, 1, -1]}
      />
      <Depth
        colorA="white"
        colorB="red"
        alpha={1}
        mode="overlay"
        near={1.5 * 0.4}
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
  );
});

export default BoxMaterial;
