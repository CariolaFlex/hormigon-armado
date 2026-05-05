/* ============================================================
   HormigonCalc — Renderizador SVG
   Genera las figuras técnicas de alto nivel
   ============================================================ */

const SVG = (() => {

  const ns = 'http://www.w3.org/2000/svg';

  function el(tag, attrs = {}, children = []) {
    const e = document.createElementNS(ns, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    for (const c of children) if (c) e.appendChild(c);
    return e;
  }

  function text(content, attrs = {}) {
    const e = el('text', attrs);
    e.textContent = content;
    return e;
  }

  function line(x1, y1, x2, y2, attrs = {}) {
    return el('line', { x1, y1, x2, y2, ...attrs });
  }

  function rect(x, y, w, h, attrs = {}) {
    return el('rect', { x, y, width: w, height: h, ...attrs });
  }

  function circle(cx, cy, r, attrs = {}) {
    return el('circle', { cx, cy, r, ...attrs });
  }

  function path(d, attrs = {}) {
    return el('path', { d, ...attrs });
  }

  // ── Patrón de rayado (bloque de compresión) ──────────────
  function makeHatchPattern(id, color) {
    return el('pattern', {
      id, patternUnits: 'userSpaceOnUse',
      width: '8', height: '8',
      patternTransform: 'rotate(45)'
    }, [
      el('rect', { width: '8', height: '8', fill: 'transparent' }),
      el('line', { x1: '0', y1: '0', x2: '0', y2: '8',
        stroke: color, 'stroke-width': '2.5', opacity: '0.5' })
    ]);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA 1 — Sección transversal con bloque de Whitney
  // ══════════════════════════════════════════════════════════
  function seccionTransversal(container, data) {
    /*
      data: { b, h, d, a, c, nb, zona, preview }
      preview: true → solo muestra geometría sin bloque ni deformaciones
    */
    const W = 300, H = 380;
    const svg = el('svg', {
      viewBox: `0 0 ${W} ${H}`,
      width: '100%', height: '100%',
      style: 'max-height:360px',
    });

    // Defs
    const defs = el('defs');
    defs.appendChild(makeHatchPattern('hatch-comp', '#4f8ef7'));
    svg.appendChild(defs);

    // ── Escala: mapear dimensiones reales a pixels ──
    const marL = 50, marR = 80, marT = 30, marB = 40;
    const drawW = W - marL - marR;
    const drawH = H - marT - marB;

    const scaleH = drawH / data.h;
    const scaleW = drawW / data.b;
    const scale  = Math.min(scaleH, scaleW);

    const sw = data.b * scale;   // ancho en px
    const sh = data.h * scale;   // alto en px
    const sx = marL + (drawW - sw) / 2;
    const sy = marT;

    // ── Color de la zona de falla ──
    const zonaColor = {
      ductil:     '#22c55e',
      transicion: '#f59e0b',
      fragil:     '#ef4444',
    }[data.zona] || '#8892b0';

    // ── Etiqueta PREVIEW ──
    if (data.preview || !data.a) {
      svg.appendChild(text('↕ h = ' + data.h + ' cm', {
        x: sx + sw/2, y: sy + sh/2 + 5,
        fill: '#2e3350', 'font-size': '11',
        'text-anchor': 'middle', 'font-family': 'monospace',
      }));
    }

    // ── Bloque de compresión de Whitney (a) ──
    const a_px = data.a * scale;
    if (!data.preview && data.a > 0 && data.a <= data.h) {
      svg.appendChild(rect(sx, sy, sw, a_px, {
        fill: 'url(#hatch-comp)',
        stroke: '#4f8ef7',
        'stroke-width': '1.5',
      }));
      // Etiqueta "0.85f'c"
      svg.appendChild(text("0.85f'c", {
        x: sx + sw + 6,
        y: sy + a_px / 2 + 5,
        fill: '#4f8ef7',
        'font-size': '9.5',
        'font-family': 'monospace',
      }));
    }

    // ── Contorno sección ──
    svg.appendChild(rect(sx, sy, sw, sh, {
      fill: 'none',
      stroke: '#8892b0',
      'stroke-width': '2',
      rx: '2',
    }));

    // ── Eje neutro (c) ──
    if (!data.preview && data.c > 0 && data.c <= data.h) {
      const c_px = data.c * scale;
      svg.appendChild(line(sx - 8, sy + c_px, sx + sw + 8, sy + c_px, {
        stroke: '#f59e0b',
        'stroke-width': '1.5',
        'stroke-dasharray': '5,3',
      }));
      svg.appendChild(text('E.N.', {
        x: sx + sw + 10, y: sy + c_px + 4,
        fill: '#f59e0b', 'font-size': '9',
        'font-family': 'monospace',
      }));
      // Cota c
      svg.appendChild(line(sx - 22, sy, sx - 22, sy + c_px, {
        stroke: '#f59e0b', 'stroke-width': '1',
      }));
      svg.appendChild(line(sx - 26, sy, sx - 18, sy, {
        stroke: '#f59e0b', 'stroke-width': '1',
      }));
      svg.appendChild(line(sx - 26, sy + c_px, sx - 18, sy + c_px, {
        stroke: '#f59e0b', 'stroke-width': '1',
      }));
      svg.appendChild(text(`c=${data.c.toFixed(1)}`, {
        x: sx - 48, y: sy + c_px / 2 + 4,
        fill: '#f59e0b', 'font-size': '8.5',
        'font-family': 'monospace',
      }));
    }

    // ── Cota a ──
    if (!data.preview && data.a > 0) {
      const a_px = data.a * scale;
      svg.appendChild(line(sx - 8, sy, sx - 8, sy + a_px, {
        stroke: '#4f8ef7', 'stroke-width': '1.5',
      }));
      svg.appendChild(line(sx - 12, sy, sx - 4, sy, {
        stroke: '#4f8ef7', 'stroke-width': '1.5',
      }));
      svg.appendChild(line(sx - 12, sy + a_px, sx - 4, sy + a_px, {
        stroke: '#4f8ef7', 'stroke-width': '1.5',
      }));
      svg.appendChild(text(`a=${data.a.toFixed(1)}`, {
        x: sx - 46, y: sy + a_px / 2 + 4,
        fill: '#4f8ef7', 'font-size': '8.5',
        'font-family': 'monospace',
      }));
    }

    // ── Barras de acero ──
    const d_px   = data.d * scale;
    const r_barra = Math.max(4, Math.min(8, sw / 16));
    const nBarras = data.nb || 3;
    const spacing = sw / (nBarras + 1);

    for (let i = 1; i <= nBarras; i++) {
      const bx = sx + i * spacing;
      const by = sy + d_px;
      svg.appendChild(circle(bx, by, r_barra, {
        fill: zonaColor,
        stroke: '#1a1d27',
        'stroke-width': '1.5',
      }));
    }

    // ── Cota h ──
    svg.appendChild(line(sx + sw + 30, sy, sx + sw + 30, sy + sh, {
      stroke: '#8892b0', 'stroke-width': '1',
    }));
    svg.appendChild(line(sx + sw + 26, sy, sx + sw + 34, sy, {
      stroke: '#8892b0', 'stroke-width': '1',
    }));
    svg.appendChild(line(sx + sw + 26, sy + sh, sx + sw + 34, sy + sh, {
      stroke: '#8892b0', 'stroke-width': '1',
    }));
    svg.appendChild(text(`h=${data.h}`, {
      x: sx + sw + 36, y: sy + sh / 2 + 4,
      fill: '#8892b0', 'font-size': '9',
      'font-family': 'monospace',
    }));

    // ── Cota b ──
    svg.appendChild(line(sx, sy + sh + 18, sx + sw, sy + sh + 18, {
      stroke: '#8892b0', 'stroke-width': '1',
    }));
    svg.appendChild(line(sx, sy + sh + 14, sx, sy + sh + 22, {
      stroke: '#8892b0', 'stroke-width': '1',
    }));
    svg.appendChild(line(sx + sw, sy + sh + 14, sx + sw, sy + sh + 22, {
      stroke: '#8892b0', 'stroke-width': '1',
    }));
    svg.appendChild(text(`b=${data.b} cm`, {
      x: sx + sw / 2,
      y: sy + sh + 30,
      fill: '#8892b0', 'font-size': '9',
      'text-anchor': 'middle',
      'font-family': 'monospace',
    }));

    // ── Cota d ──
    svg.appendChild(line(sx + sw + 50, sy, sx + sw + 50, sy + d_px, {
      stroke: zonaColor, 'stroke-width': '1', 'stroke-dasharray': '3,2',
    }));
    svg.appendChild(text(`d=${data.d}`, {
      x: sx + sw + 52, y: sy + d_px / 2 + 4,
      fill: zonaColor, 'font-size': '8.5',
      'font-family': 'monospace',
    }));

    container.innerHTML = '';
    container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA 2 — Diagrama de deformaciones (triángulo εcu/εs)
  // ══════════════════════════════════════════════════════════
  function diagramaDeformaciones(container, data) {
    /*
      data: { d, c, h, eps_s, eps_y, zona }
    */
    const W = 260, H = 300;
    const svg = el('svg', {
      viewBox: `0 0 ${W} ${H}`,
      width: '100%', height: '100%',
      style: 'max-height:300px',
    });

    const zonaColor = {
      ductil:     '#22c55e',
      transicion: '#f59e0b',
      fragil:     '#ef4444',
    }[data.zona] || '#8892b0';

    const marL = 60, marR = 80, marT = 20, marB = 20;
    const drawH = H - marT - marB;

    const scale  = drawH / data.h;
    const sh     = data.h * scale;
    const c_px   = data.c * scale;
    const d_px   = data.d * scale;

    const midX   = marL + 30;  // eje de la sección
    const maxEps = Math.max(CALC.Ecu, Math.abs(data.eps_s)) * 1.15;
    const epsScale = 80 / maxEps; // px por unidad de deformación

    // ── Línea de la sección ──
    svg.appendChild(line(midX, marT, midX, marT + sh, {
      stroke: '#8892b0', 'stroke-width': '2',
    }));

    // ── Triángulo de deformaciones ──
    const x_ecu = midX - CALC.Ecu * epsScale;  // compresión → izquierda
    const x_eps = midX + data.eps_s * epsScale; // tracción → derecha

    // Línea de deformaciones
    svg.appendChild(line(x_ecu, marT, x_eps, marT + d_px, {
      stroke: '#e8eaf6', 'stroke-width': '2',
    }));

    // εcu (compresión, arriba)
    svg.appendChild(line(x_ecu, marT, midX, marT, {
      stroke: '#4f8ef7', 'stroke-width': '1.5',
      'stroke-dasharray': '4,2',
    }));
    svg.appendChild(text(`εcu=0.003`, {
      x: x_ecu - 4, y: marT - 6,
      fill: '#4f8ef7', 'font-size': '9',
      'text-anchor': 'end',
      'font-family': 'monospace',
    }));

    // εs (tracción, a profundidad d)
    svg.appendChild(line(midX, marT + d_px, x_eps, marT + d_px, {
      stroke: zonaColor, 'stroke-width': '1.5',
      'stroke-dasharray': '4,2',
    }));
    svg.appendChild(text(`εs=${data.eps_s.toFixed(4)}`, {
      x: x_eps + 4, y: marT + d_px + 4,
      fill: zonaColor, 'font-size': '9',
      'font-family': 'monospace',
    }));

    // eje neutro (ε=0)
    const c_y = marT + c_px;
    svg.appendChild(line(midX - 15, c_y, midX + 15, c_y, {
      stroke: '#f59e0b', 'stroke-width': '1.5',
    }));
    svg.appendChild(text('ε=0  E.N.', {
      x: midX + 18, y: c_y + 4,
      fill: '#f59e0b', 'font-size': '8.5',
      'font-family': 'monospace',
    }));

    // εy marcado en la línea
    const eps_y_px = data.eps_y * epsScale;
    const y_ey = marT + (data.c + data.eps_y / CALC.Ecu * data.c) * scale;
    // Simplificado: marcar εy en el eje horizontal
    const x_ey = midX + data.eps_y * epsScale;
    svg.appendChild(line(x_ey, marT + d_px - 6, x_ey, marT + d_px + 6, {
      stroke: '#a78bfa', 'stroke-width': '1.5',
    }));
    svg.appendChild(text(`εy=${data.eps_y.toFixed(4)}`, {
      x: x_ey, y: marT + d_px + 18,
      fill: '#a78bfa', 'font-size': '8',
      'text-anchor': 'middle',
      'font-family': 'monospace',
    }));

    // ── Punto del acero ──
    svg.appendChild(circle(x_eps, marT + d_px, 5, {
      fill: zonaColor, stroke: '#1a1d27', 'stroke-width': '1.5',
    }));

    // ── Etiquetas de cotas ──
    svg.appendChild(text(`c=${data.c.toFixed(1)} cm`, {
      x: marL - 4, y: c_y + 4,
      fill: '#f59e0b', 'font-size': '8.5',
      'text-anchor': 'end',
      'font-family': 'monospace',
    }));
    svg.appendChild(text(`d=${data.d} cm`, {
      x: marL - 4, y: marT + d_px + 4,
      fill: zonaColor, 'font-size': '8.5',
      'text-anchor': 'end',
      'font-family': 'monospace',
    }));
    svg.appendChild(text(`h=${data.h} cm`, {
      x: marL - 4, y: marT + sh + 4,
      fill: '#8892b0', 'font-size': '8.5',
      'text-anchor': 'end',
      'font-family': 'monospace',
    }));

    // ── Indicador ✅/⚠️/❌ ──
    const ok = data.eps_s >= data.eps_y;
    const icon = data.zona === 'ductil' ? '✅' : data.zona === 'transicion' ? '⚠️' : '❌';
    svg.appendChild(text(`${icon} εs ${ok ? '≥' : '<'} εy`, {
      x: W / 2, y: H - 8,
      fill: zonaColor, 'font-size': '11',
      'text-anchor': 'middle',
      'font-weight': 'bold',
    }));

    // Título
    svg.appendChild(text('DEFORMACIONES', {
      x: W / 2, y: 12,
      fill: '#4a5568', 'font-size': '8',
      'text-anchor': 'middle',
      'font-family': 'monospace',
      'letter-spacing': '1',
    }));

    container.innerHTML = '';
    container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA 3 — Diagrama de fuerzas internas (C y T)
  // ══════════════════════════════════════════════════════════
  function diagramaFuerzas(container, data) {
    /*
      data: { C, T, a, d, h, brazo, Mn, zona }
    */
    const W = 260, H = 300;
    const svg = el('svg', {
      viewBox: `0 0 ${W} ${H}`,
      width: '100%', height: '100%',
      style: 'max-height:300px',
    });

    const zonaColor = {
      ductil:     '#22c55e',
      transicion: '#f59e0b',
      fragil:     '#ef4444',
    }[data.zona] || '#8892b0';

    const marL = 40, marT = 20;
    const scale = (H - marT - 40) / data.h;
    const sh    = data.h * scale;
    const cx    = marL + 60;  // centro de la sección
    const sw    = 80;

    // ── Bloque de compresión ──
    const a_px = data.a * scale;
    svg.appendChild(rect(cx - sw/2, marT, sw, a_px, {
      fill: 'rgba(79,142,247,0.15)',
      stroke: '#4f8ef7', 'stroke-width': '1.5',
    }));

    // ── Contorno sección ──
    svg.appendChild(rect(cx - sw/2, marT, sw, sh, {
      fill: 'none',
      stroke: '#4a5568', 'stroke-width': '1.5', rx: '2',
    }));

    // ── C: flecha de compresión (→ desde izquierda) ──
    const y_C = marT + a_px / 2;
    const arrow_len = 45;
    svg.appendChild(path(`M${cx + sw/2 + arrow_len},${y_C} L${cx + sw/2 + 4},${y_C}`, {
      stroke: '#4f8ef7', 'stroke-width': '2',
      'marker-end': 'url(#arrow-blue)',
    }));
    svg.appendChild(text(`C=${data.C.toFixed(2)} tf`, {
      x: cx + sw/2 + arrow_len + 4, y: y_C + 4,
      fill: '#4f8ef7', 'font-size': '9', 'font-family': 'monospace',
    }));

    // ── T: flecha de tracción (← desde derecha) ──
    const d_px = data.d * scale;
    const y_T  = marT + d_px;
    svg.appendChild(path(`M${cx + sw/2 + arrow_len},${y_T} L${cx + sw/2 + 4},${y_T}`, {
      stroke: zonaColor, 'stroke-width': '2',
      'marker-end': `url(#arrow-zona)`,
    }));
    svg.appendChild(text(`T=${data.T.toFixed(2)} tf`, {
      x: cx + sw/2 + arrow_len + 4, y: y_T + 4,
      fill: zonaColor, 'font-size': '9', 'font-family': 'monospace',
    }));

    // ── Flecha del brazo de palanca ──
    svg.appendChild(line(cx - sw/2 - 12, y_C, cx - sw/2 - 12, y_T, {
      stroke: '#a78bfa', 'stroke-width': '1.5',
    }));
    svg.appendChild(line(cx - sw/2 - 16, y_C, cx - sw/2 - 8, y_C, {
      stroke: '#a78bfa', 'stroke-width': '1.5',
    }));
    svg.appendChild(line(cx - sw/2 - 16, y_T, cx - sw/2 - 8, y_T, {
      stroke: '#a78bfa', 'stroke-width': '1.5',
    }));
    svg.appendChild(text(`z=${data.brazo.toFixed(1)} cm`, {
      x: cx - sw/2 - 14, y: (y_C + y_T)/2 + 4,
      fill: '#a78bfa', 'font-size': '8.5',
      'text-anchor': 'end', 'font-family': 'monospace',
    }));

    // ── Mn resultante ──
    svg.appendChild(text(`Mn = C × z`, {
      x: cx, y: marT + sh + 16,
      fill: '#e8eaf6', 'font-size': '9.5',
      'text-anchor': 'middle', 'font-family': 'monospace',
    }));
    svg.appendChild(text(`= ${data.Mn.toFixed(3)} tf·m`, {
      x: cx, y: marT + sh + 30,
      fill: '#4f8ef7', 'font-size': '11',
      'text-anchor': 'middle', 'font-family': 'monospace',
      'font-weight': 'bold',
    }));

    // Defs para flechas
    const defs = el('defs');
    const mkArrow = (id, color) => {
      const m = el('marker', { id, markerWidth:'6', markerHeight:'6',
        refX:'3', refY:'3', orient:'auto' });
      m.appendChild(path('M0,0 L0,6 L6,3 z', { fill: color }));
      return m;
    };
    defs.appendChild(mkArrow('arrow-blue', '#4f8ef7'));
    defs.appendChild(mkArrow('arrow-zona', zonaColor));
    svg.insertBefore(defs, svg.firstChild);

    // Título
    svg.appendChild(text('FUERZAS INTERNAS', {
      x: cx, y: 11,
      fill: '#4a5568', 'font-size': '8',
      'text-anchor': 'middle', 'font-family': 'monospace', 'letter-spacing': '1',
    }));

    container.innerHTML = '';
    container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA M2 — Sección Doble Fila
  // ══════════════════════════════════════════════════════════
  function seccionDobleFilaFn(container, data) {
    const W = 300, H = 380;
    const svg = el('svg', { viewBox:`0 0 ${W} ${H}`, width:'100%', height:'100%', style:'max-height:360px' });
    const defs = el('defs');
    defs.appendChild(makeHatchPattern('hatch-df', '#4f8ef7'));
    svg.appendChild(defs);
    const marL=55, marR=85, marT=35, marB=45;
    const sc = Math.min((H-marT-marB)/data.h, (W-marL-marR)/data.b);
    const bW = data.b*sc, hH = data.h*sc;
    const x0 = marL, y0 = marT;
    svg.appendChild(rect(x0, y0, bW, hH, { fill:'var(--color-bg-panel)', stroke:'var(--color-accent)', 'stroke-width':'2' }));
    if (!data.preview && data.a > 0) {
      svg.appendChild(rect(x0, y0, bW, Math.min(data.a*sc, hH), { fill:'url(#hatch-df)' }));
      const cY = y0 + data.c*sc;
      svg.appendChild(line(x0-12, cY, x0+bW+12, cY, { stroke:'#f59e0b', 'stroke-width':'1.5', 'stroke-dasharray':'6,3' }));
      svg.appendChild(text('NA', { x:x0+bW+15, y:cY+4, fill:'#f59e0b', 'font-size':'8', 'font-family':'monospace' }));
    }
    const y1 = y0 + data.d1*sc, y2 = y0 + data.d2*sc;
    const r1 = Math.max(3, Math.min(6, bW/(data.nb1*5)));
    for (let i=1; i<=data.nb1; i++) svg.appendChild(circle(x0+i*bW/(data.nb1+1), y1, r1, { fill:'var(--color-acero)', stroke:'var(--text-primary)', 'stroke-width':'1' }));
    for (let i=1; i<=data.nb2; i++) svg.appendChild(circle(x0+i*bW/(data.nb2+1), y2, r1, { fill:'var(--color-acero)', stroke:'var(--text-primary)', 'stroke-width':'1' }));
    const dEq = (data.nb1*data.d1 + data.nb2*data.d2)/(data.nb1+data.nb2);
    svg.appendChild(line(x0-5, y0+dEq*sc, x0+bW+5, y0+dEq*sc, { stroke:'#22c55e', 'stroke-width':'1', 'stroke-dasharray':'4,3' }));
    svg.appendChild(line(x0, y0+hH+14, x0+bW, y0+hH+14, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(line(x0, y0+hH+9, x0, y0+hH+19, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(line(x0+bW, y0+hH+9, x0+bW, y0+hH+19, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('b='+data.b, { x:x0+bW/2, y:y0+hH+28, fill:'var(--text-muted)', 'font-size':'9', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(line(x0+bW+20, y0, x0+bW+20, y0+hH, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('h='+data.h, { x:x0+bW+40, y:y0+hH/2+4, fill:'var(--text-muted)', 'font-size':'9', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(line(x0-8, y0, x0-8, y1, { stroke:'#22c55e', 'stroke-width':'1' }));
    svg.appendChild(line(x0-13, y1, x0-3, y1, { stroke:'#22c55e', 'stroke-width':'1' }));
    svg.appendChild(text('d1', { x:x0-22, y:y1+4, fill:'#22c55e', 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(line(x0-22, y0, x0-22, y2, { stroke:'var(--color-acero)', 'stroke-width':'1' }));
    svg.appendChild(line(x0-27, y2, x0-17, y2, { stroke:'var(--color-acero)', 'stroke-width':'1' }));
    svg.appendChild(text('d2', { x:x0-38, y:y2+4, fill:'var(--color-acero)', 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(text('SECCION DOBLE FILA', { x:x0+bW/2, y:12, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  function deformacionesDobleFilaFn(container, res, inp) {
    const W=280, H=320;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:300px' });
    const zonaColor = res.zona==='ductil'?'#22c55e':res.zona==='transicion'?'#f59e0b':'#ef4444';
    const cx=W/2, marT=30, hH=H-marT-40;
    const sc=hH/inp.h, y_top=marT, y_bot=marT+hH;
    const y1=marT+res.d1*sc, y2=marT+res.d2*sc, yc=marT+res.c*sc;
    const eps_cu=0.003;
    const maxEps=Math.max(eps_cu, Math.abs(res.eps_s1||0), Math.abs(res.eps_s2||0))*1.2||0.006;
    const epsScale=90/maxEps;
    const xe_cu=cx-eps_cu*epsScale, xe_s1=cx+(res.eps_s1||0)*epsScale, xe_s2=cx+(res.eps_s2||0)*epsScale;
    svg.appendChild(line(cx, y_top, cx, y_bot, { stroke:'var(--color-border)', 'stroke-width':'1', 'stroke-dasharray':'4,3' }));
    svg.appendChild(el('polygon', { points:cx+','+y_top+' '+xe_cu+','+y_top+' '+xe_s2+','+y2, fill:zonaColor, opacity:'0.15' }));
    svg.appendChild(line(xe_cu, y_top, xe_s2, y2, { stroke:zonaColor, 'stroke-width':'2' }));
    svg.appendChild(line(xe_cu, y_top, cx, y_top, { stroke:'#4f8ef7', 'stroke-width':'2' }));
    svg.appendChild(circle(xe_cu, y_top, 4, { fill:'#4f8ef7' }));
    svg.appendChild(circle(xe_s1, y1, 4, { fill:'#22c55e' }));
    svg.appendChild(circle(xe_s2, y2, 4, { fill:zonaColor }));
    svg.appendChild(text('ecu=0.003', { x:xe_cu-5, y:y_top-8, fill:'#4f8ef7', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(text('es1='+(res.eps_s1||0).toFixed(4), { x:xe_s1+5, y:y1-8, fill:'#22c55e', 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(text('es2='+(res.eps_s2||0).toFixed(4), { x:xe_s2+5, y:y2+14, fill:zonaColor, 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(line(cx-90, yc, cx+90, yc, { stroke:'#f59e0b', 'stroke-width':'1.5', 'stroke-dasharray':'5,3' }));
    svg.appendChild(text('NA', { x:cx-95, y:yc+4, fill:'#f59e0b', 'font-size':'8', 'text-anchor':'end', 'font-family':'monospace' }));
    svg.appendChild(text('DEFORMACIONES', { x:W/2, y:12, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  function comparacionMetodosFn(container, res) {
    const W=280, H=180;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:180px' });
    const data=[
      {label:'d_eq', val:(res.d_eq||0).toFixed(2)+' cm', color:'#22c55e'},
      {label:'a', val:(res.a||0).toFixed(3)+' cm', color:'#4f8ef7'},
      {label:'Mn exacto', val:(res.Mn||0).toFixed(3)+' tf.m', color:'var(--color-acero)', hl:true},
      {label:'phiMn', val:(res.phiMn||0).toFixed(3)+' tf.m', color:'var(--color-accent)', hl:true},
    ];
    data.forEach(function(d,i){
      const y=30+i*35;
      svg.appendChild(rect(20, y-16, 240, 28, { fill:'var(--color-bg)', rx:'5', stroke:d.hl?d.color:'var(--color-border)', 'stroke-width':d.hl?'1.5':'1' }));
      svg.appendChild(text(d.label, { x:32, y:y+2, fill:'var(--text-muted)', 'font-size':'9', 'font-family':'monospace' }));
      svg.appendChild(text(d.val, { x:240, y:y+2, fill:d.color, 'font-size':'11', 'font-family':'monospace', 'font-weight':'600', 'text-anchor':'end' }));
    });
    svg.appendChild(text('RESUMEN DOBLE FILA', { x:W/2, y:14, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA M3 — Sección Doble Armadura
  // ══════════════════════════════════════════════════════════
  function seccionDobleArmaduraFn(container, res, inp) {
    const W=300, H=380;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:360px' });
    const defs = el('defs');
    defs.appendChild(makeHatchPattern('hatch-da', '#4f8ef7'));
    svg.appendChild(defs);
    const marL=55, marR=85, marT=35, marB=45;
    const sc=Math.min((H-marT-marB)/inp.h, (W-marL-marR)/inp.b);
    const bW=inp.b*sc, hH=inp.h*sc, x0=marL, y0=marT;
    svg.appendChild(rect(x0, y0, bW, hH, { fill:'var(--color-bg-panel)', stroke:'var(--color-accent)', 'stroke-width':'2' }));
    const aH=Math.min((res.a||0)*sc, hH);
    if (aH>0) svg.appendChild(rect(x0, y0, bW, aH, { fill:'url(#hatch-da)' }));
    const cY=y0+(res.c||0)*sc;
    svg.appendChild(line(x0-12, cY, x0+bW+12, cY, { stroke:'#f59e0b', 'stroke-width':'1.5', 'stroke-dasharray':'6,3' }));
    svg.appendChild(text('NA', { x:x0+bW+15, y:cY+4, fill:'#f59e0b', 'font-size':'8', 'font-family':'monospace' }));
    var dp_val = inp.dp !== undefined ? inp.dp : (inp.d_prima !== undefined ? inp.d_prima : 3);
    const yd=y0+dp_val*sc;
    const nAs_p=inp.nb_p||inp.nb_prima||2;
    for (var i=1; i<=nAs_p; i++) svg.appendChild(circle(x0+i*bW/(nAs_p+1), yd, 4, { fill:'var(--color-acero)', stroke:'#4f8ef7', 'stroke-width':'2' }));
    const yt=y0+inp.d*sc, nAs2=inp.nb||4;
    for (var i=1; i<=nAs2; i++) svg.appendChild(circle(x0+i*bW/(nAs2+1), yt, 5, { fill:'var(--color-acero)', stroke:'var(--text-primary)', 'stroke-width':'1' }));
    svg.appendChild(text("A's", { x:x0+bW+14, y:yd+4, fill:'#4f8ef7', 'font-size':'9', 'font-family':'monospace' }));
    svg.appendChild(text('As', { x:x0+bW+14, y:yt+4, fill:'var(--color-acero)', 'font-size':'9', 'font-family':'monospace' }));
    svg.appendChild(line(x0-10, y0, x0-10, yd, { stroke:'#4f8ef7', 'stroke-width':'1' }));
    svg.appendChild(line(x0-15, yd, x0-5, yd, { stroke:'#4f8ef7', 'stroke-width':'1' }));
    svg.appendChild(text("d'", { x:x0-22, y:yd+3, fill:'#4f8ef7', 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(line(x0-22, y0, x0-22, yt, { stroke:'var(--color-acero)', 'stroke-width':'1' }));
    svg.appendChild(line(x0-27, yt, x0-17, yt, { stroke:'var(--color-acero)', 'stroke-width':'1' }));
    svg.appendChild(text('d', { x:x0-33, y:yt+3, fill:'var(--color-acero)', 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(line(x0, y0+hH+14, x0+bW, y0+hH+14, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('b='+inp.b, { x:x0+bW/2, y:y0+hH+28, fill:'var(--text-muted)', 'font-size':'9', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(line(x0+bW+30, y0, x0+bW+30, y0+hH, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('h='+inp.h, { x:x0+bW+45, y:y0+hH/2+4, fill:'var(--text-muted)', 'font-size':'9', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(text('SECCION DOBLE ARMADURA', { x:x0+bW/2, y:12, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  function deformacionesDobleArmaduraFn(container, res, inp) {
    const W=280, H=300;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:300px' });
    const zonaColor=res.zona==='ductil'?'#22c55e':res.zona==='transicion'?'#f59e0b':'#ef4444';
    const cx=W/2, marT=30, hH=H-marT-40, sc=hH/inp.h, y_top=marT;
    var dp_v = inp.dp !== undefined ? inp.dp : (inp.d_prima !== undefined ? inp.d_prima : 3);
    const yd=y_top+dp_v*sc, yt=y_top+inp.d*sc, yc=y_top+(res.c||0)*sc;
    const eps_cu=0.003, eps_sp=res.eps_sp||res.eps_s_prima||0;
    const maxEps=Math.max(eps_cu, Math.abs(res.eps_s||0), Math.abs(eps_sp))*1.2||0.006;
    const epsScale=80/maxEps;
    const xe_cu=cx-eps_cu*epsScale, xe_s=cx+(res.eps_s||0)*epsScale, xe_sp=cx-Math.abs(eps_sp)*epsScale;
    svg.appendChild(el('polygon', { points:cx+','+y_top+' '+xe_cu+','+y_top+' '+xe_s+','+yt, fill:zonaColor, opacity:'0.12' }));
    svg.appendChild(line(xe_cu, y_top, xe_s, yt, { stroke:zonaColor, 'stroke-width':'2' }));
    svg.appendChild(line(cx-90, yc, cx+90, yc, { stroke:'#f59e0b', 'stroke-width':'1.5', 'stroke-dasharray':'5,3' }));
    svg.appendChild(text('NA', { x:cx-95, y:yc+4, fill:'#f59e0b', 'font-size':'8', 'text-anchor':'end', 'font-family':'monospace' }));
    svg.appendChild(circle(xe_cu, y_top, 4, { fill:'#4f8ef7' }));
    svg.appendChild(circle(xe_s, yt, 4, { fill:zonaColor }));
    svg.appendChild(circle(xe_sp, yd, 4, { fill:'#4f8ef7' }));
    svg.appendChild(text('ecu=0.003', { x:xe_cu-4, y:y_top-8, fill:'#4f8ef7', 'font-size':'7.5', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(text('es='+(res.eps_s||0).toFixed(4), { x:xe_s+5, y:yt-8, fill:zonaColor, 'font-size':'7.5', 'font-family':'monospace' }));
    svg.appendChild(text("e's="+eps_sp.toFixed(4), { x:xe_sp-5, y:yd-8, fill:'#4f8ef7', 'font-size':'7.5', 'text-anchor':'end', 'font-family':'monospace' }));
    svg.appendChild(text('DEFORMACIONES', { x:W/2, y:12, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  function descomposicionVigasFn(container, res, inp) {
    const W=280, H=200;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:200px' });
    const bx=15, vy1=35, vw=80, vh=110;
    svg.appendChild(rect(bx, vy1, vw, vh, { fill:'var(--color-bg)', stroke:'#4f8ef7', 'stroke-width':'1.5', rx:'3' }));
    svg.appendChild(text('VIGA 1', { x:bx+vw/2, y:vy1-5, fill:'#4f8ef7', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(circle(bx+vw/3, vy1+45, 4, { fill:'var(--color-acero)', stroke:'#4f8ef7', 'stroke-width':'2' }));
    svg.appendChild(circle(bx+2*vw/3, vy1+45, 4, { fill:'var(--color-acero)', stroke:'#4f8ef7', 'stroke-width':'2' }));
    svg.appendChild(circle(bx+vw/3, vy1+85, 4, { fill:'var(--color-acero)' }));
    svg.appendChild(circle(bx+2*vw/3, vy1+85, 4, { fill:'var(--color-acero)' }));
    svg.appendChild(text('Mn1='+(res.Mn1||0).toFixed(3), { x:bx+vw/2, y:vy1+vh+12, fill:'#4f8ef7', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(text('+', { x:W/2, y:H/2+5, fill:'var(--text-muted)', 'font-size':'22', 'text-anchor':'middle', 'font-weight':'300' }));
    const bx2=W-bx-vw;
    svg.appendChild(rect(bx2, vy1, vw, vh, { fill:'var(--color-bg)', stroke:'var(--color-accent)', 'stroke-width':'1.5', rx:'3' }));
    svg.appendChild(text('VIGA 2', { x:bx2+vw/2, y:vy1-5, fill:'var(--color-accent)', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    const n2=inp.nb||4, n2step=vw/(n2+1);
    for (var i=1; i<=Math.min(n2,4); i++) svg.appendChild(circle(bx2+i*n2step, vy1+85, 4, { fill:'var(--color-acero)' }));
    const aH2=Math.min(25, (res.a||0)*vh/inp.h);
    svg.appendChild(rect(bx2, vy1, vw, aH2, { fill:'#4f8ef7', opacity:'0.25' }));
    svg.appendChild(text('Mn2='+(res.Mn2||0).toFixed(3), { x:bx2+vw/2, y:vy1+vh+12, fill:'var(--color-accent)', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(text('Mn = '+(res.Mn||0).toFixed(3)+' tf.m', { x:W/2, y:H-8, fill:'var(--color-accent)', 'font-size':'10', 'text-anchor':'middle', 'font-family':'monospace', 'font-weight':'700' }));
    svg.appendChild(text('DESCOMPOSICION', { x:W/2, y:14, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA M4 — Sección Viga T
  // ══════════════════════════════════════════════════════════
  function seccionTFn(container, res, inp) {
    const W=320, H=380;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:360px' });
    const defs=el('defs');
    defs.appendChild(makeHatchPattern('hatch-t', '#4f8ef7'));
    svg.appendChild(defs);
    const bef=inp.bef||inp.b||90;
    const marL=50, marR=60, marT=35, marB=45;
    const sc=Math.min((H-marT-marB)/inp.h, (W-marL-marR)/bef);
    const bw_sc=inp.bw*sc, bef_sc=bef*sc, hf_sc=inp.hf*sc, hH=inp.h*sc;
    const x0=marL, y0=marT, xFl=(bef_sc-bw_sc)/2;
    svg.appendChild(rect(x0, y0, bef_sc, hf_sc, { fill:'var(--color-bg-panel)', stroke:'var(--color-accent)', 'stroke-width':'1.5' }));
    svg.appendChild(rect(x0+xFl, y0+hf_sc, bw_sc, hH-hf_sc, { fill:'var(--color-bg-panel)', stroke:'var(--color-accent)', 'stroke-width':'1.5' }));
    const a=res.a||0, caso=res.caso||1, aH=Math.min(a*sc, hH);
    if (caso===1) {
      if (aH>0) svg.appendChild(rect(x0, y0, bef_sc, aH, { fill:'url(#hatch-t)' }));
    } else {
      svg.appendChild(rect(x0, y0, bef_sc, hf_sc, { fill:'url(#hatch-t)' }));
      if (aH>hf_sc) svg.appendChild(rect(x0+xFl, y0+hf_sc, bw_sc, aH-hf_sc, { fill:'url(#hatch-t)' }));
    }
    const cY=y0+Math.min((res.c||0)*sc, hH-2);
    svg.appendChild(line(x0-12, cY, x0+bef_sc+12, cY, { stroke:'#f59e0b', 'stroke-width':'1.5', 'stroke-dasharray':'6,3' }));
    svg.appendChild(text('NA', { x:x0+bef_sc+15, y:cY+4, fill:'#f59e0b', 'font-size':'8', 'font-family':'monospace' }));
    const d_val=inp.d||inp.h-5, yt=y0+d_val*sc, nb=inp.nb||4;
    for (var i=1; i<=nb; i++) svg.appendChild(circle(x0+xFl+i*bw_sc/(nb+1), yt, 5, { fill:'var(--color-acero)', stroke:'var(--text-primary)', 'stroke-width':'1' }));
    svg.appendChild(line(x0, y0+hH+14, x0+bef_sc, y0+hH+14, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('bef='+bef, { x:x0+bef_sc/2, y:y0+hH+27, fill:'var(--text-muted)', 'font-size':'8.5', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(line(x0+xFl, y0+hH+34, x0+xFl+bw_sc, y0+hH+34, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('bw='+inp.bw, { x:x0+xFl+bw_sc/2, y:y0+hH+45, fill:'var(--text-muted)', 'font-size':'8.5', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(line(x0+bef_sc+20, y0, x0+bef_sc+20, y0+hH, { stroke:'var(--text-muted)', 'stroke-width':'1' }));
    svg.appendChild(text('h='+inp.h, { x:x0+bef_sc+35, y:y0+hH/2+4, fill:'var(--text-muted)', 'font-size':'8.5', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(line(x0+bef_sc+8, y0, x0+bef_sc+8, y0+hf_sc, { stroke:'#4f8ef7', 'stroke-width':'1' }));
    svg.appendChild(text('hf='+inp.hf, { x:x0+bef_sc+25, y:y0+hf_sc/2+4, fill:'#4f8ef7', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    const casoTxt=caso===1?'CASO 1: a<=hf (Rect.)':'CASO 2: a>hf (T real)';
    const casoColor=caso===1?'#22c55e':'#f59e0b';
    svg.appendChild(rect(x0, y0+hH+52, bef_sc, 18, { fill:casoColor, opacity:'0.18', rx:'4' }));
    svg.appendChild(text(casoTxt, { x:x0+bef_sc/2, y:y0+hH+64, fill:casoColor, 'font-size':'8.5', 'text-anchor':'middle', 'font-family':'monospace', 'font-weight':'700' }));
    svg.appendChild(text('SECCION T', { x:x0+bef_sc/2, y:14, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  function fuerzasVigaTFn(container, res, inp) {
    const W=280, H=300;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:300px' });
    const defs=el('defs');
    const mkA=function(id,color){ const m=el('marker',{id:id,markerWidth:'8',markerHeight:'8',refX:'4',refY:'3',orient:'auto'}); m.appendChild(path('M0,0 L0,6 L8,3 z',{fill:color})); return m; };
    defs.appendChild(mkA('a-t-c','#4f8ef7'));
    defs.appendChild(mkA('a-t-t','var(--color-traccion)'));
    svg.appendChild(defs);
    const bef_inp=inp.bef||inp.b||90, cx=W/2, marT=40, hH=200;
    const sc=hH/inp.h, y_top=marT, y_ala=y_top+inp.hf*sc;
    const d_val=inp.d||inp.h-5, yt=y_top+d_val*sc;
    const bef_px=Math.min(180, bef_inp*0.8), bw_px=inp.bw*(bef_px/bef_inp);
    svg.appendChild(rect(cx-bef_px/2, y_top, bef_px, inp.hf*sc, { fill:'var(--color-bg)', stroke:'var(--color-accent)', 'stroke-width':'1.5' }));
    svg.appendChild(rect(cx-bw_px/2, y_ala, bw_px, hH-inp.hf*sc, { fill:'var(--color-bg)', stroke:'var(--color-accent)', 'stroke-width':'1.5' }));
    const aH=Math.min((res.a||0)*sc, hH), yC=y_top+aH/2;
    svg.appendChild(line(cx, marT-25, cx, yC, { stroke:'#4f8ef7', 'stroke-width':'2.5', 'marker-end':'url(#a-t-c)' }));
    const C_tf=((res.Cf||0)+(res.Cw||0))/1000||(res.C||0)/1000;
    svg.appendChild(text('C='+C_tf.toFixed(2)+' tf', { x:cx+8, y:marT-8, fill:'#4f8ef7', 'font-size':'9', 'font-family':'monospace', 'font-weight':'600' }));
    svg.appendChild(line(cx, yt+25, cx, yt, { stroke:'var(--color-traccion)', 'stroke-width':'2.5', 'marker-end':'url(#a-t-t)' }));
    const T_tf=(res.T||res.Tf||0)/1000;
    svg.appendChild(text('T='+T_tf.toFixed(2)+' tf', { x:cx+8, y:yt+35, fill:'var(--color-traccion)', 'font-size':'9', 'font-family':'monospace', 'font-weight':'600' }));
    svg.appendChild(line(cx-30, yC, cx-30, yt, { stroke:'#a0aec0', 'stroke-width':'1', 'stroke-dasharray':'3,2' }));
    svg.appendChild(text('jd', { x:cx-45, y:(yC+yt)/2+4, fill:'#a0aec0', 'font-size':'9', 'text-anchor':'middle', 'font-family':'monospace' }));
    svg.appendChild(text('FUERZAS INTERNAS', { x:W/2, y:16, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA M5 — Barras Recomendadas
  // ══════════════════════════════════════════════════════════
  function barrasRecomendadasFn(container, opciones, As_req) {
    if (!opciones||!opciones.length) { container.innerHTML='<div style="color:var(--text-muted);padding:12px;font-size:0.8rem">Sin opciones calculadas</div>'; return; }
    const W=280, H=Math.max(180, 50+opciones.length*52);
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:'+H+'px' });
    const barW=220, barX=30;
    const firstAs=opciones[0].As_prov||opciones[0].As_real||As_req;
    const maxAs=firstAs*1.3, asScale=barW/maxAs, reqX=barX+As_req*asScale;
    opciones.forEach(function(op,i){
      const y=40+i*52, barH=24;
      const As_prov=op.As_prov||op.As_real||As_req;
      const pct=((As_prov-As_req)/As_req*100).toFixed(1);
      const provW=Math.min(As_prov*asScale, barW);
      const barStr=op.barras?op.barras.map(function(b){return b.n+'phi'+b.phi;}).join('+'):(op.nb+'phi'+op.phi);
      const nbTot=op.barras?op.barras.reduce(function(s,b){return s+b.n;},0):op.nb;
      svg.appendChild(rect(barX, y, barW, barH, { fill:'var(--color-bg)', rx:'4', stroke:i===0?'var(--color-accent)':'var(--color-border)', 'stroke-width':i===0?'1.5':'1' }));
      svg.appendChild(rect(barX, y, provW, barH, { fill:'var(--color-accent)', opacity:i===0?'0.3':'0.15', rx:'4' }));
      svg.appendChild(line(reqX, y-4, reqX, y+barH+4, { stroke:'#ef4444', 'stroke-width':'1.5', 'stroke-dasharray':'3,2' }));
      svg.appendChild(text(barStr, { x:barX+6, y:y+11, fill:i===0?'var(--color-accent)':'var(--text-primary)', 'font-size':'10', 'font-family':'monospace', 'font-weight':i===0?'700':'600' }));
      svg.appendChild(text(As_prov.toFixed(2)+' cm2', { x:barX+barW-4, y:y+11, fill:'var(--color-accent)', 'font-size':'9', 'font-family':'monospace', 'text-anchor':'end' }));
      svg.appendChild(text('+'+pct+'%', { x:barX+barW-4, y:y+22, fill:'var(--text-muted)', 'font-size':'8', 'font-family':'monospace', 'text-anchor':'end' }));
      for (var j=0; j<Math.min(nbTot,6); j++) svg.appendChild(circle(barX+10+j*14, y+barH+14, 4, { fill:'var(--color-acero)', stroke:'var(--text-muted)', 'stroke-width':'0.8' }));
    });
    svg.appendChild(text('As req='+As_req.toFixed(2)+' cm2', { x:reqX+4, y:22, fill:'#ef4444', 'font-size':'8', 'font-family':'monospace' }));
    svg.appendChild(text('OPCIONES DE ARMADO', { x:W/2, y:14, fill:'#4a5568', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  // ══════════════════════════════════════════════════════════
  // FIGURA M6 — Diagramas de Momentos / Cortantes
  // ══════════════════════════════════════════════════════════
  function diagramaMomentosFn(container, res, tipo) {
    if (!tipo) tipo='M';
    const W=400, H=260;
    const svg = el('svg', { viewBox:'0 0 '+W+' '+H, width:'100%', height:'100%', style:'max-height:260px' });
    var xs, vals;
    if (res.puntos&&res.puntos.length) {
      xs=res.puntos.map(function(p){return p.x;});
      vals=tipo==='M'?res.puntos.map(function(p){return p.M;}):res.puntos.map(function(p){return p.V;});
    } else if (res.xs) {
      xs=res.xs; vals=tipo==='M'?(res.Mdiag||[]):(res.Vdiag||[]);
    }
    if (!vals||!xs||!vals.length) { container.innerHTML='<div style="color:var(--text-muted);font-size:0.8rem;padding:12px">Sin datos</div>'; return; }
    const marL=45, marR=20, marT=30, marB=35;
    const drawW=W-marL-marR, drawH=H-marT-marB;
    const L=xs[xs.length-1];
    const maxV=Math.max.apply(null, vals.map(Math.abs))||1;
    const isM=tipo==='M', mainColor=isM?'#4f8ef7':'#f59e0b';
    const label=isM?'Momento (tf.m)':'Cortante (tf)';
    const yBase=marT+drawH/2;
    svg.appendChild(line(marL, marT, marL, marT+drawH, { stroke:'var(--color-border)', 'stroke-width':'1' }));
    svg.appendChild(line(marL, yBase, marL+drawW, yBase, { stroke:'var(--color-border)', 'stroke-width':'1' }));
    svg.appendChild(text('+'+maxV.toFixed(2), { x:marL-4, y:marT+8, fill:'var(--text-muted)', 'font-size':'7.5', 'text-anchor':'end', 'font-family':'monospace' }));
    svg.appendChild(text('-'+maxV.toFixed(2), { x:marL-4, y:marT+drawH-2, fill:'var(--text-muted)', 'font-size':'7.5', 'text-anchor':'end', 'font-family':'monospace' }));
    svg.appendChild(text('0', { x:marL-4, y:yBase+3, fill:'var(--text-muted)', 'font-size':'7', 'text-anchor':'end', 'font-family':'monospace' }));
    const pts=xs.map(function(x,i){ return (marL+x/L*drawW)+','+(yBase-vals[i]/maxV*(drawH/2)); }).join(' ');
    svg.appendChild(el('polygon', { points:(marL+','+yBase+' '+pts+' '+(marL+drawW)+','+yBase), fill:mainColor, opacity:'0.12' }));
    svg.appendChild(el('polyline', { points:pts, fill:'none', stroke:mainColor, 'stroke-width':'2', 'stroke-linejoin':'round' }));
    const absVals=vals.map(Math.abs), iMax=absVals.indexOf(Math.max.apply(null,absVals));
    const xMax=marL+xs[iMax]/L*drawW, yMax=yBase-vals[iMax]/maxV*(drawH/2);
    svg.appendChild(circle(xMax, yMax, 4, { fill:mainColor }));
    const lbl=isM?'Mmax='+res.Mmax.toFixed(3)+' tf.m':'Vmax='+res.Vmax.toFixed(3)+' tf';
    svg.appendChild(text(lbl, { x:xMax>marL+drawW*0.7?xMax-4:xMax+4, y:yMax-8, fill:mainColor, 'font-size':'9', 'font-family':'monospace', 'font-weight':'700', 'text-anchor':xMax>marL+drawW*0.7?'end':'start' }));
    svg.appendChild(text('L='+L.toFixed(2)+' m', { x:marL+drawW/2, y:H-5, fill:'var(--text-muted)', 'font-size':'8', 'text-anchor':'middle', 'font-family':'monospace' }));
    if (res.RA!==undefined) {
      svg.appendChild(text('RA='+res.RA.toFixed(2)+'tf', { x:marL, y:H-5, fill:'var(--text-muted)', 'font-size':'7.5', 'font-family':'monospace' }));
      svg.appendChild(text('RB='+res.RB.toFixed(2)+'tf', { x:marL+drawW, y:H-5, fill:'var(--text-muted)', 'font-size':'7.5', 'text-anchor':'end', 'font-family':'monospace' }));
    }
    if (res.RE!==undefined) svg.appendChild(text('RE='+res.RE.toFixed(2)+'tf', { x:marL, y:H-5, fill:'var(--text-muted)', 'font-size':'7.5', 'font-family':'monospace' }));
    svg.appendChild(text(label, { x:W/2, y:14, fill:'#4a5568', 'font-size':'9', 'text-anchor':'middle', 'font-family':'monospace', 'letter-spacing':'1' }));
    container.innerHTML=''; container.appendChild(svg);
  }

  return {
    seccionTransversal,
    diagramaDeformaciones,
    diagramaFuerzas,
    seccionDobleFilaFn,
    deformacionesDobleFilaFn,
    comparacionMetodosFn,
    seccionDobleArmaduraFn,
    deformacionesDobleArmaduraFn,
    descomposicionVigasFn,
    seccionTFn,
    fuerzasVigaTFn,
    barrasRecomendadasFn,
    diagramaMomentosFn,
  };

})();
