"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const ORDER: Theme[] = ["system", "light", "dark"];
const LABEL: Record<Theme, string> = {
  system: "Theme: match device",
  light: "Theme: light",
  dark: "Theme: dark",
};

// localStorage is an external store, so it's read through useSyncExternalStore
// rather than an effect. The local listener set is what makes this tab update
// on click; the `storage` event keeps other open tabs in sync for free.
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): Theme {
  try {
    const t = localStorage.getItem("pd_theme");
    return t === "dark" || t === "light" ? t : "system";
  } catch {
    return "system";
  }
}

// Server and first paint agree on "system"; the blocking script in layout.tsx
// has already applied any saved choice to <html>, so nothing visibly flips.
const getServerSnapshot = (): Theme => "system";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    const root = document.documentElement;

    if (next === "system") {
      root.removeAttribute("data-theme");
      localStorage.removeItem("pd_theme");
    } else {
      root.setAttribute("data-theme", next);
      localStorage.setItem("pd_theme", next);
    }
    listeners.forEach((l) => l());
  }

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={LABEL[theme]}
      title={LABEL[theme]}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
