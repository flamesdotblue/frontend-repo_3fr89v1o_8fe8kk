import React from 'react';

const base = "select-none rounded-xl text-lg font-medium transition-colors active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants = {
  default: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-500",
  operator: "bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-500",
  action: "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400",
  equals: "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-500 col-span-2",
};

export default function Button({ label, onClick, variant = 'default', className = '' }) {
  return (
    <button
      type="button"
      className={`${base} ${variants[variant] || variants.default} ${className} h-14 md:h-16 w-full`}
      onClick={() => onClick(label)}
      aria-label={`key ${label}`}
    >
      {label}
    </button>
  );
}
