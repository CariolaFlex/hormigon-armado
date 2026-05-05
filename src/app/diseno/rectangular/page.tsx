"use client";

import { useState, useCallback } from "react";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { disenarRectangularCompleto } from "@/lib/hormigon/flexion";
import { BarrasRecomendadas } from "@/components/svg/BarrasRecomendadas";
import { SeccionTransversal } from "@/components/svg/SeccionTransversal";
import { ResultRow } from "@/components/calculadora/ResultRow";
import { StepCard } from "@/components/calculadora/StepCard";
import type { CargaInput } from "@/types/index";

interface FormState {
  b: string; h: string; d: string;
  fc: string; fy: string;
  tipo_viga: "simple" | "voladizo" | "continua";
  L: string;
  Mu_directo: string;
}

const DEFAULT: FormState = {
  b: "30", h: "65", d: "58",
  fc: "210", fy: "4200",
  tipo_viga: "simple",
  L: "6",
  Mu_directo: "",
};

const DEFAULT_CARGAS: CargaInput[] = [
  { tipo: "qD", valor: 1.5 },
  { tipo: "qL", valor: 2.0 },
];

export default function DisenoRectangularPage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [cargas, setCargas] = useState<CargaInput[]>(DEFAULT_CARGAS);
  const [result, setResult] = useState<ReturnType<typeof disenarRectangularCompleto> | null>(null);
  const [modoMu, setModoMu] = useState<"cargas" | "directo">("cargas");

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const addCarga = () => setCargas(prev => [...prev, { tipo: "qL", valor: 0 }]);
  const removeCarga = (i: number) => setCargas(prev => prev.filter((_, idx) => idx !== i));
  const setCarga = (i: number, key: keyof CargaInput, val: string) =>
    setCargas(prev => prev.map((c, idx) => idx === i ? { ...c, [key]: key === "valor" ? +val : val } : c));

  const calcular = useCallback(() => {
    const { b, h, d, fc, fy, tipo_viga, L, Mu_directo } = form;
    if (!b || !h || !d || !fc || !fy) return;
    const res = disenarRectangularCompleto({
      b: +b, h: +h, d: +d,
      fc: +fc, fy: +fy,
      tipo_viga,
      L: +L,
      cargas: modoMu === "cargas" ? cargas : [],
      Mu: modoMu === "directo" && Mu_directo ? +Mu_directo : null,
    });
    setResult(res);
  }, [form, cargas, modoMu]);

  const loadEj = () => {
    setForm({ b:"30", h:"65", d:"58", fc:"210", fy:"4200", tipo_viga:"simple", L:"6", Mu_directo:"" });
    setCargas([{ tipo:"qD", valor:1.5 }, { tipo:"qL", valor:2.0 }]);
    setModoMu("cargas");
    setTimeout(calcular, 50);
  };

  const fmtRho = (r: number) => (r * 100).toFixed(4) + "%";

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Diseño — Sección Rectangular</h1>
            <p className="text-xs text-text-muted">Método LRFD · ACI 318-19 · NCh430</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Panel izquierdo */}
        <aside className="w-80 border-r border-bg-border bg-bg-panel flex flex-col overflow-y-auto">
          <div className="p-5 space-y-4 flex-1">

            <Card title="Geometría">
              <div className="grid grid-cols-3 gap-2">
                <Field label="b (cm)" value={form.b} onChange={v => set("b", v)}/>
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

            {/* Toggle modo Mu */}
            <Card title="Momento de Diseño">
              <div className="flex rounded-lg border border-bg-border overflow-hidden text-xs">
                {(["cargas", "directo"] as const).map(m => (
                  <button key={m} onClick={() => setModoMu(m)}
                    className={cn("flex-1 py-1.5 transition-colors",
                      modoMu === m ? "bg-accent-cyan/20 text-accent-cyan font-semibold" : "text-text-muted hover:bg-bg-elevated")}>
                    {m === "cargas" ? "Desde cargas" : "Mu directo"}
                  </button>
                ))}
              </div>

              {modoMu === "directo" ? (
                <Field label="Mu (tf·m)" value={form.Mu_directo} onChange={v => set("Mu_directo", v)}/>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <SelectField label="Tipo viga" value={form.tipo_viga}
                      onChange={v => set("tipo_viga", v as "simple"|"voladizo"|"continua")}
                      opts={["simple","voladizo","continua"]}/>
                    <Field label="L (m)" value={form.L} onChange={v => set("L", v)}/>
                  </div>

                  {/* Cargas */}
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">Cargas</span>
                      <button onClick={addCarga} className="flex items-center gap-1 text-xs text-accent-cyan hover:text-accent-cyan/80">
                        <Plus className="w-3 h-3"/> Agregar
                      </button>
                    </div>
                    {cargas.map((c, i) => (
                      <div key={i} className="flex gap-1.5 items-center">
                        <select value={c.tipo} onChange={e => setCarga(i, "tipo", e.target.value)}
                          className="h-7 px-1.5 rounded bg-bg-elevated border border-bg-border text-text-primary text-xs focus:outline-none">
                          <option value="qD">qD (tf/m)</option>
                          <option value="qL">qL (tf/m)</option>
                          <option value="PL">PL (tf) puntual</option>
                        </select>
                        <input type="number" value={c.valor} onChange={e => setCarga(i, "valor", e.target.value)}
                          className="flex-1 h-7 px-2 rounded bg-bg-elevated border border-bg-border text-text-primary text-xs focus:outline-none"/>
                        <button onClick={() => removeCarga(i)} className="text-text-muted hover:text-accent-red">
                          <Trash2 className="w-3.5 h-3.5"/>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </div>

          <div className="p-5 border-t border-bg-border space-y-2">
            <button onClick={calcular}
              className="w-full h-10 rounded-lg bg-accent-cyan text-black text-sm font-semibold hover:bg-accent-cyan/90 transition-colors">
              Diseñar
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
              <p className="text-sm">Ingresa los datos y presiona <span className="text-accent-cyan font-semibold">Diseñar</span></p>
            </div>
          ) : (
            <>
              {/* SVGs */}
              <div className="grid grid-cols-2 gap-4">
                <VizCard title="Sección Transversal">
                  <SeccionTransversal
                    b={+form.b} h={+form.h}
                    d={result.verificacion?.a ? +form.d : +form.d}
                    a={result.verificacion?.a ?? 0}
                    nb={result.opciones[0]?.nb ?? 3}
                    zona="ductil"
                    width={200} height={260}
                  />
                </VizCard>
                <VizCard title="Opciones de Barras">
                  <BarrasRecomendadas
                    opciones={result.opciones}
                    As_req={result.As_req}
                    width={320} height={260}
                  />
                </VizCard>
              </div>

              {/* Alerta excede */}
              {result.excede_max && (
                <div className="rounded-xl border border-accent-red/30 bg-accent-red/5 px-5 py-3 flex items-center gap-3">
                  <span className="text-accent-red font-semibold">⚠ Sección insuficiente</span>
                  <span className="text-text-muted text-sm">ρ_req excede ρ_max — aumentar b, h o f'c</span>
                </div>
              )}

              {/* Carga última detalle */}
              {result.wu_detalle && (
                <div className="rounded-xl border border-accent-cyan/20 bg-bg-card p-5">
                  <h3 className="text-sm font-semibold text-accent-cyan mb-3">Combinaciones de Carga (LRFD)</h3>
                  <ResultRow items={[
                    { label: "qD", value: result.wu_detalle.qD.toFixed(3), unit: "tf/m" },
                    { label: "qL", value: result.wu_detalle.qL.toFixed(3), unit: "tf/m" },
                    { label: "q pp (P.P.)", value: result.wu_detalle.qpp.toFixed(3), unit: "tf/m" },
                    { label: "1.4(qD+qpp)", value: result.wu_detalle.wu1.toFixed(3), unit: "tf/m" },
                    { label: "1.2(D+pp)+1.6L", value: result.wu_detalle.wu2.toFixed(3), unit: "tf/m" },
                    { label: "wu (governa)", value: result.wu_detalle.wu.toFixed(3), unit: "tf/m", highlight: true },
                  ]}/>
                </div>
              )}

              {/* Cuantías */}
              <div className="rounded-xl border border-accent-cyan/20 bg-bg-card p-5">
                <h3 className="text-sm font-semibold text-accent-cyan mb-3">Cuantías y Acero Requerido</h3>
                <ResultRow items={[
                  { label: "Mu diseño", value: result.Mu.toFixed(3), unit: "tf·m", highlight: true },
                  { label: "Rn", value: result.Rn.toFixed(3), unit: "kgf/cm²" },
                  { label: "ρ_req", value: fmtRho(result.rho_req) },
                  { label: "ρ_min (ACI)", value: fmtRho(result.rho_min) },
                  { label: "ρ_max (ACI)", value: fmtRho(result.rho_max) },
                  { label: "ρ_uso", value: fmtRho(result.rho_uso), highlight: true },
                  { label: "As_req", value: result.As_req.toFixed(2), unit: "cm²", highlight: true },
                ]}/>
              </div>

              {/* Verificación */}
              {result.verificacion && (
                <div className={cn(
                  "rounded-xl border p-5",
                  result.verificacion.ok ? "border-accent-green/30 bg-bg-card" : "border-accent-red/30 bg-bg-card"
                )}>
                  <h3 className={cn("text-sm font-semibold mb-3",
                    result.verificacion.ok ? "text-accent-green" : "text-accent-red")}>
                    Verificación con {result.opciones[0]?.nb} barras φ{result.opciones[0]?.phi}mm
                  </h3>
                  <ResultRow items={[
                    { label: "As real", value: result.verificacion.As_real.toFixed(2), unit: "cm²" },
                    { label: "a real", value: result.verificacion.a.toFixed(3), unit: "cm" },
                    { label: "Mn", value: result.verificacion.Mn.toFixed(3), unit: "tf·m" },
                    { label: "φMn", value: result.verificacion.phiMn.toFixed(3), unit: "tf·m", highlight: true },
                    { label: "Estado", value: result.verificacion.ok ? "VERIFICA ✓" : "NO VERIFICA ✗", highlight: true },
                  ]}/>
                </div>
              )}

              {/* Tabla opciones */}
              <div className="rounded-xl border border-bg-border bg-bg-card p-5">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">Opciones de Barras Comerciales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-bg-border text-text-muted">
                        <th className="pb-2 text-left font-medium">Opción</th>
                        <th className="pb-2 text-right font-medium">N°</th>
                        <th className="pb-2 text-right font-medium">φ (mm)</th>
                        <th className="pb-2 text-right font-medium">As real (cm²)</th>
                        <th className="pb-2 text-right font-medium">Exceso (%)</th>
                        <th className="pb-2 text-right font-medium">Sep. (cm)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bg-border">
                      {result.opciones.map((op, i) => (
                        <tr key={i} className={cn("", i === 0 && "text-accent-cyan")}>
                          <td className="py-1.5 font-medium">{i === 0 ? "★ Mejor" : `Opción ${i + 1}`}</td>
                          <td className="py-1.5 text-right">{op.nb}</td>
                          <td className="py-1.5 text-right">{op.phi}</td>
                          <td className="py-1.5 text-right">{op.As_real.toFixed(2)}</td>
                          <td className="py-1.5 text-right">{(op.exceso * 100).toFixed(1)}</td>
                          <td className="py-1.5 text-right">{op.sep.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pasos */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-text-secondary px-1">Desarrollo paso a paso</h3>

                <StepCard num={1} title="Carga última y momento de diseño"
                  result="Ver resultado"
                  planteamiento="Se aplican las combinaciones de carga LRFD del ACI 318-19: 1.4D y 1.2D+1.6L. Gobierna la mayor."
                  ecuacion={result.wu_detalle
                    ? `wu = max(${result.wu_detalle.wu1.toFixed(3)}, ${result.wu_detalle.wu2.toFixed(3)}) = ${result.wu_detalle.wu.toFixed(3)} tf/m | Mu = ${result.Mu.toFixed(3)} tf·m`
                    : `Mu = ${result.Mu.toFixed(3)} tf·m (ingresado directamente)`}
                  conclusion={{tipo:"info", texto:`Momento de diseño: Mu = ${result.Mu.toFixed(3)} tf·m`}}/>

                <StepCard num={2} title="Coeficiente de resistencia Rn"
                  result="Ver resultado"
                  planteamiento="Se obtiene Rn = Mu / (φ·b·d²) con φ = 0.90 asumiendo zona dúctil."
                  ecuacion={`Rn = ${(result.Mu * 100000).toFixed(0)} / (0.90·${form.b}·${form.d}²) = ${result.Rn.toFixed(3)} kgf/cm²`}
                  conclusion={{tipo:"info", texto:"Rn representa el momento solicitado por unidad de sección efectiva."}}/>

                <StepCard num={3} title="Cuantía de acero requerida"
                  result="Ver resultado"
                  planteamiento="ρ_req se obtiene de la ecuación cuadrática derivada del equilibrio de fuerzas y deformaciones."
                  ecuacion={`ρ_req = (0.85·f'c/fy)·[1 - √(1 - 2·Rn/(0.85·f'c))] = ${fmtRho(result.rho_req)}`}
                  conclusion={{tipo:"info", texto:`ρ_min = ${fmtRho(result.rho_min)} | ρ_max = ${fmtRho(result.rho_max)} | ρ_uso = ${fmtRho(result.rho_uso)}`}}/>

                <StepCard num={4} title="Área de acero requerida"
                  result="Ver resultado"
                  planteamiento="As_req = ρ_uso · b · d. Si ρ_req < ρ_min, se usa ρ_min. Si excede ρ_max, hay que rediseñar."
                  ecuacion={`As_req = ${fmtRho(result.rho_uso)} · ${form.b} · ${form.d} = ${result.As_req.toFixed(2)} cm²`}
                  conclusion={{tipo:"info", texto:result.excede_max ? "⚠ ρ_req > ρ_max — sección insuficiente" : "As_req dentro de límites normativos."}}/>

                <StepCard num={5} title="Selección de barras y verificación"
                  result="Ver resultado"
                  planteamiento="Se eligen barras comerciales (φ en mm: 10, 12, 16, 20, 22, 25, 28, 32) que provean As ≥ As_req."
                  ecuacion={result.opciones[0]
                    ? `Mejor opción: ${result.opciones[0].nb} barras φ${result.opciones[0].phi}mm → As = ${result.opciones[0].As_real.toFixed(2)} cm²`
                    : "Sin opciones disponibles"}
                  conclusion={{tipo: result.verificacion?.ok ? "ok" : "err", texto: result.verificacion ? `phiMn = ${result.verificacion.phiMn.toFixed(3)} tf*m ${result.verificacion.ok ? ">=" : "<"} Mu -> ${result.verificacion.ok ? "VERIFICA" : "NO VERIFICA"}` : "Verificacion no disponible"}}/>
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
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-cyan/60"/>
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
        className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-cyan/60">
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function VizCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-accent-cyan/20 bg-bg-card p-3">
      <p className="text-xs text-text-muted mb-2 text-center">{title}</p>
      <div className="flex items-center justify-center" style={{ height: 220 }}>
        {children}
      </div>
    </div>
  );
}
