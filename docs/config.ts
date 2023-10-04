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
  site: 'https://zoomist.docs/',
  description: 'A TypeScript library for zooming any element. Also supports mobile devices.',
  ogImage: '/images/logo.svg',
  themeColor: 'hsl(273, 37%, 93%)',
  themeColorDark: 'hsl(256, 44%, 15%)'
}

export { config as default }