
import React, {useMemo, useRef} from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import {useThree} from "react-three-fiber";
import * as THREE from "three";
import {Effects as EffectsComposer} from "@react-three/drei/core/Effects";


export const Effects = () => {
    const { size, scene, camera } = useThree();
    const aspect = useMemo(
        () => new THREE.Vector2(size.width, size.height),
        [size]
    );

    return (
        <EffectsComposer
            multisamping={8}
            renderIndex={1}
            disableGamma
            disableRenderPass

        >
            <renderPass attachArray="passes" scene={scene} camera={camera} />
            <unrealBloomPass attachArray="passes" args={[aspect, 0.4, 1, 0]} />
        </EffectsComposer>
    );
};

export default function MAINLOGO({colorF, colorA,...props}) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/logo_complete.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow geometry={nodes.Extrude1.geometry} >
        <meshStandardMaterial attach='material' color={colorF}/>
          <Effects/>
      </mesh>
      <mesh castShadow geometry={nodes.Extrude.geometry}  >
        <meshStandardMaterial attach='material' color={colorA}/>
          <Effects/>
      </mesh>
      
    </group>
  )
}

useGLTF.preload('/logo_complete.gltf')
