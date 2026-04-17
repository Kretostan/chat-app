import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/chat/$chatId')({
  loader: ({ params }) => console.log(params.chatId),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/chat/$chatId"!</div>
}
