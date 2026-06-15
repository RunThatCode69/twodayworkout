import crypto from "crypto";

// Stateless, signed confirmation tokens — no database required.
// A token is `payload.signature`, where payload is base64url-encoded
// JSON {email, exp} and signature is an HMAC-SHA256 over the payload.

const SECRET = process.env.CONFIRM_SECRET || "dev-insecure-secret-change-me";
const TTL_MS = 1000 * 60 * 60 * 24; // links valid for 24 hours

export function createToken(email) {
  const payload = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + TTL_MS })
  ).toString("base64url");
  const sig = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${sig}`;
}

// Returns the verified email, or null if the token is invalid/expired/tampered.
export function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");

  const given = Buffer.from(sig);
  const want = Buffer.from(expected);
  if (given.length !== want.length || !crypto.timingSafeEqual(given, want)) {
    return null;
  }

  try {
    const { email, exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    );
    if (!email || Date.now() > exp) return null;
    return email;
  } catch {
    return null;
  }
}
