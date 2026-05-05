# EJ03 — Resistencia Nominal: Viga con Doble Armadura
**Fuente:** Ejemplo 3. Viga con doble armadura.pdf  
**Tipo:** Análisis — Determinar Mn con acero de compresión (A's) y tracción (As)

---

## 📋 Enunciado

> Determine la resistencia nominal de la viga con doble armadura detallada en la figura.  
> Considere hormigón G18 y acero A630-420H.

---

## 📐 Datos de la Sección

```
SECCIÓN TRANSVERSAL — DOBLE ARMADURA

←— b = 35 cm —→
 _______________
|  ● ●          |  ← A's = 2ϕ10 (compresión), a d' desde arriba
|               |  ↑ h = 70 cm
|               |  |
|               |  |
|               |  |
|  ■ ■ ■ ■ ■   |  ← As = 5ϕ22 (tracción), a d desde arriba
|_______________|  ↓
```

| Dato | Valor | Descripción |
|---|---|---|
| Ancho | b = 35 cm | Ancho de la sección |
| Altura total | h = 70 cm | Altura total de la sección |
| Peralte efectivo | d = 65 cm | Al centroide del acero de tracción |
| Recubrimiento acero compresión | d' ≈ 3 cm | Al centroide de A's desde la fibra comprimida |
| N° barras tracción | nb = 5 | Fila única de tracción |
| Diámetro barras tracción | ϕb = 22 mm = 2,2 cm | Para As |
| N° barras compresión | n's = 2 | Barras de compresión |
| Diámetro barras compresión | ϕ's = 10 mm = 1,0 cm | Para A's |
| f'c | 180 kgf/cm² | G18 |
| fy | 4.200 kgf/cm² | A630-420H |
| β | 0,85 | f'c ≤ 280 kgf/cm² |

---

## 🔑 CONCEPTO CLAVE — ¿Por qué doble armadura y cómo afecta el cálculo?

La **doble armadura** (A's en la zona comprimida + As en la zona de tracción) se usa cuando:
1. La sección con solo As no puede resistir el Mu requerido (sería ρ > ρmax)
2. Se necesita reducir la fluencia diferida (A's en compresión reduce deflexiones a largo plazo hasta un 50%)
3. Se requiere mayor ductilidad

**El método de cálculo descompone la sección en dos "vigas virtuales":**

```
VIGA REAL (doble armadura)    =    VIGA 1 (par de fuerzas)    +    VIGA 2 (Whitney simple)

    ● ●  (A's)                      ● ●  (A's)                        —
    |                          →    |                          +       |
    ■ ■ ■ ■ ■  (As)                ■ ■  (As1 = A's)                  ■ ■ ■  (As2 = As − As1)

Mn_total = Mn1 + Mn2
```

**Viga 1:** El acero de compresión A's forma un **par de fuerzas** con la porción equivalente As1 = A's del acero de tracción.  
**Viga 2:** El resto del acero de tracción As2 = As − As1 actúa con el bloque de compresión de hormigón (Whitney puro).

---

## ⚡ Cálculo de Áreas de Acero

**Área acero de tracción:**
$$A_s = n_b \cdot \frac{\pi \cdot \phi_b^2}{4} = 5 \cdot \frac{\pi \cdot 2{,}2^2}{4} = 5 \times 3{,}801 = \mathbf{19{,}005 \text{ cm}^2}$$

**Área acero de compresión:**
$$A'_s = n'_b \cdot \frac{\pi \cdot \phi'^2_b}{4} = 2 \cdot \frac{\pi \cdot 1{,}0^2}{4} = 2 \times 0{,}785 = \mathbf{1{,}571 \text{ cm}^2}$$

---

## ⚡ Método de Descomposición en Dos Vigas

### Paso 1 — Dividir el acero de tracción

La parte del acero de tracción que "hace pareja" con A's es As1 = A's (por equilibrio de fuerzas internas en la Viga 1).

El resto del acero de tracción trabaja con el bloque de compresión de hormigón (Viga 2).

$$A_{s1} = A'_s = 1{,}571 \text{ cm}^2 \quad \text{(equilibrio con la fuerza de compresión del acero A's)}$$

$$A_{s2} = A_s - A_{s1} = 19{,}005 - 1{,}571 = \mathbf{17{,}434 \text{ cm}^2} \quad \text{(equilibrio con el bloque de hormigón)}$$

---

### Paso 2 — Verificar fluencia del acero de tracción (As)

Suponer que **todo el acero fluye** y verificar al final.

**Bloque de compresión de hormigón para Viga 2:**
$$a = \frac{A_{s2} \cdot f_y}{0{,}85 \cdot f'_c \cdot b} = \frac{17{,}434 \times 4{,}200}{0{,}85 \times 180 \times 35} = \frac{73.223}{5.355} = \mathbf{13{,}675 \text{ cm}}$$

$$c = \frac{a}{\beta} = \frac{13{,}675}{0{,}85} = \mathbf{16{,}088 \text{ cm}}$$

**Deformación del acero de tracción As:**
$$\varepsilon_s = \varepsilon_{cu} \cdot \frac{d - c}{c} = 0{,}003 \times \frac{65 - 16{,}088}{16{,}088} = 0{,}003 \times 3{,}042 = \mathbf{0{,}00913}$$

**Deformación de fluencia:**
$$\varepsilon_y = \frac{f_y}{E_s} = \frac{4{,}200}{210{,}000} = 0{,}002$$

$$\varepsilon_s = 0{,}00913 > \varepsilon_y = 0{,}002 \quad \checkmark \text{ ✅ Acero de tracción fluye}$$

---

### Paso 3 — Verificar fluencia del acero de compresión (A's)

El acero de compresión A's está ubicado a d' = 3 cm desde la fibra comprimida (arriba). Usando el diagrama de deformaciones con εcu = 0,003 en la fibra superior:

```
DIAGRAMA DE DEFORMACIONES

Fibra superior  →  εcu = 0,003 (compresión)
                    |
              c = 16,088 cm
                    |
Eje neutro     →  ε = 0
                    |
A's (d'=3cm)   →  ε's = ? (compresión, arriba del eje neutro)
                    |
As (d=65cm)    →  εs = 0,00913 (tracción)
```

Como A's está **por encima del eje neutro** (d' = 3 cm < c = 16,088 cm), el acero de compresión está en la zona comprimida:

$$\varepsilon'_s = \varepsilon_{cu} \cdot \frac{c - d'}{c} = 0{,}003 \times \frac{16{,}088 - 3}{16{,}088} = 0{,}003 \times 0{,}8135 = \mathbf{0{,}00244}$$

$$\varepsilon'_s = 0{,}00244 > \varepsilon_y = 0{,}002 \quad \checkmark \text{ ✅ Acero de compresión también fluye}$$

> ⚠️ **Observación crítica:** Si ε's < εy, el acero de compresión **no fluye** y se debe usar f's = Es·ε's < fy en lugar de fy. Este es el caso más frecuente de error en el examen. Siempre verificar.

---

### Paso 4 — Calcular Mn1 (aporte del par de fuerzas)

La Viga 1 consiste en el par de fuerzas entre A's (compresión) y As1 (tracción equivalente). Ambos fluyen, por lo que las fuerzas son iguales en magnitud y separadas por el brazo (d − d'):

$$M_{n1} = A'_s \cdot f_y \cdot (d - d') = 1{,}571 \times 4{,}200 \times (65 - 3)$$
$$= 1{,}571 \times 4{,}200 \times 62 = \mathbf{408.890 \text{ kgf·cm} = 4{,}089 \text{ tf·m}}$$

---

### Paso 5 — Calcular Mn2 (aporte del bloque de hormigón con As2)

La Viga 2 es una sección rectangular simple con As2 y el bloque de Whitney:

$$M_{n2} = A_{s2} \cdot f_y \cdot \left(d - \frac{a}{2}\right) = 17{,}434 \times 4{,}200 \times \left(65 - \frac{13{,}675}{2}\right)$$
$$= 17{,}434 \times 4{,}200 \times (65 - 6{,}838)$$
$$= 17{,}434 \times 4{,}200 \times 58{,}163$$
$$= \mathbf{4.257.800 \text{ kgf·cm} = 42{,}578 \text{ tf·m}}$$

---

### Paso 6 — Mn total

$$\boxed{M_n = M_{n1} + M_{n2} = 4{,}089 + 42{,}578 = \mathbf{46{,}667 \text{ tf·m}}}$$

> **Resultado del PDF de referencia:** Mn ≈ 46,551 tf·m (diferencia menor por redondeo en As exacto)

---

## 📊 Diagrama de Fuerzas Internas

```
ESTADO ÚLTIMO — FUERZAS INTERNAS

←— b = 35 cm —→
 _______________
|///////////////|  ← bloque Whitney: 0,85·f'c, altura a = 13,68 cm
| ● ●  (A's)   |  ← d' = 3 cm (compresión del acero: C's = A's·fy)
|               |
|_______________|  ← a = 13,68 cm
|               |
|─ ─ ─ ─ ─ ─ ─|  ← EJE NEUTRO c = 16,09 cm
|               |
|               |
|  ■ ■ ■ ■ ■   |  ← As = 5ϕ22, d = 65 cm (tracción: T = As·fy)
|_______________|

EQUILIBRIO:
C_hormigón = 0,85 × 180 × 13,68 × 35 = 73.224 kgf = 73,22 tf
C_acero    = A's × fy = 1,571 × 4.200 = 6.598 kgf = 6,60 tf
T_total    = As × fy = 19,005 × 4.200 = 79.821 kgf = 79,82 tf

Verificación: C_hormigón + C_acero = 73,22 + 6,60 = 79,82 tf = T_total ✅
```

---

## ⚡ Verificación por Cuantías

**Cuantía de tracción:**
$$\rho = \frac{A_s}{b \cdot d} = \frac{19{,}005}{35 \times 65} = \frac{19{,}005}{2.275} = 0{,}00836$$

**Cuantía balanceada (referencia):**
$$\rho_b = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{6.300}{6.300 + f_y} = \frac{0{,}85 \times 0{,}85 \times 180}{4.200} \cdot \frac{6.300}{10.500} = 0{,}02454$$

$$\rho = 0{,}00836 < \rho_b = 0{,}02454 \quad ✅ \text{ Falla dúctil}$$

**Clasificación de la sección:**
$$\varepsilon_t = \varepsilon_s = 0{,}00913 > 0{,}005 \quad → \text{Sección controlada por tracción} → \varphi = 0{,}90$$

**Resistencia de diseño:**
$$\varphi M_n = 0{,}90 \times 46{,}667 = \mathbf{42{,}000 \text{ tf·m}}$$

---

## ⚠️ Consideraciones Críticas y Variantes

**Consideración 1 — ¿Qué pasa si A's no fluye?**  
Si ε's < εy, la fuerza del acero de compresión es C's = A's·Es·ε's (no A's·fy). La ecuación de equilibrio C = T se vuelve función de c (incógnita) y hay que resolver una ecuación cuadrática:
$$0{,}85 \cdot f'_c \cdot \beta \cdot c \cdot b + A'_s \cdot E_s \cdot \varepsilon_{cu} \cdot \frac{c-d'}{c} = A_s \cdot f_y$$

**Consideración 2 — La posición de d' es crítica**  
d' pequeño → A's cerca de la fibra comprimida → mayor deformación ε's → más probable que fluya.  
d' grande → A's más alejada → menor ε's → más probable que no fluya. El valor crítico es d'/c < 1 − fy/(600).

**Consideración 3 — Beneficios de la doble armadura**  
- Aumenta Mn en hasta un 15% respecto a la sección simple equivalente
- Reduce la deflexión diferida (fluencia) hasta un 50%
- Aumenta la ductilidad de la sección hasta un 40%

**Consideración 4 — As1 = A's (no Es·A's)**  
Un error frecuente es usar As1 = A's·(Es/Ec) en lugar de As1 = A's directamente. La descomposición en dos vigas se hace en términos de fuerzas, no de rigideces: As1·fy = A's·fy → As1 = A's.

**Variante A — ¿Qué pasa si se retira A's?**  
Sin acero de compresión, la sección con As = 19,005 cm² tendría ρ = 0,00836 < ρmax → podría resistir sola, pero con menor ductilidad y mayores deflexiones a largo plazo.

**Variante B — Diseño con doble armadura (inverso)**  
Si se da Mu y la sección simple no alcanza (ρ > ρmax), se fija ρ = ρmax, se calcula Mn1 = φ·Mn_simple, la diferencia Mn2 = Mu − Mn1 define As1 = Mn2/(φ·fy·(d−d')), y finalmente A's = As1.

**Error común 1:** Calcular a usando As total en lugar de As2 → sobreestima a y subestima Mn2.  
**Error común 2:** No verificar fluencia de A's y asumir directamente f's = fy cuando ε's podría ser < εy.  
**Error común 3:** Olvidar que el equilibrio total es C_hormigón + C_acero = T → calcular a con solo una parte.

---

## 📌 Esquema del Procedimiento (Doble Armadura)

```
1. Calcular As y A's con las barras dadas
         ↓
2. Asumir ambos aceros fluyen (fs = f's = fy)
         ↓
3. Separar: As1 = A's, As2 = As − As1
         ↓
4. Calcular a = As2·fy/(0,85·f'c·b) y c = a/β
         ↓
5. Verificar ε's = εcu·(c−d')/c ≥ εy  →  ✅ fluye / ❌ usar f's = Es·ε's
         ↓
6. Verificar εs = εcu·(d−c)/c ≥ εy  →  ✅ fluye / ❌ sección sobrearmada
         ↓
7. Mn1 = A's·fy·(d−d')
         ↓
8. Mn2 = As2·fy·(d−a/2)
         ↓
9. Mn = Mn1 + Mn2
         ↓
10. φMn = 0,90·Mn  (si εt ≥ 0,005)
```

---

*Anterior: [EJ02 — Viga con doble fila](EJ02_Viga_Doble_Fila.md)*  
*Siguiente: [EJ04 — Diseño de viga rectangular](EJ04_Diseno_Viga_Rectangular.md)*
