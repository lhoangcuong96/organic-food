import { http } from "@/lib/http";
import {
  AddProductToCartRequestType,
  GetCartResponseType,
  UpdateCartRequestType,
} from "@/validation-schema/cart";
import { MessageResponseType } from "@/validation-schema/common";

export const cartRequestApis = {
  addProductToCart: async (data: AddProductToCartRequestType) => {
    return http.post<MessageResponseType>("/cart/add", data, {
      isPrivate: true,
    });
  },

  getCart: async () => {
    return http.get<GetCartResponseType>("/cart", {
      isPrivate: true,
    });
  },

  updateCartItemQuantity: async (data: UpdateCartRequestType) => {
    return http.put<MessageResponseType>("/cart", data, {
      isPrivate: true,
    });
  },

  removeProductFromCart: async (productId: string) => {
    return http.delete<MessageResponseType>(
      `/cart/${productId}`,
      {},
      {
        isPrivate: true,
      }
    );
  },
};
