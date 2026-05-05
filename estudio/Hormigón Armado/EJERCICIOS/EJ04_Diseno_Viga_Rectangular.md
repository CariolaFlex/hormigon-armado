# EJ04 — Diseño de Sección: Viga Rectangular
**Fuente:** Ejemplo 4.2. Diseño viga rectangular.pdf  
**Tipo:** Diseño — Encontrar As dada la solicitación Mu

---

## 📋 Enunciado

> Diseñe la armadura de flexión de la viga simplemente apoyada de la figura.  
> Hormigón G25, acero A630-420H.  
> Dato: r = 5 cm al centroide del acero de tracción (desde la fibra inferior).

**Cargas:**
- Carga viva puntual en el centro de la luz: PL = 4 tf
- Carga viva distribuida: qL = 800 kgf/m = 0,8 tf/m
- Dimensiones preestablecidas: b = 25 cm, h = 50 cm, L = 6 m

---

## 📐 Datos de la Sección

```
SECCIÓN TRANSVERSAL — DISEÑO

←— b = 25 cm —→
 _______________
|               |  ↑ h = 50 cm
|               |  |
|               |  |
|               |  |
|_______________|  ↓
  ■ ■ ■ (As = ?)   ← a determinar, centroide a r = 5 cm del borde inferior

VIGA APOYADA — CARGADA

PL=4tf ↓
|——————↓——————|
←——————L = 6m——————→
↑ qL = 0,8 tf/m (distribuida)   ↑
```

| Dato | Valor | Descripción |
|---|---|---|
| Ancho | b = 25 cm | Fijo por arquitectura |
| Altura total | h = 50 cm | Fija por arquitectura |
| Peralte efectivo | d = h − r = 50 − 5 = 45 cm | Al centroide del acero |
| Luz | L = 6 m | Viga simplemente apoyada |
| f'c | 250 kgf/cm² | G25 |
| fy | 4.200 kgf/cm² | A630-420H |
| β | 0,85 | f'c ≤ 280 kgf/cm² |

---

## 🔑 CONCEPTO CLAVE — ¿En qué se diferencia el Diseño del Análisis?

| Análisis | Diseño |
|---|---|
| Se conoce la sección (b, d, As) | Se conocen b, d (dados) y Mu |
| Se busca cuánto resiste (Mn) | Se busca cuánta armadura poner (As) |
| Proceso: asumir fluencia → calcular a → calcular Mn | Proceso: igualar φMn = Mu → despejar As |
| Pregunta: ¿resiste? | Pregunta: ¿cuánto acero necesito? |

**En diseño, la incógnita es As.** Se invierte el procedimiento: se parte de Mu, se determina el Rn (coeficiente de resistencia), se encuentra ρ, y finalmente As = ρ·b·d.

---

## ⚡ Paso 1 — Calcular el Peso Propio

La viga tiene sus dimensiones definidas, por lo que su peso propio es una carga muerta a incluir:

$$q_{pp} = \gamma_c \cdot b \cdot h = 2{,}500 \text{ tf/m}^3 \times 0{,}25 \text{ m} \times 0{,}50 \text{ m} = \mathbf{0{,}3125 \text{ tf/m}}$$

---

## ⚡ Paso 2 — Calcular el Momento Último Mu

Se aplican las combinaciones LRFD (NCh3171). En este caso, las cargas son:
- Carga muerta distribuida: qD = qpp = 0,3125 tf/m
- Carga viva distribuida: qL = 0,8 tf/m
- Carga viva puntual: PL = 4 tf (al centro de la luz)

**Combinación crítica:** Wu = 1,2·D + 1,6·L

$$q_u = 1{,}2 \times 0{,}3125 + 1{,}6 \times 0{,}8 = 0{,}375 + 1{,}280 = \mathbf{1{,}655 \text{ tf/m}}$$

$$P_u = 1{,}6 \times P_L = 1{,}6 \times 4 = \mathbf{6{,}4 \text{ tf}}$$

**Momento máximo en la sección de mayor momento (centro de la viga):**

Para una viga simplemente apoyada con carga distribuida + carga puntual central:
$$M_u = \frac{q_u \cdot L^2}{8} + \frac{P_u \cdot L}{4}$$

$$M_u = \frac{1{,}655 \times 6^2}{8} + \frac{6{,}4 \times 6}{4} = \frac{1{,}655 \times 36}{8} + \frac{38{,}4}{4}$$

$$M_u = \frac{59{,}58}{8} + 9{,}6 = 7{,}4475 + 9{,}6 = \mathbf{17{,}048 \text{ tf·m}}$$

---

## ⚡ Paso 3 — Calcular Rn (Coeficiente de Resistencia Requerido)

El coeficiente de resistencia Rn es la "intensidad de momento" por unidad de b·d². Relaciona la solicitación con la geometría:

$$R_n = \frac{M_u}{\varphi \cdot b \cdot d^2}$$

Con φ = 0,90 (asumiendo sección controlada por tracción, a verificar):

$$R_n = \frac{17{,}048 \times 10^5 \text{ kgf·cm}}{0{,}90 \times 25 \times 45^2} = \frac{1.704.800}{45.563} = \mathbf{37{,}42 \text{ kgf/cm}^2}$$

> **Unidades:** Mu debe estar en kgf·cm (multiplicar tf·m × 10⁵ para convertir).

---

## ⚡ Paso 4 — Calcular la Cuantía ρ Requerida

Usando la fórmula inversa de la cuantía (despejada de Mn = ρ·b·d²·fy·(1−0,59·ρ·fy/f'c)):

$$\rho = \frac{0{,}85 \cdot f'_c}{f_y} \cdot \left[1 - \sqrt{1 - \frac{2 \cdot R_n}{0{,}85 \cdot f'_c}}\right]$$

$$\rho = \frac{0{,}85 \times 250}{4.200} \cdot \left[1 - \sqrt{1 - \frac{2 \times 37{,}42}{0{,}85 \times 250}}\right]$$

$$\rho = \frac{212{,}5}{4.200} \cdot \left[1 - \sqrt{1 - \frac{74{,}84}{212{,}5}}\right]$$

$$\rho = 0{,}05060 \cdot \left[1 - \sqrt{1 - 0{,}3522}\right]$$

$$\rho = 0{,}05060 \cdot \left[1 - \sqrt{0{,}6478}\right]$$

$$\rho = 0{,}05060 \cdot \left[1 - 0{,}8049\right]$$

$$\rho = 0{,}05060 \times 0{,}1951 = \mathbf{0{,}00987}$$

---

## ⚡ Paso 5 — Verificar Límites de Cuantía

**Cuantía mínima (ACI 318):**
$$\rho_{min} = \frac{0{,}8 \cdot \sqrt{f'_c}}{f_y} = \frac{0{,}8 \times \sqrt{250}}{4.200} = \frac{0{,}8 \times 15{,}81}{4.200} = \frac{12{,}65}{4.200} = 0{,}00301$$

Verificación alternativa: ρmin ≥ 14/fy = 14/4200 = 0,00333 → **ρmin = 0,00333** (gobierna el mayor)

**Cuantía balanceada:**
$$\rho_b = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{6.300}{6.300 + f_y} = \frac{0{,}85 \times 0{,}85 \times 250}{4.200} \cdot \frac{6.300}{10.500} = 0{,}04303 \times 0{,}6 = 0{,}02582$$

**Cuantía máxima** (para garantizar εt ≥ 0,005 → φ = 0,90):
$$\rho_{max} = 0{,}32 \cdot \frac{\beta \cdot f'_c}{f_y} = 0{,}32 \times \frac{0{,}85 \times 250}{4.200} = 0{,}32 \times \frac{212{,}5}{4.200} = 0{,}32 \times 0{,}05060 = \mathbf{0{,}01619}$$

**Resumen de verificación:**
$$\rho_{min} = 0{,}00333 \leq \rho = 0{,}00987 \leq \rho_{max} = 0{,}01619 \quad ✅$$

> ✅ **La cuantía está dentro del rango admisible.**  
> ✅ **φ = 0,90 es correcto** (ρ < ρmax garantiza εt ≥ 0,005).

---

## ⚡ Paso 6 — Calcular el Área de Acero Requerida

$$A_s = \rho \cdot b \cdot d = 0{,}00987 \times 25 \times 45 = \mathbf{11{,}10 \text{ cm}^2}$$

---

## ⚡ Paso 7 — Selección de Barras

**Objetivo:** Elegir un conjunto de barras comerciales que den As ≥ 11,10 cm² y quepan en el ancho b = 25 cm.

**Opción elegida — 3 barras ϕ22 mm:**
$$A_{s,real} = 3 \cdot \frac{\pi \cdot 2{,}2^2}{4} = 3 \times 3{,}801 = \mathbf{11{,}40 \text{ cm}^2}$$

$$A_{s,real} = 11{,}40 \text{ cm}^2 > A_{s,req} = 11{,}10 \text{ cm}^2 \quad ✅$$

**Verificación de separación entre barras** (mínimo ≥ diámetro barra ≥ 25 mm):  
Con b = 25 cm, recubrimiento lateral r_lat = 2,5 cm, estribo ϕ_e = 0,8 cm, y 3 barras ϕ22:

Espacio disponible = 25 − 2×(2,5 + 0,8) − 3×2,2 = 25 − 6,6 − 6,6 = 11,8 cm para 2 separaciones  
→ Separación = 11,8/2 = **5,9 cm > 2,5 cm ✅ y > 2,2 cm ✅**

---

## ⚡ Paso 8 — Verificación Final: φMn ≥ Mu

Con As_real = 11,40 cm²:

$$a = \frac{A_s \cdot f_y}{0{,}85 \cdot f'_c \cdot b} = \frac{11{,}40 \times 4{,}200}{0{,}85 \times 250 \times 25} = \frac{47.880}{5.313} = \mathbf{9{,}012 \text{ cm}}$$

$$M_n = A_s \cdot f_y \cdot \left(d - \frac{a}{2}\right) = 11{,}40 \times 4{,}200 \times \left(45 - \frac{9{,}012}{2}\right)$$
$$= 11{,}40 \times 4{,}200 \times (45 - 4{,}506) = 11{,}40 \times 4{,}200 \times 40{,}494$$
$$= \mathbf{1.939.666 \text{ kgf·cm} = 19{,}397 \text{ tf·m}}$$

$$\varphi M_n = 0{,}90 \times 19{,}397 = \mathbf{17{,}457 \text{ tf·m}}$$

$$\varphi M_n = 17{,}457 \text{ tf·m} > M_u = 17{,}048 \text{ tf·m} \quad ✅$$

> **Conclusión: La sección con 3ϕ22 resiste la solicitación de diseño.** El exceso es de (17,457 − 17,048)/17,048 = 2,4%, prácticamente al límite — lo que indica un diseño muy eficiente.

---

## 📊 Diagrama de Fuerzas Internas (Sección Diseñada)

```
SECCIÓN DISEÑADA — 3ϕ22

←— b = 25 cm —→
 _______________
|///////////////|  ← bloque Whitney: 0,85·f'c = 212,5 kgf/cm², altura a = 9,01 cm
|               |
|_______________|  ← a = 9,01 cm desde arriba
|               |
|               |
|─ ─ ─ ─ ─ ─ ─|  ← EJE NEUTRO c = a/β = 9,01/0,85 = 10,60 cm
|               |
|               |
|    ■ ■ ■      |  ← As = 3ϕ22 = 11,40 cm², d = 45 cm
|_______________|
       ↑ r = 5 cm

C = 0,85 × 250 × 9,01 × 25 = 47.803 kgf ≈ 47,80 tf
T = 11,40 × 4.200 = 47.880 kgf ≈ 47,88 tf ✅ (C ≈ T)

Brazo de palanca: d − a/2 = 45 − 4,506 = 40,49 cm
εs = 0,003 × (45 − 10,60)/10,60 = 0,003 × 3,245 = 0,00974 >> εy = 0,002 ✅
```

---

## ⚠️ Consideraciones Críticas y Variantes

**Consideración 1 — Siempre incluir el peso propio**  
qpp = γc·b·h es una carga muerta real. En este problema qpp = 0,3125 tf/m, que amplificada (×1,2) contribuye 0,375 tf/m al Wu. Omitirla subestima Mu.

**Consideración 2 — Conversión de unidades en Rn**  
Mu en tf·m × 10⁵ = Mu en kgf·cm. b y d en cm. El resultado Rn queda en kgf/cm². Este es el error de escala más frecuente en el examen.

**Consideración 3 — ρ máxima y el factor φ**  
El diseño siempre debe usar φ = 0,90, lo que requiere ρ ≤ ρmax (εt ≥ 0,005). Si la cuantía calculada supera ρmax, hay que modificar la sección (aumentar b o d), agregar doble armadura, o rediseñar.

**Consideración 4 — Selección de barras comerciales**  
Las barras comerciales tienen diámetros específicos (ϕ10, ϕ12, ϕ14, ϕ16, ϕ18, ϕ20, ϕ22, ϕ25, ϕ28, ϕ32 mm). La elección debe dar As_real ≥ As_req y cumplir separaciones mínimas.

**Variante A — ¿Y si ρ calculado > ρmax?**  
Opciones: (1) aumentar d (o h) → d mayor → Rn menor → ρ menor; (2) aumentar b → Rn menor → ρ menor; (3) usar doble armadura (A's en compresión para reducir el requerimiento de As).

**Variante B — ¿Cómo verificar separación mínima entre barras?**  
Espacio interior = b − 2·(r_recubrimiento + ϕ_estribo) − nb·ϕb. Dividir entre (nb−1) separaciones. Debe ser ≥ max(ϕb, 25 mm, 4/3·dg). Con dg = 20 mm → 4/3·dg ≈ 27 mm (usualmente gobierna 25 mm).

**Error común 1:** Calcular Rn usando b·d² en m³ en lugar de cm³ → valor de ρ completamente incorrecto.  
**Error común 2:** Usar d = h en lugar de d = h − r → subestima el brazo de palanca.  
**Error común 3:** Verificar φMn ≥ Mu con As_req en lugar de As_real → debe usarse As_real (el de las barras seleccionadas).  
**Error común 4:** Omitir la carga puntual en el cálculo de Mu → subestima el momento demandado.

---

## 📌 Esquema del Procedimiento de Diseño

```
DISEÑO — PROCEDIMIENTO GENERAL

1. Calcular qpp = γc·b·h
         ↓
2. Determinar Wu = 1,2·qD + 1,6·qL y Pu = 1,6·PL
         ↓
3. Calcular Mu (máximo de las combinaciones LRFD)
         ↓
4. Calcular Rn = Mu/(φ·b·d²)    [φ = 0,90 tentativo]
         ↓
5. Calcular ρ = (0,85·f'c/fy)·[1 − √(1 − 2·Rn/(0,85·f'c))]
         ↓
6. Verificar ρmin ≤ ρ ≤ ρmax
         ↓
7. Calcular As = ρ·b·d
         ↓
8. Seleccionar barras comerciales (As_real ≥ As_req, verificar separaciones)
         ↓
9. Verificar φMn ≥ Mu con As_real  →  ✅
```

---

*Anterior: [EJ03 — Viga con doble armadura](EJ03_Viga_Doble_Armadura.md)*
