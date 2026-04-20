import Alert from "@/components/auth/Alert";
import BackButton from "@/components/auth/BackButton";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/form/Form";
import Header from "@/components/auth/Header";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [hasError, setHasError] = useState<boolean>(false);

  return <div className="flex flex-col justify-center items-center min-h-screen my-20">
    <BackButton />
    <div className="flex flex-col gap-3 w-110">
      <div className="flex flex-col justify-center items-center gap-6 px-8 py-10 w-full bg-surface-section border-3 border-border-default rounded-2xl">
        <Header title="Chat App" description="Create your account" />
        {hasError && <Alert description="The register information you entered is incorrect." />}
        <Form setError={setHasError} from="/auth/register" mode="register" />
      </div>
      <Footer
        text="I already have an account."
        linkText="Log in"
        to="/auth/login"
      />
    </div>
  </div>
}
