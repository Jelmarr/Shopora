import Link from "next/link";

const PrimaryButton = ({ textSize }: { textSize?: string }) => {
  return (
    <Link
      href="/lookup"
      className={`bg-slate-900 text-white px-4 py-2 rounded-md mt-6 hover:bg-slate-800 cursor-pointer ${textSize}`}
    >
      Start for free
    </Link>
  );
};

export default PrimaryButton;
