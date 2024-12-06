// src/routes.ts

export const routePath = {
  customer: {
    home: "/customer/home",
    signIn: "/customer/sign-in",
    signOut: "/customer/sign-out",
    signUp: "/customer/sign-up",
    product: "/customer/collection",
    news: "/customer/news",
    promotionalProduct: "/customer/product",
    introduce: "/customer/introduce",
    contact: "/customer/contact",
    membershipPolicy: "/customer/membership-policy",

    // private routes
    account: {
      profile: "/customer/account/profile",
      order: "/customer/account/order",
      wishList: "/customer/account/wish-list",
      address: "/customer/account/address",
      changePassword: "/customer/account/change-password",
    },
  },
  error: "/error",
};
