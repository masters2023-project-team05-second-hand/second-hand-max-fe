import { useAtom } from "jotai";
import { styled } from "styled-components";
import { PLACE_HOLDER } from "./constants";
import { titleAtom } from "./store";

export default function NewProductTitle() {
  const [title, setTitle] = useAtom(titleAtom);

  return (
    <Title
      type="text"
      placeholder={PLACE_HOLDER.TITLE}
      value={title}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value)
      }
    />
  );
}

const Title = styled.input`
  color: ${({ theme: { color } }) => color.neutralTextStrong};
  font: ${({ theme: { font } }) => font.availableDefault16};
  border-radius: ${({ theme: { radius } }) => radius[8]};
  padding: 8px;

  &:focus {
    background-color: ${({ theme: { color } }) => color.neutralBackgroundBold};
  }
`;
