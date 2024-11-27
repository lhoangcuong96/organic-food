import { z } from "zod";

const envConfigSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_API_URL: z.string(),
  ANALYZE: z.string(),
});

const configProject = envConfigSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  ANALYZE: process.env.ANALYZE,
});

if (configProject.error?.issues) {
  console.log(configProject.error?.issues);
  throw new Error("Các giá trị khai báo trong env không hợp lệ");
}

const envConfig = configProject.data;

export default envConfig;
