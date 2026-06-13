import Link from "next/link";
import {
  getAllArticles,
  getTotalArticleCount,
  getRecentArticles,
  getLatestArticle,
} from "../lib/content";

const tools = [
  { name: "毛选抽卡", icon: "🎴", href: "https://splendid-cuchufli-7f2f20.netlify.app/", external: true },
  { name: "拉片工具", icon: "🎬", href: "https://tydnub2u4ct3peruarvtyp.streamlit.app/", external: true },
  { name: "AI早报", icon: "📰", href: "/knowledge/ai-daily", external: false },
];

export const dynamic = "force-dynamic";

export default function Home() {
  const toolCount = tools.length;
  const articleCount = getTotalArticleCount();
  const recentArticles = getRecentArticles(3);
  const latestDaily = getLatestArticle("ai-daily");

  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  const dayStr = `星期${weekDays[today.getDay()]}`;

  const dailyLines: string[] = [];
  if (latestDaily) {
    const lines = latestDaily.content.split("\n");
    for (const line of lines) {
      if (dailyLines.length >= 8) break;
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        dailyLines.push(trimmed.replace(/^###\s*/, ""));
      } else if (trimmed.startsWith("**") && trimmed.includes("**")) {
        const text = trimmed.replace(/\*\*/g, "").trim();
        if (text.length > 5) dailyLines.push(text);
      }
    }
  }

  const dailyDateStr = latestDaily?.date
    ? `${latestDaily.date.replace(/-/g, ".")}`
    : dateStr;

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-[1200px] mx-auto">
      {/* Row 1: Title + counts */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">

        {/* Module 1: Title — full width */}
        <div className="col-span-4 md:col-span-8 p-6 pb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-teal font-serif m-0">
            哈喽！欢迎来到热血大网站
          </h1>
          <p className="text-teal/40 mt-2 m-0 text-sm">{dateStr} {dayStr}　作者：@Towhich</p>
        </div>

        {/* Module 2: Tool count */}
        <Link href="/tools" className="col-span-2 md:col-span-2 no-underline">
          <div className="bg-teal/10 rounded-2xl p-5 h-full hover:bg-teal/15 transition-colors">
            <div className="text-4xl font-bold text-teal font-serif">{toolCount}</div>
            <p className="text-sm text-teal/60 mt-1 m-0">已 vibe coding 工具</p>
          </div>
        </Link>

        {/* Module 3: Article count */}
        <Link href="/knowledge" className="col-span-2 md:col-span-3 no-underline">
          <div className="bg-coral/10 rounded-2xl p-5 h-full hover:bg-coral/15 transition-colors">
            <div className="text-4xl font-bold text-coral font-serif">{articleCount}</div>
            <p className="text-sm text-coral/70 mt-1 m-0">已收集经验</p>
          </div>
        </Link>

        {/* Module 7: AI Daily */}
        <div className="col-span-4 md:col-span-3 md:row-span-3 bg-teal rounded-2xl p-5 text-white/90 flex flex-col">
          <h2 className="text-lg font-serif m-0 mb-1 text-white">今日早报内容小结</h2>
          <p className="text-xs text-white/40 m-0 mb-4">{dailyDateStr}</p>
          <div className="flex-1 space-y-2.5 text-sm overflow-hidden">
            {dailyLines.length > 0 ? (
              dailyLines.map((line, i) => (
                <div key={i} className="flex gap-2 leading-relaxed text-white/80">
                  <span className="text-coral shrink-0">•</span>
                  <span className="line-clamp-2">{line}</span>
                </div>
              ))
            ) : (
              <p className="m-0 text-white/50">暂无早报内容</p>
            )}
          </div>
          {latestDaily && (
            <Link
              href={`/knowledge/ai-daily/${encodeURIComponent(latestDaily.slug)}`}
              className="mt-4 text-xs text-white/50 hover:text-white no-underline self-end"
            >
              查看完整早报 →
            </Link>
          )}
        </div>

        {/* Module 5: Knowledge preview */}
        <div className="col-span-4 md:col-span-5 bg-white/60 rounded-2xl p-5 border border-teal/10">
          <h2 className="text-lg font-serif text-teal m-0 mb-3">我的知识库</h2>
          <div className="space-y-2">
            {recentArticles.map((article) => (
              <Link
                key={`${article.category}-${article.slug}`}
                href={`/knowledge/${article.category}/${encodeURIComponent(article.slug)}`}
                className="flex items-baseline gap-2 no-underline group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-coral/50 shrink-0 mt-1.5" />
                <span className="text-sm text-teal/70 truncate group-hover:text-coral transition-colors">
                  {article.title}
                </span>
                {article.date && (
                  <span className="text-xs text-teal/30 shrink-0">{article.date}</span>
                )}
              </Link>
            ))}
          </div>
          <Link href="/knowledge" className="block text-xs text-coral mt-4 m-0 no-underline hover:text-coral/80">
            点击进入知识库 →
          </Link>
        </div>

        {/* Module 6: Tool library */}
        <div className="col-span-4 md:col-span-5 bg-white/60 rounded-2xl p-5 border border-teal/10">
          <h2 className="text-lg font-serif text-teal m-0 mb-3">我的工具库</h2>
          <div className="flex gap-6 flex-wrap">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target={tool.external ? "_blank" : undefined}
                rel={tool.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 no-underline hover:opacity-70 transition-opacity"
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className="text-sm text-teal/70">{tool.name}</span>
              </a>
            ))}
          </div>
          <Link href="/tools" className="block text-xs text-coral mt-4 m-0 no-underline hover:text-coral/80">
            点击进入 →
          </Link>
        </div>
      </div>
    </main>
  );
}
