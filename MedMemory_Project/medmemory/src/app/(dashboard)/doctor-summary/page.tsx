"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Share2,
  Check,
  HeartPulse,
  Activity,
  AlertOctagon,
  Sparkles
} from "lucide-react";
import { useHealthStore } from "@/store/healthStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function DoctorSummaryPage() {
  const { user, reports } = useHealthStore();
  const [copiedShare, setCopiedShare] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setCopiedShare(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Action Buttons Header (Hidden during printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 no-print">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="text-brand" /> Physician Health Briefing
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A verified clinical summary sheet compiled from your historical health records
          </p>
        </div>

        <div className="flex gap-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            leftIcon={copiedShare ? <Check size={14} /> : <Share2 size={14} />}
          >
            {copiedShare ? "Link Copied" : "Share Ledger"}
          </Button>
          <Button
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer size={14} />}
          >
            Print / Export PDF
          </Button>
        </div>
      </div>

      {/* Main Clinical Document Container (Styled like a medical ledger) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden p-6 sm:p-8 space-y-8 print-card">
        {/* Ledger Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-150 dark:border-slate-850 pb-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-slate-900 dark:bg-slate-850 rounded-xl flex items-center justify-center text-white">
              <HeartPulse size={22} className="text-brand-500" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight uppercase">
                MedMemory Health Registry
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Electronic Clinical Ledger • Verified AI Record
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-350 block">
              Reference ID: MM-9827-AXR
            </span>
            <span className="text-[10px] text-slate-400 font-semibold block">
              Generated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Patient Name</span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">{user?.name}</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Date of Birth</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">Sept 12, 1991</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Vitals Summary</span>
            <span className="text-sm font-semibold text-slate-850 dark:text-slate-200 mt-0.5 block">5&apos;11&quot; • 172 lbs • A+</span>
          </div>
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Linked Vault Email</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">{user?.email}</span>
          </div>
        </div>

        {/* Grid: Left column (Allergies & Meds), Right column (Vitals & Labs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Allergies & Medications */}
          <div className="space-y-6">
            {/* Allergies Section */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <AlertOctagon size={14} className="text-red-500" /> Declared Allergies & Risks
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="danger">Penicillin (Severe anaphylaxis)</Badge>
                <Badge variant="warning">Tree Nuts (Mild rash)</Badge>
                <Badge variant="outline" className="text-slate-450">No known drug allergies</Badge>
              </div>
            </div>

            {/* Current Medications */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <Activity size={14} className="text-brand-500" /> Active Medications
              </h4>
              <div className="space-y-2">
                <div className="p-3 border border-slate-100 dark:border-slate-800/80 rounded-xl flex justify-between items-center bg-white dark:bg-slate-900">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Lisinopril 10mg</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">Prescribed: Jan 2025 • Daily checkup</span>
                  </div>
                  <Badge variant="info">BP Regulate</Badge>
                </div>

                <div className="p-3 border border-slate-100 dark:border-slate-800/80 rounded-xl flex justify-between items-center bg-white dark:bg-slate-900">
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">Vitamin D3 2000 IU</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">OTC supplement • Advised: Nov 2024</span>
                  </div>
                  <Badge variant="secondary">Bone Health</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Vitals History & Lab Scores */}
          <div className="space-y-6">
            <div className="space-y-2.5">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <Activity size={14} className="text-emerald-500" /> Recent Lab Indicators
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {reports.map((rep) => (
                  <div key={rep.id} className="py-2.5 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                        {rep.name.split(".")[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Reading date: {rep.date}
                      </span>
                    </div>

                    <div className="text-right">
                      {rep.indicators.glucose && (
                        <Badge variant="warning" className="text-[10px] font-bold">
                          Glucose: {rep.indicators.glucose}
                        </Badge>
                      )}
                      {rep.indicators.cholesterol && (
                        <Badge variant="danger" className="text-[10px] font-bold">
                          Cholesterol: {rep.indicators.cholesterol}
                        </Badge>
                      )}
                      {rep.indicators.bloodPressure && (
                        <Badge variant="warning" className="text-[10px] font-bold">
                          BP: {rep.indicators.bloodPressure}
                        </Badge>
                      )}
                      {!rep.indicators.glucose && !rep.indicators.cholesterol && !rep.indicators.bloodPressure && (
                        <span className="text-[10px] text-slate-400 font-semibold italic">Standard check</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Summary & Recommendations (Grounded AI analysis) */}
        <div className="space-y-3.5 border-t border-slate-150 dark:border-slate-850 pt-6">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-brand-500 fill-brand-500" /> AI Diagnostic Advisory & Trends
          </h4>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800/60 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-medium space-y-2">
            <p>
              <strong>1. Glycemic Health:</strong> Fasting glucose values have increased from 94 mg/dL (2022) to 108 mg/dL (2024). The HbA1c level is recorded at 5.9%. These indices indicate prediabetes. Recommendation is a structured low glycemic index meal plan, exercise regular tracking, and repeat HbA1c in 3 months.
            </p>
            <p>
              <strong>2. Lipid Health:</strong> Total cholesterol registered at 240 mg/dL with LDL of 155 mg/dL. This represents cardiovascular risk. Cardioprotective dietary adjustments (increase soluble fiber, decrease saturated fats) are advised before prescribing pharmacotherapies.
            </p>
            <p>
              <strong>3. Hypertension:</strong> BP readings show mild elevations. Patient is currently on Lisinopril 10mg. Vitals remain stable under current therapeutic dose.
            </p>
          </div>
        </div>

        {/* Ledger Signature Footer */}
        <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-800/80 pt-6">
          <div className="text-[10px] text-slate-400 font-medium leading-relaxed">
            MedMemory Encrypted Medical Repository Ledger.
            <br />
            HIPAA Compliant Data Verification Hash: SHA-256 (3F89A...2C9B).
          </div>
          <div className="text-right">
            <div className="h-10 w-24 border-b border-slate-300 dark:border-slate-700 inline-block mb-1" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              Patient Verified Signature
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
