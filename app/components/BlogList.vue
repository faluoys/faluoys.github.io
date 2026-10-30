<script setup lang="ts">
const props = defineProps<{
  currentPage: number
}>()

const { data: page } = await useAsyncData('blog-page', () => {
  return queryCollection('pages').path('/blog').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
// 列表只需要卡片字段，不取正文，避免每页都带上全部文章内容
const { data: allPosts } = await useAsyncData('blogs', () =>
  queryCollection('blog')
    .select('title', 'description', 'date', 'image', 'path', 'tags', 'minRead', 'author')
    .order('date', 'DESC')
    .all()
)
if (!allPosts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
    fatal: true
  })
}

const total = allPosts.value.length
const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE))
if (props.currentPage > totalPages) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const posts = computed(() => {
  const start = (props.currentPage - 1) * BLOG_PAGE_SIZE
  return allPosts.value?.slice(start, start + BLOG_PAGE_SIZE) || []
})

const tags = computed(() => {
  const counts = new Map<string, number>()
  for (const post of allPosts.value || []) {
    for (const tag of post.tags || []) counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  return [...counts].sort((a, b) => b[1] - a[1])
})

const baseTitle = page.value?.seo?.title || page.value?.title
const title = props.currentPage > 1 ? `${baseTitle} - 第 ${props.currentPage} 页` : baseTitle
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    />
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div
        v-if="tags.length"
        class="flex flex-wrap gap-2"
      >
        <UButton
          v-for="[tag, count] in tags"
          :key="tag"
          :to="`/blog/tags/${encodeURIComponent(tag)}`"
          size="sm"
          color="neutral"
          variant="subtle"
          icon="i-lucide-hash"
        >
          {{ tag }}
          <span class="text-dimmed">{{ count }}</span>
        </UButton>
      </div>
      <UBlogPosts orientation="vertical">
        <Motion
          v-for="(post, index) in posts"
          :key="post.path"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            :to="post.path"
            v-bind="post"
            :ui="{
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
              image:
                'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
              header:
                index % 2 === 0
                  ? 'sm:-rotate-1 overflow-visible'
                  : 'sm:rotate-1 overflow-visible'
            }"
          />
        </Motion>
      </UBlogPosts>
      <div
        v-if="totalPages > 1"
        class="flex justify-center"
      >
        <UPagination
          :page="currentPage"
          :total="total"
          :items-per-page="BLOG_PAGE_SIZE"
          :to="(p: number) => blogPagePath(p)"
        />
      </div>
    </UPageSection>
  </UPage>
</template>
