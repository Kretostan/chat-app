import { useNavigate } from "@tanstack/react-router";
import { type SubmitEvent, useState } from "react";
import { type LoginFormValues, loginFormSchema } from "shared";
import { useAuthForm } from "@/hooks";
import Alert from "../Alert";
import Button from "./Button";
import Input from "./Input";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate({ from: "/auth/login" });

  const { values, handleChange } = useAuthForm({
    login: "",
    password: "",
  });
  const isValid = loginFormSchema.safeParse(values as LoginFormValues).success;

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const deviceName = navigator?.userAgentData
      ? `${navigator.userAgentData.brands[0].brand}, ${navigator.userAgentData.platform}`
      : navigator.userAgent;

    const stored = localStorage.getItem("sessionUuids");
    const sessionUuids: Record<string, string> = stored
      ? JSON.parse(stored)
      : {};

    const loginKey = (values as LoginFormValues).login;
    let sessionUuid = sessionUuids[loginKey];
    if (!sessionUuid) {
      sessionUuid = crypto.randomUUID();
      sessionUuids[loginKey] = sessionUuid;
    }

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        deviceName: deviceName,
        sessionUuid: sessionUuid,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return setError(data.message);
    }

    localStorage.setItem("sessionUuids", JSON.stringify(sessionUuids));
    navigate({ to: "/app" });
  };

  const fields = [
    { name: "login", type: "text", placeholder: "Username or email" },
    { name: "password", type: "password", placeholder: "Password" },
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
      <Button disabled={!isValid} text="Log in" />
    </form>
  );
};

export default LoginForm;
