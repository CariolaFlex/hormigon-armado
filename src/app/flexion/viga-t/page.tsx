"use client";

import { useState, useCallback } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { analizarVigaT, calcAs, BARRAS } from "@/lib/hormigon/flexion";
import { SeccionT } from "@/components/svg/SeccionT";
import { DiagramaDeformaciones } from "@/components/svg/DiagramaDeformaciones";
import { FuerzasVigaT } from "@/components/svg/FuerzasVigaT";
import { FallaBadge } from "@/components/calculadora/FallaBadge";
import { ResultRow } from "@/components/calculadora/ResultRow";
import { StepCard } from "@/components/calculadora/StepCard";
import type { ZonaFalla } from "@/types/index";

const PHI_OPTS = Object.keys(BARRAS).map(Number);

interface FormState {
  bw: string; b: string; hf: string;
  d: string; h: string;
  fc: string; fy: string;
  nb: string; phi: string;
  Mu: string;
}

const DEFAULT: FormState = {
  bw: "25", b: "100", hf: "12",
  d: "55", h: "60",
  fc: "210", fy: "4200",
  nb: "3", phi: "22",
  Mu: "",
};

export default function VigaTPage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [result, setResult] = useState<ReturnType<typeof analizarVigaT> | null>(null);

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const calcular = useCallback(() => {
    const { bw, b, hf, d, h, fc, fy, nb, phi, Mu } = form;
    if (!bw || !b || !hf || !d || !h || !fc || !fy) return;
    const res = analizarVigaT({
      bw: +bw, b: +b, hf: +hf,
      d: +d, h: +h,
      fc: +fc, fy: +fy,
      nb: +nb, phi_mm: +phi,
      Mu: Mu ? +Mu : null,
    });
    setResult(res);
  }, [form]);

  const loadEj = () => {
    setForm({ bw:"25", b:"90", hf:"12", d:"58", h:"65", fc:"210", fy:"4200", nb:"4", phi:"22", Mu:"" });
    setTimeout(calcular, 50);
  };

  const zona = result?.zona ?? "ductil";
  const accentMap: Record<ZonaFalla, string> = { ductil: "text-accent-purple", transicion: "text-accent-amber", fragil: "text-accent-red" };
  const borderMap: Record<ZonaFalla, string> = { ductil: "border-accent-purple/30", transicion: "border-accent-amber/30", fragil: "border-accent-red/30" };

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-purple/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent-purple" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Análisis — Viga T</h1>
            <p className="text-xs text-text-muted">Sección T con ala efectiva · ACI 318-19 · NCh430</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Panel izquierdo */}
        <aside className="w-80 border-r border-bg-border bg-bg-panel flex flex-col overflow-y-auto">
          <div className="p-5 space-y-4 flex-1">

            <Card title="Geometría del Ala">
              <div className="grid grid-cols-2 gap-2">
                <Field label="b ala efect. (cm)" value={form.b} onChange={v => set("b", v)}/>
                <Field label="hf espesor (cm)" value={form.hf} onChange={v => set("hf", v)}/>
              </div>
            </Card>

            <Card title="Geometría del Alma">
              <div className="grid grid-cols-3 gap-2">
                <Field label="bw (cm)" value={form.bw} onChange={v => set("bw", v)}/>
                <Field label="h (cm)" value={form.h} onChange={v => set("h", v)}/>
                <Field label="d (cm)" value={form.d} onChange={v => set("d", v)}/>
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

            <Card title="Armadura">
              <div className="grid grid-cols-2 gap-2">
                <Field label="N° barras" value={form.nb} onChange={v => set("nb", v)} type="number"/>
                <SelectField label="φ (mm)" value={form.phi} onChange={v => set("phi", v)}
                  opts={PHI_OPTS.map(String)}/>
              </div>
              {form.nb && form.phi && (
                <p className="text-xs text-text-muted mt-1">As = {calcAs(+form.nb, +form.phi).toFixed(2)} cm²</p>
              )}
            </Card>

            <Card title="Verificación (opcional)">
              <Field label="Mu (tf·m)" value={form.Mu} onChange={v => set("Mu", v)} placeholder="dejar vacío si no aplica"/>
            </Card>

            {/* Info caso */}
            {result && (
              <div className="rounded-xl border border-accent-purple/30 bg-accent-purple/5 p-3">
                <p className="text-xs text-accent-purple font-semibold">
                  Caso {result.caso}: {result.caso === 1 ? "a ≤ hf (bloque en ala)" : "a > hf (bloque en ala + alma)"}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  a = {result.a.toFixed(2)} cm · hf = {form.hf} cm
                </p>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-bg-border space-y-2">
            <button onClick={calcular}
              className="w-full h-10 rounded-lg bg-accent-purple text-white text-sm font-semibold hover:bg-accent-purple/90 transition-colors">
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
              <p className="text-sm">Ingresa los datos y presiona <span className="text-accent-purple font-semibold">Calcular</span></p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                <VizCard title="Sección T">
                  <SeccionT
                    bw={+form.bw} b={+form.b} hf={+form.hf}
                    h={+form.h} d={+form.d}
                    a={result.a} c={result.c} caso={result.caso}
                    nb={+form.nb} zona={result.zona}
                    width={200} height={260}
                  />
                </VizCard>
                <VizCard title="Deformaciones">
                  <DiagramaDeformaciones
                    h={+form.h} d={result.d} c={result.c}
                    eps_s={result.eps_s} eps_y={result.eps_y}
                    zona={result.zona}
                    width={180} height={260}
                  />
                </VizCard>
                <VizCard title="Fuerzas Internas">
                  <FuerzasVigaT
                    bw={+form.bw} b={+form.b} hf={+form.hf}
                    h={+form.h} d={result.d}
                    a={result.a} c={result.c} caso={result.caso}
                    As={result.As} zona={result.zona}
                    width={200} height={260}
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
                    φMn = {result.phiMn.toFixed(3)} tf·m{form.Mu ? ` vs Mu = ${form.Mu} tf·m` : ""}
                  </span>
                </div>
              )}

              <div className={cn("rounded-xl border bg-bg-card p-5", borderMap[zona])}>
                <h3 className={cn("text-sm font-semibold mb-3", accentMap[zona])}>
                  Resultados — Caso {result.caso}: {result.caso === 1 ? "a ≤ hf" : "a > hf"}
                </h3>
                <ResultRow items={[
                  { label: "As", value: result.As.toFixed(3), unit: "cm²", highlight: true },
                  { label: "β₁", value: result.beta.toFixed(3) },
                  { label: "a", value: result.a.toFixed(3), unit: "cm", highlight: true },
                  { label: "c (eje neutro)", value: result.c.toFixed(3), unit: "cm" },
                  { label: "d efectivo", value: result.d.toFixed(3), unit: "cm" },
                  { label: "εs", value: result.eps_s.toFixed(5) },
                  { label: "εy", value: result.eps_y.toFixed(5) },
                  { label: "φ", value: result.phi.toFixed(3) },
                  { label: "Mn", value: result.Mn.toFixed(3), unit: "tf·m", highlight: true },
                  { label: "φMn", value: result.phiMn.toFixed(3), unit: "tf·m", highlight: true },
                ]}/>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-text-secondary px-1">Desarrollo paso a paso</h3>

                <StepCard num={1} title="Área de acero"
                  result="Ver resultado"
                  planteamiento="Se calcula As con la fórmula π/4 · φ² · n (barras en el alma)."
                  ecuacion={`As = π/4 · ${form.phi}² · ${form.nb} = ${result.As.toFixed(3)} cm²`}
                  conclusion={{tipo:"info", texto:"El acero se ubica en el alma de la viga T."}}/>

                <StepCard num={2} title="Verificación preliminar del bloque (Caso)"
                  result="Ver resultado"
                  planteamiento="Se asume primero a ≤ hf (bloque en el ala completo, con b efectivo). Si resulta a > hf, se recalcula como Caso 2."
                  ecuacion={`a_sup = As·fy / (0.85·f'c·b) | Si a ≤ hf → Caso 1 | Si a > hf → Caso 2`}
                  conclusion={{tipo:"info", texto:`Resultado: Caso ${result.caso} → a = ${result.a.toFixed(2)} cm ${result.caso === 1 ? "≤" : ">"} hf = ${form.hf} cm`}}/>

                {result.caso === 1 ? (
                  <StepCard num={3} title="Caso 1: Bloque en el ala (a ≤ hf)"
                    result="Ver resultado"
                  planteamiento="El bloque de compresión está completamente en el ala. Se trabaja como viga rectangular de ancho b."
                    ecuacion={`a = As·fy / (0.85·f'c·b) = ${result.As.toFixed(2)}·${form.fy} / (0.85·${form.fc}·${form.b}) = ${result.a.toFixed(3)} cm`}
                    conclusion={{tipo:"info", texto:`c = a/β₁ = ${result.a.toFixed(2)} / ${result.beta.toFixed(3)} = ${result.c.toFixed(3)} cm`}}/>
                ) : (
                  <StepCard num={3} title="Caso 2: Bloque invade el alma (a > hf)"
                    result="Ver resultado"
                  planteamiento="La compresión en el ala no es suficiente. Se descompone la fuerza C en: C_ala (hf completo) + C_alma (parte del alma)."
                    ecuacion={`As·fy = 0.85·f'c·[b·hf + bw·(a-hf)] → a = ${result.a.toFixed(3)} cm`}
                    conclusion={{tipo:"info", texto:`c = ${result.c.toFixed(3)} cm > hf = ${form.hf} cm → bloque en alma confirmado`}}/>
                )}

                <StepCard num={4} title="Deformación unitaria y zona de falla"
                  result="Ver resultado"
                  planteamiento="Con εcu = 0.003 y la posición del eje neutro, se obtiene εs por compatibilidad de deformaciones."
                  ecuacion={`εs = εcu · (d-c) / c = 0.003·(${result.d.toFixed(2)}-${result.c.toFixed(2)}) / ${result.c.toFixed(2)} = ${result.eps_s.toFixed(5)}`}
                  conclusion={{tipo:"info", texto:`εy = fy/Es = ${form.fy}/2040000 = ${result.eps_y.toFixed(5)} | Zona: ${result.zona} | φ = ${result.phi.toFixed(3)}`}}/>

                <StepCard num={5} title="Momento nominal"
                  result="Ver resultado"
                  planteamiento={result.caso === 1
                    ? "Caso 1: Mn se calcula como viga rectangular de ancho b (ala completa)."
                    : "Caso 2: Mn = Mn_ala + Mn_alma (superposición de los dos bloques de compresión)."}
                  ecuacion={`Mn = ${result.Mn.toFixed(3)} tf·m | φMn = ${result.phi.toFixed(3)} × ${result.Mn.toFixed(3)} = ${result.phiMn.toFixed(3)} tf·m`}
                  conclusion={{tipo:"info", texto:result.verifica !== undefined
                    ? (result.verifica ? `φMn ≥ Mu → VERIFICA ✓` : `φMn < Mu → NO VERIFICA ✗`)
                    : `Capacidad de diseno: phiMn = ${result.phiMn.toFixed(3)} tf*m`}}/>
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
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-purple/60"/>
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
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-purple/60">
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function VizCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-accent-purple/20 bg-bg-card p-3">
      <p className="text-xs text-text-muted mb-2 text-center">{title}</p>
      <div className="flex items-center justify-center" style={{ height: 220 }}>
        {children}
      </div>
    </div>
  );
}
