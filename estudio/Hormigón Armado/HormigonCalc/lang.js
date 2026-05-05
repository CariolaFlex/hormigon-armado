/* ============================================================
   HormigonCalc — Sistema de Idiomas (ES / EN)
   Para agregar un idioma: añadir clave en LANG y llamar setLang()
   ============================================================ */

const LANG = {
  es: {
    // Navegación
    nav_analisis:      'Análisis',
    nav_diseno:        'Diseño',
    nav_herramientas:  'Herramientas',
    nav_m1:            'Sección Rectangular',
    nav_m2:            'Doble Fila',
    nav_m3:            'Doble Armadura',
    nav_m4:            'Viga T',
    nav_m5:            'Diseño Rectangular',
    nav_m6:            'Momentos y Cortantes',
    nav_proximamente:  'Próximamente',
    nav_normas:        'Normas de referencia',
    nav_glosario:      'Glosario técnico',

    // Bienvenida
    welcome_title:     'Hormigón',
    welcome_sub:       'Calc',
    welcome_desc:      'Herramienta de cálculo educativa para Hormigón Armado. Resuelve paso a paso mostrando cada ecuación, supuesto y verificación.',
    welcome_start:     'Selecciona un módulo en el panel izquierdo para comenzar.',

    // Módulo 1
    m1_title:          'Análisis — Sección Rectangular Simple',
    m1_desc:           'Determina Mn y φMn dado b, d, As, f\'c y fy. Verifica modo de falla y muestra el proceso completo.',
    m1_datos:          'Datos de la sección',
    m1_materiales:     'Materiales',
    m1_armadura:       'Armadura de tracción',
    m1_calcular:       'Calcular',
    m1_proceso:        'Proceso de cálculo',
    m1_seccion:        'Sección transversal',
    m1_deformaciones:  'Diagrama de deformaciones',
    m1_fuerzas:        'Fuerzas internas',
    m1_resultados:     'Resultados',
    m1_cuantias:       'Verificación de cuantías',

    // Campos
    f_b:    'Ancho de sección',
    f_h:    'Altura total',
    f_d:    'Peralte efectivo',
    f_fc:   'Resistencia hormigón f\'c',
    f_fy:   'Tensión de fluencia fy',
    f_nb:   'N° de barras',
    f_phi:  'Diámetro de barras',
    f_As:   'Área de acero As',
    f_Mu:   'Momento último Mu',
    f_modo: 'Modo de ingreso de acero',
    f_barras: 'Por barras (nb × ϕ)',
    f_area:   'Área directa (cm²)',
    f_beta:   'Factor β',
    f_auto:   'Auto (según f\'c)',

    // Pasos
    step1_title: 'Área de acero (As)',
    step2_title: 'Profundidad del bloque de compresión (a)',
    step3_title: 'Profundidad del eje neutro (c)',
    step4_title: 'Verificación de fluencia del acero',
    step5_title: 'Determinación del factor φ',
    step6_title: 'Resistencia nominal Mn',
    step7_title: 'Resistencia de diseño φMn',
    step8_title: 'Verificación de cuantías',

    // Modos de falla
    falla_ductil:     '✅ Falla Dúctil — Sección controlada por tracción',
    falla_transicion: '⚠️ Zona de Transición — φ interpolado',
    falla_fragil:     '❌ Falla Frágil — Sección sobrearmada (NO aceptable)',

    // Unidades
    u_cm:    'cm',
    u_cm2:   'cm²',
    u_mm:    'mm',
    u_kgcm2: 'kgf/cm²',
    u_tfm:   'tf·m',
    u_tf:    'tf',
    u_adim:  'adimensional',

    // Mensajes
    msg_calcular: 'Ingresa los datos y presiona Calcular',
    msg_error_fc: 'f\'c debe ser positivo',
    msg_error_as: 'As debe ser positivo',
    msg_sobrearmada: 'La sección está sobrearmada (ρ > ρb). No se puede usar fy directamente. Aumenta b, d o reduce As.',

    // Botones
    btn_calc:   '⚡ Calcular',
    btn_limpiar: 'Limpiar',
    btn_ejemplo: 'Cargar ejemplo',

    // Footer
    footer_norm:   'NCh430 · ACI 318',
    footer_credit: 'HormigonCalc v1.0',
  },

  en: {
    nav_analisis:      'Analysis',
    nav_diseno:        'Design',
    nav_herramientas:  'Tools',
    nav_m1:            'Rectangular Section',
    nav_m2:            'Double Layer',
    nav_m3:            'Doubly Reinforced',
    nav_m4:            'T-Beam',
    nav_m5:            'Rectangular Design',
    nav_m6:            'Moments & Shear',
    nav_proximamente:  'Coming soon',
    nav_normas:        'Reference standards',
    nav_glosario:      'Technical glossary',

    welcome_title:     'Reinforced',
    welcome_sub:       'Concrete',
    welcome_desc:      'Educational calculation tool for Reinforced Concrete. Solves step by step showing every equation, assumption and verification.',
    welcome_start:     'Select a module from the left panel to begin.',

    m1_title:          'Analysis — Simple Rectangular Section',
    m1_desc:           'Determine Mn and φMn given b, d, As, f\'c and fy. Verifies failure mode and shows complete process.',
    m1_datos:          'Section data',
    m1_materiales:     'Materials',
    m1_armadura:       'Tension reinforcement',
    m1_calcular:       'Calculate',
    m1_proceso:        'Calculation process',
    m1_seccion:        'Cross-section',
    m1_deformaciones:  'Strain diagram',
    m1_fuerzas:        'Internal forces',
    m1_resultados:     'Results',
    m1_cuantias:       'Steel ratio check',

    f_b:    'Section width',
    f_h:    'Total height',
    f_d:    'Effective depth',
    f_fc:   'Concrete strength f\'c',
    f_fy:   'Yield strength fy',
    f_nb:   'Number of bars',
    f_phi:  'Bar diameter',
    f_As:   'Steel area As',
    f_Mu:   'Ultimate moment Mu',
    f_modo: 'Steel input mode',
    f_barras: 'By bars (nb × ϕ)',
    f_area:   'Direct area (cm²)',
    f_beta:   'Factor β',
    f_auto:   'Auto (by f\'c)',

    step1_title: 'Steel area (As)',
    step2_title: 'Compression block depth (a)',
    step3_title: 'Neutral axis depth (c)',
    step4_title: 'Steel yielding verification',
    step5_title: 'Factor φ determination',
    step6_title: 'Nominal strength Mn',
    step7_title: 'Design strength φMn',
    step8_title: 'Steel ratio verification',

    falla_ductil:     '✅ Ductile Failure — Tension-controlled section',
    falla_transicion: '⚠️ Transition Zone — interpolated φ',
    falla_fragil:     '❌ Brittle Failure — Over-reinforced section (NOT acceptable)',

    u_cm:    'cm',
    u_cm2:   'cm²',
    u_mm:    'mm',
    u_kgcm2: 'kgf/cm²',
    u_tfm:   'tf·m',
    u_tf:    'tf',
    u_adim:  'dimensionless',

    msg_calcular: 'Enter data and press Calculate',
    msg_error_fc: 'f\'c must be positive',
    msg_error_as: 'As must be positive',
    msg_sobrearmada: 'Over-reinforced section (ρ > ρb). Cannot use fy directly. Increase b, d or reduce As.',

    btn_calc:    '⚡ Calculate',
    btn_limpiar: 'Clear',
    btn_ejemplo: 'Load example',

    footer_norm:   'NCh430 · ACI 318',
    footer_credit: 'HormigonCalc v1.0',
  }
};

let currentLang = 'es';

function t(key) {
  return (LANG[currentLang] && LANG[currentLang][key]) || key;
}

function setLang(lang) {
  if (!LANG[lang]) return;
  currentLang = lang;
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-lang-placeholder'));
  });
  document.querySelectorAll('#lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Re-render si hay resultado activo
  if (typeof renderCurrentModule === 'function') renderCurrentModule();
}
