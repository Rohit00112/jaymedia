'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Calm daylight architectural floor wireframe rendered at subtle opacity
 * along the lower studio inquiry band without distracting from typography.
 */
function StageBlueprintPlane({ isVisible }: { isVisible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !isVisible) return;
    const t = state.clock.elapsedTime;
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
  });

  return (
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
        opacity={0.055}
      />
    </mesh>
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
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        dpr={[1, 1.4]}
      >
        <StageBlueprintPlane isVisible={isVisible} />
      </Canvas>
    </div>
  );
});

export default PavilionAtmosphere;

