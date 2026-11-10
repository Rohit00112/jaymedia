'use client';

import dynamic from 'next/dynamic';
import { Component, type ReactNode } from 'react';

const PavilionAtmosphere = dynamic(
  () => import('@/components/three/PavilionAtmosphere'),
  {
    ssr: false,
    loading: () => null,
  }
);

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function PavilionScene() {
  return (
    <SceneErrorBoundary>
      <PavilionAtmosphere />
    </SceneErrorBoundary>
  );
}
