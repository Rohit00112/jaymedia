'use client';

import dynamic from 'next/dynamic';

const HeroAtmosphere = dynamic(
  () => import('@/components/three/HeroAtmosphere'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function HeroScene() {
  return (
    <ErrorBoundary>
      <HeroAtmosphere />
    </ErrorBoundary>
  );
}

// ─── Error Boundary for WebGL failures ─────────────────────
import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[HeroScene] WebGL error caught:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
