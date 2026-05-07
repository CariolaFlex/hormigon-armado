# 03 — Criterios de Diseño y Normas
**Fuente:** Criterios de diseño y normas V2.pdf (70 diapositivas)  
**Profesor:** Ing. Miguel Colque González | **Fecha:** Abril 2024

---

## 📌 Objetivos del Tema

- Comprender los criterios de diseño estructural (ASD y LRFD).
- Conocer el marco normativo chileno vigente.
- Entender la jerarquía de fuentes normativas y cómo usarlas.
- Familiarizarse con las normas de cargas aplicables al diseño de hormigón armado.

---

## 1. Introducción — Factor de Seguridad

### 1.1 Concepto fundamental

El **factor de seguridad (FS)** es la relación entre la **capacidad** del elemento (resistencia) y la **demanda** que se le impone (solicitación):

$$FS = \frac{\text{Capacidad (Resistencia)}}{\text{Demanda (Solicitación)}}$$

**Ejemplo concreto:**
- Resistencia del cable: 5 tf
- Demanda del cable: 3 tf
- FS = 5/3 = **1,7**

> Interpretación: el cable resiste 1,7 veces más de lo que se le exige. Existe un margen del 70% antes de la falla.

### 1.2 El problema probabilístico

Tanto la resistencia como la demanda son **variables aleatorias**: sus valores no se pueden fijar con precisión total, sino que se describen mediante funciones de distribución de probabilidad.

- La **resistencia** varía porque: el hormigón no tiene exactamente la misma resistencia en toda la estructura, las dimensiones reales difieren de las nominales, el acero tiene tolerancias de fabricación.
- La **demanda** varía porque: las cargas reales (personas, viento, sismo) son impredecibles en su magnitud exacta.

La función de densidad de probabilidad de cada variable describe qué tan probable es cada valor posible dentro de un rango. La zona de solapamiento entre las distribuciones de resistencia y demanda representa la probabilidad de falla.

#### 📊 Conclusión del concepto probabilístico:

> El factor de seguridad no es un número arbitrario: es una forma de garantizar que la zona de solapamiento entre las distribuciones de resistencia y demanda sea suficientemente pequeña (probabilidad de falla aceptablemente baja). A mayor incertidumbre en la resistencia o en la demanda, mayor debe ser el FS. Esto justifica por qué el hormigón (material muy variable) tiene un FS mayor que el acero (material muy controlado) en el método ASD.

---

## 2. Criterios de Diseño

### 2.1 Diseño por Tensiones Admisibles (ASD — Allowable Stress Design)

**Principio:**
> Las tensiones bajo cargas de trabajo (cargas de servicio normales) NO deben superar tensiones admisibles que garanticen que la estructura permanezca en el rango **elástico**.

**Ecuación de diseño:**

$$S^* \leq \frac{R^*}{FS}$$

Donde:
- S* = Solicitación (tensión calculada bajo cargas de servicio)
- R* = Resistencia del material
- FS = Factor de seguridad

**Factores de seguridad típicos en ASD:**

| Material | FS |
|---|---|
| Acero | **1,8** |
| Hormigón | **3** |

> ⚠️ El FS del hormigón es mayor que el del acero porque el hormigón es más variable e impredecible (mayor incertidumbre en su resistencia real).

**Hipótesis base del ASD:**
- Las tensiones son proporcionales a las deformaciones (Ley de Hooke — comportamiento elástico lineal).
- Las tensiones de servicio en acero y hormigón no sobrepasan las tensiones admisibles (fracción de la resistencia última).

#### 📊 Conclusión del método ASD:

> El ASD es simple de aplicar porque todo se hace en el mismo dominio de las cargas de servicio: se calculan tensiones elásticas y se comparan con valores admisibles. Sin embargo, tiene limitaciones importantes: (1) no puede predecir correctamente la resistencia última de una sección de hormigón armado porque el hormigón no es lineal cerca de la falla; (2) la asignación de un único FS no refleja bien la diferente incertidumbre de las distintas cargas (la carga permanente es mucho más predecible que el viento o el sismo); (3) no permite estimar la ductilidad de la estructura. Por estas razones, el ASD fue progresivamente reemplazado por el LRFD en el diseño moderno de hormigón armado.

---

### 2.2 Diseño por Factores de Carga y Resistencia (LRFD — Load and Resistance Factor Design)

También conocido como **Diseño por Resistencia Última** o **Diseño por Capacidad**.

**Principio:**
> El diseño se hace en términos de **resistencia última**: la sección alcanza su capacidad máxima (hormigón en su resistencia máxima f'c, acero en su tensión de fluencia fy) bajo **cargas amplificadas**.

**Ecuación de diseño:**

$$S_u = \sum \alpha_i S_i \leq R_u = \varphi \cdot R_n$$

Donde:
| Símbolo | Nombre | Descripción |
|---|---|---|
| Su | Solicitación última | Carga de servicio amplificada por factores αi |
| αi | Factor de amplificación de carga | Amplifica cada tipo de carga según su incertidumbre |
| Si | Efecto de cada carga individual | Momento, corte, axial producido por cada carga |
| Ru | Resistencia última | Resistencia nominal reducida por φ |
| φ | Factor de reducción de resistencia | Reduce Rn según el tipo de falla e incertidumbre |
| Rn | Resistencia nominal | Resistencia calculada con las fórmulas del código |

#### La lógica de los dos conjuntos de factores:

**Factores de amplificación de carga (αi):** amplifican las cargas porque estas tienen incertidumbre. Las cargas más impredecibles tienen factores mayores:
- Carga muerta (permanente): α ≈ 1,2 (muy predecible, factor menor)
- Carga viva (uso): α ≈ 1,6 (menos predecible, factor mayor)
- Cargas accidentales (sismo, viento): factores específicos según normativa

**Factor de reducción de resistencia (φ):** reduce la resistencia nominal porque también hay incertidumbre en la resistencia real. Los tipos de falla más frágiles o peligrosos tienen φ menor:
- Flexión (falla dúctil, predecible): φ = 0,90
- Corte (falla menos predecible): φ = 0,75
- Compresión axial: φ = 0,65 – 0,75

#### ¿Por qué el LRFD es superior al ASD?

El profesor enumera 4 razones:

1. **La teoría elástica no puede predecir la resistencia última del hormigón armado.** El hormigón no es lineal cerca de la falla: las fórmulas elásticas subestiman o sobreestiman la capacidad real.

2. **Los factores de amplificación se asignan de manera más racional.** Cada tipo de carga tiene su propio factor según su nivel de incertidumbre. El ASD aplica un único FS indiscriminadamente.

3. **La curva tensión-deformación del hormigón es no lineal.** El diseño LRFD incorpora este comportamiento real (bloque de Whitney, deformación última 0,003) que el ASD ignora.

4. **El LRFD permite estimar la ductilidad en el rango postelástico.** Al diseñar para la resistencia última, se puede controlar el modo de falla y garantizar que sea dúctil.

#### 📊 Conclusión del método LRFD:

> El LRFD es el método moderno y el que usa el ACI 318. Su ventaja fundamental es la consistencia probabilística: los factores αi y φ están calibrados para que la probabilidad de falla sea uniformemente pequeña para todas las combinaciones de carga y tipo de resistencia. El ASD puede ser más o menos conservador dependiendo de la combinación de cargas, lo que genera inconsistencias. Además, el LRFD al trabajar con la resistencia última incorpora naturalmente el comportamiento no lineal del hormigón (bloque de Whitney) que es la base del diseño de vigas. Es fundamental entender que en LRFD todo se calcula con cargas **amplificadas** (Mu, Vu, Nu) y se compara con resistencias **reducidas** (φMn, φVn, φNn).

---

## 3. Marco Normativo — Jerarquía de Fuentes

### 3.1 Conceptos clave

| Concepto | Definición |
|---|---|
| **Estado del arte** | Lo publicado, difundido y validado por la comunidad científica — el conocimiento más avanzado disponible |
| **Estado de la práctica** | Lo que se usa efectivamente del estado del arte en la práctica de ingeniería — subconjunto validado y aplicado |
| **Normas y códigos** | Publicaciones de organismos reguladores con las reglas básicas de diseño — de cumplimiento obligatorio cuando son citadas en reglamentación |
| **Guías** | Explicaciones adicionales que recomiendan cómo usar los códigos — no son obligatorias per se |
| **Normas oficiales** | Normas reconocidas por MINVU o MOP — de cumplimiento obligatorio en sus ámbitos de competencia |

### 3.2 Carácter voluntario vs. obligatorio de las normas chilenas

> Todas las normas chilenas INN son de carácter **voluntario** en origen. Se transforman en **obligatorias** cuando son citadas en alguna reglamentación (resolución, decreto o ley), ya sea de forma particular (ej. "Cúmplase con NCh433") o general (ej. "Cúmplase con las normas chilenas sobre elementos de seguridad").

**Fuentes para consulta:**
- Normas técnicas obligatorias: http://normastecnicas.minvu.cl
- Normas vigentes: https://ecommerce.inn.cl
- Leyes y decretos: https://www.leychile.cl

### 3.3 Jerarquía de referencias cuando no existe norma nacional

En orden de prioridad (de mayor a menor confiabilidad):

1. **Códigos estadounidenses** (ACI, AISC, ASCE, ASTM) — referencia principal
2. **Códigos europeos** (Eurocódigos EC2, EC3, etc.)
3. **Códigos de otros países** con sistemas similares
4. **Documentos de institutos de investigación** (ICH, ICHA, ACHISINA, AICE, etc.)
5. **Libros especializados** de autores reconocidos
6. **Artículos en revistas científicas especializadas** (con revisión de pares)
7. **Experiencia personal** del proyectista — válida pero debe documentarse
8. **Artículos de congresos** — con mucho cuidado (menor nivel de revisión)
9. ❌ **JAMÁS** usar información de procedencia o veracidad dudosa

> ⚠️ **OJO: Correspondencia entre códigos.** Si se usa una norma extranjera, deben usarse TODOS los factores de ese mismo código de manera consistente. No se pueden mezclar cargas de NCh con resistencias de ACI sin verificar compatibilidad.

---

## 4. Normativa Nacional Vigente en Chile

### 4.1 Normas de Cargas

#### NCh1537.Of2009 — Cargas permanentes y cargas de uso

**Conceptos clave:**

**Área tributaria:**
> Área de planta total que, multiplicada por la carga uniformemente distribuida correspondiente, define la carga que actúa sobre el elemento. Se determina trazando perpendiculares entre ejes de vanos a distancias l₂/2.

**Área de influencia:**
> Área total del elemento desde la cual recibe cargas. Para una viga interior, el área de influencia es aproximadamente el doble del área tributaria.

**Reducción de sobrecargas de uso (elementos con gran área tributaria):**

Cuando el área de influencia es grande, la probabilidad de que toda el área esté al máximo cargada disminuye. La norma permite reducir la sobrecarga bajo las siguientes condiciones:

Condiciones para aplicar reducción:
- Área de influencia > **36 m²**
- Sobrecarga de uso < **500 kgf/m²**
- No debe ser carga de estacionamiento
- No debe ser carga de lugares públicos (teatros, estadios, etc.)

**Fórmula de reducción:**

$$L = L_0 \left( 0{,}25 + \frac{4{,}57}{\sqrt{K_{LL} \cdot A_T}} \right)$$

Donde:
| Símbolo | Descripción |
|---|---|
| L | Sobrecarga de uso **reducida** [kgf/m²] |
| L₀ | Sobrecarga de uso nominal (sin reducir) [kgf/m²] |
| KLL | Factor de reducción según tipo de elemento (ver tabla norma) |
| AT | Área tributaria [m²] |

**Límites de reducción:**
- L no debe ser menor que **0,5·L₀** para estructuras de un piso
- L no debe ser menor que **0,4·L₀** para estructuras de más de un piso

#### 📊 Conclusión sobre reducción de sobrecargas:

> La reducción de sobrecargas es un concepto probabilístico: es estadísticamente muy improbable que toda el área tributaria de una columna o viga que recibe cargas de muchos pisos esté simultáneamente al máximo de carga. La norma formaliza este razonamiento permitiendo reducir la sobrecarga de diseño, lo que puede llevar a importantes ahorros de material. Sin embargo, hay restricciones importantes: no se aplica a estacionamientos (donde los vehículos sí pueden ocupar todo el espacio) ni a lugares públicos (donde el hacinamiento es posible).

---

#### NCh432.Of2025 — Cargas de viento

**Conceptos fundamentales:**
- La acción del viento es **perpendicular** a la superficie sobre la cual actúa.
- Puede ser **presión** (signo positivo, hacia adentro) o **succión** (signo negativo, hacia afuera).
- La presión básica del viento depende de:
  - **Altura** de la construcción sobre el nivel de terreno (a mayor altura, mayor velocidad y presión del viento)
  - **Ubicación** geográfica (zonas de mayor velocidad básica de viento)
- El método de cálculo varía según si la superficie es plana o curva, abierta o cerrada, etc.

> 💡 La norma de viento más reciente es NCh432.**Of2025** — nota que el PDF menciona "Of2025" aunque la fecha del material es 2024, lo que indica que hubo actualización normativa.

---

#### NCh431.Of2010 — Cargas de nieve

- Norma que establece las cargas de nieve de diseño según la zona geográfica de Chile.
- Relevante para regiones del sur y zonas cordilleranas.
- La carga de nieve depende de la altitud, la inclinación de la cubierta y la zona de nieve según mapa normativo.

---

#### NCh433.Of1996 Mod 2009 — Diseño sísmico de edificios

**Características principales:**

**Métodos de análisis reconocidos:**
- **Estático equivalente:** se representa el efecto sísmico como una fuerza horizontal estática proporcional al peso de la estructura. Válido para estructuras regulares y bajas.
- **Análisis modal espectral:** se considera la respuesta dinámica de la estructura incluyendo múltiples modos de vibración. Necesario para estructuras altas, irregulares o de mayor importancia.

**Carácter de la norma:**
- Es una **norma prescriptiva**: establece los procedimientos de análisis que deben seguirse.
- **Proporciona rigidez y resistencia mínima**: los resultados de su aplicación garantizan un nivel mínimo de seguridad sísmica, pero no un nivel de desempeño específico.

> 💡 El DS61-2011 modifica la NCh433 en algunos aspectos relevantes. Ambos deben consultarse en conjunto.

---

### 4.2 Normas de Diseño por Material

#### NCh430:2008 — Hormigón armado — Requisitos de diseño y cálculo ⭐

Esta es la norma chilena principal para el diseño de estructuras de hormigón armado. Define los requisitos mínimos de diseño para edificios y otras estructuras de hormigón armado en Chile. El ramo se basa en esta norma y en el **ACI 318** (que sirve como referencia internacional y base de la NCh430).

| Norma | Material |
|---|---|
| **NCh430:2008** | Hormigón armado |
| NCh427/1-2016 | Estructuras de acero (edificios) |
| NCh427/2 | Acero conformado en frío |
| NCh2123.Of1997 Mod 2003 | Albañilería confinada |
| NCh1928.Of1993 Mod 2009 | Albañilería armada |
| NCh1198-2024 | Madera — construcciones |

---

### 4.3 Norma clave del ramo: NCh3171:2017 — Combinaciones de carga

#### NCh3171.Of2017 — Disposiciones generales y combinaciones de carga

Esta norma define cómo combinar las distintas cargas para el diseño. Es **fundamental** para el método LRFD.

#### Combinaciones para diseño por tensiones admisibles (ASD):

Las combinaciones ASD usan las cargas **sin amplificar** (cargas de servicio):

| Combinación | Cargas |
|---|---|
| 1 | D |
| 2 | D + L |
| 3 | D + Lr (o S o R) |
| 4 | D + 0,75L + 0,75Lr (o S o R) |
| 5 | D + (W o 0,7E) |
| 6 | D + 0,75L + 0,75(W o 0,7E) + 0,75Lr (o S o R) |
| 7 | 0,6D + W |
| 8 | 0,6D + 0,7E |

#### Combinaciones para diseño por capacidad última (LRFD):

Las combinaciones LRFD usan las cargas **amplificadas**:

| Combinación | Expresión |
|---|---|
| **1** | **1,4D** |
| **2** | **1,2D + 1,6L + 0,5(Lr o S o R)** |
| **3** | **1,2D + 1,6(Lr o S o R) + (1,0L o 0,5W)** |
| **4** | **1,2D + 1,0W + 1,0L + 0,5(Lr o S o R)** |
| **5** | **0,9D + 1,0W** |
| **6** | **1,2D + 1,0E + 1,0L + 0,2S** |
| **7** | **0,9D + 1,0E** |

Donde:
| Símbolo | Carga |
|---|---|
| D | Carga muerta (permanente) |
| L | Carga viva (uso) |
| Lr | Carga viva de cubierta |
| S | Carga de nieve |
| R | Carga de lluvia |
| W | Carga de viento |
| E | Carga sísmica |

#### 📊 Conclusión quirúrgica de las combinaciones de carga:

> Las combinaciones de carga LRFD son el resultado de un análisis probabilístico: representan los estados de carga más desfavorables posibles con una probabilidad aceptablemente baja de ser superados. Algunos patrones clave para entender la lógica:
>
> - **Comb. 1 (1,4D):** Solo carga muerta amplificada. Cubre el caso de errores en la estimación de cargas permanentes.
> - **Comb. 2 (1,2D + 1,6L):** La más crítica para edificios de uso general con carga viva alta. El factor 1,6 de L refleja la mayor incertidumbre de la carga viva.
> - **Comb. 5 y 7 (0,9D + W/E):** El factor 0,9 en D es porque en combinaciones con viento o sismo, la carga muerta **ayuda** a la estabilidad (actúa como contrapeso). Reducirla es el caso más desfavorable para la estabilidad contra volcamiento.
> - **Combinaciones sísmicas (6 y 7):** El sismo entra con factor 1,0 porque ya incorpora su propia amplificación probabilística (período de retorno de 475 años según NCh433).
>
> **Para el diseño de vigas de hormigón armado**, la combinación crítica habitualmente es la **Comb. 2: 1,2D + 1,6L**, que genera el momento último Mu que debe ser resistido por φMn.

---

## 5. Publicaciones y Códigos de Referencia Internacional

### 5.1 Principales códigos usados en Chile (cuando no hay norma nacional)

| Código | Organismo | Alcance |
|---|---|---|
| **ACI 318** | American Concrete Institute | Diseño de hormigón armado — **referencia principal del ramo** |
| ASCE 7/SEI | ASCE | Cargas mínimas de diseño |
| ANSI/AISC 360 | AISC | Estructuras de acero |
| ANSI/AISC 341 | AISC | Disposiciones sísmicas para acero |
| AASHTO LRFD | AASHTO | Puentes |

### 5.2 Publicaciones especializadas nacionales

- **ICH** (Instituto del Cemento y del Hormigón de Chile): documentos técnicos sobre hormigón.
- **ICHA** (Instituto Chileno del Acero): documentos sobre estructuras de acero.
- **ACHISINA** (Asociación Chilena de Sismología e Ingeniería Antisísmica): guías sísmicas.
- **AICE** (Asociación de Ingenieros Civiles Estructurales): guías de práctica de diseño.

---

## 6. Factores de Reducción de Resistencia φ (ACI 318)

El factor φ reduce la resistencia nominal Rn para obtener la resistencia de diseño Ru = φ·Rn. Sus valores según ACI 318:

| Tipo de solicitación | φ |
|---|---|
| **Flexión** (sección controlada por tracción, εt ≥ 0,005) | **0,90** |
| Flexión (zona de transición, 0,004 ≤ εt < 0,005) | 0,65 a 0,90 (interpolación lineal) |
| **Corte y torsión** | **0,75** |
| **Compresión** (espirales) | **0,75** |
| **Compresión** (estribos) | **0,65** |
| Aplastamiento del hormigón | 0,65 |
| Tracción en anclas de post-instalación | 0,45–0,75 (según tipo) |

> ⚠️ **El factor φ más importante para este ramo es φ = 0,90 para flexión.** Toda la resistencia a flexión de vigas se calcula como: Mn calculado × 0,90 ≥ Mu.

#### 📊 Conclusión sobre factores φ:

> Los factores φ menores que 1,0 reflejan dos tipos de incertidumbre: (1) la variabilidad de los materiales y de la ejecución, y (2) la gravedad de la consecuencia del tipo de falla. La falla por flexión (φ = 0,90) recibe el factor más alto porque es la más predecible (la curva tensión-deformación en flexión es bien conocida) y porque el diseño garantiza falla dúctil (el acero fluye primero, dando aviso). La falla por corte (φ = 0,75) es más peligrosa e impredecible (mecanismo complejo, puede ser abrupto), por eso su factor es menor. La compresión pura (φ = 0,65) recibe el menor factor porque la falla en columnas puede ser catastrófica para toda la estructura.

---

## 7. Resumen del Proceso de Diseño LRFD (ACI 318)

El proceso completo de diseño de un elemento de hormigón armado bajo el método LRFD sigue esta secuencia:

```
1. DEFINIR las cargas de servicio (D, L, W, E, S, etc.)
         ↓
2. AMPLIFICAR con los factores de carga (NCh3171 / ACI):
   Mu, Vu, Nu = combinaciones LRFD → tomar la combinación más desfavorable
         ↓
3. DIMENSIONAR la sección y el refuerzo:
   Se trabaja con la resistencia ÚLTIMA (bloque de Whitney, modelo EPP acero)
   Garantizar: φ·Rn ≥ Solicitación última
         ↓
4. VERIFICAR requisitos mínimos y de ductilidad:
   Cuantías mínima y máxima, separación de barras, recubrimientos
         ↓
5. VERIFICAR estados de servicio (si aplica):
   Deflexiones, fisuración, vibración — se calculan con cargas SIN amplificar
```

---

## 8. Relación entre Normas del Ramo

```
NCh3171:2017  →  Combinaciones de carga (Mu, Vu, Nu)
     ↓
NCh430:2008   →  Requisitos de diseño de hormigón armado (basada en ACI 318)
     ↑
ACI 318       →  Referencia internacional principal
     ↑
NCh170:2016   →  Propiedades del hormigón (f'c = GXX)
NCh204:2020   →  Propiedades del acero (A440, A630...)
```

---

## 9. Normas de Cargas — Tabla Resumen

| Norma | Tipo de carga | Observación |
|---|---|---|
| **NCh1537.Of2009** | Permanentes y uso (D, L) | Incluye reducción de sobrecargas |
| **NCh431.Of2010** | Nieve (S) | Zonas sur y cordillerana |
| **NCh432.Of2025** | Viento (W) | Actualizada en 2025 |
| **NCh433.Of1996 Mod 2009** | Sismo (E) — edificios | Con DS61-2011 |
| **NCh2369:2023** | Sismo — estructuras industriales | — |
| **NCh3171.Of2017** | Combinaciones de carga | Norma que integra todas las cargas |

---

*Anterior: [02 — Comportamiento Mecánico del Acero](02_Acero_Comportamiento_Mecanico.md)*  
*Próximo: [04 — Vigas en Flexión](04_Vigas_en_Flexion.md)*
