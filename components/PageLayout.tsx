import Link from "next/link";

export default function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <nav className="mb-8">
        <Link href="/" className="text-coral hover:text-coral/70 text-sm font-serif no-underline">
          ← 回到首页
        </Link>
      </nav>
      <h1 className="text-3xl font-bold text-teal font-serif mb-8">{title}</h1>
      {children}
    </main>
  );
}
