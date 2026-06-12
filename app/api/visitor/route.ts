import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "visitors.json");

function ensureDataDir() {
  const dir = path.dirname(dataFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ visitors: [] }));
}

function getData(): { visitors: string[] } {
  ensureDataDir();
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

function saveData(data: { visitors: string[] }) {
  ensureDataDir();
  fs.writeFileSync(dataFile, JSON.stringify(data));
}

function getVisitorId(req: NextRequest): string {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const ua = req.headers.get("user-agent") || "";
  const hash = Buffer.from(ip + ua.slice(0, 50)).toString("base64").slice(0, 20);
  return hash;
}

export async function GET() {
  const data = getData();
  return NextResponse.json({ count: data.visitors.length });
}

export async function POST(req: NextRequest) {
  const data = getData();
  const visitorId = getVisitorId(req);

  if (!data.visitors.includes(visitorId)) {
    data.visitors.push(visitorId);
    saveData(data);
  }

  return NextResponse.json({ count: data.visitors.length });
}
