import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useWheels } from "../hooks/useWheels";
import { WheelDebug } from "./WheelDebug";

export function Car() {
  const modelsFolderPath = `${process.env.PUBLIC_URL}/models/`;
  const modelFileName  = "peugeot_205_gti.glb";
  const modelFilePath = `${modelsFolderPath}${modelFileName}`;

  // useLoader hook:  in React Three Fiber to pre-cache any assets
  // in memory, such as images or 3D models for later use in the scene.
  // Automatically suspends the components until al the assets have been downloaded
  const mesh = useLoader(
    GLTFLoader,
    modelFilePath,
  ).scene;

  /***************************************************************************** car building
  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  // useCannon hooks of useBox
  // create a box
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    // useRef React Hook that lets you reference a value that’s not needed for rendering
    // Changing a ref does not trigger a re-render. This means refs are perfect for 
    // storing information that doesn’t affect the visual output of your component.
    useRef(null),
  );

  // useWheels hook 
  // create wheels
  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  // RaycastVehicule cannon-es: https://pmndrs.github.io/cannon-es/docs/classes/RaycastVehicle.html
  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null),
  );

  /**********************************************************************************/

  // useEffect hook: synchronizes a component with an external system - 
  // The component needs to do something after render. By default, 
  // it runs both after the first render and after every update
  // Subscribes to the car mesh changes and runs on the first render and
  // any time the car mesh changes.
  useEffect(() => {
    if (!mesh) return;

    // car.glb
    // mesh.scale.set(0.0012, 0.0012, 0.0012); 
    // mesh.children[0].position.set(-365, -18, -67);
    
    // 65_chevy_malibu.glb
    // mesh.scale.set(0.08, 0.08, 0.08); 
    // mesh.children[0].position.set( 10, 0, 0);
    
    // peugeot_205_gti.glb
    mesh.scale.set(0.2, 0.2, 0.2); 
    // mesh.children[0].position.set( 1, 0.4, 0);
    mesh.children[0].position.set(-4, 0.37, -11);
  }, [mesh]);

  return (
    <primitive object={mesh} rotation-y={Math.PI/1.5} />
  );

  /********************************************************************************** car building
  // return ( 
  //   <group ref={vehicle} name="vehicle">
  //     /* Primitive construct: take an already existing mesh object and */
  //     /* assign it as a property of the mesh */
  //     /* <primitive object={mesh} rotation-y={Math.PI} /> */
  //     <mesh ref={chassisBody}>
  //       <meshBasicMaterial transparent={true} opacity={0.3} />
  //       <boxGeometry args={chassisBodyArgs} />
  //     </mesh>

  //     <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
  //     <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
  //     <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
  //     <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
  //   </group>
  // );
}
  