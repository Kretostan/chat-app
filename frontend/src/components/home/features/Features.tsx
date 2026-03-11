import FeatureField from "./FeatureField";

const Features = () => {
  return (
    <div className="flex flex-col items-center bg-surface-section w-screen px-6 text-center pt-20 pb-16">
      <div>
        <h4 className="text-3xl/12 md:text-5xl/18 font-bold">
          Everything you need to stay connected
        </h4>
        <p className="mt-8 mb-20 text-foreground-secondary">
          Powerful features designed to enhance your team&apos;s productivity
          and collaboration
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 flex-wrap max-w-300 w-full">
        <FeatureField icon="💬" title="Real-time Messaging">
          Instant messaging with typing indicators, read receipts, and seamless
          synchronization across all devices.
        </FeatureField>
        <FeatureField icon="📁" title="File Sharing">
          Share documents, images, and files effortlessly with drag-and-drop
          functionality and preview support.
        </FeatureField>
        <FeatureField icon="🎥" title="Video Calls">
          High-quality video conferencing with screen sharing, recording, and up
          to 100 participants.
        </FeatureField>
        <FeatureField icon="🔒" title="Enterprise security">
          End-to-end encryption, SSO integration, and compliance with industry
          security standards.
        </FeatureField>
        <FeatureField icon="🌐" title="Cross-platform">
          Available on desktop, mobile, and web with seamless synchronization
          and offline support.
        </FeatureField>
        <FeatureField icon="⚡" title="Integrations">
          Connect with your favorite tools and services to streamline your
          workflow and boost productivity.
        </FeatureField>
      </div>
    </div>
  );
};

export default Features;
