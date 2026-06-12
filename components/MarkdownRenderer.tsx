import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article className="prose prose-lg max-w-none prose-headings:text-teal prose-a:text-coral prose-blockquote:border-coral/40 prose-blockquote:text-teal/70">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
