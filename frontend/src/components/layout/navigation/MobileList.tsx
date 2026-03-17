import { motion } from "framer-motion";
import { useState } from "react";
import List from "./List";

type MobileListProps = {
	height: number | undefined;
};

const MobileList = ({ height }: MobileListProps) => {
	const [showList, setShowList] = useState<boolean>(false);

	const showMenu = () => setShowList((prevState) => !prevState);

	console.log(height);
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
				<motion.div
					key="mobile-menu"
					initial={{ width: 0 }}
					animate={{ width: "100%" }}
					className={`absolute top-0 left-0 bg-surface-section w-full z-998`}
				>
					<List height={height} />
				</motion.div>
			)}
		</div>
	);
};

export default MobileList;
