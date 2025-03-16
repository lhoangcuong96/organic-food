"use client";

import { ImagePlus, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useHandleMessage } from "@/hooks/use-handle-message";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import CategoryDropdown from "./category-dropdown";

const MAX_PRODUCT_IMAGES = 1;

export default function BasicInfo() {
  const form = useFormContext();
  const [isOpenCategorySelector, setIsOpenCategorySelector] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const { messageApi } = useHandleMessage();
  const productImageRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const files = e.target.files;
    if (!files) return;
    field.onChange(files[0]);
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

  return (
    <div className="rounded-lg border bg-white p-6 flex flex-col gap-6">
      <h2 className="mb-4 text-lg font-medium">Thông tin cơ bản</h2>

      {/* <FormField
        control={form.control}
        name="thumbnail"
        render={({ field }) => {
          const productImages = field.value || [];
          const urls = productImages.map((item: File | string) => {
            if (typeof item === "string") {
              return item;
            }
            return URL.createObjectURL(item);
          });
          return (
            <FormItem className="grid grid-cols-[max-content_auto] gap-2">
              <FormLabel className="w-36 pt-2">
                Hình ảnh sản phẩm (thumbnail)
                <span className="text-destructive">*</span>
              </FormLabel>
              <div className="!m-0 flex flex-col gap-4 h-auto">
                <FormControl>
                  <div className="inline-flex gap-4 flex-wrap">
                    {urls.map((url: string, index: number) => (
                      <div key={index} className="relative group">
                        <Image
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="rounded-lg object-contain"
                          width={150}
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
                    <div className="relative">
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
                          className="w-[150px] h-28 flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer"
                          onClick={() => {
                            if (productImageRef?.current) {
                              productImageRef.current.click();
                            }
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
      /> */}
      <FormField
        control={form.control}
        name="thumbnail"
        render={({ field }) => {
          const thumbnail = field.value || "";
          let url = "";
          if (typeof thumbnail === "string") {
            url = thumbnail;
          } else {
            url = URL.createObjectURL(thumbnail);
          }
          return (
            <FormItem className="grid grid-cols-[max-content_auto] gap-2">
              <FormLabel className="w-36 pt-2">
                Hình ảnh sản phẩm (thumbnail)
                <span className="text-destructive">*</span>
              </FormLabel>
              <div className="!m-0 h-auto">
                <FormControl>
                  <div className="inline-flex flex-wrap">
                    {url ? (
                      <div className="relative group">
                        <Image
                          src={url}
                          alt={`Product image`}
                          className="rounded-lg object-contain"
                          width={150}
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
                            onClick={() => setEditedImage(url)}
                          >
                            <CiEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="bg-transparent text-gray-700 shadow-none hover:bg-transparent hover:text-gray-700 "
                            onClick={() => field.onChange("")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative">
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
                        </div>
                        <div
                          className="w-[150px] h-28 flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer"
                          onClick={() => {
                            if (productImageRef?.current) {
                              productImageRef.current.click();
                            }
                          }}
                        >
                          <ImagePlus className="h-6 w-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground mx mt-2">
                            Thêm hình ảnh
                          </span>
                          <span className="text-xs text-muted-foreground">
                            0/1
                          </span>
                        </div>
                      </>
                    )}
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
        name="name"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[max-content_auto] gap-2">
            <FormLabel className="w-36 pt-2">
              Tên sản phẩm <span className="text-destructive">*</span>
            </FormLabel>
            <div className="!m-0">
              <FormControl>
                <div className="relative inline-flex items-center w-full gap-6">
                  <Input
                    {...field}
                    placeholder="Tên sản phẩm + Trọng lượng. VD: Ba rọi 300g"
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                    {field.value?.length}/120
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
        name="weight"
        render={({ field }) => (
          <FormItem className="grid grid-cols-[max-content_auto] gap-2">
            <FormLabel className="w-36 pt-2">
              Trọng lượng(g)<span className="text-destructive">*</span>
            </FormLabel>
            <div className="!m-0">
              <FormControl>
                <div className="relative inline-flex items-center w-full gap-6">
                  <Input
                    {...field}
                    placeholder="Trọng lượng tính bằng gram"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(+value);
                    }}
                    value={field.value ? field.value.toLocaleString() : ""}
                  />
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
          <FormItem className="grid grid-cols-[max-content_auto] gap-2">
            <FormLabel className="w-36 pt-2">
              Loại sản phẩm <span className="text-destructive">*</span>
            </FormLabel>
            <div className="!m-0">
              <FormControl>
                <div className="relative inline-flex items-center w-full gap-6">
                  <CategoryDropdown
                    onSelect={(category) => {
                      field.onChange(category.id);
                    }}
                    value={field.value}
                  ></CategoryDropdown>
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
          <FormItem className="grid grid-cols-[max-content_auto] gap-2">
            <FormLabel className="w-36 pt-2">
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
                    {field.value?.length}/10000
                  </span>
                </div>
              </div>
            </div>
          </FormItem>
        )}
      />
      {editedImage && (
        <ImageEditor
          open={true}
          imageUrl={editedImage}
          onSave={() => {}}
          onOpenChange={() => {
            setEditedImage(null);
          }}
        ></ImageEditor>
      )}
    </div>
  );
}
