"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import TokenSyncProvider from "./TokenSyncProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // This guarantees that each user gets their own isolated cache instance!
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute default stale time
            refetchOnWindowFocus: false, // Turn off aggressive re-fetching on focus
          },
        },
      }),
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <TokenSyncProvider>{children}</TokenSyncProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
