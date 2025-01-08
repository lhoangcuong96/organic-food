"use client";

import { ImagePlus, Upload, X } from "lucide-react";
import { CiEdit } from "react-icons/ci";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageEditor } from "@/components/ui/image-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useHandleMessage } from "@/utils/hooks";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { CategorySelector } from "./category-selector";

const MAX_PRODUCT_IMAGES = 9;

export default function BasicInfo() {
  const form = useFormContext();
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [isOpenCategorySelector, setIsOpenCategorySelector] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const [aspectRatioProductImages, setAspectRatioProductImages] = useState<
    "1:1" | "3:4"
  >("1:1");

  const { messageApi } = useHandleMessage();
  const productImageRef = useRef<HTMLInputElement>(null);
  const productCoverRef = useRef<HTMLInputElement>(null);
  const productVideoRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const files = e.target.files;
    if (!files) return;
    if (files.length > MAX_PRODUCT_IMAGES) {
      messageApi.error(
        `Chỉ được tải lên tối đa ${MAX_PRODUCT_IMAGES} hình ảnh`
      );
      return;
    }
    const prevImages = field.value || [];
    const fileArray = Array.from(files);
    field.onChange([...prevImages, ...fileArray]);
    e.target.value = "";
  };

  const deleteProductImage = (
    index: number,
    field: ControllerRenderProps<FieldValues, "productImages">
  ) => {
    const images = field.value || [];
    if (images[index]) {
      const newImages = [...images];
      newImages.splice(index, 1);
      field.onChange(newImages);
    }
  };

  const deleteCoverImage = (
    field: ControllerRenderProps<FieldValues, "coverImage">
  ) => {
    const image = field.value;
    if (image) {
      field.onChange(null);
    }
  };

  const handleCoverUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      console.log(e.target.files?.[0]);
      const file = e.target.files?.[0];
      if (!file) return;
      field.onChange(file);
      e.target.value = "";
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

  return (
    <div className="rounded-lg border bg-white p-6 flex flex-col gap-6">
      <h2 className="mb-4 text-lg font-medium">Thông tin cơ bản</h2>

      <FormField
        control={form.control}
        name="productImages"
        render={({ field }) => {
          const productImages = field.value || [];
          const urls = productImages.map((item: File | string) => {
            if (typeof item === "string") {
              return item;
            }
            return URL.createObjectURL(item);
          });
          return (
            <FormItem className="grid grid-cols-[max-content_auto] flex-nowrap">
              <FormLabel className="w-36">
                Hình ảnh sản phẩm <span className="text-destructive">*</span>
              </FormLabel>
              <div className="!m-0 flex flex-col gap-4 h-auto">
                <RadioGroup
                  value={aspectRatioProductImages}
                  onValueChange={(value: "1:1" | "3:4") =>
                    setAspectRatioProductImages(value)
                  }
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1:1" id="ratio-1-1" />
                    <Label htmlFor="ratio-1-1">Hình ảnh tỷ lệ 1:1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3:4" id="ratio-3-4" />
                    <Label htmlFor="ratio-3-4">Hình ảnh tỷ lệ 3:4</Label>
                  </div>
                </RadioGroup>
                <FormControl>
                  <div className="inline-flex gap-4 flex-wrap">
                    {urls.map((url: string, index: number) => (
                      <div key={index} className="relative aspect-square group">
                        <Image
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="rounded-lg object-contain"
                          width={112}
                          height={
                            aspectRatioProductImages === "1:1" ? 112 : 150
                          }
                          style={{
                            height:
                              aspectRatioProductImages === "1:1" ? 112 : 150,
                            width: 112,
                          }}
                          placeholder="blur"
                          blurDataURL="/images/blur-image.png"
                        />
                        <div
                          className="w-full absolute bottom-0 h-fit group-hover:opacity-100 
                        flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 bg-lime-50"
                        >
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="bg-transparent text-gray-700 shadow-none hover:bg-transparent hover:text-gray-700 "
                            onClick={() => setEditedImage(url)}
                          >
                            <CiEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="bg-transparent text-gray-700 shadow-none hover:bg-transparent hover:text-gray-700 "
                            onClick={() => deleteProductImage(index, field)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="relative aspect-square">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={(e) => {
                          handleImageUpload(e, field);
                        }}
                        ref={productImageRef}
                      />
                      {productImages.length < MAX_PRODUCT_IMAGES && (
                        <div
                          className="w-28 h-28 flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer"
                          onClick={() => {
                            if (productImageRef?.current) {
                              productImageRef.current.click();
                            }
                          }}
                          style={{
                            height:
                              aspectRatioProductImages === "1:1" ? 112 : 150,
                            width: 112,
                          }}
                        >
                          <ImagePlus className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground mx mt-2">
                            Thêm hình ảnh
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {productImages.length}/{MAX_PRODUCT_IMAGES}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="coverImage"
        render={({ field }) => {
          const coverImage = field.value;
          const coverUrl = coverImage
            ? typeof coverImage === "string"
              ? coverImage
              : URL.createObjectURL(coverImage)
            : null;
          return (
            <FormItem className="grid grid-cols-[max-content_auto] flex-nowrap">
              <FormLabel className="w-36">
                Ảnh bìa <span className="text-destructive">*</span>
              </FormLabel>
              <div className="!m-0 h-36">
                <div className="grid grid-cols-[max-content_auto] flex-nowrap gap-4">
                  <FormControl>
                    <div className="inline-flex">
                      {coverUrl && (
                        <div className="relative aspect-square group">
                          <Image
                            src={coverUrl}
                            alt={`Product cover image`}
                            className="w-28 h-28 rounded-lg object-contain"
                            width={112}
                            height={112}
                            placeholder="blur"
                            blurDataURL="/images/blur-image.png"
                          />
                          <div
                            className="w-full absolute bottom-0 h-fit group-hover:opacity-100 
                        flex items-center justify-center gap-2 opacity-0 transition-opacity duration-200 bg-lime-50"
                          >
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="bg-transparent text-gray-700 shadow-none hover:bg-transparent hover:text-gray-700 "
                              onClick={() => setEditedImage(coverUrl)}
                            >
                              <CiEdit className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="bg-transparent text-gray-700 shadow-none hover:bg-transparent hover:text-gray-700 "
                              onClick={() => deleteCoverImage(field)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="relative aspect-square">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          onChange={(e) => {
                            handleCoverUpload(e, field);
                          }}
                          ref={productCoverRef}
                        />
                        {!coverImage && (
                          <div
                            className="w-28 h-28 flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer"
                            onClick={() => {
                              if (productCoverRef?.current) {
                                productCoverRef.current.click();
                              }
                            }}
                          >
                            <ImagePlus className="h-6 w-6 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground mx mt-2">
                              Thêm hình ảnh
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <div className="text-xs max-w-[600px] w-full">
                    <ul className="list-disc pl-4">
                      <li>Tải lên hình ảnh 1:1.</li>
                      <li>
                        Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm,
                      </li>
                      <li>
                        Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút
                        thêm lượt truy cập vào sản phẩm của bạn
                      </li>
                    </ul>
                  </div>
                </div>

                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />

      <FormField
        control={form.control}
        name="video"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[max-content_auto] flex-nowrap">
            <FormLabel className="w-36">Video sản phẩm</FormLabel>

            <FormControl>
              <div className="inline-flex gap-4">
                <div className="relative aspect-video w-28 h-28">
                  {videoPreview ? (
                    <>
                      <video
                        src={videoPreview}
                        controls
                        className="h-full w-full rounded-lg object-contain"
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
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => handleVideoUpload(e, field)}
                        ref={productVideoRef}
                      />
                      <div
                        className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer"
                        onClick={() => {
                          if (productVideoRef?.current) {
                            productVideoRef.current.click();
                          }
                        }}
                      >
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Thêm video
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="text-xs">
                  <ul className="list-disc pl-4">
                    <li>
                      Kích thước tối đa 300Mb, độ phân giải không vượt quá
                      1280x1280px
                    </li>
                    <li>Độ dài: 10s-60s</li>
                    <li>Định dạng: MP4</li>
                  </ul>
                </div>
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
          <FormItem className="grid grid-cols-[max-content_auto] flex-nowrap">
            <FormLabel className="w-36">
              Tên sản phẩm <span className="text-destructive">*</span>
            </FormLabel>
            <div className="!m-0">
              <FormControl>
                <div className="relative inline-flex items-center w-full gap-6">
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
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[max-content_auto] flex-nowrap">
            <FormLabel className="w-36">
              Ngành hàng <span className="text-destructive">*</span>
            </FormLabel>
            <div className="!m-0">
              <FormControl>
                <div className="relative inline-flex items-center w-full gap-6">
                  <Input
                    value={field.value.join(" > ") || ""}
                    placeholder="Chọn ngành hàng"
                    readOnly
                    onClick={() => {
                      setIsOpenCategorySelector(true);
                    }}
                  />
                  <Input {...field} disabled className="hidden"></Input>
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[max-content_auto] flex-nowrap">
            <FormLabel className="w-36">
              Mô tả sản phẩm <span className="text-destructive">*</span>
            </FormLabel>
            <div className="!m-0">
              <FormControl>
                <Textarea
                  {...field}
                  className="min-h-[200px]"
                  placeholder="Nhập mô tả sản phẩm của bạn"
                />
              </FormControl>
              <div className="inline-flex justify-between w-full gap-6">
                <FormMessage />
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">
                    {field.value.length}/3000
                  </span>
                </div>
              </div>
            </div>
          </FormItem>
        )}
      />
      <CategorySelector
        open={isOpenCategorySelector}
        onOpenChange={() => setIsOpenCategorySelector(false)}
        onSelect={(path) => form.setValue("category", path)}
        selectedCategories={form.getValues("category")}
      ></CategorySelector>
      {editedImage && (
        <ImageEditor
          open={true}
          imageUrl={editedImage}
          onSave={() => {}}
          aspectRatio={aspectRatioProductImages}
          onOpenChange={() => {
            setEditedImage(null);
          }}
        ></ImageEditor>
      )}
    </div>
  );
}
