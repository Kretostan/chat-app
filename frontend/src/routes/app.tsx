import { createFileRoute } from "@tanstack/react-router";

interface User {
  id: number;
  username: string;
  email: string;
}

export const Route = createFileRoute("/app")({
  loader: async (): Promise<User[]> => {
    const url = `${import.meta.env.VITE_API_URL}/users`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  },
  component: RouteComponent,
});

function RouteComponent() {
  const users = Route.useLoaderData();

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
