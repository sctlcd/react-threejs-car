import "./assets/style/index.css";
// package that provides client-specific methods used for initializing an app on the client
import { createRoot } from "react-dom/client";
// React renderer for three.js
import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { Physics } from "@react-three/cannon";

// create a React root for displaying content inside a browser DOM element
createRoot(document.getElementById("root")).render(
    // The Canvas object is your portal into Threejs. It renders Threejs elements, not DOM elements!
    // The Canvas object is where you start to define your React Three Fiber Scene.
    // All three.js scripts should be wrap under the canvas component 
    // since we can't use @react-three/fiber hooks outside of canvas (Scene component, etc.)
    <Canvas>
      {/* create a physics world */}
      <Physics
        broadphase="SAP"
        gravity={[0, -2.6, 0]}
      >
        {/* Define Scene that will be used to place objects */}
        <Scene />
      </Physics>
    </Canvas>
);