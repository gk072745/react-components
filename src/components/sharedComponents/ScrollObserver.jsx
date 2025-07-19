import { useEffect, useRef, useCallback, useMemo } from 'react';

const ScrollObserver = ({ onScrolledToEnd = () => {}, threshold = 0.1, rootMargin = '0px' }) => {
  const observerRef = useRef(null);
  const rootRef = useRef(null);

  // Memoize the callback to prevent unnecessary re-renders
  const memoizedCallback = useCallback(
    ([entry]) => {
      if (entry && entry.isIntersecting) {
        onScrolledToEnd();
      }
    },
    [onScrolledToEnd]
  );

  // Memoize observer options for better performance
  const observerOptions = useMemo(
    () => ({
      threshold,
      rootMargin,
      root: null, // Use viewport as root
    }),
    [threshold, rootMargin]
  );

  useEffect(() => {
    // Create observer with memoized callback and options
    observerRef.current = new IntersectionObserver(memoizedCallback, observerOptions);

    const currentRoot = rootRef.current;
    if (currentRoot) {
      observerRef.current.observe(currentRoot);
    }

    // Cleanup function to disconnect observer
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [memoizedCallback, observerOptions]);

  return (
    <div
      ref={rootRef}
      className="scroll-observer"
      style={{
        height: '1px',
        width: '100%',
        pointerEvents: 'none', // Prevents interference with user interactions
      }}
      aria-hidden="true" // Accessibility: screen readers should ignore this element
    />
  );
};

export default ScrollObserver;
