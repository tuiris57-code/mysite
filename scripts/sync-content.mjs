import fs from "fs";
import path from "path";

const VAULT_PATH = process.env.VAULT_PATH || "/Users/towhich/🌟ME/知识库/公开资料";

const contentDir = path.join(process.cwd(), "content");

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

function scanDir(srcDir, destId, label) {
  const destDir = path.join(contentDir, destId);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (!fs.existsSync(srcDir)) {
    console.warn(`Source not found: ${srcDir}, skipping`);
    return 0;
  }

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".md"));

  // Clean old files first
  const existing = fs.readdirSync(destDir).filter((f) => f.endsWith(".md"));
  for (const f of existing) {
    if (!files.includes(f)) {
      fs.unlinkSync(path.join(destDir, f));
    }
  }

  for (const file of files) {
    const content = fs.readFileSync(path.join(srcDir, file), "utf-8");
    const cleaned = content.replace(
      /!\[.*?\]\(https:\/\/tianzhulingshan\.feishu\.cn\/.*?\)/g,
      "> [图片：飞书内部链接，暂不可外部访问]"
    );
    fs.writeFileSync(path.join(destDir, file), cleaned);
  }

  console.log(`Synced ${files.length} files for ${label}`);
  return files.length;
}

// Scan vault: AI早报 subfolder + top-level md files as "经验文章"
const categories = [];

// AI早报
const aiDailyDir = path.join(VAULT_PATH, "AI早报");
if (fs.existsSync(aiDailyDir)) {
  scanDir(aiDailyDir, "ai-daily", "AI早报");
  categories.push({ id: "ai-daily", label: "AI早报" });
}

// Top-level md files → "经验文章"
const topFiles = fs.readdirSync(VAULT_PATH).filter((f) => f.endsWith(".md"));
if (topFiles.length > 0) {
  const destDir = path.join(contentDir, "articles");
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  // Clean old
  const existing = fs.readdirSync(destDir).filter((f) => f.endsWith(".md"));
  for (const f of existing) {
    if (!topFiles.includes(f)) fs.unlinkSync(path.join(destDir, f));
  }

  for (const file of topFiles) {
    const content = fs.readFileSync(path.join(VAULT_PATH, file), "utf-8");
    const cleaned = content.replace(
      /!\[.*?\]\(https:\/\/tianzhulingshan\.feishu\.cn\/.*?\)/g,
      "> [图片：飞书内部链接，暂不可外部访问]"
    );
    fs.writeFileSync(path.join(destDir, file), cleaned);
  }
  console.log(`Synced ${topFiles.length} top-level articles`);
  categories.push({ id: "articles", label: "经验文章" });
}

// Scan other subdirectories (excluding AI早报)
const subdirs = fs.readdirSync(VAULT_PATH, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== "AI早报" && !d.name.startsWith("."));

for (const dir of subdirs) {
  const srcDir = path.join(VAULT_PATH, dir.name);
  const destId = dir.name.toLowerCase().replace(/\s+/g, "-");
  scanDir(srcDir, destId, dir.name);
  categories.push({ id: destId, label: dir.name });
}

fs.writeFileSync(
  path.join(contentDir, "categories.json"),
  JSON.stringify(categories, null, 2)
);

console.log("Content sync complete!");
