import React, { Suspense } from "react";
import "./index.scss";
// import components
import ErrorBoundary from "../ErrorBoundary";

// import for 3d
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={500}
      height={500}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={500}
      height={500}
      intensity={brightness}
      color={color}
      position={[2, 1, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}

function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={500}
      height={500}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 180, 0]}
      castShadow
    />
  );
}

const ModelViewer = ({
  modelPath = "",
  errorMessageComponent = (
    <div className="model_not_valid_error d-flex align-items-center justify-content-center flex-wrap">
      <h4 className="mt-2 mb-2 text-white text-center fw-bold fst-italic">
        Not a Valid Type
      </h4>
    </div>
  ),
  style = {},
}) => {
  const Model = () => {
    if (modelPath && modelPath.length > 0) {
      const gltf = useLoader(GLTFLoader, modelPath);
      gltf.scene.clone(true);
      return (
        <>
          <primitive object={gltf.scene} scale={1} />
        </>
      );
    }
    return <></>;
  };

  // const Spinner = () => {
  //   return (
  //     <mesh
  //       animations={[THREE.AnimationClip.findByName(mesh.animations, "dance")]}
  //     >
  //       <boxGeometry attach="geometry" args={[1, 1, 1]} />
  //       <meshStandardMaterial attach="material" transparent opacity={0.5} />
  //     </mesh>
  //   );
  // };

  return (
    <ErrorBoundary messageComponent={errorMessageComponent}>
      <Canvas className="model_preview_container" style={style}>
        <Suspense fallback={null}>
          <Model />
          <OrbitControls />
          <FillLight brightness={2} color={"#FFFFFF"} />
          {/* <KeyLight brightness={2} color={"#FFFFFF"} /> */}
          {/* <RimLight brightness={2} color={"#FFFFFF"} /> */}
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};

export default ModelViewer;
