import WarningIcon from "@/assets/warning.svg?react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const Alert = ({ description, hasLink }: { description: string, hasLink?: boolean }) => {
  const MotionLink = motion.create(Link);

  return <div className="flex items-center px-2 py-3 text-foreground-secondary text-xs border border-border-default rounded-lg">
    <WarningIcon height={30} width={30} className="shrink-0 px-1.5" /><p>{description}{hasLink && <MotionLink to="/auth/reset" whileHover={{ color: "var(--secondary)" }} className="text-tertiary cursor-pointer">Find your account and log in.</MotionLink>}</p>
  </div>;
};

export default Alert;
