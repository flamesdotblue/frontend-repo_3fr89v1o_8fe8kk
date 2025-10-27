import React from 'react';

export default function History({ items, onClear }) {
  return (
    <div className="w-full bg-white/60 dark:bg-white/10 backdrop-blur rounded-2xl p-4 md:p-5 shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-700 dark:text-slate-200 font-semibold">History</h3>
        <button
          onClick={onClear}
          className="text-xs px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-100"
        >
          Clear
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400 text-sm">No calculations yet.</p>
      ) : (
        <ul className="max-h-48 overflow-auto space-y-2 pr-1">
          {items.map((h, idx) => (
            <li key={`${h.expr}-${idx}`} className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400 mr-3 break-all">{h.expr}</span>
              <span className="font-medium text-slate-900 dark:text-white">{h.res}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
