import { motion } from "framer-motion";
import BackButton from '@/components/auth/BackButton';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react';

export const Route = createFileRoute('/auth/reset')({
  component: RouteComponent,
})

function RouteComponent() {
  const [values, setValues] = useState<{ reset: string }>({ reset: "" });
  const navigate = useNavigate({ from: Route.fullPath });
  const resetRef = useRef<HTMLInputElement>(null);

  const handleReset = (event: SubmitEvent<HTMLFormElement>) => {
    event?.preventDefault();
  }

  const valuesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevState => ({ ...prevState, [name]: value }))
  }

  return <div className="flex flex-col items-center py-24 min-h-screen bg-surface-section">
    <form onSubmit={handleReset} className="flex flex-col gap-6 w-90">
      <div className="flex items-center gap-2">
        <BackButton />
        <h2 className="text-3xl">Find your account</h2>
      </div>
      <div className="flex flex-col gap-4 w-90">
        <input
          ref={resetRef}
          type="text"
          name="reset-value"
          value={values.reset}
          placeholder="Username, or email"
          onChange={valuesHandler}
          className="px-3 py-2 bg-surface-input outline-2 outline-border-input rounded-lg"
        />
        <motion.button whileHover={{ backgroundColor: "var(--tertiary)" }} onClick={() => navigate({ to: "/" })} className="py-1.5 bg-primary rounded-lg cursor-pointer">Continue</motion.button>
      </div>
    </form>
  </div>
}
