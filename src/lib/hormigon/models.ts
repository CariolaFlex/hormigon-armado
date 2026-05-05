/**
 * HORMIGÓN ARMADO — MODELOS CONSTITUTIVOS
 * Capítulo 1: Comportamiento Mecánico del Hormigón
 *
 * Referencias:
 *   - Hognestad, E. (1951). A Study on Combined Bending and Axial Load in RC Members.
 *     Univ. of Illinois Bulletin No. 399.
 *   - Todeschini, C.E., Bianchini, A.C., Kesler, C.E. (1964). Behavior of concrete columns
 *     reinforced with high strength steels. ACI Journal, 61(6), 701–716.
 *   - ACI 318-19: Building Code Requirements for Structural Concrete.
 *   - EN 1992-1-1:2004 (Eurocode 2): Design of Concrete Structures.
 *   - NCh170:2016 — Hormigón — Requisitos generales. INN Chile.
 */

// ─── TIPOS BASE ──────────────────────────────────────────────────────────────

export type UnitSystem = "MPa" | "kgf/cm2";

export interface ModelPoint {
  strain: number; // ε (mm/mm, adimensional)
  stress: number; // σ (MPa o kgf/cm², según unidades activas)
}

export interface HognestadResult {
  points: ModelPoint[];
  fc_pp: number;   // f''c = 0.9·f'c
  Ec: number;      // Módulo de elasticidad (MPa)
  e0: number;      // ε₀ = deformación en tensión máxima
  fc: number;      // f'c input
  label: string;
}

export interface TodeschiniResult {
  points: ModelPoint[];
  fc_pp: number;
  Ec: number;
  e0: number;
  eu: number;      // εu = 0.003
  fc: number;
  label: string;
}

export interface ParabolaRectResult {
  points: ModelPoint[];
  fcd: number;     // fcd = fck / γc
  fck: number;
  gamma_c: number;
  ec2: number;     // ε_c2 = 0.002
  ecu2: number;    // ε_cu2 = 0.0035
  label: string;
}

export interface EcResult {
  Ec_simplified: number;  // Ec = 4700√f'c (MPa)
  Ec_general: number;     // Ec = 0.043·wc^1.5·√f'c (MPa)
  Ec_kgf: number;         // Ec = 15100√f'c (kgf/cm²)
  fc: number;
  wc: number;
}

// ─── CONSTANTES ──────────────────────────────────────────────────────────────

export const HORMIGON_CONSTANTS = {
  WC_NORMAL: 2300,          // kg/m³ — densidad hormigón normal
  WC_LIVIANO: 1850,         // kg/m³ — densidad hormigón liviano
  WC_PESADO: 2550,          // kg/m³ — densidad hormigón pesado
  GAMMA_C_DEFAULT: 1.5,     // Factor de minoración resistencia (Eurocódigo)
  EC2: 0.002,               // ε_c2 — deformación en pico (EN1992)
  ECU2: 0.0035,             // ε_cu2 — deformación última (EN1992)
  EU_TODESCHINI: 0.003,     // εu — deformación última Todeschini
  N_PARABOLA: 2,            // Exponente de la parábola EN1992
  ALPHA_CC: 1.0,            // Factor αcc (efectos de larga duración). EN1992 §3.1.6
  MPa_TO_KGF: 10.1972,      // 1 MPa = 10.1972 kgf/cm²
} as const;

// ─── CLASIFICACIÓN NCh170:2016 ────────────────────────────────────────────────

export const NCH170_GRADES = [
  { grade: "G10", fc_kgf: 100, fc_mpa: 9.8,  use: "Rellenos, hormigón de limpieza" },
  { grade: "G15", fc_kgf: 150, fc_mpa: 14.7, use: "Elementos no estructurales" },
  { grade: "G20", fc_kgf: 200, fc_mpa: 19.6, use: "Losas y muros simples" },
  { grade: "G25", fc_kgf: 250, fc_mpa: 24.5, use: "Vigas y columnas estándar" },
  { grade: "G30", fc_kgf: 300, fc_mpa: 29.4, use: "Estructuras importantes" },
  { grade: "G35", fc_kgf: 350, fc_mpa: 34.3, use: "Puentes, alto desempeño" },
  { grade: "G40", fc_kgf: 400, fc_mpa: 39.2, use: "Alta resistencia" },
  { grade: "G45", fc_kgf: 450, fc_mpa: 44.1, use: "Estructuras especiales" },
  { grade: "G50", fc_kgf: 500, fc_mpa: 49.0, use: "Muy alta resistencia" },
];

// ─── FUNCIONES DE CONVERSIÓN ─────────────────────────────────────────────────

export function toMPa(value: number, from: UnitSystem): number {
  if (from === "MPa") return value;
  return value / HORMIGON_CONSTANTS.MPa_TO_KGF;
}

export function fromMPa(value: number, to: UnitSystem): number {
  if (to === "MPa") return value;
  return value * HORMIGON_CONSTANTS.MPa_TO_KGF;
}

export function convertStress(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === "MPa" ? value * HORMIGON_CONSTANTS.MPa_TO_KGF : value / HORMIGON_CONSTANTS.MPa_TO_KGF;
}

// ─── MÓDULO DE ELASTICIDAD ───────────────────────────────────────────────────

/**
 * Módulo de Elasticidad del Hormigón — ACI 318-19 §19.2.2
 *
 * Fórmula general:   Ec = 0.043·wc^1.5·√f'c     [MPa]
 * Fórmula simplif.:  Ec = 4700·√f'c              [MPa]  (wc ≈ 2300 kg/m³)
 * Fórmula kgf/cm²:   Ec = 15100·√f'c             [kgf/cm²]
 *
 * Nota: Para f'c > 40 MPa, la fórmula simplificada sobreestima Ec.
 */
export function calcEc(fc_mpa: number, wc: number = HORMIGON_CONSTANTS.WC_NORMAL): EcResult {
  const sqrtFc = Math.sqrt(fc_mpa);
  return {
    Ec_simplified: 4700 * sqrtFc,
    Ec_general: 0.043 * Math.pow(wc, 1.5) * sqrtFc,
    Ec_kgf: 15100 * Math.sqrt(fc_mpa * HORMIGON_CONSTANTS.MPa_TO_KGF),
    fc: fc_mpa,
    wc,
  };
}

// ─── MODELO HOGNESTAD MODIFICADO (1951) ──────────────────────────────────────

/**
 * Modelo Hognestad Modificado (ACI)
 *
 * Parámetros:
 *   f''c = 0.9·f'c                     → resistencia efectiva en estructura
 *   Ec   = 4700·√f'c  [MPa]            → módulo de elasticidad
 *   ε₀   = 1.8·f''c / Ec               → deformación en tensión máxima
 *
 * Curva (rama ascendente, parábola de 2° grado):
 *   fc(εc) = f''c · [2(εc/ε₀) − (εc/ε₀)²]     para 0 ≤ εc ≤ ε₀
 *
 * Válido para: f'c ≤ 40 MPa
 */
export function hognestadModel(
  fc_mpa: number,
  wc: number = HORMIGON_CONSTANTS.WC_NORMAL,
  nPoints: number = 200
): HognestadResult {
  const fc_pp = 0.9 * fc_mpa;
  const Ec = calcEc(fc_mpa, wc).Ec_simplified;
  const e0 = (1.8 * fc_pp) / Ec;

  const points: ModelPoint[] = [];
  // Rama ascendente: 0 → ε₀
  for (let i = 0; i <= nPoints; i++) {
    const strain = (i / nPoints) * e0;
    const r = strain / e0;
    const stress = fc_pp * (2 * r - r * r);
    points.push({ strain, stress });
  }
  // Pequeña extensión post-pico para mostrar inicio de rama descendente (5% más)
  const extension = e0 * 1.05;
  const r_ext = extension / e0;
  points.push({ strain: extension, stress: fc_pp * (2 * r_ext - r_ext * r_ext) });

  return { points, fc_pp, Ec, e0, fc: fc_mpa, label: "Hognestad Modificado" };
}

// ─── MODELO TODESCHINI (1964) ────────────────────────────────────────────────

/**
 * Modelo Todeschini, Bianchini & Kesler (1964) — ACI Journal
 *
 * Parámetros:
 *   f''c = 0.9·f'c                     → resistencia efectiva
 *   Ec   = 4700·√f'c  [MPa]
 *   ε₀   = 1.71·f''c / Ec              → deformación en pico
 *   εu   = 0.003                        → deformación última
 *   x    = εc / ε₀                      → deformación normalizada
 *
 * Curva continua (rama ascendente Y descendente):
 *   fc(εc) = 2·f''c·x / (1 + x²)        para 0 ≤ εc ≤ εu
 *
 * Verificación matemática:
 *   En x=1 (εc=ε₀): fc = 2·f''c·(1)/(1+1) = f''c ✓ (máximo)
 *   La función cae naturalmente después del pico → modela rama descendente
 */
export function todeschiniModel(
  fc_mpa: number,
  wc: number = HORMIGON_CONSTANTS.WC_NORMAL,
  nPoints: number = 300
): TodeschiniResult {
  const fc_pp = 0.9 * fc_mpa;
  const Ec = calcEc(fc_mpa, wc).Ec_simplified;
  const e0 = (1.71 * fc_pp) / Ec;
  const eu = HORMIGON_CONSTANTS.EU_TODESCHINI;

  const points: ModelPoint[] = [];
  for (let i = 0; i <= nPoints; i++) {
    const strain = (i / nPoints) * eu;
    const x = strain / e0;
    const stress = (2 * fc_pp * x) / (1 + x * x);
    points.push({ strain, stress });
  }

  return { points, fc_pp, Ec, e0, eu, fc: fc_mpa, label: "Todeschini (1964)" };
}

// ─── MODELO PARÁBOLA-RECTÁNGULO (EN 1992-1-1) ────────────────────────────────

/**
 * Modelo Parábola-Rectángulo — Eurocódigo 2, EN 1992-1-1:2004 §3.1.7
 *
 * Parámetros:
 *   fcd  = αcc·fck / γc                → resistencia de cálculo (αcc=1.0 por defecto)
 *   n    = 2                            → exponente de la parábola
 *   εc2  = 0.002 (2‰)                  → deformación en pico
 *   εcu2 = 0.0035 (3.5‰)               → deformación última
 *
 * Fórmulas:
 *   Para 0 ≤ εc ≤ εc2:    σc = fcd · [1 − (1 − εc/εc2)^n]
 *   Para εc2 < εc ≤ εcu2: σc = fcd  (zona rectangular/plástica)
 */
export function parabolaRectModel(
  fck_mpa: number,
  gamma_c: number = HORMIGON_CONSTANTS.GAMMA_C_DEFAULT,
  alpha_cc: number = HORMIGON_CONSTANTS.ALPHA_CC,
  nPoints: number = 300
): ParabolaRectResult {
  const fcd = (alpha_cc * fck_mpa) / gamma_c;
  const ec2 = HORMIGON_CONSTANTS.EC2;
  const ecu2 = HORMIGON_CONSTANTS.ECU2;
  const n = HORMIGON_CONSTANTS.N_PARABOLA;

  const points: ModelPoint[] = [];

  // Rama parabólica: 0 → εc2
  const nParabola = Math.floor(nPoints * (ec2 / ecu2));
  for (let i = 0; i <= nParabola; i++) {
    const strain = (i / nParabola) * ec2;
    const stress = fcd * (1 - Math.pow(1 - strain / ec2, n));
    points.push({ strain, stress });
  }

  // Rama rectangular: εc2 → εcu2
  const nRect = nPoints - nParabola;
  for (let i = 1; i <= nRect; i++) {
    const strain = ec2 + (i / nRect) * (ecu2 - ec2);
    const stress = fcd;
    points.push({ strain, stress });
  }

  return {
    points,
    fcd,
    fck: fck_mpa,
    gamma_c,
    ec2,
    ecu2,
    label: "Parábola-Rectángulo (EN 1992)",
  };
}

// ─── CURVA σ-ε GENERAL (ILUSTRATIVA) ─────────────────────────────────────────

/**
 * Genera curva σ-ε completa usando Todeschini (incluye rama descendente)
 * con zonas marcadas para ilustración pedagógica del comportamiento.
 */
export interface StressStrainZone {
  name: string;
  strainRange: [number, number];
  stressRange: [number, number];
  color: string;
  description: string;
}

export function getStressStrainZones(fc_mpa: number): StressStrainZone[] {
  const eu = HORMIGON_CONSTANTS.EU_TODESCHINI;
  const result = todeschiniModel(fc_mpa);
  return [
    {
      name: "Zona Lineal",
      strainRange: [0, result.e0 * 0.5],
      stressRange: [0, 0.5 * result.fc_pp],
      color: "rgba(59,130,246,0.15)",
      description: "Comportamiento elástico lineal — microfisuras estables",
    },
    {
      name: "Zona No-Lineal",
      strainRange: [result.e0 * 0.5, result.e0],
      stressRange: [0.5 * result.fc_pp, result.fc_pp],
      color: "rgba(245,158,11,0.15)",
      description: "Microfisuras crecen — comportamiento inelástico",
    },
    {
      name: "Softening",
      strainRange: [result.e0, eu],
      stressRange: [0, result.fc_pp],
      color: "rgba(239,68,68,0.12)",
      description: "Rama descendente — pérdida de capacidad portante",
    },
  ];
}

/**
 * Genera curvas para múltiples valores de f'c (comparativo)
 * Útil para ilustrar efecto de la resistencia en la curva σ-ε
 */
export function multipleResistanceCurves(
  fcValues_mpa: number[],
  model: "todeschini" | "hognestad" = "todeschini"
): { fc: number; points: ModelPoint[]; label: string; color: string }[] {
  const colors = ["#3B82F6", "#22C55E", "#F59E0B", "#A855F7", "#EF4444"];
  return fcValues_mpa.map((fc, i) => {
    const result = model === "todeschini" ? todeschiniModel(fc) : hognestadModel(fc);
    return {
      fc,
      points: result.points,
      label: `f'c = ${fc} MPa`,
      color: colors[i % colors.length],
    };
  });
}

/**
 * Genera curvas para múltiples densidades (efecto de wc)
 */
export function densityEffectCurves(): {
  label: string;
  wc: number;
  points: ModelPoint[];
  color: string;
}[] {
  const fc = 25; // f'c fijo = 25 MPa
  return [
    { label: "Liviano (1850 kg/m³)", wc: 1850, points: todeschiniModel(fc, 1850).points, color: "#3B82F6" },
    { label: "Normal (2300 kg/m³)", wc: 2300, points: todeschiniModel(fc, 2300).points, color: "#22C55E" },
    { label: "Pesado (2550 kg/m³)", wc: 2550, points: todeschiniModel(fc, 2550).points, color: "#F59E0B" },
  ];
}
