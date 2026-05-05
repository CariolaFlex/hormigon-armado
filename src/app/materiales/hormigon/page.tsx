import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FlaskConical, Target } from "lucide-react";

export default function Capitulo1Page() {
  return (
    <div className="px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-text-muted mb-2">
          <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
          <span>/</span>
          <span className="text-text-secondary">Capítulo 1</span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Capítulo 1 — Comportamiento Mecánico del Hormigón
        </h1>
        <p className="text-text-secondary">
          Prof. Miguel Alexis Colque González · Universidad de La Serena · 1S 2026
        </p>
      </div>

      {/* Objetivos */}
      <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-accent-blue" />
          <h2 className="font-semibold text-text-primary">Objetivos de aprendizaje</h2>
        </div>
        <ul className="space-y-2">
          {[
            "Describir la composición y características del hormigón armado",
            "Interpretar la curva tensión-deformación (σ-ε) y sus tres zonas",
            "Calcular el Módulo de Elasticidad Ec con las fórmulas ACI 318",
            "Aplicar los tres modelos constitutivos (Hognestad, Todeschini, EN 1992)",
            "Identificar los factores que afectan la resistencia y ductilidad",
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="w-5 h-5 rounded-full bg-accent-blue/15 text-accent-blue text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">{i + 1}</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Secciones */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: BookOpen,
            title: "Teoría & Glosario",
            href: "/capitulo-1/teoria",
            color: "blue",
            desc: "Composición del HA, clasificación NCh170:2016, procedimiento NCh1037, glosario completo de 22 términos.",
            items: ["Glosario (22 términos)", "Clasificación NCh170", "Tipos de probetas", "Procedimiento NCh1037", "Progresión microfisuras"],
          },
          {
            icon: Calculator,
            title: "Formulario",
            href: "/capitulo-1/formulas",
            color: "amber",
            desc: "Todas las fórmulas del capítulo organizadas con derivación, parámetros y ejemplo numérico.",
            items: ["Ec = 4700√f'c", "Hognestad: fc = f''c·[2r − r²]", "Todeschini: fc = 2f''c·x/(1+x²)", "Parábola-Rect. (EN 1992)", "Conversión MPa ↔ kgf/cm²"],
          },
          {
            icon: FlaskConical,
            title: "Laboratorio Interactivo",
            href: "/capitulo-1/laboratorio",
            color: "green",
            desc: "8 gráficas científicas interactivas con controles en tiempo real, comparación de modelos y conversión de unidades.",
            items: ["Curva σ-ε con zonas", "Hognestad adjustable", "Todeschini completo", "Parábola-Rectángulo", "Comparación 3 modelos", "Efecto de f'c y densidad"],
          },
        ].map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className={`bg-bg-card border border-bg-border rounded-xl p-5 hover:border-accent-${section.color}/40 transition-all group block`}
          >
            <div className={`w-10 h-10 rounded-xl bg-accent-${section.color}/15 flex items-center justify-center mb-4`}>
              <section.icon className={`w-5 h-5 text-accent-${section.color}`} />
            </div>
            <h3 className="font-semibold text-text-primary mb-2">{section.title}</h3>
            <p className="text-sm text-text-secondary mb-4">{section.desc}</p>
            <ul className="space-y-1 mb-4">
              {section.items.map((item) => (
                <li key={item} className="text-xs text-text-muted flex items-center gap-1.5">
                  <span className={`w-1 h-1 rounded-full bg-accent-${section.color} flex-shrink-0`} />
                  {item}
                </li>
              ))}
            </ul>
            <div className={`flex items-center gap-1.5 text-sm text-accent-${section.color} font-medium`}>
              Abrir sección
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
