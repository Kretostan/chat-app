import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/auth/Footer";
import Form from "@/components/auth/form/Form";
import Header from "@/components/auth/Header";
import Photo from "@/components/auth/login/Photo";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center gap-20 min-h-screen my-22 md:my-0">
      <Photo />
      <div className="flex flex-col justify-center items-center gap-3 w-90">
        <div className="flex flex-col justify-center items-center gap-6 px-8 py-10 w-full bg-surface-section border-3 border-border-default rounded-2xl">
          <Header title="Chat App" description="Welcome back!" />
          <Form from="/auth/login" mode="login" />
        </div>
        <Footer
          text="Don't have ana account?"
          linkText="Sign up"
          to="/auth/register"
        />
      </div>
    </div>
  );
}
