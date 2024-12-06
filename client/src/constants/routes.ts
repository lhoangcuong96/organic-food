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
      orders: "/customer/account/orders",
      address: "/customer/account/address",
      vouchers: "/customer/account/vouchers",
      changePassword: "/customer/account/change-password",
      changePhoneNumber: "/customer/account/change-phone-number",
      changeEmail: "/customer/account/change-email",
      notifications: "/customer/account/notifications",
      bank: "/customer/account/bank",
    },
  },
  error: "/error",
};
