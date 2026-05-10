'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const TRACKED_KEY = 'hikmatia_tracked';

export default function VisitorTracker() {
  const pathname = usePathname();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    const alreadyTracked = sessionStorage.getItem(TRACKED_KEY);
    if (alreadyTracked) return;

    sessionStorage.setItem(TRACKED_KEY, '1');

    fetch('/api/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {
      // Silently fail — tracking is non-critical
    });
  }, [pathname]);

  return null;
}
