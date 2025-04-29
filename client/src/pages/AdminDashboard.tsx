import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCircle, Settings, Users, BarChart, Package, Globe } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const AdminDashboard = () => {
  const [stats] = useState([
    { label: "Total Users", value: "1,234", icon: Users, color: "text-electric-blue" },
    { label: "Active Services", value: "56", icon: Package, color: "text-neon-purple" },
    { label: "Revenue", value: "$45,678", icon: BarChart, color: "text-neon-teal" },
    { label: "Global Reach", value: "25+", icon: Globe, color: "text-neon-pink" }
  ]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-700 dark:text-gray-300 mt-1">Welcome back, Admin</p>
          </div>
          <button className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.color} bg-opacity-20 mr-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">User Action {index + 1}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Activity description goes here
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Manage Users", "View Reports", "Update Content", "System Settings"].map(
                (action, index) => (
                  <button
                    key={index}
                    className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left font-medium"
                  >
                    {action}
                  </button>
                )
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;