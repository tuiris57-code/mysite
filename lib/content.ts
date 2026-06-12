import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export interface Article {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export interface Category {
  id: string;
  label: string;
}

export function getCategories(): Category[] {
  const file = path.join(contentDir, "categories.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function getAllArticles(categoryId: string): Omit<Article, "content">[] {
  const dir = path.join(contentDir, categoryId);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const lines = content.split("\n").filter((l) => l.trim().length > 0 && !l.trim().startsWith("|") && !l.trim().startsWith("---"));
      const headingLine = lines.find((l) => l.startsWith("#"));
      const title = headingLine
        ? headingLine.replace(/^#+\s*/, "").trim()
        : lines[0]
        ? lines[0].replace(/^#+\s*/, "").trim()
        : file.replace(/\.md$/, "");

      // Try to extract date from filename like "2026-06-12-AI早报.md"
      const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})/);
      const date = dateMatch ? dateMatch[1] : "";

      const slug = file.replace(/\.md$/, "");

      return { slug, title, date };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(categoryId: string, slug: string): Article | null {
  const file = path.join(contentDir, categoryId, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n").filter((l) => l.trim().length > 0 && !l.trim().startsWith("|") && !l.trim().startsWith("---"));
  const headingLine = lines.find((l) => l.startsWith("#"));
  const title = headingLine
    ? headingLine.replace(/^#+\s*/, "").trim()
    : lines[0]
    ? lines[0].replace(/^#+\s*/, "").trim()
    : slug;
  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : "";

  return { slug, title, date, content };
}

export function getLatestArticle(categoryId: string): Article | null {
  const articles = getAllArticles(categoryId);
  if (articles.length === 0) return null;
  return getArticle(categoryId, articles[0].slug);
}

export function getTotalArticleCount(): number {
  const categories = getCategories();
  return categories.reduce((sum, cat) => sum + getAllArticles(cat.id).length, 0);
}

export function getRecentArticles(limit: number = 3): (Omit<Article, "content"> & { category: string })[] {
  const categories = getCategories();
  const all: (Omit<Article, "content"> & { category: string })[] = [];
  for (const cat of categories) {
    const articles = getAllArticles(cat.id);
    for (const a of articles) {
      all.push({ ...a, category: cat.id });
    }
  }
  return all.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}
