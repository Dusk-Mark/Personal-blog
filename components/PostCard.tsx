import Link from 'next/link';
import { Post } from '@/types/database';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('zh-CN') 
    : new Date(post.created_at).toLocaleDateString('zh-CN');

  // 处理 Supabase 可能返回数组的情况
  const category = Array.isArray(post.categories) 
    ? post.categories[0] 
    : post.categories;

  return (
    <article className="group flex flex-col space-y-6 clay-card p-8 rounded-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <time 
          dateTime={post.created_at} 
          className="clay-tag bg-muted px-4 py-2 text-muted-foreground"
        >
          {formattedDate}
        </time>
        {category?.name && (
          <span className="clay-tag bg-primary/20 px-4 py-2 text-xs font-medium text-primary">
            {category.name}
          </span>
        )}
      </div>
      
      <Link 
        href={`/blog/${post.slug}`} 
        className="group-hover:opacity-90 transition-opacity"
        aria-label={`阅读文章：${post.title}`}
      >
        <h2 className="text-2xl font-bold leading-tight text-gradient group-hover:scale-105 transition-transform">
          {post.title}
        </h2>
      </Link>
      
      {post.excerpt && (
        <p className="line-clamp-4 text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
        <Link 
          href={`/blog/${post.slug}`} 
          className="clay-button bg-primary text-primary-foreground px-6 py-3 text-sm font-medium inline-flex items-center gap-2 hover:scale-105 transition-transform"
        >
          阅读全文
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="clay-tag bg-accent/20 px-3 py-1.5 text-xs text-accent-foreground">
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="clay-tag bg-sunshine/20 px-3 py-1.5 text-xs text-sunshine">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
