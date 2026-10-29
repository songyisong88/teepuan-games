// Edge Function: line-sync — ตรวจ LINE ID token กับ LINE แล้วอ่าน/เขียนความคืบหน้าของผู้ใช้คนนั้นเท่านั้น
// ops (POST JSON {op,...}):
//   login  {idToken}                 → {session, exp}       (ตรวจกับ https://api.line.me/oauth2/v2.1/verify)
//   pull   (x-lama-session)          → {state, rev, t} | {state:null, rev:0}
//   push   (x-lama-session) {state,t,baseRev} → {rev} | {conflict:true, rev, state, t}
//   delete (x-lama-session)          → {deleted:true}
// ไม่เคยรับ userId จากเครื่องผู้ใช้: uid มาจาก `sub` ของ ID token ที่ LINE ยืนยันแล้ว หรือจาก session ที่ฟังก์ชันนี้เซ็นเอง
// secrets (supabase secrets set): LINE_CHANNEL_ID, SYNC_SESSION_SECRET, ALLOWED_ORIGINS (คั่นด้วย ,)
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY ระบบใส่ให้อัตโนมัติ

const LINE_CHANNEL_ID = Deno.env.get("LINE_CHANNEL_ID") ?? "";
const SECRET = Deno.env.get("SYNC_SESSION_SECRET") ?? "";
const SB_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const ORIGINS = (Deno.env.get("ALLOWED_ORIGINS") ?? "https://songyisong88.github.io").split(",").map((s) => s.trim()).filter(Boolean);
const SESSION_DAYS = 30;
const MAX_BYTES = 900_000;
const UID_RE = /^U[0-9a-f]{32}$/;

const enc = new TextEncoder();
const b64u = (u: Uint8Array) => btoa(String.fromCharCode(...u)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
let keyP: Promise<CryptoKey> | null = null;
const key = () => keyP ??= crypto.subtle.importKey("raw", enc.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);

async function signSession(sub: string) {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  const body = b64u(enc.encode(JSON.stringify({ sub, exp, v: 1 })));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await key(), enc.encode(body)));
  return { session: body + "." + b64u(sig), exp };
}
async function readSession(tok: string | null): Promise<string | null> {
  if (!tok || tok.length > 600) return null;
  const [body, sig] = tok.split(".");
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await key(), unb64u(sig), enc.encode(body));
    if (!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(unb64u(body)));
    if (typeof p.sub !== "string" || !UID_RE.test(p.sub) || typeof p.exp !== "number" || p.exp < Date.now()) return null;
    return p.sub;
  } catch { return null; }
}

// ตรวจ ID token กับ LINE (ตรวจลายเซ็น, iss, aud = channel id, exp ให้ทั้งหมด)
async function verifyLine(idToken: string): Promise<string | null> {
  const r = await fetch("https://api.line.me/oauth2/v2.1/verify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ id_token: idToken, client_id: LINE_CHANNEL_ID }),
  });
  if (!r.ok) return null;
  const j = await r.json();
  if (j.iss !== "https://access.line.me" || String(j.aud) !== LINE_CHANNEL_ID || !UID_RE.test(j.sub ?? "")) return null;
  return j.sub;
}

const rest = (path: string, init: RequestInit = {}) =>
  fetch(SB_URL + "/rest/v1/" + path, {
    ...init,
    headers: { apikey: SRK, Authorization: "Bearer " + SRK, "Content-Type": "application/json", ...(init.headers ?? {}) },
  });

function cors(origin: string | null) {
  const allow = origin && ORIGINS.includes(origin) ? origin : ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, apikey, authorization, x-lama-session, x-client-info",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const H = { ...cors(origin), "Content-Type": "application/json" };
  const out = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: H });
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== "POST") return out(405, { error: "method" });
  if (origin && !ORIGINS.includes(origin)) return out(403, { error: "origin" });
  if (!LINE_CHANNEL_ID || SECRET.length < 32 || !SRK) return out(500, { error: "server not configured" });

  const raw = await req.text();
  if (raw.length > MAX_BYTES + 2000) return out(413, { error: "too large" });
  let b: Record<string, unknown>;
  try { b = JSON.parse(raw); } catch { return out(400, { error: "bad json" }); }

  if (b.op === "login") {
    if (typeof b.idToken !== "string" || b.idToken.length > 4000) return out(400, { error: "idToken" });
    const sub = await verifyLine(b.idToken);
    if (!sub) return out(401, { error: "LINE token ไม่ถูกต้องหรือหมดอายุ" });
    return out(200, await signSession(sub));
  }

  const uid = await readSession(req.headers.get("x-lama-session"));
  if (!uid) return out(401, { error: "session หมดอายุ กรุณาเข้าสู่ระบบอีกครั้ง" });

  if (b.op === "pull") {
    const r = await rest(`lama_progress?line_uid=eq.${uid}&select=state,rev,client_t`);
    if (!r.ok) return out(502, { error: "db" });
    const rows = await r.json();
    return rows[0] ? out(200, { state: rows[0].state, rev: rows[0].rev, t: rows[0].client_t }) : out(200, { state: null, rev: 0 });
  }
  if (b.op === "push") {
    const st = b.state;
    if (!st || typeof st !== "object" || Array.isArray(st)) return out(400, { error: "state" });
    const baseRev = Number(b.baseRev ?? 0), t = Number(b.t ?? Date.now());
    if (!Number.isSafeInteger(baseRev) || baseRev < 0 || !Number.isFinite(t)) return out(400, { error: "rev" });
    const r = await rest("rpc/lama_push", { method: "POST", body: JSON.stringify({ p_uid: uid, p_state: st, p_base_rev: baseRev, p_client_t: Math.round(t) }) });
    if (!r.ok) return out(502, { error: "db" });
    const j = await r.json();
    // ชนกัน: ตอบ 200 + conflict:true (ไม่ใช้ 409 เพื่อไม่ให้เบราว์เซอร์ขึ้น error ใน console) — เครื่องจะรวมแล้วส่งใหม่
    return j.ok ? out(200, { rev: j.rev }) : out(200, { conflict: true, rev: j.rev, state: j.state, t: j.t });
  }
  if (b.op === "delete") {
    const r = await rest(`lama_progress?line_uid=eq.${uid}`, { method: "DELETE" });
    return r.ok ? out(200, { deleted: true }) : out(502, { error: "db" });
  }
  return out(400, { error: "op" });
});
