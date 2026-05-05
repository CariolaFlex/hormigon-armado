# 04 — Vigas en Flexión ⭐ TEMA CENTRAL
**Fuente:** Vigas en Flexión.pdf (64 diapositivas)  
**Profesor:** Ing. Miguel Colque González | **Fecha:** Abril 2025

> Este es el tema más importante del ramo. Leer con máxima atención.  
> Foco especial en: Bloque de Whitney, secciones transversales, tipos de falla y cuantías.

---

## 1. Suposiciones Fundamentales del Diseño a Flexión

Antes de hacer cualquier cálculo, el modelo de diseño se apoya en 5 hipótesis que **simplifican el comportamiento real** a algo matemáticamente tratable sin perder validez práctica:

---

### Supuesto 1 — Secciones planas permanecen planas (Bernoulli)

> Las secciones transversales que eran planas antes de la flexión, **siguen siendo planas** después de que la viga se flexiona.

**¿Qué implica esto?**  
Las deformaciones longitudinales (alargamiento o acortamiento) de las fibras de la sección son **proporcionales a su distancia al eje neutro**. La distribución de deformaciones es **lineal** a lo largo de la altura de la sección, sin importar cuánto momento se aplique.

**Condición para que sea válido:**  
Debe existir **buena adherencia** entre el acero y el hormigón circundante. Si no hay adherencia, ambos materiales se deslizan uno respecto del otro y dejan de tener la misma deformación.

**Cuándo NO aplica:**  
- Vigas de canto alto (height/span > ~0,4): la distribución de deformaciones se vuelve no lineal.
- Vigas con grandes esfuerzos de corte: las deformaciones de corte distorsionan las secciones.

#### 📊 Conclusión del Supuesto 1:
> Este supuesto es el que permite construir el **diagrama de deformaciones**: una línea recta que va desde εcu = 0,003 en la fibra comprimida extrema hasta εs en el acero de tracción. Todo el análisis de sección parte de este diagrama. Sin este supuesto, no habría manera de calcular la deformación del acero a partir de la posición del eje neutro.

---

### Supuesto 2 — Modelo EPP para el acero

> La relación tensión-deformación del acero se conoce y se idealiza como **elástico perfectamente plástico** (EPP).

**Implicancia directa:**
- Si εs < εy → fs = Es·εs (el acero trabaja elásticamente)
- Si εs ≥ εy → fs = fy (el acero ha fluido, trabaja a tensión constante fy)

Este modelo simplifica enormemente el cálculo: una vez que el acero fluye, su tensión es simplemente fy, sin necesidad de calcular la deformación exacta.

---

### Supuesto 3 — Se desprecia la resistencia a tracción del hormigón

> El hormigón traccionado (por debajo del eje neutro) **NO contribuye** a la resistencia de la sección.

**¿Por qué es válido?**  
La resistencia a tracción del hormigón es ≈ 10% de f'c. En una sección sometida a momento grande, el hormigón traccionado ya está fisurado (en la práctica real siempre está fisurado bajo cargas de servicio). La contribución de la zona traccionada es tan pequeña que ignorarla no produce error significativo.

**Consecuencia práctica:**  
Todo el hormigón bajo el eje neutro se ignora en el cálculo. Solo el acero de tracción As resiste las fuerzas de tracción.

---

### Supuesto 4 — La curva tensión-deformación del hormigón es conocida

> La distribución de tensiones de compresión en el hormigón sigue la curva tensión-deformación real del material.

**Implicancia:**  
Esta curva define la magnitud y distribución del bloque de compresión. Como la curva es no lineal (parabólica), el bloque de compresión no es triangular ni rectangular perfectamente, sino de forma curva.

**Solución:**  
Se introduce el **Bloque de Whitney** (ver Sección 3) para simplificar esta distribución.

---

### Supuesto 5 — Acero y hormigón trabajan como una unidad

> No hay deslizamiento relativo entre el acero y el hormigón. Ambos materiales tienen la **misma deformación** en la interfaz (adherencia perfecta).

**Garantía práctica:**  
Las barras corrugadas (con resaltes) aseguran la adherencia mecánica. Los recubrimientos mínimos y los requisitos de separación entre barras también contribuyen a mantener la adherencia.

---

### Resumen de los 5 Supuestos

| # | Supuesto | Consecuencia para el cálculo |
|---|---|---|
| 1 | Secciones planas permanecen planas | Diagrama de deformaciones **lineal** |
| 2 | Acero = modelo EPP | fs = fy si εs ≥ εy |
| 3 | Hormigón traccionado no contribuye | Solo As resiste tracción |
| 4 | Curva σ-ε hormigón conocida → Bloque Whitney | Distribución de compresión simplificada a rectángulo |
| 5 | Adherencia perfecta | εs se calcula por geometría (compatibilidad) |

---

## 2. Evolución de la Distribución de Tensiones con el Momento

Esta es la clave para entender **por qué se necesita el Bloque de Whitney**. A medida que aumenta el momento aplicado sobre la viga, la distribución de tensiones en la sección transversal cambia cualitativamente:

### Fase 1 — Momento pequeño (M << Mfalla):

```
Sección transversal        Deformaciones        Tensiones

     b                     εc (pequeño)         σ = Ec·εc
  ___________              /                    /
 |           |            /                    / (lineal, triangular)
 |  COMPRESIÓN|          / eje neutro          / 
 |___________|          X ─────────────────── X
 |           |           \                    \
 |  TRACCIÓN |            \                    \ (lineal)
 |___________|             \                    \
    As ■■■               εs (pequeño)          fs = Es·εs < fy
```

- Las deformaciones son pequeñas en toda la sección.
- La distribución de tensiones es **triangular** tanto en compresión como en tracción (comportamiento completamente elástico y lineal).
- El hormigón no ha fisurado aún.
- El eje neutro está cerca del centroide de la sección bruta.

### Fase 2 — Momento mediano (M aumenta, M ≈ 50-80% Mfalla):

```
Sección transversal        Deformaciones        Tensiones

     b                     εc                   σc
  ___________              /                    /‾\ (curva, no lineal)
 |           |            /                   /   \
 |  COMPRESIÓN|          /                   /    
 |___________|          X ─────────────────── X
 |  FISURADO  |          \  (hormigón fisura) \
 |           |            \                   \ (cero — ignorado)
 |___________|             \
    As ■■■               εs > εy ?            fs (puede haber fluido)
```

- Las deformaciones crecen.
- El hormigón traccionado **fisura**: la zona de tracción queda fuera de juego.
- La zona comprimida: la distribución de tensiones empieza a ser **curva** (paraboloide) porque el hormigón entra en su rango no lineal.
- El eje neutro sube (la zona comprimida se reduce porque trabaja a mayor nivel de tensión).

### Fase 3 — Momento último (M = Mfalla, εcu = 0,003):

```
Sección transversal        Deformaciones        Tensiones reales

     b                     εcu = 0,003          0,85f'c
  ___________              /                    /‾‾‾‾‾‾\ (paraboloide)
 |           |            /                   /        |
 |COMPRESIÓN |    c      /   c               |  f'c    |
 |___________|          X                    X
 |  FISURADO  |          \
 |           |            \
 |___________|             \
    As ■■■               εs ≥ εy              fs = fy (fluyó)
```

- La fibra extrema superior alcanza εcu = 0,003 (criterio ACI).
- El hormigón comprimido trabaja a niveles muy altos de tensión → distribución **parabólica** (no lineal).
- El acero de tracción ha fluido: fs = fy.
- El momento en este estado es el **momento nominal Mn**.

#### 📊 Conclusión de la evolución de tensiones:
> Esta evolución justifica que para calcular Mn no se puede usar la distribución triangular elástica: a la capacidad última, la distribución es parabólica. Para hacer el cálculo manejable sin integrar una función curva, se introduce el equivalente rectangular: el **Bloque de Whitney**.

---

## 3. El Bloque de Whitney — Deducción Completa y Aplicación ⭐⭐⭐

### 3.1 El problema que resuelve

La distribución real de tensiones de compresión en el hormigón a la resistencia última es una **parábola**: comienza en cero en el eje neutro, aumenta hacia arriba y alcanza su valor máximo en la fibra extrema comprimida. Para calcular la resistencia Mn, necesitamos:
1. La **resultante de compresión** C (fuerza total en el bloque comprimido).
2. Su **punto de aplicación** (para calcular el brazo de palanca).

Integrar una función parabólica complica el cálculo. Whitney (1937) propuso reemplazar la distribución parabólica real por un **bloque rectangular equivalente** que tenga la misma resultante y el mismo punto de aplicación.

### 3.2 Los factores K y su origen

La distribución parabólica real se puede caracterizar mediante tres factores:

```
Distribución REAL (parabólica):

    b
  _____
 |     |  ← fibra extrema comprimida: εcu = 0,003
 |     |  ← tensión máxima = K₃·f'c
 |     |  ← la resultante actúa a K₂·c desde arriba
 |-----|  ← eje neutro (profundidad c)
 |     |
 |_____|

Resultante real C = K₁·K₃·f'c·b·c
Posición de C = K₂·c desde la fibra comprimida
```

Donde:
- **K₁** = factor de forma (área bajo la parábola como fracción del rectángulo K₁·c·f'c)
- **K₂** = factor de posición (dónde actúa la resultante)
- **K₃** = factor de reducción (tensión máxima en la distribución real vs. f'c del cilindro)

> Estos factores K₁, K₂, K₃ se obtienen **experimentalmente** mediante ensayos de laboratorio en vigas reales.

### 3.3 La equivalencia del Bloque de Whitney

Whitney propone reemplazar la distribución parabólica por un **rectángulo** de:
- **Tensión uniforme:** 0,85·f'c
- **Altura:** a = β·c (donde c es la profundidad real del eje neutro)

```
Distribución REAL          Bloque EQUIVALENTE (Whitney)

    b                           b
  _____                       _____
 |/////|  ← parabólica      |=====|  ← 0,85·f'c (uniforme)
 |/////|                     |=====|  altura a = β·c
 |/////|  prof. c            |_____|  ← a = β·c
 |     |                     |     |
 |_____|                     |_____|
    c                           c

C_real = K₁·K₃·f'c·b·c       C_equivalente = 0,85·f'c·b·a = 0,85·f'c·b·β·c

Condición: C_real = C_equivalente → misma resultante
```

**La equivalencia requiere que ambos bloques tengan:**
1. La **misma resultante** de fuerza: C_real = C_equiv → 0,85·f'c·β = K₁·K₃·f'c
2. El **mismo punto de aplicación**: la resultante de C_equiv actúa a a/2 = β·c/2 desde arriba, que debe coincidir con K₂·c de la distribución real.

### 3.4 El factor β — Definición y valores

El factor **β** (beta) es el cociente entre la profundidad del bloque equivalente (a) y la profundidad real del eje neutro (c):

$$\boxed{a = \beta \cdot c \quad \Leftrightarrow \quad \beta = \frac{a}{c}}$$

Sus valores son:

**Para f'c ≤ 280 kgf/cm² (≈ 27,5 MPa):**
$$\beta = 0{,}85$$

**Para f'c > 280 kgf/cm² (en kgf/cm²):**
$$\beta = 1{,}05 - 0{,}0007 \cdot f'_c$$

**Con límites:**
$$0{,}65 \leq \beta \leq 0{,}85$$

#### 📊 Conclusión quirúrgica sobre β:

> El factor β captura cómo la forma de la parábola de compresión cambia con la resistencia del hormigón. Para hormigones de baja resistencia (f'c ≤ 27,5 MPa), la parábola es más "redondeada" y β = 0,85 equivale bien la distribución real. Para hormigones de alta resistencia, la curva tensión-deformación tiene una rama post-pico más pronunciada y una zona de tensión máxima más angosta → la parábola es más "puntiaguda" → se necesita un β menor para que el bloque equivalente tenga la misma resultante y brazo de palanca. El límite inferior β ≥ 0,65 es una restricción de seguridad del ACI para no subestimar excesivamente la zona comprimida en hormigones de muy alta resistencia.

---

### 3.5 Deformación última del hormigón

El ACI establece que la deformación máxima de diseño en la fibra extrema de compresión es:

$$\boxed{\varepsilon_{cu} = 0{,}003}$$

**¿Por qué 0,003 y no 0,002 (que es el ε₀ de resistencia máxima)?**

Porque la deformación última real del hormigón antes del colapso es mayor que 0,002 (en la zona post-pico de la curva). El ACI adopta 0,003 como un valor conservador dentro de la zona post-pico: el hormigón aún tiene resistencia (aunque menor que f'c), y el bloque de Whitney a 0,85·f'c compensa esta simplificación. Es decir, se asume mayor deformación pero menor tensión promedio — el efecto neto es una buena representación de la realidad.

**Para el acero:**  
El ACI **no limita** la deformación del acero de tracción en el estado último (a diferencia del CEB-FIP que la limita al 1%). Sin embargo, en diseño sísmico sí se limita.

---

### 3.6 Diagrama de la sección transversal bajo el Bloque de Whitney

Este es el diagrama más importante del ramo. Debe entenderse en detalle absoluto:

```
SECCIÓN TRANSVERSAL — ESTADO ÚLTIMO (Bloque de Whitney)

←——— b ———→
 ___________
|           |   ← fibra extrema de compresión: εcu = 0,003
|  0,85f'c  |   ↑
|  (bloque  |   | a = β·c   ← profundidad del bloque equivalente
|  Whitney) |   ↓
|___________|   ← límite inferior del bloque (≠ eje neutro)
|           |   ← zona comprimida por debajo del bloque (tensión no nula, pero despreciada)
|           |   ← eje neutro está a profundidad c desde arriba
|  ↑ c      |
|           |   ← zona FISURADA: hormigón no contribuye
|           |
|           |
|___________|
  As ■ ■ ■     ← acero de tracción, centroide a profundidad d desde arriba
  d ↑ recub.  ← d = peralte efectivo (desde fibra comprimida hasta centroide del acero)
```

**Variables de la sección:**

| Símbolo | Nombre | Descripción |
|---|---|---|
| b | Ancho de la sección | [mm o cm] |
| h | Altura total de la sección | [mm o cm] |
| d | Peralte efectivo | Distancia desde fibra comprimida extrema hasta centroide del acero de tracción. d = h − recubrimiento − ϕestribo − ϕbarra/2 |
| c | Profundidad del eje neutro | Distancia desde la fibra comprimida extrema hasta el eje neutro real |
| a | Profundidad del bloque de Whitney | a = β·c |
| As | Área de acero de tracción | [mm² o cm²] |
| εcu | Deformación fibra extrema de compresión | 0,003 (diseño ACI) |
| εs | Deformación del acero de tracción | Se calcula por similitud de triángulos |

**Fuerzas internas:**

| Fuerza | Expresión | Descripción |
|---|---|---|
| C | 0,85·f'c·a·b | Resultante de compresión (bloque Whitney) |
| T | As·fs | Resultante de tracción (acero) |

**Ecuación de equilibrio:**

$$C = T$$
$$0{,}85 \cdot f'_c \cdot a \cdot b = A_s \cdot f_s$$

**Momento nominal:**

$$M_n = C \cdot \left(d - \frac{a}{2}\right) = T \cdot \left(d - \frac{a}{2}\right)$$

> El brazo de palanca es (d − a/2): la distancia entre la resultante de compresión (que actúa en el centro del bloque, a a/2 desde arriba) y la resultante de tracción (que actúa en el centroide del acero, a d desde arriba).

---

## 4. Tipos de Falla en Vigas Simplemente Armadas

La cantidad de acero en la sección determina el **modo de falla** de la viga. Esto es fundamental porque el diseño siempre debe apuntar al tipo de falla correcto.

### 4.1 Falla por Tracción (Falla Dúctil) ✅ — LA QUE SE BUSCA

**Condición:** cuando el hormigón alcanza εcu = 0,003, el acero **ya fluyó** (εs > εy).

**Secuencia de la falla:**
1. Al aumentar el momento, el acero alcanza primero su tensión de fluencia (fy).
2. El acero continúa deformándose bajo tensión constante fy (plateau de fluencia).
3. Finalmente el hormigón alcanza εcu = 0,003 → falla.

**Características:**
- La viga avisa visualmente: grandes deflexiones y fisuras anchas antes del colapso.
- Es **predecible y segura**: el ingeniero diseña para este modo.
- La tensión del acero es fs = fy → cálculo directo.

**Diagrama de deformaciones en falla por tracción:**

```
     εcu = 0,003
    /               ← hormigón comprimido llega a su límite
   /
  X  ← eje neutro (posición c < cb)
   \
    \
     εs > εy        ← acero ya fluyó antes de que el hormigón fallara
```

**Ecuaciones:**

Equilibrio: C = T → 0,85·f'c·a·b = As·fy

Profundidad del bloque:
$$a = \frac{A_s \cdot f_y}{0{,}85 \cdot f'_c \cdot b}$$

Momento nominal:
$$M_n = A_s \cdot f_y \cdot \left(d - \frac{a}{2}\right)$$

Expresado en función de la cuantía ρ = As/(b·d):
$$M_n = \rho \cdot b \cdot d^2 \cdot f_y \cdot \left(1 - 0{,}59 \cdot \frac{\rho \cdot f_y}{f'_c}\right)$$

---

### 4.2 Falla por Compresión (Falla Frágil) ❌ — SE DEBE EVITAR

**Condición:** cuando el hormigón alcanza εcu = 0,003, el acero **aún no ha fluido** (εs < εy).

**Secuencia de la falla:**
1. Al aumentar el momento, el hormigón llega primero a su límite de deformación.
2. El acero no ha alcanzado fy → sigue trabajando elásticamente.
3. El hormigón falla abruptamente → colapso sin advertencia.

**Características:**
- Falla **abrupta y sin aviso**: peligrosa.
- La tensión del acero debe calcularse desde la deformación: fs = Es·εs < fy.
- El ACI **prohíbe** este modo de falla para vigas.

**Diagrama de deformaciones en falla por compresión:**

```
     εcu = 0,003
    /               ← hormigón comprimido llega a su límite
   /
  X  ← eje neutro (posición c > cb, muy profundo)
   \
    \
     εs < εy        ← acero aún elástico, NO fluyó
```

**Ecuaciones:**

Del diagrama de deformaciones (similitud de triángulos):
$$\varepsilon_s = 0{,}003 \cdot \frac{d - c}{c}$$

Tensión del acero (ley de Hooke, ya que no ha fluido):
$$f_s = \varepsilon_s \cdot E_s = 0{,}003 \cdot \frac{d - c}{c} \cdot E_s$$

Como a = β·c, entonces c = a/β → sustituyendo:
$$f_s = 0{,}003 \cdot \frac{\beta \cdot d - a}{a} \cdot E_s$$

Equilibrio C = T:
$$0{,}85 \cdot f'_c \cdot a \cdot b = A_s \cdot f_s = A_s \cdot 0{,}003 \cdot \frac{\beta d - a}{a} \cdot E_s$$

Reordenando → **ecuación cuadrática en a**:
$$\frac{0{,}85 \cdot f'_c}{\rho \cdot 0{,}003 \cdot E_s} \cdot a^2 + d \cdot a - \beta \cdot d^2 = 0$$

**Se resuelve para "a", luego:**
$$M_n = A_s \cdot f_s \cdot \left(d - \frac{a}{2}\right) = 0{,}85 \cdot f'_c \cdot a \cdot b \cdot \left(d - \frac{a}{2}\right)$$

---

### 4.3 Falla Balanceada — El Estado Límite Entre Ambas

**Condición:** cuando el hormigón alcanza εcu = 0,003, el acero **simultáneamente** alcanza εy (ambos llegan al límite al mismo tiempo).

**¿Para qué sirve calcularla?**  
La cuantía balanceada ρb define el límite entre falla dúctil y falla frágil. Es el punto de referencia para establecer las cuantías máxima y mínima.

**Diagrama de deformaciones en falla balanceada:**

```
     εcu = 0,003
    /
   /
  X  ← eje neutro en posición cb (profundidad balanceada)
   \
    \
     εs = εy        ← acero llega justo a fluir
```

**Cálculo de cb (profundidad balanceada del eje neutro):**

Por similitud de triángulos en el diagrama de deformaciones:
$$\frac{\varepsilon_{cu}}{c_b} = \frac{\varepsilon_y}{d - c_b}$$

Despejando cb:
$$c_b = \frac{d \cdot \varepsilon_{cu}}{\varepsilon_{cu} + \varepsilon_y} = \frac{d \cdot 0{,}003}{0{,}003 + f_y/E_s}$$

Usando Es = 210.000 MPa → εy = fy/210.000, y expresando en kgf/cm² (fy en kgf/cm²):
$$c_b = \frac{d \cdot 6300}{6300 + f_y}$$

Profundidad del bloque balanceado:
$$a_b = \beta \cdot c_b = \beta \cdot \frac{d \cdot 6300}{6300 + f_y}$$

**Cuantía balanceada ρb:**

Equilibrio C = T:
$$0{,}85 \cdot f'_c \cdot a_b \cdot b = A_{sb} \cdot f_y$$
$$\rho_b = \frac{A_{sb}}{b \cdot d} = \frac{0{,}85 \cdot f'_c}{f_y} \cdot \frac{a_b}{d} = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{6300}{6300 + f_y}$$

#### 📊 Conclusión quirúrgica sobre tipos de falla:

> Los tres tipos de falla se distinguen por la **posición relativa del eje neutro** c respecto de cb:
> - c < cb → εs > εy → **falla por tracción** (dúctil ✅)
> - c = cb → εs = εy → **falla balanceada** (límite)
> - c > cb → εs < εy → **falla por compresión** (frágil ❌)
>
> El ACI prohíbe la falla frágil mediante la cuantía máxima. El concepto clave es: **más acero → eje neutro más profundo → menos deformación del acero para la misma deformación del hormigón → más cerca de la falla por compresión**. La paradoja del hormigón armado: agregar más acero no siempre hace la sección más segura si lleva a una falla frágil.

---

## 5. Factor de Reducción de Resistencia φ — Secciones a Flexión

El ACI clasifica las secciones según la deformación del acero de tracción más extremo (εt):

| Clasificación | Condición | φ | Tipo de falla |
|---|---|---|---|
| Controlada por compresión | εt ≤ 0,002 | 0,65 (estribos) / 0,75 (espirales) | Frágil ❌ |
| Zona de transición | 0,002 < εt < 0,005 | Interpolación lineal (0,65 → 0,90) | Intermedia |
| Controlada por tracción | εt ≥ 0,005 | **0,90** | Dúctil ✅ |

**Requisito del ACI para vigas:**  
Para evitar falla frágil, el ACI exige que **εt ≥ 0,004** (con φ interpolado ≈ 0,817 para estribos).  
Para usar φ = 0,90, se necesita εt ≥ 0,005.

> ⚠️ La deformación εt considera solo la deformación mecánica, **no incluye** deformaciones por fluencia, retracción ni temperatura.

---

## 6. Cuantías de Acero

### 6.1 Cuantía balanceada ρb

$$\rho_b = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{6300}{6300 + f_y} \quad \text{(fy en kgf/cm²)}$$

### 6.2 Cuantía máxima ρmáx

**Para εt ≥ 0,004 (requisito mínimo ACI — φ reducido):**

Del perfil de deformaciones con εcu = 0,003 y εt = 0,004:
$$c_{máx} = \frac{d \cdot 0{,}003}{0{,}003 + 0{,}004} = \frac{3d}{7}$$
$$a_{máx} = \beta \cdot c_{máx} = \frac{3\beta d}{7}$$
$$\rho_{máx} = \frac{0{,}85 \cdot f'_c \cdot a_{máx}}{f_y \cdot d} = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{3}{7} \approx 0{,}36 \cdot \frac{\beta \cdot f'_c}{f_y}$$

**Para εt ≥ 0,005 (para usar φ = 0,90):**

$$c_{máx} = \frac{d \cdot 0{,}003}{0{,}008} = \frac{3d}{8}$$
$$a_{máx} = \frac{3\beta d}{8}$$
$$\rho_{máx} = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{3}{8} \approx 0{,}32 \cdot \frac{\beta \cdot f'_c}{f_y}$$

### 6.3 Cuantía mínima ρmín

$$\rho_{mín} = 0{,}8 \cdot \frac{\sqrt{f'_c}}{f_y} \geq \frac{14}{f_y} \quad \text{(ACI 10.5.1, f'c y fy en kgf/cm²)}$$

O en términos de área:
$$A_{s,mín} = 0{,}8 \cdot \frac{\sqrt{f'_c}}{f_y} \cdot b \cdot d \geq \frac{14}{f_y} \cdot b \cdot d$$

**¿Por qué existe una cuantía mínima?**  
Si se coloca muy poco acero, la sección sin fisurar puede tener mayor resistencia a flexión que la sección fisurada con el acero. Al fisurar, el acero tomaría toda la tracción de golpe superando fy → falla abrupta. La cuantía mínima garantiza que el acero puede absorber la fuerza de tracción sin fluir inmediatamente al fisurar.

**Excepción a la cuantía mínima:**  
No es necesario aplicarla si As colocado ≥ 4/3 · As requerido por análisis (se coloca más del 33% extra de lo necesario).

---

## 7. Aspectos de Diseño Práctico

### 7.1 Ubicación del refuerzo

- **Momentos positivos** (vano): tracción en la fibra inferior → acero en la parte **inferior** de la viga.
- **Momentos negativos** (apoyos en vigas continuas): tracción en la fibra superior → acero en la parte **superior** de la viga.

### 7.2 Dimensiones geométricas

**Altura mínima para control de deflexiones (ACI — tabla):**

| Condición de apoyo | h mínima |
|---|---|
| Simplemente apoyada | L/16 |
| Un extremo continuo | L/18,5 |
| Ambos extremos continuos | L/21 |
| Voladizo | L/8 |

> Estos valores son para acero A630 (fy = 420 MPa). Para otro fy, multiplicar por:
$$\left(0{,}4 + \frac{f_y}{700}\right) \quad \text{(fy en MPa)}$$

**Proporción ancho-alto:**  
En la práctica: b ≈ h/2 (el ancho es aproximadamente la mitad de la altura).

**Resistencias típicas para estructuras convencionales:**
- Hormigón: **17 MPa ≤ f'c ≤ 25 MPa**
- Acero: **A630-420H** (fy = 420 MPa) — el más usado

### 7.3 Recubrimiento

El recubrimiento es la distancia desde la superficie exterior del hormigón hasta la barra de acero más exterior (generalmente el estribo).

**Funciones del recubrimiento:**
- Garantizar adherencia entre hormigón y acero.
- Proteger el acero de la corrosión (el hormigón es alcalino → protege el acero).
- Proteger el acero del fuego (el hormigón tiene baja conductividad térmica).
- Proteger contra el desgaste superficial.

**Valores de recubrimiento en Chile (DS N°60 — complementa ACI):**

| Condición ambiental | Recubrimiento mínimo |
|---|---|
| **Normal** (interior seco, condiciones no severas) | 20 mm |
| **Severo** (alta humedad, jardines, balcones, industrial, marítimo) | 40 mm |

**Condiciones severas incluyen:**  
- Interiores con alta humedad (cocinas industriales, saunas) — excepto recintos habitados normales.
- Zonas con escurrimiento de agua (jardines, balcones).
- Ambientes industriales o marítimos adversos.

> ⚠️ El **peralte efectivo d** se calcula descontando el recubrimiento y el diámetro del estribo:
$$d = h - r_{ecub} - \phi_{estribo} - \frac{\phi_{barra}}{2}$$

### 7.4 Colocación de barras y separación mínima

La separación mínima entre barras paralelas en una capa garantiza que el hormigón fresco pueda fluir y envolver bien las barras:

**En elementos a flexión (tracción o compresión):**  
Separación libre mínima = **db** (diámetro de la barra), pero **no menor que 25 mm**.

**En elementos a compresión:**  
Separación libre mínima = **1,5·db**, pero no menor que 25 mm.

**Para doble fila de barras:**  
Separación vertical libre mínima entre capas = **25 mm**.

### 7.5 Dimensionamiento del peralte efectivo d con doble fila

Cuando se necesita más acero del que cabe en una fila, se usa doble fila:
$$d = h - r_{ecub} - \phi_{estribo} - \phi_{barra} - \frac{s_{vert}}{2} - \frac{\phi_{barra\_sup}}{2}$$

Donde s_vert ≥ 25 mm es la separación vertical entre filas.  
El centroide del acero se ubica en el punto medio entre las dos capas (asumiendo igual área en cada capa).

---

## 8. Variación de Mn con la Cuantía de Acero

Este análisis responde la pregunta: ¿agregar más acero siempre aumenta Mn?

**Análisis:**

Mn = As·fy·(d − a/2), y a = As·fy/(0,85·f'c·b) → a crece linealmente con As.

Al aumentar As:
- T = As·fy aumenta (más fuerza de tracción).
- a aumenta (el bloque de compresión crece para equilibrar).
- El brazo de palanca (d − a/2) **disminuye** porque a crece.

**Zona dúctil (ρ < ρb):**
- Mn aumenta al agregar acero, pero no linealmente.
- La disminución del brazo de palanca modera el incremento de Mn.

**Zona de compresión (ρ > ρb):**
- Agregar más acero apenas aumenta Mn.
- La ganancia en T es compensada por la gran pérdida en el brazo de palanca.

#### 📊 Conclusión quirúrgica:

> La curva Mn vs. ρ es creciente pero de pendiente decreciente. Hay un punto de rendimientos decrecientes donde agregar acero ya no es eficiente. Más allá de ρb, el acero no fluye (no se usa en toda su capacidad) y el bloque de compresión crece tanto que el brazo de palanca se reduce drásticamente. Esto justifica la limitación de ρmáx: no solo es una restricción de seguridad (evitar falla frágil), sino también una restricción de eficiencia (agregar acero más allá de ese punto es antieconómico e ineficiente).

---

## 9. Vigas con Armadura de Compresión (Doble Armadura)

### 9.1 ¿Cuándo y por qué se usa?

La armadura de compresión (A's) es acero colocado en la **zona comprimida** de la viga (parte superior en momentos positivos). Se usa cuando:

1. La sección ya tiene ρmáx y aún se necesita más resistencia → la única opción sin aumentar la sección es agregar A's.
2. Se quiere mejorar la ductilidad de una sección sobrearmada.
3. Se requiere reducir las deflexiones diferidas (fluencia).
4. Es necesario por razones constructivas (barras para sujetar estribos).

### 9.2 Efectos de la armadura de compresión

| Efecto | Magnitud | Explicación |
|---|---|---|
| Aumento de Mn | Bajo (**≤ 15%**) | El acero A's ayuda a resistir compresión → el eje neutro sube → εs del acero de tracción aumenta → brazo de palanca aumenta levemente |
| Reducción de deflexiones por fluencia | Significativa (**hasta 50%**) | El hormigón comprimido fluye, pero el A's restringe ese acortamiento → menor fluencia neta → menos deflexión diferida |
| Aumento de ductilidad | Significativo (**hasta 40%** con ρ' = ρ) | El eje neutro sube → εs de tracción aumenta → la sección puede deformarse más antes de la falla |
| Cambio del modo de falla | Clave | Una sección que fallaría por compresión (frágil) puede pasar a falla por tracción (dúctil) con A's suficiente |

> ⚠️ **La armadura de compresión NO se coloca para aumentar significativamente Mn** (solo da ≤15%). Se coloca principalmente por ductilidad y control de deflexiones.

### 9.3 Figura de la sección con doble armadura

```
SECCIÓN CON DOBLE ARMADURA

←——— b ———→
 ___________
|  A's ■ ■  |  ← acero de COMPRESIÓN (d' desde fibra comprimida)
|           |  ← bloque Whitney: 0,85f'c, altura a
|___________|  ← a = β·c
|           |
|           |  ← zona fisurada
|           |
|___________|
   As ■ ■ ■    ← acero de TRACCIÓN (d desde fibra comprimida)

Diagrama de deformaciones:
εcu = 0,003 (arriba) → lineal → εs (abajo)
ε's = εcu·(c−d')/c → deformación del acero comprimido
```

Variables adicionales:
- **A's** = área del acero de compresión
- **d'** = distancia desde la fibra comprimida extrema hasta el centroide del acero A's

### 9.4 Análisis — Caso más común: ambos aceros fluyen (As fluye y A's fluye)

**Verificación de fluencia de A's:**
$$\varepsilon'_s = \varepsilon_{cu} \cdot \frac{c - d'}{c} \geq \varepsilon_y \quad ?$$

**Si A's fluye (f's = fy):**

Se descompone el problema en dos pares de fuerzas internas:

**Par 1 — Acero de compresión vs. acero de tracción equivalente:**
- A's con tensión fy ↔ As1 con tensión fy, donde As1 = A's
- Este par produce: Mn1 = As1·fy·(d − d')

**Par 2 — Bloque de Whitney vs. acero de tracción restante:**
- As2 = As − As1 = As − A's
- Equilibrio: 0,85·f'c·a·b = As2·fy
- Profundidad del bloque: a = As2·fy / (0,85·f'c·b)
- Momento: Mn2 = As2·fy·(d − a/2)

**Momento total:**
$$\boxed{M_n = M_{n1} + M_{n2} = A_{s1} f_y (d - d') + A_{s2} f_y \left(d - \frac{a}{2}\right)}$$

### 9.5 Análisis — Casos con acero que no fluye

Existen 4 casos posibles según fluencia de As y A's:

| Caso | As | A's | fs | f's |
|---|---|---|---|---|
| 1 | Fluye | Fluye | fy | fy |
| 2 | Fluye | No fluye | fy | ε's·Es < fy |
| 3 | No fluye | Fluye | εs·Es < fy | fy |
| 4 | No fluye | No fluye | εs·Es < fy | ε's·Es < fy |

**Ecuación general de equilibrio para cualquier caso:**
$$0{,}85 \cdot f'_c \cdot a \cdot b + A'_s \cdot f'_s = A_s \cdot f_s$$

**Cálculo de deformaciones por similitud de triángulos:**
$$\varepsilon_s = \varepsilon_{cu} \cdot \frac{d - c}{c} \quad ; \quad \varepsilon'_s = \varepsilon_{cu} \cdot \frac{c - d'}{c}$$

**Con a = β·c, c = a/β** → se sustituye y se resuelve la ecuación cuadrática resultante para encontrar a.

> ⚠️ **Advertencia del profesor:** ¡No olvidar verificar si el acero está fluyendo antes de asumir fs = fy o f's = fy!

---

## 10. Vigas de Sección T

### 10.1 Concepto — Por qué existe la sección T

En la construcción real, las vigas no están aisladas: se construyen **monolíticamente** con la losa que soportan. Cuando la losa está en la zona comprimida (momentos positivos), una porción de la losa colabora con la viga como **ala** (flange), formando una sección en T.

**Ventaja:** el ala de la losa aumenta enormemente el área de compresión → el eje neutro sube al ala → brazo de palanca (d − a/2) grande → gran eficiencia estructural.

### 10.2 Figura de la sección T

```
SECCIÓN T TÍPICA (en zona de momento positivo)

←———————— b (ancho efectivo del ala) ————————→
 _____________________________________________
|                                             |  ← losa (ala / flange)
|_____________________________________________|  ← hf (altura del ala)
           |                 |
           |                 |  ← alma (web)
           |     bw          |
           |_________________|
              As ■ ■ ■         ← acero de tracción
←— bw —→

Variables:
- b = ancho efectivo del ala (definido por ACI según luz y geometría)
- bw = ancho del alma
- hf = altura del ala (espesor de la losa)
- d = peralte efectivo
```

### 10.3 Determinación del ancho efectivo b

El ala no puede tomar un ancho infinito: la tensión de compresión disminuye con la distancia al alma (efecto de "cortante lag"). El ACI limita el ancho efectivo:

**Para vigas T interiores (ala en ambos lados):**
b = mínimo de:
- L/4 (L = longitud de la viga)
- bw + 8·hf (por cada lado: bw + 2·4hf = bw + 8hf)
- Separación entre centros de vigas

**Para vigas L (ala en un solo lado):**
b = mínimo de:
- bw + L/12
- bw + 6·hf
- bw + (separación libre entre vigas)/2

### 10.4 Análisis de vigas T — Caso general (eje neutro en el alma, a > hf)

Cuando el bloque de compresión supera el espesor del ala, el análisis se hace por separado en el ala y en el alma:

**Componente 1 — Ala (voladizos a cada lado del alma):**
- Área de compresión = hf·(b − bw)
- Fuerza: Cf = 0,85·f'c·hf·(b − bw)
- Acero equivalente: Asf = Cf/fy = 0,85·f'c·hf·(b − bw)/fy
- Momento: Mnf = Asf·fy·(d − hf/2)

**Componente 2 — Alma:**
- Acero restante: Asw = As − Asf
- Bloque: 0,85·f'c·a·bw = Asw·fy → a = Asw·fy/(0,85·f'c·bw)
- Momento: Mnw = Asw·fy·(d − a/2)

**Momento total:**
$$\boxed{M_n = M_{nf} + M_{nw} = A_{sf} f_y \left(d - \frac{h_f}{2}\right) + A_{sw} f_y \left(d - \frac{a}{2}\right)}$$

**Cuantía mínima para vigas T (ACI 10.5.2):**

Para ala en tracción (momento negativo en vigas continuas — el ala está abajo):
$$A_{s,mín} = 1{,}6 \cdot \frac{\sqrt{f'_c}}{f_y} \cdot b_w \cdot d \geq \frac{14}{f_y} \cdot b_w \cdot d$$

O: $A_{s,mín} = 0{,}8 \cdot \frac{\sqrt{f'_c}}{f_y} \cdot b_f \cdot d \geq \frac{14}{f_y} \cdot b_w \cdot d$

### 10.5 Análisis de vigas T — Método general (ecuación única)

Si no es inmediatamente claro si a > hf o a < hf, se puede usar directamente:

$$C = T$$
$$0{,}85 f'_c h_f b_f + 0{,}85 f'_c (a - h_f) b_w = A_s f_y$$
$$a = \frac{A_s f_y - 0{,}85 f'_c h_f b_f}{0{,}85 f'_c b_w} + h_f$$

El momento se calcula como:
$$M_n = C_{total} \cdot (d - \bar{y})$$

Donde ȳ es la distancia desde la fibra comprimida hasta la resultante total de compresión.

---

## 11. Procedimiento de Diseño de Vigas a Flexión — Paso a Paso

### Diseño (dado Mu, encontrar As y sección):

1. **Definir materiales:** f'c, fy → calcular β.
2. **Estimar dimensiones:** usar h ≥ L/16 (s. apoyada). Asumir b ≈ h/2.
3. **Calcular d:** d = h − recubrimiento − ϕestribo − ϕbarra/2.
4. **Calcular Mu total** (incluyendo peso propio de la viga).
5. **Calcular Rn = Mu/(φ·b·d²)** (φ = 0,90 preliminar).
6. **Calcular ρ requerida:**
$$\rho = \frac{0{,}85 f'_c}{f_y} \left(1 - \sqrt{1 - \frac{2R_n}{0{,}85 f'_c}}\right)$$
7. **Verificar:** ρmín ≤ ρ ≤ ρmáx (para εt ≥ 0,005).
8. **Calcular As = ρ·b·d.**
9. **Seleccionar barras** (combinación de diámetros que dé As requerido).
10. **Verificar φ real** (calcular εt con la profundidad final de a y c).
11. **Verificar φMn ≥ Mu** con la sección final.

### Análisis (dada la sección con As, encontrar φMn):

1. Asumir que el acero fluye (fs = fy).
2. Calcular a = As·fy/(0,85·f'c·b).
3. Calcular c = a/β.
4. Calcular εs = 0,003·(d−c)/c.
5. Verificar: si εs ≥ εy → ✅ acero fluye, continuar.  
   Si εs < εy → ❌ resolver ecuación cuadrática (falla por compresión).
6. Calcular φ según εt.
7. Calcular Mn = As·fy·(d − a/2).
8. Calcular φMn.

---

## 12. Resumen de Fórmulas Clave

| Concepto | Fórmula |
|---|---|
| Bloque Whitney | a = β·c |
| β | 0,85 si f'c ≤ 280 kgf/cm² / 1,05−0,0007f'c si f'c > 280 kgf/cm² / 0,65 ≤ β ≤ 0,85 |
| Equilibrio | 0,85·f'c·a·b = As·fy (acero fluye) |
| Profundidad bloque | a = As·fy/(0,85·f'c·b) |
| Momento nominal | Mn = As·fy·(d − a/2) |
| Cuantía | ρ = As/(b·d) |
| Mn en función de ρ | Mn = ρ·b·d²·fy·(1 − 0,59·ρfy/f'c) |
| Cuantía balanceada | ρb = 0,85·β·f'c/fy · 6300/(6300+fy) [kgf/cm²] |
| Cuantía máx (εt≥0,004) | ρmáx ≈ 0,36·β·f'c/fy |
| Cuantía máx (εt≥0,005) | ρmáx ≈ 0,32·β·f'c/fy |
| Cuantía mínima | ρmín = 0,8·√f'c/fy ≥ 14/fy [kgf/cm²] |
| Deform. acero (por geometría) | εs = 0,003·(d−c)/c |
| Deform. acero compresión | ε's = 0,003·(c−d')/c |
| Cond. diseño | φ·Mn ≥ Mu |

---

*Anterior: [03 — Criterios de Diseño y Normas](03_Criterios_Diseno_Normas.md)*  
*Próximo: [Ejercicios](EJERCICIOS/)*
