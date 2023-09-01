import { useAtom } from "jotai";
import { styled } from "styled-components";
import { PLACE_HOLDER } from "./constants";
import { priceAtom } from "./store";

export default function NewProductPrice() {
  const [price, setPrice] = useAtom(priceAtom);

  const getFormattedPrice = (inputValue: string) => {
    const onlyNumber = inputValue.replace(/[^\d]+/g, "");
    const limitedPrice = onlyNumber.slice(0, 9);

    if (limitedPrice) {
      const krw = parseInt(limitedPrice).toLocaleString("ko-KR");

      return krw;
    } else {
      return "";
    }
  };

  return (
    <Price>
      <span className="krw">₩</span>
      <input
        className="price"
        placeholder={PLACE_HOLDER.PRICE}
        value={price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPrice(getFormattedPrice(e.target.value))
        }
      />
    </Price>
  );
}
const Price = styled.div`
  display: flex;
  gap: 4px;
  padding-bottom: 16px;
  border-bottom: ${({ theme: { color } }) =>
    `1px solid ${color.neutralBorder}`};
  color: ${({ theme: { color } }) => color.neutralTextStrong};

  .krw {
    display: block;
    font: ${({ theme: { font } }) => font.displayStrong16};
  }

  .price {
    flex: 1;
    font: ${({ theme: { font } }) => font.availableDefault16};
    border-radius: ${({ theme: { radius } }) => radius[8]};
    padding: 0 4px;

    &:focus {
      background-color: ${({ theme: { color } }) =>
        color.neutralBackgroundBold};
    }
  }
`;
