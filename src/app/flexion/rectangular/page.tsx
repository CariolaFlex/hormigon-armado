"use client";

import { useState, useCallback } from "react";
import { Calculator, BookOpen, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { analizarRectangular, getBeta, calcAs, BARRAS } from "@/lib/hormigon/flexion";
import { SeccionTransversal } from "@/components/svg/SeccionTransversal";
import { DiagramaDeformaciones } from "@/components/svg/DiagramaDeformaciones";
import { DiagramaFuerzas } from "@/components/svg/DiagramaFuerzas";
import { FallaBadge } from "@/components/calculadora/FallaBadge";
import { ResultRow } from "@/components/calculadora/ResultRow";
import { StepCard } from "@/components/calculadora/StepCard";
import type { ZonaFalla } from "@/types/index";

const FC_OPTS = [140, 175, 200, 210, 250, 280, 350];
const FY_OPTS = [2800, 4200, 5000, 6000];
const PHI_OPTS = Object.keys(BARRAS).map(Number);

interface FormState {
  b: string; h: string; r: string;
  fc: string; fy: string;
  modoAs: "barras" | "area";
  nb: string; phi: string; As_direct: string;
  Mu: string;
}

const DEFAULT: FormState = {
  b:"30", h:"60", r:"5",
  fc:"200", fy:"4200",
  modoAs:"barras", nb:"4", phi:"22", As_direct:"",
  Mu:"",
};

export default function RectangularPage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [result, setResult] = useState<ReturnType<typeof analizarRectangular> | null>(null);
  const [asPreview, setAsPreview] = useState<string>("");

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const getAs = useCallback(() => {
    if (form.modoAs === "barras") return calcAs(+form.nb, +form.phi);
    return parseFloat(form.As_direct) || 0;
  }, [form]);

  const calcAsPreview = useCallback(() => {
    if (form.modoAs === "barras") {
      const as = calcAs(+form.nb, +form.phi);
      setAsPreview(`As = ${as.toFixed(3)} cm²`);
    }
  }, [form]);

  const calcular = useCallback(() => {
    const b = +form.b, h = +form.h, r = +form.r;
    const fc = +form.fc, fy = +form.fy;
    const As = getAs();
    const d = h - r;
    const Mu = form.Mu ? +form.Mu : undefined;
    if (!b || !h || !fc || !fy || !As) return;
    const res = analizarRectangular({ b, h, d, fc, fy, As, Mu: Mu ?? null });
    setResult(res);
  }, [form, getAs]);

  const loadEj01 = () => {
    setForm({ b:"30",h:"60",r:"6.8",fc:"200",fy:"4200",modoAs:"barras",nb:"3",phi:"25",As_direct:"",Mu:"" });
    setTimeout(calcular, 50);
  };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-blue/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Análisis — Sección Rectangular</h1>
            <p className="text-xs text-text-muted">Bloque de Whitney · ACI 318-19 · NCh430</p>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={loadEj01} className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated text-text-muted text-xs rounded-lg border border-bg-border hover:text-text-primary hover:border-accent-blue/40 transition-all">
              <BookOpen className="w-3.5 h-3.5" /> Cargar EJ01
            </button>
            <button onClick={() => { setForm(DEFAULT); setResult(null); }} className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-elevated text-text-muted text-xs rounded-lg border border-bg-border hover:text-text-primary transition-all">
              <RefreshCw className="w-3.5 h-3.5" /> Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex h-[calc(100vh-89px)]">
        {/* Panel izquierdo */}
        <div className="w-80 flex-shrink-0 border-r border-bg-border bg-bg-panel overflow-y-auto p-4 space-y-4">

          {/* Geometría */}
          <Card title="📐 Geometría">
            <div className="grid grid-cols-2 gap-2">
              <Field label="b — Ancho" id="b" value={form.b} unit="cm" onChange={v => set("b", v)} />
              <Field label="h — Alto" id="h" value={form.h} unit="cm" onChange={v => set("h", v)} />
              <Field label="r — Recubrimiento" id="r" value={form.r} unit="cm" onChange={v => set("r", v)} />
              <div className="col-span-2">
                <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">d (calculado)</label>
                <div className="px-3 py-2 bg-bg-elevated border border-bg-border rounded-lg text-xs font-mono text-accent-blue">
                  d = {+form.h - +form.r || "—"} cm
                </div>
              </div>
            </div>
          </Card>

          {/* Materiales */}
          <Card title="🧱 Materiales">
            <div className="grid grid-cols-2 gap-2">
              <SelectField label="f'c" value={form.fc} unit="kgf/cm²" onChange={v => { set("fc", v); }}>
                {FC_OPTS.map(v => <option key={v} value={v}>{v}</option>)}
              </SelectField>
              <div>
                <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">β</label>
                <div className="px-3 py-2 bg-bg-elevated border border-bg-border rounded-lg text-xs font-mono text-accent-blue">
                  {getBeta(+form.fc).toFixed(2)}
                </div>
              </div>
              <SelectField label="fy" value={form.fy} unit="kgf/cm²" onChange={v => set("fy", v)}>
                {FY_OPTS.map(v => <option key={v} value={v}>{v}</option>)}
              </SelectField>
            </div>
          </Card>

          {/* Armadura */}
          <Card title="🔩 Armadura">
            <div className="flex gap-1 mb-3">
              {(["barras", "area"] as const).map(m => (
                <button key={m} onClick={() => set("modoAs", m)}
                  className={cn("flex-1 text-xs py-1.5 rounded-lg border transition-all", form.modoAs === m ? "bg-accent-blue/15 text-accent-blue border-accent-blue/30 font-medium" : "text-text-muted border-bg-border hover:text-text-secondary")}>
                  {m === "barras" ? "Por barras" : "Área directa"}
                </button>
              ))}
            </div>
            {form.modoAs === "barras" ? (
              <div className="grid grid-cols-2 gap-2">
                <Field label="nb — N° barras" id="nb" value={form.nb} onChange={v => { set("nb", v); calcAsPreview(); }} />
                <SelectField label="φ diámetro" value={form.phi} unit="mm" onChange={v => { set("phi", v); calcAsPreview(); }}>
                  {PHI_OPTS.map(v => <option key={v} value={v}>{v}</option>)}
                </SelectField>
                {asPreview && (
                  <div className="col-span-2 px-3 py-2 bg-accent-blue/10 border border-accent-blue/20 rounded-lg text-xs font-mono text-accent-blue">
                    {asPreview}
                  </div>
                )}
              </div>
            ) : (
              <Field label="As — Área directa" id="As_direct" value={form.As_direct} unit="cm²" onChange={v => set("As_direct", v)} />
            )}
          </Card>

          {/* Verificación */}
          <Card title="✅ Verificación (opcional)">
            <Field label="Mu — Momento último" id="Mu" value={form.Mu} unit="tf·m" onChange={v => set("Mu", v)} />
          </Card>

          <button onClick={calcular}
            className="w-full py-3 bg-accent-blue text-white font-semibold rounded-xl hover:bg-blue-600 active:bg-blue-700 transition-colors text-sm">
            ⚡ Calcular
          </button>
        </div>

        {/* Panel derecho */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-bg-elevated flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-text-muted" />
              </div>
              <p className="text-text-muted text-sm">Ingresa los datos y presiona <span className="text-accent-blue font-medium">Calcular</span></p>
            </div>
          ) : (
            <>
              {/* SVG visualizadores */}
              <div className="grid grid-cols-3 gap-4">
                <VizCard title="Sección transversal">
                  <SeccionTransversal b={+form.b} h={+form.h} d={+form.h - +form.r} a={result.a} nb={form.modoAs==="barras" ? +form.nb : 4} zona={result.zona} width={220} height={260} />
                </VizCard>
                <VizCard title="Deformaciones">
                  <DiagramaDeformaciones h={+form.h} d={+form.h - +form.r} c={result.c} eps_s={result.eps_s} eps_y={result.eps_y} zona={result.zona} width={220} height={260} />
                </VizCard>
                <VizCard title="Fuerzas internas">
                  <DiagramaFuerzas b={+form.b} h={+form.h} d={+form.h - +form.r} a={result.a} C={result.C} T={result.T} brazo={result.brazo} width={220} height={260} />
                </VizCard>
              </div>

              {/* Modo de falla */}
              <FallaBadge zona={result.zona} phi={result.phi} eps_s={result.eps_s} eps_y={result.eps_y} />

              {/* Resultados */}
              <div className="bg-bg-card border border-bg-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-4">Resultados</h3>
                <ResultRow items={[
                  { label: "As", value: result.As.toFixed(3), unit: "cm²" },
                  { label: "d (peralte efectivo)", value: result.d.toFixed(2), unit: "cm" },
                  { label: "β₁", value: result.beta.toFixed(3) },
                  { label: "a (bloque)", value: result.a.toFixed(3), unit: "cm" },
                  { label: "c (eje neutro)", value: result.c.toFixed(3), unit: "cm" },
                  { label: "εs", value: result.eps_s.toFixed(5) },
                  { label: "εy", value: result.eps_y.toFixed(5) },
                  { label: "φ", value: result.phi.toFixed(2) },
                  { label: "Mn", value: result.Mn.toFixed(4), unit: "tf·m", highlight: true },
                  { label: "φMn", value: result.phiMn.toFixed(4), unit: "tf·m", highlight: true },
                  ...(form.Mu ? [
                    { label: result.verifica ? "✅ φMn ≥ Mu" : "❌ φMn < Mu", value: (result.phiMn / +form.Mu).toFixed(3), unit: "ratio", highlight: true }
                  ] : []),
                ]} />
              </div>

              {/* Cuantías */}
              <div className="bg-bg-card border border-bg-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-3">Verificación de cuantías</h3>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  {[
                    { label: "ρ actual", value: result.rho.toFixed(6), color: "text-text-primary" },
                    { label: "ρ mínimo", value: result.rho_min.toFixed(6), color: result.rho_ok_min ? "text-accent-green" : "text-accent-red" },
                    { label: "ρ máximo", value: result.rho_max.toFixed(6), color: result.rho_ok_max ? "text-accent-green" : "text-accent-red" },
                  ].map(item => (
                    <div key={item.label} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
                      <div className="text-text-muted mb-1">{item.label}</div>
                      <div className={cn("font-mono font-bold", item.color)}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pasos */}
              <div className="bg-bg-card border border-bg-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-text-primary mb-4">Proceso paso a paso</h3>
                <div className="space-y-2">
                  <StepCard num={1} title="Área de acero As" result={`As = ${result.As.toFixed(3)} cm²`}
                    planteamiento={form.modoAs==="barras" ? `${form.nb} barras ϕ${form.phi}mm` : "Área ingresada directamente"}
                    ecuacion={form.modoAs==="barras" ? `As = nb × π × φ² / 4\nAs = ${form.nb} × π × ${(+form.phi/10).toFixed(1)}² / 4 = ${result.As.toFixed(3)} cm²` : `As = ${result.As.toFixed(3)} cm²`}
                    conclusion={{ tipo:"ok", texto:`As = ${result.As.toFixed(3)} cm²` }} />
                  <StepCard num={2} title="Profundidad del bloque a" result={`a = ${result.a.toFixed(3)} cm`}
                    planteamiento="Equilibrio de fuerzas horizontales: C = T → 0.85·f'c·a·b = As·fy"
                    ecuacion={`a = As × fy / (0.85 × f'c × b)\na = ${result.As.toFixed(3)} × ${form.fy} / (0.85 × ${form.fc} × ${form.b})\na = ${result.a.toFixed(3)} cm`}
                    conclusion={{ tipo:"ok", texto:`a = ${result.a.toFixed(3)} cm` }} />
                  <StepCard num={3} title="Eje neutro c" result={`c = ${result.c.toFixed(3)} cm`}
                    planteamiento="El eje neutro se obtiene dividiendo el bloque de compresión a por el factor β₁ (ACI 318)"
                    ecuacion={`c = a / β₁\nc = ${result.a.toFixed(3)} / ${result.beta.toFixed(3)}\nc = ${result.c.toFixed(3)} cm`}
                    conclusion={{ tipo:"ok", texto:`c = ${result.c.toFixed(3)} cm` }} />
                  <StepCard num={4} title="Deformación del acero εs" result={`εs = ${result.eps_s.toFixed(5)}`}
                    planteamiento="Por compatibilidad de deformaciones planas: el diagrama es lineal. Se usan triángulos semejantes."
                    ecuacion={`εs = εcu × (d - c) / c\nεs = 0.003 × (${result.d.toFixed(2)} - ${result.c.toFixed(3)}) / ${result.c.toFixed(3)}\nεs = ${result.eps_s.toFixed(5)}\nεy = fy/Es = ${+form.fy}/210000 = ${result.eps_y.toFixed(5)}`}
                    conclusion={{ tipo: result.eps_s >= result.eps_y ? "ok" : "err", texto: result.eps_s >= result.eps_y ? `✓ εs (${result.eps_s.toFixed(5)}) ≥ εy → acero fluye` : `✗ εs < εy → falla frágil` }} />
                  <StepCard num={5} title="Factor φ y zona de falla" result={`φ = ${result.phi.toFixed(2)} | ${result.zona}`}
                    planteamiento={`ACI 318-19 §21.2: φ depende de εt.\nεt ≥ 0.005 → Zona dúctil → φ = 0.90\nεy < εt < 0.005 → Transición → φ interpolado\nεt ≤ εy → Zona frágil → φ = 0.65`}
                    ecuacion={`εt = εs = ${result.eps_s.toFixed(5)}\n${result.zona==="transicion" ? `φ = 0.65 + (εt - εy)/(0.005 - εy) × 0.25\nφ = ${result.phi.toFixed(2)}` : `φ = ${result.phi.toFixed(2)}`}`}
                    conclusion={{ tipo: result.zona==="ductil"?"ok":result.zona==="transicion"?"warn":"err", texto: `φ = ${result.phi.toFixed(2)} | Zona ${result.zona}` }} />
                  <StepCard num={6} title="Momento nominal Mn y reducido φMn" result={`Mn = ${result.Mn.toFixed(4)} tf·m | φMn = ${result.phiMn.toFixed(4)} tf·m`}
                    planteamiento="Mn se calcula tomando momentos de la fuerza de tracción T respecto al centroide del bloque de compresión."
                    ecuacion={`Mn = As × fy × (d - a/2) / 100000\nMn = ${result.As.toFixed(3)} × ${form.fy} × (${result.d.toFixed(2)} - ${(result.a/2).toFixed(3)}) / 100000\nMn = ${result.Mn.toFixed(4)} tf·m\nφMn = ${result.phi.toFixed(2)} × ${result.Mn.toFixed(4)} = ${result.phiMn.toFixed(4)} tf·m`}
                    conclusion={{ tipo:"ok", texto:`φMn = ${result.phiMn.toFixed(4)} tf·m` }} />
                  {form.Mu && (
                    <StepCard num={7} title="Verificación φMn ≥ Mu" result={result.verifica ? "✅ CUMPLE" : "❌ NO CUMPLE"}
                      planteamiento="La sección resiste si la capacidad reducida φMn supera el momento de diseño Mu."
                      ecuacion={`φMn = ${result.phiMn.toFixed(4)} tf·m\nMu  = ${form.Mu} tf·m\nRatio = ${(result.phiMn/+form.Mu).toFixed(3)}`}
                      conclusion={{ tipo: result.verifica ? "ok" : "err", texto: result.verifica ? `✅ φMn ≥ Mu (ratio = ${(result.phiMn/+form.Mu).toFixed(3)})` : `❌ φMn < Mu — Aumentar sección o armadura` }} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helpers UI ──────────────────────────────────────────────
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-card border border-bg-border rounded-xl p-4">
      <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, id, value, unit, onChange }: { label: string; id: string; value: string; unit?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">{label}</label>
      <div className="flex">
        <input id={id} type="number" value={value} onChange={e => onChange(e.target.value)} step="any"
          className="flex-1 px-3 py-2 bg-bg-elevated border border-bg-border border-r-0 rounded-l-lg text-xs font-mono text-text-primary focus:outline-none focus:border-accent-blue/50 min-w-0" />
        {unit && <span className="px-2 py-2 bg-bg-elevated border border-bg-border rounded-r-lg text-[10px] text-text-muted border-l-0 whitespace-nowrap">{unit}</span>}
      </div>
    </div>
  );
}

function SelectField({ label, value, unit, onChange, children }: { label: string; value: string; unit?: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] text-text-muted uppercase tracking-wide block mb-1">{label}{unit ? ` (${unit})` : ""}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-bg-elevated border border-bg-border rounded-lg text-xs font-mono text-text-primary focus:outline-none focus:border-accent-blue/50">
        {children}
      </select>
    </div>
  );
}

function VizCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-bg-border bg-bg-elevated">
        <p className="text-xs font-medium text-text-secondary">{title}</p>
      </div>
      <div className="p-3 flex items-center justify-center h-[270px]">{children}</div>
    </div>
  );
}
