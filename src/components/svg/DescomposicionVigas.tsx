"use client";
/** Descomposición en Viga 1 (As - A's) + Viga 2 (A's) — M3 */

interface Props {
  Mn1: number;
  Mn2: number;
  Mn: number;
  As: number;
  As_prima: number;
  width?: number;
  height?: number;
}

export function DescomposicionVigas({ Mn1, Mn2, Mn, As, As_prima, width = 300, height = 160 }: Props) {
  const PAD = 16;
  const W = width - PAD * 2;

  const blockW = (W - 20) / 2;
  const blockH = 60;
  const yBlock = PAD + 18;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <text x={width / 2} y={12} textAnchor="middle" fill="#A1A1AA" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        Descomposición — Doble Armadura
      </text>

      {/* Viga 1 */}
      <rect x={PAD} y={yBlock} width={blockW} height={blockH} fill="#1F1F23" stroke="#22C55E" strokeWidth="1.5" rx="4"/>
      <text x={PAD + blockW / 2} y={yBlock + 14} textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        Viga 1
      </text>
      <text x={PAD + blockW / 2} y={yBlock + 26} textAnchor="middle" fill="#71717A" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
        As - A&apos;s = {(As - As_prima).toFixed(2)} cm²
      </text>
      <text x={PAD + blockW / 2} y={yBlock + 40} textAnchor="middle" fill="#22C55E" fontSize="8" fontFamily="JetBrains Mono, monospace">
        Mn₁ = {Mn1.toFixed(2)} tf·m
      </text>
      <text x={PAD + blockW / 2} y={yBlock + 54} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="JetBrains Mono, monospace">
        bloque Whitney
      </text>

      {/* Suma */}
      <text x={width / 2} y={yBlock + blockH / 2 + 4} textAnchor="middle" fill="#A1A1AA" fontSize="14" fontFamily="JetBrains Mono, monospace">+</text>

      {/* Viga 2 */}
      <rect x={PAD + blockW + 20} y={yBlock} width={blockW} height={blockH} fill="#1F1F23" stroke="#3B82F6" strokeWidth="1.5" rx="4"/>
      <text x={PAD + blockW + 20 + blockW / 2} y={yBlock + 14} textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        Viga 2
      </text>
      <text x={PAD + blockW + 20 + blockW / 2} y={yBlock + 26} textAnchor="middle" fill="#71717A" fontSize="7.5" fontFamily="JetBrains Mono, monospace">
        A&apos;s = {As_prima.toFixed(2)} cm²
      </text>
      <text x={PAD + blockW + 20 + blockW / 2} y={yBlock + 40} textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="JetBrains Mono, monospace">
        Mn₂ = {Mn2.toFixed(2)} tf·m
      </text>
      <text x={PAD + blockW + 20 + blockW / 2} y={yBlock + 54} textAnchor="middle" fill="#52525B" fontSize="7" fontFamily="JetBrains Mono, monospace">
        par de fuerzas
      </text>

      {/* Total */}
      <line x1={PAD} y1={yBlock + blockH + 8} x2={PAD + W} y2={yBlock + blockH + 8} stroke="#3F3F46" strokeWidth="1"/>
      <text x={width / 2} y={yBlock + blockH + 22} textAnchor="middle" fill="#A855F7" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
        Mn = Mn₁ + Mn₂ = {Mn.toFixed(2)} tf·m
      </text>
    </svg>
  );
}
