// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { todeschiniModel, hognestadModel } from "@/lib/hormigon/models";
import type { UnitSystem } from "@/lib/hormigon/units";
import { stressMPaToUnit } from "@/lib/hormigon/units";
import { BASE_LAYOUT, BASE_CONFIG, PLOT_COLORS, vlineShape, hlineShape, zoneShape } from "./PlotlyBase";

interface StressStrainChartProps {
  fc?: number;         // f'c en MPa
  unit?: UnitSystem;
  height?: number;
  showZones?: boolean;
  showAnnotations?: boolean;
  showBoth?: boolean;  // Muestra Hognestad + Todeschini
}

export default function StressStrainChart({
  fc = 25,
  unit = "MPa",
  height = 400,
  showZones = true,
  showAnnotations = true,
  showBoth = false,
}: StressStrainChartProps) {
  const plotRef = useRef<HTMLDivElement>(null);
  const [Plotly, setPlotly] = useState<typeof import("plotly.js") | null>(null);

  // Dynamic import de Plotly (no SSR)
  useEffect(() => {
    import("plotly.js").then((p) => setPlotly(p.default || p as unknown as typeof import("plotly.js")));
  }, []);

  useEffect(() => {
    if (!Plotly || !plotRef.current) return;

    const hog = hognestadModel(fc);
    const tod = todeschiniModel(fc);

    const convertY = (v: number) => stressMPaToUnit(v, unit);
    const yLabel = unit === "MPa" ? "σ (MPa)" : "σ (kgf/cm²)";

    // Curva principal (Todeschini — incluye rama descendente)
    const todStrains = tod.points.map((p) => p.strain);
    const todStresses = tod.points.map((p) => convertY(p.stress));

    const traces: Plotly.Data[] = [
      {
        x: todStrains,
        y: todStresses,
        type: "scatter",
        mode: "lines",
        name: showBoth ? "Todeschini (completo)" : `f'c = ${fc} MPa`,
        line: { color: PLOT_COLORS.todeschini, width: 2.5, shape: "spline" },
        hovertemplate: "ε = %{x:.5f}<br>σ = %{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data,
    ];

    if (showBoth) {
      const hogStrains = hog.points.map((p) => p.strain);
      const hogStresses = hog.points.map((p) => convertY(p.stress));
      traces.push({
        x: hogStrains,
        y: hogStresses,
        type: "scatter",
        mode: "lines",
        name: "Hognestad (ascendente)",
        line: { color: PLOT_COLORS.hognestad, width: 2.5, dash: "dash", shape: "spline" },
        hovertemplate: "ε = %{x:.5f}<br>σ = %{y:.2f} " + unit + "<extra></extra>",
      } as Plotly.Data);
    }

    // Punto pico (f''c, ε₀)
    traces.push({
      x: [tod.e0],
      y: [convertY(tod.fc_pp)],
      type: "scatter",
      mode: "markers+text",
      name: "Punto pico (ε₀, f''c)",
      marker: { color: PLOT_COLORS.annotLine, size: 10, symbol: "circle" },
      text: [`  ε₀=${tod.e0.toFixed(5)}, f''c=${convertY(tod.fc_pp).toFixed(1)}`],
      textposition: "middle right",
      textfont: { size: 10, color: PLOT_COLORS.annotLine },
      showlegend: true,
      hovertemplate: "Pico<br>ε₀ = %{x:.5f}<br>f''c = %{y:.2f} " + unit + "<extra></extra>",
    } as Plotly.Data);

    // Punto 0.5f'c (límite zona lineal)
    const halfFc = 0.5 * fc;
    const halfFcConverted = convertY(halfFc);
    traces.push({
      x: [tod.e0 * 0.5],
      y: [halfFcConverted],
      type: "scatter",
      mode: "markers+text",
      name: "0.5·f'c (límite lineal)",
      marker: { color: "#22C55E", size: 8, symbol: "diamond" },
      text: [`  0.5·f'c`],
      textposition: "middle right",
      textfont: { size: 9, color: "#22C55E" },
      showlegend: false,
      hovertemplate: "0.5·f'c<br>ε = %{x:.5f}<br>σ = %{y:.2f} " + unit + "<extra></extra>",
    } as Plotly.Data);

    // Zona shapes
    const shapes: Partial<Plotly.Shape>[] = [];
    const annotations: Partial<Plotly.Annotations>[] = [];

    if (showZones) {
      const maxY = convertY(tod.fc_pp * 1.05);
      shapes.push(
        // Zona 1: lineal (azul)
        zoneShape(0, tod.e0 * 0.5, "rgba(59,130,246,0.07)", 0, maxY, "y"),
        // Zona 2: no lineal (ámbar)
        zoneShape(tod.e0 * 0.5, tod.e0, "rgba(245,158,11,0.07)", 0, maxY, "y"),
        // Zona 3: softening (rojo)
        zoneShape(tod.e0, tod.eu * 1.01, "rgba(239,68,68,0.07)", 0, maxY, "y"),
      );

      annotations.push(
        {
          x: tod.e0 * 0.25,
          y: convertY(tod.fc_pp * 0.2),
          text: "① Lineal",
          showarrow: false,
          font: { size: 10, color: "#3B82F6" },
          xanchor: "center",
        },
        {
          x: tod.e0 * 0.75,
          y: convertY(tod.fc_pp * 0.15),
          text: "② No-lineal",
          showarrow: false,
          font: { size: 10, color: "#F59E0B" },
          xanchor: "center",
        },
        {
          x: tod.e0 + (tod.eu - tod.e0) * 0.5,
          y: convertY(tod.fc_pp * 0.15),
          text: "③ Softening",
          showarrow: false,
          font: { size: 10, color: "#EF4444" },
          xanchor: "center",
        },
      );
    }

    if (showAnnotations) {
      // Líneas de referencia
      shapes.push(
        vlineShape(tod.e0, "#EF4444", "dot"),
        hlineShape(convertY(tod.fc_pp), "#EF4444", "dot"),
        hlineShape(convertY(0.5 * fc), "#22C55E", "dot"),
      );
      annotations.push(
        {
          x: tod.e0,
          y: 0,
          text: "ε₀",
          showarrow: false,
          yref: "paper",
          font: { size: 11, color: "#EF4444" },
          xanchor: "center",
          yanchor: "top",
        },
        {
          x: 0,
          y: convertY(tod.fc_pp),
          text: "f''c",
          showarrow: false,
          xref: "paper",
          font: { size: 11, color: "#EF4444" },
          xanchor: "right",
          yanchor: "middle",
        },
        {
          x: 0,
          y: convertY(0.5 * fc),
          text: "0.5f'c",
          showarrow: false,
          xref: "paper",
          font: { size: 10, color: "#22C55E" },
          xanchor: "right",
          yanchor: "middle",
        },
      );
    }

    // Eje inicial elástico (tangente al origen = Ec)
    const Ec_converted = stressMPaToUnit(tod.Ec, unit) / 1000; // por escala de ε (mm/mm)
    const eTangent = [0, tod.e0 * 0.35];
    traces.push({
      x: eTangent,
      y: eTangent.map((e) => e * Ec_converted),
      type: "scatter",
      mode: "lines",
      name: "Módulo elástico Ec (tangente)",
      line: { color: "#A855F7", width: 1.5, dash: "dot" },
      hovertemplate: "Et<br>ε = %{x:.5f}<br>σ = %{y:.2f} " + unit + "<extra></extra>",
    } as Plotly.Data);

    const layout: Partial<Plotly.Layout> = {
      ...BASE_LAYOUT,
      title: {
        text: `Curva σ-ε — f'c = ${fc} ${unit === "MPa" ? "MPa" : `${(fc * 10.1972).toFixed(0)} kgf/cm²`}`,
        font: { size: 14, color: "#FAFAFA" },
        x: 0.5,
        xanchor: "center",
      },
      xaxis: {
        ...BASE_LAYOUT.xaxis,
        title: { text: "Deformación unitaria ε (mm/mm)", font: { size: 12, color: "#A1A1AA" } },
        tickformat: ".4f",
        range: [0, tod.eu * 1.1],
      },
      yaxis: {
        ...BASE_LAYOUT.yaxis,
        title: { text: yLabel, font: { size: 12, color: "#A1A1AA" } },
        range: [0, convertY(tod.fc_pp * 1.12)],
      },
      shapes,
      annotations,
      height,
    };

    Plotly.newPlot(plotRef.current, traces, layout, BASE_CONFIG);

    return () => {
      if (plotRef.current && Plotly) Plotly.purge(plotRef.current);
    };
  }, [Plotly, fc, unit, height, showZones, showAnnotations, showBoth]);

  return (
    <div ref={plotRef} style={{ width: "100%", height }} className="w-full" />
  );
}
