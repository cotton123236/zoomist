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
