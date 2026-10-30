import { queryCollection } from '@nuxt/content/server'
import { joinURL } from 'ufo'

const escapeXml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

export default defineEventHandler(async (event) => {
  const site = getSiteConfig(event)
  const posts = await queryCollection(event, 'blog').order('date', 'DESC').all()

  const items = posts.map((post) => {
    const link = joinURL(site.url, post.path)
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
${(post.tags || []).map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`
  }).join('\n')

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${site.url}</link>
    <description>faluoys 的个人技术博客</description>
    <language>zh-CN</language>
    <atom:link href="${joinURL(site.url, '/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
})
