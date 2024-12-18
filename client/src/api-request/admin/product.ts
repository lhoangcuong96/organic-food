import { http } from "@/lib/http";
import {
  ProductListResType,
  ProductListQueryType,
} from "@/validation-schema/admin/product";

export const adminProductApiRequest = {
  getProducts: (params: ProductListQueryType) => {
    const url = `/admin/products?page=${params.page || 1}&limit=${
      params.limit | 20
    }&
       search=${params.search}&sort=${params.sort || "name"}&order=${
      params.order || "asc"
    }`;
    return http.get<ProductListResType>(url, {
      isAdminRequest: true,
    });
  },
};
