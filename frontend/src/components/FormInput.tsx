const FormInput = ({ label }: { label: string }) => {
  return (
    <div className="relative w-full font-['Segoe_UI',sans-serif]">
      <input
        type="text"
        required
        name="user_contact_input"
        autoComplete="new-password"
        placeholder=" "
        className="peer w-full rounded-md border bg-transparent p-[0.8em] text-base outline-none transition-colors duration-300 focus:border-[rgb(150,150,200)]
      [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_white_inset]
      [&:-webkit-autofill]:[-webkit-text-fill-color:#000]"
      />
      <label
        className="pointer-events-none absolute left-0 ml-[0.5em] p-[0.8em] text-base text-[rgb(100,100,100)] transition-all duration-300 
      ease-in-out peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:ml-[1.3em] peer-focus:p-[0.4em] peer-focus:bg-white 
      peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:ml-[1.3em] peer-[:not(:placeholder-shown)]:p-[0.4em] peer-[:not(:placeholder-shown)]:bg-white"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
