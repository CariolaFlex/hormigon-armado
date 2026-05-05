"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { calcEc } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { round } from "@/lib/utils";

const EcVsFcChart = dynamic(() => import("@/components/charts/EcVsFcChart"), { ssr: false });

interface EcCalculatorProps {
  unit: UnitSystem;
}

export function EcCalculator({ unit }: EcCalculatorProps) {
  const [fc, setFc] = useState(25);
  const [wc, setWc] = useState(2300);

  const result = useMemo(() => calcEc(fc, wc), [fc, wc]);

  const wcType = wc <= 1950 ? "Liviano" : wc <= 2400 ? "Normal" : "Pesado";
  const wcColor = wc <= 1950 ? "blue" : wc <= 2400 ? "green" : "amber";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">f'c (MPa)</label>
          <div className="flex items-center gap-3 mb-2">
            <input type="range" min={10} max={70} step={1} value={fc} onChange={(e) => setFc(Number(e.target.value))} className="flex-1 accent-blue-500 cursor-pointer" />
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[80px] text-center">
              <span className="text-accent-blue font-bold">{fc}</span>
              <span className="text-text-muted text-xs ml-1">MPa</span>
            </div>
          </div>
          {fc > 40 && (
            <div className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
              ⚠ f'c &gt; 40 MPa: fórmula ACI sobreestima Ec
            </div>
          )}
        </div>
        <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">
            Densidad wc — <span className={`text-accent-${wcColor}`}>{wcType}</span>
          </label>
          <div className="flex items-center gap-3 mb-2">
            <input type="range" min={1600} max={2800} step={50} value={wc} onChange={(e) => setWc(Number(e.target.value))} className="flex-1 accent-blue-500 cursor-pointer" />
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[95px] text-center">
              <span className="text-accent-blue font-bold">{wc}</span>
              <span className="text-text-muted text-xs ml-1">kg/m³</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados de las 3 fórmulas */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Simplificada (hormigón normal)",
            formula: "Ec = 4700 · √f'c",
            value: round(result.Ec_simplified, 0),
            unit: "MPa",
            gpa: round(result.Ec_simplified / 1000, 2),
            color: "blue",
            note: "wc ≈ 2300 kg/m³ implícito",
          },
          {
            label: "General ACI (cualquier wc)",
            formula: "Ec = 0.043 · wc^1.5 · √f'c",
            value: round(result.Ec_general, 0),
            unit: "MPa",
            gpa: round(result.Ec_general / 1000, 2),
            color: "amber",
            note: `wc = ${wc} kg/m³ — ${wcType}`,
          },
          {
            label: "En kgf/cm²",
            formula: "Ec = 15100 · √f'c",
            value: round(result.Ec_kgf, 0),
            unit: "kgf/cm²",
            gpa: null,
            color: "green",
            note: "Unidad antigua (ingeniería chilena)",
          },
        ].map((item) => (
          <div key={item.label} className={`bg-bg-card border border-bg-border rounded-xl p-4`}>
            <p className="text-[10px] text-text-muted mb-1">{item.label}</p>
            <div className="formula-block text-[11px] mb-3 py-1.5 px-2">{item.formula}</div>
            <div className={`text-2xl font-bold text-accent-${item.color} mb-0.5`}>{item.value.toLocaleString()}</div>
            <div className="text-xs text-text-muted mb-1">{item.unit}</div>
            {item.gpa && <div className="text-xs text-text-secondary">= {item.gpa} GPa</div>}
            <div className="text-[10px] text-text-muted mt-2 pt-2 border-t border-bg-border">{item.note}</div>
          </div>
        ))}
      </div>

      {/* Gráfica Ec vs f'c */}
      <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border">
          <h4 className="text-sm font-semibold text-text-primary">Ec vs f'c — Comparación por densidad</h4>
          <p className="text-xs text-text-muted">Fórmula general ACI: Ec = 0.043·wc^1.5·√f'c</p>
        </div>
        <EcVsFcChart height={320} />
      </div>
    </div>
  );
}
