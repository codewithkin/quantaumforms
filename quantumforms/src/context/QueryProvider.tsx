"use client";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import {create} from "zustand";

export const useQueryClientProvider = create((set: {}) => ({
  queryClient: new QueryClient()
}))

function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClientProvider(state => state.queryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
