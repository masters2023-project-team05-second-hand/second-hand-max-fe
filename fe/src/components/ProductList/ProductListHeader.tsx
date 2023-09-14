import TopBar from "@components/TopBar";
import Button from "@components/common/Buttons/Button";
import { ReactComponent as ChevronDownIcon } from "@assets/icon/chevron-down.svg";
import { ReactComponent as LayoutGridIcon } from "@assets/icon/layout-grid.svg";
import { useAddressList, useCurrentAddressId } from "store";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@router/constants";

export default function ProductListHeader() {
  // Todo: currentAddressId 로직 수정하고 진행 예정
  const [addressList, setAddressList] = useAddressList();
  const [currentAddressId, setCurrentAddressId] = useCurrentAddressId();
  const navigate = useNavigate();

  const moveToCategoryPage = () => {
    navigate(ROUTE_PATH.category);
  };

  const selectedAddress = addressList.find(
    (address) => address.id === currentAddressId
  );

  return (
    <TopBar
      backgroundColor="neutralBackgroundBlur"
      isWithBorder={true}
      leftBtn={
        <Button
          value={selectedAddress?.name}
          color="neutralText"
          fontName="availableStrong16"
          leftIcon={<ChevronDownIcon />}
        />
      }
      rightBtn={
        <Button
          color="neutralText"
          leftIcon={<LayoutGridIcon />}
          onClick={moveToCategoryPage}
        />
      }
    />
  );
}
