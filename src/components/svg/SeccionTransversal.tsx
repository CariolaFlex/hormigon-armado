"use client";
/**
 * Sección transversal rectangular con bloque de Whitney y barras de acero
 * M1 — Análisis Sección Rectangular
 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil:     "#22C55E",
  transicion: "#F59E0B",
  fragil:     "#EF4444",
};

interface Props {
  b: number;       // cm ancho
  h: number;       // cm alto
  d: number;       // cm peralte efectivo
  a: number;       // cm bloque compresión
  nb: number;      // número barras
  zona: ZonaFalla;
  width?: number;
  height?: number;
}

export function SeccionTransversal({ b, h, d, a, nb, zona, width = 200, height = 280 }: Props) {
  const PAD = 24;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const scaleX = W / b;

  // Bloque Whitney
  const blockH = a * scaleY;
  const color  = ZONA_COLOR[zona];

  // Barras (fila inferior)
  const barY  = PAD + (h - (h - d)) * scaleY;
  const barR  = Math.max(4, Math.min(8, W / (nb * 3)));
  const barXs = nb <= 1
    ? [PAD + W / 2]
    : Array.from({ length: nb }, (_, i) => PAD + (W / (nb + 1)) * (i + 1));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <pattern id="hatch-comp" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
        </pattern>
      </defs>

      {/* Sección hormigón */}
      <rect x={PAD} y={PAD} width={W} height={H} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5" rx="2" />

      {/* Bloque compresión Whitney */}
      <rect x={PAD} y={PAD} width={W} height={blockH} fill="url(#hatch-comp)" rx="2" />
      <rect x={PAD} y={PAD} width={W} height={blockH} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" rx="2" />

      {/* Etiqueta a */}
      <line x1={PAD + W + 6} y1={PAD} x2={PAD + W + 6} y2={PAD + blockH} stroke={color} strokeWidth="1" />
      <text x={PAD + W + 14} y={PAD + blockH / 2} fill={color} fontSize="9" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        a={a.toFixed(1)}
      </text>

      {/* Etiqueta d */}
      <line x1={PAD - 6} y1={PAD} x2={PAD - 6} y2={barY} stroke="#71717A" strokeWidth="1" strokeDasharray="3,2" />
      <text x={PAD - 14} y={(PAD + barY) / 2} fill="#71717A" fontSize="9" dominantBaseline="middle" textAnchor="middle" fontFamily="JetBrains Mono, monospace" transform={`rotate(-90,${PAD - 14},${(PAD + barY) / 2})`}>
        d={d.toFixed(0)}
      </text>

      {/* Barras de acero */}
      {barXs.map((bx, i) => (
        <g key={i}>
          <circle cx={bx} cy={barY} r={barR + 1} fill="#09090B" />
          <circle cx={bx} cy={barY} r={barR} fill={color} fillOpacity="0.9" />
        </g>
      ))}

      {/* Dimensiones b y h */}
      <text x={PAD + W / 2} y={height - 6} fill="#71717A" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
        b={b} cm
      </text>
      <text x={6} y={PAD + H / 2} fill="#71717A" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" transform={`rotate(-90,6,${PAD + H / 2})`}>
        h={h} cm
      </text>
    </svg>
  );
}
