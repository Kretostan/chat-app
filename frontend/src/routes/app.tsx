import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { PaginatedRooms, PublicUser } from "shared";
import EmptyContent from "@/components/app/content/EmptyContent";
import Menu from "@/components/app/menu/Menu";
import Navigation from "@/components/layout/navigation/Navigation";
import { useMobile } from "@/hooks";

export const Route = createFileRoute("/app")({
  loader: async (): Promise<{
    user: PublicUser;
    roomsData: PaginatedRooms;
  }> => {
    const [userResponse, roomsReponse] = await Promise.all([
      fetch("/api/auth/profile"),
      fetch("/api/chat/rooms"),
    ]);

    if (!userResponse.ok) throw redirect({ to: "/auth/login" });
    if (!roomsReponse.ok)
      throw new Error(`Rooms fetch failed: ${roomsReponse.status}`);

    const [user, roomsData] = await Promise.all([
      userResponse.json(),
      roomsReponse.json(),
    ]);

    return { user, roomsData };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMobile();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user, roomsData } = Route.useLoaderData();

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
            data={roomsData}
            onSelect={() => setShowMenu((prev) => !prev)}
          />
        )}
        {(!isMobile || !showMenu) && (
          <EmptyContent onBack={() => setShowMenu((prev) => !prev)} />
        )}
      </div>
    </div>
  );
}
