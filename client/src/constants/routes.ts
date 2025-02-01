// src/routes.ts

export const routePath = {
  signIn: "/sign-in",
  signOut: "/sign-out",
  signUp: "/sign-up",
  customer: {
    home: "/home",
    products: "/products",
    news: "/news",
    promotionalProduct: "/product",
    introduce: "/about-us",
    contact: "/contact-us",
    membershipPolicy: "/membership-policy",
    storeLocations: "/store-locations",
    productDetail: "/product-detail/",

    // private routes
    account: {
      profile: "/account/profile",
      orders: "/account/orders",
      address: "/account/address",
      vouchers: "/account/vouchers",
      shopVouchers: "/account/shop-vouchers",
      changePassword: "/account/change-password",
      changePhoneNumber: "/account/change-phone-number",
      changeEmail: "/account/change-email",
      notifications: "/account/notifications",
      bank: "/account/bank",
    },
  },
  admin: {
    home: "/admin/home",
    statistic: "/admin/statistic",
    product: {
      list: "/admin/product/list",
      add: "/admin/product/add-new",
    },
    category: {
      list: "/admin/category/list",
      add: "/admin/category/add-new",
    },
  },
  error: "/error",
};
