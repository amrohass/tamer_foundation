"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { roles, type Role } from "@/lib/roles";

const STORAGE_KEY = "tamer-demo-role";
const DEFAULT_ROLE: Role = "youth";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Role {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && (roles as readonly string[]).includes(stored)
    ? (stored as Role)
    : DEFAULT_ROLE;
}

function getServerSnapshot(): Role {
  return DEFAULT_ROLE;
}

const RoleContext = createContext<{
  role: Role;
  setRole: (role: Role) => void;
} | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const role = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setRole = useCallback((next: Role) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    listeners.forEach((listener) => listener());
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
