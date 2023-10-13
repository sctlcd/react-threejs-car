import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useEffect, useRef } from "react";
import { MeshReflectorMaterial  } from "@react-three/drei";
import { BufferAttribute } from "three";

export function Ground() {

  // Create a grid map texture component
  const gridTexturePath = `${process.env.PUBLIC_URL}/textures/`;
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
  const groundTexturePath = `${process.env.PUBLIC_URL}/textures/`;
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
  const alphaMapTexturePath = `${process.env.PUBLIC_URL}/textures/`;
  const alphaMapTextureFileName = "alpha-map.png";
  const alphaMapTextureFile = alphaMapTexturePath + alphaMapTextureFileName;
  // useLoader hook: used in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene
  // Automatically suspends the components until al the assets have been downloaded
  const alphaMap = useLoader(
    TextureLoader,
    alphaMapTextureFile
  );

  useEffect(() => {
    if (!gridMap) return;

    gridMap.anisotropy = 16;
  }, [gridMap]);

  const meshRef1 = useRef(null);
  const meshRef2 = useRef(null);

  useEffect(() => {
    if (!meshRef1.current) return;

    const uvs1 = meshRef1.current.geometry.attributes.uv.array;
    meshRef1.current.geometry.setAttribute("uv2", new BufferAttribute(uvs1, 2));
  
    const uvs2 = meshRef2.current.geometry.attributes.uv.array;
    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, []);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh>
      <mesh
        ref={meshRef1}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        
        <circleGeometry args={[6.12, 50]} />
        
        {/* Define meshRef1lectorMaterial. This material extends from THREE.MeshStandardMaterial and accepts all its props.
        https://github.com/pmndrs/drei#meshRef1lectormaterial */}
        <MeshReflectorMaterial 
        // props extended from from THREE.MeshStandardMaterial: https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
          aoMap={aoMap} // the red channel of this texture is used as the ambient occlusion map. Default is null. The aoMap requires a second set of uvs1.
          alphaMap={alphaMap} // grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque)
          transparent={true}
          color={[0.5, 0.5, 0.5]} // Color of the material, by default set to white (0xffffff).
          envMapIntensity={0.35} // Scales the effect of the environment map by multiplying its color.
          metalness={0.05} // How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is also provided, both values are multiplied.
          roughness={0.4} // How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse. Default is 1.0. If roughnessMap is also provided, both values are multiplied.
          dithering={true}

          // props from meshRef1lectorMaterial: https://github.com/pmndrs/drei#meshRef1lectormaterial
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          debug={0} // no debug
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
          />

      </mesh>
    </>
  );
}