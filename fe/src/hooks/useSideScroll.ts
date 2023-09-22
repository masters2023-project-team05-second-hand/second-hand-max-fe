import { useRef, useEffect } from "react";

export default function useSideScroll() {
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const isScrollable = e.deltaY !== 0;
      if (!isScrollable) return;

      element.scrollTo({
        left: element.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };
    element.addEventListener("wheel", onWheel);

    return () => {
      element.removeEventListener("wheel", onWheel);
    };
  }, []);

  return scrollRef;
}
