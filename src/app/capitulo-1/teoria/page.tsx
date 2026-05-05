import Link from "next/link";
import { BookOpen, Info, CheckCircle2 } from "lucide-react";

const glossary = [
  { term: "Hormigón (H)", def: "Material compuesto por cemento + agua + áridos + aditivos. Resistente a compresión, débil a tracción.", unit: "—" },
  { term: "Hormigón Armado (HA)", def: "Hormigón + armadura de acero. El acero aporta resistencia a tracción.", unit: "—" },
  { term: "f'c", def: "Resistencia característica a compresión. Medida en probeta cilíndrica 15×30 cm a los 28 días.", unit: "MPa o kgf/cm²" },
  { term: "f''c", def: "Resistencia efectiva en estructura = 0.9·f'c. Compensa diferencias entre probeta y elemento real.", unit: "MPa" },
  { term: "fck", def: "Resistencia característica (Eurocódigo EN 1992). Usada con γc para obtener fcd.", unit: "MPa" },
  { term: "fcd", def: "Resistencia de cálculo europeo: fcd = αcc·fck / γc. Con αcc=1.0, γc=1.5.", unit: "MPa" },
  { term: "σ (sigma)", def: "Tensión o esfuerzo unitario de compresión aplicado sobre la probeta.", unit: "MPa o kgf/cm²" },
  { term: "ε (épsilon)", def: "Deformación unitaria: ε = ΔL/L. Adimensional.", unit: "mm/mm o ‰" },
  { term: "ε₀", def: "Deformación en la tensión máxima f''c. Típico ≈ 0.002 (2‰) para hormigón normal.", unit: "mm/mm" },
  { term: "εu", def: "Deformación última de rotura. Límite del modelo constitutivo. Típico = 0.003.", unit: "mm/mm" },
  { term: "Ec", def: "Módulo de Elasticidad (Young). Mide la rigidez elástica del hormigón.", unit: "MPa o GPa" },
  { term: "Relación A/C", def: "Relación agua/cemento. A menor A/C → mayor resistencia y menor porosidad.", unit: "Adimensional" },
  { term: "Compactación", def: "Proceso de eliminar vacíos del hormigón fresco. Mayor compactación → mayor resistencia.", unit: "—" },
  { term: "Microfisuras", def: "Pequeñas fisuras internas que crecen con la carga. Causan comportamiento no-lineal.", unit: "—" },
  { term: "NCh1037", def: "Norma chilena que regula el ensayo de compresión uniaxial en probetas.", unit: "—" },
  { term: "Rama ascendente", def: "Curva σ-ε desde ε=0 hasta ε=ε₀ (tensión máxima). El material absorbe carga.", unit: "—" },
  { term: "Rama descendente", def: "Curva σ-ε post-pico. El material pierde capacidad portante (softening).", unit: "—" },
  { term: "Softening", def: "Ablandamiento post-pico: caída de resistencia con aumento de deformación.", unit: "—" },
  { term: "Módulo tangente (Et)", def: "Pendiente de la curva σ-ε en el origen. Ec ≈ Et para hormigón.", unit: "MPa" },
  { term: "Módulo secante", def: "Pendiente de la recta del origen al punto (0.45f'c). Usado por ACI para Ec.", unit: "MPa" },
  { term: "Confinamiento", def: "Restricción lateral que aumenta aparente resistencia y ductilidad.", unit: "—" },
  { term: "Ductilidad", def: "Capacidad del material de deformarse sin romperse post-pico. Mayor f'c → menos ductilidad.", unit: "—" },
  { term: "wc", def: "Densidad (peso unitario) del hormigón. Normal ≈ 2200–2300 kg/m³.", unit: "kg/m³" },
];

const nch170 = [
  { grade: "G10", fc_kgf: 100, fc_mpa: 9.8, use: "Rellenos, hormigón de limpieza" },
  { grade: "G15", fc_kgf: 150, fc_mpa: 14.7, use: "Elementos no estructurales" },
  { grade: "G20", fc_kgf: 200, fc_mpa: 19.6, use: "Losas, muros simples" },
  { grade: "G25", fc_kgf: 250, fc_mpa: 24.5, use: "Vigas, columnas estándar" },
  { grade: "G30", fc_kgf: 300, fc_mpa: 29.4, use: "Estructuras importantes" },
  { grade: "G35", fc_kgf: 350, fc_mpa: 34.3, use: "Puentes, alto desempeño" },
  { grade: "G40", fc_kgf: 400, fc_mpa: 39.2, use: "Alta resistencia" },
  { grade: "G45", fc_kgf: 450, fc_mpa: 44.1, use: "Estructuras especiales" },
  { grade: "G50", fc_kgf: 500, fc_mpa: 49.0, use: "Muy alta resistencia" },
];

export default function TeoriaPage() {
  return (
    <div className="min-h-screen bg-bg-base px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted mb-5">
        <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
        <span>/</span>
        <Link href="/capitulo-1" className="hover:text-text-secondary">Cap. 1</Link>
        <span>/</span>
        <span className="text-text-secondary">Teoría & Glosario</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-accent-blue/15 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-accent-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Teoría & Glosario</h1>
          <p className="text-sm text-text-muted">Capítulo 1 — Comportamiento Mecánico del Hormigón</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Composición del HA */}
        <section className="bg-bg-card border border-bg-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-blue/15 text-accent-blue text-xs flex items-center justify-center font-bold">1</span>
            Composición del Hormigón Armado
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-text-secondary mb-3">
                El <strong className="text-text-primary">Hormigón Armado (HA)</strong> combina dos materiales con propiedades complementarias:
              </p>
              <div className="space-y-2">
                {[
                  { mat: "Hormigón", props: "Alta resistencia a compresión, débil a tracción", color: "gray" },
                  { mat: "Acero", props: "Alta resistencia a tracción y compresión (≈ 60× más resistente a tracción)", color: "blue" },
                ].map((m) => (
                  <div key={m.mat} className="flex items-start gap-2 bg-bg-elevated rounded-lg p-3 border border-bg-border">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${m.color === "blue" ? "bg-accent-blue" : "bg-text-muted"}`} />
                    <div>
                      <span className="text-sm font-medium text-text-primary">{m.mat}: </span>
                      <span className="text-sm text-text-secondary">{m.props}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-secondary mb-2">Componentes del hormigón:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { comp: "Cemento", role: "Ligante — reacciona con el agua (hidratación)", pct: "10–15%" },
                  { comp: "Agua", role: "Activa la hidratación del cemento", pct: "Rel. A/C" },
                  { comp: "Áridos", role: "Relleno (arena + grava). Aportan volumen y resistencia", pct: "60–75%" },
                  { comp: "Aditivos", role: "Plastificantes, retardadores, aceleradores", pct: "Opcional" },
                ].map((c) => (
                  <div key={c.comp} className="bg-bg-elevated rounded-lg p-2.5 border border-bg-border">
                    <div className="text-xs font-semibold text-text-primary mb-0.5">{c.comp}</div>
                    <div className="text-[10px] text-text-muted mb-1">{c.role}</div>
                    <div className="text-[10px] text-accent-blue font-mono">{c.pct}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-3 flex items-start gap-2">
            <Info className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" />
            <p className="text-xs text-text-secondary">
              <strong className="text-accent-blue">Relación A/C crítica:</strong> A menor relación agua/cemento → menor porosidad → mayor resistencia y durabilidad.
              Sin embargo, muy baja A/C dificulta la trabajabilidad. Los aditivos plastificantes permiten reducir A/C manteniendo fluidez.
            </p>
          </div>
        </section>

        {/* NCh170:2016 */}
        <section className="bg-bg-card border border-bg-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-text-primary mb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-purple/15 text-accent-purple text-xs flex items-center justify-center font-bold">2</span>
            Clasificación por Resistencia — NCh170:2016
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            La norma chilena NCh170 clasifica el hormigón en grados G según su resistencia característica f'c.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["Grado", "f'c (kgf/cm²)", "f'c (MPa)", "Uso típico"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {nch170.map((row) => (
                  <tr key={row.grade} className="hover:bg-bg-elevated/50 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-accent-blue font-mono">{row.grade}</td>
                    <td className="px-4 py-2.5 font-mono text-text-secondary">{row.fc_kgf}</td>
                    <td className="px-4 py-2.5 font-mono text-text-secondary">{row.fc_mpa}</td>
                    <td className="px-4 py-2.5 text-text-muted">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-text-muted bg-bg-elevated rounded-lg p-2.5 border border-bg-border">
            ⚠ Para f'c &gt; 40 MPa (G40+): la fórmula simplificada ACI Ec = 4700√f'c sobreestima el módulo real.
          </div>
        </section>

        {/* Probetas y NCh1037 */}
        <section className="bg-bg-card border border-bg-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-amber/15 text-accent-amber text-xs flex items-center justify-center font-bold">3</span>
            Probetas y Procedimiento NCh1037
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3">Tipos de probetas</h3>
              <div className="space-y-2">
                {[
                  { tipo: "Cilíndrica estándar", dim: "Ø15×30 cm", ratio: "h/d = 2", norm: "NCh1037 ✓" },
                  { tipo: "Cilíndrica alternativa", dim: "Ø10×20 cm", ratio: "h/d = 2", norm: "NCh1037" },
                  { tipo: "Cúbica", dim: "20×20×20 cm", ratio: "—", norm: "Europa" },
                ].map((p) => (
                  <div key={p.tipo} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-text-primary">{p.tipo}</span>
                      <span className="text-xs text-accent-amber bg-accent-amber/10 px-2 py-0.5 rounded">{p.norm}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-text-muted">
                      <span>Dim: {p.dim}</span>
                      <span>Ratio: {p.ratio}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-accent-amber/10 border border-accent-amber/20 rounded-lg p-3 text-xs">
                <strong className="text-accent-amber">¿Por qué h/d = 2?</strong>
                <p className="text-text-secondary mt-1">Elimina el efecto de confinamiento de las placas de carga. Si h/d &lt; 2 → resistencia sobreestimada. Si h/d &gt; 2 → riesgo de pandeo.</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-secondary mb-3">Pasos del ensayo NCh1037</h3>
              <div className="space-y-2">
                {[
                  { n: 1, paso: "Preparar probeta", desc: "Moldear cilíndrica Ø15×30 cm. Curar 28 días a temperatura controlada." },
                  { n: 2, paso: "Verificar geometría", desc: "Confirmar h/d ≥ 2. Superficie plana y perpendicular al eje." },
                  { n: 3, paso: "Montar en prensa", desc: "Centrar probeta. Aplicar precarga suave para asentar contacto." },
                  { n: 4, paso: "Aplicar carga", desc: "Velocidad controlada: duración total 2–3 minutos (NCh1037)." },
                  { n: 5, paso: "Registrar datos", desc: "Medir F_máx y deformación continua con LVDT o extensómetro." },
                  { n: 6, paso: "Calcular f'c", desc: "f'c = F_máx / Área transversal de la probeta" },
                  { n: 7, paso: "Graficar σ-ε", desc: "Con datos de carga-deformación construir la curva completa." },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-accent-amber/15 text-accent-amber text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {step.n}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-text-primary">{step.paso}: </span>
                      <span className="text-xs text-text-muted">{step.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Glosario */}
        <section className="bg-bg-card border border-bg-border rounded-xl p-6">
          <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-accent-green/15 text-accent-green text-xs flex items-center justify-center font-bold">4</span>
            Glosario Completo — {glossary.length} términos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["Término", "Definición", "Unidades"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {glossary.map((g) => (
                  <tr key={g.term} className="hover:bg-bg-elevated/50 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-accent-blue whitespace-nowrap font-mono text-xs">{g.term}</td>
                    <td className="px-4 py-2.5 text-text-secondary text-xs">{g.def}</td>
                    <td className="px-4 py-2.5 text-text-muted text-xs font-mono whitespace-nowrap">{g.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
