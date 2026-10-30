<script setup lang="ts">
import { zh_cn } from '@nuxt/ui/locale'
import { joinURL } from 'ufo'

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

// 部署在子路径（如 GitHub Pages 的 /仓库名/）时，head 里的静态资源需要手动带上 baseURL
const { baseURL } = useRuntimeConfig().app

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: joinURL(baseURL, 'favicon.ico') },
    { rel: 'apple-touch-icon', href: joinURL(baseURL, 'apple-touch-icon.png') },
    { rel: 'alternate', type: 'application/rss+xml', title: 'faluoys', href: joinURL(baseURL, 'rss.xml') }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

useSeoMeta({
  titleTemplate: '%s - faluoys',
  twitterCard: 'summary_large_image'
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('blog')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <UApp :locale="zh_cn">
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
