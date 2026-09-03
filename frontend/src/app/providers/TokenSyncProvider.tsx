"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { setAccessToken } from "@/lib/api-client";

export default function TokenSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      setAccessToken(session.accessToken);
    } else if (status === "unauthenticated") {
      setAccessToken(null);
    }
  }, [session, status]);

  return <>{children}</>;
}
