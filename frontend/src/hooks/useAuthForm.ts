import { useState, type ChangeEvent } from "react";
import type { ZodSchema } from "zod/v3";

export const useAuthForm = <T extends Record<string, any>>(initialValues: T, schema: ZodSchema<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const validation = schema.safeParse(values);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }))
  };

  return {
    values,
    handleChange,
    isValid: validation.success,
  }
}
