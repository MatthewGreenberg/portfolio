import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Outline,
  Vignette,
} from "@react-three/postprocessing";
import { useStore } from "zustand";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
function App() {
  // const isOpen = useStore((state) => state.isOpen);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 600],
        zoom: 200,
      }}
    >
      <PerformanceMonitor
        onDecline={(e) => console.log(e, "decline")}
        onIncline={(e) => console.log(e, "incline")}
      />
      <EffectComposer disableNormalPass={false}>
        <Noise opacity={0.5} />
      </EffectComposer>
      <Scene />
    </Canvas>
  );
}

export default App;
