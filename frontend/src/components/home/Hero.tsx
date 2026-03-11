import OutlineButton from "@/components/home/OutlineButton";
import PrimaryButton from "@/components/home/PrimaryButton";
import Message from "./Message";

const Hero = () => {
  return (
    <header className="flex flex-col justify-center items-center gap-8 md:gap-10 lg:gap-12 mt-20 px-4 pt-20 pb-18 min-h-screen w-full bg-linear-to-r from-primary to-secondary text-center">
      <div className="flex flex-col justify-center items-center gap-6 md:gap-8 lg:gap-10 px-2 md:px-0">
        <h1 className="font-bold text-white text-3xl sm:text-4xl/12 md:text-6xl/20">
          Connect. Collaborate. Communicate.
        </h1>
        <p className="max-w-[400px] sm:max-w-[550px] text-white text-lg md:text-xl">
          Experience seamless team communication with our modern, intuitive chat
          platform designed for the future of work.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 px-4 md:px-0 w-full md:w-auto">
        <PrimaryButton>Start Free Trial</PrimaryButton>
        <OutlineButton>Watch Demo</OutlineButton>
      </div>
      <div className="bg-surface-elevated mx-4 mt-6 p-6 md:p-10 rounded-2xl max-w-[900px] w-full">
        <div className="flex flex-col bg-surface-base p-5 gap-4 rounded-xl">
          <div className="flex bg-surface-elevated p-4 gap-4 border border-border-default rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-primary font-semibold text-white rounded-full">
              JD
            </div>
            <div className="flex flex-col items-start">
              <p>John Doe</p>
              <p className="text-foreground-secondary text-sm">Online</p>
            </div>
          </div>
          <Message background="bg-surface-message-user">
            Hey team! How&apos;s the project coming along?
          </Message>
          <Message justify background="bg-surface-message-answer">
            Great progress! We&apos;re on track for the deadline.
          </Message>
          <Message mobile="sm:flex" background="bg-surface-message-user">
            Perfect! Let&apos;s schedule a quick sync tomorrow.
          </Message>
          <Message
            mobile="md:flex"
            justify
            background="bg-surface-message-answer"
          >
            Sounds good! I&apos;ll send out a calendar invite.
          </Message>
          <Message mobile="md:flex" background="bg-surface-message-user">
            Thanks! Looking forward to it. 🚀
          </Message>
        </div>
      </div>
    </header>
  );
};

export default Hero;
