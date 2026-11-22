'use client';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Group, MathUtils, TextureLoader } from 'three';
import { useEffect, useRef } from 'react';

import { PassLighting } from './pass-lighting.client';
import { PassSleeveGeometry } from './pass-sleeve-geometry';
import { compileClearSleeve } from './pass-sleeve-transmission';

const SleeveGeometry = extend(PassSleeveGeometry);

function PassMesh() {
  const front = useLoader(TextureLoader, '/pass-front.jpg');

  return (
    <mesh>
      <boxGeometry args={[1.4, 1.8, 0.02]} />
      <meshStandardMaterial attach="material-0" color="#596b80" />
      <meshStandardMaterial attach="material-1" color="#596b80" />
      <meshStandardMaterial attach="material-2" color="#596b80" />
      <meshStandardMaterial attach="material-3" color="#596b80" />
      <meshBasicMaterial attach="material-4" map={front} />
      <meshStandardMaterial attach="material-5" color="#a0b8d4" />
    </mesh>
  );
}

function PassModel() {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);

  const canvas = useThree((state) => state.gl.domElement);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    pitch: number;
    yaw: number;
  } | null>(null);

  useFrame((_, delta) => {
    const rotation = group.current?.rotation;
    if (!rotation || drag.current) return;

    elapsed.current += delta;

    const t = elapsed.current;
    const idlePitch = -0.15 + Math.sin(t * 0.8) * 0.08;
    const idleYaw = 0.22 + Math.sin(t * 0.65) * 0.16;
    const fullTurn = 2 * Math.PI;
    const targetYaw =
      idleYaw + Math.round((rotation.y - idleYaw) / fullTurn) * fullTurn;

    rotation.x = MathUtils.damp(rotation.x, idlePitch, 7, delta);
    rotation.y = MathUtils.damp(rotation.y, targetYaw, 7, delta);
  });

  useEffect(() => {
    function move(event: PointerEvent) {
      const start = drag.current;
      const rotation = group.current?.rotation;
      if (!start || !rotation || event.pointerId !== start.id) return;

      rotation.y = start.yaw + (event.clientX - start.x) * 0.014;
      rotation.x = MathUtils.clamp(
        start.pitch + (event.clientY - start.y) * 0.007,
        -0.7,
        0.7,
      );
    }

    function end(event: PointerEvent) {
      if (drag.current?.id === event.pointerId) drag.current = null;
    }

    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('lostpointercapture', end);

    return () => {
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', end);
      canvas.removeEventListener('pointercancel', end);
      canvas.removeEventListener('lostpointercapture', end);
    };
  }, [canvas]);

  return (
    <group
      ref={group}
      onPointerDown={(event) => {
        const rotation = group.current?.rotation;
        if (!rotation || drag.current || !event.isPrimary || event.button !== 0)
          return;

        event.stopPropagation();
        canvas.setPointerCapture(event.pointerId);

        drag.current = {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          pitch: rotation.x,
          yaw: rotation.y,
        };
      }}
    >
      <PassMesh />

      <mesh>
        <SleeveGeometry />
        <meshPhysicalMaterial
          iridescence={0.35}
          iridescenceThicknessMaximum={280}
          transmission={1}
          opacity={1}
          roughness={0.09}
          ior={1.47}
          premultipliedAlpha
          onBeforeCompile={compileClearSleeve}
        />
      </mesh>
    </group>
  );
}

export const PassScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }} className='touch-pinch-zoom'>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={2} position={[3, 4, 5]} />
      <PassLighting />
      <PassModel />
    </Canvas>
  );
};
