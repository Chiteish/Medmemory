"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useHealthStore } from "@/store/healthStore";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Supabase session error:", error);
        router.replace("/signin");
        return;
      }
      if (data.session) {
        const user = data.session.user;
        // Set authenticated state in the store
        useHealthStore.setState({
          isAuthenticated: true,
          isVerifyingOtp: false,
          user: {
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
            email: user.email ?? "",
            healthScore: 80,
            nextAppointment: {
              doctor: "Dr. Sarah Jenkins",
              specialty: "Endocrinologist",
              date: "June 14, 2026",
              time: "10:30 AM",
            },
          },
        });
        router.replace("/dashboard");
      } else {
        router.replace("/signin");
      }
    };
    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="text-center space-y-3">
        <div className="h-8 w-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-slate-500 font-medium">Signing you in...</p>
      </div>
    </div>
  );
}
