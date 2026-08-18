// Renders a line of Bengali text in the Noto Sans Bengali face (loaded in the root
// layout as --font-bengali). Returns null when there's no translation, so callers
// can drop it in unconditionally. Server-safe (no client hooks).
export function Bn({
  children,
  className = "",
}: {
  children?: string | null;
  className?: string;
}) {
  if (!children) return null;
  return (
    <span lang="bn" style={{ fontFamily: "var(--font-bengali)" }} className={className}>
      {children}
    </span>
  );
}
