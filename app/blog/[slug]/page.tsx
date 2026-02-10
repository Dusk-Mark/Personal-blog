import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { Metadata } from "next";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .single();

  return {
    title: post?.title || '文章详情',
    description: post?.excerpt || '文章详情页',
  };
}

export const revalidate = 3600; // 文章内容缓存一小时

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, cover_image, published_at, category_id, categories(name)')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    notFound();
  }

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("zh-CN")
    : new Date(post.created_at).toLocaleDateString("zh-CN");

  return (
    <article className="container mx-auto max-w-3xl px-4 py-16">
      <div className="mb-12">
        <Link
          href="/"
          className="clay-button inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-muted hover:bg-muted/80 text-muted-foreground"
          aria-label="返回首页"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
      </div>

      <div className="clay-card p-8 md:p-12 rounded-2xl mb-12">
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <time 
              dateTime={post.created_at} 
              className="clay-tag bg-muted px-4 py-2 text-muted-foreground"
            >
              {formattedDate}
            </time>
            {post.categories?.name && (
              <span className="clay-tag bg-primary/20 px-4 py-2 text-xs font-medium text-primary">
                {post.categories.name}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.cover_image && (
          <figure className="mt-8 mb-8">
            <div className="clay-card p-2 rounded-2xl">
              <img
                src={post.cover_image}
                alt={post.title}
                className="rounded-xl object-cover w-full aspect-video"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {post.title}
            </figcaption>
          </figure>
        )}
      </div>

      <div className="clay-card p-8 md:p-12 rounded-2xl">
        <div className="prose prose-base md:prose-lg prose-primary dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:text-foreground 
          prose-p:text-foreground/90 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline prose-a:font-medium prose-a:hover:underline 
          prose-img:rounded-2xl prose-img:shadow-lg prose-img:mx-auto
          prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted prose-pre:rounded-2xl prose-pre:shadow-inner prose-pre:border prose-pre:border-border/50
          prose-ul:list-disc prose-ul:pl-5 prose-ol:pl-5
          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 clay-card p-8 rounded-2xl">
          <h3 className="text-sm font-medium text-muted-foreground mb-6">文章标签</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag: string, index: number) => (
              <Link
                key={index}
                href={`/?tag=${tag}`}
                className="clay-tag bg-accent/20 px-4 py-2 text-sm text-accent-foreground"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex flex-col items-center justify-center gap-6 text-center">
        <div className="clay-card inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gradient">感谢阅读</h3>
        <p className="text-muted-foreground max-w-md">希望这篇文章对你有所帮助，欢迎继续浏览其他内容。</p>
        <div className="mt-8">
          <Link
            href="/"
            className="clay-button inline-flex items-center gap-2 px-8 py-4 text-sm font-medium bg-primary text-primary-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            浏览更多文章
          </Link>
        </div>
      </div>
    </article>
  );
}
