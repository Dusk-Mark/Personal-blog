import { createClient } from '@/utils/supabase/server';
import PostForm from '@/components/PostForm';
import { notFound } from 'next/navigation';
import { Post } from '@/types/database';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    notFound();
  }

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">编辑文章</h1>
        <p className="text-zinc-500">修改您的文章内容。</p>
      </div>

      <div className="clay-card p-8">
        <PostForm post={post as Post} categories={categories || []} />
      </div>
    </div>
  );
}
