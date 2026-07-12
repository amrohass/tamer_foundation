export const roles = [
  "youth",
  "facilitator",
  "librarian",
  "administrator",
] as const;

export type Role = (typeof roles)[number];
