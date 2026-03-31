import { useEffect, useState } from "react";

export const useElementHeight = (ref: React.RefObject<HTMLElement | null>) => {
	const [navHeight, setNavHeight] = useState<number>(0);

	useEffect(() => {
		if (!ref || !ref.current) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const height = entry.contentRect.height;
				setNavHeight(height);
			}
		});

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [ref]);

	return navHeight;
};
