import { createFileRoute } from '@tanstack/react-router'

interface AppData {
  name: string,
  surname: string
}

export const Route = createFileRoute('/app')({
  loader: async (): Promise<AppData> => {
    const url = import.meta.env.VITE_API_URL;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const result = await response.json();
    return result;
  },
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData();

  return <div>
    <h2>App Component</h2>
    <p>Data - {data ? `${data.name} ${data.surname}` : "no data provided."}</p>
  </div>
}
