import Image from "next/image";
import DefaultButton from "@/components/customer/UI/button/default-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Image
        src="/images/404.jpg"
        alt="404 not found"
        width={900}
        height={450}
        className="max-w-[900px]"
      ></Image>
      <Link href="/">
        <DefaultButton>BACK TO HOME PAGE</DefaultButton>
      </Link>
    </div>
  );
}
