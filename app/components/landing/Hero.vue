<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()

const props = defineProps<{
  page: IndexCollectionItem
}>()

// 把标题里的名字单独拆出来，用手写体展示
const titleParts = computed(() => props.page.title.split(global.name))
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-4xl mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <!-- 悬停（移动端点按）时头像 3D 翻转，背面显示名字；外圈轨道环持续旋转 -->
        <div
          class="group relative p-2 perspective-normal"
          tabindex="0"
        >
          <div class="relative size-18 transition-transform duration-700 transform-3d group-hover:rotate-y-180 group-focus:rotate-y-180 motion-reduce:transition-none">
            <UColorModeAvatar
              class="absolute inset-0 size-full ring ring-default ring-offset-3 ring-offset-bg backface-hidden"
              :light="global.picture?.light!"
              :dark="global.picture?.dark!"
              :alt="global.picture?.alt!"
            />
            <div
              class="absolute inset-0 flex items-center justify-center rounded-full bg-primary ring ring-default ring-offset-3 ring-offset-bg rotate-y-180 backface-hidden"
              aria-hidden="true"
            >
              <span class="font-script text-xl text-inverted">{{ global.name }}</span>
            </div>
          </div>
          <span
            class="pointer-events-none absolute inset-0 rounded-full border border-primary/40 animate-orbit motion-reduce:animate-none"
            aria-hidden="true"
          >
            <span class="absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          </span>
        </div>
      </Motion>
    </template>

    <template #title>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <template
          v-for="(part, index) in titleParts"
          :key="index"
        >
          <span
            v-if="index > 0"
            class="font-script font-normal text-primary text-[1.15em]"
          >{{ global.name }}</span>{{ part }}
        </template>
      </Motion>
    </template>

    <template #description>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3
        }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div
          v-if="page.hero.links"
          class="flex items-center gap-2"
        >
          <UButton
            v-for="(link, index) in page.hero.links"
            :key="index"
            v-bind="link"
          />
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"

          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }"
        >
          <UButton
            v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }"
          />
        </Motion>
      </div>
    </template>

    <UMarquee
      pause-on-hover
      class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]"
    >
      <Motion
        v-for="(img, index) in page.hero.images"
        :key="index"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee>
  </UPageHero>
</template>
