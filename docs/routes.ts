import { t } from 'i18next'

export interface Route {
  name: string
  path: string | null
  trans?: string
  children?: Route[]
  keywords?: string
}

export interface flatRoute extends Route {
  parent?: string
}

export const docsRoutes: Route[] = [
  {
    name: 'getting-started',
    path: '/getting-started',
    trans: 'docNav.getting-started',
    children: [
      {
        name: 'installation',
        path: '/installation',
        trans: 'docNav.installation',
        keywords: 'keywords.installation'
      },
      {
        name: 'basic-usage',
        path: '/basic-usage',
        trans: 'docNav.basic-usage',
        keywords: 'keywords.basic-usage'
      }
    ]
  },
  {
    name: 'guides',
    path: '/guides',
    trans: 'docNav.guides',
    children: [
      {
        name: 'parameters-options',
        path: '/parameters-options',
        trans: 'docNav.parameters-options',
        keywords: 'keywords.parameters-options'
      },
      {
        name: 'methods-properties',
        path: '/methods-properties',
        trans: 'docNav.methods-properties',
        keywords: 'keywords.methods-properties'
      },
      {
        name: 'events',
        path: '/events',
        trans: 'docNav.events',
        keywords: 'keywords.events'
      },
      {
        name: 'styles',
        path: '/styles',
        trans: 'docNav.styles',
        keywords: 'keywords.styles'
      },
      {
        name: 'using-typescript',
        path: '/using-typescript',
        trans: 'docNav.using-typescript',
        keywords: 'keywords.using-typescript'
      }
    ]
  }
]

export const flatDocsRoutes: flatRoute[] = docsRoutes
  .map((route) => {
    return route.children && route.children.length
      ? route.children.map((item) => ({
          ...item,
          path: `${route.path}${item.path}`,
          parent: route.name
        }))
      : { ...route }
  })
  .flat()

export const useRouteTrans = (route: Route): string => {
  return route.trans ? t(route.trans) : route.name
}
