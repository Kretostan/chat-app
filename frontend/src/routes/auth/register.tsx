import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type SubmitEvent, type ChangeEvent, useRef } from "react";
import WarningIcon from "@/assets/warning.svg?react";
import { Link } from "@tanstack/react-router";

const buttonVariants = {
  enabled: {
    backgroundColor: "var(--primary)",
    color: "var(--foreground-primary)",
    cursor: "pointer"
  },
  disabled: {
    backgroundColor: "var(--secondary)",
    color: "var(--foreground-muted)",
    cursor: "not-allowed"
  }
}

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [values, setValues] = useState<{ login: string, password: string }>({ login: "", password: "" });
  const [hasError, setHasError] = useState<boolean>(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate({ from: "/auth" });
  const MotionLink = motion.create(Link);

  const isDisabled = values.login.length === 0 || values.password.length <= 5;

  const loginHandler = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dummyResponse = {
      code: 200
    }
    if (!isDisabled && dummyResponse.code === 200) {
      navigate({ to: "/app" });
    } else {
      setHasError(true);
    }
  };

  const valuesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevState => ({ ...prevState, [name]: value }))
  }

  return <div className="flex justify-center items-center gap-20 min-h-screen my-20">
    <div className="flex flex-col justify-center items-center gap-3 w-90">
      <div className="flex flex-col justify-center items-center gap-6 px-8 py-10 w-full bg-surface-section border-3 border-border-default rounded-2xl">
        <div className="flex flex-col justify-center items-center gap-3 py-4">
          <h2 className="text-3xl text-primary font-bold">Chat App</h2>
          <p>Register form description</p>
        </div>
        {hasError && <div className="flex items-center px-2 py-3 text-foreground-secondary text-xs border border-border-default rounded-lg">
          <WarningIcon height={30} width={30} className="shrink-0 px-1.5" /><p>The register information you entered is incorrect.</p>
        </div>}
        <form onSubmit={loginHandler} className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-4">
            <input
              ref={loginRef}
              type="email"
              name="login"
              value={values.login}
              placeholder="Email"
              onChange={(event) => valuesHandler(event)}
              className="px-3 py-2 bg-surface-input outline-2 outline-border-input rounded-lg"
            />
            <input
              ref={passwordRef}
              type="password"
              name="password"
              value={values.password}
              placeholder="Password"
              autoComplete="new-password"
              onChange={(event) => valuesHandler(event)}
              className="px-3 py-2 bg-surface-input outline-2 outline-border-input rounded-lg"
            />
            <input
              // ref={loginRef}
              type="text"
              name="username"
              // value={values.login}
              placeholder="Username"
              // onChange={(event) => valuesHandler(event)}
              className="px-3 py-2 bg-surface-input outline-2 outline-border-input rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <motion.button
              variants={buttonVariants}
              initial={isDisabled ? "disabled" : "enabled"}
              animate={isDisabled ? "disabled" : "enabled"}
              className={`my-1 py-2 w-full ${isDisabled ? "bg-secondary text-foreground-muted cursor-not-allowed" : "bg-primary text-foreground-primary cursor-pointer"} font-semibold rounded-lg`}
              disabled={isDisabled}
            >
              Log in
            </motion.button>
          </div>
        </form>
      </div>
      <div className="flex justify-center p-6 w-full bg-surface-section border-3 border-border-default rounded-2xl">
        <p className="text-sm">I already have an account. <MotionLink to="/auth/login" whileHover={{ color: "var(--secondary)" }} className="text-tertiary font-semibold cursor-pointer">Log in</MotionLink></p>
      </div>
    </div>
  </div>
}
