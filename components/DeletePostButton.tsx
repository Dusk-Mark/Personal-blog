'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface DeletePostButtonProps {
  postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
      return;
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) {
      alert('删除失败: ' + error.message);
    } else {
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="clay-button danger-sm px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105"
    >
      删除
    </button>
  );
}
