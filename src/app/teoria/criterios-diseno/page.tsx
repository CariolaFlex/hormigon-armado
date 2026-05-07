import Link from "next/link";
import { Scale, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

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
    info: { bg: "bg-accent-blue/10 border-accent-blue/20 text-accent-blue", Icon: Info },
    warn: { bg: "bg-accent-amber/10 border-accent-amber/20 text-accent-amber", Icon: AlertTriangle },
    ok:   { bg: "bg-accent-green/10 border-accent-green/20 text-accent-green", Icon: CheckCircle2 },
  }[type];
  return (
    <div className={`rounded-lg p-3 border flex items-start gap-2 my-3 ${styles.bg}`}>
      <styles.Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
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
      <span className="w-6 h-6 rounded bg-accent-green/15 text-accent-green text-xs flex items-center justify-center font-bold flex-shrink-0">{n}</span>
      {children}
    </h2>
  );
}

export default function CriterioDisenoPage() {
  return (
    <div className="min-h-screen bg-bg-base px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-muted mb-5">
        <Link href="/" className="hover:text-text-secondary">Dashboard</Link>
        <span>/</span>
        <span className="text-text-secondary">Criterios de Diseño y Normas</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-accent-green/15 flex items-center justify-center">
          <Scale className="w-5 h-5 text-accent-green" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Criterios de Diseño y Normas</h1>
          <p className="text-sm text-text-muted">ASD · LRFD · Normativa chilena · Combinaciones de carga · Cap. 03 · Ing. M. Colque · ULS 2026</p>
        </div>
      </div>

      <div className="space-y-6">

        {/* 1 — Factor de seguridad */}
        <Card>
          <SectionTitle n="1">Factor de Seguridad — Concepto Probabilístico</SectionTitle>
          <p className="text-sm text-text-secondary mb-2">
            El <strong className="text-text-primary">factor de seguridad (FS)</strong> es la relación entre la capacidad
            del elemento (resistencia) y la demanda que se le impone (solicitación):
          </p>
          <Formula>FS = Capacidad (Resistencia) / Demanda (Solicitación)</Formula>
          <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border mb-3">
            <div className="text-xs font-semibold text-text-primary mb-1">Ejemplo</div>
            <div className="text-xs text-text-secondary">Resistencia del cable: 5 tf / Demanda: 3 tf → FS = 5/3 = <strong className="text-accent-blue">1,7</strong></div>
            <div className="text-xs text-text-muted mt-0.5">Interpretación: el cable resiste 1,7 veces más de lo que se le exige. Margen del 70% antes de la falla.</div>
          </div>
          <h3 className="text-sm font-semibold text-text-secondary mb-2">El problema probabilístico</h3>
          <p className="text-xs text-text-secondary mb-2">
            Tanto la resistencia como la demanda son <strong className="text-text-primary">variables aleatorias</strong> descritas por funciones de distribución de probabilidad.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="text-xs font-semibold text-text-primary mb-1">Resistencia varía porque:</div>
              <ul className="text-xs text-text-secondary space-y-0.5">
                <li>• El hormigón no tiene exactamente la misma resistencia en toda la estructura</li>
                <li>• Las dimensiones reales difieren de las nominales</li>
                <li>• El acero tiene tolerancias de fabricación</li>
              </ul>
            </div>
            <div className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
              <div className="text-xs font-semibold text-text-primary mb-1">La demanda varía porque:</div>
              <ul className="text-xs text-text-secondary space-y-0.5">
                <li>• Las cargas reales (personas, viento, sismo) son impredecibles en su magnitud exacta</li>
                <li>• El solapamiento entre distribuciones = probabilidad de falla</li>
              </ul>
            </div>
          </div>
          <Note type="info">
            El FS no es arbitrario: garantiza que la zona de solapamiento entre las distribuciones de resistencia
            y demanda sea suficientemente pequeña. A mayor incertidumbre, mayor debe ser el FS.
            Por eso el hormigón (más variable) tiene FS mayor que el acero (más controlado) en el método ASD.
          </Note>
        </Card>

        {/* 2 — ASD */}
        <Card>
          <SectionTitle n="2">Diseño por Tensiones Admisibles (ASD)</SectionTitle>
          <p className="text-sm text-text-secondary mb-2">
            <strong className="text-text-primary">Principio:</strong> las tensiones bajo cargas de trabajo NO deben superar
            tensiones admisibles que garanticen que la estructura permanezca en el rango <strong className="text-text-primary">elástico</strong>.
          </p>
          <Formula>S* ≤ R* / FS</Formula>
          <p className="text-xs text-text-muted mb-3">S* = solicitación bajo cargas de servicio · R* = resistencia del material · FS = factor de seguridad</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {[
              { mat: "Acero", fs: "FS = 1,8", color: "accent-blue" },
              { mat: "Hormigón", fs: "FS = 3,0", color: "accent-amber" },
            ].map(({ mat, fs, color }) => (
              <div key={mat} className="bg-bg-elevated rounded-lg p-3 border border-bg-border text-center">
                <div className="text-xs text-text-muted mb-1">{mat}</div>
                <div className={`text-lg font-mono font-bold text-${color}`}>{fs}</div>
                <div className="text-[10px] text-text-muted mt-1">{mat === "Hormigón" ? "Mayor variabilidad" : "Material controlado"}</div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-text-secondary mb-1">Hipótesis base del ASD</h3>
          <ul className="text-xs text-text-secondary space-y-1">
            <li>• Las tensiones son proporcionales a las deformaciones (Ley de Hooke — comportamiento elástico lineal)</li>
            <li>• Las tensiones de servicio no sobrepasan las tensiones admisibles (fracción de la resistencia última)</li>
          </ul>

          <Note type="warn">
            Limitaciones del ASD: (1) No puede predecir la resistencia última real del hormigón armado (no lineal cerca de la falla).
            (2) Un único FS no refleja la diferente incertidumbre de distintas cargas.
            (3) No permite estimar la ductilidad de la estructura. Por esto fue reemplazado por el LRFD.
          </Note>
        </Card>

        {/* 3 — LRFD */}
        <Card>
          <SectionTitle n="3">Diseño por Factores de Carga y Resistencia (LRFD) ⭐</SectionTitle>
          <p className="text-sm text-text-secondary mb-2">
            También llamado <strong className="text-text-primary">Diseño por Resistencia Última</strong>. El diseño se hace
            en términos de resistencia última: la sección alcanza su capacidad máxima (hormigón en f'c, acero en fy)
            bajo <strong className="text-text-primary">cargas amplificadas</strong>.
          </p>
          <Formula>Su = Σ αᵢ · Sᵢ  ≤  Ru = φ · Rn</Formula>

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
                  ["Su", "Solicitación última", "Carga de servicio amplificada por factores αᵢ"],
                  ["αᵢ", "Factor de amplificación de carga", "Amplifica cada tipo de carga según su incertidumbre"],
                  ["Sᵢ", "Efecto de cada carga", "Momento, corte, axial producido por cada carga"],
                  ["Ru", "Resistencia última de diseño", "Resistencia nominal reducida por φ"],
                  ["φ", "Factor de reducción de resistencia", "Reduce Rn según el tipo de falla e incertidumbre"],
                  ["Rn", "Resistencia nominal", "Resistencia calculada con las fórmulas del código"],
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

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <h3 className="text-xs font-semibold text-accent-amber mb-2">Factores de amplificación αᵢ</h3>
              <p className="text-xs text-text-secondary mb-2">Amplifican las cargas según su incertidumbre:</p>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Carga muerta D: α ≈ <strong className="text-text-primary">1,2</strong> (muy predecible)</li>
                <li>• Carga viva L: α ≈ <strong className="text-text-primary">1,6</strong> (menos predecible)</li>
                <li>• Sismo/Viento E,W: factores específicos por norma</li>
              </ul>
            </div>
            <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <h3 className="text-xs font-semibold text-accent-blue mb-2">Factor de reducción φ</h3>
              <p className="text-xs text-text-secondary mb-2">Reduce la resistencia nominal. Menor φ = falla más peligrosa:</p>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Flexión (dúctil): φ = <strong className="text-accent-blue">0,90</strong></li>
                <li>• Corte/Torsión: φ = <strong className="text-accent-blue">0,75</strong></li>
                <li>• Compresión espirales: φ = <strong className="text-accent-blue">0,75</strong></li>
                <li>• Compresión estribos: φ = <strong className="text-accent-blue">0,65</strong></li>
              </ul>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-text-secondary mb-2">¿Por qué el LRFD es superior al ASD?</h3>
          <div className="space-y-2">
            {[
              { n: 1, texto: "La teoría elástica no puede predecir la resistencia última del hormigón armado. El hormigón no es lineal cerca de la falla." },
              { n: 2, texto: "Los factores de amplificación se asignan de manera más racional: cada tipo de carga tiene su propio factor según su nivel de incertidumbre." },
              { n: 3, texto: "La curva σ-ε del hormigón es no lineal. El LRFD incorpora este comportamiento real (bloque de Whitney, εu = 0,003) que el ASD ignora." },
              { n: 4, texto: "El LRFD permite estimar la ductilidad en el rango postelástico y controlar el modo de falla." },
            ].map(({ n, texto }) => (
              <div key={n} className="flex items-start gap-2.5 bg-bg-elevated rounded-lg p-3 border border-bg-border">
                <span className="w-5 h-5 rounded-full bg-accent-green/15 text-accent-green text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <p className="text-xs text-text-secondary">{texto}</p>
              </div>
            ))}
          </div>
          <Note type="ok">
            En LRFD todo se calcula con cargas <strong>amplificadas</strong> (Mu, Vu, Nu) y se compara con
            resistencias <strong>reducidas</strong> (φMn, φVn, φNn). Condición de diseño: φ·Rn ≥ Su.
          </Note>
        </Card>

        {/* 4 — Factores φ detallados */}
        <Card>
          <SectionTitle n="4">Factores de Reducción de Resistencia φ (ACI 318)</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["Tipo de solicitación", "φ", "Tipo de falla"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {[
                  ["Flexión — sección controlada por tracción (εt ≥ 0,005)", "0,90", "Dúctil ✅"],
                  ["Flexión — zona de transición (0,004 ≤ εt < 0,005)", "0,65 → 0,90 (interpolación lineal)", "Intermedia"],
                  ["Corte y torsión", "0,75", "Moderadamente peligrosa"],
                  ["Compresión con espirales", "0,75", "Frágil en columnas"],
                  ["Compresión con estribos", "0,65", "Frágil — catastrófico para la estructura"],
                  ["Aplastamiento del hormigón", "0,65", "Frágil"],
                  ["Tracción en anclas (post-instalación)", "0,45 – 0,75", "Depende del tipo"],
                ].map(([tipo, phi, falla]) => (
                  <tr key={tipo as string} className="hover:bg-bg-elevated/50">
                    <td className="px-3 py-2 text-text-secondary text-xs">{tipo}</td>
                    <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{phi}</td>
                    <td className="px-3 py-2 text-text-muted text-xs">{falla}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Note type="info">
            El factor φ más importante del ramo: <strong>φ = 0,90 para flexión</strong>. Toda la resistencia a flexión
            de vigas se verifica como φMn ≥ Mu. Los factores menores reflejan fallas más peligrosas e impredecibles.
          </Note>
        </Card>

        {/* 5 — Marco normativo */}
        <Card>
          <SectionTitle n="5">Marco Normativo — Jerarquía de Fuentes</SectionTitle>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { titulo: "Estado del arte", desc: "Lo publicado, difundido y validado por la comunidad científica — conocimiento más avanzado disponible." },
              { titulo: "Estado de la práctica", desc: "Lo que se usa efectivamente del estado del arte en la práctica de ingeniería — subconjunto validado." },
              { titulo: "Normas y códigos", desc: "Publicaciones de organismos reguladores con reglas básicas de diseño. Obligatorias cuando son citadas en reglamentación." },
            ].map(({ titulo, desc }) => (
              <div key={titulo} className="bg-bg-elevated rounded-lg p-3 border border-bg-border">
                <div className="text-xs font-semibold text-text-primary mb-1">{titulo}</div>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-text-secondary mb-2">Carácter voluntario vs. obligatorio en Chile</h3>
          <p className="text-xs text-text-secondary mb-3">
            Todas las normas chilenas INN son de carácter <strong className="text-text-primary">voluntario</strong> en origen.
            Se transforman en <strong className="text-text-primary">obligatorias</strong> cuando son citadas en alguna reglamentación
            (resolución, decreto o ley).
          </p>

          <h3 className="text-sm font-semibold text-text-secondary mb-2">Jerarquía cuando no existe norma nacional</h3>
          <div className="space-y-1">
            {[
              { n: 1, ref: "Códigos estadounidenses (ACI, AISC, ASCE, ASTM)", color: "accent-blue" },
              { n: 2, ref: "Códigos europeos (Eurocódigos EC2, EC3…)", color: "accent-blue" },
              { n: 3, ref: "Códigos de otros países con sistemas similares", color: "accent-blue" },
              { n: 4, ref: "Documentos de institutos de investigación (ICH, ICHA, ACHISINA, AICE)", color: "accent-amber" },
              { n: 5, ref: "Libros especializados de autores reconocidos", color: "accent-amber" },
              { n: 6, ref: "Artículos en revistas científicas especializadas (con revisión de pares)", color: "accent-green" },
              { n: 7, ref: "Experiencia personal del proyectista — válida pero debe documentarse", color: "text-muted" },
              { n: 8, ref: "Artículos de congresos — con mucho cuidado (menor nivel de revisión)", color: "text-muted" },
              { n: 9, ref: "❌ JAMÁS usar información de procedencia o veracidad dudosa", color: "text-red-400" },
            ].map(({ n, ref, color }) => (
              <div key={n} className="flex items-start gap-2.5 text-xs">
                <span className="w-4 h-4 rounded bg-bg-elevated border border-bg-border text-text-muted text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <span className={color === "text-red-400" ? "text-red-400 font-semibold" : color === "text-muted" ? "text-text-muted" : `text-${color} text-text-secondary`}>{ref}</span>
              </div>
            ))}
          </div>
          <Note type="warn">
            Si se usa una norma extranjera, deben usarse TODOS los factores de ese mismo código de manera consistente.
            No se pueden mezclar cargas de NCh con resistencias de ACI sin verificar compatibilidad.
          </Note>
        </Card>

        {/* 6 — Normas de cargas */}
        <Card>
          <SectionTitle n="6">Normativa Nacional Vigente en Chile — Cargas</SectionTitle>

          <div className="space-y-4">
            {/* NCh1537 */}
            <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <h3 className="text-sm font-semibold text-accent-blue mb-2">NCh1537.Of2009 — Cargas permanentes y cargas de uso</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-bg-base rounded-lg p-2.5 border border-bg-border">
                  <div className="text-xs font-semibold text-text-primary mb-1">Área tributaria</div>
                  <p className="text-xs text-text-secondary">Área de planta total que, multiplicada por la carga uniformemente distribuida, define la carga sobre el elemento. Se determina trazando perpendiculares a mitad de vanos.</p>
                </div>
                <div className="bg-bg-base rounded-lg p-2.5 border border-bg-border">
                  <div className="text-xs font-semibold text-text-primary mb-1">Área de influencia</div>
                  <p className="text-xs text-text-secondary">Área total desde la cual el elemento recibe cargas. Para viga interior ≈ doble del área tributaria.</p>
                </div>
              </div>
              <h4 className="text-xs font-semibold text-text-primary mb-1">Reducción de sobrecargas de uso</h4>
              <p className="text-xs text-text-secondary mb-2">Cuando el área de influencia es grande, la probabilidad de que toda el área esté al máximo cargada disminuye. Condiciones para aplicar:</p>
              <ul className="text-xs text-text-secondary space-y-0.5 mb-2">
                <li>• Área de influencia &gt; 36 m²</li>
                <li>• Sobrecarga de uso &lt; 500 kgf/m²</li>
                <li>• No debe ser carga de estacionamiento ni lugares públicos</li>
              </ul>
              <div className="bg-bg-base rounded px-3 py-2 font-mono text-xs text-center border border-bg-border mb-2">
                <span className="text-accent-blue">L = L₀ · (0,25 + 4,57 / √(KLL · AT))</span>
              </div>
              <div className="text-xs text-text-muted">L no debe ser menor que: 0,5·L₀ (estructuras de un piso) · 0,4·L₀ (más de un piso)</div>
            </div>

            {/* NCh432 */}
            <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <h3 className="text-sm font-semibold text-accent-blue mb-2">NCh432.Of2025 — Cargas de viento</h3>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Acción <strong className="text-text-primary">perpendicular</strong> a la superficie sobre la cual actúa</li>
                <li>• Puede ser <strong className="text-text-primary">presión</strong> (signo positivo, hacia adentro) o <strong className="text-text-primary">succión</strong> (signo negativo, hacia afuera)</li>
                <li>• La presión depende de: altura de la construcción y ubicación geográfica</li>
              </ul>
            </div>

            {/* NCh431 */}
            <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <h3 className="text-sm font-semibold text-accent-blue mb-2">NCh431.Of2010 — Cargas de nieve</h3>
              <p className="text-xs text-text-secondary">Carga de nieve según zona geográfica de Chile. Relevante para regiones del sur y zonas cordilleranas. Depende de altitud, inclinación de cubierta y zona de nieve.</p>
            </div>

            {/* NCh433 */}
            <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border">
              <h3 className="text-sm font-semibold text-accent-blue mb-2">NCh433.Of1996 Mod 2009 — Diseño sísmico de edificios</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-semibold text-text-primary mb-1">Métodos reconocidos</div>
                  <ul className="text-xs text-text-secondary space-y-1">
                    <li>• <strong>Estático equivalente:</strong> fuerza horizontal estática proporcional al peso. Para estructuras regulares y bajas.</li>
                    <li>• <strong>Análisis modal espectral:</strong> respuesta dinámica con múltiples modos. Para estructuras altas, irregulares o de mayor importancia.</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-primary mb-1">Carácter</div>
                  <p className="text-xs text-text-secondary">Norma prescriptiva: establece procedimientos de análisis obligatorios. Proporciona rigidez y resistencia mínima, no un nivel de desempeño específico.</p>
                  <div className="text-xs text-text-muted mt-1">★ DS61-2011 modifica NCh433 en aspectos relevantes — consultar en conjunto.</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 7 — Normas de diseño */}
        <Card>
          <SectionTitle n="7">Normativa Nacional — Diseño por Material</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["Norma", "Material / Alcance"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {[
                  ["NCh430:2008 ⭐", "Hormigón armado — norma principal del ramo (basada en ACI 318)"],
                  ["NCh427/1-2016", "Estructuras de acero (edificios)"],
                  ["NCh427/2", "Acero conformado en frío"],
                  ["NCh2123.Of1997 Mod 2003", "Albañilería confinada"],
                  ["NCh1928.Of1993 Mod 2009", "Albañilería armada"],
                  ["NCh1198-2024", "Madera — construcciones"],
                ].map(([norma, alcance]) => (
                  <tr key={norma as string} className="hover:bg-bg-elevated/50">
                    <td className="px-3 py-2 font-mono font-semibold text-accent-blue text-xs">{norma}</td>
                    <td className="px-3 py-2 text-text-secondary text-xs">{alcance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Códigos internacionales de referencia</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["Código", "Organismo", "Alcance"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {[
                  ["ACI 318 ⭐", "ACI", "Hormigón armado — referencia principal del ramo"],
                  ["ASCE 7/SEI", "ASCE", "Cargas mínimas de diseño"],
                  ["ANSI/AISC 360", "AISC", "Estructuras de acero"],
                  ["ANSI/AISC 341", "AISC", "Disposiciones sísmicas para acero"],
                  ["AASHTO LRFD", "AASHTO", "Puentes"],
                ].map(([code, org, alc]) => (
                  <tr key={code as string} className="hover:bg-bg-elevated/50">
                    <td className="px-3 py-2 font-mono font-semibold text-accent-blue text-xs">{code}</td>
                    <td className="px-3 py-2 font-semibold text-text-primary text-xs">{org}</td>
                    <td className="px-3 py-2 text-text-secondary text-xs">{alc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 8 — Combinaciones LRFD */}
        <Card>
          <SectionTitle n="8">Combinaciones de Carga — NCh3171.Of2017</SectionTitle>
          <p className="text-sm text-text-secondary mb-4">
            Norma fundamental que integra todas las cargas para el diseño. Define cómo combinarlas en el método LRFD y ASD.
          </p>

          <h3 className="text-sm font-semibold text-text-secondary mb-2">Combinaciones LRFD (cargas amplificadas)</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["#", "Expresión", "Uso típico"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {[
                  ["1", "1,4D", "Solo carga muerta — errores de estimación"],
                  ["2 ⭐", "1,2D + 1,6L + 0,5(Lr o S o R)", "Crítica para edificios con carga viva alta"],
                  ["3", "1,2D + 1,6(Lr o S o R) + (1,0L o 0,5W)", "Predomina carga de cubierta"],
                  ["4", "1,2D + 1,0W + 1,0L + 0,5(Lr o S o R)", "Con viento relevante"],
                  ["5", "0,9D + 1,0W", "Volteo por viento — D reduce, no aumenta"],
                  ["6", "1,2D + 1,0E + 1,0L + 0,2S", "Combinación sísmica principal"],
                  ["7", "0,9D + 1,0E", "Volteo sísmico — D reduce, no aumenta"],
                ].map(([n, expr, uso]) => (
                  <tr key={n as string} className={`hover:bg-bg-elevated/50 ${n === "2 ⭐" ? "bg-accent-blue/5" : ""}`}>
                    <td className="px-3 py-2 font-mono font-bold text-accent-blue text-xs">{n}</td>
                    <td className="px-3 py-2 font-mono text-text-primary text-xs">{expr}</td>
                    <td className="px-3 py-2 text-text-muted text-xs">{uso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-text-secondary mb-2">Combinaciones ASD (cargas de servicio, sin amplificar)</h3>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bg-border">
                  {["#", "Cargas"].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bg-border">
                {[
                  ["1", "D"],
                  ["2", "D + L"],
                  ["3", "D + Lr (o S o R)"],
                  ["4", "D + 0,75L + 0,75Lr (o S o R)"],
                  ["5", "D + (W o 0,7E)"],
                  ["6", "D + 0,75L + 0,75(W o 0,7E) + 0,75Lr (o S o R)"],
                  ["7", "0,6D + W"],
                  ["8", "0,6D + 0,7E"],
                ].map(([n, cargas]) => (
                  <tr key={n as string} className="hover:bg-bg-elevated/50">
                    <td className="px-3 py-2 font-mono font-bold text-text-muted text-xs">{n}</td>
                    <td className="px-3 py-2 font-mono text-text-secondary text-xs">{cargas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-sm font-semibold text-text-secondary mb-2">Nomenclatura de cargas</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              ["D", "Carga muerta (permanente)"],
              ["L", "Carga viva (uso)"],
              ["Lr", "Carga viva de cubierta"],
              ["S", "Carga de nieve"],
              ["R", "Carga de lluvia"],
              ["W", "Carga de viento"],
              ["E", "Carga sísmica"],
              ["KLL", "Factor según tipo de elemento"],
            ].map(([sym, desc]) => (
              <div key={sym as string} className="bg-bg-elevated rounded-lg p-2 border border-bg-border">
                <div className="text-xs font-mono font-bold text-accent-blue">{sym}</div>
                <div className="text-[10px] text-text-muted mt-0.5">{desc}</div>
              </div>
            ))}
          </div>

          <Note type="info">
            Para diseño de vigas de hormigón armado, la combinación crítica habitualmente es la
            <strong> Comb. 2: 1,2D + 1,6L</strong>, que genera el momento último Mu que debe ser resistido por φMn.
            Las combinaciones 5 y 7 (con factor 0,9D) cubren el caso en que la carga muerta ayuda a la estabilidad
            contra volteo — reducirla es más desfavorable.
          </Note>
        </Card>

        {/* 9 — Proceso LRFD */}
        <Card>
          <SectionTitle n="9">Proceso Completo de Diseño LRFD (ACI 318)</SectionTitle>
          <div className="space-y-2">
            {[
              { n: 1, titulo: "Definir cargas de servicio", desc: "D, L, W, E, S, etc. — valores nominales sin amplificar" },
              { n: 2, titulo: "Amplificar con factores de carga (NCh3171 / ACI)", desc: "Mu, Vu, Nu = tomar la combinación LRFD más desfavorable" },
              { n: 3, titulo: "Dimensionar sección y refuerzo", desc: "Se trabaja con la resistencia ÚLTIMA (bloque de Whitney, modelo EPP). Garantizar: φ·Rn ≥ Su" },
              { n: 4, titulo: "Verificar requisitos mínimos y de ductilidad", desc: "Cuantías mínima y máxima, separación de barras, recubrimientos" },
              { n: 5, titulo: "Verificar estados de servicio (si aplica)", desc: "Deflexiones, fisuración, vibración — se calculan con cargas SIN amplificar" },
            ].map(({ n, titulo, desc }) => (
              <div key={n} className="flex items-start gap-3 bg-bg-elevated rounded-lg p-3 border border-bg-border">
                <span className="w-6 h-6 rounded-full bg-accent-green/15 text-accent-green text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{n}</span>
                <div>
                  <div className="text-xs font-semibold text-text-primary mb-0.5">{titulo}</div>
                  <p className="text-xs text-text-secondary">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-text-secondary mb-2 mt-4">Relación entre normas del ramo</h3>
          <div className="bg-bg-elevated rounded-lg p-4 border border-bg-border font-mono text-xs">
            <div className="text-accent-amber">NCh3171:2017  →  Combinaciones de carga (Mu, Vu, Nu)</div>
            <div className="text-text-muted ml-4 my-0.5">↓</div>
            <div className="text-accent-blue">NCh430:2008   →  Requisitos de diseño HA (basada en ACI 318)</div>
            <div className="text-text-muted ml-4 my-0.5">↑</div>
            <div className="text-accent-green">ACI 318       →  Referencia internacional principal</div>
            <div className="text-text-muted ml-4 my-0.5">↑</div>
            <div className="text-text-secondary">NCh170:2016   →  Propiedades del hormigón (f'c = GXX)</div>
            <div className="text-text-secondary">NCh204:2020   →  Propiedades del acero (A440, A630…)</div>
          </div>
        </Card>

      </div>
    </div>
  );
}
