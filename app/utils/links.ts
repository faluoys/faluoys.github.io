import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: '首页',
  en: 'Home',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: '博客',
  en: 'Blog',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: '项目',
  en: 'Works',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: '关于',
  en: 'Me',
  icon: 'i-lucide-user',
  to: '/about'
}]
