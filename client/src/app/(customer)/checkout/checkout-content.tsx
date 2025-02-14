import DeliveryInformation from "./delivery-information";
import OrderSummary from "./order-summary";

const CheckoutContent = () => {
  return (
    <div className="mx-auto px-4">
      <div className="grid gap-8 lg:grid-cols-3">
        <DeliveryInformation></DeliveryInformation>
        <OrderSummary></OrderSummary>
      </div>
    </div>
  );
};

export default CheckoutContent;
