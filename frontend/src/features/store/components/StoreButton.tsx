const StoreButton = ({ buttonText }: { buttonText: string }) => {
  return (
    <button className="relative z-10 px-6 py-3.5 text-base font-semibold text-neutral-800 bg-white rounded-full cursor-pointer shadow-lg overflow-hidden transition-all duration-300 hover:text-neutral-100 before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-2xl before:bg-neutral-800 before:-z-10 before:shadow-lg before:transition-all before:duration-300 hover:before:w-full">
      {buttonText}
    </button>
  );
};

export default StoreButton;
