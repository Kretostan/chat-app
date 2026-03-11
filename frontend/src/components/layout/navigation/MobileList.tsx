import { useState } from "react";
import List from "./List";

type MobileListProps = {
  height: string | undefined;
};

const MobileList = ({ height }: MobileListProps) => {
  const [showList, setShowList] = useState<boolean>(false);

  const showMenu = () => setShowList((prevState) => !prevState);

  return (
    <div className="flex md:hidden h-full">
      <button
        type="button"
        onClick={showMenu}
        className="static flex justify-center items-center text-2xl cursor-pointer"
      >
        ☰
      </button>
      {showList && (
        <div className={`absolute left-0 top-${height} bg-surface-section`}>
          <List />
        </div>
      )}
    </div>
  );
};

export default MobileList;
