import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

function App() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 600],
        zoom: 200,
      }}
    >
      <Scene />
    </Canvas>
  );
}

export default App;
