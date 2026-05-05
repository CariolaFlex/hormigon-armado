# 📚 Hormigón Armado — Índice de Estudio
**Profesor:** Ing. Miguel Colque González | **Universidad de La Serena**  
**Semestre:** 1S 2026 | **Alumno:** Vectium

---

## 🗺️ Estructura del Repositorio

```
Hormigón Armado/
│
├── README.md                          ← Este índice
├── PLAN_MAESTRO.md                    ← Plan y metodología del estudio
│
├── GLOSARIO.md                        ← Terminología completa (A-Z)
├── METODOS_Y_APLICACION.md            ← 14 métodos con procedimientos paso a paso
├── ESTUDIOS.md                        ← Gráficas, teoremas y normas analizados
│
├── 01_Hormigon_Comportamiento_Mecanico.md
├── 02_Acero_Comportamiento_Mecanico.md
├── 03_Criterios_Diseno_Normas.md
├── 04_Vigas_en_Flexion.md             ← Archivo más importante
│
└── EJERCICIOS/
    ├── EJ01_Vigas_Flexion.md          ← Verificación viga simple (4ϕ25)
    ├── EJ02_Viga_Doble_Fila.md        ← Análisis doble fila (6ϕ18)
    ├── EJ03_Viga_Doble_Armadura.md    ← Análisis doble armadura (5ϕ22 + 2ϕ10)
    └── EJ04_Diseno_Viga_Rectangular.md ← Diseño rectangular (3ϕ22)
```

---

## 📖 Archivos Temáticos

### [01 — Comportamiento Mecánico del Hormigón](01_Hormigon_Comportamiento_Mecanico.md)
Curva σ-ε, Ec, resistencias (f'c, fr, fsp, ft), zonas de comportamiento, efectos multiaxiales, temperatura, fluencia (ACI 209R) y retracción (ACI 209R).

### [02 — Comportamiento Mecánico del Acero](02_Acero_Comportamiento_Mecanico.md)
Nomenclatura NCh204, curva σ-ε del acero (4 zonas), modelo EPP, Es = 210.000 MPa, εy por tipo, efecto Bauschinger, fatiga Coffin-Manson + índice de Miner.

### [03 — Criterios de Diseño y Normas](03_Criterios_Diseno_Normas.md)
ASD vs LRFD, normas chilenas (NCh430, NCh3171, NCh1537), combinaciones de carga (7 combinaciones LRFD), factores φ (flexión 0,90 / corte 0,75 / compresión 0,65), cargas tributarias.

### [04 — Vigas en Flexión ⭐](04_Vigas_en_Flexion.md)
**El archivo más importante.** Evolución de la distribución de tensiones (3 fases), deducción completa del Bloque de Whitney desde primeros principios (K1, K2, K3, β), tres modos de falla, cuantías (ρb, ρmax, ρmin), doble armadura (4 casos), vigas T (2 casos), tabla de fórmulas.

---

## 🏋️ Ejercicios Resueltos

### [EJ01 — Verificación Viga Simple](EJERCICIOS/EJ01_Vigas_Flexion.md)
**Tipo:** Análisis | **Sección:** 25×50 cm | **Acero:** 4ϕ25  
**Cargas:** qD=1.200 kgf/m + qL=1.000 kgf/m | **Luz:** 3,5 m  
**Resultado:** φMn = 23,78 tf·m >> Mu = 4,78 tf·m ✅ (la viga resiste ampliamente)  
**Métodos mostrados:** Bloque Whitney directo / fórmula con ρ / verificación por ρb

### [EJ02 — Viga con Doble Fila](EJERCICIOS/EJ02_Viga_Doble_Fila.md)
**Tipo:** Análisis | **Sección:** 20×50 cm | **Acero:** 6ϕ18 (3 por fila)  
**Dato especial:** r = 5 cm al centroide de la fila inferior  
**Resultado:** Mn = 21,431 tf·m (exacto) ≈ 21,413 tf·m (aproximado, error 0,08%)  
**Concepto clave:** La doble fila reduce el peralte efectivo d → menor Mn

### [EJ03 — Viga con Doble Armadura](EJERCICIOS/EJ03_Viga_Doble_Armadura.md)
**Tipo:** Análisis | **Sección:** 35×70 cm | **Acero:** 5ϕ22 (tracción) + 2ϕ10 (compresión)  
**f'c:** 180 kgf/cm² (G18)  
**Resultado:** Mn = 46,667 tf·m (Mn1=4,089 + Mn2=42,578)  
**Concepto clave:** Descomposición en Viga 1 (par de fuerzas) + Viga 2 (Whitney simple)

### [EJ04 — Diseño Viga Rectangular](EJERCICIOS/EJ04_Diseno_Viga_Rectangular.md)
**Tipo:** Diseño | **Sección:** 25×50 cm (dadas) | **Cargas:** PL=4 tf + qL=0,8 tf/m  
**f'c:** 250 kgf/cm² (G25) | **Luz:** 6 m  
**Resultado:** As_req = 11,10 cm² → 3ϕ22 (As=11,40 cm²) | φMn = 17,46 tf·m > Mu = 17,05 tf·m ✅  
**Concepto clave:** Procedimiento inverso — de Mu a As usando Rn y fórmula de ρ

---

## 🔑 Archivos Transversales

### [GLOSARIO.md](GLOSARIO.md)
Más de 60 términos ordenados A-Z con definición, unidades, origen normativo y referencia cruzada. Incluye todos los símbolos griegos del ramo.

### [METODOS_Y_APLICACION.md](METODOS_Y_APLICACION.md)
14 métodos con procedimiento numerado paso a paso:

| # | Método | Aplicación |
|---|---|---|
| M1 | Cálculo de Ec | Módulo de elasticidad del hormigón |
| M2 | Fluencia ACI 209R | Deformación diferida por carga sostenida |
| M3 | Retracción ACI 209R | Deformación por secado |
| M4 | Tensión con modelo EPP | Comportamiento del acero |
| M5 | Deformación de fluencia εy | Por tipo de acero |
| M6 | Fatiga Coffin-Manson + Miner | Falla por ciclos repetidos |
| M7 | Carga última Wu (LRFD) | Combinaciones NCh3171 |
| M8 | Verificación LRFD | φRn ≥ Ru |
| M9 ⭐ | Análisis sección rectangular | Whitney Block — método principal |
| M10 | Análisis con falla compresiva | Ecuación cuadrática para c |
| M11 ⭐ | Diseño sección rectangular | Encontrar As dado Mu |
| M12 ⭐ | Análisis doble armadura | Descomposición en dos vigas |
| M13 ⭐ | Análisis viga T | Bloque ≤ hf o > hf |
| M14 | Verificación de cuantías | ρmin, ρmax, ρb |

### [ESTUDIOS.md](ESTUDIOS.md)
- **21 gráficas** (G01–G21): análisis completo con ejes, puntos clave e implicancia de diseño
- **19 teoremas** (T01–T19): enunciado formal, demostración y aplicación
- **Tabla de normas**: NCh204, NCh430, NCh3171, NCh1537, ACI 318, ACI 209R, ACI 215R

---

## ⭐ Conceptos Prioritarios para el Examen

### 1. Bloque de Whitney — La herramienta central
$$a = \frac{A_s \cdot f_y}{0{,}85 \cdot f'_c \cdot b} \quad \longrightarrow \quad M_n = A_s \cdot f_y \cdot \left(d - \frac{a}{2}\right)$$

- β = 0,85 si f'c ≤ 280 kgf/cm²
- c = a/β (profundidad del eje neutro)
- εcu = 0,003 (deformación última del hormigón, fijada por ACI)

### 2. Verificación de Fluencia
$$\varepsilon_s = 0{,}003 \cdot \frac{d - c}{c} \geq \varepsilon_y = \frac{f_y}{E_s} = \frac{4.200}{210.000} = 0{,}002 \checkmark$$

### 3. Tres Modos de Falla
| Tipo | Condición | φ | ¿Aceptable? |
|---|---|---|---|
| Dúctil (tracción) | εs > εy | 0,90 | ✅ Sí |
| Balanceada | εs = εy | — | ⚠️ Límite |
| Frágil (compresión) | εs < εy | — | ❌ No |

### 4. Cuantías Clave (G25, A630)
| Cuantía | Fórmula | Valor G25/A630 |
|---|---|---|
| ρb | 0,85·β·f'c/fy · 6300/(6300+fy) | 0,02582 |
| ρmax | 0,32·β·f'c/fy | 0,01619 |
| ρmin | max(0,8√f'c/fy, 14/fy) | 0,00333 |

### 5. Combinación de Carga Crítica (LRFD)
$$w_u = 1{,}2 \cdot q_D + 1{,}6 \cdot q_L \quad \text{(usualmente gobierna)}$$

---

## 🚨 Errores Más Comunes

1. **Usar h en vez de d** → sobreestima el brazo de palanca → Mn erróneo
2. **Olvidar a/2 en la fórmula** → usar Mn = As·fy·d → sobreestima Mn
3. **No verificar fluencia del acero** → asumir fy sin comprobar ε_s ≥ εy
4. **En doble armadura: usar As total para calcular a** → debe usar As2 = As − As1
5. **En doble armadura: no verificar fluencia de A's** → ε's puede ser < εy
6. **Omitir el peso propio** en el cálculo de Wu → subestima Mu
7. **Mezclar unidades en Rn** → Mu debe estar en kgf·cm, b y d en cm
8. **En doble fila: calcular d como si fuera fila única** → sobreestima d → sobreestima Mn

---

*Generado con Claude Cowork — Mayo 2026*
