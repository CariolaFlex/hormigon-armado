# ⚙️ Métodos y Aplicación — Hormigón Armado
**Profesor:** Ing. Miguel Colque González | **Semestre:** 1S 2026

> Métodos de cálculo explicados con pasos, variantes y casos especiales.

---

## MÉTODO 1 | Cálculo del Módulo de Elasticidad del Hormigón (Ec)

**Fuente:** PDF 1 — Comportamiento Mecánico del Hormigón

### Propósito
Determinar la rigidez del hormigón para calcular deformaciones elásticas, deflexiones y análisis de estructura.

### Fórmulas

**Para hormigón de peso normal** (wc = 2.200–2.300 kg/m³):
$$E_c = 4700\sqrt{f'_c} \quad [MPa]$$

**Para hormigón de cualquier densidad** (fórmula general ACI):
$$E_c = 0{,}14 \cdot w_c^{1.5} \cdot \sqrt{f'_c} \quad [MPa]$$

### Pasos de aplicación:
1. Identificar f'c del hormigón en MPa.
2. Verificar la densidad del hormigón (¿normal o liviano?).
3. Si es peso normal → usar fórmula simplificada.
4. Si es liviano → usar fórmula general con wc.
5. ⚠️ Si f'c > 40 MPa → la fórmula ACI sobreestima Ec, usar expresión para alta resistencia.

### Variantes y casos especiales:
- **Hormigón liviano:** usar wc real medido, no asumir 2.300.
- **Alta resistencia (f'c > 40 MPa):** la fórmula simplificada no es válida.
- **Verificación de deflexiones:** siempre usar Ec junto con el momento de inercia efectivo Ie (no la inercia bruta).

---

## MÉTODO 2 | Cálculo de Fluencia según ACI 209R

**Fuente:** PDF 1 — Comportamiento Mecánico del Hormigón

### Propósito
Estimar la deformación adicional que acumula el hormigón en el tiempo bajo cargas sostenidas (peso propio, cargas permanentes).

### Fórmula general:
$$\varepsilon_{fl}(t) = \varepsilon_{elástica} \cdot C_u \cdot K_t \cdot K_a \cdot K_h \cdot K_{th} \cdot K_s \cdot K_f \cdot K_e$$

### Pasos de aplicación:
1. Calcular la **deformación elástica inicial** (σ/Ec).
2. Determinar **Cu**: usar 2,35 si no hay datos de laboratorio.
3. Calcular **Kt** con el tiempo t (días desde aplicación de la carga):
   $$K_t = \frac{t^{0.6}}{10 + t^{0.6}}$$
4. Calcular **Ka** según método de curado y edad de primera carga (ti):
   - Curado húmedo: Ka = 1,25·ti⁻⁰·¹¹⁸
   - Curado vapor: Ka = 1,13·ti⁻⁰·⁰⁹⁴
5. Calcular **Kh** según humedad relativa H:
   - H ≤ 40%: Kh = 1
   - H > 40%: Kh = 1,27 − 0,0067·H
6. Calcular **Kth** según espesor h:
   - h ≤ 150 mm: ver tabla ACI 209R
   - 150 < h ≤ 400 mm (1er año): Kth = 1,14 − 0,00092·h
   - 150 < h ≤ 400 mm (último): Kth = 1,10 − 0,00067·h
7. Calcular **Ks**: Ks = 0,82 + 0,00264·S (S = revenimiento en mm)
8. Calcular **Kf**: Kf = 0,88 + 0,00264·%finos
9. Calcular **Ke**: Ke = 0,46 + 0,09·%aire ≥ 1,0
10. Multiplicar todos los factores para obtener la deformación de fluencia.

### Variante — Deformación total a largo plazo:
$$\varepsilon_{total} = \varepsilon_{elástica} \cdot (1 + C_{fluencia\_total})$$

Donde C_fluencia_total = Cu · Ka · Kh · Kth · Ks · Kf · Ke (Kt=1 para t→∞).

---

## MÉTODO 3 | Cálculo de Retracción según ACI 209R

**Fuente:** PDF 1 — Comportamiento Mecánico del Hormigón

### Propósito
Estimar el acortamiento del hormigón por secado a lo largo del tiempo.

### Fórmula general:
$$\varepsilon_{sh}(t) = \varepsilon_{shu} \cdot S_t \cdot S_h \cdot S_{th} \cdot S_s \cdot S_f \cdot S_e \cdot S_c$$

### Pasos de aplicación:
1. Establecer **εshu**: usar 0,00078 si no hay datos de laboratorio.
2. Calcular **St** según método de curado y tiempo desde fin del curado:
   - Curado húmedo (desde día 7): St = t/(t+35)
   - Curado vapor (desde día 1-3): St = t/(t+55)
3. Calcular **Sh** según humedad H:
   - H ≤ 40%: Sh = 1
   - 40% < H ≤ 80%: Sh = 1,4 − 0,0102·H
   - 80% < H ≤ 100%: Sh = 3,0 − 0,03·H
4. Calcular **Sth** según espesor h:
   - h ≤ 150 mm: ver tabla ACI 209R
   - 150 < h ≤ 400 mm (1er año): Sth = 1,23 − 0,0015·h
   - 150 < h ≤ 400 mm (último): Sth = 1,17 − 0,00114·h
5. Calcular **Ss**: Ss = 0,89 + 0,00161·S
6. Calcular **Sf**:
   - %finos ≤ 50%: Sf = 0,30 + 0,014·%finos
   - %finos > 50%: Sf = 0,90 + 0,002·%finos
7. Calcular **Se**: Se = 0,95 + 0,008·%aire
8. Calcular **Sc**: Sc = 0,75 + 0,00061·c (c = contenido de cemento en kg/m³)
9. Multiplicar todos los factores.

---

---

## MÉTODO 4 | Determinación de la tensión del acero en una sección (modelo EPP)

**Fuente:** PDF 2 — Comportamiento Mecánico del Acero

### Propósito
Determinar la tensión fs que actúa en el acero de refuerzo dado un estado de deformación εs en la sección.

### Regla del modelo EPP:

$$f_s = \begin{cases} E_s \cdot \varepsilon_s & \text{si } \varepsilon_s < \varepsilon_y \quad \text{(rango elástico)} \\ f_y & \text{si } \varepsilon_s \geq \varepsilon_y \quad \text{(acero fluido)} \end{cases}$$

Con: Es = 210.000 MPa, εy = fy/Es

### Pasos de aplicación:
1. Determinar la deformación εs del acero a partir del diagrama de deformaciones de la sección (compatibilidad geométrica).
2. Calcular εy = fy / Es = fy / 210.000.
3. Comparar εs con εy:
   - Si εs < εy → fs = Es·εs (el acero aún no ha fluido, trabaja elásticamente).
   - Si εs ≥ εy → fs = fy (el acero ha fluido, trabaja a tensión constante fy).
4. En el diseño a flexión del ACI, se verifica que εs ≥ εy para garantizar falla dúctil.

### Variantes:
- **Doble armadura:** aplicar la misma regla por separado para el acero de tracción (As) y el acero de compresión (A's). El acero comprimido puede o no haber fluido según su deformación.
- **Verificación de ductilidad:** el ACI exige εt ≥ 0,004 (y preferentemente ≥ 0,005) en el acero de tracción extremo para considerar la sección "controlada por tracción".

---

## MÉTODO 5 | Cálculo de la deformación de fluencia del acero (εy)

**Fuente:** PDF 2 — Comportamiento Mecánico del Acero

### Fórmula:
$$\varepsilon_y = \frac{f_y}{E_s} = \frac{f_y}{210.000}$$

### Valores directos por tipo de acero:

| Acero | fy (MPa) | εy |
|---|---|---|
| A440-280H | 280 | 0,00133 |
| A630-420H | 420 | **0,002** |
| A700-520H | 520 | 0,00248 |
| A730-550H | 550 | 0,00262 |

---

## MÉTODO 6 | Evaluación de fatiga de bajo ciclaje — Coffin-Manson + Miner

**Fuente:** PDF 2 — Comportamiento Mecánico del Acero

### Propósito
Evaluar si el acero de refuerzo sobrevivirá la fatiga acumulada bajo cargas sísmicas de amplitud variable.

### Paso 1 — Coffin-Manson: ciclos hasta la falla para cada amplitud
$$\varepsilon_A = M \cdot (2N_f)^m \quad \Rightarrow \quad 2N_f = \left(\frac{\varepsilon_A}{M}\right)^{1/m}$$
Con M = 0,11 y m = −0,44.

### Paso 2 — Índice de Miner: daño acumulado
$$D = \sum_i \frac{1}{2N_{fi}}$$

### Paso 3 — Criterio de falla
Si **D ≥ 1** → falla por fatiga de bajo ciclaje.

### Ejemplo de aplicación:
- Ciclos 1 y 2: εA = 2% → 2Nf1 = (0,02/0,11)^(1/−0,44) → calcular
- Ciclos 3 y 4: εA = 1% → 2Nf2 = (0,01/0,11)^(1/−0,44) → calcular
- D = 2/2Nf1 + 2/2Nf2 → si D ≥ 1, falla esperada.

---

---

## MÉTODO 7 | Determinación de la carga última de diseño (Wu) — Combinaciones LRFD

**Fuente:** PDF 3 — Criterios de Diseño y Normas / NCh3171:2017

### Propósito
Obtener la carga última amplificada Wu que genera las solicitaciones de diseño (Mu, Vu, Nu) para ingresar al diseño estructural por el método LRFD.

### Combinaciones LRFD (NCh3171:2017) — usar la más desfavorable:

| # | Combinación | Caso típico |
|---|---|---|
| 1 | 1,4D | Solo carga muerta |
| **2** | **1,2D + 1,6L + 0,5(Lr o S o R)** | **Cargas gravitacionales — habitualmente la crítica** |
| 3 | 1,2D + 1,6(Lr o S o R) + (1,0L o 0,5W) | Cubierta con nieve |
| 4 | 1,2D + 1,0W + 1,0L + 0,5(Lr o S o R) | Viento significativo |
| 5 | 0,9D + 1,0W | Estabilidad ante volcamiento por viento |
| 6 | 1,2D + 1,0E + 1,0L + 0,2S | Sismo |
| 7 | 0,9D + 1,0E | Estabilidad ante volcamiento por sismo |

### Pasos de aplicación (caso gravitacional típico — vigas de edificio):
1. Determinar carga muerta D [kN/m² o kN/m]: peso propio + cargas permanentes.
2. Determinar carga viva L [kN/m²]: según NCh1537 por tipo de ocupación.
3. Verificar si aplica reducción de sobrecarga (área influencia > 36 m², L < 500 kgf/m², etc.).
4. Calcular carga última distribuida:
   $$w_u = 1{,}2 \cdot w_D + 1{,}6 \cdot w_L \quad [kN/m]$$
5. Con wu, calcular solicitaciones: Mu = wu·L²/8 (viga simplemente apoyada), Vu = wu·L/2.
6. Verificar también combinación 1 (1,4D) — puede ser crítica si L es pequeña.

### Variante — reducción de sobrecarga de uso (NCh1537):
Si se cumplen las condiciones (área influencia > 36 m², L₀ < 500 kgf/m², no estacionamiento, no público):
$$L = L_0 \left(0{,}25 + \frac{4{,}57}{\sqrt{K_{LL} \cdot A_T}}\right) \geq \begin{cases} 0{,}5 \cdot L_0 & \text{(1 piso)} \\ 0{,}4 \cdot L_0 & \text{(varios pisos)} \end{cases}$$

---

## MÉTODO 8 | Verificación de resistencia (ecuación fundamental LRFD)

**Fuente:** PDF 3 — Criterios de Diseño y Normas

### Principio:
$$\text{Solicitación última} \leq \phi \cdot R_n$$

### Para flexión (vigas):
$$M_u \leq \phi \cdot M_n \quad \text{con } \phi = 0{,}90 \text{ (sección controlada por tracción)}$$

### Para corte:
$$V_u \leq \phi \cdot V_n \quad \text{con } \phi = 0{,}75$$

### Para compresión axial (columnas con estribos):
$$P_u \leq \phi \cdot P_n \quad \text{con } \phi = 0{,}65$$

### Pasos:
1. Calcular la solicitación última (Mu, Vu, Nu) con las combinaciones de carga.
2. Calcular la resistencia nominal Rn con las fórmulas del código (ACI 318 / NCh430).
3. Aplicar el factor φ correspondiente al tipo de solicitación.
4. Verificar la desigualdad: si Solicitación ≤ φ·Rn → OK; si no → rediseñar.

---

---

## ⭐ MÉTODO 9 | Análisis de sección rectangular simplemente armada — Bloque de Whitney

**Fuente:** PDF 4 — Vigas en Flexión

### Propósito
Dado: b, h, d, As, f'c, fy → Encontrar: φMn (verificación).

### Paso a paso:

**Paso 1 — Calcular β:**
- Si f'c ≤ 280 kgf/cm² (≈ 27,5 MPa): β = 0,85
- Si f'c > 280 kgf/cm²: β = 1,05 − 0,0007·f'c → verificar 0,65 ≤ β ≤ 0,85

**Paso 2 — Asumir acero fluye (fs = fy) y calcular a:**
$$a = \frac{A_s \cdot f_y}{0{,}85 \cdot f'_c \cdot b}$$

**Paso 3 — Calcular c:**
$$c = \frac{a}{\beta}$$

**Paso 4 — Verificar deformación del acero:**
$$\varepsilon_s = 0{,}003 \cdot \frac{d - c}{c}$$
- Si εs ≥ εy = fy/Es → ✅ acero fluye, supuesto correcto → continuar.
- Si εs < εy → ❌ acero NO fluye → resolver ecuación cuadrática (ver Método 10).

**Paso 5 — Determinar φ según εt = εs:**
- εt ≥ 0,005 → φ = 0,90
- 0,002 < εt < 0,005 → φ = 0,65 + (εt − 0,002)·(250/3) [interpolación lineal]
- εt ≤ 0,002 → φ = 0,65 (y revisar el diseño: sección frágil ❌)

**Paso 6 — Calcular Mn y φMn:**
$$M_n = A_s \cdot f_y \cdot \left(d - \frac{a}{2}\right)$$
$$\varphi M_n = \varphi \cdot M_n$$

**Paso 7 — Verificar: φMn ≥ Mu**

---

## ⭐ MÉTODO 10 | Análisis con falla por compresión (acero no fluye)

**Fuente:** PDF 4 — Vigas en Flexión

### Propósito
Cuando en el Método 9 se obtiene εs < εy → el acero no fluye → se debe resolver una ecuación cuadrática.

### Procedimiento:

**Paso 1 — Plantear la ecuación de equilibrio C = T con fs = εs·Es:**
$$f_s = 0{,}003 \cdot \frac{\beta d - a}{a} \cdot E_s$$
$$0{,}85 \cdot f'_c \cdot a \cdot b = A_s \cdot 0{,}003 \cdot \frac{\beta d - a}{a} \cdot E_s$$

**Paso 2 — Reordenar como ecuación cuadrática en a:**
$$\frac{0{,}85 \cdot f'_c}{\rho \cdot 0{,}003 \cdot E_s} \cdot a^2 + d \cdot a - \beta \cdot d^2 = 0$$
Donde ρ = As/(b·d).

**Paso 3 — Resolver con fórmula cuadrática (tomar raíz positiva).**

**Paso 4 — Calcular fs, Mn y φMn:**
$$f_s = 0{,}003 \cdot \frac{\beta d - a}{a} \cdot E_s \leq f_y$$
$$M_n = A_s \cdot f_s \cdot \left(d - \frac{a}{2}\right)$$

---

## ⭐ MÉTODO 11 | Diseño de sección rectangular (dado Mu, encontrar As)

**Fuente:** PDF 4 — Vigas en Flexión

### Propósito
Dado: Mu, b, d (o h a definir), f'c, fy → Encontrar: As requerido.

### Paso a paso:

**Paso 1 — Calcular β** (igual que Método 9, Paso 1).

**Paso 2 — Calcular cuantías límite:**
$$\rho_{mín} = 0{,}8 \cdot \frac{\sqrt{f'_c}}{f_y} \geq \frac{14}{f_y}$$
$$\rho_{máx} = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{3}{8} \approx 0{,}32 \cdot \frac{\beta \cdot f'_c}{f_y} \quad (\text{para } \varepsilon_t \geq 0{,}005, \varphi = 0{,}90)$$

**Paso 3 — Calcular Rn = Mn requerido por unidad:**
$$R_n = \frac{M_u}{\varphi \cdot b \cdot d^2} \quad \text{(con } \varphi = 0{,}90 \text{ preliminar)}$$

**Paso 4 — Calcular ρ requerida:**
$$\rho = \frac{0{,}85 \cdot f'_c}{f_y} \left(1 - \sqrt{1 - \frac{2 \cdot R_n}{0{,}85 \cdot f'_c}}\right)$$

**Paso 5 — Verificar:** ρmín ≤ ρ ≤ ρmáx.  
- Si ρ > ρmáx → aumentar d o considerar doble armadura.
- Si ρ < ρmín → usar ρmín.

**Paso 6 — Calcular As = ρ·b·d.**

**Paso 7 — Seleccionar barras** (combinar diámetros para obtener As ≥ As calculado).

**Paso 8 — Verificar con As real:**
- Calcular a, c, εs → verificar φ real → calcular φMn real → verificar φMn ≥ Mu.

---

## ⭐ MÉTODO 12 | Análisis de viga con doble armadura (As y A's fluyen)

**Fuente:** PDF 4 — Vigas en Flexión

### Propósito
Dado: b, d, d', As, A's, f'c, fy → Encontrar: Mn (caso más común: ambos aceros fluyen).

### Paso a paso:

**Paso 1 — Verificar fluencia del acero de compresión A's:**
Primero calcular a tentativo asumiendo que A's fluye:
$$a_{tentativo} = \frac{(A_s - A'_s) \cdot f_y}{0{,}85 \cdot f'_c \cdot b}$$
$$c_{tentativo} = \frac{a_{tentativo}}{\beta}$$
$$\varepsilon'_s = 0{,}003 \cdot \frac{c_{tentativo} - d'}{c_{tentativo}}$$
Si ε's ≥ εy → ✅ A's fluye → continuar con este método.  
Si ε's < εy → ❌ A's no fluye → resolver caso 2 (ver abajo).

**Paso 2 — Descomponer en dos pares de fuerzas:**

*Par 1 (acero de compresión ↔ acero tracción equivalente):*
$$A_{s1} = A'_s \quad ; \quad M_{n1} = A_{s1} \cdot f_y \cdot (d - d')$$

*Par 2 (bloque Whitney ↔ acero tracción restante):*
$$A_{s2} = A_s - A'_s$$
$$a = \frac{A_{s2} \cdot f_y}{0{,}85 \cdot f'_c \cdot b} \quad ; \quad M_{n2} = A_{s2} \cdot f_y \cdot \left(d - \frac{a}{2}\right)$$

**Paso 3 — Calcular Mn total:**
$$M_n = M_{n1} + M_{n2}$$

**Paso 4 — Verificar εs del acero de tracción** (calcular c real y εs = 0,003·(d−c)/c → determinar φ).

### Caso A's no fluye:
Ecuación de equilibrio:
$$0{,}85 f'_c a b + A'_s \cdot 0{,}003 \cdot \frac{c - d'}{c} \cdot E_s = A_s \cdot f_y \quad (\text{si As fluye})$$
Sustituir c = a/β y resolver ecuación cuadrática en a.

---

## ⭐ MÉTODO 13 | Análisis de viga de sección T

**Fuente:** PDF 4 — Vigas en Flexión

### Propósito
Dado: b, bw, hf, d, As, f'c, fy → Encontrar: Mn.

### Paso a paso:

**Paso 1 — Verificar si el eje neutro está en el ala (a ≤ hf):**
Asumir eje neutro en el ala → calcular a como sección rectangular de ancho b:
$$a_{prueba} = \frac{A_s \cdot f_y}{0{,}85 \cdot f'_c \cdot b}$$
- Si a_prueba ≤ hf → ✅ el eje neutro está en el ala → analizar como viga rectangular de ancho b (Método 9).
- Si a_prueba > hf → ❌ el eje neutro está en el alma → continuar con Paso 2.

**Paso 2 — Eje neutro en el alma (a > hf):**

*Componente ala:*
$$A_{sf} = \frac{0{,}85 \cdot f'_c \cdot h_f \cdot (b - b_w)}{f_y}$$
$$M_{nf} = A_{sf} \cdot f_y \cdot \left(d - \frac{h_f}{2}\right)$$

*Componente alma:*
$$A_{sw} = A_s - A_{sf}$$
$$a = \frac{A_{sw} \cdot f_y}{0{,}85 \cdot f'_c \cdot b_w}$$
$$M_{nw} = A_{sw} \cdot f_y \cdot \left(d - \frac{a}{2}\right)$$

**Paso 3 — Mn total:**
$$M_n = M_{nf} + M_{nw}$$

**Paso 4 — Verificar εs y determinar φ** (usando c = a/β con bw).

---

## MÉTODO 14 | Verificación de cuantías mínima y máxima

**Fuente:** PDF 4 — Vigas en Flexión

### Cuantía mínima:
$$\rho_{mín} = 0{,}8 \cdot \frac{\sqrt{f'_c}}{f_y} \geq \frac{14}{f_y} \quad \text{[kgf/cm²]}$$
$$A_{s,mín} = \rho_{mín} \cdot b \cdot d$$

### Cuantía máxima (para φ = 0,90, εt ≥ 0,005):
$$\rho_{máx} \approx 0{,}32 \cdot \frac{\beta \cdot f'_c}{f_y}$$

### Cuantía balanceada:
$$\rho_b = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{6300}{6300 + f_y} \quad \text{[kgf/cm²]}$$

### Relación entre cuantías:
$$\rho_{mín} < \rho_{diseño} \leq \rho_{máx} \approx 0{,}75 \rho_b \quad \text{(aprox.)}$$

---

*Última actualización: PDF 4 — Vigas en Flexión*
