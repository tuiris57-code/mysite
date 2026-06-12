import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const VAULT_PATH = process.env.VAULT_PATH || "/Users/towhich/🌟ME/知识库/公开资料";

let debounce = null;

function sync() {
  try {
    execSync("node scripts/sync-content.mjs", { cwd: process.cwd(), stdio: "inherit" });
  } catch {
    console.error("Sync failed");
  }
}

fs.watch(VAULT_PATH, { recursive: true }, (event, filename) => {
  if (!filename || (!filename.endsWith(".md") && !filename.endsWith(".xlsx"))) return;
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(sync, 500);
});

console.log(`Watching ${VAULT_PATH} for changes...`);
