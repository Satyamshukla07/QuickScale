import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
  Users,
  MousePointerClick,
  Clock,
  TrendingUp,
  Globe,
  Share2,
  Laptop,
  Smartphone,
  Tablet,
} from "lucide-react";
import GlassCard from "@/components/GlassCard";

// Mock data for the dashboard
const performanceData = [
  { month: 'Jan', visits: 4000, conversions: 240, social: 1200, engagement: 12 },
  { month: 'Feb', visits: 3000, conversions: 198, social: 1100, engagement: 10 },
  { month: 'Mar', visits: 5000, conversions: 300, social: 1300, engagement: 14 },
  { month: 'Apr', visits: 4500, conversions: 276, social: 1500, engagement: 13 },
  { month: 'May', visits: 6000, conversions: 390, social: 1700, engagement: 15 },
  { month: 'Jun', visits: 7000, conversions: 430, social: 2000, engagement: 16 },
];

const trafficSourcesData = [
  { name: 'Organic Search', value: 42 },
  { name: 'Social Media', value: 28 },
  { name: 'Direct', value: 18 },
  { name: 'Referral', value: 12 },
];

const deviceData = [
  { name: 'Desktop', value: 54 },
  { name: 'Mobile', value: 38 },
  { name: 'Tablet', value: 8 },
];

const COLORS = ['#00D2FF', '#C652FF', '#FF38B3', '#40E0D0'];

const topPages = [
  { page: "/home", views: 4875, bounceRate: "28%" },
  { page: "/services", views: 3982, bounceRate: "32%" },
  { page: "/about", views: 2513, bounceRate: "25%" },
  { page: "/contact", views: 1830, bounceRate: "18%" },
  { page: "/portfolio", views: 1650, bounceRate: "30%" },
];

export default function Dashboard() {
  const [period, setPeriod] = useState("6m"); // 6m, 3m, 1m

  // Filter data based on selected period
  const getFilteredData = () => {
    switch(period) {
      case "1m":
        return performanceData.slice(-1);
      case "3m":
        return performanceData.slice(-3);
      default:
        return performanceData;
    }
  };

  const filteredData = getFilteredData();
  
  // Calculate total metrics
  const totalVisits = filteredData.reduce((sum, item) => sum + item.visits, 0);
  const totalConversions = filteredData.reduce((sum, item) => sum + item.conversions, 0);
  const conversionRate = ((totalConversions / totalVisits) * 100).toFixed(1);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="pt-24 pb-12 px-4 md:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Dashboard Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Performance Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Track your campaign performance and user engagement metrics
          </p>
        </motion.div>
        
        {/* Tabs for time periods */}
        <div className="mb-8">
          <Tabs defaultValue="6m" onValueChange={setPeriod} className="w-full">
            <TabsList className="grid w-[400px] grid-cols-3">
              <TabsTrigger value="6m">Last 6 Months</TabsTrigger>
              <TabsTrigger value="3m">Last 3 Months</TabsTrigger>
              <TabsTrigger value="1m">Last Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Key Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Visits</p>
                  <h3 className="text-2xl font-bold">{totalVisits.toLocaleString()}</h3>
                  <p className="text-xs text-electric-blue flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from previous period
                  </p>
                </div>
                <div className="bg-electric-blue/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-electric-blue" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Conversions</p>
                  <h3 className="text-2xl font-bold">{totalConversions.toLocaleString()}</h3>
                  <p className="text-xs text-neon-purple flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +8% from previous period
                  </p>
                </div>
                <div className="bg-neon-purple/10 p-2 rounded-full">
                  <MousePointerClick className="h-5 w-5 text-neon-purple" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</p>
                  <h3 className="text-2xl font-bold">{conversionRate}%</h3>
                  <p className="text-xs text-neon-teal flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +2.5% from previous period
                  </p>
                </div>
                <div className="bg-neon-teal/10 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-neon-teal" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Session</p>
                  <h3 className="text-2xl font-bold">4m 32s</h3>
                  <p className="text-xs text-neon-pink flex items-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" /> +18% from previous period
                  </p>
                </div>
                <div className="bg-neon-pink/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-neon-pink" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
        
        {/* Charts Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Traffic Performance Chart */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6 h-full">
              <h3 className="text-xl font-bold mb-4">Traffic Performance</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D2FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#00D2FF" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C652FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#C652FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="visits"
                      stroke="#00D2FF"
                      fillOpacity={1}
                      fill="url(#colorVisits)"
                    />
                    <Area
                      type="monotone"
                      dataKey="conversions"
                      stroke="#C652FF"
                      fillOpacity={1}
                      fill="url(#colorConversions)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Traffic Sources */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 h-full">
              <h3 className="text-xl font-bold mb-4">Traffic Sources</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourcesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trafficSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-electric-blue" />
                  <span className="text-sm">Organic traffic has increased by 15% this month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4 text-neon-purple" />
                  <span className="text-sm">Social media referrals showing strongest growth</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
        
        {/* Device Distribution and Top Pages */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Device Distribution */}
          <motion.div variants={itemVariants}>
            <GlassCard className="p-6 h-full">
              <h3 className="text-xl font-bold mb-4">Device Distribution</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 rounded-lg bg-background/50">
                  <Laptop className="h-5 w-5 text-electric-blue mb-1" />
                  <p className="text-xs font-medium">Desktop</p>
                  <p className="text-lg font-bold">54%</p>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-background/50">
                  <Smartphone className="h-5 w-5 text-neon-purple mb-1" />
                  <p className="text-xs font-medium">Mobile</p>
                  <p className="text-lg font-bold">38%</p>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-background/50">
                  <Tablet className="h-5 w-5 text-neon-pink mb-1" />
                  <p className="text-xs font-medium">Tablet</p>
                  <p className="text-lg font-bold">8%</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Top Pages */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <GlassCard className="p-6 h-full">
              <h3 className="text-xl font-bold mb-4">Top Pages</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-2 text-sm font-medium text-muted-foreground">Page</th>
                      <th className="text-right p-2 text-sm font-medium text-muted-foreground">Views</th>
                      <th className="text-right p-2 text-sm font-medium text-muted-foreground">Bounce Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((page, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-2 text-sm">{page.page}</td>
                        <td className="p-2 text-sm text-right">{page.views.toLocaleString()}</td>
                        <td className="p-2 text-sm text-right">{page.bounceRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Engagement by Page</h4>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" stroke="#888888" />
                      <YAxis stroke="#888888" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.85)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white',
                        }}
                      />
                      <Bar dataKey="social" fill="#FF38B3" />
                      <Bar dataKey="engagement" fill="#40E0D0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
        
        {/* Recommendations */}
        <motion.div
          className="mt-8 p-6 glass rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4 text-neon-purple">AI-Powered Recommendations</h3>
          <div className="space-y-3">
            <div className="p-3 bg-neon-purple/10 rounded-lg flex items-start">
              <div className="mr-3 mt-1">
                <TrendingUp className="h-5 w-5 text-neon-purple" />
              </div>
              <div>
                <h4 className="font-medium">Optimize Mobile Experience</h4>
                <p className="text-sm text-muted-foreground">
                  Mobile traffic has increased by 18% but conversion rate is lower than desktop. Consider improving mobile checkout experience.
                </p>
              </div>
            </div>
            <div className="p-3 bg-electric-blue/10 rounded-lg flex items-start">
              <div className="mr-3 mt-1">
                <Globe className="h-5 w-5 text-electric-blue" />
              </div>
              <div>
                <h4 className="font-medium">Content Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Users searching for "digital marketing strategy" are landing on your /services page. Create dedicated content addressing this topic.
                </p>
              </div>
            </div>
            <div className="p-3 bg-neon-teal/10 rounded-lg flex items-start">
              <div className="mr-3 mt-1">
                <Share2 className="h-5 w-5 text-neon-teal" />
              </div>
              <div>
                <h4 className="font-medium">Social Media Growth</h4>
                <p className="text-sm text-muted-foreground">
                  Instagram is driving 43% more traffic than last month. Consider increasing content frequency and ad spend on this platform.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}