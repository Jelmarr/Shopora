"use client";

import { Dot, SlidersHorizontal } from "lucide-react";
import StoreButton from "../StoreButton";
import StoreSearch from "../StoreSearch";
import FiltersSlideOver from "./FiltersSlideOver";
import { useState } from "react";
import SortDropdown from "./SortDropdown";

const SearchAndFilter = () => {
  const [isOpenFiltersSlider, setIsOpenFitlersSlider] = useState(false);
  const [isOpenSort, setIsOpenSort] = useState(false);

  return (
    <>
      <section className="flex items-center justify-between gap-4">
        <StoreButton
          Icon={SlidersHorizontal}
          buttonText="Show filters"
          whiteBorder={false}
          onClick={() => setIsOpenFitlersSlider(true)}
        />

        <StoreSearch placeholder="Search product..." />
        <div className="relative">
          <StoreButton
            buttonText="Featured"
            Icon={Dot}
            whiteBorder={false}
            onClick={() => setIsOpenSort(true)}
          />
          <SortDropdown
            isOpen={isOpenSort}
            onClose={() => setIsOpenSort(false)}
          />
        </div>
      </section>
      <FiltersSlideOver
        isOpen={isOpenFiltersSlider}
        onClose={() => setIsOpenFitlersSlider(false)}
      />
    </>
  );
};

export default SearchAndFilter;
