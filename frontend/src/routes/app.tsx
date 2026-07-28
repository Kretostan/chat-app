import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { ChatRoomDetails, PublicUser } from "shared";
import Content from "@/components/app/content/Content";
import Menu from "@/components/app/menu/Menu";
import Navigation from "@/components/layout/navigation/Navigation";
import { useMobile } from "@/hooks";

export const Route = createFileRoute("/app")({
  loader: async (): Promise<{
    user: PublicUser;
    rooms: ChatRoomDetails[] | [];
  }> => {
    const [userResponse, roomsReponse] = await Promise.all([
      fetch("/api/auth/profile"),
      fetch("/api/chat/rooms"),
    ]);

    if (!userResponse.ok) throw redirect({ to: "/auth/login" });
    if (!roomsReponse.ok)
      throw new Error(`Rooms fetch failed: ${roomsReponse.status}`);

    const [user, rooms] = await Promise.all([
      userResponse.json(),
      roomsReponse.json(),
    ]);

    return { user, rooms };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMobile();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user, rooms } = Route.useLoaderData();

  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {!isMobile && (
        <Navigation>
          <div className="flex gap-4">
            <p>
              Hello <span className="text-secondary">{user.username}</span>!
            </p>
            <button
              type="submit"
              className="hover:text-tertiary cursor-pointer"
              onClick={async () => {
                const response = await fetch("/api/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });
                if (!response.ok) {
                  throw new Error("Nie udało się wylogować");
                }
                navigate({ to: "/" });
              }}
            >
              Logout
            </button>
          </div>{" "}
        </Navigation>
      )}
      <div className="flex lg:mt-22 max-h-200 h-full 2xl:max-w-400 w-full md:border-4 md:border-border-default md:rounded-xl md:overflow-hidden">
        {showMenu && (
          <Menu
            currentUserId={user.id}
            rooms={rooms}
            onSelect={() => setShowMenu((prev) => !prev)}
          />
        )}
        {(!isMobile || !showMenu) && (
          <Content onBack={() => setShowMenu((prev) => !prev)} />
        )}
      </div>
    </div>
  );
}
