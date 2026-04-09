import HeartIcon from "@/assets/heart.svg?react";

const Copyright = () => {
	const year = new Date().getFullYear();

	return (
		<div className="flex flex-col items-center gap-3 py-6 max-w-300 w-full border-t border-white/25">
			<p className="text-sm">&copy; {year} ChatApp. All rights reserved.</p>
			<p className="flex items-center text-xs">
				Build with <HeartIcon height="18px" width="24px" /> by Jakub Kret
			</p>
		</div>
	);
};

export default Copyright;
