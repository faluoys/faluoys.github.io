// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    name: 'faluoys'
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2026-06-30',

  hooks: {
    // 未手动填写 minRead 的文章，按中文 400 字/分钟、英文 200 词/分钟估算阅读时长
    'content:file:afterParse'({ file, content, collection }) {
      if (collection.name !== 'blog' || content.minRead) return

      const text = file.body
        .replace(/^---[\s\S]*?---/, '')
        .replace(/```[\s\S]*?```/g, '')
      const cjk = text.match(/[一-鿿]/g)?.length ?? 0
      const words = text.replace(/[一-鿿]/g, ' ').match(/[a-z0-9]+/gi)?.length ?? 0
      content.minRead = Math.max(1, Math.ceil(cjk / 400 + words / 200))
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    zeroRuntime: true
  },

  prerender: {
    routes: [
      '/',
      '/rss.xml'
    ],
    crawlLinks: true
  }
})
