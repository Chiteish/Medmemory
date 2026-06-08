"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  Activity,
  Sparkles,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HeartPulse
} from "lucide-react";
import { useHealthStore } from "@/store/healthStore";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Reports", href: "/upload", icon: UploadCloud },
  { name: "Timeline", href: "/timeline", icon: Activity },
  { name: "AI Assistant", href: "/chat", icon: Sparkles },
  { name: "Family", href: "/family", icon: Users },
  { name: "Doctor Summary", href: "/doctor-summary", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const logout = useHealthStore((state) => state.logout);
  const user = useHealthStore((state) => state.user);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transition-all duration-300 z-30 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50 dark:border-slate-800/50">
        <Link href="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="h-9 w-9 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-brand-100 dark:shadow-none transition-transform group-hover:scale-105">
            <HeartPulse size={20} className="animate-pulse" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 dark:text-white tracking-tight leading-none text-base">
                MedMemory
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                Health Record
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none transition-colors"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 select-none ${
                isActive
                  ? "bg-brand-50 text-brand dark:bg-brand-950/30 dark:text-brand-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Icon size={18} className={isActive ? "text-brand" : "text-slate-400 dark:text-slate-500"} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile Section */}
      <div className="p-4 border-t border-slate-50 dark:border-slate-800/50">
        {!isCollapsed && user && (
          <div className="flex items-center space-x-3 p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl mb-3">
            <div className="h-9 w-9 bg-brand-100 dark:bg-brand-950 text-brand dark:text-brand-400 rounded-lg flex items-center justify-center font-semibold text-sm">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate leading-none mb-0.5">
                {user.name}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate leading-none">
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all select-none ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
