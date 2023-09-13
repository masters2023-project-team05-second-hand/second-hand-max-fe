import { useState } from "react";
import Menu from "./Menu";
import { MenuIndicatorProps } from "./type";
import useMenuPosition from "@hooks/useMenuPosition";

export default function MenuIndicator({
  itemList,
  withShadow,
  ...props
}: MenuIndicatorProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ref, position, onClick: calcPosition } = useMenuPosition();

  const toggleModal = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        calcPosition(e);
        toggleModal();
      }}>
      {props.children}
      {isMenuOpen && (
        <Menu
          itemList={itemList}
          withShadow={withShadow}
          position={position}
          closeMenuHandler={toggleModal}
        />
      )}
    </div>
  );
}
