import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * One button recipe, three intents, three sizes.
 *
 * `md` and `lg` are >=44px tall on purpose — Google's minimum touch target.
 * The old codebase had py-2.5 pill buttons at ~38px, which miss on a phone
 * often enough to feel broken.
 */
type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-e1",
  secondary: "border border-border bg-surface-raised text-foreground hover:border-brand-300 hover:bg-surface",
  ghost: "text-muted hover:text-foreground hover:bg-surface",
};

const SIZE: Record<Size, string> = {
  sm: "h-9 px-4 text-caption",
  md: "h-11 px-6 text-body",
  lg: "h-13 px-8 text-body-lg",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-colors disabled:pointer-events-none disabled:opacity-55";

function cls(variant: Variant, size: Size, full: boolean, extra: string) {
  return `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${full ? "w-full" : ""} ${extra}`;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <button className={cls(variant, size, fullWidth, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cls(variant, size, fullWidth, className)}>
      {children}
    </Link>
  );
}
