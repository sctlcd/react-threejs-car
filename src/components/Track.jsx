import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three/src/loaders/TextureLoader';


export function Track() {

  // Create a Model component
  const modelsFolderPath = `${process.env.PUBLIC_URL}/models/`;
  const modelFileName = "track.glb";
  const modelFilePath = `${modelsFolderPath}${modelFileName}`;
  
  // useLoader hook:  in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene.
  // Automatically suspends the components until al the assets have been downloaded
  const result = useLoader(
    GLTFLoader,
    modelFilePath
  );

  // Create a Texture component
  const textureFolderPath = `${process.env.PUBLIC_URL}/textures/`;
  const textureFileName = "track.png";
  const textureFilePath = `${textureFolderPath}${textureFileName}`;
  
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  // Automatically suspends the components until al the assets have been downloaded
  const colorMap = useLoader(
    TextureLoader,
    textureFilePath
  );

  // useEffect hook: synchronizes a component with an external system - 
  // The component needs to do something after render. By default, 
  // it runs both after the first render and after every update
  // Subscribes to the track colorMap changes and runs on the first render and
  // any time the track colorMap changes.
  useEffect(() => {
    // anisotropy: improving quality of the texture when looking at it at grazing angles
    colorMap.anisotropy = 16;
  }, [colorMap])

  const geometry = result.scene.children[0].geometry;

  return(
    // mesh is given a geometry and a material as a child
    <mesh>

      {/* geometry */}
      {/* Primitive construct: take an already existing geometry object and
      assign it as a property of the mesh */}
      {/* same as doing: mesh.geometry = geometry */}
      <primitive 
        object={geometry} 
        attach={"geometry"} />
      
      {/* material */}
      <meshBasicMaterial
        toneMapped={false}
        map={colorMap} // The color map.
      />

    </mesh>
  );
}