'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d1f18',
          color: '#f5f5f5',
          textAlign: 'center',
          padding: '24px',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <div style={{
            fontSize: '4rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #c9a962, #8b4513)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            خطا
          </div>
          <h1 style={{ color: '#c9a962', fontWeight: 300, marginBottom: '16px', fontSize: '1.5rem' }}>
            Critical Error
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 400, marginBottom: '32px', lineHeight: 1.6 }}>
            The application encountered a critical error.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '12px 32px',
              background: '#c9a962',
              color: '#0d1f18',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
          {error.digest && (
            <p style={{ color: 'rgba(255,255,255,0.2)', marginTop: '32px', fontSize: '0.75rem' }}>
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
