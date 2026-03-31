import { useRef } from "react";
import { useElementHeight, useMobile } from "@/hooks";
import List from "./List";
import MobileList from "./MobileList";
import OutlineButton from "./OutlineButton";
import PrimaryButton from "./PrimaryButton";
import Title from "./Title";

const Navigation = () => {
	const navRef = useRef<HTMLDivElement>(null);
	const isMobile = useMobile();
	const navHeight = useElementHeight(navRef);

	/* TODO: Zrobić smooth scroll do danej sekcji */
	return (
		<nav
			className="fixed top-0 flex justify-center items-center w-full bg-surface-section border-b border-border-default shadow-[0_0_10px_2px_black] z-1000"
			ref={navRef}
		>
			<div className="relative flex justify-between items-center px-6 max-w-300 w-full">
				<Title />
				{isMobile ? <MobileList height={navHeight} /> : <List />}
				<div className="flex gap-2 md:gap-4 py-4">
					<OutlineButton>Login</OutlineButton>
					<PrimaryButton>Sign Up</PrimaryButton>
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
