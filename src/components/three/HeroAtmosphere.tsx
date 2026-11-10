'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Flowing harmonic point-wave representing live vocals and acoustic resonance
 * calibrated cleanly for our bright #FAF9F6 editorial paper surface.
 */
function AcousticWave({ isVisible }: { isVisible: boolean }) {
  const meshRef = useRef<THREE.Points>(null);
  const cols = 44;
  const rows = 18;
  const total = cols * rows;

  const basePositions = useMemo(() => {
    const arr = new Float32Array(total * 3);
    let idx = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        arr[idx++] = (x - cols / 2) * 0.24;
        arr[idx++] = 0;
        arr[idx++] = (z - rows / 2) * 0.24;
      }
    }
    return arr;
  }, [cols, rows, total]);

  const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

  useFrame((state) => {
    if (!meshRef.current || !isVisible) return;
    const t = state.clock.elapsedTime * 0.75;
    const posAttr = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    let idx = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        const y =
          Math.sin(x * 0.28 + t) * 0.28 +
          Math.cos(z * 0.4 + t * 0.85) * 0.16;
        array[idx * 3 + 1] = y;
        idx++;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points
      ref={meshRef}
      position={[0.6, -1.25, -1.2]}
      rotation={[0.42, -0.22, 0.08]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={total}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#01402B"
        size={0.028}
        transparent
        opacity={0.22}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Dual-tone ambient gold & forest particles reacting to pointer parallax.
 */
function AmbientParticles({
  count,
  color,
  size,
  opacity,
  speed,
  isVisible,
}: {
  count: number;
  color: string;
  size: number;
  opacity: number;
  speed: number;
  isVisible: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (pseudoRandom(i * 3 + 1) - 0.5) * 11;
      pos[i3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 6.5;
      pos[i3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 4;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !isVisible) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.position.y = Math.sin(t * 0.35 + speed * 10) * 0.14;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

function StageRig({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  useFrame((state) => {
    const { camera } = state;
    camera.position.x += (mousePos.current.x * 0.35 - camera.position.x) * 0.03;
    camera.position.y += (-mousePos.current.y * 0.22 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

const HeroAtmosphere = React.memo(function HeroAtmosphere() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(mq.matches);
    syncMotion();

    function handleMouseMove(e: MouseEvent) {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function handleVisibility() {
      setIsVisible(!document.hidden);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    mq.addEventListener('change', syncMotion);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      mq.removeEventListener('change', syncMotion);
    };
  }, []);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
        }}
        dpr={[1, 1.5]}
      >
        <StageRig mousePos={mousePos} />
        <AcousticWave isVisible={isVisible} />
        <AmbientParticles
          count={90}
          color="#B88F36"
          size={0.042}
          opacity={0.38}
          speed={0.025}
          isVisible={isVisible}
        />
        <AmbientParticles
          count={75}
          color="#01402B"
          size={0.034}
          opacity={0.28}
          speed={-0.018}
          isVisible={isVisible}
        />
      </Canvas>
    </div>
  );
});

export default HeroAtmosphere;
