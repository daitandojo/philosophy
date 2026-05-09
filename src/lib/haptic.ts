const hapticQueue: number[] = [];

function flushHaptic() {
  if (hapticQueue.length > 0 && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    const pattern = hapticQueue.shift()!;
    navigator.vibrate(pattern);
  }
}

export function triggerHaptic(pattern: number) {
  hapticQueue.push(pattern);
  if (hapticQueue.length === 1) {
    flushHaptic();
  }
}
