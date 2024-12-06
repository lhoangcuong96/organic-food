import { z } from "zod";

export const MessageResponse = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResponseType = z.infer<typeof MessageResponse>;

export const UploadResponse = z.object({
  data: z.string(),
  message: z.string(),
});

export type UploadResponseType = z.infer<typeof UploadResponse>;
