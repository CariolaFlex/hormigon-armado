// @ts-nocheck
"use client";

/**
 * Configuración base para todas las gráficas Plotly
 * Tema oscuro científico de alta calidad — estilo publicación académica
 */

export const PLOT_COLORS = {
  hognestad: "#3B82F6",       // blue-500
  todeschini: "#F59E0B",      // amber-500
  parabola: "#22C55E",        // green-500
  reference: "#A855F7",       // purple-500
  annotLine: "#EF4444",       // red-500
  gridLine: "#27272A",
  zeroLine: "#3F3F46",
  bg: "transparent",
  plotBg: "#111113",
  font: "#A1A1AA",
  fontTitle: "#FAFAFA",
};

export const BASE_LAYOUT: Partial<Plotly.Layout> = {
  paper_bgcolor: PLOT_COLORS.bg,
  plot_bgcolor: PLOT_COLORS.plotBg,
  font: {
    family: "Inter, system-ui, sans-serif",
    color: PLOT_COLORS.font,
    size: 12,
  },
  margin: { l: 60, r: 30, t: 40, b: 60 },
  xaxis: {
    gridcolor: PLOT_COLORS.gridLine,
    zerolinecolor: PLOT_COLORS.zeroLine,
    tickcolor: PLOT_COLORS.font,
    linecolor: PLOT_COLORS.zeroLine,
    showgrid: true,
    zeroline: true,
    mirror: false,
    tickfont: { size: 11 },
  },
  yaxis: {
    gridcolor: PLOT_COLORS.gridLine,
    zerolinecolor: PLOT_COLORS.zeroLine,
    tickcolor: PLOT_COLORS.font,
    linecolor: PLOT_COLORS.zeroLine,
    showgrid: true,
    zeroline: true,
    mirror: false,
    tickfont: { size: 11 },
  },
  legend: {
    bgcolor: "rgba(17,17,19,0.9)",
    bordercolor: "#27272A",
    borderwidth: 1,
    font: { size: 11, color: "#A1A1AA" },
    orientation: "h",
    yanchor: "bottom",
    y: 1.02,
    xanchor: "right",
    x: 1,
  },
  hoverlabel: {
    bgcolor: "#1F1F23",
    bordercolor: "#3F3F46",
    font: { size: 12, color: "#FAFAFA", family: "JetBrains Mono, monospace" },
  },
};

export const BASE_CONFIG: Partial<Plotly.Config> = {
  displaylogo: false,
  responsive: true,
  modeBarButtonsToRemove: ["select2d", "lasso2d", "autoScale2d"],
  toImageButtonOptions: {
    format: "svg",
    filename: "hormigon_graph",
    scale: 2,
  },
};

/** Crea una anotación de línea vertical punteada */
export function vlineAnnotation(x: number, label: string, color: string): Partial<Plotly.Annotations> {
  return {
    x,
    y: 1,
    xref: "x",
    yref: "paper",
    text: label,
    showarrow: false,
    font: { size: 10, color },
    textangle: -90,
    xanchor: "center",
    yanchor: "top",
  };
}

/** Crea una anotación de línea horizontal punteada */
export function hlineAnnotation(y: number, label: string, color: string): Partial<Plotly.Annotations> {
  return {
    x: 1,
    y,
    xref: "paper",
    yref: "y",
    text: label,
    showarrow: false,
    font: { size: 10, color },
    xanchor: "right",
    yanchor: "middle",
  };
}

/** Shape para línea vertical de referencia */
export function vlineShape(x: number, color: string, dash = "dash"): Partial<Plotly.Shape> {
  return {
    type: "line",
    x0: x, x1: x,
    y0: 0, y1: 1,
    yref: "paper",
    line: { color, width: 1.5, dash: dash as Plotly.Dash },
  };
}

/** Shape para línea horizontal de referencia */
export function hlineShape(y: number, color: string, dash = "dash"): Partial<Plotly.Shape> {
  return {
    type: "line",
    x0: 0, x1: 1,
    xref: "paper",
    y0: y, y1: y,
    line: { color, width: 1.5, dash: dash as Plotly.Dash },
  };
}

/** Shape para zona sombreada bajo curva */
export function zoneShape(
  x0: number, x1: number, fillcolor: string, y0 = 0, y1 = 1, yref = "paper"
): Partial<Plotly.Shape> {
  return {
    type: "rect",
    x0, x1, y0, y1,
    yref: yref as Plotly.YAxisName,
    fillcolor,
    line: { width: 0 },
    layer: "below",
  };
}
