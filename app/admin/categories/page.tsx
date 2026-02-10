import CategoryManager from '@/components/CategoryManager';

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">分类管理</h1>
        <p className="text-zinc-500">管理您的文章分类，让内容井井有条。</p>
      </div>

      <CategoryManager />
    </div>
  );
}
