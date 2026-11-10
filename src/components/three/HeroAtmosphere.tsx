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
 * 3D undulating wireframe stage terrain + harmonic point field
 */
function AcousticTopology({ isVisible }: { isVisible: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !isVisible) return;
    const t = state.clock.elapsedTime * 0.65;
    const pos = meshRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.42 + t) * 0.32 +
        Math.cos(y * 0.48 - t * 0.8) * 0.22;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0.4, -1.5, -1.8]}
      rotation={[-Math.PI / 2.4, 0, -0.14]}
    >
      <planeGeometry args={[18, 9, 44, 22]} />
      <meshBasicMaterial
        color="#01402B"
        wireframe
        transparent
        opacity={0.085}
      />
    </mesh>
  );
}

/**
 * Sculptural 3D orbital acoustic rings rotating in 3D space
 */
function OrbitalStageRings({ isVisible }: { isVisible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!isVisible) return;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.position.y =
        0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.22;
      innerRef.current.rotation.z -= delta * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x -= delta * 0.14;
      outerRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0.25, -1.6]}>
      <mesh ref={outerRef}>
        <torusGeometry args={[2.15, 0.008, 12, 96]} />
        <meshBasicMaterial color="#01402B" transparent opacity={0.18} />
      </mesh>
      <mesh ref={innerRef} rotation={[0.6, 0.4, 0]}>
        <torusGeometry args={[1.55, 0.007, 12, 80]} />
        <meshBasicMaterial color="#C89B3C" transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[1.1, -0.5, 0.3]}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial
          color="#01402B"
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>
    </group>
  );
}

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
      pos[i3] = (pseudoRandom(i * 3 + 1) - 0.5) * 12;
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
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
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

function StageRig({
  mousePos,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  useFrame((state) => {
    const { camera } = state;
    camera.position.x += (mousePos.current.x * 0.55 - camera.position.x) * 0.04;
    camera.position.y += (-mousePos.current.y * 0.35 - camera.position.y) * 0.04;
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
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
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
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <StageRig mousePos={mousePos} />
        <AcousticTopology isVisible={isVisible} />
        <OrbitalStageRings isVisible={isVisible} />
        <AmbientParticles
          count={85}
          color="#B88F36"
          size={0.04}
          opacity={0.35}
          speed={0.025}
          isVisible={isVisible}
        />
        <AmbientParticles
          count={70}
          color="#01402B"
          size={0.032}
          opacity={0.25}
          speed={-0.018}
          isVisible={isVisible}
        />
      </Canvas>
    </div>
  );
});

export default HeroAtmosphere;
