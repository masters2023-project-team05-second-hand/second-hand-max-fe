import { getCategories } from "@api/index";
import { CategoryInfo } from "@api/type";
import { ReactComponent as ChevronRightIcon } from "@assets/icon/chevron-right.svg";
import Button from "@components/common/Buttons/Button";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { TEMP_CATEGORY } from "./constants";
import { categoryAtom } from "./store";

export default function NewProductCategory() {
  const [category, setCategory] = useAtom(categoryAtom);
  const [randomCategories, setRandomCategories] = useState<CategoryInfo[]>([]);

  useEffect(() => {
    (async () => {
      const { data: categories } = await getCategories();

      const getRandomCategories = (
        categories: CategoryInfo[]
      ): CategoryInfo[] => {
        const shuffledCategories = categories.sort(() => Math.random() - 0.5);
        const slicedCategories = shuffledCategories.slice(0, 2);

        const isContainSelectedCategory = slicedCategories.some(
          (randomCategory) => randomCategory.id === category.id
        );

        if (isContainSelectedCategory) {
          return getRandomCategories(categories);
        }

        return slicedCategories;
      };

      const randomCategories = getRandomCategories(categories);

      setRandomCategories(randomCategories);
    })();
  }, [category.id]);

  const openCategorySearch = () => {
    // Todo: 카테고리 모달 띄우고 선택한 카테고리를 set 해야함
    setCategory(TEMP_CATEGORY);
  };

  const onSelectCategory = (id: number) => {
    const selectedCategory = randomCategories.find(
      (category) => category.id === id
    );

    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  };

  return (
    <Category>
      <CategoryList>
        <SelectedCategory>{category.name}</SelectedCategory>
        <ul>
          {randomCategories.map((category) => (
            <RandomCategory
              key={category.id}
              onClick={() => onSelectCategory(category.id)}>
              {category.name}
            </RandomCategory>
          ))}
        </ul>
      </CategoryList>
      <Button
        size={{ width: 24, height: 24 }}
        leftIcon={<ChevronRightIcon />}
        onClick={openCategorySearch}
      />
    </Category>
  );
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
