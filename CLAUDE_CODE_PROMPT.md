# HormigonCalc — Super Prompt para Claude Code
> Entrega este archivo completo a Claude Code al iniciar la sesión.
> Carpeta del proyecto: `C:\Universidad\hormigon`

---

## CONTEXTO DEL PROYECTO

HormigonCalc es una plataforma web de cálculo estructural para hormigón armado, desarrollada en Next.js 15 + TypeScript + Tailwind CSS. Está deployada en producción en **https://hormigon-armado.vercel.app** y conectada al repositorio GitHub **https://github.com/CariolaFlex/hormigon-armado** (rama `main` → auto-deploy en Vercel).

El proyecto tiene DOS secciones:
1. **Estudio/Materiales** — laboratorio interactivo con modelos constitutivos (Hognestad, Todeschini, Parábola-Rect), teoría y glosario. Ya funciona correctamente.
2. **Calculadoras de Flexión** — 6 módulos M1–M6 migrados desde una versión vanilla JS. Todos están implementados pero tienen bugs a corregir.

---

## STACK TÉCNICO

- **Framework:** Next.js 15.2.9 App Router (`"use client"` en todas las páginas de calculadora)
- **Lenguaje:** TypeScript strict (nunca `any`, todos los tipos en `src/types/index.ts`)
- **Estilos:** Tailwind CSS v3 con design system oscuro custom en `tailwind.config.ts`
- **Path alias:** `@/` → `./src/`
- **Motor de cálculo:** `src/lib/hormigon/flexion.ts`
- **Tipos:** `src/types/index.ts`
- **Deploy:** Vercel (auto-deploy en push a `main`)
- **Verificación build:** `npx tsc --noEmit` (build completo da OOM en local, Vercel lo hace bien)

---

## ESTRUCTURA DE ARCHIVOS CRÍTICOS

```
src/
├── app/
│   ├── flexion/
│   │   ├── rectangular/page.tsx     ← M1: Análisis sección rectangular
│   │   ├── doble-fila/page.tsx      ← M2: Doble fila de acero
│   │   ├── doble-armadura/page.tsx  ← M3: Doble armadura (As + A's)
│   │   └── viga-t/page.tsx          ← M4: Viga T
│   ├── diseno/
│   │   └── rectangular/page.tsx     ← M5: Diseño LRFD
│   └── cargas/
│       └── momentos-cortantes/page.tsx ← M6: Diagramas M y V
├── lib/hormigon/
│   └── flexion.ts                   ← Motor de cálculo completo
├── components/
│   ├── calculadora/
│   │   ├── StepCard.tsx             ← Accordion de pasos
│   │   ├── FallaBadge.tsx           ← Badge ductil/transición/frágil
│   │   └── ResultRow.tsx            ← Fila de resultado
│   └── svg/
│       ├── SeccionTransversal.tsx
│       ├── DiagramaDeformaciones.tsx
│       ├── DiagramaFuerzas.tsx
│       ├── SeccionDobleFila.tsx
│       ├── DeformacionesDobleFila.tsx
│       ├── ComparacionMetodos.tsx
│       ├── SeccionDobleArmadura.tsx
│       ├── DeformacionesDobleArmadura.tsx
│       ├── DescomposicionVigas.tsx
│       ├── SeccionT.tsx
│       ├── FuerzasVigaT.tsx
│       ├── BarrasRecomendadas.tsx
│       └── DiagramaMomentos.tsx
└── types/index.ts
```

---

## INTERFACE StepCard (CRÍTICO — no cambiar)

```tsx
interface StepCardProps {
  num: number;           // número del paso (NO "step")
  title: string;
  result: string;        // texto corto que aparece en el header cuando está cerrado
  planteamiento: string;
  ecuacion: string;
  conclusion: {
    tipo: "success" | "warning" | "error" | "info";
    texto: string;
  };
}
```

---

## DESIGN SYSTEM (NO MODIFICAR)

```
Fondos:    bg-base=#09090B  bg-panel=#111113  bg-card=#18181B  bg-elevated=#1F1F23
Bordes:    bg-border=#27272A
Acentos:   accent-blue=#3B82F6  (M1)
           accent-amber=#F59E0B (M2, advertencias)
           accent-green=#22C55E (M3, zona dúctil)
           accent-purple=#A855F7 (M4)
           accent-cyan=#06B6D4  (M5)
Errores:   accent-red=#EF4444

Zonas de falla:
  Dúctil      (εs ≥ 0.005)             → accent-green
  Transición  (εy < εs < 0.005)        → accent-amber
  Frágil      (εs ≤ εy)                → accent-red
```

---

## CONSTANTES FÍSICAS (src/lib/hormigon/flexion.ts)

```typescript
export const Ecu = 0.003;      // Deformación última hormigón ACI 318
export const Es  = 210000;     // Módulo elasticidad acero [kgf/cm²]
export const gamma_c = 2500;   // Peso unitario hormigón [kgf/m³]
```

---

## BUGS CONOCIDOS A CORREGIR

### BUG 1 — M1 Sección Rectangular: cálculo incorrecto de β₁
**Síntoma:** Con f'c = 200 kgf/cm², el programa muestra β₁ = 0.858 en el planteamiento (correcto para la fórmula) pero el resultado del bloque `a` no coincide con el cálculo manual.

**Causa probable:** La función `getBeta` usa la fórmula `1.05 - 0.0007 * fc` que aplica cuando fc > 280 kgf/cm², pero para fc ≤ 280 devuelve 0.85 correctamente. Sin embargo, en la **página** (`src/app/flexion/rectangular/page.tsx`) los StepCards muestran un β₁ calculado con otra fórmula o hardcodeado que no coincide con el que usa `analizarRectangular`.

**Verificación:** Para fc=200, fy=4200, b=25, d=50, As=14.726 cm²:
- β₁ = 0.850 (correcto, fc ≤ 280)
- a = As·fy / (0.85·f'c·b) = 14.726·4200 / (0.85·200·25) = 14.563 cm
- c = a / β₁ = 14.563 / 0.850 = 17.133 cm
- εs = 0.003·(50−17.133)/17.133 = 0.00576 → zona dúctil
- φ = 0.90
- Mn = 14.726·4200·(50−14.563/2)/100000 = 26.456 tf·m
- φMn = 0.90·26.456 = 23.810 tf·m

**Fix:** Revisar la página M1 (`src/app/flexion/rectangular/page.tsx`) y asegurarse que los StepCards muestren los valores que devuelve `analizarRectangular(result)` — no recalcular β₁ ni `a` manualmente en el JSX. Todos los valores deben venir del objeto `result` retornado por la función.

**Archivos a modificar:** `src/app/flexion/rectangular/page.tsx`

---

### BUG 2 — Es = 210000 vs 2040000
**Contexto:** El módulo de elasticidad del acero en `flexion.ts` es `Es = 210000 kgf/cm²`. Este valor es CORRECTO (2,040,000 kgf/cm² = 200,000 MPa → convertido = 2,040,000... hay discrepancia).

**Verificar:** El valor estándar ACI es Es = 200,000 MPa = 2,040,000 kgf/cm².
- `Es = 210000` kgf/cm² = 20,580 MPa → INCORRECTO
- `Es = 2040000` kgf/cm² = 200,000 MPa → CORRECTO

**Fix:** En `src/lib/hormigon/flexion.ts`, cambiar:
```typescript
export const Es = 210000;  // INCORRECTO
// por:
export const Es = 2040000; // CORRECTO: 200,000 MPa en kgf/cm²
```

Luego verificar que `getEpsY(fy=4200)` = 4200/2040000 = 0.00206 (correcto).
Verificar que `getPhi` siga funcionando bien con el nuevo Es.

---

### BUG 3 — Ejemplo EJ01 carga incorrecta
**Síntoma:** El botón "Cargar EJ01" en M1 carga datos que producen un resultado distinto al esperado en el ejemplo del PDF.

**Verificar contra:** `estudio/Hormigón Armado/EJERCICIOS/EJ01_Vigas_Flexion.md`

---

## TAREAS EN ORDEN DE PRIORIDAD

### TAREA 1 (URGENTE): Corregir Es en flexion.ts
Cambiar `Es = 210000` → `Es = 2040000` en `src/lib/hormigon/flexion.ts`.
Esto afecta: εy, getPhi(), y todos los módulos M1–M4.
Después del cambio, ejecutar `npx tsc --noEmit` para verificar que no hay errores.

### TAREA 2: Auditar M1 página — discrepancia de cálculo
Leer `src/app/flexion/rectangular/page.tsx` completo.
Verificar que todos los valores en los StepCards vienen del objeto `result` de `analizarRectangular()`.
Si hay valores hardcodeados o recalculados en el JSX, eliminarlos y usar `result.*`.

### TAREA 3: Auditar M2, M3, M4, M5, M6 — misma verificación
Para cada página de calculadora:
1. Leer la página
2. Verificar que los StepCards usan `result.*` y no recalculan valores
3. Verificar que la función del motor se llama con los parámetros correctos
4. Testear con los ejemplos de los ejercicios MD

### TAREA 4: Auto-cálculo y UX
- Verificar que el cálculo se dispara automáticamente al cambiar inputs (useEffect + debounce)
- Verificar que los SVG se actualizan con cada cálculo
- Verificar que los botones "Cargar EJxx" cargan los datos correctos de los MDs

### TAREA 5: Push a GitHub
Después de cada corrección:
```bash
git add -A
git commit -m "fix: descripción del fix"
git push
```
Vercel redespliega automáticamente.

---

## WORKFLOW DE DESARROLLO

```bash
# Verificar TypeScript (en el directorio del proyecto)
npx tsc --noEmit

# Servidor de desarrollo
npm run dev
# → http://localhost:3000

# Push a producción
git add -A && git commit -m "mensaje" && git push
```

---

## FÓRMULAS CLAVE (referencia rápida)

### β₁ (ACI 318-19)
```
fc ≤ 280 kgf/cm²  → β₁ = 0.85
fc > 280 kgf/cm²  → β₁ = max(0.65, 1.05 - 0.0007·fc)
```

### Bloque de compresión
```
a = As·fy / (0.85·f'c·b)
c = a / β₁
```

### Deformación acero
```
εs = Ecu·(d - c) / c     donde Ecu = 0.003
εy = fy / Es              donde Es = 2,040,000 kgf/cm²
```

### Factor φ (ACI 318-19)
```
εs ≥ 0.005          → φ = 0.90  (dúctil)
εy ≤ εs < 0.005     → φ = 0.65 + 0.25·(εs - εy)/(0.005 - εy)  (transición)
εs < εy             → φ = 0.65  (frágil, acero no fluye)
```

### Momento nominal
```
Mn = As·fy·(d - a/2) / 100000   [tf·m]  (cuando acero fluye)
φMn = φ·Mn
```

### Cuantías
```
ρ_b   = 0.85·β₁·f'c/fy · 6300/(6300+fy)
ρ_max = 0.85·β₁·f'c/fy · Ecu/(Ecu+0.005)
ρ_min = max(0.8·√f'c/fy,  14/fy)
ρ     = As/(b·d)
```

---

## EJEMPLOS DE REFERENCIA

Los ejercicios resueltos están en:
- `estudio/Hormigón Armado/EJERCICIOS/EJ01_Vigas_Flexion.md`
- `estudio/Hormigón Armado/EJERCICIOS/EJ02_Viga_Doble_Fila.md`
- `estudio/Hormigón Armado/EJERCICIOS/EJ03_Viga_Doble_Armadura.md`
- `estudio/Hormigón Armado/EJERCICIOS/EJ04_Diseno_Viga_Rectangular.md`

Úsalos para verificar que los resultados de la calculadora coinciden exactamente.

---

## REGLAS IMPORTANTES

1. **Nunca recalcular en el JSX** — todos los valores numéricos en los StepCards deben venir del objeto `result` del motor de cálculo.
2. **TypeScript strict** — nunca `any`, siempre tipar correctamente.
3. **No cambiar el design system** — colores, fondos y tipografía están definidos y no se modifican.
4. **No tocar los archivos de la sección Materiales** — ya funciona correctamente.
5. **Verificar con `npx tsc --noEmit`** después de cada cambio antes de hacer push.
6. **Los SVG son componentes React puros** — solo reciben props y retornan JSX, sin efectos.

---

*Generado automáticamente — HormigonCalc v0.2 — Mayo 2026*
