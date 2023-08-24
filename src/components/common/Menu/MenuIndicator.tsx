import useDropdown from "@hooks/useDropdown";
import { ReactNode } from "react";
import { styled } from "styled-components";
import Menu from "./Menu";
import { ItemProps } from "./MenuItem";

type MenuIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  itemList: ItemProps[];
  withShadow?: boolean;
  position?: "left" | "right";
};

export default function MenuIndicator({
  children,
  itemList,
  withShadow,
  position,
}: MenuIndicatorProps) {
  const [menuIsOpen, menuRef, setMenuState] = useDropdown(false);

  return (
    <>
      <StyledMenuIndicator ref={menuRef} onClick={setMenuState}>
        {children}
        {menuIsOpen && (
          <Menu
            itemList={itemList}
            withShadow={withShadow}
            position={position}
          />
        )}
      </StyledMenuIndicator>
    </>
  );
}

const StyledMenuIndicator = styled.div`
  position: relative;
`;
