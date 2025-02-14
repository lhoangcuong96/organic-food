import { http } from "@/lib/http";
import { CategoryInListType } from "@/validation-schema/category";

export const categoryApiRequests = {
  getListCategory: () => {
    return http.get<CategoryInListType[]>("/category");
  },
};
