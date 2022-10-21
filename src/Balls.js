import { MathUtils } from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance } from "@react-three/drei";
import useStore from "./useStore";
import { useSpring } from "react-spring";

const particles = Array.from({ length: 30 }, () => ({
  factor: MathUtils.randInt(1, 2),
  speed: MathUtils.randFloat(1, 4),
  xFactor: MathUtils.randFloatSpread(5),
  yFactor: MathUtils.randFloatSpread(5),
  zFactor: MathUtils.randFloatSpread(5),
}));

function Balls() {
  const isOpen = useStore((state) => state.isOpen);
  const hoverFactor = useStore((state) => state.hoverFactor);

  const textGradientRef = useRef();
  const ref = useRef();
  const { alpha } = useSpring({
    alpha: isOpen ? 0.1 : 0.6,
  });
  useFrame((state, delta) => {
    void (ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      (-1 * Math.PI) / 6,
      2.75,
      delta
    ));
    if (!isOpen) {
      textGradientRef.current.color.g = 1 - hoverFactor;
      textGradientRef.current.color.r = 1 - hoverFactor;
      textGradientRef.current.color.b = 0;
    }

    textGradientRef.current.opacity = MathUtils.mapLinear(
      hoverFactor,
      0.3,
      1,
      0.5,
      0.75
    );

    if (isOpen) {
      textGradientRef.current.color.g = 0.1;
    }
    ref.current.scale.set(
      Math.max(hoverFactor, 0.5) * 1.75,
      Math.max(hoverFactor, 0.5) * 1.75,
      Math.max(hoverFactor, 0.5) * 1.75
    );
  });
  return (
    <Instances
      transparent={true}
      limit={particles.length}
      ref={ref}
      position={[0, 1, 0]}
    >
      <sphereGeometry args={[0.11, 32, 32]} />
      <ambientLight />
      <meshStandardMaterial
        transparent={true}
        opacity={0.1}
        color="black"
        flatShading={true}
        ref={textGradientRef}
      />
      {particles.map((data, i) => (
        <Ball key={i} {...data} />
      ))}
    </Instances>
  );
}

function Ball({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 5);
    ref.current.scale.setScalar(Math.max(1.5, Math.cos(t) * 2));
    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
    );
  });
  return <Instance ref={ref} />;
}

export default Balls;
