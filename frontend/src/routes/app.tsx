import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Content from "@/components/app/content/Content";
import Menu from "@/components/app/menu/Menu";
import Navigation from "@/components/layout/navigation/Navigation";
import { useMobile } from "@/hooks";
import type { User } from "@/types";

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
  const isMobile = useMobile();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const users = Route.useLoaderData();
  // const navigate = useNavigate({ from: Route.fullPath });

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      {!isMobile && (
        <Navigation>
          <div className="flex gap-4">
            <p>
              Hello <span className="text-secondary">USERNAME</span>!
            </p>
            <button
              type="submit"
              className="hover:text-tertiary cursor-pointer"
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
