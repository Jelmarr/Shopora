import { LucideIcon } from "lucide-react";

const StoreButton = ({
  buttonText,
  Icon,
  whiteBorder,
  onClick,
}: {
  buttonText: string;
  Icon?: LucideIcon;
  whiteBorder: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative z-10 shrink-0 px-6 py-3.5 text-base font-medium text-neutral-800 bg-white rounded-full cursor-pointer flex items-center gap-3 border-2 ${whiteBorder ? "border-white" : "border-black"}
    overflow-hidden transition-all duration-300 hover:text-neutral-100 before:content-[''] before:absolute before:top-0 
    before:left-0 before:h-full before:w-0 before:rounded-2xl before:bg-neutral-800 before:-z-10 before:shadow-lg before:transition-all before:duration-300 hover:before:w-full`}
    >
      {Icon && <Icon size={20} />}
      {buttonText}
    </button>
  );
};

export default StoreButton;
