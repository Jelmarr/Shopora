"use client";

import { motion } from "framer-motion";
import { SORT_OPTIONS, SortOption } from "../SortDropdown";
import CloseButton from "../CloseButton";
import { useUpdateParam } from "@/src/hooks/useUpdateParam";

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
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (id: string) => void;
}) => {
  const { updateParam } = useUpdateParam();

  if (!isOpen) return null;

  const handleSort = (sort: SortOption) => {
    onSelect?.(sort.id);
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
          {SORT_OPTIONS.map((sort) => (
            <motion.button
              key={sort.id}
              className="text-lg hover:underline cursor-pointer text-left"
              variants={itemVariants}
              onClick={() => handleSort(sort)}
            >
              {sort.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SortDropdown;
