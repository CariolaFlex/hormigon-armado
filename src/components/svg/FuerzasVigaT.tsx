"use client";
/** Fuerzas internas en Viga T — M4 */

import type { ZonaFalla } from "@/types/index";

const ZONA_COLOR: Record<ZonaFalla, string> = {
  ductil: "#22C55E", transicion: "#F59E0B", fragil: "#EF4444",
};

interface Props {
  bw: number; b: number; hf: number; h: number; d: number;
  a: number; c: number; caso: 1 | 2;
  As: number; zona: ZonaFalla;
  width?: number; height?: number;
}

export function FuerzasVigaT({ bw, b, hf, h, d, a, c, caso, As, zona, width = 220, height = 300 }: Props) {
  const PAD = 28;
  const W = width - PAD * 2;
  const H = height - PAD * 2;
  const scaleY = H / h;
  const scaleX = W / b;
  const color = ZONA_COLOR[zona];

  const alaH  = hf * scaleY;
  const almaW = bw * scaleX;
  const almaX = PAD + (W - almaW) / 2;
  const almaH = (h - hf) * scaleY;
  const blockH = Math.min(a * scaleY, alaH + almaH);

  const yAs   = PAD + d * scaleY;
  const yCentC = caso === 1 ? PAD + blockH / 2 : PAD + blockH / 2;
  const xMid  = PAD + W / 2;

  // Fuerza C (compresión) — flecha hacia abajo en la zona comprimida
  const arrowLen = 32;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <marker id="arrow-c" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill={color}/>
        </marker>
        <marker id="arrow-t" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <polygon points="0,0 8,4 0,8" fill={color}/>
        </marker>
      </defs>

      {/* Sección T outline */}
      <rect x={PAD} y={PAD} width={W} height={alaH} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5"/>
      <rect x={almaX} y={PAD + alaH} width={almaW} height={almaH} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5"/>

      {/* Bloque compresión */}
      {caso === 1 ? (
        <rect x={PAD} y={PAD} width={W} height={blockH} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
      ) : (
        <>
          <rect x={PAD} y={PAD} width={W} height={alaH} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
          <rect x={almaX} y={PAD + alaH} width={almaW} height={blockH - alaH} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/>
        </>
      )}

      {/* Barras tracción */}
      {[1, 2, 3].filter((_, i) => i < Math.min(3, 4)).map((_, i) => {
        const barXs = [almaX + almaW * 0.25, almaX + almaW * 0.5, almaX + almaW * 0.75];
        return (
          <g key={i}>
            <circle cx={barXs[i]} cy={yAs} r={5} fill="#09090B"/>
            <circle cx={barXs[i]} cy={yAs} r={4} fill={color} fillOpacity="0.9"/>
          </g>
        );
      })}

      {/* Flecha C — compresión */}
      <line
        x1={xMid} y1={yCentC - arrowLen / 2}
        x2={xMid} y2={yCentC + arrowLen / 2 - 8}
        stroke={color} strokeWidth="2"
        markerEnd="url(#arrow-c)"
      />
      <text x={xMid + 6} y={yCentC} fill={color} fontSize="9" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">C</text>

      {/* Flecha T — tracción */}
      <line
        x1={xMid} y1={yAs + arrowLen / 2}
        x2={xMid} y2={yAs - arrowLen / 2 + 8}
        stroke={color} strokeWidth="2"
        markerEnd="url(#arrow-t)"
      />
      <text x={xMid + 6} y={yAs + 4} fill={color} fontSize="9" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">T</text>

      {/* Brace moment */}
      <line x1={xMid - 14} y1={yCentC} x2={xMid - 14} y2={yAs} stroke="#52525B" strokeWidth="1" strokeDasharray="3,2"/>
      <line x1={xMid - 18} y1={yCentC} x2={xMid - 10} y2={yCentC} stroke="#52525B" strokeWidth="1"/>
      <line x1={xMid - 18} y1={yAs} x2={xMid - 10} y2={yAs} stroke="#52525B" strokeWidth="1"/>
      <text x={xMid - 20} y={(yCentC + yAs) / 2} fill="#52525B" fontSize="7.5" textAnchor="middle" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">z</text>

      {/* Label */}
      <text x={width / 2} y={height - 4} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="JetBrains Mono, monospace">
        As={As.toFixed(2)} cm² · caso {caso}
      </text>
    </svg>
  );
}
