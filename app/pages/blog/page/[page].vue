<script setup lang="ts">
const route = useRoute()
const currentPage = Number(route.params.page)

// 只接受 2 及以上的整数页码，第 1 页统一走 /blog
if (currentPage === 1) {
  await navigateTo('/blog', { redirectCode: 301 })
} else if (!Number.isInteger(currentPage) || currentPage < 1) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}
</script>

<template>
  <BlogList :current-page="currentPage" />
</template>
