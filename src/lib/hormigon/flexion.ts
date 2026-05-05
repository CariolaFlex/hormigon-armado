/**
 * HormigonCalc — Motor de Cálculo (TypeScript)
 * Port fiel de calc_engine.js — sin modificar ninguna fórmula
 * Referencia: ACI 318-19 / NCh3171 / NCh430
 */

import type {
  ZonaFalla,
  InputRectangular,
  InputDobleFila,
  InputDobleArmadura,
  InputVigaT,
  InputDiseno,
  InputMomentos,
  ResultRectangular,
  ResultDobleFila,
  ResultDobleArmadura,
  ResultVigaT,
  ResultDiseno,
  ResultMomentos,
  OpcionBarras,
  CargaInput,
} from "@/types/index";

// ── Constantes globales ──────────────────────────────────
export const Ecu = 0.003;       // Deformación última hormigón (ACI 318)
export const Es  = 210000;      // Módulo elasticidad acero [kgf/cm²]
export const gamma_c = 2500;    // Peso unitario hormigón [kgf/m³]

// ── Barras comerciales (diámetro mm → área cm²) ──────────
export const BARRAS: Record<number, number> = {
   8: 0.503,
  10: 0.785,
  12: 1.131,
  14: 1.539,
  16: 2.011,
  18: 2.545,
  20: 3.142,
  22: 3.801,
  25: 4.909,
  28: 6.158,
  32: 8.042,
  36: 10.179,
};

// ── Funciones auxiliares ─────────────────────────────────

export function getBeta(fc: number): number {
  if (fc <= 280) return 0.85;
  const b = 1.05 - 0.0007 * fc;
  return Math.max(0.65, Math.min(0.85, b));
}

export function calcAs(nb: number, phi_mm: number): number {
  const phi_cm = phi_mm / 10;
  return nb * Math.PI * phi_cm * phi_cm / 4;
}

export function getEpsY(fy: number): number {
  return fy / Es;
}

export function getRhoB(fc: number, fy: number, beta: number): number {
  return (0.85 * beta * fc / fy) * (6300 / (6300 + fy));
}

export function getRhoMax(fc: number, fy: number, beta: number): number {
  return 0.85 * beta * fc / fy * (Ecu / (Ecu + 0.005));
}

export function getRhoMin(fc: number, fy: number): number {
  const r1 = 0.8 * Math.sqrt(fc) / fy;
  const r2 = 14 / fy;
  return Math.max(r1, r2);
}

export function getPhi(eps_t: number, fy: number): { phi: number; zona: ZonaFalla } {
  const eps_y = getEpsY(fy);
  if (eps_t >= 0.005) return { phi: 0.90, zona: "ductil" };
  if (eps_t <= eps_y)  return { phi: 0.65, zona: "fragil" };
  const phi = 0.65 + (eps_t - eps_y) / (0.005 - eps_y) * 0.25;
  return { phi: Math.min(0.90, phi), zona: "transicion" };
}

// ── Selección de barras ──────────────────────────────────

export function seleccionarBarras(As_req: number, b: number): OpcionBarras[] {
  const opciones: OpcionBarras[] = [];
  const diams = Object.keys(BARRAS).map(Number).sort((a, b) => a - b);

  for (const phi of diams) {
    const area_barra = BARRAS[phi];
    for (let nb = 2; nb <= 10; nb++) {
      const As_real = nb * area_barra;
      if (As_real >= As_req) {
        const phi_cm = phi / 10;
        const recub  = 3.8;
        const espacio = b - 2 * recub - nb * phi_cm;
        const sep = espacio / (nb - 1);
        if (sep >= Math.max(phi_cm, 2.5) || nb === 1) {
          opciones.push({
            nb, phi, As_real,
            exceso: (As_real - As_req) / As_req * 100,
            sep,
          });
          if (opciones.length >= 4) break;
        }
      }
    }
    if (opciones.length >= 4) break;
  }
  return opciones;
}

// ══════════════════════════════════════════════════════════
// M1 — Análisis Sección Rectangular
// ══════════════════════════════════════════════════════════

export function analizarRectangular(inp: InputRectangular): ResultRectangular & {
  rho: number; rho_b: number; rho_max: number; rho_min: number;
  rho_ok_min: boolean; rho_ok_max: boolean;
  C: number; T: number; brazo: number;
  fragil: boolean;
  c_real?: number; a_real?: number; fs_real?: number;
  Mu?: number | null; verifica?: boolean; ratio_mu?: number;
} {
  const { b, fc, fy, As, Mu } = inp;
  const d = inp.d ?? (inp.h - 5);

  const beta  = getBeta(fc);
  const eps_y = getEpsY(fy);
  const rho_b   = getRhoB(fc, fy, beta);
  const rho_max = getRhoMax(fc, fy, beta);
  const rho_min = getRhoMin(fc, fy);
  const rho     = As / (b * d);

  // Supuesto: acero fluye
  const a = As * fy / (0.85 * fc * b);
  const c = a / beta;
  const eps_s = Ecu * (d - c) / c;

  let phi: number, zona: ZonaFalla;
  let Mn: number, phiMn: number;
  let fragil = false;
  let c_real: number | undefined, a_real: number | undefined, fs_real: number | undefined;

  if (eps_s < eps_y) {
    fragil = true;
    zona   = "fragil";
    const A_coef = 0.85 * fc * beta * b;
    const B_coef = As * Es * Ecu;
    const C_coef = -As * Es * Ecu * d;
    const disc = B_coef * B_coef - 4 * A_coef * C_coef;
    c_real = (-B_coef + Math.sqrt(disc)) / (2 * A_coef);
    a_real = beta * c_real;
    fs_real = Es * Ecu * (d - c_real) / c_real;
    Mn = As * fs_real * (d - a_real / 2) / 100000;
    phi = 0.65;
    phiMn = phi * Mn;
  } else {
    fragil = false;
    ({ phi, zona } = getPhi(eps_s, fy));
    Mn    = As * fy * (d - a / 2) / 100000;
    phiMn = phi * Mn;
  }

  const C_force = 0.85 * fc * (fragil ? a_real! : a) * b / 1000;
  const T_force = As * (fragil ? fs_real! : fy) / 1000;

  return {
    As, d, beta,
    a: fragil ? a_real! : a,
    c: fragil ? c_real! : c,
    eps_s: fragil ? Ecu * (d - c_real!) / c_real! : eps_s,
    eps_y, zona, phi, Mn, phiMn,
    rho, rho_b, rho_max, rho_min,
    rho_ok_min: rho >= rho_min,
    rho_ok_max: rho <= rho_max,
    C: C_force, T: T_force, brazo: d - (fragil ? a_real! : a) / 2,
    fragil, c_real, a_real, fs_real,
    Mu, verifica: Mu ? phiMn >= Mu : undefined,
    ratio_mu: Mu ? phiMn / Mu : undefined,
  };
}

// ══════════════════════════════════════════════════════════
// M2 — Doble Fila de Acero
// ══════════════════════════════════════════════════════════

export function analizarDobleFila(inp: InputDobleFila): ResultDobleFila & {
  rho: number; rho_b: number; rho_max: number; rho_min: number;
  C: number; T: number;
  phiMn_aprox: number;
} {
  const { b, h, r_inf, fc, fy, Mu } = inp;
  const sep_vert = (inp.sep_vert_mm || 25) / 10;
  const beta  = getBeta(fc);
  const eps_y = getEpsY(fy);

  const As1 = calcAs(inp.nb1, inp.phi1_mm);
  const As2 = calcAs(inp.nb2, inp.phi2_mm);
  const As  = As1 + As2;

  const d2   = h - r_inf;
  const d1   = d2 - sep_vert - inp.phi1_mm / 10;
  const d_eq = (As1 * d2 + As2 * d1) / As;

  const a = As * fy / (0.85 * fc * b);
  const c = a / beta;

  const eps_s1 = Ecu * (d2 - c) / c;
  const eps_s2 = Ecu * (d1 - c) / c;
  const fluye1 = eps_s1 >= eps_y;
  const fluye2 = eps_s2 >= eps_y;

  const Mn       = (As1 * fy * (d2 - a/2) + As2 * fy * (d1 - a/2)) / 100000;
  const Mn_aprox = As * fy * (d_eq - a/2) / 100000;

  const { phi, zona } = getPhi(eps_s2, fy);
  const phiMn       = phi * Mn;
  const phiMn_aprox = phi * Mn_aprox;

  const rho     = As / (b * d_eq);
  const rho_b   = getRhoB(fc, fy, beta);
  const rho_max = getRhoMax(fc, fy, beta);
  const rho_min = getRhoMin(fc, fy);

  return {
    As, As1, As2, d1, d2, d_eq, a, c, beta,
    eps_s1, eps_s2, eps_y, fluye1, fluye2,
    Mn, Mn_aprox, phi, zona, phiMn, phiMn_aprox,
    rho, rho_b, rho_max, rho_min,
    C: 0.85 * fc * a * b / 1000,
    T: As * fy / 1000,
    verifica: Mu ? phiMn >= Mu : undefined,
  };
}

// ══════════════════════════════════════════════════════════
// M3 — Doble Armadura
// ══════════════════════════════════════════════════════════

export function analizarDobleArmadura(inp: InputDobleArmadura): ResultDobleArmadura & {
  As1: number; As2: number;
  rho: number; rho_b: number; rho_max: number; rho_min: number;
  C_hormigon: number; C_acero: number; T_total: number;
} {
  const { b, d, d_prima, fc, fy, Mu } = inp;
  const beta  = getBeta(fc);
  const eps_y = getEpsY(fy);

  const As       = calcAs(inp.nb, inp.phi_mm);
  const As_prima = calcAs(inp.nb_prima, inp.phi_prima_mm);
  const As1 = As_prima;
  const As2 = As - As1;

  // Primera estimación (supuesto fluencia A's)
  let a = As2 * fy / (0.85 * fc * b);
  let c = a / beta;
  const eps_s_prima_inicial = Ecu * (c - d_prima) / c;
  const fluye_prima = eps_s_prima_inicial >= eps_y;

  let c_final = c, a_final = a, fs_prima_final: number;

  if (!fluye_prima) {
    const A_c = 0.85 * fc * beta * b;
    const B_c = As_prima * Es * Ecu - As * fy;
    const C_c = -As_prima * Es * Ecu * d_prima;
    const disc = B_c * B_c - 4 * A_c * C_c;
    c_final = (-B_c + Math.sqrt(disc)) / (2 * A_c);
    a_final = beta * c_final;
    fs_prima_final = Es * Ecu * (c_final - d_prima) / c_final;
  } else {
    fs_prima_final = fy;
  }

  const eps_s       = Ecu * (d - c_final) / c_final;
  const eps_s_prima = Ecu * (c_final - d_prima) / c_final;
  const fluye_s     = eps_s >= eps_y;
  const { phi, zona } = getPhi(eps_s, fy);

  const Mn1 = As_prima * fs_prima_final * (d - d_prima) / 100000;
  const As2_final = (As * fy - As_prima * fs_prima_final) / fy;
  const a2_final  = As2_final * fy / (0.85 * fc * b);
  const Mn2 = As2_final * fy * (d - a2_final / 2) / 100000;
  const Mn  = Mn1 + Mn2;
  const phiMn = phi * Mn;

  const rho     = As / (b * d);
  const rho_b   = getRhoB(fc, fy, beta);
  const rho_max = getRhoMax(fc, fy, beta);
  const rho_min = getRhoMin(fc, fy);

  return {
    As, As_prima, As1, As2: As2_final,
    a: a_final, c: c_final, beta,
    eps_s, eps_s_prima, eps_y,
    fs_prima: fs_prima_final, fluye_s, fluye_prima,
    Mn1, Mn2, Mn, phi, zona, phiMn,
    rho, rho_b, rho_max, rho_min,
    C_hormigon: 0.85 * fc * a_final * b / 1000,
    C_acero:    As_prima * fs_prima_final / 1000,
    T_total:    As * fy / 1000,
    verifica: Mu ? phiMn >= Mu : undefined,
  };
}

// ══════════════════════════════════════════════════════════
// M4 — Viga T
// ══════════════════════════════════════════════════════════

export function analizarVigaT(inp: InputVigaT): ResultVigaT & {
  bw: number; b: number; hf: number; h: number;
  rho: number; rho_b: number; rho_max: number; rho_min: number;
  Cf: number; Cw: number; Tf: number; Tw: number;
  eps_s: number;
} {
  const { bw, b, hf, d, h, fc, fy, Mu } = inp;
  const beta  = getBeta(fc);
  const eps_y = getEpsY(fy);
  const As    = calcAs(inp.nb, inp.phi_mm);

  const a_caso1 = As * fy / (0.85 * fc * b);
  const caso = a_caso1 <= hf ? 1 : 2;

  let a: number, c: number, Mn: number, phi: number, zona: ZonaFalla;
  let Cf = 0, Cw = 0, Tf = 0, Tw = 0;

  if (caso === 1) {
    a = a_caso1;
    c = a / beta;
    const eps_s = Ecu * (d - c) / c;
    ({ phi, zona } = getPhi(eps_s, fy));
    Mn = As * fy * (d - a/2) / 100000;
    Cf = 0.85 * fc * a * b / 1000;
    Tf = As * fy / 1000;
  } else {
    const As_f = 0.85 * fc * hf * (b - bw) / fy;
    const As_w = As - As_f;
    a = As_w * fy / (0.85 * fc * bw);
    c = a / beta;
    const eps_s = Ecu * (d - c) / c;
    ({ phi, zona } = getPhi(eps_s, fy));
    const Mn_f = As_f * fy * (d - hf/2) / 100000;
    const Mn_w = As_w * fy * (d - a/2) / 100000;
    Mn = Mn_f + Mn_w;
    Cf = 0.85 * fc * hf * (b - bw) / 1000;
    Cw = 0.85 * fc * a * bw / 1000;
    Tf = As_f * fy / 1000;
    Tw = As_w * fy / 1000;
  }

  const eps_s = Ecu * (d - c) / c;
  const phiMn = phi * Mn;

  return {
    As, a, c, beta, caso: caso as 1 | 2,
    eps_s, eps_y, phi, zona, Mn, phiMn,
    bw, b, hf, d, h,
    Cf, Cw, Tf, Tw,
    rho:     As / (bw * d),
    rho_b:   getRhoB(fc, fy, beta),
    rho_max: getRhoMax(fc, fy, beta),
    rho_min: getRhoMin(fc, fy),
    verifica: Mu ? phiMn >= Mu : undefined,
  };
}

// ══════════════════════════════════════════════════════════
// M5 — Diseño Sección Rectangular (LRFD)
// ══════════════════════════════════════════════════════════

export function disenarRectangularCompleto(inp: InputDiseno): ResultDiseno {
  const { b, h, d, fc, fy } = inp;
  const beta    = getBeta(fc);
  const rho_min = getRhoMin(fc, fy);
  const rho_max = getRhoMax(fc, fy, beta);

  let Mu = inp.Mu ?? 0;
  let wu_detalle: ResultDiseno["wu_detalle"] | undefined;

  if (!inp.Mu && inp.L && inp.cargas) {
    const qD  = inp.cargas.filter(c => c.tipo === "qD").reduce((s, c) => s + c.valor, 0);
    const qL  = inp.cargas.filter(c => c.tipo === "qL").reduce((s, c) => s + c.valor, 0);
    const PL  = inp.cargas.filter(c => c.tipo === "PL").reduce((s, c) => s + c.valor, 0);
    const qpp = gamma_c / 1000 * (b / 100) * (h / 100);
    const wu1 = 1.4 * (qD + qpp);
    const wu2 = 1.2 * (qD + qpp) + 1.6 * qL;
    const wu  = Math.max(wu1, wu2);
    const pu  = 1.6 * PL;
    wu_detalle = { qD, qL, qpp, wu1, wu2, wu, PL, pu };
    const L = inp.L;
    Mu = inp.tipo_viga === "voladizo"
      ? wu * L * L / 2 + pu * L
      : wu * L * L / 8 + pu * L / 4;
  }

  const Mu_kgcm  = Mu * 100000;
  const phi      = 0.90;
  const Rn       = Mu_kgcm / (phi * b * d * d);
  const bajo_raiz = 1 - 2 * Rn / (0.85 * fc);
  const excede_max = bajo_raiz < 0;

  let rho_req = 0, rho_uso = 0, As_req = 0;
  if (!excede_max) {
    rho_req = (0.85 * fc / fy) * (1 - Math.sqrt(bajo_raiz));
    rho_uso = Math.max(rho_req, rho_min);
    As_req  = rho_uso * b * d;
  } else {
    rho_uso = rho_max;
    As_req  = rho_max * b * d;
  }

  const opciones = seleccionarBarras(As_req, b);
  let verificacion: ResultDiseno["verificacion"] | undefined;
  if (opciones.length > 0) {
    const opt   = opciones[0];
    const a_ver = opt.As_real * fy / (0.85 * fc * b);
    const Mn_v  = opt.As_real * fy * (d - a_ver / 2) / 100000;
    verificacion = {
      As_real: opt.As_real,
      a: a_ver, Mn: Mn_v,
      phiMn: phi * Mn_v,
      ok: phi * Mn_v >= Mu,
    };
  }

  return {
    Mu, Rn, rho_req, rho_min, rho_max, rho_uso,
    excede_max, As_req, beta: getBeta(fc),
    opciones, verificacion, wu_detalle,
  };
}

// ══════════════════════════════════════════════════════════
// M6 — Diagramas de Momentos y Cortantes
// ══════════════════════════════════════════════════════════

export function calcMomentos(inp: InputMomentos): ResultMomentos {
  const { tipo, L, cargas } = inp;
  const n  = 200;
  const dx = L / n;
  const puntos: ResultMomentos["puntos"] = [];

  if (tipo === "simple") {
    let RA = 0, RB = 0;
    for (const c of cargas) {
      if (c.tipo === "q") { RA += c.valor * L / 2; RB += c.valor * L / 2; }
      if (c.tipo === "P" && c.pos !== undefined) {
        const a2 = c.pos, b2 = L - a2;
        RA += c.valor * b2 / L;
        RB += c.valor * a2 / L;
      }
    }
    for (let i = 0; i <= n; i++) {
      const x = i * dx;
      let V = RA, M = RA * x;
      for (const c of cargas) {
        if (c.tipo === "q") { V -= c.valor * x; M -= c.valor * x * x / 2; }
        if (c.tipo === "P" && c.pos !== undefined && x > c.pos) {
          V -= c.valor; M -= c.valor * (x - c.pos);
        }
      }
      puntos.push({ x, M, V });
    }
    const Mmax = Math.max(...puntos.map(p => Math.abs(p.M)));
    const Vmax = Math.max(...puntos.map(p => Math.abs(p.V)));
    return { puntos, Mmax, Vmax, RA, RB };
  } else {
    // Voladizo
    let RE = 0, ME_reac = 0;
    for (const c of cargas) {
      if (c.tipo === "q") { RE += c.valor * L; ME_reac += c.valor * L * L / 2; }
      if (c.tipo === "P" && c.pos !== undefined) { RE += c.valor; ME_reac += c.valor * c.pos; }
    }
    for (let i = 0; i <= n; i++) {
      const x = i * dx;
      let M = 0, V = 0;
      for (const c of cargas) {
        if (c.tipo === "q") { M -= c.valor * x * x / 2; V -= c.valor * x; }
        if (c.tipo === "P" && c.pos !== undefined && x >= c.pos) {
          M -= c.valor * (x - c.pos); V -= c.valor;
        }
      }
      puntos.push({ x, M, V });
    }
    const Mmax = Math.max(...puntos.map(p => Math.abs(p.M)));
    const Vmax = Math.max(...puntos.map(p => Math.abs(p.V)));
    return { puntos, Mmax, Vmax, RE, ME_reac };
  }
}
