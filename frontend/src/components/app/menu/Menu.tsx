import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { PaginatedRooms, RoomMemberInfo } from "shared";
import Add from "@/assets/add-mark.svg?react";
import Arrow from "@/assets/arrow-narrow.svg?react";
import Ellipsis from "@/assets/ellipsis.svg?react";
import Glass from "@/assets/magnifying-glass.svg?react";
import { useMobile } from "@/hooks";

const Menu = ({
  currentUserId,
  data,
  onSelect,
}: {
  currentUserId: number;
  data: PaginatedRooms;
  onSelect: () => void;
}) => {
  const isMobile = useMobile();
  const navigate = useNavigate({ from: "/app" });

  const openRoom = async (id: number) => {
    navigate({ to: `/app/room/${id}` });
  };

  return (
    <div className="flex flex-col gap-2.5 h-screen md:h-full w-screen lg:max-w-85 lg:w-full bg-surface-section">
      {/* MENU HEADER */}
      <div className="flex items-center justify-between px-4 py-6 h-20 bg-secondary">
        {/* HEADER */}
        <div>
          <h3 className="font-semibold">Messages</h3>
          <p className="text-sm text-foreground-primary/80">Stay connected</p>
        </div>
        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex justify-center items-center h-10 w-10 bg-transparent hover:bg-hover active:bg-active text-foreground-secondary rounded-full cursor-pointer"
          >
            <Add height={20} width={20} />
          </button>
          <button
            type="button"
            className="flex justify-center items-center h-10 w-10 bg-transparent hover:bg-hover active:bg-active text-foreground-secondary rounded-full cursor-pointer"
          >
            <Ellipsis height={18} width={18} />
          </button>
          {isMobile && (
            <button
              type="button"
              onClick={onSelect}
              className="flex justify-center items-center h-10 w-10 bg-transparent hover:bg-hover active:bg-active text-foreground-secondary rounded-full cursor-pointer"
            >
              <Arrow height={20} width={20} />
            </button>
          )}
        </div>
      </div>
      {/* SEARCH INPUT */}
      <div className="relative flex mx-2.5 my-2.5 bg-surface-elevated border border-border-default rounded-xl">
        <label
          htmlFor="search"
          className="absolute top-1/2 left-4 -translate-y-1/2"
        >
          Search
        </label>
        <input
          id="search"
          name="search"
          type="text"
          className="py-2.5 w-full"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1 -translate-y-1/2 flex justify-center items-center h-10 w-10 bg-transparent hover:bg-hover active:bg-active text-foreground-secondary rounded-full cursor-pointer"
        >
          {/* FIX: Default - text-foreground-secondary, active/hover - text-foreground-primary */}
          <Glass height={14} width={14} />
        </button>
      </div>
      {/* USERS LIST */}
      <ul className="flex flex-col gap-2 h-full overflow-scroll">
        {data.rooms.length ? (
          data.rooms.map((room) => {
            const otherMember =
              room.type === "dm"
                ? room.members.find((member) => member.id !== currentUserId)
                : null;
            return (
              <motion.li
                id={room.id.toString()}
                key={room.id}
                className="flex gap-3 py-3 px-4 hover:bg-primary/20 border-r-2 border-transparent hover:border-primary cursor-pointer"
                onClick={() => openRoom(room.id)}
              >
                <div className="flex justify-center items-center h-11 w-11 bg-secondary rounded-full shrink-0">
                  {room.type === "dm"
                    ? otherMember?.username.charAt(0).toLocaleUpperCase()
                    : room.name?.charAt(0).toLocaleUpperCase()}
                </div>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <p>
                      {room.type === "dm" ? otherMember?.username : room.name}
                    </p>
                    <p className="text-xs">
                      {room.lastMessage?.content ?? "No messages yet"}
                    </p>
                  </div>
                  <div
                    className={`h-2 w-2 mr-1 ${otherMember?.username === "bob" ? "bg-error" : "bg-success"} rounded-full`}
                  ></div>
                </div>
              </motion.li>
            );
          })
        ) : (
          <p>"No chat rooms yet"</p>
        )}
      </ul>
    </div>
  );
};

export default Menu;
