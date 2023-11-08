const debug = false;

export const WheelDebug = ({ radius, wheelRef }) => {
  return debug && (
    <group ref={wheelRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
      {/* // args: [radiusTop, radiusBottom, height, number of segmented faces around the circumference of the cylinder] */}
        <cylinderGeometry args={[radius, radius, 0.015, 16]} />
        <meshNormalMaterial transparent={true} opacity={0.25} />
      </mesh>
    </group>
  );
};