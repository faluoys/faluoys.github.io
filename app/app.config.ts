export default defineAppConfig({
  global: {
    picture: {
      dark: '/avatar.jpg',
      light: '/avatar.jpg',
      alt: 'faluoys 的头像'
    },
    email: 'zflqljaq@gmail.com'
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `© ${new Date().getFullYear()} faluoys`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/faluoys',
      'target': '_blank',
      'aria-label': 'GitHub'
    }, {
      'icon': 'i-simple-icons-x',
      'to': 'https://x.com/zflqljaq',
      'target': '_blank',
      'aria-label': 'X'
    }, {
      'icon': 'i-simple-icons-juejin',
      'to': 'https://juejin.cn/user/3934521496452874',
      'target': '_blank',
      'aria-label': '掘金'
    }, {
      'icon': 'i-lucide-rss',
      'to': '/rss.xml',
      'target': '_blank',
      'aria-label': 'RSS 订阅'
    }]
  }
})
