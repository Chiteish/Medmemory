"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Check,
  HeartPulse
} from "lucide-react";
import { useHealthStore } from "@/store/healthStore";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const languages = ["English", "Spanish", "French", "German", "Hindi", "Tamil"];

export default function SettingsPage() {
  const {
    user,
    theme,
    notifications,
    privacyControls,
    language,
    toggleTheme,
    setNotifications,
    setPrivacyControls,
    setLanguage,
    updateProfileName,
    updateProfileEmail
  } = useHealthStore();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileName(name);
    updateProfileEmail(email);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="text-brand" /> Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage your personal healthcare profile, privacy, alerts, and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation/Summary card */}
        <div className="space-y-4">
          <Card className="p-4 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3.5 mb-4">
              <div className="h-10 w-10 bg-brand-100 dark:bg-brand-950 text-brand rounded-xl flex items-center justify-center font-bold text-sm">
                {user?.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-none">
                  {user?.name}
                </h4>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1">
                  Active Member since 2026
                </span>
              </div>
            </div>
            <div className="space-y-1 border-t border-slate-50 dark:border-slate-800/80 pt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex justify-between py-1.5">
                <span>Security Shield</span>
                <span className="text-emerald-500">AES-256 Active</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Vault Size</span>
                <span className="text-slate-700 dark:text-slate-350">4 Reports (0.34 MB)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Panel Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <User size={16} className="text-brand-500" /> Personal Profile
              </CardTitle>
              <CardDescription>Update your personal information for summaries</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Patient Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  {showSavedToast ? (
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                      <Check size={14} /> Profile details saved!
                    </span>
                  ) : <span />}
                  <Button type="submit" size="sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Settings preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Palette size={16} className="text-brand-500" /> Platform Customizations
              </CardTitle>
              <CardDescription>Theme settings, dark modes, and localization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dark Mode toggle */}
              <div className="flex items-center justify-between py-1.5">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Dark Mode</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">Toggles light/dark aesthetic options</span>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    theme === "dark" ? "bg-brand-500" : "bg-slate-200 dark:bg-slate-850"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      theme === "dark" ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Language selection dropdown */}
              <div className="flex items-center justify-between py-1.5 border-t border-slate-50 dark:border-slate-800/80 pt-4">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">System Language</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">Configures transcripts & reports interface</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="h-9 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-850 dark:text-slate-250 focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell size={16} className="text-brand-500" /> Notifications & Alerts
              </CardTitle>
              <CardDescription>Configure alerts for health insights and appointment checkups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-1.5">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Push Notifications</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">Triggers notification flags for newly parsed files</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications ? "bg-brand-500" : "bg-slate-200 dark:bg-slate-850"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & HIPAA controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Lock size={16} className="text-brand-500" /> Privacy & Cryptography Controls
              </CardTitle>
              <CardDescription>Manage security guidelines for healthcare vault files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-1.5">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">HIPAA Shield Lock</span>
                  <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">Enforces multi-factor authorization and secure tokens on export</span>
                </div>
                <button
                  onClick={() => setPrivacyControls(!privacyControls)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    privacyControls ? "bg-brand-500" : "bg-slate-200 dark:bg-slate-850"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      privacyControls ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
