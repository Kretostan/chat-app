import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/room/$roomId")({
  beforeLoad: async () => {
    const response = await fetch("/api/auth/profile");
    if (!response.ok) throw redirect({ to: "/auth/login" });
  },
  loader: async ({ params }) => {
    const response = await fetch(`/api/chat/rooms/${params.roomId}/messages`);
    if (!response.ok) throw redirect({ to: "/" });
    return response.json();
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/chat/$chatId"!</div>;
}
