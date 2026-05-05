# 📐 Plan Maestro de Estudio — Hormigón Armado
**Profesor:** Ing. Miguel Colque González  
**Semestre:** 1S 2026  
**Última actualización:** 2026-05-01

---

## 🗂️ Estructura de Archivos del Proyecto

```
Hormigón Armado/
│
├── PLAN_MAESTRO.md                        ← Este archivo
│
├── ── ARCHIVOS DE MATERIA ──
│   ├── 01_Hormigon_Comportamiento_Mecanico.md
│   ├── 02_Acero_Comportamiento_Mecanico.md
│   ├── 03_Criterios_Diseno_Normas.md
│   └── 04_Vigas_en_Flexion.md
│
├── ── ARCHIVOS TRANSVERSALES ──
│   ├── GLOSARIO.md
│   ├── METODOS_Y_APLICACION.md
│   └── ESTUDIOS.md
│
└── EJERCICIOS/
    ├── EJ01_Vigas_Flexion.md
    ├── EJ02_Viga_Doble_Fila.md
    ├── EJ03_Viga_Doble_Armadura.md
    └── EJ04_Diseno_Viga_Rectangular.md
```

---

## 📋 Descripción de Archivos

### Archivos de Materia (uno por PDF del profesor)
Cada archivo cubre en **profundidad total** el contenido del PDF correspondiente: teoría, fórmulas, supuestos, figuras explicadas, gráficas con conclusión detallada.

| Archivo | PDF fuente | Páginas |
|---|---|---|
| `01_Hormigon_Comportamiento_Mecanico.md` | Comportamiento Mecánico del Hormigón v2.pdf | 65 |
| `02_Acero_Comportamiento_Mecanico.md` | Comportamiento Mecánico del Acero_2026.pdf | 32 |
| `03_Criterios_Diseno_Normas.md` | Criterios de diseño y normas V2.pdf | 70 |
| `04_Vigas_en_Flexion.md` | Vigas en Flexión.pdf | 64 |

### Archivos Transversales (se actualizan en cada PDF)

#### `GLOSARIO.md`
Términos técnicos definidos con precisión. Incluye símbolo, unidad, definición y referencia normativa. Se actualiza acumulativamente con cada PDF procesado.

#### `METODOS_Y_APLICACION.md`
Métodos de cálculo y diseño explicados con pasos claros, variantes y casos especiales. Incluye:
- ASD (tensiones admisibles)
- LRFD (factores de carga y resistencia)
- **Bloque de Whitney** — deducción completa, casos simples y doble armadura
- Verificación de cuantías (mínima, máxima, balanceada)
- Procedimiento de diseño vs. verificación

#### `ESTUDIOS.md`
Repositorio de conocimiento de referencia. Incluye:
- Gráficas explicadas al detalle (curvas tensión-deformación, diagramas de interacción)
- Teoremas y supuestos fundamentales
- Normas aplicables (ACI 318, NCh170, NCh204, NCh1037)
- Figuras de secciones transversales interpretadas

### Archivos de Ejercicios (`EJERCICIOS/`)
Cada ejemplo resuelto del profesor se desglosa con:
- Enunciado y datos del problema
- Diagrama de la sección transversal descrito
- Procedimiento paso a paso explicado
- Consideraciones y supuestos aplicados
- Variantes del problema
- Errores comunes a evitar

---

## 🚀 Orden de Trabajo

```
FASE 1 — MATERIALES
─────────────────────────────────────────────────────────────────
[1] ✅/🔲 Crear estructura base (archivos MD vacíos con índice)
[2] 🔲 PDF 1: Comportamiento Mecánico del Hormigón v2
         → Genera: 01_Hormigon_Comportamiento_Mecanico.md
         → Actualiza: GLOSARIO, METODOS_Y_APLICACION, ESTUDIOS
[3] 🔲 PDF 2: Comportamiento Mecánico del Acero 2026
         → Genera: 02_Acero_Comportamiento_Mecanico.md
         → Actualiza: GLOSARIO, METODOS_Y_APLICACION, ESTUDIOS
[4] 🔲 PDF 3: Criterios de Diseño y Normas V2
         → Genera: 03_Criterios_Diseno_Normas.md
         → Actualiza: GLOSARIO, METODOS_Y_APLICACION, ESTUDIOS
[5] 🔲 PDF 4: Vigas en Flexión  ⭐ TEMA CENTRAL
         → Genera: 04_Vigas_en_Flexion.md
         → Actualiza: GLOSARIO, METODOS_Y_APLICACION, ESTUDIOS
         → FOCO MÁXIMO en Bloque de Whitney

FASE 2 — EJERCICIOS
─────────────────────────────────────────────────────────────────
[6] 🔲 PDF 5: Ejemplo 1 — Vigas en Flexión
         → Genera: EJERCICIOS/EJ01_Vigas_Flexion.md
[7] 🔲 PDF 6: Ejemplo 2 — Viga con doble fila de acero
         → Genera: EJERCICIOS/EJ02_Viga_Doble_Fila.md
[8] 🔲 PDF 7: Ejemplo 3 — Viga con doble armadura
         → Genera: EJERCICIOS/EJ03_Viga_Doble_Armadura.md
[9] 🔲 PDF 8: Ejemplo 4.2 — Diseño viga rectangular
         → Genera: EJERCICIOS/EJ04_Diseno_Viga_Rectangular.md

FASE 3 — CONSOLIDACIÓN
─────────────────────────────────────────────────────────────────
[10] 🔲 Revisión final y limpieza de todos los MD
          → Coherencia entre archivos
          → Índice general README.md
```

---

## ⚠️ Consideraciones Críticas de Calidad

### 1. Gráficas — Análisis Quirúrgico
Cada gráfica del material debe ser descrita e interpretada con conclusión **completa y detallada**:
- Qué muestra la curva/figura
- Qué representa cada eje y cada punto notable
- Qué conclusión práctica se extrae para el diseño
- Comparación con otras curvas si aplica

### 2. Bloque de Whitney — Prioridad Máxima
El método del bloque equivalente de compresiones es el núcleo mecánico del ramo. Debe quedar documentado con:
- Deducción desde primeros principios (distribución parabólica → bloque rectangular)
- Demostración de la equivalencia de fuerza y momento
- Definición y origen del factor β
- Aplicación: viga simplemente armada
- Aplicación: viga con doble armadura
- Aplicación: verificación de cuantías
- Casos especiales y limitaciones

### 3. Figuras de Secciones Transversales
Toda figura de sección transversal (viga, diagrama de deformaciones, distribución de tensiones) debe describirse con:
- Dimensiones y variables involucradas
- Qué representa cada zona (zona comprimida, zona traccionada)
- Ubicación del eje neutro y cómo se determina
- Distribución de deformaciones (lineal) vs. distribución de tensiones (no lineal → bloque)
- Relación con las hipótesis de diseño

---

## 📌 Normas de Referencia Usadas en el Ramo

| Norma | Descripción |
|---|---|
| ACI 318 | Código de diseño de hormigón estructural (referencia principal) |
| NCh170:2016 | Hormigón — Requisitos generales (clasificación G) |
| NCh204:2020 | Acero de refuerzo para hormigón armado |
| NCh1037 | Ensayo de compresión de probetas cilíndricas |
| NCh431 | Cargas de nieve |
| NCh432 | Cargas de viento |
| NCh433 | Diseño sísmico |

---

*Este plan se actualiza a medida que avanzamos. Cada ✅ indica un ítem completado.*
