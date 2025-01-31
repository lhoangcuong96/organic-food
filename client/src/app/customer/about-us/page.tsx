import AppBreadcrumb from "@/components/customer/layout/breadcrumb";
import { routePath } from "@/constants/routes";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "Liên hệ với chung tôi",
    description: "Liên hệ với Heo sạch nhà Thoa để được hỗ trợ tốt nhất.",
  };
}

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center h-full text-sm font-medium">
      <AppBreadcrumb
        pageTitle="Giới thiệu"
        breadcrumbItems={[
          {
            title: "Trang chủ",
            href: routePath.customer.home,
          },
          {
            title: "Giới thiệu",
          },
        ]}
      ></AppBreadcrumb>
      <div className="w-screen p-8 flex items-center justify-center h-full">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Về Heo Sạch Nhà Thoa
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <Image
                src="/placeholder.svg"
                alt="Hình ảnh trang trại Heo Sạch Nhà Thoa"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Câu Chuyện Của Chúng Tôi
              </h2>
              <p className="mb-4">
                Heo Sạch Nhà Thoa ra đời từ ước mơ mang đến những bữa ăn ngon,
                lành mạnh và đầy đủ dinh dưỡng cho mọi gia đình Việt. Chúng tôi
                tin rằng, thực phẩm chay không chỉ tốt cho sức khỏe mà còn góp
                phần bảo vệ môi trường và đạo đức động vật.
              </p>
              <p>
                Với hơn 10 năm kinh nghiệm trong ngành thực phẩm chay, chúng tôi
                tự hào là người tiên phong trong việc phát triển các sản phẩm
                &ldquo;thịt heo&ldquo; chay chất lượng cao, mang hương vị gần
                gũi với thịt heo truyền thống nhưng hoàn toàn từ thực vật.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-center max-w-2xl mx-auto">
              Sứ mệnh của Heo Sạch Nhà Thoa là mang đến những sản phẩm thay thế
              thịt chất lượng cao, góp phần xây dựng một lối sống bền vững và
              thân thiện với môi trường, đồng thời không làm mất đi hương vị
              truyền thống trong ẩm thực Việt Nam.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Chất Lượng</h3>
              <p>
                Chúng tôi cam kết sử dụng nguyên liệu tự nhiên, không biến đổi
                gen, và quy trình sản xuất đạt tiêu chuẩn vệ sinh an toàn thực
                phẩm cao nhất.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Đổi Mới</h3>
              <p>
                Đội ngũ nghiên cứu của chúng tôi liên tục phát triển công thức
                mới, cải tiến sản phẩm để mang đến trải nghiệm ẩm thực tuyệt vời
                nhất cho khách hàng.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Bền Vững</h3>
              <p>
                Chúng tôi cam kết sử dụng bao bì thân thiện với môi trường và áp
                dụng các phương pháp sản xuất tiết kiệm năng lượng, giảm thiểu
                chất thải.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Hãy Cùng Chúng Tôi Xây Dựng Tương Lai Xanh
            </h2>
            <p className="mb-6">
              Mỗi bữa ăn với sản phẩm của Heo Sạch Nhà Thoa là một bước tiến nhỏ
              hướng tới một lối sống lành mạnh và bền vững hơn cho cộng đồng.
            </p>
            <button className="bg-lime-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300">
              Khám Phá Sản Phẩm Của Chúng Tôi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
