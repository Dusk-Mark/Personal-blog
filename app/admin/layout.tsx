import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 检查是否是从 "关于waiwai" 进来的撰写页面
  // 在 Server Component 中，我们可以通过 headers 获取当前的 URL
  // 或者简单的在 layout 中不强制拦截，让子页面或中间件处理
  
  // 虽然有中间件保护，但在布局中再次检查确保安全
  if (!user) {
    // 如果没有用户，检查是否是特定的免登录页面
    // 这里的 children 将直接渲染，不带侧边栏
    return (
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <AdminSidebar />

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
