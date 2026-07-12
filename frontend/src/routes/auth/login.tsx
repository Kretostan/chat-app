import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/auth/Footer";
import LoginForm from "@/components/auth/form/LoginForm";
import Header from "@/components/auth/Header";
import Photo from "@/components/auth/login/Photo";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

type RecentSession = { username: string; sessionUuid: string };

function RouteComponent() {
  const stored = localStorage.getItem("sessions");
  const sessions: RecentSession[] | null = stored
    ? Object.values(JSON.parse(stored))
    : null;

  return (
    <div className="flex justify-center items-center gap-20 min-h-screen my-22 md:my-0">
      {sessions?.length && (
        <ul>
          {sessions?.map(({ username, sessionUuid }) => (
            <li key={sessionUuid}>{username}</li>
          ))}
        </ul>
      )}
      <Photo />
      <div className="flex flex-col justify-center items-center gap-3 w-90">
        <div className="flex flex-col justify-center items-center gap-6 px-8 py-10 w-full bg-surface-section border-3 border-border-default rounded-2xl">
          <Header title="Chat App" description="Welcome back!" />
          <LoginForm />
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
