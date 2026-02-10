'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings } from '@/types/database';
import { createClient } from '@/utils/supabase/client';

interface SettingsFormProps {
  settings: Settings;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    blog_name: settings.blog_name || '',
    blog_description: settings.blog_description || '',
    footer_text: settings.footer_text || '',
    github: settings.social_links?.github || '',
    twitter: settings.social_links?.twitter || '',
    email: settings.social_links?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('settings')
      .update({
        blog_name: formData.blog_name,
        blog_description: formData.blog_description,
        footer_text: formData.footer_text,
        social_links: {
          github: formData.github,
          twitter: formData.twitter,
          email: formData.email,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1);

    setLoading(false);
    if (error) {
      alert('保存失败: ' + error.message);
    } else {
      alert('设置已更新');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <h3 className="text-xl font-bold tracking-tight text-muted-foreground/80 uppercase text-xs tracking-[0.2em]">基本信息</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground ml-1">博客名称</label>
            <input
              required
              className="clay-input w-full bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={formData.blog_name}
              onChange={(e) => setFormData({ ...formData, blog_name: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground ml-1">博客描述</label>
            <input
              className="clay-input w-full bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={formData.blog_description}
              onChange={(e) => setFormData({ ...formData, blog_description: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-bold text-muted-foreground ml-1">页脚文本</label>
          <input
            className="clay-input w-full bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            value={formData.footer_text}
            onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-6 pt-8 border-t border-border/50">
        <h3 className="text-xl font-bold tracking-tight text-muted-foreground/80 uppercase text-xs tracking-[0.2em]">社交链接</h3>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground ml-1">GitHub</label>
            <input
              placeholder="https://github.com/..."
              className="clay-input w-full bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground ml-1">Twitter / X</label>
            <input
              placeholder="https://twitter.com/..."
              className="clay-input w-full bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-muted-foreground ml-1">联系邮箱</label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="clay-input w-full bg-muted/30 px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <button
          type="submit"
          disabled={loading}
          className="clay-button primary px-8 py-3 text-sm font-bold hover:scale-[1.05] active:scale-[0.98] disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
        >
          {loading ? '保存中...' : '保存更改'}
        </button>
      </div>
    </form>
  );
}
