import { t } from 'i18next'

export interface Route {
  name: string
  path: string | null
  trans?: string
  children?: Route[]
}

export type Routes = Route[]

export const docsRoutes: Routes = [
  {
    name: 'getting-started',
    path: '/getting-started',
    trans: 'docNav.getting-started',
    children: [
      {
        name: 'installation',
        path: '/installation',
        trans: 'docNav.installation'
      },
      {
        name: 'basic-usage',
        path: '/basic-usage',
        trans: 'docNav.basic-usage'
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
        trans: 'docNav.parameters-options'
      },
      {
        name: 'methods-properties',
        path: '/methods-properties',
        trans: 'docNav.methods-properties'
      },
      {
        name: 'events',
        path: '/events',
        trans: 'docNav.events'
      },
      {
        name: 'styles',
        path: '/styles',
        trans: 'docNav.styles'
      }
    ]
  }
]

export const flatDocsRoutes: Route[] = docsRoutes
  .map((route) => {
    return route.children && route.children.length
      ? route.children.map((item) => ({
          ...item,
          path: `${route.path}${item.path}`
        }))
      : { ...route }
  })
  .flat()

export const useRouteTrans = (route: Route): string => {
  return route.trans ? t(route.trans) : route.name
}
