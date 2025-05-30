"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Users,
  Clock,
  Globe,
  BarChart,
  ChartArea,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";

export default function FormAnalytics() {
  const params = useParams();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["form-analytics", params.id],
    queryFn: async () => {
      const res = await axios.get(`/api/forms/${params.id}/analytics`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const COLORS = ["#1f2937", "#374151", "#4b5563", "#6b7280", "#9ca3af"];

  // Helper function to render empty state
  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
      <ChartArea strokeWidth={1.5} className="h-8 w-8" />
      <p className="text-sm">{message}</p>
    </div>
  );

  return (
    <div className="page space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Form Analytics</h1>

      {/* Overview Stats - Always show numbers, default to 0 */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Responses
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analytics.totalResponses || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Time to Complete
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {(analytics.avgTimeTaken || 0).toFixed(1)}s
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completion Rate
            </CardTitle>
            <BarChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {(analytics.completionRate || 0).toFixed(1)}%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Unique Countries
            </CardTitle>
            <Globe className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Object.keys(analytics.locationStats || {}).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Show empty states when no data */}
      <Card className="p-4 bg-white border-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-900">Response Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {analytics.responseTrends?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.responseTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), "MMM d")}
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  labelFormatter={(date) =>
                    format(new Date(date), "MMM d, yyyy")
                  }
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#1f2937"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState message="Share your form to start seeing response trends" />
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 bg-white border-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-900">Device Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {Object.keys(analytics.deviceStats || {}).length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(analytics.deviceStats).map(
                      ([name, value]) => ({
                        name,
                        value,
                      }),
                    )}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill={COLORS[0]}
                    dataKey="value"
                  >
                    {Object.entries(analytics.deviceStats).map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ),
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="Get responses to see device analytics" />
            )}
          </CardContent>
        </Card>

        <Card className="p-4 bg-white border-gray-100">
          <CardHeader>
            <CardTitle className="text-gray-900">
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {Object.keys(analytics.locationStats || {}).length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(analytics.locationStats).map(
                      ([name, value]) => ({
                        name,
                        value,
                      }),
                    )}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill={COLORS[0]}
                    dataKey="value"
                  >
                    {Object.entries(analytics.locationStats).map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ),
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState message="Get responses to see location data" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
