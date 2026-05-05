import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FlaskConical, Layers, BarChart3, Wrench, Sigma, Ruler, TrendingUp, Zap } from "lucide-react";

const SECTIONS = [
  {
    label: "Materiales",
    description: "Comportamiento mecánico del hormigón — modelos constitutivos, módulo de elasticidad, glosario.",
    color: "blue",
    items: [
      { label: "Laboratorio σ-ε", href: "/materiales/hormigon/laboratorio", icon: FlaskConical, desc: "Hognestad · Todeschini · Parábola-Rect." },
      { label: "Teoría & Glosario", href: "/materiales/hormigon/teoria", icon: BookOpen, desc: "Composición, tipos, NCh170:2016" },
      { label: "Fórmulas & Ec", href: "/materiales/hormigon/formulas", icon: Sigma, desc: "Módulo elasticidad, curvas, ACI 318" },
    ],
  },
  {
    label: "Análisis — Flexión",
    description: "Módulos de análisis de vigas en flexión. Bloque de Whitney, ACI 318, NCh3171.",
    color: "amber",
    items: [
      { label: "Sección Rectangular", href: "/flexion/rectangular", icon: Calculator, desc: "Análisis simple · Mn · φMn · Zona falla" },
      { label: "Doble Fila de Acero", href: "/flexion/doble-fila", icon: Layers, desc: "d₁, d₂, d_eq · Exacto y aproximado" },
      { label: "Doble Armadura", href: "/flexion/doble-armadura", icon: Wrench, desc: "As + A's · Viga 1+2 · Verifica fluencia A's" },
      { label: "Viga T", href: "/flexion/viga-t", icon: Ruler, desc: "Ala efectiva · Caso 1 (a≤hf) y Caso 2 (a>hf)" },
    ],
  },
  {
    label: "Diseño",
    description: "Diseño de secciones por resistencia. Combinaciones de carga LRFD según NCh3171.",
    color: "green",
    items: [
      { label: "Sección Rectangular", href: "/diseno/rectangular", icon: Calculator, desc: "Rn → ρ → As → barras comerciales" },
    ],
  },
  {
    label: "Cargas",
    description: "Diagramas de esfuerzos internos para distintas condiciones de apoyo y carga.",
    color: "purple",
    items: [
      { label: "Momentos & Cortantes", href: "/cargas/momentos-cortantes", icon: BarChart3, desc: "M(x) y V(x) · Simple, voladizo, continua" },
    ],
  },
];

const STATS = [
  { label: "Módulos de cálculo", value: "6", icon: Calculator, color: "blue" },
  { label: "Gráficas interactivas", value: "7", icon: TrendingUp, color: "amber" },
  { label: "Modelos constitutivos", value: "3", icon: Layers, color: "green" },
  { label: "Normas aplicadas", value: "4", icon: BookOpen, color: "purple" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: "bg-accent-blue/10",   border: "border-accent-blue/20",   text: "text-accent-blue",   badge: "bg-accent-blue/10 text-accent-blue border-accent-blue/20" },
  amber:  { bg: "bg-accent-amber/10",  border: "border-accent-amber/20",  text: "text-accent-amber",  badge: "bg-accent-amber/10 text-accent-amber border-accent-amber/20" },
  green:  { bg: "bg-accent-green/10",  border: "border-accent-green/20",  text: "text-accent-green",  badge: "bg-accent-green/10 text-accent-green border-accent-green/20" },
  purple: { bg: "bg-accent-purple/10", border: "border-accent-purple/20", text: "text-accent-purple", badge: "bg-accent-purple/10 text-accent-purple border-accent-purple/20" },
  cyan:   { bg: "bg-accent-cyan/10",   border: "border-accent-cyan/20",   text: "text-accent-cyan",   badge: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero */}
      <div className="relative border-b border-bg-border bg-bg-panel overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5" />
        <div className="relative px-8 py-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
              Universidad de La Serena
            </span>
            <span className="text-xs text-text-muted">Ingeniería Civil · 1S 2026</span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            Hormigón <span className="text-accent-blue">Armado</span>
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mb-6">
            Plataforma de estudio y cálculo estructural — modelos constitutivos, calculadoras de flexión,
            diseño LRFD y diagramas de esfuerzos. Todo en un mismo lugar.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/flexion/rectangular" className="flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-white font-medium rounded-lg hover:bg-blue-600 transition-colors text-sm">
              <Zap className="w-4 h-4" />
              Ir a Calculadora
            </Link>
            <Link href="/materiales/hormigon/laboratorio" className="flex items-center gap-2 px-5 py-2.5 bg-bg-elevated text-text-secondary font-medium rounded-lg hover:bg-bg-hover hover:text-text-primary transition-colors border border-bg-border text-sm">
              <FlaskConical className="w-4 h-4" />
              Ver Laboratorio
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 space-y-10">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {STATS.map((s) => {
            const c = colorMap[s.color];
            return (
              <div key={s.label} className="bg-bg-card border border-bg-border rounded-xl p-4">
                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={`w-4 h-4 ${c.text}`} />
                </div>
                <div className={`text-3xl font-bold ${c.text} mb-1`}>{s.value}</div>
                <div className="text-xs text-text-muted">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => {
          const c = colorMap[section.color];
          return (
            <div key={section.label}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${c.badge}`}>
                  {section.label}
                </div>
                <p className="text-sm text-text-muted">{section.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group bg-bg-card border rounded-xl p-4 transition-all hover:${c.border} border-bg-border hover:border-opacity-50`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                        <item.icon className={`w-4 h-4 ${c.text}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-text-primary text-sm group-hover:text-white transition-colors">{item.label}</h3>
                          <ArrowRight className={`w-3.5 h-3.5 ${c.text} opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 flex-shrink-0`} />
                        </div>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
