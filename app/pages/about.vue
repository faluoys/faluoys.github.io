<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const title = page.value?.seo?.title || page.value?.title
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
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <UColorModeAvatar
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="global.picture?.alt!"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <MDC
        :value="page.content"
        unwrap="p"
      />
      <div
        v-if="page.stack?.length"
        class="mt-12"
      >
        <h2 class="text-2xl font-medium text-highlighted">
          技术栈 <span class="mx-1 text-dimmed">/</span><span class="font-script font-normal text-primary">Stack</span>
        </h2>
        <div class="mt-6 flex flex-col gap-8">
          <div
            v-for="group in page.stack"
            :key="group.title"
          >
            <h3 class="mb-3 text-sm font-medium text-muted">
              {{ group.title }}
            </h3>
            <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              <div
                v-for="item in group.items"
                :key="item.name"
                class="group flex flex-col items-center gap-2 rounded-lg border border-default bg-elevated/40 px-2 py-4 transition-colors hover:border-primary/50 hover:bg-elevated"
              >
                <UIcon
                  :name="item.icon"
                  class="size-7 text-muted transition-colors group-hover:text-primary"
                />
                <span class="text-center text-xs text-toned">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-center items-center py-10 -space-x-8">
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </div>
    </UPageSection>
  </UPage>
</template>
