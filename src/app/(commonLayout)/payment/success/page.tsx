// app/payment/success/page.tsx
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

export interface PaymentPageProps {
  searchParams: {
    transactionId?: string;
    message?: string;
    amount?: string;
    status?: string;
  };
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentPageProps) {
  const { transactionId, message, amount, status } = await searchParams;
  const isSuccess = status === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500 animate-pulse" />
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4">
          {isSuccess ? "🎉 Payment Successful!" : "❌ Payment Failed"}
        </h1>

        <p className="mb-2 text-gray-700">{message}</p>

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
          href="/orders"
          className={`inline-block w-full py-3 rounded-lg text-white font-medium transition ${
            isSuccess
              ? "bg-linear-to-r from-surprise-pink to-surprise-purple hover:opacity-90"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isSuccess ? "Go to My Orders" : "Try Again"}
        </Link>
      </div>
    </div>
  );
}
