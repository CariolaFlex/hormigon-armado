"use client";

import { useState, useCallback } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { analizarDobleArmadura, calcAs, BARRAS } from "@/lib/hormigon/flexion";
import { SeccionDobleArmadura } from "@/components/svg/SeccionDobleArmadura";
import { DeformacionesDobleArmadura } from "@/components/svg/DeformacionesDobleArmadura";
import { DescomposicionVigas } from "@/components/svg/DescomposicionVigas";
import { FallaBadge } from "@/components/calculadora/FallaBadge";
import { ResultRow } from "@/components/calculadora/ResultRow";
import { StepCard } from "@/components/calculadora/StepCard";
import type { ZonaFalla } from "@/types/index";

const PHI_OPTS = Object.keys(BARRAS).map(Number);

interface FormState {
  b: string; h: string; d: string; d_prima: string;
  fc: string; fy: string;
  nb: string; phi: string;
  nb_prima: string; phi_prima: string;
  Mu: string;
}

const DEFAULT: FormState = {
  b: "30", h: "60", d: "54", d_prima: "6",
  fc: "200", fy: "4200",
  nb: "4", phi: "22",
  nb_prima: "2", phi_prima: "16",
  Mu: "",
};

export default function DobleArmaduraPage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [result, setResult] = useState<ReturnType<typeof analizarDobleArmadura> | null>(null);

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const calcular = useCallback(() => {
    const { b, h, d, d_prima, fc, fy, nb, phi, nb_prima, phi_prima, Mu } = form;
    if (!b || !h || !d || !fc || !fy) return;
    const res = analizarDobleArmadura({
      b: +b, h: +h, d: +d, d_prima: +d_prima,
      fc: +fc, fy: +fy,
      nb: +nb, phi_mm: +phi,
      nb_prima: +nb_prima, phi_prima_mm: +phi_prima,
      Mu: Mu ? +Mu : null,
    });
    setResult(res);
  }, [form]);

  const loadEj = () => {
    setForm({ b:"30", h:"65", d:"58", d_prima:"7", fc:"210", fy:"4200", nb:"5", phi:"25", nb_prima:"2", phi_prima:"16", Mu:"" });
    setTimeout(calcular, 50);
  };

  const zona = result?.zona ?? "ductil";
  const accentMap: Record<ZonaFalla, string> = { ductil: "text-accent-green", transicion: "text-accent-amber", fragil: "text-accent-red" };
  const borderMap: Record<ZonaFalla, string> = { ductil: "border-accent-green/30", transicion: "border-accent-amber/30", fragil: "border-accent-red/30" };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-green/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Análisis — Doble Armadura (As + A&apos;s)</h1>
            <p className="text-xs text-text-muted">Acero en tracción y compresión · ACI 318-19 · NCh430</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Panel izquierdo */}
        <aside className="w-80 border-r border-bg-border bg-bg-panel flex flex-col overflow-y-auto">
          <div className="p-5 space-y-4 flex-1">

            <Card title="Geometría">
              <div className="grid grid-cols-2 gap-2">
                <Field label="b (cm)" value={form.b} onChange={v => set("b", v)}/>
                <Field label="h (cm)" value={form.h} onChange={v => set("h", v)}/>
                <Field label="d (cm)" value={form.d} onChange={v => set("d", v)}/>
                <Field label="d' (cm)" value={form.d_prima} onChange={v => set("d_prima", v)}/>
              </div>
            </Card>

            <Card title="Materiales">
              <div className="grid grid-cols-2 gap-2">
                <SelectField label="f'c (kgf/cm²)" value={form.fc} onChange={v => set("fc", v)}
                  opts={[140,175,200,210,250,280,350].map(String)}/>
                <SelectField label="fy (kgf/cm²)" value={form.fy} onChange={v => set("fy", v)}
                  opts={["2800","4200","5000","6000"]}/>
              </div>
            </Card>

            <Card title="Acero Tracción (As)">
              <div className="grid grid-cols-2 gap-2">
                <Field label="N° barras" value={form.nb} onChange={v => set("nb", v)} type="number"/>
                <SelectField label="φ (mm)" value={form.phi} onChange={v => set("phi", v)}
                  opts={PHI_OPTS.map(String)}/>
              </div>
              {form.nb && form.phi && (
                <p className="text-xs text-text-muted mt-1">As = {calcAs(+form.nb, +form.phi).toFixed(2)} cm²</p>
              )}
            </Card>

            <Card title="Acero Compresión (A's)">
              <div className="grid grid-cols-2 gap-2">
                <Field label="N° barras" value={form.nb_prima} onChange={v => set("nb_prima", v)} type="number"/>
                <SelectField label="φ (mm)" value={form.phi_prima} onChange={v => set("phi_prima", v)}
                  opts={PHI_OPTS.map(String)}/>
              </div>
              {form.nb_prima && form.phi_prima && (
                <p className="text-xs text-text-muted mt-1">A&apos;s = {calcAs(+form.nb_prima, +form.phi_prima).toFixed(2)} cm²</p>
              )}
            </Card>

            <Card title="Verificación (opcional)">
              <Field label="Mu (tf·m)" value={form.Mu} onChange={v => set("Mu", v)} placeholder="dejar vacío si no aplica"/>
            </Card>
          </div>

          <div className="p-5 border-t border-bg-border space-y-2">
            <button onClick={calcular}
              className="w-full h-10 rounded-lg bg-accent-green text-black text-sm font-semibold hover:bg-accent-green/90 transition-colors">
              Calcular
            </button>
            <button onClick={loadEj}
              className="w-full h-9 rounded-lg border border-bg-border text-text-muted text-xs hover:bg-bg-elevated transition-colors">
              Cargar ejemplo
            </button>
          </div>
        </aside>

        {/* Panel derecho */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted">
              <Calculator className="w-12 h-12 mb-3 opacity-30"/>
              <p className="text-sm">Ingresa los datos y presiona <span className="text-accent-green font-semibold">Calcular</span></p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <VizCard title="Sección Transversal" accent="green">
                  <SeccionDobleArmadura
                    b={+form.b} h={+form.h} d={+form.d} d_prima={+form.d_prima}
                    nb={+form.nb} nb_prima={+form.nb_prima}
                    a={result.a} c={result.c} zona={result.zona}
                    fluye_prima={result.fluye_prima}
                    width={180} height={260}
                  />
                </VizCard>
                <VizCard title="Deformaciones" accent="green">
                  <DeformacionesDobleArmadura
                    h={+form.h} d={+form.d} d_prima={+form.d_prima}
                    c={result.c} eps_s={result.eps_s} eps_s_prima={result.eps_s_prima}
                    eps_y={result.eps_y} zona={result.zona} fluye_prima={result.fluye_prima}
                    width={180} height={260}
                  />
                </VizCard>
                <VizCard title="Descomposición" accent="green">
                  <DescomposicionVigas
                    Mn1={result.Mn1} Mn2={result.Mn2} Mn={result.Mn}
                    As={result.As} As_prima={result.As_prima}
                    width={220} height={260}
                  />
                </VizCard>
              </div>

              <FallaBadge zona={result.zona} phi={result.phi} eps_s={result.eps_s} eps_y={result.eps_y}/>

              {result.verifica !== undefined && (
                <div className={cn(
                  "rounded-xl border px-5 py-3 flex items-center gap-3",
                  result.verifica ? "border-accent-green/30 bg-accent-green/5" : "border-accent-red/30 bg-accent-red/5"
                )}>
                  <span className={result.verifica ? "text-accent-green" : "text-accent-red"}>
                    {result.verifica ? "✓ VERIFICA" : "✗ NO VERIFICA"}
                  </span>
                  <span className="text-text-muted text-sm">
                    φMn = {result.phiMn.toFixed(3)} tf·m
                    {form.Mu ? ` vs Mu = ${form.Mu} tf·m` : ""}
                  </span>
                </div>
              )}

              <div className={cn("rounded-xl border bg-bg-card p-5", borderMap[zona])}>
                <h3 className={cn("text-sm font-semibold mb-3", accentMap[zona])}>Armaduras</h3>
                <ResultRow items={[
                  { label: "As (tracción)", value: result.As.toFixed(3), unit: "cm²", highlight: true },
                  { label: "A's (compresión)", value: result.As_prima.toFixed(3), unit: "cm²", highlight: true },
                  { label: "β₁", value: result.beta.toFixed(3) },
                  { label: "a", value: result.a.toFixed(3), unit: "cm" },
                  { label: "c", value: result.c.toFixed(3), unit: "cm" },
                  { label: "ε's (compresión)", value: result.eps_s_prima.toFixed(5) },
                  { label: "fs'", value: result.fs_prima.toFixed(1), unit: "kgf/cm²" },
                  { label: "A's fluye", value: result.fluye_prima ? "Sí ✓" : "No ✗" },
                ]}/>
              </div>

              <div className={cn("rounded-xl border bg-bg-card p-5", borderMap[zona])}>
                <h3 className={cn("text-sm font-semibold mb-3", accentMap[zona])}>Momento Resistente</h3>
                <ResultRow items={[
                  { label: "Mn₁ (viga 1)", value: result.Mn1.toFixed(3), unit: "tf·m" },
                  { label: "Mn₂ (viga 2)", value: result.Mn2.toFixed(3), unit: "tf·m" },
                  { label: "Mn total", value: result.Mn.toFixed(3), unit: "tf·m", highlight: true },
                  { label: "φ", value: result.phi.toFixed(3) },
                  { label: "φMn", value: result.phiMn.toFixed(3), unit: "tf·m", highlight: true },
                ]}/>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-text-secondary px-1">Desarrollo paso a paso</h3>

                <StepCard num={1} title="Área de acero en tracción y compresión"
                  result="Ver resultado"
                  planteamiento="Se calcula As (acero de tracción, zona inferior) y A's (acero de compresión, zona superior)."
                  ecuacion={`As = ${result.As.toFixed(3)} cm² | A's = ${result.As_prima.toFixed(3)} cm²`}
                  conclusion={{tipo:"info", texto:"La doble armadura permite resistir mayores momentos sin aumentar la sección."}}/>

                <StepCard num={2} title="Factor β₁ y bloque de compresión"
                  result="Ver resultado"
                  planteamiento="Se obtiene β₁ según f'c (ACI 318-19). Se resuelve el equilibrio de fuerzas horizontales considerando la contribución del A's."
                  ecuacion={`β₁ = ${result.beta.toFixed(3)} | a = (As·fy - A's·fs') / (0.85·f'c·b) = ${result.a.toFixed(3)} cm | c = ${result.c.toFixed(3)} cm`}
                  conclusion={{tipo:"info", texto:`Si A's no fluye (ε's < εy), se itera c hasta convergencia. En este caso A's ${result.fluye_prima ? "fluye ✓" : "NO fluye → fs' = " + result.fs_prima.toFixed(0) + " kgf/cm²"}`}}/>

                <StepCard num={3} title="Deformación del acero de compresión"
                  result="Ver resultado"
                  planteamiento="Con compatibilidad de deformaciones (εcu = 0.003), se obtiene ε's en la armadura de compresión."
                  ecuacion={`ε's = εcu·(c - d') / c = 0.003·(${result.c.toFixed(2)} - ${form.d_prima}) / ${result.c.toFixed(2)} = ${result.eps_s_prima.toFixed(5)}`}
                  conclusion={{tipo:"info", texto:`ε's ${result.fluye_prima ? "≥" : "<"} εy = ${result.eps_y.toFixed(5)} → A's ${result.fluye_prima ? "fluye" : "no fluye"} | fs' = ${result.fs_prima.toFixed(0)} kgf/cm²`}}/>

                <StepCard num={4} title="Deformación del acero de tracción"
                  result="Ver resultado"
                  planteamiento="Se verifica que εs ≥ εy (el acero de tracción debe fluir en todo caso). Se determina la zona de falla."
                  ecuacion={`εs = εcu·(d - c) / c = 0.003·(${form.d} - ${result.c.toFixed(2)}) / ${result.c.toFixed(2)} = ${result.eps_s.toFixed(5)}`}
                  conclusion={{tipo:"info", texto:`Zona: ${result.zona} → φ = ${result.phi.toFixed(3)}`}}/>

                <StepCard num={5} title="Descomposición en Viga 1 + Viga 2"
                  result="Ver resultado"
                  planteamiento="La doble armadura se descompone en dos vigas equivalentes."
                  ecuacion={`Viga 1: (As-A's)·fy → Mn₁ = ${result.Mn1.toFixed(3)} tf·m | Viga 2: A's·fs' → par → Mn₂ = ${result.Mn2.toFixed(3)} tf·m`}
                  conclusion={{tipo:"info", texto:"Mn₁ es el momento del bloque de Whitney; Mn₂ es el par de fuerzas As'·d_par."}}/>

                <StepCard num={6} title="Momento nominal y de diseño"
                  result="Ver resultado"
                  planteamiento="El momento resistente total es la suma de las dos vigas."
                  ecuacion={`Mn = Mn₁ + Mn₂ = ${result.Mn1.toFixed(3)} + ${result.Mn2.toFixed(3)} = ${result.Mn.toFixed(3)} tf·m | φMn = ${result.phi.toFixed(3)} × ${result.Mn.toFixed(3)} = ${result.phiMn.toFixed(3)} tf·m`}
                  conclusion={{tipo:"info", texto:result.verifica !== undefined
                    ? (result.verifica ? `φMn ≥ Mu → VERIFICA ✓` : `φMn < Mu → NO VERIFICA ✗`)
                    : `phiMn = ${result.phiMn.toFixed(3)} tf*m`}}/>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Helpers locales ──────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-bg-border bg-bg-card p-4 space-y-3">
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = "number", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-text-muted">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)}
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-green/60"/>
    </div>
  );
}

function SelectField({ label, value, onChange, opts }: {
  label: string; value: string; onChange: (v: string) => void; opts: string[];
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-text-muted">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-green/60">
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function VizCard({ title, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-accent-green/20 bg-bg-card p-3">
      <p className="text-xs text-text-muted mb-2 text-center">{title}</p>
      <div className="flex items-center justify-center" style={{ height: 220 }}>
        {children}
      </div>
    </div>
  );
}
