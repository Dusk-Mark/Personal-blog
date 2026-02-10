'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/app/admin/login/actions';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* 桌面端侧边栏 */}
      <aside className="hidden md:block w-72 clay-card mr-4">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="text-xl font-bold text-gradient hover:scale-105 transition-transform">
            博客管理后台
          </Link>
        </div>
        <nav className="space-y-3 p-6">
          <Link
            href="/admin"
            className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin') && !isActive('/admin/posts') && !isActive('/admin/categories') && !isActive('/admin/settings') 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            仪表盘
          </Link>
          <Link
            href="/admin/posts"
            className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin/posts') 
              ? 'bg-secondary text-secondary-foreground' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            文章管理
          </Link>
          <Link
            href="/admin/categories"
            className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin/categories') 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            分类管理
          </Link>
          <Link
            href="/admin/settings"
            className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin/settings') 
              ? 'bg-sunshine text-sunshine-foreground' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            系统设置
          </Link>
        </nav>
        <div className="absolute bottom-0 w-72 border-t border-border p-6">
          <form action={logout}>
            <button
              type="submit"
              className="clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              退出登录
            </button>
          </form>
        </div>
      </aside>

      {/* 移动端顶部导航 */}
      <div className="md:hidden sticky top-0 z-40 clay-card mb-4">
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/admin" className="text-xl font-bold text-gradient hover:scale-105 transition-transform">
            管理后台
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="clay-button p-3 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端侧边菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-background/95 backdrop-blur-sm">
          <div className="h-full w-3/4 max-w-xs clay-card">
            <div className="flex h-16 items-center border-b border-border px-6">
              <Link href="/admin" className="text-xl font-bold text-gradient hover:scale-105 transition-transform">
                博客管理后台
              </Link>
            </div>
            <nav className="space-y-3 p-6">
              <Link
                href="/admin"
                className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin') && !isActive('/admin/posts') && !isActive('/admin/categories') && !isActive('/admin/settings') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                仪表盘
              </Link>
              <Link
                href="/admin/posts"
                className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin/posts') 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                文章管理
              </Link>
              <Link
                href="/admin/categories"
                className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin/categories') 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                分类管理
              </Link>
              <Link
                href="/admin/settings"
                className={`clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-all ${isActive('/admin/settings') 
                  ? 'bg-sunshine text-sunshine-foreground' 
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                系统设置
              </Link>
            </nav>
            <div className="absolute bottom-0 w-full border-t border-border p-6">
              <form action={logout}>
                <button
                  type="submit"
                  className="clay-button flex items-center gap-3 w-full px-6 py-4 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  退出登录
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
