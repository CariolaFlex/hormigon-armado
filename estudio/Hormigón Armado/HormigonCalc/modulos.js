/* ============================================================
   HormigonCalc — Módulos 2, 3, 4, 5, 6
   Lógica de UI y renderizado para cada módulo adicional
   ============================================================ */

// ══════════════════════════════════════════════════════════
// UTILIDADES COMPARTIDAS
// ══════════════════════════════════════════════════════════
function mkField(id, label, value, unit='', type='number', step='any') {
  return `<div class="field">
    <label>${label}</label>
    <input type="${type}" id="${id}" value="${value}" step="${step}">
    ${unit ? `<span class="unit">${unit}</span>` : ''}
  </div>`;
}

function mkSelect(id, label, options, selected) {
  const opts = options.map(o =>
    `<option value="${o.v}" ${o.v==selected?'selected':''}>${o.t}</option>`
  ).join('');
  return `<div class="field"><label>${label}</label><select id="${id}">${opts}</select></div>`;
}

function sectionCard(title, html) {
  return `<div class="card"><div class="card-title">${title}</div>${html}</div>`;
}

function getFcVal(id='m-fc') {
  const s = document.getElementById(id);
  if (!s) return 200;
  if (s.value==='custom') return parseFloat(document.getElementById(id+'-custom').value)||200;
  return parseFloat(s.value);
}

function fcSelect(id='m-fc', sel=200) {
  return `<div class="field"><label><span class="sym">f'c</span> — Hormigón</label>
    <select id="${id}" onchange="onFcSelectChange('${id}')">
      <option value="170" ${sel==170?'selected':''}>G17 — 170</option>
      <option value="180" ${sel==180?'selected':''}>G18 — 180</option>
      <option value="200" ${sel==200?'selected':''}>G20 — 200</option>
      <option value="250" ${sel==250?'selected':''}>G25 — 250</option>
      <option value="300" ${sel==300?'selected':''}>G30 — 300</option>
      <option value="350" ${sel==350?'selected':''}>G35 — 350</option>
      <option value="custom">Personalizado…</option>
    </select><span class="unit">kgf/cm²</span></div>
  <div class="field" id="${id}-custom-wrap" style="display:none">
    <label>f'c personalizado</label>
    <input type="number" id="${id}-custom" value="${sel}" min="100" step="10">
    <span class="unit">kgf/cm²</span>
  </div>`;
}

function fySelect(id='m-fy', sel=4200) {
  return `<div class="field"><label><span class="sym">fy</span> — Acero</label>
    <select id="${id}">
      <option value="2800" ${sel==2800?'selected':''}>A440-280H — 2800</option>
      <option value="4200" ${sel==4200?'selected':''}>A630-420H — 4200</option>
      <option value="5000" ${sel==5000?'selected':''}>A700-500H — 5000</option>
      <option value="6300" ${sel==6300?'selected':''}>A700-630H — 6300</option>
    </select><span class="unit">kgf/cm²</span></div>`;
}

function phiSelect(id='m-phi', sel=25) {
  const phiOpts = [8,10,12,14,16,18,20,22,25,28,32];
  return `<div class="field"><label><span class="sym">ϕ</span> — Diámetro</label>
    <select id="${id}">${phiOpts.map(p=>`<option value="${p}" ${p==sel?'selected':''}>ϕ${p} mm</option>`).join('')}</select></div>`;
}

function onFcSelectChange(id) {
  const s = document.getElementById(id);
  const wrap = document.getElementById(id+'-custom-wrap');
  if (wrap) wrap.style.display = s.value==='custom' ? 'flex' : 'none';
}

// Genera bloque de resultados
function resultRow(items) {
  return `<div class="results-grid">${items.map(i=>`
    <div class="result-box ${i.hl?'highlight':''}">
      <div class="r-label">${i.label}</div>
      <div class="r-value">${i.value}</div>
      <div class="r-unit">${i.unit||''}</div>
    </div>`).join('')}</div>`;
}

// Genera badge de falla
function fallaBadge(zona, phi, eps_s, eps_y) {
  const labels = {
    ductil:'✅ Falla Dúctil — Sección controlada por tracción',
    transicion:'⚠️ Zona de Transición — φ interpolado',
    fragil:'❌ Falla Frágil — Sección sobrearmada',
  };
  return `<div class="falla-badge ${zona}">${labels[zona]||zona}</div>
  <div style="margin-top:8px;font-size:0.78rem;color:var(--text-secondary);font-family:var(--font-mono)">
    φ = <strong style="color:var(--color-accent)">${phi.toFixed(2)}</strong>
    &nbsp;·&nbsp; εs = <strong>${eps_s.toFixed(5)}</strong>
    &nbsp;·&nbsp; εy = <strong>${eps_y.toFixed(5)}</strong>
  </div>`;
}

// Genera paso colapsable
function mkStep(num, title, result, planteamiento, ecuacion, concl) {
  const resClass = concl ? (concl.tipo==='ok'?'val-res':concl.tipo==='warn'?'val-warn':'val-err') : '';
  return `<div class="step">
    <div class="step-header" onclick="this.parentElement.classList.toggle('open')">
      <div class="step-number">${num}</div>
      <div class="step-title">${title}</div>
      <div class="step-result-preview ${resClass}">${result}</div>
      <div class="step-chevron">▼</div>
    </div>
    <div class="step-body">
      <div class="step-planteamiento">${planteamiento.replace(/\n/g,'<br>')}</div>
      <div class="step-ecuacion">${fmtEq(ecuacion)}</div>
      ${concl?`<div class="step-conclusion ${concl.tipo}">${concl.texto}</div>`:''}
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════════
// MÓDULO 2 — DOBLE FILA
// ══════════════════════════════════════════════════════════
function buildM2() {
  return `
  <div class="module-header">
    <h1>Análisis — Viga con Doble Fila de Acero</h1>
    <p>Determina Mn con dos capas de acero · Método exacto (por fila) y aproximado (d equivalente)</p>
  </div>
  <div class="module-body">
    <div class="panel-left">
      ${sectionCard('📐 Geometría', `<div class="form-grid">
        ${mkField('m2-b','<span class="sym">b</span> — Ancho','20','cm')}
        ${mkField('m2-h','<span class="sym">h</span> — Altura total','50','cm')}
        ${mkField('m2-r','<span class="sym">r</span> — Recub. al centroide fila inf.','5','cm')}
        ${mkField('m2-Mu','<span class="sym">Mu</span> — Momento último <small>(opc.)</small>','','tf·m')}
      </div>`)}
      ${sectionCard('🧱 Materiales', `<div class="form-grid">
        ${fcSelect('m2-fc',200)} ${fySelect('m2-fy',4200)}
      </div>`)}
      ${sectionCard('🔩 Armadura — Fila Inferior (más alejada del E.N.)', `<div class="form-grid">
        ${mkField('m2-nb1','<span class="sym">nb</span> — N° barras','3','')}
        ${phiSelect('m2-phi1',18)}
      </div>`)}
      ${sectionCard('🔩 Armadura — Fila Superior (más cercana al E.N.)', `<div class="form-grid">
        ${mkField('m2-nb2','<span class="sym">nb</span> — N° barras','3','')}
        ${phiSelect('m2-phi2',18)}
        ${mkField('m2-sep','Sep. vertical libre entre filas','25','mm')}
      </div>`)}
      <button class="btn-calc" onclick="calcM2()">⚡ Calcular</button>
      <button class="btn-sec" onclick="loadEj02()">📋 Cargar EJ02</button>
    </div>
    <div class="panel-right" id="m2-right">
      <div class="viz-card">
        <div class="viz-title">🏗 Visualizador — Doble Fila</div>
        <div class="viz-row">
          <div class="viz-panel"><div class="viz-panel-title">Sección transversal</div>
            <div class="svg-wrap" id="m2-svg-sec"><div class="viz-placeholder"><div style="font-size:2rem">⬜</div><div>Ingresa datos</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Deformaciones por fila</div>
            <div class="svg-wrap" id="m2-svg-def"><div class="viz-placeholder"><div style="font-size:2rem">📐</div><div>Calcula para ver εs por fila</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Comparación de métodos</div>
            <div class="svg-wrap" id="m2-svg-comp"><div class="viz-placeholder"><div style="font-size:2rem">📊</div><div>Calcula para comparar</div></div></div>
          </div>
        </div>
      </div>
      <div id="m2-resultado" style="display:none;flex-direction:column;gap:16px"></div>
    </div>
  </div>`;
}

function loadEj02() {
  document.getElementById('m2-b').value=20;
  document.getElementById('m2-h').value=50;
  document.getElementById('m2-r').value=5;
  document.getElementById('m2-fc').value=200;
  document.getElementById('m2-fy').value=4200;
  document.getElementById('m2-nb1').value=3;
  document.getElementById('m2-phi1').value=18;
  document.getElementById('m2-nb2').value=3;
  document.getElementById('m2-phi2').value=18;
  document.getElementById('m2-sep').value=25;
  calcM2();
}

function calcM2() {
  const inp = {
    b: +v('m2-b'), h: +v('m2-h'), r_inf: +v('m2-r'),
    fc: getFcVal('m2-fc'), fy: +v('m2-fy'),
    nb1: +v('m2-nb1'), phi1_mm: +v('m2-phi1'),
    nb2: +v('m2-nb2'), phi2_mm: +v('m2-phi2'),
    sep_vert_mm: +v('m2-sep'),
    Mu: +v('m2-Mu') || null,
  };
  if (!inp.b||!inp.h||!inp.fc||!inp.fy) return;
  const res = CALC.analizarDobleFila(inp);
  renderM2(res, inp);
}

function renderM2(res, inp) {
  // Sección con 2 filas
  SVG.seccionDobleFilaFn(document.getElementById('m2-svg-sec'), {
    b:inp.b, h:inp.h, d1:res.d1, d2:res.d2, nb:inp.nb1+inp.nb2,
    nb1:inp.nb1, nb2:inp.nb2, a:res.a, c:res.c, zona:res.zona,
  });
  SVG.deformacionesDobleFilaFn(document.getElementById('m2-svg-def'), res, inp);
  SVG.comparacionMetodosFn(document.getElementById('m2-svg-comp'), res);

  const rc = document.getElementById('m2-resultado');
  rc.style.display='flex';
  rc.innerHTML = `
    <div class="card"><div class="card-title">⚡ Modo de falla</div>
      ${fallaBadge(res.zona, res.phi, res.eps_s2, res.eps_y)}
    </div>
    <div class="card"><div class="card-title">Resultados</div>
    ${resultRow([
      {label:'As total', value:res.As.toFixed(3), unit:'cm²'},
      {label:'As fila inf', value:res.As1.toFixed(3), unit:'cm²'},
      {label:'As fila sup', value:res.As2.toFixed(3), unit:'cm²'},
      {label:'d₂ (inf)', value:res.d2.toFixed(2), unit:'cm'},
      {label:'d₁ (sup)', value:res.d1.toFixed(2), unit:'cm'},
      {label:'d_eq', value:res.d_eq.toFixed(3), unit:'cm'},
      {label:'a', value:res.a.toFixed(3), unit:'cm'},
      {label:'c', value:res.c.toFixed(3), unit:'cm'},
      {label:'εs fila inf', value:res.eps_s1.toFixed(5), unit: res.fluye1?'✅':'❌'},
      {label:'εs fila sup', value:res.eps_s2.toFixed(5), unit: res.fluye2?'✅':'❌'},
      {label:'Mn exacto', value:res.Mn.toFixed(4), unit:'tf·m', hl:true},
      {label:'Mn aprox.', value:res.Mn_aprox.toFixed(4), unit:'tf·m'},
      {label:'φMn', value:res.phiMn.toFixed(4), unit:'tf·m', hl:true},
      ...(inp.Mu?[{label:res.verifica?'✅ φMn≥Mu':'❌ φMn<Mu',value:(res.phiMn/inp.Mu).toFixed(3),unit:'ratio',hl:true}]:[]),
    ])}
    </div>
    <div class="card"><div class="card-title">Proceso paso a paso</div>
      <div class="steps-container">${buildStepsM2(res,inp)}</div>
    </div>`;
}

function buildStepsM2(res, inp) {
  const {b,fc,fy} = inp;
  const phi_cm1 = inp.phi1_mm/10, phi_cm2 = inp.phi2_mm/10;
  const sep = inp.sep_vert_mm/10;
  let html = '';
  html += mkStep(1,'Áreas de acero por fila',
    `As1=${res.As1.toFixed(3)} cm², As2=${res.As2.toFixed(3)} cm²`,
    `Fila inferior (As1): ${inp.nb1} barras ϕ${inp.phi1_mm}mm\nFila superior (As2): ${inp.nb2} barras ϕ${inp.phi2_mm}mm`,
    `As1 = ${inp.nb1} × π×${phi_cm1}²/4 = ${res.As1.toFixed(3)} cm²\nAs2 = ${inp.nb2} × π×${phi_cm2}²/4 = ${res.As2.toFixed(3)} cm²\nAs_total = ${res.As.toFixed(3)} cm²`,
    {tipo:'ok',texto:`As total = ${res.As.toFixed(3)} cm²`});
  html += mkStep(2,'Peraltes efectivos d1 y d2',
    `d2=${res.d2.toFixed(2)} cm, d1=${res.d1.toFixed(2)} cm`,
    `d2 = h − r (centroide fila inferior)\nd1 = d2 − sep_vert − ϕ_fila_inf (centroide fila superior)\nd_eq = (As1·d2 + As2·d1)/As_total (centroide ponderado)`,
    `d2 = ${inp.h} − ${inp.r_inf} = ${res.d2.toFixed(2)} cm\nd1 = ${res.d2.toFixed(2)} − ${sep.toFixed(1)} − ${phi_cm1} = ${res.d1.toFixed(2)} cm\nd_eq = (${res.As1.toFixed(3)}×${res.d2.toFixed(2)} + ${res.As2.toFixed(3)}×${res.d1.toFixed(2)}) / ${res.As.toFixed(3)}\nd_eq = ${res.d_eq.toFixed(3)} cm`,
    {tipo:'ok',texto:`d_eq = ${res.d_eq.toFixed(3)} cm`});
  html += mkStep(3,'Profundidad del bloque a y eje neutro c',
    `a=${res.a.toFixed(3)} cm, c=${res.c.toFixed(3)} cm`,
    'Se usa As_total para calcular a (equilibrio C = T total). Ambas filas fluyen → fs = fy.',
    `a = As × fy / (0,85 × f'c × b)\na = ${res.As.toFixed(3)} × ${fy} / (0,85 × ${fc} × ${b})\na = ${res.a.toFixed(3)} cm\nc = a/β = ${res.a.toFixed(3)}/${res.beta.toFixed(2)} = ${res.c.toFixed(3)} cm`,
    {tipo:'ok',texto:`a = ${res.a.toFixed(3)} cm, c = ${res.c.toFixed(3)} cm`});
  html += mkStep(4,'Verificación de fluencia — fila por fila',
    `Fila inf: ${res.fluye1?'✅':'❌'} | Fila sup: ${res.fluye2?'✅':'❌'}`,
    `La fila superior (As2) está más cerca del eje neutro → menor deformación → es la más crítica.\nSi alguna no fluye, es siempre As2. Verificar siempre la fila más cercana al eje neutro.`,
    `εy = fy/Es = ${fy}/210.000 = ${res.eps_y.toFixed(5)}\n\nFila INFERIOR (As1, más alejada del E.N.):\nεs1 = 0,003 × (${res.d2.toFixed(2)} − ${res.c.toFixed(3)}) / ${res.c.toFixed(3)} = ${res.eps_s1.toFixed(5)}\n${res.fluye1?'✅':'❌'} εs1 ${res.fluye1?'≥':'<'} εy\n\nFila SUPERIOR (As2, más cercana al E.N.):\nεs2 = 0,003 × (${res.d1.toFixed(2)} − ${res.c.toFixed(3)}) / ${res.c.toFixed(3)} = ${res.eps_s2.toFixed(5)}\n${res.fluye2?'✅':'❌'} εs2 ${res.fluye2?'≥':'<'} εy`,
    {tipo:res.fluye1&&res.fluye2?'ok':'err', texto:`Ambas filas ${res.fluye1&&res.fluye2?'fluyen ✅':'— revisar ❌'}`});
  html += mkStep(5,'Mn exacto (por fila separada)',
    `Mn = ${res.Mn.toFixed(4)} tf·m`,
    'Se calcula el momento de cada fuerza de tracción respecto al centro del bloque de compresión.',
    `Mn = As1·fy·(d2−a/2) + As2·fy·(d1−a/2)\nMn = ${res.As1.toFixed(3)}×${fy}×(${res.d2.toFixed(2)}−${(res.a/2).toFixed(3)}) + ${res.As2.toFixed(3)}×${fy}×(${res.d1.toFixed(2)}−${(res.a/2).toFixed(3)})\nMn = ${res.Mn.toFixed(4)} tf·m\n\nMn aprox. (con d_eq):\nMn_aprox = ${res.Mn_aprox.toFixed(4)} tf·m\nDiferencia: ${Math.abs((res.Mn-res.Mn_aprox)/res.Mn*100).toFixed(2)}%`,
    {tipo:'ok',texto:`Mn = ${res.Mn.toFixed(4)} tf·m | φMn = ${res.phiMn.toFixed(4)} tf·m`});
  return html;
}

// ══════════════════════════════════════════════════════════
// MÓDULO 3 — DOBLE ARMADURA
// ══════════════════════════════════════════════════════════
function buildM3() {
  return `
  <div class="module-header">
    <h1>Análisis — Viga con Doble Armadura</h1>
    <p>Descompone la sección en Viga 1 (par de fuerzas A's) + Viga 2 (bloque de Whitney) · Verifica fluencia de A's</p>
  </div>
  <div class="module-body">
    <div class="panel-left">
      ${sectionCard('📐 Geometría', `<div class="form-grid">
        ${mkField('m3-b','<span class="sym">b</span> — Ancho','35','cm')}
        ${mkField('m3-h','<span class="sym">h</span> — Altura total','70','cm')}
        ${mkField('m3-d','<span class="sym">d</span> — Peralte efectivo','65','cm')}
        ${mkField('m3-dp','<span class="sym">d\'</span> — Recub. acero compresión','3','cm')}
        ${mkField('m3-Mu','<span class="sym">Mu</span> <small>(opc.)</small>','','tf·m')}
      </div>`)}
      ${sectionCard('🧱 Materiales', `<div class="form-grid">
        ${fcSelect('m3-fc',180)} ${fySelect('m3-fy',4200)}
      </div>`)}
      ${sectionCard('🔩 Acero de Tracción (As)', `<div class="form-grid">
        ${mkField('m3-nb','<span class="sym">nb</span> — N° barras','5','')}
        ${phiSelect('m3-phi',22)}
      </div>`)}
      ${sectionCard("🔵 Acero de Compresión (A's)", `<div class="form-grid">
        ${mkField('m3-nbp','<span class="sym">nb</span> — N° barras','2','')}
        ${phiSelect('m3-phip',10)}
      </div>`)}
      <button class="btn-calc" onclick="calcM3()">⚡ Calcular</button>
      <button class="btn-sec" onclick="loadEj03()">📋 Cargar EJ03</button>
    </div>
    <div class="panel-right">
      <div class="viz-card">
        <div class="viz-title">🏗 Visualizador — Doble Armadura</div>
        <div class="viz-row">
          <div class="viz-panel"><div class="viz-panel-title">Sección transversal</div>
            <div class="svg-wrap" id="m3-svg-sec"><div class="viz-placeholder"><div style="font-size:2rem">⬜</div><div>Ingresa datos</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Diagrama de deformaciones</div>
            <div class="svg-wrap" id="m3-svg-def"><div class="viz-placeholder"><div style="font-size:2rem">📐</div><div>Calcula para ver ε's y εs</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Descomposición Viga 1 + 2</div>
            <div class="svg-wrap" id="m3-svg-vigs"><div class="viz-placeholder"><div style="font-size:2rem">➕</div><div>Calcula para ver descomposición</div></div></div>
          </div>
        </div>
      </div>
      <div id="m3-resultado" style="display:none;flex-direction:column;gap:16px"></div>
    </div>
  </div>`;
}

function loadEj03() {
  document.getElementById('m3-b').value=35; document.getElementById('m3-h').value=70;
  document.getElementById('m3-d').value=65; document.getElementById('m3-dp').value=3;
  document.getElementById('m3-fc').value=180; document.getElementById('m3-fy').value=4200;
  document.getElementById('m3-nb').value=5; document.getElementById('m3-phi').value=22;
  document.getElementById('m3-nbp').value=2; document.getElementById('m3-phip').value=10;
  calcM3();
}

function calcM3() {
  const inp = {
    b:+v('m3-b'), h:+v('m3-h'), d:+v('m3-d'), d_prima:+v('m3-dp'),
    fc:getFcVal('m3-fc'), fy:+v('m3-fy'),
    nb:+v('m3-nb'), phi_mm:+v('m3-phi'),
    nb_prima:+v('m3-nbp'), phi_prima_mm:+v('m3-phip'),
    Mu:+v('m3-Mu')||null,
  };
  const res = CALC.analizarDobleArmadura(inp);
  renderM3(res, inp);
}

function renderM3(res, inp) {
  SVG.seccionDobleArmaduraFn(document.getElementById('m3-svg-sec'), res, inp);
  SVG.deformacionesDobleArmaduraFn(document.getElementById('m3-svg-def'), res, inp);
  SVG.descomposicionVigasFn(document.getElementById('m3-svg-vigs'), res, inp);
  const rc = document.getElementById('m3-resultado');
  rc.style.display='flex';
  rc.innerHTML = `
    <div class="card"><div class="card-title">⚡ Modo de falla</div>
      ${fallaBadge(res.zona, res.phi, res.eps_s, res.eps_y)}
      <div style="margin-top:10px;padding:8px 12px;border-radius:6px;font-size:0.8rem;
        background:${res.fluye_prima?'rgba(34,197,94,0.08)':'rgba(239,68,68,0.08)'};
        border:1px solid ${res.fluye_prima?'rgba(34,197,94,0.3)':'rgba(239,68,68,0.3)'};
        color:${res.fluye_prima?'var(--color-ductil)':'var(--color-fragil)'}">
        Acero de compresión A's: ${res.fluye_prima?'✅ Fluye (ε\'s = '+res.eps_s_prima.toFixed(5)+')':'❌ No fluye (f\'s = '+res.fs_prima.toFixed(0)+' kgf/cm²)'}
      </div>
    </div>
    <div class="card"><div class="card-title">Resultados</div>
    ${resultRow([
      {label:'As (tracción)', value:res.As.toFixed(3), unit:'cm²'},
      {label:"A's (compres.)", value:res.As_prima.toFixed(3), unit:'cm²'},
      {label:'a', value:res.a.toFixed(3), unit:'cm'},
      {label:'c', value:res.c.toFixed(3), unit:'cm'},
      {label:'εs (tracción)', value:res.eps_s.toFixed(5), unit:res.fluye_s?'✅':'❌'},
      {label:"ε's (compres.)", value:res.eps_s_prima.toFixed(5), unit:res.fluye_prima?'✅':'❌'},
      {label:'Mn1 (par A\'s)', value:res.Mn1.toFixed(4), unit:'tf·m'},
      {label:'Mn2 (bloque)', value:res.Mn2.toFixed(4), unit:'tf·m'},
      {label:'Mn total', value:res.Mn.toFixed(4), unit:'tf·m', hl:true},
      {label:'φMn', value:res.phiMn.toFixed(4), unit:'tf·m', hl:true},
      ...(inp.Mu?[{label:res.verifica?'✅ φMn≥Mu':'❌ φMn<Mu',value:(res.phiMn/inp.Mu).toFixed(3),unit:'ratio',hl:true}]:[]),
    ])}
    </div>
    <div class="card"><div class="card-title">Proceso paso a paso</div>
      <div class="steps-container">${buildStepsM3(res,inp)}</div>
    </div>`;
}

function buildStepsM3(res, inp) {
  const {b,d,fc,fy,d_prima} = inp;
  let html='';
  html += mkStep(1,"Áreas As y A's",`As=${res.As.toFixed(3)}, A's=${res.As_prima.toFixed(3)} cm²`,
    `As: ${inp.nb} barras ϕ${inp.phi_mm}mm (tracción)\nA's: ${inp.nb_prima} barras ϕ${inp.phi_prima_mm}mm (compresión)`,
    `As  = ${inp.nb} × π×${(inp.phi_mm/10)}²/4 = ${res.As.toFixed(3)} cm²\nA's = ${inp.nb_prima} × π×${(inp.phi_prima_mm/10)}²/4 = ${res.As_prima.toFixed(3)} cm²`,
    {tipo:'ok',texto:`As = ${res.As.toFixed(3)} cm², A's = ${res.As_prima.toFixed(3)} cm²`});
  html += mkStep(2,'Descomposición en Viga 1 + Viga 2',`As1=${res.As_prima.toFixed(3)}, As2=${res.As.toFixed(3)}`,
    `Viga 1: par de fuerzas entre A's (compresión) y As1=A's (tracción equivalente).\nViga 2: el resto As2 = As − As1 trabaja con el bloque de Whitney.\nAs1 = A's (para que T1 = C's → equilibrio del par)`,
    `As1 = A's = ${res.As_prima.toFixed(3)} cm²\nAs2 = As − As1 = ${res.As.toFixed(3)} − ${res.As_prima.toFixed(3)} = ${res.As.toFixed(3)} cm²`,
    {tipo:'ok',texto:'Descomposición correcta'});
  html += mkStep(3,'Bloque de compresión (Viga 2)',`a=${res.a.toFixed(3)} cm, c=${res.c.toFixed(3)} cm`,
    `El bloque de Whitney se calcula solo con As2 (la parte que equilibra el hormigón).`,
    `a = As2×fy / (0,85×f'c×b)\na = ${res.As.toFixed(3)}×${fy} / (0,85×${fc}×${b})\na = ${res.a.toFixed(3)} cm\nc = a/β = ${res.a.toFixed(3)}/${res.beta.toFixed(2)} = ${res.c.toFixed(3)} cm`,
    {tipo:'ok',texto:`a = ${res.a.toFixed(3)} cm`});
  html += mkStep(4,"Verificación fluencia de A's",`ε's = ${res.eps_s_prima.toFixed(5)} ${res.fluye_prima?'≥':'<'} εy ✅`,
    `A's está en la zona comprimida (d' = ${d_prima} cm < c = ${res.c.toFixed(3)} cm).\nPor similitud de triángulos: ε's = εcu×(c−d')/c`,
    `ε's = 0,003 × (${res.c.toFixed(3)} − ${d_prima}) / ${res.c.toFixed(3)}\nε's = ${res.eps_s_prima.toFixed(5)}\nεy  = ${res.eps_y.toFixed(5)}\n→ A's ${res.fluye_prima?'SÍ FLUYE ✅ → fs\' = fy = '+fy:'NO FLUYE ❌ → fs\' = Es×ε\'s = '+res.fs_prima.toFixed(0)+' kgf/cm²'}`,
    {tipo:res.fluye_prima?'ok':'warn',texto:`f's = ${res.fs_prima.toFixed(0)} kgf/cm²`});
  html += mkStep(5,'Mn1 — Viga 1 (par de fuerzas)',`Mn1 = ${res.Mn1.toFixed(4)} tf·m`,
    'El momento del par es la fuerza multiplicada por el brazo entre A\'s y As1, que es (d − d\').',
    `Mn1 = A's × f's × (d − d')\nMn1 = ${res.As_prima.toFixed(3)} × ${res.fs_prima.toFixed(0)} × (${d} − ${d_prima})\nMn1 = ${res.Mn1.toFixed(4)} tf·m`,
    {tipo:'ok',texto:`Mn1 = ${res.Mn1.toFixed(4)} tf·m`});
  html += mkStep(6,'Mn2 — Viga 2 (bloque Whitney)',`Mn2 = ${res.Mn2.toFixed(4)} tf·m`,
    'La Viga 2 es una sección rectangular simple con As2 y el bloque de compresión.',
    `Mn2 = As2 × fy × (d − a/2)\nMn2 = ${res.As.toFixed(3)} × ${fy} × (${d} − ${(res.a/2).toFixed(3)})\nMn2 = ${res.Mn2.toFixed(4)} tf·m`,
    {tipo:'ok',texto:`Mn2 = ${res.Mn2.toFixed(4)} tf·m`});
  html += mkStep(7,'Mn total y φMn',`Mn = ${res.Mn.toFixed(4)} tf·m | φMn = ${res.phiMn.toFixed(4)} tf·m`,
    'El Mn total es la suma de ambas vigas virtuales.',
    `Mn = Mn1 + Mn2\nMn = ${res.Mn1.toFixed(4)} + ${res.Mn2.toFixed(4)}\nMn = ${res.Mn.toFixed(4)} tf·m\nφMn = ${res.phi.toFixed(2)} × ${res.Mn.toFixed(4)} = ${res.phiMn.toFixed(4)} tf·m`,
    {tipo:'ok',texto:`φMn = ${res.phiMn.toFixed(4)} tf·m`});
  return html;
}

// ══════════════════════════════════════════════════════════
// MÓDULO 4 — VIGA T
// ══════════════════════════════════════════════════════════
function buildM4() {
  return `
  <div class="module-header">
    <h1>Análisis — Viga T</h1>
    <p>Detecta automáticamente si el bloque está dentro del ala (a ≤ hf) o la cruza (a > hf)</p>
  </div>
  <div class="module-body">
    <div class="panel-left">
      ${sectionCard('📐 Geometría de la Sección T', `<div class="form-grid">
        ${mkField('m4-bw','<span class="sym">bw</span> — Ancho alma','30','cm')}
        ${mkField('m4-b','<span class="sym">b</span> — Ancho ala efectivo','90','cm')}
        ${mkField('m4-hf','<span class="sym">hf</span> — Espesor ala','12','cm')}
        ${mkField('m4-d','<span class="sym">d</span> — Peralte efectivo','55','cm')}
        ${mkField('m4-h','<span class="sym">h</span> — Altura total','60','cm')}
        ${mkField('m4-Mu','<span class="sym">Mu</span> <small>(opc.)</small>','','tf·m')}
      </div>`)}
      ${sectionCard('🧱 Materiales', `<div class="form-grid">
        ${fcSelect('m4-fc',200)} ${fySelect('m4-fy',4200)}
      </div>`)}
      ${sectionCard('🔩 Armadura de Tracción (As)', `<div class="form-grid">
        ${mkField('m4-nb','<span class="sym">nb</span> — N° barras','6','')}
        ${phiSelect('m4-phi',22)}
      </div>`)}
      <button class="btn-calc" onclick="calcM4()">⚡ Calcular</button>
    </div>
    <div class="panel-right">
      <div class="viz-card">
        <div class="viz-title">🏗 Visualizador — Viga T</div>
        <div class="viz-row">
          <div class="viz-panel"><div class="viz-panel-title">Sección transversal T</div>
            <div class="svg-wrap" id="m4-svg-sec"><div class="viz-placeholder"><div style="font-size:2rem">⊤</div><div>Ingresa datos</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Diagrama deformaciones</div>
            <div class="svg-wrap" id="m4-svg-def"><div class="viz-placeholder"><div style="font-size:2rem">📐</div><div>Calcula</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Fuerzas internas</div>
            <div class="svg-wrap" id="m4-svg-fz"><div class="viz-placeholder"><div style="font-size:2rem">⚡</div><div>Calcula</div></div></div>
          </div>
        </div>
      </div>
      <div id="m4-resultado" style="display:none;flex-direction:column;gap:16px"></div>
    </div>
  </div>`;
}

function calcM4() {
  const inp = {
    bw:+v('m4-bw'), b:+v('m4-b'), hf:+v('m4-hf'),
    d:+v('m4-d'), h:+v('m4-h'),
    fc:getFcVal('m4-fc'), fy:+v('m4-fy'),
    nb:+v('m4-nb'), phi_mm:+v('m4-phi'),
    Mu:+v('m4-Mu')||null,
  };
  const res = CALC.analizarVigaT(inp);
  renderM4(res, inp);
}

function renderM4(res, inp) {
  SVG.seccionTFn(document.getElementById('m4-svg-sec'), res, inp);
  SVG.diagramaDeformaciones(document.getElementById('m4-svg-def'),{
    d:inp.d, c:res.c, h:inp.h, eps_s:res.eps_s, eps_y:res.eps_y, zona:res.zona,
  });
  SVG.fuerzasVigaTFn(document.getElementById('m4-svg-fz'), res, inp);
  const rc = document.getElementById('m4-resultado');
  rc.style.display='flex';
  const casoTxt = res.caso===1
    ? `✅ CASO 1: a = ${res.a.toFixed(2)} cm ≤ hf = ${inp.hf} cm → Bloque dentro del ala → Analizar como sección rectangular de ancho b`
    : `⚠️ CASO 2: a_supuesto > hf = ${inp.hf} cm → Bloque cruza el ala → Usar fórmula con voladizos del ala`;
  const casoTipo = res.caso===1?'ok':'warn';
  rc.innerHTML = `
    <div class="card"><div class="card-title">🔍 Detección del caso</div>
      <div class="step-conclusion ${casoTipo}" style="margin:0">${casoTxt}</div>
    </div>
    <div class="card"><div class="card-title">⚡ Modo de falla</div>
      ${fallaBadge(res.zona, res.phi, res.eps_s, res.eps_y)}
    </div>
    <div class="card"><div class="card-title">Resultados</div>
    ${resultRow([
      {label:'As', value:res.As.toFixed(3), unit:'cm²'},
      {label:'Caso', value:`Caso ${res.caso}`, unit:res.caso===1?'a≤hf':'a>hf'},
      {label:'a', value:res.a.toFixed(3), unit:'cm'},
      {label:'c', value:res.c.toFixed(3), unit:'cm'},
      {label:'εs', value:res.eps_s.toFixed(5), unit:res.eps_s>=res.eps_y?'✅':'❌'},
      {label:'C voladizos', value:res.Cf.toFixed(3), unit:'tf'},
      {label:'C alma', value:res.Cw.toFixed(3), unit:'tf'},
      {label:'Mn', value:res.Mn.toFixed(4), unit:'tf·m', hl:true},
      {label:'φMn', value:res.phiMn.toFixed(4), unit:'tf·m', hl:true},
      ...(inp.Mu?[{label:res.verifica?'✅ φMn≥Mu':'❌ φMn<Mu',value:(res.phiMn/inp.Mu).toFixed(3),unit:'ratio',hl:true}]:[]),
    ])}
    </div>
    <div class="card"><div class="card-title">Proceso paso a paso</div>
      <div class="steps-container">${buildStepsM4(res,inp)}</div>
    </div>`;
}

function buildStepsM4(res, inp) {
  const {b,bw,hf,d,fc,fy} = inp;
  let html='';
  html += mkStep(1,'Área de acero As',`As = ${res.As.toFixed(3)} cm²`,
    `${inp.nb} barras ϕ${inp.phi_mm}mm`,
    `As = ${inp.nb} × π×${(inp.phi_mm/10)}²/4 = ${res.As.toFixed(3)} cm²`,
    {tipo:'ok',texto:`As = ${res.As.toFixed(3)} cm²`});
  const a_supu = res.As * fy / (0.85 * fc * b);
  html += mkStep(2,'Verificación del caso (a ≤ hf ?)',`CASO ${res.caso}`,
    'Se asume primero que el bloque está dentro del ala (sección rectangular de ancho b efectivo).\nSi a_supuesto ≤ hf → Caso 1 (sencillo).\nSi a_supuesto > hf → Caso 2 (hay que considerar voladizos del ala).',
    `a_supuesto = As×fy / (0,85×f'c×b)\na_supuesto = ${res.As.toFixed(3)}×${fy} / (0,85×${fc}×${b})\na_supuesto = ${a_supu.toFixed(3)} cm\n\nhf = ${hf} cm\n\na_supuesto = ${a_supu.toFixed(3)} ${a_supu<=hf?'≤':'>'} hf = ${hf} cm\n→ CASO ${res.caso}: ${res.caso===1?'bloque dentro del ala':'bloque cruza el ala'}`,
    {tipo:res.caso===1?'ok':'warn',texto:`Caso ${res.caso}`});
  if (res.caso===1) {
    html += mkStep(3,'Mn — Caso 1 (rectangular de ancho b)',`Mn = ${res.Mn.toFixed(4)} tf·m`,
      'El bloque de compresión está completamente dentro del ala. Se analiza como viga rectangular de ancho b.',
      `a = ${res.a.toFixed(3)} cm ≤ hf = ${hf} cm  ✅\nc = a/β = ${res.c.toFixed(3)} cm\nεs = 0,003×(${d}−${res.c.toFixed(3)})/${res.c.toFixed(3)} = ${res.eps_s.toFixed(5)} ≥ εy ✅\nMn = As×fy×(d−a/2) = ${res.As.toFixed(3)}×${fy}×(${d}−${(res.a/2).toFixed(3)}) = ${res.Mn.toFixed(4)} tf·m`,
      {tipo:'ok',texto:`Mn = ${res.Mn.toFixed(4)} tf·m | φMn = ${res.phiMn.toFixed(4)} tf·m`});
  } else {
    const As_f = 0.85*fc*hf*(b-bw)/fy;
    const As_w = res.As - As_f;
    html += mkStep(3,'Caso 2 — Separar en voladizos del ala + alma',`Mn = ${res.Mn.toFixed(4)} tf·m`,
      'El bloque cruza el ala → separar compresión en: voladizos del ala (b−bw)×hf y bloque en el alma bw×a.',
      `As_f = 0,85×f'c×hf×(b−bw) / fy\nAs_f = 0,85×${fc}×${hf}×(${b}−${bw}) / ${fy} = ${As_f.toFixed(3)} cm²  (equilibra voladizos)\nAs_w = As − As_f = ${res.As.toFixed(3)} − ${As_f.toFixed(3)} = ${As_w.toFixed(3)} cm²  (equilibra alma)\n\na_alma = As_w×fy / (0,85×f'c×bw)\na_alma = ${res.a.toFixed(3)} cm\n\nMn = Mn_ala + Mn_alma\nMn_ala = As_f×fy×(d−hf/2) = ${As_f.toFixed(3)}×${fy}×(${d}−${(hf/2).toFixed(1)})\nMn_alma = As_w×fy×(d−a/2) = ${As_w.toFixed(3)}×${fy}×(${d}−${(res.a/2).toFixed(3)})\nMn = ${res.Mn.toFixed(4)} tf·m`,
      {tipo:'ok',texto:`Mn = ${res.Mn.toFixed(4)} tf·m | φMn = ${res.phiMn.toFixed(4)} tf·m`});
  }
  return html;
}

// ══════════════════════════════════════════════════════════
// MÓDULO 5 — DISEÑO
// ══════════════════════════════════════════════════════════
function buildM5() {
  return `
  <div class="module-header">
    <h1>Diseño — Sección Rectangular</h1>
    <p>A partir de Mu determina As · Calcula Rn → ρ → As → selecciona barras · Verifica φMn ≥ Mu</p>
  </div>
  <div class="module-body">
    <div class="panel-left">
      ${sectionCard('📐 Geometría (dada)', `<div class="form-grid">
        ${mkField('m5-b','<span class="sym">b</span> — Ancho','25','cm')}
        ${mkField('m5-h','<span class="sym">h</span> — Altura total','50','cm')}
        ${mkField('m5-d','<span class="sym">d</span> — Peralte efectivo','45','cm')}
      </div>`)}
      ${sectionCard('🧱 Materiales', `<div class="form-grid">
        ${fcSelect('m5-fc',250)} ${fySelect('m5-fy',4200)}
      </div>`)}
      ${sectionCard('⚡ Cargas (LRFD)', `
        <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px">
          Ingresa las cargas y la luz, o ingresa Mu directamente.
        </div>
        <div class="form-grid">
          ${mkField('m5-L','<span class="sym">L</span> — Luz','6','m')}
          ${mkSelect('m5-tipo','Tipo de viga',[{v:'apoyada',t:'Simplemente apoyada'},{v:'voladizo',t:'Voladizo'}],'apoyada')}
          ${mkField('m5-qD','qD — Carga muerta dist.','0','tf/m')}
          ${mkField('m5-qL','qL — Carga viva dist.','0.8','tf/m')}
          ${mkField('m5-PL','PL — Carga viva puntual','4','tf')}
          ${mkField('m5-pos','Posición de P (desde A)','3','m')}
        </div>
        <div style="margin-top:10px;font-size:0.75rem;color:var(--text-muted)">O ingresa Mu directamente:</div>
        <div class="form-grid cols1" style="margin-top:6px">
          ${mkField('m5-Mu','<span class="sym">Mu</span> directo <small>(deja en 0 para calcular)</small>','0','tf·m')}
        </div>
      `)}
      <button class="btn-calc" onclick="calcM5()">⚡ Diseñar</button>
      <button class="btn-sec" onclick="loadEj04()">📋 Cargar EJ04</button>
    </div>
    <div class="panel-right">
      <div class="viz-card">
        <div class="viz-title">🏗 Visualizador — Diseño</div>
        <div class="viz-row">
          <div class="viz-panel"><div class="viz-panel-title">Sección diseñada</div>
            <div class="svg-wrap" id="m5-svg-sec"><div class="viz-placeholder"><div style="font-size:2rem">✏️</div><div>Ingresa datos</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Diagrama de momento</div>
            <div class="svg-wrap" id="m5-svg-mom"><div class="viz-placeholder"><div style="font-size:2rem">〜</div><div>Calcula para ver M</div></div></div>
          </div>
          <div class="viz-panel"><div class="viz-panel-title">Barras recomendadas</div>
            <div class="svg-wrap" id="m5-svg-bar"><div class="viz-placeholder"><div style="font-size:2rem">🔩</div><div>Calcula para ver opciones</div></div></div>
          </div>
        </div>
      </div>
      <div id="m5-resultado" style="display:none;flex-direction:column;gap:16px"></div>
    </div>
  </div>`;
}

function loadEj04() {
  document.getElementById('m5-b').value=25; document.getElementById('m5-h').value=50;
  document.getElementById('m5-d').value=45; document.getElementById('m5-fc').value=250;
  document.getElementById('m5-fy').value=4200; document.getElementById('m5-L').value=6;
  document.getElementById('m5-tipo').value='apoyada'; document.getElementById('m5-qD').value=0;
  document.getElementById('m5-qL').value=0.8; document.getElementById('m5-PL').value=4;
  document.getElementById('m5-pos').value=3; document.getElementById('m5-Mu').value=0;
  calcM5();
}

function calcM5() {
  const b=+v('m5-b'), h=+v('m5-h'), d=+v('m5-d');
  const fc=getFcVal('m5-fc'), fy=+v('m5-fy');
  const L=+v('m5-L'), tipo=v('m5-tipo');
  const qD=+v('m5-qD'), qL=+v('m5-qL');
  const PL=+v('m5-PL'), pos=+v('m5-pos');
  let MuDir=+v('m5-Mu')||0;
  const inp={b,h,d,fc,fy,
    cargas:[
      ...(qD?[{tipo:'qD',valor:qD}]:[]),
      ...(qL?[{tipo:'qL',valor:qL}]:[]),
      ...(PL?[{tipo:'PL',valor:PL,pos}]:[]),
    ],
    L, tipo_viga:tipo,
    Mu: MuDir||null,
  };
  const res=CALC.disenarRectangularCompleto(inp);
  renderM5(res,inp);
}

function renderM5(res, inp) {
  // Visualizar sección con la primera opción de barras
  const opt = res.opciones[0];
  if (opt) {
    const nb = opt.nb;
    SVG.seccionTransversal(document.getElementById('m5-svg-sec'),{
      b:inp.b, h:inp.h, d:inp.d,
      a:res.verificacion?.a||0, c:(res.verificacion?.a||0)/res.beta,
      nb, zona: res.verificacion?.ok?'ductil':'fragil',
    });
  }
  // Diagrama de momento
  if (inp.L && inp.cargas.length) {
    const cargas_calc = inp.cargas.map(c => {
      if(c.tipo==='qD') return {tipo:'q',valor:1.2*c.valor};
      if(c.tipo==='qL') return {tipo:'q',valor:1.6*c.valor};
      if(c.tipo==='PL') return {tipo:'P',valor:1.6*c.valor,pos:c.pos};
      return c;
    });
    // añadir pp
    const qpp=CALC.gamma_c/1000*(inp.b/100)*(inp.h/100);
    cargas_calc.push({tipo:'q',valor:1.2*qpp});
    const mom=CALC.calcMomentos({tipo:inp.tipo_viga,L:inp.L,cargas:cargas_calc});
    SVG.diagramaMomentosFn(document.getElementById('m5-svg-mom'), mom);
  }
  SVG.barrasRecomendadasFn(document.getElementById('m5-svg-bar'), res.opciones, res.As_req);

  const rc=document.getElementById('m5-resultado');
  rc.style.display='flex';
  const wu=res.wu_detalle;
  rc.innerHTML=`
    ${wu?`<div class="card"><div class="card-title">⚡ Cargas amplificadas (LRFD)</div>
      <div style="font-family:var(--font-mono);font-size:0.82rem;line-height:1.9;color:var(--text-secondary)">
        qpp = γ×b×h = 2500×${(inp.b/100).toFixed(2)}×${(inp.h/100).toFixed(2)} = <span style="color:var(--color-accent)">${wu.qpp.toFixed(4)} tf/m</span><br>
        wu1 = 1,4×(qD+qpp) = 1,4×(${wu.qD}+${wu.qpp.toFixed(4)}) = <span style="color:var(--color-accent)">${wu.wu1.toFixed(4)} tf/m</span><br>
        wu2 = 1,2×(qD+qpp)+1,6×qL = <span style="color:var(--color-accent)">${wu.wu2.toFixed(4)} tf/m</span><br>
        wu = max(wu1,wu2) = <strong style="color:var(--color-accent)">${wu.wu.toFixed(4)} tf/m</strong>
        ${wu.pu?`<br>Pu = 1,6×PL = 1,6×${wu.PL} = <strong style="color:var(--color-accent)">${wu.pu.toFixed(3)} tf</strong>`:''}
        <br><strong style="color:var(--color-ductil)">Mu = ${res.Mu.toFixed(4)} tf·m</strong>
      </div>
    </div>`:''}
    <div class="card"><div class="card-title">Resultados de diseño</div>
    ${resultRow([
      {label:'Mu', value:res.Mu.toFixed(4), unit:'tf·m'},
      {label:'Rn', value:res.Rn.toFixed(3), unit:'kgf/cm²'},
      {label:'ρ requerido', value:res.rho_req.toFixed(6), unit:''},
      {label:'ρ mínimo', value:res.rho_min.toFixed(6), unit:''},
      {label:'ρ máximo', value:res.rho_max.toFixed(6), unit:''},
      {label:'ρ usado', value:res.rho_uso.toFixed(6), unit:''},
      {label:'As requerido', value:res.As_req.toFixed(3), unit:'cm²', hl:true},
      ...(res.verificacion?[
        {label:'As real', value:res.verificacion.As_real.toFixed(3), unit:'cm²', hl:true},
        {label:'φMn', value:res.verificacion.phiMn.toFixed(4), unit:'tf·m', hl:true},
        {label:res.verificacion.ok?'✅ φMn≥Mu':'❌ φMn<Mu', value:(res.verificacion.phiMn/res.Mu).toFixed(3), unit:'ratio', hl:true},
      ]:[]),
    ])}
    </div>
    <div class="card"><div class="card-title">🔩 Barras comerciales recomendadas</div>
      ${res.opciones.length?`<div style="display:flex;flex-direction:column;gap:6px">
        ${res.opciones.map((o,i)=>`
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;
            background:${i===0?'rgba(79,142,247,0.1)':'var(--color-bg)'};
            border:1px solid ${i===0?'var(--color-accent)':'var(--color-border)'}">
            ${i===0?'<span style="color:var(--color-accent);font-weight:700">⭐</span>':'<span style="color:var(--text-muted)">·</span>'}
            <span style="font-family:var(--font-mono);font-size:0.88rem;color:var(--text-primary);font-weight:600">${o.nb}ϕ${o.phi}</span>
            <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--text-secondary)">As = ${o.As_real.toFixed(3)} cm²</span>
            <span style="margin-left:auto;font-size:0.75rem;color:${o.exceso<5?'var(--color-ductil)':'var(--text-muted)'}">+${o.exceso.toFixed(1)}%</span>
          </div>`).join('')}
      </div>`:'<div style="color:var(--text-muted)">No se encontraron combinaciones. Revisar sección.</div>'}
    </div>
    <div class="card"><div class="card-title">Proceso paso a paso</div>
      <div class="steps-container">${buildStepsM5(res,inp)}</div>
    </div>`;
}

function buildStepsM5(res, inp) {
  const {b,d,h,fc,fy,L,tipo_viga} = inp;
  const wu=res.wu_detalle;
  let html='';
  if(wu) html+=mkStep(1,'Peso propio y cargas amplificadas (LRFD)',`Wu=${wu.wu.toFixed(4)} tf/m`,
    'La norma NCh3171 exige amplificar las cargas. La combinación crítica para la mayoría de vigas es 1,2D+1,6L.\nSiempre incluir el peso propio de la viga (carga muerta).',
    `qpp = γ_c × b × h = 2500 × ${b/100} × ${h/100} = ${wu.qpp.toFixed(4)} tf/m\n\nComb. 1: wu1 = 1,4×(qD+qpp) = 1,4×(${wu.qD}+${wu.qpp.toFixed(4)}) = ${wu.wu1.toFixed(4)} tf/m\nComb. 2: wu2 = 1,2×(qD+qpp)+1,6×qL = ${wu.wu2.toFixed(4)} tf/m\nwu = max(${wu.wu1.toFixed(4)}, ${wu.wu2.toFixed(4)}) = ${wu.wu.toFixed(4)} tf/m\n${wu.pu?`Pu = 1,6×PL = ${wu.pu.toFixed(3)} tf`:''}\n\nMu = wu×L²/8 + Pu×L/4 = ${res.Mu.toFixed(4)} tf·m`,
    {tipo:'ok',texto:`Mu = ${res.Mu.toFixed(4)} tf·m`});
  html+=mkStep(wu?2:1,'Coeficiente de resistencia Rn',`Rn = ${res.Rn.toFixed(3)} kgf/cm²`,
    'Rn es la "intensidad de momento" por unidad de b·d². Relaciona Mu con la geometría de la sección para poder encontrar ρ directamente.\nSe asume φ = 0,90 (tentativo, se verificará con ρ < ρmax).',
    `Rn = Mu / (φ × b × d²)\nRn = ${res.Mu.toFixed(4)} × 10⁵ kgf·cm / (0,90 × ${b} × ${d}²)\nRn = ${(res.Mu*100000).toFixed(0)} / ${(0.9*b*d*d).toFixed(0)}\nRn = ${res.Rn.toFixed(3)} kgf/cm²`,
    {tipo:'ok',texto:`Rn = ${res.Rn.toFixed(3)} kgf/cm²`});
  html+=mkStep(wu?3:2,'Cuantía requerida ρ',`ρ = ${res.rho_req.toFixed(6)}`,
    'Se despeja ρ de la fórmula Mn = ρ·b·d²·fy·(1−0,59·ρ·fy/f\'c) usando la fórmula cuadrática inversa.',
    `ρ = (0,85·f'c/fy) × [1 − √(1 − 2·Rn/(0,85·f'c))]\nρ = (0,85×${fc}/${fy}) × [1 − √(1 − 2×${res.Rn.toFixed(3)}/(0,85×${fc}))]\nρ = ${(0.85*fc/fy).toFixed(5)} × [1 − √${(1-2*res.Rn/(0.85*fc)).toFixed(5)}]\nρ_req = ${res.rho_req.toFixed(6)}\n\nρmín = ${res.rho_min.toFixed(6)}\nρmáx = ${res.rho_max.toFixed(6)}\nρ usado = max(ρ_req, ρmín) = ${res.rho_uso.toFixed(6)}`,
    {tipo:res.excede_max?'err':res.rho_req<res.rho_min?'warn':'ok',
     texto:res.excede_max?'❌ ρ > ρmax — Necesita doble armadura o cambiar sección':`ρ = ${res.rho_uso.toFixed(6)}`});
  html+=mkStep(wu?4:3,'Área de acero requerida As',`As_req = ${res.As_req.toFixed(3)} cm²`,
    'Se multiplica la cuantía usada por b×d para obtener el área de acero necesaria.',
    `As = ρ × b × d\nAs = ${res.rho_uso.toFixed(6)} × ${b} × ${d}\nAs = ${res.As_req.toFixed(3)} cm²`,
    {tipo:'ok',texto:`As_req = ${res.As_req.toFixed(3)} cm²`});
  if(res.verificacion) {
    const opt=res.opciones[0];
    html+=mkStep(wu?5:4,`Selección de barras → ${opt?.nb}ϕ${opt?.phi}`,`As_real = ${res.verificacion.As_real.toFixed(3)} cm²`,
      `Se elige la combinación de barras comerciales con As_real ≥ As_req y que cumpla la separación mínima entre barras.`,
      `As_req = ${res.As_req.toFixed(3)} cm²\nOpción: ${opt?.nb} barras ϕ${opt?.phi}mm → As_real = ${opt?.nb}×${(CALC.BARRAS[opt?.phi]||0).toFixed(4)} = ${res.verificacion.As_real.toFixed(3)} cm²\nExceso: +${((res.verificacion.As_real-res.As_req)/res.As_req*100).toFixed(1)}%`,
      {tipo:'ok',texto:`${opt?.nb}ϕ${opt?.phi} → As = ${res.verificacion.As_real.toFixed(3)} cm²`});
    html+=mkStep(wu?6:5,'Verificación φMn ≥ Mu',`${res.verificacion.ok?'✅':'❌'} φMn = ${res.verificacion.phiMn.toFixed(4)} tf·m`,
      'Se calcula el Mn real con As_real (no con As_req) para verificar la resistencia final.',
      `As_real = ${res.verificacion.As_real.toFixed(3)} cm²\na = ${res.verificacion.As_real.toFixed(3)}×${fy}/(0,85×${fc}×${b}) = ${res.verificacion.a.toFixed(3)} cm\nMn = ${res.verificacion.As_real.toFixed(3)}×${fy}×(${d}−${(res.verificacion.a/2).toFixed(3)}) / 100000\nMn = ${res.verificacion.Mn.toFixed(4)} tf·m\nφMn = 0,90 × ${res.verificacion.Mn.toFixed(4)} = ${res.verificacion.phiMn.toFixed(4)} tf·m\n\nVerificación: ${res.verificacion.phiMn.toFixed(4)} ${res.verificacion.ok?'≥':'<'} ${res.Mu.toFixed(4)} tf·m\n→ ${res.verificacion.ok?'✅ LA SECCIÓN RESISTE':'❌ LA SECCIÓN NO RESISTE'}`,
      {tipo:res.verificacion.ok?'ok':'err',texto:res.verificacion.ok
        ?`✅ φMn = ${res.verificacion.phiMn.toFixed(4)} tf·m ≥ Mu = ${res.Mu.toFixed(4)} tf·m`
        :`❌ φMn = ${res.verificacion.phiMn.toFixed(4)} tf·m < Mu = ${res.Mu.toFixed(4)} tf·m`});
  }
  return html;
}

// ══════════════════════════════════════════════════════════
// MÓDULO 6 — MOMENTOS Y CORTANTES
// ══════════════════════════════════════════════════════════
let m6Cargas = [];

function buildM6() {
  return `
  <div class="module-header">
    <h1>Herramienta — Momentos y Cortantes</h1>
    <p>Calcula M(x) y V(x) para vigas apoyadas y voladizos · Muestra diagramas y valores máximos</p>
  </div>
  <div class="module-body">
    <div class="panel-left">
      ${sectionCard('📐 Configuración de la viga', `<div class="form-grid">
        ${mkField('m6-L','<span class="sym">L</span> — Luz','6','m')}
        ${mkSelect('m6-tipo','Tipo de viga',[{v:'apoyada',t:'Simplemente apoyada'},{v:'voladizo',t:'Voladizo (empotrado−libre)'}],'apoyada')}
      </div>`)}
      ${sectionCard('⚡ Agregar cargas', `
        <div class="form-grid">
          ${mkSelect('m6-tipo-carga','Tipo de carga',[{v:'q',t:'q — Distribuida (tf/m)'},{v:'P',t:'P — Puntual (tf)'}],'q')}
          ${mkField('m6-val-carga','Valor','1','tf(/m)')}
          <div class="field" id="m6-pos-wrap">
            <label>Posición desde A (m)</label>
            <input type="number" id="m6-pos-carga" value="3" step="0.1">
            <span class="unit">m</span>
          </div>
        </div>
        <button class="btn-sec" onclick="agregarCargaM6()" style="margin-top:8px">➕ Agregar carga</button>
        <div id="m6-lista-cargas" style="margin-top:10px;display:flex;flex-direction:column;gap:5px"></div>
      `)}
      <button class="btn-calc" onclick="calcM6()">⚡ Calcular diagramas</button>
      <button class="btn-sec" onclick="loadEjM6()">📋 Ejemplo: EJ04 (q+P)</button>
    </div>
    <div class="panel-right">
      <div class="viz-card" style="flex:1">
        <div class="viz-title">📊 Diagramas M(x) y V(x)</div>
        <div style="display:grid;grid-template-rows:1fr 1fr;gap:12px;min-height:400px">
          <div class="viz-panel">
            <div class="viz-panel-title">Diagrama de Momento Flector M(x)</div>
            <div class="svg-wrap" id="m6-svg-M" style="min-height:180px">
              <div class="viz-placeholder"><div style="font-size:2rem">〜</div><div>Agrega cargas y calcula</div></div>
            </div>
          </div>
          <div class="viz-panel">
            <div class="viz-panel-title">Diagrama de Cortante V(x)</div>
            <div class="svg-wrap" id="m6-svg-V" style="min-height:180px">
              <div class="viz-placeholder"><div style="font-size:2rem">↕</div><div>Agrega cargas y calcula</div></div>
            </div>
          </div>
        </div>
      </div>
      <div id="m6-resultado" style="display:none;flex-direction:column;gap:16px"></div>
    </div>
  </div>`;
}

function agregarCargaM6() {
  const tipo=v('m6-tipo-carga'), val=+v('m6-val-carga'), pos=+v('m6-pos-carga');
  const L=+v('m6-L')||6;
  m6Cargas.push({tipo, valor:val, pos: tipo==='P'?pos:0});
  renderListaM6(L);
}

function renderListaM6(L) {
  const el = document.getElementById('m6-lista-cargas');
  el.innerHTML = m6Cargas.map((c,i)=>`
    <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;
      background:var(--color-bg);border:1px solid var(--color-border);border-radius:6px;
      font-size:0.8rem;font-family:var(--font-mono)">
      <span style="color:${c.tipo==='q'?'var(--color-accent)':'var(--color-traccion)'}">${c.tipo==='q'?'q':'P'}</span>
      <span style="color:var(--text-primary)">${c.valor} tf${c.tipo==='q'?'/m':''}</span>
      ${c.tipo==='P'?`<span style="color:var(--text-muted)">@ ${c.pos}m</span>`:''}
      <button onclick="eliminarCargaM6(${i})" style="margin-left:auto;background:none;border:none;
        color:var(--color-fragil);cursor:pointer;font-size:0.8rem">✕</button>
    </div>`).join('');
}

function eliminarCargaM6(i) {
  m6Cargas.splice(i,1);
  renderListaM6(+v('m6-L')||6);
}

function loadEjM6() {
  document.getElementById('m6-L').value=6;
  document.getElementById('m6-tipo').value='apoyada';
  m6Cargas=[{tipo:'q',valor:1.655,pos:0},{tipo:'P',valor:6.4,pos:3}];
  renderListaM6(6);
  calcM6();
}

function calcM6() {
  if(!m6Cargas.length) return;
  const L=+v('m6-L'), tipo=v('m6-tipo');
  const res=CALC.calcMomentos({tipo,L,cargas:m6Cargas});
  SVG.diagramaMomentosFn(document.getElementById('m6-svg-M'), res, 'M');
  SVG.diagramaMomentosFn(document.getElementById('m6-svg-V'), res, 'V');
  const rc=document.getElementById('m6-resultado');
  rc.style.display='flex';
  rc.innerHTML=`
    <div class="card"><div class="card-title">Resultados</div>
    ${resultRow([
      {label:'Mmax', value:res.Mmax.toFixed(4), unit:'tf·m', hl:true},
      {label:'Vmax', value:res.Vmax.toFixed(4), unit:'tf', hl:true},
      ...(res.RA!==undefined?[{label:'Reacción A',value:res.RA.toFixed(3),unit:'tf'},{label:'Reacción B',value:res.RB.toFixed(3),unit:'tf'}]:[]),
      ...(res.RE!==undefined?[{label:'Reacción E',value:res.RE.toFixed(3),unit:'tf'},{label:'Momento E',value:res.ME_reac.toFixed(3),unit:'tf·m'}]:[]),
    ])}
    </div>`;
}

// ── Utilidad para leer valores de inputs ─────────────────
function v(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}
