"use client";

import { useTranslations } from "next-intl";
import { roles, type Role } from "@/lib/roles";
import { useRole } from "./RoleProvider";

export default function RoleSwitcher() {
  const t = useTranslations("roles");
  const { role, setRole } = useRole();

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <span>{t("label")}</span>
      <select
        value={role}
        onChange={(event) => setRole(event.target.value as Role)}
        className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {roles.map((value) => (
          <option key={value} value={value}>
            {t(value)}
          </option>
        ))}
      </select>
    </label>
  );
}
