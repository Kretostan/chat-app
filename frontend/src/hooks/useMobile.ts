import { useEffect, useState } from "react";

export const useMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  useEffect(() => {
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth <= 768),
    );
  }, []);

  return isMobile;
};
