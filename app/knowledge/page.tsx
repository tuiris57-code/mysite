import Link from "next/link";
import PageLayout from "../../components/PageLayout";
import { getCategories } from "../../lib/content";

export default function KnowledgePage() {
  const categories = getCategories();

  return (
    <PageLayout title="知识库">
      <div className="grid gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/knowledge/${cat.id}`}
            className="block no-underline"
          >
            <div className="bg-white/50 rounded-2xl p-6 border border-teal/10 hover:border-coral/30 hover:shadow-md transition-all">
              <h2 className="text-xl font-serif text-teal m-0">📁 {cat.label}</h2>
            </div>
          </Link>
        ))}
        {categories.length === 0 && (
          <p className="text-teal/50">还没有同步内容，请先运行 <code>npm run sync</code></p>
        )}
      </div>
    </PageLayout>
  );
}
