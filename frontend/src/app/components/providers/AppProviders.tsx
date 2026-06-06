"use client";

import { SessionProvider } from "next-auth/react";
import TokenSyncProvider from "./TokenSyncProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TokenSyncProvider>{children}</TokenSyncProvider>
    </SessionProvider>
  );
}
