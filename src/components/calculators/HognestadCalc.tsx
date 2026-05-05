"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { hognestadModel, calcEc } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { stressMPaToUnit, convertFc } from "@/lib/hormigon/units";
import { round } from "@/lib/utils";
import { Info, ChevronDown, ChevronUp } from "lucide-react";

const StressStrainChart = dynamic(() => import("@/components/charts/StressStrainChart"), { ssr: false });

interface HognestadCalcProps {
  unit: UnitSystem;
}

export function HognestadCalc({ unit }: HognestadCalcProps) {
  const [fc_mpa, setFcMpa] = useState(25);
  const [wc, setWc] = useState(2300);
  const [showDerivation, setShowDerivation] = useState(false);

  const result = useMemo(() => hognestadModel(fc_mpa, wc), [fc_mpa, wc]);
  const ec = useMemo(() => calcEc(fc_mpa, wc), [fc_mpa, wc]);

  const conv = (v: number) => round(stressMPaToUnit(v, unit), 2);
  const unitLabel = unit === "MPa" ? "MPa" : "kgf/cm²";

  const fcInput = unit === "MPa" ? fc_mpa : round(convertFc(fc_mpa, "MPa", "kgf/cm2"), 0);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">
            Resistencia f'c
          </label>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="range"
              min={10} max={60} step={1}
              value={fc_mpa}
              onChange={(e) => setFcMpa(Number(e.target.value))}
              className="flex-1 accent-blue-500 cursor-pointer"
            />
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[90px] text-center">
              <span className="text-accent-blue font-bold text-sm">{fcInput}</span>
              <span className="text-text-muted text-xs ml-1">{unitLabel}</span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>10</span><span>f'c en MPa</span><span>60</span>
          </div>
          {fc_mpa > 40 && (
            <div className="mt-2 flex items-start gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1.5 rounded border border-amber-400/20">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              f'c &gt; 40 MPa: fórmula ACI sobreestima Ec
            </div>
          )}
        </div>

        <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">
            Densidad wc (kg/m³)
          </label>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="range"
              min={1600} max={2800} step={50}
              value={wc}
              onChange={(e) => setWc(Number(e.target.value))}
              className="flex-1 accent-blue-500 cursor-pointer"
            />
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[90px] text-center">
              <span className="text-accent-blue font-bold text-sm">{wc}</span>
              <span className="text-text-muted text-xs ml-1">kg/m³</span>
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-text-muted">
            <span>1600<br/>(liviano)</span>
            <span className="text-center">densidad</span>
            <span className="text-right">2800<br/>(pesado)</span>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "f''c = 0.9·f'c", value: conv(result.fc_pp), unit: unitLabel, color: "blue" },
          { label: "Ec = 4700·√f'c", value: round(ec.Ec_simplified, 0), unit: "MPa", color: "amber" },
          { label: "ε₀ = 1.8·f''c/Ec", value: result.e0.toFixed(5), unit: "mm/mm", color: "green" },
          { label: "ε₀ en ‰", value: (result.e0 * 1000).toFixed(2), unit: "‰", color: "purple" },
        ].map((item) => (
          <div key={item.label} className={`bg-bg-card border border-${item.color === "blue" ? "accent-blue" : item.color === "amber" ? "accent-amber" : item.color === "green" ? "accent-green" : "accent-purple"}/20 rounded-xl p-3`}>
            <div className="text-[10px] text-text-muted mb-1">{item.label}</div>
            <div className={`text-xl font-bold text-accent-${item.color}`}>{item.value}</div>
            <div className="text-xs text-text-muted">{item.unit}</div>
          </div>
        ))}
      </div>

      {/* Equation derivation toggle */}
      <button
        onClick={() => setShowDerivation(!showDerivation)}
        className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary transition-colors"
      >
        {showDerivation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        {showDerivation ? "Ocultar" : "Ver"} derivación y ecuación completa
      </button>

      {showDerivation && (
        <div className="bg-bg-elevated border border-bg-border rounded-xl p-4 space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted uppercase font-semibold mb-2">Parámetros calculados</p>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-text-secondary">f''c = 0.9 × {fc_mpa} = <span className="text-accent-blue">{conv(result.fc_pp)} {unitLabel}</span></div>
                <div className="text-text-secondary">Ec = 4700 × √{fc_mpa} = <span className="text-accent-amber">{round(ec.Ec_simplified, 0)} MPa</span></div>
                <div className="text-text-secondary">ε₀ = 1.8 × {conv(result.fc_pp)} / {round(ec.Ec_simplified, 0)} = <span className="text-accent-green">{result.e0.toFixed(5)}</span></div>
              </div>
            </div>
            <div>
              <p className="text-xs text-text-muted uppercase font-semibold mb-2">Ecuación del modelo</p>
              <div className="formula-block text-xs">
                <p className="text-text-secondary">fc(εc) = f''c · [2(εc/ε₀) − (εc/ε₀)²]</p>
                <p className="text-text-muted text-[10px] mt-1">válido para 0 ≤ εc ≤ ε₀</p>
              </div>
            </div>
          </div>
          <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-3 text-xs">
            <p className="text-accent-blue font-medium mb-1">¿Por qué f''c = 0.9·f'c?</p>
            <p className="text-text-secondary">El 10% de reducción compensa diferencias entre la probeta de laboratorio y el hormigón colocado en la estructura: estado de cura, posición de colado, relación h/d y efectos de largo plazo.</p>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Curva σ-ε — Modelo Hognestad Modificado</h4>
            <p className="text-xs text-text-muted">Parábola de 2° grado — rama ascendente únicamente</p>
          </div>
          <span className="text-[10px] font-medium px-2 py-1 rounded border text-accent-blue bg-accent-blue/10 border-accent-blue/20">
            f'c = {fc_mpa} MPa
          </span>
        </div>
        <StressStrainChart
          fc={fc_mpa}
          unit={unit}
          height={360}
          showZones={false}
          showAnnotations={true}
          showBoth={false}
        />
      </div>
    </div>
  );
}
