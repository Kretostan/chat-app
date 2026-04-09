import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton = ({ children, onClick }: PrimaryButtonProps) => {
  return (
    <motion.button
      initial={{
        y: 0,
        color: "var(--foreground-primary)",
        backgroundColor: "var(--primary)",
        boxShadow: "none",
      }}
      whileHover={{
        y: -1,
        color: "var(--foreground-primary)",
        backgroundColor: "rgba(0, 123 ,255, 0.8)",
        boxShadow: "0 0 10px 1px var(--primary)",
      }}
      onClick={onClick}
      className="py-3 w-20 md:w-24 bg-primary text-sm md:text-base text-white font-medium rounded-lg cursor-pointer"
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
