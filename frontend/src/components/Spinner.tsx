const Spinner = ({
  label,
  color = "white",
}: {
  label: string;
  color?: string;
}) => {
  return (
    <span className="flex items-center justify-center gap-2">
      <span
        className={`h-4 w-4 rounded-full border-2 border-${color} border-t-transparent animate-spin`}
      />
      {label}
    </span>
  );
};

export default Spinner;
