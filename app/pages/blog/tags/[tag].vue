<script setup lang="ts">
const route = useRoute()
const tag = computed(() => String(route.params.tag))

const { data: posts } = await useAsyncData(`blog-tag-${tag.value}`, () =>
  queryCollection('blog')
    .where('tags', 'LIKE', `%"${tag.value}"%`)
    .order('date', 'DESC')
    .all()
)
if (!posts.value?.length) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Tag not found',
    fatal: true
  })
}

const title = `#${tag.value}`
const description = `标签「${tag.value}」下的 ${posts.value.length} 篇文章`

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description, headline: '标签' })
</script>

<template>
  <UPage>
    <UPageHero
      :title="title"
      :description="description"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <UButton
          to="/blog"
          label="全部文章"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="subtle"
        />
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <UBlogPosts orientation="vertical">
        <UBlogPost
          v-for="post in posts"
          :key="post.path"
          variant="naked"
          orientation="horizontal"
          :to="post.path"
          v-bind="post"
          :ui="{
            root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
            image: 'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default'
          }"
        />
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
