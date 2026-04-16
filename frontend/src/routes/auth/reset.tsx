import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/reset')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const router = useRouter();

  return <div className="flex flex-col justify-center items-center py-20 min-h-screen">
    <button onClick={() => router.history.back()}>Back</button>
    <h2>Find your account</h2>
    <div>
      <input type="text" name="reset-value" placeholder="Username or email" />
      <button onClick={() => navigate({ to: "/app" })}>Continue</button>
    </div>
  </div>
}
