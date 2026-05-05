"use client";
/** Diagrama de deformaciones para doble fila — M2 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil: "#22C55E", transicion: "#F59E0B", fragil: "#EF4444",
};

interface Props {
  h: number;
  d1: number;   // distancia fila inferior (d_eq o d mayor)
  d2: number;   // distancia fila superior
  c: number;
  eps_s1: number;
  eps_s2: number;
  eps_y: number;
  zona: ZonaFalla;
  width?: number;
  height?: number;
}

export function DeformacionesDobleFila({ h, d1, d2, c, eps_s1, eps_s2, eps_y, zona, width = 200, height = 280 }: Props) {
  const PAD = 28;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const color = ZONA_COLOR[zona];

  const Ecu = 0.003;
  const maxEps = Math.max(Ecu, eps_s1, eps_s2) * 1.1;
  const scaleX = (W * 0.45) / maxEps;

  const xMid = PAD + W * 0.35;

  const yTop  = PAD;
  const yBot  = PAD + H;
  const yNA   = PAD + c * scaleY;
  const yF1   = PAD + d1 * scaleY;
  const yF2   = PAD + d2 * scaleY;

  const xEcu = xMid - Ecu * scaleX;
  const xS1  = xMid + eps_s1 * scaleX;
  const xS2  = xMid + eps_s2 * scaleX;

  const yields1 = eps_s1 >= eps_y;
  const yields2 = eps_s2 >= eps_y;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Perfil sección */}
      <rect x={PAD} y={PAD} width={16} height={H} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1"/>

      {/* Línea cero */}
      <line x1={xMid} y1={yTop - 4} x2={xMid} y2={yBot + 4} stroke="#3F3F46" strokeWidth="1" strokeDasharray="3,2"/>

      {/* Diagrama de deformaciones */}
      <polygon
        points={`${xEcu},${yTop} ${xMid},${yNA} ${xS1},${yF1}`}
        fill={color} fillOpacity="0.1" stroke="none"
      />
      <line x1={xEcu} y1={yTop} x2={xMid} y2={yNA} stroke={color} strokeWidth="1.5"/>
      <line x1={xMid} y1={yNA} x2={xS1} y2={yF1} stroke={color} strokeWidth="1.5"/>

      {/* Fila superior */}
      <circle cx={xS2} cy={yF2} r={4} fill="#F59E0B" fillOpacity="0.9"/>
      <line x1={xMid} y1={yNA} x2={xS2} y2={yF2} stroke="#F59E0B" strokeWidth="1" strokeDasharray="3,2"/>

      {/* Eje neutro */}
      <line x1={PAD} y1={yNA} x2={PAD + W} y2={yNA} stroke="#71717A" strokeWidth="1" strokeDasharray="4,3"/>

      {/* Labels εcu */}
      <text x={xEcu - 2} y={yTop + 10} fill="#71717A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono, monospace">εcu=0.003</text>

      {/* Labels εs1 */}
      <text x={xS1 + 3} y={yF1} fill={yields1 ? color : "#EF4444"} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        ε₁={eps_s1.toFixed(4)}
      </text>

      {/* Labels εs2 */}
      <text x={xS2 + 3} y={yF2} fill={yields2 ? "#F59E0B" : "#EF4444"} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        ε₂={eps_s2.toFixed(4)}
      </text>

      {/* Marcas en la sección */}
      <circle cx={PAD + 8} cy={yF1} r={4} fill={color} fillOpacity="0.9"/>
      <circle cx={PAD + 8} cy={yF2} r={4} fill="#F59E0B" fillOpacity="0.85"/>

      <text x={width / 2} y={height - 4} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="JetBrains Mono, monospace">
        Diagrama de Deformaciones — 2 filas
      </text>
    </svg>
  );
}
