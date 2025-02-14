import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Suspense } from "react";
import ProfileContent from "./profile-content";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Trang khách hàng | Dollar Organic",
    description: "Trang khách hàng",
  };
};

export default async function Profile() {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;
  if (!accessToken) {
    return redirect("/sign-in");
  }
  return (
    <Card className="w-full mx-auto py-2 px-8 h-fit rounded-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Hồ Sơ Của Tôi</CardTitle>
        <p className="text-sm text-muted-foreground">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </CardHeader>
      <CardContent>
        <Suspense fallback="...Loading">
          <ProfileContent></ProfileContent>
        </Suspense>
      </CardContent>
    </Card>
  );
}
