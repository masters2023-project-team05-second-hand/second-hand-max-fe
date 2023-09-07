import { getCategories } from "@api/index";
import { CategoryInfo } from "@api/type";
import { ReactComponent as ChevronRightIcon } from "@assets/icon/chevron-right.svg";
import Button from "@components/common/Buttons/Button";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import CategoryModal from "@components/Modal/CategoryModal/CategoryModal";
import { useMutation } from "@tanstack/react-query";

export default function ProductRegisterCategory({
  category,
  onChange,
}: {
  category: Pick<CategoryInfo, "id" | "name">;
  onChange: (
    id: number,
    categories: Pick<CategoryInfo, "id" | "name">[]
  ) => void;
}) {
  const [categoryList, setCategoryList] = useState<
    Pick<CategoryInfo, "id" | "name">[]
  >([]);
  const [randomCategories, setRandomCategories] = useState<
    Pick<CategoryInfo, "id" | "name">[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: getCategoryList } = useMutation(() => getCategories(), {
    onSuccess: (res) => {
      setCategoryList(res.data);
    },
    // Todo: error 처리
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (!categoryList.length) {
      getCategoryList();
    }

    const randomCategories = getRandomCategories(category.id, categoryList);

    setRandomCategories(randomCategories);
  }, [category.id, categoryList, getCategoryList]);

  const toggleCategoryModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Category>
        <CategoryList>
          <SelectedCategory>{category.name}</SelectedCategory>
          <ul>
            {randomCategories.map((category) => (
              <RandomCategory
                key={category.id}
                onClick={() => onChange(category.id, randomCategories)}>
                {category.name}
              </RandomCategory>
            ))}
          </ul>
        </CategoryList>
        <Button
          size={{ width: 24, height: 24 }}
          leftIcon={<ChevronRightIcon />}
          onClick={toggleCategoryModal}
        />
      </Category>
      {isOpen && (
        <CategoryModal
          selectedId={category.id}
          onSelectCategory={onChange}
          closeHandler={toggleCategoryModal}
        />
      )}
    </>
  );
}

function getRandomCategories(
  id: number,
  categories: Pick<CategoryInfo, "id" | "name">[]
): Pick<CategoryInfo, "id" | "name">[] {
  const shuffledCategories = categories.sort(() => Math.random() - 0.5);
  const slicedCategories = shuffledCategories.slice(0, 2);

  const isContainSelectedCategory = slicedCategories.some(
    (randomCategory) => randomCategory.id === id
  );

  if (isContainSelectedCategory) {
    return getRandomCategories(id, categories);
  }

  return slicedCategories;
}

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  height: 32px;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 4px;

  ul {
    display: flex;
    gap: 4px;
  }
`;

const SelectedCategory = styled.button`
  padding: 0 16px;
  border-radius: ${({ theme: { radius } }) => radius[50]};
  color: ${({ theme: { color } }) => color.accentText};
  background-color: ${({ theme: { color } }) => color.accentPrimary};
  font: ${({ theme: { font } }) => font.displayDefault12};
`;

const RandomCategory = styled.button`
  padding: 0 16px;
  border-radius: ${({ theme: { radius } }) => radius[50]};
  color: ${({ theme: { color } }) => color.accentTextWeak};
  background-color: ${({ theme: { color } }) => color.accentText};
  font: ${({ theme: { font } }) => font.displayDefault12};
  border: ${({ theme: { color } }) => `1px solid ${color.neutralBorder}`};
`;
