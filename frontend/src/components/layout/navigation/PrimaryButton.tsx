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
        color: "var(--text-primary)",
        backgroundColor: "rgba(0, 123 ,255, 0.8)",
        boxShadow: "0 0 15px 1px var(--primary)",
      }}
      className="py-3 w-20 md:w-24 bg-primary text-sm md:text-base text-white font-medium rounded-lg cursor-pointer"
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
