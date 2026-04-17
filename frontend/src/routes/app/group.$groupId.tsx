import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/group/$groupId')({
  loader: ({ params }) => console.log(params.groupId),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/group/$groupId"!</div>
}
