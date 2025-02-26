import { Loader } from "lucide-react";

export default function FormDetailLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-white to-gray-50/50">
      <div className="flex flex-col items-center gap-4 p-8 rounded-xl bg-white/50 shadow-xl border border-gray-100">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse" />
          <Loader size={40} className="animate-spin text-blue-600 relative" />
        </div>
        <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Loading form details...
        </p>
      </div>
    </div>
  );
} 