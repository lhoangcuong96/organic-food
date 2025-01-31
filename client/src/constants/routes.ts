// src/routes.ts

export const routePath = {
  signIn: "/sign-in",
  signOut: "/sign-out",
  signUp: "/sign-up",
  customer: {
    home: "/customer/home",
    products: "/customer/products",
    news: "/customer/news",
    promotionalProduct: "/customer/product",
    introduce: "/customer/introduce",
    contact: "/customer/contact-us",
    membershipPolicy: "/customer/membership-policy",
    productDetail: "/customer/product-detail/",

    // private routes
    account: {
      profile: "/customer/account/profile",
      orders: "/customer/account/orders",
      address: "/customer/account/address",
      vouchers: "/customer/account/vouchers",
      shopVouchers: "/customer/account/shop-vouchers",
      changePassword: "/customer/account/change-password",
      changePhoneNumber: "/customer/account/change-phone-number",
      changeEmail: "/customer/account/change-email",
      notifications: "/customer/account/notifications",
      bank: "/customer/account/bank",
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
