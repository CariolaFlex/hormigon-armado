# 02 — Comportamiento Mecánico del Acero de Refuerzo
**Fuente:** Comportamiento Mecánico del Acero_2026.pdf (32 diapositivas)  
**Profesor:** Ing. Miguel Colque González | **Fecha:** Marzo 2026

---

## 📌 Objetivos del Tema

- Conocer las características principales del acero de refuerzo.
- Analizar el comportamiento monotónico y cíclico del acero.
- Presentar curvas tensión-deformación idealizadas.
- Presentar modelos constitutivos del acero.

---

## 1. Características del Acero de Refuerzo en Chile

### 1.1 Norma aplicable

El acero de refuerzo en Chile se produce según la norma **NCh204.Of2020**, que establece requisitos de:
- Clasificación
- Geométricos (dimensiones y forma de las barras)
- Mecánicos (resistencia mínima)
- Marcas (identificación en la barra)
- Embalajes

### 1.2 Sistema de clasificación

La nomenclatura chilena para el acero de refuerzo es:

$$\textbf{A}ZZZ\text{-}YYYH$$

Donde cada componente tiene un significado preciso:

| Componente | Significado |
|---|---|
| **A** | Acero al carbono |
| **ZZZ** | Tensión **última** mínima (en MPa) |
| **YYY** | Tensión de **fluencia** mínima (en MPa) |
| **H** | Acero para **H**ormigones |

### 1.3 Tipos de acero disponibles en Chile

| Designación completa | Designación abreviada | Fluencia mínima (fy) | Última mínima (fu) |
|---|---|---|---|
| A440-280H | **A440** | 280 MPa | 440 MPa |
| A630-420H | **A630** | 420 MPa | 630 MPa |
| A700-520H | **A700** | 520 MPa | 700 MPa |
| A730-550H | **A730** | 550 MPa | 730 MPa |

> 💡 **El acero más usado en Chile para hormigón armado convencional es el A630-420H (fy = 420 MPa).** El A440 se usa en elementos menos exigidos. Los aceros A700 y A730 son de alta resistencia para estructuras especiales.

> ⚠️ **Lectura de la nomenclatura:** La designación abreviada A440, A630, etc. se refiere a la tensión **última**, no a la de fluencia. Entonces A630-420H tiene fy = 420 MPa y fu = 630 MPa.

---

## 2. Requisitos Geométricos

### 2.1 Diámetro nominal de barras con resalte

El diámetro nominal de las barras corrugadas (con resalte) se calcula a partir de la masa nominal:

$$d_n = 12{,}73 \cdot \sqrt{m_n} \quad [mm]$$

Donde $m_n$ es la masa nominal en kg/m.

> Esta fórmula se deduce de la relación entre el área de la sección transversal circular y la masa por unidad de longitud: $A = \pi d^2/4$, y $m = A \cdot \rho_{acero}$ con $\rho_{acero} = 7850 \, kg/m^3$.

### 2.2 Presentación comercial
- **Barras lisas:** solo en diámetros de **6 mm** (se usan principalmente como estribos o distribución).
- **Barras con resalte (corrugadas):** diámetros estándar en Chile (ϕ8, ϕ10, ϕ12, ϕ16, ϕ20, ϕ22, ϕ25, ϕ32 mm).
- **Largos de fabricación:** 6 m y 12 m.

> 💡 Las barras corrugadas tienen **resaltes** (nervaduras) en su superficie que aumentan enormemente la adherencia con el hormigón circundante. Sin adherencia, el acero y el hormigón no trabajan como una unidad y el concepto del hormigón armado falla.

---

## 3. Requisitos Mecánicos — Ensayo de Tracción

El comportamiento mecánico del acero se determina mediante el **ensayo de tracción** según **NCh200**, con probetas de longitud estándar **l₀ = 200 mm**.

### 3.1 Propiedades medidas en el ensayo

| Propiedad | Símbolo | Unidad | Descripción |
|---|---|---|---|
| Tensión de fluencia | fy | MPa | Tensión en la que el acero deja de comportarse elásticamente |
| Tensión última | fu | MPa | Tensión máxima que soporta el acero antes de la fractura |
| Módulo de elasticidad | Es | MPa | Pendiente del tramo elástico (= 210.000 MPa) |
| Deformación de fluencia | εy | adim. | Deformación en que aparece la fluencia |
| Elongación máxima | εu | % | Deformación total en fractura (ductilidad) |

### 3.2 Aceros de refuerzo en EE.UU. (referencia ACI)

El ACI 318 referencia principalmente:
- **A615:** Acero al carbono, Grados 40, 60, 75 y 80 (tensión de fluencia nominal en ksi: 40, 60, 75, 80 ksi respectivamente)
- **A706:** Acero de baja aleación, Grados 60 y 80 (mayor ductilidad, preferido en zonas sísmicas)

> 💡 La equivalencia aproximada entre sistemas: **Grade 60 (ASTM) ≈ A630-420H (NCh)** en términos de tensión de fluencia (420 MPa ≈ 60 ksi).

---

## 4. Comportamiento Monotónico

### 4.1 Propiedades fundamentales

| Propiedad | Valor |
|---|---|
| **Módulo de elasticidad (Es)** | **210.000 MPa** (≈ 2.100.000 kgf/cm²) |
| Módulo de inicio de endurecimiento | 7.000 MPa |
| Módulo de Poisson (elástico) | ν = 0,3 |
| Módulo de Poisson (plástico) | ν = 0,5 |
| Elongación máxima | 4,5% – 12% (ASTM) |

**Deformaciones de fluencia según tipo de acero:**
| Acero | fy (MPa) | εy = fy/Es |
|---|---|---|
| A440-280H | 280 MPa | **εy = 0,00133** |
| A630-420H | 420 MPa | **εy = 0,002** |

> ⚠️ **Observación importante:** La deformación de fluencia εy del A630 (0,002) coincide con la deformación en la resistencia máxima del hormigón (ε₀ = 0,002). Esta coincidencia no es casual y tiene implicancias importantes en el diseño balanceado.

### 4.2 Curva tensión-deformación del acero — Análisis quirúrgico

La curva tensión-deformación del acero de refuerzo es cualitativamente muy diferente a la del hormigón. Tiene **cuatro zonas claramente definidas**:

#### Zona 1 — Tramo elástico lineal (0 a εy):
- Perfectamente lineal con pendiente Es = 210.000 MPa.
- El acero se comporta como un resorte perfecto: si se retira la carga, vuelve al estado original sin deformación residual.
- La tensión crece proporcionalmente a la deformación: σ = Es·ε.
- Termina abruptamente en fy (límite de proporcionalidad).

#### Zona 2 — Meseta de fluencia o plateau (εy a εsh):
- La tensión se mantiene **constante = fy** mientras la deformación continúa creciendo.
- El material se deforma sin aumento de carga: es la zona de **deformación plástica pura**.
- Esta zona es el corazón de la ductilidad del acero: permite grandes deformaciones sin fractura.
- La extensión de la meseta varía según el tipo de acero (mayor resistencia → meseta más corta o inexistente).
- Para acero A630: la meseta se extiende aproximadamente desde εy = 0,002 hasta εsh ≈ 0,010-0,015.

#### Zona 3 — Endurecimiento por deformación (εsh a εu):
- La tensión vuelve a aumentar, pero con una pendiente mucho menor: **Esh = 7.000 MPa**.
- El material sigue siendo dúctil pero gana resistencia adicional.
- Termina en la tensión última fu y la deformación última εu.

#### Zona 4 — Estricción y fractura (post fu):
- La sección transversal de la barra se estrangula localmente (estricción o "necking").
- La tensión aparente disminuye (aunque la tensión verdadera sigue aumentando).
- Finaliza en la fractura del material.

#### 📊 Conclusión quirúrgica de la curva tensión-deformación del acero:

> La curva del acero tiene una característica clave que la diferencia radicalmente del hormigón: el **plateau de fluencia**. Esta meseta horizontal es la manifestación física de la ductilidad del acero. En el diseño estructural, el acero que "fluye" puede absorber grandes deformaciones sin fracturarse, dando tiempo a que la estructura redistribuya esfuerzos y avise visualmente (grandes deformaciones visibles) antes del colapso. Este comportamiento es la base del principio de **falla dúctil preferida**: en hormigón armado, siempre se diseña para que el acero fluya antes de que el hormigón se aplaste, porque la falla del acero es gradual y visible, mientras la del hormigón es abrupta y frágil.

### 4.3 Comparación entre tipos de acero — Análisis quirúrgico

Al graficar en los mismos ejes las curvas de A440, A630, A700, A730:

| Propiedad | A440 | A630 | A700 | A730 |
|---|---|---|---|---|
| Módulo E (pendiente elástica) | **Igual** | **Igual** | **Igual** | **Igual** |
| Tensión de fluencia fy | 280 MPa | 420 MPa | 520 MPa | 550 MPa |
| Elongación (ductilidad) | **Mayor** | Media | Menor | **Menor** |
| Meseta de fluencia | Larga | Media | Corta | Corta o nula |

#### 📊 Conclusión del efecto del tipo de acero:

> **El módulo de elasticidad Es = 210.000 MPa es idéntico para todos los tipos de acero de refuerzo.** Esto significa que la rigidez del acero no cambia con su resistencia: una barra A730 y una barra A440 del mismo diámetro tienen exactamente la misma rigidez axial. Lo que cambia es el nivel al que empieza a fluir (fy) y cuánto puede deformarse antes de fracturarse. Los aceros de mayor resistencia son menos dúctiles: tienen una meseta de fluencia más corta y menor elongación total. Esto es un compromiso de diseño: mayor resistencia permite usar menos acero (ahorro de material), pero menor ductilidad puede ser problemático en diseño sísmico donde la capacidad de deformación es crítica.

---

## 5. Efecto de la Velocidad de Deformación

### 5.1 Comportamiento general

La **velocidad de deformación** (cuán rápido se aplica la carga) afecta las propiedades del acero:

- Un aumento en la velocidad de deformación → **aumento de la tensión de fluencia y de rotura**.
- El efecto es **mayor sobre fy** que sobre fu.
- El efecto es **mayor en aceros de menor tensión de fluencia** (A440 se ve más afectado que A630).

### 5.2 Relevancia sísmica

Durante un sismo, las deformaciones ocurren **rápidamente**:
- **Velocidad de deformación característica sísmica:** 0,01 s⁻¹ a 0,1 s⁻¹
- Efecto: la tensión de fluencia real durante el sismo puede ser **un 10% a 20% mayor** que fy estático.

#### 📊 Conclusión sobre velocidad de deformación:

> El aumento de fy bajo carga sísmica parece una ventaja (el acero es más resistente durante el sismo), pero en diseño sísmico por capacidad es en realidad una complicación: si fy real es mayor que fy nominal, las fuerzas que puede transmitir el acero son mayores que las calculadas, lo que puede sobrecargar elementos adyacentes (columnas, uniones) que se diseñaron para resistir la capacidad del acero nominal. Por esta razón, las normas sísmicas especifican usar valores de fy probable (amplificado) al diseñar los elementos que deben permanecer elásticos (columnas en diseño por capacidad).

---

## 6. Curvas Tensión-Deformación Idealizadas

Para el diseño y el análisis estructural, la curva real del acero se simplifica en modelos matemáticos más manejables.

### 6.1 Modelo Elástico Perfectamente Plástico (EPP) ⭐

Este es el modelo más usado en el diseño de hormigón armado (incluido el ACI):

```
Tensión σ
    ^
 fy |_____________________ (meseta infinita)
    |        /
    |       /
    |      / Es = 210.000 MPa
    |     /
    |    /
    +---+---------------------> Deformación ε
        εy
```

**Descripción:**
- Tramo **elástico lineal** desde 0 hasta εy, con pendiente Es.
- A partir de εy: tensión constante = fy para cualquier deformación.
- Se omite el endurecimiento por deformación (zona 3 de la curva real).
- Se asume que la meseta de fluencia se extiende indefinidamente.

**¿Por qué se usa este modelo?**
- Simplifica enormemente los cálculos.
- Es conservador en resistencia: no cuenta con el endurecimiento por deformación.
- Es el modelo implícito en todas las fórmulas del ACI 318.
- Es válido para diseño porque en condiciones de servicio normal el acero no alcanza la zona de endurecimiento.

#### 📊 Conclusión del modelo EPP:

> El modelo EPP captura lo esencial del comportamiento del acero con mínima complejidad matemática. Al ignorar el endurecimiento, el diseño es levemente conservador en resistencia. La hipótesis de meseta infinita es válida porque en el diseño se limitan las deformaciones del acero (generalmente εs ≤ 0,005 en verificación de ductilidad) muy por debajo de εsh. Este modelo es el que se usa en la deducción y aplicación del Bloque de Whitney.

### 6.2 Modelo Bilineal con endurecimiento

Igual que EPP pero incluye la zona 3 con pendiente Esh = 7.000 MPa. Se usa en análisis no lineal cuando se necesita mayor precisión.

### 6.3 Modelo de Ramberg-Osgood

Curva continua sin punto de quiebre definido. Se usa en modelación computacional avanzada (análisis no lineal fino).

---

## 7. Comportamiento Cíclico del Acero

### 7.1 Descripción general

El comportamiento cíclico del acero es cualitativamente diferente al del hormigón:
- Los lazos cíclicos del acero son **mucho más "llenos"** (mayor área encerrada).
- El acero tiene mayor capacidad de **disipación de energía** por ciclo que el hormigón.
- No hay degradación de resistencia en los primeros ciclos (a diferencia del hormigón).

Sin embargo, bajo deformaciones grandes repetidas, el acero puede fallar por **fatiga de bajo ciclaje**.

### 7.2 Fatiga de bajo ciclaje

- **Definición:** Falla por fatiga acumulada con **100 ciclos o menos** pero a **grandes deformaciones** (diferente a la fatiga clásica de alto ciclaje a bajas deformaciones).
- Es el modo de falla relevante para el acero de refuerzo bajo cargas sísmicas.
- **Regla clave:** Mayores deformaciones por ciclo → menor número de ciclos hasta la falla.

### 7.3 Relación de Coffin-Manson (1954)

Relaciona la amplitud de deformación con el número de ciclos hasta la falla:

$$\varepsilon_A = M \cdot (2N_f)^m$$

Donde:
| Símbolo | Significado |
|---|---|
| εA | Amplitud de deformación unitaria por ciclo |
| Nf | Número de ciclos completos hasta la falla |
| 2Nf | Número de **medio**-ciclos hasta la falla |
| M | Constante del material (regresión): **M = 0,11** |
| m | Constante del material (regresión): **m = −0,44** |

**Interpretación:** A mayor amplitud de deformación (εA mayor), el exponente m negativo hace que 2Nf sea menor → menos ciclos hasta la falla.

#### 📊 Conclusión de Coffin-Manson:

> La relación de Coffin-Manson cuantifica el daño acumulado en el acero bajo cargas sísmicas repetidas. Para un sismo severo que impone deformaciones de εA = 2% a 3%, el número de ciclos hasta la falla puede ser solo 10 a 20 ciclos. Como un sismo moderado puede generar 20-50 ciclos significativos, el diseño sísmico debe garantizar que la demanda de deformación en el acero sea suficientemente baja para sobrevivir todos esos ciclos. Esto se logra limitando la cuantía de acero y confinando el hormigón.

### 7.4 Índice de daño de Miner (1945)

Permite evaluar el daño acumulado cuando los ciclos tienen **amplitudes variables** (caso sísmico real):

$$D = \sum_i \frac{1}{2N_{fi}}$$

Donde:
- Di = daño acumulado en un medio ciclo a deformación εi
- 2Nfi = número de medios ciclos para producir falla a esa deformación εi
- **D = 1 → FALLA**

**Procedimiento:**
1. Para cada medio ciclo i, medir la amplitud de deformación εi.
2. Calcular 2Nfi usando Coffin-Manson: $2N_{fi} = (\varepsilon_i/M)^{1/m}$
3. Sumar el daño de cada medio ciclo: D = Σ(1/2Nfi)
4. Si D ≥ 1 → falla por fatiga acumulada.

#### 📊 Conclusión del índice de Miner:

> El índice de Miner permite sumar el daño de ciclos de distintas magnitudes como si fueran independientes (hipótesis de linealidad del daño). En la práctica, un sismo real tiene muchos ciclos pequeños y pocos ciclos grandes: los ciclos grandes son los que más contribuyen a D porque su 2Nfi es pequeño (denominador pequeño = contribución grande). Esto es consistente con la intuición de que los picos sísmicos más grandes son los más perjudiciales. La hipótesis de Miner es simplificadora: el daño real no es perfectamente lineal, pero es una herramienta de ingeniería práctica y aceptada.

---

## 8. Modelos Constitutivos para Análisis Cíclico

Para modelar el comportamiento cíclico completo del acero (necesario en análisis sísmico avanzado):

### 8.1 Modelo de Karthik & Mander (2011)
- Modelo explícito que representa la curva completa incluyendo endurecimiento y comportamiento cíclico.
- Incorpora el efecto del pandeo de barras comprimidas (barra que se dobla lateralmente bajo compresión en ciclos sísmicos).

### 8.2 Modelo de Menegotto & Pinto (1973) — variante 2011
- Uno de los modelos cíclicos más usados en software de análisis no lineal (OpenSees, SeismoStruct).
- Describe la transición suave entre el tramo elástico y plástico mediante una curva de Ramberg-Osgood modificada.
- Captura el efecto **Bauschinger**: cuando el acero primero fluye en tracción y luego se carga en compresión, la fluencia en compresión ocurre a un nivel de tensión menor que fy (el material "recuerda" que ya fue deformado en la dirección opuesta).

### 8.3 Modelo de Dhakal & Maekawa (2002) — variante 2011
- Incorpora el **pandeo de barras longitudinales** bajo compresión cíclica.
- Fundamental para columnas sísmicas donde el acero longitudinal puede pandearse entre estribos.
- El pandeo reduce significativamente la resistencia y ductilidad de la columna.

#### 📊 Conclusión sobre modelos constitutivos cíclicos:

> Los modelos constitutivos cíclicos van más allá del diseño convencional y son herramientas de análisis sísmico avanzado. El efecto Bauschinger (captado por Menegotto-Pinto) y el pandeo de barras (captado por Dhakal-Maekawa) son los dos fenómenos cíclicos más críticos del acero de refuerzo. El Bauschinger reduce la disipación de energía en ciclos alternados y el pandeo puede llevar a falla prematura de columnas. El diseño por capacidad busca prevenir el pandeo mediante la separación mínima de estribos (que actúan como soporte lateral de las barras longitudinales).

---

## 9. Resumen — Propiedades Clave del Acero de Refuerzo

| Propiedad | Valor / Referencia |
|---|---|
| Módulo de elasticidad Es | **210.000 MPa** (constante para todos los aceros) |
| Módulo de endurecimiento Esh | 7.000 MPa |
| Módulo de Poisson (elástico) | ν = 0,3 |
| Módulo de Poisson (plástico) | ν = 0,5 |
| Tensión fluencia A440 | fy = 280 MPa → εy = 0,00133 |
| Tensión fluencia A630 | fy = 420 MPa → εy = 0,002 |
| Tensión fluencia A700 | fy = 520 MPa |
| Tensión fluencia A730 | fy = 550 MPa |
| Elongación máxima | 4,5% – 12% (según tipo) |
| Densidad del acero | 7.850 kg/m³ |
| Modelo de diseño (ACI) | **Elástico Perfectamente Plástico (EPP)** |
| Norma chilena | NCh204.Of2020 |
| Ensayo de tracción | NCh200, l₀ = 200 mm |

---

## 10. Comparación Acero vs. Hormigón

| Aspecto | Acero | Hormigón |
|---|---|---|
| Resistencia a compresión | Alta | Alta (función principal) |
| Resistencia a tracción | **Alta** | Muy baja (≈10% de fc') |
| Módulo de elasticidad | E = 210.000 MPa | E = 4700√f'c ≈ 20.000–35.000 MPa |
| Ductilidad | **Alta** (plateau de fluencia) | Baja (frágil sin confinar) |
| Comportamiento | Simétrico tracción/compresión | Muy asimétrico |
| Deformación de fluencia | εy ≈ 0,002 (A630) | ε₀ ≈ 0,002 (en f'c) |
| Deformación última diseño | εs ≥ 0,004-0,005 | εu = 0,003 (ACI) |
| Efecto del tiempo | Sin fluencia ni retracción | Fluencia + retracción |

#### 📊 Conclusión final de la comparación:

> La razón de ser del hormigón armado queda perfectamente ilustrada en esta tabla: el acero tiene exactamente las propiedades que el hormigón no tiene (alta resistencia a tracción y alta ductilidad) y el hormigón tiene la resistencia a compresión que el acero puro no puede proporcionar económicamente para grandes elementos. La coincidencia de las deformaciones características (εy ≈ ε₀ ≈ 0,002) sugiere que ambos materiales están "naturalmente calibrados" para trabajar juntos, y la diferencia de módulos (E_acero ≈ 7 a 10 veces E_hormigón) explica el concepto de la razón modular (n = Es/Ec) que aparece en el análisis elástico de secciones.

---

## 11. Normas Aplicables

| Norma | Contenido |
|---|---|
| **NCh204.Of2020** | Acero de refuerzo para hormigón en Chile — clasificación y requisitos |
| **NCh200** | Ensayo de tracción de metales |
| **ASTM A615** | Acero de refuerzo al carbono (EE.UU.) |
| **ASTM A706** | Acero de refuerzo de baja aleación (EE.UU., sísmico) |

---

*Anterior: [01 — Comportamiento Mecánico del Hormigón](01_Hormigon_Comportamiento_Mecanico.md)*  
*Próximo: [03 — Criterios de Diseño y Normas](03_Criterios_Diseno_Normas.md)*
