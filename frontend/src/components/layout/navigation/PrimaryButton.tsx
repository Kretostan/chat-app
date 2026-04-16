import { motion } from "framer-motion";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton = ({ children, onClick }: PrimaryButtonProps) => {
  return (
    <motion.button
      initial={{
        backgroundColor: "rgba(var(--primary-raw), 1)",
        boxShadow: "0 0 0px 0px var(--primary)",
      }}
      whileHover={{
        backgroundColor: "rgba(var(--primary-raw), 0.8)",
        boxShadow: "0 0 10px 1px var(--primary)",
      }}
      onClick={onClick}
      className="py-3 w-20 md:w-24 bg-primary text-sm md:text-base text-foreground-primary font-medium rounded-lg shadow-none cursor-pointer"
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
