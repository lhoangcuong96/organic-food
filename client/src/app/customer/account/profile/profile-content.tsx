"use client";

import {
  ProfileDataType,
  UpdateProfileDataType,
  updateProfileSchema,
} from "@/validation-schema/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formatDate } from "date-fns";

import DefaultButton from "@/components/customer/UI/button/default-button";
import { LinkButton } from "@/components/customer/UI/button/link-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "lucide-react";
import { FormError } from "@/components/customer/UI/input/form/form-error";
import { authApiRequest } from "@/api-request/auth";
import { accountApiRequest } from "@/api-request/account";
import { useAppContext } from "@/provider/app-provider";
import { useHandleMessage } from "@/utils/hooks";

export default function ProfileContent({
  profile,
}: {
  profile: ProfileDataType;
}) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const { accessToken } = useAppContext();
  const { handleError, messageApi } = useHandleMessage();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 1024 * 1024) {
      // 1MB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 1MB");
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
      const dateOfBirth = new Date(data.dateOfBirth) as unknown as string;
      const res = await accountApiRequest.updateProfile(accessToken, {
        ...data,
        dateOfBirth,
      });
      if (res.payload.data) {
        messageApi.success("Cập nhật thông tin thành công");
      } else {
        messageApi.error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      handleError({ error, setError });
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

            <DefaultButton className="mt-6">Lưu</DefaultButton>
          </div>

          <div className="w-full md:w-64 flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatar || ""} />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <Button
                variant="outline"
                className="relative"
                onClick={() =>
                  document.getElementById("avatar-upload")?.click()
                }
              >
                Chọn Ảnh
                <input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleAvatarChange}
                />
              </Button>
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
