import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = ({ ...props }: InputProps) => {
  return <input
    {...props}
    className="px-3 py-2 bg-surface-input outline-2 outline-border-input rounded-lg"
  />
}

export default Input;
