"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeartPulse, ArrowRight } from "lucide-react";

// 4-point Sparkle Star Component
const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" />
  </svg>
);

export default function LandingPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full overflow-hidden relative font-sans text-slate-900 bg-[#F8F9FE] flex flex-col"
    >
      {/* Background blobs for premium lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-gradient-to-br from-purple-200/30 to-blue-200/10 rounded-full blur-[120px]" />
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 to-purple-100/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-100/20 rounded-full blur-[90px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 h-20 flex items-center px-8 lg:px-16 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <HeartPulse size={22} className="animate-pulse" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight text-[#0F172A]">Med</span><span className="text-indigo-600 text-3xl font-extrabold tracking-tight">Memory</span>
        </div>
      </nav>

      {/* Hero Body - strictly single viewport */}
      <div className="flex-1 px-8 lg:px-16 flex items-center relative z-10 pb-8 overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-[1300px] mx-auto h-full">
          
          {/* ===== LEFT CONTENT ===== */}
          <div className="space-y-6 max-w-xl">
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EEF2FF] rounded-full text-sm font-semibold text-indigo-700 border border-indigo-100/80 shadow-sm">
              <span className="text-indigo-500 text-xs">✨</span> AI-Powered Personal Health Record
            </div>

            {/* Main Headlines */}
            <div className="space-y-2.5">
              <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08]">
                Your health.
              </h1>
              <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08]">
                Understood.
              </h1>
              <div className="relative inline-block">
                <h1 className="text-5xl xl:text-6xl font-handwritten text-[#312E81] leading-[1.1] relative z-10 pr-2">
                  Always with you.
                </h1>
                {/* Underline swoosh stroke */}
                <span className="absolute -bottom-2 left-1 w-full h-3 text-indigo-400/80 pointer-events-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                    <path
                      d="M5 13C60 13 120 4 295 10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#6B7280] text-base lg:text-lg max-w-[460px] leading-relaxed">
              Upload anything. Our AI reads, organizes and remembers, so you can take better care of your health.
            </p>

            {/* Get Started Button */}
            <div className="pt-4">
              <Link href="/signin">
                <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-lg">
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3.5 pt-4">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80"
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                    <img src={src} alt="User profile" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-[#EEF2FF] text-[#4F46E5] font-extrabold text-xs px-2.5 py-1 rounded-full shadow-sm">10K+</span>
                <p className="text-xs text-[#6B7280] font-medium leading-snug">
                  Trusted by 10,000+ users<br />across India 🇮🇳
                </p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT 3D CANVAS ===== */}
          <div className="flex items-center justify-center relative h-full mt-10 lg:mt-0">
            <div className="relative w-[560px] h-[610px] flex items-center justify-center flex-shrink-0">
              
              {/* Dotted Connections Layer */}
              <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 560 610" fill="none">
                {/* Top Left Card (Voice Note) to phone */}
                <path d="M 120 160 Q 200 170 230 150" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 6" />
                {/* Middle Left Card (AI Summary) to phone */}
                <path d="M 110 290 Q 180 280 230 270" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 6" />
                {/* Bottom Left Card (Scan Reports) to phone */}
                <path d="M 110 430 Q 180 370 220 330" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 6" />
                {/* Top Right Card (Blood Sugar) to phone */}
                <path d="M 440 130 Q 380 140 330 160" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 6" />
                {/* Bottom Right Card (Prescription) to phone */}
                <path d="M 440 380 Q 380 330 330 290" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="4 6" />
              </svg>

              {/* Glowing Background Sparkle Stars */}
              <SparkleIcon className="absolute top-[8%] left-[22%] w-4 h-4 text-indigo-400 opacity-60 animate-pulse" />
              <SparkleIcon className="absolute top-[32%] left-[5%] w-3.5 h-3.5 text-indigo-300 opacity-50" />
              <SparkleIcon className="absolute top-[48%] right-[12%] w-4 h-4 text-purple-400 opacity-70 animate-pulse" />
              <SparkleIcon className="absolute bottom-[28%] left-[25%] w-3 h-3 text-blue-300 opacity-65" />
              <SparkleIcon className="absolute top-[20%] right-[22%] w-4 h-4 text-indigo-400/90 animate-pulse" />
              
              {/* ===== DOUBLE LAYERED 3D STAND/PODIUM ===== */}
              <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[460px] z-10 pointer-events-none">
                {/* Top standalone oval layer with glossy shine */}
                <div className="w-full h-[95px] rounded-[50%] bg-gradient-to-b from-white/95 to-[#E4E9F6] border-t border-white shadow-[0_6px_16px_rgba(100,120,200,0.06)] relative z-20" />
                {/* Bottom thicker cylindrical layer */}
                <div className="w-full h-[110px] rounded-[50%] bg-gradient-to-b from-[#e4e9f6] to-[#cbd2e6] border-t border-white/50 shadow-[0_25px_60px_rgba(50,70,120,0.18)] -mt-16 relative z-10" />
              </div>

              {/* ===== 3D PHONE MOCKUP ===== */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative z-30 w-[255px] h-[520px] flex-shrink-0"
                style={{ perspective: "1000px" }}
              >
                {/* 3D rotated viewport wrapper */}
                <div
                  className="w-full h-full bg-[#1E1E24] rounded-[40px] border-[5px] border-[#2C2E3E] overflow-hidden relative"
                  style={{
                    transform: "rotateY(-8deg) rotateX(4deg) rotateZ(-1.5deg)",
                    transformStyle: "preserve-3d",
                    boxShadow: `
                      -1px 1px 0px #cfd2db,
                      -2px 2px 0px #c0c3cd,
                      -3px 3px 0px #b1b4be,
                      -4px 4px 0px #a2a5af,
                      -5px 5px 0px #9396a0,
                      -12px 22px 40px rgba(50, 70, 130, 0.18)
                    `
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
                    <span className="w-1.5 h-1.5 bg-indigo-900 rounded-full opacity-60" />
                    <span className="w-2 h-2 bg-slate-900 rounded-full border border-indigo-900/30" />
                  </div>

                  {/* Inside Screen Content */}
                  <div className="pt-8 pb-3 px-3.5 h-full flex flex-col bg-[#F8F9FE] text-slate-800 select-none">
                    
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-[8px] font-black text-slate-800/90 px-1 mb-3">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L18.61 4.97C17.07 3.74 15.12 3 12 3zm6.03 3.39L4.97 19.41C6.51 20.64 8.46 21.38 10.59 21.38c4.97 0 9-4.03 9-9 0-2.12-.74-4.07-1.97-5.61z" />
                        </svg>
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                        </svg>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Good Morning</p>
                        <p className="text-[15px] font-black text-[#0F172A] tracking-tight">Ananya 👋</p>
                      </div>
                      <div className="w-6.5 h-6.5 rounded-full bg-white shadow-sm border border-slate-100/80 flex items-center justify-center relative p-1.5">
                        <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-600">
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </div>
                    </div>

                    {/* Health Score Card */}
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100/60 flex items-center gap-3 mb-3">
                      {/* Circular Progress Ring */}
                      <div className="w-11 h-11 rounded-full border-[3px] border-indigo-50/50 flex items-center justify-center relative flex-shrink-0">
                        <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-indigo-600"
                            strokeDasharray="82, 100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-[11px] font-black text-slate-800">82</span>
                      </div>
                      {/* Score description */}
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase">Health Score</p>
                        <p className="text-[12px] font-extrabold text-[#0F172A] leading-tight">Good</p>
                        <p className="text-[8px] text-emerald-500 font-extrabold flex items-center gap-0.5 mt-0.5">
                          <span>↑</span> 6% this month
                        </p>
                      </div>
                      {/* Sparkline Graph */}
                      <svg className="w-10 h-6 text-indigo-500 self-end ml-auto" viewBox="0 0 50 20" preserveAspectRatio="none">
                        <path
                          d="M0 15 Q12 12 25 14 T50 3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 15 Q12 12 25 14 T50 3 L50 20 L0 20 Z"
                          fill="url(#scoreGlow)"
                          opacity="0.1"
                        />
                        <defs>
                          <linearGradient id="scoreGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Recent Records Header */}
                    <div className="flex justify-between items-center mb-2 px-0.5">
                      <p className="text-[10px] font-extrabold text-slate-800">Recent Records</p>
                      <span className="text-[8px] text-indigo-600 font-extrabold cursor-pointer hover:underline">View all</span>
                    </div>

                    {/* Records List container */}
                    <div className="space-y-2 flex-1 overflow-hidden">
                      {[
                        { name: "Blood Test Report", date: "12 May, 2024", tag: "PDF", tagColor: "text-red-500 bg-red-50 border border-red-100/50", iconBg: "bg-red-50 text-red-500" },
                        { name: "Lipid Profile", date: "02 May, 2024", tag: "Normal", tagColor: "text-emerald-500 bg-emerald-50 border border-emerald-100/50", iconBg: "bg-emerald-50 text-emerald-500" },
                        { name: "Chest X-Ray", date: "28 Apr, 2024", tag: "Image", tagColor: "text-blue-500 bg-blue-50 border border-blue-100/50", iconBg: "bg-slate-900 text-slate-100" },
                        { name: "Prescription", date: "20 Apr, 2024", tag: "PDF", tagColor: "text-red-500 bg-red-50 border border-red-100/50", iconBg: "bg-indigo-50 text-indigo-500" }
                      ].map((r, i) => (
                        <div key={r.name} className="bg-white p-2 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] border border-slate-100/70 flex items-center gap-2">
                          {/* Left icon box */}
                          <div className={`w-7 h-7 ${r.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            {i === 2 ? (
                              /* Rib cage X-ray icon placeholder */
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2c-.6 0-1 .4-1 1v2c-2.4.3-4.5 1.5-5.8 3.3l1.6 1.2c1-1.3 2.5-2.2 4.2-2.4v2.9c-2 .3-3.7 1.4-4.7 3l1.6 1.1c.7-1.1 2-1.9 3.1-2.1v2.9c-1.3.2-2.5 1-3.2 2l1.6 1.1c.4-.6 1-.9 1.6-1v2.9c-2 .3-3.7 1.4-4.7 3l1.6 1.1c.7-1.1 2-1.9 3.1-2.1V22c0 .6.4 1 1 1s1-.4 1-1v-2.1c1.1.2 2.4 1 3.1 2.1l1.6-1.1c-1-1.6-2.7-2.7-4.7-3v-2.9c.6.1 1.2.4 1.6 1l1.6-1.1c-.7-1-1.9-1.8-3.2-2v-2.9c1.1.2 2.4 1 3.1 2.1l1.6-1.1c-1-1.6-2.7-2.7-4.7-3V7.1c1.7.2 3.2 1.1 4.2 2.4l1.6-1.2C17.5 6.5 15.4 5.3 13 5V3c0-.6-.4-1-1-1z"/>
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            )}
                          </div>
                          {/* File info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-[9.5px] font-black text-slate-800 truncate leading-tight">{r.name}</p>
                            <p className="text-[7.5px] text-slate-400 font-bold mt-0.5">{r.date}</p>
                          </div>
                          {/* Right tag & arrow */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <span className={`text-[7px] font-extrabold px-1.5 py-0.5 rounded ${r.tagColor}`}>{r.tag}</span>
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-300">
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Nav Bar */}
                    <div className="mt-2 -mx-3.5 -mb-3 bg-white border-t border-slate-100/60 pt-2 pb-3.5 px-4 flex justify-between items-center rounded-b-[36px]">
                      <div className="flex flex-col items-center text-indigo-600 cursor-pointer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                        <span className="text-[5.5px] font-bold mt-0.5">Home</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-400 cursor-pointer hover:text-slate-600">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                        <span className="text-[5.5px] font-bold mt-0.5">Timeline</span>
                      </div>
                      {/* Floating Plus button */}
                      <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-md shadow-indigo-500/30 -mt-5 border-2 border-white cursor-pointer active:scale-95 transition-transform">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                      <div className="flex flex-col items-center text-slate-400 cursor-pointer hover:text-slate-600">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span className="text-[5.5px] font-bold mt-0.5">AI Chat</span>
                      </div>
                      <div className="flex flex-col items-center text-slate-450 cursor-pointer hover:text-slate-605">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span className="text-[5.5px] font-bold mt-0.5">Profile</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>

              {/* ===== FLOATING CARD 1: VOICE NOTE ===== */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-[90px] left-[-25px] z-40 bg-white/90 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-white flex items-center gap-2.5 w-[155px]"
              >
                {/* Voice icon */}
                <div className="w-8.5 h-8.5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10.5px] font-black text-slate-800 leading-tight">Voice Note</p>
                  <div className="flex items-center gap-1 mt-1">
                    {/* Audio wave bars */}
                    <div className="flex items-center gap-[2.5px] h-4 flex-1">
                      <span className="w-[2.5px] h-[5px] bg-purple-300 rounded-full" />
                      <span className="w-[2.5px] h-[10px] bg-purple-400 rounded-full" />
                      <span className="w-[2.5px] h-[14px] bg-purple-500 rounded-full" />
                      <span className="w-[2.5px] h-[7px] bg-purple-300 rounded-full" />
                      <span className="w-[2.5px] h-[12px] bg-purple-400 rounded-full animate-pulse" />
                      <span className="w-[2.5px] h-[18px] bg-purple-600 rounded-full" />
                      <span className="w-[2.5px] h-[9px] bg-purple-400 rounded-full" />
                      <span className="w-[2.5px] h-[13px] bg-purple-500 rounded-full" />
                      <span className="w-[2.5px] h-[5px] bg-purple-300 rounded-full" />
                    </div>
                    <span className="text-[7.5px] text-slate-400 font-extrabold flex-shrink-0">00:24</span>
                  </div>
                </div>
              </motion.div>

              {/* ===== SUMMARY CARD ===== */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[200px] left-[-45px] z-40 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-white flex flex-col gap-1.5 w-[185px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <SparkleIcon className="w-4 h-4" />
                  </div>
                  <p className="text-[12px] font-black text-slate-800">Summary</p>
                  <span className="text-[7px] font-extrabold text-[#4F46E5] bg-[#EEF2FF] px-1.5 py-0.5 rounded ml-auto">Active</span>
                </div>
                <p className="text-[9px] text-slate-500 font-semibold leading-relaxed">Your latest health metrics are stable. Keep up the good work!</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[110px] left-[-35px] z-20 bg-white/90 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-white flex flex-col gap-2 w-[150px]"
              >
                {/* Header */}
                <div className="flex items-center gap-2">
                  <div className="w-5.5 h-5.5 rounded bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M9 17h6M9 13h6M9 9h3" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-black text-slate-800 leading-tight">Scan Reports</p>
                </div>
                {/* Rib cage preview & skeleton text */}
                <div className="flex gap-2 w-full">
                  <div className="w-[45px] h-[48px] bg-slate-950 rounded-lg flex items-center justify-center overflow-hidden border border-slate-800/80 flex-shrink-0 shadow-inner">
                    {/* SVG Chest X-ray */}
                    <svg viewBox="0 0 100 100" className="w-7 h-7 text-blue-200/70">
                      <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="4.5" strokeDasharray="1 3.5" opacity="0.8" />
                      <path d="M50 30 C 25 30, 20 38, 15 42" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
                      <path d="M50 30 C 75 30, 80 38, 85 42" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
                      
                      <path d="M50 42 C 20 42, 15 52, 10 58" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
                      <path d="M50 42 C 80 42, 85 52, 90 58" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8" />
                      
                      <path d="M50 54 C 18 54, 12 66, 8 72" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
                      <path d="M50 54 C 82 54, 88 66, 92 72" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
                      
                      <path d="M50 66 C 22 66, 15 78, 10 85" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
                      <path d="M50 66 C 78 66, 85 78, 90 85" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.6" />
                    </svg>
                  </div>
                  {/* Lines */}
                  <div className="flex-1 flex flex-col justify-center gap-1.5">
                    <div className="h-1.5 w-14 bg-slate-100 rounded-full" />
                    <div className="h-1.5 w-10 bg-slate-100 rounded-full" />
                    <div className="h-1.5 w-12 bg-slate-100 rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* ===== FLOATING CARD 3: BLOOD SUGAR ===== */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-[80px] right-[-25px] z-40 bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-white w-[150px]"
              >
                {/* Title & sparkles */}
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-[10px] font-black text-slate-800">Blood Sugar</p>
                  <SparkleIcon className="text-indigo-500 w-3 h-3" />
                </div>
                {/* Value & Tag */}
                <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
                  108 <span className="text-[8px] text-slate-400 font-bold ml-0.5">mg/dL</span>
                </p>
                <span className="text-[7.5px] font-black text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100/50 mt-1 inline-block">
                  Slightly High
                </span>
                {/* Trendline Graph */}
                <svg className="w-full h-8 text-orange-400 mt-2" viewBox="0 0 120 30" preserveAspectRatio="none">
                  <path
                    d="M0 25 Q15 25 30 18 T60 22 T90 8 T120 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 25 Q15 25 30 18 T60 22 T90 8 T120 15 L120 30 L0 30 Z"
                    fill="url(#sugarGlow)"
                    opacity="0.1"
                  />
                  <defs>
                    <linearGradient id="sugarGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* ===== FLOATING CARD 4: PRESCRIPTION ===== */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.4 }}
                className="absolute bottom-[200px] right-[-35px] z-20 bg-white/90 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 border border-white flex flex-col gap-2 w-[155px]"
              >
                {/* Header with WhatsApp logo badge */}
                <div className="flex items-center gap-1.5">
                  <div className="w-5.5 h-5.5 rounded bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <p className="text-[10px] font-black text-slate-800 leading-tight">Prescription</p>
                  
                  {/* WhatsApp green badge */}
                  <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm ml-auto cursor-pointer">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.978L2 22l5.197-1.362a9.925 9.925 0 0 0 4.814 1.248h.005c5.507 0 9.99-4.478 9.99-9.985 0-2.667-1.037-5.176-2.923-7.062A9.925 9.925 0 0 0 12.012 2zm5.795 14.13c-.247.697-1.42 1.37-1.956 1.458-.49.08-1.127.14-3.238-.737-2.697-1.122-4.409-3.864-4.544-4.043-.135-.18-1.102-1.464-1.102-2.793 0-1.328.697-1.982.944-2.25.247-.267.54-.334.72-.334.18 0 .36.002.518.01.163.007.382-.062.596.448.22.525.748 1.83.813 1.964.066.134.11.29.02.468-.09.18-.135.29-.27.447-.135.156-.283.348-.403.468-.135.134-.277.28-.12.548.157.268.7 1.144 1.5 1.854.858.762 1.58.997 1.805 1.109.225.112.357.094.49-.062.135-.156.596-.697.756-.935.16-.24.318-.2.538-.117.22.083 1.393.657 1.632.775.24.118.4.177.458.277.058.1.058.578-.19 1.275z"/>
                    </svg>
                  </div>
                </div>
                {/* Tiny prescription sheet detail */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-1 bg-slate-300 rounded-full" />
                    <div className="w-4 h-1 bg-indigo-300 rounded-full" />
                  </div>
                  <div className="w-full h-[1px] bg-slate-200 my-0.5" />
                  <div className="w-16 h-1 bg-slate-200 rounded-full" />
                  <div className="w-12 h-1 bg-slate-200 rounded-full" />
                  <div className="w-14 h-1 bg-slate-200 rounded-full" />
                </div>
              </motion.div>

              {/* ===== GLASSMORPHIC SHIELD ===== */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.6 }}
                className="absolute bottom-[55px] right-[25px] z-50 w-[80px] h-[100px] flex items-center justify-center pointer-events-none"
              >
                <div
                  className="w-full h-full bg-gradient-to-br from-indigo-500/85 via-blue-500/80 to-purple-600/85 shadow-2xl flex items-center justify-center border-t border-l border-white/60 backdrop-blur-[6px]"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 20%, 100% 70%, 50% 100%, 0% 70%, 0% 20%)",
                    boxShadow: "0 15px 30px rgba(79, 70, 229, 0.25)"
                  }}
                >
                  {/* Glowing padlock icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" className="text-white drop-shadow-md">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </motion.div>

              {/* ===== POTTED SUCCULENT PLANT ===== */}
              <div className="absolute bottom-[90px] right-[-75px] z-40 w-16 h-20 pointer-events-none">
                {/* SVG succulent */}
                <svg viewBox="0 0 60 80" className="w-full h-full">
                  <ellipse cx="30" cy="78" rx="10" ry="2" fill="#A2A9B9" opacity="0.3" />
                  <path d="M17 52 L43 52 L39 78 L21 78 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                  <ellipse cx="30" cy="52" rx="13" ry="3" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" />
                  <ellipse cx="30" cy="52" rx="11" ry="2.2" fill="#7C2D12" />
                  
                  {/* Leaves with gradients */}
                  <path d="M25 52 Q12 30 19 20 Q25 30 28 52" fill="url(#leafBack)" />
                  <path d="M35 52 Q48 30 41 20 Q35 30 32 52" fill="url(#leafBack)" />
                  <path d="M30 52 Q30 10 30 5 Q35 15 30 52" fill="url(#leafCenter)" />
                  <path d="M22 52 Q5 40 12 32 Q20 40 26 52" fill="url(#leafFront)" />
                  <path d="M38 52 Q55 40 48 32 Q40 40 34 52" fill="url(#leafFront)" />
                  <path d="M30 52 Q22 25 30 15 Q38 25 30 52" fill="url(#leafCenter)" />
                  
                  <defs>
                    <linearGradient id="leafBack" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#166534" />
                      <stop offset="70%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#bbf7d0" />
                    </linearGradient>
                    <linearGradient id="leafCenter" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#14532d" />
                      <stop offset="75%" stopColor="#15803d" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                    <linearGradient id="leafFront" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#15803d" />
                      <stop offset="60%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#bbf7d0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </motion.main>
  );
}
