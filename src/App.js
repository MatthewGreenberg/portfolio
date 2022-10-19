import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import WorkButton from "./WorkButton";
import Scene from "./Scene";

function App() {
  return (
    <Canvas
      // orthographic
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 600],
        zoom: 200,
      }}
    >
      {/* <OrbitControls /> */}
      <Scene />
    </Canvas>
  );
}

export default App;
