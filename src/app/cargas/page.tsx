import Link from "next/link";
import { BarChart2 } from "lucide-react";

export default function CargasPage() {
  return (
    <div className="min-h-screen bg-bg-base p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-accent-blue/20 flex items-center justify-center">
            <BarChart2 className="w-5 h-5 text-accent-blue" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Cargas y Diagramas</h1>
        </div>
        <p className="text-text-muted text-sm mb-8 ml-12">
          Diagramas de esfuerzos internos · Vigas simples y en voladizo
        </p>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/cargas/momentos-cortantes"
            className="rounded-2xl border border-accent-blue/30 bg-accent-blue/10 p-6 hover:scale-[1.02] transition-transform block">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-bold text-accent-blue bg-bg-base px-2 py-0.5 rounded-full border border-accent-blue/30">
                M6
              </span>
            </div>
            <h2 className="text-lg font-bold text-accent-blue mb-2">Diagramas M y V</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Diagramas de momentos flectores M(x) y cortantes V(x). Viga simple o voladizo con cargas distribuidas y puntuales. 201 puntos de cálculo.
            </p>
          </Link>

          <div className="rounded-2xl border border-bg-border bg-bg-card p-6 opacity-40 cursor-not-allowed">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-bold text-text-muted bg-bg-base px-2 py-0.5 rounded-full border border-bg-border">
                Pronto
              </span>
            </div>
            <h2 className="text-lg font-bold text-text-muted mb-2">Viga Continua</h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Método de coeficientes ACI para vigas continuas de 2 o más tramos. En desarrollo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
