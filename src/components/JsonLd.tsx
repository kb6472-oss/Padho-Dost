// Emits a schema.org JSON-LD block for rich results. Server-safe (no client JS).
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe inside a <script type="application/ld+json"> tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
