import styled from "styled-components";

type Tab = {
  id: number;
  name: string;
};

export default function TabButtons({
  activeTabId,
  tabList,
  onTabClick,
}: {
  activeTabId: number;
  tabList: Tab[];
  onTabClick: (id: number) => void;
}) {
  const isActiveTab = (id: number) => activeTabId === id;

  const onClick = (id: number) => {
    onTabClick(id);
  };

  return (
    <StyledTabButtons>
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

const StyledTabButtons = styled.ul`
  display: flex;
  gap: 4px;
`;

const TabButton = styled.li<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
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
