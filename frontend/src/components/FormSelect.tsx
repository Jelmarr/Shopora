interface FormSelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: FormSelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FormSelect = ({
  label,
  name,
  options,
  value,
  onChange,
}: FormSelectProps) => {
  return (
    <div className="relative w-full font-['Segoe_UI',sans-serif]">
      <select
        name={name}
        value={value}
        onChange={onChange}
        defaultValue=""
        required
        className="peer w-full rounded-md border bg-transparent p-[0.8em] text-base outline-none transition-colors duration-300 focus:border-[rgb(150,150,200)] appearance-none cursor-pointer text-stone-900 invalid:text-transparent"
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="text-stone-900 bg-white"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom Chevron Icon */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-500">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>

      <label
        className="pointer-events-none absolute left-0 ml-[0.5em] p-[0.8em] text-base text-[rgb(100,100,100)] transition-all duration-300 ease-in-out 
        peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:ml-[1.3em] peer-focus:p-[0.4em] peer-focus:bg-white 
        peer-valid:-translate-y-1/2 peer-valid:scale-90 peer-valid:ml-[1.3em] peer-valid:p-[0.4em] peer-valid:bg-white"
      >
        {label}
      </label>
    </div>
  );
};
