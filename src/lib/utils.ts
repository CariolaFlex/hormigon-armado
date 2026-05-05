import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function round(value: number, decimals: number = 4): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function linspace(start: number, end: number, n: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) {
    arr.push(start + (i / (n - 1)) * (end - start));
  }
  return arr;
}
