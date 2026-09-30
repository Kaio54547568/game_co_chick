import React, { useState } from 'react';

/** Keep the whole conversation, with one short beat visible at a time. */
export const DialogueSequence: React.FC<{ lines: string[] }> = ({ lines }) => {
  const [page, setPage] = useState(0);
  const index = Math.min(page, lines.length - 1);
  return (
    <div className="space-y-3" aria-live="polite">
      <p className="text-sm leading-relaxed text-stone-200">{lines[index]}</p>
      {lines.length > 1 && (
        <div className="flex items-center justify-between gap-3 text-xs">
          <button disabled={index === 0} onClick={() => setPage(index - 1)} className="min-h-11 px-3 text-stone-400 disabled:opacity-30">Xem lại</button>
          <span className="text-stone-500">{index + 1}/{lines.length}</span>
          <button onClick={() => setPage(index === lines.length - 1 ? 0 : index + 1)} className="min-h-11 rounded-lg bg-stone-800 px-4 text-amber-300">{index === lines.length - 1 ? 'Đọc lại' : 'Kể tiếp'}</button>
        </div>
      )}
    </div>
  );
};
