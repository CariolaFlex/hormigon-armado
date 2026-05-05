"use client";
/** Diagrama de fuerzas internas C y T — M1 */

interface Props {
  b: number;
  h: number;
  d: number;
  a: number;
  C: number;   // tf
  T: number;   // tf
  brazo: number; // cm
  width?: number;
  height?: number;
}

export function DiagramaFuerzas({ b, h, d, a, C, T, brazo, width = 200, height = 280 }: Props) {
  const PAD = 28;
  const W   = width - PAD * 2;
  const H   = height - PAD * 2;
  const scaleY = H / h;
  const cx  = PAD + W / 2;

  const yTop  = PAD;
  const yC    = PAD + (a / 2) * scaleY;        // centroide bloque compresión
  const yT    = PAD + d * scaleY;               // centroide acero

  const arrowLen = 36;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <defs>
        <marker id="arrow-c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#3B82F6" />
        </marker>
        <marker id="arrow-t" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto-start-reverse">
          <path d="M8,0 L8,6 L0,3 z" fill="#22C55E" />
        </marker>
      </defs>

      {/* Sección */}
      <rect x={PAD} y={PAD} width={W} height={H} fill="#1F1F23" stroke="#3F3F46" strokeWidth="1.5" rx="2" />
      <rect x={PAD} y={PAD} width={W} height={a * scaleY} fill="#3B82F6" fillOpacity="0.15" rx="2" />

      {/* Brazo de par */}
      <line x1={cx + W * 0.35} y1={yC} x2={cx + W * 0.35} y2={yT} stroke="#71717A" strokeWidth="1" strokeDasharray="3,2" />
      <text x={cx + W * 0.35 + 4} y={(yC + yT) / 2} fill="#71717A" fontSize="8" dominantBaseline="middle" fontFamily="JetBrains Mono, monospace">
        {brazo.toFixed(1)} cm
      </text>

      {/* Flecha C (compresión → hacia derecha desde exterior) */}
      <line x1={cx - W * 0.6} y1={yC} x2={cx - arrowLen * 0.4} y2={yC} stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrow-c)" />
      <text x={cx - W * 0.6 - 2} y={yC - 6} fill="#3B82F6" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        C
      </text>
      <text x={cx - W * 0.6 - 2} y={yC + 10} fill="#3B82F6" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">
        {C.toFixed(2)} tf
      </text>

      {/* Flecha T (tracción → hacia izquierda desde exterior) */}
      <line x1={cx + W * 0.6} y1={yT} x2={cx + arrowLen * 0.4} y2={yT} stroke="#22C55E" strokeWidth="2" markerEnd="url(#arrow-t)" />
      <text x={cx + W * 0.6 + 2} y={yT - 6} fill="#22C55E" fontSize="9" textAnchor="start" fontFamily="JetBrains Mono, monospace" fontWeight="600">
        T
      </text>
      <text x={cx + W * 0.6 + 2} y={yT + 10} fill="#22C55E" fontSize="8" textAnchor="start" fontFamily="JetBrains Mono, monospace">
        {T.toFixed(2)} tf
      </text>
    </svg>
  );
}
