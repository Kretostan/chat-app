interface FieldProps {
  number: string;
  description: string;
}

const Field = ({ number, description }: FieldProps) => {
  return (
    <div>
      <p className="text-4xl md:text-5xl text-primary font-bold">{number}</p>
      <p className="text-foreground-secondary pt-6 text-lg">{description}</p>
    </div>
  );
};

export default Field;
