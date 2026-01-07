import OrderSummary from "@/components/modules/CheckOut/OrderSummary";
import ShippingInfo from "@/components/modules/CheckOut/ShippingInfo";
import { getProductByCode } from "@/services/product/product";

export default async function CheckOutPage({
  params,
}: {
  params: { productCode: string };
}) {
  const { productCode } = await params;
  const { data: surprise } = await getProductByCode(productCode);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <ShippingInfo />
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary surprise={surprise} />
          </div>
        </div>
      </div>
    </div>
  );
}
