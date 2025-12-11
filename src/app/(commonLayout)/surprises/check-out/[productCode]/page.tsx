import CheckOut from "@/components/modules/CheckOut/CheckOut";
import { getProductByCode } from "@/services/product/product";

export default async function CheckOutPage({
  params,
}: {
  params: { productCode: string };
}) {
  const { productCode } = await params;
  const { data: product } = await getProductByCode(productCode);
  console.log(product)
  return (
    <CheckOut/>
  );
}
