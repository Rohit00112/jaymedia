'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Calm daylight architectural floor wireframe + 3D ring rendered at subtle opacity
 * along inner page headers and studio inquiry bands without distracting from typography.
 */
function StageBlueprintPlane({ isVisible }: { isVisible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!isVisible) return;
    const t = state.clock.elapsedTime;

    if (meshRef.current) {
      const pos = meshRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z =
          Math.sin(x * 0.45 + t * 0.35) * 0.14 +
          Math.cos(y * 0.55 - t * 0.28) * 0.1;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.25) * 0.08;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[0, -1.55, -2.1]}
        rotation={[-Math.PI / 2.25, 0, 0]}
      >
        <planeGeometry args={[18, 8, 36, 16]} />
        <meshBasicMaterial
          color="#01402B"
          wireframe
          transparent
          opacity={0.075}
        />
      </mesh>

      <mesh ref={ringRef} position={[3.2, 0.4, -2.5]}>
        <torusGeometry args={[1.6, 0.008, 12, 96]} />
        <meshBasicMaterial color="#C89B3C" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

const PavilionAtmosphere = React.memo(function PavilionAtmosphere() {
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(mq.matches);
    syncMotion();

    const onVis = () => setIsVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    mq.addEventListener('change', syncMotion);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      mq.removeEventListener('change', syncMotion);
    };
  }, []);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
      >
        <StageBlueprintPlane isVisible={isVisible} />
      </Canvas>
    </div>
  );
});

export default PavilionAtmosphere;
