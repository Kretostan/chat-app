import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/room/$roomId")({
  beforeLoad: async () => {
    const response = await fetch("/api/auth/profile");
    if (!response.ok) throw redirect({ to: "/auth/login" });
  },
  loader: async ({ params }) => {
    console.log(params.roomId);
    const response = await fetch(`/api/chat/rooms/${params.roomId}/messages`);

    // TODO: Przed błędem, jeśli będzie 403 (Unauthorized) - przekierowanie do /app
    if (!response.ok) return { error: "Error while fetching chats" };

    return response;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/chat/$chatId"!</div>;
}
