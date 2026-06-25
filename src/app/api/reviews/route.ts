import { NextResponse } from "next/server";
import { getDb, str } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// List approved reviews (newest first)
export async function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare(`SELECT name, role, rating, quote FROM reviews WHERE status = 'approved' ORDER BY id DESC LIMIT 20`)
      .all();
    return NextResponse.json({ ok: true, reviews: rows });
  } catch {
    return NextResponse.json({ ok: false, reviews: [] }, { status: 500 });
  }
}

// Submit a review (stored pending moderation)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = str(body.name, 120);
    const quote = str(body.quote, 1000);
    if (!name || !quote) {
      return NextResponse.json({ ok: false, error: "Name and review are required." }, { status: 400 });
    }
    let rating = Number(body.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) rating = 5;
    const db = getDb();
    db.prepare(
      `INSERT INTO reviews (name, role, rating, quote, status, created_at)
       VALUES (?, ?, ?, ?, 'pending', ?)`,
    ).run(name, str(body.role, 160), Math.round(rating), quote, new Date().toISOString());
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
