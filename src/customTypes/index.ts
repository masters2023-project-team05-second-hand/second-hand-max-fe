export type AddressInfo = {
  id: number;
  name: string;
};

export type CategoryInfo = {
  id: number;
  name: string;
  imageUrl: string;
};

export type MenuItemInfo = {
  value: string;
  onClick: (id?: number) => void;
  itemId?: number;
  isSelected?: boolean;
  isWarning?: boolean;
};
