"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const CustomCheckbox = ({ optionLabel }: { optionLabel?: string }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label className="relative inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className="sr-only"
      />

      {/* Box Container */}
      <div
        className={`flex items-center justify-center w-5 h-5 border border-gray-400 rounded-sm transition-all ${
          isChecked ? "bg-black" : "bg-white"
        }`}
      >
        <Check
          className={`w-4 h-4 text-white transition-opacity duration-150 ${
            isChecked ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        />
      </div>

      <span className="text-gray-900">{optionLabel}</span>
    </label>
  );
};

export default CustomCheckbox;
