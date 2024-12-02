import jwt from "jsonwebtoken";
export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};
