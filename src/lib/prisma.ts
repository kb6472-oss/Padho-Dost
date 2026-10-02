import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// Prisma 7 connects through a driver adapter. The app runtime uses DATABASE_URL
// (Supabase connection pooler); migrations use DIRECT_URL via prisma.config.ts.
// keepAlive stops idle pooled connections being silently dropped on the long
// server↔database path (they surfaced as "ConnectionClosed" errors).
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  keepAlive: true,
  connectionTimeoutMillis: 15_000,
});

// Transient network blips (a dropped connection, a failed DNS lookup) used to fail
// the whole page. Read-only queries are retried once; writes never are, so nothing
// can be applied twice.
const READS = new Set([
  "findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "findMany", "count", "aggregate", "groupBy",
]);
const TRANSIENT = /ConnectionClosed|EAI_AGAIN|ECONNRESET|ETIMEDOUT|ENOTFOUND|Connection terminated|socket hang up/i;

function createClient() {
  return new PrismaClient({ adapter }).$extends({
    query: {
      $allModels: {
        async $allOperations({ operation, args, query }) {
          try {
            return await query(args);
          } catch (e) {
            if (!READS.has(operation) || !TRANSIENT.test(String((e as Error)?.message ?? e))) throw e;
            await new Promise((r) => setTimeout(r, 250));
            return query(args);
          }
        },
      },
    },
  });
}

const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof createClient> | undefined };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
