import { z } from "zod";
import { CommonQuery } from "./common";

export const ProductImageSchema = z.object({
  thumbnail: z.string().url().nullable().optional(),
  banner: z.string().url().nullable().optional(),
  featured: z.string().url().nullable().optional(),
  gallery: z.array(z.string().url()),
});

/*-----------------Product detail----------------------*/
export const productDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  description: z.string(),
  stock: z.number(),
  image: ProductImageSchema,
});

export const productResponseSchema = z.object({
  data: productDetailSchema,
  message: z.string(),
});

export type ProductDetailType = z.infer<typeof productDetailSchema>;
export type ProductDetailResponseType = z.infer<typeof productResponseSchema>;

/*-----------------Product detail----------------------*/

/*-----------------Product list----------------------*/
export const ProductListQuerySchema = z.object({
  ...CommonQuery.shape,
  category: z.string().optional(),
});
export const ProductListSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  slug: z.string(),
  image: ProductImageSchema.pick({ thumbnail: true }),
});

export const ProductListResponseSchema = z.object({
  data: z.array(ProductListSchema),
  message: z.string(),
});

export type ProductQueryType = z.infer<typeof ProductListQuerySchema>;
export type ProductListType = z.infer<typeof ProductListSchema>;
export type ProductListResponseType = z.infer<typeof ProductListResponseSchema>;
/*-----------------Product list----------------------*/

/* -----------------Product create---------------------- */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE = 300 * 1024 * 1024; // 300MB
export const MAX_PRODUCT_IMAGES = 9;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_VIDEO_TYPES = ["video/mp4"];
export const productCreateFormSchema = z.object({
  productImages: z
    .array(
      z.union([
        z.instanceof(File, {
          message: "Hình ảnh không hợp lệ",
        }),
        z.string().url({
          message: "URL không hợp lệ",
        }),
      ]),
      {
        required_error: "Phải có ít nhất 1 hình ảnh sản phẩm",
      }
    )
    .min(1, "Phải có ít nhất 1 hình ảnh sản phẩm")
    .max(MAX_PRODUCT_IMAGES, "Chỉ được tải lên tối đa 9 hình ảnh")
    .refine((files) => {
      return files.every((files) => {
        return files instanceof File
          ? ACCEPTED_IMAGE_TYPES.includes(files.type)
          : true;
      });
    }, "Chỉ chấp nhận các định dạng ảnh: JPG, PNG, WEBP")
    .refine((files) => {
      return files.every((files) => {
        return files instanceof File ? files.size <= MAX_IMAGE_SIZE : true;
      });
    }, `Hình ảnh không được vượt quá ${MAX_IMAGE_SIZE / 1024 / 1024}MB`),
  coverImage: z
    .union([
      z.instanceof(File, {
        message: "Hình ảnh không hợp lệ",
      }),
      z
        .string({
          message: "URL không hợp lệ",
        })
        .url(),
    ])
    .refine((file) => {
      return file instanceof File
        ? ACCEPTED_IMAGE_TYPES.includes(file.type)
        : true;
    }, "Chỉ chấp nhận các định dạng ảnh: JPG, PNG, WEBP")
    .refine((file) => {
      return file instanceof File ? file.size <= MAX_IMAGE_SIZE : true;
    }, `Hình ảnh không được vượt quá ${MAX_IMAGE_SIZE / 1024 / 1024}MB`),
  video: z
    .instanceof(File, {
      message: "Chỉ chấp nhận định dạng MP4",
    })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Video không được vượt quá ${MAX_FILE_SIZE / 1024 / 1024}MB`
    )
    .refine(
      (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Chỉ chấp nhận định dạng MP4"
    )
    .optional(),
  name: z
    .string()
    .min(25, "Tên sản phẩm phải có ít nhất 25 ký tự")
    .max(120, "Tên sản phẩm không được vượt quá 120 ký tự"),
  category: z.array(z.string()).min(1, "Vui lòng chọn loại sản phẩm"),
  description: z
    .string()
    .min(1, "Vui lòng nhập mô tả sản phẩm")
    .max(3000, "Mô tả sản phẩm không được vượt quá 3000 ký tự"),
  price: z.string().min(1, "Vui lòng nhập giá bán"),
  stock: z.string().min(1, "Vui lòng nhập số lượng"),
  sku: z.string().optional(),
});
export type ProductCreateFormValues = z.infer<typeof productCreateFormSchema>;
/* -----------------Product create---------------------- */
