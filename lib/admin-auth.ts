import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "portfolio_admin_session";
const SESSION_MS = 1000 * 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "local-development-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "admin123";
  return safeCompare(username, expectedUser) && safeCompare(password, expectedPass);
}

export function createSessionToken(username: string) {
  const expires = Date.now() + SESSION_MS;
  const payload = `${username}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token?: string) {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [username, expires, signature] = parts;
  const payload = `${username}.${expires}`;
  if (!safeCompare(signature, sign(payload))) return null;
  if (Number(expires) < Date.now()) return null;

  return { username };
}

export function getAdminSession() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return readSessionToken(token);
}

export function isAdminAuthenticated() {
  return Boolean(getAdminSession());
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MS / 1000
};
