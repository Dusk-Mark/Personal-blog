export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  category_id: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  categories?: Category; // Supabase join result
}

export interface Settings {
  id: number;
  blog_name: string;
  blog_description: string;
  footer_text: string;
  social_links: {
    github?: string;
    twitter?: string;
    email?: string;
  };
  updated_at: string;
}
