"use client";

import { motion } from "framer-motion";
import { SORT_OPTIONS, SortOption } from "../SortDropdown";
import CloseButton from "../CloseButton";
import { useUpdateParam } from "@/hooks/useUpdateParam";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dot } from "lucide-react";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { color: "#000000" },
  visible: {
    color: "#ffffff",
    transition: { duration: 0.25 },
  },
};

const SortDropdown = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { updateParam } = useUpdateParam();
  const searchParams = useSearchParams();

  if (!isOpen) return null;

  const currentSort = searchParams.get("sortBy") || "featured";

  const handleSort = (sort: SortOption) => {
    onClose();

    updateParam("sortBy", sort.id);
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="bg-[#141414] absolute right-0 top-0 w-80 z-50 p-5 rounded-3xl">
        <div className="flex justify-between items-center">
          <p className="text-stone-500 font-bold tracking-widest uppercase text-sm">
            Sort By
          </p>
          <CloseButton onClose={onClose} />
        </div>

        <motion.div
          className="flex flex-col gap-3 items-start"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {SORT_OPTIONS.map((sort) => {
            const isSelected = currentSort == sort.id;

            return (
              <motion.button
                key={sort.id}
                className={`text-lg cursor-pointer text-left flex items-center justify-between ${
                  isSelected ? "text-stone-500! font-medium" : "hover:underline"
                } `}
                variants={itemVariants}
                onClick={() => handleSort(sort)}
              >
                {isSelected && <Dot />}
                {sort.label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default SortDropdown;
