import React from "react";
import styled from "styled-components";

type Tab = {
  id: number;
  name: string;
};

type TabButtonsProps = {
  activeTabId: number;
  tabList: Tab[];
  onTabClick: (id: number) => void;
} & React.HTMLAttributes<HTMLUListElement>;

export const TabButtons = React.forwardRef<HTMLUListElement, TabButtonsProps>(
  ({ activeTabId, tabList, onTabClick, ...props }, ref) => {
    const isActiveTab = (id: number) => activeTabId === id;

    const onClick = (id: number) => {
      onTabClick(id);
    };

    return (
      <StyledTabButtons ref={ref} {...props}>
        {tabList.map(({ id, name }) => {
          return (
            <TabButton
              key={id}
              $active={isActiveTab(id)}
              onClick={() => onClick(id)}>
              {name}
            </TabButton>
          );
        })}
      </StyledTabButtons>
    );
  }
);

const StyledTabButtons = styled.ul`
  display: flex;
  gap: 4px;
  width: 100%;
  overflow-x: scroll;
  height: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  white-space: nowrap;
  cursor: pointer;
  border-radius: ${({ theme: { radius } }) => radius[50]};
  color: ${({ $active, theme: { color } }) =>
    $active ? color.accentText : color.accentTextWeak};
  background-color: ${({ $active, theme: { color } }) =>
    $active ? color.accentPrimary : color.accentText};
  font: ${({ theme: { font } }) => font.displayDefault12};
  border: ${({ $active, theme: { color } }) =>
    !$active && `1px solid ${color.neutralBorder}`};
`;
