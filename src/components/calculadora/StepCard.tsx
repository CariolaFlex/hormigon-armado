"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type StepType = "ok" | "warn" | "err" | "info";

interface Props {
  num: number;
  title: string;
  result: string;
  planteamiento: string;
  ecuacion: string;
  conclusion: { tipo: StepType; texto: string };
}

const TYPE_STYLE: Record<StepType, string> = {
  ok:   "bg-accent-green/10 border-accent-green/20 text-accent-green",
  warn: "bg-accent-amber/10 border-accent-amber/20 text-accent-amber",
  err:  "bg-accent-red/10 border-accent-red/20 text-accent-red",
  info: "bg-accent-blue/10 border-accent-blue/20 text-accent-blue",
};

export function StepCard({ num, title, result, planteamiento, ecuacion, conclusion }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-bg-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-bg-elevated hover:bg-bg-hover transition-colors text-left"
      >
        <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-bold flex items-center justify-center flex-shrink-0">
          {num}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-text-primary">{title}</div>
          <div className="text-xs text-text-muted font-mono truncate">{result}</div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-text-muted transition-transform flex-shrink-0", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-4 py-3 space-y-3 border-t border-bg-border bg-bg-base">
          <div>
            <div className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Planteamiento</div>
            <p className="text-xs text-text-secondary leading-relaxed whitespace-pre-line">{planteamiento}</p>
          </div>
          <div>
            <div className="text-[10px] text-text-muted uppercase tracking-wide mb-1">Ecuaciones</div>
            <pre className="text-xs text-accent-blue font-mono bg-bg-elevated rounded-lg p-3 overflow-x-auto leading-relaxed">{ecuacion}</pre>
          </div>
          <div className={cn("rounded-lg border px-3 py-2 text-xs font-medium", TYPE_STYLE[conclusion.tipo])}>
            {conclusion.texto}
          </div>
        </div>
      )}
    </div>
  );
}
