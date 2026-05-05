"use client";
/** Sección transversal con 2 filas de acero — M2 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil: "#22C55E", transicion: "#F59E0B", fragil: "#EF4444",
};

interface Props {
  b: number; h: number;
  d1: number; d2: number;
  nb1: number; nb2: number;
  a: number; c: number;
  zona: ZonaFalla;
  width?: number; height?: number;
}

export function SeccionDobleFila({ b, h, d1, d2, nb1, nb2, a, c, zona, width = 200, height = 280 }: Props) {
  const PAD = 24;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const color = ZONA_COLOR[zona];

  const blockH = a * scaleY;
  const yFila1 = PAD + (h - (h - d2)) * scaleY;  // fila inferior
  const yFila2 = PAD + (h - (h - d1)) * scaleY;  // fila superior
  const barR = Math.max(4, Math.min(7, W / ((nb1 + nb2) * 2.5)));

  const makeBarXs = (nb: number) =>
    nb <= 1 ? [PAD + W / 2] : Array.from({ length: nb }, (_, i) => PAD + (W / (nb + 1)) * (i + 1));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <pattern id="hatch-df" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.6"/>
        </pattern>
      </defs>
      <rect x={PAD} y={PAD} width={W} height={H} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5" rx="2"/>
      <rect x={PAD} y={PAD} width={W} height={blockH} fill="url(#hatch-df)" rx="2"/>
      <rect x={PAD} y={PAD} width={W} height={blockH} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" rx="2"/>

      {/* Eje neutro */}
      <line x1={PAD} y1={PAD + c * scaleY} x2={PAD + W} y2={PAD + c * scaleY} stroke="#71717A" strokeWidth="1" strokeDasharray="4,3"/>
      <text x={PAD + W + 2} y={PAD + c * scaleY} fill="#71717A" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">c</text>

      {/* Fila inferior (As1) */}
      {makeBarXs(nb1).map((bx, i) => (
        <g key={`f1-${i}`}>
          <circle cx={bx} cy={yFila1} r={barR + 1} fill="#09090B"/>
          <circle cx={bx} cy={yFila1} r={barR} fill={color} fillOpacity="0.9"/>
        </g>
      ))}

      {/* Fila superior (As2) */}
      {makeBarXs(nb2).map((bx, i) => (
        <g key={`f2-${i}`}>
          <circle cx={bx} cy={yFila2} r={barR + 1} fill="#09090B"/>
          <circle cx={bx} cy={yFila2} r={barR} fill="#F59E0B" fillOpacity="0.85"/>
        </g>
      ))}

      {/* Labels */}
      <text x={PAD + W + 2} y={yFila1} fill={color} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">d₂</text>
      <text x={PAD + W + 2} y={yFila2} fill="#F59E0B" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">d₁</text>
      <text x={PAD + W / 2} y={height - 6} fill="#71717A" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">b={b}cm · h={h}cm</text>
    </svg>
  );
}
