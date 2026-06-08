"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UploadCloud,
  Sparkles,
  Users,
  Settings
} from "lucide-react";

const mobileItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload", href: "/upload", icon: UploadCloud },
  { name: "AI Chat", href: "/chat", icon: Sparkles },
  { name: "Family", href: "/family", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 z-40 flex items-center justify-around px-4 pb-safe">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-xs font-medium transition-colors ${
              isActive
                ? "text-brand dark:text-brand-400"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-brand-50/50 dark:bg-brand-950/20 scale-110" : ""}`}>
              <Icon size={20} />
            </div>
            <span className="text-[10px] mt-0.5 leading-none">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
