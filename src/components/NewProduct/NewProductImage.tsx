import { ReactComponent as CameraIcon } from "@assets/icon/camera.svg";
import { useAtom } from "jotai";
import { styled } from "styled-components";
import ImageItem from "./ImageItem";
import { LIMITED_IMAGE_COUNT } from "./constants";
import { productImagesAtom } from "./store";

export default function NewProductImage() {
  const [images, setImages] = useAtom(productImagesAtom);

  const onChangeProductImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Memo: 미완성 기능
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImages((prev) => [...prev, reader.result as string]);
    };
  };

  return (
    <>
      <ProductImage>
        <ProductImageUpload htmlFor="product-upload-input">
          <CameraIcon className="camera-icon" />
          {`${images.length} / ${LIMITED_IMAGE_COUNT}`}
          <input
            type="file"
            id="product-upload-input"
            onChange={onChangeProductImages}
          />
        </ProductImageUpload>
        <ImageList>
          {images && (
            <ImageItem src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrvGnJdD9YoXh0UTaNkxW7OkI53KvOCKsZBw&usqp=CAU" />
          )}
        </ImageList>
      </ProductImage>
    </>
  );
}

const ProductImage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding-bottom: 16px;
  height: 100px;
  align-items: end;
  border-bottom: ${({ theme: { color } }) =>
    `1px solid ${color.neutralBorder}`};
`;

const ProductImageUpload = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border: ${({ theme: { color } }) => `1px solid ${color.neutralBorder}`};
  border-radius: ${({ theme: { radius } }) => radius[16]};
  color: ${({ theme: { color } }) => color.neutralTextStrong};
  margin-bottom: 4px;

  &:hover {
    cursor: pointer;
    opacity: ${({ theme: { opacity } }) => opacity.press};
  }

  &:active {
    opacity: ${({ theme: { opacity } }) => opacity.disabled};
  }

  .camera-icon {
    filter: ${({ theme: { filter } }) => filter.neutralTextStrong};
  }

  input {
    display: none;
  }
`;

const ImageList = styled.ul`
  flex: 1;
  display: flex;
  align-items: end;
  gap: 16px;
  overflow-x: scroll;
  height: 100px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
