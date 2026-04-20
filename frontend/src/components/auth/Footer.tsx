import { Link } from "@tanstack/react-router"
import { motion } from "framer-motion"

interface FooterProps {
  text: string;
  linkText: string;
  to: string;
}

const Footer = ({ text, linkText, to }: FooterProps) => {
  const MotionLink = motion.create(Link);

  return <div className="flex justify-center p-6 w-full bg-surface-section border-3 border-border-default rounded-2xl">
    <p className="text-sm">{text} <MotionLink to={to} whileHover={{ color: "var(--secondary)" }} className="text-tertiary font-semibold cursor-pointer">{linkText}</MotionLink></p>
  </div>
}

export default Footer;
