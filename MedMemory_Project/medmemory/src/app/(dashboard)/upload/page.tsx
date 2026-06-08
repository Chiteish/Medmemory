"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye
} from "lucide-react";
import confetti from "canvas-confetti";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useHealthStore } from "@/store/healthStore";

interface FileWithMeta {
  file: File;
  id: string;
  previewUrl?: string;
  status: "idle" | "uploading" | "completed" | "failed";
  progress: number;
}

export default function UploadPage() {
  const { simulateUpload, isUploading, uploadProgress, reports } = useHealthStore();
  const [selectedFiles, setSelectedFiles] = useState<FileWithMeta[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [activeExtractedReport, setActiveExtractedReport] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    const fileMetaList: FileWithMeta[] = files.map((f) => {
      const isImage = f.type.startsWith("image/");
      return {
        file: f,
        id: "f_" + Math.random().toString(36).substr(2, 9),
        previewUrl: isImage ? URL.createObjectURL(f) : undefined,
        status: "idle",
        progress: 0
      };
    });
    setSelectedFiles((prev) => [...prev, ...fileMetaList]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const startUpload = () => {
    if (selectedFiles.length === 0) return;

    // We will simulate uploading the first file in queue
    const target = selectedFiles[0];
    
    setSelectedFiles((prev) =>
      prev.map((f) => (f.id === target.id ? { ...f, status: "uploading", progress: 5 } : f))
    );

    simulateUpload(target.file, () => {
      // Completed callback
      setSelectedFiles((prev) =>
        prev.map((f) => (f.id === target.id ? { ...f, status: "completed", progress: 100 } : f))
      );

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Show latest report's parsed details
      setTimeout(() => {
        const latestReport = useHealthStore.getState().reports[0];
        setActiveExtractedReport(latestReport);
        setSelectedFiles([]); // clear queue
      }, 1000);
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <UploadCloud className="text-brand" /> Upload Medical Records
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload laboratory tests, prescriptions, and health scans. Our medical-grade AI parses key vitals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dropzone & Queue Section */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              isDragActive
                ? "border-brand-500 bg-brand-50/20 dark:bg-brand-950/10"
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={fileSelected}
              multiple
              accept=".pdf,image/*"
              className="hidden"
            />
            <div className="p-4 bg-brand-50/50 dark:bg-brand-950/20 text-brand rounded-2xl mb-4">
              <UploadCloud size={28} className={isUploading ? "animate-bounce" : ""} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Drag & drop files here, or click to browse
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              Supports PDFs and images up to 20MB. Fully encrypted.
            </p>
          </div>

          {/* Queue List */}
          {selectedFiles.length > 0 && (
            <Card>
              <CardContent className="p-4 space-y-3.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Files to Upload ({selectedFiles.length})
                </h4>

                <div className="divide-y divide-slate-50 dark:divide-slate-800/60 max-h-60 overflow-y-auto">
                  {selectedFiles.map((fileMeta) => (
                    <div key={fileMeta.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 min-w-0">
                        {fileMeta.previewUrl ? (
                          <div className="h-10 w-10 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={fileMeta.previewUrl}
                              alt="preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 bg-slate-50 dark:bg-slate-800/80 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400">
                            <FileText size={18} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-xs block">
                            {fileMeta.file.name}
                          </p>
                          <p className="text-[10px] text-slate-450 font-semibold">
                            {(fileMeta.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {fileMeta.status === "uploading" && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-slate-400">
                              {uploadProgress}%
                            </span>
                            <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-brand h-full rounded-full transition-all"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {fileMeta.status === "completed" && (
                          <CheckCircle2 size={16} className="text-emerald-500" />
                        )}
                        {fileMeta.status === "idle" && (
                          <button
                            onClick={() => removeFile(fileMeta.id)}
                            className="p-1 rounded-lg text-slate-450 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    size="sm"
                    onClick={startUpload}
                    isLoading={isUploading}
                    leftIcon={<UploadCloud size={14} />}
                  >
                    Start Parsing
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Extracted Results Preview */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 px-1">
            <Sparkles size={18} className="text-brand-500" /> Parsed Vitals & Insights
          </h3>

          <AnimatePresence mode="wait">
            {activeExtractedReport ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-emerald-100 dark:border-emerald-950 ring-2 ring-emerald-500/5 bg-white dark:bg-slate-900">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-9 w-9 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-xl flex items-center justify-center">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-450 uppercase block">
                          AI Parsing Success
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[200px]">
                          {activeExtractedReport.name}
                        </h4>
                      </div>
                    </div>

                    {/* Vitals parsed values */}
                    <div className="space-y-2 border-t border-b border-slate-50 dark:border-slate-800/80 py-3.5">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Key Health Markers
                      </h5>

                      <div className="grid grid-cols-2 gap-2">
                        {activeExtractedReport.indicators.glucose && (
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">GLUCOSE</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                              {activeExtractedReport.indicators.glucose}
                            </span>
                          </div>
                        )}
                        {activeExtractedReport.indicators.cholesterol && (
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">CHOLESTEROL</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                              {activeExtractedReport.indicators.cholesterol}
                            </span>
                          </div>
                        )}
                        {activeExtractedReport.indicators.bloodPressure && (
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">BLOOD PRESSURE</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                              {activeExtractedReport.indicators.bloodPressure}
                            </span>
                          </div>
                        )}
                        {activeExtractedReport.indicators.hba1c && (
                          <div className="p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">HbA1C LEVEL</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                              {activeExtractedReport.indicators.hba1c}
                            </span>
                          </div>
                        )}
                      </div>

                      {activeExtractedReport.indicators.medicines && activeExtractedReport.indicators.medicines.length > 0 && (
                        <div className="mt-2.5 p-2.5 bg-slate-50 dark:bg-slate-850 rounded-xl">
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">MEDICATIONS FOUND</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {activeExtractedReport.indicators.medicines.map((med: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-[10px]">
                                {med}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Insights block */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        AI Clinical Analysis
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic bg-emerald-50/20 dark:bg-emerald-950/5 p-2 rounded-xl border border-emerald-100/10">
                        {activeExtractedReport.extractedInsights}
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Eye size={12} />}
                        onClick={() => setActiveExtractedReport(null)}
                        className="text-[10px]"
                      >
                        Clear View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center bg-slate-50/50 dark:bg-slate-900/20">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800/80 mb-3 text-slate-400">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  No data loaded
                </h4>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-[200px] mt-1 leading-normal">
                  Upload a document to extract vitals, medications, and health recommendations instantly.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
