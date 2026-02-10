import { createClient } from '@/utils/supabase/server';
import PostForm from '@/components/PostForm';

export default async function NewPostPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">撰写新文章</h1>
        <p className="text-zinc-500">开始创作您的精彩内容。</p>
      </div>

      <div className="clay-card p-8">
        <PostForm categories={categories || []} />
      </div>
    </div>
  );
}
