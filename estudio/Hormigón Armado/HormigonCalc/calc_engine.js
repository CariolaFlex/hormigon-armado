/* ============================================================
   HormigonCalc — Motor de Cálculo
   Todas las funciones son puras (sin side-effects de UI)
   Escalable: agregar módulos como nuevas funciones exportadas
   ============================================================ */

const CALC = (() => {

  // ── Constantes globales ──────────────────────────────────
  const Ecu = 0.003;          // Deformación última del hormigón (ACI 318)
  const Es  = 210000;         // Módulo de elasticidad del acero [kgf/cm²]
  const gamma_c = 2500;       // Peso unitario hormigón [kgf/m³]

  // ── Tablas de barras comerciales (diámetro en mm → área en cm²) ──
  const BARRAS = {
    8:  0.503,
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

  // ── Calcula β según f'c (ACI 318 / NCh430) ──────────────
  function getBeta(fc) {
    if (fc <= 280) return 0.85;
    const b = 1.05 - 0.0007 * fc;
    return Math.max(0.65, Math.min(0.85, b));
  }

  // ── Área de acero por barras ─────────────────────────────
  function calcAs(nb, phi_mm) {
    const phi_cm = phi_mm / 10;
    return nb * Math.PI * phi_cm * phi_cm / 4;
  }

  // ── Deformación de fluencia ──────────────────────────────
  function getEpsY(fy) {
    return fy / Es;
  }

  // ── Cuantía balanceada ───────────────────────────────────
  function getRhoB(fc, fy, beta) {
    return (0.85 * beta * fc / fy) * (6300 / (6300 + fy));
  }

  // ── Cuantía máxima (εt ≥ 0.005 → φ = 0.90) ──────────────
  function getRhoMax(fc, fy, beta) {
    // c/d ≤ 3/8 para εt = 0.005 cuando εcu = 0.003
    return 0.85 * beta * fc / fy * (Ecu / (Ecu + 0.005));
  }

  // ── Cuantía mínima ───────────────────────────────────────
  function getRhoMin(fc, fy) {
    const r1 = 0.8 * Math.sqrt(fc) / fy;
    const r2 = 14 / fy;
    return Math.max(r1, r2);
  }

  // ── Factor φ según εt ────────────────────────────────────
  function getPhi(eps_t, fy) {
    const eps_y = getEpsY(fy);
    if (eps_t >= 0.005) return { phi: 0.90, zona: 'ductil' };
    if (eps_t <= eps_y)  return { phi: 0.65, zona: 'fragil' };
    // Zona de transición: interpolación lineal (ACI 318-19)
    const phi = 0.65 + (eps_t - eps_y) / (0.005 - eps_y) * 0.25;
    return { phi: Math.min(0.90, phi), zona: 'transicion' };
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO 1 — Análisis Sección Rectangular Simple
  // ══════════════════════════════════════════════════════════
  function analizarRectangular(inp) {
    /*
      inp: { b, h, d, fc, fy, As, Mu (opcional) }
      Retorna objeto con todos los valores intermedios y pasos
    */
    const { b, h, d, fc, fy, Mu } = inp;
    let { As } = inp;
    const result = { ok: true, pasos: [] };

    // — Beta —
    const beta = getBeta(fc);
    result.beta = beta;

    // — Área de acero —
    result.As = As;
    result.pasos.push({
      id: 1,
      key: 'as',
      As_calc: As,
    });

    // — Cuantía —
    const rho = As / (b * d);
    result.rho = rho;

    // — Cuantías límite —
    const rho_b   = getRhoB(fc, fy, beta);
    const rho_max = getRhoMax(fc, fy, beta);
    const rho_min = getRhoMin(fc, fy);
    result.rho_b   = rho_b;
    result.rho_max = rho_max;
    result.rho_min = rho_min;

    // — Supuesto: acero fluye → a —
    const a = As * fy / (0.85 * fc * b);
    result.a = a;
    result.pasos.push({ id: 2, key: 'a', a });

    // — Eje neutro —
    const c = a / beta;
    result.c = c;
    result.pasos.push({ id: 3, key: 'c', c, beta });

    // — Deformación del acero —
    const eps_y = getEpsY(fy);
    const eps_s = Ecu * (d - c) / c;
    result.eps_y = eps_y;
    result.eps_s = eps_s;
    result.pasos.push({ id: 4, key: 'eps', eps_s, eps_y, d, c });

    // — Verificar supuesto —
    if (eps_s < eps_y) {
      // Falla frágil: resolver cuadrática para c
      result.fragil = true;
      result.zona = 'fragil';
      // 0.85·fc·β·c·b = As·Es·εcu·(d-c)/c
      // 0.85·fc·β·b·c² + As·Es·εcu·c - As·Es·εcu·d = 0
      const A_coef = 0.85 * fc * beta * b;
      const B_coef = As * Es * Ecu;
      const C_coef = -As * Es * Ecu * d;
      const disc = B_coef * B_coef - 4 * A_coef * C_coef;
      const c_real = (-B_coef + Math.sqrt(disc)) / (2 * A_coef);
      const a_real = beta * c_real;
      const fs_real = Es * Ecu * (d - c_real) / c_real;
      result.c_real  = c_real;
      result.a_real  = a_real;
      result.fs_real = fs_real;
      result.pasos.push({ id: 4.5, key: 'fragil_cuadratica', A_coef, B_coef, C_coef, c_real, a_real, fs_real });
      // Mn con fs real
      const Mn_fragil = As * fs_real * (d - a_real / 2) / 100000; // tf·m
      result.Mn = Mn_fragil;
      result.phi = 0.65;
      result.phiMn = 0.65 * Mn_fragil;
      result.ok = false; // sección no aceptable
    } else {
      result.fragil = false;
    }

    // — Factor φ —
    const { phi, zona } = getPhi(eps_s, fy);
    if (!result.fragil) {
      result.phi  = phi;
      result.zona = zona;
    }
    result.pasos.push({ id: 5, key: 'phi', phi: result.phi, zona: result.zona, eps_s, eps_y });

    // — Mn (solo si no frágil ya calculado arriba) —
    if (!result.fragil) {
      const Mn = As * fy * (d - a / 2) / 100000; // kgf·cm → tf·m
      result.Mn   = Mn;
      result.phiMn = phi * Mn;
      result.pasos.push({ id: 6, key: 'Mn', Mn, a, d, As, fy });
      result.pasos.push({ id: 7, key: 'phiMn', phiMn: result.phiMn, phi, Mn });
    }

    // — Verificación φMn vs Mu —
    if (Mu) {
      result.Mu = Mu;
      result.verifica = result.phiMn >= Mu;
      result.ratio_mu = result.phiMn / Mu;
    }

    // — Verificación cuantías —
    result.rho_ok_min  = rho >= rho_min;
    result.rho_ok_max  = rho <= rho_max;
    result.rho_ok_duct = rho <= rho_b;
    result.pasos.push({ id: 8, key: 'cuantias', rho, rho_min, rho_max, rho_b });

    // — Fuerzas internas —
    result.C = 0.85 * fc * a * b / 1000;        // tf
    result.T = As * fy / 1000;                   // tf
    result.brazo = d - a / 2;                    // cm

    return result;
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO DISEÑO — Sección Rectangular (próximamente completo)
  // ══════════════════════════════════════════════════════════
  function disenarRectangular(inp) {
    const { b, h, d, fc, fy, Mu } = inp;
    const beta    = getBeta(fc);
    const rho_min = getRhoMin(fc, fy);
    const rho_max = getRhoMax(fc, fy, beta);
    const rho_b   = getRhoB(fc, fy, beta);

    const Mu_kgcm = Mu * 100000; // tf·m → kgf·cm
    const phi     = 0.90;
    const Rn      = Mu_kgcm / (phi * b * d * d);

    // ρ por fórmula cuadrática inversa
    const rho_req = (0.85 * fc / fy) * (1 - Math.sqrt(1 - 2 * Rn / (0.85 * fc)));
    const rho_uso = Math.max(rho_req, rho_min);
    const As_req  = rho_uso * b * d;

    // Selección de barras
    const opciones = seleccionarBarras(As_req, b);

    return {
      beta, Rn, rho_req, rho_uso, As_req, rho_min, rho_max, rho_b,
      opciones,
      excede_max: rho_req > rho_max,
    };
  }

  // ── Selección automática de barras comerciales ─────────
  function seleccionarBarras(As_req, b) {
    const opciones = [];
    const diams = Object.keys(BARRAS).map(Number).sort((a,b) => a-b);

    for (const phi of diams) {
      const area_barra = BARRAS[phi];
      // Mínimo 2 barras, máximo lo que quepa en b con sep mínima
      for (let nb = 2; nb <= 10; nb++) {
        const As_real = nb * area_barra;
        if (As_real >= As_req) {
          // Verificar separación mínima (simplificada: sep ≥ phi_cm y ≥ 2.5cm)
          const phi_cm = phi / 10;
          const recub = 3.8; // recubrimiento lateral + estribo típico
          const espacio = b - 2 * recub - nb * phi_cm;
          const sep = espacio / (nb - 1);
          if (sep >= Math.max(phi_cm, 2.5) || nb === 1) {
            opciones.push({ nb, phi, As_real, exceso: (As_real - As_req) / As_req * 100, sep });
            if (opciones.length >= 4) break;
          }
        }
      }
      if (opciones.length >= 4) break;
    }
    return opciones;
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO MOMENTOS — Viga simplemente apoyada / voladizo
  // ══════════════════════════════════════════════════════════
  function calcMomentos(inp) {
    /*
      inp: { tipo: 'apoyada'|'voladizo', L, cargas: [{tipo:'q'|'P', valor, pos}] }
      Retorna { Mmax, Vmax, puntos: [{x, M, V}] }
    */
    const { tipo, L, cargas } = inp;
    const n = 100;
    const dx = L / n;
    const puntos = [];

    if (tipo === 'apoyada') {
      // Reacciones por superposición
      let RA = 0, RB = 0;
      for (const c of cargas) {
        if (c.tipo === 'q') { RA += c.valor * L / 2; RB += c.valor * L / 2; }
        if (c.tipo === 'P') {
          const a = c.pos, b2 = L - a;
          RA += c.valor * b2 / L;
          RB += c.valor * a / L;
        }
      }
      for (let i = 0; i <= n; i++) {
        const x = i * dx;
        let V = RA;
        let M = RA * x;
        for (const c of cargas) {
          if (c.tipo === 'q') { V -= c.valor * x; M -= c.valor * x * x / 2; }
          if (c.tipo === 'P' && x > c.pos) { V -= c.valor; M -= c.valor * (x - c.pos); }
        }
        puntos.push({ x, M, V });
      }
    } else { // voladizo
      for (let i = 0; i <= n; i++) {
        const x = i * dx; // x desde el extremo libre
        let M = 0, V = 0;
        for (const c of cargas) {
          if (c.tipo === 'q') { M -= c.valor * x * x / 2; V -= c.valor * x; }
          if (c.tipo === 'P' && x >= c.pos) {
            M -= c.valor * (x - c.pos);
            V -= c.valor;
          }
        }
        puntos.push({ x, M, V });
      }
    }

    const Mmax = Math.max(...puntos.map(p => Math.abs(p.M)));
    const Vmax = Math.max(...puntos.map(p => Math.abs(p.V)));
    return { Mmax, Vmax, puntos };
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO 2 — Doble Fila de Acero
  // ══════════════════════════════════════════════════════════
  function analizarDobleFila(inp) {
    /*
      inp: { b, h, r_inf, fc, fy, nb1, phi1_mm, nb2, phi2_mm, sep_vert_mm, Mu }
      r_inf: recubrimiento al centroide de la fila inferior [cm]
      sep_vert_mm: separación vertical libre entre filas [mm] (mínimo 25mm)
    */
    const { b, h, r_inf, fc, fy, Mu } = inp;
    const sep_vert = (inp.sep_vert_mm || 25) / 10; // mm → cm
    const beta = getBeta(fc);

    // Áreas por fila
    const As1 = CALC.calcAs(inp.nb1, inp.phi1_mm); // fila inferior (más alejada del eje neutro)
    const As2 = CALC.calcAs(inp.nb2, inp.phi2_mm); // fila superior
    const As  = As1 + As2;

    // Peraltes efectivos
    const d2 = h - r_inf;                               // centroide fila inferior
    const d1 = d2 - sep_vert - inp.phi1_mm / 10;        // centroide fila superior
    const d_eq = (As1 * d2 + As2 * d1) / As;           // centroide ponderado

    // Método exacto: a con As total
    const a = As * fy / (0.85 * fc * b);
    const c = a / beta;

    const eps_y = getEpsY(fy);

    // Deformación en cada fila
    const eps_s1 = Ecu * (d2 - c) / c;  // fila inferior
    const eps_s2 = Ecu * (d1 - c) / c;  // fila superior (más crítica)

    // Verificar fluencia
    const fluye1 = eps_s1 >= eps_y;
    const fluye2 = eps_s2 >= eps_y;

    // Mn exacto
    const Mn = (As1 * fy * (d2 - a/2) + As2 * fy * (d1 - a/2)) / 100000;

    // Mn aproximado con d_eq
    const a_aprox = As * fy / (0.85 * fc * b);
    const Mn_aprox = As * fy * (d_eq - a_aprox/2) / 100000;

    const { phi, zona } = getPhi(eps_s2, fy); // fila superior es la más crítica

    const rho   = As / (b * d_eq);
    const rho_b = getRhoB(fc, fy, beta);
    const rho_max = getRhoMax(fc, fy, beta);
    const rho_min = getRhoMin(fc, fy);

    const C  = 0.85 * fc * a * b / 1000;
    const T  = As * fy / 1000;

    return {
      As, As1, As2, d1, d2, d_eq, a, c, beta,
      eps_s1, eps_s2, eps_y, fluye1, fluye2,
      Mn, Mn_aprox, phi, zona,
      rho, rho_b, rho_max, rho_min,
      phiMn: phi * Mn,
      phiMn_aprox: phi * Mn_aprox,
      C, T,
      Mu: Mu || null,
      verifica: Mu ? (phi * Mn) >= Mu : null,
    };
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO 3 — Doble Armadura (As tracción + A's compresión)
  // ══════════════════════════════════════════════════════════
  function analizarDobleArmadura(inp) {
    /*
      inp: { b, h, d, d_prima, fc, fy,
             nb, phi_mm,       ← acero tracción
             nb_prima, phi_prima_mm, ← acero compresión
             Mu }
    */
    const { b, h, d, d_prima, fc, fy, Mu } = inp;
    const beta = getBeta(fc);
    const eps_y = getEpsY(fy);

    const As       = calcAs(inp.nb, inp.phi_mm);
    const As_prima = calcAs(inp.nb_prima, inp.phi_prima_mm);

    // Descomposición en Viga1 + Viga2
    const As1 = As_prima;          // tracción que equilibra A's
    const As2 = As - As1;          // tracción que equilibra bloque hormigón

    // Bloque de hormigón (Viga 2)
    const a  = As2 * fy / (0.85 * fc * b);
    const c  = a / beta;

    // Deformaciones
    const eps_s  = Ecu * (d - c) / c;         // acero tracción
    const eps_s_prima = Ecu * (c - d_prima) / c; // acero compresión

    const fluye_s      = eps_s >= eps_y;
    const fluye_prima  = eps_s_prima >= eps_y;

    // Fuerza real en A's si no fluye
    const fs_prima = fluye_prima ? fy : Es * eps_s_prima;

    // Si A's no fluye hay que iterar c (simplificado: recalcular)
    let a_final = a, c_final = c, fs_prima_final = fs_prima;
    if (!fluye_prima) {
      // Ecuación cuadrática para c
      // 0.85·fc·β·b·c + A's·Es·εcu·(c-d')/c = As·fy  →  multiplicar por c
      // 0.85·fc·β·b·c² + A's·Es·εcu·c - A's·Es·εcu·d' - As·fy·c = 0
      const A_c = 0.85 * fc * beta * b;
      const B_c = As_prima * Es * Ecu - As * fy;
      const C_c = -As_prima * Es * Ecu * d_prima;
      const disc = B_c * B_c - 4 * A_c * C_c;
      c_final = (-B_c + Math.sqrt(disc)) / (2 * A_c);
      a_final = beta * c_final;
      fs_prima_final = Es * Ecu * (c_final - d_prima) / c_final;
    }

    const eps_s_final = Ecu * (d - c_final) / c_final;
    const { phi, zona } = getPhi(eps_s_final, fy);

    // Mn1 — par de fuerzas As1·fy con A's·fs'
    const Mn1 = As_prima * fs_prima_final * (d - d_prima) / 100000;
    // Mn2 — bloque hormigón con As2
    const As2_final = (As * fy - As_prima * fs_prima_final) / fy;
    const a2_final  = As2_final * fy / (0.85 * fc * b);
    const Mn2 = As2_final * fy * (d - a2_final / 2) / 100000;
    const Mn  = Mn1 + Mn2;

    const C_hormigon = 0.85 * fc * a_final * b / 1000;
    const C_acero    = As_prima * fs_prima_final / 1000;
    const T_total    = As * fy / 1000;

    const rho   = As / (b * d);
    const rho_b = getRhoB(fc, fy, beta);
    const rho_max = getRhoMax(fc, fy, beta);
    const rho_min = getRhoMin(fc, fy);

    return {
      As, As_prima, As1, As2: As2_final, d, d_prima, a: a_final, c: c_final, beta,
      eps_s: eps_s_final, eps_s_prima: Ecu*(c_final-d_prima)/c_final, eps_y,
      fs_prima: fs_prima_final, fluye_s, fluye_prima,
      Mn1, Mn2, Mn, phi, zona, phiMn: phi * Mn,
      rho, rho_b, rho_max, rho_min,
      C_hormigon, C_acero, T_total,
      Mu: Mu || null,
      verifica: Mu ? (phi * Mn) >= Mu : null,
    };
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO 4 — Viga T
  // ══════════════════════════════════════════════════════════
  function analizarVigaT(inp) {
    /*
      inp: { bw, b, hf, d, h, fc, fy, nb, phi_mm, Mu }
      bw: ancho del alma
      b:  ancho efectivo del ala
      hf: espesor del ala (losa)
    */
    const { bw, b, hf, d, h, fc, fy, Mu } = inp;
    const beta = getBeta(fc);
    const eps_y = getEpsY(fy);
    const As = calcAs(inp.nb, inp.phi_mm);

    // Paso 1: asumir a ≤ hf (sección rectangular de ancho b)
    const a_caso1 = As * fy / (0.85 * fc * b);
    const caso = a_caso1 <= hf ? 1 : 2;

    let a, c, Mn, zona, phi;
    let Cf, Cw, Tf, Tw; // fuerzas en ala y alma

    if (caso === 1) {
      // a ≤ hf → bloque dentro del ala → rectangular de ancho b
      a = a_caso1;
      c = a / beta;
      const eps_s = Ecu * (d - c) / c;
      ({ phi, zona } = getPhi(eps_s, fy));
      Mn = As * fy * (d - a/2) / 100000;
      Cf = 0.85 * fc * a * b / 1000;
      Cw = 0;
      Tf = As * fy / 1000;
      Tw = 0;
    } else {
      // Caso 2: a > hf → bloque cruza el ala
      // As_f: acero que equilibra la compresión en los voladizos del ala
      const As_f = 0.85 * fc * hf * (b - bw) / fy;
      const As_w = As - As_f;
      // Bloque en el alma (ancho bw)
      a = As_w * fy / (0.85 * fc * bw);
      c = a / beta;
      const eps_s = Ecu * (d - c) / c;
      ({ phi, zona } = getPhi(eps_s, fy));
      // Mn = Mn_ala + Mn_alma
      const Mn_f = As_f * fy * (d - hf/2) / 100000;
      const Mn_w = As_w * fy * (d - a/2) / 100000;
      Mn = Mn_f + Mn_w;
      Cf = 0.85 * fc * hf * (b - bw) / 1000;  // voladizos
      Cw = 0.85 * fc * a * bw / 1000;          // alma
      Tf = As_f * fy / 1000;
      Tw = As_w * fy / 1000;
    }

    const eps_s = Ecu * (d - c) / c;
    const rho_w = As / (bw * d);
    const rho_b = getRhoB(fc, fy, beta);
    const rho_max = getRhoMax(fc, fy, beta);
    const rho_min = getRhoMin(fc, fy);

    return {
      As, bw, b, hf, d, h, a, c, beta, caso,
      eps_s, eps_y, phi, zona,
      Mn, phiMn: phi * Mn,
      Cf, Cw, Tf, Tw,
      rho: rho_w, rho_b, rho_max, rho_min,
      Mu: Mu || null,
      verifica: Mu ? (phi * Mn) >= Mu : null,
    };
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO 5 — Diseño Sección Rectangular (completo)
  // ══════════════════════════════════════════════════════════
  function disenarRectangularCompleto(inp) {
    /*
      inp: { b, h, d, fc, fy, Mu,
             cargas: [{tipo:'qD'|'qL'|'PD'|'PL', valor, pos}],
             L, tipo_viga:'apoyada'|'voladizo' }
    */
    const { b, h, d, fc, fy } = inp;
    const beta    = getBeta(fc);
    const rho_min = getRhoMin(fc, fy);
    const rho_max = getRhoMax(fc, fy, beta);
    const rho_b   = getRhoB(fc, fy, beta);
    const eps_y   = getEpsY(fy);

    // Mu puede venir calculado o calcularse desde cargas
    let Mu = inp.Mu;
    let wu = null, pu = null, wu_detalle = null;

    if (!Mu && inp.L && inp.cargas) {
      // Calcular Wu y Mu desde cargas con LRFD
      const qD = inp.cargas.filter(c=>c.tipo==='qD').reduce((s,c)=>s+c.valor,0);
      const qL = inp.cargas.filter(c=>c.tipo==='qL').reduce((s,c)=>s+c.valor,0);
      const PD = inp.cargas.filter(c=>c.tipo==='PD').reduce((s,c)=>s+c.valor,0);
      const PL = inp.cargas.filter(c=>c.tipo==='PL').reduce((s,c)=>s+c.valor,0);
      const qpp = gamma_c/1000 * (b/100) * (h/100); // tf/m
      const wu1 = 1.4 * (qD + qpp);
      const wu2 = 1.2 * (qD + qpp) + 1.6 * qL;
      wu = Math.max(wu1, wu2);
      pu = 1.2 * PD + 1.6 * PL;
      wu_detalle = { qD, qL, PD, PL, qpp, wu1, wu2, wu, pu };

      const L = inp.L;
      if (inp.tipo_viga === 'voladizo') {
        Mu = wu * L * L / 2 + pu * L;
      } else {
        Mu = wu * L * L / 8 + pu * L / 4;
      }
    }

    const Mu_kgcm = Mu * 100000;
    const phi     = 0.90;
    const Rn      = Mu_kgcm / (phi * b * d * d);

    const bajo_raiz = 1 - 2 * Rn / (0.85 * fc);
    const excede_max = bajo_raiz < 0;

    let rho_req = 0, rho_uso = 0, As_req = 0;
    if (!excede_max) {
      rho_req = (0.85 * fc / fy) * (1 - Math.sqrt(bajo_raiz));
      rho_uso = Math.max(rho_req, rho_min);
      As_req  = rho_uso * b * d;
    } else {
      // ρ > ρmax: necesita doble armadura o cambiar sección
      rho_uso = rho_max;
      As_req  = rho_max * b * d;
    }

    const opciones = seleccionarBarras(As_req, b);

    // Verificar la primera opción
    let verificacion = null;
    if (opciones.length > 0) {
      const opt = opciones[0];
      const As_real = opt.As_real;
      const a_ver = As_real * fy / (0.85 * fc * b);
      const Mn_ver = As_real * fy * (d - a_ver/2) / 100000;
      verificacion = {
        As_real, a: a_ver, Mn: Mn_ver,
        phiMn: phi * Mn_ver,
        ok: phi * Mn_ver >= Mu,
      };
    }

    return {
      beta, Rn, rho_req, rho_uso, As_req,
      rho_min, rho_max, rho_b, phi,
      Mu, wu_detalle, excede_max, opciones, verificacion,
    };
  }

  // ══════════════════════════════════════════════════════════
  // MÓDULO 6 — Momentos y Cortantes (mejorado)
  // ══════════════════════════════════════════════════════════
  function calcMomentos(inp) {
    const { tipo, L, cargas } = inp;
    const n = 200;
    const dx = L / n;
    const puntos = [];

    if (tipo === 'apoyada') {
      let RA = 0, RB = 0;
      for (const c of cargas) {
        if (c.tipo === 'q') { RA += c.valor*L/2; RB += c.valor*L/2; }
        if (c.tipo === 'P') { const a=c.pos, b2=L-a; RA+=c.valor*b2/L; RB+=c.valor*a/L; }
      }
      for (let i=0; i<=n; i++) {
        const x = i*dx;
        let V = RA, M = RA*x;
        for (const c of cargas) {
          if (c.tipo==='q') { V-=c.valor*x; M-=c.valor*x*x/2; }
          if (c.tipo==='P'&&x>c.pos) { V-=c.valor; M-=c.valor*(x-c.pos); }
        }
        puntos.push({ x, M, V });
      }
      // Fórmulas exactas para Mmax
      const Mmax = Math.max(...puntos.map(p=>Math.abs(p.M)));
      const Vmax = Math.max(...puntos.map(p=>Math.abs(p.V)));
      const x_Mmax = puntos.find(p=>Math.abs(p.M)===Mmax)?.x;
      return { RA, RB, Mmax, Vmax, x_Mmax, puntos, tipo };
    } else {
      // voladizo: x desde empotrado hacia extremo libre
      let RE = 0, ME_reac = 0;
      for (const c of cargas) {
        if (c.tipo==='q') { RE+=c.valor*L; ME_reac+=c.valor*L*L/2; }
        if (c.tipo==='P') { RE+=c.valor; ME_reac+=c.valor*c.pos; }
      }
      for (let i=0; i<=n; i++) {
        const x = i*dx; // desde extremo libre
        let M=0, V=0;
        for (const c of cargas) {
          if (c.tipo==='q') { M-=c.valor*x*x/2; V-=c.valor*x; }
          if (c.tipo==='P'&&x>=c.pos) { M-=c.valor*(x-c.pos); V-=c.valor; }
        }
        puntos.push({ x, M, V });
      }
      const Mmax = Math.max(...puntos.map(p=>Math.abs(p.M)));
      const Vmax = Math.max(...puntos.map(p=>Math.abs(p.V)));
      return { RE, ME_reac, Mmax, Vmax, puntos, tipo };
    }
  }

  // ── Exportar API pública ─────────────────────────────────
  return {
    getBeta, calcAs, getEpsY, getRhoB, getRhoMax, getRhoMin, getPhi,
    analizarRectangular,
    analizarDobleFila,
    analizarDobleArmadura,
    analizarVigaT,
    disenarRectangular,
    disenarRectangularCompleto,
    seleccionarBarras,
    calcMomentos,
    BARRAS, Ecu, Es, gamma_c,
  };

})();
