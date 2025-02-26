"use client";
import React, { useEffect, useState } from "react";
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

const FormAnalytics = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

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
        <Card className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <h3 className="text-sm font-medium">Total Forms</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.totalForms}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <h3 className="text-sm font-medium">Total Responses</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.totalResponses}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <h3 className="text-sm font-medium">Avg. Time</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.avgTimeTaken}s</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <h3 className="text-sm font-medium">Completion Rate</h3>
            </div>
            <p className="text-2xl font-bold">{Math.round(analytics.completionRate)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Response Trends Chart */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Response Trends</CardTitle>
          <CardDescription>Form submission trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart width={800} height={300} data={analytics.responseTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="filledAt" />
            <Tooltip />
            <Bar dataKey="timeTaken" fill="#C4B5FD" />
          </BarChart>
        </CardContent>
      </Card>

      {/* Device Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Device Distribution</CardTitle>
          <CardDescription>Responses by device type</CardDescription>
        </CardHeader>
        <CardContent>
          <PieChart width={200} height={200}>
            <Pie
              data={Object.entries(analytics.deviceStats).map(([name, value]) => ({
                name,
                value,
              }))}
              cx={100}
              cy={100}
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
        </CardContent>
      </Card>

      {/* Form Privacy Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Form Privacy</CardTitle>
          <CardDescription>Public vs Private Forms</CardDescription>
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
