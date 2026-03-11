"use client";
import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: React.ReactNode;
}

const PrimaryButton = ({ children }: PrimaryButtonProps) => {
  return (
    <motion.button
      initial={{
        boxShadow: "none",
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 0 10px 1px #ffffff",
      }}
      className="py-4 w-full max-w-[300px] md:w-[200px] bg-white text-sm md:text-lg text-primary font-medium rounded-xl cursor-pointer"
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
