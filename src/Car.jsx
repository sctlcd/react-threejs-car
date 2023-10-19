import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Car() {
  const modelsFolderPath = `${process.env.PUBLIC_URL}/models/`;
  const modelFileName  = "peugeot_205_gti.glb";
  const modelFilePath = `${modelsFolderPath}${modelFileName}`;

  const mesh = useLoader(
    GLTFLoader,
    modelFilePath,
  ).scene;

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
    <primitive object={mesh} rotation-y={Math.PI} />
  );
}