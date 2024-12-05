import { Footer } from "@/components/customer/layout/footer";
import Header from "@/components/customer/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen max-w-screen overflow-hidden h-full flex flex-col items-center">
      <Header></Header>
      <div className="min-h-[600px] max-w-screen w-full">{children}</div>
      <Footer></Footer>
    </div>
  );
}
