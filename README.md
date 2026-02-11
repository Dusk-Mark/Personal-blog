# Mark's Blog - 个人数字花园

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-blueviolet?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)](https://rourou.online)

这是一个基于 **Next.js 15** 和 **Supabase** 构建的现代化个人博客系统。采用独特的 **Claymorphism（黏土拟态）** 设计风格，兼顾美观与性能。

**🌐 访问地址：[rourou.online](https://rourou.online)**

---

## ✨ 项目亮点

### 🎨 设计美学
- **Claymorphism 风格**：全站采用柔和的阴影、内阴影和圆角设计，营造出温暖、立体且现代的视觉体验。
- **暗黑模式深度优化**：针对深色模式进行了色彩微调，确保在低亮度环境下依然保持极佳的阅读舒适度。
- **响应式布局**：完美适配移动端、平板和 PC 端。

### 🚀 极致性能
- **ISR (Incremental Static Regeneration)**：采用增量静态再生成技术，首屏秒开且数据自动更新。
- **并行数据获取**：优化 Supabase 查询逻辑，利用 `Promise.all` 并行加载分类与文章，显著降低加载延迟。
- **资源优化**：图片懒加载、按需字段加载，极大地减少了网络开销。

### 🛠️ 核心功能
- **文章管理**：支持在线撰写、编辑、预览及一键删除。
- **Markdown 导入**：撰写文章时支持直接导入本地 `.md` 文件，并自动解析 Frontmatter。
- **分类管理**：动态管理文章分类，支持 Slug 别名设置。
- **全站设置**：后台可实时修改博客名称、描述、社交链接及页脚文案。

---

## 🛠️ 技术栈

- **框架**: [Next.js (App Router)](https://nextjs.org/)
- **数据库/认证**: [Supabase](https://supabase.com/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **内容解析**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm)
- **部署**: [Vercel](https://vercel.com/)

---

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
在根目录创建 `.env.local` 文件并填入你的 Supabase 信息：
```env
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名Key
```

### 4. 运行开发服务器
```bash
npm run dev
```
访问 [http://localhost:3000](http://localhost:3000) 即可预览。

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 许可。

---

**Built with ❤️ by Mark**
