import { ReactComponent as XIcon } from "@assets/icon/x.svg";
import Button from "@components/common/Button";
import { HeadlineText } from "../Modal.style";

export default function CategoryModalHeader() {
  return (
    <>
      <HeadlineText>카테고리</HeadlineText>
      <Button
        leftIcon={<XIcon />}
        onClick={() => console.log("closeCategoryModalHandler")}
      />
    </>
  );
}
