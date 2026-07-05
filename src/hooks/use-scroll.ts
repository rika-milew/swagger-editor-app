import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 20;

export function useScroll(threshold = SCROLL_THRESHOLD): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll: () => void = () => {
      setScrolled(window.scrollY > threshold);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return (): void => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
