import Link from "next/link";
import PageLayout from "../../../../components/PageLayout";
import MarkdownRenderer from "../../../../components/MarkdownRenderer";
import { getCategories, getAllArticles, getArticle } from "../../../../lib/content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  const categories = getCategories();
  const params: { category: string; slug: string }[] = [];
  for (const cat of categories) {
    const articles = getAllArticles(cat.id);
    for (const article of articles) {
      params.push({ category: cat.id, slug: article.slug });
    }
  }
  return params;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const article = getArticle(category, decodedSlug);
  const categories = getCategories();
  const catMeta = categories.find((c) => c.id === category);
  const allArticles = getAllArticles(category);

  if (!article) {
    return (
      <PageLayout title="未找到">
        <p className="text-teal/50">文章不存在</p>
      </PageLayout>
    );
  }

  const currentIndex = allArticles.findIndex((a) => a.slug === decodedSlug);
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  return (
    <PageLayout title={article.title}>
      <nav className="mb-4 space-x-2">
        <Link href="/knowledge" className="text-coral/70 hover:text-coral text-sm no-underline">
          知识库
        </Link>
        <span className="text-teal/30">/</span>
        <Link
          href={`/knowledge/${category}`}
          className="text-coral/70 hover:text-coral text-sm no-underline"
        >
          {catMeta?.label || category}
        </Link>
      </nav>

      {article.date && (
        <p className="text-sm text-teal/40 mb-6">{article.date}</p>
      )}

      <MarkdownRenderer content={article.content} />

      {/* 上一篇 / 下一篇 */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-teal/10">
        {prevArticle ? (
          <Link
            href={`/knowledge/${category}/${encodeURIComponent(prevArticle.slug)}`}
            className="no-underline group max-w-[45%]"
          >
            <span className="text-xs text-teal/40 group-hover:text-teal/60">← 上一篇</span>
            <p className="text-sm text-teal/70 group-hover:text-coral m-0 mt-1 truncate transition-colors">
              {prevArticle.title}
            </p>
          </Link>
        ) : (
          <div className="text-xs text-teal/25">已经是第一篇了</div>
        )}

        {nextArticle ? (
          <Link
            href={`/knowledge/${category}/${encodeURIComponent(nextArticle.slug)}`}
            className="no-underline group text-right max-w-[45%]"
          >
            <span className="text-xs text-teal/40 group-hover:text-teal/60">下一篇 →</span>
            <p className="text-sm text-teal/70 group-hover:text-coral m-0 mt-1 truncate transition-colors">
              {nextArticle.title}
            </p>
          </Link>
        ) : (
          <div className="text-xs text-teal/25 text-right">已经是最后一篇了</div>
        )}
      </div>
    </PageLayout>
  );
}
