import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            type={inputType}
            ref={ref}
            className={`w-full h-10 px-3 py-2 bg-white dark:bg-slate-900 border ${
              error
                ? "border-red-500 focus:ring-red-200 dark:border-red-600 dark:focus:ring-red-900/30"
                : "border-slate-200 focus:ring-brand-100 dark:border-slate-800 dark:focus:ring-brand-900/30"
            } rounded-xl text-sm transition-all focus:outline-none focus:ring-4 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-slate-50 ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs font-medium text-red-500 dark:text-red-400">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
