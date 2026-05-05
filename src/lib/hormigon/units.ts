/**
 * Utilidades de conversión de unidades
 * Hormigón Armado — Sistema dual MPa ↔ kgf/cm²
 */

export type UnitSystem = "MPa" | "kgf/cm2";

export const UNIT_LABELS: Record<UnitSystem, { stress: string; short: string; symbol: string }> = {
  MPa: { stress: "MPa", short: "MPa", symbol: "MPa" },
  "kgf/cm2": { stress: "kgf/cm²", short: "kgf/cm²", symbol: "kgf/cm²" },
};

export const MPa_TO_KGF = 10.1972;
export const KGF_TO_MPa = 1 / MPa_TO_KGF;

export function stressMPaToUnit(value: number, unit: UnitSystem): number {
  return unit === "MPa" ? value : value * MPa_TO_KGF;
}

export function stressUnitToMPa(value: number, unit: UnitSystem): number {
  return unit === "MPa" ? value : value * KGF_TO_MPa;
}

export function formatStress(value: number, unit: UnitSystem, decimals: number = 1): string {
  return `${stressMPaToUnit(value, unit).toFixed(decimals)} ${UNIT_LABELS[unit].symbol}`;
}

export function formatStrain(value: number, decimals: number = 5): string {
  return value.toFixed(decimals);
}

export function formatStrainPermille(value: number, decimals: number = 2): string {
  return `${(value * 1000).toFixed(decimals)}‰`;
}

/** Convierte f'c entre sistemas */
export function convertFc(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === "MPa" ? value * MPa_TO_KGF : value * KGF_TO_MPa;
}

/** Rango de valores de f'c típicos según unidad */
export function getFcRange(unit: UnitSystem): { min: number; max: number; step: number; typical: number } {
  if (unit === "MPa") return { min: 10, max: 60, step: 1, typical: 25 };
  return { min: 100, max: 600, step: 10, typical: 250 };
}
