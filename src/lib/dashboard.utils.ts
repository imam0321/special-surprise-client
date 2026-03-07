import { Order } from "@/types/order.type";

/**
 * Calculates total revenue from a list of orders.
 * Only orders with payment status "PAID" are included if paymentStatus check is enabled.
 */
export const calculateTotalRevenue = (orders: Order[], onlyPaid: boolean = true): number => {
  if (!orders) return 0;
  return orders.reduce((sum, order) => {
    const amount = order.payment?.amount || 0;
    if (onlyPaid) {
      return order.payment?.status === "PAID" ? sum + amount : sum;
    }
    return sum + amount;
  }, 0);
};

/**
 * Calculates the number of orders with a specific status.
 */
export const countOrdersByStatus = (orders: Order[], status: string): number => {
  if (!orders) return 0;
  return orders.filter((order) => order.status === status).length;
};

/**
 * Formats a numeric value into a currency string (৳ or $).
 */
export const formatCurrency = (amount: number, currency: "BDT" | "USD" = "BDT"): string => {
  const symbol = currency === "BDT" ? "৳" : "$";
  return `${symbol}${amount.toLocaleString()}`;
};
