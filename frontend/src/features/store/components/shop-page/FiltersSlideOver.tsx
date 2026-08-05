import { motion, AnimatePresence } from "framer-motion";
import StoreCheckBox from "../StoreCheckBox";
import SortDropdown from "../SortDropdown";
import PriceSlider from "../PriceSlider";
import CloseButton from "../CloseButton";
import { useQuery } from "@tanstack/react-query";
import { storeApiFetch } from "@/src/lib/store-api";
import { StoreSlugResponse } from "@/src/lib/types/store-front";
import Spinner from "@/src/components/Spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface Category {
  id: string;
  name: string;
}

const FiltersSlideOver = ({
  store,
  isOpen,
  onClose,
}: {
  store: StoreSlugResponse;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategoriesParam = searchParams.get("categories") || "";
  const selectedCategories = currentCategoriesParam
    ? currentCategoriesParam.split(",")
    : [];

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories", store.id],
    queryFn: () => storeApiFetch(`/api/store/categories/${store.id}`),
    enabled: isOpen && !!store.id,
  });

  const handleToggleCategory = (categoryName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(categoryName)) {
      updatedCategories = updatedCategories.filter(
        (cat) => cat !== categoryName,
      );
    } else {
      updatedCategories.push(categoryName);
    }

    if (updatedCategories.length > 0) {
      params.set("categories", updatedCategories.join(","));
    } else {
      params.delete("categories");
    }

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

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
                  {isLoading && <Spinner label="Loading..." />}

                  {isError && (
                    <p className="text-sm text-red-500">
                      Failed to load categories
                    </p>
                  )}

                  {!isLoading &&
                    !isError &&
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => handleToggleCategory(cat.name)}
                      >
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
