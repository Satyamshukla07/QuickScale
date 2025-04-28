import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: "up" | "down" | "none";
  isScrolled: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
}

export function useScrollPosition(scrollThreshold = 50): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: "none",
    isScrolled: false,
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const direction = scrollY > lastScrollY ? "down" : scrollY < lastScrollY ? "up" : "none";
      const isScrolled = scrollY > scrollThreshold;
      const isAtTop = scrollY <= 10;
      const isAtBottom = window.innerHeight + scrollY >= document.body.offsetHeight - 10;
      
      lastScrollY = scrollY;
      
      setScrollPosition({
        scrollY,
        scrollX,
        scrollDirection: direction,
        isScrolled,
        isAtTop,
        isAtBottom,
      });
    };

    // Initial check
    updateScrollPosition();

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [scrollThreshold]);

  return scrollPosition;
}

export default useScrollPosition;
