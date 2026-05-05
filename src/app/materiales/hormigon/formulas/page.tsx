"use client";

import Link from "next/link";
import { Calculator, Copy, Check } from "lucide-react";
import { useState } from "react";

interface FormulaCardProps {
  number: string;
  name: string;
  formula: string;
  variables: { sym: string; desc: string; unit: string }[];
  notes?: string[];
  color?: string;
}

function FormulaCard({ number, name, formula, variables, notes, color = "blue" }: FormulaCardProps) {
  const [copied, setCopied] = useState(false);

  const copyFormula = () => {
    navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`bg-bg-card border border-bg-border rounded-xl overflow-hidden`}>
      <div className={`px-5 py-3 border-b border-bg-border flex items-center justify-between bg-accent-${color}/5`}>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold text-accent-${color} bg-accent-${color}/15 px-2 py-0.5 rounded font-mono`}>#{number}</span>
          <span className="text-sm font-semibold text-text-primary">{name}</span>
        </div>
        <button onClick={copyFormula} className="text-text-muted hover:text-text-secondary transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div className="px-5 py-4">
        <div className={`formula-block text-sm mb-4 border-l-accent-${color} text-text-primary`}>
          {formula}
        </div>
        <div className="space-y-1.5">
          {variables.map((v) => (
            <div key={v.sym} className="flex items-baseline gap-2 text-xs">
              <code className={`font-mono text-accent-${color} w-24 flex-shrink-0`}>{v.sym}</code>
              <span className="text-text-secondary flex-1">{v.desc}</span>
              <span className="text-text-muted font-mono">[{v.unit}]</span>
            </div>
          ))}
        </div>
        {notes && notes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-bg-border space-y-1">
            {notes.map((note, i) => (
              <p key={i} className="text-xs text-text-muted flex items-start gap-1.5">
                <span className="text-text-muted mt-0.5">→</span>
                {note}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FormulasPage() {
  return (
    <div className="min-h-screen bg-bg-base px-8 py-6">
      <div className="flex items-center gap-2 text-xs text-text-muted mb-5">
        <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
        <span>/</span>
        <Link href="/materiales/hormigon" className="hover:text-text-secondary">Hormigón</Link>
        <span>/</span>
        <span className="text-text-secondary">Formulario</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-accent-amber/15 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-accent-amber" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Formulario — Capítulo 1</h1>
          <p className="text-sm text-text-muted">Todas las fórmulas con parámetros, unidades y notas</p>
        </div>
      </div>

      {/* Resumen tabla */}
      <div className="bg-bg-card border border-bg-border rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-text-primary mb-3">Resumen rápido — 11 fórmulas clave</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-bg-border">
                {["#", "Fórmula", "Descripción", "Unidades"].map((h) => (
                  <th key={h} className="text-left px-3 py-2 font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border font-mono">
              {[
                ["01", "f''c = 0.9·f'c", "Resistencia efectiva en estructura", "MPa"],
                ["02", "Ec = 4700·√f'c", "Módulo elástico (hormigón normal)", "MPa"],
                ["03", "Ec = 15100·√f'c", "Módulo elástico (hormigón normal)", "kgf/cm²"],
                ["04", "Ec = 0.043·wc^1.5·√f'c", "Módulo elástico (fórmula general)", "MPa"],
                ["05", "ε₀ = 1.8·f''c/Ec", "Deformación en pico — Hognestad", "mm/mm"],
                ["06", "ε₀ = 1.71·f''c/Ec", "Deformación en pico — Todeschini", "mm/mm"],
                ["07", "fc = f''c·[2r − r²], r=εc/ε₀", "Modelo Hognestad (rama asc.)", "MPa"],
                ["08", "fc = 2·f''c·x/(1+x²), x=εc/ε₀", "Modelo Todeschini (completo)", "MPa"],
                ["09", "σc = fcd·[1−(1−εc/εc2)²]", "Parábola-Rect. (zona parabólica)", "MPa"],
                ["10", "fcd = αcc·fck/γc", "Resistencia de cálculo (Eurocódigo)", "MPa"],
                ["11", "f'c = F_máx / A", "Resistencia medida en ensayo", "MPa"],
              ].map(([num, form, desc, unit]) => (
                <tr key={num} className="hover:bg-bg-elevated/50 transition-colors">
                  <td className="px-3 py-2 text-accent-amber">{num}</td>
                  <td className="px-3 py-2 text-text-primary">{form}</td>
                  <td className="px-3 py-2 text-text-muted">{desc}</td>
                  <td className="px-3 py-2 text-text-muted">{unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fórmulas detalladas */}
      <div className="space-y-8">
        {/* Módulo de Elasticidad */}
        <div>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Módulo de Elasticidad — ACI 318-19</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormulaCard
              number="02" name="Ec simplificado (hormigón normal)" color="cyan"
              formula="Ec = 4700 · √f'c     [MPa]"
              variables={[
                { sym: "Ec", desc: "Módulo de Elasticidad (secante al 45% de f'c)", unit: "MPa" },
                { sym: "f'c", desc: "Resistencia característica a compresión", unit: "MPa" },
              ]}
              notes={["Válido para wc ≈ 2300 kg/m³ (hormigón normal)", "Para f'c > 40 MPa sobreestima el módulo real"]}
            />
            <FormulaCard
              number="04" name="Ec general ACI (cualquier densidad)" color="cyan"
              formula="Ec = 0.043 · wc^1.5 · √f'c     [MPa]"
              variables={[
                { sym: "Ec", desc: "Módulo de Elasticidad", unit: "MPa" },
                { sym: "wc", desc: "Densidad del hormigón", unit: "kg/m³" },
                { sym: "f'c", desc: "Resistencia característica", unit: "MPa" },
              ]}
              notes={["Válido para 1440 ≤ wc ≤ 2560 kg/m³", "Normal: wc ≈ 2300 | Liviano: 1800–1900 | Pesado: >2500"]}
            />
          </div>
        </div>

        {/* Hognestad */}
        <div>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Modelo Hognestad Modificado (1951) — ACI</h2>
          <div className="grid grid-cols-3 gap-4">
            <FormulaCard
              number="01" name="Resistencia efectiva f''c" color="blue"
              formula="f''c = 0.9 · f'c"
              variables={[
                { sym: "f''c", desc: "Resistencia efectiva en la estructura", unit: "MPa" },
                { sym: "f'c", desc: "Resistencia de laboratorio (probeta)", unit: "MPa" },
              ]}
              notes={["El 10% de reducción compensa efectos de colado y curado in-situ"]}
            />
            <FormulaCard
              number="05" name="Deformación en el pico ε₀" color="blue"
              formula="ε₀ = 1.8 · f''c / Ec"
              variables={[
                { sym: "ε₀", desc: "Deformación en la tensión máxima", unit: "mm/mm" },
                { sym: "f''c", desc: "Resistencia efectiva", unit: "MPa" },
                { sym: "Ec", desc: "Módulo de Elasticidad", unit: "MPa" },
              ]}
              notes={["Típico: ε₀ ≈ 0.002 para hormigones G20–G40"]}
            />
            <FormulaCard
              number="07" name="Curva σ-ε Hognestad" color="blue"
              formula={"fc(εc) = f''c · [2r − r²]\nDonde r = εc / ε₀"}
              variables={[
                { sym: "fc", desc: "Tensión de compresión", unit: "MPa" },
                { sym: "εc", desc: "Deformación actual", unit: "mm/mm" },
                { sym: "r", desc: "Deformación normalizada = εc/ε₀", unit: "—" },
              ]}
              notes={["Válido para 0 ≤ εc ≤ ε₀ (solo rama ascendente)", "No aplica para f'c > 40 MPa"]}
            />
          </div>
        </div>

        {/* Todeschini */}
        <div>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Modelo Todeschini (1964)</h2>
          <div className="grid grid-cols-3 gap-4">
            <FormulaCard
              number="06" name="Deformación en el pico ε₀ (Todeschini)" color="amber"
              formula="ε₀ = 1.71 · f''c / Ec"
              variables={[
                { sym: "ε₀", desc: "Deformación en la tensión máxima", unit: "mm/mm" },
                { sym: "f''c", desc: "0.9·f'c", unit: "MPa" },
                { sym: "Ec", desc: "Módulo de Elasticidad", unit: "MPa" },
              ]}
            />
            <FormulaCard
              number="08" name="Curva σ-ε Todeschini" color="amber"
              formula={"fc(εc) = 2·f''c·x / (1 + x²)\nDonde x = εc / ε₀"}
              variables={[
                { sym: "fc", desc: "Tensión de compresión", unit: "MPa" },
                { sym: "x", desc: "Deformación normalizada = εc/ε₀", unit: "—" },
                { sym: "εu", desc: "Deformación última = 0.003", unit: "mm/mm" },
              ]}
              notes={["Válido para 0 ≤ εc ≤ εu = 0.003", "Verificación: x=1 → fc = 2f''c/(1+1) = f''c ✓", "Modela rama ascendente Y descendente"]}
            />
            <div className="bg-bg-card border border-accent-amber/20 rounded-xl p-4">
              <p className="text-xs font-semibold text-text-muted uppercase mb-3">Propiedades de la función</p>
              <div className="space-y-3 text-xs font-mono">
                <div className="bg-bg-elevated rounded p-2.5 border border-bg-border">
                  <div className="text-text-muted mb-1">En x = 0 (ε = 0):</div>
                  <div className="text-accent-amber">fc = 2·f''c·(0)/(1+0) = 0 ✓</div>
                </div>
                <div className="bg-bg-elevated rounded p-2.5 border border-bg-border">
                  <div className="text-text-muted mb-1">En x = 1 (ε = ε₀):</div>
                  <div className="text-accent-amber">fc = 2·f''c/(1+1) = f''c ✓ (pico)</div>
                </div>
                <div className="bg-bg-elevated rounded p-2.5 border border-bg-border">
                  <div className="text-text-muted mb-1">En x → ∞:</div>
                  <div className="text-accent-amber">fc → 0 ✓ (rama descendente)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EN 1992 */}
        <div>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Modelo Parábola-Rectángulo — EN 1992-1-1:2004</h2>
          <div className="grid grid-cols-3 gap-4">
            <FormulaCard
              number="10" name="Resistencia de cálculo fcd" color="green"
              formula="fcd = αcc · fck / γc"
              variables={[
                { sym: "fcd", desc: "Resistencia de cálculo del hormigón", unit: "MPa" },
                { sym: "αcc", desc: "Factor efectos largo plazo (= 1.0 por defecto)", unit: "—" },
                { sym: "fck", desc: "Resistencia característica", unit: "MPa" },
                { sym: "γc", desc: "Factor parcial del hormigón = 1.5", unit: "—" },
              ]}
            />
            <FormulaCard
              number="09a" name="Zona Parabólica (0 → εc2)" color="green"
              formula={"σc = fcd · [1 − (1 − εc/εc2)²]\nPara 0 ≤ εc ≤ εc2 = 0.002"}
              variables={[
                { sym: "σc", desc: "Tensión de compresión", unit: "MPa" },
                { sym: "fcd", desc: "Resistencia de cálculo", unit: "MPa" },
                { sym: "εc2", desc: "Deformación en pico = 0.002", unit: "mm/mm" },
              ]}
              notes={["n = 2 para la mayoría de hormigones"]}
            />
            <FormulaCard
              number="09b" name="Zona Rectangular (εc2 → εcu2)" color="green"
              formula={"σc = fcd = constante\nPara εc2 ≤ εc ≤ εcu2 = 0.0035"}
              variables={[
                { sym: "σc", desc: "Tensión constante = fcd", unit: "MPa" },
                { sym: "εcu2", desc: "Deformación última = 0.0035", unit: "mm/mm" },
              ]}
              notes={["Zona plástica — modelo conservador para diseño", "El hormigón alcanza su capacidad máxima sostenida"]}
            />
          </div>
        </div>

        {/* Conversiones */}
        <div>
          <h2 className="text-sm font-semibold text-text-muted uppercase tracking-widest mb-4">Conversión de Unidades</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { from: "MPa → kgf/cm²", formula: "× 10.1972", example: "25 MPa = 254.9 kgf/cm²", color: "purple" },
              { from: "kgf/cm² → MPa", formula: "× 0.0981", example: "250 kgf/cm² = 24.5 MPa", color: "purple" },
              { from: "‰ → mm/mm", formula: "÷ 1000", example: "2‰ = 0.002 mm/mm", color: "purple" },
            ].map((c) => (
              <div key={c.from} className="bg-bg-card border border-bg-border rounded-xl p-4">
                <div className="text-xs font-semibold text-text-muted mb-2">{c.from}</div>
                <div className="formula-block text-sm mb-2">{c.formula}</div>
                <div className="text-xs text-text-muted">Ej: {c.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
