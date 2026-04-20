import { motion } from "framer-motion";

const buttonVariants = {
  enabled: {
    backgroundColor: "var(--primary)",
    color: "var(--foreground-primary)",
    cursor: "pointer"
  },
  disabled: {
    backgroundColor: "var(--secondary)",
    color: "var(--foreground-muted)",
    cursor: "not-allowed"
  }
}

const Button = ({ disabled, text }: { disabled: boolean, text: string }) => {
  return <motion.button
    variants={buttonVariants}
    initial={disabled ? "disabled" : "enabled"}
    animate={disabled ? "disabled" : "enabled"}
    className={`my-1 py-2 w-full ${disabled ? "bg-secondary text-foreground-muted cursor-not-allowed" : "bg-primary text-foreground-primary cursor-pointer"} font-semibold rounded-lg`}
    disabled={disabled}
  >
    {text}
  </motion.button>
}

export default Button;
