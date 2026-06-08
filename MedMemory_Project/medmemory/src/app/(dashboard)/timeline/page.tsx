"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Pill,
  ShieldAlert,
  Sparkles,
  ClipboardList,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  category: "Prescription" | "Screening" | "Profile" | "Allergies";
  insights: string;
  doctor: string;
  metrics?: { label: string; value: string; status: "normal" | "warning" | "elevated" }[];
}

const timelineData: TimelineEvent[] = [
  {
    id: "e1",
    date: "January 10, 2025",
    title: "BP Medication Initialized",
    subtitle: "Lisinopril 10mg prescribed for daily usage",
    category: "Prescription",
    insights: "Blood pressure was recorded elevated at 135/85 mmHg. Daily Lisinopril 10mg started. Follow up checkup scheduled in 3 months.",
    doctor: "Dr. Sarah Jenkins",
    metrics: [
      { label: "Systolic", value: "135 mmHg", status: "warning" },
      { label: "Diastolic", value: "85 mmHg", status: "warning" }
    ]
  },
  {
    id: "e2",
    date: "November 02, 2024",
    title: "Comprehensive Lab Panel",
    subtitle: "General health index checkup",
    category: "Profile",
    insights: "Vitamin D level is slightly low at 24 ng/mL. Supplementation of Vitamin D3 2000 IU advised. Hemoglobin and thyroid indices normal.",
    doctor: "Dr. Robert Chen",
    metrics: [
      { label: "Vitamin D", value: "24 ng/mL", status: "warning" },
      { label: "Hemoglobin", value: "14.2 g/dL", status: "normal" }
    ]
  },
  {
    id: "e3",
    date: "July 24, 2024",
    title: "Diabetes Screening (HbA1c)",
    subtitle: "Glucose level monitoring",
    category: "Screening",
    insights: "Fasting glucose recorded at 108 mg/dL (Elevated). HbA1c is 5.9% (Prediabetic range). Action Plan: Reduced carbohydrate diet and daily exercise of 30 minutes. Recommended lifestyle changes.",
    doctor: "Dr. Sarah Jenkins",
    metrics: [
      { label: "HbA1c", value: "5.9%", status: "elevated" },
      { label: "Glucose", value: "108 mg/dL", status: "elevated" }
    ]
  },
  {
    id: "e4",
    date: "March 15, 2023",
    title: "Lipid Profile Screening",
    subtitle: "Cholesterol level tracking",
    category: "Profile",
    insights: "Total Cholesterol: 240 mg/dL (Elevated). LDL Cholesterol: 155 mg/dL. Cardiovascular health review suggests implementing statins if diet changes do not show progress in 6 months.",
    doctor: "Dr. Robert Chen",
    metrics: [
      { label: "Total Cholesterol", value: "240 mg/dL", status: "elevated" },
      { label: "LDL", value: "155 mg/dL", status: "elevated" },
      { label: "HDL", value: "45 mg/dL", status: "normal" }
    ]
  },
  {
    id: "e5",
    date: "August 12, 2022",
    title: "Annual Physical Examination",
    subtitle: "Baseline values established",
    category: "Screening",
    insights: "All physiological systems normal. Glucose reading at 94 mg/dL (Normal). Standard parameters mapped. Re-check scheduled in 1 year.",
    doctor: "Dr. Robert Chen",
    metrics: [
      { label: "Glucose", value: "94 mg/dL", status: "normal" },
      { label: "Weight", value: "172 lbs", status: "normal" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
};

export default function TimelinePage() {
  const [expandedCard, setExpandedCard] = useState<string | null>("e1");

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getEventIcon = (category: string) => {
    switch (category) {
      case "Prescription":
        return <Pill size={16} className="text-sky-500" />;
      case "Screening":
        return <ClipboardList size={16} className="text-amber-500" />;
      case "Profile":
        return <Activity size={16} className="text-brand-500" />;
      default:
        return <ShieldAlert size={16} className="text-emerald-500" />;
    }
  };

  const getEventBadge = (category: string) => {
    switch (category) {
      case "Prescription":
        return <Badge variant="info">Prescription</Badge>;
      case "Screening":
        return <Badge variant="warning">Screening</Badge>;
      case "Profile":
        return <Badge variant="primary">Health Profile</Badge>;
      default:
        return <Badge variant="success">Allergy Info</Badge>;
    }
  };

  const getStatusColor = (status: "normal" | "warning" | "elevated") => {
    switch (status) {
      case "normal":
        return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-450";
      case "warning":
        return "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-450";
      case "elevated":
        return "text-red-500 bg-red-50 dark:bg-red-950/20 dark:text-red-400";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar size={22} className="text-brand" /> Health Timeline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          A chronologically mapped record of screenings, prescriptions, and key updates
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative pl-8 sm:pl-12 border-l border-slate-200 dark:border-slate-800 space-y-8 py-4 ml-4"
      >
        {timelineData.map((event) => {
          const isExpanded = expandedCard === event.id;

          return (
            <motion.div key={event.id} variants={cardVariants} className="relative">
              {/* Timeline Connector Pin */}
              <div className="absolute -left-[46px] sm:-left-[62px] top-1.5 h-9 w-9 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl flex items-center justify-center shadow-sm z-10 transition-transform hover:scale-110">
                {getEventIcon(event.category)}
              </div>

              {/* Event card */}
              <Card
                className={`hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer ${
                  isExpanded ? "ring-2 ring-brand-500/10 border-brand-200 dark:border-brand-900/40" : ""
                }`}
                onClick={() => toggleExpand(event.id)}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                          {event.date}
                        </span>
                        {getEventBadge(event.category)}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-50 mt-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {event.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 mt-1 sm:mt-0">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                        {event.doctor}
                      </span>
                      <button className="p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-650 transition-colors">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800/80 space-y-4"
                    >
                      {/* Insights */}
                      <div className="space-y-1.5 bg-slate-50/50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-100/50 dark:border-slate-800/50">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                          <Sparkles size={12} /> AI Clinical Summary
                        </div>
                        <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-medium">
                          {event.insights}
                        </p>
                      </div>

                      {/* Metrics grid if present */}
                      {event.metrics && event.metrics.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {event.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-xl flex flex-col justify-between"
                            >
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                                {metric.label}
                              </span>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                                  {metric.value}
                                </span>
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide ${getStatusColor(
                                    metric.status
                                  )}`}
                                >
                                  {metric.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
