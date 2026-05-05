// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { calcEc } from "@/lib/hormigon/models";
import { BASE_LAYOUT, BASE_CONFIG, PLOT_COLORS, vlineShape } from "./PlotlyBase";

interface EcVsFcChartProps {
  height?: number;
  wcValues?: number[];
}

export default function EcVsFcChart({ height = 360, wcValues = [1850, 2300, 2550] }: EcVsFcChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [Plotly, setPlotly] = useState<typeof import("plotly.js") | null>(null);

  useEffect(() => {
    import("plotly.js").then((p) => setPlotly(p.default || p as unknown as typeof import("plotly.js")));
  }, []);

  useEffect(() => {
    if (!Plotly || !plotRef.current) return;

    const fcRange = Array.from({ length: 60 }, (_, i) => i + 10); // 10..69 MPa
    const wcLabels = ["Liviano (1850 kg/m³)", "Normal (2300 kg/m³)", "Pesado (2550 kg/m³)"];
    const colors = [PLOT_COLORS.hognestad, PLOT_COLORS.parabola, PLOT_COLORS.todeschini];

    const traces: Plotly.Data[] = wcValues.map((wc, i) => ({
      x: fcRange,
      y: fcRange.map((fc) => calcEc(fc, wc).Ec_general / 1000), // en GPa
      type: "scatter",
      mode: "lines",
      name: wcLabels[i] ?? `wc = ${wc} kg/m³`,
      line: { color: colors[i], width: 2.5, shape: "spline" },
      hovertemplate: `wc=${wc}<br>f'c=%{x} MPa<br>Ec=%{y:.2f} GPa<extra></extra>`,
    } as Plotly.Data));

    // Línea de f'c = 40 MPa (límite ACI)
    const shapes = [vlineShape(40, "#EF4444", "dot")];
    const annotations: Partial<Plotly.Annotations>[] = [
      {
        x: 40, y: 1, text: "f'c=40 MPa<br>(límite ACI)", showarrow: false,
        yref: "paper", font: { size: 10, color: "#EF4444" }, xanchor: "center", yanchor: "bottom",
      },
    ];

    const layout: Partial<Plotly.Layout> = {
      ...BASE_LAYOUT,
      title: {
        text: "Módulo de Elasticidad Ec vs f'c",
        font: { size: 14, color: "#FAFAFA" }, x: 0.5, xanchor: "center",
      },
      xaxis: {
        ...BASE_LAYOUT.xaxis,
        title: { text: "Resistencia f'c (MPa)", font: { size: 12, color: "#A1A1AA" } },
      },
      yaxis: {
        ...BASE_LAYOUT.yaxis,
        title: { text: "Ec (GPa)", font: { size: 12, color: "#A1A1AA" } },
      },
      shapes, annotations, height,
    };

    Plotly.newPlot(plotRef.current, traces, layout, BASE_CONFIG);
    return () => { if (plotRef.current && Plotly) Plotly.purge(plotRef.current); };
  }, [Plotly, height, wcValues]);

  return <div ref={plotRef} style={{ width: "100%", height }} />;
}
