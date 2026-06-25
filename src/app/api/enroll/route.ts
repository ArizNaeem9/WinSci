import { NextResponse } from "next/server";
import { getDb, str } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = str(body.name, 120);
    const contact = str(body.contact, 200);
    if (!name || !contact) {
      return NextResponse.json({ ok: false, error: "Name and contact are required." }, { status: 400 });
    }
    const db = getDb();
    db.prepare(
      `INSERT INTO enrollments (name, contact, city, course, needs, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      name,
      contact,
      str(body.city, 120),
      str(body.course, 160),
      str(body.needs, 500),
      str(body.message, 1000),
      new Date().toISOString(),
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
