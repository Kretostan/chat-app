import Alert from "@/components/auth/Alert";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/Form";
import Header from "@/components/auth/Header";
import Photo from "@/components/auth/login/Photo";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [hasError, setHasError] = useState<boolean>(false);

  return <div className="flex justify-center items-center gap-20 min-h-screen my-22 md:my-0">
    <Photo />
    <div className="flex flex-col justify-center items-center gap-3 w-90">
      <div className="flex flex-col justify-center items-center gap-6 px-8 py-10 w-full bg-surface-section border-3 border-border-default rounded-2xl">
        <Header title="Chat App" description="Welcome back!" />
        {hasError && <Alert description="The login information you entered is incorrect. " hasLink />}
        <Form setError={setHasError} from="/auth/login" mode="login" />
      </div>
      <Footer
        text="Don't have ana account?"
        linkText="Sign up"
        to="/auth/register"
      />
    </div>
  </div>
}
