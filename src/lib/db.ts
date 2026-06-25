import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * SQLite via Node's built-in `node:sqlite` (no external dependency).
 * Stores enrollments, creator course submissions, and reviews.
 * Cached on globalThis so hot-reload doesn't reopen the file.
 */
type Global = typeof globalThis & { __winsciDb?: DatabaseSync };
const g = globalThis as Global;

export function getDb(): DatabaseSync {
  if (!g.__winsciDb) {
    // In dev, keep the DB outside the project so writes don't trip the
    // file-watcher and trigger a recompile mid-session. Override with
    // WINSCI_DATA_DIR for production persistence.
    const dir =
      process.env.WINSCI_DATA_DIR ??
      (process.env.NODE_ENV === "production"
        ? join(process.cwd(), "data")
        : join(tmpdir(), "winsci-data"));
    mkdirSync(dir, { recursive: true });
    const db = new DatabaseSync(join(dir, "winsci.db"));
    db.exec(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        city TEXT,
        course TEXT,
        needs TEXT,
        message TEXT,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        creator TEXT NOT NULL,
        contact TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT,
        level TEXT,
        description TEXT,
        links TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT,
        rating INTEGER,
        quote TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL
      );
    `);
    g.__winsciDb = db;
  }
  return g.__winsciDb;
}

export function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
