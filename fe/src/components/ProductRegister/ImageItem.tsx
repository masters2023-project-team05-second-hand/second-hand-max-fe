import { ReactComponent as XIcon } from "@assets/icon/x.svg";
import Button from "@components/common/Buttons/Button";
import { styled } from "styled-components";

type ImageItemProps = {
  src: string;
};

export default function ImageItem({ src }: ImageItemProps) {
  const onDeleteImage = () => {
    // Todo: 이미지 삭제 기능
    console.log("이미지 삭제");
  };

  return (
    <StyledImageItem>
      <Image src={src} />
      <Button
        className="delete"
        size={{ width: 28, height: 28 }}
        leftIcon={<XIcon />}
        color="neutralBackground"
        backgroundColor="neutralTextStrong"
        radius="half"
        onClick={onDeleteImage}
      />
    </StyledImageItem>
  );
}

const StyledImageItem = styled.li`
  position: relative;

  .delete {
    position: absolute;
    top: -10px;
    right: -10px;
  }
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: ${({ theme: { color } }) => `1px solid ${color.neutralBorder}`};
  border-radius: ${({ theme: { radius } }) => radius[16]};
`;
