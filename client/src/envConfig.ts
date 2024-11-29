import { z } from "zod";

// chỉ sử dụng ở client
const envConfigSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
});

const configProject = envConfigSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (configProject.error?.issues) {
  console.error(configProject.error?.issues);
  //   throw new Error("Các giá trị khai báo trong env không hợp lệ");
}

const envConfig = configProject.data;

export default envConfig;
