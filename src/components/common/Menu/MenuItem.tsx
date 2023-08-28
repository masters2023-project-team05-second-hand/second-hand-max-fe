import { designSystem } from "@styles/designSystem";
import { styled } from "styled-components";

export type MenuItemProps = {
  value: string;
  onClick: (id?: number) => void;
  itemId?: number;
  isSelected?: boolean;
  isWarning?: boolean;
};

export default function MenuItem({
  value,
  onClick,
  itemId,
  isSelected,
  isWarning,
}: MenuItemProps) {
  return (
    <StyledItem
      $isSelected={isSelected}
      $isWarning={isWarning}
      onClick={() => onClick(itemId)}>
      {value}
    </StyledItem>
  );
}

const StyledItem = styled.li<{
  $isSelected?: boolean;
  $isWarning?: boolean;
}>`
  color: ${(props) =>
    props.$isWarning
      ? designSystem.color.systemWarning
      : designSystem.color.neutralTextStrong};
  background-color: inherit;
  font: ${(props) =>
    props.$isSelected
      ? designSystem.font.enabledStrong16
      : designSystem.font.availableDefault16};
  border-bottom: 0.8px solid ${designSystem.color.neutralBorder};
  padding: 16px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    opacity: ${designSystem.opacity.press};
  }
`;
