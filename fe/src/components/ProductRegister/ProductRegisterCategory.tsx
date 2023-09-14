import { useCategoryQuery } from "@api/product/queries";
import { CategoryInfo } from "@api/type";
import { ReactComponent as ChevronRightIcon } from "@assets/icon/chevron-right.svg";
import CategoryModal from "@components/Modal/CategoryModal/CategoryModal";
import Button from "@components/common/Buttons/Button";
import { Error, Loading } from "@components/common/Guide";
import TabButtons from "@components/common/TabButtons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { RANDOM_CATEGORY_COUNT } from "./constants";

export default function ProductRegisterCategory({
  categoryId,
  onChange,
}: {
  categoryId: number;
  onChange: (categoryId: number) => void;
}) {
  const [randomCategories, setRandomCategories] = useState<CategoryInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isSuccess, isError, isLoading } = useCategoryQuery();

  useEffect(() => {
    if (data && isSuccess) {
      const selectedCategory = data.find(
        (category) => category.id === categoryId
      );
      const randomCategories = getRandomCategories(categoryId, data);

      selectedCategory &&
        setRandomCategories([selectedCategory, ...randomCategories]);
    }
  }, [categoryId, isSuccess, data]);

  const toggleCategoryModal = () => {
    setIsOpen(!isOpen);
  };

  // TODO: toast로 변경하기 (레이아웃 안맞음)
  return (
    <Category>
      {isLoading ? (
        <Loading
          messages={[
            "카테고리 목록을 불러오는 중입니다.",
            "새로고침을 하지 마세요!",
          ]}
        />
      ) : isError ? (
        <Error
          messages={[
            "카테고리 목록을 불러오는데 실패했어요.",
            "잠시 후 다시 시도해주세요.",
          ]}
        />
      ) : (
        <>
          {randomCategories.length && (
            <TabButtons
              activeTabId={categoryId}
              tabList={randomCategories}
              onTabClick={onChange}
            />
          )}
          <Button
            size={{ width: 24, height: 24 }}
            leftIcon={<ChevronRightIcon />}
            onClick={toggleCategoryModal}
          />
          {isOpen && (
            <CategoryModal
              selectedId={categoryId}
              onSelectCategory={onChange}
              closeHandler={toggleCategoryModal}
              categories={data}
            />
          )}
        </>
      )}
    </Category>
  );
}

function getRandomCategories(
  id: number,
  categories: CategoryInfo[]
): CategoryInfo[] {
  const withOutSelectedCategory = categories.filter(
    (category) => category.id !== id
  );

  const shuffledCategories = withOutSelectedCategory.sort(
    () => Math.random() - 0.5
  );
  const slicedCategories = shuffledCategories.slice(0, RANDOM_CATEGORY_COUNT);

  return slicedCategories;
}

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
`;
