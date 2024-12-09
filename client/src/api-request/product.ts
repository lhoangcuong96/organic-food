import { http } from "@/lib/http";
import { ProductDetailResponseType } from "@/validation-schema/product";

const productRequestApi = {
  getProductDetail: (slug: string) => {
    return http.get<ProductDetailResponseType>(`/products/${slug}`);
  },
};

export default productRequestApi;
