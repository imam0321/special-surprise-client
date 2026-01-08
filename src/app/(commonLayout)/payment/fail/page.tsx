import Link from "next/link";
import { XCircle } from "lucide-react";
import { PaymentPageProps } from "../success/page";

export default async function PaymentFailPage({
  searchParams,
}: PaymentPageProps) {
  const { transactionId, message, amount } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <XCircle className="h-16 w-16 text-red-500 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-red-600">
          ❌ Payment Failed
        </h1>

        <p className="mb-2 text-gray-700">
          {message || "Payment failed. Please try again."}
        </p>

        <div className="mb-4 text-gray-800">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId || "-"}
          </p>
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            {amount ? `${amount} BDT` : "-"}
          </p>
        </div>

        <Link
          href="/checkout"
          className="inline-block w-full py-3 rounded-lg text-white font-medium transition bg-red-500 hover:bg-red-600"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
