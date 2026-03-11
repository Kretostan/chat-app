import Field from "@/components/home/stats/Field";

const Stats = () => {
  return (
    <div className="flex justify-around items-center gap-14 px-20 py-18 text-center max-w-[1200px] w-full flex-wrap">
      <Field number="10M+" description="Active Users" />
      <Field number="150+" description="Countries" />
      <Field number="99.9%" description="Uptime" />
      <Field number="24/7" description="Support" />
    </div>
  );
};

export default Stats;
