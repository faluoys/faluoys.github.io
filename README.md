# faluoys 的个人博客

[![deploy](https://github.com/faluoys/faluoys.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/faluoys/faluoys.github.io/actions/workflows/deploy.yml)
[![Made with Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

一个前端开发者的技术博客，记录 Vue / Nuxt 实践、前端工程化与踩坑笔记。

🔗 在线访问：**[faluoys.github.io](https://faluoys.github.io)**

## 技术栈

- [Nuxt 4](https://nuxt.com) + Vue 3 + TypeScript
- [Nuxt UI](https://ui.nuxt.com) + Tailwind CSS 4
- [Nuxt Content](https://content.nuxt.com)：用 Markdown 写文章
- 静态生成（SSG），通过 GitHub Actions 自动部署到 GitHub Pages

## 功能

- 文章目录、标签与标签页、分页、自动估算阅读时长
- 全文搜索（`Ctrl + K`）、暗色模式、移动端适配
- RSS 订阅（`/rss.xml`）、sitemap、自动生成分享图
- 中英双语导航、头像悬停翻转、技术栈墙

## 本地开发

需要 Node.js 24 和 pnpm。

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动开发服务器 http://localhost:3000
```

其他常用命令：

```bash
pnpm lint            # 代码检查
pnpm typecheck       # 类型检查
pnpm nuxt generate   # 静态生成，产物在 .output/public
```

## 写文章

在 `content/blog/` 下新建一个 `.md` 文件，文件名就是文章地址（如 `hello-world.md` → `/blog/hello-world`）：

```md
---
title: 文章标题
description: 文章简介，会显示在列表和分享卡片上
date: 2026-10-31
image: https://example.com/cover.jpg
tags: ["Vue", "工程化"]
author:
  name: faluoys
  avatar:
    src: /avatar.jpg
    alt: faluoys
---

正文从这里开始，用 `##` / `###` 写小标题，会自动生成文章目录。
```

- `minRead`（阅读时长）不填时会按字数自动估算
- `tags` 可选，同名标签会自动汇总到 `/blog/tags/标签名`

## 修改个人信息

| 内容 | 位置 |
| --- | --- |
| 名字、头像、邮箱、社交链接、页脚 | `app/app.config.ts` |
| 首页文案、工作经历、FAQ | `content/index.yml` |
| 关于页、技术栈墙 | `content/about.yml` |
| 项目 | `content/projects/*.yml` |
| 导航菜单 | `app/utils/links.ts` |
| 每页文章数 | `app/utils/blog.ts` |

## 部署

推送到 `main` 分支后，[deploy 工作流](.github/workflows/deploy.yml) 会自动执行 `nuxt generate` 并发布到 GitHub Pages，通常 2～3 分钟后生效。

如需部署到其他地址，修改工作流中的 `NUXT_PUBLIC_SITE_URL`；若部署在子路径，还需设置 `NUXT_APP_BASE_URL`（如 `/仓库名/`）。

## 致谢

基于 [Nuxt UI Portfolio Template](https://github.com/nuxt-ui-templates/portfolio) 修改，遵循 [MIT 许可证](LICENSE)。
