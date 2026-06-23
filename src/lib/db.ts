import postgres from "postgres";

declare global {
  var globalSql: postgres.Sql | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

// We reuse the connection pool across serverless function invocations during hot starts.
export const sql = databaseUrl
  ? globalThis.globalSql ??
    (globalThis.globalSql = postgres(databaseUrl, {
      max: 1, // Maintain 1 connection per serverless execution context
      ssl: { rejectUnauthorized: false }, // Necessary for managed SSL databases (Neon, Supabase)
      idle_timeout: 20, // Free connections after 20 seconds of idling
      connect_timeout: 10,
    }))
  : null;
