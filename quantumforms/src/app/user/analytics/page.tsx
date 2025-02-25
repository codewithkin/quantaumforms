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
  LineChart,
  PieChart,
  XAxis,
} from "recharts";
import axios from "axios";
import { Loader2, TrendingUp } from "lucide-react";

export type analytics = {
  totalForms: number;
  totalResponses: number;
  avgTimeTaken: number;
  responseTrends: any;
};

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const FormAnalytics = () => {
  const [analytics, setAnalytics] = useState<analytics | null>(null);
  const [chartData, setChartData] = useState<any | null>(null);

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

  useEffect(() => {
    if (analytics) {
      setChartData(analytics.responseTrends);
    }
  }, [analytics]);

  if (!analytics) {
    return (
      <article className="w-full h-full flex justify-center items-center">
        <Loader2 className="animate-spin" size={40} />
      </article>
    );
  }

  console.log("ANALYTICS: ", analytics);

  const chartConfig = {
    timeTaken: {
      label: "Time Taken",
      color: "hsl(var(--chart-1))",
    },
    longestField: {
      label: "Field taking the longest",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <article className="grid gap-4 items-center w-fit h-fit">
        <article className="flex flex-col gap-4 w-full">
          <article className="flex gap-2 items-center w-full h-fit">
            <Card className="w-full py-4 h-fit border-2 border-slate-300">
              <CardContent className="w-fit h-fit">
                <CardTitle className="text-xl font-semibold">
                  Total Forms
                </CardTitle>
                <p className="text-3xl font-bold">{analytics.totalForms}</p>
              </CardContent>
            </Card>

            <Card className="w-full py-4 h-fit">
              <CardContent>
                <CardTitle className="text-xl font-semibold">
                  Avg. Time to Fill
                </CardTitle>
                <p className="text-3xl font-bold">
                  {analytics.avgTimeTaken} sec
                </p>
              </CardContent>
            </Card>
          </article>

          <Card className="max-w-[800px]">
            <CardHeader>
              <CardTitle>Response Trends</CardTitle>
              <CardDescription>2025</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="filledAt"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value: any) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="timeTaken" fill="#C4B5FD" radius={4} />
                  <Bar
                    dataKey="longestField"
                    fill="var(--color-mobile)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col text-center items-start gap-2 text-sm">
              <div className="leading-none text-muted-foreground text-center">
                Showing total responses for the year of 2025 across all forms
              </div>
            </CardFooter>
          </Card>
        </article>
      </article>

      {/* <Card>
        <CardContent>
          <CardTitle className="text-xl font-semibold">Public vs. Private Forms</CardTitle>
          <PieChart width={200} height={200} data={analytics.publicPrivateBreakdown} />
        </CardContent>
      </Card> */}

      {/* <Card className="col-span-2">
        <CardContent>
          <CardTitle className="text-xl font-semibold">
            Response Trends
          </CardTitle>
          <LineChart width={600} height={300} data={analytics.responseTrends} />
        </CardContent>
      </Card> */}
    </div>
  );
};

export default FormAnalytics;
