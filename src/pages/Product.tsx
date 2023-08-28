import { ReactComponent as ChevronLeftIcon } from "@assets/icon/chevron-left.svg";
import { ReactComponent as DotsIcon } from "@assets/icon/dots.svg";
import TopBar from "@components/TopBar";
import Button from "@components/common/Button";
import useScroll from "@hooks/useScroll";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

export default function Product() {
  const { id } = useParams();
  const { scrollY, ref } = useScroll();

  const isScroll = !!scrollY && scrollY > 0;

  return (
    <StyledProduct ref={ref}>
      {/* Todo: 사진 position absolute로 해야함 */}
      <Test>{`상품 ${id} 상세 페이지`}</Test>
      <TopBar
        backgroundColor="accentPrimary"
        isScrolled={isScroll}
        leftBtn={
          <Button
            value="뒤로"
            color="accentText"
            fontName="availableStrong16"
            leftIcon={<ChevronLeftIcon />}
          />
        }
        rightBtn={
          <Button // Todo: 판매자 / 구매자 나눠야 함
            color="accentText"
            leftIcon={<DotsIcon />}
          />
        }
      />
    </StyledProduct>
  );
}

const StyledProduct = styled.div`
  position: relative;
  height: 100vh;
  overflow: scroll;
`;

const Test = styled.div`
  position: absolute;
  width: 100%;
  height: 2000px;
  background-color: gray;
`;
