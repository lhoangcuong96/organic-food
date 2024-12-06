import { accountApiRequest } from "@/api-request/account";
import { routePath } from "@/constants/routes";
import { TokenType } from "@/constants/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LeftSidebar } from "./left-sidebar";
import ProfileContent from "./profile-content";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Trang khách hàng | Dollar Organic",
    description: "Trang khách hàng",
  };
};

export default async function Profile() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TokenType.AccessToken);
  if (!accessToken) {
    return redirect(routePath.customer.home);
  }
  const response = await accountApiRequest.getProfile();
  if (!response.payload.data) {
    return (
      <p className="items-center justify-center">{response.payload.message}</p>
    );
  }
  console.log(response.payload.data);
  return (
    <div className="mx-auto">
      <div className="flex min-h-screen bg-gray-100 font-medium">
        <LeftSidebar profile={response.payload.data} />
        <ProfileContent profile={response.payload.data} />
      </div>
    </div>
  );
}
