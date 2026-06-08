"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useHealthStore } from "@/store/healthStore";

type SignupFormValues = {
  name: string;
  email: string;
  password?: string;
  agreeToTerms: boolean;
};

const GoogleIcon = () => (
  <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 0, 0)">
      <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.28c1.92,-1.78 3.03,-4.4 3.03,-7.4C21.65,11.9 21.54,11.5 21.35,11.1z" fill="#4285F4" />
      <path d="M12,20.6c2.59,0 4.77,-0.86 6.36,-2.3l-3.28,-2.6c-0.9,0.6 -2.07,0.98 -3.08,0.98 -2.37,0 -4.38,-1.6 -5.1,-3.7H3.45v2.7C5.07,18.9 8.3,20.6 12,20.6z" fill="#34A853" />
      <path d="M6.9,12.98c-0.18,-0.5 -0.28,-1.1 -0.28,-1.7s0.1,-1.2 0.28,-1.7V6.8H3.45C2.8,8.1 2.4,9.6 2.4,11.28c0,1.68 0.4,3.18 1.05,4.4L6.9,12.98z" fill="#FBBC05" />
      <path d="M12,5.7c1.4,0 2.68,0.48 3.68,1.4l2.7,-2.7C16.78,2.9 14.59,2 12,2 8.3,2 5.07,3.7 3.45,6.8L6.9,9.5C7.62,7.4 9.63,5.7 12,5.7z" fill="#EA4335" />
    </g>
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const signup = useHealthStore((state) => state.signup);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      agreeToTerms: true,
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      signup(data.email, data.name);
      setIsLoading(false);
      router.push("/signin");
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create an account
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Get started with your secure personal medical ledger
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name", {
            required: "Full name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
        />

        <Input
          label="Email address"
          placeholder="name@example.com"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          label="Password"
          placeholder="••••••••"
          type="password"
          {...register("password")}
        />

        <div className="flex items-start">
          <label className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-450 font-medium cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-350 dark:border-slate-800 text-brand-500 focus:ring-brand-500/30 mt-0.5"
              {...register("agreeToTerms")}
            />
            <span className="leading-tight">
              By checking this, you agree to our terms of service and consent to secure data storage under medical sharing frameworks.
            </span>
          </label>
        </div>

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create account
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-100 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-950 px-2 text-slate-450">
            Or register with
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full font-bold text-xs"
        leftIcon={<GoogleIcon />}
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
        Google
      </Button>


      </div>

      <p className="text-center text-xs text-slate-450 dark:text-slate-500 font-medium">
        Already have an account?{" "}
        <Link href="/signin" className="text-brand hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
