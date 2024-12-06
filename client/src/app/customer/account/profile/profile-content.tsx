"use client";

import {
  ProfileDataType,
  UpdateProfileDataType,
  updateProfileSchema,
} from "@/validation-schema/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { accountApiRequest } from "@/api-request/account";
import { mediaRequestApi } from "@/api-request/media";
import DefaultButton from "@/components/customer/UI/button/default-button";
import { LinkButton } from "@/components/customer/UI/button/link-button";
import { FormError } from "@/components/customer/UI/input/form/form-error";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useHandleMessage } from "@/utils/hooks";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileContent({
  profile,
}: {
  profile: ProfileDataType;
}) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError, messageApi } = useHandleMessage();
  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setAvatarFile(file);
    } else {
      alert("File size must be less than 10MB");
    }
  };
  const { control, register, handleSubmit, setError } =
    useForm<UpdateProfileDataType>({
      resolver: zodResolver(updateProfileSchema),
      defaultValues: {
        ...profile,
        gender: profile.gender || "OTHER",
        dateOfBirth: profile.dateOfBirth
          ? formatDate(profile.dateOfBirth, "yyyy-MM-dd")
          : "",
      },
    });

  const onSubmit = async (data: UpdateProfileDataType) => {
    try {
      setIsLoading(true);
      let avatar = "";
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("filename", avatarFile.name);
        const resp = await mediaRequestApi.uploadImage(formData);
        if (resp.payload.data) {
          avatar = resp.payload.data;
        }
      }
      const dateOfBirth = new Date(data.dateOfBirth) as unknown as string;
      const res = await accountApiRequest.updateProfile({
        ...data,
        dateOfBirth,
        avatar,
      });
      if (res.payload.data) {
        messageApi.success("Cập nhật thông tin thành công");
        router.refresh();
      } else {
        messageApi.error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      handleError({ error, setError });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-full mx-auto py-2 px-8 h-fit rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Hồ Sơ Của Tôi</CardTitle>
        <p className="text-sm text-muted-foreground">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col md:flex-row gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-[100px_auto] gap-2">
              <Label htmlFor="fullname" className="mt-2">
                Họ và tên
              </Label>
              <Controller
                name="fullname"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <div className="grid w-full">
                      <Input
                        error={fieldState.error?.message}
                        {...field}
                        value={field.value || ""}
                        className="block"
                      />
                      {fieldState.error?.message && (
                        <FormError error={fieldState.error?.message} />
                      )}
                    </div>
                  );
                }}
              />
            </div>
            <div className="grid grid-cols-[100px_auto] items-center gap-2">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <div className="flex items-center gap-2 !m-0 w-full">
                <p>{profile.email}</p>
                <LinkButton
                  variant="link"
                  className="text-primary whitespace-nowrap"
                >
                  Thay Đổi
                </LinkButton>
              </div>
            </div>

            <div className="grid grid-cols-[100px_auto] items-center gap-2">
              <Label htmlFor="phone" className="">
                Số điện thoại
              </Label>
              <div className="flex items-center gap-2 !m-0 w-full">
                <p>{profile.phoneNumber}</p>
                <LinkButton
                  variant="link"
                  className="text-primary whitespace-nowrap"
                >
                  Thay Đổi
                </LinkButton>
              </div>
            </div>

            <div className="grid grid-cols-[100px_auto] items-center gap-2">
              <Label className="w-28">Giới tính</Label>
              <RadioGroup
                className="flex gap-4"
                defaultValue={profile.gender || "OTHER"}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="MALE"
                    id="MALE"
                    {...register("gender")}
                  />
                  <Label htmlFor="nam">Nam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="FEMALE"
                    id="FEMALE"
                    {...register("gender")}
                  />
                  <Label htmlFor="nu">Nữ</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="OTHER"
                    id="OTHER"
                    {...register("gender")}
                  />
                  <Label htmlFor="khac">Khác</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-[100px_auto] gap-2">
              <Label htmlFor="birthday" className="mt-2">
                Ngày sinh
              </Label>
              <div className="flex items-center gap-2 !m-0 w-full">
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field, fieldState }) => {
                    return (
                      <div className="grid w-full">
                        <Input
                          id="birthday"
                          type="date"
                          className="!w-fit"
                          error={fieldState.error?.message}
                          {...field}
                          value={field.value || ""}
                        />
                        {fieldState.error?.message && (
                          <FormError
                            error={fieldState.error?.message}
                            className="mt-[4px]"
                          />
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>

            <DefaultButton className="mt-6" disabled={isLoading}>
              {isLoading ? (
                <p className="loading-animation">Đang cập nhật</p>
              ) : (
                <p>Cập nhật thông tin</p>
              )}
            </DefaultButton>
          </div>

          <div className="w-full md:w-64 flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 relative">
              <AvatarImage
                src={
                  avatarFile
                    ? URL.createObjectURL(avatarFile)
                    : profile.avatar || ""
                }
                className="object-cover"
              />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                className="relative"
                disabled={isLoading}
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
              >
                Chọn Ảnh
              </Button>
              <input
                type="file"
                onChange={handleAvatarChange}
                accept="image/*"
                id="avatar-upload"
                className="hidden"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Dụng lượng file tối đa 1 MB
              </p>
              <p className="text-sm text-muted-foreground">
                Định dạng: JPEG, PNG
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
