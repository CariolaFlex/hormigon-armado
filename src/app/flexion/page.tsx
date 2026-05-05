import Link from "next/link";
import { Calculator } from "lucide-react";

const MODULOS = [
  {
    href: "/flexion/rectangular",
    title: "Sección Rectangular",
    desc: "Análisis con armadura simple. Bloque de Whitney, zona de falla, φMn.",
    badge: "M1",
    accent: "blue",
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/30",
    text: "text-accent-blue",
  },
  {
    href: "/flexion/doble-fila",
    title: "Doble Fila de Acero",
    desc: "Dos filas de barras. Distancia efectiva equivalente. Mn exacto vs. aproximado.",
    badge: "M2",
    accent: "amber",
    bg: "bg-accent-amber/10",
    border: "border-accent-amber/30",
    text: "text-accent-amber",
  },
  {
    href: "/flexion/doble-armadura",
    title: "Doble Armadura (As + A's)",
    desc: "Acero en tracción y compresión. Descomposición en Viga 1 + Viga 2.",
    badge: "M3",
    accent: "green",
    bg: "bg-accent-green/10",
    border: "border-accent-green/30",
    text: "text-accent-green",
  },
  {
    href: "/flexion/viga-t",
    title: "Viga T",
    desc: "Sección T con ala efectiva. Auto-detección Caso 1 (a≤hf) o Caso 2 (a>hf).",
    badge: "M4",
    accent: "purple",
    bg: "bg-accent-purple/10",
    border: "border-accent-purple/30",
    text: "text-accent-purple",
  },
];

export default function FlexionPage() {
  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-accent-blue/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-accent-blue" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Análisis — Flexión</h1>
        </div>
        <p className="text-text-muted text-sm mb-8 ml-12">
          Módulos de análisis de vigas en flexión · ACI 318-19 · NCh430
        </p>

        <div className="grid grid-cols-2 gap-4">
          {MODULOS.map(m => (
            <Link key={m.href} href={m.href}
              className={`rounded-2xl border ${m.border} ${m.bg} p-6 hover:scale-[1.02] transition-transform block`}>
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-bold ${m.text} bg-bg-base px-2 py-0.5 rounded-full border ${m.border}`}>
                  {m.badge}
                </span>
              </div>
              <h2 className={`text-lg font-bold ${m.text} mb-2`}>{m.title}</h2>
              <p className="text-text-muted text-sm leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
