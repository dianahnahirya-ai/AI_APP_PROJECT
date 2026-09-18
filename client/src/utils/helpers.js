import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatScore(score) {
  if (score === null || score === undefined) return '-';
  return Number(score).toFixed(1);
}

export function getGradeColor(grade) {
  switch (grade) {
    case 'A': return 'text-green-600 bg-green-50 ring-green-600/20';
    case 'B': return 'text-blue-600 bg-blue-50 ring-blue-600/20';
    case 'C': return 'text-amber-600 bg-amber-50 ring-amber-600/20';
    case 'D': return 'text-orange-600 bg-orange-50 ring-orange-600/20';
    case 'F': return 'text-red-600 bg-red-50 ring-red-600/20';
    default: return 'text-gray-600 bg-gray-50 ring-gray-500/10';
  }
}
