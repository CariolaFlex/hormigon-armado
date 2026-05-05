// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { hognestadModel, todeschiniModel, parabolaRectModel } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { stressMPaToUnit } from "@/lib/hormigon/units";
import { BASE_LAYOUT, BASE_CONFIG, PLOT_COLORS, vlineShape, hlineShape } from "./PlotlyBase";

interface ModelComparisonChartProps {
  fc?: number;
  fck?: number;
  unit?: UnitSystem;
  height?: number;
  showHognestad?: boolean;
  showTodeschini?: boolean;
  showParabola?: boolean;
}

export default function ModelComparisonChart({
  fc = 25,
  fck,
  unit = "MPa",
  height = 420,
  showHognestad = true,
  showTodeschini = true,
  showParabola = true,
}: ModelComparisonChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [Plotly, setPlotly] = useState<typeof import("plotly.js") | null>(null);

  useEffect(() => {
    import("plotly.js").then((p) => setPlotly(p.default || p as unknown as typeof import("plotly.js")));
  }, []);

  useEffect(() => {
    if (!Plotly || !plotRef.current) return;

    const fck_val = fck ?? fc;
    const conv = (v: number) => stressMPaToUnit(v, unit);
    const yLabel = unit === "MPa" ? "σ (MPa)" : "σ (kgf/cm²)";

    const hog = hognestadModel(fc);
    const tod = todeschiniModel(fc);
    const par = parabolaRectModel(fck_val);

    const traces: Plotly.Data[] = [];

    if (showHognestad) {
      traces.push({
        x: hog.points.map((p) => p.strain),
        y: hog.points.map((p) => conv(p.stress)),
        type: "scatter",
        mode: "lines",
        name: `Hognestad (f'c=${fc} MPa)`,
        line: { color: PLOT_COLORS.hognestad, width: 2.5, shape: "spline" },
        hovertemplate: "Hognestad<br>ε=%{x:.5f}<br>σ=%{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data);

      // Punto pico Hognestad
      traces.push({
        x: [hog.e0],
        y: [conv(hog.fc_pp)],
        type: "scatter",
        mode: "markers",
        name: `Hog: ε₀=${hog.e0.toFixed(5)}`,
        marker: { color: PLOT_COLORS.hognestad, size: 9, symbol: "circle-open", line: { width: 2 } },
        showlegend: true,
        hovertemplate: `Hognestad pico<br>ε₀=${hog.e0.toFixed(5)}<br>f''c=${conv(hog.fc_pp).toFixed(2)} ${unit}<extra></extra>`,
      } as Plotly.Data);
    }

    if (showTodeschini) {
      traces.push({
        x: tod.points.map((p) => p.strain),
        y: tod.points.map((p) => conv(p.stress)),
        type: "scatter",
        mode: "lines",
        name: `Todeschini (f'c=${fc} MPa)`,
        line: { color: PLOT_COLORS.todeschini, width: 2.5, shape: "spline" },
        hovertemplate: "Todeschini<br>ε=%{x:.5f}<br>σ=%{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data);

      traces.push({
        x: [tod.e0],
        y: [conv(tod.fc_pp)],
        type: "scatter",
        mode: "markers",
        name: `Tod: ε₀=${tod.e0.toFixed(5)}`,
        marker: { color: PLOT_COLORS.todeschini, size: 9, symbol: "diamond-open", line: { width: 2 } },
        showlegend: true,
        hovertemplate: `Todeschini pico<br>ε₀=${tod.e0.toFixed(5)}<br>f''c=${conv(tod.fc_pp).toFixed(2)} ${unit}<extra></extra>`,
      } as Plotly.Data);
    }

    if (showParabola) {
      traces.push({
        x: par.points.map((p) => p.strain),
        y: par.points.map((p) => conv(p.stress)),
        type: "scatter",
        mode: "lines",
        name: `Parábola-Rect. (fck=${fck_val} MPa)`,
        line: { color: PLOT_COLORS.parabola, width: 2.5, shape: "linear" },
        hovertemplate: "Parábola-Rect.<br>ε=%{x:.5f}<br>σ=%{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data);

      traces.push({
        x: [par.ec2],
        y: [conv(par.fcd)],
        type: "scatter",
        mode: "markers",
        name: `Par: εc2=${par.ec2}`,
        marker: { color: PLOT_COLORS.parabola, size: 9, symbol: "square-open", line: { width: 2 } },
        showlegend: true,
        hovertemplate: `Parábola pico<br>εc2=${par.ec2}<br>fcd=${conv(par.fcd).toFixed(2)} ${unit}<extra></extra>`,
      } as Plotly.Data);
    }

    // Líneas de referencia comunes
    const maxStress = Math.max(
      showHognestad ? conv(hog.fc_pp) : 0,
      showTodeschini ? conv(tod.fc_pp) : 0,
      showParabola ? conv(par.fcd) : 0,
    );

    const shapes: Partial<Plotly.Shape>[] = [
      vlineShape(0.002, "#52525B", "dot"),
      vlineShape(0.003, "#52525B", "dot"),
    ];

    const annotations: Partial<Plotly.Annotations>[] = [
      {
        x: 0.002, y: 0, text: "ε=0.002", showarrow: false,
        yref: "paper", font: { size: 9, color: "#71717A" }, xanchor: "center", yanchor: "top",
      },
      {
        x: 0.003, y: 0, text: "ε=0.003", showarrow: false,
        yref: "paper", font: { size: 9, color: "#71717A" }, xanchor: "center", yanchor: "top",
      },
    ];

    const layout: Partial<Plotly.Layout> = {
      ...BASE_LAYOUT,
      title: {
        text: "Comparación de Modelos Constitutivos",
        font: { size: 14, color: "#FAFAFA" },
        x: 0.5, xanchor: "center",
      },
      xaxis: {
        ...BASE_LAYOUT.xaxis,
        title: { text: "Deformación unitaria ε (mm/mm)", font: { size: 12, color: "#A1A1AA" } },
        range: [0, 0.0037],
        tickformat: ".4f",
      },
      yaxis: {
        ...BASE_LAYOUT.yaxis,
        title: { text: yLabel, font: { size: 12, color: "#A1A1AA" } },
        range: [0, maxStress * 1.15],
      },
      shapes,
      annotations,
      height,
    };

    Plotly.newPlot(plotRef.current, traces, layout, BASE_CONFIG);
    return () => { if (plotRef.current && Plotly) Plotly.purge(plotRef.current); };
  }, [Plotly, fc, fck, unit, height, showHognestad, showTodeschini, showParabola]);

  return <div ref={plotRef} style={{ width: "100%", height }} />;
}
