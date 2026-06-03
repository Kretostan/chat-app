import { useNavigate } from "@tanstack/react-router";
import { type SubmitEvent, useState } from "react";
import { type RegisterValues, registerSchema } from "shared";
import { useAuthForm } from "@/hooks";
import Alert from "../Alert";
import Button from "./Button";
import Input from "./Input";

const RegisterForm = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate({ from: "/auth/register" });

  const initialValues: RegisterValues = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };

  const { values, handleChange } = useAuthForm(initialValues);
  const isValid = registerSchema.safeParse(values).success;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values as RegisterValues),
    });

    if (!response.ok) {
      const data = await response.json();
      return setError(data.message);
    }

    navigate({ to: "/auth/login" });
  };

  const fields = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
    { name: "username", type: "text", placeholder: "Username" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-4">
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
      {error && <Alert description={error} />}
      <Button disabled={!isValid} text="Submit" />
    </form>
  );
};

export default RegisterForm;
