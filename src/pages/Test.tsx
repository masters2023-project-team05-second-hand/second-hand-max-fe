import AlertIndicator from "@components/common/Alert/AlertIndicator";
import Button from "@components/common/Buttons/Button";
import MenuIndicator from "@components/common/Menu/MenuIndicator";
import { Page } from "@styles/common";
import { styled } from "styled-components";

export default function Test() {
  const onDeleteClick = () => {
    console.log("삭제됐어요!");
  };

  return (
    <Page>
      <TestWrapper>
        <MenuIndicator
          button={<Button value="동네설정" />}
          itemList={test1}
          position="left"
        />
        <AlertIndicator
          button={<Button value="알러트" />}
          message="'역삼 1동'을 삭제하시겠어요?"
          onDeleteClick={onDeleteClick}
        />
      </TestWrapper>
    </Page>
  );
}

const TestWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const test1 = [
  {
    itemId: 1,
    value: "역삼 1동",
    isSelected: true,
    onClick: (id?: number) => {
      console.log("동네 선택", id);
    },
  },
  {
    itemId: 0,
    value: "내 동네 설정하기",
    onClick: () => {
      console.log("내 동네 설정하기");
    },
  },
];
