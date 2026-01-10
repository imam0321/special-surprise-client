import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { getAllProduct } from "@/services/product/product";
import { getAllOrders } from "@/services/order/order";
import { getCustomers } from "@/services/admin/usersManagement";
import { getModerators } from "@/services/admin/moderatorsManagement";
import { Order } from "@/types/order.type";

export default async function ModeratorDashboardPage() {
  const [productsRes, ordersRes, customersRes] =
    await Promise.all([
      getAllProduct(),
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
      title: "Active Products",
      value: productsRes.data?.length.toString() || "0",
      icon: Package,
      color: "bg-orange-500",
      trend: "up",
    },
    {
      title: "Total Users",
      value: customersRes.data?.length.toString() || "0",
      icon: Users,
      color: "bg-purple-500",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Dashboard Overview"
        description="Welcome back! Here's what's happening today."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h3>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
