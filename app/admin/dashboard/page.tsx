"use client";

import { useEffect, useState } from "react";
import {
  HiChartBar,
  HiDocumentText,
  HiShoppingCart,
  HiUsers,
} from "react-icons/hi2";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardStats {
  totalBlogs: number;
  totalAccountManagement: number;
  totalLinkedInConnection: number;
  totalAccountRecovery: number;
  totalHiringSupport: number;
  totalLeadGeneration: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalAccountManagement: 0,
    totalLinkedInConnection: 0,
    totalAccountRecovery: 0,
    totalHiringSupport: 0,
    totalLeadGeneration: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard-stats");
      const result = await response.json();
      
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      label: "Total Blogs", 
      value: loading ? "..." : stats.totalBlogs.toString(), 
      icon: <HiDocumentText className="w-6 h-6 text-blue-600" />
    },
    { 
      label: "Total Account Management", 
      value: loading ? "..." : stats.totalAccountManagement.toString(), 
      icon: <HiUsers className="w-6 h-6 text-blue-600" />
    },
    { 
      label: "Total LinkedIn Connection", 
      value: loading ? "..." : stats.totalLinkedInConnection.toString(), 
      icon: <HiShoppingCart className="w-6 h-6 text-blue-600" />
    },
    { 
      label: "Total Account Recovery", 
      value: loading ? "..." : stats.totalAccountRecovery.toString(), 
      icon: <HiChartBar className="w-6 h-6 text-blue-600" />
    },
    { 
      label: "Total Hiring Support", 
      value: loading ? "..." : stats.totalHiringSupport.toString(), 
      icon: <HiUsers className="w-6 h-6 text-blue-600" />
    },
    { 
      label: "Total Lead Generation", 
      value: loading ? "..." : stats.totalLeadGeneration.toString(), 
      icon: <HiChartBar className="w-6 h-6 text-blue-600" />
    },
  ];

  const recentActivity = [
    { action: "Admin logged in", time: "2 minutes ago", type: "auth" },
    { action: "New lead submitted", time: "15 minutes ago", type: "lead" },
    { action: "Order #1234 created", time: "1 hour ago", type: "order" },
    { action: "Admin logged in", time: "3 hours ago", type: "auth" },
    { action: "New lead submitted", time: "5 hours ago", type: "lead" },
  ];

  // Prepare data for Service Distribution Pie Chart
  const serviceDistributionData = [
    { name: "Blogs", value: stats.totalBlogs, color: "#3b82f6" },
    { name: "Account Management", value: stats.totalAccountManagement, color: "#8b5cf6" },
    { name: "LinkedIn Connection", value: stats.totalLinkedInConnection, color: "#0ea5e9" },
    { name: "Account Recovery", value: stats.totalAccountRecovery, color: "#f97316" },
    { name: "Hiring Support", value: stats.totalHiringSupport, color: "#10b981" },
    { name: "Lead Generation", value: stats.totalLeadGeneration, color: "#ec4899" },
  ];

  // Prepare data for Monthly Growth Bar Chart (mock data for demonstration)
  const monthlyGrowthData = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 19 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 25 },
    { month: "May", count: 22 },
    { month: "Jun", count: 30 },
  ];

  return (
    <div style={{ padding: "32px", maxWidth: "1400px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-heading, sans-serif)",
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "-0.02em",
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            margin: "4px 0 0",
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "14px",
            color: "var(--muted)",
          }}
        >
          Welcome back, Admin
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 min-h-[160px] flex flex-col gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center">
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Service Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Service Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#3b82f6"
                dataKey="value"
              >
                {serviceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Growth Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Monthly Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="New Submissions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
