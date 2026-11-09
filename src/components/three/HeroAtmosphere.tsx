'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Particle System ───────────────────────────────────────
function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // Generate random particle positions in a sphere volume
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a wide, shallow volume
      pos[i3] = (Math.random() - 0.5) * 10; // x
      pos[i3 + 1] = (Math.random() - 0.5) * 6; // y
      pos[i3 + 2] = (Math.random() - 0.5) * 4; // z
    }
    return pos;
  }, [count]);

  // Track mouse position for subtle camera shift
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    function handleVisibility() {
      setIsVisible(!document.hidden);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Animate particles with subtle floating movement
  useFrame((state, delta) => {
    if (!pointsRef.current || !isVisible) return;

    const time = state.clock.elapsedTime;

    // Gentle rotation
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.01;

    // Subtle floating effect
    pointsRef.current.position.y = Math.sin(time * 0.3) * 0.15;

    // Mouse-responsive shift on the camera group
    const { camera } = state;
    camera.position.x += (mousePos.current.x * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (-mousePos.current.y * 0.2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#F5F2EC"
        size={0.025}
        sizeAttenuation
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

// ─── Hero Atmosphere Canvas ────────────────────────────────
const HeroAtmosphere = React.memo(function HeroAtmosphere() {
  const [count, setCount] = useState(150);

  useEffect(() => {
    // Reduce particle count on mobile
    if (window.innerWidth < 768) {
      setCount(50);
    }
  }, []);

  return (
    <div
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'low-power',
        }}
        dpr={[1, 1.5]}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
});

export default HeroAtmosphere;
