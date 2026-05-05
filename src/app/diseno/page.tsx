import Link from "next/link";
import { Pencil } from "lucide-react";

export default function DisenoPage() {
  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
            <Pencil className="w-5 h-5 text-accent-cyan" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Diseño Estructural</h1>
        </div>
        <p className="text-text-muted text-sm mb-8 ml-12">
          Módulos de diseño LRFD · ACI 318-19 · NCh430
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/diseno/rectangular"
            className="rounded-2xl border border-accent-cyan/30 bg-accent-cyan/10 p-6 hover:scale-[1.02] transition-transform block">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-bold text-accent-cyan bg-bg-base px-2 py-0.5 rounded-full border border-accent-cyan/30">
                M5
              </span>
            </div>
            <h2 className="text-lg font-bold text-accent-cyan mb-2">Diseño Sección Rectangular</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Diseño LRFD completo. Combinaciones de carga, cuantías ρ, selección de barras comerciales y verificación.
            </p>
          </Link>

          <div className="rounded-2xl border border-bg-border bg-bg-card p-6 opacity-40 cursor-not-allowed">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-bold text-text-muted bg-bg-base px-2 py-0.5 rounded-full border border-bg-border">
                Pronto
              </span>
            </div>
            <h2 className="text-lg font-bold text-text-muted mb-2">Diseño Viga T</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Diseño de sección T con ala efectiva. En desarrollo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
