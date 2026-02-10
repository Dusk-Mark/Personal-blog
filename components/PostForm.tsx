'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post, Category } from '@/types/database';
import { createClient } from '@/utils/supabase/client';
import ReactMarkdown from 'react-markdown';

interface PostFormProps {
  post?: Post;
  categories: Category[];
}

export default function PostForm({ post, categories }: PostFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category_id: post?.category_id || '',
    published: post?.published || false,
    cover_image: post?.cover_image || '',
    tags: post?.tags?.join(', ') || '',
    read_time: post?.read_time || 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      category_id: formData.category_id || null,
      published: formData.published,
      cover_image: formData.cover_image || null,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : null,
      read_time: Number(formData.read_time),
      updated_at: new Date().toISOString(),
      published_at: formData.published ? (post?.published_at || new Date().toISOString()) : null,
    };

    let error;
    if (post?.id) {
      const { error: updateError } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', post.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('posts')
        .insert([postData]);
      error = insertError;
    }

    setLoading(false);
    if (error) {
      alert('保存失败: ' + error.message);
    } else {
      router.push('/admin/posts');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧主要编辑区 */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <input
              required
              placeholder="文章标题"
              className="w-full text-4xl font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground/50 p-0 focus:ring-0"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-4">
              <div className="flex items-center gap-1">
                <span>/blog/</span>
                <input
                  required
                  placeholder="url-slug"
                  className="bg-muted border-none rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`pb-2 text-sm font-medium transition-colors relative ${
                    activeTab === 'write' ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  编辑内容
                  {activeTab === 'write' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`pb-2 text-sm font-medium transition-colors relative ${
                    activeTab === 'preview' ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  预览
                  {activeTab === 'preview' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                </button>
              </div>
            </div>

            {activeTab === 'write' ? (
              <div className="bg-muted/20 rounded-3xl p-8 border border-border/50 transition-all focus-within:bg-muted/30 focus-within:ring-2 focus-within:ring-primary/10">
                <textarea
                  required
                  placeholder="开始写作... (支持 Markdown)"
                  className="w-full h-[600px] bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/30 p-0 focus:ring-0 font-mono leading-relaxed"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>
            ) : (
              <div className="prose dark:prose-invert max-w-none min-h-[600px] h-[600px] overflow-y-auto bg-muted/10 rounded-3xl p-8 border border-border/30">
                <ReactMarkdown>{formData.content || '*空内容*'}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* 右侧设置边栏 */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="p-8 rounded-[30px] clay-card space-y-8">
              <h3 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground">文章设置</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase ml-1">分类</label>
                  <select
                    className="w-full rounded-2xl border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  >
                    <option value="">未分类</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase ml-1">标签</label>
                  <input
                    placeholder="例如: Nextjs, Tailwind"
                    className="w-full rounded-2xl border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase ml-1">预计阅读时间 (分钟)</label>
                  <input
                    type="number"
                    className="w-full rounded-2xl border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase ml-1">摘要</label>
                  <textarea
                    placeholder="简短的文章介绍..."
                    className="w-full h-32 rounded-2xl border-border bg-muted px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 border border-border">
                  <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                    立即发布文章
                  </label>
                  <input
                    type="checkbox"
                    id="published"
                    className="w-5 h-5 rounded-lg border-border text-primary focus:ring-offset-0 focus:ring-primary/30"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl clay-button primary font-bold text-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20 transition-all"
                >
                  {loading ? '正在保存...' : (post?.id ? '更新文章' : '发布文章')}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full py-4 rounded-2xl clay-button bg-muted text-muted-foreground font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  返回列表
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
