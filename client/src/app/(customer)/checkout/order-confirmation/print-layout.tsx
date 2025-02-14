import Image from "next/image";

interface OrderDetails {
  orderNumber: string;
  email: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: {
    name: string;
    address: string;
    ward: string;
    phone: string;
  };
  products: Array<{
    name: string;
    quantity: number;
    price: number;
    weight: string;
    image: string;
  }>;
  subtotal: number;
  shippingFee: number;
  total: number;
}

export default function PrintLayout({
  orderDetails,
}: {
  orderDetails: OrderDetails;
}) {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}₫`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="hidden print:block p-8 max-w-[21cm] mx-auto text-black">
      {/* Header */}
      <div className="flex justify-between text-sm mb-4">
        <div>{getCurrentDateTime()}</div>
        <div>Dola Organic - Cảm ơn</div>
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DU2CTgaO23SsXOFyncY51vk19eFvfL.png"
          alt="Dola Organic Logo"
          width={200}
          height={60}
          className="mx-auto"
        />
      </div>

      {/* Confirmation Message */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-medium mb-2">Cảm ơn bạn đã đặt hàng</h1>
        <p className="text-sm">
          Một email xác nhận đã được gửi tới {orderDetails.email}.<br />
          Xin vui lòng kiểm tra email của bạn
        </p>
      </div>

      {/* Order Details */}
      <div className="border rounded-md mb-8">
        <div className="p-4 border-b">
          <h2 className="font-medium">Đơn hàng #{orderDetails.orderNumber}</h2>
        </div>

        {/* Products */}
        {orderDetails.products.map((product, index) => (
          <div
            key={index}
            className="p-4 border-b flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">{product.weight}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">x {product.quantity}</div>
              <div className="w-24 text-right">
                {formatPrice(product.price)}
              </div>
            </div>
          </div>
        ))}

        {/* Totals */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tạm tính</span>
            <span>{formatPrice(orderDetails.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Phí vận chuyển</span>
            <span>{formatPrice(orderDetails.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t">
            <span>Tổng cộng</span>
            <span>{formatPrice(orderDetails.total)}</span>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="border rounded-md p-4 mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-4">Thông tin mua hàng</h3>
            <div className="space-y-2 text-sm">
              <p>{orderDetails.customerName}</p>
              <p>{orderDetails.customerEmail}</p>
              <p>{orderDetails.customerPhone}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Địa chỉ nhận hàng</h3>
            <div className="space-y-2 text-sm">
              <p>{orderDetails.shippingAddress.name}</p>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>{orderDetails.shippingAddress.ward}</p>
              <p>{orderDetails.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment and Shipping Method */}
      <div className="border rounded-md p-4 mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-4">Phương thức thanh toán</h3>
            <p className="text-sm">Thanh toán khi giao hàng (COD)</p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Phương thức vận chuyển</h3>
            <p className="text-sm">Giao hàng tận nơi</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-sm text-gray-500">
        <div className="truncate">
          https://dola-organic.myshopify.net/checkout/thankyou/3f5fe276f51aaf43cb6bc3bcbe5dbf1403f
        </div>
        <div>1/1</div>
      </div>
    </div>
  );
}
