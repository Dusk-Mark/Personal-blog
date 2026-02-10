import { createClient } from '@/utils/supabase/server';
import SettingsForm from '@/components/SettingsForm';
import { Settings } from '@/types/database';

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  
  const { data: settings } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">系统设置</h1>
        <p className="text-zinc-500">管理博客的全局配置和社交媒体链接。</p>
      </div>

      <div className="clay-card p-8">
        {settings ? (
          <SettingsForm settings={settings as Settings} />
        ) : (
          <div className="text-red-500">
            未找到设置数据，请确保已运行初始化 SQL 脚本。
          </div>
        )}
      </div>
    </div>
  );
}
