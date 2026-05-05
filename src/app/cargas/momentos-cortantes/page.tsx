"use client";

import { useState, useCallback } from "react";
import { BarChart2, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { calcMomentos } from "@/lib/hormigon/flexion";
import { DiagramaMomentos } from "@/components/svg/DiagramaMomentos";
import type { CargaInput, PuntoMomento } from "@/types/index";

interface FormState {
  tipo: "simple" | "voladizo";
  L: string;
}

const DEFAULT: FormState = { tipo: "simple", L: "6" };
const DEFAULT_CARGAS: CargaInput[] = [
  { tipo: "q", valor: 2.0 },
];

export default function MomentosCortantesPage() {
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [cargas, setCargas] = useState<CargaInput[]>(DEFAULT_CARGAS);
  const [result, setResult] = useState<ReturnType<typeof calcMomentos> | null>(null);
  const [vista, setVista] = useState<"M" | "V">("M");

  const set = (k: keyof FormState, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const addCarga = () => setCargas(prev => [...prev, { tipo: "q", valor: 0 }]);
  const removeCarga = (i: number) => setCargas(prev => prev.filter((_, idx) => idx !== i));
  const setCarga = (i: number, key: keyof CargaInput, val: string) =>
    setCargas(prev => prev.map((c, idx) =>
      idx === i ? { ...c, [key]: key === "valor" || key === "pos" ? +val : val } : c
    ));

  const calcular = useCallback(() => {
    if (!form.L || !cargas.length) return;
    const res = calcMomentos({
      tipo: form.tipo,
      L: +form.L,
      cargas,
    });
    setResult(res);
  }, [form, cargas]);

  const loadEjSimple = () => {
    const ejCargas: CargaInput[] = [{ tipo: "q", valor: 2.5 }, { tipo: "P", valor: 5, pos: 4 }];
    setForm({ tipo: "simple", L: "8" });
    setCargas(ejCargas);
    const res = calcMomentos({ tipo: "simple", L: 8, cargas: ejCargas });
    setResult(res);
  };

  const loadEjVoladizo = () => {
    setForm({ tipo: "voladizo", L: "4" });
    setCargas([{ tipo: "q", valor: 1.5 }, { tipo: "P", valor: 3, pos: 4 }]);
    setTimeout(calcular, 50);
  };

  const puntosM: PuntoMomento[] = result?.puntos ?? [];
  const puntosV: PuntoMomento[] = result?.puntos ?? [];

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <div className="border-b border-bg-border bg-bg-panel px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-accent-blue/20 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">Diagramas de Momentos y Cortantes</h1>
            <p className="text-xs text-text-muted">Viga simple o en voladizo · 201 puntos · ACI 318-19</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Panel izquierdo */}
        <aside className="w-80 border-r border-bg-border bg-bg-panel flex flex-col overflow-y-auto">
          <div className="p-5 space-y-4 flex-1">

            <Card title="Configuración de la Viga">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">Tipo de viga</label>
                  <select value={form.tipo} onChange={e => set("tipo", e.target.value as "simple"|"voladizo")}
                    className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-blue/60">
                    <option value="simple">Simple (2 apoyos)</option>
                    <option value="voladizo">Voladizo (empotrado)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-text-muted">L (m)</label>
                  <input type="number" value={form.L} onChange={e => set("L", e.target.value)}
                    className="w-full h-8 px-2 rounded-md bg-bg-elevated border border-bg-border text-text-primary text-sm focus:outline-none focus:border-accent-blue/60"/>
                </div>
              </div>
            </Card>

            {/* Cargas */}
            <Card title="Cargas">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-muted">Agregar cargas</span>
                <button onClick={addCarga} className="flex items-center gap-1 text-xs text-accent-blue hover:text-accent-blue/80">
                  <Plus className="w-3 h-3"/> Agregar
                </button>
              </div>

              <div className="space-y-2">
                {cargas.map((c, i) => (
                  <div key={i} className="rounded-lg border border-bg-border bg-bg-elevated p-2 space-y-1.5">
                    <div className="flex gap-1.5 items-center">
                      <select value={c.tipo} onChange={e => setCarga(i, "tipo", e.target.value)}
                        className="flex-1 h-7 px-1.5 rounded bg-bg-card border border-bg-border text-text-primary text-xs focus:outline-none">
                        <option value="q">q distribuida (tf/m)</option>
                        <option value="P">P puntual (tf)</option>
                      </select>
                      <button onClick={() => removeCarga(i)} className="text-text-muted hover:text-accent-red flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                    <div className={cn("grid gap-1.5", c.tipo === "P" ? "grid-cols-2" : "grid-cols-1")}>
                      <div className="space-y-0.5">
                        <label className="text-[10px] text-text-muted">Valor ({c.tipo === "q" ? "tf/m" : "tf"})</label>
                        <input type="number" value={c.valor} onChange={e => setCarga(i, "valor", e.target.value)}
                          className="w-full h-7 px-2 rounded bg-bg-card border border-bg-border text-text-primary text-xs focus:outline-none"/>
                      </div>
                      {c.tipo === "P" && (
                        <div className="space-y-0.5">
                          <label className="text-[10px] text-text-muted">Posición (m)</label>
                          <input type="number" value={c.pos ?? ""} onChange={e => setCarga(i, "pos", e.target.value)}
                            className="w-full h-7 px-2 rounded bg-bg-card border border-bg-border text-text-primary text-xs focus:outline-none"/>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reacciones */}
            {result && (
              <Card title="Reacciones">
                {form.tipo === "simple" ? (
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-muted">RA</span>
                      <span className="text-accent-blue font-mono">{result.RA?.toFixed(3)} tf</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">RB</span>
                      <span className="text-accent-blue font-mono">{result.RB?.toFixed(3)} tf</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Reacción vertical RE</span>
                      <span className="text-accent-blue font-mono">{result.RE?.toFixed(3)} tf</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Momento empotramiento</span>
                      <span className="text-accent-blue font-mono">{result.ME_reac?.toFixed(3)} tf·m</span>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>

          <div className="p-5 border-t border-bg-border space-y-2">
            <button onClick={calcular}
              className="w-full h-10 rounded-lg bg-accent-blue text-white text-sm font-semibold hover:bg-accent-blue/90 transition-colors">
              Calcular diagramas
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={loadEjSimple}
                className="h-8 rounded-lg border border-bg-border text-text-muted text-xs hover:bg-bg-elevated transition-colors">
                Ej. simple
              </button>
              <button onClick={loadEjVoladizo}
                className="h-8 rounded-lg border border-bg-border text-text-muted text-xs hover:bg-bg-elevated transition-colors">
                Ej. voladizo
              </button>
            </div>
          </div>
        </aside>

        {/* Panel derecho */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {!result ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted">
              <BarChart2 className="w-12 h-12 mb-3 opacity-30"/>
              <p className="text-sm">Ingresa cargas y presiona <span className="text-accent-blue font-semibold">Calcular</span></p>
            </div>
          ) : (
            <>
              {/* Valores máximos */}
              <div className="grid grid-cols-4 gap-4">
                <StatCard label="Mmax" value={result.Mmax.toFixed(3)} unit="tf·m" accent="blue"/>
                <StatCard label="Vmax" value={result.Vmax.toFixed(3)} unit="tf" accent="amber"/>
                {form.tipo === "simple" ? (
                  <>
                    <StatCard label="RA" value={result.RA?.toFixed(3) ?? "—"} unit="tf" accent="green"/>
                    <StatCard label="RB" value={result.RB?.toFixed(3) ?? "—"} unit="tf" accent="green"/>
                  </>
                ) : (
                  <>
                    <StatCard label="RE" value={result.RE?.toFixed(3) ?? "—"} unit="tf" accent="green"/>
                    <StatCard label="ME" value={result.ME_reac?.toFixed(3) ?? "—"} unit="tf·m" accent="purple"/>
                  </>
                )}
              </div>

              {/* Toggle M/V */}
              <div className="flex rounded-xl border border-bg-border overflow-hidden w-fit">
                {(["M", "V"] as const).map(v => (
                  <button key={v} onClick={() => setVista(v)}
                    className={cn("px-6 py-2 text-sm font-semibold transition-colors",
                      vista === v
                        ? v === "M" ? "bg-accent-blue/20 text-accent-blue" : "bg-accent-amber/20 text-accent-amber"
                        : "text-text-muted hover:bg-bg-elevated")}>
                    Diagrama {v === "M" ? "Momentos M(x)" : "Cortantes V(x)"}
                  </button>
                ))}
              </div>

              {/* Diagrama principal */}
              <div className="rounded-xl border border-bg-border bg-bg-card p-6">
                <h3 className="text-sm font-semibold text-text-secondary mb-4">
                  {vista === "M" ? "Diagrama de Momentos — M(x)" : "Diagrama de Cortantes — V(x)"}
                </h3>
                <div style={{ height: 280 }}>
                  <DiagramaMomentos
                    puntos={vista === "M" ? puntosM : puntosV}
                    tipo={vista}
                    Mmax={vista === "M" ? result.Mmax : undefined}
                    Vmax={vista === "V" ? result.Vmax : undefined}
                    color={vista === "M" ? "#3B82F6" : "#F59E0B"}
                    label={vista === "M" ? "M(x) [tf·m]" : "V(x) [tf]"}
                    width={800}
                    height={260}
                  />
                </div>
              </div>

              {/* Ambos diagramas juntos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-accent-blue/20 bg-bg-card p-4">
                  <h4 className="text-xs font-semibold text-accent-blue mb-3">M(x) — Momentos Flectores</h4>
                  <div style={{ height: 180 }}>
                    <DiagramaMomentos
                      puntos={puntosM} tipo="M"
                      Mmax={result.Mmax}
                      label="M [tf·m]" color="#3B82F6"
                      width={380} height={170}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-2 text-right">Mmax = {result.Mmax.toFixed(3)} tf·m</p>
                </div>
                <div className="rounded-xl border border-accent-amber/20 bg-bg-card p-4">
                  <h4 className="text-xs font-semibold text-accent-amber mb-3">V(x) — Fuerzas Cortantes</h4>
                  <div style={{ height: 180 }}>
                    <DiagramaMomentos
                      puntos={puntosV} tipo="V"
                      Vmax={result.Vmax}
                      label="V [tf]" color="#F59E0B"
                      width={380} height={170}
                    />
                  </div>
                  <p className="text-xs text-text-muted mt-2 text-right">Vmax = {result.Vmax.toFixed(3)} tf</p>
                </div>
              </div>

              {/* Tabla de puntos notables */}
              <div className="rounded-xl border border-bg-border bg-bg-card p-5">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">Puntos Notables</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-bg-border text-text-muted">
                        <th className="pb-2 text-left font-medium">x (m)</th>
                        <th className="pb-2 text-right font-medium">M(x) (tf·m)</th>
                        <th className="pb-2 text-right font-medium">V(x) (tf)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bg-border">
                      {[0, 0.25, 0.5, 0.75, 1].map(frac => {
                        const idx = Math.round(frac * (result.puntos.length - 1));
                        const p = result.puntos[idx];
                        return (
                          <tr key={frac}>
                            <td className="py-1.5 text-text-muted">{p.x.toFixed(2)}</td>
                            <td className={cn("py-1.5 text-right font-mono",
                              Math.abs(p.M) === result.Mmax ? "text-accent-blue font-bold" : "text-text-primary")}>
                              {p.M.toFixed(3)}
                            </td>
                            <td className={cn("py-1.5 text-right font-mono",
                              Math.abs(p.V) === result.Vmax ? "text-accent-amber font-bold" : "text-text-primary")}>
                              {p.V.toFixed(3)}
                            </td>
                          </tr>
                        );
                      })}
                      {/* Punto de Mmax */}
                      {(() => {
                        const idxMax = result.puntos.findIndex(p => Math.abs(p.M) === result.Mmax);
                        const p = result.puntos[idxMax];
                        return (
                          <tr className="border-t-2 border-accent-blue/30">
                            <td className="py-1.5 text-accent-blue font-bold">★ {p.x.toFixed(2)}</td>
                            <td className="py-1.5 text-right font-mono text-accent-blue font-bold">{p.M.toFixed(3)}</td>
                            <td className="py-1.5 text-right font-mono text-text-primary">{p.V.toFixed(3)}</td>
                          </tr>
                        );
                      })()}
                    </tbody>
                  </table>
                </div>
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

function StatCard({ label, value, unit, accent }: { label: string; value: string; unit: string; accent: string }) {
  const colorMap: Record<string, string> = {
    blue: "text-accent-blue border-accent-blue/20",
    amber: "text-accent-amber border-accent-amber/20",
    green: "text-accent-green border-accent-green/20",
    purple: "text-accent-purple border-accent-purple/20",
  };
  return (
    <div className={cn("rounded-xl border bg-bg-card p-4", colorMap[accent])}>
      <p className="text-xs text-text-muted mb-1">{label}</p>
      <p className={cn("text-2xl font-bold font-mono", colorMap[accent].split(" ")[0])}>{value}</p>
      <p className="text-xs text-text-muted mt-0.5">{unit}</p>
    </div>
  );
}
