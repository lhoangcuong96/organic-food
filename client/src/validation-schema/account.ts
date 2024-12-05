import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).nullable().optional(),
  dateOfBirth: z.date().nullable().optional(),
});

export const profileResponseSchema = z.object({
  data: profileSchema,
  message: z.string(),
});

export type ProfileDataType = z.infer<typeof profileSchema>;
export type ProfileResponseDataType = z.infer<typeof profileResponseSchema>;
