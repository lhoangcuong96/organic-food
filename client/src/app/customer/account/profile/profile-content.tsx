"use client";

import { ProfileDataType, profileSchema } from "@/validation-schema/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/customer/UI/button/link-button";
import DefaultButton from "@/components/customer/UI/button/default-button";

export default function ProfileContent({
  profile,
}: {
  profile: ProfileDataType;
}) {
  const [avatar, setAvatar] = useState<string | null>(null);

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileDataType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...profile,
    },
  });

  const onSubmit = (data: ProfileDataType) => {
    console.log("Form values:", data);
    // message.success("Profile updated successfully");
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
        <form className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="space-y-2 flex flex-row items-center gap-2">
              <Label htmlFor="email" className="w-32">
                Họ và tên
              </Label>
              <Input id="fullname" {...register("fullname")} />
            </div>
            <div className="space-y-2 flex flex-row items-center gap-2">
              <Label htmlFor="email" className="w-32">
                Email
              </Label>
              <div className="flex items-center gap-2 !m-0 w-full">
                <p>{profile.email}</p>
                <Input
                  id="email"
                  type="email"
                  readOnly
                  className="hidden"
                  disabled
                  {...register("email")}
                />
                <LinkButton
                  variant="link"
                  className="text-primary whitespace-nowrap"
                >
                  Thay Đổi
                </LinkButton>
              </div>
            </div>

            <div className="space-y-2 flex flex-row items-center gap-2">
              <Label htmlFor="phone" className="w-32">
                Số điện thoại
              </Label>
              <div className="flex items-center gap-2 !m-0 w-full">
                <p>{profile.phoneNumber}</p>
                <Input
                  id="phone"
                  value="*********96"
                  readOnly
                  className="hidden"
                  disabled
                  {...register("phoneNumber")}
                />
                <LinkButton
                  variant="link"
                  className="text-primary whitespace-nowrap"
                >
                  Thay Đổi
                </LinkButton>
              </div>
            </div>

            <div className="space-y-2 flex flex-row items-center gap-2">
              <Label className="w-28">Giới tính</Label>
              <RadioGroup
                defaultValue={profile.gender || "OTHER"}
                className="flex gap-4"
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

            <div className="space-y-2 flex flex-row items-center gap-2">
              <Label htmlFor="birthday" className="w-32">
                Ngày sinh
              </Label>
              <div className="flex items-center gap-2 !m-0 w-full">
                <Input
                  id="birthday"
                  type="date"
                  defaultValue="1996-01-01"
                  className="w-fit"
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
