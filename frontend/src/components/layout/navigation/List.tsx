import { motion } from "framer-motion";

const sections = [
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#stats" },
  { label: "Get Started", href: "#cta" },
  { label: "Contact", href: "#contact" },
];

const hoverEffect = { color: "var(--primary)" };

const List = () => {
  return (
    <ul className="flex flex-col md:flex-row gap-8">
      {sections.map((section) => (
        <motion.li
          whileHover={hoverEffect}
          className="cursor-pointer"
          key={section.label}
        >
          <a href={section.href}>{section.label}</a>
        </motion.li>
      ))}
    </ul>
  );
};

export default List;
