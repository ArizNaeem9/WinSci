import { NextResponse } from "next/server";
import { getDb, str } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const creator = str(body.creator, 120);
    const contact = str(body.contact, 200);
    const title = str(body.title, 200);
    if (!creator || !contact || !title) {
      return NextResponse.json(
        { ok: false, error: "Name, contact and course title are required." },
        { status: 400 },
      );
    }
    const db = getDb();
    db.prepare(
      `INSERT INTO submissions (creator, contact, title, category, level, description, links, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
    ).run(
      creator,
      contact,
      title,
      str(body.category, 80),
      str(body.level, 40),
      str(body.description, 2000),
      str(body.links, 400),
      new Date().toISOString(),
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
