"use client";

import { useState } from "react";
import Link from "next/link";
import { Ruler, Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "fundamentos" | "fallas" | "practica";

function Formula({ children, unit }: { children: React.ReactNode; unit?: string }) {
  return (
    <div className="bg-bg-elevated border border-bg-border rounded-lg px-4 py-3 font-mono text-center my-3">
      <span className="text-accent-blue text-base">{children}</span>
      {unit && <span className="text-text-muted text-sm ml-2">[{unit}]</span>}
    </div>
  );
}

function Note({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" | "ok" | "bad" }) {
  const styles = {
    info: { bg: "bg-accent-blue/10 border-accent-blue/20", Icon: Info, ic: "text-accent-blue" },
    warn: { bg: "bg-accent-amber/10 border-accent-amber/20", Icon: AlertTriangle, ic: "text-accent-amber" },
    ok:   { bg: "bg-accent-green/10 border-accent-green/20", Icon: CheckCircle2, ic: "text-accent-green" },
    bad:  { bg: "bg-red-500/10 border-red-500/20", Icon: XCircle, ic: "text-red-400" },
  }[type];
  return (
    <div className={cn("rounded-lg p-3 border flex items-start gap-2 my-3", styles.bg)}>
      <styles.Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", styles.ic)} />
      <p className="text-xs text-text-secondary">{children}</p>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <section className="bg-bg-card border border-bg-border rounded-xl p-6">{children}</section>;
}

function SectionTitle({ n, children }: { n: string | number; children: React.ReactNode }) {
  return (
    <h2 className="text-base font-semibold text-text-primary mb-4 flex items-center gap-2">
      <span className="w-6 h-6 rounded bg-accent-amber/15 text-accent-amber text-xs flex items-center justify-center font-bold flex-shrink-0">{n}</span>
      {children}
    </h2>
  );
}

// ─── TAB 1: FUNDAMENTOS & WHITNEY ────────────────────────────────────────────
function TabFundamentos() {
  return (
    <div className="space-y-6">

      {/* F1 — 5 Supuestos */}
      <Card>
        <SectionTitle n="F1">Los 5 Supuestos Fundamentales del Diseño a Flexión</SectionTitle>
        <div className="space-y-3">
          {[
            {
              n: 1,
              titulo: "Secciones planas permanecen planas (Bernoulli)",
              desc: "Las secciones transversales que eran planas antes de la flexión siguen siendo planas después. La distribución de deformaciones es lineal a lo largo de la altura. Requiere buena adherencia acero-hormigón.",
              cond: "No aplica en vigas de canto alto (h/L > ~0,4) ni con grandes esfuerzos de corte.",
              imp: "Permite construir el diagrama de deformaciones: línea recta de εcu = 0,003 (arriba) hasta εs (acero de tracción).",
            },
            {
              n: 2,
              titulo: "Modelo EPP para el acero",
              desc: "La relación σ-ε del acero se idealiza como Elástico Perfectamente Plástico.",
              cond: "Si εs < εy → fs = Es·εs / Si εs ≥ εy → fs = fy",
              imp: "Simplifica enormemente el cálculo: una vez que el acero fluye, su tensión es simplemente fy.",
            },
            {
              n: 3,
              titulo: "Se desprecia la resistencia a tracción del hormigón",
              desc: "El hormigón traccionado (por debajo del eje neutro) NO contribuye a la resistencia de la sección.",
              cond: "ft ≈ 0,1·f'c, mínima. En práctica real el hormigón traccionado ya está fisurado.",
              imp: "Todo el hormigón bajo el eje neutro se ignora. Solo el acero As resiste las fuerzas de tracción.",
            },
            {
              n: 4,
              titulo: "La curva σ-ε del hormigón es conocida",
              desc: "La distribución de tensiones de compresión sigue la curva σ-ε real (parabólica). Esta distribución define la magnitud y punto de aplicación de la resultante C.",
              cond: "La curva es no lineal → el bloque de compresión es parabólico.",
              imp: "Se introduce el Bloque de Whitney para simplificar sin perder exactitud.",
            },
            {
              n: 5,
              titulo: "Acero y hormigón trabajan como una unidad (adherencia perfecta)",
              desc: "No hay deslizamiento relativo entre acero y hormigón. Ambos materiales tienen la misma deformación en la interfaz.",
              cond: "Garantizado por las barras corrugadas y los requisitos de recubrimiento.",
              imp: "La deformación del acero εs se calcula por similitud de triángulos a partir de la posición del eje neutro.",
            },
          ].map(({ n, titulo, desc, cond, imp }) => (
            <div key={n} className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <div className="flex items-start gap-3 mb-2">
                <span className="w-6 h-6 rounded-full bg-accent-amber/15 text-accent-amber text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div className="text-sm font-semibold text-text-primary">{titulo}</div>
              </div>
              <p className="text-xs text-text-secondary pl-9 mb-1">{desc}</p>
              <div className="pl-9 text-[10px] text-text-muted">
                <span className="text-accent-amber font-semibold">Condición: </span>{cond}
              </div>
              <div className="pl-9 text-[10px] text-accent-blue mt-0.5">
                <span className="font-semibold">Implicancia: </span>{imp}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* F2 — Evolución tensiones */}
      <Card>
        <SectionTitle n="F2">Evolución de la Distribución de Tensiones con el Momento</SectionTitle>
        <div className="space-y-3">
          {[
            {
              fase: "Fase 1 — Momento pequeño (M << M_falla)",
              color: "accent-green",
              desc: "Deformaciones pequeñas en toda la sección. Distribución de tensiones triangular tanto en compresión como en tracción (comportamiento elástico lineal). El hormigón no ha fisurado aún. Eje neutro cerca del centroide de la sección bruta.",
            },
            {
              fase: "Fase 2 — Momento mediano (M ≈ 50–80% M_falla)",
              color: "accent-amber",
              desc: "El hormigón traccionado fisura: la zona de tracción queda fuera de juego. La zona comprimida empieza a tener distribución curva (el hormigón entra en su rango no lineal). El eje neutro sube porque la zona comprimida trabaja a mayor nivel de tensión.",
            },
            {
              fase: "Fase 3 — Momento último (M = M_falla, εcu = 0,003)",
              color: "accent-blue",
              desc: "La fibra extrema superior alcanza εcu = 0,003 (criterio ACI). El hormigón comprimido tiene distribución parabólica. El acero de tracción ha fluido: fs = fy. El momento en este estado es el momento nominal Mn. Esta distribución parabólica es la que justifica el Bloque de Whitney.",
            },
          ].map(({ fase, color, desc }) => (
            <div key={fase} className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <div className={cn("text-xs font-semibold mb-2", `text-${color}`)}>{fase}</div>
              <p className="text-xs text-text-secondary">{desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* F3 — Bloque de Whitney */}
      <Card>
        <SectionTitle n="F3">El Bloque de Whitney ⭐⭐⭐ — Deducción Completa</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          La distribución real de tensiones de compresión a la resistencia última es una <strong className="text-text-primary">parábola</strong>.
          Whitney (1937) propuso reemplazarla por un <strong className="text-text-primary">bloque rectangular equivalente</strong>
          que tenga la misma resultante y el mismo punto de aplicación.
        </p>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Los factores K y su origen</h3>
        <p className="text-xs text-text-secondary mb-2">La distribución parabólica real se caracteriza mediante tres factores experimentales:</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { k: "K₁", def: "Factor de forma: área bajo la parábola como fracción del rectángulo K₁·c·f'c" },
            { k: "K₂", def: "Factor de posición: dónde actúa la resultante (K₂·c desde la fibra comprimida)" },
            { k: "K₃", def: "Factor de reducción: tensión máxima real vs. f'c del cilindro (resistencia in situ)" },
          ].map(({ k, def }) => (
            <div key={k} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="text-base font-mono font-bold text-accent-amber text-center mb-1">{k}</div>
              <p className="text-xs text-text-secondary">{def}</p>
            </div>
          ))}
        </div>
        <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs text-center border border-bg-border mb-4">
          <span className="text-accent-amber">Resultante real C = K₁ · K₃ · f'c · b · c</span>
          <span className="text-text-muted ml-3">actúa a K₂·c desde arriba</span>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">La equivalencia del bloque rectangular</h3>
        <p className="text-xs text-text-secondary mb-2">
          Whitney reemplaza la parábola por un <strong className="text-text-primary">rectángulo</strong> de tensión uniforme 0,85·f'c
          y altura a = β·c.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-amber mb-1">Distribución real (parabólica)</div>
            <div className="font-mono text-xs text-center text-text-secondary">C_real = K₁·K₃·f'c·b·c</div>
            <div className="font-mono text-xs text-center text-text-muted">actúa a K₂·c desde arriba</div>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-accent-blue/30">
            <div className="text-xs font-semibold text-accent-blue mb-1">Bloque equivalente (Whitney)</div>
            <div className="font-mono text-xs text-center text-accent-blue">C_equiv = 0,85·f'c·b·a</div>
            <div className="font-mono text-xs text-center text-text-muted">actúa a a/2 desde arriba</div>
          </div>
        </div>
        <Note type="ok">
          <strong>Condición de equivalencia:</strong> C_real = C_equiv (misma resultante) y mismo punto de aplicación.
          Esto determina los valores de 0,85 y β.
        </Note>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Factor β — Valores según f'c</h3>
        <Formula>a = β · c  ↔  β = a / c</Formula>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Condición", "Valor de β", "Fórmula"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["f'c ≤ 280 kgf/cm² (≈ 27,5 MPa)", "0,85", "β = 0,85"],
                ["f'c > 280 kgf/cm²", "Varía con f'c", "β = 1,05 − 0,0007·f'c (en kgf/cm²)"],
                ["Límites absolutos", "0,65 ≤ β ≤ 0,85", "Restricción de seguridad del ACI"],
              ].map(([cond, val, form]) => (
                <tr key={cond as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-secondary text-xs">{cond}</td>
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{val}</td>
                  <td className="px-3 py-2 font-mono text-text-primary text-xs">{form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="info">
          β decrece con f'c porque la curva σ-ε de hormigones de alta resistencia tiene una zona de tensión máxima
          más angosta (parábola más "puntiaguda"). El límite inferior β ≥ 0,65 es seguridad para hormigones de muy alta resistencia.
        </Note>

        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-3">Deformación última del hormigón</h3>
        <Formula>εcu = 0,003</Formula>
        <p className="text-xs text-text-secondary mb-2">
          El ACI adopta 0,003 como deformación máxima de diseño en la fibra extrema de compresión.
          Es mayor que ε₀ = 0,002 (resistencia máxima) porque la deformación última real está en la zona post-pico.
          El bloque a 0,85·f'c compensa la caída de tensión en el post-pico — el efecto neto representa bien la realidad.
        </p>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Variables y ecuaciones de la sección</h3>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Símbolo", "Nombre", "Descripción"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["b", "Ancho de la sección", "Ancho de la sección transversal"],
                ["h", "Altura total", "Altura total de la sección"],
                ["d", "Peralte efectivo", "Desde fibra comprimida extrema hasta centroide del acero de tracción. d = h − recub − ϕestribo − ϕbarra/2"],
                ["c", "Profundidad del eje neutro", "Desde la fibra comprimida extrema hasta el eje neutro real"],
                ["a", "Profundidad del bloque", "a = β·c (bloque de Whitney)"],
                ["As", "Área de acero de tracción", "Área total del acero de tracción en mm² o cm²"],
                ["εcu", "Deformación fibra comprimida extrema", "0,003 (diseño ACI)"],
                ["εs", "Deformación del acero", "εs = 0,003·(d−c)/c (similitud de triángulos)"],
              ].map(([sym, nombre, desc]) => (
                <tr key={sym as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue">{sym}</td>
                  <td className="px-3 py-2 font-medium text-text-primary">{nombre}</td>
                  <td className="px-3 py-2 text-text-secondary">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Fuerzas internas y equilibrio</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border text-center">
            <div className="text-xs text-text-muted mb-1">Resultante de compresión</div>
            <div className="font-mono text-accent-blue text-sm">C = 0,85 · f'c · a · b</div>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border text-center">
            <div className="text-xs text-text-muted mb-1">Resultante de tracción</div>
            <div className="font-mono text-accent-blue text-sm">T = As · fs</div>
          </div>
        </div>
        <Formula>C = T  →  0,85 · f'c · a · b = As · fs</Formula>
        <Formula>Mn = C · (d − a/2) = T · (d − a/2)</Formula>
        <p className="text-xs text-text-muted text-center">El brazo de palanca (d − a/2) va desde la resultante C (a a/2 desde arriba) hasta la resultante T (a d desde arriba).</p>
      </Card>

    </div>
  );
}

// ─── TAB 2: TIPOS DE FALLA & CUANTÍAS ────────────────────────────────────────
function TabFallas() {
  return (
    <div className="space-y-6">

      {/* T1 — Tipos de falla */}
      <Card>
        <SectionTitle n="T1">Tipos de Falla en Vigas Simplemente Armadas</SectionTitle>
        <p className="text-sm text-text-secondary mb-4">
          La cantidad de acero en la sección determina el modo de falla. El diseño siempre debe apuntar a la falla dúctil.
        </p>

        {/* Falla por tracción */}
        <div className="bg-accent-green/5 border border-accent-green/30 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-accent-green" />
            <h3 className="text-sm font-semibold text-accent-green">Falla por Tracción (Falla Dúctil) ✅ — LA QUE SE BUSCA</h3>
          </div>
          <p className="text-xs text-text-secondary mb-2"><strong className="text-text-primary">Condición:</strong> cuando el hormigón alcanza εcu = 0,003, el acero YA fluyó (εs &gt; εy). → c &lt; cb</p>
          <p className="text-xs text-text-secondary mb-3"><strong className="text-text-primary">Secuencia:</strong> el acero alcanza fy primero → continúa deformándose con tensión constante fy (plateau) → finalmente el hormigón alcanza εcu = 0,003 → falla.</p>
          <div className="bg-bg-base rounded px-3 py-1.5 font-mono text-xs text-center border border-bg-border mb-2">
            <span className="text-accent-green">a = As · fy / (0,85 · f'c · b)</span>
          </div>
          <div className="bg-bg-base rounded px-3 py-1.5 font-mono text-xs text-center border border-bg-border">
            <span className="text-accent-green">Mn = As · fy · (d − a/2)</span>
          </div>
          <p className="text-xs text-text-muted mt-2">Características: grandes deflexiones y fisuras anchas antes del colapso — la viga AVISA. Predecible y segura.</p>
        </div>

        {/* Falla por compresión */}
        <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-red-400">Falla por Compresión (Falla Frágil) ❌ — SE DEBE EVITAR</h3>
          </div>
          <p className="text-xs text-text-secondary mb-2"><strong className="text-text-primary">Condición:</strong> cuando el hormigón alcanza εcu = 0,003, el acero AÚN NO ha fluido (εs &lt; εy). → c &gt; cb</p>
          <p className="text-xs text-text-secondary mb-3"><strong className="text-text-primary">Secuencia:</strong> el hormigón llega primero a su límite → el acero sigue trabajando elásticamente → hormigón falla abruptamente → colapso SIN advertencia.</p>
          <div className="space-y-1 mb-2">
            <div className="bg-bg-base rounded px-3 py-1 font-mono text-xs text-center border border-bg-border">
              <span className="text-red-400">εs = 0,003 · (d − c) / c</span>
            </div>
            <div className="bg-bg-base rounded px-3 py-1 font-mono text-xs text-center border border-bg-border">
              <span className="text-red-400">fs = εs · Es  (acero NO fluyó, fs &lt; fy)</span>
            </div>
            <div className="bg-bg-base rounded px-3 py-1 font-mono text-xs text-center border border-bg-border">
              <span className="text-red-400">Ecuación cuadrática en a: 0,85f'c·a² / (ρ·0,003·Es) + d·a − β·d² = 0</span>
            </div>
          </div>
          <p className="text-xs text-text-muted">El ACI <strong>prohíbe</strong> este modo de falla para vigas mediante la cuantía máxima.</p>
        </div>

        {/* Falla balanceada */}
        <div className="bg-accent-amber/5 border border-accent-amber/30 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-accent-amber" />
            <h3 className="text-sm font-semibold text-accent-amber">Falla Balanceada — Estado Límite</h3>
          </div>
          <p className="text-xs text-text-secondary mb-3"><strong className="text-text-primary">Condición:</strong> cuando el hormigón alcanza εcu = 0,003, el acero SIMULTÁNEAMENTE alcanza εy. Define el límite entre falla dúctil y frágil.</p>
          <div className="space-y-1 mb-2">
            <div className="bg-bg-base rounded px-3 py-1 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-amber">cb = d · εcu / (εcu + εy) = d · 6300 / (6300 + fy)</span>
              <span className="text-text-muted ml-2">[fy en kgf/cm²]</span>
            </div>
            <div className="bg-bg-base rounded px-3 py-1 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-amber">ab = β · cb</span>
            </div>
            <div className="bg-bg-base rounded px-3 py-1 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-amber">ρb = 0,85·β·f'c/fy · 6300/(6300+fy)</span>
            </div>
          </div>
        </div>

        <Note type="info">
          Los tres tipos se distinguen por la posición relativa del eje neutro c respecto de cb:
          c &lt; cb → falla dúctil ✅ · c = cb → balanceada · c &gt; cb → falla frágil ❌.
          <strong> Más acero → eje neutro más profundo → menos deformación del acero → más cerca de la falla frágil.</strong>
        </Note>
      </Card>

      {/* T2 — Factor φ */}
      <Card>
        <SectionTitle n="T2">Factor de Reducción φ — Clasificación de Secciones</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          El ACI clasifica las secciones según la deformación del acero de tracción más extremo εt:
        </p>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Clasificación", "Condición εt", "φ (estribos)", "Tipo de falla"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Controlada por compresión", "εt ≤ 0,002", "0,65", "Frágil ❌"],
                ["Zona de transición", "0,002 < εt < 0,005", "0,65 → 0,90 (lineal)", "Intermedia"],
                ["Controlada por tracción", "εt ≥ 0,005", "0,90", "Dúctil ✅"],
              ].map(([clas, cond, phi, falla]) => (
                <tr key={clas as string} className={`hover:bg-bg-elevated/50 ${clas === "Controlada por tracción" ? "bg-accent-green/5" : clas === "Controlada por compresión" ? "bg-red-500/5" : ""}`}>
                  <td className="px-3 py-2 font-medium text-text-primary text-xs">{clas}</td>
                  <td className="px-3 py-2 font-mono text-text-secondary text-xs">{cond}</td>
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{phi}</td>
                  <td className="px-3 py-2 text-text-muted text-xs">{falla}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="warn">
          Para vigas: el ACI exige <strong>εt ≥ 0,004</strong> como mínimo absoluto (con φ interpolado ≈ 0,817).
          Para usar φ = 0,90 se necesita <strong>εt ≥ 0,005</strong>.
        </Note>
      </Card>

      {/* T3 — Cuantías */}
      <Card>
        <SectionTitle n="T3">Cuantías de Acero</SectionTitle>

        <h3 className="text-sm font-semibold text-text-secondary mb-1">Definición de cuantía</h3>
        <Formula>ρ = As / (b · d)</Formula>

        <h3 className="text-sm font-semibold text-text-secondary mb-1">Cuantía balanceada ρb</h3>
        <Formula>ρb = 0,85·β·f'c/fy · 6300/(6300+fy)  [fy en kgf/cm²]</Formula>

        <h3 className="text-sm font-semibold text-text-secondary mb-1">Cuantía máxima ρmáx</h3>
        <p className="text-xs text-text-secondary mb-2">Se fija imponiendo εt mínimo en el perfil de deformaciones:</p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-amber mb-1">Para εt ≥ 0,004 (mínimo ACI)</div>
            <div className="font-mono text-xs text-center text-accent-blue mt-1">c_máx = 3d/7</div>
            <div className="font-mono text-xs text-center text-accent-blue">a_máx = 3β·d/7</div>
            <div className="font-mono text-xs text-center text-accent-blue mt-1">ρ_máx ≈ 0,36·β·f'c/fy</div>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-accent-green/30">
            <div className="text-xs font-semibold text-accent-green mb-1">Para εt ≥ 0,005 (φ = 0,90)</div>
            <div className="font-mono text-xs text-center text-accent-blue mt-1">c_máx = 3d/8</div>
            <div className="font-mono text-xs text-center text-accent-blue">a_máx = 3β·d/8</div>
            <div className="font-mono text-xs text-center text-accent-blue mt-1">ρ_máx ≈ 0,32·β·f'c/fy</div>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-1">Cuantía mínima ρmín</h3>
        <Formula>ρ_mín = 0,8·√f'c / fy  ≥  14 / fy  [f'c y fy en kgf/cm²]</Formula>
        <p className="text-xs text-text-secondary mb-2">
          O en términos de área: As,mín = ρ_mín · b · d
        </p>
        <Note type="info">
          <strong>¿Por qué existe ρmín?</strong> Si hay muy poco acero, la sección sin fisurar puede tener mayor resistencia
          que la fisurada con el acero. Al fisurar, el acero tomaría toda la tracción de golpe superando fy → falla abrupta.
          La cuantía mínima garantiza que el acero puede absorber la tracción sin fluir inmediatamente.
        </Note>
        <Note type="warn">
          <strong>Excepción a ρmín:</strong> no es necesario aplicarla si As colocado ≥ (4/3)·As requerido por análisis
          (se coloca más del 33% extra de lo calculado).
        </Note>
      </Card>

      {/* T4 — Mn vs cuantía */}
      <Card>
        <SectionTitle n="T4">Variación de Mn con la Cuantía de Acero</SectionTitle>
        <Formula>Mn = ρ · b · d² · fy · (1 − 0,59 · ρ·fy/f'c)</Formula>
        <p className="text-sm text-text-secondary mb-3">
          Al aumentar As: T = As·fy crece, pero también crece a = As·fy/(0,85·f'c·b) → el brazo de palanca (d − a/2) <strong className="text-text-primary">disminuye</strong>.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-green mb-1">Zona dúctil (ρ &lt; ρb)</div>
            <p className="text-xs text-text-secondary">Mn aumenta al agregar acero, pero no linealmente. La disminución del brazo de palanca modera el incremento de Mn.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-amber mb-1">Zona de compresión (ρ &gt; ρb)</div>
            <p className="text-xs text-text-secondary">Agregar más acero apenas aumenta Mn. La ganancia en T es compensada por la gran pérdida en brazo de palanca. El acero no fluye en su totalidad.</p>
          </div>
        </div>
        <Note type="warn">
          Agregar acero más allá de ρmáx es antieconómico e ineficiente, además de producir falla frágil.
          La limitación de ρmáx es tanto una restricción de <strong>seguridad</strong> como de <strong>eficiencia</strong>.
        </Note>
      </Card>

    </div>
  );
}

// ─── TAB 3: DISEÑO PRÁCTICO ───────────────────────────────────────────────────
function TabPractica() {
  return (
    <div className="space-y-6">

      {/* P1 — Dimensiones */}
      <Card>
        <SectionTitle n="P1">Dimensiones Geométricas de la Sección</SectionTitle>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Altura mínima para control de deflexiones (ACI — Tabla)</h3>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Condición de apoyo", "h mínima"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Simplemente apoyada", "L / 16"],
                ["Un extremo continuo", "L / 18,5"],
                ["Ambos extremos continuos", "L / 21"],
                ["Voladizo", "L / 8"],
              ].map(([cond, h]) => (
                <tr key={cond as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-secondary text-xs">{cond}</td>
                  <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="info">
          Estos valores son para acero A630 (fy = 420 MPa). Para otro fy, multiplicar por: (0,4 + fy/700), con fy en MPa.
        </Note>

        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Proporción práctica</div>
            <div className="text-sm font-mono text-accent-blue text-center mt-1">b ≈ h / 2</div>
            <p className="text-xs text-text-muted mt-1">El ancho es aproximadamente la mitad de la altura.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">f'c convencional</div>
            <div className="text-sm font-mono text-accent-amber text-center mt-1">17 – 25 MPa</div>
            <p className="text-xs text-text-muted mt-1">Rango típico para estructuras convencionales.</p>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-text-primary mb-1">Acero más usado</div>
            <div className="text-sm font-mono text-accent-green text-center mt-1">A630-420H</div>
            <p className="text-xs text-text-muted mt-1">fy = 420 MPa — estándar en Chile.</p>
          </div>
        </div>
      </Card>

      {/* P2 — Recubrimiento */}
      <Card>
        <SectionTitle n="P2">Recubrimiento</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          Distancia desde la superficie exterior del hormigón hasta la barra de acero más exterior (generalmente el estribo).
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { tipo: "Normal", valor: "20 mm", desc: "Interior seco, condiciones no severas (DS N°60)" },
            { tipo: "Severo", valor: "40 mm", desc: "Alta humedad, jardines, balcones, industrial, marítimo (DS N°60)" },
          ].map(({ tipo, valor, desc }) => (
            <div key={tipo} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-text-primary">{tipo}</div>
                <div className="text-lg font-mono font-bold text-accent-blue">{valor}</div>
              </div>
              <p className="text-xs text-text-muted">{desc}</p>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-text-secondary mb-1">Funciones del recubrimiento</h3>
        <ul className="text-xs text-text-secondary space-y-0.5 mb-3">
          <li>• Garantizar adherencia entre hormigón y acero</li>
          <li>• Proteger el acero de la corrosión (el hormigón es alcalino)</li>
          <li>• Proteger el acero del fuego (baja conductividad térmica del hormigón)</li>
          <li>• Proteger contra el desgaste superficial</li>
        </ul>
        <h3 className="text-sm font-semibold text-text-secondary mb-1">Cálculo del peralte efectivo d</h3>
        <Formula>d = h − r_ecub − ϕ_estribo − ϕ_barra / 2</Formula>
        <Formula>d (doble fila) = h − r_ecub − ϕ_estribo − ϕ_barra − s_vert/2 − ϕ_barra_sup/2</Formula>
        <p className="text-xs text-text-muted">Para doble fila: s_vert ≥ 25 mm (separación vertical entre capas).</p>
      </Card>

      {/* P3 — Separación de barras */}
      <Card>
        <SectionTitle n="P3">Separación Mínima entre Barras</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          Garantiza que el hormigón fresco fluya y envuelva bien las barras.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Situación", "Separación libre mínima"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border">
              {[
                ["Elementos a flexión (tracción o compresión)", "db, pero no menor que 25 mm"],
                ["Elementos a compresión (columnas)", "1,5·db, pero no menor que 25 mm"],
                ["Entre capas (doble fila)", "25 mm (separación vertical libre)"],
              ].map(([sit, sep]) => (
                <tr key={sit as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-secondary text-xs">{sit}</td>
                  <td className="px-3 py-2 font-mono text-accent-blue text-xs font-semibold">{sep}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* P4 — Doble armadura */}
      <Card>
        <SectionTitle n="P4">Vigas con Armadura de Compresión (Doble Armadura)</SectionTitle>
        <h3 className="text-sm font-semibold text-text-secondary mb-2">¿Cuándo y por qué se usa A's?</h3>
        <ul className="text-xs text-text-secondary space-y-1 mb-3">
          <li>• La sección ya tiene ρmáx y aún se necesita más resistencia → única opción sin aumentar la sección</li>
          <li>• Para mejorar la ductilidad de una sección sobrearmada</li>
          <li>• Para reducir las deflexiones diferidas (fluencia)</li>
          <li>• Por razones constructivas (barras para sujetar estribos)</li>
        </ul>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Efecto de A's", "Magnitud", "Explicación"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["Aumento de Mn", "Bajo (≤ 15%)", "El eje neutro sube levemente → brazo de palanca crece poco"],
                ["Reducción de deflexiones por fluencia", "Significativa (hasta 50%)", "A's restringe el acortamiento por fluencia del hormigón comprimido"],
                ["Aumento de ductilidad", "Significativo (hasta 40% con ρ' = ρ)", "Eje neutro sube → εs de tracción aumenta → mayor deformación antes de la falla"],
                ["Cambio del modo de falla", "Clave", "Una sección que fallaría por compresión puede pasar a falla por tracción con A's suficiente"],
              ].map(([efecto, mag, exp]) => (
                <tr key={efecto as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 font-medium text-text-primary">{efecto}</td>
                  <td className="px-3 py-2 text-accent-blue font-semibold">{mag}</td>
                  <td className="px-3 py-2 text-text-secondary">{exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note type="warn">
          La armadura de compresión NO se coloca para aumentar significativamente Mn (solo da ≤15%).
          Se coloca principalmente por <strong>ductilidad y control de deflexiones</strong>.
        </Note>

        <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-3">Análisis — Caso más común: ambos aceros fluyen</h3>
        <p className="text-xs text-text-secondary mb-2">Verificación de fluencia de A's:</p>
        <Formula>ε's = εcu · (c − d') / c  ≥ εy ?</Formula>
        <p className="text-xs text-text-secondary mb-2">Si A's fluye (f's = fy) → descomposición en dos pares:</p>
        <div className="space-y-2 mb-3">
          <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs border border-bg-border">
            <div className="text-accent-blue">Par 1: As1 = A's  →  Mn1 = A's · fy · (d − d')</div>
          </div>
          <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs border border-bg-border">
            <div className="text-accent-blue">Par 2: As2 = As − A's  →  a = As2·fy/(0,85·f'c·b)  →  Mn2 = As2·fy·(d − a/2)</div>
          </div>
          <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs border border-accent-blue/30 text-center">
            <span className="text-accent-blue font-semibold">Mn = Mn1 + Mn2</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Ecuación general (cualquier caso)</h3>
        <Formula>0,85·f'c·a·b + A's·f's = As·fs</Formula>
        <div className="grid grid-cols-2 gap-2">
          {[
            ["εs", "εcu · (d − c) / c"],
            ["ε's", "εcu · (c − d') / c"],
          ].map(([sym, form]) => (
            <div key={sym as string} className="bg-bg-elevated rounded px-3 py-1.5 font-mono text-xs text-center border border-bg-border">
              <span className="text-accent-amber">{sym} = {form}</span>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Caso", "As", "A's", "fs", "f's"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["1", "Fluye", "Fluye", "fy", "fy"],
                ["2", "Fluye", "No fluye", "fy", "ε's·Es < fy"],
                ["3", "No fluye", "Fluye", "εs·Es < fy", "fy"],
                ["4", "No fluye", "No fluye", "εs·Es < fy", "ε's·Es < fy"],
              ].map(([caso, as_, as2, fs, fs2]) => (
                <tr key={caso as string} className={`hover:bg-bg-elevated/50 ${caso === "1" ? "bg-accent-green/5" : ""}`}>
                  <td className="px-3 py-2 font-bold text-text-primary">{caso}</td>
                  <td className="px-3 py-2 text-text-secondary">{as_}</td>
                  <td className="px-3 py-2 text-text-secondary">{as2}</td>
                  <td className="px-3 py-2 font-mono text-text-muted">{fs}</td>
                  <td className="px-3 py-2 font-mono text-text-muted">{fs2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* P5 — Vigas T */}
      <Card>
        <SectionTitle n="P5">Vigas de Sección T</SectionTitle>
        <p className="text-sm text-text-secondary mb-3">
          En la construcción real, las vigas se construyen monolíticamente con la losa. Cuando la losa está en la zona
          comprimida (momentos positivos), una porción colabora como <strong className="text-text-primary">ala (flange)</strong>.
          Ventaja: enorme área de compresión → eje neutro en el ala → gran brazo de palanca → alta eficiencia.
        </p>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Variables de la sección T</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            ["b", "Ancho efectivo del ala (flange)"],
            ["bw", "Ancho del alma (web)"],
            ["hf", "Altura del ala (espesor de la losa)"],
            ["d", "Peralte efectivo"],
          ].map(([sym, desc]) => (
            <div key={sym as string} className="bg-bg-elevated rounded-lg p-2.5 border border-bg-border flex items-center gap-2">
              <span className="font-mono font-bold text-accent-blue text-sm w-6">{sym}</span>
              <span className="text-xs text-text-secondary">{desc}</span>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Determinación del ancho efectivo b (ACI)</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-blue mb-2">Viga T interior (ala en ambos lados)</div>
            <div className="text-xs text-text-secondary">b = mínimo de:</div>
            <ul className="text-xs font-mono text-text-secondary mt-1 space-y-0.5">
              <li>• L / 4</li>
              <li>• bw + 8·hf (por cada lado → total bw+8hf)</li>
              <li>• Separación entre centros de vigas</li>
            </ul>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
            <div className="text-xs font-semibold text-accent-amber mb-2">Viga L (ala en un solo lado)</div>
            <div className="text-xs text-text-secondary">b = mínimo de:</div>
            <ul className="text-xs font-mono text-text-secondary mt-1 space-y-0.5">
              <li>• bw + L/12</li>
              <li>• bw + 6·hf</li>
              <li>• bw + (separación libre)/2</li>
            </ul>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Análisis caso general (a &gt; hf — eje neutro en el alma)</h3>
        <div className="space-y-2 mb-3">
          <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs border border-bg-border">
            <div className="text-accent-amber">Asf = 0,85·f'c·hf·(b − bw) / fy  →  Mnf = Asf·fy·(d − hf/2)</div>
          </div>
          <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs border border-bg-border">
            <div className="text-accent-blue">Asw = As − Asf  →  a = Asw·fy/(0,85·f'c·bw)  →  Mnw = Asw·fy·(d − a/2)</div>
          </div>
          <div className="bg-bg-elevated rounded px-3 py-2 font-mono text-xs border border-accent-blue/30 text-center">
            <span className="text-accent-blue font-semibold">Mn = Mnf + Mnw</span>
          </div>
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-1">Cuantía mínima para vigas T (ala en tracción)</h3>
        <Formula>As,mín = 1,6·√f'c/fy · bw·d  ≥  14/fy · bw·d  [kgf/cm²]</Formula>
        <Formula>As,mín = 0,8·√f'c/fy · bf·d  ≥  14/fy · bw·d  (alternativa)</Formula>
      </Card>

      {/* P6 — Procedimientos */}
      <Card>
        <SectionTitle n="P6">Procedimientos de Diseño y Análisis</SectionTitle>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Diseño (dado Mu, encontrar As y sección)</h3>
        <div className="space-y-1.5 mb-5">
          {[
            { n: 1, paso: "Definir materiales", desc: "f'c, fy → calcular β" },
            { n: 2, paso: "Estimar dimensiones", desc: "h ≥ L/16 (s. apoyada). Asumir b ≈ h/2" },
            { n: 3, paso: "Calcular d", desc: "d = h − recubrimiento − ϕestribo − ϕbarra/2" },
            { n: 4, paso: "Calcular Mu total", desc: "Incluir peso propio de la viga: wu·L²/8" },
            { n: 5, paso: "Calcular Rn = Mu/(φ·b·d²)", desc: "Usar φ = 0,90 preliminar" },
            { n: 6, paso: "Calcular ρ requerida", desc: "ρ = 0,85·f'c/fy · (1 − √(1 − 2Rn/(0,85·f'c)))" },
            { n: 7, paso: "Verificar cuantías", desc: "ρmín ≤ ρ ≤ ρmáx (para εt ≥ 0,005)" },
            { n: 8, paso: "Calcular As = ρ·b·d", desc: "Área de acero necesaria" },
            { n: 9, paso: "Seleccionar barras", desc: "Combinación de diámetros que dé As requerido. Verificar separación mínima." },
            { n: 10, paso: "Verificar φ real", desc: "Calcular εt con la profundidad final de a y c" },
            { n: 11, paso: "Verificar φMn ≥ Mu", desc: "Con la sección y el acero final seleccionado" },
          ].map(({ n, paso, desc }) => (
            <div key={n} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-accent-amber/15 text-accent-amber text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
              <div>
                <span className="text-xs font-semibold text-text-primary">{paso}: </span>
                <span className="text-xs text-text-muted">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-text-secondary mb-2">Análisis (dada la sección con As, encontrar φMn)</h3>
        <div className="space-y-1.5">
          {[
            { n: 1, paso: "Asumir que el acero fluye", desc: "fs = fy (verificar al final)" },
            { n: 2, paso: "Calcular a = As·fy / (0,85·f'c·b)", desc: "" },
            { n: 3, paso: "Calcular c = a / β", desc: "" },
            { n: 4, paso: "Calcular εs = 0,003·(d−c)/c", desc: "Deformación real del acero" },
            { n: 5, paso: "Verificar fluencia", desc: "εs ≥ εy ✅ continuar / εs < εy ❌ resolver ecuación cuadrática" },
            { n: 6, paso: "Calcular φ según εt", desc: "εt ≥ 0,005 → φ=0,90 / zona de transición → interpolación" },
            { n: 7, paso: "Calcular Mn = As·fy·(d − a/2)", desc: "" },
            { n: 8, paso: "Calcular φMn", desc: "Resultado final de la capacidad de diseño" },
          ].map(({ n, paso, desc }) => (
            <div key={n} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-accent-blue/15 text-accent-blue text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
              <div>
                <span className="text-xs font-semibold text-text-primary">{paso}</span>
                {desc && <span className="text-xs text-text-muted ml-1">— {desc}</span>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* P7 — Resumen de fórmulas */}
      <Card>
        <SectionTitle n="P7">Resumen de Fórmulas Clave</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-border">
                {["Concepto", "Fórmula"].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-bg-border text-xs">
              {[
                ["Bloque Whitney", "a = β·c"],
                ["β (f'c ≤ 280 kgf/cm²)", "β = 0,85"],
                ["β (f'c > 280 kgf/cm²)", "β = 1,05 − 0,0007·f'c, con 0,65 ≤ β ≤ 0,85"],
                ["Equilibrio (acero fluye)", "0,85·f'c·a·b = As·fy"],
                ["Profundidad del bloque", "a = As·fy / (0,85·f'c·b)"],
                ["Momento nominal", "Mn = As·fy·(d − a/2)"],
                ["Cuantía", "ρ = As / (b·d)"],
                ["Mn en función de ρ", "Mn = ρ·b·d²·fy·(1 − 0,59·ρ·fy/f'c)"],
                ["ρ de diseño", "ρ = 0,85·f'c/fy · (1 − √(1 − 2Rn/(0,85·f'c)))"],
                ["Cuantía balanceada", "ρb = 0,85·β·f'c/fy · 6300/(6300+fy) [kgf/cm²]"],
                ["ρmáx (εt ≥ 0,004)", "ρmáx ≈ 0,36·β·f'c/fy"],
                ["ρmáx (εt ≥ 0,005, φ=0,90)", "ρmáx ≈ 0,32·β·f'c/fy"],
                ["ρmín", "0,8·√f'c/fy ≥ 14/fy [kgf/cm²]"],
                ["Deform. acero (por geometría)", "εs = 0,003·(d−c)/c"],
                ["Deform. acero compresión", "ε's = 0,003·(c−d')/c"],
                ["Deformación εcu", "0,003 (criterio ACI)"],
                ["Condición de diseño", "φ·Mn ≥ Mu"],
              ].map(([concepto, formula]) => (
                <tr key={concepto as string} className="hover:bg-bg-elevated/50">
                  <td className="px-3 py-2 text-text-primary font-medium">{concepto}</td>
                  <td className="px-3 py-2 font-mono text-accent-blue">{formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function VigasFlexionPage() {
  const [tab, setTab] = useState<Tab>("fundamentos");

  const tabs = [
    { id: "fundamentos" as Tab, label: "Fundamentos & Whitney" },
    { id: "fallas" as Tab, label: "Tipos de Falla & Cuantías" },
    { id: "practica" as Tab, label: "Diseño Práctico" },
  ];

  return (
    <div className="min-h-screen bg-bg-base px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted mb-5">
        <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
        <span>/</span>
        <span className="text-text-secondary">Vigas en Flexión</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-accent-amber/15 flex items-center justify-center">
          <Ruler className="w-5 h-5 text-accent-amber" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Vigas en Flexión</h1>
          <p className="text-sm text-text-muted">Supuestos · Bloque de Whitney · Tipos de falla · Cuantías · Sección T · Cap. 04 · Ing. M. Colque · ULS 2026</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-bg-elevated border border-bg-border rounded-xl mb-6 w-fit">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              tab === id
                ? "bg-accent-amber text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "fundamentos" && <TabFundamentos />}
      {tab === "fallas" && <TabFallas />}
      {tab === "practica" && <TabPractica />}
    </div>
  );
}
