import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { PublicUser } from "shared";
import Content from "@/components/app/content/Content";
import Menu from "@/components/app/menu/Menu";
import Navigation from "@/components/layout/navigation/Navigation";
import { useMobile } from "@/hooks";

export const Route = createFileRoute("/app")({
  beforeLoad: async () => {
    const response = await fetch("/api/auth/me");
    if (!response.ok) {
      throw redirect({ to: "/auth/login" });
    }
  },
  loader: async (): Promise<{ user: PublicUser; users: PublicUser[] }> => {
    const [userResponse, usersResponse] = await Promise.all([
      await fetch("/api/auth/me"),
      await fetch("/api/users"),
    ]);

    if (!userResponse.ok)
      throw new Error(`Response status: ${userResponse.status}`);
    if (!usersResponse.ok)
      throw new Error(`Response status: ${usersResponse.status}`);

    const [user, users] = await Promise.all([
      await userResponse.json(),
      await usersResponse.json(),
    ]);

    return { user, users };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useMobile();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user, users } = Route.useLoaderData();
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
          <Menu users={users} onSelect={() => setShowMenu((prev) => !prev)} />
        )}
        {(!isMobile || !showMenu) && (
          <Content onBack={() => setShowMenu((prev) => !prev)} />
        )}
      </div>
    </div>
  );
}
