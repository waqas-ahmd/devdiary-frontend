import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const namesArray = name.trim().split(" ");
  if (namesArray.length === 0) return "";
  if (namesArray.length === 1) return namesArray[0].slice(0, 2).toUpperCase();
  return namesArray[0][0].toUpperCase() + namesArray[1][0].toUpperCase();
}
