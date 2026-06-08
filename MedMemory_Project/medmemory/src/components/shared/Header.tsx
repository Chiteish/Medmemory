"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Sun, Moon, Search, Check, Sparkles } from "lucide-react";
import { useHealthStore } from "@/store/healthStore";

const notificationData = [
  { id: "n1", title: "New Health Insight Extracted", message: "Your HbA1c screening is completed and ready.", read: false, type: "insight" },
  { id: "n2", title: "Upcoming Appointment", message: "Reminder: Endocrinologist on June 14, 2026.", read: false, type: "appointment" },
  { id: "n3", title: "Emergency Share Active", message: "Thomas Rivera has viewing access permissions.", read: true, type: "share" }
];

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme, user } = useHealthStore();
  const [notifications, setNotifications] = useState(notificationData);
  const [showNotifications, setShowNotifications] = useState(false);

  // Derive title from pathname
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/upload":
        return "Upload Records";
      case "/timeline":
        return "Health Timeline";
      case "/chat":
        return "AI Assistant";
      case "/family":
        return "Family Share";
      case "/doctor-summary":
        return "Doctor Briefing";
      case "/settings":
        return "Settings";
      default:
        return "MedMemory";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 sticky top-0 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-20 flex items-center justify-between px-6">
      {/* Page Title */}
      <div>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white capitalize">
          {getPageTitle()}
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3">
        {/* Search Input Simulation */}
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search medical records..."
            className="h-9 w-60 pl-9 pr-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/55 text-slate-800 dark:text-slate-200 transition-all"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:border-slate-800 text-slate-600 dark:text-slate-350 focus:outline-none transition-colors"
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-9 w-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:border-slate-800 text-slate-600 dark:text-slate-350 focus:outline-none transition-colors"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-50 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/35">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[10px] text-brand hover:underline flex items-center gap-0.5 font-medium"
                  >
                    <Check size={10} /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/50">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3.5 flex flex-col space-y-1.5 transition-colors ${
                      n.read ? "bg-transparent" : "bg-slate-50/30 dark:bg-slate-800/10"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        {n.type === "insight" && <Sparkles size={11} className="text-brand" />}
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-1.5" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
