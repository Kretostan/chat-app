import { FEATURES } from "@/data/features";
import FeatureField from "./FeatureField";

const Features = () => {
  return (
    <section
      id="features"
      className="flex flex-col items-center px-6 pt-20 pb-16 scroll-mt-20 w-full bg-surface-section text-center"
    >
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
        {FEATURES.map(({ id, ...rest }) => (
          <FeatureField key={id} {...rest} />
        ))}
      </div>
    </section>
  );
};

export default Features;
