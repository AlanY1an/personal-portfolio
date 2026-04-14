import crypto from "crypto";
import { NextRequest } from "next/server";
import { createClient } from "redis";

// Unique-visitor counter backed by Vercel Redis (node-redis over TCP).
// One visit per IP per 24h window. The IP is hashed with a salt before
// touching Redis so we never store raw addresses.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOTAL_KEY = "portfolio:visits:total";
const SEEN_PREFIX = "portfolio:visits:seen:";
const SEEN_TTL_SECONDS = 60 * 60 * 24;
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|headless|lighthouse/i;

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for") ?? "";
  const first = xff.split(",")[0]?.trim();
  if (first) return first;
  return req.headers.get("x-real-ip") ?? "unknown";
}

function hashIp(ip: string): string {
  const salt = process.env.VISITOR_SALT ?? "portfolio-default-salt";
  return crypto
    .createHash("sha256")
    .update(ip + salt)
    .digest("hex")
    .slice(0, 16);
}

export async function GET(req: NextRequest) {
  const url = process.env.REDIS_URL;
  if (!url) {
    return Response.json({ count: 0, enabled: false });
  }

  const client = createClient({ url });
  client.on("error", (err) => {
    console.error("[visit] redis error", err);
  });

  try {
    await client.connect();

    const ua = req.headers.get("user-agent") ?? "";
    const isBot = BOT_RE.test(ua);

    if (!isBot) {
      const seenKey = SEEN_PREFIX + hashIp(clientIp(req));
      const wasFirst = await client.set(seenKey, "1", {
        NX: true,
        EX: SEEN_TTL_SECONDS,
      });
      if (wasFirst) {
        await client.incr(TOTAL_KEY);
      }
    }

    const raw = await client.get(TOTAL_KEY);
    const count = raw ? parseInt(raw, 10) : 0;
    return Response.json({ count, enabled: true });
  } catch (err) {
    console.error("[visit] handler error", err);
    return Response.json({ count: 0, enabled: false });
  } finally {
    await client.quit().catch(() => {});
  }
}
