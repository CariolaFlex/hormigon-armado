// ─────────────────────────────────────────────────────────
// HormigonCalc — Tipos globales
// Fuente de verdad: no duplicar tipos en otros archivos
// ─────────────────────────────────────────────────────────

// ── Unidades ─────────────────────────────────────────────
export type UnitSystem = "MPa" | "kgf/cm2";

// ── Zona de falla (ACI 318) ───────────────────────────────
export type ZonaFalla = "ductil" | "transicion" | "fragil";

// ── Inputs calculadora ────────────────────────────────────

export interface InputRectangular {
  b: number;          // cm
  h: number;          // cm
  fc: number;         // kgf/cm²
  fy: number;         // kgf/cm²
  As: number;         // cm²
  d?: number;         // cm (calculado si no se pasa)
  r?: number;         // cm recubrimiento (default 5)
  Mu?: number | null; // tf·m opcional
}

export interface InputDobleFila {
  b: number;
  h: number;
  r_inf: number;
  fc: number;
  fy: number;
  nb1: number;
  phi1_mm: number;
  nb2: number;
  phi2_mm: number;
  sep_vert_mm: number;
  Mu?: number | null;
}

export interface InputDobleArmadura {
  b: number;
  h: number;
  d: number;
  d_prima: number;
  fc: number;
  fy: number;
  nb: number;
  phi_mm: number;
  nb_prima: number;
  phi_prima_mm: number;
  Mu?: number | null;
}

export interface InputVigaT {
  bw: number;
  b: number;         // ancho ala efectiva
  hf: number;        // espesor ala
  d: number;
  h: number;
  fc: number;
  fy: number;
  nb: number;
  phi_mm: number;
  Mu?: number | null;
}

export interface InputDiseno {
  b: number;
  h: number;
  d: number;
  fc: number;
  fy: number;
  tipo_viga: "simple" | "voladizo" | "continua";
  L: number;
  cargas: CargaInput[];
  Mu?: number | null;
}

export interface CargaInput {
  tipo: "q" | "qD" | "qL" | "P" | "PL";
  valor: number;
  pos?: number;       // posición para carga puntual (m)
}

export interface InputMomentos {
  tipo: "simple" | "voladizo" | "continua";
  L: number;
  cargas: CargaInput[];
}

// ── Resultados calculadora ────────────────────────────────

export interface ResultRectangular {
  As: number;
  d: number;
  beta: number;
  a: number;
  c: number;
  eps_s: number;
  eps_y: number;
  zona: ZonaFalla;
  phi: number;
  Mn: number;
  phiMn: number;
  verifica?: boolean;
}

export interface ResultDobleFila {
  As: number;
  As1: number;
  As2: number;
  d1: number;
  d2: number;
  d_eq: number;
  beta: number;
  a: number;
  c: number;
  eps_s1: number;
  eps_s2: number;
  eps_y: number;
  fluye1: boolean;
  fluye2: boolean;
  zona: ZonaFalla;
  phi: number;
  Mn: number;
  Mn_aprox: number;
  phiMn: number;
  verifica?: boolean;
}

export interface ResultDobleArmadura {
  As: number;
  As_prima: number;
  beta: number;
  a: number;
  c: number;
  eps_s: number;
  eps_s_prima: number;
  eps_y: number;
  fs_prima: number;
  fluye_s: boolean;
  fluye_prima: boolean;
  zona: ZonaFalla;
  phi: number;
  Mn1: number;
  Mn2: number;
  Mn: number;
  phiMn: number;
  verifica?: boolean;
}

export interface ResultVigaT {
  As: number;
  caso: 1 | 2;
  beta: number;
  a: number;
  c: number;
  d: number;
  eps_s: number;
  eps_y: number;
  zona: ZonaFalla;
  phi: number;
  Mn: number;
  phiMn: number;
  verifica?: boolean;
}

export interface OpcionBarras {
  nb: number;
  phi: number;
  As_real: number;
  exceso: number;
  sep: number;
}

export interface ResultDiseno {
  Mu: number;
  Rn: number;
  rho_req: number;
  rho_min: number;
  rho_max: number;
  rho_uso: number;
  excede_max: boolean;
  As_req: number;
  beta: number;
  opciones: OpcionBarras[];
  verificacion?: {
    As_real: number;
    a: number;
    Mn: number;
    phiMn: number;
    ok: boolean;
  };
  wu_detalle?: {
    qD: number;
    qL: number;
    qpp: number;
    wu1: number;
    wu2: number;
    wu: number;
    PL?: number;
    pu?: number;
  };
}

export interface PuntoMomento {
  x: number;
  M: number;
  V: number;
}

export interface ResultMomentos {
  puntos: PuntoMomento[];
  Mmax: number;
  Vmax: number;
  RA?: number;
  RB?: number;
  RE?: number;
  ME_reac?: number;
}

// ── SVG Props (un tipo por componente) ───────────────────

export interface SvgSeccionProps {
  b: number;
  h: number;
  d: number;
  a: number;
  c: number;
  nb: number;
  zona: ZonaFalla;
  width?: number;
  height?: number;
}

export interface SvgDeformacionesProps {
  h: number;
  d: number;
  c: number;
  eps_s: number;
  eps_y: number;
  zona: ZonaFalla;
  width?: number;
  height?: number;
}
