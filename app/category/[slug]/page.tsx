import { createClient } from "@/utils/supabase/server";
import CategoryContent from "@/components/CategoryContent";
import { Post } from "@/types/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .or(`slug.eq.${slug},name.ilike.%${slug}%`)
    .maybeSingle();

  return {
    title: `${category?.name || '分类'} - Mark的博客`,
    description: `浏览 Mark的博客 中关于 ${category?.name || '该分类'} 的所有文章`,
  };
}

export const revalidate = 3600; // 每小时刷新一次缓存

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. 先获取分类信息
  const { data: category } = await supabase
    .from('categories')
    .select('id, name, slug')
    .or(`slug.eq.${slug},name.ilike.%${slug}%`)
    .maybeSingle();

  if (!category) {
    console.error('Category not found for slug:', slug);
    notFound();
  }

  // 2. 获取该分类下的文章
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image, created_at, category_id, categories(name)')
    .eq('published', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  const isProtected = category.slug === 'loved';

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12">
        <Link
          href="/"
          className="clay-button inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-muted hover:bg-muted/80 text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
      </div>

      <header className="mb-16 space-y-4">
        <div className="clay-tag inline-block bg-primary/20 px-6 py-2 text-sm font-medium text-primary">
          分类浏览
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          {category.name}
        </h1>
        <p className="text-xl text-muted-foreground">
          共有 {posts?.length || 0} 篇文章
        </p>
      </header>
      
      <CategoryContent posts={posts as unknown as Post[] || []} isProtected={isProtected} />
    </div>
  );
}
