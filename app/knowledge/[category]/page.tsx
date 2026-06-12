import Link from "next/link";
import PageLayout from "../../../components/PageLayout";
import { getCategories, getAllArticles } from "../../../lib/content";

export function generateStaticParams() {
  return getCategories().map((cat) => ({ category: cat.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = getCategories();
  const catMeta = categories.find((c) => c.id === category);
  const articles = getAllArticles(category);

  return (
    <PageLayout title={catMeta?.label || category}>
      <nav className="mb-4">
        <Link href="/knowledge" className="text-coral/70 hover:text-coral text-sm no-underline">
          ← 知识库
        </Link>
      </nav>

      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/knowledge/${category}/${encodeURIComponent(article.slug)}`}
            className="block no-underline"
          >
            <div className="bg-white/50 rounded-xl p-5 border border-teal/10 hover:border-coral/30 hover:shadow-sm transition-all">
              <h3 className="text-lg text-teal m-0 font-serif">📄 {article.title}</h3>
              {article.date && (
                <p className="text-sm text-teal/40 mt-1 m-0">{article.date}</p>
              )}
            </div>
          </Link>
        ))}
        {articles.length === 0 && (
          <p className="text-teal/50">该分类下暂无内容</p>
        )}
      </div>
    </PageLayout>
  );
}
