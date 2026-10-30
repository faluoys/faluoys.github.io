import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: '首页',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: '项目',
  icon: 'i-lucide-folder',
  to: '/projects'
}, {
  label: '博客',
  icon: 'i-lucide-file-text',
  to: '/blog'
}, {
  label: '分享',
  icon: 'i-lucide-mic',
  to: '/speaking'
}, {
  label: '关于',
  icon: 'i-lucide-user',
  to: '/about'
}]
