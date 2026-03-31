import { FEATURES } from "@/data/features";
import FeatureField from "./FeatureField";

const Features = () => {
	return (
		<div className="flex flex-col items-center bg-surface-section w-full px-6 text-center pt-20 pb-16">
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
		</div>
	);
};

export default Features;
