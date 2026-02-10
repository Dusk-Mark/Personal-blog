'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface HeaderProps {
  blogName?: string;
}

export default function Header({ blogName }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4">
      <div className="container mx-auto max-w-5xl">
        {/* 桌面导航 */}
        <div className="hidden md:block">
          <div className={`clay-card bg-card/95 backdrop-blur-md p-4 nav-scroll ${isScrolled ? 'scrolled' : ''}`}>
            <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className="text-2xl font-bold text-gradient hover:scale-105 transition-transform clay-stretch"
                aria-label="返回首页"
              >
                {blogName || '个人博客'}
              </Link>
              
              <nav className="flex items-center gap-6">
                <Link 
                  href="/" 
                  className={`clay-button px-6 py-3 text-sm font-medium transition-all ${isActive('/') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'} clay-press ripple-effect`}
                >
                  首页
                </Link>
                <Link 
                  href="/about" 
                  className={`clay-button px-6 py-3 text-sm font-medium transition-all ${isActive('/about') 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'} clay-press ripple-effect`}
                >
                  关于
                </Link>
                <Link 
                  href="/admin" 
                  className={`clay-button px-6 py-3 text-sm font-medium transition-all ${isActive('/admin') 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'} clay-press ripple-effect`}
                >
                  管理
                </Link>
              </nav>
            </div>
          </div>
        </div>
        
        {/* 移动端导航 */}
        <div className="md:hidden">
          <div className={`clay-card bg-card/95 backdrop-blur-md p-4 nav-scroll ${isScrolled ? 'scrolled' : ''}`}>
            <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className="text-xl font-bold text-gradient hover:scale-105 transition-transform clay-stretch"
                aria-label="返回首页"
              >
                {blogName || '个人博客'}
              </Link>
              
              {/* 移动端菜单按钮 */}
              <button 
                className="clay-button p-3 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-all clay-press"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
            
            {/* 移动端导航菜单 */}
            {isMenuOpen && (
              <div className="mt-4 space-y-3 slide-in-down">
                <Link 
                  href="/" 
                  className={`clay-button block w-full px-6 py-3 text-sm font-medium text-center transition-all ${isActive('/') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'} clay-press ripple-effect`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  首页
                </Link>
                <Link 
                  href="/about" 
                  className={`clay-button block w-full px-6 py-3 text-sm font-medium text-center transition-all ${isActive('/about') 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'} clay-press ripple-effect`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  关于
                </Link>
                <Link 
                  href="/admin" 
                  className={`clay-button block w-full px-6 py-3 text-sm font-medium text-center transition-all ${isActive('/admin') 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted hover:bg-muted/80 text-muted-foreground'} clay-press ripple-effect`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  管理
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
