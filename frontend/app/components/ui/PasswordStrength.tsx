const getStrength = (password: string) => {
  if (password.length === 0) return 0;
  if (password.length < 8) return 1;
  const hasNumber = /[0-9]/.test(password);
  if (hasNumber) return 3; // strong
  return 2; // good
};

const strengthConfig = [
  { label: "", color: "" },
  { label: "Too short", color: "bg-red-400", textColor: "text-red-400" },
  { label: "Good", color: "bg-yellow-400", textColor: "text-yellow-500" },
  { label: "Strong", color: "bg-green-500", textColor: "text-green-500" },
];

const PasswordStrength = ({ password }: { password: string }) => {
  if (password.length === 0) return null;

  const strength = getStrength(password);
  const { label, color, textColor } = strengthConfig[strength];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {[1, 2, 3].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              strength >= level ? color : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${textColor}`}>{label}</p>
    </div>
  );
};

export default PasswordStrength;
