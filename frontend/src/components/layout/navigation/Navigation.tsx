import { useEffect, useRef, useState } from "react";
import List from "./List";
import MobileList from "./MobileList";
import OutlineButton from "./OutlineButton";
import PrimaryButton from "./PrimaryButton";
import Title from "./Title";

const Navigation = () => {
  const [navHeight, setNavHeight] = useState<string | undefined>(undefined);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const height = navRef?.current?.getBoundingClientRect().height;
    setNavHeight(`[${height}px]`);
  }, []);

  return (
    <nav
      className="fixed top-0 flex justify-center items-center w-screen bg-surface-section border-b border-border-default shadow-[0_0_10px_2px_black] z-1000"
      ref={navRef}
    >
      <div className="relative flex justify-between items-center px-6 max-w-300 w-full">
        <Title />
        {/* TODO: Zrobić smooth scroll do danej sekcji */}
        <MobileList height={navHeight} />
        <div className="sm:static lg:absolute lg:left-1/2 lg:-translate-x-1/2 hidden md:block">
          <List />
        </div>
        <div className="flex gap-2 md:gap-4 py-4">
          <OutlineButton>Login</OutlineButton>
          <PrimaryButton>Sign Up</PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
