import { styled } from "styled-components";
import { designSystem } from "@styles/designSystem";

export interface ItemProps extends React.ComponentPropsWithoutRef<"li"> {
  itemId: number;
  value: string;
  isSelected?: boolean;
  isWarning?: boolean;
  onClickWithId?: (id: number) => void;
}

export default function MenuItem({
  itemId,
  value,
  isSelected,
  isWarning,
  onClick,
  onClickWithId,
}: ItemProps) {
  return (
    <StyledItem
      key={itemId}
      $isSelected={isSelected}
      $isWarning={isWarning}
      onClick={onClickWithId ? () => onClickWithId(itemId) : onClick}>
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
