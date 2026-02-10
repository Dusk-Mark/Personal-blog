import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // 获取统计数据
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });
    
  const { count: categoriesCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">仪表盘</h1>
        <p className="text-zinc-500">欢迎回来，这是您的博客概览。</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="clay-card p-6 animate-fade-in">
          <h3 className="text-sm font-medium text-zinc-500">文章总数</h3>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-sky-500 to-mint-400 bg-clip-text text-transparent">{postsCount || 0}</p>
        </div>
        <div className="clay-card p-6 animate-fade-in animation-delay-100">
          <h3 className="text-sm font-medium text-zinc-500">分类数量</h3>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-coral-400 to-yellow-400 bg-clip-text text-transparent">{categoriesCount || 0}</p>
        </div>
        <div className="clay-card p-6 animate-fade-in animation-delay-200">
          <h3 className="text-sm font-medium text-zinc-500">网站访问</h3>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-mint-400 to-sky-500 bg-clip-text text-transparent">--</p>
        </div>
      </div>

      <div className="clay-card p-6 animate-fade-in animation-delay-300">
        <h3 className="text-lg font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">快速操作</h3>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href="/admin/posts/new"
            className="clay-button primary px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            撰写新文章
          </a>
          <a
            href="/"
            target="_blank"
            className="clay-button secondary px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            查看前台
          </a>
          <a
            href="/admin/posts"
            className="clay-button secondary px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            管理文章
          </a>
          <a
            href="/admin/categories"
            className="clay-button secondary px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            管理分类
          </a>
        </div>
      </div>
    </div>
  );
}
