"use client";
import { cn } from "@/lib/utils";
import type { ZonaFalla } from "@/types/index";

const ZONA = {
  ductil:     { label: "✓ Zona Dúctil",    bg: "bg-accent-green/10",  border: "border-accent-green/30",  text: "text-accent-green",  phi: "φ = 0.90" },
  transicion: { label: "⚠ Zona Transición", bg: "bg-accent-amber/10",  border: "border-accent-amber/30",  text: "text-accent-amber",  phi: "φ interpolado" },
  fragil:     { label: "✗ Zona Frágil",     bg: "bg-accent-red/10",    border: "border-accent-red/30",    text: "text-accent-red",    phi: "φ = 0.65" },
};

interface Props {
  zona: ZonaFalla;
  phi: number;
  eps_s: number;
  eps_y: number;
}

export function FallaBadge({ zona, phi, eps_s, eps_y }: Props) {
  const z = ZONA[zona];
  return (
    <div className={cn("rounded-xl border p-4", z.bg, z.border)}>
      <div className={cn("text-base font-bold mb-2", z.text)}>{z.label}</div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <div className="text-text-muted mb-0.5">φ factor</div>
          <div className={cn("font-bold font-mono", z.text)}>{phi.toFixed(2)}</div>
          <div className="text-text-muted text-[10px]">{z.phi}</div>
        </div>
        <div>
          <div className="text-text-muted mb-0.5">εs</div>
          <div className="font-bold font-mono text-text-primary">{eps_s.toFixed(5)}</div>
        </div>
        <div>
          <div className="text-text-muted mb-0.5">εy</div>
          <div className="font-bold font-mono text-text-primary">{eps_y.toFixed(5)}</div>
        </div>
      </div>
    </div>
  );
}
