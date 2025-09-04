import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to debounce form updates and prevent input lag
 * @param onUpdate - Function to call when form data changes
 * @param delay - Debounce delay in milliseconds (default: 150ms)
 */
export const useDebouncedFormUpdates = <T>(
  onUpdate: (data: T) => void,
  delay: number = 150
) => {
  const updateTimeoutRef = useRef<number>();

  // Debounced update function
  const debouncedUpdate = useCallback((values: T) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    updateTimeoutRef.current = setTimeout(() => {
      onUpdate(values);
    }, delay) as unknown as number;
  }, [onUpdate, delay]);

  // Force immediate update (useful when navigating or submitting)
  const forceUpdate = useCallback((values: T) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    onUpdate(values);
  }, [onUpdate]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return {
    debouncedUpdate,
    forceUpdate
  };
};