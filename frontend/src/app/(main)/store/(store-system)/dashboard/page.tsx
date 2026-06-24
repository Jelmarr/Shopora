"use client";

import { AuthService } from "@/src/features/auth/services/auth.services";
import { LogOut } from "lucide-react";
import { useState } from "react";

const page = () => {
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const onLogoutClick = async () => {
    setIsDisconnecting(true);
    await AuthService.logout();
  };

  return (
    <main>
      <p>dashboard</p>{" "}
      <button
        onClick={onLogoutClick}
        disabled={isDisconnecting}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150 disabled:opacity-50"
      >
        <LogOut size={16} />
        {isDisconnecting ? "Signing out..." : "Sign Out"}
      </button>
    </main>
  );
};
export default page;
