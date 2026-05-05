"use client";
/**
 * Diagrama lineal de deformaciones (compatibilidad plana)
 * Usado en M1–M4
 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil:     "#22C55E",
  transicion: "#F59E0B",
  fragil:     "#EF4444",
};

interface Props {
  h: number;
  d: number;
  c: number;
  eps_s: number;
  eps_y: number;
  zona: ZonaFalla;
  width?: number;
  height?: number;
}

export function DiagramaDeformaciones({ h, d, c, eps_s, eps_y, zona, width = 200, height = 280 }: Props) {
  const PAD  = 28;
  const W    = width - PAD * 2;
  const H    = height - PAD * 2;
  const midX = PAD + W * 0.45;
  const color = ZONA_COLOR[zona];

  const scaleY = H / h;

  // Posiciones Y (desde arriba = fibra comprimida)
  const yTop  = PAD;
  const yNA   = PAD + c * scaleY;        // eje neutro
  const yStl  = PAD + d * scaleY;        // acero
  const yBot  = PAD + H;

  // Escala de deformaciones (máx = εcu = 0.003)
  const maxEps = 0.003;
  const EW = W * 0.45;
  const eps_top = maxEps;
  const xComp  = midX - (eps_top / maxEps) * EW;  // compresión → izquierda
  const xSteel = midX + (eps_s / maxEps) * EW;    // tracción → derecha

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Eje vertical (sección) */}
      <line x1={midX} y1={yTop} x2={midX} y2={yBot} stroke="#3F3F46" strokeWidth="1.5" />

      {/* Línea de deformación */}
      <polygon
        points={`${xComp},${yTop} ${midX},${yNA} ${xSteel},${yStl}`}
        fill="none"
        stroke={color}
        strokeWidth="2"
      />

      {/* Zona compresión */}
      <polygon
        points={`${midX},${yTop} ${xComp},${yTop} ${midX},${yNA}`}
        fill={color}
        fillOpacity="0.12"
      />

      {/* Zona tracción */}
      <polygon
        points={`${midX},${yNA} ${xSteel},${yStl} ${midX},${yStl}`}
        fill={color}
        fillOpacity="0.08"
      />

      {/* Eje neutro */}
      <line x1={PAD} y1={yNA} x2={PAD + W} y2={yNA} stroke="#71717A" strokeWidth="1" strokeDasharray="4,3" />
      <text x={PAD - 2} y={yNA} fill="#71717A" fontSize="8" textAnchor="end" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">E.N.</text>

      {/* Etiqueta εcu */}
      <text x={xComp - 2} y={yTop + 10} fill={color} fontSize="8" textAnchor="end" fontFamily="JetBrains Mono, monospace">
        εcu=0.003
      </text>

      {/* Etiqueta εs */}
      <circle cx={xSteel} cy={yStl} r={3} fill={color} />
      <text x={xSteel + 5} y={yStl} fill={color} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        εs={eps_s.toFixed(4)}
      </text>

      {/* Línea εy de referencia */}
      {eps_s < 0.005 && (
        <line
          x1={midX + (eps_y / maxEps) * EW} y1={yStl - 6}
          x2={midX + (eps_y / maxEps) * EW} y2={yStl + 6}
          stroke="#71717A" strokeWidth="1" strokeDasharray="2,2"
        />
      )}

      {/* Etiqueta c */}
      <text x={PAD + W + 4} y={(yTop + yNA) / 2} fill="#71717A" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        c={c.toFixed(1)}
      </text>

      {/* Zona */}
      <text x={width / 2} y={height - 6} fill={color} fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        {zona === "ductil" ? "✓ Dúctil" : zona === "transicion" ? "⚠ Transición" : "✗ Frágil"}
      </text>
    </svg>
  );
}
