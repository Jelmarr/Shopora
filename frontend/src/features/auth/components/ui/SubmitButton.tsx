import Spinner from "@/components/Spinner";

const SubmitButton = ({
  name,
  type = "button",
  isLoading,
  loadingLabel,
  disabled,
}: {
  name: string;
  isLoading: boolean;
  loadingLabel: string;
  disabled: boolean;
  type: "button" | "submit" | "reset";
}) => {
  return (
    <button
      disabled={disabled}
      className={`w-full font-semibold p-2 rounded-lg transition-colors duration-200 ${disabled ? "bg-primary-disabled text-primary-disabled-foreground pointer-events-none" : "bg-primary text-white hover:bg-slate-800"}`}
      type={type}
    >
      {isLoading ? <Spinner label={loadingLabel} /> : <>{name}</>}
    </button>
  );
};

export default SubmitButton;
