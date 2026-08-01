import { motion, AnimatePresence } from "framer-motion";
import StoreCheckBox from "../StoreCheckBox";
import SortDropdown from "../SortDropdown";
import PriceSlider from "../PriceSlider";
import CloseButton from "../CloseButton";

export interface Category {
  id: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { id: "prescription-medicines", name: "Prescription Medicines" },
  { id: "over-the-counter", name: "Over-the-Counter (OTC)" },
  { id: "vitamins-supplements", name: "Vitamins & Supplements" },
  { id: "first-aid-wound-care", name: "First Aid & Wound Care" },
  { id: "personal-care", name: "Personal Care" },
  { id: "skin-care", name: "Skin Care" },
  { id: "hair-care", name: "Hair Care" },
  { id: "baby-child-care", name: "Baby & Child Care" },
  { id: "medical-supplies", name: "Medical Supplies & Devices" },
  { id: "diagnostic-monitors", name: "Diagnostic Monitors" },
  { id: "oral-care", name: "Oral Care" },
  { id: "eye-ear-care", name: "Eye & Ear Care" },
  { id: "pain-relief", name: "Pain & Fever Relief" },
  { id: "digestive-health", name: "Digestive & Gut Health" },
  { id: "cold-flu-allergy", name: "Cold, Flu & Allergy" },
  { id: "sexual-wellness", name: "Sexual Wellness" },
  { id: "feminine-hygiene", name: "Feminine Hygiene" },
  { id: "elderly-mobility-care", name: "Elderly & Mobility Care" },
  { id: "sports-nutrition", name: "Sports Nutrition" },
  { id: "sanitizers-disinfectants", name: "Sanitizers & Disinfectants" },
];

const FiltersSlideOver = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-10 w-140 max-w-full bg-white h-full shadow-2xl rounded-r-4xl"
          >
            <div className="flex items-center justify-between pb-8 py-6 px-12 border-b">
              <h2 className="text-3xl font-bold ">Filters</h2>
              <CloseButton onClose={onClose} />
            </div>

            {/* Sort By */}
            <div className="py-8 px-12 flex flex-col gap-12">
              <SortDropdown />

              {/* Categories Checkbox */}
              <div>
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-neutral-300">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <StoreCheckBox optionLabel={cat.name} />
                    </div>
                  ))}
                </div>
                <div className="border-b mt-6" />
              </div>

              <div>
                <PriceSlider />
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FiltersSlideOver;
