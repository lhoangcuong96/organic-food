"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { SuggestionsSidebar } from "./suggestions-sidebar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ProductCreateFormValues,
  productCreateFormSchema,
} from "@/validation-schema/product";

export function ProductForm() {
  const [productImages, setProductImages] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const salesInfoRef = useRef<HTMLDivElement>(null);

  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateFormSchema),
    defaultValues: {
      productImages: undefined,
      coverImage: undefined,
      video: undefined,
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      sku: "",
    },
  });

  const onSubmit = async (data: ProductCreateFormValues) => {
    console.log(data);
    // Handle form submission
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const files = e.target.files;
      if (!files) return;

      const fileArray = Array.from(files);
      field.onChange(fileArray);

      // Create preview URLs
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      setProductImages(urls);
    },
    []
  );

  const handleCoverImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      field.onChange(file);
      setCoverImage(URL.createObjectURL(file));
    },
    []
  );

  const handleVideoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

      field.onChange(file);
      setVideoPreview(URL.createObjectURL(file));
    },
    []
  );

  // const handleTabChange = (value: string) => {
  //   if (value === "sales" && salesInfoRef.current) {
  //     salesInfoRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <div className="flex">
      <SuggestionsSidebar />
      <div className="flex-1 p-6">
        <Tabs
          defaultValue="basic"
          className="w-full"
          onValueChange={(value) => {
            if (value === "sales" && salesInfoRef.current) {
              salesInfoRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="sales">Thông tin bán hàng</TabsTrigger>
            <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
            <TabsTrigger value="other">Thông tin khác</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="basic" className="space-y-6">
                <div className="rounded-lg border bg-white p-6">
                  <h2 className="mb-4 text-lg font-medium">Thông tin cơ bản</h2>

                  <FormField
                    control={form.control}
                    name="productImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Hình ảnh sản phẩm{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormDescription>Hình ảnh tỷ lệ 1:1</FormDescription>
                        <FormControl>
                          <div className="grid grid-cols-3 gap-4">
                            {productImages.map((url, index) => (
                              <div
                                key={index}
                                className="relative aspect-square"
                              >
                                <img
                                  src={url}
                                  alt={`Product ${index + 1}`}
                                  className="h-full w-full rounded-lg object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute right-2 top-2"
                                  onClick={() => {
                                    const newImages = [...productImages];
                                    newImages.splice(index, 1);
                                    setProductImages(newImages);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            {productImages.length < 3 && (
                              <div className="relative aspect-square">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="absolute inset-0 cursor-pointer opacity-0"
                                  onChange={(e) => handleImageUpload(e, field)}
                                />
                                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
                                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    Thêm hình ảnh
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ảnh bìa <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormDescription>Tỉ lệ hình ảnh 1:1</FormDescription>
                        <FormControl>
                          <div className="relative aspect-square w-[120px]">
                            {coverImage ? (
                              <>
                                <img
                                  src={coverImage}
                                  alt="Cover"
                                  className="h-full w-full rounded-lg object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute right-2 top-2"
                                  onClick={() => setCoverImage("")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 cursor-pointer opacity-0"
                                  onChange={(e) =>
                                    handleCoverImageUpload(e, field)
                                  }
                                />
                                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
                                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    Thêm ảnh bìa
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="video"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video sản phẩm</FormLabel>
                        <FormDescription>
                          Kích thước tối đa 300Mb, độ phân giải không vượt quá
                          1280x1280px
                          <br />
                          Độ dài: 10s-60s
                          <br />
                          Định dạng: MP4
                        </FormDescription>
                        <FormControl>
                          <div className="relative aspect-video w-full max-w-[400px]">
                            {videoPreview ? (
                              <>
                                <video
                                  src={videoPreview}
                                  controls
                                  className="h-full w-full rounded-lg object-cover"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute right-2 top-2"
                                  onClick={() => setVideoPreview("")}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Input
                                  type="file"
                                  accept="video/mp4"
                                  className="absolute inset-0 cursor-pointer opacity-0"
                                  onChange={(e) => handleVideoUpload(e, field)}
                                />
                                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed">
                                  <Upload className="h-8 w-8 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    Thêm video
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Tên sản phẩm{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                            />
                            <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                              {field.value.length}/120
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ngành hàng <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn ngành hàng" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="electronics">Điện tử</SelectItem>
                            <SelectItem value="fashion">Thời trang</SelectItem>
                            <SelectItem value="home">Nhà cửa</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Mô tả sản phẩm{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="min-h-[200px]"
                            placeholder="Nhập mô tả sản phẩm của bạn"
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-right">
                          <span className="text-sm text-muted-foreground">
                            {field.value.length}/3000
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <div
                  ref={salesInfoRef}
                  className="rounded-lg border bg-white p-6"
                >
                  <h2 className="mb-4 text-lg font-medium">
                    Thông tin bán hàng
                  </h2>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Giá bán <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Nhập giá bán"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Số lượng <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Nhập số lượng"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã SKU</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nhập mã SKU" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">
                  Hủy
                </Button>
                <Button type="submit" variant="secondary">
                  Lưu & Ẩn
                </Button>
                <Button type="submit">Lưu & Hiển thị</Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
}
