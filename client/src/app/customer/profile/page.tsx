import { routePath } from "@/constants/routes";
import envConfig from "@/envConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Profile() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return redirect(routePath.customer.home);
  }
  const response = await fetch(`${envConfig?.NEXT_PUBLIC_API_URL}/account/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: sessionToken?.value,
    },
  });

  const responseJson = await response.json();
  if (!response.ok) {
    return <p>{responseJson.message}</p>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {responseJson.data.email}</div>
    </div>
  );
}
