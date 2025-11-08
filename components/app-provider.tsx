"use client";

import { AuthProvider } from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

interface AppProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};
