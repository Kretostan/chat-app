import { useAuthForm } from "@/hooks/useAuthForm";
import { useNavigate } from "@tanstack/react-router";
import { type Dispatch, type SetStateAction, type SubmitEvent } from "react";
import { loginSchema, registerSchema } from "shared";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
  setError: Dispatch<SetStateAction<boolean>>;
  from: "/auth/register" | "/auth/login";
  mode: "login" | "register";
}

const Form = ({ setError, from, mode }: FormProps) => {
  const navigate = useNavigate({ from });

  const initialValues = mode === "register"
    ? { schema: registerSchema, initial: { email: "", password: "", username: "" } }
    : { schema: loginSchema, initial: { login: "", password: "" } };
  const schema = mode === "register" ? registerSchema : loginSchema;

  // @ts-ignore
  const { values, handleChange, isValid } = useAuthForm(initialValues, schema)

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid) {
      if (mode === "register") {
        navigate({ to: "/auth/login" })
      } else {
        navigate({ to: "/app" })
      }
    } else {
      setError(true);
    }
  };

  const registerFields = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "username", type: "text", placeholder: "Username" }
  ];

  const loginFields = [
    { name: "login", type: "text", placeholder: "Username or email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const fields = mode === "register" ? registerFields : loginFields;

  return <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
    <div className="flex flex-col gap-4">
      {/* TODO: Dynamicznie wypisać inputy */}
      {fields.map(field => (
        <Input
          key={field.name}
          onChange={handleChange}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          autoComplete={field.name === "password" ? "new-password" : "off"}
          value={(values as any)[field.name]}
        />
      ))}
    </div>
    <Button disabled={!isValid} text={mode === "register" ? "Submit" : "Log in"} />
  </form>
}

export default Form;
