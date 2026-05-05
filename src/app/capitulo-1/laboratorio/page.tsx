"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { HognestadCalc } from "@/components/calculators/HognestadCalc";
import { TodeschiniCalc } from "@/components/calculators/TodeschiniCalc";
import { ParabolaRectCalc } from "@/components/calculators/ParabolaRectCalc";
import { EcCalculator } from "@/components/calculators/EcCalculator";
import type { UnitSystem } from "@/lib/hormigon/units";
import Link from "next/link";
import { FlaskConical, RefreshCw, Layers } from "lucide-react";

const StressStrainChart = dynamic(() => import("@/components/charts/StressStrainChart"), { ssr: false });
const ModelComparisonChart = dynamic(() => import("@/components/charts/ModelComparisonChart"), { ssr: false });
const MultiResistanceChart = dynamic(() => import("@/components/charts/MultiResistanceChart"), { ssr: false });

type Tab = "overview" | "hognestad" | "todeschini" | "parabola" | "comparacion" | "ec" | "efecto-fc";

const TABS: { id: Tab; label: string; color: string }[] = [
  { id: "overview", label: "Curva σ-ε General", color: "text-text-secondary" },
  { id: "hognestad", label: "Hognestad", color: "text-accent-blue" },
  { id: "todeschini", label: "Todeschini", color: "text-accent-amber" },
  { id: "parabola", label: "Parábola-Rect.", color: "text-accent-green" },
  { id: "comparacion", label: "Comparación", color: "text-accent-purple" },
  { id: "ec", label: "Módulo Ec", color: "text-accent-cyan" },
  { id: "efecto-fc", label: "Efecto f'c", color: "text-text-secondary" },
];

export default function LaboratorioPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [unit, setUnit] = useState<UnitSystem>("MPa");
  const [overviewFc, setOverviewFc] = useState(25);

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
              <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
              <span>/</span>
              <Link href="/capitulo-1" className="hover:text-text-secondary">Cap. 1</Link>
              <span>/</span>
              <span className="text-text-secondary">Laboratorio</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-green/15 flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-accent-green" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary">Laboratorio Interactivo</h1>
                <p className="text-xs text-text-muted">Capítulo 1 — Modelos constitutivos y curvas σ-ε</p>
              </div>
            </div>
          </div>

          {/* Unit toggle */}
          <div className="flex items-center gap-2 bg-bg-elevated border border-bg-border rounded-xl p-1">
            {(["MPa", "kgf/cm2"] as UnitSystem[]).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  unit === u
                    ? "bg-accent-blue text-white shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {u === "MPa" ? "MPa" : "kgf/cm²"}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-5 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                tab === t.id
                  ? "bg-bg-card border border-bg-border text-text-primary"
                  : `${t.color} hover:bg-bg-elevated`
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6 animate-fade-in-up">

        {/* ── TAB: OVERVIEW σ-ε ── */}
        {tab === "overview" && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-1">Curva Tensión-Deformación (σ-ε)</h2>
                <p className="text-sm text-text-secondary max-w-2xl">
                  Comportamiento fundamental del hormigón bajo compresión uniaxial. Tres zonas claramente definidas:
                  lineal elástica, no-lineal inelástica, y rama descendente (softening).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-text-muted">f'c:</label>
                <input
                  type="range" min={10} max={60} step={5}
                  value={overviewFc}
                  onChange={(e) => setOverviewFc(Number(e.target.value))}
                  className="w-28 accent-blue-500"
                />
                <span className="text-sm font-bold text-accent-blue w-16">{overviewFc} MPa</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: "① Zona Lineal", range: "0 → 0.5·f'c", color: "blue", desc: "Et constante, microfisuras estables" },
                { label: "② Zona No-Lineal", range: "0.5·f'c → f'c", color: "amber", desc: "Microfisuras crecen, comportamiento inelástico" },
                { label: "③ Softening", range: "f'c → rotura", color: "red", desc: "Pérdida de capacidad portante, ductilidad" },
              ].map((zone) => (
                <div key={zone.label} className={`bg-bg-card border border-bg-border rounded-xl p-3`}>
                  <div className={`text-sm font-semibold text-accent-${zone.color} mb-1`}>{zone.label}</div>
                  <div className="text-xs font-mono text-text-muted mb-1">{zone.range}</div>
                  <div className="text-xs text-text-secondary">{zone.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
              <StressStrainChart
                fc={overviewFc}
                unit={unit}
                height={460}
                showZones={true}
                showAnnotations={true}
                showBoth={true}
              />
            </div>

            {/* Microfissure progression */}
            <div className="bg-bg-card border border-bg-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Progresión de Microfisuras</h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { pct: "0–30%", estado: "Microfisuras preexistentes estables (interfase árido-pasta)", color: "green", label: "Estables" },
                  { pct: "30–50%", estado: "Fisuras inician crecimiento lento", color: "cyan", label: "Inicio" },
                  { pct: "50–75%", estado: "Fisuras crecen en pasta de cemento", color: "amber", label: "Crecimiento" },
                  { pct: "75–100%", estado: "Fisuras se conectan formando red", color: "orange", label: "Conexión" },
                  { pct: "100%", estado: "Red completamente desarrollada → colapso", color: "red", label: "Colapso" },
                ].map((step) => (
                  <div key={step.pct} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
                    <div className={`text-xs font-bold text-accent-${step.color} mb-1`}>{step.pct}</div>
                    <div className="text-[10px] font-semibold text-text-secondary mb-1">{step.label}</div>
                    <div className="text-[10px] text-text-muted">{step.estado}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: HOGNESTAD ── */}
        {tab === "hognestad" && (
          <div className="space-y-5">
            <div className="bg-bg-card border border-accent-blue/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent-blue" />
                <h2 className="font-semibold text-text-primary">Modelo Hognestad Modificado (1951)</h2>
                <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded border border-bg-border">ACI 318 / Chile</span>
              </div>
              <p className="text-sm text-text-secondary">
                Parábola de segundo grado para la rama ascendente. El modelo más usado en Chile para diseño sísmico (NCh433).
                Válido para f'c ≤ 40 MPa.
              </p>
            </div>
            <HognestadCalc unit={unit} />
          </div>
        )}

        {/* ── TAB: TODESCHINI ── */}
        {tab === "todeschini" && (
          <div className="space-y-5">
            <div className="bg-bg-card border border-accent-amber/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent-amber" />
                <h2 className="font-semibold text-text-primary">Modelo Todeschini (1964)</h2>
                <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded border border-bg-border">Análisis No-Lineal</span>
              </div>
              <p className="text-sm text-text-secondary">
                Función racional continua 2f''c·x/(1+x²) que describe tanto la rama ascendente como la descendente
                con una sola ecuación. Ideal para análisis numérico por elementos finitos.
              </p>
            </div>
            <TodeschiniCalc unit={unit} />
          </div>
        )}

        {/* ── TAB: PARÁBOLA-RECTÁNGULO ── */}
        {tab === "parabola" && (
          <div className="space-y-5">
            <div className="bg-bg-card border border-accent-green/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-accent-green" />
                <h2 className="font-semibold text-text-primary">Modelo Parábola-Rectángulo (EN 1992-1-1)</h2>
                <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded border border-bg-border">Eurocódigo 2</span>
              </div>
              <p className="text-sm text-text-secondary">
                Dos fases: parábola hasta εc2 = 0.002, luego zona plástica rectangular constante hasta εcu2 = 0.0035.
                Modelo oficial del Eurocódigo 2 (EN 1992-1-1:2004 §3.1.7).
              </p>
            </div>
            <ParabolaRectCalc unit={unit} />
          </div>
        )}

        {/* ── TAB: COMPARACIÓN ── */}
        {tab === "comparacion" && (
          <div className="space-y-5">
            <div className="bg-bg-card border border-bg-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-accent-purple" />
                <h2 className="font-semibold text-text-primary">Comparación de los 3 Modelos Constitutivos</h2>
              </div>
              <p className="text-sm text-text-secondary">
                Superposición de los tres modelos para el mismo f'c. Permite comparar diferencias en ε₀, εu, rama descendente y fcd.
              </p>
            </div>

            <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
              <ModelComparisonChart unit={unit} height={450} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-bg-border">
                    {["Característica", "Hognestad Mod.", "Todeschini", "Parábola-Rect."].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-bg-border">
                  {[
                    ["Origen", "ACI (EE.UU.)", "Investigación (1964)", "EN 1992 (Europa)"],
                    ["Forma matemática", "Parábola 2°", "Función racional", "Parábola + Rectángulo"],
                    ["Rama descendente", "❌ No", "✅ Sí", "❌ No (plateau)"],
                    ["Resistencia base", "f''c = 0.9·f'c", "f''c = 0.9·f'c", "fcd = fck/γc"],
                    ["ε₀ (deform. pico)", "1.8·f''c/Ec", "1.71·f''c/Ec", "0.002 (fijo)"],
                    ["εu (deform. ult.)", "= ε₀", "0.003", "0.0035"],
                    ["Uso principal", "Diseño sísmico Chile", "Análisis numérico", "Diseño europeo"],
                    ["Límite f'c", "≤ 40 MPa", "General", "General"],
                  ].map((row) => (
                    <tr key={row[0]} className="hover:bg-bg-elevated/50 transition-colors">
                      {row.map((cell, i) => (
                        <td key={i} className={`px-4 py-3 ${i === 0 ? "text-text-secondary font-medium" : "text-text-muted"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Ec ── */}
        {tab === "ec" && (
          <div className="space-y-5">
            <div className="bg-bg-card border border-bg-border rounded-xl p-4">
              <h2 className="font-semibold text-text-primary mb-1">Módulo de Elasticidad del Hormigón (Ec)</h2>
              <p className="text-sm text-text-secondary">
                ACI 318-19 §19.2.2 — Fórmulas empíricas calibradas con datos experimentales.
                El módulo secante va del origen al punto (0.45·f'c, correspondiente εc).
              </p>
            </div>
            <EcCalculator unit={unit} />
          </div>
        )}

        {/* ── TAB: Efecto f'c ── */}
        {tab === "efecto-fc" && (
          <div className="space-y-5">
            <div className="bg-bg-card border border-bg-border rounded-xl p-4">
              <h2 className="font-semibold text-text-primary mb-1">Efecto de la Resistencia f'c en la Curva σ-ε</h2>
              <p className="text-sm text-text-secondary">
                Comparación de curvas para f'c = 15, 20, 25, 30, 35, 40 MPa usando el modelo Todeschini.
                Mayor f'c → mayor rigidez Ec → ε₀ ≈ 0.002 para todos → menor ductilidad (rama descendente más brusca).
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Rigidez Ec", trend: "↑ Aumenta con f'c", color: "blue" },
                { label: "Deformación pico ε₀", trend: "≈ Constante ≈ 0.002", color: "green" },
                { label: "Ductilidad", trend: "↓ Disminuye con f'c", color: "red" },
              ].map((item) => (
                <div key={item.label} className="bg-bg-card border border-bg-border rounded-xl p-3">
                  <div className="text-xs text-text-muted mb-1">{item.label}</div>
                  <div className={`text-sm font-semibold text-accent-${item.color}`}>{item.trend}</div>
                </div>
              ))}
            </div>

            <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
              <MultiResistanceChart unit={unit} height={440} model="todeschini" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
