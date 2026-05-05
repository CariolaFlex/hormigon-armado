// @ts-nocheck
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { parabolaRectModel } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { stressMPaToUnit } from "@/lib/hormigon/units";
import { round } from "@/lib/utils";
import { BASE_LAYOUT, BASE_CONFIG, PLOT_COLORS, vlineShape, hlineShape } from "@/components/charts/PlotlyBase";
import dynamic from "next/dynamic";

interface ParabolaRectCalcProps {
  unit: UnitSystem;
}

function ParabolaRectChartInner({ fck, gamma_c, unit, height = 360 }: { fck: number; gamma_c: number; unit: UnitSystem; height?: number }) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [Plotly, setPlotly] = useState<typeof import("plotly.js") | null>(null);

  useEffect(() => {
    import("plotly.js").then((p) => setPlotly(p.default || p as unknown as typeof import("plotly.js")));
  }, []);

  useEffect(() => {
    if (!Plotly || !plotRef.current) return;
    const result = parabolaRectModel(fck, gamma_c);
    const conv = (v: number) => stressMPaToUnit(v, unit);
    const yLabel = unit === "MPa" ? "σ (MPa)" : "σ (kgf/cm²)";

    const parabolicPts = result.points.filter((p) => p.strain <= result.ec2);
    const rectPts = result.points.filter((p) => p.strain > result.ec2);

    const traces: Plotly.Data[] = [
      {
        x: parabolicPts.map((p) => p.strain),
        y: parabolicPts.map((p) => conv(p.stress)),
        type: "scatter", mode: "lines",
        name: `Zona parabólica (0 → ${(result.ec2 * 1000).toFixed(0)}‰)`,
        line: { color: PLOT_COLORS.parabola, width: 2.5, shape: "spline" },
        hovertemplate: "Parábola<br>ε=%{x:.5f}<br>σ=%{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data,
      {
        x: rectPts.map((p) => p.strain),
        y: rectPts.map((p) => conv(p.stress)),
        type: "scatter", mode: "lines",
        name: `Zona rectangular (${(result.ec2 * 1000).toFixed(0)}‰ → ${(result.ecu2 * 1000).toFixed(0)}‰)`,
        line: { color: PLOT_COLORS.parabola, width: 2.5, dash: "dash" },
        hovertemplate: "Rectangular<br>ε=%{x:.5f}<br>σ=%{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data,
      {
        x: [result.ec2],
        y: [conv(result.fcd)],
        type: "scatter", mode: "markers+text",
        name: `εc2 = ${(result.ec2 * 1000).toFixed(0)}‰`,
        marker: { color: PLOT_COLORS.parabola, size: 10, symbol: "square" },
        text: [`  (${result.ec2}, ${conv(result.fcd).toFixed(1)})`],
        textposition: "middle right",
        textfont: { size: 9, color: PLOT_COLORS.parabola },
        showlegend: true,
        hovertemplate: `Transición parábola→rect.<br>εc2=${result.ec2}<br>fcd=${conv(result.fcd).toFixed(2)} ${unit}<extra></extra>`,
      } as Plotly.Data,
    ];

    const shapes = [
      vlineShape(result.ec2, "#52525B", "dot"),
      vlineShape(result.ecu2, "#EF4444", "dot"),
      hlineShape(conv(result.fcd), "#52525B", "dot"),
    ];

    const annotations: Partial<Plotly.Annotations>[] = [
      { x: result.ec2, y: 0, text: "εc2", showarrow: false, yref: "paper", font: { size: 10, color: "#52525B" }, xanchor: "center", yanchor: "top" },
      { x: result.ecu2, y: 0, text: "εcu2", showarrow: false, yref: "paper", font: { size: 10, color: "#EF4444" }, xanchor: "center", yanchor: "top" },
      { x: 0, y: conv(result.fcd), text: "fcd", showarrow: false, xref: "paper", font: { size: 10, color: "#52525B" }, xanchor: "right", yanchor: "middle" },
    ];

    const layout: Partial<Plotly.Layout> = {
      ...BASE_LAYOUT,
      title: { text: `Parábola-Rectángulo — fck=${fck} MPa, γc=${gamma_c}`, font: { size: 13, color: "#FAFAFA" }, x: 0.5, xanchor: "center" },
      xaxis: { ...BASE_LAYOUT.xaxis, title: { text: "Deformación unitaria ε", font: { size: 12, color: "#A1A1AA" } }, range: [0, 0.004], tickformat: ".4f" },
      yaxis: { ...BASE_LAYOUT.yaxis, title: { text: yLabel, font: { size: 12, color: "#A1A1AA" } }, range: [0, conv(result.fcd) * 1.15] },
      shapes, annotations, height,
    };

    Plotly.newPlot(plotRef.current, traces, layout, BASE_CONFIG);
    return () => { if (plotRef.current && Plotly) Plotly.purge(plotRef.current); };
  }, [Plotly, fck, gamma_c, unit, height]);

  return <div ref={plotRef} style={{ width: "100%", height }} />;
}

export function ParabolaRectCalc({ unit }: ParabolaRectCalcProps) {
  const [fck, setFck] = useState(25);
  const [gamma_c, setGammaC] = useState(1.5);
  const result = useMemo(() => parabolaRectModel(fck, gamma_c), [fck, gamma_c]);
  const conv = (v: number) => round(stressMPaToUnit(v, unit), 2);
  const unitLabel = unit === "MPa" ? "MPa" : "kgf/cm²";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">Resistencia fck</label>
          <div className="flex items-center gap-3 mb-2">
            <input type="range" min={10} max={60} step={1} value={fck} onChange={(e) => setFck(Number(e.target.value))} className="flex-1 accent-green-500 cursor-pointer" />
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[90px] text-center">
              <span className="text-accent-green font-bold text-sm">{fck}</span>
              <span className="text-text-muted text-xs ml-1">MPa</span>
            </div>
          </div>
        </div>
        <div className="bg-bg-elevated rounded-xl p-4 border border-bg-border">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wide block mb-3">Factor γc (minoración)</label>
          <div className="flex items-center gap-3 mb-2">
            <input type="range" min={1.0} max={2.0} step={0.05} value={gamma_c} onChange={(e) => setGammaC(Number(e.target.value))} className="flex-1 accent-green-500 cursor-pointer" />
            <div className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 min-w-[90px] text-center">
              <span className="text-accent-green font-bold text-sm">{gamma_c.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-[10px] text-text-muted">γc = 1.5 para hormigón (Eurocódigo EN1992)</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "fcd = αcc·fck/γc", value: conv(result.fcd), unit: unitLabel, color: "green" },
          { label: "εc2 (deform. pico)", value: `${(result.ec2 * 1000).toFixed(0)}‰`, unit: "= 0.002", color: "blue" },
          { label: "εcu2 (deform. ult.)", value: `${(result.ecu2 * 1000).toFixed(0)}‰`, unit: "= 0.0035", color: "amber" },
          { label: "Zona rectangulat", value: `${((result.ecu2 - result.ec2) * 1000).toFixed(0)}‰`, unit: "rango", color: "purple" },
        ].map((item) => (
          <div key={item.label} className="bg-bg-card border border-bg-border rounded-xl p-3">
            <div className="text-[10px] text-text-muted mb-1">{item.label}</div>
            <div className={`text-xl font-bold text-accent-${item.color}`}>{item.value}</div>
            <div className="text-xs text-text-muted">{item.unit}</div>
          </div>
        ))}
      </div>

      <div className="bg-bg-elevated border border-bg-border rounded-xl p-4 space-y-2 text-xs">
        <p className="font-semibold text-text-secondary">Ecuaciones EN 1992-1-1:2004 §3.1.7</p>
        <div className="formula-block space-y-1">
          <p className="text-text-secondary">Para 0 ≤ εc ≤ εc2:     σc = fcd · [1 − (1 − εc/εc2)²]</p>
          <p className="text-text-secondary">Para εc2 &lt; εc ≤ εcu2:  σc = fcd (constante)</p>
          <p className="text-text-muted">donde fcd = αcc·fck/γc, αcc = 1.0 (por defecto)</p>
        </div>
      </div>

      <div className="bg-bg-panel border border-bg-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-bg-border">
          <h4 className="text-sm font-semibold text-text-primary">Curva σ-ε — Parábola-Rectángulo (EN 1992)</h4>
          <p className="text-xs text-text-muted">Zona parabólica → Zona plástica rectangular</p>
        </div>
        <ParabolaRectChartInner fck={fck} gamma_c={gamma_c} unit={unit} />
      </div>
    </div>
  );
}
