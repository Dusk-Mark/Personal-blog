'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Category } from '@/types/database';

export default function CategoryManager() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('categories')
      .insert([{ name: newName, slug: newSlug }]);
    
    setLoading(false);
    if (error) {
      alert('添加失败: ' + error.message);
    } else {
      setNewName('');
      setNewSlug('');
      fetchCategories();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个分类吗？相关文章的分类将被设为空。')) return;
    
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      alert('删除失败: ' + error.message);
    } else {
      fetchCategories();
    }
  };

  return (
    <div className="space-y-8">
      <div className="clay-card p-6 animate-fade-in">
        <h2 className="mb-4 text-lg font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">添加新分类</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4">
          <input
            required
            placeholder="分类名称"
            className="clay-input flex-1 min-w-[200px] bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            required
            placeholder="Slug (URL 别名)"
            className="clay-input flex-1 min-w-[200px] bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            value={newSlug}
            onChange={(e) => setNewSlug(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="clay-button primary px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 w-full sm:w-auto"
          >
            添加
          </button>
        </form>
      </div>

      <div className="clay-card animate-fade-in animation-delay-100">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200/50">
              <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">名称</th>
              <th className="px-6 py-4 font-medium bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">Slug</th>
              <th className="px-6 py-4 font-medium text-right bg-gradient-to-r from-sky-500 via-mint-500 to-coral-400 bg-clip-text text-transparent">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/30">
            {categories.map((cat, index) => (
              <tr key={cat.id} className="transition-all duration-300 hover:scale-[1.01] hover:bg-zinc-50/50">
                <td className="px-6 py-4 font-medium">{cat.name}</td>
                <td className="px-6 py-4">
                  <span className="clay-tag">{cat.slug}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="clay-button danger-sm px-3 py-1 text-xs font-medium transition-all duration-300 hover:scale-105"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
