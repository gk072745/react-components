import { useCallback, useEffect, useRef, useState } from 'react';

// Hook that uses a hidden 1rem element to derive px/rem and helpers
export function useRemIndicator() {
  const [remToPixel, setRemToPixel] = useState(16);
  const remIndicatorRef = useRef(null);

  const calculateRemValue = useCallback(() => {
    const el = remIndicatorRef.current;
    if (el && el.offsetWidth) setRemToPixel(el.offsetWidth);
  }, []);

  const convertRemToPixels = useCallback((rem) => {
    if (typeof rem !== 'number' || Number.isNaN(rem)) return 0;
    return rem * remToPixel;
  }, [remToPixel]);

  const convertPixelsToRem = useCallback((px) => {
    if (typeof px !== 'number' || Number.isNaN(px) || remToPixel === 0) return 0;
    return px / remToPixel;
  }, [remToPixel]);

  useEffect(() => {
    calculateRemValue();
    window.addEventListener('resize', calculateRemValue);
    return () => window.removeEventListener('resize', calculateRemValue);
  }, [calculateRemValue]);

  // Consumers should render an element like:
  // <div ref={remIndicatorRef} style={{ position:'absolute', visibility:'hidden', width:'1rem', height:0, overflow:'hidden' }} />
  return {
    remToPixel,
    remIndicatorRef,
    convertRemToPixels,
    convertPixelsToRem,
  };
}


