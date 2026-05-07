"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MainTab = "hormigon" | "acero";

function Formula({ children, unit }: { children: React.ReactNode; unit?: string }) {
  return (
    <div className="bg-bg-elevated border border-bg-border rounded-lg px-4 py-3 font-mono text-center my-3">
      <span className="text-accent-blue text-base">{children}</span>
      {unit && <span className="text-text-muted text-sm ml-2">[{unit}]</span>}
    </div>
  );
}

function Note({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" | "ok" }) {
  const styles = {
    info: { bg: "bg-accent-blue/10 border-accent-blue/20", icon: Info, text: "text-accent-blue" },
    warn: { bg: "bg-accent-amber/10 border-accent-amber/20", icon: AlertTriangle, text: "text-accent-amber" },
    ok:   { bg: "bg-accent-green/10 border-accent-green/20", icon: CheckCircle2, text: "text-accent-green" },
  }[type];
  const Icon = styles.icon;
  return (
    <div className={cn("rounded-lg p-3 border flex items-start gap-2 my-3", styles.bg)}>
      <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", styles.text)} />
      <p className="text-xs text-text-secondary">{children}</p>
    </div>
  );
}

function SectionTitle({ n, children }: { n: string | number; children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
      <span className="w-6 h-6 rounded bg-accent-blue/15 text-accent-blue text-xs flex items-center justify-center font-bold flex-shrink-0">
        {n}
      </span>
      {children}
    </h2>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("bg-bg-card border border-bg-border rounded-xl p-6", className)}>
      {children}
    </section>
  );
}

// ─── HORMIGÓN ────────────────────────────────────────────────────────────────
function TabHormigon() {
  return (
    <div className="space-y-6">

      {/* 1 — Composición */}
      <Card>
        <SectionTitle n="1">¿Qué es el Hormigón Armado?</SectionTitle>
        <p className="text-sm text-text-secondary mb-4">
          El <strong className="text-text-primary">hormigón armado</strong> es un material compuesto que combina
          dos materiales con propiedades complementarias. La unión funciona gracias a la <strong className="text-text-primary">adherencia</strong> entre el acero y el hormigón circundante.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { mat: "Hormigón", props: "Alta resistencia a compresión, muy baja a tracción (≈ 10% de f'c)", color: "gray" },
            { mat: "Acero de refuerzo", props: "Alta resistencia a tracción y compresión; aporta ductilidad", color: "blue" },
          ].map((m) => (
            <div key={m.mat} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="font-medium text-sm text-text-primary mb-1">{m.mat}</div>
              <div className="text-xs text-text-secondary">{m.props}</div>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Componentes del hormigón</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Componente", "Función"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Cemento", "Aglomerante; al hidratarse con agua genera la pasta que une todo"],
                ["Agua", "Activa la hidratación del cemento; la relación A/C es crítica"],
                ["Áridos (finos y gruesos)", "Relleno estructural; determinan densidad y resistencia"],
                ["Aditivos", "Modifican propiedades específicas (plastificantes, acelerantes, etc.)"],
              ].map(([c, f]) => (
                <tr key={c} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-medium text-text-primary text-xs">{c}</td>
                  <td className="px-3 py-2 text-text-secondary text-xs">{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 2 — Resistencia a la compresión */}
      <Card>
        <SectionTitle n="2">Resistencia a la Compresión — NCh1037 y NCh170:2016</SectionTitle>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Ensayo de compresión (NCh1037)</h3>
        <p className="text-sm text-text-secondary mb-2">
          Se mide en probetas cilíndricas con relación altura/diámetro = 2 (estándar: Ø15×30 cm). Duración: 2–3 minutos.
          La resistencia obtenida se denomina <strong className="text-text-primary">f'c</strong>.
        </p>
        <Note type="info">
          <strong>¿Por qué h/d = 2?</strong> Esta proporción minimiza el efecto de confinamiento de las placas de carga.
          Con proporciones menores las placas restringen el desplazamiento lateral, aumentando artificialmente la resistencia medida.
          Con h/d = 2 ese efecto es despreciable en la zona central.
        </Note>

        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Clasificación NCh170:2016 — Grados G</h3>
        <p className="text-sm text-text-secondary mb-3">
          El hormigón se clasifica como <strong className="text-text-primary">GXX</strong>, donde XX es f'c en MPa.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Grado", "f'c (kgf/cm²)", "f'c (MPa)", "Uso típico"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["G10", 100, 9.8, "Rellenos, hormigón de limpieza"],
                ["G15", 150, 14.7, "Elementos no estructurales"],
                ["G20", 200, 19.6, "Losas, muros simples"],
                ["G25", 250, 24.5, "Vigas, columnas estándar ★"],
                ["G30", 300, 29.4, "Estructuras importantes"],
                ["G35", 350, 34.3, "Puentes, alto desempeño"],
                ["G40", 400, 39.2, "Alta resistencia"],
                ["G45", 450, 44.1, "Estructuras especiales"],
                ["G50", 500, 49.0, "Muy alta resistencia"],
              ].map(([g, kgf, mpa, uso]) => (
                <tr key={g as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-bold text-accent-blue font-mono text-xs">{g}</td>
                  <td className="px-3 py-2 font-mono text-text-secondary text-xs">{kgf}</td>
                  <td className="px-3 py-2 font-mono text-text-secondary text-xs">{mpa}</td>
                  <td className="px-3 py-2 text-text-muted text-xs">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="info">
          <strong>Efecto de las dimensiones de la probeta:</strong> Razones de aspecto menores (probetas más cortas)
          generan confinamiento artificial → resistencia sobreestimada. Si se ensaya con geometría diferente a h/d = 2,
          se debe corregir la resistencia medida.
        </Note>
        <Note type="info">
          <strong>Efecto de la velocidad de carga:</strong> Los elementos reales se cargan lentamente (años); el ensayo
          dura 2–3 minutos. La carga lenta reduce la resistencia, pero esto se compensa con la ganancia de resistencia
          del hormigón después de los 28 días estándar. En diseño se usa f'c a 28 días.
        </Note>
      </Card>

      {/* 3 — Curva σ-ε */}
      <Card>
        <SectionTitle n="3">Curva Tensión-Deformación Uniaxial (σ-ε)</SectionTitle>
        <p className="text-sm text-text-secondary mb-4">
          Se obtiene aplicando compresión progresiva y midiendo fuerza y deformación simultáneamente. Define las tres propiedades fundamentales del material.
        </p>
        <div className="space-y-3 mb-4">
          {[
            {
              zona: "Zona 1 — Rango lineal (0 a 0,5·f'c)",
              color: "accent-green",
              desc: "La curva es casi perfectamente lineal. El material se comporta como elástico: si se retira la carga, la deformación desaparece. La pendiente corresponde al módulo de elasticidad E. Sin daño significativo en la microestructura.",
            },
            {
              zona: "Zona 2 — No lineal ascendente (0,5·f'c a f'c)",
              color: "accent-amber",
              desc: "La curva comienza a curvarse (pierde rigidez). Aparecen microfisuras en la interfaz áridos-pasta de cemento. La deformación crece más rápido que la tensión. El material se daña internamente aunque sigue soportando mayor carga.",
            },
            {
              zona: "Punto máximo — Resistencia f'c",
              color: "accent-blue",
              desc: "Se alcanza la resistencia máxima. La deformación en este punto es ε₀ ≈ 0,002 (2‰), independiente de la resistencia. Este es el punto más importante para el diseño.",
            },
            {
              zona: "Zona 3 — Rama post-pico (descarga)",
              color: "accent-red",
              desc: "La curva baja hacia la derecha: el material sigue deformándose aunque la tensión disminuye. Existen macrofisuras visibles. La pendiente de esta rama determina la ductilidad. Forma de la curva depende del tipo de hormigón.",
            },
          ].map(({ zona, color, desc }) => (
            <div key={zona} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className={cn("text-xs font-semibold mb-1", `text-${color}`)}>{zona}</div>
              <p className="text-xs text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Efecto de la resistencia f'c en la curva</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Propiedad", "Baja resistencia (G20)", "Alta resistencia (G50)"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Rigidez inicial (pendiente)", "Menor", "Mayor"],
                ["Deformación en f'c (ε₀)", "≈ 0,002", "≈ 0,002 (similar)"],
                ["Rama post-pico", "Suave, gradual", "Pronunciada, abrupta"],
                ["Ductilidad", "Mayor", "Menor — más frágil"],
              ].map(([prop, baja, alta]) => (
                <tr key={prop as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-primary text-xs font-medium">{prop}</td>
                  <td className="px-3 py-2 text-accent-green text-xs">{baja}</td>
                  <td className="px-3 py-2 text-accent-amber text-xs">{alta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="warn">
          Hormigón de <strong>alta resistencia</strong>: más rígido pero más frágil. Su rama post-pico cae
          abruptamente. Por eso el diseño sísmico limita la resistencia máxima o exige confinamiento.
        </Note>
      </Card>

      {/* 4 — Módulo de Elasticidad */}
      <Card>
        <SectionTitle n="4">Módulo de Elasticidad del Hormigón (Ec)</SectionTitle>
        <p className="text-sm text-text-secondary mb-2">
          El hormigón no es perfectamente lineal, por lo que el ACI define Ec como la pendiente de la
          <strong className="text-text-primary"> secante</strong> desde el origen hasta el punto de 0,45·f'c
          en la curva tensión-deformación. El 0,45f'c es el nivel de tensión bajo cargas de servicio.
        </p>
        <h3 className="text-sm font-semibold text-text-secondary mb-1">Fórmula ACI — Hormigón de peso normal (wc ≈ 2300 kgf/m³)</h3>
        <Formula unit="MPa">Ec = 4700 · √f'c</Formula>
        <h3 className="text-sm font-semibold text-text-secondary mb-1">Fórmula general (cualquier densidad)</h3>
        <Formula unit="MPa">Ec = 0,14 · wc^1,5 · √f'c</Formula>
        <p className="text-xs text-text-muted mb-3">Donde wc = densidad del hormigón en kgf/m³, f'c en MPa</p>
        <Note type="warn">
          La ecuación del ACI <strong>sobreestima Ec para hormigones de alta resistencia</strong> (f'c &gt; 40–50 MPa).
          Para esos casos existen expresiones alternativas más precisas.
        </Note>
        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-3">Efecto de la densidad</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Tipo", "Densidad (ρ)", "Características"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Normal", "2.200 – 2.300 kg/m³", "Uso estructural estándar — mayor rigidez y Ec"],
                ["Liviano", "1.800 – 1.900 kg/m³", "Áridos livianos (arcilla expandida) — menor Ec"],
              ].map(([tipo, rho, carac]) => (
                <tr key={tipo as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-medium text-text-primary text-xs">{tipo}</td>
                  <td className="px-3 py-2 font-mono text-text-secondary text-xs">{rho}</td>
                  <td className="px-3 py-2 text-text-muted text-xs">{carac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5 — Módulo de Poisson */}
      <Card>
        <SectionTitle n="5">Módulo de Poisson (μ)</SectionTitle>
        <p className="text-sm text-text-secondary mb-2">
          Relaciona la deformación transversal con la deformación longitudinal bajo compresión uniaxial:
        </p>
        <Formula>μ = ε_transversal / ε_longitudinal</Formula>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Valor típico</div>
            <div className="text-xl font-mono text-accent-blue text-center py-2">μ = 0,15 – 0,20</div>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Comportamiento notable</div>
            <p className="text-xs text-text-secondary">Para esfuerzos bajos y medios: μ casi constante. Cerca de f'c: deformaciones transversales aumentan rápidamente (expansión lateral acelerada antes de fallar).</p>
          </div>
        </div>
        <Note type="info">
          El aumento abrupto de deformaciones transversales cerca de f'c señala daño interno severo (macrofisuras verticales).
          Si se restringe esta expansión lateral con espirales de acero → <strong>confinamiento triaxial</strong>: mayor resistencia y ductilidad.
        </Note>
      </Card>

      {/* 6 — Modelos constitutivos */}
      <Card>
        <SectionTitle n="6">Modelos Constitutivos del Hormigón</SectionTitle>
        <p className="text-sm text-text-secondary mb-4">
          Ecuaciones matemáticas que representan la curva σ-ε completa. Necesarios para análisis no lineal de estructuras.
        </p>
        <div className="space-y-4">
          {/* Hognestad */}
          <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
            <h3 className="text-sm font-semibold text-accent-blue mb-2">Modelo de Hognestad Modificado</h3>
            <ul className="text-xs text-text-secondary space-y-1 mb-3">
              <li>• Válido para f'c ≤ 40 MPa</li>
              <li>• Rama ascendente: <strong className="text-text-primary">parábola de segundo grado</strong></li>
              <li>• Rama descendente: <strong className="text-text-primary">línea recta</strong></li>
              <li>• Incorpora diferencia entre probeta de laboratorio y elemento real: f''c = 0,9·f'c</li>
              <li>• ε₀ = 1,8·f''c / Ec</li>
            </ul>
            <div className="bg-bg-base rounded px-3 py-2 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-blue">f = f'c · [2(ε/ε₀) − (ε/ε₀)²]</span>
              <span className="text-text-muted ml-2">para ε ≤ ε₀</span>
            </div>
          </div>

          {/* Parábola-Rectángulo */}
          <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
            <h3 className="text-sm font-semibold text-accent-green mb-2">Modelo Parábola-Rectángulo (CEB-FIP / Eurocódigo)</h3>
            <ul className="text-xs text-text-secondary space-y-1 mb-3">
              <li>• El más usado en la normativa europea (EN 1992)</li>
              <li>• Rama ascendente: parábola hasta f'c</li>
              <li>• Rama descendente: <strong className="text-text-primary">tramo horizontal rectangular</strong> hasta εu = 0,003</li>
              <li>• fcd = αcc·fck/γc (con αcc=1, γc=1,5)</li>
            </ul>
          </div>

          {/* Todeschini */}
          <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
            <h3 className="text-sm font-semibold text-accent-amber mb-2">Modelo de Todeschini (1964)</h3>
            <ul className="text-xs text-text-secondary space-y-1 mb-3">
              <li>• Curva completa (ascendente y descendente) con <strong className="text-text-primary">una única ecuación continua</strong></li>
              <li>• Más preciso que Hognestad para hormigones de alta resistencia</li>
              <li>• ε₀ = 1,71·f''c / Ec</li>
            </ul>
            <div className="bg-bg-base rounded px-3 py-2 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-amber">f = 2·f''c · (ε/ε₀) / [1 + (ε/ε₀)²]</span>
            </div>
          </div>
        </div>
        <Note type="info">
          El modelo a usar depende del propósito. Para diseño con el Bloque de Whitney (ACI) no se necesita el modelo
          constitutivo detallado. Los modelos son necesarios en análisis no lineal (pushover, análisis sísmico avanzado).
        </Note>
      </Card>

      {/* 7 — Comportamiento cíclico */}
      <Card>
        <SectionTitle n="7">Comportamiento Cíclico</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          Ocurre cuando el hormigón es sometido a cargas que se aplican y retiran repetidamente (sismos, viento, tráfico).
        </p>
        <div className="space-y-2 mb-3">
          {[
            { n: 1, titulo: "Degradación de rigidez en cada ciclo", desc: "La pendiente de descarga en cada ciclo es menor que en el anterior. El módulo de elasticidad efectivo disminuye con cada ciclo." },
            { n: 2, titulo: "Deformación remanente (residual)", desc: "Al retirar la carga, el hormigón no vuelve al punto de deformación cero. Queda una deformación plástica permanente que se acumula ciclo a ciclo." },
            { n: 3, titulo: "Fatiga de bajo vs. alto ciclaje", desc: "Alto ciclaje a baja deformación (tráfico): ACI215R-92. Grandes deformaciones sísmicas: daño por ciclo mayor, degradación acelerada." },
            { n: 4, titulo: "Envolvente de la curva cíclica", desc: "La curva que une los puntos máximos de cada ciclo tiende a seguir la curva monotónica, que es buena representación de la capacidad máxima." },
          ].map(({ n, titulo, desc }) => (
            <div key={n} className="flex items-start gap-3 bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <span className="w-5 h-5 rounded-full bg-accent-blue/15 text-accent-blue text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
              <div>
                <div className="text-xs font-semibold text-text-primary mb-0.5">{titulo}</div>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Note type="warn">
          El diseño sísmico debe garantizar suficiente ductilidad para que la estructura sobreviva múltiples
          ciclos sin colapso. Esto se logra principalmente con confinamiento del hormigón mediante estribos.
        </Note>
      </Card>

      {/* 8 — Resistencia a la tracción */}
      <Card>
        <SectionTitle n="8">Resistencia a la Tracción</SectionTitle>
        <p className="text-sm text-text-secondary mb-2">
          La resistencia a la tracción del hormigón es mucho menor que su resistencia a la compresión:
        </p>
        <Formula>ft ≈ 0,1 · f'c</Formula>
        <p className="text-xs text-text-muted mb-4">Es decir, solo el <strong>10%</strong> de la resistencia a compresión.</p>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Métodos de medición</h3>
        <div className="space-y-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-blue mb-1">Ensayo por hendimiento — Prueba Brasileña (NCh1170)</div>
            <p className="text-xs text-text-secondary mb-2">Cilindro horizontal con carga lineal en su diámetro. La tensión de tracción se genera perpendicularmente al plano de carga.</p>
            <div className="bg-bg-base rounded px-3 py-1.5 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-blue">fsp = 2P / (π·L·d)</span>
            </div>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-amber mb-1">Ensayo de flexotracción — Módulo de rotura (NCh1038)</div>
            <p className="text-xs text-text-secondary">Viga simplemente apoyada con carga en el tercio central. Se mide el <strong className="text-text-primary">módulo de rotura fr</strong>: tensión de tracción extrema en la fibra inferior en el momento de la falla. El módulo de rotura es mayor que la resistencia directa porque el daño se concentra solo en la fibra extrema.</p>
          </div>
        </div>
        <Note type="ok">
          En el diseño a flexión la resistencia a tracción del hormigón se <strong>desprecia completamente</strong>.
          El acero de refuerzo absorbe todas las tensiones de tracción.
        </Note>
      </Card>

      {/* 9 — Biaxial */}
      <Card>
        <SectionTitle n="9">Comportamiento Biaxial</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">Tensiones simultáneas en dos direcciones (plano):</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Estado de tensiones", "Efecto"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Compresión + Compresión", "Aumento de resistencia hasta un 25% respecto a uniaxial"],
                ["Tracción + Compresión", "Disminución de resistencia en la dirección de compresión"],
                ["Tracción + Tracción", "Disminución de resistencia en ambas direcciones"],
              ].map(([estado, efecto]) => (
                <tr key={estado as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-mono text-text-primary text-xs">{estado}</td>
                  <td className="px-3 py-2 text-text-secondary text-xs">{efecto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 10 — Triaxial */}
      <Card>
        <SectionTitle n="10">Comportamiento Triaxial — Confinamiento</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          Cuando el hormigón está confinado (rodeado por espirales, estribos o encamisado), está sometido a
          tensiones en las tres direcciones simultáneamente.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { titulo: "Resistencia a compresión", valor: "Puede duplicarse o más", color: "accent-green" },
            { titulo: "Deformación última", valor: "Hasta 6% (vs 0,3% sin confinar)", color: "accent-blue" },
            { titulo: "Deformación en f'c máx", valor: "También aumenta significativamente", color: "accent-amber" },
            { titulo: "Ductilidad", valor: "Aumenta drásticamente", color: "accent-purple" },
          ].map(({ titulo, valor, color }) => (
            <div key={titulo} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="text-xs text-text-muted mb-1">{titulo}</div>
              <div className={cn("text-sm font-semibold", `text-${color}`)}>{valor}</div>
            </div>
          ))}
        </div>
        <Note type="ok">
          El confinamiento es la herramienta más poderosa para mejorar el comportamiento del hormigón.
          En diseño sísmico, los estribos cerrados y espirales en columnas generan confinamiento triaxial que transforma
          el hormigón de frágil a muy dúctil. Esta es la base del diseño por capacidad en zonas sísmicas.
        </Note>
      </Card>

      {/* 11 — Fluencia */}
      <Card>
        <SectionTitle n="11">Fluencia del Hormigón (Creep) — ACI 209R</SectionTitle>
        <p className="text-sm text-text-secondary mb-2">
          Acortamiento progresivo del hormigón bajo <strong className="text-text-primary">cargas sostenidas en el tiempo</strong>,
          incluso sin aumento de carga. Puede ser igual o mayor que la deformación elástica inicial.
        </p>
        <Formula>ε_fluencia(t) = ε_elástica · Ct</Formula>
        <Formula>Ct = Cu · Kt · Ka · Kh · Kth · Ks · Kf · Ke</Formula>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Coeficiente", "Símbolo", "Descripción", "Valor / Fórmula"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["Último de fluencia", "Cu", "Valor asintótico máximo", "1,3 – 4,15 → usar 2,35 sin datos"],
                ["Tiempo de carga", "Kt", "Evolución temporal", "Kt = t^0,6 / (10 + t^0,6), t en días"],
                ["Edad primera carga", "Ka", "Madurez del hormigón", "Ka = 1,25·ti^−0,118 (curado húmedo)"],
                ["Humedad relativa", "Kh", "Efecto del ambiente", "H≤40%: Kh=1 / H>40%: 1,27−0,0067·H"],
                ["Espesor promedio", "Kth", "Tamaño del elemento", "h≤150mm: tabla / 150<h≤400mm: ver norma"],
                ["Revenimiento", "Ks", "Trabajabilidad (A/C indirecta)", "Ks = 0,82 + 0,00264·S"],
                ["Contenido de finos", "Kf", "Proporción áridos finos", "Kf = 0,88 + 0,00264·%finos"],
                ["Contenido de aire", "Ke", "Aire incluido", "Ke = 0,46 + 0,09·%aire ≥ 1,0"],
              ].map(([nombre, sym, desc, formula]) => (
                <tr key={sym as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-primary">{nombre}</td>
                  <td className="px-3 py-2 font-mono font-semibold text-accent-blue">{sym}</td>
                  <td className="px-3 py-2 text-text-secondary">{desc}</td>
                  <td className="px-3 py-2 font-mono text-text-muted">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="warn">
          La fluencia afecta principalmente elementos con cargas permanentes elevadas (columnas, vigas postesadas).
          En vigas puede <strong>duplicar o más la deflexión elástica inicial</strong> a largo plazo.
          También genera redistribución de esfuerzos: el hormigón fluye y transfiere carga al acero.
        </Note>
      </Card>

      {/* 12 — Retracción */}
      <Card>
        <SectionTitle n="12">Retracción del Hormigón (Shrinkage) — ACI 209R</SectionTitle>
        <p className="text-sm text-text-secondary mb-2">
          Acortamiento del hormigón por <strong className="text-text-primary">pérdida de humedad</strong> (evaporación),
          independiente de las cargas aplicadas. Deformación final típica: 0,0002 a 0,0006.
        </p>
        <Formula>ε_sh(t) = ε_shu · St · Sh · Sth · Ss · Sf · Se · Sc</Formula>
        <p className="text-xs text-text-muted mb-3">ε_shu ≈ 0,00078 (valor promedio ACI 209R)</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Coeficiente", "Símbolo", "Descripción", "Fórmula"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["Tiempo", "St", "Evolución temporal", "Curado húmedo: t/(t+35) / Vapor: t/(t+55)"],
                ["Humedad", "Sh", "Efecto del ambiente", "H≤40%: 1 / 40<H≤80%: 1,4−0,0102H / 80<H≤100%: 3,0−0,03H"],
                ["Espesor", "Sth", "Tamaño del elemento", "h≤150mm: tabla / 150<h≤400mm: ver norma"],
                ["Revenimiento", "Ss", "Consistencia (A/C)", "Ss = 0,89 + 0,00161·S"],
                ["Finos", "Sf", "%finos ≤50%: …", "%≤50%: 0,30+0,014·% / %>50%: 0,90+0,002·%"],
                ["Aire", "Se", "Aire incluido", "Se = 0,95 + 0,008·%aire"],
                ["Cemento", "Sc", "Contenido de cemento", "Sc = 0,75 + 0,00061·c"],
              ].map(([nombre, sym, desc, formula]) => (
                <tr key={sym as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-primary">{nombre}</td>
                  <td className="px-3 py-2 font-mono font-semibold text-accent-green">{sym}</td>
                  <td className="px-3 py-2 text-text-secondary">{desc}</td>
                  <td className="px-3 py-2 font-mono text-text-muted">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="warn">
          La retracción es especialmente peligrosa en elementos largos o continuos que no pueden contraerse libremente
          (losas, muros, pavimentos). Al estar restringida genera tensiones de tracción que producen fisuras
          antes de que se aplique ninguna carga estructural.
        </Note>
      </Card>

      {/* 13 — Expansión térmica */}
      <Card>
        <SectionTitle n="13">Expansión Térmica</SectionTitle>
        <Formula unit="°C⁻¹">αT ≈ 10⁻⁵  (10 μɛ/°C)</Formula>
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Efecto de altas temperaturas (incendio)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Temperatura", "Efecto"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Hasta 200°C", "La rigidez (Ec) comienza a disminuir"],
                ["Hasta 400°C", "Resistencia f'c se mantiene relativamente estable"],
                ["400°C – 600°C", "Reducción significativa de la resistencia ⚠"],
                ["600°C", "La resistencia cae al 60% del valor original"],
              ].map(([temp, efecto]) => (
                <tr key={temp as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-mono text-text-primary text-xs">{temp}</td>
                  <td className="px-3 py-2 text-text-secondary text-xs">{efecto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="info">
          El recubrimiento de hormigón protege al acero de refuerzo del calor en caso de incendio.
          El acero también pierde resistencia a temperaturas elevadas y es el elemento más vulnerable.
        </Note>
      </Card>

      {/* 14 — Resumen */}
      <Card>
        <SectionTitle n="14">Resumen — Propiedades del Hormigón</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Propiedad", "Valor típico / Referencia"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Resistencia compresión f'c", "20 – 50 MPa (diseño convencional)"],
                ["Deformación en f'c (ε₀)", "≈ 0,002 (2‰)"],
                ["Deformación última εu (ACI)", "0,003 (3‰)"],
                ["Módulo de elasticidad Ec", "4700·√f'c [MPa] (peso normal)"],
                ["Módulo de Poisson μ", "0,15 – 0,20"],
                ["Resistencia a tracción ft", "≈ 0,1·f'c"],
                ["Densidad (normal)", "2.200 – 2.300 kg/m³"],
                ["Coef. fluencia último Cu", "2,35 (valor sin datos precisos)"],
                ["Deform. retracción última εshu", "≈ 0,00078 (promedio)"],
                ["Coef. expansión térmica αT", "≈ 10⁻⁵ °C⁻¹"],
              ].map(([prop, val]) => (
                <tr key={prop as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-medium text-text-primary text-xs">{prop}</td>
                  <td className="px-3 py-2 font-mono text-accent-blue text-xs">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Normas aplicables</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["NCh170:2016", "Clasificación del hormigón (GXX) y requisitos generales"],
            ["NCh1037", "Ensayo de resistencia a la compresión (probetas cilíndricas)"],
            ["NCh1170", "Ensayo de resistencia a la tracción por hendimiento (prueba brasileña)"],
            ["NCh1038", "Ensayo de flexotracción (módulo de rotura)"],
            ["ACI 209R", "Cálculo de fluencia y retracción"],
            ["ACI 215R-92", "Consideraciones por fatiga en hormigón"],
          ].map(([norma, desc]) => (
            <div key={norma as string} className="bg-bg-elevated rounded-lg p-2.5 border border-bg-border">
              <div className="text-xs font-semibold text-accent-blue mb-0.5">{norma}</div>
              <div className="text-[10px] text-text-muted">{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── ACERO ────────────────────────────────────────────────────────────────────
function TabAcero() {
  return (
    <div className="space-y-6">

      {/* A1 — Clasificación */}
      <Card>
        <SectionTitle n="A1">Clasificación NCh204.Of2020 — Acero de Refuerzo en Chile</SectionTitle>
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Nomenclatura</h3>
        <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border font-mono text-center mb-3">
          <span className="text-accent-blue text-lg">A</span>
          <span className="text-accent-amber text-lg">ZZZ</span>
          <span className="text-text-muted text-lg">-</span>
          <span className="text-accent-green text-lg">YYY</span>
          <span className="text-accent-purple text-lg">H</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { letra: "A", color: "accent-blue", def: "Acero al carbono" },
            { letra: "ZZZ", color: "accent-amber", def: "Tensión última mínima (MPa)" },
            { letra: "YYY", color: "accent-green", def: "Tensión de fluencia mínima (MPa)" },
            { letra: "H", color: "accent-purple", def: "Para Hormigones" },
          ].map(({ letra, color, def }) => (
            <div key={letra} className="bg-bg-elevated rounded-lg p-2.5 border border-bg-border text-center">
              <div className={cn("text-lg font-mono font-bold mb-1", `text-${color}`)}>{letra}</div>
              <div className="text-[10px] text-text-muted">{def}</div>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Tipos disponibles en Chile</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Designación", "Abreviada", "fy mínimo", "fu mínimo", "Uso"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["A440-280H", "A440", "280 MPa", "440 MPa", "Elementos menos exigidos"],
                ["A630-420H", "A630 ★", "420 MPa", "630 MPa", "Más usado en Chile — convencional"],
                ["A700-520H", "A700", "520 MPa", "700 MPa", "Alta resistencia — especiales"],
                ["A730-550H", "A730", "550 MPa", "730 MPa", "Alta resistencia — especiales"],
              ].map(([des, abr, fy, fu, uso]) => (
                <tr key={des as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-mono text-text-primary text-xs">{des}</td>
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{abr}</td>
                  <td className="px-3 py-2 font-mono text-accent-green text-xs">{fy}</td>
                  <td className="px-3 py-2 font-mono text-accent-amber text-xs">{fu}</td>
                  <td className="px-3 py-2 text-text-muted text-xs">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="warn">
          La designación abreviada (A440, A630, etc.) se refiere a la tensión <strong>última</strong>, no a la fluencia.
          A630-420H tiene fy = 420 MPa y fu = 630 MPa.
        </Note>
      </Card>

      {/* A2 — Requisitos geométricos */}
      <Card>
        <SectionTitle n="A2">Requisitos Geométricos</SectionTitle>
        <h3 className="text-sm font-semibold text-text-secondary mb-1">Diámetro nominal de barras corrugadas</h3>
        <Formula unit="mm">dn = 12,73 · √mn</Formula>
        <p className="text-xs text-text-muted mb-3">Donde mn = masa nominal en kg/m (derivada de A = π·d²/4 con ρacero = 7850 kg/m³)</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Barras lisas</div>
            <div className="text-sm text-accent-blue font-mono">ϕ 6 mm</div>
            <p className="text-xs text-text-muted mt-1">Solo en ϕ6. Usadas como estribos o distribución.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Barras corrugadas</div>
            <div className="text-xs font-mono text-accent-blue">ϕ8, 10, 12, 16, 20, 22, 25, 32 mm</div>
            <p className="text-xs text-text-muted mt-1">Resaltes que aumentan adherencia con el hormigón.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Largos de fabricación</div>
            <div className="text-sm text-accent-blue font-mono">6 m · 12 m</div>
            <p className="text-xs text-text-muted mt-1">Presentación comercial estándar en Chile.</p>
          </div>
        </div>
      </Card>

      {/* A3 — Propiedades mecánicas */}
      <Card>
        <SectionTitle n="A3">Propiedades Mecánicas — Ensayo de Tracción (NCh200)</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">Probetas de longitud estándar l₀ = 200 mm según NCh200.</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Propiedad", "Símbolo", "Unidad", "Descripción"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Módulo de elasticidad", "Es", "MPa", "Pendiente del tramo elástico = 210.000 MPa (constante para todos los aceros)"],
                ["Módulo de endurecimiento", "Esh", "MPa", "Pendiente zona de endurecimiento = 7.000 MPa"],
                ["Módulo de Poisson (elástico)", "ν", "—", "ν = 0,3"],
                ["Módulo de Poisson (plástico)", "ν", "—", "ν = 0,5"],
                ["Tensión de fluencia", "fy", "MPa", "Tensión en que el acero deja de comportarse elásticamente"],
                ["Tensión última", "fu", "MPa", "Tensión máxima antes de la fractura"],
                ["Deformación de fluencia", "εy", "—", "εy = fy / Es"],
                ["Elongación máxima", "εu", "%", "4,5% – 12% según tipo de acero"],
                ["Densidad del acero", "ρ", "kg/m³", "7.850 kg/m³"],
              ].map(([prop, sym, unit, desc]) => (
                <tr key={sym as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-primary text-xs">{prop}</td>
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{sym}</td>
                  <td className="px-3 py-2 font-mono text-text-muted text-xs">{unit}</td>
                  <td className="px-3 py-2 text-text-secondary text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-semibold text-text-secondary mb-2">Deformaciones de fluencia por tipo</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { acero: "A440-280H", fy: "280 MPa", ey: "εy = 0,00133" },
            { acero: "A630-420H ★", fy: "420 MPa", ey: "εy = 0,002" },
          ].map(({ acero, fy, ey }) => (
            <div key={acero} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="text-xs font-semibold text-text-primary">{acero}</div>
              <div className="text-xs text-text-secondary">fy = {fy}</div>
              <div className="text-sm font-mono text-accent-blue mt-1">{ey}</div>
            </div>
          ))}
        </div>
        <Note type="info">
          La deformación de fluencia del A630 (εy = 0,002) <strong>coincide con ε₀ del hormigón</strong> (0,002).
          Esta coincidencia tiene implicancias en el diseño balanceado.
        </Note>
      </Card>

      {/* A4 — Curva σ-ε del acero */}
      <Card>
        <SectionTitle n="A4">Curva Tensión-Deformación del Acero — 4 Zonas</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: 1, zona: "Tramo elástico lineal (0 a εy)",
              color: "accent-green",
              desc: "Perfectamente lineal con pendiente Es = 210.000 MPa. El acero se comporta como resorte perfecto: sin deformación residual al retirar la carga. Termina abruptamente en fy.",
            },
            {
              n: 2, zona: "Meseta (plateau) de fluencia (εy a εsh)",
              color: "accent-blue",
              desc: "La tensión se mantiene constante = fy mientras la deformación continúa creciendo. Deformación plástica pura sin aumento de carga. Extensión ≈ εsh ≈ 0,010–0,015 para A630. Esta zona es el corazón de la ductilidad del acero.",
            },
            {
              n: 3, zona: "Endurecimiento por deformación (εsh a εu)",
              color: "accent-amber",
              desc: "La tensión vuelve a aumentar con pendiente Esh = 7.000 MPa. El material sigue siendo dúctil pero gana resistencia adicional. Termina en fu.",
            },
            {
              n: 4, zona: "Estricción y fractura (post fu)",
              color: "accent-red",
              desc: "La sección transversal de la barra se estrangula localmente (necking). La tensión aparente disminuye aunque la verdadera sigue aumentando. Finaliza en la fractura.",
            },
          ].map(({ n, zona, color, desc }) => (
            <div key={n} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0", `bg-${color}/15 text-${color}`)}>{n}</span>
                <div className={cn("text-xs font-semibold", `text-${color}`)}>{zona}</div>
              </div>
              <p className="text-xs text-text-secondary pl-7">{desc}</p>
            </div>
          ))}
        </div>
        <Note type="ok">
          <strong>Principio de falla dúctil preferida:</strong> siempre se diseña para que el acero fluya antes
          de que el hormigón se aplaste. La falla del acero es gradual y visible; la del hormigón es abrupta y frágil.
          El plateau de fluencia garantiza grandes deformaciones visibles antes del colapso.
        </Note>

        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Comparación entre tipos de acero</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Propiedad", "A440", "A630", "A700", "A730"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["Módulo E (pendiente elástica)", "Igual", "Igual", "Igual", "Igual"],
                ["Tensión fluencia fy", "280 MPa", "420 MPa", "520 MPa", "550 MPa"],
                ["Elongación (ductilidad)", "Mayor", "Media", "Menor", "Menor"],
                ["Meseta de fluencia", "Larga", "Media", "Corta", "Corta o nula"],
              ].map(([prop, a440, a630, a700, a730]) => (
                <tr key={prop as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-medium text-text-primary">{prop}</td>
                  <td className="px-3 py-2 text-text-secondary">{a440}</td>
                  <td className="px-3 py-2 text-accent-blue font-semibold">{a630}</td>
                  <td className="px-3 py-2 text-text-secondary">{a700}</td>
                  <td className="px-3 py-2 text-text-secondary">{a730}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="info">
          <strong>Es = 210.000 MPa es idéntico para todos los tipos de acero</strong> — la rigidez no cambia con la resistencia.
          Los aceros de mayor resistencia son menos dúctiles: mayor fy pero meseta más corta y menor elongación total.
        </Note>
      </Card>

      {/* A5 — Modelos idealizados */}
      <Card>
        <SectionTitle n="A5">Modelos Tensión-Deformación Idealizados</SectionTitle>
        <div className="space-y-3">
          <div className="bg-bg-elevated rounded-lg p-4 border border-accent-blue/30">
            <h3 className="text-sm font-semibold text-accent-blue mb-2">⭐ Modelo Elástico Perfectamente Plástico (EPP)</h3>
            <p className="text-xs text-text-secondary mb-3">El modelo más usado en diseño de hormigón armado — base de todas las fórmulas del ACI 318.</p>
            <div className="bg-bg-base rounded px-3 py-2 font-mono text-xs border border-bg-border mb-3">
              <div className="text-text-muted">• Si εs &lt; εy  →  fs = Es · εs  (elástico)</div>
              <div className="text-accent-blue mt-1">• Si εs ≥ εy  →  fs = fy  (fluencia, tensión constante)</div>
            </div>
            <p className="text-xs text-text-secondary">Se omite el endurecimiento por deformación. Conservador en resistencia. Válido porque en diseño normal el acero no alcanza la zona de endurecimiento.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <h3 className="text-sm font-semibold text-text-primary mb-1">Modelo Bilineal con endurecimiento</h3>
            <p className="text-xs text-text-secondary">Igual que EPP pero incluye la Zona 3 con pendiente Esh = 7.000 MPa. Para análisis no lineal que requiere mayor precisión.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <h3 className="text-sm font-semibold text-text-primary mb-1">Modelo de Ramberg-Osgood</h3>
            <p className="text-xs text-text-secondary">Curva continua sin punto de quiebre definido. Para modelación computacional avanzada (análisis no lineal fino).</p>
          </div>
        </div>
      </Card>

      {/* A6 — Velocidad de deformación */}
      <Card>
        <SectionTitle n="A6">Efecto de la Velocidad de Deformación</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          Un aumento en la velocidad de deformación aumenta fy y fu. El efecto es mayor sobre fy y sobre aceros de menor tensión de fluencia.
        </p>
        <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border mb-3">
          <div className="text-xs font-semibold text-text-primary mb-1">Relevancia sísmica</div>
          <div className="text-xs text-text-secondary">Velocidad sísmica: 0,01 s⁻¹ a 0,1 s⁻¹ → fy real durante el sismo puede ser <strong className="text-text-primary">10–20% mayor</strong> que fy estático nominal.</div>
        </div>
        <Note type="warn">
          En diseño sísmico por capacidad, si fy real &gt; fy nominal, las fuerzas transmitidas por el acero son mayores que
          las calculadas. Esto puede sobrecargar columnas y uniones diseñadas con el fy nominal.
          Por eso las normas sísmicas especifican usar <strong>fy probable (amplificado)</strong> al diseñar los elementos que deben permanecer elásticos.
        </Note>
      </Card>

      {/* A7 — Comportamiento cíclico */}
      <Card>
        <SectionTitle n="A7">Comportamiento Cíclico — Fatiga de Bajo Ciclaje</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          Los lazos cíclicos del acero son más "llenos" que los del hormigón: mayor capacidad de disipación de energía
          por ciclo. Sin degradación de resistencia en los primeros ciclos.
        </p>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Fatiga de bajo ciclaje</h3>
        <p className="text-xs text-text-secondary mb-3">
          Falla por fatiga acumulada con 100 ciclos o menos, pero a <strong className="text-text-primary">grandes deformaciones</strong>.
          Modo de falla relevante para el acero de refuerzo bajo cargas sísmicas.
        </p>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Relación de Coffin-Manson (1954)</h3>
        <Formula>εA = M · (2Nf)^m</Formula>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Símbolo", "Significado", "Valor"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["εA", "Amplitud de deformación unitaria por ciclo", "—"],
                ["Nf", "Número de ciclos completos hasta la falla", "—"],
                ["2Nf", "Número de medio-ciclos hasta la falla", "—"],
                ["M", "Constante del material (regresión)", "0,11"],
                ["m", "Constante del material (regresión)", "−0,44"],
              ].map(([sym, sig, val]) => (
                <tr key={sym as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{sym}</td>
                  <td className="px-3 py-2 text-text-secondary text-xs">{sig}</td>
                  <td className="px-3 py-2 font-mono text-accent-amber text-xs">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Índice de daño de Miner (1945)</h3>
        <p className="text-xs text-text-secondary mb-2">Evalúa daño acumulado con amplitudes variables (caso sísmico real):</p>
        <Formula>D = Σᵢ (1 / 2Nfᵢ)</Formula>
        <div className="bg-bg-elevated rounded-lg p-3 border border-accent-red/30 mb-3">
          <div className="text-xs font-semibold text-red-400 mb-1">Condición de falla: D ≥ 1</div>
          <div className="text-xs text-text-secondary">Procedimiento: (1) medir εᵢ de cada medio ciclo → (2) calcular 2Nfi = (εi/M)^(1/m) → (3) sumar D = Σ(1/2Nfi) → (4) si D≥1: falla.</div>
        </div>
      </Card>

      {/* A8 — Modelos cíclicos */}
      <Card>
        <SectionTitle n="A8">Modelos Constitutivos para Análisis Cíclico</SectionTitle>
        <div className="space-y-3">
          {[
            {
              nombre: "Karthik & Mander (2011)",
              color: "accent-blue",
              desc: "Modelo explícito que representa la curva completa incluyendo endurecimiento y comportamiento cíclico. Incorpora el efecto del pandeo de barras comprimidas entre estribos.",
            },
            {
              nombre: "Menegotto & Pinto (1973) — variante 2011",
              color: "accent-amber",
              desc: "Uno de los modelos cíclicos más usados en software (OpenSees, SeismoStruct). Captura el efecto Bauschinger: cuando el acero fluye en tracción y luego se carga en compresión, la fluencia en compresión ocurre a un nivel menor que fy.",
            },
            {
              nombre: "Dhakal & Maekawa (2002) — variante 2011",
              color: "accent-green",
              desc: "Incorpora el pandeo de barras longitudinales bajo compresión cíclica. Fundamental para columnas sísmicas donde el acero longitudinal puede pandearse entre estribos, reduciendo resistencia y ductilidad.",
            },
          ].map(({ nombre, color, desc }) => (
            <div key={nombre} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className={cn("text-xs font-semibold mb-1", `text-${color}`)}>{nombre}</div>
              <p className="text-xs text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* A9 — Comparación acero vs. hormigón */}
      <Card>
        <SectionTitle n="A9">Comparación Acero vs. Hormigón</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Aspecto", "Acero", "Hormigón"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["Resistencia a compresión", "Alta", "Alta (función principal)"],
                ["Resistencia a tracción", "Alta ✓", "Muy baja (≈ 10% f'c)"],
                ["Módulo de elasticidad E", "210.000 MPa (constante)", "4700√f'c ≈ 20.000–35.000 MPa"],
                ["Ductilidad", "Alta (plateau de fluencia)", "Baja sin confinar"],
                ["Comportamiento", "Simétrico tracción/compresión", "Muy asimétrico"],
                ["Deformación de fluencia", "εy ≈ 0,002 (A630)", "ε₀ ≈ 0,002 (en f'c)"],
                ["Deformación última diseño", "εs ≥ 0,004–0,005", "εu = 0,003 (ACI)"],
                ["Efecto del tiempo", "Sin fluencia ni retracción", "Fluencia + retracción"],
              ].map(([aspecto, acero, hormigon]) => (
                <tr key={aspecto as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-medium text-text-primary">{aspecto}</td>
                  <td className="px-3 py-2 text-accent-blue">{acero}</td>
                  <td className="px-3 py-2 text-text-secondary">{hormigon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="info">
          La coincidencia εy ≈ ε₀ ≈ 0,002 sugiere que ambos materiales están "naturalmente calibrados" para trabajar juntos.
          La diferencia de módulos (E_acero ≈ 7–10× E_hormigón) explica el concepto de
          <strong> razón modular n = Es/Ec</strong> del análisis elástico de secciones.
        </Note>

        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Normas del acero</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["NCh204.Of2020", "Acero de refuerzo para hormigón en Chile — clasificación y requisitos"],
            ["NCh200", "Ensayo de tracción de metales (l₀ = 200 mm)"],
            ["ASTM A615", "Acero al carbono (EE.UU.) — Grados 40, 60, 75, 80"],
            ["ASTM A706", "Acero de baja aleación (EE.UU.) — Grade 60 ≈ A630 en fy"],
          ].map(([norma, desc]) => (
            <div key={norma as string} className="bg-bg-elevated rounded-lg p-2.5 border border-bg-border">
              <div className="text-xs font-semibold text-accent-blue mb-0.5">{norma}</div>
              <div className="text-[10px] text-text-muted">{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ComportamientoMecanicoPage() {
  const [tab, setTab] = useState<MainTab>("hormigon");

  return (
    <div className="min-h-screen bg-bg-base px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted mb-5">
        <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
        <span>/</span>
        <span className="text-text-secondary">Comportamiento Mecánico</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-accent-blue/15 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-accent-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Comportamiento Mecánico</h1>
          <p className="text-sm text-text-muted">Hormigón (Cap. 01) · Acero de refuerzo (Cap. 02) · Ing. M. Colque · ULS 2026</p>
        </div>
      </div>

      {/* Tabs principales */}
      <div className="flex gap-1 p-1 bg-bg-elevated border border-bg-border rounded-xl mb-6 w-fit">
        {([
          { id: "hormigon" as MainTab, label: "Hormigón" },
          { id: "acero" as MainTab, label: "Acero de Refuerzo" },
        ]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "px-5 py-2 rounded-lg text-sm font-medium transition-all",
              tab === id
                ? "bg-accent-blue text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "hormigon" && <TabHormigon />}
      {tab === "acero" && <TabAcero />}
    </div>
  );
}
