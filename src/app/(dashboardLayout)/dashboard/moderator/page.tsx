import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";
import { getAllProduct } from "@/services/product/product";
import { getAllOrders } from "@/services/order/order";
import { getCustomers } from "@/services/admin/usersManagement";
import SharedDashboardHome from "@/components/modules/Shared/Dashboard/SharedDashboardHome";
import { calculateTotalRevenue, formatCurrency } from "@/lib/dashboard.utils";

export default async function ModeratorDashboardPage() {
  const [productsRes, ordersRes, customersRes] = await Promise.all([
    getAllProduct(),
    getAllOrders(),
    getCustomers(""),
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
      title: "Active Products",
      value: productsRes.data?.length || 0,
      icon: Package,
      bgColorClass: "bg-orange-500/20",
      iconColorClass: "text-orange-500",
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
  ];

  return <SharedDashboardHome stats={stats} orders={ordersRes.data} />;
}
