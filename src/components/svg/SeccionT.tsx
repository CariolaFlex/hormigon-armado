"use client";
/** Sección T con ala y alma — M4 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil: "#22C55E", transicion: "#F59E0B", fragil: "#EF4444",
};

interface Props {
  bw: number; b: number; hf: number; h: number; d: number;
  a: number; c: number; caso: 1 | 2;
  nb: number; zona: ZonaFalla;
  width?: number; height?: number;
}

export function SeccionT({ bw, b, hf, h, d, a, c, caso, nb, zona, width = 220, height = 300 }: Props) {
  const PAD = 28;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const scaleX = W / b;

  const color = ZONA_COLOR[zona];

  // Ala centrada sobre alma
  const alaW   = W;
  const alaH   = hf * scaleY;
  const almaW  = bw * scaleX;
  const almaX  = PAD + (W - almaW) / 2;
  const almaH  = (h - hf) * scaleY;

  // Bloque compresión
  const blockH = Math.min(a * scaleY, alaH + almaH);

  // Barras
  const yBar = PAD + d * scaleY;
  const barR = Math.max(4, Math.min(7, almaW / (nb * 2.5)));
  const barXs = nb <= 1
    ? [almaX + almaW / 2]
    : Array.from({ length: nb }, (_, i) => almaX + (almaW / (nb + 1)) * (i + 1));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <pattern id="hatch-t" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.5"/>
        </pattern>
      </defs>

      {/* Ala */}
      <rect x={PAD} y={PAD} width={alaW} height={alaH} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5"/>

      {/* Alma */}
      <rect x={almaX} y={PAD + alaH} width={almaW} height={almaH} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5"/>

      {/* Bloque compresión */}
      {caso === 1 ? (
        // a ≤ hf → bloque en ala completa
        <rect x={PAD} y={PAD} width={alaW} height={blockH} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
      ) : (
        // a > hf → ala completa + parte del alma
        <>
          <rect x={PAD} y={PAD} width={alaW} height={alaH} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
          <rect x={almaX} y={PAD + alaH} width={almaW} height={blockH - alaH} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.5"/>
        </>
      )}

      {/* Barras */}
      {barXs.map((bx, i) => (
        <g key={i}>
          <circle cx={bx} cy={yBar} r={barR + 1} fill="#09090B"/>
          <circle cx={bx} cy={yBar} r={barR} fill={color} fillOpacity="0.9"/>
        </g>
      ))}

      {/* Etiquetas */}
      <text x={PAD + alaW + 4} y={PAD + alaH / 2} fill="#71717A" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">hf={hf}</text>
      <text x={PAD + alaW / 2} y={height - 6} fill="#71717A" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">b={b}  bw={bw}  caso {caso}</text>
      <text x={PAD + alaW + 4} y={PAD + a * scaleY} fill={color} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">a={a.toFixed(1)}</text>
    </svg>
  );
}
