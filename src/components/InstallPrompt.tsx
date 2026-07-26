"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

/**
 * A dismissible "Install app" prompt.
 *
 * The manifest makes PadhoDost installable, but nothing surfaced the option —
 * so almost no one installed it. This captures the browser's
 * `beforeinstallprompt` event, stashes it, and shows a small banner with an
 * Install button that triggers the native prompt on tap. Hidden when already
 * installed (standalone display-mode) or previously dismissed.
 *
 * iOS Safari doesn't fire beforeinstallprompt (install is via the Share sheet),
 * so this simply won't show there — no misleading button.
 */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "pd_install_dismissed";

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(display-mode: standalone)").matches) return;
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* private mode / storage disabled — just proceed */
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    const onInstalled = () => {
      setShow(false);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!show || !deferred) return null;

  const install = async () => {
    try {
      await deferred.prompt();
      await deferred.userChoice;
    } catch {
      /* user closed the native prompt */
    }
    setShow(false);
    setDeferred(null);
  };

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-sm sm:bottom-4">
      <div className="surface-3 flex items-center gap-3 p-3 shadow-e3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">
          📚
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-body font-semibold text-foreground">Install PadhoDost</div>
          <div className="text-caption text-muted">Quick access from your home screen — no app store.</div>
        </div>
        <button
          type="button"
          onClick={install}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-2 text-body font-semibold text-white transition-colors hover:bg-brand-700"
        >
          <Download className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
          Install
        </button>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
