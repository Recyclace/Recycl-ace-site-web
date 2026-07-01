"use client";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded-xl border border-foret/15 bg-white px-4 py-3 text-encre placeholder:text-encre/35 focus:border-emeraude focus:outline-none focus:ring-2 focus:ring-emeraude/20 transition";

export function Input({ label, ...props }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-encre">{label}</span>
      <input className={base} {...props} />
    </label>
  );
}

export function Textarea({ label, ...props }: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-encre">{label}</span>
      <textarea rows={5} className={base} {...props} />
    </label>
  );
}
