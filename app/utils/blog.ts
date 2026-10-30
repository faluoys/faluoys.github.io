// 博客列表每页显示的文章数
export const BLOG_PAGE_SIZE = 10

// 第 1 页使用 /blog，之后为 /blog/page/2、/blog/page/3……
export function blogPagePath(page: number) {
  return page <= 1 ? '/blog' : `/blog/page/${page}`
}
