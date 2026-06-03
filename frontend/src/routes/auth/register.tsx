import { createFileRoute } from "@tanstack/react-router";
import BackButton from "@/components/auth/BackButton";
import Footer from "@/components/auth/Footer";
import RegisterForm from "@/components/auth/form/RegisterForm";
import Header from "@/components/auth/Header";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen my-20">
      <BackButton />
      <div className="flex flex-col gap-3 w-110">
        <div className="flex flex-col justify-center items-center gap-6 px-8 py-10 w-full bg-surface-section border-3 border-border-default rounded-2xl">
          <Header title="Chat App" description="Create your account" />
          <RegisterForm />
        </div>
        <Footer
          text="I already have an account."
          linkText="Log in"
          to="/auth/login"
        />
      </div>
    </div>
  );
}
