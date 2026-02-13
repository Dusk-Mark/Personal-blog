'use client';

import React, { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/database';

interface CategoryContentProps {
  posts?: Post[];
  isProtected: boolean;
  children?: React.ReactNode;
}

export default function CategoryContent({ posts = [], isProtected, children }: CategoryContentProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // 检查本地存储是否已经验证过
  useEffect(() => {
    if (isProtected) {
      const auth = localStorage.getItem('category_loved_auth');
      const correctPassword = process.env.NEXT_PUBLIC_PROTECTED_CATEGORY_PASSWORD;
      if (auth === correctPassword) {
        setIsAuthenticated(true);
      }
    }
  }, [isProtected]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_PROTECTED_CATEGORY_PASSWORD;
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('category_loved_auth', password);
    } else {
      setError('密码错误，请重试');
    }
  };

  if (isProtected && !isAuthenticated) {
    return (
      <div className="clay-card p-12 max-w-md mx-auto animate-fade-in">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gradient">受保护的分类</h2>
          <p className="text-muted-foreground">请输入访问密码以查看内容</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入密码"
              className="clay-input w-full px-4 py-3 bg-muted/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="clay-button primary w-full py-3 font-medium transition-all hover:scale-[1.02]"
            >
              验证并进入
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-8">
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={post.id} className={`fade-in-delay-${(index % 3) + 1}`}>
            <PostCard post={post as unknown as Post} />
          </div>
        ))
      ) : (
        <div className="clay-card p-12 text-center space-y-6 fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4 scale-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gradient">该分类下暂无文章</h3>
          <p className="text-muted-foreground">博主正在努力创作中...</p>
        </div>
      )}
    </div>
  )
}
