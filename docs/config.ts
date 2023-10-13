interface SiteConfig {
  name: string
  site: string
  description: string
  ogImage: string
  themeColor?: string
  themeColorDark?: string
}

const config: SiteConfig = {
  name: 'Zoomist',
  site: 'https://zoomist.vercel.app/',
  description: 'A TypeScript library for zooming any element. Also supports mobile devices.',
  ogImage: '/images/logo.svg',
  themeColor: '#fff',
  themeColorDark: '#000'
}

export { config as default }
