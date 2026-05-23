import { type ChangeEvent, useState } from "react";
import type { LoginValues, RegisterValues } from "shared";

export const useAuthForm = (initialValues: RegisterValues | LoginValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return { values, handleChange };
};
