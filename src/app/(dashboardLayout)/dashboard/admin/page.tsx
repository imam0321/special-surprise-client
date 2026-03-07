import { Users, ShoppingBag, DollarSign } from "lucide-react";
import { getAllOrders } from "@/services/order/order";
import { getCustomers } from "@/services/admin/usersManagement";
import { getModerators } from "@/services/admin/moderatorsManagement";
import SharedDashboardHome from "@/components/modules/Shared/Dashboard/SharedDashboardHome";
import { calculateTotalRevenue, formatCurrency } from "@/lib/dashboard.utils";

export default async function AdminDashboardPage() {
  const [ordersRes, customersRes, moderatorsRes] = await Promise.all([
    getAllOrders(),
    getCustomers(""),
    getModerators(""),
  ]);

  const totalRevenue = calculateTotalRevenue(ordersRes.data);

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue, "USD"),
      icon: DollarSign,
      bgColorClass: "bg-green-500/20",
      iconColorClass: "text-green-500",
      trend: "up",
    },
    {
      title: "Total Orders",
      value: ordersRes.data?.length || 0,
      icon: ShoppingBag,
      bgColorClass: "bg-blue-500/20",
      iconColorClass: "text-blue-500",
      trend: "up",
    },
    {
      title: "Total Users",
      value: customersRes.data?.length || 0,
      icon: Users,
      bgColorClass: "bg-purple-500/20",
      iconColorClass: "text-purple-500",
      trend: "up",
    },
    {
      title: "Total Moderators",
      value: moderatorsRes.data?.length || 0,
      icon: Users,
      bgColorClass: "bg-surprise-pink/20",
      iconColorClass: "text-surprise-pink",
      trend: "up",
    },
  ];

  return <SharedDashboardHome stats={stats} orders={ordersRes.data} />;
}
