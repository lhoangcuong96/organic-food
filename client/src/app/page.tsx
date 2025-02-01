import { routePath } from "@/constants/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(routePath.customer.home);
}
