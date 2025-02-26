"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Loader2, TrendingUp, Users, Clock, CheckCircle, Smartphone, Laptop } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Analytics = {
  totalForms: number;
  totalResponses: number;
  completionRate: number;
  avgTimeTaken: number;
  deviceStats: Record<string, number>;
  responseTrends: any[];
  publicPrivateStats: {
    public: number;
    private: number;
  };
  recentActivity: any[];
};

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Add this helper function at the top level
const hasData = (data: Record<string, number>) => {
  return Object.keys(data).length > 0;
};

const FormAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [timeFilter, setTimeFilter] = useState("all"); // all, week, month, year
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  const filterData = useCallback((data: any[], filter: string) => {
    const now = new Date();
    const filtered = data.filter((item) => {
      const date = new Date(item.filledAt);
      switch (filter) {
        case 'week':
          return now.getTime() - date.getTime() <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now.getTime() - date.getTime() <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return now.getTime() - date.getTime() <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });
    return filtered;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.clientWidth);
      }
    };

    // Initial width
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);

    // Cleanup
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/api/forms/analytics");
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <article className="w-full h-full flex justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </article>
    );
  }
  
  const COLORS = ['#C4B5FD', '#818CF8', '#6366F1', '#4F46E5'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Key Metrics */}
      <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-none">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Users className="h-4 w-4" />
              <h3 className="text-sm font-medium">Total Forms</h3>
            </div>
            <p className="text-2xl font-bold text-blue-900">{analytics.totalForms}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-none">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-purple-700">
              <TrendingUp className="h-4 w-4" />
              <h3 className="text-sm font-medium">Total Responses</h3>
            </div>
            <p className="text-2xl font-bold text-purple-900">{analytics.totalResponses}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 border-none">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <Clock className="h-4 w-4" />
              <h3 className="text-sm font-medium">Avg. Time</h3>
            </div>
            <p className="text-2xl font-bold text-emerald-900">{analytics.avgTimeTaken}s</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-none">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-amber-700">
              <CheckCircle className="h-4 w-4" />
              <h3 className="text-sm font-medium">Completion Rate</h3>
            </div>
            <p className="text-2xl font-bold text-amber-900">{Math.round(analytics.completionRate)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Response Trends Chart */}
      <Card className="md:col-span-2 w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
              <CardTitle>Response Trends</CardTitle>
            <CardDescription>Form submission trends over time</CardDescription>
          </div>
          <Select defaultValue="all" onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
            </CardHeader>
        <CardContent ref={containerRef} className="w-full">
          <div className="w-full overflow-x-auto">
            <BarChart 
              width={chartWidth || 1700} 
              height={300} 
              data={filterData(analytics.responseTrends, timeFilter)}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="filledAt" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <Tooltip />
              <Bar dataKey="timeTaken" fill="#C4B5FD" />
            </BarChart>
          </div>
        </CardContent>
      </Card>

      {/* Location Distribution */}
      <Card className="md:col-span-2 w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Responses by country</CardDescription>
          </div>
          <Select defaultValue="all" onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="w-full">
          {hasData(analytics.responseTrends.reduce((acc, response) => {
            if (response.location) {
              acc[response.location] = (acc[response.location] || 0) + 1;
            }
            return acc;
          }, {})) ? (
            <div className="w-full overflow-x-auto">
              <BarChart 
                width={chartWidth || 300}
                height={300} 
                data={filterData(
                  Object.entries(analytics.responseTrends.reduce((acc, response) => {
                    if (response.location) {
                      acc[response.location] = (acc[response.location] || 0) + 1;
                    }
                    return acc;
                  }, {})).map(([country, count]) => ({
                    country,
                    count
                  })),
                  timeFilter
                )}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <Tooltip />
                <Bar dataKey="count" fill="#C4B5FD" />
              </BarChart>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[300px] text-muted-foreground">
              <p className="text-lg font-medium">Nothing to show yet...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Device Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Device Distribution</CardTitle>
            <CardDescription>Responses by device type</CardDescription>
          </div>
          <Select defaultValue="all" onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex justify-center">
          {hasData(analytics.deviceStats) ? (
            <PieChart width={300} height={300}>
              <Pie
                dataKey="value"
                data={Object.entries(analytics.deviceStats).map(([name, value]) => ({
                  name,
                  value,
                }))}
                cx={150}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {Object.entries(analytics.deviceStats).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <div className="flex justify-center items-center h-[300px] text-muted-foreground">
              <p className="text-lg font-medium">Nothing to show yet...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Privacy Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Form Privacy</CardTitle>
            <CardDescription>Public vs Private Forms</CardDescription>
          </div>
          <Select defaultValue="all" onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="year">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Public Forms</span>
                <span>{analytics.publicPrivateStats.public}</span>
              </div>
              <Progress value={
                (analytics.publicPrivateStats.public / analytics.totalForms) * 100
              } className="bg-purple-200" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Private Forms</span>
                <span>{analytics.publicPrivateStats.private}</span>
              </div>
              <Progress value={
                (analytics.publicPrivateStats.private / analytics.totalForms) * 100
              } className="bg-orange-200" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnalytics;
