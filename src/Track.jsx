import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export function Track() {
  // Create a Model component
  const modelPath = process.env.PUBLIC_URL + "/models/";
  const modelFileName = "track.glb";
  const trackModelFile = modelPath + modelFileName;
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  const result = useLoader(
    GLTFLoader,
    trackModelFile
  );

  // Create a Texture component
  const texturePath = process.env.PUBLIC_URL + "/models/";
  const textureFileName = "track.glb";
  const trackTextureFile = texturePath + textureFileName;
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  const colorMap = useLoader(
    TextureLoader,
    trackTextureFile
  );

  // useEffect hook:  synchronize a component with an external system - 
  // The component needs to do something after render. By default, 
  // it runs both after the first render and after every update
  // Subscribes to the track colorMap changes and runs on the first render and
  // any time the track colorMap changes.
  useEffect(() => {
    // anisotropy: improving quality of the texture when looking at it at grazing angles
    colorMap.anisotropy = 16;
  }, [colorMap])

  return(
    // mesh is given a geometry and a material as a child
    <mesh>
      {/* geometry */}
      {/* material */}
    </mesh>
  );
}