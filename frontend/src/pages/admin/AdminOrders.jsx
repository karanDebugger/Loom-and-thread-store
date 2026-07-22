import { useEffect, useMemo, useState } from "react";

import { getAllOrders } from "../../services/orderService";

import AdminOrderRow from "../../components/orders/AdminOrderRow";
import DashboardStatCard from "../../components/admin/DashboardStatCard";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const data = await getAllOrders();

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    return {
      totalOrders: orders.length,

      totalRevenue: orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
      ),

      pending: orders.filter(
        (o) => o.orderStatus === "Pending"
      ).length,

      processing: orders.filter(
        (o) => o.orderStatus === "Processing"
      ).length,

      shipped: orders.filter(
        (o) => o.orderStatus === "Shipped"
      ).length,

      delivered: orders.filter(
        (o) => o.orderStatus === "Delivered"
      ).length,

      cancelled: orders.filter(
        (o) => o.orderStatus === "Cancelled"
      ).length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (order) =>
          order._id.toLowerCase().includes(keyword) ||
          order.user?.name?.toLowerCase().includes(keyword) ||
          order.user?.email?.toLowerCase().includes(keyword)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (order) => order.orderStatus === statusFilter
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return result;
  }, [orders, search, statusFilter, sortOrder]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-6">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <DashboardStatCard
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-blue-900"
        />

        <DashboardStatCard
          title="Revenue"
          value={`₹${stats.totalRevenue}`}
          color="bg-green-900"
        />

        <DashboardStatCard
          title="Pending"
          value={stats.pending}
          color="bg-yellow-800"
        />

        <DashboardStatCard
          title="Processing"
          value={stats.processing}
          color="bg-indigo-900"
        />

        <DashboardStatCard
          title="Shipped"
          value={stats.shipped}
          color="bg-purple-900"
        />

        <DashboardStatCard
          title="Delivered"
          value={stats.delivered}
          color="bg-emerald-900"
        />

        <DashboardStatCard
          title="Cancelled"
          value={stats.cancelled}
          color="bg-red-900"
        />

      </div>

      <p className="text-zinc-400 mb-6">
        Search, filter and manage customer orders.
      </p>

      <div className="flex flex-col lg:flex-row gap-4 mb-8">

        <input
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 lg:w-80"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2"
        >
          <option>Newest</option>
          <option>Oldest</option>
        </select>

      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">

        <table className="w-full">

          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <AdminOrderRow
                key={order._id}
                order={order}
                onStatusUpdated={fetchOrders}
              />
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminOrders;