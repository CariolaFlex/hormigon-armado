"use client";
/** Comparación Mn exacto vs Mn aprox — M2 */

interface Props {
  Mn: number;
  Mn_aprox: number;
  phiMn: number;
  Mu?: number | null;
  width?: number;
  height?: number;
}

export function ComparacionMetodos({ Mn, Mn_aprox, phiMn, Mu, width = 260, height = 160 }: Props) {
  const PAD = 20;
  const W = width - PAD * 2;
  const H = height - PAD * 2;

  const maxVal = Math.max(Mn, Mn_aprox, Mu ?? 0) * 1.15;
  const barH = 28;
  const barGap = 10;

  const vals = [
    { label: "Mn exacto", value: Mn, color: "#22C55E" },
    { label: "Mn aprox", value: Mn_aprox, color: "#F59E0B" },
    { label: "φMn", value: phiMn, color: "#3B82F6" },
    ...(Mu ? [{ label: "Mu requerido", value: Mu, color: "#EF4444" }] : []),
  ];

  const totalBarsH = vals.length * (barH + barGap) - barGap;
  const startY = PAD + (H - totalBarsH) / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <text x={width / 2} y={12} textAnchor="middle" fill="#A1A1AA" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        Comparación de Métodos
      </text>
      {vals.map((v, i) => {
        const barW = maxVal > 0 ? (v.value / maxVal) * (W - 80) : 0;
        const y = startY + i * (barH + barGap);
        return (
          <g key={v.label}>
            <text x={PAD} y={y + barH / 2} fill="#71717A" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
              {v.label}
            </text>
            <rect x={PAD + 72} y={y} width={barW} height={barH} fill={v.color} fillOpacity="0.2" rx="3"/>
            <rect x={PAD + 72} y={y} width={barW} height={barH} fill="none" stroke={v.color} strokeWidth="1.5" rx="3"/>
            <text x={PAD + 72 + barW + 4} y={y + barH / 2} fill={v.color} fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
              {v.value.toFixed(2)}
            </text>
          </g>
        );
      })}
      <text x={width / 2} y={height - 4} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="JetBrains Mono, monospace">
        [tf·m]
      </text>
    </svg>
  );
}
