import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cloud text-to-speech so every visitor hears the SAME natural human voice
 * (and Urdu works regardless of the device). Uses ElevenLabs' multilingual
 * model with one voice id. Responses are cached to disk by content hash to
 * avoid repeat calls (cost + latency). If no API key is configured the route
 * replies 503 and the client falls back to the device voice.
 */

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL"; // "Sarah" – warm, multilingual
const MODEL = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";

const CACHE_DIR = join(tmpdir(), "winsci-tts");

function cachePath(text: string) {
  const hash = createHash("sha256").update(`${VOICE_ID}:${MODEL}:${text}`).digest("hex");
  return join(CACHE_DIR, `${hash}.mp3`);
}

function audioResponse(buf: Buffer | Uint8Array) {
  return new Response(buf as BodyInit, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export async function POST(req: Request) {
  if (!API_KEY) {
    return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }
  try {
    const { text } = await req.json();
    const clean = typeof text === "string" ? text.trim().slice(0, 4000) : "";
    if (!clean) return Response.json({ ok: false, reason: "empty" }, { status: 400 });

    mkdirSync(CACHE_DIR, { recursive: true });
    const file = cachePath(clean);
    if (existsSync(file)) {
      return audioResponse(readFileSync(file));
    }

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: clean,
          model_id: MODEL,
          voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.15 },
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return Response.json({ ok: false, reason: "provider-error", detail }, { status: 502 });
    }

    const buf = Buffer.from(await res.arrayBuffer());
    try {
      writeFileSync(file, buf);
    } catch {
      /* cache write is best-effort */
    }
    return audioResponse(buf);
  } catch {
    return Response.json({ ok: false, reason: "server-error" }, { status: 500 });
  }
}
