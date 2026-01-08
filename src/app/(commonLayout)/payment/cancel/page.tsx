import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { PaymentPageProps } from "../success/page";

export default async function PaymentCancelPage({
  searchParams,
}: PaymentPageProps) {
  const { transactionId, message, amount } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-yellow-500 animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-yellow-600">
          ⚠️ Payment Cancelled
        </h1>

        <p className="mb-2 text-gray-700">
          {message || "You cancelled the payment process."}
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
          href="/"
          className="inline-block w-full py-3 rounded-lg text-white font-medium transition bg-linear-to-r from-yellow-400 to-orange-500 hover:opacity-90"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
