"use client";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-gray-900/80 dark:from-black dark:to-neutral-900">
      <div className="backdrop-blur-lg bg-white/10 dark:bg-neutral-900/80 rounded-2xl shadow-xl p-8 w-full max-w-md border border-white/20">
        {children}
      </div>
    </div>
  );
}
