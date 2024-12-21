import { Footer } from "@/components/customer/layout/footer";
import Header from "@/components/customer/layout/header";
import envConfig from "@/envConfig";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-screen max-w-screen overflow-hidden h-full flex flex-col items-center">
      <GoogleOAuthProvider
        clientId={envConfig?.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        <Header></Header>
        <div className="min-h-[600px] max-w-screen w-full">{children}</div>
        <Footer></Footer>
      </GoogleOAuthProvider>
    </div>
  );
}
