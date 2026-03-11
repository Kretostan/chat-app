type MessageProps = {
  children: React.ReactNode;
  mobile?: "sm:flex" | "md:flex";
  justify?: boolean;
  background: "bg-surface-message-user" | "bg-surface-message-answer";
};

const Message = ({ children, mobile, justify, background }: MessageProps) => {
  const display = mobile ? `hidden ${mobile}` : "flex";
  const bottomBorder = justify ? "rounded-bl-2xl" : "rounded-br-2xl";

  return (
    <div className={`${display} ${justify ? "justify-end" : "justify-start"}`}>
      <p
        className={`p-3 ${background} max-w-2/3 md:max-w-1/2 rounded-t-2xl ${bottomBorder} text-sm`}
      >
        {children}
      </p>
    </div>
  );
};

export default Message;
