# HormigonCalc — Documento Maestro
> Plataforma web de estudio y cálculo de Hormigón Armado · Next.js 15 + TypeScript + Tailwind
> Universidad de La Serena · Ingeniería Civil · 1S 2026
> Metodología: Sistema Maestro de Producción v1.0

---

## 1. Visión General

HormigonCalc es una plataforma web interactiva que combina dos propósitos:

1. **Estudio académico** — teoría, glosario, fórmulas y laboratorios interactivos sobre el comportamiento mecánico de materiales (hormigón, acero).
2. **Calculadora de ingeniería** — módulos de análisis y diseño de vigas en flexión siguiendo ACI 318 / NCh3171, con visualizaciones SVG en tiempo real, pasos detallados y verificaciones normativas.

El proyecto unifica dos desarrollos previos:
- **Proyecto Next.js existente** (`C:\Universidad\hormigon`) — laboratorio interactivo del Cap. 1 con Plotly, KaTeX, 3 modelos constitutivos.
- **HormigonCalc vanilla JS** (`C:\Universidad\hormigon\estudio\Hormigón Armado\HormigonCalc`) — 6 módulos de cálculo completos con SVG rendering propio.

**Potencial de producto:** La calculadora puede crecer hacia una SaaS de ingeniería estructural con exportación de reportes, historial de proyectos y módulos adicionales (columnas, losas, vigas continuas).

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js App Router | 15.x |
| Lenguaje | TypeScript strict | 5.x |
| Estilos | Tailwind CSS | v3 |
| Componentes | Radix UI (ya instalado) | — |
| Estado UI | Zustand | 5.x |
| Animaciones | Framer Motion | 11.x |
| Gráficas científicas | Plotly (dynamic import) | 2.x |
| Fórmulas matemáticas | KaTeX / react-katex | — |
| SVG técnicos | React + SVG nativo | — |
| Deploy | Vercel | — |
| Futuro (auth) | Firebase Auth | — |
| Futuro (BD) | Cloud Firestore | — |

---

## 3. Arquitectura de Rutas (sin "capítulo")

```
/                          → Dashboard general
/materiales                → Índice: Hormigón + Acero
/materiales/hormigon       → Laboratorio modelos constitutivos (Hognestad, Todeschini, Parábola-Rect)
/materiales/hormigon/teoria     → Teoría y glosario
/materiales/hormigon/formulas   → Fórmulas y módulo Ec
/materiales/hormigon/laboratorio → Gráficas interactivas σ-ε
/materiales/acero          → (futuro) Modelos acero, fy, fu
/flexion                   → Índice calculadoras de flexión
/flexion/rectangular       → M1: Análisis sección rectangular
/flexion/doble-fila        → M2: Doble fila de acero
/flexion/doble-armadura    → M3: Doble armadura (As + A's)
/flexion/viga-t            → M4: Viga T
/diseno                    → Índice diseño
/diseno/rectangular        → M5: Diseño sección rectangular (LRFD)
/cargas                    → Índice cargas
/cargas/momentos-cortantes → M6: Diagramas M y V
```

---

## 4. Estructura de Carpetas

```
src/
├── app/
│   ├── page.tsx                        ← Dashboard
│   ├── layout.tsx                      ← Root layout + Sidebar
│   ├── globals.css
│   ├── materiales/
│   │   └── hormigon/
│   │       ├── page.tsx                ← Índice hormigón
│   │       ├── teoria/page.tsx
│   │       ├── formulas/page.tsx
│   │       └── laboratorio/page.tsx    ← (mover desde /capitulo-1/laboratorio)
│   ├── flexion/
│   │   ├── page.tsx                    ← Índice flexión (tarjetas M1–M4)
│   │   ├── rectangular/page.tsx        ← M1
│   │   ├── doble-fila/page.tsx         ← M2
│   │   ├── doble-armadura/page.tsx     ← M3
│   │   └── viga-t/page.tsx             ← M4
│   ├── diseno/
│   │   ├── page.tsx
│   │   └── rectangular/page.tsx        ← M5
│   └── cargas/
│       ├── page.tsx
│       └── momentos-cortantes/page.tsx ← M6
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx                 ← Actualizar con nuevas rutas
│   ├── calculadora/
│   │   ├── InputPanel.tsx              ← Panel izquierdo genérico
│   │   ├── ResultPanel.tsx             ← Panel derecho genérico
│   │   ├── StepCard.tsx                ← Paso a paso expandible
│   │   ├── FallaBadge.tsx              ← Badge ductil/transición/frágil
│   │   └── ResultRow.tsx               ← Fila de resultado
│   ├── svg/
│   │   ├── SeccionTransversal.tsx      ← M1, M2
│   │   ├── DiagramaDeformaciones.tsx   ← M1–M4
│   │   ├── DiagramaFuerzas.tsx         ← M1
│   │   ├── SeccionDobleFila.tsx        ← M2
│   │   ├── DeformacionesDobleFila.tsx  ← M2
│   │   ├── ComparacionMetodos.tsx      ← M2
│   │   ├── SeccionDobleArmadura.tsx    ← M3
│   │   ├── DeformacionesDobleArmadura.tsx ← M3
│   │   ├── DescomposicionVigas.tsx     ← M3
│   │   ├── SeccionT.tsx                ← M4
│   │   ├── FuerzasVigaT.tsx            ← M4
│   │   ├── BarrasRecomendadas.tsx      ← M5
│   │   └── DiagramaMomentos.tsx        ← M6
│   ├── calculators/                    ← (existentes, mover si hace falta)
│   └── charts/                         ← (existentes Plotly)
├── lib/
│   ├── hormigon/
│   │   ├── models.ts                   ← (existente) Hognestad, Todeschini, Parábola
│   │   ├── units.ts                    ← (existente) conversión MPa ↔ kgf/cm²
│   │   └── flexion.ts                  ← NUEVO: port completo de calc_engine.js
│   └── utils.ts
└── types/
    └── index.ts                        ← Tipos globales de la app
```

---

## 5. Módulos de Calculadora — Especificación

### M1 — Análisis Sección Rectangular
- **Ruta:** `/flexion/rectangular`
- **Inputs:** b, h, f'c, fy, modo (barras/área directa), nb, φ, As, Mu (opcional)
- **Outputs:** a, c, β, εs, εy, zona, φ, Mn, φMn, verifica Mu
- **SVG:** Sección transversal + Deformaciones + Fuerzas internas
- **Pasos:** 6 pasos expandibles con ecuaciones

### M2 — Doble Fila de Acero
- **Ruta:** `/flexion/doble-fila`
- **Inputs:** b, h, r_inf, fc, fy, nb1, φ1, nb2, φ2, sep_vert, Mu
- **Outputs:** As1, As2, d1, d2, d_eq, a, c, εs1, εs2, Mn exacto, Mn aprox, φMn
- **SVG:** Sección 2 filas + Deformaciones por fila + Comparación métodos
- **Pasos:** 5 pasos

### M3 — Doble Armadura (As + A's)
- **Ruta:** `/flexion/doble-armadura`
- **Inputs:** b, h, d, d', fc, fy, nb, φ, nb', φ'
- **Outputs:** As, A's, a, c, ε's, fs', fluye_prima, Mn1, Mn2, Mn, φMn
- **SVG:** Sección + Deformaciones + Descomposición Viga1+Viga2
- **Pasos:** 7 pasos

### M4 — Viga T
- **Ruta:** `/flexion/viga-t`
- **Inputs:** bw, b (ala efectiva), hf, d, h, fc, fy, nb, φ
- **Outputs:** caso (1 ó 2), As, a, c, εs, Mn, φMn
- **SVG:** Sección T + Deformaciones + Fuerzas internas
- **Pasos:** 5–7 pasos según caso

### M5 — Diseño Sección Rectangular
- **Ruta:** `/diseno/rectangular`
- **Inputs:** b, h, d, fc, fy, tipo_viga, L, qD, qL, PL, Mu directo
- **Outputs:** wu, Mu, Rn, ρ_req, ρ_min, ρ_max, As_req, opciones barras, φMn
- **SVG:** Sección + Diagrama momento + Barras recomendadas
- **Pasos:** 5–6 pasos con combinaciones LRFD

### M6 — Diagramas M y V
- **Ruta:** `/cargas/momentos-cortantes`
- **Inputs:** tipo viga (simple/voladizo/continua 2 tramos), L, cargas (q, P)
- **Outputs:** 201 puntos M(x) y V(x), Mmax, Vmax, reacciones
- **SVG:** Diagrama de momentos + Diagrama de cortante
- **Pasos:** No aplica (es diagrama directo)

---

## 6. Sistema Visual (Design System)

El design system ya está definido en `tailwind.config.ts` y `globals.css`. No cambiar.

```
Fondo base:      #09090B  (bg-base)
Panel:           #111113  (bg-panel)
Card:            #18181B  (bg-card)
Elevado:         #1F1F23  (bg-elevated)
Borde:           #27272A  (bg-border)

Azul:            #3B82F6  (accent-blue)   → M1, elementos primarios
Ámbar:           #F59E0B  (accent-amber)  → M2, advertencias
Verde:           #22C55E  (accent-green)  → M3, zona dúctil
Morado:          #A855F7  (accent-purple) → M4, comparación
Rojo:            #EF4444  (accent-red)    → zona frágil, errores
Cyan:            #06B6D4  (accent-cyan)   → M5
```

### Colores por zona de falla (consistentes en toda la app)
```
Dúctil   (εs ≥ 0.005):          accent-green  (#22C55E)
Transición (0.004 ≤ εs < 0.005): accent-amber  (#F59E0B)
Frágil   (εs < 0.004):           accent-red    (#EF4444)
```

---

## 7. Reglas de Implementación

1. **TypeScript strict siempre.** Nunca `any`. Tipos en `types/index.ts`.
2. **Fórmulas idénticas** al `calc_engine.js` original. No modificar la lógica matemática.
3. **SVG como componentes React puros** — sin efectos secundarios, solo props → JSX.
4. **Layout de calculadora:** siempre panel-left (inputs, 380px fijo) + panel-right (SVG + resultados, flex-1).
5. **Pasos expandibles** — accordion con animación Framer Motion.
6. **Auto-cálculo** al cambiar cualquier input — con `useEffect` y debounce de 200ms.
7. **`cn()` para clases condicionales** — nunca concatenación manual de strings.
8. **Dynamic import con ssr:false** para Plotly (ya implementado).
9. **Responsive mínimo:** layout desktop (≥1280px). Mobile queda para Fase 2.

---

## 8. Plan de Sprints

### Sprint 1 — Reestructurar rutas y navegación
- Mover `/capitulo-1/*` → `/materiales/hormigon/*`
- Actualizar Sidebar con nueva estructura temática
- Actualizar breadcrumbs internos
- Criterio: build sin errores, navegación funciona igual

### Sprint 2 — Motor de cálculo TypeScript
- Portar `calc_engine.js` → `src/lib/hormigon/flexion.ts`
- Definir todos los tipos en `src/types/index.ts`
- Test unitario básico con Node.js
- Criterio: todos los cálculos dan el mismo resultado que el vanilla

### Sprint 3 — Componentes SVG React
- Convertir las 13 funciones de `svg_render.js` → componentes React
- Cada componente acepta props tipadas, retorna JSX SVG puro
- Criterio: render visual idéntico al vanilla

### Sprint 4 — Páginas calculadora M1–M6
- Construir cada página con layout panel-left + panel-right
- Conectar TypeScript calc engine + SVG components
- Pasos expandibles, resultados, badges de zona
- Criterio: M1–M6 funcionan igual o mejor que la versión vanilla

### Sprint 5 (Fase 2) — Mejoras producto
- Exportación PDF del resultado (jsPDF)
- Historial local (localStorage)
- Auth Firebase + historial en Firestore
- Más módulos: columnas, losas

---

## 9. Out of Scope (MVP)

- Autenticación y cuentas de usuario
- Exportación de reportes PDF
- Módulos fuera de flexión (columnas, losas, corte)
- Soporte móvil
- Internacionalización (la app es en español)
- Modo claro

---

## 10. Fases Futuras

| Fase | Feature |
|------|---------|
| 2 | Exportar PDF del cálculo (jsPDF) |
| 2 | Historial de cálculos (localStorage) |
| 3 | Auth Firebase + Firestore |
| 3 | Módulo columnas + diagrama interacción |
| 4 | Losas unidireccionales |
| 4 | Vigas continuas (método de coeficientes ACI) |
| 5 | SaaS: planes, dashboard usuario, proyectos |
