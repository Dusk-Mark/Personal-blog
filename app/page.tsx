import { createClient } from "@/utils/supabase/server";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/database";
import Link from "next/link";

export const revalidate = 3600; // 每小时重新生成页面缓存

export default async function Home() {
  const supabase = await createClient();
  // 并行获取分类和文章，显著提升加载速度
  const [categoriesResult, postsResult] = await Promise.all([
    supabase
      .from('categories')
      .select('id, name, slug'),
    supabase
      .from('posts')
      .select('id, title, slug, excerpt, cover_image, created_at, category_id, categories(name)')
      .eq('published', true)
      .order('created_at', { ascending: false })
  ]);

  const categories = categoriesResult.data;
  const posts = postsResult.data;
  const error = postsResult.error;

  const techCategory = categories?.find(c => c.name.includes('技术'));
  const lifeCategory = categories?.find(c => c.name.includes('日常'));

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
              Mark的博客
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
              <Link 
                href={techCategory ? `/category/${techCategory.slug}` : '/category/tech'}
                className="clay-tag bg-primary/20 px-5 py-2 text-sm font-medium text-primary hover:scale-110 transition-transform cursor-pointer"
              >
                #技术
              </Link>
              <Link 
                href={lifeCategory ? `/category/${lifeCategory.slug}` : '/category/daily'}
                className="clay-tag bg-secondary/20 px-5 py-2 text-sm font-medium text-secondary hover:scale-110 transition-transform cursor-pointer"
              >
                #日常
              </Link>
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
          <Link 
            href={techCategory ? `/category/${techCategory.slug}` : '/admin/categories'} 
            className="clay-card p-8 rounded-2xl bg-primary/5 fade-in-delay-1 hover:scale-[1.02] transition-all duration-300 group cursor-pointer block"
          >
            <div className="text-2xl font-bold text-primary mb-4 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              技术分享
              {!techCategory && <span className="text-xs font-normal bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded-full ml-2 animate-pulse">待配置</span>}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <p className="text-muted-foreground">
              {techCategory ? '分享前端开发、后端技术和各种编程技巧，记录学习过程中的心得体会。' : '检测到尚未配置“技术”相关分类，点击前往后台添加分类。'}
            </p>
          </Link>
          <Link 
            href={lifeCategory ? `/category/${lifeCategory.slug}` : '/admin/categories'} 
            className="clay-card p-8 rounded-2xl bg-secondary/5 fade-in-delay-2 hover:scale-[1.02] transition-all duration-300 group cursor-pointer block"
          >
            <div className="text-2xl font-bold text-secondary mb-4 group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
              日常随笔
              {!lifeCategory && <span className="text-xs font-normal bg-yellow-500/20 text-yellow-600 px-2 py-0.5 rounded-full ml-2 animate-pulse">待配置</span>}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <p className="text-muted-foreground">
              {lifeCategory ? '记录日常生活中的点滴感悟，分享旅行见闻和生活中的小确幸。' : '检测到尚未配置“日常”相关分类，点击前往后台添加分类。'}
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
