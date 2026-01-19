import { Users, ShoppingBag, DollarSign } from "lucide-react";
import { getAllOrders } from "@/services/order/order";
import { getCustomers } from "@/services/admin/usersManagement";
import { getModerators } from "@/services/admin/moderatorsManagement";
import { Order } from "@/types/order.type";
import SharedDashboardHome from "@/components/modules/Shared/Dashboard/SharedDashboardHome";

export default async function AdminDashboardPage() {
  const [ordersRes, customersRes, moderatorsRes] = await Promise.all([
    getAllOrders(),
    getCustomers(""),
    getModerators(""),
  ]);

  const totalRevenue = ordersRes.data?.reduce((sum: number, order: Order) => {
    const paymentAmount =
      order.payment?.status === "PAID" ? order.payment.amount || 0 : 0;
    return sum + paymentAmount;
  }, 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "bg-green-500",
      trend: "up",
    },
    {
      title: "Total Orders",
      value: ordersRes.data?.length.toString() || "0",
      icon: ShoppingBag,
      color: "bg-blue-500",
      trend: "up",
    },
    {
      title: "Total Users",
      value: customersRes.data?.length.toString() || "0",
      icon: Users,
      color: "bg-purple-500",
      trend: "up",
    },
    {
      title: "Total Moderators",
      value: moderatorsRes.data?.length.toString() || "0",
      icon: Users,
      color: "bg-surprise-pink",
      trend: "up",
    },
  ];

  return <SharedDashboardHome stats={stats} orders={ordersRes.data} />;
}
