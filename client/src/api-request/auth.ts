import { http } from "@/lib/http";

const authApiRequest = {
  login: (data: { email: string; password: string }) => {
    return http.post("/customer/login", data);
  },
  register: (data: { email: string; password: string }) => {
    return fetch("http://localhost:3000/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
