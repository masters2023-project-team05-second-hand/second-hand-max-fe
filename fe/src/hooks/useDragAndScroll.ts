import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type ReturnType<T extends HTMLElement> = {
  ref: MutableRefObject<T | null>;
  onDragStart: (e: React.MouseEvent<T>) => void;
  onDragEnd: () => void;
  onDragMove: (e: React.MouseEvent<T>) => void;
};

export default function useDragAndScroll<
  T extends HTMLElement
>(): ReturnType<T> {
  const ref = useRef<T | null>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;

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

  const onDragStart = (e: React.MouseEvent<T>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + ref.current!.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<T>) => {
    if (isDrag) {
      ref.current!.scrollLeft = startX - e.pageX;
    }
  };

  return { ref, onDragStart, onDragEnd, onDragMove };
}
