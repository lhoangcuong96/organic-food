import { z } from "zod";

export const MessageResponse = z
  .object({
    message: z.string(),
  })
  .strict();

export type MessageResponseType = z.infer<typeof MessageResponse>;
