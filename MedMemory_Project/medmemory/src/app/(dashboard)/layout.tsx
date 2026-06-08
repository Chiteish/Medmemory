"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { BottomNav } from "@/components/shared/BottomNav";
import { Header } from "@/components/shared/Header";
import { useHealthStore } from "@/store/healthStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuthenticated = useHealthStore((state) => state.isAuthenticated);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace("/signin");
    }
  }, [isAuthenticated, isMounted, router]);

  // Loading screen during hydration and auth checks
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8F9FE]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Verifying secure credentials...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F8F9FE] font-sans">
      {/* Collapsible desktop sidebar */}
      <Sidebar />

      {/* Main panel */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 h-screen overflow-hidden">
        {/* Page top bar */}
        <Header />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto bg-transparent">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigations */}
      <BottomNav />
    </div>
  );
}
