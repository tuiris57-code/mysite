import PageLayout from "../../components/PageLayout";

export default function AboutMe() {
  return (
    <PageLayout title="关于我">
      <div className="space-y-6 text-teal/80 leading-relaxed">
        <p className="text-lg">
          我是热血大姐子，动态发展的，可以成为无数个我。
        </p>
        <p>
          目前在抖音电商领域深耕，对AI工具和内容创作充满热情。
          这个网站是我的个人数字花园，记录学习、分享工具、沉淀经验。
        </p>
        <div className="bg-white/50 rounded-2xl p-6 border border-teal/10 mt-8">
          <h2 className="text-xl font-serif text-teal mt-0">这个网站有什么</h2>
          <ul className="space-y-2 text-teal/70">
            <li><strong>小工具</strong> — 我做的各种实用工具（毛选抽卡、拉片工具等）</li>
            <li><strong>知识库</strong> — AI早报、行业经验分享等内容沉淀</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
}
