import { useState, useEffect } from 'react';

// Persists state in the browser's localStorage. Data stays on this device only.
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: keep working in memory.
    }
  }, [key, value]);

  return [value, setValue];
}
