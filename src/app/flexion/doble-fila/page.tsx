"use client";

import { useState, useCallback } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { analizarDobleFila, calcAs, BARRAS } from "@/lib/hormigon/flexion";
import { SeccionDobleFila } from "@/components/svg/SeccionDobleFila";
import { DeformacionesDobleFila } from "@/components/svg/DeformacionesDobleFila";
import { ComparacionMetodos } from "@/components/svg/ComparacionMetodos";
import { FallaBadge } from "@/components/calculadora/FallaBadge";
import { ResultRow } from "@/components/calculadora/ResultRow";
import { StepCard } from "@/components/calculadora/StepCard";
import type { ZonaFalla } from "@/types/index";

const PHI_OPTS = Object.keys(BARRAS).map(Number);

interface FormState {
  b: string; h: string; r_inf: string;
  fc: string; fy: string;
  nb1: string; phi1: string;
  nb2: string; phi2: string;
  sep_vert: string;
  Mu: string;
}

const DEFAULT: FormState = {
  b: "30", h: "60", r_inf: "4",
  fc: "200", fy: "4200",
  nb1: "3", phi1: "22",
  nb2: "2", phi2: "22",
  sep_vert: "25",
  Mu: "",
};

export default function DobleFilaPage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [result, setResult] = useState<ReturnType<typeof analizarDobleFila> | null>(null);

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const calcular = useCallback(() => {
    const { b, h, r_inf, fc, fy, nb1, phi1, nb2, phi2, sep_vert, Mu } = form;
    if (!b || !h || !fc || !fy) return;
    const res = analizarDobleFila({
      b: +b, h: +h, r_inf: +r_inf,
      fc: +fc, fy: +fy,
      nb1: +nb1, phi1_mm: +phi1,
      nb2: +nb2, phi2_mm: +phi2,
      sep_vert_mm: +sep_vert,
      Mu: Mu ? +Mu : null,
    });
    setResult(res);
  }, [form]);

  const loadEj = () => {
    setForm({ b:"20", h:"50", r_inf:"5", fc:"200", fy:"4200", nb1:"3", phi1:"18", nb2:"3", phi2:"18", sep_vert:"25", Mu:"" });
    const res = analizarDobleFila({
      b:20, h:50, r_inf:5, fc:200, fy:4200,
      nb1:3, phi1_mm:18, nb2:3, phi2_mm:18,
      sep_vert_mm:25, Mu: null,
    });
    setResult(res);
  };

  const zona = result?.zona ?? "ductil";
  const accentMap: Record<ZonaFalla, string> = { ductil: "text-accent-green", transicion: "text-accent-amber", fragil: "text-accent-red" };
  const borderMap: Record<ZonaFalla, string> = { ductil: "border-accent-green/30", transicion: "border-accent-amber/30", fragil: "border-accent-red/30" };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-amber/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent-amber" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Análisis — Doble Fila de Acero</h1>
            <p className="text-xs text-text-muted">Distancia efectiva equivalente · ACI 318-19 · NCh430</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Panel izquierdo */}
        <aside className="w-80 border-r border-bg-border bg-bg-panel flex flex-col overflow-y-auto">
          <div className="p-5 space-y-4 flex-1">

            {/* Geometría */}
            <Card title="Geometría">
              <div className="grid grid-cols-3 gap-2">
                <Field label="b (cm)" value={form.b} onChange={v => set("b", v)}/>
                <Field label="h (cm)" value={form.h} onChange={v => set("h", v)}/>
                <Field label="r inf (cm)" value={form.r_inf} onChange={v => set("r_inf", v)}/>
              </div>
            </Card>

            {/* Materiales */}
            <Card title="Materiales">
              <div className="grid grid-cols-2 gap-2">
                <SelectField label="f'c (kgf/cm²)" value={form.fc} onChange={v => set("fc", v)}
                  opts={[140,175,200,210,250,280,350].map(String)}/>
                <SelectField label="fy (kgf/cm²)" value={form.fy} onChange={v => set("fy", v)}
                  opts={["2800","4200","5000","6000"]}/>
              </div>
            </Card>

            {/* Fila inferior */}
            <Card title="Fila Inferior (As₁)">
              <div className="grid grid-cols-2 gap-2">
                <Field label="N° barras" value={form.nb1} onChange={v => set("nb1", v)} type="number"/>
                <SelectField label="φ (mm)" value={form.phi1} onChange={v => set("phi1", v)}
                  opts={PHI_OPTS.map(String)}/>
              </div>
              {form.nb1 && form.phi1 && (
                <p className="text-xs text-text-muted mt-1">
                  As₁ = {calcAs(+form.nb1, +form.phi1).toFixed(2)} cm²
                </p>
              )}
            </Card>

            {/* Fila superior */}
            <Card title="Fila Superior (As₂)">
              <div className="grid grid-cols-2 gap-2">
                <Field label="N° barras" value={form.nb2} onChange={v => set("nb2", v)} type="number"/>
                <SelectField label="φ (mm)" value={form.phi2} onChange={v => set("phi2", v)}
                  opts={PHI_OPTS.map(String)}/>
              </div>
              {form.nb2 && form.phi2 && (
                <p className="text-xs text-text-muted mt-1">
                  As₂ = {calcAs(+form.nb2, +form.phi2).toFixed(2)} cm²
                </p>
              )}
            </Card>

            {/* Separación vertical */}
            <Card title="Configuración">
              <Field label="Separación vertical entre filas (mm)" value={form.sep_vert} onChange={v => set("sep_vert", v)}/>
            </Card>

            {/* Verificación opcional */}
            <Card title="Verificación (opcional)">
              <Field label="Mu (tf·m)" value={form.Mu} onChange={v => set("Mu", v)} placeholder="dejar vacío si no aplica"/>
            </Card>
          </div>

          {/* Botones */}
          <div className="p-5 border-t border-bg-border space-y-2">
            <button onClick={calcular}
              className="w-full h-10 rounded-lg bg-accent-amber text-black text-sm font-semibold hover:bg-accent-amber/90 transition-colors">
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
              <p className="text-sm">Ingresa los datos y presiona <span className="text-accent-amber font-semibold">Calcular</span></p>
            </div>
          ) : (
            <>
              {/* SVG visualizaciones */}
              <div className="grid grid-cols-3 gap-4">
                <VizCard title="Sección Transversal" accent="amber">
                  <SeccionDobleFila
                    b={+form.b} h={+form.h}
                    d1={result.d1} d2={result.d2}
                    nb1={+form.nb1} nb2={+form.nb2}
                    a={result.a} c={result.c}
                    zona={result.zona}
                    width={180} height={260}
                  />
                </VizCard>
                <VizCard title="Deformaciones" accent="amber">
                  <DeformacionesDobleFila
                    h={+form.h} d1={result.d_eq} d2={result.d2}
                    c={result.c}
                    eps_s1={result.eps_s1} eps_s2={result.eps_s2}
                    eps_y={result.eps_y}
                    zona={result.zona}
                    width={180} height={260}
                  />
                </VizCard>
                <VizCard title="Comparación Métodos" accent="amber">
                  <ComparacionMetodos
                    Mn={result.Mn} Mn_aprox={result.Mn_aprox} phiMn={result.phiMn}
                    Mu={form.Mu ? +form.Mu : null}
                    width={220} height={260}
                  />
                </VizCard>
              </div>

              {/* Badge zona */}
              <FallaBadge zona={result.zona} phi={result.phi} eps_s={result.eps_s1} eps_y={result.eps_y}/>

              {/* Verificación Mu */}
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

              {/* Geometría de la armadura */}
              <div className={cn("rounded-xl border bg-bg-card p-5", borderMap[zona])}>
                <h3 className={cn("text-sm font-semibold mb-3", accentMap[zona])}>Geometría de la Armadura</h3>
                <ResultRow items={[
                  { label: "As₁ (fila inf.)", value: result.As1.toFixed(3), unit: "cm²", highlight: true },
                  { label: "As₂ (fila sup.)", value: result.As2.toFixed(3), unit: "cm²" },
                  { label: "As total", value: result.As.toFixed(3), unit: "cm²", highlight: true },
                  { label: "d₁ (fila inf.)", value: result.d1.toFixed(2), unit: "cm" },
                  { label: "d₂ (fila sup.)", value: result.d2.toFixed(2), unit: "cm" },
                  { label: "d eq.", value: result.d_eq.toFixed(2), unit: "cm", highlight: true },
                ]}/>
              </div>

              {/* Bloque de Whitney */}
              <div className={cn("rounded-xl border bg-bg-card p-5", borderMap[zona])}>
                <h3 className={cn("text-sm font-semibold mb-3", accentMap[zona])}>Bloque de Whitney</h3>
                <ResultRow items={[
                  { label: "β₁", value: result.beta.toFixed(3) },
                  { label: "a", value: result.a.toFixed(3), unit: "cm", highlight: true },
                  { label: "c (eje neutro)", value: result.c.toFixed(3), unit: "cm", highlight: true },
                  { label: "εs₁", value: result.eps_s1.toFixed(5) },
                  { label: "εs₂", value: result.eps_s2.toFixed(5) },
                  { label: "εy", value: result.eps_y.toFixed(5) },
                ]}/>
              </div>

              {/* Momento resistente */}
              <div className={cn("rounded-xl border bg-bg-card p-5", borderMap[zona])}>
                <h3 className={cn("text-sm font-semibold mb-3", accentMap[zona])}>Momento Resistente</h3>
                <ResultRow items={[
                  { label: "Mn exacto", value: result.Mn.toFixed(3), unit: "tf·m", highlight: true },
                  { label: "Mn aprox.", value: result.Mn_aprox.toFixed(3), unit: "tf·m" },
                  { label: "φ", value: result.phi.toFixed(3) },
                  { label: "φMn", value: result.phiMn.toFixed(3), unit: "tf·m", highlight: true },
                  { label: "Fluye fila 1", value: result.fluye1 ? "Sí ✓" : "No ✗" },
                  { label: "Fluye fila 2", value: result.fluye2 ? "Sí ✓" : "No ✗" },
                ]}/>
              </div>

              {/* Pasos */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-text-secondary px-1">Desarrollo paso a paso</h3>

                <StepCard num={1} title="Área de acero por fila"
                  result="Ver resultado"
                  planteamiento="Se calcula As₁ (fila inferior) y As₂ (fila superior) con la fórmula π/4 · φ² · n."
                  ecuacion={`As₁ = ${result.As1.toFixed(3)} cm² | As₂ = ${result.As2.toFixed(3)} cm² | As = ${result.As.toFixed(3)} cm²`}
                  conclusion={{tipo:"info", texto:"El acero total es la suma de ambas filas."}}/>

                <StepCard num={2} title="Distancia efectiva equivalente"
                  result="Ver resultado"
                  planteamiento="Para doble fila se calcula d_eq ponderado por áreas, que representa el centroide del acero total."
                  ecuacion={`d_eq = (As₁·d₁ + As₂·d₂) / As = (${result.As1.toFixed(2)}·${result.d1.toFixed(2)} + ${result.As2.toFixed(2)}·${result.d2.toFixed(2)}) / ${result.As.toFixed(2)} = ${result.d_eq.toFixed(3)} cm`}
                  conclusion={{tipo:"info", texto:"La distancia equivalente d_eq se usa para calcular el bloque de compresión."}}/>

                <StepCard num={3} title="Factor β₁ y bloque de compresión"
                  result="Ver resultado"
                  planteamiento="El factor β₁ depende de f'c según ACI 318-19 (tabla 22.2.2.4.3). Luego a = As·fy / (0.85·f'c·b)."
                  ecuacion={`β₁ = ${result.beta.toFixed(3)} | a = ${result.As.toFixed(2)}·${form.fy} / (0.85·${form.fc}·${form.b}) = ${result.a.toFixed(3)} cm | c = ${result.c.toFixed(3)} cm`}
                  conclusion={{tipo:"info", texto:`Eje neutro ubicado a c = ${result.c.toFixed(2)} cm desde la fibra más comprimida.`}}/>

                <StepCard num={4} title="Deformaciones unitarias"
                  result="Ver resultado"
                  planteamiento="Con compatibilidad de deformaciones (εcu = 0.003) se obtienen εs₁ y εs₂ para cada fila."
                  ecuacion={`εs₁ = εcu·(d₁-c)/c = 0.003·(${result.d1.toFixed(2)}-${result.c.toFixed(2)})/${result.c.toFixed(2)} = ${result.eps_s1.toFixed(5)} | εs₂ = ${result.eps_s2.toFixed(5)}`}
                  conclusion={{tipo:"info", texto:`Fila 1 ${result.fluye1 ? "fluye ✓" : "NO fluye ✗"} | Fila 2 ${result.fluye2 ? "fluye ✓" : "NO fluye ✗"} | εy = ${result.eps_y.toFixed(5)}`}}/>

                <StepCard num={5} title="Zona de falla y factor φ"
                  result="Ver resultado"
                  planteamiento="La zona depende de εs₁ (fila más lejana del eje neutro): dúctil si εs ≥ 0.005, transición si 0.004 ≤ εs < 0.005, frágil si εs < 0.004."
                  ecuacion={`εs₁ = ${result.eps_s1.toFixed(5)} → zona: ${result.zona} → φ = ${result.phi.toFixed(3)}`}
                  conclusion={{tipo:"info", texto:`Factor de reducción φ = ${result.phi.toFixed(3)} aplicado al momento nominal.`}}/>

                <StepCard num={6} title="Momento nominal exacto"
                  result="Ver resultado"
                  planteamiento="Mn exacto considera los brazos de palanca reales d₁ y d₂ de cada fila respecto al bloque de compresión."
                  ecuacion={`Mn = As₁·fy·(d₁-a/2) + As₂·fy·(d₂-a/2) = ${result.Mn.toFixed(3)} tf·m`}
                  conclusion={{tipo:"info", texto:`Mn aprox. (usando d_eq) = ${result.Mn_aprox.toFixed(3)} tf·m. Diferencia = ${Math.abs(result.Mn - result.Mn_aprox).toFixed(3)} tf·m.`}}/>

                <StepCard num={7} title="Momento de diseño φMn"
                  result="Ver resultado"
                  planteamiento="El momento reducido φMn es la capacidad de diseño que debe ser ≥ Mu."
                  ecuacion={`φMn = ${result.phi.toFixed(3)} × ${result.Mn.toFixed(3)} = ${result.phiMn.toFixed(3)} tf·m`}
                  conclusion={{tipo: result.verifica ? "ok" : result.verifica === false ? "err" : "info", texto: result.verifica !== undefined ? (result.verifica ? `phiMn >= Mu -> VERIFICA` : `phiMn < Mu -> NO VERIFICA`) : `phiMn = ${result.phiMn.toFixed(3)} tf*m`}}/>
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
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-text-muted">{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-amber/60"
      />
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
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-amber/60">
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function VizCard({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  const borderClass = accent === "amber" ? "border-accent-amber/20" : "border-accent-blue/20";
  return (
    <div className={cn("rounded-xl border bg-bg-card p-3", borderClass)}>
      <p className="text-xs text-text-muted mb-2 text-center">{title}</p>
      <div className="flex items-center justify-center" style={{ height: 220 }}>
        {children}
      </div>
    </div>
  );
}
