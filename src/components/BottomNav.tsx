"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CalendarCheck, GraduationCap, Home, User } from "lucide-react";

// The five destinations a student actually cycles between. Everything else
// (leaderboard, predictor, calendar, GK, current affairs) stays in the hamburger
// — a tab bar stops working the moment it becomes a menu.
const TABS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/exams", label: "Exams", Icon: GraduationCap },
  { href: "/daily", label: "Daily", Icon: CalendarCheck },
  { href: "/study", label: "Study", Icon: BookOpen },
  { href: "/dashboard", label: "Progress", Icon: User },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Fixed bottom tab bar, mobile only.
 *
 * Replaces a hamburger-only pattern that every Indian competitor abandoned:
 * on a phone in portrait, every navigation used to cost a reach to the
 * top-right corner, a tap, and a scan of a stacked list. Thumbs live at the
 * bottom of the screen.
 *
 * Layout note: this is `fixed`, so it would otherwise sit on top of page
 * content. The spacer in SiteChrome reserves the height beneath every page.
 */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {TABS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-14 flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "text-brand-600" : "text-muted"
                }`}
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={active ? 2.4 : 2} aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
