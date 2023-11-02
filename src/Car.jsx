import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from "@react-three/cannon";

export function Car() {
  const modelsFolderPath = `${process.env.PUBLIC_URL}/models/`;
  const modelFileName  = "peugeot_205_gti.glb";
  const modelFilePath = `${modelsFolderPath}${modelFileName}`;

  const mesh = useLoader(
    GLTFLoader,
    modelFilePath,
  ).scene;

  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null),
  );

  useEffect(() => {
    // car.glb
    // mesh.scale.set(0.0012, 0.0012, 0.0012); 
    // mesh.children[0].position.set(-365, -18, -67);
    
    // 65_chevy_malibu.glb
    // mesh.scale.set(0.08, 0.08, 0.08); 
    // mesh.children[0].position.set( 10, 0, 0);
    
    // peugeot_205_gti.glb
    mesh.scale.set(0.2, 0.2, 0.2); 
    mesh.children[0].position.set( 1, 0.4, 0);
  }, [mesh]);

  return (
    // <primitive object={mesh} rotation-y={Math.PI} />
    <mesh ref={chassisBody}>
      <meshBasicMaterial transparent={true} opacity={0.3} />
      <boxGeometry args={chassisBodyArgs} />
    </mesh>
  );
}