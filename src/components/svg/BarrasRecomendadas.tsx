"use client";
/** Gráfico de barras comerciales recomendadas — M5 */

import type { OpcionBarras } from "@/types/index";

interface Props {
  opciones: OpcionBarras[];
  As_req: number;
  width?: number;
  height?: number;
}

export function BarrasRecomendadas({ opciones, As_req, width = 360, height = 200 }: Props) {
  const PAD = 40;
  const W = width - PAD * 2;
  const H = height - PAD - 20;

  if (!opciones.length) return null;

  const maxAs = Math.max(...opciones.map(o => o.As_real), As_req * 1.3);
  const barW  = Math.min(50, W / opciones.length - 12);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Línea As_req */}
      const reqY = PAD + H * (1 - As_req / maxAs);
      <line x1={PAD} y1={PAD + H * (1 - As_req / maxAs)} x2={PAD + W} y2={PAD + H * (1 - As_req / maxAs)}
        stroke="#EF4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x={PAD + W + 2} y={PAD + H * (1 - As_req / maxAs)} fill="#EF4444" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        As_req
      </text>

      {/* Barras */}
      {opciones.map((op, i) => {
        const barH = H * (op.As_real / maxAs);
        const x = PAD + (W / opciones.length) * i + (W / opciones.length - barW) / 2;
        const y = PAD + H - barH;
        const isFirst = i === 0;
        const color = isFirst ? "#3B82F6" : "#3F3F46";

        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill={color} fillOpacity={isFirst ? 0.8 : 0.5} rx="3"/>
            {isFirst && <rect x={x} y={y} width={barW} height={barH} fill="none" stroke="#3B82F6" strokeWidth="1.5" rx="3"/>}
            <text x={x + barW / 2} y={y - 4} fill={isFirst ? "#3B82F6" : "#71717A"} fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
              {op.As_real.toFixed(2)}
            </text>
            <text x={x + barW / 2} y={PAD + H + 10} fill={isFirst ? "#3B82F6" : "#71717A"} fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight={isFirst ? "600" : "400"}>
              {op.nb}ϕ{op.phi}
            </text>
          </g>
        );
      })}

      {/* Eje Y */}
      <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + H} stroke="#3F3F46" strokeWidth="1"/>
      <text x={PAD - 4} y={PAD} fill="#71717A" fontSize="8" textAnchor="end" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">{maxAs.toFixed(1)}</text>
      <text x={PAD - 4} y={PAD + H} fill="#71717A" fontSize="8" textAnchor="end" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">0</text>
      <text x={PAD - 2} y={PAD + H / 2} fill="#71717A" fontSize="7" textAnchor="middle" fontFamily="JetBrains Mono, monospace" transform={`rotate(-90,${PAD - 14},${PAD + H / 2})`}>As (cm²)</text>
    </svg>
  );
}
