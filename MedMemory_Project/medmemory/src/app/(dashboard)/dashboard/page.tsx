"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UploadCloud,
  Sparkles,
  UserPlus,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Calendar,
  Activity,
  Heart
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useHealthStore } from "@/store/healthStore";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, reports } = useHealthStore();

  const activeReports = reports.slice(0, 3); // Get 3 recent reports

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* A. Welcome Header */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Text + Score */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white text-slate-900 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[180px] relative overflow-hidden">
          {/* Subtle decorative background blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-[40px] pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                ✨ Active Vault
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight mt-4 text-slate-900">
              Hello, {user?.name || "Ananya"}
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-sm font-medium">
              Your personal health record is fully indexed. Your medical history shows a stable health rating.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-4 relative z-10">
            <div className="flex -space-x-2">
              <span className="h-8 w-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">AR</span>
              <span className="h-8 w-8 rounded-full bg-blue-50 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm">ER</span>
            </div>
            <span className="text-sm font-semibold text-slate-600">
              3 family files linked
            </span>
          </div>
        </div>

        {/* Health Score Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Overall Health Score
              </span>
              <div className="flex items-baseline space-x-1.5 mt-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {user?.healthScore || 82}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${user?.healthScore || 82}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
              <span>Excellent Range</span>
              <span className="text-emerald-500">+4.5% vs last year</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Appointment and Quick Actions Row */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-5 flex items-center space-x-4">
          <div className="h-12 w-12 bg-sky-50 dark:bg-sky-950/20 text-sky-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Calendar size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
              Next Checkup
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate block mt-0.5">
              {user?.nextAppointment.doctor}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate block">
              {user?.nextAppointment.specialty}
            </span>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
              {user?.nextAppointment.date.split(",")[0]}
            </span>
            <span className="text-[10px] text-slate-450 block">
              {user?.nextAppointment.time}
            </span>
          </div>
        </div>

        {/* E. Quick Actions Wrapper */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-4 flex flex-wrap gap-2.5 items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1.5 hidden lg:inline">
            Quick Tools
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto flex-1">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<UploadCloud size={14} />}
              onClick={() => router.push("/upload")}
              className="text-xs py-2 rounded-xl"
            >
              Upload Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles size={14} />}
              onClick={() => router.push("/chat")}
              className="text-xs py-2 rounded-xl"
            >
              Ask AI
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileText size={14} />}
              onClick={() => router.push("/doctor-summary")}
              className="text-xs py-2 rounded-xl"
            >
              Doc Summary
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<UserPlus size={14} />}
              onClick={() => router.push("/family")}
              className="text-xs py-2 rounded-xl"
            >
              Add Family
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Grid Content: Uploads on Left, Insights & Timeline on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* B. Recent Uploads */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText size={18} className="text-brand-500" /> Recent Uploaded Records
            </h3>
            <Link
              href="/upload"
              className="text-xs font-semibold text-brand hover:underline flex items-center gap-0.5"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3">
            {activeReports.map((report) => (
              <Card key={report.id} className="hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="h-10 w-10 bg-slate-50 dark:bg-slate-800 text-slate-650 dark:text-slate-300 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileText size={20} />
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-50 text-sm truncate max-w-[200px] sm:max-w-xs block">
                          {report.name}
                        </span>
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant={report.status === "Completed" ? "success" : "warning"}>
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        Uploaded on {report.date}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80 leading-relaxed italic">
                        {report.extractedInsights}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Right Side Column: D. Alerts & Insights & C. Health Timeline */}
        <div className="space-y-6">
          {/* D. Alerts & Insights */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 px-1">
              <AlertCircle size={18} className="text-brand-500" /> Alerts & AI Insights
            </h3>

            <div className="space-y-3">
              {/* Insight Card 1 */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 flex items-start space-x-3">
                <div className="h-8 w-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-400 block leading-tight">
                    Fasting Sugar Increasing
                  </span>
                  <p className="text-[11px] text-amber-700 dark:text-amber-500 font-medium leading-normal">
                    Fasting glucose increased from 94 in 2022 to 108 in 2024. Prediabetes screening recommended.
                  </p>
                </div>
              </div>

              {/* Insight Card 2 */}
              <div className="p-4 rounded-2xl bg-red-50/40 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 flex items-start space-x-3">
                <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 text-red-650 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-red-800 dark:text-red-400 block leading-tight">
                    Cholesterol Trend Elevated
                  </span>
                  <p className="text-[11px] text-red-700 dark:text-red-500 font-medium leading-normal">
                    Total Cholesterol remains above 240 mg/dL. Re-evaluation of dietary lipids is recommended.
                  </p>
                </div>
              </div>

              {/* Insight Card 3 */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 flex items-start space-x-3">
                <div className="h-8 w-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={16} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 block leading-tight">
                    Follow-up Recommended
                  </span>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-500 font-medium leading-normal">
                    Schedule checkup with Endocrinologist Dr. Sarah Jenkins within the next month to review stats.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* C. Health Timeline Mini Widget */}
          <motion.div variants={item} className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity size={18} className="text-brand-500" /> Timeline Overview
              </h3>
              <Link
                href="/timeline"
                className="text-xs font-semibold text-brand hover:underline flex items-center gap-0.5"
              >
                View full <ArrowRight size={12} />
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-2xl p-5 space-y-4">
              <div className="relative pl-6 border-l border-slate-100 dark:border-slate-800 space-y-6">
                {/* Checkpoint 1 */}
                <div className="relative">
                  <span className="absolute -left-[30px] top-0 h-4 w-4 rounded-full bg-brand border-4 border-white dark:border-slate-900" />
                  <div className="text-[11px] font-bold text-brand block">January 2025</div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">BP Medication prescribed</div>
                </div>

                {/* Checkpoint 2 */}
                <div className="relative">
                  <span className="absolute -left-[30px] top-0 h-4 w-4 rounded-full bg-amber-500 border-4 border-white dark:border-slate-900" />
                  <div className="text-[11px] font-bold text-amber-500 block">July 2024</div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Diabetes screening (Prediabetic HbA1c)</div>
                </div>

                {/* Checkpoint 3 */}
                <div className="relative">
                  <span className="absolute -left-[30px] top-0 h-4 w-4 rounded-full bg-slate-350 dark:bg-slate-700 border-4 border-white dark:border-slate-900" />
                  <div className="text-[11px] font-bold text-slate-400 block">March 2023</div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Lipid Profile checkup</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
