import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export function Ground() {

  // Create a grid map texture component
  const gridTexturePath = process.env.PUBLIC_URL + "/textures/";
  const gridTextureFileName = "grid.png";
  const gridTextureFile = gridTexturePath + gridTextureFileName;
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  // Automatically suspends the components until al the assets have been downloaded
  const gridMap = useLoader(
    TextureLoader,
    gridTextureFile
  );

  // Create a ground-ao texture component
  const groundTexturePath = process.env.PUBLIC_URL + "/textures/";
  const groundTextureFileName = "ground-ao.png";
  const groundTextureFile = groundTexturePath + groundTextureFileName;
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  // Automatically suspends the components until al the assets have been downloaded
  const aoMap = useLoader(
    TextureLoader,
    groundTextureFile
  );

  // Create a alpha map texture component
  const alphaMapTexturePath = process.env.PUBLIC_URL + "/textures/";
  const alphaMapTextureFileName = "alpha-map.png";
  const alphaMapTextureFile = alphaMapTexturePath + alphaMapTextureFileName;
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  // Automatically suspends the components until al the assets have been downloaded
  const alphaMap = useLoader(
    TextureLoader,
    alphaMapTextureFile
  );

  return (
    <mesh></mesh>
  );
}