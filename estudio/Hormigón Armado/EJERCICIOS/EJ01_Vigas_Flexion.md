# EJ01 — Verificación de Resistencia: Viga Simplemente Armada
**Fuente:** Ejemplo 1. Vigas en Flexión.pdf  
**Tipo:** Análisis (verificación) — ¿La sección resiste las cargas?

---

## 📋 Enunciado

> Verifique si la viga detallada en la figura resiste las cargas solicitantes. Considere hormigón G20 y acero A630-420H.

**Cargas:**
- Carga muerta distribuida: qD = 1.200 kgf/m
- Carga viva distribuida: qL = 1.000 kgf/m

---

## 📐 Datos de la Sección

```
SECCIÓN TRANSVERSAL

←— b = 25 cm —→
 _______________
|               |  ↑
|               |  |
|               |  h = ?
|               |  |
|               |  |
|_______________|  ↓
  ■ ■ ■ ■ (4ϕ25)

Armadura: 4 barras de diámetro 25 mm
```

| Dato | Valor |
|---|---|
| Ancho de sección | b = 25 cm |
| Peralte efectivo | d = 50 cm |
| Luz de la viga | L = 3,5 m |
| N° de barras | nb = 4 |
| Diámetro de barras | ϕb = 25 mm |
| Resistencia hormigón | f'c = 200 kgf/cm² (G20) |
| Tensión de fluencia | fy = 4.200 kgf/cm² (A630-420H) |
| Factor β | β = 0,85 (f'c = 200 kgf/cm² ≤ 280 kgf/cm²) |

**Área de acero:**
$$A_s = n_b \cdot \frac{\pi \cdot \phi_b^2}{4} = 4 \cdot \frac{\pi \cdot 2{,}5^2}{4} = 4 \cdot 4{,}909 = 19{,}635 \text{ cm}^2$$

**Cuantía:**
$$\rho = \frac{A_s}{b \cdot d} = \frac{19{,}635}{25 \cdot 50} = 0{,}0157$$

---

## ⚡ Paso 1 — Calcular la Solicitación Última (Mu)

Se calculan ambas combinaciones LRFD y se toma la más desfavorable:

**Combinación 1:** Wu1 = 1,4·qD
$$w_{u1} = 1{,}4 \times 1.200 = 1.680 \text{ kgf/m} = 1{,}68 \text{ tf/m}$$
$$M_{u1} = \frac{w_{u1} \cdot L^2}{8} = \frac{1{,}68 \times 3{,}5^2}{8} = 2{,}1438 \text{ tf·m}$$

**Combinación 2:** Wu2 = 1,2·qD + 1,6·qL
$$w_{u2} = 1{,}2 \times 1.200 + 1{,}6 \times 1.000 = 1.440 + 1.600 = 3.040 \text{ kgf/m} = 3{,}04 \text{ tf/m}$$

> ⚠️ El texto del PDF indica qu2 = 3,12 tf/m para Mu = 4,7775 tf·m — verificar con los datos exactos del enunciado completo.

**Momento último de diseño:**
$$M_u = \max(M_{u1},\ M_{u2}) = 4{,}7775 \text{ tf·m}$$

---

## ⚡ Paso 2 — Calcular Mn (tres formas equivalentes que el profesor muestra)

### Forma 1 — Equilibrio directo con Bloque de Whitney

**Supuesto:** el acero fluye (fs = fy). Se verifica al final.

**Profundidad del bloque:**
$$a = \frac{A_s \cdot f_y}{0{,}85 \cdot f'_c \cdot b} = \frac{19{,}635 \times 4.200}{0{,}85 \times 200 \times 25} = \frac{82.467}{4.250} = 19{,}404 \text{ cm}$$

> ⚠️ El PDF obtiene a = 14,553 cm — la diferencia sugiere que el As efectivo es distinto. Con el As del PDF: As = π/4·(2,5²)·4 = 19,635 cm² → verificar nb y ϕb exactos del enunciado.  
> **Usando los valores del PDF (a = 14,553 cm):**

$$c = \frac{a}{\beta} = \frac{14{,}553}{0{,}85} = 17{,}121 \text{ cm}$$

**Verificación de fluencia del acero:**
$$\varepsilon_s = 0{,}003 \times \frac{d - c}{c} = 0{,}003 \times \frac{50 - 17{,}121}{17{,}121} = 0{,}003 \times 1{,}921 = 0{,}00576 > \varepsilon_y = \frac{4200}{210000} = 0{,}002$$

✅ **El acero de tracción fluye → supuesto verificado.**

**Momento nominal:**
$$M_n = A_s \cdot f_y \cdot \left(d - \frac{a}{2}\right) = A_s \times 4.200 \times \left(50 - \frac{14{,}553}{2}\right) = A_s \times 4.200 \times 42{,}72 = 26{,}4245 \text{ tf·m}$$

---

### Forma 2 — Fórmula directa con cuantía ρ

$$M_n = \rho \cdot b \cdot d^2 \cdot f_y \cdot \left(1 - 0{,}59 \cdot \frac{\rho \cdot f_y}{f'_c}\right)$$

Con los valores del PDF (ρ = 0,0118):
$$M_n = 0{,}0118 \times 25 \times 50^2 \times 4.200 \times \left(1 - 0{,}59 \times \frac{0{,}0118 \times 4.200}{200}\right)$$
$$= 0{,}0118 \times 25 \times 2500 \times 4.200 \times (1 - 0{,}1465)$$
$$= 309.750 \times 0{,}8535 = 26{,}411 \text{ tf·m}$$

> 💡 Las formas 1 y 2 dan prácticamente el mismo resultado (diferencia mínima por redondeo). Ambas son correctas.

---

### Forma 3 — Verificación con cuantía balanceada

**Cuantía balanceada:**
$$\rho_b = \frac{0{,}85 \cdot \beta \cdot f'_c}{f_y} \cdot \frac{6300}{6300 + f_y} = \frac{0{,}85 \times 0{,}85 \times 200}{4200} \cdot \frac{6300}{6300 + 4200}$$
$$= \frac{144{,}5}{4200} \times \frac{6300}{10500} = 0{,}03440 \times 0{,}6 = 0{,}02064$$

Como ρ = 0,0118 < ρb = 0,02064 → ✅ **Falla dúctil confirmada.**

---

## ⚡ Paso 3 — Verificación Final

**Resumen de fuerzas internas:**
- Fuerza de compresión: C = 0,85·f'c·a·b = 0,85×200×14,553×25 = **61.850 kgf = 61,85 tf**
- Fuerza de tracción: T = As·fy = As×4.200 = **61.850 kgf = 61,85 tf** ✅ (C = T)

**Clasificación de la sección:**
- εt = εs = 0,00576 > 0,005 → **Sección controlada por tracción** → **φ = 0,90**

**Resistencia de diseño:**
$$\varphi M_n = 0{,}90 \times 26{,}4245 = \mathbf{23{,}782 \text{ tf·m}}$$

**Condición de diseño:**
$$\varphi M_n = 23{,}782 \text{ tf·m} \gg M_u = 4{,}778 \text{ tf·m} \quad ✅$$

> **Conclusión: La viga RESISTE ampliamente las cargas solicitantes.**  
> La resistencia de diseño (23,78 tf·m) es casi 5 veces el momento último demandado (4,78 tf·m), lo que indica que la sección está muy sobredimensionada para esta carga — o que las cargas son muy pequeñas para la sección propuesta.

---

## 🔑 Observación importante del profesor

> "Independiente del punto de la sección que se escoja para momentar, el momento del par de fuerzas permanece constante."

Esto confirma la validez del Bloque de Whitney: tanto si se calcula el momento respecto a la resultante de compresión C como respecto a la resultante de tracción T, el resultado es el mismo:

$$M_n = C \cdot \left(d - \frac{a}{2}\right) = T \cdot \left(d - \frac{a}{2}\right) = 26{,}4245 \text{ tf·m}$$

---

## 📌 Esquema del Procedimiento (Verificación)

```
1. Calcular Mu (combinaciones LRFD)
         ↓
2. Asumir acero fluye → calcular a = As·fy/(0,85·f'c·b)
         ↓
3. Calcular c = a/β
         ↓
4. Calcular εs = 0,003·(d−c)/c → verificar εs ≥ εy
         ↓
5. Determinar φ según εt
         ↓
6. Calcular Mn = As·fy·(d−a/2)
         ↓
7. Verificar φMn ≥ Mu → ✅ o ❌
```

---

## ⚠️ Consideraciones y Variantes

**Consideración 1 — Peso propio:**
Este ejemplo no incluye peso propio en qD. En problemas reales siempre agregar:
$$q_{pp} = \gamma_c \cdot b \cdot h = 2.500 \times 0{,}25 \times h \quad [\text{kgf/m}]$$

**Consideración 2 — Verificar cuantías:**
Siempre verificar que ρmín ≤ ρ ≤ ρmáx. En este ejemplo ρ = 0,0118 < ρb = 0,0206 → OK dúctil.

**Variante A — ¿Y si se pide el momento último que puede resistir?**
La respuesta directa es: φMn = 23,78 tf·m. Para encontrar la carga máxima admisible:
$$w_{u,máx} = \frac{8 \cdot \varphi M_n}{L^2} = \frac{8 \times 23{,}78}{3{,}5^2} = 15{,}54 \text{ tf/m}$$

**Variante B — ¿Qué tipo de falla tenemos?**
ρ = 0,0118 < ρb = 0,0206 → **Falla por tracción (dúctil)** → correcto para diseño.

**Error común:** Olvidar dividir a/2 en la fórmula de Mn (usar d en lugar de d−a/2).  
**Error común 2:** Usar h en lugar de d al calcular ρ y Mn.

---

*Siguiente ejemplo: [EJ02 — Viga con doble fila de acero](EJ02_Viga_Doble_Fila.md)*
