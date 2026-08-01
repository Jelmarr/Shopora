import CloseButton from "../CloseButton";
import { SORT_OPTIONS } from "../SortDropdown";

const SortDropdown = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex" onClick={onClose} />

      <div className="bg-[#141414] absolute top-0 right-0 w-80 z-50 p-6 rounded-4xl">
        <div className="flex justify-between items-center">
          <p className="text-stone-500 font-bold tracking-widest uppercase text-sm">
            Sort By
          </p>
          <CloseButton onClose={onClose} />
        </div>
        <div className="flex flex-col gap-3 text-white items-start mt-4">
          {SORT_OPTIONS.map((sort) => (
            <button
              key={sort.id}
              className="text-xl hover:underline cursor-pointer"
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SortDropdown;
