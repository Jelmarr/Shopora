"use client";

import { useState } from "react";
import { Slider } from "@/src/components/ui/slider";
import { Label } from "@/src/components/ui/label";

const MIN_PRICE = 0;
const MAX_PRICE = 18000;

const PriceSlider = () => {
  const [range, setRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);

  // Handle manual input changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(MIN_PRICE, Number(e.target.value) || 0);
    setRange([Math.min(newMin, range[1]), range[1]]);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.min(MAX_PRICE, Number(e.target.value) || 0);
    setRange([range[0], Math.max(newMax, range[0])]);
  };

  return (
    <div className="w-full space-y-4 font-sans select-none">
      {/* Header with Title & Collapse Chevron */}
      <div className="flex items-center justify-between cursor-pointer">
        <Label className="text-base font-semibold text-neutral-900 cursor-pointer">
          Price
        </Label>
      </div>

      <div className="space-y-6 pt-1">
        {/* Slider */}
        <Slider
          value={range}
          onValueChange={(val) => setRange(val as [number, number])}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          className="cursor-pointer"
        />

        {/* Min & Max Price Input Boxes */}
        <div className="flex items-center gap-3">
          {/* Min Price Box */}
          <div className="relative flex-1 flex items-center bg-neutral-100/80 rounded-full px-4 py-2.5">
            <span className="text-sm text-neutral-400 font-medium">₱</span>
            <input
              type="number"
              value={range[0]}
              onChange={handleMinInputChange}
              className="w-full bg-transparent text-right text-sm font-medium text-neutral-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>

          {/* Separator */}
          <span className="text-sm text-neutral-600 font-normal">to</span>

          {/* Max Price Box */}
          <div className="relative flex-1 flex items-center bg-neutral-100/80 rounded-full px-4 py-2.5">
            <span className="text-sm text-neutral-400 font-medium">₱</span>
            <input
              type="number"
              value={range[1]}
              onChange={handleMaxInputChange}
              className="w-full bg-transparent text-right text-sm font-medium text-neutral-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
