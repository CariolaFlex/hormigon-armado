"use client";
/** Diagrama de momentos M(x) o cortantes V(x) -- M6 */

import type { PuntoMomento } from "@/types/index";

interface Props {
  puntos: PuntoMomento[];
  tipo: "M" | "V";
  Mmax?: number;
  Vmax?: number;
  /** Color override */
  color?: string;
  /** Etiqueta eje Y override */
  label?: string;
  /** Longitud viga override */
  L?: number;
  width?: number;
  height?: number;
}

export function DiagramaMomentos({
  puntos, tipo, Mmax, Vmax,
  color: colorProp, label: labelProp, L: Lprop,
  width = 400, height = 200,
}: Props) {
  const PAD = 32;
  const W = width - PAD * 2;
  const H = height - PAD * 2;

  if (!puntos.length) return null;

  const L = Lprop ?? puntos[puntos.length - 1].x;
  const vals = puntos.map(p => tipo === "M" ? p.M : p.V);
  const maxAbs = Math.max(...vals.map(Math.abs), 0.001);
  const color = colorProp ?? (tipo === "M" ? "#3B82F6" : "#F59E0B");
  const labelDefault = tipo === "M" ? "M (tf*m)" : "V (tf)";
  const label = labelProp ?? labelDefault;
  const maxVal = tipo === "M" ? Mmax : Vmax;
  const maxLabel = tipo === "M" ? "Mmax" : "Vmax";
  const maxUnit = tipo === "M" ? "tf*m" : "tf";

  const baseY = PAD + H / 2;

  const toX = (x: number) => PAD + (x / L) * W;
  const toY = (v: number) => baseY - (v / maxAbs) * (H / 2 - 4);

  const pathD = puntos
    .map((p, i) => {
      const x = toX(p.x);
      const y = toY(tipo === "M" ? p.M : p.V);
      return (i === 0 ? "M" : "L") + `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const fillPath = `${pathD} L${toX(L)},${baseY} L${toX(0)},${baseY} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Eje X */}
      <line x1={PAD} y1={baseY} x2={PAD + W} y2={baseY} stroke="#3F3F46" strokeWidth="1.5"/>

      {/* Relleno */}
      <path d={fillPath} fill={color} fillOpacity="0.12"/>

      {/* Curva */}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>

      {/* Maximo */}
      {maxVal !== undefined && (
        <text x={PAD + W / 2} y={PAD + 10} fill={color} fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          {maxLabel} = {maxVal.toFixed(3)} {maxUnit}
        </text>
      )}

      {/* Labels ejes */}
      <text x={PAD - 4} y={baseY} fill="#71717A" fontSize="8" textAnchor="end" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">0</text>
      <text x={PAD} y={PAD + H + 14} fill="#71717A" fontSize="8" fontFamily="JetBrains Mono, monospace">0</text>
      <text x={PAD + W} y={PAD + H + 14} fill="#71717A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono, monospace">{L.toFixed(1)}m</text>
      <text x={PAD - 4} y={PAD + 4} fill={color} fontSize="8" textAnchor="end" fontFamily="JetBrains Mono, monospace">{label}</text>
    </svg>
  );
}
