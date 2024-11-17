import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractInitials(name: string) {
  // Split the name into parts
  const nameParts = name.split(" ");

  // Handle the initials extraction logic
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    // Extract the first letter of the first and last words
    const firstInitial = nameParts[0].charAt(0).toUpperCase();
    const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }
}
