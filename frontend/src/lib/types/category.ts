export type CategoryStatus = "Active" | "Inactive";

export type TCategory = {
  id: string;
  name: string;
  description?: string;
  parentCategoryName: null | string;
  parentCategoryId: null | string;
  status: CategoryStatus;
  productCount: number;
};

export type SortByCategory = "name" | "productcount" | "isactive";

export type LookupCategory = Pick<
  TCategory,
  "name" | "id" | "parentCategoryName"
>;
