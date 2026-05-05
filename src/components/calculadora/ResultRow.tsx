"use client";
import { cn } from "@/lib/utils";

interface RowItem {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

interface Props {
  items: RowItem[];
}

export function ResultRow({ items }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "rounded-lg p-3 border",
            item.highlight
              ? "bg-accent-blue/10 border-accent-blue/20"
              : "bg-bg-elevated border-bg-border"
          )}
        >
          <div className="text-[10px] text-text-muted mb-1 uppercase tracking-wide">{item.label}</div>
          <div className={cn("font-bold font-mono text-sm", item.highlight ? "text-accent-blue" : "text-text-primary")}>
            {typeof item.value === "number" ? item.value.toFixed(4) : item.value}
            {item.unit && <span className="text-text-muted font-normal ml-1 text-xs">{item.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}
