"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface SearchBarProps {
  className?: string;
  compact?: boolean;
}

export default function SearchBar({ className = "", compact = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchPosts = async () => {
      if (query.trim().length < 1) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, categories(slug)")
        .eq("published", true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
        .limit(10);

      if (!error && data) {
        // 过滤掉 loved 分类的文章，确保搜索结果不包含受保护内容
        const filteredData = data.filter((post: any) => post.categories?.slug !== 'loved').slice(0, 5);
        setResults(filteredData);
      }
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, supabase]);

  return (
    <div className={`relative z-[100] ${className}`} ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={compact ? "搜索..." : "搜索文章标题或内容..."}
          className={`clay-input w-full bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all duration-300 ${
            compact ? "px-10 py-2.5 text-sm" : "px-12 py-4"
          }`}
        />
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${compact ? "scale-90" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className={`animate-spin border-2 border-primary border-t-transparent rounded-full ${compact ? "h-4 w-4" : "h-5 w-5"}`}></div>
          </div>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isOpen && (query.trim().length >= 1 || results.length > 0) && (
        <div className={`absolute top-full left-0 right-0 mt-4 clay-card bg-card dark:bg-[#2d2a27] overflow-hidden z-[110] fade-in border border-border/50 shadow-2xl ${compact ? "w-64 right-0 left-auto" : ""}`}>
          <div className="p-2">
            {results.length > 0 ? (
              <div className="flex flex-col gap-1">
                {results.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className="w-full text-left p-4 rounded-xl hover:bg-primary/10 transition-colors duration-200 group block"
                  >
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h4>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1 opacity-80">
                        {post.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            ) : query.trim().length >= 1 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>未找到相关文章</p>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

