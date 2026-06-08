import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "outline";
  children: React.ReactNode;
}

export function Badge({ children, className = "", variant = "secondary", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none border";

  const variants = {
    primary:
      "bg-brand-50 border-brand-200 text-brand-700 dark:bg-brand-950/40 dark:border-brand-900/50 dark:text-brand-400",
    secondary:
      "bg-slate-100 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300",
    success:
      "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900/50 dark:text-emerald-400",
    warning:
      "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900/50 dark:text-amber-400",
    danger:
      "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-900/50 dark:text-red-400",
    info:
      "bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-950/40 dark:border-sky-900/50 dark:text-sky-400",
    outline:
      "bg-transparent border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-400",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
