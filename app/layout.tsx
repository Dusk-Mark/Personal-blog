import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/server";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from('settings')
    .select('blog_name, blog_description')
    .eq('id', 1)
    .single();
  
  const blogName = settings?.blog_name || "Mark的博客";
  
  return {
    title: {
      template: `%s | ${blogName}`,
      default: blogName,
    },
    description: settings?.blog_description || "基于 Next.js + Supabase 开发的 Mark 个人博客",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from('settings')
    .select('blog_name, footer_text, social_links')
    .eq('id', 1)
    .single();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header blogName={settings?.blog_name} />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="border-t border-zinc-200 py-12 dark:border-zinc-800">
            <div className="container mx-auto max-w-5xl px-4">
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <div className="text-sm text-zinc-500">
                  © {new Date().getFullYear()} {settings?.blog_name}. {settings?.footer_text || 'Built with Next.js & Supabase.'}
                </div>
                <div className="flex gap-6">
                  {settings?.social_links?.github && (
                    <a href={settings.social_links.github} target="_blank" className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors">GitHub</a>
                  )}
                  {settings?.social_links?.twitter && (
                    <a href={settings.social_links.twitter} target="_blank" className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Twitter</a>
                  )}
                  {settings?.social_links?.email && (
                    <a href={`mailto:${settings.social_links.email}`} className="text-sm text-zinc-500 hover:text-black dark:hover:text-white transition-colors">Email</a>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
