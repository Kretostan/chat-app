"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface OutlineButtonProps {
  children: ReactNode;
}

const OutlineButton = ({ children }: OutlineButtonProps) => {
  return (
    <motion.button
      style={{
        backgroundColor: "none",
      }}
      whileHover={{
        backgroundColor: "var(--primary)",
      }}
      className="py-4 w-full max-w-[300px] md:w-[200px] text-sm md:text-lg text-white rounded-xl border-2 border-white cursor-pointer"
    >
      {children}
    </motion.button>
  );
};

export default OutlineButton;
