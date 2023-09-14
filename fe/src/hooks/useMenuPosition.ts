import { HEIGHT, WIDTH } from "@styles/constants";
import { MutableRefObject, useRef, useState } from "react";

type ReturnType = {
  ref: MutableRefObject<HTMLDivElement | null>;
  position: {
    top?: number | null;
    right?: number | null;
    bottom?: number | null;
    left?: number | null;
  };
  onClick: (e: React.MouseEvent) => void;
};

export default function useMenuPosition(): ReturnType {
  // Memo: marginY를 height값을 받아올 수 있음
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<ReturnType["position"]>({});

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const refPositionInfo = ref.current?.getBoundingClientRect();

    const HALF_OF_X = window.innerWidth / 2;
    const HALF_OF_PAGE = WIDTH.page / 2;

    const CLICK_X = e.clientX;
    const CLICK_Y = e.clientY;

    const isOverHalfOfX = CLICK_X > HALF_OF_X;
    const isOverY =
      CLICK_Y > window.innerHeight - (HEIGHT.menuMax + HEIGHT.navigationBar);

    const left = HALF_OF_X - HALF_OF_PAGE + WIDTH.menuMarginX;
    const right = HALF_OF_X - HALF_OF_PAGE + WIDTH.menuMarginX;
    const top = refPositionInfo!.top + HEIGHT.menuMarginY;
    const bottom =
      window.innerHeight -
      refPositionInfo!.bottom +
      (refPositionInfo!.height - refPositionInfo!.height + HEIGHT.menuMarginY);

    setPosition({
      left: isOverHalfOfX ? null : left,
      right: isOverHalfOfX ? right : null,
      top: isOverY ? null : top,
      bottom: isOverY ? bottom : null,
    });
  };

  return { ref, position, onClick };
}
