import { MutableRefObject, useEffect, useRef, useState } from "react";

type ScrollReturnType = {
  scrollY: number | undefined;
  ref: MutableRefObject<HTMLDivElement | null>;
};

export default function useScroll(): ScrollReturnType {
  const [scrollY, setScrollY] = useState<number | undefined>(0);
  const ref = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    setScrollY(ref.current?.scrollTop);
  };

  useEffect(() => {
    function watchScroll() {
      ref.current?.addEventListener("scroll", onScroll);
    }
    watchScroll();

    return () => {
      ref.current?.removeEventListener("scroll", onScroll);
    };
  });

  return {
    scrollY,
    ref,
  };
}
