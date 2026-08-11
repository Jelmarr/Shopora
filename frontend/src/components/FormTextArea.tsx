interface FormTextareaProps {
  label: string;
  name: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const FormTextarea = ({
  label,
  name,
  rows = 4,
  value,
  onChange,
}: FormTextareaProps) => {
  return (
    <div className="relative w-full font-['Segoe_UI',sans-serif]">
      <textarea
        name={name}
        rows={rows}
        placeholder=" "
        value={value}
        required
        onChange={onChange}
        className="peer w-full rounded-md border bg-transparent p-[0.8em] text-base outline-none transition-colors duration-300 focus:border-[rgb(150,150,200)] resize-y min-h-[120px]"
      />
      <label
        className="pointer-events-none absolute left-0 ml-[0.5em] p-[0.8em] text-base text-[rgb(100,100,100)] transition-all duration-300 ease-in-out 
        peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:ml-[1.3em] peer-focus:p-[0.4em] peer-focus:bg-white 
        peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:ml-[1.3em] peer-[:not(:placeholder-shown)]:p-[0.4em] peer-[:not(:placeholder-shown)]:bg-white"
      >
        {label}
      </label>
    </div>
  );
};
