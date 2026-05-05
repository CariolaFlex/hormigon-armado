# 📊 Estudios — Hormigón Armado
**Profesor:** Ing. Miguel Colque González | **Semestre:** 1S 2026

> Repositorio de gráficas, teoremas, normas y figuras interpretadas al detalle.

---

## 📐 NORMAS DE REFERENCIA

| Norma | Alcance | Aplicación en el ramo |
|---|---|---|
| **NCh170:2016** | Clasificación y requisitos generales del hormigón | Designación GXX, propiedades mínimas |
| **NCh1037** | Ensayo de compresión en probetas cilíndricas | Medición de f'c estándar |
| **NCh1170** | Ensayo de tracción por hendimiento (prueba brasileña) | Medición de fsp |
| **NCh1038** | Ensayo de flexotracción | Medición del módulo de rotura fr |
| **ACI 318** | Código de diseño de hormigón armado (EE.UU.) | Referencia principal del ramo |
| **ACI 209R** | Predicción de fluencia y retracción | Cálculo de deformaciones diferidas |
| **ACI 215R-92** | Fatiga en estructuras de hormigón | Diseño bajo cargas repetidas |

---

## 📈 GRÁFICAS — ANÁLISIS COMPLETO

---

### G-01 | Curva tensión-deformación uniaxial del hormigón

**Fuente:** PDF 1, diapositivas 5-10  
**Ejes:** Eje X = deformación unitaria ε [adimensional] / Eje Y = tensión σ [MPa o kgf/cm²]

#### Descripción de la figura:
La curva parte en el origen (sin carga = sin deformación), sube con pendiente casi constante hasta aproximadamente σ = 0,5·f'c (comportamiento lineal), luego la pendiente disminuye progresivamente (no linealidad creciente) hasta llegar al punto máximo (f'c, ε₀ ≈ 0,002), y finalmente desciende formando una "cola" hacia la derecha.

#### Puntos clave de la curva:
| Punto | Tensión | Deformación | Significado |
|---|---|---|---|
| Origen | 0 | 0 | Sin carga |
| Límite lineal | 0,5·f'c | ~0,001 | Fin del comportamiento elástico |
| Máximo | **f'c** | **≈ 0,002** | Resistencia máxima |
| Diseño ACI (último) | — | **0,003** | Deformación última de diseño |
| Falla total | ~0,3·f'c | > 0,003 | Colapso del material |

#### Conclusión quirúrgica:
> La curva tensión-deformación sintetiza todo el comportamiento mecánico del hormigón en una sola imagen. El tramo lineal hasta 0,5·f'c define la zona de servicio (cargas normales de uso). El punto máximo f'c a ε₀ = 0,002 es el límite de resistencia: diseñar sin sobrepasar este punto garantiza que el material funciona. La "cola" descendente post-pico mide la ductilidad: cuanto más horizontal y larga sea esta cola, más dúctil es el material y más advertencia da antes del colapso. El ACI usa εu = 0,003 como deformación última de diseño, que está en la zona post-pico de la curva real: esto incorpora un margen de seguridad adicional ya que el hormigón real aún tiene algo de resistencia en ese punto.

---

### G-02 | Efecto de la resistencia en la curva tensión-deformación

**Fuente:** PDF 1, diapositivas 9-10  
**Descripción:** Familia de curvas para distintos valores de f'c (baja, media, alta resistencia), graficadas en los mismos ejes σ-ε.

#### Lo que muestra la figura:
- Todas las curvas alcanzan su máximo a ε ≈ 0,002 (ε₀ es prácticamente igual para todas las resistencias).
- Las curvas de mayor f'c tienen **mayor pendiente inicial** (más rígidas).
- Las curvas de mayor f'c tienen una **rama post-pico más pronunciada** (caen más rápido).
- Las curvas de menor f'c tienen una rama post-pico más suave y extendida.

#### Conclusión quirúrgica:
> Esta figura es fundamental para comprender el dilema rigidez vs. ductilidad del hormigón: no se puede tener ambas en máximo nivel simultáneamente. Un hormigón de alta resistencia es estructuralmente eficiente (menos material para la misma carga) pero frágil (falla rápida sin advertencia). Un hormigón de baja resistencia es ineficiente pero dúctil. La solución del diseño moderno es usar hormigón de alta resistencia pero **confinarlo** con acero para recuperar la ductilidad perdida. Las barras verticales en ε₀ = 0,002 confirman que la deformación de resistencia máxima es una propiedad universal del hormigón, independiente de f'c.

---

### G-03 | Curvas cíclicas del hormigón en compresión

**Fuente:** PDF 1, diapositivas 22-25  
**Descripción:** Múltiples ciclos de carga-descarga-recarga en compresión uniaxial. Cada ciclo es un lazo cerrado.

#### Lo que muestra la figura:
- **Carga:** la curva sigue aproximadamente la envolvente monotónica.
- **Descarga:** la curva cae con pendiente menor que la carga inicial (rigidez secante degradada).
- **Recarga:** la curva no vuelve al mismo punto que antes, sino a un nivel ligeramente inferior.
- Con cada ciclo: la pendiente de descarga disminuye, la deformación remanente aumenta, el lazo se ensancha (mayor área = mayor energía disipada por ciclo, pero también mayor daño).

#### Conclusión quirúrgica:
> La envolvente de todos los lazos cíclicos coincide con la curva monotónica, lo que confirma que la curva monotónica representa la capacidad máxima del material independiente del tipo de carga. Los lazos cíclicos muestran dos efectos perniciosos acumulativos: degradación de rigidez (el material se vuelve progresivamente más flexible, lo que aumenta los desplazamientos sísmicos) y acumulación de deformación plástica (la estructura no vuelve a su posición original). En diseño sísmico, el área encerrada por los lazos representa energía disipada (amortiguamiento histérico): mayor área = mejor comportamiento sísmico.

---

### G-04 | Comportamiento biaxial del hormigón

**Fuente:** PDF 1, diapositivas 30-31  
**Descripción:** Envolvente de resistencia en el plano σ₁-σ₂ (diagrama de falla biaxial).

#### Lo que muestra la figura:
- El diagrama divide el plano en 4 cuadrantes: C-C (compresión biaxial), C-T (compresión-tracción), T-T (tracción biaxial).
- En la zona **C-C**: la envolvente se expande hacia afuera del cuadrado unitario → aumento de resistencia de hasta 25%.
- En la zona **C-T**: la envolvente se contrae → la tracción perpendicular reduce la resistencia a compresión.
- En la zona **T-T**: la resistencia es menor que en tracción uniaxial.

#### Conclusión quirúrgica:
> El estado biaxial más favorable es la compresión biaxial, que puede aumentar la resistencia hasta un 25% respecto a f'c. Sin embargo, en la mayoría de los elementos estructurales reales, el estado crítico es compresión con tracción perpendicular (zona C-T), que reduce la resistencia. Este efecto es relevante en zonas de anclaje, en vigas con fuerzas de corte importantes, y en losas. El diseño convencional con f'c uniaxial es conservador en zonas de C-C y posiblemente no conservador en zonas C-T severas, lo que se toma en cuenta con los factores de resistencia φ.

---

### G-05 | Comportamiento triaxial — Curvas con confinamiento

**Fuente:** PDF 1, diapositivas 32-33  
**Descripción:** Curvas tensión-deformación para distintos niveles de presión de confinamiento lateral (σ₃ = 0, σ₃ = f₁, σ₃ = f₂, con f₂ > f₁ > 0).

#### Lo que muestra la figura:
- A mayor presión de confinamiento, la curva completa se desplaza hacia arriba (mayor resistencia) y hacia la derecha (mayor deformación en el máximo y mayor deformación última).
- La resistencia puede duplicarse o triplicarse con suficiente confinamiento.
- La ductilidad (extensión de la rama post-pico) aumenta dramáticamente: εu puede llegar al 6% vs. 0,3% sin confinar.
- La forma de la curva post-pico cambia de pronunciada (frágil) a casi horizontal (muy dúctil).

#### Conclusión quirúrgica:
> Esta figura es la justificación científica del uso de estribos y espirales en columnas sísmicas. El confinamiento triaxial transforma cualitativamente el comportamiento del hormigón: de un material frágil con colapso abrupto a uno dúctil con gran capacidad de deformación. Los modelos de hormigón confinado (Mander, Kent-Park, etc.) capturan este comportamiento y son la base del diseño de columnas de alta ductilidad. La relación entre la presión de confinamiento y el aumento de resistencia es aproximadamente lineal: cada unidad adicional de presión lateral agrega alrededor de 4 unidades a la resistencia a compresión.

---

### G-06 | Fluencia — Evolución temporal

**Fuente:** PDF 1, diapositivas 34-45  
**Descripción:** Curva de deformación de fluencia vs. tiempo bajo carga constante.

#### Lo que muestra la figura:
- Al aplicar la carga instantáneamente, ocurre una deformación elástica inmediata.
- Luego, bajo carga constante, la deformación continúa creciendo en el tiempo con velocidad decreciente.
- La curva es asintótica: tiende a un valor límite Cu·εelástica cuando t → ∞.
- Si se retira la carga, hay una recuperación elástica inmediata + recuperación de fluencia parcial (lenta), pero queda una deformación remanente permanente.

#### Conclusión quirúrgica:
> La forma asintótica de la curva de fluencia confirma que la mayor parte del daño diferido ocurre en los primeros años de vida del elemento. El coeficiente de tiempo Kt = t⁰·⁶/(10+t⁰·⁶) captura este comportamiento: llega al 50% de la fluencia final alrededor de los 10 días y al 90% aproximadamente al año. Implicancia de diseño: las deformaciones a largo plazo (flechas diferidas de vigas, pérdidas de pretensado) deben calcularse multiplicando la deformación elástica por (1 + Cu) donde Cu ≈ 2,35. Esto significa que la deformación total puede ser el **triple** de la elástica inicial.

---

### G-07 | Retracción — Evolución temporal

**Fuente:** PDF 1, diapositivas 46-62  
**Descripción:** Curva de deformación por retracción vs. tiempo desde el fin del curado.

#### Lo que muestra la figura:
- La retracción comienza al terminar el período de curado (t₀).
- Crece rápidamente al principio y luego se desacelera.
- La curva también es asintótica: tiende a εshu cuando t → ∞.
- El coeficiente de tiempo St = t/(t+35) (curado húmedo) o t/(t+55) (curado vapor) determina la velocidad.

#### Conclusión quirúrgica:
> La retracción es significativamente más rápida que la fluencia en su evolución inicial. El denominador de St (35 o 55 días) indica que aproximadamente al mes ya se ha desarrollado la mitad de la retracción final en hormigón curado húmedo. Esto es relevante porque las fisuras por retracción aparecen temprano, antes de que el elemento esté en pleno uso. El control más efectivo de la retracción es el curado: mantener húmedo el hormigón el mayor tiempo posible retrasa el inicio y reduce la magnitud de la retracción.

---

### G-08 | Resistencia vs. temperatura (expansión térmica)

**Fuente:** PDF 1, diapositivas 63-65  
**Descripción:** Curva de resistencia relativa (f'c(T)/f'c) y módulo de elasticidad relativo (Ec(T)/Ec) vs. temperatura [°C].

#### Lo que muestra la figura:
- El módulo de elasticidad comienza a disminuir desde los **200°C**.
- La resistencia f'c se mantiene relativamente estable hasta los **400°C**.
- Entre 400°C y 600°C hay una caída pronunciada de resistencia.
- A **600°C** la resistencia es el **60%** del valor a temperatura ambiente.
- Por encima de 600°C la degradación continúa aceleradamente.

#### Conclusión quirúrgica:
> La diferencia en el comportamiento de Ec y f'c con la temperatura tiene implicancias prácticas: un elemento expuesto a temperaturas moderadas (incendio inicial) puede conservar resistencia pero haberse vuelto más flexible (mayor Ec reducido → mayores deformaciones bajo carga). El umbral de 400°C es crítico para el diseño contra incendio: el recubrimiento de hormigón debe ser suficiente para que el acero de refuerzo interior no alcance esa temperatura durante el tiempo de resistencia al fuego exigido. El acero pierde resistencia a temperaturas menores que el hormigón, por lo que el recubrimiento protege al acero, siendo este el elemento más vulnerable.

---

## 📐 TEOREMAS Y SUPUESTOS FUNDAMENTALES

### T-01 | Linealidad inicial del hormigón (hasta 0,5·f'c)
El hormigón se comporta como material elástico lineal para tensiones menores al 50% de su resistencia máxima. Este es el rango de las cargas de servicio en estructuras convencionales bien diseñadas.

### T-02 | Deformación en f'c ≈ 0,002
La deformación unitaria del hormigón cuando alcanza su resistencia máxima es aproximadamente 0,002, prácticamente independiente del valor de f'c. Esto es un resultado experimental universal para hormigones de peso normal.

### T-03 | Deformación última de diseño (ACI) = 0,003
El ACI adopta 0,003 como la deformación máxima en la fibra extrema de compresión para el diseño de secciones. Este valor está en la zona post-pico de la curva real, constituyendo un margen de seguridad adicional.

### T-04 | Resistencia a tracción ≈ 10% de f'c → se desprecia en diseño a flexión
La resistencia a tracción es tan pequeña comparada con la de compresión que en el cálculo de la resistencia a flexión de vigas se asume que el hormigón traccionado no contribuye. El acero absorbe toda la tracción.

---

---

## 📈 GRÁFICAS — PDF 2: ACERO

---

### G-09 | Curva tensión-deformación monotónica del acero

**Fuente:** PDF 2, diapositivas 15-18  
**Ejes:** Eje X = deformación unitaria ε [adim.] / Eje Y = tensión σ [MPa]

#### Zonas de la curva (de izquierda a derecha):

| Zona | Nombre | Rango ε | Comportamiento |
|---|---|---|---|
| 1 | Elástico lineal | 0 → εy | Línea recta con pendiente Es = 210.000 MPa |
| 2 | Plateau de fluencia | εy → εsh | Tensión constante = fy, deformación crece sin aumento de carga |
| 3 | Endurecimiento | εsh → εu | Tensión crece de nuevo, pendiente Esh = 7.000 MPa |
| 4 | Fractura | post-εu | Estricción local y fractura |

**Puntos clave:**
- εy (A630) = 0,002 → inicio de fluencia
- εsh ≈ 0,010–0,015 → inicio de endurecimiento  
- εu = 4,5%–12% → elongación máxima en fractura

#### Conclusión quirúrgica:
> La forma de la curva del acero es fundamentalmente diferente a la del hormigón: en lugar de un pico suave seguido de descenso, el acero tiene un punto de quiebre abrupto (el límite de fluencia fy) seguido de una zona horizontal (el plateau). Esta zona horizontal es la característica más importante para el diseño estructural: permite que el acero se deforme extensamente bajo tensión constante fy, distribuyendo energía y dando señal visual de sobrecarga antes de la fractura. La simetría tracción/compresión (la curva en compresión es idéntica a la de tracción) simplifica enormemente el diseño: fy es el mismo en ambas direcciones.

---

### G-10 | Efecto del tipo de acero en la curva tensión-deformación

**Fuente:** PDF 2, diapositiva 18  
**Descripción:** Familia de curvas para A440, A630, A700, A730 en los mismos ejes.

#### Lo que muestra la figura:
- Todas las curvas tienen **exactamente la misma pendiente inicial** (Es = 210.000 MPa es universal).
- Las curvas de mayor fy se desplazan verticalmente hacia arriba (mayor resistencia).
- Las curvas de mayor fy tienen un plateau **más corto** o prácticamente inexistente.
- Las curvas de mayor fy alcanzan menor elongación total en fractura.

#### Conclusión quirúrgica:
> La figura demuestra visualmente que la rigidez (pendiente) es independiente de la resistencia: no hay forma de saber qué tipo de acero es con solo mirar el tramo elástico, ya que todos son paralelos. La diferencia solo aparece al llegar al plateau. El acero de alta resistencia "paga" su mayor capacidad con menor ductilidad: su plateau es más corto y falla con menor deformación total. En zonas sísmicas, esta menor ductilidad es una desventaja crítica, razón por la que las normas sísmicas limitan el tipo de acero que se puede usar en elementos dúctiles.

---

### G-11 | Efecto de la velocidad de deformación en el acero

**Fuente:** PDF 2, diapositivas 19-21  
**Descripción:** Curvas a distintas velocidades de deformación (estática, dinámica-sísmica) para el mismo tipo de acero.

#### Lo que muestra la figura:
- A mayor velocidad de deformación, la curva se desplaza hacia arriba en la zona de fluencia.
- El plateau ocurre a tensión mayor que fy estático.
- El efecto es más pronunciado en la tensión de fluencia que en la tensión última.
- El efecto es más pronunciado en aceros de menor resistencia (A440 más afectado que A630).

#### Conclusión quirúrgica:
> Durante un sismo, la velocidad de deformación puede ser 100 a 10.000 veces mayor que en un ensayo estático, lo que eleva fy efectivo un 10-20%. Paradójicamente, esto puede ser perjudicial en diseño por capacidad: si las columnas se dimensionaron para resistir las fuerzas que puede generar el acero con fy nominal, pero durante el sismo el acero genera fuerzas mayores (por fy aumentado), la columna puede verse sobrecargada. Las normativas sísmicas avanzadas introducen el concepto de fy probable para evitar este problema.

---

### G-12 | Curvas idealizadas del acero — Comparación

**Fuente:** PDF 2, diapositiva 22  
**Descripción:** Curva real del acero vs. modelo EPP vs. modelo bilineal con endurecimiento.

#### Lo que muestra la figura:
- La curva real tiene las 4 zonas descritas.
- El modelo EPP simplifica: línea recta hasta fy, luego horizontal infinita.
- El modelo bilineal añade una segunda línea con pendiente Esh = 7.000 MPa.
- Ambos modelos pasan por el punto (εy, fy) y coinciden en el tramo elástico.

#### Conclusión quirúrgica:
> El modelo EPP es una simplificación conservadora: al ignorar el endurecimiento, subestima la resistencia real del acero a grandes deformaciones. Esto tiene dos efectos: (1) el diseño de resistencia con EPP es levemente conservador (la estructura real es un poco más resistente que lo calculado), y (2) al calcular la demanda sobre elementos adyacentes usando capacidad del acero, EPP subestima esa demanda, lo que puede ser no conservador. Por esta razón, para el diseño por capacidad se usa fy probable o fu, no fy del EPP.

---

### G-13 | Lazos cíclicos del acero (comportamiento histérico)

**Fuente:** PDF 2, diapositivas 23, 26  
**Descripción:** Múltiples ciclos de carga-descarga-recarga alternada en tracción y compresión.

#### Lo que muestra la figura:
- Los lazos del acero son **mucho más "llenos" y simétricos** que los del hormigón.
- El área encerrada por cada lazo es grande → alta disipación de energía por ciclo.
- Los lazos se mantienen estables en los primeros ciclos (no hay degradación de resistencia).
- Con muchos ciclos de gran amplitud, aparece degradación por fatiga de bajo ciclaje.
- El efecto Bauschinger se observa: al recargar en dirección opuesta, la fluencia ocurre a tensión menor que fy.

#### Conclusión quirúrgica:
> Los lazos cíclicos "llenos" del acero son la razón por la que el acero de refuerzo es tan valioso en diseño sísmico: disipa grandes cantidades de energía sísmica por ciclo, reduciendo las fuerzas que llegan al resto de la estructura. Esta capacidad de disipación histérica es el fundamento del diseño sísmico por ductilidad: se acepta que la estructura se dañe (el acero fluye), pero ese daño disipa energía y protege al sistema del colapso. El efecto Bauschinger reduce ligeramente la eficiencia de disipación en ciclos alternados, pero el comportamiento sigue siendo muy superior al del hormigón no confinado.

---

## 📐 TEOREMAS Y SUPUESTOS (actualizados — PDF 2)

### T-05 | Es = 210.000 MPa es universal para todo acero de refuerzo
El módulo de elasticidad del acero de refuerzo es idéntico para todos los tipos (A440, A630, A700, A730). Solo varía fy. Este es uno de los datos más importantes del ramo: siempre usar Es = 210.000 MPa.

### T-06 | El acero se modela como Elástico Perfectamente Plástico (EPP) en diseño ACI
Todas las fórmulas del ACI 318 asumen implícitamente el modelo EPP: el acero trabaja a tensión constante fy una vez que alcanza la fluencia. No se cuenta el endurecimiento por deformación.

### T-07 | La curva del acero es simétrica en tracción y compresión
El acero de refuerzo tiene el mismo comportamiento bajo tracción y compresión (mismo fy, mismo Es). Esto simplifica el diseño de doble armadura y el análisis de columnas.

### T-08 | La falla debe ser "dúctil": el acero fluye antes de que aplaste el hormigón
Principio fundamental del diseño de vigas en hormigón armado. Se diseña para que εs ≥ εy antes de que el hormigón alcance εu = 0,003. Esto garantiza que el elemento avise visualmente antes del colapso.

---

---

## 📋 NORMAS — PDF 3: CRITERIOS Y NORMAS (actualización completa)

| Norma | Tipo | Contenido | Uso en el ramo |
|---|---|---|---|
| **NCh430:2008** | Diseño | Hormigón armado — requisitos de diseño y cálculo | **Norma principal del ramo** |
| **NCh3171:2017** | Cargas | Combinaciones de carga (ASD y LRFD) | Calcular Mu, Vu, Nu |
| NCh1537:2009 | Cargas | Cargas permanentes y de uso | Determinar D y L |
| NCh431:2010 | Cargas | Nieve | Sur y cordillera |
| NCh432:2025 | Cargas | Viento | Presión básica viento |
| NCh433:1996 Mod 2009 | Sísmica | Diseño sísmico edificios | Carga E |
| NCh2369:2023 | Sísmica | Estructuras industriales | — |
| ACI 318 | Internacional | Hormigón armado — EE.UU. | Referencia base del ramo |
| ASCE 7/SEI | Internacional | Cargas mínimas de diseño | Referencia cuando no hay NCh |

---

## 📊 GRÁFICAS — PDF 3: CRITERIOS Y NORMAS

---

### G-14 | Distribuciones de probabilidad de resistencia y demanda

**Fuente:** PDF 3, diapositivas 5-6  
**Descripción:** Dos curvas de distribución normal (campanas de Gauss) que se solapan parcialmente: una representa la distribución de la resistencia R, otra la distribución de la demanda S.

#### Lo que muestra la figura:
- El eje X representa el valor de la carga o resistencia.
- La curva de resistencia R está desplazada hacia la derecha (mayor valor medio).
- La curva de demanda S está a la izquierda (menor valor medio).
- Existe una zona de solapamiento entre ambas distribuciones.
- Esta zona de solapamiento representa la **probabilidad de falla**: los casos en que S > R.

#### Conclusión quirúrgica:
> Esta figura es la justificación estadística de todos los factores de seguridad. La probabilidad de falla es el área del solapamiento entre las curvas: se puede reducir aumentando la separación entre las medias (más resistencia o menos carga) o reduciendo el ancho de las campanas (menos variabilidad). El método LRFD calibra sus factores αi y φ para que la probabilidad de falla sea uniformemente del orden de 1 en 100.000 a 1 en 1.000.000 para todos los tipos de elemento y carga. El ASD con un único FS logra esto solo para condiciones específicas y puede ser más o menos conservador en otras situaciones.

---

### G-15 | Diagrama de áreas tributarias

**Fuente:** PDF 3, diapositivas 43-45  
**Descripción:** Planta de una losa con la cuadrícula de vigas y columnas. Se muestran líneas de influencia trazadas a 45° desde las esquinas de los paños.

#### Lo que muestra la figura:
- Cada viga tiene un área tributaria delimitada por líneas perpendiculares al eje de la viga, trazadas a distancias l₂/2.
- Las esquinas se definen con líneas a 45°: los paños cuadrados generan triángulos y trapecios simétricos.
- El área sombreada de cada viga o columna es su área tributaria.
- La columna recibe carga de los 4 paños que concurren en ella (cuadrado centrado en la columna).

#### Conclusión quirúrgica:
> El trazado de áreas tributarias a 45° es válido para losas bidireccionales (donde la carga se distribuye en ambas direcciones). Para losas unidireccionales (relación l₁/l₂ > 2) toda la carga va a las vigas de la dirección corta y las áreas tributarias son rectangulares. La correcta determinación del área tributaria es el primer paso para calcular las cargas que llegan a cada elemento: un error en el área tributaria se propaga a todas las cargas y al diseño completo del elemento.

---

## 📐 TEOREMAS Y SUPUESTOS (actualizados — PDF 3)

### T-09 | Ecuación fundamental del LRFD: Σαi·Si ≤ φ·Rn
La condición de diseño del LRFD en su expresión más general. Las cargas amplificadas deben ser menores que la resistencia reducida. Esta desigualdad debe verificarse para todos los tipos de solicitación (M, V, N) y para todas las combinaciones de carga.

### T-10 | Combinación crítica para vigas de hormigón armado convencionales
Para el diseño de vigas bajo cargas gravitacionales (D y L), la combinación crítica del LRFD es habitualmente: **Wu = 1,2D + 1,6L**. Esta genera el Mu máximo que debe ser resistido por φ·Mn.

### T-11 | Factor φ = 0,90 para flexión (sección controlada por tracción)
El factor de reducción de resistencia para flexión pura cuando la deformación del acero de tracción εt ≥ 0,005. Este es el valor que se aplica en el diseño habitual de vigas simplemente armadas. Si εt < 0,005 (zona de transición), φ se reduce linealmente hasta 0,65.

### T-12 | Las normas INN son voluntarias hasta ser citadas en reglamentación
El carácter obligatorio de las normas chilenas proviene de su citación en decretos o leyes, no de la norma misma. Sin decreto de oficialización, una norma INN es referencia técnica de buena práctica pero no legalmente exigible.

---

---

## 📈 FIGURAS Y GRÁFICAS — PDF 4: VIGAS EN FLEXIÓN ⭐

---

### G-16 | Diagrama de deformaciones y tensiones — Evolución con el momento

**Fuente:** PDF 4, diapositivas 2-3  
**Descripción:** Tres columnas: sección transversal / diagrama de deformaciones (lineal) / diagrama de tensiones (varía). Tres filas: momento pequeño / momento mediano / momento último.

#### Descripción de la figura fila por fila:

**Fila 1 — Momento pequeño:**
- Deformaciones: línea recta pequeña, eje neutro centrado.
- Tensiones: distribución **triangular** en ambas caras (compresión arriba, tracción abajo). Ambas zonas activas.
- La pendiente de la distribución de tensiones = Ec.

**Fila 2 — Momento mediano:**
- Deformaciones: línea recta más inclinada, eje neutro sube levemente.
- Tensiones en compresión: curva (ya no triangular — hormigón en rango no lineal).
- Tensiones en tracción: zona fisurada, el hormigón ya no trabaja a tracción.

**Fila 3 — Momento último (εcu = 0,003):**
- Deformaciones: εcu = 0,003 arriba, εs ≥ εy abajo.
- Tensiones en compresión: paraboloide con máximo ≈ K₃·f'c.
- Bloque de Whitney equivalente mostrado superpuesto: rectángulo de 0,85f'c y altura a.

#### Conclusión quirúrgica:
> Esta secuencia de figuras es la explicación visual de por qué el Bloque de Whitney es necesario y correcto. En el estado último (fila 3), la distribución de tensiones no es la triangular del estado elástico: es una parábola compleja. El bloque rectangular equivalente (mismo color, misma resultante, mismo brazo de palanca) permite calcular Mn con una simple ecuación de equilibrio en lugar de integrar la función parabólica. La clave es que el bloque de Whitney es una **equivalencia de resultante y momento**, no una descripción exacta de la distribución real de tensiones.

---

### G-17 | Sección transversal — Vigas simplemente armadas (diagrama completo)

**Fuente:** PDF 4, diapositivas 9, 11  
**Descripción:** Vista de la sección rectangular con todos sus componentes identificados.

#### Descripción detallada de la figura:

```
← b →
 _____
|     | ← εcu = 0,003 (fibra extrema de compresión)
|=====| ← bloque Whitney: tensión = 0,85f'c, altura a
|     | ← a = β·c (profundidad del bloque)
|─────| ← límite bloque (NO es el eje neutro)
|     | ← zona entre bloque y eje neutro (comprimida, pero ignorada en Whitney)
|─────| ← eje neutro real (a profundidad c)
|     |
|     | ← zona FISURADA (hormigón ignorado en tracción)
|     |
|■■■■■| ← As (acero de tracción) — centroide a profundidad d
|_____| ← fibra extrema de tracción
```

**Fuerzas internas:**
- C = 0,85·f'c·a·b (actúa en el centro del bloque, a a/2 desde arriba)
- T = As·fy (actúa en el centroide del acero, a d desde arriba)
- Brazo de palanca = d − a/2

#### Conclusión quirúrgica:
> Esta figura sintetiza todo el modelo de diseño del ACI en una imagen. Cada elemento tiene un significado físico preciso: el bloque rectangular es la fuerza de compresión del hormigón simplificada; el acero puntual es la fuerza de tracción concentrada en el centroide de las barras; el brazo de palanca (d−a/2) es el momento interno por unidad de fuerza. La condición C = T (equilibrio de fuerzas horizontales) determina la profundidad del eje neutro. El momento de ese par de fuerzas iguales y opuestas es Mn = C·(d−a/2) = T·(d−a/2). Todo el diseño de vigas se reduce a este par de fuerzas.

---

### G-18 | Diagrama de deformaciones — Tipos de falla

**Fuente:** PDF 4, diapositivas 10-16  
**Descripción:** Tres diagramas de deformaciones lineales para falla dúctil, balanceada y frágil.

#### Descripción:
Los tres casos tienen la misma escala vertical (la altura d de la sección) y se diferencian por la posición del eje neutro (c):

**Falla dúctil (c < cb):**
```
εcu = 0,003 (arriba)
      /
     /  c (pequeño)
    X── eje neutro
     \
      \  d−c (grande)
       \
εs >> εy (abajo) — grande, acero fluyó
```

**Falla balanceada (c = cb):**
```
εcu = 0,003 (arriba)
      /
     /  cb
    X── eje neutro balanceado
     \
      \
εs = εy (abajo) — justo en el límite
```

**Falla frágil (c > cb):**
```
εcu = 0,003 (arriba)
      /
     /  c (grande)
    X── eje neutro profundo
     \
      \ d−c (pequeño)
εs < εy (abajo) — pequeño, acero NO fluyó
```

#### Conclusión quirúrgica:
> La posición del eje neutro (c) es el indicador directo del tipo de falla. Un eje neutro **alto** (c pequeño) significa que la zona comprimida es pequeña, por lo que para equilibrar C = T necesitamos menos acero o el acero disponible produce una deformación grande en la tracción → falla dúctil. Un eje neutro **bajo** (c grande) significa zona comprimida grande, el acero de tracción está más cerca del eje neutro → su deformación es pequeña → puede no haber fluido → falla frágil. La cuantía máxima es una limitación sobre c: no permitir que c supere un umbral que garantice εs ≥ 0,004.

---

### G-19 | Diagrama Mn vs. ρ (cuantía) — Rendimientos decrecientes

**Fuente:** PDF 4, diapositiva 19  
**Descripción:** Curva de Mn (eje Y) en función de ρ (eje X). Tiene pendiente positiva pero decreciente.

#### Lo que muestra la figura:
- Para ρ pequeño: Mn crece casi linealmente con ρ (el brazo de palanca apenas varía).
- Para ρ moderado: Mn sigue creciendo pero más lentamente (el brazo de palanca empieza a disminuir).
- Más allá de ρb: Mn prácticamente no crece (zona frágil — el brazo de palanca cae rápido y el acero ya no fluye).
- Dos zonas claramente identificadas: **zona dúctil** (izquierda de ρb) y **zona frágil** (derecha de ρb).
- Las cuantías ρmín y ρmáx están marcadas como límites del rango de diseño válido.

#### Conclusión quirúrgica:
> La curvatura de la curva Mn-ρ tiene implicancias prácticas y económicas directas. En la zona de bajas cuantías (ρ < ρb/2), agregar un poco más de acero da un gran aumento de Mn → es eficiente. En la zona de cuantías altas (ρ cercano a ρb), agregar acero da poca ganancia en Mn y encima se acerca al modo de falla frágil → es ineficiente y peligroso. Por esta razón, en la práctica se trabaja típicamente con cuantías entre ρmín y 0,5·ρb, que es el rango de mejor relación Mn/As (mejor eficiencia estructural y económica con seguridad garantizada).

---

### G-20 | Efectos de la armadura de compresión — Comparación

**Fuente:** PDF 4, diapositivas 34-41  
**Descripción:** Cuatro sub-figuras comparando sección sin A's vs. con A's en: posición del eje neutro, deformación del acero, deflexiones diferidas y ductilidad.

#### Lo que muestra la figura:

**Sub-figura 1 — Posición del eje neutro:**
- Sin A's: c en posición c₀.
- Con A's: eje neutro sube → c < c₀.
- Mayor εs en el acero de tracción → el elemento se vuelve más dúctil.

**Sub-figura 2 — Resistencia a momento:**
- Aumento máximo ≤ 15%.
- La ganancia es marginal: A's no es eficiente para aumentar Mn.

**Sub-figura 3 — Deflexión diferida por fluencia:**
- Sin A's: el hormigón comprimido fluye libremente → gran deflexión diferida.
- Con A's: el acero A's restringe el acortamiento del hormigón → hasta 50% menos de deflexión diferida.

**Sub-figura 4 — Ductilidad:**
- Sin A's: la sección falla con deformación εs = εs0.
- Con A's: la sección puede deformarse hasta εs > εs0 (hasta 40% más dúctil para ρ' = ρ).

#### Conclusión quirúrgica:
> Este conjunto de figuras justifica cuándo y por qué poner armadura de compresión. La respuesta es clara: NO se pone A's para ganar resistencia (solo da ≤15% más de Mn — demasiado poco para justificar el costo). SE pone A's por: (1) reducir deflexiones a largo plazo cuando la fluencia es una preocupación (elementos de gran luz), (2) aumentar ductilidad cuando la cuantía de tracción es alta y se quiere mejorar el comportamiento sísmico, y (3) porque es estructuralmente necesario para cambiar el modo de falla de frágil a dúctil cuando ρ > ρmáx.

---

### G-21 | Sección T — Figura completa con nomenclatura

**Fuente:** PDF 4, diapositivas 52-55  
**Descripción:** Vista de la sección en T con el eje neutro dentro del ala y con el eje neutro en el alma.

#### Caso 1 — Eje neutro dentro del ala (a ≤ hf):
```
←————— b ——————→
 _______________________________
|///////|////bloque///|/////////|  ← losa (hf)
|_______|_____________|_________|
         |           |
         |    bw     |  ← alma
         |___________|
             As ■■■

Si a ≤ hf: TODA la compresión está en el ala → analizar como viga rectangular de ancho b
```

#### Caso 2 — Eje neutro en el alma (a > hf):
```
←————————— b ——————————→
 ___________________________________
|===================================|  ← bloque en ala completa (hf)
|___________________________________|
         |=================|          ← bloque en alma (a − hf)
         |    bw           |
         |_________________|
              As ■■■

Se divide en: ala (b − bw) × hf  +  alma bw × a
```

#### Conclusión quirúrgica:
> La sección T es la geometría de viga más eficiente porque concentra el hormigón de compresión en el ala ancha, lejos del acero de tracción → brazo de palanca máximo. El bloque de Whitney en la sección T puede quedar completamente dentro del ala (caso más común en diseño correcto) o penetrar en el alma. Si a ≤ hf, la sección se comporta exactamente como una viga rectangular de ancho b: este es el resultado más importante — en la mayoría de los casos prácticos de vigas T bien diseñadas, el eje neutro queda en el ala y el cálculo es idéntico a una viga rectangular.

---

## 📐 TEOREMAS Y SUPUESTOS (actualizados — PDF 4) ⭐

### T-13 | Los 5 supuestos fundamentales del diseño a flexión
1. Secciones planas permanecen planas (Bernoulli) → distribución lineal de deformaciones.
2. Acero = modelo EPP → fs = fy si εs ≥ εy.
3. Hormigón traccionado no contribuye → solo As resiste tracción.
4. Distribución de compresión del hormigón → Bloque de Whitney (0,85f'c, altura a = β·c).
5. Adherencia perfecta acero-hormigón → compatibilidad de deformaciones.

### T-14 | Equilibrio de fuerzas internas: C = T
En el estado último, la resultante de compresión (C = 0,85·f'c·a·b) es igual a la resultante de tracción (T = As·fy). Esta ecuación determina la profundidad del bloque "a". **Esta es la ecuación más importante del ramo.**

### T-15 | Momento nominal: Mn = C·(d − a/2) = T·(d − a/2)
El momento resistente es el par de fuerzas internas multiplicado por el brazo de palanca (d − a/2). Esta fórmula es directa una vez determinado "a" con el equilibrio.

### T-16 | La falla dúctil siempre que εs > εy cuando εcu = 0,003
El modo de falla deseado se garantiza diseñando con ρ ≤ ρmáx (que asegura que c ≤ cmáx y por tanto εs ≥ 0,004 o 0,005 según el criterio adoptado).

### T-17 | c se obtiene de a por la relación c = a/β
El eje neutro real (c) y el límite del bloque de Whitney (a) son distintos: c = a/β. Siempre c ≥ a (ya que β ≤ 1). Las deformaciones por similitud de triángulos se calculan con c (el eje neutro real), no con a.

### T-18 | Armadura de compresión: no para resistencia, sí para ductilidad y fluencia
La armadura de compresión A's da ≤15% de Mn adicional. Su rol principal es: reducir deflexiones diferidas (hasta 50%) y aumentar ductilidad (hasta 40%). Siempre verificar si A's fluye.

### T-19 | En vigas T, si a ≤ hf → analizar como viga rectangular de ancho b
Este es el caso más frecuente. Siempre verificar primero si a ≤ hf asumiendo eje neutro en el ala.

---

*Última actualización: PDF 4 — Vigas en Flexión*
