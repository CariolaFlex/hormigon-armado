"use client";
/** Diagrama de deformaciones para doble armadura — M3 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil: "#22C55E", transicion: "#F59E0B", fragil: "#EF4444",
};

interface Props {
  h: number;
  d: number;
  d_prima: number;
  c: number;
  eps_s: number;
  eps_s_prima: number;
  eps_y: number;
  zona: ZonaFalla;
  fluye_prima: boolean;
  width?: number;
  height?: number;
}

export function DeformacionesDobleArmadura({ h, d, d_prima, c, eps_s, eps_s_prima, eps_y, zona, fluye_prima, width = 200, height = 280 }: Props) {
  const PAD = 28;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const color = ZONA_COLOR[zona];
  const colorPrima = fluye_prima ? "#3B82F6" : "#EF4444";

  const Ecu = 0.003;
  const maxEps = Math.max(Ecu, eps_s, Math.abs(eps_s_prima)) * 1.1;
  const scaleX = (W * 0.4) / maxEps;

  const xMid = PAD + W * 0.4;

  const yTop  = PAD;
  const yNA   = PAD + c * scaleY;
  const yAs   = PAD + d * scaleY;
  const yAsp  = PAD + d_prima * scaleY;

  const xEcu  = xMid - Ecu * scaleX;
  const xS    = xMid + eps_s * scaleX;
  const xSp   = xMid - Math.abs(eps_s_prima) * scaleX;  // compresión → izquierda

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Perfil sección */}
      <rect x={PAD} y={PAD} width={16} height={H} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1"/>

      {/* Línea cero */}
      <line x1={xMid} y1={yTop - 4} x2={xMid} y2={PAD + H + 4} stroke="#3F3F46" strokeWidth="1" strokeDasharray="3,2"/>

      {/* Diagrama lineal */}
      <line x1={xEcu} y1={yTop} x2={xMid} y2={yNA} stroke={color} strokeWidth="1.5"/>
      <line x1={xMid} y1={yNA} x2={xS} y2={yAs} stroke={color} strokeWidth="1.5"/>

      {/* Relleno */}
      <polygon
        points={`${xEcu},${yTop} ${xMid},${yNA} ${xS},${yAs} ${xMid},${yAs}`}
        fill={color} fillOpacity="0.08"
      />

      {/* Eje neutro */}
      <line x1={PAD} y1={yNA} x2={PAD + W} y2={yNA} stroke="#71717A" strokeWidth="1" strokeDasharray="4,3"/>

      {/* ε's en compresión */}
      <circle cx={xSp} cy={yAsp} r={4} fill={colorPrima} fillOpacity="0.9"/>
      <line x1={xSp} y1={yAsp} x2={xMid} y2={yNA} stroke={colorPrima} strokeWidth="1" strokeDasharray="3,2"/>

      {/* Barras en sección */}
      <circle cx={PAD + 8} cy={yAs} r={4} fill={color} fillOpacity="0.9"/>
      <circle cx={PAD + 8} cy={yAsp} r={4} fill={colorPrima} fillOpacity="0.9"/>

      {/* Labels */}
      <text x={xEcu - 2} y={yTop + 10} fill="#71717A" fontSize="8" textAnchor="end" fontFamily="JetBrains Mono, monospace">εcu</text>
      <text x={xS + 3} y={yAs} fill={color} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        εs={eps_s.toFixed(4)}
      </text>
      <text x={xSp - 3} y={yAsp} fill={colorPrima} fontSize="8" dominantBaseline="middle" textAnchor="end" fontFamily="JetBrains Mono, monospace">
        ε&apos;s={eps_s_prima.toFixed(4)}
      </text>
      <text x={xSp - 3} y={yAsp + 10} fill={colorPrima} fontSize="7" dominantBaseline="middle" textAnchor="end" fontFamily="JetBrains Mono, monospace">
        {fluye_prima ? "fluye ✓" : "no fluye"}
      </text>

      <text x={width / 2} y={height - 4} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="JetBrains Mono, monospace">
        Diagrama de Deformaciones — Doble Armadura
      </text>
    </svg>
  );
}
