const StorePrimaryButton = ({ label }: { label: string }) => {
  return (
    <button
      className={`relative z-10 w-full shrink-0 px-6 py-3.5 text-base font-medium border-2 border-black rounded-full transition-colors duration-300 overflow-hidden 
                  bg-neutral-800 text-white hover:text-neutral-800 cursor-pointer before:content-[''] before:absolute before:inset-0 before:w-0 before:bg-white before:-z-10 before:transition-all before:duration-300 
                  hover:before:w-full
              `}
    >
      {label}
    </button>
  );
};

export default StorePrimaryButton;
