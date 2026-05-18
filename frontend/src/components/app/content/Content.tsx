import Arrow from "@/assets/arrow-narrow.svg?react";
import Ellipsis from "@/assets/ellipsis.svg?react";
import Phone from "@/assets/phone.svg?react";
import Video from "@/assets/video.svg?react";

const Content = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* CONTENT MENU */}
      <div className="flex shrink-0 items-center justify-between px-8 h-20 w-full bg-surface-section border-b border-border-default">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex justify-center items-center h-10 w-10 bg-secondary hover:bg-hover active:bg-active text-foreground-secondary rounded-full cursor-pointer"
          >
            <Arrow height={20} width={20} />
          </button>

          <div className="flex justify-center items-center h-11 w-11 bg-secondary rounded-full">
            X
          </div>
          <div>
            <h3 className="font-semibold ">Username wybranego</h3>
            <p className="text-sm text-foreground-secondary">
              !!! Online - Last seen 2 minutes ago !!!
            </p>
          </div>
        </div>
        <div>
          <button type="button" className="cursor-pointer">
            <Phone height={24} width={24} />
          </button>
          <button type="button" className="cursor-pointer">
            <Video height={24} width={24} />
          </button>
          <button type="button" className="cursor-pointer">
            <Ellipsis height={24} width={24} />
          </button>
        </div>
      </div>
      {/* CONTENT MAIN */}
      <div className="flex flex-col flex-1 w-full bg-[#121212]">
        <div className="flex-1">MAIN KONTENT</div>
        <div className="bg-surface-section">
          <label htmlFor="message">Message...</label>
          <input id="message" name="message" type="text" />
        </div>
      </div>
    </div>
  );
};

export default Content;
