import { Loader } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex flex-col items-center gap-4">
        <Loader size={40} className="animate-spin text-blue-600" />
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    </div>
  );
} 