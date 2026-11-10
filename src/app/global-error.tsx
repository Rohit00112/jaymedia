'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Root Layout Crash]:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: '#ffffff',
          color: '#111815',
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div
          style={{
            maxWidth: '480px',
            width: '100%',
            textAlign: 'center',
            border: '1px solid #e6e9e7',
            borderRadius: '16px',
            padding: '36px 28px',
            backgroundColor: '#f8f9f8',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '6px 12px',
              borderRadius: '9999px',
              backgroundColor: '#eaf2ee',
              color: '#01402b',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            System Exception
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 700,
              lineHeight: 1.2,
              margin: '0 0 12px 0',
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#5c6862',
              lineHeight: 1.6,
              margin: '0 0 24px 0',
            }}
          >
            An unexpected error occurred while loading the application.
          </p>

          {error?.digest && (
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                color: '#5c6862',
                backgroundColor: '#ffffff',
                border: '1px solid #e6e9e7',
                borderRadius: '6px',
                padding: '6px 10px',
                marginBottom: '24px',
                display: 'inline-block',
              }}
            >
              Digest: {error.digest}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                backgroundColor: '#01402b',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
            <Link
              href="/"
              style={{
                backgroundColor: '#ffffff',
                color: '#111815',
                border: '1px solid #e6e9e7',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Return to Safety
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

