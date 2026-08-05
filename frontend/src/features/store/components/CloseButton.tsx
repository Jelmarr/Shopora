import { X } from "lucide-react";

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      onClick={onClose}
      className={`relative z-10 shrink-0 p-3 text-base font-medium text-neutral-800 bg-white rounded-full flex items-center gap-3 border cursor-pointer
    overflow-hidden transition-all duration-300 hover:text-neutral-100 before:content-[''] before:absolute before:top-0 
    before:left-0 before:h-full before:w-0 before:rounded-2xl before:bg-neutral-800 before:-z-10 before:shadow-lg before:transition-all before:duration-300 hover:before:w-full`}
    >
      <X size={18} />
    </button>
  );
};

export default CloseButton;
