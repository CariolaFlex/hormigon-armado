"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { todeschiniModel, calcEc } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { stressMPaToUnit, convertFc } from "@/lib/hormigon/units";
import { round } from "@/lib/utils";
import { Info } from "lucide-react";

const StressStrainChart = dynamic(() => import("@/components/charts/StressStrainChart"), { ssr: false });

interface TodeschiniCalcProps {
  unit: UnitSystem;
}

export function TodeschiniCalc({ unit }: TodeschiniCalcProps) {
  const [fc_mpa, setFcMpa] = useState(25);
  const [showDescending, setShowDescending] = useState(true);

  const result = useMemo(() => todeschiniModel(fc_mpa), [fc_mpa]);
  const ec = useMemo(() => calcEc(fc_mpa), [fc_mpa]);

  const conv = (v: number) => round(stressMPaToUnit(v, unit), 2);
  const unitLabel = unit === "MPa" ? "MPa" : "kgf/cm²";
  const fcDisplay = unit === "MPa" ? fc_mpa : round(convertFc(fc_mpa, "MPa", "kgf/cm2"), 0);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
        <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">
          Resistencia f'c
        </label>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="range" min={10} max={60} step={1}
            value={fc_mpa}
            onChange={(e) => setFcMpa(Number(e.target.value))}
            className="flex-1 accent-amber-500 cursor-pointer"
          />
          <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[90px] text-center">
            <span className="text-accent-amber font-bold text-sm">{fcDisplay}</span>
            <span className="text-text-muted text-xs ml-1">{unitLabel}</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "f''c = 0.9·f'c", value: conv(result.fc_pp), unit: unitLabel, color: "amber" },
          { label: "Ec = 4700·√f'c", value: round(ec.Ec_simplified, 0), unit: "MPa", color: "blue" },
          { label: "ε₀ = 1.71·f''c/Ec", value: result.e0.toFixed(5), unit: "mm/mm", color: "green" },
          { label: "εu = deformación ult.", value: result.eu.toFixed(3), unit: "mm/mm", color: "red" },
        ].map((item) => (
          <div key={item.label} className={`bg-bg-card border border-bg-border rounded-xl p-3`}>
            <div className="text-[10px] text-text-muted mb-1">{item.label}</div>
            <div className={`text-xl font-bold text-accent-${item.color}`}>{item.value}</div>
            <div className="text-xs text-text-muted">{item.unit}</div>
          </div>
        ))}
      </div>

      {/* Formula block */}
      <div className="bg-bg-elevated border border-bg-border rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-text-muted uppercase font-semibold mb-2">Ecuación de Todeschini (1964)</p>
            <div className="formula-block text-xs">
              <p className="text-text-secondary">x = εc / ε₀</p>
              <p className="text-text-secondary mt-1">fc(εc) = 2·f''c·x / (1 + x²)</p>
              <p className="text-text-muted text-[10px] mt-1">válido para 0 ≤ εc ≤ εu = 0.003</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-muted uppercase font-semibold mb-2">Verificación en el pico (x=1)</p>
            <div className="bg-accent-amber/10 border border-accent-amber/20 rounded-lg p-3 font-mono text-xs">
              <p className="text-text-secondary">x = ε₀/ε₀ = 1</p>
              <p className="text-text-secondary">fc = 2·f''c·(1)/(1+1²)</p>
              <p className="text-text-secondary">fc = f''c = <span className="text-accent-amber">{conv(result.fc_pp)} {unitLabel}</span> ✓</p>
            </div>
          </div>
        </div>
        <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-3 text-xs">
          <p className="text-accent-green font-medium mb-1">Ventaja sobre Hognestad</p>
          <p className="text-text-secondary">
            Todeschini modela la <strong>rama descendente</strong> con la misma ecuación continua.
            La función 2f''c·x/(1+x²) cae naturalmente después del pico (x&gt;1),
            siendo ideal para análisis numérico por elementos finitos.
          </p>
        </div>
      </div>

      {/* Toggle mostrar descendente */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showDescending}
          onChange={(e) => setShowDescending(e.target.checked)}
          className="accent-amber-500 w-4 h-4"
        />
        <span className="text-sm text-text-secondary">Mostrar rama descendente completa</span>
      </label>

      {/* Chart */}
      <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border">
          <h4 className="text-sm font-semibold text-text-primary">Curva σ-ε — Modelo Todeschini (1964)</h4>
          <p className="text-xs text-text-muted">Función racional continua — rama ascendente + descendente</p>
        </div>
        <StressStrainChart
          fc={fc_mpa}
          unit={unit}
          height={360}
          showZones={showDescending}
          showAnnotations={true}
          showBoth={false}
        />
      </div>
    </div>
  );
}
