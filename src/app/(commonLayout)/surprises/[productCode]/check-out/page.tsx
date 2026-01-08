import CheckoutForm from "@/components/modules/CheckOut/CheckoutForm";
import { getProductByCode } from "@/services/product/product";
import { Info } from "lucide-react";

export default async function CheckOutPage({
  params,
}: {
  params: { productCode: string };
}) {
  const { productCode } = await params;
  const { data: surprise } = await getProductByCode(productCode);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 flex gap-3">
          <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium">Important Delivery Notice</p>
            <p>
              Orders will be delivered <strong>at least 2 days after</strong>{" "}
              the order date. Same-day or next-day delivery is not available.
            </p>
          </div>
        </div>
        <CheckoutForm surprise={surprise} />
      </div>
    </div>
  );
}
