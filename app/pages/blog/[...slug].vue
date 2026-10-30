<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'

const route = useRoute()
const routePath = computed(() => withoutTrailingSlash(route.path))

const { data: page } = await useAsyncData(routePath.value, () =>
  queryCollection('blog').path(routePath.value).first()
)
if (!page.value) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
const { data: surround } = await useAsyncData(`${routePath.value}-surround`, () =>
  queryCollectionItemSurroundings('blog', routePath.value, {
    fields: ['description']
  })
)

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

if (page.value.image) {
  useSeoMeta({ ogImage: page.value.image })
} else {
  defineOgImage('Portfolio', {
    title,
    description,
    headline: '博客'
  })
}

const articleLink = computed(() => `${window?.location}`)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <div v-if="page">
        <ULink
          to="/blog"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="lucide:chevron-left" />
          博客
        </ULink>
        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead">
              -
            </span>
            <span v-if="page.minRead">
              约 {{ page.minRead }} 分钟读完
            </span>
          </div>
          <NuxtImg
            v-if="page.image"
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />
          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>
          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>
          <div
            v-if="page.tags?.length"
            class="flex flex-wrap items-center justify-center gap-2"
          >
            <UButton
              v-for="tag in page.tags"
              :key="tag"
              :label="tag"
              :to="`/blog/tags/${encodeURIComponent(tag)}`"
              size="xs"
              color="neutral"
              variant="subtle"
              icon="i-lucide-hash"
            />
          </div>
          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>
        <UPage :ui="{ center: 'lg:col-span-7', right: 'lg:col-span-3' }">
          <UPageBody>
            <ContentRenderer
              v-if="page.body"
              :value="page"
            />

            <div class="flex items-center justify-end gap-2 text-sm text-muted">
              <UButton
                size="sm"
                variant="link"
                color="neutral"
                label="复制链接"
                @click="copyToClipboard(articleLink, '文章链接已复制')"
              />
            </div>
            <UContentSurround :surround />
          </UPageBody>

          <template
            v-if="page.body?.toc?.links?.length"
            #right
          >
            <UContentToc
              title="目录"
              :links="page.body.toc.links"
              highlight
            />
          </template>
        </UPage>
      </div>
    </UContainer>
  </UMain>
</template>
