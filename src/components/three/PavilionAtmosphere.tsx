'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 19.31 + 41.17) * 43758.5453;
  return x - Math.floor(x);
}

function GoldStageDust({ isVisible }: { isVisible: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 110;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (pseudoRandom(i * 3 + 11) - 0.5) * 10;
      pos[i3 + 1] = (pseudoRandom(i * 3 + 12) - 0.5) * 6;
      pos[i3 + 2] = (pseudoRandom(i * 3 + 13) - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current || !isVisible) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D9B15B"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

function PavilionRing({ isVisible }: { isVisible: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current || !isVisible) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.18 + 1.05;
  });

  return (
    <mesh ref={ringRef} position={[-2.2, 0.2, -1.5]}>
      <torusGeometry args={[2.1, 0.012, 16, 80]} />
      <meshBasicMaterial color="#D9B15B" transparent opacity={0.18} />
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
        <PavilionRing isVisible={isVisible} />
        <GoldStageDust isVisible={isVisible} />
      </Canvas>
    </div>
  );
});

export default PavilionAtmosphere;

