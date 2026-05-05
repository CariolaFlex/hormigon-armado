// Type declarations for Plotly dynamic imports
declare module "plotly.js" {
  export function newPlot(
    root: HTMLElement,
    data: Data[],
    layout?: Partial<Layout>,
    config?: Partial<Config>
  ): Promise<PlotlyHTMLElement>;

  export function purge(root: HTMLElement): void;
  export function react(
    root: HTMLElement,
    data: Data[],
    layout?: Partial<Layout>,
    config?: Partial<Config>
  ): Promise<PlotlyHTMLElement>;

  export type Data = {
    x?: number[] | string[];
    y?: number[] | string[];
    type?: string;
    mode?: string;
    name?: string;
    line?: Partial<ScatterLine>;
    marker?: Partial<PlotMarker>;
    text?: string | string[];
    textposition?: string;
    textfont?: Partial<Font>;
    hovertemplate?: string;
    showlegend?: boolean;
    fill?: string;
    fillcolor?: string;
    [key: string]: unknown;
  };

  export type Shape = {
    type: "line" | "rect" | "circle" | "path";
    x0: number | string;
    x1: number | string;
    y0: number | string;
    y1: number | string;
    xref?: string;
    yref?: string | YAxisName;
    line?: Partial<ShapeLine>;
    fillcolor?: string;
    opacity?: number;
    layer?: "above" | "below";
  };

  export type YAxisName = "y" | "y2" | "y3" | "paper";

  export type Annotations = {
    x: number | string;
    y: number | string;
    xref?: string;
    yref?: string;
    text: string;
    showarrow?: boolean;
    font?: Partial<Font>;
    xanchor?: string;
    yanchor?: string;
    textangle?: number;
    arrowhead?: number;
    arrowcolor?: string;
    ax?: number;
    ay?: number;
  };

  export type Layout = {
    title: string | { text: string; font?: Partial<Font>; x?: number; xanchor?: string };
    paper_bgcolor: string;
    plot_bgcolor: string;
    font: Partial<Font>;
    margin: { l: number; r: number; t: number; b: number };
    xaxis: Partial<LayoutAxis>;
    yaxis: Partial<LayoutAxis>;
    legend: Partial<Legend>;
    hoverlabel: Partial<HoverLabel>;
    shapes: Partial<Shape>[];
    annotations: Partial<Annotations>[];
    height?: number;
    width?: number;
    showlegend?: boolean;
  };

  export type LayoutAxis = {
    title: string | { text: string; font?: Partial<Font> };
    range: [number, number];
    tickformat: string;
    gridcolor: string;
    zerolinecolor: string;
    tickcolor: string;
    linecolor: string;
    showgrid: boolean;
    zeroline: boolean;
    mirror: boolean;
    tickfont: Partial<Font>;
  };

  export type Legend = {
    bgcolor: string;
    bordercolor: string;
    borderwidth: number;
    font: Partial<Font>;
    orientation: "h" | "v";
    yanchor: string;
    y: number;
    xanchor: string;
    x: number;
  };

  export type HoverLabel = {
    bgcolor: string;
    bordercolor: string;
    font: Partial<Font>;
  };

  export type Font = {
    family: string;
    size: number;
    color: string;
  };

  export type ScatterLine = {
    color: string;
    width: number;
    dash: Dash;
    shape: string;
  };

  export type ShapeLine = {
    color: string;
    width: number;
    dash: Dash;
  };

  export type Dash = "solid" | "dot" | "dash" | "longdash" | "dashdot" | "longdashdot";

  export type PlotMarker = {
    color: string;
    size: number;
    symbol: string;
    line: { width: number; color?: string };
  };

  export type Config = {
    displaylogo: boolean;
    responsive: boolean;
    modeBarButtonsToRemove: string[];
    toImageButtonOptions: {
      format: string;
      filename: string;
      scale: number;
    };
    staticPlot?: boolean;
  };

  export type PlotlyHTMLElement = HTMLElement & {
    data: Data[];
    layout: Partial<Layout>;
    _fullLayout: Layout;
  };
}
