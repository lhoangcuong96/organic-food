import { http } from "@/lib/http";
import {
  ProductDetailResponseType,
  ProductListResponseType,
  ProductQueryType,
} from "@/validation-schema/product";

const productRequestApi = {
  getProductMetrics: () => {
    return http.get(`/products/metrics`);
  },
  getProductDetail: (slug: string) => {
    return http.get<ProductDetailResponseType>(`/products/${slug}`);
  },
  getProducts: (params: ProductQueryType) => {
    const url = `/products?page=${params.page || 1}&limit=${params.limit | 20}&
    search=${params.search}&sort=${params.sort || "name"}&order=${
      params.order || "asc"
    }`;
    return http.get<ProductListResponseType>(url);
  },
};

export default productRequestApi;
