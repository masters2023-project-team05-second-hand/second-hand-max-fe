import { ColorName, FontName, RadiusName } from "@styles/designSystem";
import React from "react";
import styled from "styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: { width: string; height: string };
  direction?: "row" | "column";
  radiusName?: RadiusName;
  fontName?: FontName;
  color?: ColorName;
  backgroundColor?: ColorName;
  borderColor?: ColorName;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

type ButtonContentProps = Pick<
  ButtonProps,
  "leftIcon" | "rightIcon" | "children"
>;

export default function Button({
  size,
  color,
  backgroundColor,
  borderColor,
  radiusName,
  direction,
  fontName,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const contentProps = { leftIcon, rightIcon, children };

  return (
    <StyledButton
      $size={size}
      $color={color}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $direction={direction}
      $fontName={fontName}
      $radiusName={radiusName}
      {...props}>
      <ButtonContent {...contentProps} />
    </StyledButton>
  );
}

const ButtonContent = ({
  leftIcon,
  rightIcon,
  children,
}: ButtonContentProps) => {
  return (
    <>
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );
};

const StyledButton = styled.button<{
  $size?: { width: string; height: string };
  $direction?: "row" | "column";
  $color?: ColorName;
  $backgroundColor?: ColorName;
  $borderColor?: ColorName;
  $fontName?: FontName;
  $radiusName?: RadiusName;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  width: ${({ $size }) => $size?.width};
  height: ${({ $size }) => $size?.height};
  color: ${({ $color, theme: { color } }) => $color && color[$color]};
  flex-direction: ${({ $direction }) => $direction};
  font: ${({ $fontName, theme: { font } }) => $fontName && font[$fontName]};

  border-radius: ${({ $radiusName, theme: { radius } }) => {
    return $radiusName && radius[$radiusName];
  }};

  background: ${({ $backgroundColor, theme: { color } }) => {
    return $backgroundColor && color[$backgroundColor];
  }};

  border: ${({ $borderColor, theme: { color } }) => {
    return $borderColor && `1px solid ${color[$borderColor]}`;
  }};

  &:hover {
    opacity: ${({ theme: { opacity } }) => opacity.hover};
  }

  &:active {
    opacity: ${({ theme: { opacity } }) => opacity.press};
  }

  &:disabled {
    opacity: ${({ theme: { opacity } }) => opacity.disabled};
  }

  svg {
    filter: ${({ $color, theme: { filter } }) => $color && filter[$color]};
  }
`;
