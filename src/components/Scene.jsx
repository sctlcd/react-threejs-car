import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
import { Car } from "./Car";

export function Scene() {
  return (
    //<Suspense> is a first-party React component used to wrap other components 
    // that might make asynchronous requests. Any time a child component performs 
    // some action resulting in a loading state, such as a network request, a 
    // wrapping <Suspense> component can toggle its rendering to show a loading UI, 
    // like a <Spinner />
    <Suspense fallback={null}>
      
      {/* Define Environment map that it will use for any reflection calculations */}
      <Environment
        background={"both"} // can be true, false or "only" (which only sets the background) (default: false)
        files= {"envmap.hdr"} // {"HDR_Free_City_Night_Lights_Env.hdr"} //{"Zion_7_Sunsetpeek_Ref_blurred.hdr"} // {"envmap.hdr"}
        path={`${process.env.PUBLIC_URL}/textures/`}
        // blur={1} // blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        // near={1} 
        // far={1000} 
        // resolution={256}
        // // preset="forest"
        // ground={{
        //   height: 15, // Height of the camera that was used to create the env map (Default: 15)
        //   radius: 60, // Radius of the world. (Default 60)
        //   scale: 1000, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
        // }}
      />
      
      {/* Define PerspectiveCamera: this projection mode is designed to mimic the way the human eye sees */}
      {/* <PerspectiveCamera makeDefault position={[-1.5, 3, 6.21]} fov={74} /> */}
      {/* <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} /> */}
      <PerspectiveCamera makeDefault position={[2, 3, 8]} fov={25} />

      {/* Define Orbit controls: allow the camera to orbit around a target. */}
      {/* <OrbitControls target={[-2.2, -0.70, 0.01]} /> */}
      <OrbitControls target={[-2.64, -0.71, 0.03]} />

      <Ground />
      <Track />
      <Car />
    </Suspense>
  )
}