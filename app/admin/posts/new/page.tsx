import { createClient } from '@/utils/supabase/server';
import PostForm from '@/components/PostForm';
import Link from 'next/link';

export default async function NewPostPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">撰写新内容</h1>
          <p className="text-zinc-500">开始创作您的精彩内容。</p>
        </div>
        {!user && (
          <Link 
            href="/category/waiwai"
            className="clay-button secondary px-6 py-3 text-sm font-medium"
          >
            返回分类
          </Link>
        )}
      </div>

      <div className="clay-card p-8">
        <PostForm categories={categories || []} />
      </div>
    </div>
  );
}
