import { useNavigate } from "@tanstack/react-router";
import { type SubmitEvent, useState } from "react";
import {
  type LoginValues,
  loginSchema,
  type RegisterValues,
  registerSchema,
} from "shared";
import { useAuthForm } from "@/hooks";
import Alert from "../Alert";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
  from: "/auth/register" | "/auth/login";
  mode: "login" | "register";
}

const Form = ({ from, mode }: FormProps) => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate({ from });

  const initialValues: RegisterValues | LoginValues =
    mode === "register"
      ? {
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
        }
      : { login: "", password: "" };
  const schema = mode === "register" ? registerSchema : loginSchema;

  const { values, handleChange } = useAuthForm(initialValues);
  const isValid = schema.safeParse(values).success;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === "register") {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values as RegisterValues),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Invalid credentials");
      }
      navigate({ to: "/auth/login" });
    } else {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values as LoginValues),
      });
      if (!response.ok) {
        const data = await response.json();
        return setError(data.message || "Invalid credentials");
      }
      navigate({ to: "/app" });
    }
  };

  const registerFields = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
    { name: "username", type: "text", placeholder: "Username" },
  ];

  const loginFields = [
    { name: "login", type: "text", placeholder: "Username or email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  const fields = mode === "register" ? registerFields : loginFields;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-4">
        {/* TODO: Dynamicznie wypisać inputy */}
        {fields.map((field) => (
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
      {error && (
        <Alert description="The register information you entered is incorrect." />
      )}
      <Button
        disabled={!isValid}
        text={mode === "register" ? "Submit" : "Log in"}
      />
    </form>
  );
};

export default Form;
