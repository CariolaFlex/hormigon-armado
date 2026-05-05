"use client";
/** Sección con doble armadura As (tracción) + A's (compresión) — M3 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil: "#22C55E", transicion: "#F59E0B", fragil: "#EF4444",
};

interface Props {
  b: number; h: number; d: number; d_prima: number;
  nb: number; nb_prima: number;
  a: number; c: number; zona: ZonaFalla;
  fluye_prima: boolean;
  width?: number; height?: number;
}

export function SeccionDobleArmadura({ b, h, d, d_prima, nb, nb_prima, a, c, zona, fluye_prima, width = 200, height = 280 }: Props) {
  const PAD = 24;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const color = ZONA_COLOR[zona];
  const colorPrima = fluye_prima ? "#3B82F6" : "#EF4444";

  const blockH = a * scaleY;
  const yAs    = PAD + d * scaleY;
  const yAsp   = PAD + d_prima * scaleY;
  const barR   = Math.max(4, Math.min(7, W / (nb * 2.5)));
  const barRp  = Math.max(3, Math.min(6, W / (nb_prima * 3)));

  const makeBarXs = (n: number) =>
    n <= 1 ? [PAD + W / 2] : Array.from({ length: n }, (_, i) => PAD + (W / (n + 1)) * (i + 1));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <pattern id="hatch-da" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>
        </pattern>
      </defs>
      <rect x={PAD} y={PAD} width={W} height={H} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5" rx="2"/>
      <rect x={PAD} y={PAD} width={W} height={blockH} fill="url(#hatch-da)" rx="2"/>
      <rect x={PAD} y={PAD} width={W} height={blockH} fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" rx="2"/>

      {/* Eje neutro */}
      <line x1={PAD} y1={PAD + c * scaleY} x2={PAD + W} y2={PAD + c * scaleY} stroke="#71717A" strokeWidth="1" strokeDasharray="4,3"/>

      {/* A's (compresión — arriba) */}
      {makeBarXs(nb_prima).map((bx, i) => (
        <g key={`ap-${i}`}>
          <circle cx={bx} cy={yAsp} r={barRp + 1} fill="#09090B"/>
          <circle cx={bx} cy={yAsp} r={barRp} fill={colorPrima} fillOpacity="0.9"/>
        </g>
      ))}

      {/* As (tracción — abajo) */}
      {makeBarXs(nb).map((bx, i) => (
        <g key={`a-${i}`}>
          <circle cx={bx} cy={yAs} r={barR + 1} fill="#09090B"/>
          <circle cx={bx} cy={yAs} r={barR} fill={color} fillOpacity="0.9"/>
        </g>
      ))}

      <text x={PAD + W + 2} y={yAsp} fill={colorPrima} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">A's</text>
      <text x={PAD + W + 2} y={yAs} fill={color} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">As</text>
    </svg>
  );
}
