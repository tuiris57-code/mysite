import PageLayout from "../../components/PageLayout";

const tools = [
  {
    name: "毛选抽卡",
    description: "随机抽取毛选经典语录，每日一句",
    href: "https://splendid-cuchufli-7f2f20.netlify.app/",
    icon: "🎴",
    available: true,
  },
  {
    name: "拉片工具",
    description: "AI驱动的短视频拆解分析系统",
    href: "https://tydnub2u4ct3peruarvtyp.streamlit.app/",
    icon: "🎬",
    available: true,
  },
  {
    name: "AI早报",
    description: "每日AI行业快讯，一手掌握",
    href: "/knowledge/ai-daily",
    icon: "📰",
    available: true,
    internal: true,
  },
  {
    name: "更多工具",
    description: "敬请期待...",
    href: "#",
    icon: "🚧",
    available: false,
  },
];

export default function ToolsPage() {
  return (
    <PageLayout title="小工具">
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.available ? tool.href : undefined}
            target={tool.available && !tool.internal ? "_blank" : undefined}
            rel={tool.available && !tool.internal ? "noopener noreferrer" : undefined}
            className={`block no-underline rounded-2xl p-6 border transition-all ${
              tool.available
                ? "bg-white/50 border-teal/10 hover:border-coral/30 hover:shadow-md cursor-pointer"
                : "bg-oat-dark/50 border-dashed border-teal/15 cursor-default"
            }`}
          >
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h3 className={`text-lg font-serif m-0 ${tool.available ? "text-teal" : "text-teal/40"}`}>
              {tool.name}
            </h3>
            <p className={`text-sm mt-1 m-0 ${tool.available ? "text-teal/60" : "text-teal/30"}`}>
              {tool.description}
            </p>
            {tool.available && !tool.internal && (
              <span className="inline-block mt-3 text-xs text-coral">打开 →</span>
            )}
            {tool.internal && (
              <span className="inline-block mt-3 text-xs text-coral">查看 →</span>
            )}
          </a>
        ))}
      </div>
    </PageLayout>
  );
}
