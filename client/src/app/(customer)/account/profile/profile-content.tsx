import { accountApiRequest } from "@/api-request/account";
import { routePath } from "@/constants/routes";
import { TokenType } from "@/constants/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UpdateProfileForm from "./update-profile-form";

export default async function ProfileContent() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(TokenType.AccessToken);
  if (!accessToken) {
    return redirect(routePath.customer.home);
  }
  const response = await accountApiRequest.getMe();
  if (!response.payload?.data) {
    return (
      <p className="items-center justify-center">{response.payload?.message}</p>
    );
  }
  return <UpdateProfileForm profile={response.payload.data} />;
}
