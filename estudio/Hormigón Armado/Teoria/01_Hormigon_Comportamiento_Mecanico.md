# 01 — Comportamiento Mecánico del Hormigón
**Fuente:** Comportamiento Mecánico del Hormigón v2.pdf (65 diapositivas)  
**Profesor:** Ing. Miguel Colque González | **Fecha:** Marzo 2026

---

## 📌 Objetivos del Tema

- Conocer las características principales del hormigón.
- Analizar el comportamiento monotónico y cíclico en compresión uniaxial.
- Analizar el comportamiento triaxial.
- Conocer los fenómenos de fluencia lenta y retracción.

---

## 1. ¿Qué es el Hormigón Armado?

El **hormigón armado** es un material **compuesto** formado por:

- **Hormigón** (trabaja bien a compresión, muy mal a tracción)
- **Acero de refuerzo** (trabaja bien a tracción y a compresión)

La combinación de ambos aprovecha las ventajas de cada material y compensa sus debilidades. La unión entre ambos funciona gracias a la **adherencia** entre el acero y el hormigón circundante.

### Componentes del hormigón:
| Componente | Función |
|---|---|
| Cemento | Aglomerante; al hidratarse con agua genera la pasta que une todo |
| Agua | Activa la hidratación del cemento; la relación A/C es crítica |
| Áridos (finos y gruesos) | Relleno estructural; determinan densidad y resistencia |
| Aditivos | Modifican propiedades específicas (plastificantes, acelerantes, etc.) |

---

## 2. Propiedades Mecánicas — Resistencia a la Compresión

### 2.1 Ensayo de compresión (NCh1037)

La resistencia a la compresión se mide mediante ensayo de probetas cilíndricas bajo la norma chilena **NCh1037**.

**Condiciones del ensayo:**
- **Relación altura/diámetro = 2** (forma estándar: cilindro de 15 cm diámetro × 30 cm altura)
- **Duración del ensayo: 2 a 3 minutos**

> ⚠️ **¿Por qué h/d = 2?** Esta proporción minimiza el efecto de confinamiento de las placas de carga sobre la probeta. Con proporciones menores (más corta), las placas restringen el desplazamiento lateral del hormigón generando confinamiento, lo que aumenta artificialmente la resistencia medida. Con h/d = 2 ese efecto es despreciable en la zona central de la probeta, obteniendo un valor real de resistencia uniaxial.

La resistencia obtenida se denomina **f'c** (resistencia característica a la compresión).

### 2.2 Clasificación según NCh170:2016

El hormigón se clasifica con la nomenclatura:

**G**XX

Donde **XX** es la resistencia característica a la compresión en probetas cilíndricas, expresada en **MPa**.

Ejemplo: **G25** → hormigón con f'c = 25 MPa

> 💡 Esta es la resistencia de diseño que se usa en todas las fórmulas del ramo.

---

## 3. Comportamiento Uniaxial Monotónico

### 3.1 Curva tensión-deformación — Análisis quirúrgico

La curva tensión-deformación en compresión uniaxial es el corazón del comportamiento mecánico del hormigón. Se obtiene aplicando compresión progresiva a la probeta y midiendo simultáneamente fuerza y deformación.

#### Descripción de la curva (de izquierda a derecha):

**Zona 1 — Rango lineal (0 a 0,5·f'c):**
- La curva es **casi perfectamente lineal**.
- El material se comporta como elástico: si se retira la carga, la deformación desaparece.
- La pendiente de esta zona corresponde al **módulo de elasticidad E**.
- Hasta este punto no hay daño significativo en la microestructura del hormigón.

**Zona 2 — Rango no lineal ascendente (0,5·f'c a f'c):**
- La curva comienza a curvarse hacia la derecha (pierde rigidez).
- Aparecen microfisuras en la interfaz entre áridos y pasta de cemento.
- La deformación crece más rápido que la tensión.
- El material empieza a dañarse internamente, aunque aún soporta mayor carga.

**Punto máximo — Resistencia f'c:**
- Se alcanza la resistencia máxima del hormigón.
- La deformación en este punto es aproximadamente **ε₀ ≈ 0,002** (2‰), independiente de la resistencia.
- Este es el punto más importante para el diseño.

**Zona 3 — Rama de descarga o post-pico:**
- La curva baja hacia la derecha: el material sigue deformándose aunque la tensión disminuye.
- Existe daño estructural importante: macrofisuras visibles.
- La pendiente de esta rama (la rapidez con que baja) depende del tipo de hormigón.
- Esta zona es crucial para entender la **ductilidad** del material.

#### 📊 Conclusión de la curva tensión-deformación:

> La curva tensión-deformación del hormigón revela tres propiedades fundamentales para el diseño estructural:
> 1. **Rigidez inicial (E)**: cuánto se deforma el material por unidad de tensión en rango elástico.
> 2. **Resistencia máxima (f'c)**: el límite de capacidad a compresión.
> 3. **Ductilidad**: la capacidad de deformarse más allá del punto máximo sin colapso abrupto — determinada por la forma y extensión de la rama post-pico.

---

### 3.2 Efecto de la resistencia en la curva tensión-deformación

Al comparar curvas de hormigones de distinta resistencia (ej. G20, G30, G40, G50):

| Propiedad | Hormigón baja resistencia | Hormigón alta resistencia |
|---|---|---|
| Rigidez inicial (pendiente) | Menor | **Mayor** |
| Deformación en f'c (ε₀) | ≈ 0,002 | ≈ 0,002 (similar) |
| Rama post-pico | Suave, gradual | **Pronunciada, abrupta** |
| Ductilidad | Mayor | **Menor** |

#### 📊 Conclusión del efecto de la resistencia:

> Un hormigón de **alta resistencia** es más rígido (ventaja estructural) pero también más **frágil**: su rama post-pico cae abruptamente, lo que significa que una vez superado f'c, el colapso es rápido y sin advertencia. En cambio, un hormigón de **baja resistencia** ofrece mayor ductilidad: se deforma progresivamente antes de fallar, dando señales de advertencia. Esta es una razón fundamental por la que el diseño sísmico limita la resistencia máxima o exige confinamiento del hormigón de alta resistencia.

---

### 3.3 Efecto de las dimensiones de la probeta

La relación tensión-deformación **depende de la razón de aspecto** (h/d) de la probeta:

- Razones de aspecto menores (probetas más cortas) → el confinamiento de las placas de carga afecta una mayor proporción del volumen → **resistencia artificialmente mayor**.
- Distintas geometrías transversales (cuadrada vs. circular) generan efectos similares en la distribución de tensiones.
- Si se ensaya con geometría diferente a h/d = 2, **se debe corregir la resistencia** medida con factores de corrección.

#### 📊 Conclusión del efecto dimensional:

> La normalización del ensayo (h/d = 2) no es arbitraria: es la proporción que minimiza el efecto de confinamiento de las placas y entrega la resistencia real del material sin distorsiones geométricas. Cambiar la geometría sin corregir los resultados lleva a sobreestimar o subestimar f'c.

---

### 3.4 Efecto de la velocidad de carga

- Los elementos de hormigón real son **cargados lentamente** (cargas permanentes que actúan durante años).
- El ensayo de laboratorio se hace en 2 a 3 minutos, que es mucho más rápido que la carga real.
- Una carga más lenta → menor resistencia medida (el material tiene más tiempo para fisurarse).
- Este efecto se **compensa con la ganancia de resistencia del hormigón en el tiempo** (el hormigón sigue ganando resistencia después de los 28 días estándar de curado).
- En la práctica, ambos efectos tienden a cancelarse y se trabaja con f'c a 28 días como valor de diseño.

---

## 4. Módulo de Elasticidad del Hormigón (E)

### 4.1 Definición según ACI

El módulo de elasticidad del hormigón no es una constante bien definida como en el acero (que tiene un tramo lineal claro). Por convenio, el **ACI** lo define como:

> La pendiente de la **secante** trazada desde el origen (esfuerzo = 0) hasta el punto de **0,45·f'c** en la curva tensión-deformación.

#### 📊 Conclusión de la definición del módulo:

> Se usa una secante (no la tangente inicial) porque captura el comportamiento promedio del rango de trabajo real del hormigón. El 0,45·f'c es aproximadamente el nivel de tensión bajo cargas de servicio, que es donde más importa conocer la rigidez. Este valor siempre es menor que la pendiente de la tangente inicial, reflejando que el hormigón ya no es perfectamente lineal a ese nivel.

### 4.2 Fórmula simplificada (ACI)

Para **hormigones de peso normal** (wc ≈ 2300 kgf/m³):

$$E_c = 4700 \sqrt{f'_c} \quad \text{[MPa]}$$

Para **hormigones de cualquier densidad** (fórmula general):

$$E_c = 0.14 \cdot w_c^{1.5} \cdot \sqrt{f'_c}$$

Donde:
- f'c en MPa
- wc = densidad del hormigón en kgf/m³
- Ec en MPa

> ⚠️ **Limitación importante:** La ecuación del ACI **sobreestima el módulo de elasticidad para hormigones de alta resistencia** (f'c > 40-50 MPa). Para esos casos existen expresiones alternativas que el profesor menciona.

---

## 5. Efecto de la Densidad del Hormigón

| Tipo | Densidad (ρ) | Características |
|---|---|---|
| Hormigón **normal** | 2.200 – 2.300 kg/m³ | Uso estructural estándar |
| Hormigón **liviano** | 1.800 – 1.900 kg/m³ | Áridos livianos (arcilla expandida, etc.) |

**Efecto de mayor densidad:**
- **Mayor rigidez** (Ec más alto)
- **Menor deformación en f'c** (ε₀ menor)
- **Menor pérdida de ductilidad** para hormigones de alta resistencia

#### 📊 Conclusión del efecto de la densidad:

> Un hormigón más denso es más rígido y más predecible en su comportamiento post-pico. El hormigón liviano, aunque más manejable constructivamente, es más deformable y su comportamiento post-pico es más errático. Esto explica por qué la fórmula de Ec incluye la densidad como parámetro.

---

## 6. Módulo de Poisson (μ)

El **módulo de Poisson** relaciona la deformación transversal con la deformación longitudinal bajo compresión uniaxial:

$$\mu = \frac{\varepsilon_{transversal}}{\varepsilon_{longitudinal}}$$

**Valor típico para el hormigón:**
$$\mu = 0{,}15 - 0{,}20$$

**Comportamiento notable:**
- Para esfuerzos de compresión **bajos y medios**, μ es casi constante.
- Para esfuerzos **cercanos a f'c**, las deformaciones transversales aumentan **rápidamente** (el hormigón se expande lateralmente de forma acelerada antes de fallar).

#### 📊 Conclusión del módulo de Poisson:

> El aumento abrupto de deformaciones transversales cerca de f'c es una señal de daño interno severo (formación de macrofisuras verticales que permiten la expansión lateral). Esto tiene implicancias directas en el confinamiento: si se rodea el hormigón con espirales de acero que restringen esta expansión lateral, se puede aumentar significativamente la resistencia y ductilidad del hormigón confinado (principio del hormigón triaxialmente confinado).

---

## 7. Modelos Constitutivos del Hormigón

Los modelos constitutivos son ecuaciones matemáticas que representan la curva tensión-deformación completa. Son necesarios para el análisis no lineal de estructuras.

### 7.1 Modelo de Hognestad Modificado

- Válido para hormigones de hasta **f'c ≤ 40 MPa**.
- La curva ascendente se modela como una **parábola de segundo grado**.
- La curva descendente (post-pico) se modela como una **línea recta**.
- Incorpora la diferencia entre la resistencia de una probeta de laboratorio y la resistencia efectiva de un **elemento estructural real** (el hormigón in situ es ligeramente menos resistente por las condiciones de vaciado, vibrado y curado en obra).

**Expresión para la rama ascendente:**

$$f = f'_c \left[ \frac{2\varepsilon}{\varepsilon_0} - \left(\frac{\varepsilon}{\varepsilon_0}\right)^2 \right] \quad \text{para } \varepsilon \leq \varepsilon_0$$

### 7.2 Modelo Parábola-Rectángulo

- Combinación de una parábola en la zona ascendente y un tramo horizontal (rectangular) hasta la deformación última εu = 0,003.
- Es el modelo más usado en la **normativa europea (CEB-FIP / Eurocódigo)**.
- Físicamente representa: el hormigón sube parabólicamente hasta f'c y luego mantiene esa tensión hasta la deformación última (simplificación conservadora del post-pico).

### 7.3 Modelo de Todeschini (1964)

- Representa la curva completa (ascendente y descendente) con una única ecuación continua.
- Más preciso que Hognestad para hormigones de alta resistencia.

#### 📊 Conclusión sobre modelos constitutivos:

> El modelo a usar depende del propósito del análisis. Para diseño de secciones con el Bloque de Whitney (ACI), no se necesita el modelo constitutivo detallado porque el bloque ya simplifica la distribución de tensiones. Los modelos constitutivos son necesarios cuando se requiere un análisis no lineal más refinado (análisis pushover, análisis sísmico avanzado, o cuando el comportamiento post-pico importa).

---

## 8. Comportamiento Cíclico

El comportamiento cíclico se refiere a lo que ocurre cuando el hormigón es sometido a cargas que se aplican y retiran repetidamente (sismos, cargas de viento, tráfico).

### Características observadas en ensayos cíclicos:

1. **Degradación de rigidez en cada ciclo:** La pendiente de descarga en cada ciclo es menor que en el ciclo anterior. El módulo de elasticidad efectivo disminuye con cada ciclo.

2. **Deformación remanente (residual) en cada ciclo:** Al retirar la carga, el hormigón no vuelve al punto de deformación cero. Queda una deformación plástica permanente que se acumula ciclo a ciclo.

3. **Fatiga de bajo ciclaje vs. alto ciclaje:**
   - **Alto ciclaje a baja deformación** (ej. tráfico): debe considerarse en el diseño según **ACI215R-92**.
   - **Grandes deformaciones de origen sísmico**: el daño por ciclo es mayor, la degradación se acelera drásticamente.

4. **Envolvente de la curva cíclica:** La curva que une los puntos máximos de cada ciclo tiende a seguir la curva monotónica. Esto significa que la curva monotónica es una buena representación de la capacidad máxima aunque el cargado sea cíclico.

#### 📊 Conclusión del comportamiento cíclico:

> El comportamiento cíclico del hormigón es crítico para el diseño sísmico. La degradación de rigidez y la acumulación de deformación residual significan que una estructura sometida a un sismo pierde progresivamente su capacidad de retornar a la posición original (pérdida de rigidez lateral). El diseño sísmico debe garantizar suficiente ductilidad para que la estructura sobreviva múltiples ciclos de carga sin colapso, lo que se logra principalmente con un adecuado confinamiento del hormigón mediante estribos.

---

## 9. Resistencia a la Tracción

La resistencia a la tracción del hormigón es **mucho menor que su resistencia a la compresión**. Se estima en aproximadamente:

$$f_t \approx 0{,}1 \cdot f'_c$$

Es decir, solo el **10% de la resistencia a compresión**.

### 9.1 Métodos de medición

#### Ensayo por hendimiento (Prueba Brasileña) — NCh1170
- Se coloca el cilindro horizontal y se aplica una carga lineal en su diámetro.
- La tensión de tracción se genera perpendicularmente al plano de carga.
- Fórmula: $f_{sp} = \frac{2P}{\pi L d}$
- Es el método más común por su facilidad de ejecución.

#### Ensayo de flexotracción — NCh1038
- Se ensaya una viga simplemente apoyada con carga en el tercio central.
- Se mide el **módulo de rotura** (fr): la tensión de tracción extrema en la fibra inferior en el momento de la falla.
- El módulo de rotura es mayor que la resistencia directa a tracción porque en flexión el daño se concentra solo en la fibra extrema, no en toda la sección.

#### 📊 Conclusión sobre tracción:

> La baja resistencia a la tracción del hormigón es la razón fundamental de la existencia del hormigón armado: el acero de refuerzo se coloca en la zona traccionada para absorber esas tensiones. En el diseño, la resistencia a la tracción del hormigón se **desprecia completamente** al calcular la resistencia a flexión, lo que es uno de los supuestos fundamentales del diseño de vigas.

---

## 10. Comportamiento Biaxial

Cuando el hormigón está sometido a tensiones simultáneas en **dos direcciones** (plano):

| Estado de tensiones | Efecto |
|---|---|
| Compresión + Compresión | **Aumento de resistencia hasta un 25%** respecto a uniaxial |
| Tracción + Compresión | **Disminución de resistencia** en la dirección de compresión |
| Tracción + Tracción | Disminución de resistencia en ambas direcciones |

#### 📊 Conclusión del comportamiento biaxial:

> El efecto biaxial más relevante para el diseño es el de **compresión biaxial**: en columnas o muros donde actúan compresiones en dos direcciones, la resistencia efectiva es mayor que f'c. Sin embargo, la combinación de tracción perpendicular con compresión es perjudicial: esto ocurre, por ejemplo, en zonas de anclaje de barras de acero donde las fuerzas de adherencia generan tracciones perpendiculares a la dirección de compresión principal.

---

## 11. Comportamiento Triaxial

Cuando el hormigón está confinado (rodeado por espirales, estribos o encamisado), está sometido a tensiones en las **tres direcciones**:

**Efectos del confinamiento triaxial:**
- La **resistencia a la compresión aumenta significativamente** (puede duplicarse o más).
- La **deformación unitaria última puede llegar hasta el 6%** (vs. 0,3% sin confinar).
- La deformación en el punto de resistencia máxima también aumenta.
- El material se vuelve **mucho más dúctil**.

#### 📊 Conclusión del comportamiento triaxial — Implicancia de diseño:

> El confinamiento es la herramienta más poderosa para mejorar el comportamiento del hormigón. En diseño sísmico, los estribos cerrados y las espirales en columnas generan confinamiento triaxial que transforma el hormigón de un material frágil en uno con gran ductilidad. Esta es la base del diseño por capacidad en zonas sísmicas: se confina el hormigón en las zonas de rótula plástica para garantizar grandes deformaciones sin pérdida de resistencia.

---

## 12. Fluencia del Hormigón (Creep)

### 12.1 Definición y características

La **fluencia** (o *creep*) es el **acortamiento progresivo del hormigón bajo cargas sostenidas en el tiempo**, incluso sin aumento de la carga aplicada.

Características fundamentales:
- La deformación de fluencia puede llegar a ser **igual o mayor** que la deformación elástica inicial.
- Genera **redistribución de esfuerzos** en elementos hiperestáticos: el hormigón "cede" y transfiere carga al acero.
- Es irreversible en su mayor parte (deformación permanente).

### 12.2 Cálculo según ACI 209R

La deformación total de fluencia se calcula multiplicando la deformación elástica inicial por un coeficiente total de fluencia:

$$\varepsilon_{fluencia}(t) = \varepsilon_{elástica} \cdot C_t(t)$$

Donde el coeficiente de fluencia total se obtiene como:

$$C_t = C_u \cdot K_t \cdot K_a \cdot K_h \cdot K_{th} \cdot K_s \cdot K_f \cdot K_e$$

#### Coeficientes de fluencia (ACI 209R):

| Coeficiente | Símbolo | Descripción | Fórmula |
|---|---|---|---|
| Último de fluencia | Cu | Valor asintótico máximo | 1,3 – 4,15 (usar **2,35** si no hay datos precisos) |
| Tiempo de carga | Kt | Evolución en el tiempo | $K_t = \dfrac{t^{0.6}}{10 + t^{0.6}}$ (t en días) |
| Edad de primera carga | Ka | Efecto de la madurez del hormigón | Ka = 1,25·ti⁻⁰·¹¹⁸ (curado húmedo) / Ka = 1,13·ti⁻⁰·⁰⁹⁴ (curado al vapor) |
| Humedad relativa | Kh | Efecto del ambiente | H ≤ 40%: Kh = 1 / H > 40%: Kh = 1,27 − 0,0067·H |
| Espesor promedio | Kth | Efecto del tamaño del elemento | h ≤ 150mm: ver tabla / 150 < h ≤ 400mm (1er año): Kth = 1,14 − 0,00092·h / 150 < h ≤ 400mm (último): Kth = 1,10 − 0,00067·h |
| Revenimiento | Ks | Efecto de la trabajabilidad (A/C indirecta) | Ks = 0,82 + 0,00264·S |
| Contenido de finos | Kf | Proporción de áridos finos | Kf = 0,88 + 0,00264·%finos |
| Contenido de aire | Ke | Aire incluido | Ke = 0,46 + 0,09·%aire ≥ 1,0 |

#### 📊 Conclusión sobre fluencia:

> La fluencia es un fenómeno de largo plazo que afecta principalmente a elementos con **cargas permanentes elevadas** (columnas, vigas postesadas). Su efecto más crítico es la redistribución de esfuerzos: el hormigón fluye y transfiere tensiones al acero de refuerzo, lo que puede saturar la capacidad del acero si no se consideró en el diseño. Además, en vigas, la fluencia aumenta las deflexiones con el tiempo (a veces al doble o más de la deflexión elástica inicial), lo que puede comprometer la funcionalidad del elemento aunque no su seguridad estructural.

---

## 13. Retracción del Hormigón (Shrinkage)

### 13.1 Definición y características

La **retracción** es el **acortamiento del hormigón por pérdida de humedad** (evaporación), **independiente de las cargas aplicadas**.

Características:
- Ocurre desde el momento en que el hormigón comienza a secarse.
- Produce **fisuración** si el elemento está restringido a deformarse libremente.
- Genera **pérdida de rigidez** y afecta la durabilidad.
- Incrementa la deformación total en el tiempo.
- Es un **fenómeno parcialmente reversible**: si el hormigón se rehúmeda, parte de la retracción se recupera (hinchamiento).
- Consultar **ACI 209R** para el cálculo detallado.

**Deformación final típica:** entre 0,0002 y 0,0006 (puede llegar hasta 0,001 en casos extremos).

### 13.2 Cálculo según ACI 209R

$$\varepsilon_{sh}(t) = \varepsilon_{shu} \cdot S_t \cdot S_h \cdot S_{th} \cdot S_s \cdot S_f \cdot S_e \cdot S_c$$

#### Deformación última por retracción:
$$\varepsilon_{shu} = 0{,}000415 - 0{,}00107 \quad \text{(valor promedio: 0,00078)}$$

#### Coeficientes de retracción (ACI 209R):

| Coeficiente | Símbolo | Descripción | Fórmula |
|---|---|---|---|
| Tiempo | St | Evolución temporal | Curado húmedo (desde día 7): $S_t = \dfrac{t}{t+35}$ / Curado vapor (desde día 1-3): $S_t = \dfrac{t}{t+55}$ |
| Humedad | Sh | Efecto del ambiente | H ≤ 40%: Sh = 1 / 40% < H ≤ 80%: Sh = 1,4 − 0,0102·H / 80% < H ≤ 100%: Sh = 3,0 − 0,03·H |
| Espesor | Sth | Tamaño del elemento | h ≤ 150mm: ver tabla / 150 < h ≤ 400mm (1er año): Sth = 1,23 − 0,0015·h / 150 < h ≤ 400mm (último): Sth = 1,17 − 0,00114·h |
| Revenimiento | Ss | Consistencia (A/C indirecta) | Ss = 0,89 + 0,00161·S |
| Finos | Sf | Proporción de áridos finos | %finos ≤ 50%: Sf = 0,30 + 0,014·%finos / %finos > 50%: Sf = 0,90 + 0,002·%finos |
| Aire | Se | Aire incluido | Se = 0,95 + 0,008·%aire |
| Cemento | Sc | Contenido de cemento | Sc = 0,75 + 0,00061·c |

> **t₀** = tiempo desde el vaciado hasta que termina el período de curado.

#### 📊 Conclusión sobre retracción:

> La retracción es especialmente peligrosa en elementos largos o continuos que no pueden contraerse libremente (losas, muros, pavimentos). Al estar restringida, la retracción genera tensiones de tracción que pueden superar la resistencia a tracción del hormigón, produciendo fisuras antes de que se aplique ninguna carga estructural. El control de la retracción se hace mediante: juntas de dilatación que permiten el movimiento libre, curado adecuado que retarda el secado, relaciones A/C bajas, y diseño de la mezcla con contenidos moderados de cemento.

---

## 14. Expansión Térmica

El hormigón también se deforma con los cambios de temperatura. El **coeficiente de expansión térmica** es aproximadamente:

$$\alpha_T \approx 10^{-5} \, °C^{-1} \quad (10 \, \mu\varepsilon/°C)$$

### Efecto de altas temperaturas (incendio):

| Temperatura | Efecto |
|---|---|
| Hasta 200°C | La rigidez (Ec) comienza a disminuir |
| Hasta 400°C | Resistencia f'c se mantiene relativamente estable |
| **400°C – 600°C** | **Reducción significativa de la resistencia** |
| 600°C | La resistencia cae al **60%** del valor original |

#### 📊 Conclusión sobre comportamiento térmico:

> El hormigón tiene cierta resistencia al fuego inherente, pero a temperaturas de incendio real (600-900°C) sufre daño irreversible severo. La pérdida de resistencia comienza de forma apreciable sobre los 400°C, y a los 600°C el hormigón ya ha perdido el 40% de su capacidad. Esto explica los requisitos de recubrimiento mínimo en el diseño contra incendio: el recubrimiento de hormigón protege al acero de refuerzo del calor, ya que el acero también pierde resistencia a temperaturas elevadas y es el elemento más vulnerable.

---

## 15. Resumen General

| Propiedad | Valor típico / Referencia |
|---|---|
| Resistencia a compresión f'c | 20 – 50 MPa (diseño convencional) |
| Deformación en f'c (ε₀) | ≈ 0,002 (2‰) |
| Deformación última (εu) | 0,003 (3‰) — valor ACI para diseño |
| Módulo de elasticidad | Ec = 4700√f'c [MPa] (peso normal) |
| Módulo de Poisson | μ = 0,15 – 0,20 |
| Resistencia a tracción | ≈ 0,1·f'c |
| Densidad (hormigón normal) | 2.200 – 2.300 kg/m³ |
| Coeficiente fluencia último | Cu = 2,35 (valor sin datos precisos) |
| Deformación retracción última | εshu ≈ 0,00078 (promedio) |
| Coeficiente expansión térmica | αT ≈ 10⁻⁵ °C⁻¹ |

---

## 16. Normas Aplicables

| Norma | Contenido |
|---|---|
| **NCh170:2016** | Clasificación del hormigón (GXX) y requisitos generales |
| **NCh1037** | Ensayo de resistencia a la compresión (probetas cilíndricas) |
| **NCh1170** | Ensayo de resistencia a la tracción por hendimiento (prueba brasileña) |
| **NCh1038** | Ensayo de flexotracción (módulo de rotura) |
| **ACI 209R** | Cálculo de fluencia y retracción |
| **ACI 215R-92** | Consideraciones por fatiga en hormigón |

---

*Próximo: [02 — Comportamiento Mecánico del Acero](02_Acero_Comportamiento_Mecanico.md)*
