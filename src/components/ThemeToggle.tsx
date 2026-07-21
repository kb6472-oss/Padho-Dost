"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

// The site is light by default and does NOT follow the OS colour scheme, so this
// is a simple two-state switch. localStorage is an external store, read through
// useSyncExternalStore rather than an effect; the `storage` event keeps other
// open tabs in sync for free.
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
    return localStorage.getItem("pd_theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

// Server and first paint agree on light (the default). The blocking script in
// layout.tsx has already applied a saved dark choice to <html> before paint.
const getServerSnapshot = (): Theme => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const root = document.documentElement;
    if (theme === "dark") {
      // Back to the default — clear the override entirely.
      root.removeAttribute("data-theme");
      localStorage.removeItem("pd_theme");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("pd_theme", "dark");
    }
    listeners.forEach((l) => l());
  }

  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      <Icon className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
    </button>
  );
}
