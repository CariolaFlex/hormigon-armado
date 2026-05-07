"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  BookOpen,
  FlaskConical,
  Calculator,
  ChevronRight,
  GraduationCap,
  Layers,
  BarChart3,
  Sigma,
  Wrench,
  Beaker,
  Ruler,
} from "lucide-react";

interface NavChild {
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
}

interface NavSection {
  label: string;
  icon: React.ElementType;
  colorClass: string;
  children: NavChild[];
}

const TOP_LINKS = [
  { label: "Dashboard", href: "/", icon: Home },
];

const SECTIONS: NavSection[] = [
  {
    label: "Teoría",
    icon: GraduationCap,
    colorClass: "text-accent-cyan",
    children: [
      {
        label: "Comportamiento Mecánico",
        href: "/teoria/comportamiento-mecanico",
        icon: BookOpen,
        description: "Hormigón + Acero · σ-ε · Ec · Modelos",
        accentBg: "bg-accent-cyan/15",
        accentText: "text-accent-cyan",
        accentBorder: "border-accent-cyan/20",
      },
      {
        label: "Criterios & Normas",
        href: "/teoria/criterios-diseno",
        icon: BookOpen,
        description: "ASD · LRFD · NCh430 · NCh3171",
        accentBg: "bg-accent-blue/15",
        accentText: "text-accent-blue",
        accentBorder: "border-accent-blue/20",
      },
      {
        label: "Vigas en Flexión",
        href: "/teoria/vigas-flexion",
        icon: Ruler,
        description: "Whitney · Fallas · Cuantías · Diseño",
        accentBg: "bg-accent-amber/15",
        accentText: "text-accent-amber",
        accentBorder: "border-accent-amber/20",
      },
    ],
  },
  {
    label: "Materiales",
    icon: Beaker,
    colorClass: "text-accent-blue",
    children: [
      {
        label: "Laboratorio σ-ε",
        href: "/materiales/hormigon/laboratorio",
        icon: FlaskConical,
        description: "Hognestad · Todeschini · Parábola",
        accentBg: "bg-accent-green/15",
        accentText: "text-accent-green",
        accentBorder: "border-accent-green/20",
      },
      {
        label: "Teoría & Glosario",
        href: "/materiales/hormigon/teoria",
        icon: BookOpen,
        description: "Composición, tipos, NCh170",
        accentBg: "bg-accent-blue/15",
        accentText: "text-accent-blue",
        accentBorder: "border-accent-blue/20",
      },
      {
        label: "Fórmulas & Ec",
        href: "/materiales/hormigon/formulas",
        icon: Sigma,
        description: "Módulo elasticidad, curvas",
        accentBg: "bg-accent-cyan/15",
        accentText: "text-accent-cyan",
        accentBorder: "border-accent-cyan/20",
      },
    ],
  },
  {
    label: "Análisis — Flexión",
    icon: Ruler,
    colorClass: "text-accent-amber",
    children: [
      {
        label: "Sección Rectangular",
        href: "/flexion/rectangular",
        icon: Calculator,
        description: "Whitney · ACI 318 · φMn",
        accentBg: "bg-accent-blue/15",
        accentText: "text-accent-blue",
        accentBorder: "border-accent-blue/20",
      },
      {
        label: "Doble Fila de Acero",
        href: "/flexion/doble-fila",
        icon: Layers,
        description: "d₁, d₂, d_eq · exacto/aprox.",
        accentBg: "bg-accent-amber/15",
        accentText: "text-accent-amber",
        accentBorder: "border-accent-amber/20",
      },
      {
        label: "Doble Armadura",
        href: "/flexion/doble-armadura",
        icon: Wrench,
        description: "As + A's · Viga 1+2",
        accentBg: "bg-accent-green/15",
        accentText: "text-accent-green",
        accentBorder: "border-accent-green/20",
      },
      {
        label: "Viga T",
        href: "/flexion/viga-t",
        icon: Layers,
        description: "Ala efectiva · Caso 1 y 2",
        accentBg: "bg-accent-purple/15",
        accentText: "text-accent-purple",
        accentBorder: "border-accent-purple/20",
      },
    ],
  },
  {
    label: "Diseño",
    icon: Wrench,
    colorClass: "text-accent-green",
    children: [
      {
        label: "Sección Rectangular",
        href: "/diseno/rectangular",
        icon: Calculator,
        description: "LRFD · Rn → ρ → As → barras",
        accentBg: "bg-accent-cyan/15",
        accentText: "text-accent-cyan",
        accentBorder: "border-accent-cyan/20",
      },
    ],
  },
  {
    label: "Cargas",
    icon: BarChart3,
    colorClass: "text-accent-purple",
    children: [
      {
        label: "Momentos & Cortantes",
        href: "/cargas/momentos-cortantes",
        icon: BarChart3,
        description: "Diagramas M(x) y V(x)",
        accentBg: "bg-accent-purple/15",
        accentText: "text-accent-purple",
        accentBorder: "border-accent-purple/20",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-bg-panel border-r border-bg-border flex flex-col z-50">
      {/* Header */}
      <div className="px-4 py-4 border-b border-bg-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-blue/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4 text-accent-blue" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-text-primary leading-tight">HormigonCalc</p>
            <p className="text-[10px] text-text-muted leading-tight">ULS · Ing. Civil · 1S 2026</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {TOP_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all mb-1",
              isActive(item.href)
                ? "bg-accent-blue/15 text-accent-blue border border-accent-blue/20"
                : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary"
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            {item.label}
          </Link>
        ))}

        <div className="mt-2 space-y-1">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <section.icon className={cn("w-3.5 h-3.5", section.colorClass)} />
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  {section.label}
                </span>
              </div>
              <div className="space-y-0.5 mb-1">
                {section.children.map((child) => {
                  const active = isActive(child.href);
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all group border",
                        active
                          ? cn(child.accentBg, child.accentText, child.accentBorder)
                          : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary border-transparent"
                      )}
                    >
                      <child.icon
                        className={cn(
                          "w-3.5 h-3.5 flex-shrink-0 transition-colors",
                          active ? child.accentText : "text-text-muted group-hover:text-text-secondary"
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium leading-tight truncate">{child.label}</div>
                        <div className="text-[10px] text-text-muted leading-tight truncate">{child.description}</div>
                      </div>
                      <ChevronRight
                        className={cn(
                          "w-3 h-3 flex-shrink-0 transition-all",
                          active
                            ? cn(child.accentText, "opacity-100")
                            : "text-text-muted opacity-0 group-hover:opacity-100"
                        )}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-bg-border">
        <p className="text-[10px] text-text-muted text-center">HormigonCalc · v0.2 · Next.js 15</p>
      </div>
    </aside>
  );
}
