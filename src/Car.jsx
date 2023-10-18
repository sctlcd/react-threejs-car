import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export function Car() {
  const meshModelPath = `${process.env.PUBLIC_URL}/models/`;
  const meshModelName  = "car.glb";
  const meshModelFile = meshModelPath + meshModelName;

  const mesh = useLoader(
    GLTFLoader,
    meshModelFile,
  ).scene;

  useEffect(() => {
    mesh.scale.set(0.0012, 0.0012, 0.0012);
    mesh.children[0].position.set(-365, -18, -67);
  }, [mesh]);

  return (
    <primitive object={mesh} rotation-y={Math.PI} />
  );
}