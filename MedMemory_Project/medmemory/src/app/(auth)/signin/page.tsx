"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useHealthStore } from "@/store/healthStore";
import { supabase } from "@/lib/supabase";

type LoginFormValues = {
  email: string;
  password?: string;
  rememberMe?: boolean;
};

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 0, 0)">
      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.28c1.92,-1.78 3.03,-4.4 3.03,-7.4C21.65,11.9 21.54,11.5 21.35,11.1z" fill="#4285F4" />
      <path d="M12,20.6c2.59,0 4.77,-0.86 6.36,-2.3l-3.28,-2.6c-0.9,0.6 -2.07,0.98 -3.08,0.98 -2.37,0 -4.38,-1.6 -5.1,-3.7H3.45v2.7C5.07,18.9 8.3,20.6 12,20.6z" fill="#34A853" />
      <path d="M6.9,12.98c-0.18,-0.5 -0.28,-1.1 -0.28,-1.7s0.1,-1.2 0.28,-1.7V6.8H3.45C2.8,8.1 2.4,9.6 2.4,11.28c0,1.68 0.4,3.18 1.05,4.4L6.9,12.98z" fill="#FBBC05" />
      <path d="M12,5.7c1.4,0 2.68,0.48 3.68,1.4l2.7,-2.7C16.78,2.9 14.59,2 12,2 8.3,2 5.07,3.7 3.45,6.8L6.9,9.5C7.62,7.4 9.63,5.7 12,5.7z" fill="#EA4335" />
    </g>
  </svg>
);


export default function SignInPage() {
  const router = useRouter();
  const login = useHealthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      rememberMe: true,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      login(data.email);
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">Welcome back</h1>
        <p className="text-sm text-slate-500 font-medium">Please enter your details to sign in.</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email", { required: "Email is required" })}
            className={`w-full px-4 py-3 bg-white border ${errors.email ? "border-red-400 focus:ring-red-500/40" : "border-slate-200 focus:ring-indigo-500/40"} rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-400 transition-all`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password", { required: "Password is required" })}
            className={`w-full px-4 py-3 bg-white border ${errors.password ? "border-red-400 focus:ring-red-500/40" : "border-slate-200 focus:ring-indigo-500/40"} rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-indigo-400 transition-all`}
          />
          {errors.password && <p className="text-xs text-red-500 mt-1 font-medium">{errors.password.message}</p>}
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between pt-1 pb-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" {...register("rememberMe")} />
            <span className="text-sm text-slate-600 font-medium">Remember for 30 days</span>
          </label>
          <Link href="/forgot" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot password</Link>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm tracking-wide flex justify-center items-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Or</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Social Login */}
      <div className="flex flex-col gap-3">
        <button 
          type="button"
          className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          onClick={async () => {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/auth/callback`,
              },
            });
            setIsLoading(false);
            if (error) {
              console.error(error);
            }
          }}
        >
          <GoogleIcon />
          <span className="text-sm font-bold text-slate-700">Sign in with Google</span>
        </button>

      </div>

      {/* Sign up link */}
      <p className="text-center text-sm text-slate-500 mt-8 font-medium">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Sign up</Link>
      </p>
    </motion.div>
  );
}
