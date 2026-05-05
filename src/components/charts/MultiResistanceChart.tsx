// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { multipleResistanceCurves } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { stressMPaToUnit } from "@/lib/hormigon/units";
import { BASE_LAYOUT, BASE_CONFIG, vlineShape } from "./PlotlyBase";

interface MultiResistanceChartProps {
  unit?: UnitSystem;
  height?: number;
  model?: "todeschini" | "hognestad";
}

const FC_VALUES = [15, 20, 25, 30, 35, 40];
const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#A855F7", "#EF4444", "#06B6D4"];

export default function MultiResistanceChart({
  unit = "MPa",
  height = 380,
  model = "todeschini",
}: MultiResistanceChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [Plotly, setPlotly] = useState<typeof import("plotly.js") | null>(null);

  useEffect(() => {
    import("plotly.js").then((p) => setPlotly(p.default || p as unknown as typeof import("plotly.js")));
  }, []);

  useEffect(() => {
    if (!Plotly || !plotRef.current) return;

    const curves = multipleResistanceCurves(FC_VALUES, model);
    const conv = (v: number) => stressMPaToUnit(v, unit);

    const traces: Plotly.Data[] = curves.map((curve, i) => ({
      x: curve.points.map((p) => p.strain),
      y: curve.points.map((p) => conv(p.stress)),
      type: "scatter",
      mode: "lines",
      name: curve.label,
      line: { color: COLORS[i], width: 2, shape: "spline" },
      hovertemplate: curve.label + "<br>ε=%{x:.5f}<br>σ=%{y:.2f} " + unit + "<extra></extra>",
    } as Plotly.Data));

    // Línea vertical en ε₀ ≈ 0.002 (común a todos los hormigones normales)
    const shapes = [vlineShape(0.002, "#71717A", "dot")];
    const annotations: Partial<Plotly.Annotations>[] = [
      {
        x: 0.002, y: 1, text: "ε₀ ≈ 0.002", showarrow: false,
        yref: "paper", font: { size: 10, color: "#71717A" }, xanchor: "center", yanchor: "bottom",
      },
    ];

    const yLabel = unit === "MPa" ? "σ (MPa)" : "σ (kgf/cm²)";
    const modelLabel = model === "todeschini" ? "Todeschini" : "Hognestad";

    const layout: Partial<Plotly.Layout> = {
      ...BASE_LAYOUT,
      title: {
        text: `Efecto de f'c en la Curva σ-ε — Modelo ${modelLabel}`,
        font: { size: 14, color: "#FAFAFA" }, x: 0.5, xanchor: "center",
      },
      xaxis: {
        ...BASE_LAYOUT.xaxis,
        title: { text: "Deformación unitaria ε (mm/mm)", font: { size: 12, color: "#A1A1AA" } },
        range: [0, 0.0035], tickformat: ".4f",
      },
      yaxis: {
        ...BASE_LAYOUT.yaxis,
        title: { text: yLabel, font: { size: 12, color: "#A1A1AA" } },
      },
      shapes, annotations, height,
    };

    Plotly.newPlot(plotRef.current, traces, layout, BASE_CONFIG);
    return () => { if (plotRef.current && Plotly) Plotly.purge(plotRef.current); };
  }, [Plotly, unit, height, model]);

  return <div ref={plotRef} style={{ width: "100%", height }} />;
}
