"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "recharts";
import axios from "axios";

export type analytics = {
  totalForms: number;
  totalResponses: number;
  avgTimeTaken: number;
  responseTrends: any
}

const FormAnalytics = () => {
  const [analytics, setAnalytics] = useState<analytics | null>(null);

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

  if (!analytics) return <p>Loading analytics...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardContent>
          <CardTitle className="text-xl font-semibold">Total Forms</CardTitle>
          <p className="text-3xl font-bold">{analytics.totalForms}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardTitle className="text-xl font-semibold">Total Responses</CardTitle>
          <p className="text-3xl font-bold">{analytics.totalResponses}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardTitle className="text-xl font-semibold">Avg. Time to Fill</CardTitle>
          <p className="text-3xl font-bold">{analytics.avgTimeTaken} sec</p>
        </CardContent>
      </Card>

      {/* <Card>
        <CardContent>
          <CardTitle className="text-xl font-semibold">Public vs. Private Forms</CardTitle>
          <PieChart width={200} height={200} data={analytics.publicPrivateBreakdown} />
        </CardContent>
      </Card> */}

      <Card className="col-span-2">
        <CardContent>
          <CardTitle className="text-xl font-semibold">Response Trends</CardTitle>
          <LineChart width={600} height={300} data={analytics.responseTrends} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnalytics;
