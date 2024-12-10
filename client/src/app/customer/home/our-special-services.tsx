import OutlineButton from "@/components/customer/UI/button/outline-button";
import { Card } from "@/components/ui/card";
import { Divider } from "antd";
import Image from "next/image";

export function OurSpecialServices() {
  return (
    <div className="max-w-screen-xl w-screen h-fit mt-5 relative z-50">
      <div className="flex flex-row justify-between mb-5 pb-4 border-b-[0.5px] border-b-lime-600">
        <div>
          <h3 className=" text-lime-600 text-2xl font-bold flex flex-row items-center gap-2">
            Dịch vụ đặc biệt của chúng tôi
            <Image
              src="/images/icons/leaf.webp"
              alt="icon"
              width={25}
              height={25}
            ></Image>
          </h3>
          <p className="font-semibold">
            Những dịch vụ tốt nhất dành cho khách hàng của chúng tôi
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center justify-center gap-10">
        <Card className="w-full p-5 rounded-lg relative m-1 group border-[2px]">
          <div className="flex flex-col items-center">
            <Image
              src="/images/service/dichvu_1.webp"
              alt="icon"
              width={235}
              height={178}
            ></Image>
            <p className="text-lime-600 text-xl font-bold text-center">
              Rau hữu cơ tươi
            </p>
            <Divider className="!border-lime-700 border-2 !w-3 !min-w-3 group-hover:!w-8 transition-all" />

            <p className="text-lg text-center font-semibold">
              Được trồng theo phương pháp hiện đại nhất, đạt tiêu chuẩn quốc tế,
              vô cùng an toàn khi sử dụng.
            </p>
            <OutlineButton className="mt-4">Tìm hiểu thêm</OutlineButton>
          </div>
        </Card>
        <Card className="w-full p-5 rounded-lg relative m-1 gap-1 group">
          <div className="flex flex-col items-center">
            <Image
              src="/images/service/dichvu_2.webp"
              alt="icon"
              width={235}
              height={178}
            ></Image>
            <p className="text-lime-600 text-xl font-bold text-center">
              Giao hàng nhanh chóng
            </p>
            <Divider className="!border-lime-700 border-2 !w-3 !min-w-3 group-hover:!w-8 transition-all" />

            <p className="text-lg text-center font-semibold">
              Giao hàng trong thời gian nhanh nhất để đảm bảo chất lượng tốt
              nhất cho những sản phẩm bạn đã đặt.
            </p>
            <OutlineButton className="mt-4">Tìm hiểu thêm</OutlineButton>
          </div>
        </Card>
        <Card className="w-full p-5 rounded-lg relative m-1 gap-1 group">
          <div className="flex flex-col items-center">
            <Image
              src="/images/service/dichvu_3.webp"
              alt="icon"
              width={235}
              height={178}
            ></Image>
            <p className="text-lime-600 text-xl font-bold text-center">
              Thanh toán dễ dàng
            </p>
            <Divider className="!border-lime-700 border-2 !w-3 !min-w-3 group-hover:!w-8 transition-all" />

            <p className="text-lg text-center font-semibold">
              Nhiều hình thức thanh toán làm cho việc đặt hàng của bạn và shop
              trở nên dễ dàng và tiện lợi hơn rất nhiều.
            </p>
            <OutlineButton className="mt-4">Tìm hiểu thêm</OutlineButton>
          </div>
        </Card>
      </div>
    </div>
  );
}
