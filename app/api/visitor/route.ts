import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Persistence layer
// ---------------------------------------------------------------------------
// Netlify serverless functions lose their filesystem on cold starts.
// We use Netlify Blobs (persistent KV) in production, and a local JSON file
// fallback for development (`next dev`).
// ---------------------------------------------------------------------------

const BLOB_KEY = "visitor-count";
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitors.json");

// ---- Netlify Blobs (production) -------------------------------------------

async function blobGet(): Promise<string[]> {
  // Dynamic import – only loads on Netlify where the package resolves
  const { getStore } = await import("@netlify/blobs");
  const store = getStore("visitors");
  const raw = await store.get(BLOB_KEY);
  if (!raw) return [];
  const text = Buffer.from(raw).toString("utf-8");
  return JSON.parse(text);
}

async function blobSet(visitors: string[]): Promise<void> {
  const { getStore } = await import("@netlify/blobs");
  const store = getStore("visitors");
  await store.setJSON(BLOB_KEY, visitors);
}

// ---- File fallback (local dev) --------------------------------------------

function fileGet(): string[] {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ visitors: [] }));
    return [];
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw).visitors ?? [];
  } catch {
    return [];
  }
}

function fileSet(visitors: string[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify({ visitors }));
}

// ---- Unified helpers ------------------------------------------------------

function isNetlify(): boolean {
  return !!process.env.NETLIFY;
}

async function getVisitors(): Promise<string[]> {
  if (isNetlify()) return blobGet();
  return fileGet();
}

async function saveVisitors(visitors: string[]): Promise<void> {
  if (isNetlify()) return blobSet(visitors);
  fileSet(visitors);
}

// ---- Visitor fingerprint --------------------------------------------------

function getVisitorId(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") || "";
  // Simple hash – enough to deduplicate without storing raw IP
  const hash = Buffer.from(ip + ua.slice(0, 50)).toString("base64").slice(0, 24);
  return hash;
}

// ---- Route handlers -------------------------------------------------------

export async function GET() {
  const visitors = await getVisitors();
  return NextResponse.json({ count: visitors.length });
}

export async function POST(req: NextRequest) {
  const visitors = await getVisitors();
  const visitorId = getVisitorId(req);

  if (!visitors.includes(visitorId)) {
    visitors.push(visitorId);
    await saveVisitors(visitors);
  }

  return NextResponse.json({ count: visitors.length });
}
