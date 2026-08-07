const Input = ({
  name,
  children,
  ...props
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <>
    <label
      htmlFor={name}
      className="text-xs font-medium text-foreground-secondary uppercase tracking-wider ml-0.5"
    >
      {children}
    </label>
    <input
      name={name}
      {...props}
      className="w-full px-4 py-3 text-sm bg-surface-input border border-border-default rounded-lg outline-none transition-all placeholder:text-foreground-muted focus:border-primary"
    />
  </>
);

export default Input;
