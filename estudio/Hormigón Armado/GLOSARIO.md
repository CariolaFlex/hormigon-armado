# 📖 Glosario — Hormigón Armado
**Profesor:** Ing. Miguel Colque González | **Semestre:** 1S 2026

> Actualizado acumulativamente con cada PDF procesado.  
> Formato: **Símbolo** — Nombre — Unidad — Definición — Referencia.

---

## A

**a** — Profundidad del bloque equivalente de compresión (Bloque de Whitney) — [mm o cm]  
Altura del rectángulo de compresión equivalente que reemplaza la distribución parabólica real. a = β·c. Se calcula como: a = As·fy / (0,85·f'c·b) cuando el acero fluye. → _PDF 4_

**As** — Área de acero de tracción — [mm² o cm²]  
Área total del acero de refuerzo ubicado en la zona traccionada de la sección. Parámetro fundamental de diseño a flexión. → _PDF 4_

**A's** — Área de acero de compresión — [mm² o cm²]  
Área del acero de refuerzo ubicado en la zona comprimida de la sección (doble armadura). → _PDF 4_

**αi** — Factor de amplificación de carga (LRFD) — [adimensional]  
Multiplica cada tipo de carga para obtener la solicitación última de diseño. Refleja la incertidumbre de cada carga: D → 1,2; L → 1,6; E → 1,0 (ya calibrado). → _PDF 3_

**ACI 318** — Código de diseño de hormigón armado (American Concrete Institute, EE.UU.)  
Referencia internacional principal del ramo. Define los requisitos de diseño, los factores φ y las fórmulas de resistencia. Base de la norma chilena NCh430:2008. → _PDF 3_

**ASD (Allowable Stress Design)** — Diseño por tensiones admisibles  
Criterio de diseño donde las tensiones bajo cargas de servicio no deben superar tensiones admisibles (= resistencia / FS). Asume comportamiento elástico lineal. → _PDF 3_

**A440 / A630 / A700 / A730** — Designación abreviada del acero de refuerzo chileno  
Se refiere a la tensión **última** mínima en MPa. El acero completo es A440-280H, A630-420H, etc. El más usado en diseño convencional es **A630-420H** (fy = 420 MPa). → _PDF 2_

**A/C** — Relación agua/cemento — [adimensional]  
Cociente entre la masa de agua y la masa de cemento en la mezcla. Es el factor más determinante de la resistencia del hormigón: a menor A/C, mayor resistencia (menos agua libre = menos poros = masa más densa). → _PDF 1_

**αT** — Coeficiente de expansión térmica — [°C⁻¹]  
Deformación unitaria que experimenta el hormigón por cada grado de temperatura. Valor típico: 10⁻⁵ °C⁻¹. → _PDF 1_

---

## B

**β (beta)** — Factor del bloque equivalente de Whitney — [adimensional]  
Relaciona la profundidad del bloque equivalente con la profundidad real del eje neutro: a = β·c. Valores: β = 0,85 si f'c ≤ 280 kgf/cm²; β = 1,05 − 0,0007·f'c si f'c > 280 kgf/cm². Límites: 0,65 ≤ β ≤ 0,85. → _PDF 4_

**Bloque de Whitney** — Distribución equivalente de compresión  
Simplificación que reemplaza la distribución parabólica real de tensiones de compresión por un rectángulo de tensión uniforme = 0,85·f'c y altura a = β·c. Tiene la misma resultante y el mismo punto de aplicación que la distribución parabólica real. Deducido por Whitney (1937). → _PDF 4_

**b** — Ancho de la sección rectangular — [mm o cm] → _PDF 4_

**bw** — Ancho del alma (web) en sección T — [mm o cm] → _PDF 4_

## C

**Combinaciones de carga** — NCh3171:2017  
Expresiones que definen cómo combinar simultáneamente las distintas cargas (D, L, W, E, S, R, Lr) para obtener la solicitación de diseño más desfavorable. Existen versiones para ASD (cargas de servicio) y LRFD (cargas amplificadas). → _PDF 3_

**c** — Profundidad del eje neutro — [mm o cm]  
Distancia desde la fibra extrema de compresión hasta el eje neutro real de la sección. Relacionado con el bloque de Whitney por: c = a/β. → _PDF 4_

**cb** — Profundidad balanceada del eje neutro — [mm o cm]  
Profundidad del eje neutro en la falla balanceada: cb = d·6300/(6300 + fy) [fy en kgf/cm²]. → _PDF 4_

**C** — Resultante de la fuerza de compresión — [kN o tf]  
Fuerza total de compresión en la sección. Con Bloque de Whitney: C = 0,85·f'c·a·b. En equilibrio: C = T. → _PDF 4_

**Cu** — Coeficiente último de fluencia — [adimensional]  
Valor límite (asintótico) que alcanza el coeficiente de fluencia cuando t → ∞. Rango: 1,3 – 4,15. Sin datos precisos: usar **Cu = 2,35** (ACI 209R). → _PDF 1_

**Creep** → ver *Fluencia* → _PDF 1_

---

## D

**d** — Peralte efectivo — [mm o cm]  
Distancia desde la fibra comprimida extrema hasta el centroide del acero de tracción. d = h − recubrimiento − ϕestribo − ϕbarra/2. Es el parámetro de altura más importante para el cálculo de Mn. → _PDF 4_

**d'** — Distancia al centroide del acero de compresión — [mm o cm]  
Distancia desde la fibra comprimida extrema hasta el centroide del acero A's (doble armadura). → _PDF 4_

## E

**Efecto Bauschinger** — Fenómeno del acero bajo carga cíclica alternada  
Cuando el acero fluye primero en tracción y luego se carga en compresión (o viceversa), la fluencia en la dirección opuesta ocurre a un nivel de tensión **menor que fy**. El material "recuerda" la deformación previa. Captado por el modelo de Menegotto-Pinto. → _PDF 2_

**εA** — Amplitud de deformación unitaria por ciclo — [adimensional]  
Parámetro de la relación de Coffin-Manson. Determina el número de ciclos hasta la falla por fatiga de bajo ciclaje. → _PDF 2_

**εcu** — Deformación última del hormigón en compresión — [adimensional]  
Deformación máxima de la fibra extrema comprimida adoptada por el ACI para diseño: **εcu = 0,003**. → _PDF 4_

**εt** — Deformación del acero de tracción más extremo en el estado último — [adim.]  
Determina el tipo de sección: εt ≥ 0,005 → controlada por tracción (φ=0,90) / εt ≤ 0,002 → controlada por compresión (φ=0,65) / zona de transición intermedia. → _PDF 4_

**εy** — Deformación de fluencia del acero — [adimensional]  
Deformación a la que el acero comienza a fluir: εy = fy/Es. Para A630: εy = 420/210.000 = **0,002**. Para A440: εy = 280/210.000 = **0,00133**. → _PDF 2_

**Es** — Módulo de elasticidad del acero — [MPa]  
Rigidez del acero en rango elástico. **Constante para todos los tipos de acero de refuerzo: Es = 210.000 MPa** (≈ 2.100.000 kgf/cm²). → _PDF 2_

**Esh** — Módulo de endurecimiento por deformación del acero — [MPa]  
Pendiente de la curva tensión-deformación en la zona de endurecimiento (zona 3, post-plateau). Valor: **Esh = 7.000 MPa**. → _PDF 2_

**Ec** — Módulo de elasticidad del hormigón — [MPa]  
Rigidez del hormigón en rango lineal. Definido por ACI como la pendiente de la secante desde σ=0 hasta σ=0,45·f'c. Fórmula: Ec = 4700√f'c (MPa) para hormigón de peso normal. → _PDF 1_

**ε₀** — Deformación unitaria en la resistencia máxima — [adimensional]  
Deformación del hormigón cuando alcanza f'c. Valor típico: **0,002** (2‰), aproximadamente independiente de la resistencia. → _PDF 1_

**εu** — Deformación unitaria última del hormigón — [adimensional]  
Deformación máxima asumida en la fibra extrema de compresión para diseño. Valor ACI: **0,003** (3‰). → _PDF 1_

**εsh** — Deformación por retracción — [adimensional]  
Acortamiento del hormigón por pérdida de humedad, independiente de cargas. → _PDF 1_

**εshu** — Deformación última por retracción — [adimensional]  
Valor límite de la retracción cuando t → ∞. Rango: 0,0002 – 0,0006 (puede llegar a 0,001). Promedio ACI: **0,00078**. → _PDF 1_

---

## F

**f'c** — Resistencia característica a la compresión del hormigón — [MPa o kgf/cm²]  
Resistencia obtenida en probetas cilíndricas (h/d=2) a los 28 días de curado, bajo NCh1037. Es el parámetro fundamental de diseño del hormigón. → _PDF 1_

**fr** — Módulo de rotura — [MPa]  
Resistencia a la tracción del hormigón medida en ensayo de flexotracción (NCh1038). Es mayor que la resistencia directa a tracción. → _PDF 1_

**fsp** — Resistencia a la tracción por hendimiento — [MPa]  
Resistencia a la tracción medida en prueba brasileña (NCh1170). Fórmula: fsp = 2P/(π·L·d). → _PDF 1_

**ft** — Resistencia a la tracción del hormigón — [MPa]  
Resistencia directa del hormigón a esfuerzos de tracción. Aproximadamente ft ≈ 0,1·f'c. Se desprecia en el diseño a flexión. → _PDF 1_

**Factor de seguridad (FS)** — [adimensional]  
Relación entre la capacidad (resistencia) y la demanda (solicitación): FS = R/S. En ASD: FS_acero = 1,8 / FS_hormigón = 3. → _PDF 3_

**Fatiga de bajo ciclaje** — Falla por fatiga con pocos ciclos de gran amplitud  
Falla acumulativa del acero bajo 100 o menos ciclos de grandes deformaciones. Relevante para el acero de refuerzo bajo sismos. Se modela con Coffin-Manson y el índice de Miner. → _PDF 2_

**fu** — Tensión última del acero — [MPa]  
Tensión máxima que soporta el acero antes de fracturarse. Para A630-420H: fu = 630 MPa. → _PDF 2_

**fy** — Tensión de fluencia del acero — [MPa]  
Tensión en que el acero deja el comportamiento elástico e inicia la deformación plástica. Parámetro fundamental de diseño del acero de refuerzo. → _PDF 2_

**Fluencia (Creep)** — Deformación diferida bajo carga sostenida — [adimensional]  
Acortamiento progresivo del hormigón bajo cargas constantes en el tiempo, sin aumento de carga. Puede ser igual o mayor que la deformación elástica inicial. Calculada con ACI 209R. → _PDF 1_

---

## G

**GXX** — Clasificación del hormigón según NCh170:2016  
Designación del hormigón donde XX es la resistencia característica f'c en MPa medida en probetas cilíndricas. Ejemplo: G25 → f'c = 25 MPa. → _PDF 1_

---

## H

**h** — Altura total de la sección — [mm o cm]  
Dimensión total de la viga en la dirección perpendicular a la flexión. h > d (la diferencia es el recubrimiento + diámetros). → _PDF 4_

**hf** — Altura del ala (flange) en sección T — [mm o cm]  
Espesor de la losa que actúa como ala en una viga T. → _PDF 4_

**h/d** — Relación altura/diámetro de probeta — [adimensional]  
Razón de aspecto de la probeta cilíndrica de ensayo. Valor estándar: **h/d = 2** (NCh1037). Relaciones menores generan confinamiento artificial que sobreestima f'c. → _PDF 1_

**Hormigón armado** — Material compuesto de hormigón + acero de refuerzo. El hormigón resiste la compresión y el acero resiste la tracción. → _PDF 1_

---

## K

**Ka** — Coeficiente de edad de primera carga (fluencia) — [adimensional]  
Factor que corrige la fluencia según la madurez del hormigón cuando se aplica la carga. → _PDF 1_

**Ke** — Coeficiente de contenido de aire (fluencia) — [adimensional]  
Factor de corrección por el porcentaje de aire incluido en la mezcla. → _PDF 1_

**Kf** — Coeficiente de contenido de finos (fluencia) — [adimensional]  
Factor de corrección por la proporción de áridos finos en la mezcla. → _PDF 1_

**Kh** — Coeficiente de humedad relativa (fluencia) — [adimensional]  
Factor de corrección ambiental para fluencia según humedad relativa H. → _PDF 1_

**Ks** — Coeficiente de revenimiento (fluencia) — [adimensional]  
Factor de corrección por la consistencia (trabajabilidad) del hormigón fresco. → _PDF 1_

**Kt** — Coeficiente de tiempo (fluencia) — [adimensional]  
Factor de evolución temporal de la fluencia: Kt = t⁰·⁶ / (10 + t⁰·⁶). → _PDF 1_

**Kth** — Coeficiente de espesor promedio (fluencia) — [adimensional]  
Factor de corrección por el tamaño del elemento (afecta la velocidad de secado). → _PDF 1_

---

## L

**LRFD (Load and Resistance Factor Design)** — Diseño por factores de carga y resistencia  
Método moderno: cargas amplificadas (Σαi·Si) ≤ resistencia reducida (φ·Rn). Trabaja con la resistencia última de la sección. Método del ACI 318. → _PDF 3_

---

## M

**m, M** — Constantes de Coffin-Manson — [adimensional]  
Constantes del material obtenidas por regresión: M = 0,11 y m = −0,44 para acero de refuerzo. → _PDF 2_

**Modelo EPP (Elástico Perfectamente Plástico)** — Modelo constitutivo simplificado del acero  
Idealización del acero con tramo elástico lineal (pendiente Es) hasta fy, seguido de meseta horizontal infinita a tensión = fy. Es el modelo implícito en todas las fórmulas del ACI 318. → _PDF 2_

**Mn** — Momento nominal de resistencia a flexión — [kN·m o tf·m]  
Momento resistente calculado con las propiedades nominales de los materiales, usando el Bloque de Whitney. Mn = As·fy·(d − a/2). → _PDF 4_

**Mu** — Momento flector último de diseño — [kN·m o tf·m]  
Momento resultante de las combinaciones de carga LRFD. Debe ser resistido por φ·Mn. → _PDF 3_

**μ (mu)** — Módulo de Poisson — [adimensional]  
Relación entre deformación transversal y deformación longitudinal bajo carga uniaxial. Para hormigón: μ = 0,15 – 0,20. Para acero: ν = 0,3 (elástico) / ν = 0,5 (plástico). → _PDF 1, PDF 2_

---

## N

**NCh430:2008** — Norma chilena de hormigón armado  
Norma principal de diseño de estructuras de hormigón armado en Chile. Basada en ACI 318. Define requisitos de diseño y cálculo para edificios y estructuras. → _PDF 3_

**NCh3171:2017** — Combinaciones de carga (Chile)  
Norma que define las combinaciones de carga para ASD y LRFD a usar en el diseño estructural en Chile. → _PDF 3_

**NCh1537:2009** — Cargas permanentes y de uso (Chile)  
Norma de cargas D y L. Define sobrecargas de uso por tipo de ocupación y la reducción de sobrecargas para grandes áreas tributarias. → _PDF 3_

**n** — Razón modular — [adimensional]  
Relación entre el módulo de elasticidad del acero y el del hormigón: n = Es/Ec. Permite transformar el área de acero en área equivalente de hormigón en el análisis elástico. Típicamente n ≈ 7–10. → _PDF 2_

**NCh204.Of2020** — Norma de acero de refuerzo chilena  
Establece clasificación, requisitos geométricos, mecánicos, marcas y embalaje del acero de refuerzo. → _PDF 2_

**Nf** — Número de ciclos hasta la falla (Coffin-Manson) — [ciclos]  
Disminuye al aumentar la amplitud de deformación por ciclo. → _PDF 2_

---

## P

**Peralte efectivo** → ver **d** → _PDF 4_

**ρ (rho)** — Cuantía de acero — [adimensional]  
Relación entre el área de acero y el área de la sección efectiva: ρ = As/(b·d). Parámetro adimensional que resume el contenido de acero de la sección. → _PDF 4_

**ρb** — Cuantía balanceada — [adimensional]  
Cuantía que produce simultáneamente εcu = 0,003 en el hormigón y εy en el acero: ρb = 0,85·β·f'c/fy · 6300/(6300+fy). → _PDF 4_

**ρmáx** — Cuantía máxima — [adimensional]  
Cuantía límite para garantizar falla dúctil: ρmáx ≈ 0,36·β·f'c/fy (para εt ≥ 0,004) / ρmáx ≈ 0,32·β·f'c/fy (para εt ≥ 0,005 y φ=0,90). → _PDF 4_

**ρmín** — Cuantía mínima — [adimensional]  
Cuantía mínima para evitar falla abrupta al fisurar: ρmín = 0,8·√f'c/fy ≥ 14/fy [en kgf/cm²]. → _PDF 4_

## R

**Rn** — Resistencia nominal — [kN·m, kN, etc.]  
Resistencia calculada con las fórmulas del código, usando las propiedades nominales de los materiales. Ru = φ·Rn es la resistencia de diseño. → _PDF 3_

**Retracción (Shrinkage)** — Deformación por pérdida de humedad — [adimensional]  
Acortamiento del hormigón debido a la evaporación del agua, independiente de cargas. Puede generar fisuras en elementos restringidos. Calculada con ACI 209R. → _PDF 1_

---

## S

**Se** — Coeficiente de contenido de aire (retracción) — [adimensional] → _PDF 1_

**Sf** — Coeficiente de contenido de finos (retracción) — [adimensional] → _PDF 1_

**Sh** — Coeficiente de humedad relativa (retracción) — [adimensional] → _PDF 1_

**Shrinkage** → ver *Retracción* → _PDF 1_

**Ss** — Coeficiente de revenimiento (retracción) — [adimensional] → _PDF 1_

**St** — Coeficiente de tiempo (retracción) — [adimensional]  
Curado húmedo (desde día 7): St = t/(t+35) / Curado vapor (desde día 1-3): St = t/(t+55). → _PDF 1_

**Sth** — Coeficiente de espesor (retracción) — [adimensional] → _PDF 1_

---

## W

**wc** — Densidad del hormigón — [kgf/m³]  
Peso unitario del hormigón. Normal: 2.200–2.300 kgf/m³. Liviano: 1.800–1.900 kgf/m³. → _PDF 1_

---

## T

**T** — Resultante de la fuerza de tracción — [kN o tf]  
Fuerza total de tracción en el acero de refuerzo. T = As·fs. En equilibrio: T = C. → _PDF 4_

## φ (phi)

**φ** — Factor de reducción de resistencia (LRFD/ACI 318) — [adimensional]  
Reduce la resistencia nominal Rn para obtener la resistencia de diseño Ru = φ·Rn. Valores clave: φ_flexión = 0,90 / φ_corte = 0,75 / φ_compresión-estribos = 0,65 / φ_compresión-espirales = 0,75. → _PDF 3_

---

*Última actualización: PDF 4 — Vigas en Flexión*
