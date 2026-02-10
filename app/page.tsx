import { supabase } from "@/lib/supabase";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/database";

export default async function Home() {
  // 获取已发布的文章，并关联分类信息
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      {/* 英雄区域 */}
      <section className="mb-20">
        <div className="clay-card p-8 md:p-12 rounded-2xl">
          <div className="fade-in-delay-1">
            <div className="clay-tag inline-block bg-primary/20 px-6 py-2 text-sm font-medium text-primary mb-6">
              个人博客
            </div>
          </div>
          <div className="fade-in-delay-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              欢迎来到我的数字花园
            </h1>
          </div>
          <div className="fade-in-delay-3">
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              分享技术笔记、生活随笔和一些思考，记录成长的点滴。
            </p>
          </div>
          <div className="fade-in-delay-3">
            <div className="flex flex-wrap gap-4">
              <span className="clay-tag bg-primary/20 px-5 py-2 text-sm font-medium text-primary">
                #技术
              </span>
              <span className="clay-tag bg-secondary/20 px-5 py-2 text-sm font-medium text-secondary">
                #生活
              </span>
              <span className="clay-tag bg-accent/20 px-5 py-2 text-sm font-medium text-accent">
                #思考
              </span>
              <span className="clay-tag bg-sunshine/20 px-5 py-2 text-sm font-medium text-sunshine">
                #成长
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 最新文章区域 */}
      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gradient">最新文章</h2>
          <div className="h-1 flex-1 ml-6 bg-border rounded-full"></div>
        </div>
        
        <div className="space-y-8">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={post.id} className={`fade-in-delay-${(index % 3) + 1}`}>
                <PostCard post={post as unknown as Post} />
              </div>
            ))
          ) : (
            <div className="clay-card p-12 text-center space-y-6 fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4 scale-in">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gradient">暂无文章发布</h3>
              <p className="text-muted-foreground">敬请期待我的第一篇文章</p>
              <div className="clay-button inline-block bg-primary text-primary-foreground px-8 py-4 text-sm font-medium">
                准备中...
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 特色区域 */}
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="clay-card p-8 rounded-2xl bg-primary/5 fade-in-delay-1">
            <div className="text-2xl font-bold text-primary mb-4">技术分享</div>
            <p className="text-muted-foreground">
              分享前端开发、后端技术和各种编程技巧，记录学习过程中的心得体会。
            </p>
          </div>
          <div className="clay-card p-8 rounded-2xl bg-secondary/5 fade-in-delay-2">
            <div className="text-2xl font-bold text-secondary mb-4">生活随笔</div>
            <p className="text-muted-foreground">
              记录日常生活中的点滴感悟，分享旅行见闻和生活中的小确幸。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
