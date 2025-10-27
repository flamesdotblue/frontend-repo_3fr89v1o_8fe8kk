import React, { useMemo, useState } from 'react';
import Display from './components/Display';
import Keypad from './components/Keypad';
import History from './components/History';

function sanitizeExpression(expr) {
  if (!expr) return '';
  let e = expr.replace(/÷/g, '/').replace(/×/g, '*');
  // Remove trailing invalid characters
  e = e.replace(/[^0-9)]+$/g, (m) => (/[)0-9]$/.test(e) ? m : ''));
  return e;
}

function completeParentheses(expr) {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  const needed = open - close;
  return needed > 0 ? expr + ')'.repeat(needed) : expr;
}

function isValidExpression(expr) {
  const allowed = /^[0-9+\-*/%.()\s]*$/;
  return allowed.test(expr);
}

function evaluateExpression(expr) {
  if (!expr) return '0';
  let e = sanitizeExpression(expr);
  e = completeParentheses(e);
  if (!isValidExpression(e)) return 'Error';
  // Avoid leading operators that break eval
  e = e.replace(/^[+*/%]+/, '');
  try {
    // eslint-disable-next-line no-new-func
    const val = Function(`"use strict"; return (${e})`)();
    if (typeof val !== 'number' || Number.isNaN(val) || !Number.isFinite(val)) return 'Error';
    // Fix floating precision
    return parseFloat(val.toFixed(10)).toString();
  } catch {
    return 'Error';
  }
}

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [history, setHistory] = useState([]);

  const handleKey = (key) => {
    if (key === 'C') {
      setExpression('');
      setResult('0');
      return;
    }
    if (key === 'DEL') {
      setExpression((prev) => {
        const next = prev.slice(0, -1);
        const r = evaluateExpression(next);
        setResult(r === 'Error' ? '0' : r);
        return next;
      });
      return;
    }
    if (key === '=') {
      const r = evaluateExpression(expression);
      if (r !== 'Error') {
        setHistory((h) => [{ expr: expression || '0', res: r }, ...h].slice(0, 20));
        setExpression(r);
        setResult(r);
      } else {
        setResult('Error');
      }
      return;
    }

    // Append numbers/operators
    setExpression((prev) => {
      let next = prev + key;
      // Prevent multiple decimals in the current number segment
      if (key === '.') {
        const seg = (prev.match(/([0-9]*\.?[0-9]*)$/) || ['',''])[1];
        if (seg.includes('.')) {
          next = prev; // ignore extra dot
        }
      }
      const r = evaluateExpression(next);
      setResult(r === 'Error' ? result : r);
      return next;
    });
  };

  const clearHistory = () => setHistory([]);

  const today = useMemo(() => new Date().toLocaleDateString(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-emerald-50 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Calculator</h1>
          <span className="text-xs text-slate-500">{today}</span>
        </div>

        <Display expression={expression} result={result} />

        <Keypad onKey={handleKey} />

        <History items={history} onClear={clearHistory} />

        <p className="text-center text-xs text-slate-500 pt-1">Simple, fast, and pretty ✨</p>
      </div>
    </div>
  );
}
