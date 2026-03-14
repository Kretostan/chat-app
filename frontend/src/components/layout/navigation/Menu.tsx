import { useState } from "react";
import { useMobile } from "@/hooks";
import List from "./List";

type MenuProps = {
  height: string | undefined;
};

const Menu = ({ height }: MenuProps) => {
  const [showList, setShowList] = useState<boolean>(false);
  const isMobile = useMobile();

  const showMenu = () => setShowList((prevState) => !prevState);

  return isMobile ? (
    <>
      <button
        type="button"
        onClick={showMenu}
        className="flex md:hidden justify-center items-center text-2xl cursor-pointer"
      >
        ☰
      </button>
      {showList && <List height={height} />}
    </>
  ) : (
    <List />
  );
};

export default Menu;
