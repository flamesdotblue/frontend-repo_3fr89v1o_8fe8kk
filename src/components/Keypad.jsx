import React from 'react';
import Button from './Button';

export default function Keypad({ onKey }) {
  const keys = [
    { label: 'C', variant: 'action' },
    { label: 'DEL', variant: 'action' },
    { label: '%', variant: 'operator' },
    { label: '÷', variant: 'operator' },

    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '×', variant: 'operator' },

    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '-', variant: 'operator' },

    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', variant: 'operator' },

    { label: '(' , variant: 'action'},
    { label: ')', variant: 'action' },
    { label: '0', className: 'col-span-1' },
    { label: '.', className: 'col-span-1' },

    { label: '=', variant: 'equals', className: 'col-span-4' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {keys.map((k, idx) => (
        <Button
          key={`${k.label}-${idx}`}
          label={k.label}
          variant={k.variant}
          className={k.className}
          onClick={onKey}
        />
      ))}
    </div>
  );
}
