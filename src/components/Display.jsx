import React from 'react';

export default function Display({ expression, result }) {
  return (
    <div className="w-full rounded-2xl bg-slate-900 text-right p-5 md:p-6 shadow-inner">
      <div className="text-slate-400 text-sm md:text-base min-h-[20px] break-words">
        {expression || '\u00A0'}
      </div>
      <div className="text-white text-3xl md:text-5xl font-semibold mt-2 break-words">
        {result}
      </div>
    </div>
  );
}
