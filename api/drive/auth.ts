import { google } from "googleapis";

function clean(value?: string) {
  return (value || "").trim().replace(/^['"]|['"]$/g, "");
}

function privateKey() {
  let key = clean(process.env.GOOGLE_PRIVATE_KEY);
  if (!key && process.env.GOOGLE_PRIVATE_KEY_BASE64) {
    key = Buffer.from(clean(process.env.GOOGLE_PRIVATE_KEY_BASE64), "base64").toString("utf8");
  }
  key = key.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\r/g, "").trim();
  if (!key.includes("-----BEGIN PRIVATE KEY-----") || !key.includes("-----END PRIVATE KEY-----")) {
    throw new Error("GOOGLE_PRIVATE_KEY is not a valid PEM private key. Copy private_key from the Google service-account JSON and keep newlines as \\n, or use GOOGLE_PRIVATE_KEY_BASE64.");
  }
  return key;
}

export function getDriveAuth() {
  const json = clean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  if (json) {
    try {
      const credentials = JSON.parse(json);
      if (credentials.private_key) credentials.private_key = String(credentials.private_key).replace(/\\n/g, "\n");
      return new google.auth.GoogleAuth({ credentials, scopes: ["https://www.googleapis.com/auth/drive.readonly"] });
    } catch (error) {
      throw new Error(`GOOGLE_SERVICE_ACCOUNT_JSON could not be parsed: ${(error as Error).message}`);
    }
  }
  const email = clean(process.env.GOOGLE_CLIENT_EMAIL);
  if (!email) throw new Error("Missing GOOGLE_CLIENT_EMAIL");
  return new google.auth.JWT(email, undefined, privateKey(), ["https://www.googleapis.com/auth/drive.readonly"]);
}
