"use client";

import React from "react";
import { HeartPulse } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-slate-950 font-sans">
      {/* Brand Sidebar (Visible on LG screens) */}
      <div className="hidden lg:flex lg:col-span-5 relative bg-slate-900 overflow-hidden flex-col justify-between p-12 text-white">
        {/* Abstract shapes & health-tech gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-800 via-brand-950 to-slate-950 opacity-90 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/25 via-transparent to-transparent z-0" />
        
        {/* Brand Header */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="h-10.5 w-10.5 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <HeartPulse size={22} className="animate-pulse" />
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            Med<span className="text-sky-300">Memory</span>
          </span>
        </div>

        {/* Brand Core Value Text */}
        <div className="relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-md border border-white/10">
            🏥 HIPAA Compliant Storage
          </span>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Your personal health memory.
          </h2>
          <p className="text-slate-350 text-sm max-w-md font-medium leading-relaxed">
            MedMemory enables you to upload, index, search, and analyze your entire medical history using secure medical-grade AI technology.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} MedMemory Inc. All rights reserved.
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md space-y-8 flex flex-col justify-center min-h-[80vh]">
          {/* Mobile Brand Header */}
          <div className="lg:hidden flex items-center space-x-3 mb-2 self-center">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <HeartPulse size={20} className="animate-pulse" />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900">
              Med<span className="text-indigo-600">Memory</span>
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
