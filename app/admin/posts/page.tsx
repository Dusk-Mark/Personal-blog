import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Post } from '@/types/database';
import DeletePostButton from '@/components/DeletePostButton';

export default async function AdminPostsPage() {
  const supabase = await createClient();
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="clay-button primary px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
        >
          撰写新文章
        </Link>
      </div>

      <div className="clay-card animate-fade-in animation-delay-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200/50">
                <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">标题</th>
                <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">分类</th>
                <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">状态</th>
                <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">发布日期</th>
                <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/30">
              {posts && posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr key={post.id} className="transition-all duration-300 hover:scale-[1.01] hover:bg-zinc-50/50">
                    <td className="px-6 py-4 font-medium">{post.title}</td>
                    <td className="px-6 py-4">
                      <span className="clay-tag">{post.categories?.name || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="clay-tag bg-gradient-to-r from-green-400 to-mint-400">已发布</span>
                      ) : (
                        <span className="clay-tag bg-gradient-to-r from-zinc-400 to-zinc-300">草稿</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(post.created_at).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="clay-button secondary-sm px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105"
                        >
                          编辑
                        </Link>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="clay-button secondary-sm px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105"
                        >
                          预览
                        </Link>
                        <DeletePostButton postId={post.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                    暂无文章
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
